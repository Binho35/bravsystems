import Image from "next/image";
import Link from "next/link";

import { LeadForm } from "@/components/LeadForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TeamSection } from "@/components/TeamSection";
import { products } from "@/lib/products";

const managementServices = [
  {
    number: "01",
    title: "Head Administrativo",
    description: "Estruturação de processos, rotinas, indicadores e integração entre áreas para dar mais clareza à liderança.",
    items: ["Processos administrativos", "Indicadores", "Rotinas de gestão", "Integração entre setores"],
  },
  {
    number: "02",
    title: "Gestão Financeira",
    description: "Organização do financeiro para aumentar previsibilidade, controle e qualidade das decisões.",
    items: ["Fluxo de caixa", "Contas a pagar e receber", "Conciliação", "Provisões e vencimentos"],
  },
  {
    number: "03",
    title: "Recursos Humanos",
    description: "Organização das informações de pessoas, benefícios e custos para uma gestão mais consistente.",
    items: ["Benefícios", "Informações de pessoas", "Custos", "Processos de RH"],
  },
  {
    number: "04",
    title: "Departamento Pessoal",
    description: "Acompanhamento das rotinas administrativas e obrigações ligadas à jornada do colaborador.",
    items: ["Folha e provisões", "Conferências", "Benefícios e encargos", "Obrigações"],
  },
] as const;

const academyJourney = ["Cursos", "Trilhas", "Avaliações", "Progresso", "Certificação"] as const;

const commercialOutcomes = [
  {
    title: "Menos retrabalho",
    description: "Organize processos e reduza controles paralelos, tarefas duplicadas e informação espalhada.",
  },
  {
    title: "Mais controle",
    description: "Centralize o que importa para acompanhar a operação com mais clareza e previsibilidade.",
  },
  {
    title: "Decisões melhores",
    description: "Transforme rotina e dados em informação útil para decidir mais rápido e com mais segurança.",
  },
  {
    title: "Crescimento organizado",
    description: "Estruture a gestão para crescer sem multiplicar desorganização, dependências e gargalos.",
  },
] as const;

const pillars = [
  {
    number: "01",
    title: "Tecnologia",
    description: "Construímos sistemas com arquitetura moderna, segurança e capacidade real de evolução.",
  },
  {
    number: "02",
    title: "Gestão",
    description: "Transformamos processos complexos em informação clara para quem precisa decidir e executar.",
  },
  {
    number: "03",
    title: "Escalabilidade",
    description: "Produtos e estruturas pensados para crescer com novas equipes, unidades e necessidades.",
  },
] as const;

const statusStyle = {
  Disponível: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "Em homologação": "border-amber-200 bg-amber-50 text-amber-700",
  "Em desenvolvimento": "border-sky-200 bg-sky-50 text-sky-700",
} as const;

