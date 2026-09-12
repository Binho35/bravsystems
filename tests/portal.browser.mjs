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
  await new Promise((resolve) => setTimeout(resolve, 650));
  await execute(id, `
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';
    window.scrollTo({top:0,left:0,behavior:'instant'});
    return true;
  `);
}

async function auditPage(id, label) {
  const result = await execute(id, `
    return {
      title: document.title,
      h1: document.querySelector('h1')?.textContent?.trim() || '',
      h1Count: document.querySelectorAll('h1').length,
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
  assert.equal(result.h1Count, 1, `${label}: hierarquia H1 inválida`);
  assert.equal(result.links.some((href) => href.includes('.vercel.app')), false, `${label}: link técnico Vercel exposto`);
  assert.equal(result.links.some((href) => href.includes('hostingersite.com')), false, `${label}: hostname temporário Hostinger exposto`);
  assert.equal(result.links.some((href) => href.includes('-git-')), false, `${label}: alias de branch exposto`);
  return result;
}

async function scrollToTarget(id, selector, block = "start") {
  const result = await execute(id, `
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';
    const element = document.querySelector(${JSON.stringify(selector)});
    if (!element) return { found:false };
    element.scrollIntoView({block:${JSON.stringify(block)}, inline:'nearest', behavior:'instant'});
    const rect = element.getBoundingClientRect();
    return {
      found:true,
      top:rect.top,
      bottom:rect.bottom,
      height:rect.height,
      viewportHeight:window.innerHeight,
      visible:rect.bottom > 0 && rect.top < window.innerHeight,
    };
  `);
  await new Promise((resolve) => setTimeout(resolve, 90));
  assert.equal(result.found, true, `alvo visual ausente: ${selector}`);
  assert.equal(result.visible, true, `alvo visual fora da viewport: ${selector}`);
  return result;
}

async function capture(id, label) {
  const png = await wd("GET", `/session/${id}/screenshot`);
  assert.ok(typeof png === "string" && png.length > 1000, `${label}: screenshot não gerado`);
  await writeFile(new URL(`${label}.png`, evidenceDir), Buffer.from(png, "base64"));
}

async function captureEvidence(id, viewportLabel, width) {
  await navigate(id, "/");
  const home = await auditPage(id, `${viewportLabel}/home`);
  assert.equal(home.h1, "Tecnologia para transformar operações complexas em gestão simples, conectada e escalável.");

  if (width <= 640) {
    const mobileMenu = await execute(id, `
      const summary = document.querySelector('header summary');
      if (!summary) return false;
      const rect = summary.getBoundingClientRect();
      return rect.width >= 40 && rect.height >= 40 && getComputedStyle(summary).display !== 'none';
    `);
    assert.equal(mobileMenu, true, `${viewportLabel}: menu mobile não utilizável`);
  }

  const homeJourney = await execute(id, `
    const text = document.body.innerText;
    return {
      hasCommercial: text.includes('Conhecer soluções') && text.includes('Falar com a BravSystems'),
      hasClientAccess: text.includes('Entrar / Meus Sistemas'),
      heroProducts: [...document.querySelectorAll('[data-hero-ecosystem] a')].map(a => a.textContent.trim()),
    };
  `);
  assert.equal(homeJourney.hasCommercial, true, `${viewportLabel}: jornada comercial ausente`);
  assert.equal(homeJourney.hasClientAccess, true, `${viewportLabel}: jornada de cliente ausente`);
  assert.equal(homeJourney.heroProducts.length, 6, `${viewportLabel}: Hero não representa os seis produtos`);
  await capture(id, `${viewportLabel}-01-home`);

  await scrollToTarget(id, "#inicio");
  await capture(id, `${viewportLabel}-02-hero`);

  await scrollToTarget(id, "#produtos");
  const products = await execute(id, `
    return [...document.querySelectorAll('#produtos article')].map(article => ({
      name: article.querySelector('h3')?.textContent?.trim() || '',
      text: article.textContent || '',
    }));
  `);
  assert.deepEqual(products.map((item) => item.name), ["BravOS", "BravHAS", "BravHOS", "BravMsg", "BravAcademy", "BravVideo"]);
  const academyCard = products.find((item) => item.name === "BravAcademy");
  assert.ok(academyCard?.text.includes("Em homologação"), `${viewportLabel}: BravAcademy sem status de homologação no portfólio`);
  await capture(id, `${viewportLabel}-03-portfolio`);

  await scrollToTarget(id, "#bravacademy", "center");
  const academy = await execute(id, `
    const section = document.querySelector('#bravacademy');
    return {
      text: section?.textContent || '',
      hasLink: Boolean(section?.querySelector('a[href="/bravacademy"]')),
      journeySteps: section?.querySelectorAll('[aria-label="Jornada de aprendizagem do BravAcademy"] > div:last-child > div').length || 0,
    };
  `);
  assert.ok(academy.text.includes("EM HOMOLOGAÇÃO"), `${viewportLabel}: destaque BravAcademy sem homologação`);
  assert.equal(academy.hasLink, true, `${viewportLabel}: CTA Conhecer BravAcademy ausente`);
  assert.equal(academy.journeySteps, 5, `${viewportLabel}: composição institucional BravAcademy incompleta`);
  await capture(id, `${viewportLabel}-04-bravacademy`);

  await scrollToTarget(id, "#bravos", "center");
  const bravos = await execute(id, `
    const section = document.querySelector('#bravos');
    const image = section?.querySelector('img');
    return {
      text: section?.textContent || '',
      imageSrc: image?.getAttribute('src') || '',
      imageWidth: image?.naturalWidth || 0,
    };
  `);
  assert.ok(bravos.text.includes("A operação acontece em tempo real. Sua gestão também deveria."), `${viewportLabel}: destaque BravOS ausente`);
  assert.ok(bravos.imageSrc.includes("bravos-hero-approved.webp"), `${viewportLabel}: asset BravOS aprovado não utilizado`);
  assert.ok(bravos.imageWidth > 0, `${viewportLabel}: asset BravOS não carregou`);
  await capture(id, `${viewportLabel}-05-bravos`);

  await navigate(id, "/meus-sistemas");
  const aliasUrl = await wd("GET", `/session/${id}/url`);
  assert.ok(aliasUrl.endsWith("/acessar"), `${viewportLabel}: /meus-sistemas não redireciona para /acessar`);
  const access = await auditPage(id, `${viewportLabel}/acessar`);
  assert.equal(access.h1, "Seus sistemas BravSystems em um único lugar.");
  const accessCards = await execute(id, `
    const section = document.querySelector('#sistemas');
    return {
      names: [...section.querySelectorAll('article h3')].map(el => el.textContent.trim()),
      activeLogins: [...section.querySelectorAll('a')].filter(a => /^Acessar Brav/.test(a.textContent.trim())).length,
      blockedCtas: [...section.querySelectorAll('article')].filter(article => article.textContent.includes('ACESSO EM IMPLANTAÇÃO')).length,
      academyText: [...section.querySelectorAll('article')].find(article => article.querySelector('h3')?.textContent.trim() === 'BravAcademy')?.textContent || '',
    };
  `);
  assert.deepEqual(accessCards.names, ["BravOS", "BravHAS", "BravHOS", "BravMsg", "BravAcademy", "BravVideo"]);
  assert.equal(accessCards.activeLogins, 0, `${viewportLabel}: CI não deve ativar login sem URL oficial`);
  assert.equal(accessCards.blockedCtas, 6, `${viewportLabel}: CTAs sem URL deveriam permanecer bloqueados`);
  assert.ok(accessCards.academyText.includes("EM HOMOLOGAÇÃO"), `${viewportLabel}: BravAcademy sem status correto na Central`);
  await scrollToTarget(id, "#sistemas");
  await capture(id, `${viewportLabel}-06-central-acesso`);

  await navigate(id, "/");
  await scrollToTarget(id, "#contato");
  const formPresent = await execute(id, `
    const section = document.querySelector('#contato');
    const form = section?.querySelector('form');
    if (!form) return false;
    const rect = section.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
  `);
  assert.equal(formPresent, true, `${viewportLabel}: formulário comercial não está visível na evidência`);
  await capture(id, `${viewportLabel}-07-contato`);

  await scrollToTarget(id, "footer", "end");
  const footerAccess = await execute(id, `
    const footer = document.querySelector('footer');
    if (!footer) return false;
    const rect = footer.getBoundingClientRect();
    const hasAccess = [...footer.querySelectorAll('a')].some(a => a.getAttribute('href') === '/acessar' && a.textContent.includes('Meus Sistemas'));
    return hasAccess && rect.bottom > 0 && rect.top < window.innerHeight;
  `);
  assert.equal(footerAccess, true, `${viewportLabel}: footer/Meus Sistemas não está visível na evidência`);
  await capture(id, `${viewportLabel}-08-footer`);

  return { home, access, accessCards };
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
    const result = await captureEvidence(id, label, width);
    console.log(`PORTAL_${label}_RESULT=${JSON.stringify({
      viewport: { width, height },
      homeTitle: result.home.title,
      accessTitle: result.access.title,
      accessProducts: result.accessCards.names.length,
      activeLoginsInCI: result.accessCards.activeLogins,
      blockedCtasInCI: result.accessCards.blockedCtas,
    })}`);
  } finally {
    await wd("DELETE", `/session/${id}`).catch(() => {});
  }
}

test("Portal SaaS BravSystems — ecossistema e BravAcademy em desktop/mobile", { timeout: 180_000 }, async () => {
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
