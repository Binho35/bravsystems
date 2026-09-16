import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";

const APP_PORT = 3013;
const DRIVER_PORT = 9523;
const appBase = `http://127.0.0.1:${APP_PORT}`;
const driverBase = `http://127.0.0.1:${DRIVER_PORT}`;
const evidenceDir = new URL("../artifacts/browser/", import.meta.url);
const portraitPaths = {
  argos: "/team/argos.svg",
  atlas: "/team/atlas.jpg",
  forge: "/team/forge.jpg",
  sentry: "/team/sentry.jpg",
  scout: "/team/scout.svg",
  pulse: "/team/pulse.svg",
  nexus: "/team/nexus.svg",
  orion: "/team/orion.jpg",
  sofia: "/team/sofia.jpg",
  vega: "/team/vega.jpg",
  lira: "/team/lira.jpg",
  marco: "/team/marco.jpg",
};
const approvedSlugs = Object.keys(portraitPaths);
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

async function runViewport(width, height, label) {
  const session = await wd("POST", "/session", {
    capabilities: { alwaysMatch: { browserName: "chrome", "goog:chromeOptions": { args: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage", `--window-size=${width},${height}`] } } },
  });
  const id = session.sessionId;
  try {
    await wd("POST", `/session/${id}/window/rect`, { width, height, x: 0, y: 0 });
    await wd("POST", `/session/${id}/url`, { url: `${appBase}/equipe` });
    await new Promise((resolve) => setTimeout(resolve, 300));

    const pageState = await execute(id, `return {
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      width: window.innerWidth,
      pending: document.querySelectorAll('[data-portrait-status="pending"]').length,
      founderSrc: document.querySelector('[data-team-founder] img')?.currentSrc || document.querySelector('[data-team-founder] img')?.getAttribute('src') || '',
      founderLoaded: (() => { const img = document.querySelector('[data-team-founder] img'); return !!img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0; })(),
    };`);
    assert.equal(pageState.overflow, false, `${label}: overflow horizontal`);
    assert.equal(pageState.pending, 0, `${label}: placeholder pendente detectado`);
    assert.equal(pageState.founderLoaded, true, `${label}: retrato de Robson não carregou`);
    assert.ok(pageState.founderSrc.includes('/team/robson.svg'), `${label}: src de Robson incorreto`);

    for (const slug of approvedSlugs) {
      const state = await execute(id, `
        const card = document.querySelector('[data-team-member="${slug}"]');
        card?.scrollIntoView({block:'center', behavior:'instant'});
        const img = card?.querySelector('img');
        return {found:!!img, complete:!!img?.complete, w:img?.naturalWidth||0, h:img?.naturalHeight||0, src:img?.currentSrc||img?.getAttribute('src')||'', pending:!!card?.querySelector('[data-portrait-status="pending"]')};
      `);
      assert.equal(state.found, true, `${label}: ${slug} sem img`);
      if (!state.complete || state.w <= 0 || state.h <= 0) {
        for (let attempt = 0; attempt < 20; attempt += 1) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          const next = await execute(id, `
            const img = document.querySelector('[data-team-member="${slug}"] img');
            return {complete:!!img?.complete, w:img?.naturalWidth||0, h:img?.naturalHeight||0};
          `);
          state.complete = next.complete;
          state.w = next.w;
          state.h = next.h;
          if (state.complete && state.w > 0 && state.h > 0) break;
        }
      }
      assert.equal(state.complete, true, `${label}: ${slug} incompleto`);
      assert.ok(state.w > 0 && state.h > 0, `${label}: ${slug} dimensões naturais inválidas ${state.w}x${state.h}`);
      assert.ok(state.src.includes(portraitPaths[slug]), `${label}: ${slug} src incorreto`);
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
    }

    for (const slug of ["argos", "scout", "pulse", "nexus", "lira", "marco"]) {
      await execute(id, `document.querySelector('[data-team-member="${slug}"]')?.scrollIntoView({block:'center', behavior:'instant'}); return true;`);
      await new Promise((resolve) => setTimeout(resolve, 250));
      await capture(id, `${label}-${slug}`);
    }
  } finally {
    await wd("DELETE", `/session/${id}`).catch(() => {});
  }
}

test("TEAM visual — 13 retratos em Chromium 390/430/768/1440", { timeout: 240_000 }, async () => {
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
