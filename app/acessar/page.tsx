import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { productAccessCatalog, type ProductAccessStatus } from "@/lib/product-access";

export const metadata: Metadata = {
  title: "Meus Sistemas",
  description: "Central corporativa BravSystems para consultar produtos, estágios e acessos oficialmente autorizados.",
  alternates: { canonical: "/acessar" },
  openGraph: {
    type: "website",
    url: "https://bravsystems.com.br/acessar",
    title: "Meus Sistemas | BravSystems",
    description: "Consulte seus produtos BravSystems e use somente acessos oficialmente autorizados.",
  },
};

const statusStyles: Record<ProductAccessStatus, string> = {
  "ACESSO DISPONÍVEL": "border-emerald-300 bg-emerald-50 text-emerald-800",
  "EM HOMOLOGAÇÃO": "border-amber-300 bg-amber-50 text-amber-800",
  "EM DESENVOLVIMENTO": "border-sky-300 bg-sky-50 text-sky-800",
  "ACESSO INTERNO": "border-slate-300 bg-slate-100 text-slate-700",
};

const statusAccent: Record<ProductAccessStatus, string> = {
  "ACESSO DISPONÍVEL": "from-emerald-500 to-emerald-700",
  "EM HOMOLOGAÇÃO": "from-amber-400 to-amber-600",
  "EM DESENVOLVIMENTO": "from-sky-500 to-[#2563eb]",
  "ACESSO INTERNO": "from-slate-400 to-slate-600",
};

const initials: Record<string, string> = {
  bravos: "OS",
  bravhas: "HAS",
  bravhos: "HOS",
  bravmsg: "MSG",
  bravacademy: "ACA",
  bravvideo: "VID",
};

