import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
test("Home posiciona BravSystems como ecossistema SaaS B2B", async () => {
  const page = await read("app/page.tsx");
  assert.ok(page.includes("BravSystems • Ecossistema SaaS B2B"));
  assert.ok(page.includes("Software para operar melhor, decidir mais rápido e escalar com controle."));
  assert.ok(page.includes("Portfólio governado"));
  assert.ok(page.includes("Uma visão única do ecossistema."));
});

test("Home mantém jornada comercial e Central claramente separadas", async () => {
  const page = await read("app/page.tsx");
  for (const text of ["Explorar ecossistema", "Entrar / Meus Sistemas", "Falar com a BravSystems", "Abrir Central"]) {
    assert.ok(page.includes(text), `${text} ausente`);
  }
  assert.ok(page.includes('href="/acessar"'));
  assert.ok(page.includes('href="#contato"'));
});

test("Hero apresenta seis produtos de forma compacta", async () => {
  const page = await read("app/page.tsx");
  assert.ok(page.includes("data-hero-ecosystem"));
  assert.ok(page.includes("products.map"));
  assert.ok(page.includes("homeDescriptors"));
  assert.ok(page.includes("productAccessCatalog"));
});

test("Home apresenta os seis descritores oficiais", async () => {
  const page = await read("app/page.tsx");
  for (const descriptor of [
    "Operação e gestão para restaurantes.",
    "Gestão administrativa, financeira e operacional.",
    "Recursos Humanos e Departamento Pessoal.",
    "Comunicação, atendimento, leads e relacionamento.",
    "Universidade Corporativa White Label.",
    "Produção e automação de conteúdo audiovisual corporativo.",
  ]) {
    assert.ok(page.includes(descriptor), `descritor ausente: ${descriptor}`);
  }
});

test("Cards do portfólio usam estágio governado da Central", async () => {
  const page = await read("app/page.tsx");
  assert.ok(page.includes("accessBySlug"));
  assert.ok(page.includes("access.status"));
  assert.ok(page.includes("Acesso oficial pendente"));
  assert.ok(page.includes("data-product-card"));
});

test("BravAcademy permanece EM HOMOLOGAÇÃO e ganha destaque comercial", async () => {
  const page = await read("app/page.tsx");
  const access = await read("lib/product-access.ts");
  assert.ok(access.includes('bravacademy: { status: "EM HOMOLOGAÇÃO"'));
  assert.ok(page.includes('id="bravacademy"'));
  assert.ok(page.includes("BravAcademy"));
  assert.ok(page.includes("EM HOMOLOGAÇÃO"));
  assert.ok(page.includes("Treinamento corporativo com identidade, trilha e evidência."));
  assert.ok(page.includes("Conhecer BravAcademy"));
  for (const item of ["Cursos", "Trilhas", "Avaliações", "Progresso", "Certificação"]) {
    assert.ok(page.includes(item), `${item} ausente da jornada Academy`);
  }
});

test("BravHAS permanece EM HOMOLOGAÇÃO com copy institucional do ciclo 008", async () => {
  const access = await read("lib/product-access.ts");
  const products = await read("lib/products.ts");
  const productPage = await read("app/[slug]/page.tsx");
  assert.ok(access.includes('bravhas: { status: "EM HOMOLOGAÇÃO"'));
  assert.ok(access.includes('publicAccessDisabled = new Set(["bravhas"])'));
  assert.ok(access.includes("Ambiente interno em homologação. Liberação pública não prevista nesta etapa."));
  assert.ok(products.includes('category: "Administração, financeiro e pessoas"'));
  assert.ok(products.includes('headline: "Controle administrativo real para financeiro, pessoas e obrigações."'));
  assert.ok(products.includes('description: "Suite administrativa da BravSystems para organizar financeiro, RH, DP, documentos e rotinas de gestão em um único centro de controle."'));
  assert.ok(products.includes('cta: "Conhecer o BravHAS"'));
  assert.ok(productPage.includes("ADMINISTRAÇÃO CENTRAL"));
  assert.ok(productPage.includes("O BravHAS centraliza rotinas administrativas, RH, DP, documentos e indicadores em um único ambiente para dar clareza à operação, reduzir retrabalho e acelerar decisões."));
  assert.ok(productPage.includes("Ver visão geral"));
  assert.ok(productPage.includes("Ambiente controlado. Acesso liberado apenas para usuários autorizados."));
  assert.equal(access.includes('bravhas: { status: "ACESSO INTERNO"'), false);
  assert.equal(access.includes("Ambiente existente ainda precisa de auditoria"), false);
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
  assert.equal(home.includes("hostingersite.com"), false);
  assert.equal(central.includes("hostingersite.com"), false);
  assert.equal(home.includes(".vercel.app"), false);
  assert.equal(central.includes(".vercel.app"), false);
});

