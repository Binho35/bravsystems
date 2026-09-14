import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";

const APP_PORT = 3011;
const DRIVER_PORT = 9521;
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

async function capture(id, label) {
  const png = await wd("GET", `/session/${id}/screenshot`);
  assert.ok(typeof png === "string" && png.length > 1000, `${label}: screenshot não gerado`);
  await writeFile(new URL(`${label}.png`, evidenceDir), Buffer.from(png, "base64"));
}

async function runViewport(width, height, label) {
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

  const id = session.sessionId;
  try {
    await wd("POST", `/session/${id}/window/rect`, { width, height, x: 0, y: 0 });
    await wd("POST", `/session/${id}/url`, { url: `${appBase}/equipe` });
    await new Promise((resolve) => setTimeout(resolve, 700));

    const top = await execute(id, `
      const links = [...document.querySelectorAll('a[href]')].map(a => a.href);
      return {
        title: document.title,
        h1: document.querySelector('h1')?.textContent?.trim() || '',
        overflowX: document.documentElement.scrollWidth > window.innerWidth,
        hasHeader: Boolean(document.querySelector('header')),
        hasFooter: Boolean(document.querySelector('footer')),
        founder: document.querySelector('[data-team-founder]')?.textContent || '',
        agents: [...document.querySelectorAll('[data-team-member]')].map(card => ({
          slug: card.getAttribute('data-team-member'),
          text: card.textContent || '',
        })),
        technicalLink: links.some(href => href.includes('.vercel.app') || href.includes('hostingersite.com') || href.includes('-git-')),
        pendingPortraits: document.querySelectorAll('[data-portrait-status="pending"]').length,
      };
    `);

    assert.equal(top.overflowX, false, `${label}: overflow horizontal`);
    assert.equal(top.hasHeader, true, `${label}: header ausente`);
    assert.equal(top.hasFooter, true, `${label}: footer ausente`);
    assert.equal(top.technicalLink, false, `${label}: hostname técnico exposto`);
    assert.equal(top.h1, "Uma estrutura híbrida para construir, operar e evoluir tecnologia.");
    assert.ok(top.founder.includes("Robson"), `${label}: Founder ausente`);
    assert.ok(top.founder.includes("Founder & CEO"), `${label}: cargo Founder ausente`);
    assert.equal(top.agents.length, 12, `${label}: quantidade de agentes incorreta`);
    assert.ok(top.agents.every((agent) => agent.text.includes("Agente de IA BravSystems")), `${label}: transparência de IA ausente`);
    assert.deepEqual(top.agents.map((agent) => agent.slug), ["argos", "atlas", "forge", "sentry", "scout", "pulse", "nexus", "orion", "sofia", "vega", "lira", "marco"]);
    assert.ok(top.pendingPortraits >= 13, `${label}: placeholders de retrato não identificados`);

    await capture(id, `${label}-11-equipe-topo`);

    await execute(id, `
      const grid = document.querySelector('[data-team-grid]');
      grid?.scrollIntoView({ block: 'start', behavior: 'instant' });
      window.scrollBy(0, -90);
      return true;
    `);
    await new Promise((resolve) => setTimeout(resolve, 150));
    await capture(id, `${label}-12-equipe-agentes`);

    console.log(`TEAM_${label}_RESULT=${JSON.stringify({ viewport: { width, height }, agents: top.agents.length, founder: true, aiDisclosure: true, overflowX: top.overflowX, technicalLink: top.technicalLink })}`);
  } finally {
    await wd("DELETE", `/session/${id}`).catch(() => {});
  }
}

test("TEAM 001 — equipe institucional em desktop e mobile", { timeout: 180_000 }, async () => {
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