export default function AccessPage() {
  const availableCount = productAccessCatalog.filter((product) => product.loginHref).length;
  const homologationCount = productAccessCatalog.filter((product) => product.status === "EM HOMOLOGAÇÃO").length;
  const developmentCount = productAccessCatalog.filter((product) => product.status === "EM DESENVOLVIMENTO").length;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f3f7fa] text-[#082844]">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-[#224d69] bg-[#071f35] text-white">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-36 -top-48 h-[560px] w-[560px] rounded-full bg-[#1d6c9e]/35 blur-3xl" />
          <div className="absolute -bottom-56 left-[10%] h-[420px] w-[420px] rounded-full bg-[#174f76]/25 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-[1280px] gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <div className="inline-flex rounded-full border border-white/15 bg-white/[.06] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[.16em] text-[#9fc8e2]">
              Entrar / Meus Sistemas
            </div>
            <h1 className="mt-5 max-w-3xl text-[42px] font-bold leading-[1.02] tracking-[-.05em] sm:text-6xl">
              Sua central BravSystems, com status e acesso em um único lugar.
            </h1>
            <p className="mt-5 max-w-3xl text-[16px] leading-8 text-[#c3d7e5]">
              Entenda rapidamente quais produtos estão em homologação, quais seguem em desenvolvimento e onde o acesso oficial aparecerá quando for autorizado.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-[#c3d7e5]">
              <span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-2">Sem previews técnicos</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-2">Sem hostname temporário</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-2">Rota canônica /acessar</span>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[.06] p-5 shadow-2xl shadow-black/20 backdrop-blur-sm" data-access-overview>
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#85c1e5]">Visão do portfólio</div>
                <div className="mt-1 text-xl font-bold">Estado atual dos ambientes</div>
              </div>
              <span className="rounded-full border border-white/10 bg-[#0d3858] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.1em] text-[#bcd2e0]">Governado</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              {[
                [String(productAccessCatalog.length), "Produtos mapeados"],
                [String(homologationCount), "Em homologação"],
                [String(developmentCount), "Em desenvolvimento"],
                [String(availableCount), "Acessos oficiais"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-[#0a2a46] px-4 py-4">
                  <div className="text-3xl font-black tracking-[-.05em] text-white">{value}</div>
                  <div className="mt-1 text-[10px] font-extrabold uppercase tracking-[.08em] text-[#9eb8ca]">{label}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-[#386681] bg-[#0c304d] p-4 text-xs leading-6 text-[#bfd4e1]">
              Nesta etapa, a Central exibe o catálogo governado completo. Quando a identificação de cliente estiver habilitada, esta mesma arquitetura poderá filtrar os produtos contratados sem expor URLs técnicas.
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#d8e6ef] bg-white">
        <div className="mx-auto grid max-w-[1280px] gap-px bg-[#d8e6ef] sm:grid-cols-3">
          {[
            ["01", "Localize", "Encontre o produto e confira o estágio atual."],
            ["02", "Valide", "Leia o estado do ambiente antes de tentar acessar."],
            ["03", "Acesse", "O botão só é liberado com endereço oficial autorizado."],
          ].map(([step, title, text]) => (
            <article key={step} className="bg-white px-5 py-6 sm:px-7">
              <div className="text-[10px] font-black tracking-[.14em] text-[#2563eb]">{step}</div>
              <h2 className="mt-2 text-lg font-extrabold">{title}</h2>
              <p className="mt-1 text-sm leading-6 text-[#657b8e]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="sistemas" className="bg-[#f3f7fa] py-14 sm:py-18">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Produtos e ambientes</div>
              <h2 className="mt-3 text-4xl font-bold tracking-[-.045em] sm:text-5xl">Seis produtos. Um padrão único de acesso.</h2>
              <p className="mt-4 text-[16px] leading-8 text-[#60758a]">Status operacional em destaque, mensagem de ambiente objetiva e CTA de acesso condicionado a URL oficial.</p>
            </div>
            <Link href="/#produtos" className="inline-flex min-h-11 items-center justify-center self-start rounded-xl border border-[#c7d9e4] bg-white px-5 text-sm font-extrabold text-[#0f4d78] lg:self-auto">
              Conhecer o ecossistema →
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3" data-access-grid>
            {productAccessCatalog.map((product) => {
              const highlighted = product.slug === "bravacademy" || product.slug === "bravhas";
              return (
                <article
                  key={product.slug}
                  data-access-product={product.slug}
                  className={`group relative flex min-h-[350px] flex-col overflow-hidden rounded-[26px] border bg-white p-5 shadow-lg shadow-[#0b2947]/5 transition hover:-translate-y-1 hover:shadow-xl sm:p-6 ${highlighted ? "border-[#9fc9e1]" : "border-[#d4e2ea]"}`}
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${statusAccent[product.status]}`} aria-hidden="true" />

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0b2947] text-[10px] font-black tracking-[.08em] text-[#9dd0ef]">{initials[product.slug]}</div>
                      <div>
                        <div className="text-[10px] font-extrabold uppercase tracking-[.12em] text-[#70889a]">{product.category}</div>
                        <h3 className="mt-1 text-2xl font-bold tracking-[-.035em]">{product.name}</h3>
                      </div>
                    </div>
                    <span className={`rounded-full border px-2.5 py-1.5 text-[9px] font-extrabold uppercase tracking-[.07em] ${statusStyles[product.status]}`}>{product.status}</span>
                  </div>

                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-[#60758a]">{product.description}</p>

                  <div className={`mt-5 rounded-2xl border p-4 ${product.status === "EM HOMOLOGAÇÃO" ? "border-amber-200 bg-amber-50/60" : "border-[#e0e9ef] bg-[#f8fbfd]"}`}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#7990a2]">Estado do ambiente</span>
                      <span className={`h-2 w-2 rounded-full ${product.status === "EM HOMOLOGAÇÃO" ? "bg-amber-500" : product.status === "ACESSO DISPONÍVEL" ? "bg-emerald-500" : product.status === "EM DESENVOLVIMENTO" ? "bg-sky-500" : "bg-slate-500"}`} aria-hidden="true" />
                    </div>
                    <p className="mt-2 text-sm font-semibold leading-6 text-[#365a73]">{product.environmentNote}</p>
                  </div>

                  <div className="mt-auto grid gap-2.5 pt-6">
                    {product.loginHref ? (
                      <a href={product.loginHref} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#0f4d78] px-5 text-sm font-extrabold text-white transition hover:bg-[#092846]" rel="noopener noreferrer">
                        Acessar {product.name} →
                      </a>
                    ) : (
                      <div data-access-blocked className="rounded-xl border border-dashed border-[#c6d7e2] bg-[#f7fafc] px-4 py-3 text-center text-xs font-extrabold uppercase tracking-[.06em] text-[#71879a]" aria-label={`${product.name} ainda não possui acesso público homologado`}>
                        Acesso oficial ainda não liberado
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2.5">
                      <Link href={product.commercialHref} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#c9dbe7] bg-white px-3 text-center text-xs font-bold text-[#0f4d78] hover:border-[#0f4d78]">
                        Conhecer produto
                      </Link>
                      <Link href={`/${product.slug}#contato`} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#e7f1f7] px-3 text-center text-xs font-bold text-[#315d7e] hover:bg-[#dcebf5]">
                        Falar com vendas
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-[#d7e4ec] bg-white py-12 sm:py-14">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Suporte de acesso</div>
            <h2 className="mt-2 text-3xl font-bold tracking-[-.04em]">O ambiente existe, mas o botão ainda não apareceu?</h2>
            <p className="mt-3 max-w-3xl text-[15px] leading-7 text-[#60758a]">Isso significa que o endereço oficial ainda não foi autorizado para esta Central. Não utilize preview, branch ou hostname temporário como alternativa.</p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <a href="mailto:contato@bravsystems.com.br" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#c8dbe7] bg-white px-5 text-sm font-bold text-[#0f4d78]">contato@bravsystems.com.br</a>
            <Link href="/#contato" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0f4d78] px-5 text-sm font-extrabold text-white">Falar com a BravSystems</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
