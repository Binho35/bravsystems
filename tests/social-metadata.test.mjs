import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("Central possui Open Graph e Twitter metadata próprios", async () => {
  const central = await read("app/acessar/page.tsx");
  assert.ok(central.includes('canonical: "/acessar"'));
  assert.ok(central.includes('title: "Meus Sistemas | BravSystems"'));
  assert.ok(central.includes('twitter: {'));
  assert.ok(central.includes('description: "Consulte produtos, estágios e acessos oficialmente autorizados na Central BravSystems."'));
  assert.ok(central.includes('images: ["/opengraph-image"]'));
});

test("Páginas de produto geram metadata social específica por produto", async () => {
  const productPage = await read("app/[slug]/page.tsx");
  assert.ok(productPage.includes('title: `${product.name} | BravSystems`'));
  assert.ok(productPage.includes('description: product.description'));
  assert.ok(productPage.includes('twitter: { card: "summary_large_image", title: `${product.name} | BravSystems`, description: product.description, images: ["/opengraph-image"] }'));
  assert.ok(productPage.includes('canonical: `/${product.slug}`'));
});
