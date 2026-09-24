import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("Home preserva a direção visual aprovada da BravSystems", async () => {
  const page = await read("app/page.tsx");
  const header = await read("components/SiteHeader.tsx");

  for (const text of [
    "Tecnologia e gestão para empresas",
    "Tecnologia que transforma",
    "gestão em evolução.",
    "Quero falar sobre minha empresa",
    "Ver soluções",
    "Menos retrabalho",
    "Mais controle",
    "Decisões com clareza",
    "Uma empresa criada para construir o futuro da gestão.",
    "Escolha pelo problema que você quer resolver.",
    "Nove produtos com função clara dentro do ecossistema.",
  ]) {
    assert.ok(page.includes(text), `${text} ausente`);
  }

  assert.ok(page.includes('id="empresa"'));
  assert.ok(page.includes('id="solucoes"'));
  assert.ok(page.includes('id="gestao"'));
  assert.ok(page.includes('id="visao"'));
  assert.ok(page.includes('id="contato"'));
  assert.ok(header.includes('bg-[#eef6fb]/95'));
  assert.ok(page.includes('bg-[#eef6fb]'));
  assert.equal(page.includes("Portfólio governado"), false);
  assert.equal(page.includes("Uma visão única do ecossistema."), false);
});

test("Header usa a navegação aprovada e mantém a Central fora da navegação principal", async () => {
  const header = await read("components/SiteHeader.tsx");
  for (const label of ["Empresa", "Soluções", "Gestão", "Nossa visão", "Contato", "Fale conosco"]) {
    assert.ok(header.includes(label), `${label} ausente do header`);
  }
  for (const obsolete of ["Ecossistema", "Destaques", "Por que BravSystems", "Falar com especialista"]) {
    assert.equal(header.includes(obsolete), false, `${obsolete} não deveria permanecer no header principal`);
  }
  assert.ok(header.includes('href="/acessar"'));
  assert.ok(header.includes("Meus Sistemas"));
});

test("Home mantém nove soluções e dá ênfase ao BravClin", async () => {
  const page = await read("app/page.tsx");
  const products = await read("lib/products.ts");

  assert.ok(page.includes("data-product-grid"));
  assert.ok(page.includes("data-product-card={product.slug}"));
  assert.ok(page.includes("Operação em tempo real, gestão no mesmo ritmo."));
  assert.ok(page.includes("data-desktop-hero-panel"));
  assert.ok(page.includes('product.slug === "bravclin" ? "bravclin"'));
  assert.ok(page.includes("Destaque do portfólio"));
  assert.ok(page.includes("lg:grid-cols-[.96fr_1.04fr]"));
  assert.ok(page.includes("xl:grid-cols-3"));
  assert.ok(page.includes("Gestão clínica white label para uma operação organizada."));
  assert.ok(page.includes("Falar sobre minha clínica"));

  for (const name of ["BravOs", "BravClin", "BravHas", "BravSystems Finance", "BravHos", "BravMsg", "BravSocial", "BravAcademy", "BravVideo"]) {
    assert.ok(products.includes(`name: "${name}"`), `${name} ausente ou grafia incorreta`);
  }
});
test("Vídeo institucional permanece no arquivo e seção aprovados", async () => {
  const page = await read("app/page.tsx");
  assert.ok(page.includes('id="conheca-bravos"'));
  assert.ok(page.includes("Conheça o BravOs"));
  assert.ok(page.includes("/bravsystems-video-institucional.mp4"));
  assert.ok(page.includes("<video controls playsInline"));
});

test("BravAcademy mantém jornada comercial sem dominar o hero", async () => {
  const page = await read("app/page.tsx");
  assert.ok(page.includes('id="bravacademy"'));
  assert.ok(page.includes('aria-label="Jornada de aprendizagem do BravAcademy"'));
  for (const item of ["Cursos", "Trilhas", "Avaliações", "Progresso", "Certificação"]) {
    assert.ok(page.includes(item), `${item} ausente da jornada Academy`);
  }
  assert.equal(page.includes("data-hero-ecosystem"), false);
});

test("BravHas permanece EM HOMOLOGAÇÃO com governança institucional", async () => {
  const access = await read("lib/product-access.ts");
  const products = await read("lib/products.ts");
  const productPage = await read("app/[slug]/page.tsx");

  assert.ok(access.includes('bravhas: { status: "EM HOMOLOGAÇÃO"'));
  assert.ok(access.includes('publicAccessDisabled = new Set(["bravhas"])'));
  assert.ok(products.includes('name: "BravHas"'));
  assert.ok(products.includes('category: "Administração, financeiro e pessoas"'));
  assert.ok(products.includes('headline: "Controle administrativo real para financeiro, pessoas e obrigações."'));
  assert.ok(products.includes('cta: "Conhecer o BravHas"'));
  assert.ok(productPage.includes("ADMINISTRAÇÃO CENTRAL"));
  assert.ok(productPage.includes("O BravHas centraliza rotinas administrativas, RH, DP, documentos e indicadores"));
  assert.ok(productPage.includes("Ambiente controlado. Acesso liberado apenas para usuários autorizados."));
});

