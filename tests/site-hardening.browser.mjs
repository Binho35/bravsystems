import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";

const APP_PORT = 3012;
const DRIVER_PORT = 9522;
const appBase = `http://127.0.0.1:${APP_PORT}`;
const driverBase = `http://127.0.0.1:${DRIVER_PORT}`;
const evidenceDir = new URL("../artifacts/browser/", import.meta.url);

function startService(command, args) {
  return spawn(command, args, { stdio: "ignore", env: process.env, detached: true });
}

function stopService(child) {
  if (!child?.pid) return;
  try { process.kill(-child.pid, "SIGTERM"); } catch { try { child.kill("SIGTERM"); } catch {} }
}

async function waitFor(url, attempts = 90) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url, { redirect: "manual" });
      if (response.status > 0) return;
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

async function waitForBrowser(id, predicate, label, attempts = 40) {
  for (let i = 0; i < attempts; i += 1) {
    const ready = await execute(id, `return Boolean(${predicate});`);
    if (ready) return;
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  throw new Error(`Timeout aguardando renderização: ${label}`);
}

async function capture(id, label) {
  const png = await wd("GET", `/session/${id}/screenshot`);
  assert.ok(typeof png === "string" && png.length > 1000, `${label}: screenshot não gerado`);
  await writeFile(new URL(`${label}.png`, evidenceDir), Buffer.from(png, "base64"));
}

async function createSession(width, height) {
  const session = await wd("POST", "/session", {
    capabilities: {
      alwaysMatch: {
        browserName: "chrome",
        "goog:chromeOptions": {
          args: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage", "--force-device-scale-factor=1", `--window-size=${width},${height}`],
        },
      },
    },
  });
  await wd("POST", `/session/${session.sessionId}/window/rect`, { width, height, x: 0, y: 0 });
  return session.sessionId;
}

test("SITE HARDENING — navegação tablet, status, redirect legal e 404", { timeout: 180_000 }, async () => {
  await mkdir(evidenceDir, { recursive: true });
  const app = startService("npm", ["start", "--", "-p", String(APP_PORT)]);
  const driver = startService("chromedriver", [`--port=${DRIVER_PORT}`]);

  try {
    await waitFor(`${appBase}/`);
    await waitFor(`${driverBase}/status`);
    const id = await createSession(768, 1024);

    try {
      await wd("POST", `/session/${id}/url`, { url: `${appBase}/` });
      await waitForBrowser(id, `document.readyState === 'complete' && document.querySelector('header summary')`, "Home/header");
      const header = await execute(id, `
        const summary = document.querySelector('header summary');
        const desktopNav = document.querySelector('header nav[aria-label="Navegação principal"]');
        return {
          overflowX: document.documentElement.scrollWidth > innerWidth,
          summaryVisible: Boolean(summary && getComputedStyle(summary).display !== 'none' && summary.getBoundingClientRect().width >= 44),
          desktopNavVisible: Boolean(desktopNav && getComputedStyle(desktopNav).display !== 'none'),
        };
      `);
      assert.equal(header.overflowX, false, "tablet: overflow horizontal");
      assert.equal(header.summaryVisible, true, "tablet: menu responsivo ausente ou alvo menor que 44px");
      assert.equal(header.desktopNavVisible, false, "tablet: nav desktop deveria aguardar XL");

      await execute(id, `document.querySelector('header summary')?.click(); return true;`);
      await waitForBrowser(id, `document.querySelector('header nav[aria-label="Navegação responsiva"]')?.getBoundingClientRect().height > 0`, "menu responsivo aberto");
      const menu = await execute(id, `
        const nav = document.querySelector('header nav[aria-label="Navegação responsiva"]');
        return {
          visible: Boolean(nav && nav.getBoundingClientRect().height > 0),
          labels: [...(nav?.querySelectorAll('a') || [])].map(a => a.textContent.trim()),
        };
      `);
      assert.equal(menu.visible, true, "tablet: menu não abriu");
      for (const label of ["Ecossistema", "Equipe", "Central", "Contato"]) assert.ok(menu.labels.includes(label), `tablet: ${label} ausente`);
      await capture(id, "TABLET_768x1024-13-header-menu");

      await wd("POST", `/session/${id}/url`, { url: `${appBase}/bravvideo` });
      await waitForBrowser(id, `document.readyState === 'complete' && document.querySelector('h1')?.textContent?.includes('Uma frente experimental') && document.body.innerText.includes('Em desenvolvimento')`, "BravVideo com status governado");
      const bravvideo = await execute(id, `return { text: document.body.innerText, overflowX: document.documentElement.scrollWidth > innerWidth, url: location.pathname };`);
      assert.equal(bravvideo.url, "/bravvideo", "BravVideo: navegação não concluiu");
      assert.equal(bravvideo.overflowX, false, "BravVideo: overflow horizontal");
      assert.ok(bravvideo.text.includes("Em desenvolvimento"), "BravVideo: status Em desenvolvimento ausente");
      assert.ok(bravvideo.text.includes("Tecnologia em desenvolvimento"), "BravVideo: transparência de maturidade ausente");
      assert.equal(bravvideo.text.includes("Tecnologia em homologação"), false, "BravVideo: limitação antiga ainda visível");
      await capture(id, "TABLET_768x1024-14-bravvideo-status");

      const legacy = await fetch(`${appBase}/privacidade`, { redirect: "manual" });
      assert.ok([307, 308].includes(legacy.status), `privacidade: redirect esperado, recebido ${legacy.status}`);
      assert.equal(legacy.headers.get("location"), "/politica-de-privacidade");

      await wd("POST", `/session/${id}/url`, { url: `${appBase}/rota-que-nao-existe-argos` });
      await waitForBrowser(id, `document.readyState === 'complete' && document.body.innerText.includes('Esta página não faz parte do caminho atual.')`, "404 institucional");
      const notFound = await execute(id, `return { text: document.body.innerText, overflowX: document.documentElement.scrollWidth > innerWidth, robots: document.querySelector('meta[name="robots"]')?.content || '' };`);
      assert.equal(notFound.overflowX, false, "404: overflow horizontal");
      assert.ok(notFound.text.includes("Esta página não faz parte do caminho atual."), "404 institucional ausente");
      assert.ok(notFound.text.includes("Voltar para o início"), "404 sem CTA de retorno");
      assert.ok(notFound.robots.includes("noindex"), "404 sem noindex");
      await capture(id, "TABLET_768x1024-15-404");

      console.log(`SITE_HARDENING_TABLET_RESULT=${JSON.stringify({ viewport: { width: 768, height: 1024 }, menu: true, bravvideoStatus: "Em desenvolvimento", privacyRedirect: legacy.status, branded404: true, noindex404: true })}`);
    } finally {
      await wd("DELETE", `/session/${id}`).catch(() => {});
    }
  } finally {
    stopService(app);
    stopService(driver);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
});
