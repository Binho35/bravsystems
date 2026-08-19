import Image from "next/image";

const products = [
  {
    name: "BravOs",
    category: "Gestão operacional",
    description:
      "Sistema de gestão para organizar operações, vendas, estoque, produção, financeiro e indicadores em uma única plataforma.",
    features: [
      "PDV e vendas",
      "Estoque e fichas técnicas",
      "Financeiro e relatórios",
      "Operação offline-first",
    ],
  },
  {
    name: "BravHas",
    category: "Gestão administrativa",
    description:
      "Plataforma para centralizar processos administrativos, financeiros e de pessoas, reduzindo controles dispersos e planilhas.",
    features: [
      "Financeiro",
      "Recursos Humanos",
      "Departamento Pessoal",
      "Obrigações e controles",
    ],
  },
  {
    name: "BravCrm",
    category: "Relacionamento",
    description:
      "Soluções para organizar informações, relacionamentos e oportunidades, aproximando empresas de seus clientes.",
    features: [
      "Gestão de clientes",
      "Histórico de relacionamento",
      "Processos comerciais",
      "Informações centralizadas",
    ],
  },
];

const administrativeServices = [
  {
    number: "01",
    title: "Head Administrativo",
    description:
      "Atuação estratégica na organização da gestão administrativa, conectando informações, processos e pessoas para oferecer ao gestor uma visão mais clara do negócio.",
    features: [
      "Estruturação de processos administrativos",
      "Acompanhamento de indicadores",
      "Organização das rotinas de gestão",
      "Integração entre setores",
    ],
  },
  {
    number: "02",
    title: "Gestão Financeira",
    description:
      "Organização e acompanhamento das principais rotinas financeiras para aumentar o controle sobre o caixa e apoiar decisões mais seguras.",
    features: [
      "Fluxo de caixa",
      "Contas a pagar e receber",
      "Conciliação bancária",
      "Provisões e vencimentos",
    ],
  },
  {
    number: "03",
    title: "Recursos Humanos",
    description:
      "Apoio à organização das informações e processos de pessoas, benefícios e custos relacionados à equipe.",
    features: [
      "Gestão de benefícios",
      "Vale-transporte e vale-refeição",
      "Controle de informações",
      "Acompanhamento de custos",
    ],
  },
  {
    number: "04",
    title: "Departamento Pessoal",
    description:
      "Acompanhamento e organização das rotinas administrativas relacionadas aos colaboradores e às obrigações de pessoal.",
    features: [
      "Provisão de folha",
      "Conferência de informações",
      "Benefícios e encargos",
      "Acompanhamento de obrigações",
    ],
  },
];

const pillars = [
  {
    number: "01",
    title: "Tecnologia",
    description:
      "Construímos sistemas com arquitetura moderna, segurança e capacidade de evolução.",
  },
  {
    number: "02",
    title: "Gestão",
    description:
      "Transformamos processos complexos em ferramentas claras para quem precisa tomar decisões.",
  },
  {
    number: "03",
    title: "Escalabilidade",
    description:
      "Nossas soluções são pensadas para crescer junto com a empresa e suas necessidades.",
  },
];

const partnershipBenefits = [
  "Indicação de clientes e oportunidades",
  "Construção de soluções em conjunto",
  "Serviços especializados de gestão",
  "Tecnologia aplicada a necessidades reais",
];

