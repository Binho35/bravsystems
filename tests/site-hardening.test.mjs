import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("status públicos dos seis produtos ficam alinhados ao catálogo governado", async () => {
  const products = await read("lib/products.ts");
  const access = await read("lib/product-access.ts");

  for (const [slug, publicStatus, governedStatus] of [
    ["bravos", "Em homologação", "EM HOMOLOGAÇÃO"],
    ["bravhas", "Em homologação", "EM HOMOLOGAÇÃO"],
    ["bravhos", "Em desenvolvimento", "EM DESENVOLVIMENTO"],
    ["bravmsg", "Em desenvolvimento", "EM DESENVOLVIMENTO"],
    ["bravacademy", "Em homologação", "EM HOMOLOGAÇÃO"],
    ["bravvideo", "Em desenvolvimento", "EM DESENVOLVIMENTO"],
  ]) {
    const productBlock = products.slice(products.indexOf(`slug: "${slug}"`));
    assert.ok(productBlock.startsWith(`slug: "${slug}"`));
    assert.ok(productBlock.includes(`status: "${publicStatus}"`), `${slug}: status público divergente`);
    assert.ok(access.includes(`${slug}: { status: "${governedStatus}"`), `${slug}: status governado divergente`);
  }

  assert.ok(products.includes('limitations: ["Tecnologia em desenvolvimento"'));
});

test("Política de Privacidade tem uma única rota canônica", async () => {
  const canonical = await read("app/politica-de-privacidade/page.tsx");
  const legacy = await read("app/privacidade/page.tsx");

  assert.ok(canonical.includes('title: "Política de Privacidade",'));
  assert.equal(canonical.includes('title: "Política de Privacidade | BravSystems",\n  description:'), false);
  assert.ok(canonical.includes('canonical: "/politica-de-privacidade"'));
  assert.ok(canonical.includes("<SiteHeader />"));
  assert.ok(canonical.includes("<SiteFooter />"));
  assert.ok(legacy.includes('permanentRedirect("/politica-de-privacidade")'));
});

test("navegação responsiva permanece disponível em tablet", async () => {
  const header = await read("components/SiteHeader.tsx");

  assert.ok(header.includes('xl:hidden'));
  assert.ok(header.includes('h-11 w-11'));
  assert.ok(header.includes('aria-label="Abrir menu de navegação"'));
  assert.ok(header.includes('lg:inline-flex'));
  assert.equal(header.includes('sm:hidden'), false);
});

test("site tem 404 institucional em português", async () => {
  const notFound = await read("app/not-found.tsx");

  assert.ok(notFound.includes("Esta página não faz parte do caminho atual."));
  assert.ok(notFound.includes('href="/acessar"'));
  assert.ok(notFound.includes('href="/#contato"'));
  assert.ok(notFound.includes("<SiteHeader />"));
  assert.ok(notFound.includes("<SiteFooter />"));
});
