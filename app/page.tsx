import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { products, type Product } from "@/lib/products";

const homeDescriptors: Record<string, string> = {
  bravos: "Operação e gestão para restaurantes.",
  bravhas: "Gestão administrativa, financeira e operacional.",
  bravhos: "Recursos Humanos e Departamento Pessoal.",
  bravmsg: "Comunicação, atendimento, leads e relacionamento.",
  bravacademy: "Universidade Corporativa White Label.",
  bravvideo: "Produção e automação de conteúdo audiovisual corporativo.",
};

const frictionThemes = [
  ["Processos desconectados", "Quando cada área trabalha em uma ferramenta ou planilha diferente, contexto e rastreabilidade se perdem."],
  ["Gestão fragmentada", "Informação operacional sem visão consolidada dificulta priorização, acompanhamento e decisão."],
  ["Pessoas e comunicação dispersas", "Rotinas de pessoas, atendimento e relacionamento precisam de histórico e governança para escalar."],
  ["Conhecimento que não escala", "Treinamento e conteúdo corporativo exigem estrutura para manter padrão, acompanhamento e evolução."],
] as const;

const academyJourney = ["Cursos e aulas", "Trilhas", "Avaliações", "Progresso", "Certificação"] as const;

function statusClass(status: Product["status"]) {
  if (status === "Em homologação") return "border-amber-200 bg-amber-50 text-amber-800";
  if (status === "Disponível") return "border-emerald-200 bg-emerald-50 text-emerald-800";
  return "border-sky-200 bg-sky-50 text-sky-800";
}

