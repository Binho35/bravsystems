import type { Metadata } from "next";
import Link from "next/link";
import { portalSystems, type PortalEnvironment } from "@/lib/portal-systems";

export const metadata: Metadata = {
  title: "Meus Sistemas",
  description: "Portal de acesso aos produtos BravSystems e seus ambientes homologados.",
  robots: { index: false, follow: false },
};

const environmentStyles: Record<PortalEnvironment, string> = {
  production: "border-emerald-200 bg-emerald-50 text-emerald-700",
  homologation: "border-amber-200 bg-amber-50 text-amber-800",
  preview: "border-sky-200 bg-sky-50 text-sky-700",
  development: "border-slate-200 bg-slate-100 text-slate-600",
};

const environmentLegend: Array<{ key: PortalEnvironment; label: string }> = [
  { key: "production", label: "Produção" },
  { key: "homologation", label: "Homologação" },
  { key: "preview", label: "Preview" },
  { key: "development", label: "Em desenvolvimento" },
];

export default function MySystemsPage() {
  return (
    <main className="min-h-screen bg-[#f4f8fb] text-[#092846]">
      <header className="border-b border-[#dbe7ef] bg-white/95">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link href="/" className="font-extrabold tracking-[-.03em] text-[#0f4d78]">
            BravSystems
          </Link>
          <div className="rounded-full border border-[#d5e2eb] bg-[#f7fafc] px-4 py-2 text-xs font-bold uppercase tracking-[.12em] text-[#5c7284]">
            Portal SaaS
          </div>
        </div>
      </header>

      <section className="border-b border-[#dbe7ef] bg-white">
        <div className="mx-auto max-w-[1280px] px-5 py-12 sm:px-8 sm:py-16">
          <div className="max-w-3xl">
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Acesso BravSystems</div>
            <h1 className="mt-4 text-4xl font-bold tracking-[-.045em] sm:text-5xl lg:text-6xl">Meus Sistemas</h1>
            <p className="mt-5 text-base leading-7 text-[#60758a] sm:text-lg sm:leading-8">
              Um ponto único para acompanhar os produtos BravSystems e acessar somente ambientes com URL oficialmente homologada.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-[#d8e5ed] bg-[#f8fbfd] p-5 text-sm leading-6 text-[#5d7285] sm:p-6">
            <strong className="text-[#173f5f]">Identidade BravSystems:</strong> a jornada está preparada para uma identidade única. Nenhum sistema paralelo de senha ou SSO definitivo é criado nesta etapa; o contrato técnico de identidade será definido separadamente.
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Legenda de ambientes">
            {environmentLegend.map((item) => (
              <div key={item.key} className={`rounded-xl border px-3 py-3 text-center text-xs font-extrabold uppercase tracking-[.08em] ${environmentStyles[item.key]}`}>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-10 sm:px-8 sm:py-14">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {portalSystems.map((system) => (
            <article key={system.slug} className="flex min-h-[330px] flex-col rounded-[28px] border border-[#d2e1ea] bg-white p-6 shadow-lg shadow-[#0b2947]/5 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-[.14em] text-[#2563eb]">Produto BravSystems</div>
                  <h2 className="mt-2 text-3xl font-bold tracking-[-.04em] text-[#0b2947]">{system.name}</h2>
                </div>
                <span className={`rounded-full border px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.09em] ${environmentStyles[system.environment]}`}>
                  {system.environmentLabel}
                </span>
              </div>

              <p className="mt-5 text-sm leading-6 text-[#62778a]">{system.description}</p>

              <div className="mt-6 rounded-2xl border border-[#e0e9ef] bg-[#f8fafc] p-4">
                <div className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#7890a2]">Status do ambiente</div>
                <p className="mt-2 text-sm font-bold leading-6 text-[#244d6b]">{system.status}</p>
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row sm:items-center">
                {system.accessUrl ? (
                  <a
                    href={system.accessUrl}
                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-[#0f4d78] px-5 text-center text-sm font-extrabold text-white transition hover:bg-[#092846]"
                    rel="noreferrer"
                  >
                    {system.accessLabel}
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    className="inline-flex min-h-12 flex-1 cursor-not-allowed items-center justify-center rounded-xl border border-[#d6e1e8] bg-[#eef3f6] px-5 text-center text-sm font-extrabold text-[#7b8d9b]"
                  >
                    ACESSO EM IMPLANTAÇÃO
                  </span>
                )}
                <Link href={system.productHref} className="inline-flex min-h-12 items-center justify-center px-2 text-sm font-extrabold text-[#0f4d78] underline decoration-[#b3cbdc] underline-offset-4">
                  Ver produto
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-[#cddde7] bg-[#0b2947] p-6 text-white sm:p-8">
          <div className="text-xs font-extrabold uppercase tracking-[.16em] text-[#86c2e7]">Governança de acesso</div>
          <h2 className="mt-3 text-2xl font-bold tracking-[-.03em] sm:text-3xl">A URL só é ativada depois da homologação.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#bed2e1] sm:text-base">
            Enquanto Argos não certificar um endereço, o portal mantém o CTA bloqueado e identifica o ambiente pelo estado real. A futura URL pode ser inserida no contrato de dados do portal sem alterar o desenho desta tela.
          </p>
        </div>
      </section>
    </main>
  );
}
