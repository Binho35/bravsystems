import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";

const APP_PORT = 3016;
const DRIVER_PORT = 9526;
const appBase = `http://127.0.0.1:${APP_PORT}`;
const driverBase = `http://127.0.0.1:${DRIVER_PORT}`;
const evidenceDir = new URL("../artifacts/browser/", import.meta.url);
const labels = ["Cursos", "Trilhas", "Avaliações", "Progresso", "Certificação"];

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
  assert.ok(typeof png === "string" && png.length > 1000, `${label}: screenshot ausente`);
  await writeFile(new URL(`${label}.png`, evidenceDir), Buffer.from(png, "base64"));
}

async function runViewport(width, height, label) {
  const session = await wd("POST", "/session", {
    capabilities: { alwaysMatch: { browserName: "chrome", "goog:chromeOptions": { args: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage", `--window-size=${width},${height}`] } } },
  });
  const id = session.sessionId;
  try {
    await wd("POST", `/session/${id}/window/rect`, { width, height, x: 0, y: 0 });
    await wd("POST", `/session/${id}/url`, { url: appBase });
    const state = await execute(id, `
      const journey = document.querySelector('[aria-label="Jornada de aprendizagem do BravAcademy"]');
      journey?.scrollIntoView({block:'center', behavior:'instant'});
      const items = journey ? [...journey.children].map((card) => {
        const label = card.lastElementChild;
        const r = card.getBoundingClientRect();
        const s = label ? getComputedStyle(label) : null;
        return {
          text: label?.textContent?.trim() || '',
          left:r.left, right:r.right,
          clientWidth:label?.clientWidth || 0,
          scrollWidth:label?.scrollWidth || 0,
          textOverflow:s?.textOverflow || '',
          whiteSpace:s?.whiteSpace || ''
        };
      }) : [];
      return {
        found:!!journey,
        overflow:document.documentElement.scrollWidth > window.innerWidth,
        innerWidth:window.innerWidth,
        items
      };
    `);
    assert.equal(state.found, true, `${label}: jornada ausente`);
    assert.equal(state.overflow, false, `${label}: overflow horizontal`);
    assert.deepEqual(state.items.map((item) => item.text), labels, `${label}: labels divergentes`);
    for (const item of state.items) {
      assert.ok(item.left >= 0 && item.right <= state.innerWidth + 0.5, `${label}: ${item.text} fora da viewport`);
      assert.ok(item.scrollWidth <= item.clientWidth + 1, `${label}: ${item.text} possui clipping horizontal`);
      assert.notEqual(item.textOverflow, "ellipsis", `${label}: ${item.text} usa ellipsis`);
      assert.notEqual(item.whiteSpace, "nowrap", `${label}: ${item.text} impede quebra de linha`);
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
    await capture(id, `${label}-bravacademy-jornada`);
  } finally {
    await wd("DELETE", `/session/${id}`).catch(() => {});
  }
}

test("BravAcademy — jornada sem truncamento em mobile Chromium", { timeout: 120_000 }, async () => {
  await mkdir(evidenceDir, { recursive: true });
  const app = startService("npm", ["start", "--", "-p", String(APP_PORT)]);
  const driver = startService("chromedriver", [`--port=${DRIVER_PORT}`]);
  try {
    await waitFor(appBase);
    await waitFor(`${driverBase}/status`);
    await runViewport(390, 844, "SITE_AUDIT_CHROMIUM_390x844");
    await runViewport(430, 932, "SITE_AUDIT_CHROMIUM_430x932");
  } finally {
    stopService(app);
    stopService(driver);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
});
