import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const expectedRoles = [
  ["Argos", "Head of Technology Operations & Portfolio"],
  ["Atlas", "Core Architecture & Backend"],
  ["Forge", "Operations & Product Experience"],
  ["Sentry", "Quality & Release Engineering"],
  ["Scout", "Intelligence & Technology Audit"],
  ["Pulse", "Messaging Platform Engineering"],
  ["Nexus", "Product Engineering — BravHAS"],
  ["Orion", "Product Engineering — BravHOS"],
  ["Sofia", "Learning Experience & BravAcademy"],
  ["Vega", "AI Media & Video Engineering"],
  ["Lira", "Social Platform Engineering"],
  ["Marco", "Web Experience & Institutional Brand"],
];

const approvedPortraits = {
  robson: "/team/robson.svg",
  argos: "/team/argos.svg",
  atlas: "/team/atlas.jpg",
  forge: "/team/forge.jpg",
  sentry: "/team/sentry.jpg",
  scout: "/team/scout.svg",
  pulse: "/team/pulse.svg",
  nexus: "/team/nexus.svg",
  orion: "/team/orion.jpg",
  sofia: "/team/sofia.jpg",
  vega: "/team/vega.jpg",
  lira: "/team/lira.jpg",
  marco: "/team/marco.jpg",
};

test("TEAM posiciona Robson e especialistas pelas funções profissionais", async () => {
  const team = await read("lib/team.ts");
  const page = await read("app/equipe/page.tsx");

  assert.ok(team.includes('name: "Robson"'));
  assert.ok(team.includes('role: "Founder & CEO"'));
  assert.ok(page.includes("Especialistas com papéis claros no ecossistema."));
  assert.ok(page.includes("Cada especialista atua em uma frente definida de tecnologia, produto, qualidade, operações e experiência digital da BravSystems."));

  for (const [name, role] of expectedRoles) {
    assert.ok(team.includes(`name: "${name}"`), `${name} ausente da equipe`);
    assert.ok(team.includes(`role: "${role}"`), `${name}: função pública incorreta`);
  }

  assert.equal(team.includes('name: "Scott"'), false, "Scout/Scott deve permanecer identidade única");
});

test("Transparência sobre IA aparece uma única vez e não como selo individual", async () => {
  const page = await read("app/equipe/page.tsx");
  const section = await read("components/TeamSection.tsx");
  const disclosure = "A BravSystems opera com liderança humana e uma estrutura de agentes especializados apoiados por inteligência artificial.";

  assert.equal(page.includes("Agente de IA BravSystems"), false);
  assert.equal(section.includes("Agente de IA BravSystems"), false);
  assert.equal(section.includes("Agentes de IA BravSystems"), false);
  assert.equal(section.includes("Transparência de IA"), false);
  assert.equal(page.split(disclosure).length - 1, 1);
  assert.ok(page.includes("data-team-transparency"));
});

test("TEAM integra Equipe à Home, navegação, rodapé e sitemap", async () => {
  const home = await read("app/page.tsx");
  const section = await read("components/TeamSection.tsx");
  const header = await read("components/SiteHeader.tsx");
  const footer = await read("components/SiteFooter.tsx");
  const sitemap = await read("app/sitemap.ts");

  assert.ok(home.includes('import { TeamSection } from "@/components/TeamSection"'));
  assert.ok(home.includes("<TeamSection />"));
  assert.ok(section.includes('id="equipe"'));
  assert.ok(section.includes("12 frentes especializadas, papéis explícitos."));
  assert.ok(section.includes("Responsabilidades claras por tecnologia, produto e disciplina"));
  assert.ok(header.includes('["Equipe", "/equipe"]'));
  assert.equal(header.includes("Agentes de IA"), false);
  assert.ok(footer.includes('href="/equipe"'));
  assert.ok(sitemap.includes('`${base}/equipe`'));
});

test("Treze retratos aprovados são vinculados e nenhum perfil permanece pendente", async () => {
  const team = await read("lib/team.ts");

  for (const [slug, portraitPath] of Object.entries(approvedPortraits)) {
    assert.ok(team.includes(`slug: "${slug}"`), `${slug}: perfil ausente`);
    assert.ok(team.includes(`portraitSrc: "${portraitPath}"`), `${slug}: portraitSrc aprovado ausente`);
  }

  assert.equal(team.split('portraitStatus: "approved",').length - 1, 13, "devem existir exatamente treze retratos aprovados");
  assert.equal(team.split('portraitSrc: null,').length - 1, 0, "não deve existir retrato pendente");
  assert.equal(team.split('portraitStatus: "pending",').length - 1, 0, "não deve existir status pendente");
});

test("SEO da Equipe usa template global sem duplicar a marca", async () => {
  const page = await read("app/equipe/page.tsx");
  const layout = await read("app/layout.tsx");

  assert.ok(layout.includes('template: "%s | BravSystems"'));
  assert.ok(page.includes('title: "Equipe",'));
  assert.equal(page.includes('title: "Equipe | BravSystems",\n  description:'), false);
  assert.ok(page.includes('canonical: "/equipe"'));
  assert.ok(page.includes('twitter: {'));
  assert.ok(page.includes('title: "Equipe | BravSystems"'));
});
