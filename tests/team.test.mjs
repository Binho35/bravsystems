import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("TEAM 001 publica liderança humana e doze agentes de IA sem fingir equipe humana", async () => {
  const team = await read("lib/team.ts");
  const page = await read("app/equipe/page.tsx");

  assert.ok(team.includes('name: "Robson"'));
  assert.ok(team.includes('role: "Founder & CEO"'));
  assert.ok(page.includes("Liderança humana + agentes de IA"));
  assert.ok(page.includes("Agente de IA BravSystems"));
  assert.ok(page.includes("não cargos humanos nem históricos profissionais fictícios"));

  for (const name of ["Argos", "Atlas", "Forge", "Sentry", "Scout", "Pulse", "Nexus", "Orion", "Sofia", "Vega", "Lira", "Marco"]) {
    assert.ok(team.includes(`name: "${name}"`), `${name} ausente da equipe`);
  }

  assert.equal(team.includes('name: "Scott"'), false, "Scout/Scott deve permanecer identidade única");
});

test("TEAM 001 integra Equipe à Home, navegação, rodapé e sitemap", async () => {
  const home = await read("app/page.tsx");
  const section = await read("components/TeamSection.tsx");
  const header = await read("components/SiteHeader.tsx");
  const footer = await read("components/SiteFooter.tsx");
  const sitemap = await read("app/sitemap.ts");

  assert.ok(home.includes('import { TeamSection } from "@/components/TeamSection"'));
  assert.ok(home.includes("<TeamSection />"));
  assert.ok(section.includes('id="equipe"'));
  assert.ok(section.includes("12 frentes especializadas, papéis explícitos."));
  assert.ok(section.includes("Não são apresentados como funcionários humanos."));
  assert.ok(header.includes('["Equipe", "/equipe"]'));
  assert.ok(footer.includes('href="/equipe"'));
  assert.ok(sitemap.includes('`${base}/equipe`'));
});

test("Retratos pendentes não fingem pessoas humanas e permanecem preparados para asset aprovado", async () => {
  const team = await read("lib/team.ts");
  const page = await read("app/equipe/page.tsx");

  assert.ok(team.includes('portraitSrc: null'));
  assert.ok(team.includes('portraitStatus: "pending"'));
  assert.ok(page.includes("data-portrait-status"));
  assert.ok(page.includes("Identidade visual institucional provisória"));
});
