import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";

const APP_PORT = 3010;
const DRIVER_PORT = 9520;
const appBase = `http://127.0.0.1:${APP_PORT}`;
const driverBase = `http://127.0.0.1:${DRIVER_PORT}`;
const evidenceDir = new URL("../artifacts/browser/", import.meta.url);

function startService(command, args) {
  return spawn(command, args, { stdio: "ignore", env: process.env, detached: true });
}

function stopService(child) {
  if (!child?.pid) return;
  try {
    process.kill(-child.pid, "SIGTERM");
  } catch {
    try { child.kill("SIGTERM"); } catch {}
  }
}

async function waitFor(url, attempts = 90) {
  for (let index = 0; index < attempts; index += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Timeout aguardando ${url}`);
}

async function wd(method, path, body) {
  const response = await fetch(`${driverBase}${path}`, {
    method,
    headers: body ? { "content-type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await response.text();
  const parsed = text ? JSON.parse(text) : {};
  if (!response.ok || parsed.value?.error) throw new Error(`${method} ${path}: ${text}`);
  return parsed.value;
}

async function execute(id, script) {
  return wd("POST", `/session/${id}/execute/sync`, { script, args: [] });
}

async function navigate(id, path) {
  await wd("POST", `/session/${id}/url`, { url: `${appBase}${path}` });
  await new Promise((resolve) => setTimeout(resolve, 700));
}

async function auditPage(id, label) {
  const result = await execute(id, `
    return {
      title: document.title,
      h1: document.querySelector('h1')?.textContent?.trim() || '',
      overflowX: document.documentElement.scrollWidth > window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      links: [...document.querySelectorAll('a[href]')].map(a => a.href),
      hasHeader: Boolean(document.querySelector('header')),
      hasFooter: Boolean(document.querySelector('footer')),
    };
  `);

  assert.equal(result.overflowX, false, `${label}: overflow horizontal (${result.scrollWidth} > ${result.viewportWidth})`);
  assert.equal(result.hasHeader, true, `${label}: header ausente`);
  assert.equal(result.hasFooter, true, `${label}: footer ausente`);
  assert.equal(result.links.some((href) => href.includes('.vercel.app')), false, `${label}: link técnico Vercel exposto`);
  assert.equal(result.links.some((href) => href.includes('-git-')), false, `${label}: alias de branch exposto`);
  return result;
}

async function scrollTo(id, selector, fallbackScript = "window.scrollTo(0,0)") {
  await execute(id, `
    const element = document.querySelector(${JSON.stringify(selector)});
    if (element) element.scrollIntoView({block:'start'});
    else ${fallbackScript};
    return true;
  `);
  await new Promise((resolve) => setTimeout(resolve, 250));
}

async function capture(id, label) {
  const png = await wd("GET", `/session/${id}/screenshot`);
  assert.ok(typeof png === "string" && png.length > 1000, `${label}: screenshot não gerado`);
  await writeFile(new URL(`${label}.png`, evidenceDir), Buffer.from(png, "base64"));
}

async function captureEvidence(id, viewportLabel) {
  await navigate(id, "/");
  const home = await auditPage(id, `${viewportLabel}/home`);
  assert.equal(home.h1, "Tecnologia para transformar operações complexas em gestão simples, conectada e escalável.");

  await scrollTo(id, "#solucoes");
  await capture(id, `${viewportLabel}-01-home`);

  await scrollTo(id, "#inicio");
  await capture(id, `${viewportLabel}-02-hero`);

  await scrollTo(id, "#produtos");
  const products = await execute(id, `return [...document.querySelectorAll('#produtos article h3')].map(el => el.textContent.trim());`);
  assert.deepEqual(products, ["BravOS", "BravHAS", "BravHOS", "BravMsg", "BravAcademy", "BravVideo"]);
  await capture(id, `${viewportLabel}-03-portfolio`);

  await navigate(id, "/acessar");
  const access = await auditPage(id, `${viewportLabel}/acessar`);
  assert.equal(access.h1, "Acesse seu sistema BravSystems.");
  const accessCards = await execute(id, `
    const section = [...document.querySelectorAll('section')].find(section => section.textContent.includes('Sistemas BravSystems'));
    if (!section) return { names: [], activeLogins: 0 };
    section.scrollIntoView({block:'start'});
    return {
      names: [...section.querySelectorAll('article h3')].map(el => el.textContent.trim()),
      activeLogins: [...section.querySelectorAll('a')].filter(a => /^Acessar Brav/.test(a.textContent.trim())).length,
    };
  `);
  assert.deepEqual(accessCards.names, ["BravOS", "BravHAS", "BravHOS", "BravMsg", "BravAcademy", "BravVideo"]);
  await new Promise((resolve) => setTimeout(resolve, 250));
  await capture(id, `${viewportLabel}-04-central-acesso`);

  await navigate(id, "/bravos");
  const product = await auditPage(id, `${viewportLabel}/bravos`);
  assert.ok(product.h1.length > 20, `${viewportLabel}: headline BravOS ausente`);
  const productHasAccess = await execute(id, `return [...document.querySelectorAll('a')].some(a => a.textContent.includes('Central de Acesso') || a.textContent.includes('Acessar BravOS'));`);
  assert.equal(productHasAccess, true, `${viewportLabel}: jornada cliente ausente na página do produto`);
  await capture(id, `${viewportLabel}-05-produto-bravos`);

  await navigate(id, "/");
  await scrollTo(id, "#contato");
  const formPresent = await execute(id, `return Boolean(document.querySelector('#contato form'));`);
  assert.equal(formPresent, true, `${viewportLabel}: formulário comercial ausente`);
  await capture(id, `${viewportLabel}-06-contato`);

  await scrollTo(id, "footer");
  const footerAccess = await execute(id, `return [...document.querySelectorAll('footer a')].some(a => a.getAttribute('href') === '/acessar');`);
  assert.equal(footerAccess, true, `${viewportLabel}: Central de Acesso ausente do footer`);
  await capture(id, `${viewportLabel}-07-footer`);

  return { home, access, product, accessCards };
}

async function runViewport(width, height, label) {
  const session = await wd("POST", "/session", {
    capabilities: {
      alwaysMatch: {
        browserName: "chrome",
        "goog:chromeOptions": {
          args: [
            "--headless=new",
            "--no-sandbox",
            "--disable-dev-shm-usage",
            "--force-device-scale-factor=1",
            `--window-size=${width},${height}`,
          ],
        },
      },
    },
  });
  const id = session.sessionId;

  try {
    await wd("POST", `/session/${id}/window/rect`, { width, height, x: 0, y: 0 });
    const result = await captureEvidence(id, label);
    console.log(`PORTAL_${label}_RESULT=${JSON.stringify({
      viewport: { width, height },
      homeTitle: result.home.title,
      accessTitle: result.access.title,
      productTitle: result.product.title,
      accessProducts: result.accessCards.names.length,
      activeLoginsInCI: result.accessCards.activeLogins,
    })}`);
  } finally {
    await wd("DELETE", `/session/${id}`).catch(() => {});
  }
}

test("Portal SaaS BravSystems — browser real desktop/mobile", { timeout: 180_000 }, async () => {
  await mkdir(evidenceDir, { recursive: true });

  const app = startService("npm", ["start", "--", "-p", String(APP_PORT)]);
  const driver = startService("chromedriver", [`--port=${DRIVER_PORT}`]);

  try {
    await waitFor(`${appBase}/`);
    await waitFor(`${driverBase}/status`);
    await runViewport(1440, 1000, "DESKTOP_1440x1000");
    await runViewport(390, 844, "MOBILE_390x844");
  } finally {
    stopService(app);
    stopService(driver);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
});
