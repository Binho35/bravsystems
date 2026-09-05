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

test("portfólio contém os seis produtos oficiais", async () => {
  const products = await read("lib/products.ts");
  for (const name of ["BravOS", "BravHAS", "BravHOS", "BravMsg", "BravAcademy", "BravVideo"]) {
    assert.ok(products.includes(`name: \"${name}\"`), `${name} ausente`);
  }
  assert.ok(products.includes('status: "Em homologação"'));
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

test("sitemap publica produtos e política canônica", async () => {
  const sitemap = await read("app/sitemap.ts");
  assert.ok(sitemap.includes("products.map"));
  assert.ok(sitemap.includes("politica-de-privacidade"));
});
