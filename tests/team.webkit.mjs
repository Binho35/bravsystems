import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { webkit } from "playwright";

const APP_PORT = 3014;
const appBase = `http://127.0.0.1:${APP_PORT}`;
const evidenceDir = new URL("../artifacts/browser/", import.meta.url);
const menuLabels = ["Empresa", "Soluções", "Gestão", "Nossa visão", "Contato", "Fale conosco", "Meus Sistemas"];
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

async function runViewport(browser, width, height, label) {
  const page = await browser.newPage({ viewport: { width, height } });
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  try {
    const response = await page.goto(`${appBase}/equipe`, { waitUntil: "domcontentloaded" });
    assert.ok(response && response.status() < 500, `${label}: HTTP ${response?.status()}`);

    const cards = page.locator("[data-team-member]");
    assert.equal(await cards.count(), 2, `${label}: equipe pública deve ter exatamente dois perfis`);
    assert.deepEqual(
      await cards.evaluateAll((els) => els.map((el) => el.getAttribute("data-team-member"))),
      ["robson", "harpia"],
    );

    for (const slug of ["robson", "harpia"]) {
      const card = page.locator(`[data-team-member="${slug}"]`);
      const image = card.locator("img");
      await image.waitFor({ state: "visible" });
      await page.waitForFunction((memberSlug) => {
        const img = document.querySelector(`[data-team-member="${memberSlug}"] img`);
        return Boolean(img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0);
      }, slug, { timeout: 5000 });
    }

    const body = await page.locator("body").innerText();
    for (const name of forbidden) assert.equal(body.includes(name), false, `${label}: ${name} ainda está público`);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${label}: overflow horizontal`);

    await page.locator("header details summary").click();
    const menu = page.locator('header nav[aria-label="Navegação responsiva"]');
    await menu.waitFor({ state: "visible" });
    assert.deepEqual((await menu.locator("a").allInnerTexts()).map((item) => item.trim()), menuLabels);
    const box = await menu.boundingBox();
    assert.ok(box && box.x >= 0 && box.x + box.width <= width + .5, `${label}: menu cortado lateralmente`);
    assert.ok(box && box.y >= 0 && box.y + box.height <= height + .5, `${label}: menu cortado verticalmente`);

    await page.screenshot({ path: new URL(`${label}-robson-harpia.png`, evidenceDir).pathname });
    assert.deepEqual(pageErrors, [], `${label}: page errors: ${pageErrors.join(" | ")}`);
    assert.deepEqual(consoleErrors, [], `${label}: console errors: ${consoleErrors.join(" | ")}`);
  } finally {
    await page.close();
  }
}

test("TEAM — Robson + Harpia no WebKit equivalente a Safari", { timeout: 240_000 }, async () => {
  await mkdir(evidenceDir, { recursive: true });
  const app = startService("npm", ["start", "--", "-p", String(APP_PORT)]);
  let browser;
  try {
    await waitFor(`${appBase}/equipe`);
    browser = await webkit.launch({ headless: true });
    await runViewport(browser, 390, 844, "WEBKIT_390x844");
    await runViewport(browser, 430, 932, "WEBKIT_430x932");
  } finally {
    await browser?.close().catch(() => {});
    stopService(app);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
});
