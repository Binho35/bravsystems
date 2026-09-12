import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { productAccessCatalog, type ProductAccessStatus } from "@/lib/product-access";

export const metadata: Metadata = {
  title: "Meus Sistemas",
  description: "Portal oficial para localizar os produtos BravSystems e acessar somente ambientes oficialmente homologados.",
  alternates: { canonical: "/acessar" },
  openGraph: {
    type: "website",
    url: "https://bravsystems.com.br/acessar",
    title: "Meus Sistemas | BravSystems",
    description: "Encontre seu produto BravSystems e acesse somente ambientes oficialmente autorizados.",
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
    <main className="min-h-screen overflow-x-hidden bg-[#f5f9fc] text-[#092846]">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-[#d8e6ef] bg-[#071f35] text-white">
        <div className="pointer-events-none absolute -right-32 -top-48 h-[560px] w-[560px] rounded-full bg-[#1d6c9e]/35 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20">
          <div className="inline-flex rounded-full border border-white/15 bg-white/[.06] px-4 py-2 text-xs font-extrabold uppercase tracking-[.16em] text-[#9fc8e2]">
            Entrar / Meus Sistemas
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-[-.05em] sm:text-6xl">Seus sistemas BravSystems em um único lugar.</h1>
          <p className="mt-6 max-w-3xl text-[18px] leading-8 text-[#c3d7e5]">Consulte o estágio real de cada produto e use o acesso somente quando existir um endereço oficial homologado. Preview técnico, branch, localhost e hostname temporário não viram login de cliente.</p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-[#c3d7e5]">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{productAccessCatalog.length} produtos mapeados</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{availableCount} acesso(s) público(s) configurado(s)</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Sem credencial paralela</span>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto grid max-w-[1280px] gap-6 px-5 sm:px-8 md:grid-cols-2">
          <article className="border-l-4 border-[#0f4d78] pl-6">
            <div className="text-xs font-extrabold uppercase tracking-[.16em] text-[#2563eb]">Já é cliente</div>
            <h2 className="mt-3 text-3xl font-bold tracking-[-.04em]">Acesso separado da jornada comercial.</h2>
            <p className="mt-4 text-[15px] leading-7 text-[#60758a]">Quando o ambiente oficial estiver autorizado, o botão de acesso aparece no produto correspondente.</p>
          </article>
          <article className="border-l-4 border-[#8abbd8] pl-6">
            <div className="text-xs font-extrabold uppercase tracking-[.16em] text-[#2563eb]">Ainda não é cliente</div>
            <h2 className="mt-3 text-3xl font-bold tracking-[-.04em]">Conheça o produto antes de contratar.</h2>
            <p className="mt-4 text-[15px] leading-7 text-[#60758a]">As páginas comerciais explicam escopo, benefícios, limitações atuais e permitem solicitar uma conversa contextualizada.</p>
          </article>
        </div>
      </section>

      <section id="sistemas" className="border-y border-[#d8e6ef] bg-[#eef6fb] py-18 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Meus Sistemas</div>
            <h2 className="mt-4 text-4xl font-bold tracking-[-.04em] sm:text-5xl">Estágio claro. Link somente quando autorizado.</h2>
            <p className="mt-5 text-[17px] leading-8 text-[#60758a]">A estrutura está pronta para receber URLs oficiais futuramente sem redesenhar o portal. Até lá, o estado do ambiente permanece visível e o CTA de login fica bloqueado.</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3" data-access-grid>
            {productAccessCatalog.map((product) => (
              <article key={product.slug} className="flex min-h-[370px] flex-col rounded-[28px] border border-[#d3e2eb] bg-white p-6 shadow-lg shadow-[#0b2947]/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0b2947]/8 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-extrabold uppercase tracking-[.14em] text-[#2563eb]">{product.category}</div>
                    <h3 className="mt-2 text-3xl font-bold tracking-[-.03em]">{product.name}</h3>
                  </div>
                  <span className={`rounded-full border px-3 py-1.5 text-[10px] font-extrabold tracking-[.08em] ${statusStyles[product.status]}`}>{product.status}</span>
                </div>

                <p className="mt-5 text-sm leading-7 text-[#60758a]">{product.description}</p>
                <div className="mt-5 rounded-2xl border border-[#e0e9ef] bg-[#f8fbfd] p-4">
                  <div className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#7990a2]">Estado do ambiente</div>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[#365a73]">{product.environmentNote}</p>
                </div>

                <div className="mt-auto grid gap-3 pt-7">
                  {product.loginHref ? (
                    <a href={product.loginHref} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#0f4d78] px-5 text-sm font-extrabold text-white transition hover:bg-[#092846]" rel="noopener noreferrer">
                      Acessar {product.name} →
                    </a>
                  ) : (
                    <div className="rounded-xl border border-dashed border-[#c8d9e4] bg-[#f8fbfd] px-5 py-3 text-center text-sm font-bold text-[#6b8092]" aria-label={`${product.name} ainda não possui acesso público homologado`}>
                      ACESSO EM IMPLANTAÇÃO
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    <Link href={product.commercialHref} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#c9dbe7] bg-white px-4 text-center text-sm font-bold text-[#0f4d78] hover:border-[#0f4d78]">
                      Conhecer produto
                    </Link>
                    <Link href={`/${product.slug}#contato`} className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#e8f2f8] px-4 text-center text-sm font-bold text-[#315d7e] hover:bg-[#dcebf5]">
                      Falar com vendas
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-7 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Precisa de ajuda?</div>
            <h2 className="mt-3 text-3xl font-bold tracking-[-.04em] sm:text-4xl">Não encontrou o acesso que esperava?</h2>
            <p className="mt-4 max-w-2xl text-[16px] leading-8 text-[#60758a]">O ambiente pode estar em implantação, homologação ou auditoria. Confirme o acesso com a BravSystems em vez de utilizar endereços técnicos ou não oficiais.</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <a href="mailto:contato@bravsystems.com.br" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#c8dbe7] bg-white px-6 font-bold text-[#0f4d78]">contato@bravsystems.com.br</a>
            <Link href="/#contato" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#0f4d78] px-6 font-extrabold text-white">Falar com a BravSystems</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
