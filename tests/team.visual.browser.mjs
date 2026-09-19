import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";

const APP_PORT = 3013;
const DRIVER_PORT = 9523;
const appBase = `http://127.0.0.1:${APP_PORT}`;
const driverBase = `http://127.0.0.1:${DRIVER_PORT}`;
const evidenceDir = new URL("../artifacts/browser/", import.meta.url);
const menuLabels = ["Empresa", "Soluções", "Gestão", "Nossa visão", "Contato", "Fale conosco", "Meus Sistemas"];

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
    capabilities: { alwaysMatch: { browserName: "chrome", "goog:chromeOptions": { args: ["--headless=new","--no-sandbox","--disable-dev-shm-usage",`--window-size=${width},${height}`] } } },
  });
  const id = session.sessionId;
  try {
    await wd("POST", `/session/${id}/window/rect`, { width, height, x: 0, y: 0 });
    await wd("POST", `/session/${id}/url`, { url: `${appBase}/equipe` });
    await new Promise((resolve) => setTimeout(resolve, 300));

    const state = await execute(id, `
      const cards = [...document.querySelectorAll('[data-team-member]')];
      return {
        slugs: cards.map(card => card.getAttribute('data-team-member')),
        loaded: cards.every(card => { const img=card.querySelector('img'); return !!img && img.complete && img.naturalWidth>0 && img.naturalHeight>0; }),
        overflow: document.documentElement.scrollWidth > innerWidth,
      };
    `);
    assert.equal(state.overflow, false, `${label}: overflow horizontal`);
    assert.deepEqual(state.slugs, ["robson", "harpia"]);
    assert.equal(state.loaded, true, `${label}: retratos institucionais não carregaram`);

    await capture(id, `${label}-robson-harpia`);

    if (width <= 430) {
      const menu = await execute(id, `
        const details = document.querySelector('header details');
        details.open = true;
        const nav = details.querySelector('nav[aria-label="Navegação responsiva"]');
        const box = nav.getBoundingClientRect();
        return {
          labels: [...nav.querySelectorAll('a')].map(a => a.textContent.trim()),
          box: {left:box.left,right:box.right,top:box.top,bottom:box.bottom},
          innerWidth, innerHeight
        };
      `);
      assert.deepEqual(menu.labels, menuLabels);
      assert.ok(menu.box.left >= 0 && menu.box.right <= menu.innerWidth + .5, `${label}: menu cortado lateralmente`);
      assert.ok(menu.box.top >= 0 && menu.box.bottom <= menu.innerHeight + .5, `${label}: menu cortado verticalmente`);
      await capture(id, `${label}-menu`);
    }
  } finally {
    await wd("DELETE", `/session/${id}`).catch(() => {});
  }
}

test("TEAM visual — Robson + Harpia em 390/430/768/1440", { timeout: 240_000 }, async () => {
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
