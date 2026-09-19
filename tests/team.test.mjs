import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const forbidden = ["Argos", "Atlas", "Forge", "Sentry", "Scout", "Pulse", "Nexus", "Orion", "Sofia", "Vega", "Lira", "Marco"];

test("Equipe pública contém somente Robson e Harpia", async () => {
  const team = await read("lib/team.ts");
  const page = await read("app/equipe/page.tsx");
  const section = await read("components/TeamSection.tsx");

  assert.ok(team.includes('name: "Robson"'));
  assert.ok(team.includes('role: "Founder & CEO"'));
  assert.ok(team.includes('name: "Harpia"'));
  assert.ok(team.includes('role: "Mascote oficial da BravSystems"'));
  assert.ok(team.includes('portraitSrc: "/bravsystems-logo.png"'));
  assert.ok(team.includes("export const team = [founder, harpia] as const"));

  for (const name of forbidden) {
    assert.equal(team.includes(`name: "${name}"`), false, `${name} não pode permanecer na equipe pública`);
    assert.equal(page.includes(name), false, `${name} não pode aparecer na página de equipe`);
    assert.equal(section.includes(name), false, `${name} não pode aparecer na Home`);
  }
});

test("Home e página Equipe comunicam a regra Robson + Harpia", async () => {
  const page = await read("app/equipe/page.tsx");
  const section = await read("components/TeamSection.tsx");
  const home = await read("app/page.tsx");
  const footer = await read("components/SiteFooter.tsx");
  const sitemap = await read("app/sitemap.ts");

  assert.ok(page.includes("Robson e Harpia."));
  assert.ok(page.includes("representação institucional: Robson + Harpia"));
  assert.ok(section.includes("Robson e Harpia. A identidade por trás de todo o ecossistema."));
  assert.ok(section.includes('data-team-member={member.slug}'));
  assert.ok(home.includes("<TeamSection />"));
  assert.ok(footer.includes('href="/equipe"'));
  assert.ok(sitemap.includes('${base}/equipe'));
});

test("Páginas de todos os produtos carregam assinatura institucional", async () => {
  const productPage = await read("app/[slug]/page.tsx");
  const signature = await read("components/InstitutionalSignature.tsx");

  assert.ok(productPage.includes("<InstitutionalSignature productName={product.name} />"));
  assert.ok(signature.includes("Founder & CEO"));
  assert.ok(signature.includes("Mascote oficial"));
  assert.ok(signature.includes("Harpia"));
  assert.ok(signature.includes("Robson"));
});

test("SEO da Equipe usa Robson e Harpia sem duplicar template", async () => {
  const page = await read("app/equipe/page.tsx");
  const layout = await read("app/layout.tsx");

  assert.ok(layout.includes('template: "%s | BravSystems"'));
  assert.ok(page.includes('title: "Equipe",'));
  assert.ok(page.includes('canonical: "/equipe"'));
  assert.ok(page.includes('title: "Robson e Harpia | BravSystems"'));
});
