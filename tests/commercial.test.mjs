import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const officialProducts = ["BravOS", "BravHAS", "BravHOS", "BravMsg", "BravAcademy", "BravVideo"];

test("homepage posiciona BravSystems antes de qualquer produto isolado", async () => {
  const page = await read("app/page.tsx");
  assert.ok(page.includes("BravSystems • Ecossistema SaaS B2B"));
  assert.ok(page.includes("Tecnologia para transformar operações complexas em gestão simples, conectada e escalável."));
  assert.ok(page.includes("6 produtos no ecossistema"));
  assert.equal(page.includes("bravos.com"), false);
});

test("homepage separa jornada comercial de acesso do cliente", async () => {
  const page = await read("app/page.tsx");
  for (const text of ["Conhecer soluções", "Falar com a BravSystems", "Entrar / Meus Sistemas", "Abrir Meus Sistemas"]) {
    assert.ok(page.includes(text), `${text} ausente`);
  }
  assert.ok(page.includes('href="/acessar"'));
  assert.ok(page.includes('href="#contato"'));
});

test("homepage apresenta os seis produtos oficiais com descritores aprovados", async () => {
  const page = await read("app/page.tsx");
  const products = await read("lib/products.ts");
  for (const name of officialProducts) {
    assert.ok(products.includes(`name: \"${name}\"`), `${name} ausente do catálogo`);
  }
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
  assert.ok(page.includes("products.map"), "homepage deve renderizar o catálogo oficial dinamicamente");
});

test("BravAcademy recebe destaque próprio e status EM HOMOLOGAÇÃO", async () => {
  const page = await read("app/page.tsx");
  const products = await read("lib/products.ts");
  const start = products.indexOf('slug: "bravacademy"');
  const end = products.indexOf('slug: "bravvideo"', start);
  assert.ok(start >= 0 && end > start, "bloco BravAcademy não localizado");
  const academy = products.slice(start, end);

  assert.ok(academy.includes('category: "Universidade Corporativa White Label"'));
  assert.ok(academy.includes('status: "Em homologação"'));
  assert.ok(academy.includes('description: "Capacitação, trilhas de aprendizagem, avaliações, progresso e certificação em um ambiente personalizado para sua empresa."'));
  assert.ok(academy.includes('cta: "Conhecer BravAcademy"'));

  assert.ok(page.includes('id="bravacademy"'));
  assert.ok(page.includes("EM HOMOLOGAÇÃO"));
  assert.ok(page.includes("Capacitação, trilhas de aprendizagem, avaliações, progresso e certificação em um ambiente personalizado para cada empresa."));
  assert.ok(page.includes("Cursos e aulas"));
  assert.ok(page.includes("Trilhas"));
  assert.ok(page.includes("Avaliações"));
  assert.ok(page.includes("Progresso"));
  assert.ok(page.includes("Certificação"));
  assert.ok(page.includes("Conhecer BravAcademy"));

  for (const forbidden of ["Production Ready", "100% pronto", "Disponível para todos", "produção comercial definitiva"]) {
    assert.equal(page.includes(forbidden), false, `claim proibido na homepage: ${forbidden}`);
    assert.equal(academy.includes(forbidden), false, `claim proibido no catálogo: ${forbidden}`);
  }
});

test("BravAcademy não expõe hostname Hostinger temporário", async () => {
  const page = await read("app/page.tsx");
  const accessPage = await read("app/acessar/page.tsx");
  assert.equal(page.includes("hostingersite.com"), false);
  assert.equal(accessPage.includes("hostingersite.com"), false);
  assert.equal(page.includes("honeydew-goshawk"), false);
  assert.equal(accessPage.includes("honeydew-goshawk"), false);
});

test("BravOS preserva protagonismo sem dominar o Hero institucional", async () => {
  const page = await read("app/page.tsx");
  assert.ok(page.includes('id="bravos"'));
  assert.ok(page.includes("A operação acontece em tempo real. Sua gestão também deveria."));
  assert.ok(page.includes('/bravos-hero-approved.webp'));
  assert.ok(page.indexOf("BravSystems • Ecossistema SaaS B2B") < page.indexOf('id="bravos"'));
});

test("homepage preserva contexto real e governança sem métricas fictícias", async () => {
  const page = await read("app/page.tsx");
  assert.ok(page.includes("¡Bravazzo! 335"));
  assert.ok(page.includes("Homologação separada de produção"));
  assert.ok(page.includes("Acesso com governança"));
  assert.equal(page.includes("mil clientes"), false);
  assert.equal(page.includes("milhões faturados"), false);
});

test("catálogo de acesso mantém contrato de URLs e bloqueia hosts técnicos", async () => {
  const access = await read("lib/product-access.ts");
  for (const envName of [
    "NEXT_PUBLIC_BRAVOS_APP_URL",
    "NEXT_PUBLIC_BRAVHAS_APP_URL",
    "NEXT_PUBLIC_BRAVHOS_APP_URL",
    "NEXT_PUBLIC_BRAVMSG_APP_URL",
    "NEXT_PUBLIC_BRAVACADEMY_APP_URL",
    "NEXT_PUBLIC_BRAVVIDEO_APP_URL",
  ]) {
    assert.ok(access.includes(envName), `${envName} ausente do contrato de acesso`);
  }
  assert.ok(access.includes('url.protocol !== "https:"'));
  assert.ok(access.includes('"localhost"'));
  assert.ok(access.includes('/\\.vercel\\.(?:app|sh)$/'));
  assert.ok(access.includes('hostname.endsWith(".hostingersite.com")'));
  assert.equal(access.includes("honeydew-goshawk-202562"), false);
});

