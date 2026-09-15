import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { webkit } from "playwright";

const APP_PORT = 3017;
const appBase = `http://127.0.0.1:${APP_PORT}`;
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

async function runViewport(browser, width, height, label) {
  const page = await browser.newPage({ viewport: { width, height } });
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  try {
    const response = await page.goto(appBase, { waitUntil: "domcontentloaded" });
    assert.ok(response && response.status() < 500, `${label}: HTTP ${response?.status()}`);
    const journey = page.locator('[aria-label="Jornada de aprendizagem do BravAcademy"]');
    await journey.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    const state = await journey.evaluate((node) => ({
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      innerWidth: window.innerWidth,
      items: [...node.children].map((card) => {
        const labelNode = card.lastElementChild;
        const r = card.getBoundingClientRect();
        const s = labelNode ? getComputedStyle(labelNode) : null;
        return {
          text: labelNode?.textContent?.trim() || "",
          left: r.left,
          right: r.right,
          clientWidth: labelNode?.clientWidth || 0,
          scrollWidth: labelNode?.scrollWidth || 0,
          textOverflow: s?.textOverflow || "",
          whiteSpace: s?.whiteSpace || "",
        };
      }),
    }));
    assert.equal(state.overflow, false, `${label}: overflow horizontal`);
    assert.deepEqual(state.items.map((item) => item.text), labels, `${label}: labels divergentes`);
    for (const item of state.items) {
      assert.ok(item.left >= 0 && item.right <= state.innerWidth + 0.5, `${label}: ${item.text} fora da viewport`);
      assert.ok(item.scrollWidth <= item.clientWidth + 1, `${label}: ${item.text} clipping horizontal`);
      assert.notEqual(item.textOverflow, "ellipsis", `${label}: ${item.text} usa ellipsis`);
      assert.notEqual(item.whiteSpace, "nowrap", `${label}: ${item.text} impede quebra de linha`);
    }
    await page.screenshot({ path: new URL(`${label}-bravacademy-jornada.png`, evidenceDir).pathname });
    assert.deepEqual(pageErrors, [], `${label}: page errors: ${pageErrors.join(" | ")}`);
    assert.deepEqual(consoleErrors, [], `${label}: console errors: ${consoleErrors.join(" | ")}`);
  } finally {
    await page.close();
  }
}

test("Site audit — BravAcademy sem truncamento no WebKit mobile", { timeout: 180_000 }, async () => {
  await mkdir(evidenceDir, { recursive: true });
  const app = startService("npm", ["start", "--", "-p", String(APP_PORT)]);
  let browser;
  try {
    await waitFor(appBase);
    browser = await webkit.launch({ headless: true });
    await runViewport(browser, 390, 844, "SITE_AUDIT_WEBKIT_390x844");
    await runViewport(browser, 430, 932, "SITE_AUDIT_WEBKIT_430x932");
  } finally {
    await browser?.close().catch(() => {});
    stopService(app);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
});