test("Hostnames técnicos e temporários seguem bloqueados", async () => {
  const access = await read("lib/product-access.ts");
  assert.ok(access.includes('"localhost"'));
  assert.ok(access.includes('/\\.vercel\\.(?:app|sh)$/'));
  assert.ok(access.includes('hostname.endsWith(".hostingersite.com")'));
  assert.ok(access.includes('url.protocol !== "https:"'));
});

test("Home e Central não expõem Hostinger temporário ou Vercel técnico", async () => {
  const home = await read("app/page.tsx");
  const central = await read("app/acessar/page.tsx");
  for (const content of [home, central]) {
    assert.equal(content.includes("hostingersite.com"), false);
    assert.equal(content.includes(".vercel.app"), false);
  }
});

test("/acessar permanece canônica e /meus-sistemas permanece alias", async () => {
  const central = await read("app/acessar/page.tsx");
  const alias = await read("app/meus-sistemas/page.tsx");
  assert.ok(central.includes('canonical: "/acessar"'));
  assert.ok(alias.includes('redirect("/acessar")'));
});
test("Central conserva catálogo governado e CTA condicionado a URL oficial", async () => {
  const central = await read("app/acessar/page.tsx");
  for (const text of [
    "Sua central BravSystems, com status e acesso em um único lugar.",
    "Visão do portfólio",
    "Produtos mapeados",
    "Em homologação",
    "Em desenvolvimento",
    "Acessos oficiais",
    "Acesso oficial ainda não liberado",
  ]) {
    assert.ok(central.includes(text), `${text} ausente da Central`);
  }
  assert.ok(central.includes("productAccessCatalog.map"));
  assert.ok(central.includes("data-access-product"));
  assert.ok(central.includes("data-access-blocked"));
  assert.ok(central.includes("product.loginHref"));
});

test("Formulário comercial permanece endurecido e integrado à Home", async () => {
  const form = await read("components/LeadForm.tsx");
  const home = await read("app/page.tsx");
  const route = await read("app/api/contact/route.ts");

  assert.ok(form.includes("politica-de-privacidade"));
  assert.ok(form.includes('name="website"'));
  assert.ok(form.includes("defaultInterest"));
  assert.ok(home.includes("<LeadForm />"));
  assert.ok(route.includes('"BravClin"'));
  assert.ok(route.includes('"BravOs"'));
  assert.ok(route.includes('"BravHas"'));
  assert.ok(route.includes('"BravSystems Finance"'));
  assert.ok(route.includes('"BravHos"'));
});
test("Páginas de produto continuam integradas à Central", async () => {
  const productPage = await read("app/[slug]/page.tsx");
  assert.ok(productPage.includes("getProductAccess"));
  assert.ok(productPage.includes('href="/acessar"'));
  assert.ok(productPage.includes("LeadForm defaultInterest={product.name}"));
});

test("Sitemap mantém apenas a Central canônica", async () => {
  const sitemap = await read("app/sitemap.ts");
  assert.ok(sitemap.includes("/acessar"));
  assert.equal(sitemap.includes("/meus-sistemas"), false);
});

test("Home evita métricas fictícias e promessas comerciais inventadas", async () => {
  const page = await read("app/page.tsx");
  for (const forbidden of ["mil clientes", "milhões faturados", "99,9% garantido", "liderança de mercado"]) {
    assert.equal(page.toLowerCase().includes(forbidden.toLowerCase()), false, `copy fictícia detectada: ${forbidden}`);
  }
});

test("Quality exige cadeia técnica e Browser E2E", async () => {
  const workflow = await read(".github/workflows/quality.yml");
  for (const required of [
    "npm ci",
    "npm audit --audit-level=high",
    "npm run lint",
    "npm test",
    "npx tsc --noEmit",
    "npm run build",
    "node --test tests/portal.browser.mjs",
    "actions/upload-artifact@v4",
  ]) {
    assert.ok(workflow.includes(required), `Quality sem etapa: ${required}`);
  }
});

test("Portfólio público exclui explicitamente a intranet Stocco", async () => {
  const products = await read("lib/products.ts");
  const home = await read("app/page.tsx");
  const layout = await read("app/layout.tsx");
  for (const content of [products, home, layout]) {
    assert.equal(content.toLowerCase().includes("stocco-intranet"), false);
    assert.equal(content.toLowerCase().includes("-stocco-intranet"), false);
  }
});