const navigation = [
  { href: "#inicio", label: "Início" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#servicos", label: "Serviços" },
  { href: "#parceiros", label: "Parceiros" },
  { href: "#empresa", label: "Empresa" },
  { href: "#contato", label: "Contato" },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f4f8fb] text-[#0b2947]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#dce6ed] bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex min-h-[82px] w-full max-w-[1440px] items-center px-5 sm:px-6 lg:px-10">
          <a
            href="#inicio"
            className="flex shrink-0 items-center"
            aria-label="BravSystems — início"
          >
            <Image
              src="/bravsystems-logo.png"
              alt="BravSystems — Tecnologia e Gestão"
              width={110}
              height={110}
              priority
              className="h-[70px] w-[70px] object-contain sm:h-[78px] sm:w-[78px]"
            />
          </a>

          <nav
            className="hidden flex-1 items-center justify-center gap-7 text-[15px] font-semibold text-[#475569] lg:flex"
            aria-label="Navegação principal"
          >
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-1 py-2 transition-colors hover:text-[#154b7a] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <a
              href="#contato"
              className="hidden h-11 items-center justify-center rounded-full bg-[#154b7a] px-6 text-[15px] font-bold text-white shadow-md transition-all hover:bg-[#0b2947] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]/40 focus:ring-offset-2 sm:inline-flex"
            >
              Fale conosco
            </a>

            <details className="relative lg:hidden">
              <summary
                className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-xl border border-[#d6e2eb] bg-white text-[#154b7a] shadow-sm transition-colors hover:bg-[#f4f8fb] [&::-webkit-details-marker]:hidden"
                aria-label="Abrir menu"
              >
                <span className="text-xl leading-none">☰</span>
              </summary>

              <div className="absolute right-0 top-14 w-64 overflow-hidden rounded-2xl border border-[#dce6ed] bg-white p-2 shadow-2xl">
                {navigation.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-[#334155] transition-colors hover:bg-[#eef5fa] hover:text-[#154b7a]"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#contato"
                  className="mt-1 block rounded-xl bg-[#154b7a] px-4 py-3 text-center text-sm font-bold text-white"
                >
                  Fale conosco
                </a>
              </div>
            </details>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
        id="inicio"
        className="relative overflow-hidden border-b border-[#d7e3ec] bg-[#eef5fa]"
      >
        <div
          className="pointer-events-none absolute -right-56 -top-56 h-[720px] w-[720px] rounded-full bg-[#d8ebf8]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-72 -left-56 h-[600px] w-[600px] rounded-full bg-[#e2eff8]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-[32%] top-[18%] h-24 w-24 rounded-full border border-[#c5deed]"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid min-h-[650px] max-w-[1360px] items-center gap-14 px-6 py-16 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-10 lg:py-20">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#bfd8e8] bg-white px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#154b7a] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#16a34a]" />
              Tecnologia e gestão para empresas
            </div>

            <h1 className="max-w-[820px] text-5xl font-bold leading-[0.98] tracking-[-0.055em] text-[#0b2947] sm:text-6xl lg:text-[72px]">
              Tecnologia que transforma
              <span className="mt-1 block text-[#2563eb]">
                gestão em evolução.
              </span>
            </h1>

            <p className="mt-7 max-w-[720px] text-[18px] leading-8 text-[#5f7185] sm:text-[19px]">
              A BravSystems desenvolve soluções digitais e serviços de gestão
              para empresas que querem organizar processos, ganhar eficiência
              e construir uma operação preparada para crescer.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#solucoes"
                className="inline-flex h-13 items-center justify-center rounded-xl bg-[#154b7a] px-7 text-[15px] font-bold text-white shadow-lg shadow-[#154b7a]/20 transition-all hover:-translate-y-0.5 hover:bg-[#0b2947] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb]/40 focus:ring-offset-2"
              >
                Conheça nossas soluções
                <span className="ml-2 text-lg" aria-hidden="true">
                  →
                </span>
              </a>

              <a
                href="#contato"
                className="inline-flex h-13 items-center justify-center rounded-xl border border-[#bdd3e2] bg-white px-7 text-[15px] font-bold text-[#154b7a] transition-all hover:-translate-y-0.5 hover:border-[#154b7a] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30 focus:ring-offset-2"
              >
                Fale conosco
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#cddfe9] pt-6 text-[14px] font-semibold text-[#60758a]">
              {["Tecnologia", "Gestão", "Escalabilidade"].map((item) => (
                <span key={item} className="inline-flex items-center">
                  <strong className="mr-2 text-[#154b7a]">✓</strong>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* PAINEL HERO */}
          <div className="relative mx-auto w-full max-w-[570px] lg:justify-self-end">
            <div
              className="absolute -inset-6 rounded-[38px] bg-[#d6eaf7]"
              aria-hidden="true"
            />

            <div className="relative overflow-hidden rounded-[30px] border border-[#c4d9e7] bg-white/95 p-5 shadow-2xl shadow-[#0b2947]/15 backdrop-blur sm:p-7">
              <div className="flex items-start justify-between border-b border-[#dce6ed] pb-5">
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#94a3b8]">
                    Ecossistema BravSystems
                  </div>
                  <div className="mt-1 text-[22px] font-bold tracking-[-0.02em] text-[#0b2947]">
                    Tecnologia + Gestão
                  </div>
                </div>

                <div
                  className="flex gap-1.5 pt-1"
                  aria-hidden="true"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-[#dbe4ec]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#dbe4ec]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#154b7a]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-5">
                <div className="rounded-2xl border border-[#d7e8f2] bg-[#eaf3fb] p-5">
                  <div className="text-[10px] font-extrabold tracking-[0.14em] text-[#8aa0b2]">
                    SOLUÇÕES
                  </div>
                  <div className="mt-2 text-4xl font-bold tracking-[-0.04em] text-[#154b7a]">
                    03
                  </div>
                  <div className="mt-1 text-[13px] leading-5 text-[#64748b]">
                    produtos próprios
                    <br />
                    em evolução
                  </div>
                </div>

                <div className="rounded-2xl border border-[#d7e8f2] bg-[#eaf3fb] p-5">
                  <div className="text-[10px] font-extrabold tracking-[0.14em] text-[#8aa0b2]">
                    VISÃO
                  </div>
                  <div className="mt-2 text-4xl font-bold tracking-[-0.04em] text-[#2563eb]">
                    360°
                  </div>
                  <div className="mt-1 text-[13px] leading-5 text-[#64748b]">
                    tecnologia aplicada
                    <br />
                    à gestão
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#0b2947] p-6 text-white sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#8db8dc]">
                    BravSystems
                  </div>
                  <div className="rounded-full border border-[#315776] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#b8cee0]">
                    Em evolução
                  </div>
                </div>

                <div className="mt-3 text-2xl font-bold tracking-[-0.02em] sm:text-[28px]">
                  Tecnologia com propósito.
                </div>

                <p className="mt-3 max-w-[440px] text-[15px] leading-7 text-[#b8cee0]">
                  Sistemas e serviços pensados para resolver problemas reais,
                  organizar operações e acompanhar o crescimento das empresas.
                </p>

                <div className="mt-6 grid grid-cols-3 gap-2 border-t border-[#284966] pt-5">
                  {[
                    ["01", "Tecnologia"],
                    ["02", "Gestão"],
                    ["03", "Escala"],
                  ].map(([number, label]) => (
                    <div key={number}>
                      <div className="text-[10px] font-bold text-[#8db8dc]">
                        {number}
                      </div>
                      <div className="mt-1 text-[12px] font-semibold text-white">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUÇÕES */}
      <section
        id="solucoes"
        className="scroll-mt-24 border-b border-[#d9e6ef] bg-white py-20"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#2563eb]">
                Nossas soluções
              </div>
              <h2 className="mt-3 max-w-[720px] text-4xl font-bold tracking-[-0.04em] text-[#0b2947] sm:text-5xl">
                Tecnologia para diferentes necessidades de gestão.
              </h2>
            </div>

            <p className="max-w-xl text-[17px] leading-8 text-[#64748b]">
              Um ecossistema de produtos próprios desenvolvido para acompanhar
              empresas em diferentes momentos e necessidades.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {products.map((product, index) => (
              <article
                key={product.name}
                className="group rounded-3xl border border-[#dce6ed] bg-[#f7fafc] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#bdd2e2] hover:bg-white hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#94a3b8]">
                      Produto 0{index + 1}
                    </div>
                    <h3 className="text-3xl font-bold text-[#0b2947]">
                      {product.name}
                    </h3>
                    <div className="mt-2 text-[12px] font-bold uppercase tracking-[0.13em] text-[#2563eb]">
                      {product.category}
                    </div>
                  </div>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e4f0f8] text-lg font-bold text-[#154b7a] transition-colors group-hover:bg-[#154b7a] group-hover:text-white">
                    B
                  </div>
                </div>

                <p className="mt-6 text-[16px] leading-8 text-[#64748b]">
                  {product.description}
                </p>

                <div className="mt-6 grid grid-cols-1 gap-3 border-t border-[#e2e8f0] pt-6 sm:grid-cols-2">
                  {product.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-2 text-[14px] font-medium leading-6 text-[#475569]"
                    >
                      <span className="mt-0.5 text-[#2563eb]">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>

                <a
                  href="#contato"
                  className="mt-7 inline-flex items-center text-[14px] font-bold text-[#154b7a] transition-colors hover:text-[#2563eb]"
                >
                  Quero conhecer
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BRAVOS */}
      <section
        id="bravos"
        className="scroll-mt-24 border-b border-[#d9e6ef] bg-[#eef5fa] py-20"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#2563eb]">
                Conheça o BravOs
              </div>

              <h2 className="mt-3 text-4xl font-bold tracking-[-0.04em] text-[#0b2947] sm:text-5xl">
                Tecnologia criada para organizar a operação.
              </h2>

              <p className="mt-6 text-[17px] leading-8 text-[#64748b]">
                Veja um pouco do BravOs e conheça a proposta de uma plataforma
                desenvolvida para transformar processos operacionais em uma
                gestão mais clara, integrada e eficiente.
              </p>

              <div className="mt-7 rounded-3xl bg-[#0b2947] p-7 text-white shadow-xl shadow-[#0b2947]/10">
                <div className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#8db8dc]">
                  BravOs
                </div>

                <h3 className="mt-3 text-2xl font-bold">
                  Gestão operacional em uma única plataforma.
                </h3>

                <p className="mt-3 text-[15px] leading-7 text-[#b8cee0]">
                  Vendas, estoque, fichas técnicas, financeiro, relatórios e
                  operação preparados para acompanhar o crescimento do negócio.
                </p>

                <a
                  href="#contato"
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-white px-5 text-[14px] font-bold text-[#154b7a] transition-colors hover:bg-[#eaf3fb]"
                >
                  Quero conhecer o BravOs
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-[#cbddea] bg-white p-3 shadow-xl shadow-[#0b2947]/10">
              <video
                className="aspect-video w-full rounded-2xl bg-[#0b2947] object-cover"
                controls
                preload="metadata"
                playsInline
                poster="/bravsystems-logo.png"
              >
                <source
                  src="/bravsystems-video-institucional.mp4"
                  type="video/mp4"
                />
                Seu navegador não suporta a reprodução deste vídeo.
              </video>

              <div className="px-3 pb-3 pt-4">
                <div className="text-[16px] font-bold text-[#0b2947]">
                  BravOs — apresentação institucional
                </div>
                <div className="mt-1 text-[14px] text-[#64748b]">
                  Conheça um pouco do sistema e da visão da BravSystems.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section
        id="servicos"
        className="scroll-mt-24 border-b border-[#d9e6ef] bg-white py-20"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#2563eb]">
                Serviços de gestão
              </div>

              <h2 className="mt-3 text-4xl font-bold tracking-[-0.04em] text-[#0b2947] sm:text-5xl">
                Gestão administrativa para empresas que precisam de controle.
              </h2>

              <p className="mt-6 max-w-xl text-[17px] leading-8 text-[#64748b]">
                Além dos nossos produtos, a BravSystems atua diretamente na
                organização administrativa das empresas.
              </p>

              <div className="mt-8 rounded-3xl bg-[#0b2947] p-7 text-white shadow-xl shadow-[#0b2947]/10">
                <div className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#8db8dc]">
                  Atuação estratégica
                </div>

                <h3 className="mt-3 text-2xl font-bold">
                  Você cuida do negócio. Nós organizamos a gestão por trás
                  dele.
                </h3>

                <p className="mt-3 text-[15px] leading-7 text-[#b8cee0]">
                  Conectamos processos, informações e pessoas para oferecer ao
                  gestor uma visão mais clara da operação.
                </p>

                <a
                  href="#contato"
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-white px-5 text-[14px] font-bold text-[#154b7a] transition-colors hover:bg-[#eaf3fb]"
                >
                  Fale sobre sua empresa
                </a>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {administrativeServices.map((service) => (
                <article
                  key={service.number}
                  className="rounded-3xl border border-[#d5e2eb] bg-[#f8fbfd] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold tracking-[0.15em] text-[#2563eb]">
                      {service.number}
                    </span>

                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eaf3fb] text-[15px] font-bold text-[#154b7a]">
                      B
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-bold text-[#0b2947]">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-[15px] leading-7 text-[#64748b]">
                    {service.description}
                  </p>

                  <div className="mt-5 space-y-3 border-t border-[#e2e8f0] pt-5">
                    {service.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-2 text-[14px] leading-6 text-[#475569]"
                      >
                        <span className="text-[#154b7a]">✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PARCEIROS */}
      <section
        id="parceiros"
        className="scroll-mt-24 border-b border-[#d9e6ef] bg-[#eef5fa] py-20"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#2563eb]">
                Seja nosso parceiro
              </div>

              <h2 className="mt-3 text-4xl font-bold tracking-[-0.04em] text-[#0b2947] sm:text-5xl">
                Construa novas oportunidades com a BravSystems.
              </h2>

              <p className="mt-6 text-[17px] leading-8 text-[#64748b]">
                Buscamos parceiros que compartilhem da nossa visão de unir
                tecnologia, gestão e soluções práticas para empresas.
              </p>

              <a
                href="mailto:contato@bravsystems.com.br?subject=Parceria%20BravSystems"
                className="mt-7 inline-flex h-12 items-center justify-center rounded-xl bg-[#154b7a] px-7 text-[15px] font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#0b2947] hover:shadow-xl"
              >
                Quero ser parceiro
              </a>
            </div>

            <div className="rounded-3xl bg-[#0b2947] p-8 text-white shadow-xl shadow-[#0b2947]/15">
              <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#8db8dc]">
                Parcerias
              </div>

              <h3 className="mt-3 text-3xl font-bold">
                Tecnologia e gestão trabalhando em conjunto.
              </h3>

              <p className="mt-4 text-[15px] leading-7 text-[#b8cee0]">
                Podemos desenvolver relações comerciais, indicações, soluções
                conjuntas e novas oportunidades de negócio.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {partnershipBenefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-4 text-[14px] font-medium leading-6 text-[#dbeaf5]"
                  >
                    <span className="text-[#60a5fa]">✓</span>
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMPRESA */}
      <section
        id="empresa"
        className="scroll-mt-24 bg-white py-20"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-[#dce6ed] bg-[#f7fafc] p-8">
              <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#2563eb]">
                Quem somos
              </div>

              <h2 className="mt-3 text-4xl font-bold tracking-[-0.04em] text-[#0b2947]">
                Uma empresa criada para construir o futuro da gestão.
              </h2>

              <p className="mt-6 text-[17px] leading-8 text-[#64748b]">
                A BravSystems nasce da experiência prática de quem conhece a
                operação empresarial por dentro e entende que tecnologia só
                gera valor quando resolve problemas reais.
              </p>

              <p className="mt-5 text-[17px] leading-8 text-[#64748b]">
                Nosso objetivo é desenvolver produtos próprios e oferecer
                serviços especializados capazes de organizar informações,
                melhorar processos e oferecer aos gestores uma visão mais clara
                de seus negócios.
              </p>
            </article>

            <article className="rounded-3xl bg-[#0b2947] p-8 text-white shadow-xl shadow-[#0b2947]/10">
              <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#8db8dc]">
                Nossa visão
              </div>

              <h2 className="mt-3 text-4xl font-bold tracking-[-0.04em]">
                Tecnologia, gestão e crescimento trabalhando juntos.
              </h2>

              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                {pillars.map((pillar) => (
                  <div
                    key={pillar.number}
                    className="rounded-xl border border-white/10 bg-white/[0.05] p-5"
                  >
                    <div className="text-[12px] font-bold text-[#60a5fa]">
                      {pillar.number}
                    </div>

                    <h3 className="mt-3 text-[18px] font-bold">
                      {pillar.title}
                    </h3>

                    <p className="mt-2 text-[14px] leading-6 text-[#b8cee0]">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <p className="mx-auto mt-10 max-w-4xl text-center text-[18px] font-semibold leading-8 text-[#154b7a]">
            Não queremos apenas criar sistemas. Queremos criar ferramentas e
            serviços que façam empresas melhores.
          </p>
        </div>
      </section>

      {/* CONTATO */}
      <section
        id="contato"
        className="scroll-mt-24 bg-[#dfeef7] py-16"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="flex flex-col gap-8 rounded-3xl border border-[#cbddea] bg-[#eef7fc] p-8 shadow-sm sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#2563eb]">
                BravSystems
              </div>

              <h2 className="mt-2 text-4xl font-bold tracking-[-0.04em] text-[#0b2947]">
                Tecnologia e gestão para fazer sua empresa evoluir.
              </h2>

              <p className="mt-4 max-w-2xl text-[17px] leading-7 text-[#64748b]">
                Conheça nossas soluções, nossos serviços, torne-se parceiro ou
                converse conosco sobre as necessidades administrativas da sua
                empresa.
              </p>

              <p className="mt-4 text-[15px] font-semibold text-[#154b7a]">
                contato@bravsystems.com.br
              </p>
            </div>

            <a
              href="mailto:contato@bravsystems.com.br"
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-xl bg-[#154b7a] px-8 text-[15px] font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#0b2947] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#2563eb]/40 focus:ring-offset-2"
            >
              Fale conosco
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#d7e3ec] bg-[#eaf3f9]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-6 py-8 text-[14px] text-[#64748b] sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <span className="font-bold text-[#0b2947]">BravSystems</span>
            <span className="mx-2 text-[#cbd5e1]">•</span>
            <span>Tecnologia e Gestão</span>
          </div>

          <div>
            © {new Date().getFullYear()} BravSystems. Todos os direitos
            reservados.
          </div>
        </div>
      </footer>
    </main>
  );
}