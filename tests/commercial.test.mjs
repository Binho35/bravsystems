import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("homepage não expõe placeholders técnicos antigos", async () => {
  const page = await read("app/page.tsx");
  assert.equal(page.includes("Futuro: /"), false);
  assert.equal(page.includes("Vídeo em preparação"), false);
  assert.equal(page.includes("Operação offline-first"), false);
});

test("portal comercial prioriza BravOS e mantém CTAs obrigatórios", async () => {
  const page = await read("app/page.tsx");
  for (const text of ["Conhecer o BravOS", "Entrar na plataforma", "Agendar demonstração", "Demonstração do BravOS"]) {
    assert.ok(page.includes(text), `${text} ausente`);
  }
  assert.ok(page.includes("NEXT_PUBLIC_BRAVOS_APP_URL"), "contrato de acesso à plataforma ausente");
  assert.ok(page.includes('defaultInterest="BravOS"'), "formulário da homepage não está contextualizado para BravOS");
});

test("homepage demonstra jornada operacional e prova real sem métricas inventadas", async () => {
  const page = await read("app/page.tsx");
  for (const stage of ["Pedido", "Cozinha", "Caixa", "Estoque", "Gestão"]) {
    assert.ok(page.includes(stage), `${stage} ausente da jornada`);
  }
  assert.ok(page.includes("¡Bravazzo! 335"), "operação-piloto não identificada");
  assert.ok(page.includes("bravsystems-video-institucional.mp4"), "prova visual real do BravOS ausente");
});

test("ecossistema comercial destaca BravOS BravAcademy e BravMsg sem roadmap fictício", async () => {
  const page = await read("app/page.tsx");
  for (const slug of ["bravos", "bravacademy", "bravmsg"]) {
    assert.ok(page.includes(`\"${slug}\"`), `${slug} ausente da seleção principal do ecossistema`);
  }
  assert.equal(page.includes("BravCRM"), false);
  assert.equal(page.includes("BravInsights"), false);
});

test("BravAcademy usa posicionamento público aprovado sem claims proibidos", async () => {
  const products = await read("lib/products.ts");
  const start = products.indexOf('slug: "bravacademy"');
  const end = products.indexOf('slug: "bravvideo"', start);
  assert.ok(start >= 0 && end > start, "bloco BravAcademy não localizado");
  const academy = products.slice(start, end);

  assert.ok(academy.includes('category: "Universidade Corporativa White Label"'));
  assert.ok(academy.includes('description: "Capacitação, trilhas de aprendizagem, avaliações, progresso e certificação em um ambiente personalizado para sua empresa."'));
  assert.ok(academy.includes('cta: "Conhecer BravAcademy"'));
  assert.ok(academy.includes('status: "Em evolução"'));

  for (const forbidden of ["Disponível", "Production Ready", "experiência mobile completa", "SSO", "integração automática", "DRM", "produção pronta", "pronto para produção"]) {
    assert.equal(academy.includes(forbidden), false, `claim proibido no BravAcademy: ${forbidden}`);
  }
  assert.equal(academy.includes('"IA"'), false, "IA não pode ser apresentada como claim público do BravAcademy");
});

test("portfólio contém os seis produtos oficiais", async () => {
  const products = await read("lib/products.ts");
  for (const name of ["BravOS", "BravHAS", "BravHOS", "BravMsg", "BravAcademy", "BravVideo"]) {
    assert.ok(products.includes(`name: \"${name}\"`), `${name} ausente`);
  }
  assert.ok(products.includes('status: "Em homologação"'));
});

test("claims de BravHAS BravHOS e BravMsg seguem governança comercial atual", async () => {
  const products = await read("lib/products.ts");
  assert.ok(products.includes("Head Administrative System"));
  assert.ok(products.includes("financeiro, pessoas, RH, DP"));
  assert.equal(products.includes("RH e DP, que pertencem ao BravHOS"), false);
  assert.ok(products.includes("vertical especializada da BravSystems"));
  assert.ok(products.includes("Leads e relacionamento"));
  assert.equal(products.includes('["Contatos", "Campanhas", "Inbox", "Consentimentos", "Opt-out e suppression", "CRM"'), false);
});

