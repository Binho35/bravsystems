import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";

const APP_PORT = 3009;
const DRIVER_PORT = 9519;
const appBase = `http://127.0.0.1:${APP_PORT}`;
const driverBase = `http://127.0.0.1:${DRIVER_PORT}`;

function run(command, args) {
  return spawn(command, args, { stdio: ["ignore", "pipe", "pipe"], env: process.env });
}

function startService(command, args) {
  return spawn(command, args, { stdio: "ignore", env: process.env, detached: true });
}

function stopService(child) {
  if (!child?.pid) return;
  try {
    process.kill(-child.pid, "SIGTERM");
  } catch {
    try { child.kill("SIGTERM"); } catch {}
  }
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

async function browserCheck(width, height, label, scrollHero) {
  const session = await wd("POST", "/session", {
    capabilities: {
      alwaysMatch: {
        browserName: "chrome",
        "goog:chromeOptions": {
          args: [
            "--headless=new",
            "--no-sandbox",
            "--disable-dev-shm-usage",
            "--force-device-scale-factor=1",
            `--window-size=${width},${height}`,
          ],
        },
      },
    },
  });
  const id = session.sessionId;

  try {
    await wd("POST", `/session/${id}/window/rect`, { width, height, x: 0, y: 0 });
    await wd("POST", `/session/${id}/url`, { url: `${appBase}/` });
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const result = await wd("POST", `/session/${id}/execute/async`, {
      script: `
        const done = arguments[arguments.length - 1];
        (async () => {
          const hero = document.querySelector('[aria-label="Fluxo operacional do BravOS"]');
          if (!hero) return done({ ok:false, reason:'hero ausente' });
          ${scrollHero ? "hero.scrollIntoView({block:'center'});" : "window.scrollTo(0, 0);"}
          await new Promise(r => setTimeout(r, 250));
          const style = getComputedStyle(hero);
          const rect = hero.getBoundingClientRect();
          const assetResponse = await fetch('/hero-bravos-002', { cache: 'no-store' });
          const assetBlob = await assetResponse.blob();
          let bitmapWidth = 0;
          let bitmapHeight = 0;
          try {
            const bitmap = await createImageBitmap(assetBlob);
            bitmapWidth = bitmap.width;
            bitmapHeight = bitmap.height;
            bitmap.close();
          } catch {}
          const ctas = [...document.querySelectorAll('#inicio a')].map(a => ({
            text:a.textContent.trim(),
            href:a.getAttribute('href'),
            rect:a.getBoundingClientRect().toJSON(),
          }));
          const nav = [...document.querySelectorAll('header a')].map(a => a.textContent.trim()).filter(Boolean);
          const headline = document.querySelector('#inicio h1');
          const headlineStyle = headline ? getComputedStyle(headline) : null;
          done({
            ok:true,
            assetStatus:assetResponse.status,
            assetType:assetBlob.type,
            assetBytes:assetBlob.size,
            backgroundImage:style.backgroundImage,
            backgroundSize:style.backgroundSize,
            backgroundPosition:style.backgroundPosition,
            overflowX:document.documentElement.scrollWidth > window.innerWidth,
            heroRect:{left:rect.left,right:rect.right,top:rect.top,bottom:rect.bottom,width:rect.width,height:rect.height},
            naturalWidth:bitmapWidth,
            naturalHeight:bitmapHeight,
            ctas,
            nav,
            headline: headline?.textContent?.trim() || '',
            headlineFontSize: headlineStyle?.fontSize || '',
            viewport:{width:innerWidth,height:innerHeight},
          });
        })().catch(err => done({ok:false, reason:String(err?.stack || err)}));
      `,
      args: [],
    });

    assert.equal(result.ok, true, result.reason);
    assert.equal(result.assetStatus, 200, `${label}: asset HTTP inválido`);
    assert.match(result.assetType, /image\/webp/);
    assert.equal(result.assetBytes, 27232, `${label}: bytes da derivação divergentes`);
    assert.match(result.backgroundImage, /hero-bravos-002/);
    assert.equal(result.backgroundSize, "contain");
    assert.equal(result.backgroundPosition, "50% 50%");
    assert.equal(result.naturalWidth, 615);
    assert.equal(result.naturalHeight, 462);
    assert.equal(result.overflowX, false, `${label}: overflow horizontal`);
    assert.ok(result.heroRect.width > 250, `${label}: hero estreito demais`);
    assert.ok(result.heroRect.height > 180, `${label}: hero baixo demais`);
    assert.equal(result.headline, "A operação acontece em tempo real. Sua gestão também deveria.");
    assert.deepEqual(result.ctas.slice(0, 3).map((c) => c.text), ["Conhecer o BravOS →", "Agendar demonstração", "Entrar na plataforma"]);
    assert.ok(result.nav.includes("BravOS"), `${label}: navegação regressiva`);

    const shot = await wd("GET", `/session/${id}/screenshot`);
    assert.ok(typeof shot === "string" && shot.length > 1000, `${label}: screenshot não gerado`);
    console.log(`HERO002_${label}_RESULT=${JSON.stringify(result)}`);
    console.log(`HERO002_${label}_PNG_BASE64=${shot}`);
  } finally {
    await wd("DELETE", `/session/${id}`).catch(() => {});
  }
}

test("Hero BravOS 002 — browser real desktop/mobile", { timeout: 180_000 }, async () => {
  const build = run("npm", ["run", "build"]);
  let buildOut = "";
  build.stdout.on("data", (d) => { buildOut += d; });
  build.stderr.on("data", (d) => { buildOut += d; });
  const buildCode = await new Promise((resolve) => build.on("close", resolve));
  assert.equal(buildCode, 0, `build auxiliar falhou\n${buildOut}`);

  const app = startService("npm", ["start", "--", "-p", String(APP_PORT)]);
  const driver = startService("chromedriver", [`--port=${DRIVER_PORT}`]);
  try {
    await waitFor(`${appBase}/`);
    await waitFor(`${driverBase}/status`);
    await browserCheck(1440, 1000, "DESKTOP_1440x1000", false);
    await browserCheck(390, 844, "MOBILE_390x844", true);
  } finally {
    stopService(app);
    stopService(driver);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
});
