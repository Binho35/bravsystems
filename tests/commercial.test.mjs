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

test("API de contato é fail-closed e registra diagnóstico seguro do provedor", async () => {
  const route = await read("app/api/contact/route.ts");
  assert.ok(route.includes("EMAIL_DELIVERY_FAILURE_MESSAGE"));
  assert.ok(route.includes("RESEND_DOMAIN_NOT_VERIFIED"));
  assert.ok(route.includes("contact_email_provider_failure provider=resend"));
  assert.ok(route.includes("contact_email_configuration_error provider=resend code=RESEND_API_KEY_MISSING"));
  assert.ok(route.includes('if (!resendResponse.ok)'));
  assert.ok(route.includes('{ status: 502 }'));
  assert.equal(route.includes('console.error("Erro Resend:",'), false);
  assert.equal(route.includes('console.error("Erro Resend no e-mail de boas-vindas:",'), false);
  assert.equal(route.includes("providerBody}`"), false, "resposta bruta do provedor não pode ser logada");
});

test("sitemap publica produtos e política canônica", async () => {
  const sitemap = await read("app/sitemap.ts");
  assert.ok(sitemap.includes("products.map"));
  assert.ok(sitemap.includes("politica-de-privacidade"));
});
