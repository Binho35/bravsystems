import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";

const APP_PORT = 3010;
const DRIVER_PORT = 9520;
const appBase = `http://127.0.0.1:${APP_PORT}`;
const driverBase = `http://127.0.0.1:${DRIVER_PORT}`;
const evidenceDir = new URL("../artifacts/browser/", import.meta.url);

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
  for (let index = 0; index < attempts; index += 1) {
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

async function navigate(id, path) {
  await wd("POST", `/session/${id}/url`, { url: `${appBase}${path}` });
  await new Promise((resolve) => setTimeout(resolve, 650));
  await execute(id, `
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    return true;
  `);
}

async function auditPage(id, label) {
  const result = await execute(id, `
    return {
      title: document.title,
      h1: document.querySelector('h1')?.textContent?.trim() || '',
      h1Count: document.querySelectorAll('h1').length,
      overflowX: document.documentElement.scrollWidth > window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      links: [...document.querySelectorAll('a[href]')].map(a => a.href),
      hasHeader: Boolean(document.querySelector('header')),
      hasFooter: Boolean(document.querySelector('footer')),
    };
  `);

  assert.equal(result.overflowX, false, `${label}: overflow horizontal (${result.scrollWidth} > ${result.viewportWidth})`);
  assert.equal(result.hasHeader, true, `${label}: header ausente`);
  assert.equal(result.hasFooter, true, `${label}: footer ausente`);
  assert.equal(result.h1Count, 1, `${label}: hierarquia H1 inválida`);
  assert.equal(result.links.some((href) => href.includes(".vercel.app")), false, `${label}: link técnico Vercel exposto`);
  assert.equal(result.links.some((href) => href.includes("hostingersite.com")), false, `${label}: hostname temporário Hostinger exposto`);
  assert.equal(result.links.some((href) => href.includes("-git-")), false, `${label}: alias técnico exposto`);
  return result;
}

async function scrollToTarget(id, selector, block = "start") {
  const result = await execute(id, `
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';
    const element = document.querySelector(${JSON.stringify(selector)});
    if (!element) return { found: false };
    element.scrollIntoView({ block: ${JSON.stringify(block)}, inline: 'nearest', behavior: 'instant' });
    const rect = element.getBoundingClientRect();
    return {
      found: true,
      visible: rect.bottom > 0 && rect.top < window.innerHeight,
      top: rect.top,
      bottom: rect.bottom,
      height: rect.height,
    };
  `);
  await new Promise((resolve) => setTimeout(resolve, 120));
  assert.equal(result.found, true, `alvo visual ausente: ${selector}`);
  assert.equal(result.visible, true, `alvo visual fora da viewport: ${selector}`);
}

async function capture(id, label) {
  const png = await wd("GET", `/session/${id}/screenshot`);
  assert.ok(typeof png === "string" && png.length > 1000, `${label}: screenshot não gerado`);
  await writeFile(new URL(`${label}.png`, evidenceDir), Buffer.from(png, "base64"));
}

async function captureHomeEvidence(id, viewportLabel, width) {
  await navigate(id, "/");
  const home = await auditPage(id, `${viewportLabel}/home`);
  assert.equal(home.h1, "Software para operar melhor, decidir mais rápido e escalar com controle.");

  const header = await execute(id, `
    const header = document.querySelector('header');
    return {
      hasCentral: [...header.querySelectorAll('a')].some(a => a.getAttribute('href') === '/acessar'),
      hasContact: [...header.querySelectorAll('a')].some(a => a.getAttribute('href') === '/#contato'),
      hasBrand: header.textContent.includes('BravSystems'),
    };
  `);
  assert.equal(header.hasCentral, true, `${viewportLabel}: Central ausente do header`);
  assert.equal(header.hasContact, true, `${viewportLabel}: contato ausente do header`);
  assert.equal(header.hasBrand, true, `${viewportLabel}: marca ausente do header`);

  if (width <= 640) {
    const mobile = await execute(id, `
      const summary = document.querySelector('header summary');
      const primary = document.querySelector('#inicio a[href="#produtos"]');
      const title = document.querySelector('#inicio h1');
      const summaryRect = summary?.getBoundingClientRect();
      const primaryRect = primary?.getBoundingClientRect();
      return {
        menuUsable: Boolean(summaryRect && summaryRect.width >= 40 && summaryRect.height >= 40),
        primaryVisible: Boolean(primaryRect && primaryRect.top < window.innerHeight && primaryRect.bottom > 0),
        fontSize: title ? parseFloat(getComputedStyle(title).fontSize) : 999,
      };
    `);
    assert.equal(mobile.menuUsable, true, `${viewportLabel}: menu mobile não utilizável`);
    assert.equal(mobile.primaryVisible, true, `${viewportLabel}: CTA principal não está na primeira viewport`);
    assert.ok(mobile.fontSize <= 40, `${viewportLabel}: headline mobile excessiva`);
  }

  const hero = await execute(id, `
    return {
      products: [...document.querySelectorAll('[data-hero-ecosystem] a')].map(a => a.textContent.trim()),
      hasOverview: Boolean(document.querySelector('[data-hero-portfolio]')),
      hasCentral: document.body.innerText.includes('Entrar / Meus Sistemas'),
      hasCommercial: document.body.innerText.includes('Falar com a BravSystems'),
    };
  `);
  assert.equal(hero.products.length, 6, `${viewportLabel}: Hero deve representar seis produtos`);
  assert.equal(hero.hasOverview, true, `${viewportLabel}: visão executiva do portfólio ausente`);
  assert.equal(hero.hasCentral, true, `${viewportLabel}: jornada de acesso ausente`);
  assert.equal(hero.hasCommercial, true, `${viewportLabel}: jornada comercial ausente`);
  await capture(id, `${viewportLabel}-01-home`);

  await scrollToTarget(id, "#produtos", "start");
  const productCards = await execute(id, `
    return [...document.querySelectorAll('[data-product-card]')].map(card => ({
      slug: card.getAttribute('data-product-card'),
      name: card.querySelector('h3')?.textContent?.trim() || '',
      text: card.textContent || '',
    }));
  `);
  assert.deepEqual(productCards.map((item) => item.name), ["BravOS", "BravHAS", "BravHOS", "BravMsg", "BravAcademy", "BravVideo"]);
  const academyCard = productCards.find((item) => item.slug === "bravacademy");
  const bravhasCard = productCards.find((item) => item.slug === "bravhas");
  assert.ok(academyCard?.text.includes("EM HOMOLOGAÇÃO"), `${viewportLabel}: BravAcademy sem estágio governado`);
  assert.ok(bravhasCard?.text.includes("EM HOMOLOGAÇÃO"), `${viewportLabel}: BravHAS sem estágio governado`);
  await capture(id, `${viewportLabel}-02-produtos`);

  await scrollToTarget(id, "#bravacademy", "center");
  const academy = await execute(id, `
    const section = document.querySelector('#bravacademy');
    return {
      text: section?.textContent || '',
      link: Boolean(section?.querySelector('a[href="/bravacademy"]')),
      steps: section?.querySelectorAll('[aria-label="Jornada de aprendizagem do BravAcademy"] > div').length || 0,
    };
  `);
  assert.ok(academy.text.includes("EM HOMOLOGAÇÃO"), `${viewportLabel}: BravAcademy sem homologação`);
  assert.ok(academy.text.includes("Treinamento corporativo com identidade, trilha e evidência."), `${viewportLabel}: proposta Academy ausente`);
  assert.equal(academy.link, true, `${viewportLabel}: CTA Academy ausente`);
  assert.equal(academy.steps, 5, `${viewportLabel}: jornada Academy incompleta`);
  await capture(id, `${viewportLabel}-03-bravacademy`);

  await scrollToTarget(id, "#bravos", "center");
  const bravos = await execute(id, `
    const section = document.querySelector('#bravos');
    const image = section?.querySelector('img');
    return {
      text: section?.textContent || '',
      imageSrc: image?.getAttribute('src') || '',
      imageWidth: image?.naturalWidth || 0,
    };
  `);
  assert.ok(bravos.text.includes("A operação acontece em tempo real. Sua gestão também deveria."), `${viewportLabel}: BravOS ausente`);
  assert.ok(bravos.imageSrc.includes("bravos-hero-approved.webp"), `${viewportLabel}: asset aprovado BravOS ausente`);
  assert.ok(bravos.imageWidth > 0, `${viewportLabel}: asset BravOS não carregou`);
  await capture(id, `${viewportLabel}-04-bravos`);

  return { home };
}

async function captureTeamEvidence(id, viewportLabel) {
  await navigate(id, "/");
  await scrollToTarget(id, "#equipe", "center");

  const team = await execute(id, `
    const section = document.querySelector('#equipe');
    const rect = section?.getBoundingClientRect();
    return {
      text: section?.innerText || '',
      visible: Boolean(rect && rect.bottom > 0 && rect.top < window.innerHeight),
      contained: Boolean(section && section.scrollWidth <= section.clientWidth),
      headerLink: Boolean(document.querySelector('header a[href="/#equipe"]')),
    };
  `);

  assert.equal(team.visible, true, `${viewportLabel}: seção Equipe fora da viewport`);
  assert.equal(team.contained, true, `${viewportLabel}: seção Equipe com overflow horizontal`);
  assert.equal(team.headerLink, true, `${viewportLabel}: Equipe ausente da navegação`);
  assert.ok(team.text.includes("Robson Fernandes"), `${viewportLabel}: liderança ausente`);
  assert.ok(team.text.includes("FOUNDER & CEO"), `${viewportLabel}: papel do fundador ausente`);
  assert.ok(team.text.includes("Produto e tecnologia"), `${viewportLabel}: frente de produto ausente`);
  assert.ok(team.text.includes("Operações e qualidade"), `${viewportLabel}: frente de operações ausente`);
  assert.ok(team.text.includes("Comercial e relacionamento"), `${viewportLabel}: frente comercial ausente`);
  await capture(id, `${viewportLabel}-09-team`);
}

async function captureAccessEvidence(id, viewportLabel) {
  await navigate(id, "/meus-sistemas");
  const aliasUrl = await wd("GET", `/session/${id}/url`);
  assert.ok(aliasUrl.endsWith("/acessar"), `${viewportLabel}: /meus-sistemas não redirecionou`);

  const access = await auditPage(id, `${viewportLabel}/acessar`);
  assert.equal(access.h1, "Sua central BravSystems, com status e acesso em um único lugar.");

  const overview = await execute(id, `
    const box = document.querySelector('[data-access-overview]');
    return {
      exists: Boolean(box),
      text: box?.textContent || '',
    };
  `);
  assert.equal(overview.exists, true, `${viewportLabel}: overview da Central ausente`);
  assert.ok(overview.text.includes("Em homologação"), `${viewportLabel}: métrica homologação ausente`);
  assert.ok(overview.text.includes("Acessos oficiais"), `${viewportLabel}: métrica acesso ausente`);
  await capture(id, `${viewportLabel}-05-central-home`);

  await scrollToTarget(id, "#sistemas", "start");
  const cards = await execute(id, `
    const cards = [...document.querySelectorAll('[data-access-product]')];
    return {
      names: cards.map(card => card.querySelector('h3')?.textContent?.trim() || ''),
      activeLogins: cards.flatMap(card => [...card.querySelectorAll('a')]).filter(a => /^Acessar Brav/.test(a.textContent.trim())).length,
      blocked: cards.filter(card => card.querySelector('[data-access-blocked]')).length,
      academyText: cards.find(card => card.getAttribute('data-access-product') === 'bravacademy')?.textContent || '',
      bravhasText: cards.find(card => card.getAttribute('data-access-product') === 'bravhas')?.textContent || '',
    };
  `);

  assert.deepEqual(cards.names, ["BravOS", "BravHAS", "BravHOS", "BravMsg", "BravAcademy", "BravVideo"]);
  assert.equal(cards.activeLogins, 0, `${viewportLabel}: CI não deve ativar login sem URL oficial`);
  assert.equal(cards.blocked, 6, `${viewportLabel}: todos os acessos sem URL devem permanecer bloqueados`);
  assert.ok(cards.academyText.includes("EM HOMOLOGAÇÃO"), `${viewportLabel}: BravAcademy incorreto na Central`);
  assert.ok(cards.bravhasText.includes("EM HOMOLOGAÇÃO"), `${viewportLabel}: BravHAS incorreto na Central`);
  assert.ok(cards.bravhasText.includes("Administração, financeiro e pessoas"), `${viewportLabel}: categoria BravHAS incorreta`);
  assert.ok(cards.bravhasText.includes("Suite administrativa da BravSystems para organizar financeiro, RH, DP, documentos e rotinas de gestão em um único centro de controle."), `${viewportLabel}: descrição BravHAS incorreta`);
  assert.ok(cards.bravhasText.includes("Ambiente interno em homologação. Liberação pública não prevista nesta etapa."), `${viewportLabel}: mensagem BravHAS incorreta`);
  assert.equal(cards.bravhasText.includes("ACESSO INTERNO"), false, `${viewportLabel}: BravHAS regrediu para ACESSO INTERNO`);
  assert.equal(cards.bravhasText.includes("ainda precisa de auditoria"), false, `${viewportLabel}: mensagem antiga do BravHAS retornou`);
  await capture(id, `${viewportLabel}-06-central-sistemas`);

  await scrollToTarget(id, '[data-access-product="bravacademy"]', "center");
  await capture(id, `${viewportLabel}-07-bravacademy-central`);

  await scrollToTarget(id, '[data-access-product="bravhas"]', "center");
  await capture(id, `${viewportLabel}-08-bravhas-central`);

  return { access, cards };
}

async function captureBravHASEvidence(id, viewportLabel) {
  await navigate(id, "/bravhas");
  const page = await auditPage(id, `${viewportLabel}/bravhas`);
  assert.equal(page.h1, "Controle administrativo real para financeiro, pessoas e obrigações.");

  const content = await execute(id, `
    return {
      body: document.body.innerText,
      hasPrimary: [...document.querySelectorAll('a')].some(a => a.textContent.trim() === 'Conhecer o BravHAS'),
      hasSecondary: [...document.querySelectorAll('a')].some(a => a.textContent.trim() === 'Ver visão geral'),
    };
  `);

  assert.ok(content.body.includes("ADMINISTRAÇÃO CENTRAL"), `${viewportLabel}: eyebrow BravHAS ausente`);
  assert.ok(content.body.includes("O BravHAS centraliza rotinas administrativas, RH, DP, documentos e indicadores em um único ambiente para dar clareza à operação, reduzir retrabalho e acelerar decisões."), `${viewportLabel}: subheadline BravHAS ausente`);
  assert.ok(content.body.includes("EM HOMOLOGAÇÃO"), `${viewportLabel}: BravHAS sem homologação`);
  assert.ok(content.body.includes("Ambiente controlado. Acesso liberado apenas para usuários autorizados."), `${viewportLabel}: governança institucional BravHAS ausente`);
  assert.equal(content.hasPrimary, true, `${viewportLabel}: CTA principal BravHAS ausente`);
  assert.equal(content.hasSecondary, true, `${viewportLabel}: CTA secundário BravHAS ausente`);
  await capture(id, `${viewportLabel}-09-bravhas-page`);

  return page;
}

async function captureClosingEvidence(id, viewportLabel) {
  await navigate(id, "/");
  await scrollToTarget(id, "#contato", "start");
  const formPresent = await execute(id, `
    const section = document.querySelector('#contato');
    return Boolean(section?.querySelector('form'));
  `);
  assert.equal(formPresent, true, `${viewportLabel}: formulário comercial ausente`);
  await capture(id, `${viewportLabel}-10-contato`);

  await scrollToTarget(id, "footer", "end");
  const footerAccess = await execute(id, `
    const footer = document.querySelector('footer');
    return [...footer.querySelectorAll('a')].some(a => a.getAttribute('href') === '/acessar' && a.textContent.includes('Meus Sistemas'));
  `);
  assert.equal(footerAccess, true, `${viewportLabel}: acesso ausente do footer`);
  await capture(id, `${viewportLabel}-11-footer`);
}

async function runViewport(width, height, label) {
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
    const home = await captureHomeEvidence(id, label, width);
    await captureTeamEvidence(id, label);
    const central = await captureAccessEvidence(id, label);
    await captureBravHASEvidence(id, label);
    await captureClosingEvidence(id, label);

    console.log(`PORTAL_${label}_RESULT=${JSON.stringify({
      viewport: { width, height },
      homeTitle: home.home.title,
      accessTitle: central.access.title,
      accessProducts: central.cards.names.length,
      activeLoginsInCI: central.cards.activeLogins,
      blockedCtasInCI: central.cards.blocked,
      bravacademyHomologation: central.cards.academyText.includes("EM HOMOLOGAÇÃO"),
      bravhasHomologation: central.cards.bravhasText.includes("EM HOMOLOGAÇÃO"),
    })}`);
  } finally {
    await wd("DELETE", `/session/${id}`).catch(() => {});
  }
}

test("Portal BravSystems Team 001 — equipe institucional em desktop/mobile", { timeout: 180_000 }, async () => {
  await mkdir(evidenceDir, { recursive: true });
  const app = startService("npm", ["start", "--", "-p", String(APP_PORT)]);
  const driver = startService("chromedriver", [`--port=${DRIVER_PORT}`]);

  try {
    await waitFor(`${appBase}/`);
    await waitFor(`${driverBase}/status`);
    await runViewport(1440, 1000, "DESKTOP_1440x1000");
    await runViewport(390, 844, "MOBILE_390x844");
  } finally {
    stopService(app);
    stopService(driver);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
});
