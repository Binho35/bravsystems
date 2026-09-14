import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const officialOrigin = "https://www.bravsystems.com.br";
const legacyOrigin = "https://bravsystems.com.br";

const publicMetadataFiles = [
  "app/layout.tsx",
  "app/robots.ts",
  "app/sitemap.ts",
  "app/acessar/page.tsx",
  "app/equipe/page.tsx",
  "app/politica-de-privacidade/page.tsx",
  "app/[slug]/page.tsx",
];

test("metadata pública usa www como origem oficial única", async () => {
  for (const path of publicMetadataFiles) {
    const source = await read(path);
    assert.ok(source.includes(officialOrigin), `${path}: origem oficial www ausente`);
    assert.equal(source.includes(legacyOrigin), false, `${path}: origem sem www ainda presente`);
  }
});

test("layout, robots e sitemap publicam a mesma origem canônica", async () => {
  const layout = await read("app/layout.tsx");
  const robots = await read("app/robots.ts");
  const sitemap = await read("app/sitemap.ts");

  assert.ok(layout.includes(`metadataBase: new URL("${officialOrigin}")`));
  assert.ok(layout.includes(`url: "${officialOrigin}"`));
  assert.ok(robots.includes(`host: "${officialOrigin}"`));
  assert.ok(robots.includes(`sitemap: "${officialOrigin}/sitemap.xml"`));
  assert.ok(sitemap.includes(`const base = "${officialOrigin}"`));
});
