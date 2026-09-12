import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("portal SaaS exibe os seis produtos com os estados definidos por governança", async () => {
  const systems = await read("lib/portal-systems.ts");

  for (const name of ["BravOS", "BravAcademy", "BravHOS", "BravMsg", "BravHAS", "BravVideo"]) {
    assert.ok(systems.includes(`name: "${name}"`), `${name} ausente do portal`);
  }

  for (const status of [
    "PREVIEW — EM HOMOLOGAÇÃO",
    "EM DESENVOLVIMENTO — ACESSO WEB EM IMPLANTAÇÃO",
    "EM DESENVOLVIMENTO — PREVIEW WEB EM PREPARAÇÃO",
    "EM DESENVOLVIMENTO / AMBIENTE A AUDITAR",
  ]) {
    assert.ok(systems.includes(status), `status ausente: ${status}`);
  }

  assert.equal((systems.match(/accessUrl: null/g) ?? []).length, 6, "nenhuma URL externa deve estar ativada neste ciclo");
  assert.equal(systems.includes('environment: "production"'), false, "nenhum produto pode ser declarado como produção");
});

test("Meus Sistemas mantém CTA bloqueado sem URL e está preparado para ativação posterior", async () => {
  const page = await read("app/meus-sistemas/page.tsx");

  assert.ok(page.includes("Meus Sistemas"));
  assert.ok(page.includes("system.accessUrl ?"), "renderização condicional de URL ausente");
  assert.ok(page.includes("ACESSO EM IMPLANTAÇÃO"), "fallback de CTA ausente");
  assert.ok(page.includes("system.accessLabel"), "rótulo do CTA homologado ausente");
  assert.ok(page.includes("Produção"));
  assert.ok(page.includes("Homologação"));
  assert.ok(page.includes("Preview"));
  assert.ok(page.includes("Em desenvolvimento"));
  assert.ok(page.includes("md:grid-cols-2"), "grid intermediário responsivo ausente");
  assert.ok(page.includes("xl:grid-cols-3"), "grid desktop responsivo ausente");
});

test("jornada global oferece Entrar e leva a Meus Sistemas", async () => {
  const layout = await read("app/layout.tsx");
  const launcher = await read("components/PortalAccessLauncher.tsx");

  assert.ok(layout.includes("<PortalAccessLauncher />"), "entrada global não montada no layout");
  assert.ok(launcher.includes('href="/meus-sistemas"'), "Entrar não aponta para Meus Sistemas");
  assert.ok(launcher.includes(">\n      Entrar\n    </Link>"), "rótulo Entrar ausente");
});
