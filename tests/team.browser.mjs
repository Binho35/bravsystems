import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";

const APP_PORT = 3011;
const DRIVER_PORT = 9521;
const appBase = `http://127.0.0.1:${APP_PORT}`;
const driverBase = `http://127.0.0.1:${DRIVER_PORT}`;
const evidenceDir = new URL("../artifacts/browser/", import.meta.url);
const expected = [
  { slug: "robson", name: "Robson", src: "/team/robson.svg" },
  { slug: "harpia", name: "Harpia", src: "/bravsystems-logo.png" },
];
const forbidden = ["Argos","Atlas","Forge","Sentry","Scout","Pulse","Nexus","Orion","Sofia","Vega","Lira","Marco"];

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
      const cards = [...document.querySelectorAll('[data-team-member]')].map(card => {
        const img = card.querySelector('img');
        return {
          slug: card.getAttribute('data-team-member'),
          name: card.querySelector('h2')?.textContent?.trim() || '',
          src: img?.currentSrc || img?.getAttribute('src') || '',
          loaded: Boolean(img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0),
        };
      });
      return {
        cards,
        body: document.body.innerText,
        overflow: document.documentElement.scrollWidth > innerWidth,
        technical: [...document.querySelectorAll('a[href]')].some(a => /\.vercel\.app|hostingersite\.com|-git-/.test(a.href)),
      };
    `);

    assert.equal(state.overflow, false, `${label}: overflow horizontal`);
    assert.equal(state.technical, false, `${label}: hostname técnico exposto`);
    assert.equal(state.cards.length, 2, `${label}: equipe deve conter exatamente 2 perfis`);
    assert.deepEqual(state.cards.map((item) => item.slug), expected.map((item) => item.slug));
    assert.deepEqual(state.cards.map((item) => item.name), expected.map((item) => item.name));

    for (const item of expected) {
      const card = state.cards.find((entry) => entry.slug === item.slug);
      assert.ok(card?.loaded, `${label}: imagem de ${item.name} não carregou`);
      assert.ok(card?.src.includes(item.src), `${label}: imagem de ${item.name} incorreta`);
    }
    for (const name of forbidden) assert.equal(state.body.includes(name), false, `${label}: ${name} ainda está público`);

    await capture(id, `${label}-equipe-robson-harpia`);
  } finally {
    await wd("DELETE", `/session/${id}`).catch(() => {});
  }
}

test("TEAM — somente Robson e Harpia em desktop e mobile", { timeout: 180_000 }, async () => {
  await mkdir(evidenceDir, { recursive: true });
  const app = startService("npm", ["start", "--", "-p", String(APP_PORT)]);
  const driver = startService("chromedriver", [`--port=${DRIVER_PORT}`]);
  try {
    await waitFor(`${appBase}/equipe`);
    await waitFor(`${driverBase}/status`);
    await runViewport(1440, 1000, "DESKTOP_1440x1000");
    await runViewport(390, 844, "MOBILE_390x844");
  } finally {
    stopService(app);
    stopService(driver);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
});
