import Image from "next/image";
import Link from "next/link";

import { LeadForm } from "@/components/LeadForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TeamSection } from "@/components/TeamSection";
import { products } from "@/lib/products";

const commercialOutcomes = [
  ["Menos retrabalho", "Processos mais claros e menos controles paralelos."],
  ["Mais controle", "Informação organizada para acompanhar a operação."],
  ["Decisões com clareza", "Contexto útil para decidir com mais segurança."],
] as const;

const managementServices = [
  ["01", "Head Administrativo", "Processos, rotinas, indicadores e integração entre áreas."],
  ["02", "Gestão Financeira", "Fluxo de caixa, conciliação, provisões e previsibilidade."],
  ["03", "Recursos Humanos", "Informações de pessoas, benefícios e custos organizados."],
  ["04", "Departamento Pessoal", "Rotinas, conferências e obrigações da jornada do colaborador."],
] as const;

const academyJourney = ["Cursos", "Trilhas", "Avaliações", "Progresso", "Certificação"] as const;

const statusStyle = {
  Disponível: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "Em homologação": "border-amber-200 bg-amber-50 text-amber-700",
  "Em desenvolvimento": "border-sky-200 bg-sky-50 text-sky-700",
} as const;

const productInitials: Record<string, string> = {
  bravos: "OS",
  bravclin: "CLIN",
  bravhas: "HAS",
  "bravsystems-finance": "FIN",
  bravhos: "HOS",
  bravmsg: "MSG",
  bravsocial: "SOC",
  bravacademy: "ACA",
  bravvideo: "VID",
};