test("/acessar permanece canônica e /meus-sistemas permanece alias", async () => {
  const central = await read("app/acessar/page.tsx");
  const alias = await read("app/meus-sistemas/page.tsx");
  assert.ok(central.includes('canonical: "/acessar"'));
  assert.ok(alias.includes('redirect("/acessar")'));
  assert.equal(alias.includes("productAccessCatalog"), false);
});

test("Central possui visão executiva do portfólio", async () => {
  const central = await read("app/acessar/page.tsx");
  for (const text of [
    "Sua central BravSystems, com status e acesso em um único lugar.",
    "Visão do portfólio",
    "Produtos mapeados",
    "Em homologação",
    "Em desenvolvimento",
    "Acessos oficiais",
  ]) {
    assert.ok(central.includes(text), `${text} ausente da Central`);
  }
  assert.ok(central.includes("data-access-overview"));
});

test("Central explica limitação atual de filtro por contrato sem inventar posse", async () => {
  const central = await read("app/acessar/page.tsx");
  assert.ok(central.includes("Nesta etapa, a Central exibe o catálogo governado completo."));
  assert.ok(central.includes("poderá filtrar os produtos contratados"));
});

test("Central mantém seis cards com CTA condicionado a URL oficial", async () => {
  const central = await read("app/acessar/page.tsx");
  assert.ok(central.includes("productAccessCatalog.map"));
  assert.ok(central.includes("data-access-product"));
  assert.ok(central.includes("data-access-blocked"));
  assert.ok(central.includes("Acesso oficial ainda não liberado"));
  assert.ok(central.includes("product.loginHref"));
});

test("Central destaca estado do ambiente e ações comerciais", async () => {
  const central = await read("app/acessar/page.tsx");
  assert.ok(central.includes("Estado do ambiente"));
  assert.ok(central.includes("Conhecer produto"));
  assert.ok(central.includes("Falar com vendas"));
  assert.ok(central.includes("statusStyles"));
  assert.ok(central.includes("statusAccent"));
});

test("Header reforça navegação de ecossistema e acesso", async () => {
  const header = await read("components/SiteHeader.tsx");
  for (const label of ["Ecossistema", "Destaques", "Por que BravSystems", "Equipe", "Central", "Contato", "Meus Sistemas"]) {
    assert.ok(header.includes(label), `${label} ausente do header`);
  }
  assert.ok(header.includes("Falar com especialista"));
  assert.ok(header.includes('href="/acessar"'));
});

test("Equipe apresenta liderança e modelo de atuação sem inventar integrantes", async () => {
  const home = await read("app/page.tsx");
  const team = await read("components/TeamSection.tsx");
  const footer = await read("components/SiteFooter.tsx");
  assert.ok(home.includes("<TeamSection />"));
  assert.ok(team.includes('id="equipe"'));
  assert.ok(team.includes("Robson Fernandes"));
  assert.ok(team.includes("Founder &amp; CEO"));
  assert.ok(team.includes("Produto e tecnologia"));
  assert.ok(team.includes("Operações e qualidade"));
  assert.ok(team.includes("Comercial e relacionamento"));
  assert.ok(footer.includes('href="/#equipe"'));
});

test("BravOS preserva asset aprovado e destaque comercial", async () => {
  const page = await read("app/page.tsx");
  assert.ok(page.includes('id="bravos"'));
  assert.ok(page.includes("A operação acontece em tempo real. Sua gestão também deveria."));
  assert.ok(page.includes("/bravos-hero-approved.webp"));
  assert.ok(page.includes("Conhecer BravOS"));
});

test("Home comunica governança sem métricas fictícias", async () => {
  const page = await read("app/page.tsx");
  assert.ok(page.includes("Homologação ≠ produção"));
  assert.ok(page.includes("Acesso controlado"));
  assert.equal(page.includes("mil clientes"), false);
  assert.equal(page.includes("milhões faturados"), false);
});

test("Formulário comercial permanece preservado", async () => {
  const form = await read("components/LeadForm.tsx");
  const home = await read("app/page.tsx");
  assert.ok(form.includes("politica-de-privacidade"));
  assert.ok(form.includes('name="website"'));
  assert.ok(form.includes("defaultInterest"));
  assert.ok(home.includes("<LeadForm />"));
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
