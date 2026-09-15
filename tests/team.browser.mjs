import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";

const APP_PORT = 3011;
const DRIVER_PORT = 9521;
const appBase = `http://127.0.0.1:${APP_PORT}`;
const driverBase = `http://127.0.0.1:${DRIVER_PORT}`;
const evidenceDir = new URL("../artifacts/browser/", import.meta.url);
const disclosure = "A BravSystems opera com liderança humana e uma estrutura de agentes especializados apoiados por inteligência artificial.";
const approvedSlugs = ["atlas", "forge", "sentry", "orion", "sofia", "vega", "lira", "marco"];
const pendingSlugs = ["argos", "scout", "pulse", "nexus"];

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

async function waitForPortrait(id, slug, expectedPath, timeoutMs = 6000) {
  const started = Date.now();

  while (Date.now() - started < timeoutMs) {
    const state = await execute(id, `
      const card = document.querySelector('[data-team-member="${slug}"]');
      card?.scrollIntoView({ block: 'center', behavior: 'instant' });
      const image = card?.querySelector('img');
      return {
        cardFound: Boolean(card),
        imageFound: Boolean(image),
        complete: Boolean(image?.complete),
        naturalWidth: image?.naturalWidth || 0,
        naturalHeight: image?.naturalHeight || 0,
        src: image?.getAttribute('src') || '',
        currentSrc: image?.currentSrc || '',
        pending: Boolean(card?.querySelector('[data-portrait-status="pending"]')),
      };
    `);

    if (
      state.cardFound &&
      state.imageFound &&
      state.complete &&
      state.naturalWidth > 0 &&
      state.naturalHeight > 0 &&
      !state.pending &&
      (state.src.includes(expectedPath) || state.currentSrc.includes(expectedPath))
    ) {
      return state;
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const finalState = await execute(id, `
    const card = document.querySelector('[data-team-member="${slug}"]');
    const image = card?.querySelector('img');
    return {
      cardFound: Boolean(card),
      imageFound: Boolean(image),
      complete: Boolean(image?.complete),
      naturalWidth: image?.naturalWidth || 0,
      naturalHeight: image?.naturalHeight || 0,
      src: image?.getAttribute('src') || '',
      currentSrc: image?.currentSrc || '',
      pending: Boolean(card?.querySelector('[data-portrait-status="pending"]')),
    };
  `);

  throw new Error(`${slug}: retrato não carregou dentro de ${timeoutMs}ms — ${JSON.stringify(finalState)}`);
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
    await new Promise((resolve) => setTimeout(resolve, 250));

    const loadedPortraits = {};
    for (const slug of approvedSlugs) {
      loadedPortraits[slug] = await waitForPortrait(id, slug, `/team/${slug}.jpg`);
    }

    await execute(id, `window.scrollTo({ top: 0, behavior: 'instant' }); return true;`);

    const top = await execute(id, `
      const links = [...document.querySelectorAll('a[href]')].map(a => a.href);
      const sectionTitle = [...document.querySelectorAll('h2')].map(el => el.textContent?.trim()).find(text => text === 'Especialistas com papéis claros no ecossistema.') || '';
      const transparencyBlocks = [...document.querySelectorAll('[data-team-transparency]')];
      const transparency = transparencyBlocks[0]?.innerText || '';
      const specialists = [...document.querySelectorAll('[data-team-member]')].map(card => {
        const image = card.querySelector('img');
        return {
          slug: card.getAttribute('data-team-member'),
          name: card.querySelector('h2')?.textContent?.trim() || '',
          text: card.innerText || '',
          hasPortrait: Boolean(image),
          imageLoaded: image ? image.complete && image.naturalWidth > 0 && image.naturalHeight > 0 : false,
          imageSrc: image?.getAttribute('src') || '',
          imageCurrentSrc: image?.currentSrc || '',
          pending: Boolean(card.querySelector('[data-portrait-status="pending"]')),
        };
      });
      return {
        title: document.title,
        h1: document.querySelector('h1')?.textContent?.trim() || '',
        overflowX: document.documentElement.scrollWidth > window.innerWidth,
        hasHeader: Boolean(document.querySelector('header')),
        hasFooter: Boolean(document.querySelector('footer')),
        founder: document.querySelector('[data-team-founder]')?.innerText || '',
        founderPending: Boolean(document.querySelector('[data-team-founder] [data-portrait-status="pending"]')),
        specialists,
        sectionTitle,
        transparency,
        transparencyBlocks: transparencyBlocks.length,
        repeatedAiBadge: specialists.some(card => card.text.includes('Agente de IA BravSystems')),
        technicalLink: links.some(href => href.includes('.vercel.app') || href.includes('hostingersite.com') || href.includes('-git-')),
        pendingPortraits: document.querySelectorAll('[data-portrait-status="pending"]').length,
      };
    `);

    assert.equal(top.overflowX, false, `${label}: overflow horizontal`);
    assert.equal(top.hasHeader, true, `${label}: header ausente`);
    assert.equal(top.hasFooter, true, `${label}: footer ausente`);
    assert.equal(top.technicalLink, false, `${label}: hostname técnico exposto`);
    assert.equal(top.h1, "Uma estrutura especializada para construir, operar e evoluir tecnologia.");
    assert.equal(top.sectionTitle, "Especialistas com papéis claros no ecossistema.");
    assert.ok(top.founder.includes("Robson"), `${label}: Founder ausente`);
    assert.ok(top.founder.includes("Founder & CEO"), `${label}: cargo Founder ausente`);
    assert.equal(top.founderPending, true, `${label}: Robson deve permanecer com placeholder enquanto o retrato está pendente`);
    assert.equal(top.specialists.length, 12, `${label}: quantidade de especialistas incorreta`);
    assert.equal(top.repeatedAiBadge, false, `${label}: selo repetido de IA ainda visível`);
    assert.equal(top.transparencyBlocks, 1, `${label}: deve existir um único bloco Como trabalhamos`);
    assert.ok(top.transparency.includes(disclosure), `${label}: bloco Como trabalhamos não contém transparência institucional`);
    assert.deepEqual(top.specialists.map((agent) => agent.slug), ["argos", "atlas", "forge", "sentry", "scout", "pulse", "nexus", "orion", "sofia", "vega", "lira", "marco"]);
    assert.deepEqual(top.specialists.map((agent) => agent.name), ["Argos", "Atlas", "Forge", "Sentry", "Scout", "Pulse", "Nexus", "Orion", "Sofia", "Vega", "Lira", "Marco"]);
    assert.equal(top.pendingPortraits, 5, `${label}: devem permanecer exatamente cinco placeholders`);

    for (const slug of approvedSlugs) {
      const agent = top.specialists.find((item) => item.slug === slug);
      assert.ok(agent?.hasPortrait, `${label}: ${slug} sem retrato real`);
      assert.ok(agent?.imageLoaded, `${label}: ${slug} com imagem não carregada após polling`);
      assert.equal(agent?.pending, false, `${label}: ${slug} ainda marcado como pendente`);
      assert.ok(
        agent?.imageSrc.includes(`/team/${slug}.jpg`) || agent?.imageCurrentSrc.includes(`/team/${slug}.jpg`),
        `${label}: ${slug} com src inesperado`,
      );
      assert.ok(loadedPortraits[slug]?.complete, `${label}: ${slug} imagem não completou carregamento`);
      assert.ok(loadedPortraits[slug]?.naturalWidth > 0, `${label}: ${slug} sem largura natural válida`);
      assert.ok(loadedPortraits[slug]?.naturalHeight > 0, `${label}: ${slug} sem altura natural válida`);
    }

    for (const slug of pendingSlugs) {
      const agent = top.specialists.find((item) => item.slug === slug);
      assert.equal(agent?.hasPortrait, false, `${label}: ${slug} não deveria possuir retrato aprovado ainda`);
      assert.equal(agent?.pending, true, `${label}: ${slug} deveria manter placeholder pendente`);
    }

    await capture(id, `${label}-11-equipe-topo`);

    await execute(id, `
      const grid = document.querySelector('[data-team-grid]');
      grid?.scrollIntoView({ block: 'start', behavior: 'instant' });
      window.scrollBy(0, -90);
      return true;
    `);
    await new Promise((resolve) => setTimeout(resolve, 150));
    await capture(id, `${label}-12-equipe-especialistas`);

    await execute(id, `
      const approved = document.querySelector('[data-team-member="atlas"]');
      approved?.scrollIntoView({ block: 'center', behavior: 'instant' });
      return true;
    `);
    await new Promise((resolve) => setTimeout(resolve, 100));
    await capture(id, `${label}-13-equipe-retratos`);

    console.log(`TEAM_${label}_RESULT=${JSON.stringify({ viewport: { width, height }, specialists: top.specialists.length, approvedPortraits: top.specialists.filter(item => item.hasPortrait).length, pendingPortraits: top.pendingPortraits, founder: true, singleAiDisclosure: top.transparencyBlocks === 1, overflowX: top.overflowX, technicalLink: top.technicalLink })}`);
  } finally {
    await wd("DELETE", `/session/${id}`).catch(() => {});
  }
}

test("TEAM — oito retratos aprovados em desktop e mobile", { timeout: 180_000 }, async () => {
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