test("catálogo de acesso registra estágio governado dos seis produtos", async () => {
  const access = await read("lib/product-access.ts");
  for (const slug of ["bravos", "bravacademy", "bravhos", "bravmsg", "bravhas", "bravvideo"]) {
    assert.ok(access.includes(`${slug}: {`), `${slug} ausente de governedState`);
  }
  assert.ok(access.includes('bravos: { status: "EM HOMOLOGAÇÃO"'));
  assert.ok(access.includes('bravacademy: { status: "EM HOMOLOGAÇÃO"'));
  assert.ok(access.includes('bravhas: { status: "ACESSO INTERNO"'));
  assert.ok(access.includes("environmentNote"));
});

test("/acessar é a arquitetura canônica e /meus-sistemas funciona apenas como alias", async () => {
  const accessPage = await read("app/acessar/page.tsx");
  const alias = await read("app/meus-sistemas/page.tsx");
  assert.ok(accessPage.includes('canonical: "/acessar"'));
  assert.ok(accessPage.includes("Entrar / Meus Sistemas"));
  assert.ok(alias.includes('redirect("/acessar")'));
  assert.equal(alias.includes("productAccessCatalog"), false, "alias não deve duplicar a Central de Acesso");
});

test("Central de Acesso separa login e venda e mantém CTA bloqueado sem URL", async () => {
  const page = await read("app/acessar/page.tsx");
  assert.ok(page.includes("productAccessCatalog"));
  assert.ok(page.includes("ACESSO EM IMPLANTAÇÃO"));
  assert.ok(page.includes("environmentNote"));
  assert.ok(page.includes("Conhecer produto"));
  assert.ok(page.includes("Falar com vendas"));
  assert.ok(page.includes("loginHref"));
  assert.equal(page.includes("vercel.app"), false);
  assert.equal(page.includes("hostingersite.com"), false);
});

test("navegação principal mantém venda e login visualmente separados", async () => {
  const header = await read("components/SiteHeader.tsx");
  for (const label of ["Soluções", "Produtos", "Destaques", "Por que BravSystems", "Contato", "Entrar / Meus Sistemas"]) {
    assert.ok(header.includes(label), `${label} ausente da navegação`);
  }
  assert.ok(header.includes('href="/#contato"'));
  assert.ok(header.includes('href="/acessar"'));
});

test("footer representa marca-mãe e Central de Sistemas", async () => {
  const footer = await read("components/SiteFooter.tsx");
  assert.ok(footer.includes("Empresa brasileira de tecnologia"));
  assert.ok(footer.includes("Entrar / Meus Sistemas"));
  assert.ok(footer.includes("Desenvolvimento, homologação e produção são estágios distintos."));
  assert.ok(footer.includes("products.map"));
});

test("formulário comercial permanece preservado e sem claim de entrega por e-mail", async () => {
  const form = await read("components/LeadForm.tsx");
  const home = await read("app/page.tsx");
  assert.ok(form.includes("politica-de-privacidade"));
  assert.ok(form.includes('name="website"'));
  assert.ok(form.includes("defaultInterest"));
  assert.ok(home.includes("<LeadForm />"));
  assert.equal(home.includes("e-mail enviado com sucesso"), false);
});

test("API comercial mantém validação e anti-abuso", async () => {
  const route = await read("app/api/contact/route.ts");
  assert.ok(route.includes("MAX_PAYLOAD_BYTES"));
  assert.ok(route.includes("RATE_LIMIT_MAX_REQUESTS"));
  assert.ok(route.includes("allowedInterests"));
  assert.ok(route.includes("escapeHtml"));
});

test("páginas de produto integram catálogo e Central de Acesso", async () => {
  const productPage = await read("app/[slug]/page.tsx");
  assert.ok(productPage.includes("getProductAccess"));
  assert.ok(productPage.includes("getProductVideo"));
  assert.ok(productPage.includes('href="/acessar"'));
  assert.ok(productPage.includes("LeadForm defaultInterest={product.name}"));
});

test("vídeos aprovados permanecem sob demanda e BravAcademy não ganha mídia inexistente", async () => {
  const videos = await read("lib/product-videos.ts");
  const player = await read("components/ProductVideoDialog.tsx");
  for (const filename of [
    "16623CBB-AD78-4480-B09E-EE8E53335411.mp4",
    "0CFE05FE-68C5-4278-B49A-594BCA0AFB55(1).mp4",
    "E8FD96E0-0A8D-41C4-8E0C-C77C43EC212F.mp4",
    "5A6BC2BF-0A0B-4AFC-B8C9-77BB2AC84FBD.mp4",
  ]) {
    assert.ok(videos.includes(filename), `${filename} ausente do mapeamento`);
  }
  const start = videos.indexOf('slug: "bravacademy"');
  const end = videos.indexOf('slug: "bravvideo"', start);
  const academy = videos.slice(start, end);
  assert.ok(academy.includes("assetPresent: false"));
  assert.ok(player.includes('preload="none"'));
  assert.equal(player.includes("autoPlay"), false);
});

test("sitemap mantém somente a Central canônica de acesso", async () => {
  const sitemap = await read("app/sitemap.ts");
  assert.ok(sitemap.includes("products.map"));
  assert.ok(sitemap.includes("/acessar"));
  assert.equal(sitemap.includes("/meus-sistemas"), false);
  assert.ok(sitemap.includes("politica-de-privacidade"));
});

test("Quality exige audit lint testes TypeScript build Browser E2E e evidência visual", async () => {
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