export default function Home() {
  const bravclin = products.find((product) => product.slug === "bravclin")!;
  const bravos = products.find((product) => product.slug === "bravos")!;

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#0b2947]">
      <SiteHeader />

      <section id="inicio" className="relative overflow-hidden border-b border-[#dbe7ef] bg-[#eef6fb]">
        <div className="pointer-events-none absolute -right-48 -top-52 h-[620px] w-[620px] rounded-full bg-[#d9ebf7]" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-56 left-[22%] h-[420px] w-[420px] rounded-full bg-white/75" aria-hidden="true" />

        <div className="relative mx-auto grid min-h-[640px] max-w-[1440px] gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[.96fr_1.04fr] lg:items-center lg:px-10 lg:py-16 xl:gap-16">
          <div className="max-w-[720px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c4dce9] bg-white/70 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#15517f] sm:text-[11px]">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              Tecnologia e gestão para empresas
            </div>

            <h1 className="mt-6 text-[42px] font-black leading-[.98] tracking-[-.055em] text-[#0c3d76] sm:text-6xl xl:text-[68px]">
              Tecnologia que transforma
              <span className="mt-2 block text-[#377df0]">gestão em evolução.</span>
            </h1>

            <p className="mt-6 max-w-[680px] text-[16px] leading-7 text-[#5a7390] sm:text-[18px] sm:leading-8">
              Produtos próprios para organizar operação, clínicas, finanças, pessoas, comunicação e aprendizagem — com tecnologia aplicada a problemas reais.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#contato" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#0b4683] px-6 text-sm font-extrabold text-white shadow-lg shadow-[#0b4683]/15 transition hover:-translate-y-0.5 hover:bg-[#082f5d]">
                Quero falar sobre minha empresa
              </a>
              <a href="#solucoes" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#bdd5e5] bg-white/70 px-6 text-sm font-extrabold text-[#15517f] transition hover:bg-white">
                Ver soluções
              </a>
            </div>

            <div className="mt-7 grid max-w-[660px] gap-2 sm:grid-cols-3">
              {commercialOutcomes.map(([title, description]) => (
                <div key={title} className="rounded-2xl border border-[#d4e3ec] bg-white/70 px-4 py-3.5">
                  <div className="text-sm font-black text-[#0b4683]">{title}</div>
                  <div className="mt-1 text-xs leading-5 text-[#6b8193]">{description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative" data-desktop-hero-panel>
            <div className="absolute -inset-5 rounded-[38px] bg-gradient-to-br from-[#cce6f5] via-white to-[#dcecf6] blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[30px] border border-[#204b6b] bg-[#082844] shadow-2xl shadow-[#0b2947]/20">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#79c8ed]">Destaque do portfólio</div>
                  <div className="mt-1 text-2xl font-black text-white">BravClin</div>
                </div>
                <span className="rounded-full border border-sky-300/25 bg-sky-300/10 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[.08em] text-sky-100">
                  {bravclin.status}
                </span>
              </div>

              <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
                {[
                  ["Agenda + CRM", "Organização comercial e operacional da jornada."],
                  ["Prontuário + evolução", "Histórico clínico, anamnese e acompanhamento."],
                  ["Estoque + rastreabilidade", "Lotes, validade e controle de insumos."],
                  ["Financeiro + indicadores", "Leitura da operação em uma visão integrada."],
                ].map(([title, description]) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-white/[.06] p-4">
                    <div className="text-sm font-extrabold text-white">{title}</div>
                    <p className="mt-2 text-xs leading-5 text-[#bcd4e3]">{description}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 border-t border-white/10 bg-white/[.04] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <span className="text-xs font-semibold text-[#bdd6e4]">White label • clínicas de estética e saúde</span>
                <Link href="/bravclin" className="text-sm font-extrabold text-white">Conhecer BravClin →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="empresa" className="border-b border-[#e1ebf1] bg-white py-12 sm:py-16">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#377df0]">Quem somos</div>
            <h2 className="mt-3 max-w-2xl text-[34px] font-black leading-[1.04] tracking-[-.045em] text-[#0c3d76] sm:text-[46px]">
              Uma empresa criada para construir o futuro da gestão.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <p className="text-[15px] leading-7 text-[#5a7390]">
              Antes de falar em sistema, entendemos onde a operação perde tempo, controle ou previsibilidade. A tecnologia entra para resolver o problema — não para criar mais complexidade.
            </p>
            <p className="text-[15px] leading-7 text-[#5a7390]">
              Cada produto nasce de uma necessidade concreta e evolui com governança técnica, testes e clareza sobre o que está em desenvolvimento, homologação ou pronto para acesso.
            </p>
          </div>
        </div>
      </section>

      <section id="solucoes" className="bg-[#f7fafc] py-14 sm:py-18">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#377df0]">Ecossistema BravSystems</div>
              <h2 className="mt-3 text-[34px] font-black leading-[1.04] tracking-[-.045em] text-[#0b2947] sm:text-[46px]">
                Escolha pelo problema que você quer resolver.
              </h2>
              <p className="mt-3 max-w-3xl text-[15px] leading-7 text-[#61788d]">
                Nove produtos com função clara dentro do ecossistema. BravClin recebe destaque comercial sem quebrar a hierarquia visual do portfólio.
              </p>
            </div>
            <Link href="/acessar" className="inline-flex min-h-11 items-center justify-center self-start rounded-xl border border-[#c7dbe7] bg-white px-5 text-sm font-extrabold text-[#0b4683] lg:self-auto">
              Central de Sistemas →
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3" data-product-grid>
            {products.map((product, index) => {
              const highlighted = product.slug === "bravclin";
              return (
                <article
                  id={product.slug === "bravclin" ? "bravclin" : product.slug === "bravos" ? "bravos" : undefined}
                  key={product.slug}
                  data-product-card={product.slug}
                  className={`group flex min-h-[286px] flex-col rounded-[24px] border p-5 transition duration-200 hover:-translate-y-1 hover:shadow-xl sm:p-6 ${
                    highlighted
                      ? "border-[#78bce2] bg-gradient-to-b from-[#eef8fd] to-white shadow-lg shadow-[#0b2947]/6"
                      : "border-[#d7e4ec] bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className={`flex h-11 min-w-11 items-center justify-center rounded-2xl px-2 text-[9px] font-black tracking-[.08em] ${
                        highlighted ? "bg-[#0b4683] text-white" : "bg-[#eaf3f8] text-[#315b7a]"
                      }`}>
                        {productInitials[product.slug]}
                      </div>
                      <div className="min-w-0">
                        {highlighted && <div className="text-[9px] font-extrabold uppercase tracking-[.13em] text-[#377df0]">Destaque do portfólio</div>}
                        <h3 data-product-name className="mt-0.5 text-[22px] font-black tracking-[-.035em] text-[#0b2947]">{product.name}</h3>
                      </div>
                    </div>
                    <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[9px] font-extrabold uppercase ${statusStyle[product.status]}`}>
                      {product.status}
                    </span>
                  </div>

                  <div className="mt-4 text-[11px] font-extrabold uppercase tracking-[.12em] text-[#6f879a]">{product.category}</div>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#61788d]">{product.description}</p>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#e0e9ef] pt-4">
                    <Link href={`/${product.slug}`} className="text-sm font-extrabold text-[#0b4683]">
                      Conhecer {product.name} →
                    </Link>
                    <span className="text-[10px] font-bold text-[#91a4b2]">0{index + 1}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="bravclin-destaque" className="border-y border-[#174565] bg-[#082844] py-14 text-white sm:py-18">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#7fc8ed]">BravClin</div>
            <h2 className="mt-3 text-[34px] font-black leading-[1.04] tracking-[-.045em] sm:text-[46px]">
              Gestão clínica white label para uma operação organizada.
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#bed6e5]">
              Uma experiência própria por clínica para conectar jornada comercial, atendimento, histórico do paciente e gestão operacional sem espalhar informação entre várias ferramentas.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/bravclin" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-extrabold text-[#0b4683]">
                Conhecer o BravClin →
              </Link>
              <a href="#contato" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/20 px-5 text-sm font-bold text-white">
                Falar sobre minha clínica
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {["Agenda e confirmações", "CRM comercial", "Prontuário e evolução", "Anamnese e consentimentos", "Estoque, lote e validade", "Financeiro e indicadores"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[.06] px-4 py-4 text-sm font-bold text-[#e5f3fa]">
                <span className="mr-2 text-[#79c8ed]" aria-hidden="true">✓</span>{item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="conheca-bravos" className="bg-white py-14 sm:py-18">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-5 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
          <div>
            <div className="text-xs font-extrabold tracking-[.18em] text-[#377df0]">Conheça o <span data-product-name>BravOs</span></div>
            <h2 className="mt-3 text-[34px] font-black leading-[1.04] tracking-[-.045em] text-[#0b2947] sm:text-[44px]">
              Operação em tempo real, gestão no mesmo ritmo.
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#61788d]">
              O BravOs conecta a visão de restaurante com tecnologia construída a partir da rotina operacional real.
            </p>
            <Link href="/bravos" className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0b4683] px-5 text-sm font-extrabold text-white">
              Conhecer o BravOs →
            </Link>
          </div>
          <div className="overflow-hidden rounded-[26px] border border-[#bdd4e3] bg-[#061a2d] p-2 shadow-xl shadow-[#0b2947]/12">
            <video controls playsInline preload="metadata" className="aspect-video w-full rounded-[20px] bg-black object-cover" aria-label="Vídeo institucional BravSystems — Conheça o BravOs">
              <source src="/bravsystems-video-institucional.mp4" type="video/mp4" />
              Seu navegador não suporta reprodução de vídeo.
            </video>
          </div>
        </div>
      </section>

      <section id="gestao" className="border-y border-[#dbe7ef] bg-[#eef6fb] py-14 sm:py-18">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#377df0]">Serviços de gestão</div>
              <h2 className="mt-3 text-[34px] font-black leading-[1.04] tracking-[-.045em] text-[#0b2947] sm:text-[44px]">
                Tecnologia e gestão trabalhando na mesma direção.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {managementServices.map(([number, title, description]) => (
                <article key={number} className="rounded-2xl border border-[#d2e1ea] bg-white p-5">
                  <div className="text-[10px] font-black uppercase tracking-[.15em] text-[#377df0]">{number}</div>
                  <h3 className="mt-2 text-lg font-black text-[#0b2947]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#61788d]">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="bravacademy" className="bg-white py-14 sm:py-18">
        <div className="mx-auto grid max-w-[1280px] gap-7 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span data-product-name className="text-xs font-extrabold tracking-[.18em] text-[#377df0]">BravAcademy</span>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-extrabold uppercase text-amber-700">Em homologação</span>
            </div>
            <h2 className="mt-3 text-[32px] font-black leading-[1.05] tracking-[-.04em] text-[#0b2947] sm:text-[42px]">
              Universidade corporativa com identidade, trilha e evidência.
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5" aria-label="Jornada de aprendizagem do BravAcademy">
            {academyJourney.map((item, index) => (
              <div key={item} className="rounded-2xl border border-[#d7e4ec] bg-[#f7fafc] px-3 py-4 text-center">
                <div className="text-[10px] font-black text-[#377df0]">0{index + 1}</div>
                <div className="mt-1 text-xs font-extrabold leading-5 text-[#234d70]">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="visao" className="border-y border-[#d9e6ee] bg-[#f7fafc] py-12 sm:py-16">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
          <div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#377df0]">Nossa visão</div>
              <h2 className="mt-3 text-[34px] font-black leading-[1.04] tracking-[-.045em] text-[#0b2947] sm:text-[44px]">
                Tecnologia, gestão e crescimento trabalhando juntos.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Tecnologia", "Arquitetura moderna e capacidade real de evolução."],
                ["Gestão", "Informação clara para quem precisa decidir e executar."],
                ["Escalabilidade", "Produtos pensados para crescer com a operação."],
              ].map(([title, description]) => (
                <article key={title} className="rounded-2xl border border-[#d8e5ed] bg-white p-5">
                  <h3 className="text-lg font-black text-[#0b2947]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#61788d]">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TeamSection />

      <section id="contato" className="bg-[#e9f3f8] py-14 sm:py-18">
        <div className="mx-auto grid max-w-[1280px] items-start gap-8 px-5 sm:px-8 lg:grid-cols-[.78fr_1.22fr]">
          <div className="lg:sticky lg:top-28">
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#377df0]">Vamos conversar</div>
            <h2 className="mt-3 text-[34px] font-black leading-[1.04] tracking-[-.045em] text-[#0b2947] sm:text-[44px]">
              Onde sua empresa está perdendo tempo, controle ou previsibilidade?
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-[#61788d]">
              Conte o cenário. A BravSystems entende o problema primeiro e só depois propõe a melhor combinação entre tecnologia, processo e gestão.
            </p>
            <div className="mt-5 rounded-2xl border border-[#c3d8e5] bg-white/80 p-5 text-sm leading-7 text-[#45647d]">
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
