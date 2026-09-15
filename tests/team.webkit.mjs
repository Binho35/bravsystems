import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { webkit } from "playwright";

const APP_PORT = 3014;
const appBase = `http://127.0.0.1:${APP_PORT}`;
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

async function waitForPortrait(page, slug, label) {
  const card = page.locator(`[data-team-member="${slug}"]`);
  await card.scrollIntoViewIfNeeded();
  await page.waitForFunction(
    (memberSlug) => {
      const cardNode = document.querySelector(`[data-team-member="${memberSlug}"]`);
      const img = cardNode?.querySelector("img");
      return Boolean(img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0);
    },
    slug,
    { timeout: 5000 },
  );
  const state = await card.locator("img").evaluate((img) => ({
    complete: img.complete,
    width: img.naturalWidth,
    height: img.naturalHeight,
    src: img.currentSrc || img.getAttribute("src") || "",
  }));
  assert.equal(state.complete, true, `${label}: ${slug} incompleto`);
  assert.ok(state.width >= 1200 && state.height >= 1200, `${label}: ${slug} resolução ${state.width}x${state.height}`);
  assert.ok(state.src.includes(`/team/${slug}.jpg`), `${label}: ${slug} src incorreto`);
  assert.equal(await card.locator('[data-portrait-status="pending"]').count(), 0, `${label}: ${slug} com placeholder`);
  return card;
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
    await page.waitForTimeout(250);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    assert.equal(overflow, false, `${label}: overflow horizontal`);

    for (const slug of approvedSlugs) {
      await waitForPortrait(page, slug, label);
    }

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.locator("header details summary").click();
    const menu = page.locator('header nav[aria-label="Navegação responsiva"]');
    await menu.waitFor({ state: "visible" });
    const menuBox = await menu.boundingBox();
    assert.ok(menuBox, `${label}: menu sem bounding box`);
    assert.ok(menuBox.x >= 0 && menuBox.x + menuBox.width <= width + 0.5, `${label}: menu cortado lateralmente`);
    assert.ok(menuBox.y >= 0 && menuBox.y + menuBox.height <= height + 0.5, `${label}: menu cortado verticalmente`);

    const menuItems = menu.locator("a");
    assert.equal(await menuItems.count(), menuLabels.length, `${label}: quantidade de itens incorreta`);
    for (let i = 0; i < menuLabels.length; i += 1) {
      const item = menuItems.nth(i);
      assert.equal((await item.innerText()).trim(), menuLabels[i], `${label}: item ${i} divergente`);
      const box = await item.boundingBox();
      assert.ok(box, `${label}: ${menuLabels[i]} invisível`);
      assert.ok(box.x >= 0 && box.x + box.width <= width + 0.5, `${label}: ${menuLabels[i]} cortado lateralmente`);
      assert.ok(box.y >= 0 && box.y + box.height <= height + 0.5, `${label}: ${menuLabels[i]} cortado verticalmente`);
    }
    await page.screenshot({ path: new URL(`${label}-menu-aberto.png`, evidenceDir).pathname });

    await page.locator("header details summary").click();
    for (const slug of ["lira", "marco"]) {
      await waitForPortrait(page, slug, label);
      await page.screenshot({ path: new URL(`${label}-${slug}.png`, evidenceDir).pathname });
    }

    assert.deepEqual(pageErrors, [], `${label}: page errors: ${pageErrors.join(" | ")}`);
    assert.deepEqual(consoleErrors, [], `${label}: console errors: ${consoleErrors.join(" | ")}`);
  } finally {
    await page.close();
  }
}

test("TEAM — WebKit equivalente a Safari em 390 e 430", { timeout: 240_000 }, async () => {
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