export default function Home() {
  const bravos = products.find((product) => product.slug === "bravos")!;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f9fc] text-[#092846]">
      <SiteHeader />

      <section id="inicio" className="relative overflow-hidden border-b border-[#dbe7ef] bg-white">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-40 -top-52 h-[680px] w-[680px] rounded-full bg-[#d9edf9] blur-3xl" />
          <div className="absolute -bottom-64 left-[8%] h-[520px] w-[520px] rounded-full bg-[#e5f1f8] blur-3xl" />
        </div>

        <div className="relative mx-auto grid min-h-[680px] max-w-[1400px] items-center gap-10 px-5 py-10 sm:min-h-[720px] sm:px-8 sm:py-14 lg:grid-cols-[1.02fr_.98fr] lg:px-10 lg:py-20">
          <div className="max-w-[760px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c9dce8] bg-[#f8fbfd] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[.13em] text-[#15517f] sm:tracking-[.16em]">
              <span className="h-2 w-2 rounded-full bg-[#2563eb]" aria-hidden="true" />
              BravSystems • Ecossistema SaaS B2B
            </div>

            <h1 className="mt-6 text-[38px] font-bold leading-[1.04] tracking-[-.05em] sm:mt-7 sm:text-6xl sm:leading-[1.02] lg:text-[72px]">
              Tecnologia para transformar operações complexas em gestão simples, conectada e escalável.
            </h1>
            <p className="mt-5 max-w-[690px] text-[16px] leading-7 text-[#587086] sm:mt-7 sm:text-[20px] sm:leading-8">
              Produtos próprios para operação, administração, pessoas, comunicação, aprendizagem e conteúdo corporativo — reunidos sob uma única visão de tecnologia e governança.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
              <a href="#produtos" className="inline-flex min-h-13 items-center justify-center rounded-xl bg-[#0f4d78] px-7 text-[15px] font-extrabold text-white shadow-xl shadow-[#0f4d78]/20 transition hover:-translate-y-0.5 hover:bg-[#092846]">
                Conhecer soluções →
              </a>
              <a href="#contato" className="inline-flex min-h-13 items-center justify-center rounded-xl border border-[#b8cfdf] bg-white px-7 text-[15px] font-bold text-[#0f4d78] transition hover:border-[#0f4d78] hover:bg-[#f8fbfd]">
                Falar com a BravSystems
              </a>
              <Link href="/acessar" className="inline-flex min-h-13 items-center justify-center rounded-xl px-5 text-[15px] font-bold text-[#315b7a] underline decoration-[#a6c3d7] underline-offset-4 transition hover:text-[#092846]">
                Entrar / Meus Sistemas
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 border-t border-[#d7e4ec] pt-5 text-sm font-semibold text-[#5f7689] sm:mt-9 sm:pt-6">
              <span>6 produtos no ecossistema</span>
              <span>SaaS B2B</span>
              <span>Maturidade comunicada com transparência</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-[40px] bg-gradient-to-br from-[#d8ecf8] via-white to-[#bad8ea] opacity-90 blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[32px] border border-[#bdd4e3] bg-[#071f35] p-5 shadow-2xl shadow-[#0b2947]/25 sm:p-7">
              <div className="flex items-start justify-between gap-5 border-b border-white/10 pb-5">
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#7ec0e8]">Ecossistema BravSystems</div>
                  <h2 className="mt-2 text-2xl font-bold tracking-[-.03em] text-white">Uma marca. Soluções especializadas.</h2>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-[#b8cede]">B2B</span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3" data-hero-ecosystem>
                {products.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/${product.slug}`}
                    className={`group rounded-2xl border p-4 transition hover:-translate-y-0.5 ${product.slug === "bravacademy" ? "border-[#76b9e2] bg-[#114a70]" : product.slug === "bravos" ? "border-[#4b8fba] bg-[#0d3858]" : "border-white/10 bg-white/[.055] hover:bg-white/[.09]"}`}
                  >
                    <div className="text-[10px] font-extrabold uppercase tracking-[.13em] text-[#79bce3]">{product.slug === "bravacademy" ? "Destaque" : "Produto"}</div>
                    <div className="mt-2 text-lg font-bold text-white sm:text-xl">{product.name}</div>
                    <div className="mt-1 text-xs leading-5 text-[#b8cede]">{homeDescriptors[product.slug]}</div>
                  </Link>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white px-4 py-4 text-sm text-[#587086] sm:flex-row sm:items-center sm:justify-between">
                <span>Cliente BravSystems?</span>
                <Link href="/acessar" className="font-extrabold text-[#0f4d78]">Abrir Meus Sistemas →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="solucoes" className="bg-[#f7fafc] py-18 sm:py-22">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Problemas que orientam nossos produtos</div>
              <h2 className="mt-4 text-4xl font-bold tracking-[-.045em] sm:text-5xl">Menos sistemas isolados. Mais contexto para operar e decidir.</h2>
              <p className="mt-5 max-w-xl text-[17px] leading-8 text-[#60758a]">A BravSystems parte de dores operacionais concretas e transforma essas necessidades em produtos especializados, sem confundir roadmap com capacidade disponível.</p>
            </div>

            <div className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
              {frictionThemes.map(([title, text]) => (
                <article key={title} className="border-t border-[#cedee8] py-6">
                  <h3 className="text-xl font-bold tracking-[-.02em]">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#60758a]">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="produtos" className="border-y border-[#d5e5ef] bg-white py-20 sm:py-24">
        <SectionTitle eyebrow="Portfólio" title="Seis produtos. Uma mesma disciplina de produto, acesso e governança." text="Cada solução possui escopo próprio, página dedicada e estágio de maturidade explícito. Acesso de cliente permanece separado da jornada comercial." />

        <div className="mx-auto mt-12 grid max-w-[1280px] gap-5 px-5 sm:px-8 md:grid-cols-2 xl:grid-cols-3" data-product-grid>
          {products.map((product) => (
            <article key={product.slug} className={`group flex min-h-[350px] flex-col rounded-[28px] border p-6 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#0b2947]/8 sm:p-7 ${product.slug === "bravacademy" ? "border-[#8ec3e4] bg-gradient-to-b from-[#f2f9fd] to-white shadow-xl shadow-[#0b2947]/6" : "border-[#d3e2eb] bg-[#fbfdfe]"}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#2563eb]">Produto BravSystems</div>
                  <h3 className="mt-2 text-3xl font-bold tracking-[-.04em]">{product.name}</h3>
                </div>
                <span className={`rounded-full border px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.07em] ${statusClass(product.status)}`}>{product.status}</span>
              </div>
              <p className="mt-5 text-[15px] font-semibold leading-6 text-[#355a75]">{homeDescriptors[product.slug]}</p>
              <p className="mt-4 text-sm leading-7 text-[#60758a]">{product.description}</p>
              <div className="mt-auto flex items-center justify-between gap-4 border-t border-[#e1ebf1] pt-6">
                <Link href={`/${product.slug}`} className="font-extrabold text-[#0f4d78]">Conhecer {product.name} →</Link>
                {product.slug === "bravacademy" ? <span className="text-xs font-bold uppercase tracking-[.1em] text-amber-700">Em homologação</span> : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="destaques" className="bg-[#eef6fb] py-20 sm:py-24">
        <SectionTitle eyebrow="Produtos em destaque" title="Duas frentes estratégicas, com propostas e jornadas próprias." text="BravOS e BravAcademy ganham espaço proporcional ao momento atual do portfólio sem transformar nenhum ambiente de homologação em promessa de produção." />

        <div className="mx-auto mt-12 grid max-w-[1280px] gap-6 px-5 sm:px-8 lg:grid-cols-2">
          <article id="bravos" className="overflow-hidden rounded-[32px] border border-[#bdd4e3] bg-white shadow-xl shadow-[#0b2947]/7">
            <div className="p-7 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-extrabold uppercase tracking-[.17em] text-[#2563eb]">BravOS • Operação de restaurantes</span>
                <span className={`rounded-full border px-3 py-1 text-[10px] font-extrabold uppercase ${statusClass(bravos.status)}`}>{bravos.status}</span>
              </div>
              <h3 className="mt-5 text-4xl font-bold tracking-[-.045em]">A operação acontece em tempo real. Sua gestão também deveria.</h3>
              <p className="mt-5 text-[16px] leading-8 text-[#60758a]">{bravos.description}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/bravos" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#0f4d78] px-6 font-extrabold text-white">Conhecer o BravOS →</Link>
                <a href="#contato" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#c3d7e4] bg-white px-6 font-bold text-[#315b7a]">Agendar demonstração</a>
              </div>
            </div>
            <div className="border-t border-[#d7e4ec] bg-[#082844] p-4 sm:p-5">
              <Image src="/bravos-hero-approved.webp" alt="Dashboard aprovado do BravOS" width={1025} height={770} className="h-auto w-full rounded-2xl object-contain" />
            </div>
          </article>

          <article id="bravacademy" className="relative overflow-hidden rounded-[32px] border border-[#235f88] bg-[#082844] p-7 text-white shadow-2xl shadow-[#0b2947]/16 sm:p-8">
            <div className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full bg-[#2877a9]/35 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-extrabold uppercase tracking-[.17em] text-[#8bc8ed]">BravAcademy • Universidade Corporativa White Label</span>
                <span className="rounded-full border border-amber-300/35 bg-amber-300/10 px-3 py-1 text-[10px] font-extrabold uppercase text-amber-200">EM HOMOLOGAÇÃO</span>
              </div>
              <h3 className="mt-5 text-4xl font-bold tracking-[-.045em] sm:text-[44px]">Capacitação corporativa com identidade, percurso e evidência.</h3>
              <p className="mt-5 max-w-xl text-[16px] leading-8 text-[#c0d6e4]">Capacitação, trilhas de aprendizagem, avaliações, progresso e certificação em um ambiente personalizado para cada empresa.</p>

              <div className="mt-8 rounded-[26px] border border-white/10 bg-white/[.055] p-5 sm:p-6" aria-label="Jornada de aprendizagem do BravAcademy">
                <div className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#7fc0e7]">Jornada de aprendizagem</div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {academyJourney.map((item, index) => (
                    <div key={item} className={`flex min-h-20 items-center gap-4 rounded-2xl border border-white/10 bg-white/[.055] px-4 py-4 ${index === academyJourney.length - 1 ? "sm:col-span-2" : ""}`}>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#17628f] text-xs font-extrabold text-white">0{index + 1}</span>
                      <span className="font-bold text-white">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link href="/bravacademy" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-6 font-extrabold text-[#0f4d78]">Conhecer BravAcademy →</Link>
                <span className="text-sm font-semibold text-[#a9c8dc]">Acesso público de homologação não exposto nesta missão.</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="por-que-bravsystems" className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Contexto real + governança</div>
            <h2 className="mt-4 text-4xl font-bold tracking-[-.045em] sm:text-5xl">Produto próprio, evolução controlada e transparência sobre maturidade.</h2>
            <p className="mt-5 text-[17px] leading-8 text-[#60758a]">A BravSystems diferencia desenvolvimento, homologação e disponibilidade comercial. O objetivo é evoluir ativos de software com evidência, não antecipar promessas.</p>
          </div>

          <div className="overflow-hidden rounded-[30px] border border-[#d4e3ec] bg-[#f8fbfd]">
            {[
              ["Produto próprio", "As plataformas são tratadas como ativos de longo prazo, com evolução contínua e escopo explícito."],
              ["Operação real", "No BravOS, o ¡Bravazzo! 335 funciona como operação-piloto para observar necessidades reais antes de ampliar promessas."],
              ["Homologação separada de produção", "Ambiente navegável e código funcional não significam, por si só, prontidão comercial definitiva."],
              ["Acesso com governança", "O portal só deve direcionar clientes para endereços oficialmente aprovados, sem expor branches, previews técnicos ou hostnames temporários."],
            ].map(([title, text], index) => (
              <article key={title} className={`p-6 sm:p-7 ${index ? "border-t border-[#d9e6ee]" : ""}`}>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#60758a]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="acesso" className="border-y border-[#cbdfea] bg-[#0b2947] py-16 text-white">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#88c1e4]">Cliente BravSystems</div>
            <h2 className="mt-3 text-3xl font-bold tracking-[-.035em] sm:text-4xl">Entrar / Meus Sistemas</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[#bfd3e1]">Encontre os produtos BravSystems, visualize o estágio correto de cada ambiente e acesse somente endereços oficialmente autorizados.</p>
          </div>
          <Link href="/acessar" className="inline-flex min-h-13 shrink-0 items-center justify-center rounded-xl bg-white px-7 font-extrabold text-[#0f4d78] shadow-xl shadow-black/10">Abrir Meus Sistemas →</Link>
        </div>
      </section>

      <section id="contato" className="bg-[#e4f0f7] py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1280px] items-start gap-10 px-5 sm:px-8 lg:grid-cols-[.82fr_1.18fr]">
          <div className="lg:sticky lg:top-28">
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Contato comercial</div>
            <h2 className="mt-4 text-4xl font-bold tracking-[-.045em] sm:text-5xl">Qual parte da sua operação precisa funcionar melhor?</h2>
            <p className="mt-6 text-[17px] leading-8 text-[#5e7588]">Escolha a solução de interesse e conte o cenário. A conversa comercial parte da necessidade real e respeita o estágio de maturidade de cada produto.</p>
            <div className="mt-8 grid gap-3 text-sm font-semibold text-[#45647d]">
              <span>✓ Novo cliente: conhecer soluções e solicitar demonstração</span>
              <span>✓ Cliente existente: acesso separado pela Central de Sistemas</span>
              <span>✓ Sem promessa de funcionalidade ou ambiente não homologado</span>
            </div>
            <div className="mt-8 rounded-2xl border border-[#bfd5e4] bg-white/80 p-5">
              <div className="text-xs font-bold uppercase tracking-[.14em] text-[#7a91a3]">Contato direto</div>
              <a href="mailto:contato@bravsystems.com.br" className="mt-2 block font-extrabold text-[#0f4d78]">contato@bravsystems.com.br</a>
            </div>
          </div>
          <LeadForm />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
      <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">{eyebrow}</div>
      <h2 className="mt-4 max-w-5xl text-4xl font-bold tracking-[-.045em] sm:text-5xl">{title}</h2>
      <p className="mt-5 max-w-3xl text-[17px] leading-8 text-[#60758a]">{text}</p>
    </div>
  );
}
