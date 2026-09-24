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
  assert.ok(home.h1.includes("Tecnologia que transforma"), `${viewportLabel}: headline principal ausente`);
  assert.ok(home.h1.includes("gestão em evolução."), `${viewportLabel}: headline de evolução ausente`);

  const header = await execute(id, `
    const header = document.querySelector('header');
    const labels = [...header.querySelectorAll('nav[aria-label="Navegação principal"] a')].map(a => a.textContent.trim());
    const logo = header.querySelector('img[alt*="BravSystems"]');
    return {
      labels,
      hasContact: [...header.querySelectorAll('a')].some(a => a.textContent.trim() === 'Fale conosco'),
      hasBrand: Boolean(logo),
    };
  `);
  assert.deepEqual(header.labels, ["Empresa", "Soluções", "Gestão", "Nossa visão", "Contato"]);
  assert.equal(header.hasContact, true, `${viewportLabel}: CTA Fale conosco ausente do header`);
  assert.equal(header.hasBrand, true, `${viewportLabel}: marca ausente do header`);

  if (width <= 640) {
    const mobile = await execute(id, `
      const summary = document.querySelector('header summary');
      const primary = document.querySelector('#inicio a[href="#contato"]');
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
    assert.ok(mobile.fontSize <= 44, `${viewportLabel}: headline mobile excessiva`);
  }

  const hero = await execute(id, `
    const body = document.querySelector('#inicio')?.innerText || '';
    return {
      hasEyebrow: body.toLowerCase().includes('tecnologia e gestão para empresas'),
      hasConversation: body.includes('Quero falar sobre minha empresa'),
      hasSolutions: body.includes('Ver soluções'),
      hasProof: ['Menos retrabalho','Mais controle','Decisões com clareza'].every(item => body.includes(item)),
      hasLegacyPortfolio: document.body.innerText.includes('Portfólio governado'),
    };
  `);
  assert.equal(hero.hasEyebrow, true, `${viewportLabel}: eyebrow aprovado ausente`);
  assert.equal(hero.hasConversation, true, `${viewportLabel}: CTA comercial principal ausente`);
  assert.equal(hero.hasSolutions, true, `${viewportLabel}: CTA soluções ausente`);
  assert.equal(hero.hasProof, true, `${viewportLabel}: benefícios comerciais do hero incompletos`);
  assert.equal(hero.hasLegacyPortfolio, false, `${viewportLabel}: card de portfólio antigo retornou ao hero`);

  const productNameCase = await execute(id, `
    return [...document.querySelectorAll('[data-product-name]')].map((element) => ({
      text: element.textContent?.trim() || '',
      transform: getComputedStyle(element).textTransform,
    }));
  `);
  const canonicalProductNames = ["BravOs", "BravClin", "BravHas", "BravSystems Finance", "BravHos", "BravMsg", "BravSocial", "BravAcademy", "BravVideo"];
  for (const item of productNameCase) {
    assert.ok(canonicalProductNames.includes(item.text), `${viewportLabel}: nome de produto fora do padrão: ${item.text}`);
    assert.notEqual(item.transform, "uppercase", `${viewportLabel}: ${item.text} foi transformado visualmente para uppercase`);
  }

  await capture(id, `${viewportLabel}-01-home`);

  await scrollToTarget(id, "#solucoes", "start");
  const productCards = await execute(id, `
    return [...document.querySelectorAll('[data-product-card]')].map(card => {
      const rect = card.getBoundingClientRect();
      return {
        slug: card.getAttribute('data-product-card'),
        name: card.querySelector('[data-product-name]')?.textContent?.trim() || '',
        text: card.innerText || '',
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      };
    });
  `);
  assert.deepEqual(productCards.map((item) => item.name), ["BravClin", "BravOs", "BravHas", "BravSystems Finance", "BravHos", "BravMsg", "BravSocial", "BravAcademy", "BravVideo"]);
  const bravclinCard = productCards.find((item) => item.slug === "bravclin");
  const academyCard = productCards.find((item) => item.slug === "bravacademy");
  const bravhasCard = productCards.find((item) => item.slug === "bravhas");
  assert.ok(bravclinCard?.text.toLowerCase().includes("destaque do portfólio"), `${viewportLabel}: BravClin sem destaque`);
  assert.ok(bravclinCard?.text.includes("Gestão clínica white label"), `${viewportLabel}: proposta BravClin ausente`);
  if (width >= 1200) {
    const desktopLayout = await execute(id, `
      const hero = document.querySelector('[data-desktop-hero-panel]')?.getBoundingClientRect();
      const cards = [...document.querySelectorAll('[data-product-card]')].slice(0, 3).map(card => card.getBoundingClientRect());
      return {
        heroVisible: Boolean(hero && hero.width >= 480 && hero.height >= 300),
        firstRowWidths: cards.map(rect => rect.width),
        firstRowTops: cards.map(rect => rect.top),
      };
    `);
    assert.equal(desktopLayout.heroVisible, true, `${viewportLabel}: hero desktop sem painel visual proporcional`);
    assert.ok(desktopLayout.firstRowWidths.every(value => value >= 360), `${viewportLabel}: cards continuam estreitos como mobile`);
    assert.ok(Math.max(...desktopLayout.firstRowTops) - Math.min(...desktopLayout.firstRowTops) <= 2, `${viewportLabel}: primeira linha do portfólio não está horizontal`);
  }
  assert.ok(academyCard?.text.toLowerCase().includes("homologação"), `${viewportLabel}: BravAcademy sem estágio`);
  assert.ok(bravhasCard?.text.toLowerCase().includes("homologação"), `${viewportLabel}: BravHas sem estágio`);
  await capture(id, `${viewportLabel}-02-solucoes`);

  await scrollToTarget(id, "#bravclin-destaque", "center");
  const bravclinSpotlight = await execute(id, `
    const section = document.querySelector('#bravclin-destaque');
    return {
      text: section?.innerText || '',
      link: Boolean(section?.querySelector('a[href="/bravclin"]')),
      features: section?.querySelectorAll('.grid > div').length || 0,
    };
  `);
  assert.ok(bravclinSpotlight.text.includes("BravClin"), `${viewportLabel}: destaque BravClin ausente`);
  assert.ok(bravclinSpotlight.text.includes("Gestão clínica white label"), `${viewportLabel}: proposta BravClin ausente`);
  assert.ok(bravclinSpotlight.text.includes("Estoque, lote e validade"), `${viewportLabel}: estrutura BravClin incompleta`);
  assert.equal(bravclinSpotlight.link, true, `${viewportLabel}: CTA BravClin ausente`);
  await capture(id, `${viewportLabel}-03-bravclin`);

  await scrollToTarget(id, "#bravacademy", "center");
  const academy = await execute(id, `
    const section = document.querySelector('#bravacademy');
    return {
      text: section?.innerText || '',
      link: Boolean(section?.querySelector('a[href="/bravacademy"]')),
      steps: section?.querySelectorAll('[aria-label="Jornada de aprendizagem do BravAcademy"] > div').length || 0,
    };
  `);
  assert.ok(academy.text.toLowerCase().includes("homologação"), `${viewportLabel}: BravAcademy sem homologação`);
  assert.ok(academy.text.includes("Universidade corporativa com identidade, trilha e evidência."), `${viewportLabel}: proposta Academy ausente`);
  assert.equal(academy.link, true, `${viewportLabel}: CTA Academy ausente`);
  assert.equal(academy.steps, 5, `${viewportLabel}: jornada Academy incompleta`);
  await capture(id, `${viewportLabel}-03-bravacademy`);

  await scrollToTarget(id, "#bravos", "center");
  const bravos = await execute(id, `
    const section = document.querySelector('#bravos');
    return {
      text: section?.innerText || '',
      link: Boolean(section?.querySelector('a[href="/bravos"]')),
    };
  `);
  assert.ok(bravos.text.includes("BravOs"), `${viewportLabel}: BravOs ausente`);
  assert.equal(bravos.link, true, `${viewportLabel}: CTA BravOs ausente`);
  await capture(id, `${viewportLabel}-04-bravos`);

  await scrollToTarget(id, "#conheca-bravos", "center");
  const video = await execute(id, `
    const section = document.querySelector('#conheca-bravos');
    const source = section?.querySelector('video source');
    return {
      title: section?.innerText || '',
      src: source?.getAttribute('src') || '',
    };
  `);
  assert.ok(video.title.toLowerCase().includes("conheça o bravos"), `${viewportLabel}: seção de vídeo BravOs ausente`);
  assert.equal(video.src, "/bravsystems-video-institucional.mp4", `${viewportLabel}: vídeo institucional incorreto`);
  await capture(id, `${viewportLabel}-05-video-bravos`);

  return { home };
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
      bravclinText: cards.find(card => card.getAttribute('data-access-product') === 'bravclin')?.textContent || '',
      financeText: cards.find(card => card.getAttribute('data-access-product') === 'bravsystems-finance')?.textContent || '',
      bravhasText: cards.find(card => card.getAttribute('data-access-product') === 'bravhas')?.textContent || '',
    };
  `);

  assert.deepEqual(cards.names, ["BravOs", "BravClin", "BravHas", "BravSystems Finance", "BravHos", "BravMsg", "BravSocial", "BravAcademy", "BravVideo"]);
  assert.equal(cards.activeLogins, 0, `${viewportLabel}: CI não deve ativar login sem URL oficial`);
  assert.equal(cards.blocked, 9, `${viewportLabel}: todos os acessos sem URL devem permanecer bloqueados`);
  assert.ok(cards.bravclinText.includes("EM DESENVOLVIMENTO"), `${viewportLabel}: BravClin incorreto na Central`);
  assert.ok(cards.financeText.includes("EM DESENVOLVIMENTO"), `${viewportLabel}: BravSystems Finance incorreto na Central`);
  assert.ok(cards.academyText.includes("EM HOMOLOGAÇÃO"), `${viewportLabel}: BravAcademy incorreto na Central`);
  assert.ok(cards.bravhasText.includes("EM HOMOLOGAÇÃO"), `${viewportLabel}: BravHas incorreto na Central`);
  assert.ok(cards.bravhasText.includes("Administração, financeiro e pessoas"), `${viewportLabel}: categoria BravHas incorreta`);
  assert.ok(cards.bravhasText.includes("Suite administrativa da BravSystems para organizar financeiro, RH, DP, documentos e rotinas de gestão em um único centro de controle."), `${viewportLabel}: descrição BravHas incorreta`);
  assert.ok(cards.bravhasText.includes("Ambiente interno em homologação. Liberação pública não prevista nesta etapa."), `${viewportLabel}: mensagem BravHas incorreta`);
  assert.equal(cards.bravhasText.includes("ACESSO INTERNO"), false, `${viewportLabel}: BravHas regrediu para ACESSO INTERNO`);
  assert.equal(cards.bravhasText.includes("ainda precisa de auditoria"), false, `${viewportLabel}: mensagem antiga do BravHas retornou`);
  await capture(id, `${viewportLabel}-06-central-sistemas`);

  await scrollToTarget(id, '[data-access-product="bravacademy"]', "center");
  await capture(id, `${viewportLabel}-07-bravacademy-central`);

  await scrollToTarget(id, '[data-access-product="bravhas"]', "center");
  await capture(id, `${viewportLabel}-08-bravhas-central`);

  return { access, cards };
}

