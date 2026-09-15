import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TeamSection } from "@/components/TeamSection";
import { productAccessCatalog, type ProductAccessStatus } from "@/lib/product-access";
import { products } from "@/lib/products";

const homeDescriptors: Record<string, string> = {
  bravos: "Operação e gestão para restaurantes.",
  bravhas: "Gestão administrativa, financeira e operacional.",
  bravhos: "Recursos Humanos e Departamento Pessoal.",
  bravmsg: "Comunicação, atendimento, leads e relacionamento.",
  bravacademy: "Universidade Corporativa White Label.",
  bravvideo: "Produção e automação de conteúdo audiovisual corporativo.",
};

const productInitials: Record<string, string> = {
  bravos: "OS",
  bravhas: "HAS",
  bravhos: "HOS",
  bravmsg: "MSG",
  bravacademy: "ACA",
  bravvideo: "VID",
};

const academyJourney = ["Cursos", "Trilhas", "Avaliações", "Progresso", "Certificação"] as const;

function statusTone(status: ProductAccessStatus) {
  if (status === "ACESSO DISPONÍVEL") return "border-emerald-300/70 bg-emerald-50 text-emerald-800";
  if (status === "EM HOMOLOGAÇÃO") return "border-amber-300/80 bg-amber-50 text-amber-800";
  if (status === "ACESSO INTERNO") return "border-slate-300 bg-slate-100 text-slate-700";
  return "border-sky-300/80 bg-sky-50 text-sky-800";
}

