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
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Meus Sistemas — BravSystems" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meus Sistemas | BravSystems",
    description: "Consulte produtos, estágios e acessos oficialmente autorizados na Central BravSystems.",
    images: ["/opengraph-image"],
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

        <div className="relative mx-auto grid max-w-[1280px] gap-5 px-4 py-8 sm:gap-8 sm:px-8 sm:py-16 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <div className="inline-flex rounded-full border border-white/15 bg-white/[.06] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.14em] text-[#9fc8e2] sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[.16em]">
              Entrar / Meus Sistemas
            </div>
            <h1 className="mt-4 max-w-3xl text-[34px] font-bold leading-[1.03] tracking-[-.05em] sm:mt-5 sm:text-6xl sm:leading-[1.02]">
              Sua central BravSystems, com status e acesso em um único lugar.
            </h1>
            <p className="mt-4 max-w-3xl text-[15px] leading-6 text-[#c3d7e5] sm:mt-5 sm:text-[16px] sm:leading-8">
              Veja quais produtos estão em homologação, quais seguem em desenvolvimento e onde o acesso oficial será liberado quando autorizado.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5 text-[10px] font-semibold text-[#c3d7e5] sm:mt-6 sm:gap-2 sm:text-xs">
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 sm:px-3.5 sm:py-2">Sem previews técnicos</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 sm:px-3.5 sm:py-2">Sem hostname temporário</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 sm:px-3.5 sm:py-2">/acessar</span>
            </div>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-white/[.06] p-4 shadow-2xl shadow-black/20 backdrop-blur-sm sm:rounded-[28px] sm:p-5" data-access-overview>
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3 sm:gap-4 sm:pb-4">
              <div>
                <div className="text-[9px] font-extrabold uppercase tracking-[.14em] text-[#85c1e5] sm:text-[10px] sm:tracking-[.16em]">Visão do portfólio</div>
                <div className="mt-1 text-lg font-bold sm:text-xl">Estado atual dos ambientes</div>
              </div>
              <span className="rounded-full border border-white/10 bg-[#0d3858] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[.08em] text-[#bcd2e0] sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-[.1em]">Governado</span>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-1.5 sm:mt-4 sm:gap-3 lg:grid-cols-2">
              {[
                [String(productAccessCatalog.length), "Produtos mapeados"],
                [String(homologationCount), "Em homologação"],
                [String(developmentCount), "Em desenvolvimento"],
                [String(availableCount), "Acessos oficiais"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-[#0a2a46] px-2 py-2.5 text-center sm:rounded-2xl sm:px-4 sm:py-4 sm:text-left">
                  <div className="text-xl font-black tracking-[-.05em] text-white sm:text-3xl">{value}</div>
                  <div className="mt-0.5 text-[7px] font-extrabold uppercase tracking-[.02em] text-[#9eb8ca] sm:mt-1 sm:text-[10px] sm:tracking-[.08em]">{label}</div>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-xl border border-[#386681] bg-[#0c304d] p-3 text-[11px] leading-5 text-[#bfd4e1] sm:mt-4 sm:rounded-2xl sm:p-4 sm:text-xs sm:leading-6">
              Nesta etapa, a Central exibe o catálogo governado completo. Quando a identificação de cliente estiver habilitada, esta mesma arquitetura poderá filtrar os produtos contratados sem expor URLs técnicas.
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#d8e6ef] bg-white" aria-label="Como funciona a Central">
        <div className="mx-auto grid max-w-[1280px] grid-cols-3 gap-px bg-[#d8e6ef]">
          {[
            ["01", "Localize", "Encontre o produto e confira o estágio atual."],
            ["02", "Valide", "Leia o estado do ambiente antes de tentar acessar."],
            ["03", "Acesse", "O botão só é liberado com endereço oficial autorizado."],
          ].map(([step, title, text]) => (
            <article key={step} className="bg-white px-2.5 py-4 text-center sm:px-7 sm:py-6 sm:text-left">
              <div className="text-[9px] font-black tracking-[.12em] text-[#2563eb] sm:text-[10px] sm:tracking-[.14em]">{step}</div>
              <h2 className="mt-1 text-[13px] font-extrabold sm:mt-2 sm:text-lg">{title}</h2>
              <p className="mt-1 hidden text-sm leading-6 text-[#657b8e] sm:block">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="sistemas" className="bg-[#f3f7fa] py-10 sm:py-18">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Produtos e ambientes</div>
              <h2 className="mt-3 text-[32px] font-bold leading-[1.05] tracking-[-.045em] sm:text-5xl">Seis produtos. Um padrão único de acesso.</h2>
              <p className="mt-3 text-[15px] leading-7 text-[#60758a] sm:mt-4 sm:text-[16px] sm:leading-8">Status, estado do ambiente e próximo passo em uma leitura única. O acesso só aparece com URL oficial autorizada.</p>
            </div>
            <Link href="/#produtos" className="inline-flex min-h-11 items-center justify-center self-start rounded-xl border border-[#c7d9e4] bg-white px-5 text-sm font-extrabold text-[#0f4d78] lg:self-auto">
              Conhecer o ecossistema →
            </Link>
          </div>

          <div className="mt-6 grid gap-3.5 md:grid-cols-2 xl:grid-cols-3 sm:mt-8" data-access-grid>
            {productAccessCatalog.map((product) => {
              const highlighted = product.slug === "bravacademy" || product.slug === "bravhas";
              return (
                <article
                  key={product.slug}
                  data-access-product={product.slug}
                  className={`group relative flex min-h-0 flex-col overflow-hidden rounded-[24px] border bg-white p-4.5 shadow-lg shadow-[#0b2947]/5 transition hover:-translate-y-1 hover:shadow-xl sm:min-h-[350px] sm:rounded-[26px] sm:p-6 ${highlighted ? "border-[#9fc9e1]" : "border-[#d4e2ea]"}`}
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${statusAccent[product.status]}`} aria-hidden="true" />

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0b2947] text-[9px] font-black tracking-[.08em] text-[#9dd0ef] sm:h-12 sm:w-12 sm:rounded-2xl sm:text-[10px]">{initials[product.slug]}</div>
                      <div className="min-w-0">
                        <div className="line-clamp-1 text-[9px] font-extrabold uppercase tracking-[.09em] text-[#70889a] sm:text-[10px] sm:tracking-[.12em]">{product.category}</div>
                        <h3 className="mt-1 text-[22px] font-bold tracking-[-.035em] sm:text-2xl">{product.name}</h3>
                      </div>
                    </div>
                    <span className={`shrink-0 rounded-full border px-2 py-1.5 text-[8px] font-extrabold uppercase tracking-[.05em] sm:px-2.5 sm:text-[9px] sm:tracking-[.07em] ${statusStyles[product.status]}`}>{product.status}</span>
                  </div>

                  <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#60758a] sm:mt-5 sm:line-clamp-3">{product.description}</p>

                  <div className={`mt-4 rounded-xl border p-3.5 sm:mt-5 sm:rounded-2xl sm:p-4 ${product.status === "EM HOMOLOGAÇÃO" ? "border-amber-200 bg-amber-50/60" : "border-[#e0e9ef] bg-[#f8fbfd]"}`}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[9px] font-extrabold uppercase tracking-[.12em] text-[#7990a2] sm:text-[10px] sm:tracking-[.14em]">Estado do ambiente</span>
                      <span className={`h-2 w-2 rounded-full ${product.status === "EM HOMOLOGAÇÃO" ? "bg-amber-500" : product.status === "ACESSO DISPONÍVEL" ? "bg-emerald-500" : product.status === "EM DESENVOLVIMENTO" ? "bg-sky-500" : "bg-slate-500"}`} aria-hidden="true" />
                    </div>
                    <p className="mt-1.5 text-xs font-semibold leading-5 text-[#365a73] sm:mt-2 sm:text-sm sm:leading-6">{product.environmentNote}</p>
                  </div>

                  <div className="mt-4 grid gap-2 pt-1 sm:mt-auto sm:gap-2.5 sm:pt-6">
                    {product.loginHref ? (
                      <a href={product.loginHref} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0f4d78] px-5 text-sm font-extrabold text-white transition hover:bg-[#092846] sm:min-h-12" rel="noopener noreferrer">
                        Acessar {product.name} →
                      </a>
                    ) : (
                      <div data-access-blocked className="rounded-xl border border-dashed border-[#c6d7e2] bg-[#f7fafc] px-3 py-2.5 text-center text-[10px] font-extrabold uppercase tracking-[.05em] text-[#71879a] sm:px-4 sm:py-3 sm:text-xs sm:tracking-[.06em]" aria-label={`${product.name} ainda não possui acesso público homologado`}>
                        Acesso oficial ainda não liberado
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <Link href={product.commercialHref} className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[#c9dbe7] bg-white px-2.5 text-center text-[11px] font-bold text-[#0f4d78] hover:border-[#0f4d78] sm:min-h-11 sm:px-3 sm:text-xs">
                        Conhecer produto
                      </Link>
                      <Link href={`/${product.slug}#contato`} className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[#e7f1f7] px-2.5 text-center text-[11px] font-bold text-[#315d7e] hover:bg-[#dcebf5] sm:min-h-11 sm:px-3 sm:text-xs">
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

      <section className="border-t border-[#d7e4ec] bg-white py-10 sm:py-14">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-5 px-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Suporte de acesso</div>
            <h2 className="mt-2 text-[28px] font-bold leading-[1.08] tracking-[-.04em] sm:text-3xl">O ambiente existe, mas o botão ainda não apareceu?</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[#60758a] sm:text-[15px] sm:leading-7">O endereço oficial ainda não foi autorizado para esta Central. Preview, branch e hostname temporário não substituem o acesso oficial.</p>
          </div>
          <div className="grid shrink-0 grid-cols-1 gap-2 sm:grid-cols-2">
            <a href="mailto:contato@bravsystems.com.br" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#c8dbe7] bg-white px-5 text-sm font-bold text-[#0f4d78]">contato@bravsystems.com.br</a>
            <Link href="/#contato" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0f4d78] px-5 text-sm font-extrabold text-white">Falar com a BravSystems</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