test("formulário possui política, honeypot e produto contextual", async () => {
  const form = await read("components/LeadForm.tsx");
  assert.ok(form.includes("politica-de-privacidade"));
  assert.ok(form.includes('name="website"'));
  assert.ok(form.includes("defaultInterest"));
});

test("API aplica validação e anti-abuso", async () => {
  const route = await read("app/api/contact/route.ts");
  assert.ok(route.includes("MAX_PAYLOAD_BYTES"));
  assert.ok(route.includes("RATE_LIMIT_MAX_REQUESTS"));
  assert.ok(route.includes("allowedInterests"));
  assert.ok(route.includes("escapeHtml"));
});

test("vídeos de produto seguem o mapeamento aprovado e excluem BravMsg", async () => {
  const videos = await read("lib/product-videos.ts");
  for (const filename of [
    "16623CBB-AD78-4480-B09E-EE8E53335411.mp4",
    "0CFE05FE-68C5-4278-B49A-594BCA0AFB55(1).mp4",
    "E8FD96E0-0A8D-41C4-8E0C-C77C43EC212F.mp4",
    "5A6BC2BF-0A0B-4AFC-B8C9-77BB2AC84FBD.mp4",
  ]) {
    assert.ok(videos.includes(filename), `${filename} ausente do mapeamento`);
  }
  assert.equal(videos.includes("4AF9A997-3C6F-4747-BA29-FD244CCA2D9B.mp4"), false);
  assert.equal(videos.includes('slug: "bravmsg"'), false);
  assert.ok(videos.includes("width: 512"));
  assert.ok(videos.includes("height: 910"));
});

test("ativação parcial libera BravOS BravHAS e BravVideo e mantém BravAcademy oculto", async () => {
  const videos = await read("lib/product-videos.ts");
  const productPage = await read("app/[slug]/page.tsx");
  const block = (slug, nextSlug) => {
    const start = videos.indexOf(`slug: \"${slug}\"`);
    const end = nextSlug ? videos.indexOf(`slug: \"${nextSlug}\"`, start + 1) : videos.indexOf("];", start);
    assert.ok(start >= 0 && end > start, `bloco ${slug} não localizado`);
    return videos.slice(start, end);
  };

  const bravos = block("bravos", "bravhas");
  const bravhas = block("bravhas", "bravacademy");
  const academy = block("bravacademy", "bravvideo");
  const bravvideo = block("bravvideo");

  assert.ok(bravos.includes("assetPresent: true"));
  assert.ok(bravos.includes('/product-videos/posters/bravos.svg'));
  assert.ok(bravhas.includes("assetPresent: true"));
  assert.ok(bravhas.includes('/product-videos/posters/bravhas.svg'));
  assert.ok(bravvideo.includes("assetPresent: true"));
  assert.ok(bravvideo.includes('/product-videos/posters/bravvideo.svg'));
  assert.ok(academy.includes("assetPresent: false"));
  assert.ok(productPage.includes("productVideo?.assetPresent && <ProductVideoDialog"));
});

test("player de produto é modal, sob demanda, 9:16 e sem autoplay", async () => {
  const player = await read("components/ProductVideoDialog.tsx");
  const productPage = await read("app/[slug]/page.tsx");
  assert.ok(player.includes("Assistir apresentação"));
  assert.ok(player.includes("aria-haspopup=\"dialog\""));
  assert.ok(player.includes("<dialog"));
  assert.ok(player.includes("controls"));
  assert.ok(player.includes("playsInline"));
  assert.ok(player.includes('preload="none"'));
  assert.ok(player.includes("aspect-[512/910]"));
  assert.equal(player.includes("autoPlay"), false);
  assert.ok(player.includes("onCancel"));
  assert.ok(productPage.includes("ProductVideoDialog"));
});

test("sitemap publica produtos e política canônica", async () => {
  const sitemap = await read("app/sitemap.ts");
  assert.ok(sitemap.includes("products.map"));
  assert.ok(sitemap.includes("politica-de-privacidade"));
});