export default function Home() {
  const bravos = products.find((product) => product.slug === "bravos")!;
  const otherProducts = products.filter((product) => product.slug !== "bravos");

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f4f8fb] text-[#0b2947]">
      <SiteHeader />

      <section id="inicio" className="relative overflow-hidden bg-[#eef6fb]">
        <div className="pointer-events-none absolute -right-52 -top-64 h-[760px] w-[760px] rounded-full bg-[#d9ebf7]/90" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-72 -left-56 h-[620px] w-[620px] rounded-full bg-[#e2f0f8]" aria-hidden="true" />
        <div className="pointer-events-none absolute right-[33%] top-[16%] h-28 w-28 rounded-full border border-[#c5ddeb]/70" aria-hidden="true" />

        <div className="relative mx-auto grid min-h-[620px] max-w-[1440px] items-center px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-10 lg:py-20">
          <div className="relative z-10 max-w-[790px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c4dce9] bg-[#e7f2f9]/90 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#15517f] sm:text-[11px]">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              Tecnologia e gestão para empresas
            </div>

            <h1 className="mt-7 text-[42px] font-black leading-[.98] tracking-[-.055em] text-[#0c3d76] sm:text-6xl lg:text-[70px]">
              Tecnologia que transforma
              <span className="mt-2 block text-[#377df0]">gestão em evolução.</span>
            </h1>

            <p className="mt-7 max-w-[760px] text-[16px] leading-7 text-[#5a7390] sm:text-[19px] sm:leading-8">
              Tecnologia própria e gestão aplicada para empresas que precisam reduzir retrabalho, ganhar controle e crescer com uma operação mais organizada.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#contato" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#0b4683] px-7 text-sm font-extrabold text-white shadow-lg shadow-[#0b4683]/15 transition hover:-translate-y-0.5 hover:bg-[#082f5d]">
                Quero falar sobre minha empresa
              </a>
              <a href="#solucoes" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#bdd5e5] bg-white/55 px-7 text-sm font-extrabold text-[#15517f] transition hover:border-[#7faeca] hover:bg-white/80">
                Ver soluções
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-[#4d6f8e]">
              {["Menos retrabalho", "Mais controle", "Decisões com clareza"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <span className="text-lg font-black text-[#2563eb]" aria-hidden="true">✓</span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden min-h-[460px] lg:block" aria-hidden="true" />
        </div>
      </section>

      <section id="empresa" className="relative overflow-hidden border-t border-[#d7e6ef]/60 bg-[#eef6fb] py-14 sm:py-20">
        <div className="pointer-events-none absolute -bottom-64 right-[-9rem] h-[520px] w-[520px] rounded-full bg-[#dcecf7]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1280px] gap-8 px-5 sm:px-8 lg:grid-cols-[1.02fr_.98fr] lg:items-end">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#377df0]">Quem somos</div>
            <h2 className="mt-4 max-w-3xl text-[36px] font-black leading-[1.03] tracking-[-.045em] text-[#0c3d76] sm:text-5xl">
              Uma empresa criada para construir o futuro da gestão.
            </h2>
          </div>
          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-[15px] leading-7 text-[#5a7390] sm:text-[17px] sm:leading-8">
              Antes de falar em sistema, entendemos onde a operação perde tempo, controle ou previsibilidade. A tecnologia entra para resolver esse problema — não para criar mais complexidade.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-[#5a7390]">
              O ecossistema BravSystems nasce da prática: produtos próprios, gestão aplicada e evolução contínua para transformar rotina em uma operação mais simples de acompanhar e mais preparada para crescer.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e2e8f0] bg-white py-10 sm:py-12" aria-label="Resultados de negócio">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {commercialOutcomes.map((outcome) => (
              <article key={outcome.title} className="rounded-2xl border border-[#e2e8f0] bg-[#fbfdfe] p-5">
                <h3 className="text-lg font-black tracking-[-.025em] text-[#0b2947]">{outcome.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#61788d]">{outcome.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="solucoes" className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="max-w-4xl">
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#377df0]">Nossas soluções</div>
            <h2 className="mt-3 text-[36px] font-black leading-[1.04] tracking-[-.045em] text-[#0b2947] sm:text-5xl">
              Escolha pelo problema que você quer resolver.
            </h2>
            <p className="mt-4 max-w-3xl text-[15px] leading-7 text-[#61788d] sm:text-[16px] sm:leading-8">
              Operação, administração, pessoas, comunicação, aprendizagem e conteúdo: cada produto nasce para atacar um gargalo específico de gestão.
            </p>
          </div>

          <div className="mt-9" data-product-grid>
          <article id="bravos" data-product-card="bravos" className="overflow-hidden rounded-[28px] border border-[#bfd6e5] bg-[#f4f9fc] shadow-xl shadow-[#0b2947]/7">
            <div className="grid lg:grid-cols-[.88fr_1.12fr]">
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-extrabold uppercase tracking-[.16em] text-[#2563eb]"><span data-product-name>BravOs</span> • Restaurantes</span>
                  <span className={`rounded-full border px-3 py-1 text-[10px] font-extrabold uppercase ${statusStyle[bravos.status]}`}>{bravos.status}</span>
                </div>
                <h3 className="mt-5 text-[34px] font-black leading-[1.03] tracking-[-.045em] text-[#0b2947] sm:text-[46px]">
                  A operação acontece em tempo real. Sua gestão também deveria.
                </h3>
                <p className="mt-5 text-[15px] leading-7 text-[#61788d]">{bravos.description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/bravos" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0b4683] px-5 text-sm font-extrabold text-white">
                    Ver como o BravOs pode ajudar →
                  </Link>
                  <a href="#conheca-bravos" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#bfd4e3] bg-white px-5 text-sm font-bold text-[#315b7a]">
                    Ver apresentação
                  </a>
                </div>
              </div>
              <div className="flex items-center border-t border-[#d6e4ed] bg-[#0b2947] p-4 sm:p-6 lg:border-l lg:border-t-0">
                <Image src="/bravos-hero-approved.webp" alt="Interface aprovada do BravOs" width={1052} height={715} className="h-auto w-full rounded-2xl object-contain" priority={false} />
              </div>
            </div>
          </article>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {otherProducts.map((product) => (
              <article key={product.slug} data-product-card={product.slug} className="flex min-h-[300px] flex-col rounded-[24px] border border-[#d7e4ec] bg-[#fbfdfe] p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-[.13em] text-[#6f879a]">{product.category}</div>
                    <h3 data-product-name className="mt-2 text-2xl font-black tracking-[-.035em] text-[#0b2947]">{product.name}</h3>
                  </div>
                  <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[9px] font-extrabold uppercase ${statusStyle[product.status]}`}>{product.status}</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-[#61788d]">{product.description}</p>
                <div className="mt-auto border-t border-[#e0e9ef] pt-5">
                  <Link href={`/${product.slug}`} className="text-sm font-extrabold text-[#0b4683]">Ver como {product.name} pode ajudar →</Link>
                </div>
              </article>
            ))}
          </div>
          </div>
        </div>
      </section>

      <section id="conheca-bravos" className="border-y border-[#d4e3ed] bg-[#eaf4fa] py-14 sm:py-20">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-5 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#377df0]">Conheça o BravOs</div>
            <h2 className="mt-3 text-[36px] font-black leading-[1.04] tracking-[-.045em] text-[#0b2947] sm:text-5xl">
              Veja como tecnologia e operação se conectam.
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#61788d] sm:text-[16px] sm:leading-8">
              O vídeo institucional apresenta a visão da BravSystems e o contexto que deu origem ao BravOs: software construído para resolver problemas operacionais reais.
            </p>
            <Link href="/bravos" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0b4683] px-5 text-sm font-extrabold text-white">
              Conhecer o BravOs →
            </Link>
          </div>
          <div className="overflow-hidden rounded-[26px] border border-[#bdd4e3] bg-[#061a2d] p-2 shadow-2xl shadow-[#0b2947]/15">
            <video controls playsInline preload="metadata" className="aspect-video w-full rounded-[20px] bg-black object-cover" aria-label="Vídeo institucional BravSystems — Conheça o BravOs">
              <source src="/bravsystems-video-institucional.mp4" type="video/mp4" />
              Seu navegador não suporta reprodução de vídeo.
            </video>
          </div>
        </div>
      </section>

      <section id="gestao" className="bg-[#f5f9fc] py-14 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#377df0]">Serviços de gestão</div>
              <h2 className="mt-3 text-[36px] font-black leading-[1.04] tracking-[-.045em] text-[#0b2947] sm:text-5xl">
                Tecnologia e gestão trabalhando na mesma direção.
              </h2>
            </div>
            <p className="max-w-2xl text-[15px] leading-7 text-[#61788d] lg:justify-self-end sm:text-[16px] sm:leading-8">
              A BravSystems também atua na organização administrativa para transformar rotina, informação e controle em uma base mais sólida para crescer.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {managementServices.map((service) => (
              <article key={service.number} className="rounded-[24px] border border-[#d7e4ec] bg-white p-5 sm:p-6">
                <div className="text-[11px] font-black uppercase tracking-[.16em] text-[#377df0]">{service.number}</div>
                <h3 className="mt-2 text-2xl font-black tracking-[-.035em] text-[#0b2947]">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#61788d]">{service.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.items.map((item) => (
                    <span key={item} className="rounded-full bg-[#edf5fa] px-3 py-1.5 text-xs font-bold text-[#315b7a]">{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-[#d3e2eb] bg-white p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <div>
              <h3 className="text-xl font-black tracking-[-.025em] text-[#0b2947]">Sua empresa não precisa de mais uma planilha. Precisa de uma gestão que funcione.</h3>
              <p className="mt-2 text-sm leading-6 text-[#61788d]">Conte onde a operação está travando e avaliamos juntos o melhor caminho.</p>
            </div>
            <a href="#contato" className="mt-4 inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-[#0b4683] px-5 text-sm font-extrabold text-white sm:mt-0">
              Quero organizar minha operação →
            </a>
          </div>
        </div>
      </section>

      <section id="bravacademy" className="border-y border-[#d7e5ee] bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="grid gap-7 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3"><span className="text-xs font-extrabold uppercase tracking-[.18em] text-[#377df0]">BravAcademy</span><span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-extrabold uppercase text-amber-700">Em homologação</span></div>
              <h2 className="mt-3 text-[36px] font-black leading-[1.04] tracking-[-.045em] text-[#0b2947] sm:text-5xl">
                Universidade corporativa com identidade, trilha e evidência.
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-[#61788d] sm:text-[16px] sm:leading-8">
                Cursos, avaliações, progresso e certificação em uma experiência white label preparada para transformar treinamento em jornada de desenvolvimento.
              </p>
              <Link href="/bravacademy" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0b4683] px-5 text-sm font-extrabold text-white">
                Conhecer BravAcademy →
              </Link>
            </div>
            <div className="rounded-[26px] border border-[#d3e2eb] bg-[#f5f9fc] p-5 sm:p-6">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5" aria-label="Jornada de aprendizagem do BravAcademy">
                {academyJourney.map((item, index) => (
                  <div key={item} className="rounded-2xl border border-[#d7e4ec] bg-white px-3 py-4 text-center">
                    <div className="text-[10px] font-black text-[#377df0]">0{index + 1}</div>
                    <div className="mt-1 text-xs font-extrabold leading-5 text-[#234d70]">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="visao" className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="overflow-hidden rounded-[30px] bg-[#082844] p-6 text-white shadow-2xl shadow-[#0b2947]/15 sm:p-9 lg:p-11">
            <div className="max-w-4xl">
              <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#86c6ee]">Nossa visão</div>
              <h2 className="mt-3 text-[36px] font-black leading-[1.04] tracking-[-.045em] sm:text-5xl">
                Tecnologia, gestão e crescimento trabalhando juntos.
              </h2>
              <p className="mt-4 max-w-3xl text-[15px] leading-7 text-[#c1d7e5] sm:text-[16px] sm:leading-8">
                Não queremos apenas criar sistemas. Queremos construir ferramentas e estruturas de gestão que tornem empresas melhores.
              </p>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {pillars.map((pillar) => (
                <article key={pillar.number} className="rounded-2xl border border-white/10 bg-white/[.06] p-5">
                  <div className="text-[11px] font-black uppercase tracking-[.16em] text-[#86c6ee]">{pillar.number}</div>
                  <h3 className="mt-2 text-xl font-black">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#c1d7e5]">{pillar.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TeamSection />

      <section id="contato" className="bg-[#e9f3f8] py-14 sm:py-20">
        <div className="mx-auto grid max-w-[1280px] items-start gap-8 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28">
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#377df0]">Vamos conversar</div>
            <h2 className="mt-3 text-[36px] font-black leading-[1.04] tracking-[-.045em] text-[#0b2947] sm:text-5xl">
              Onde sua empresa está perdendo tempo, controle ou previsibilidade?
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#61788d] sm:text-[16px] sm:leading-8">
              Conte o cenário. A BravSystems entende o problema primeiro e só depois propõe a melhor combinação entre tecnologia, processo e gestão.
            </p>
            <div className="mt-6 rounded-2xl border border-[#c3d8e5] bg-white/75 p-5 text-sm leading-7 text-[#45647d]">
              <strong className="block text-[#0b4683]">BravSystems</strong>
              contato@bravsystems.com.br
            </div>
            <Link href="/acessar" className="mt-4 inline-flex text-sm font-extrabold text-[#0b4683] underline decoration-[#93b8cf] underline-offset-4">
              Já é cliente? Acessar meus sistemas
            </Link>
          </div>
          <LeadForm />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
