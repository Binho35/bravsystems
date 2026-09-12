import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { productAccessCatalog, type ProductAccessStatus } from "@/lib/product-access";

export const metadata: Metadata = {
  title: "Central de Acesso aos Sistemas",
  description: "Acesse o sistema BravSystems contratado ou consulte a disponibilidade das plataformas do ecossistema BravSystems.",
  alternates: { canonical: "/acessar" },
  openGraph: {
    type: "website",
    url: "https://bravsystems.com.br/acessar",
    title: "Central de Acesso | BravSystems",
    description: "Selecione o produto contratado para acessar sua plataforma BravSystems.",
  },
};

const statusStyles: Record<ProductAccessStatus, string> = {
  "ACESSO DISPONÍVEL": "border-emerald-200 bg-emerald-50 text-emerald-800",
  "EM HOMOLOGAÇÃO": "border-amber-200 bg-amber-50 text-amber-800",
  "EM DESENVOLVIMENTO": "border-sky-200 bg-sky-50 text-sky-800",
  "ACESSO INTERNO": "border-slate-200 bg-slate-100 text-slate-700",
};

export default function AccessPage() {
  const availableCount = productAccessCatalog.filter((product) => product.loginHref).length;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f4f8fb] text-[#092846]">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-[#d8e6ef] bg-[#082844] text-white">
        <div className="pointer-events-none absolute -right-32 -top-48 h-[560px] w-[560px] rounded-full bg-[#1d6c9e]/35 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1280px] px-6 py-20 sm:py-24 lg:px-8">
          <div className="inline-flex rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-extrabold uppercase tracking-[.16em] text-[#9fc8e2]">
            Portal do cliente
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-[-.05em] sm:text-6xl">Acesse seu sistema BravSystems.</h1>
          <p className="mt-6 max-w-3xl text-[18px] leading-8 text-[#c3d7e5]">Selecione abaixo o produto contratado. O portal direciona você para a autenticação oficial de cada plataforma — sem criar credenciais paralelas e sem encaminhar para ambientes de desenvolvimento.</p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-[#c3d7e5]">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{productAccessCatalog.length} produtos mapeados</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{availableCount} acesso(s) público(s) configurado(s)</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">HTTPS obrigatório</span>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-[28px] border border-[#d7e5ed] bg-[#f8fbfd] p-7">
              <div className="text-xs font-extrabold uppercase tracking-[.16em] text-[#2563eb]">Já é cliente</div>
              <h2 className="mt-3 text-3xl font-bold tracking-[-.04em]">Seu caminho deve ser direto.</h2>
              <p className="mt-4 text-[15px] leading-7 text-[#60758a]">Encontre o produto contratado e use o botão de acesso quando o ambiente oficial estiver liberado.</p>
            </article>
            <article className="rounded-[28px] border border-[#d7e5ed] bg-[#f8fbfd] p-7">
              <div className="text-xs font-extrabold uppercase tracking-[.16em] text-[#2563eb]">Ainda não é cliente</div>
              <h2 className="mt-3 text-3xl font-bold tracking-[-.04em]">Conheça antes de contratar.</h2>
              <p className="mt-4 text-[15px] leading-7 text-[#60758a]">Cada produto possui uma página comercial com problema atendido, benefícios, escopo atual e limitações de maturidade.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="border-y border-[#d8e6ef] bg-[#eef6fb] py-18 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Sistemas BravSystems</div>
            <h2 className="mt-4 text-4xl font-bold tracking-[-.04em] sm:text-5xl">Um único portal para encontrar o seu produto.</h2>
            <p className="mt-5 text-[17px] leading-8 text-[#60758a]">A disponibilidade de login acompanha a homologação real de cada SaaS. Produtos sem ambiente público validado permanecem visíveis comercialmente, mas não expõem Preview, branch ou infraestrutura interna.</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {productAccessCatalog.map((product) => (
              <article key={product.slug} className="flex min-h-[360px] flex-col rounded-[28px] border border-[#d3e2eb] bg-white p-7 shadow-lg shadow-[#0b2947]/5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-extrabold uppercase tracking-[.14em] text-[#2563eb]">{product.category}</div>
                    <h3 className="mt-2 text-3xl font-bold tracking-[-.03em]">{product.name}</h3>
                  </div>
                  <span className={`rounded-full border px-3 py-1.5 text-[10px] font-extrabold tracking-[.08em] ${statusStyles[product.status]}`}>{product.status}</span>
                </div>

                <p className="mt-5 text-sm leading-7 text-[#60758a]">{product.description}</p>

                <div className="mt-auto grid gap-3 pt-8">
                  {product.loginHref ? (
                    <a href={product.loginHref} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#0f4d78] px-5 text-sm font-extrabold text-white transition hover:bg-[#092846]" rel="noopener noreferrer">
                      Acessar {product.name} →
                    </a>
                  ) : (
                    <div className="rounded-xl border border-dashed border-[#c8d9e4] bg-[#f8fbfd] px-5 py-3 text-center text-sm font-bold text-[#6b8092]" aria-label={`${product.name} ainda não possui acesso público homologado`}>
                      Acesso público ainda não liberado
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    <Link href={product.commercialHref} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#c9dbe7] bg-white px-4 text-center text-sm font-bold text-[#0f4d78] hover:border-[#0f4d78]">
                      Conhecer solução
                    </Link>
                    <Link href={`/${product.slug}#contato`} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#e8f2f8] px-4 text-center text-sm font-bold text-[#315d7e] hover:bg-[#dcebf5]">
                      Solicitar demonstração
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-6 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-8">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Precisa de ajuda?</div>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.04em]">Não encontrou o acesso que esperava?</h2>
            <p className="mt-5 max-w-2xl text-[16px] leading-8 text-[#60758a]">Isso pode significar que o ambiente contratado ainda está em ativação ou homologação. Fale com a BravSystems para confirmar seu acesso sem usar links técnicos ou não oficiais.</p>
          </div>
          <div className="rounded-[28px] border border-[#d4e3ec] bg-[#f4f9fc] p-7">
            <div className="text-sm font-bold text-[#092846]">Atendimento BravSystems</div>
            <a href="mailto:contato@bravsystems.com.br" className="mt-3 block text-lg font-extrabold text-[#0f4d78]">contato@bravsystems.com.br</a>
            <Link href="/#contato" className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#0f4d78] px-5 text-sm font-extrabold text-white">Falar com atendimento</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
