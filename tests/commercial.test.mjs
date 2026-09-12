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

test("homepage demonstra jornada operacional sem mídia institucional antiga", async () => {
  const page = await read("app/page.tsx");
  for (const stage of ["Pedido", "Cozinha", "Caixa", "Estoque", "Gestão"]) {
    assert.ok(page.includes(stage), `${stage} ausente da jornada`);
  }
  assert.ok(page.includes("¡Bravazzo! 335"), "operação-piloto não identificada");
  assert.equal(page.includes("bravsystems-video-institucional.mp4"), false, "vídeo institucional antigo não pode permanecer na homepage");
  assert.equal(page.includes('preload="metadata"'), false, "homepage não deve pré-carregar mídia antiga");
});

test("homepage descobre somente os três vídeos ativos com poster real e player sob demanda", async () => {
  const page = await read("app/page.tsx");
  for (const slug of ["bravos", "bravhas", "bravvideo"]) {
    assert.ok(page.includes(`data-homepage-video={product.slug}`), "cards de vídeo da homepage ausentes");
    assert.ok(page.includes(`\"${slug}\"`), `${slug} ausente da seleção de vídeos da homepage`);
  }
  assert.ok(page.includes('const homepageVideoSlugs = new Set(["bravos", "bravhas", "bravvideo"])'));
  assert.ok(page.includes("getProductVideo(product.slug)"));
  assert.ok(page.includes("video?.assetPresent"));
  assert.ok(page.includes("<ProductVideoDialog video={video} />"));
  assert.ok(page.includes("video.poster"));
  assert.equal(page.includes('const homepageVideoSlugs = new Set(["bravos", "bravhas", "bravvideo", "bravacademy"'), false);
  assert.equal(page.includes('const homepageVideoSlugs = new Set(["bravos", "bravhas", "bravvideo", "bravmsg"'), false);
  assert.equal(page.includes('const homepageVideoSlugs = new Set(["bravos", "bravhas", "bravvideo", "bravhos"'), false);
});

test("ecossistema comercial destaca os produtos oficiais sem roadmap fictício", async () => {
  const page = await read("app/page.tsx");
  for (const slug of ["bravos", "bravacademy", "bravmsg"]) {
    assert.ok(page.includes(`\"${slug}\"`) || page.includes(`/${slug}`), `${slug} ausente da homepage`);
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
  const homePage = await read("app/page.tsx");
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
  assert.ok(homePage.includes("ProductVideoDialog"));
});

test("sitemap publica produtos, central de acesso e política canônica", async () => {
  const sitemap = await read("app/sitemap.ts");
  assert.ok(sitemap.includes("products.map"));
  assert.ok(sitemap.includes("/acessar"));
  assert.ok(sitemap.includes("politica-de-privacidade"));
});

test("central de acesso separa login de jornada comercial", async () => {
  const page = await read("app/acessar/page.tsx");
  assert.ok(page.includes("Acesse seu sistema BravSystems"));
  assert.ok(page.includes("productAccessCatalog"));
  assert.ok(page.includes("Acesso público ainda não liberado"));
  assert.ok(page.includes("Conhecer solução"));
  assert.ok(page.includes("Solicitar demonstração"));
  assert.ok(page.includes("loginHref"));
  assert.equal(page.includes("-git-main-"), false, "Central não deve hardcodar alias de branch");
  assert.equal(page.includes("vercel.app"), false, "Central não deve hardcodar domínio técnico Vercel");
});

test("catálogo de acesso exige URL HTTPS configurada e não inventa endpoints", async () => {
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
  assert.ok(access.includes('loginHref ? "ACESSO DISPONÍVEL"'));
  assert.equal(access.includes("https://bravos-"), false);
  assert.equal(access.includes("vercel.app"), false);
});

test("navegação principal expõe jornada institucional e acesso ao cliente", async () => {
  const header = await read("components/SiteHeader.tsx");
  for (const label of ["Início", "Produtos", "Soluções", "Por que BravSystems", "Contato", "Acessar"]) {
    assert.ok(header.includes(label), `${label} ausente da navegação`);
  }
  assert.ok(header.includes('href="/acessar"'));
});
