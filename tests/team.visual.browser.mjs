import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";

const APP_PORT = 3013;
const DRIVER_PORT = 9523;
const appBase = `http://127.0.0.1:${APP_PORT}`;
const driverBase = `http://127.0.0.1:${DRIVER_PORT}`;
const evidenceDir = new URL("../artifacts/browser/", import.meta.url);
const approvedSlugs = ["atlas", "forge", "sentry", "orion", "sofia", "vega", "lira", "marco"];
const menuLabels = ["Ecossistema", "Destaques", "Por que BravSystems", "Equipe", "Central", "Contato", "Falar com especialista", "Entrar / Meus Sistemas"];

function startService(command, args) {
  return spawn(command, args, { stdio: "ignore", env: process.env, detached: true });
}
function stopService(child) {
  if (!child?.pid) return;
  try { process.kill(-child.pid, "SIGTERM"); } catch { try { child.kill("SIGTERM"); } catch {} }
}
async function waitFor(url, attempts = 90) {
  for (let i = 0; i < attempts; i += 1) {
    try { const response = await fetch(url); if (response.ok) return; } catch {}
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
async function capture(id, label) {
  const png = await wd("GET", `/session/${id}/screenshot`);
  assert.ok(typeof png === "string" && png.length > 1000, `${label}: screenshot não gerado`);
  await writeFile(new URL(`${label}.png`, evidenceDir), Buffer.from(png, "base64"));
}
async function portraitState(id, slug) {
  await execute(id, `document.querySelector('[data-team-member="${slug}"]')?.scrollIntoView({block:'center', behavior:'instant'}); return true;`);
  for (let attempt = 0; attempt < 40; attempt += 1) {
    const state = await execute(id, `
      const card = document.querySelector('[data-team-member="${slug}"]');
      const img = card?.querySelector('img');
      return {found:!!img, complete:!!img?.complete, w:img?.naturalWidth||0, h:img?.naturalHeight||0, src:img?.currentSrc||img?.getAttribute('src')||'', pending:!!card?.querySelector('[data-portrait-status="pending"]')};
    `);
    if (state.found && state.complete && state.w > 0 && state.h > 0) return state;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  return execute(id, `
    const card = document.querySelector('[data-team-member="${slug}"]');
    const img = card?.querySelector('img');
    return {found:!!img, complete:!!img?.complete, w:img?.naturalWidth||0, h:img?.naturalHeight||0, src:img?.currentSrc||img?.getAttribute('src')||'', pending:!!card?.querySelector('[data-portrait-status="pending"]')};
  `);
}

async function runViewport(width, height, label) {
  const session = await wd("POST", "/session", {
    capabilities: { alwaysMatch: { browserName: "chrome", "goog:chromeOptions": { args: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage", `--window-size=${width},${height}`] } } },
  });
  const id = session.sessionId;
  try {
    await wd("POST", `/session/${id}/window/rect`, { width, height, x: 0, y: 0 });
    await wd("POST", `/session/${id}/url`, { url: `${appBase}/equipe` });
    await new Promise((resolve) => setTimeout(resolve, 300));

    const pageState = await execute(id, `return { overflow: document.documentElement.scrollWidth > window.innerWidth, width: window.innerWidth };`);
    assert.equal(pageState.overflow, false, `${label}: overflow horizontal`);

    for (const slug of approvedSlugs) {
      const state = await portraitState(id, slug);
      assert.equal(state.found, true, `${label}: ${slug} sem img`);
      assert.equal(state.complete, true, `${label}: ${slug} incompleto`);
      assert.ok(state.w >= 1200 && state.h >= 1200, `${label}: ${slug} resolução natural insuficiente ${state.w}x${state.h}`);
      assert.ok(state.src.includes(`/team/${slug}.jpg`), `${label}: ${slug} src incorreto`);
      assert.equal(state.pending, false, `${label}: ${slug} com placeholder`);
    }

    await execute(id, `window.scrollTo({top:0, behavior:'instant'}); return true;`);
    await capture(id, `${label}-topo-fechado`);

    if (width <= 430) {
      const menu = await execute(id, `
        const details = document.querySelector('header details');
        details.open = true;
        const nav = details.querySelector('nav[aria-label="Navegação responsiva"]');
        const r = nav.getBoundingClientRect();
        const items = [...nav.querySelectorAll('a')].map(a => { const x=a.getBoundingClientRect(); return {text:a.textContent.trim(), left:x.left, right:x.right, top:x.top, bottom:x.bottom}; });
        return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,innerWidth:window.innerWidth,innerHeight:window.innerHeight,items};
      `);
      assert.ok(menu.left >= 0 && menu.right <= menu.innerWidth + 0.5, `${label}: menu fora da largura da viewport`);
      assert.ok(menu.top >= 0 && menu.bottom <= menu.innerHeight + 0.5, `${label}: menu fora da altura da viewport`);
      assert.deepEqual(menu.items.map((item) => item.text), menuLabels, `${label}: itens do menu divergentes`);
      for (const item of menu.items) {
        assert.ok(item.left >= 0 && item.right <= menu.innerWidth + 0.5, `${label}: item ${item.text} cortado lateralmente`);
        assert.ok(item.top >= 0 && item.bottom <= menu.innerHeight + 0.5, `${label}: item ${item.text} cortado verticalmente`);
      }
      await capture(id, `${label}-menu-aberto`);
      await execute(id, `document.querySelector('header details').open = false; return true;`);
    }

    for (const slug of ["lira", "marco"]) {
      await portraitState(id, slug);
      await capture(id, `${label}-${slug}`);
    }
  } finally {
    await wd("DELETE", `/session/${id}`).catch(() => {});
  }
}

test("TEAM visual — Chromium 390/430/768/1440", { timeout: 240_000 }, async () => {
  await mkdir(evidenceDir, { recursive: true });
  const app = startService("npm", ["start", "--", "-p", String(APP_PORT)]);
  const driver = startService("chromedriver", [`--port=${DRIVER_PORT}`]);
  try {
    await waitFor(`${appBase}/equipe`);
    await waitFor(`${driverBase}/status`);
    await runViewport(390, 844, "CHROMIUM_390x844");
    await runViewport(430, 932, "CHROMIUM_430x932");
    await runViewport(768, 1024, "CHROMIUM_768x1024");
    await runViewport(1440, 1000, "CHROMIUM_1440x1000");
  } finally {
    stopService(app);
    stopService(driver);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
});