async function captureBravHasEvidence(id, viewportLabel) {
  await navigate(id, "/bravhas");
  const page = await auditPage(id, `${viewportLabel}/bravhas`);
  assert.equal(page.h1, "Controle administrativo real para financeiro, pessoas e obrigações.");

  const content = await execute(id, `
    return {
      body: document.body.innerText,
      hasPrimary: [...document.querySelectorAll('a')].some(a => a.textContent.trim() === 'Quero uma demonstração do BravHas'),
      hasSecondary: [...document.querySelectorAll('a')].some(a => a.textContent.trim() === 'Ver visão geral'),
    };
  `);

  assert.ok(content.body.includes("ADMINISTRAÇÃO CENTRAL"), `${viewportLabel}: eyebrow BravHas ausente`);
  assert.ok(content.body.includes("O BravHas centraliza rotinas administrativas, RH, DP, documentos e indicadores em um único ambiente para dar clareza à operação, reduzir retrabalho e acelerar decisões."), `${viewportLabel}: subheadline BravHas ausente`);
  assert.ok(content.body.includes("EM HOMOLOGAÇÃO"), `${viewportLabel}: BravHas sem homologação`);
  assert.ok(content.body.includes("Ambiente controlado. Acesso liberado apenas para usuários autorizados."), `${viewportLabel}: governança institucional BravHas ausente`);
  assert.equal(content.hasPrimary, true, `${viewportLabel}: CTA principal BravHas ausente`);
  assert.equal(content.hasSecondary, true, `${viewportLabel}: CTA secundário BravHas ausente`);
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
    const central = await captureAccessEvidence(id, label);
    await captureBravHasEvidence(id, label);
    await captureClosingEvidence(id, label);

    console.log(`PORTAL_${label}_RESULT=${JSON.stringify({
      viewport: { width, height },
      homeTitle: home.home.title,
      accessTitle: central.access.title,
      accessProducts: central.cards.names.length,
      activeLoginsInCI: central.cards.activeLogins,
      blockedCtasInCI: central.cards.blocked,
      bravclinDevelopment: central.cards.bravclinText.includes("EM DESENVOLVIMENTO"),
      financeDevelopment: central.cards.financeText.includes("EM DESENVOLVIMENTO"),
      bravacademyHomologation: central.cards.academyText.includes("EM HOMOLOGAÇÃO"),
      bravhasHomologation: central.cards.bravhasText.includes("EM HOMOLOGAÇÃO"),
    })}`);
  } finally {
    await wd("DELETE", `/session/${id}`).catch(() => {});
  }
}

test("Portal BravSystems 008 — reposicionamento de copy do BravHas em desktop/mobile", { timeout: 180_000 }, async () => {
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