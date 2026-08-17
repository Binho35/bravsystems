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

export default function Home() {
  return (
    <main className="min-h-screen bg-[#eef5fa] text-[#0b2947]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#d7e3ec] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[104px] w-full max-w-[1440px] items-center px-6 lg:px-10">
          <a
            href="#inicio"
            className="flex h-[104px] w-[190px] shrink-0 items-center"
            aria-label="BravSystems"
          >
            <Image
              src="/bravsystems-logo.png"
              alt="BravSystems — Tecnologia e Gestão"
              width={110}
              height={110}
              priority
              className="h-[96px] w-[96px] object-contain"
            />
          </a>

          <nav className="hidden flex-1 items-center justify-center gap-8 text-[16px] font-semibold text-[#475569] lg:flex">
            <a
              href="#inicio"
              className="transition-colors hover:text-[#154b7a]"
            >
              Início
            </a>

            <a
              href="#solucoes"
              className="transition-colors hover:text-[#154b7a]"
            >
              Soluções
            </a>

            <a
              href="#servicos"
              className="transition-colors hover:text-[#154b7a]"
            >
              Serviços
            </a>

            <a
              href="#parceiros"
              className="transition-colors hover:text-[#154b7a]"
            >
              Parceiros
            </a>

            <a
              href="#empresa"
              className="transition-colors hover:text-[#154b7a]"
            >
              Empresa
            </a>

            <a
              href="#contato"
              className="transition-colors hover:text-[#154b7a]"
            >
              Contato
            </a>
          </nav>

          <div className="ml-auto">
            <a
              href="#contato"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#154b7a] px-7 text-[16px] font-bold text-white shadow-md transition-all hover:bg-[#0b2947]"
            >
              Fale conosco
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
        id="inicio"
        className="relative overflow-hidden border-b border-[#d7e3ec] bg-[#eef5fa]"
      >
        <div className="absolute -right-40 -top-44 h-[520px] w-[520px] rounded-full bg-[#dcecf8]" />

        <div className="absolute -bottom-56 -left-40 h-[460px] w-[460px] rounded-full bg-[#e2eef7]" />

        <div className="relative mx-auto grid min-h-[590px] max-w-[1280px] items-center gap-14 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#cbddea] bg-[#f7fbfe] px-4 py-2 text-[13px] font-bold uppercase tracking-[0.16em] text-[#154b7a]">
              <span className="h-2 w-2 rounded-full bg-[#16a34a]" />
              Tecnologia e gestão para empresas
            </div>

            <h1 className="max-w-[760px] text-5xl font-bold leading-[1.03] tracking-[-0.045em] text-[#0b2947] sm:text-6xl lg:text-[64px]">
              Tecnologia que transforma
              <span className="block text-[#2563eb]">
                gestão em evolução.
              </span>
            </h1>

            <p className="mt-7 max-w-[680px] text-[19px] leading-8 text-[#64748b]">
              A BravSystems desenvolve soluções digitais e oferece serviços de
              gestão para empresas que querem organizar processos, ganhar
              eficiência e construir uma operação preparada para crescer.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#solucoes"
                className="inline-flex h-13 items-center justify-center rounded-xl bg-[#154b7a] px-7 text-[16px] font-bold text-white shadow-lg transition-all hover:bg-[#0b2947]"
              >
                Conheça nossas soluções
              </a>

              <a
                href="#servicos"
                className="inline-flex h-13 items-center justify-center rounded-xl border border-[#c5d8e6] bg-white px-7 text-[16px] font-bold text-[#154b7a] transition-all hover:border-[#154b7a]"
              >
                Serviços de gestão
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[16px] font-medium text-[#64748b]">
              <span>
                <strong className="text-[#154b7a]">✓</strong> Tecnologia
              </span>

              <span>
                <strong className="text-[#154b7a]">✓</strong> Gestão
              </span>

              <span>
                <strong className="text-[#154b7a]">✓</strong> Escalabilidade
              </span>
            </div>
          </div>

          {/* PAINEL HERO */}
          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute -inset-5 rounded-[34px] bg-[#d7eaf7]" />

            <div className="relative overflow-hidden rounded-[28px] border border-[#c8dbe8] bg-[#f9fcfe] p-6 shadow-2xl shadow-[#0b2947]/10">
              <div className="flex items-center justify-between border-b border-[#dce6ed] pb-5">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#94a3b8]">
                    BravSystems
                  </div>

                  <div className="mt-1 text-[21px] font-bold text-[#0b2947]">
                    Tecnologia e Gestão
                  </div>
                </div>

                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#dbe4ec]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#dbe4ec]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#154b7a]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-5">
                <div className="rounded-2xl bg-[#eaf3fb] p-5">
                  <div className="text-[11px] font-bold tracking-[0.12em] text-[#94a3b8]">
                    SOLUÇÕES
                  </div>

                  <div className="mt-2 text-4xl font-bold text-[#154b7a]">
                    03
                  </div>

                  <div className="mt-1 text-[14px] text-[#64748b]">
                    produtos em evolução
                  </div>
                </div>

                <div className="rounded-2xl bg-[#eaf3fb] p-5">
                  <div className="text-[11px] font-bold tracking-[0.12em] text-[#94a3b8]">
                    GESTÃO
                  </div>

                  <div className="mt-2 text-4xl font-bold text-[#2563eb]">
                    360°
                  </div>

                  <div className="mt-1 text-[14px] text-[#64748b]">
                    visão empresarial
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#0b2947] p-6 text-white">
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8db8dc]">
                  BravSystems
                </div>

                <div className="mt-2 text-2xl font-bold">
                  Tecnologia com propósito.
                </div>

                <p className="mt-3 text-[16px] leading-7 text-[#b8cee0]">
                  Sistemas e serviços pensados para resolver problemas reais e
                  acompanhar o crescimento das empresas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUÇÕES */}
      <section
        id="solucoes"
        className="border-b border-[#d9e6ef] bg-white py-20"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="text-[13px] font-bold uppercase tracking-[0.18em] text-[#2563eb]">
                Nossas soluções
              </div>

              <h2 className="mt-3 max-w-[700px] text-4xl font-bold tracking-[-0.035em] text-[#0b2947] sm:text-5xl">
                Tecnologia para diferentes necessidades de gestão.
              </h2>
            </div>

            <p className="max-w-xl text-[17px] leading-8 text-[#64748b]">
              Um ecossistema de produtos próprios desenvolvido para acompanhar
              empresas em diferentes momentos e necessidades.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.name}
                className="rounded-3xl border border-[#dce6ed] bg-[#f7fafc] p-7 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-3xl font-bold text-[#0b2947]">
                      {product.name}
                    </h3>

                    <div className="mt-2 text-[13px] font-bold uppercase tracking-[0.13em] text-[#2563eb]">
                      {product.category}
                    </div>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e4f0f8] text-lg font-bold text-[#154b7a]">
                    B
                  </div>
                </div>

                <p className="mt-6 text-[17px] leading-8 text-[#64748b]">
                  {product.description}
                </p>

                <div className="mt-6 grid grid-cols-1 gap-3 border-t border-[#e2e8f0] pt-6 sm:grid-cols-2">
                  {product.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-2 text-[15px] font-medium leading-6 text-[#475569]"
                    >
                      <span className="mt-0.5 text-[#2563eb]">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* VÍDEO INSTITUCIONAL */}
      <section
        id="bravos"
        className="border-b border-[#d9e6ef] bg-[#eef5fa] py-20"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <div className="text-[13px] font-bold uppercase tracking-[0.18em] text-[#2563eb]">
                Conheça o BravOs
              </div>

              <h2 className="mt-3 text-4xl font-bold tracking-[-0.035em] text-[#0b2947] sm:text-5xl">
                Tecnologia criada para organizar a operação.
              </h2>

              <p className="mt-6 text-[17px] leading-8 text-[#64748b]">
                Veja um pouco do BravOs e conheça a proposta de uma plataforma
                desenvolvida para transformar processos operacionais em uma
                gestão mais clara, integrada e eficiente.
              </p>

              <div className="mt-7 rounded-3xl bg-[#0b2947] p-7 text-white">
                <div className="text-[13px] font-bold uppercase tracking-[0.16em] text-[#8db8dc]">
                  BravOs
                </div>

                <h3 className="mt-3 text-2xl font-bold">
                  Gestão operacional em uma única plataforma.
                </h3>

                <p className="mt-3 text-[16px] leading-7 text-[#b8cee0]">
                  Vendas, estoque, fichas técnicas, financeiro, relatórios e
                  operação preparados para acompanhar o crescimento do negócio.
                </p>

                <a
                  href="#contato"
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-white px-5 text-[15px] font-bold text-[#154b7a] transition-colors hover:bg-[#eaf3fb]"
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
                poster="/bravsystems-logo.png"
              >
                <source
                  src="/bravos-institucional.mp4"
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
        className="border-b border-[#d9e6ef] bg-white py-20"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <div className="text-[13px] font-bold uppercase tracking-[0.18em] text-[#2563eb]">
                Serviços de gestão
              </div>

              <h2 className="mt-3 text-4xl font-bold tracking-[-0.035em] text-[#0b2947] sm:text-5xl">
                Gestão administrativa para empresas que precisam de controle.
              </h2>

              <p className="mt-6 max-w-xl text-[17px] leading-8 text-[#64748b]">
                Além dos nossos produtos, a BravSystems atua diretamente na
                organização administrativa das empresas.
              </p>

              <div className="mt-8 rounded-3xl bg-[#0b2947] p-7 text-white">
                <div className="text-[13px] font-bold uppercase tracking-[0.16em] text-[#8db8dc]">
                  Atuação estratégica
                </div>

                <h3 className="mt-3 text-2xl font-bold">
                  Você cuida do negócio. Nós organizamos a gestão por trás
                  dele.
                </h3>

                <p className="mt-3 text-[16px] leading-7 text-[#b8cee0]">
                  Conectamos processos, informações e pessoas para oferecer ao
                  gestor uma visão mais clara da operação.
                </p>

                <a
                  href="#contato"
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-white px-5 text-[15px] font-bold text-[#154b7a] transition-colors hover:bg-[#eaf3fb]"
                >
                  Fale sobre sua empresa
                </a>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {administrativeServices.map((service) => (
                <article
                  key={service.number}
                  className="rounded-3xl border border-[#d5e2eb] bg-[#f8fbfd] p-7 shadow-sm transition-all hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold tracking-[0.15em] text-[#2563eb]">
                      {service.number}
                    </span>

                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eaf3fb] text-[15px] font-bold text-[#154b7a]">
                      B
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-bold text-[#0b2947]">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-[16px] leading-7 text-[#64748b]">
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
        className="border-b border-[#d9e6ef] bg-[#eef5fa] py-20"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="text-[13px] font-bold uppercase tracking-[0.18em] text-[#2563eb]">
                Seja nosso parceiro
              </div>

              <h2 className="mt-3 text-4xl font-bold tracking-[-0.035em] text-[#0b2947] sm:text-5xl">
                Construa novas oportunidades com a BravSystems.
              </h2>

              <p className="mt-6 text-[17px] leading-8 text-[#64748b]">
                Buscamos parceiros que compartilhem da nossa visão de unir
                tecnologia, gestão e soluções práticas para empresas.
              </p>

              <a
                href="mailto:contato@bravsystems.com.br?subject=Parceria%20BravSystems"
                className="mt-7 inline-flex h-12 items-center justify-center rounded-xl bg-[#154b7a] px-7 text-[16px] font-bold text-white shadow-lg transition-all hover:bg-[#0b2947]"
              >
                Quero ser parceiro
              </a>
            </div>

            <div className="rounded-3xl bg-[#0b2947] p-8 text-white">
              <div className="text-[13px] font-bold uppercase tracking-[0.18em] text-[#8db8dc]">
                Parcerias
              </div>

              <h3 className="mt-3 text-3xl font-bold">
                Tecnologia e gestão trabalhando em conjunto.
              </h3>

              <p className="mt-4 text-[16px] leading-7 text-[#b8cee0]">
                Podemos desenvolver relações comerciais, indicações, soluções
                conjuntas e novas oportunidades de negócio.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {partnershipBenefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-4 text-[15px] font-medium leading-6 text-[#dbeaf5]"
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
      <section id="empresa" className="bg-white py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-[#dce6ed] bg-[#f7fafc] p-8">
              <div className="text-[13px] font-bold uppercase tracking-[0.18em] text-[#2563eb]">
                Quem somos
              </div>

              <h2 className="mt-3 text-4xl font-bold tracking-[-0.035em] text-[#0b2947]">
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

            <article className="rounded-3xl bg-[#0b2947] p-8 text-white">
              <div className="text-[13px] font-bold uppercase tracking-[0.18em] text-[#8db8dc]">
                Nossa visão
              </div>

              <h2 className="mt-3 text-4xl font-bold tracking-[-0.035em]">
                Tecnologia, gestão e crescimento trabalhando juntos.
              </h2>

              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                {pillars.map((pillar) => (
                  <div
                    key={pillar.number}
                    className="rounded-xl border border-white/10 bg-white/[0.05] p-5"
                  >
                    <div className="text-[13px] font-bold text-[#60a5fa]">
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
      <section id="contato" className="bg-[#dfeef7] py-16">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="flex flex-col gap-8 rounded-3xl border border-[#cbddea] bg-[#eef7fc] p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-[13px] font-bold uppercase tracking-[0.18em] text-[#2563eb]">
                BravSystems
              </div>

              <h2 className="mt-2 text-4xl font-bold tracking-[-0.035em] text-[#0b2947]">
                Tecnologia e gestão para fazer sua empresa evoluir.
              </h2>

              <p className="mt-4 max-w-2xl text-[17px] leading-7 text-[#64748b]">
                Conheça nossas soluções, nossos serviços, torne-se parceiro ou
                converse conosco sobre as necessidades administrativas da sua
                empresa.
              </p>
            </div>

            <a
              href="mailto:contato@bravsystems.com.br"
              className="inline-flex h-13 shrink-0 items-center justify-center rounded-xl bg-[#154b7a] px-8 text-[16px] font-bold text-white transition-all hover:bg-[#0b2947]"
            >
              Fale conosco
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#d7e3ec] bg-[#eaf3f9]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-6 py-8 text-[14px] text-[#64748b] sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <span className="font-bold text-[#0b2947]">BravSystems</span>

            <span className="mx-2 text-[#cbd5e1]">•</span>

            Tecnologia e Gestão
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