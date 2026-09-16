import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const approvedJpegSlugs = ["atlas", "forge", "sentry", "orion", "sofia", "vega", "lira", "marco"];
const approvedSvgSlugs = ["robson", "argos", "scout", "pulse", "nexus"];

function readJpegSize(buffer) {
  assert.equal(buffer[0], 0xff, "assinatura JPEG inválida");
  assert.equal(buffer[1], 0xd8, "SOI JPEG ausente");
  assert.equal(buffer.at(-2), 0xff, "EOI JPEG inválido");
  assert.equal(buffer.at(-1), 0xd9, "EOI JPEG ausente");

  let offset = 2;
  while (offset < buffer.length - 4) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    while (buffer[offset] === 0xff) offset += 1;
    const marker = buffer[offset++];
    if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) continue;
    const length = buffer.readUInt16BE(offset);
    assert.ok(length >= 2, `segmento JPEG inválido: ${marker.toString(16)}`);
    if ([0xc0, 0xc1, 0xc2].includes(marker)) {
      return {
        height: buffer.readUInt16BE(offset + 3),
        width: buffer.readUInt16BE(offset + 5),
        components: buffer[offset + 7],
        marker,
      };
    }
    offset += length;
  }
  throw new Error("SOF JPEG não encontrado");
}

test("TEAM — oito JPEGs aprovados possuem estrutura e resolução institucional", async () => {
  for (const slug of approvedJpegSlugs) {
    const buffer = await readFile(new URL(`../public/team/${slug}.jpg`, import.meta.url));
    assert.ok(buffer.length >= 100_000, `${slug}: arquivo excessivamente pequeno (${buffer.length} bytes)`);
    const { width, height, components } = readJpegSize(buffer);
    assert.ok(width >= 1200, `${slug}: largura insuficiente (${width}px)`);
    assert.ok(height >= 1200, `${slug}: altura insuficiente (${height}px)`);
    assert.equal(components, 3, `${slug}: JPEG deve possuir três componentes de cor`);
  }
});

test("TEAM — cinco novos retratos SVG encapsulam JPEG válido para publicação web", async () => {
  for (const slug of approvedSvgSlugs) {
    const svg = await readFile(new URL(`../public/team/${slug}.svg`, import.meta.url), "utf8");
    assert.ok(svg.startsWith("<svg"), `${slug}: SVG inválido`);
    assert.ok(svg.includes("data:image/jpeg;base64,"), `${slug}: JPEG incorporado ausente`);
    assert.ok(svg.includes(`Retrato institucional de ${slug === "robson" ? "Robson" : slug.charAt(0).toUpperCase() + slug.slice(1)}`), `${slug}: identificação do retrato ausente`);
    assert.ok(svg.length > 10_000, `${slug}: asset SVG excessivamente pequeno`);
  }
});
