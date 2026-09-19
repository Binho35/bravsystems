import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";

test("TEAM — apenas o retrato de Robson permanece na pasta pública de equipe", async () => {
  const files = (await readdir(new URL("../public/team/", import.meta.url))).sort();
  assert.deepEqual(files, ["robson.svg"]);

  const svg = await readFile(new URL("../public/team/robson.svg", import.meta.url), "utf8");
  assert.ok(svg.startsWith("<svg"), "Robson: SVG inválido");
  assert.ok(svg.includes("data:image/jpeg;base64,"), "Robson: JPEG incorporado ausente");
  assert.ok(svg.includes("Retrato institucional de Robson"), "Robson: identificação do retrato ausente");
  assert.ok(svg.length > 10_000, "Robson: asset SVG excessivamente pequeno");
});

test("TEAM — Harpia usa o logo oficial íntegro da BravSystems", async () => {
  const png = await readFile(new URL("../public/bravsystems-logo.png", import.meta.url));
  const signature = [0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a];
  assert.deepEqual([...png.subarray(0, 8)], signature, "Harpia: assinatura PNG inválida");
  assert.equal(png.toString("ascii", 12, 16), "IHDR", "Harpia: IHDR ausente");
  assert.equal(png.readUInt32BE(16), 1254, "Harpia: largura do logo inesperada");
  assert.equal(png.readUInt32BE(20), 1254, "Harpia: altura do logo inesperada");
  assert.ok(png.length > 1_000_000, "Harpia: logo oficial excessivamente pequeno");
});