export default function Home() {
  const accessBySlug = new Map(productAccessCatalog.map((item) => [item.slug, item]));
  const homologationCount = productAccessCatalog.filter((item) => item.status === "EM HOMOLOGAÇÃO").length;
  const availableCount = productAccessCatalog.filter((item) => item.loginHref).length;
  const bravos = products.find((product) => product.slug === "bravos")!;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f4f8fb] text-[#082844]">
      <SiteHeader />

      <section id="inicio" className="relative overflow-hidden border-b border-[#d5e4ed] bg-white">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-44 -top-56 h-[720px] w-[720px] rounded-full bg-[#dceef8] blur-3xl" />
          <div className="absolute -bottom-72 left-[5%] h-[540px] w-[540px] rounded-full bg-[#e8f3f9] blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-[1400px] gap-8 px-4 py-7 sm:px-8 sm:py-12 lg:min-h-[650px] lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:px-10 lg:py-16">
          <div className="max-w-[760px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c9dce8] bg-[#f8fbfd] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.12em] text-[#15517f] sm:px-4 sm:py-2 sm:text-[11px] sm:tracking-[.16em]">
              <span className="h-2 w-2 rounded-full bg-[#2563eb]" aria-hidden="true" />
              BravSystems • Ecossistema SaaS B2B
            </div>

            <h1 className="mt-4 max-w-[740px] text-[34px] font-bold leading-[1.03] tracking-[-.052em] sm:mt-6 sm:text-6xl sm:leading-[1.01] lg:text-[68px]">
              Software para operar melhor, decidir mais rápido e escalar com controle.
            </h1>

            <p className="mt-4 max-w-[680px] text-[15px] leading-6 text-[#587086] sm:mt-5 sm:text-[19px] sm:leading-8">
              A BravSystems desenvolve produtos próprios para operação, administração, pessoas, comunicação, aprendizagem e conteúdo corporativo — com maturidade e acesso tratados de forma transparente.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-7 sm:flex sm:flex-row sm:flex-wrap sm:gap-3">
              <a href="#produtos" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0f4d78] px-4 text-center text-[13px] font-extrabold text-white shadow-xl shadow-[#0f4d78]/20 transition hover:-translate-y-0.5 hover:bg-[#092846] sm:min-h-12 sm:px-6 sm:text-sm">
                Explorar ecossistema →
              </a>
              <Link href="/acessar" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#b9cfdd] bg-white px-4 text-center text-[13px] font-extrabold text-[#0f4d78] transition hover:border-[#0f4d78] hover:bg-[#f8fbfd] sm:min-h-12 sm:px-6 sm:text-sm">
                Meus Sistemas
              </Link>
              <a href="#contato" className="col-span-2 inline-flex min-h-8 items-center justify-center px-3 text-xs font-bold text-[#527087] underline decoration-[#b2c9d8] underline-offset-4 transition hover:text-[#092846] sm:min-h-12 sm:px-4 sm:text-sm">
                Falar com a BravSystems
              </a>
            </div>

            <div className="mt-5 grid max-w-[640px] grid-cols-3 gap-1.5 border-t border-[#d9e6ee] pt-4 sm:mt-7 sm:gap-2 sm:pt-5">
              {[
                ["6", "produtos"],
                [String(homologationCount), "homologação"],
                [String(availableCount), "acessos oficiais"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-xl bg-[#f5f9fc] px-2.5 py-2 sm:rounded-2xl sm:px-4 sm:py-3">
                  <div className="text-lg font-black tracking-[-.04em] text-[#0f4d78] sm:text-2xl">{value}</div>
                  <div className="mt-0.5 text-[9px] font-bold uppercase tracking-[.06em] text-[#708598] sm:mt-1 sm:text-[11px] sm:tracking-[.08em]">{label}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl border border-[#d6e4ed] bg-[#f7fafc] px-3.5 py-3 text-xs text-[#587086] sm:hidden">
              <span className="font-semibold">6 soluções com estágio governado</span>
              <a href="#produtos" className="font-extrabold text-[#0f4d78]">Ver produtos →</a>
            </div>
          </div>

          <div className="relative hidden sm:block" data-hero-portfolio>
            <div className="absolute -inset-4 rounded-[38px] bg-gradient-to-br from-[#d8edf8] via-white to-[#bcd9e9] blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[30px] border border-[#254e6b] bg-[#071f35] p-5 shadow-2xl shadow-[#0b2947]/25 sm:p-6">
              <div className="flex items-start justify-between gap-5 border-b border-white/10 pb-5">
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#7fc0e7]">Portfólio governado</div>
                  <h2 className="mt-2 text-2xl font-bold tracking-[-.035em] text-white">Uma visão única do ecossistema.</h2>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[.06] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.12em] text-[#b8cede]">BravSystems</span>
              </div>

              <div className="mt-4 grid gap-2.5" data-hero-ecosystem>
                {products.map((product) => {
                  const access = accessBySlug.get(product.slug)!;
                  return (
                    <Link key={product.slug} href={`/${product.slug}`} className="group grid grid-cols-[42px_1fr_auto] items-center gap-3 rounded-2xl border border-white/10 bg-white/[.055] px-3.5 py-3 transition hover:border-[#5c9cc5] hover:bg-white/[.09]">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123c5b] text-[10px] font-black tracking-[.08em] text-[#8bc8ed]">
                        {productInitials[product.slug]}
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2">
                          <span className="font-extrabold text-white">{product.name}</span>
                          <span className="hidden text-[11px] text-[#9fb8ca] lg:inline">{homeDescriptors[product.slug]}</span>
                        </div>
                        <div className="mt-0.5 truncate text-[11px] text-[#9fb8ca] lg:hidden">{homeDescriptors[product.slug]}</div>
                      </div>
                      <span className={`rounded-full border px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[.06em] ${access.status === "EM HOMOLOGAÇÃO" ? "border-amber-300/30 bg-amber-300/10 text-amber-200" : access.status === "ACESSO DISPONÍVEL" ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-200" : "border-sky-300/25 bg-sky-300/10 text-sky-200"}`}>
                        {access.status}
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-4 flex flex-col gap-2 rounded-2xl border border-[#2a5877] bg-[#0c304d] px-4 py-4 text-sm lg:flex-row lg:items-center lg:justify-between">
                <span className="font-semibold text-[#bed3e1]">Cliente BravSystems? A Central mostra apenas acessos oficialmente autorizados.</span>
                <Link href="/acessar" className="shrink-0 font-extrabold text-white">Abrir Central →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="solucoes" className="border-b border-[#d7e5ee] bg-[#eef6fb]">
        <div className="mx-auto grid max-w-[1280px] gap-px bg-[#d7e5ee] sm:grid-cols-3">
          {[
            ["Operação conectada", "Soluções especializadas para reduzir controles paralelos e concentrar contexto."],
            ["Maturidade explícita", "Desenvolvimento, homologação e acesso comercial são tratados como estágios diferentes."],
            ["Acesso com governança", "A Central só libera endereços oficiais; previews e hostnames técnicos permanecem internos."],
          ].map(([title, text]) => (
            <article key={title} className="bg-[#eef6fb] px-5 py-5 sm:px-8 sm:py-7">
              <div className="text-[11px] font-extrabold uppercase tracking-[.14em] text-[#2563eb] sm:text-xs sm:tracking-[.16em]">{title}</div>
              <p className="mt-2 text-sm leading-6 text-[#5f7689] sm:mt-3 sm:leading-7">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="produtos" className="bg-white py-12 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Ecossistema BravSystems</div>
              <h2 className="mt-3 text-[32px] font-bold leading-[1.05] tracking-[-.045em] sm:text-5xl">Seis produtos, cada um com função e estágio claros.</h2>
              <p className="mt-3 text-[15px] leading-7 text-[#60758a] sm:mt-4 sm:text-[16px] sm:leading-8">Compare rapidamente proposta de valor, maturidade governada e próximo passo de cada solução.</p>
            </div>
            <Link href="/acessar" className="inline-flex min-h-11 items-center justify-center self-start rounded-xl border border-[#c6d9e5] px-5 text-sm font-extrabold text-[#0f4d78] lg:self-auto">
              Ver Central de Sistemas →
            </Link>
          </div>

          <div className="mt-7 grid gap-3.5 md:grid-cols-2 xl:grid-cols-3" data-product-grid>
            {products.map((product, index) => {
              const access = accessBySlug.get(product.slug)!;
              const highlighted = product.slug === "bravacademy" || product.slug === "bravhas";
              return (
                <article key={product.slug} className={`group flex min-h-0 flex-col rounded-[24px] border p-4.5 transition hover:-translate-y-1 hover:shadow-xl sm:min-h-[318px] sm:p-6 ${highlighted ? "border-[#9fc9e1] bg-gradient-to-b from-[#f1f8fc] to-white shadow-lg shadow-[#0b2947]/5" : "border-[#d6e3eb] bg-[#fbfdfe]"}`} data-product-card={product.slug}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0b2947] text-[9px] font-black tracking-[.08em] text-[#9dd0ef] sm:h-11 sm:w-11 sm:rounded-2xl sm:text-[10px]">{productInitials[product.slug]}</div>
                      <div className="min-w-0">
                        <div className="text-[9px] font-extrabold uppercase tracking-[.1em] text-[#6d8799] sm:text-[10px] sm:tracking-[.12em]">0{index + 1} • {homeDescriptors[product.slug]}</div>
                        <h3 className="mt-1 text-[22px] font-bold tracking-[-.035em] sm:text-2xl">{product.name}</h3>
                      </div>
                    </div>
                    <span className={`shrink-0 rounded-full border px-2 py-1.5 text-[8px] font-extrabold uppercase tracking-[.05em] sm:px-2.5 sm:text-[9px] sm:tracking-[.07em] ${statusTone(access.status)}`}>{access.status}</span>
                  </div>

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#60758a] sm:mt-5">{product.description}</p>

                  <div className={`mt-4 rounded-xl border px-3.5 py-3 ${access.status === "EM HOMOLOGAÇÃO" ? "border-amber-200 bg-amber-50/70" : "border-[#dde8ee] bg-white"}`}>
                    <div className="text-[9px] font-extrabold uppercase tracking-[.12em] text-[#7990a2]">Estado do ambiente</div>
                    <p className="mt-1.5 line-clamp-2 text-xs font-semibold leading-5 text-[#365a73]">{access.environmentNote}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#e1ebf1] pt-4 sm:mt-auto sm:pt-5">
                    <Link href={`/${product.slug}`} className="text-sm font-extrabold text-[#0f4d78]">Conhecer produto →</Link>
                    {access.loginHref ? (
                      <a href={access.loginHref} className="text-xs font-extrabold text-emerald-700" rel="noopener noreferrer">Acessar</a>
                    ) : (
                      <span className="text-right text-[9px] font-extrabold uppercase tracking-[.06em] text-[#8a9baa]">Acesso oficial pendente</span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="destaques" className="border-y border-[#d4e4ed] bg-[#eaf4fa] py-14 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
          <div className="mb-7 max-w-3xl sm:mb-8">
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Destaques do portfólio</div>
            <h2 className="mt-3 text-[32px] font-bold leading-[1.06] tracking-[-.045em] sm:text-5xl">Operação e aprendizagem em duas experiências próprias.</h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.02fr_.98fr]">
            <article id="bravacademy" className="relative overflow-hidden rounded-[28px] border border-[#235f88] bg-[#082844] p-5 text-white shadow-2xl shadow-[#0b2947]/12 sm:p-8">
              <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#2877a9]/35 blur-3xl" aria-hidden="true" />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-extrabold uppercase tracking-[.16em] text-[#8bc8ed]">BravAcademy</span>
                  <span className="rounded-full border border-amber-300/35 bg-amber-300/10 px-3 py-1 text-[10px] font-extrabold uppercase text-amber-200">EM HOMOLOGAÇÃO</span>
                </div>
                <h3 className="mt-4 max-w-xl text-[32px] font-bold leading-[1.06] tracking-[-.045em] sm:mt-5 sm:text-[44px]">Treinamento corporativo com identidade, trilha e evidência.</h3>
                <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#c0d6e4] sm:mt-5 sm:text-[16px] sm:leading-8">Capacitação, avaliações, progresso e certificação em uma Universidade Corporativa White Label preparada para evoluir sem expor ambiente técnico como acesso final.</p>

                <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-7 sm:grid-cols-5 sm:gap-2" aria-label="Jornada de aprendizagem do BravAcademy">
                  {academyJourney.map((item, index) => (
                    <div key={item} className="min-h-[64px] rounded-xl border border-white/10 bg-white/[.06] px-2 py-3 text-center last:col-span-2 sm:min-h-0 sm:last:col-span-1 sm:rounded-2xl sm:px-3 sm:py-4">
                      <div className="text-[9px] font-black text-[#7fc0e7] sm:text-[10px]">0{index + 1}</div>
                      <div className="mt-1 text-[11px] font-bold leading-tight text-white sm:text-xs">{item}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-7 sm:flex sm:flex-wrap sm:gap-3">
                  <Link href="/bravacademy" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-4 text-center text-xs font-extrabold text-[#0f4d78] sm:min-h-12 sm:px-6 sm:text-sm">Conhecer BravAcademy →</Link>
                  <Link href="/acessar" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 px-4 text-center text-xs font-bold text-[#c6dce9] sm:min-h-12 sm:px-5 sm:text-sm">Ver status de acesso</Link>
                </div>
              </div>
            </article>

            <article id="bravos" className="overflow-hidden rounded-[28px] border border-[#bdd4e3] bg-white shadow-xl shadow-[#0b2947]/7 sm:rounded-[30px]">
              <div className="p-5 sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-extrabold uppercase tracking-[.16em] text-[#2563eb]">BravOS • Restaurantes</span>
                  <span className={`rounded-full border px-3 py-1 text-[10px] font-extrabold uppercase ${statusTone(accessBySlug.get("bravos")!.status)}`}>{accessBySlug.get("bravos")!.status}</span>
                </div>
                <h3 className="mt-4 text-[32px] font-bold leading-[1.06] tracking-[-.045em] sm:mt-5 sm:text-4xl">A operação acontece em tempo real. Sua gestão também deveria.</h3>
                <p className="mt-4 text-[15px] leading-7 text-[#60758a]">{bravos.description}</p>
                <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-6 sm:gap-3">
                  <Link href="/bravos" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0f4d78] px-5 text-sm font-extrabold text-white">Conhecer BravOS →</Link>
                  <a href="#contato" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#c3d7e4] px-5 text-sm font-bold text-[#315b7a]">Agendar conversa</a>
                </div>
              </div>
              <div className="border-t border-[#d7e4ec] bg-[#082844] p-4">
                <Image src="/bravos-hero-approved.webp" alt="Dashboard aprovado do BravOS" width={1025} height={770} className="h-auto max-h-[330px] w-full rounded-2xl object-contain" />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="por-que-bravsystems" className="bg-white py-10 sm:py-14">
        <div className="mx-auto grid max-w-[1280px] gap-3 px-4 sm:px-8 md:grid-cols-4 sm:gap-4">
          {[
            ["Produto próprio", "Ativos de software evoluídos como portfólio de longo prazo."],
            ["Operação real", "Necessidades concretas orientam prioridades e validação."],
            ["Homologação ≠ produção", "Ambiente funcional não é tratado como produto comercial concluído."],
            ["Acesso controlado", "URL técnica nunca substitui endereço oficial autorizado."],
          ].map(([title, text]) => (
            <article key={title} className="rounded-2xl border border-[#d8e5ed] bg-[#f8fbfd] p-4 sm:p-5">
              <h3 className="text-base font-extrabold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#60758a]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <TeamSection />

      <section id="acesso" className="bg-[#0a2946] py-10 text-white sm:py-12">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-5 px-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#8bc8ed]">Central corporativa</div>
            <h2 className="mt-2 text-3xl font-bold tracking-[-.035em] sm:text-4xl">Entrar / Meus Sistemas</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#bed3e1]">Veja o estágio real dos produtos e acesse somente endereços oficialmente autorizados.</p>
          </div>
          <Link href="/acessar" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-white px-6 text-sm font-extrabold text-[#0f4d78] sm:min-h-12">Abrir Central de Sistemas →</Link>
        </div>
      </section>

      <section id="contato" className="bg-[#e9f3f8] py-14 sm:py-20">
        <div className="mx-auto grid max-w-[1280px] items-start gap-7 px-4 sm:px-8 lg:grid-cols-[.78fr_1.22fr]">
          <div className="lg:sticky lg:top-28">
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Contato comercial</div>
            <h2 className="mt-3 text-[32px] font-bold leading-[1.06] tracking-[-.045em] sm:text-5xl">Qual parte da sua operação precisa evoluir?</h2>
            <p className="mt-4 text-[15px] leading-7 text-[#5e7588] sm:mt-5 sm:text-[16px] sm:leading-8">Conte o cenário. A conversa parte da necessidade real e respeita o estágio de maturidade de cada produto.</p>
            <div className="mt-5 rounded-2xl border border-[#c3d8e5] bg-white/80 p-4 text-sm leading-7 text-[#45647d] sm:mt-6 sm:p-5">
              <strong className="block text-[#0f4d78]">BravSystems</strong>
              contato@bravsystems.com.br
            </div>
          </div>
          <LeadForm />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
