"use client";

import Image from "next/image";
import { useState } from "react";

const products = [
  {
    name: "BravOs",
    category: "Gestão operacional",
    headline: "Controle a operação sem depender de controles espalhados.",
    description:
      "Uma plataforma para conectar vendas, estoque, produção, financeiro e indicadores em uma visão operacional mais clara.",
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
    headline: "Organize a administração para decidir com mais segurança.",
    description:
      "Centralize rotinas financeiras, RH, Departamento Pessoal e obrigações para reduzir retrabalho e dar mais previsibilidade à gestão.",
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
    headline: "Transforme relacionamento em processo e oportunidade.",
    description:
      "Organize clientes, histórico, oportunidades e informações comerciais em um ambiente único, preparado para acompanhar o crescimento.",
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
      "Atuação estratégica para organizar processos, informações e pessoas e oferecer à liderança uma visão mais clara da operação.",
    features: [
      "Estruturação de processos",
      "Acompanhamento de indicadores",
      "Organização das rotinas",
      "Integração entre setores",
    ],
  },
  {
    number: "02",
    title: "Gestão Financeira",
    description:
      "Organização das principais rotinas financeiras para ampliar controle, previsibilidade e qualidade das decisões.",
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
      "Estruturação das informações e processos de pessoas, benefícios e custos para uma gestão mais organizada.",
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
    title: "Tecnologia aplicada",
    description:
      "Sistemas pensados para resolver problemas concretos e evoluir junto com a operação.",
  },
  {
    number: "02",
    title: "Gestão prática",
    description:
      "Processos transformados em informação clara para quem precisa decidir e executar.",
  },
  {
    number: "03",
    title: "Escalabilidade",
    description:
      "Estruturas preparadas para acompanhar novas unidades, equipes, produtos e necessidades.",
  },
];

const navigation = [
  { href: "#inicio", label: "Início" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#como-funciona", label: "Como ajudamos" },
  { href: "#servicos", label: "Serviços" },
  { href: "#empresa", label: "Empresa" },
  { href: "#contato", label: "Contato" },
];

const journey = [
  {
    number: "01",
    title: "Entendemos o cenário",
    text: "Mapeamos a necessidade, os gargalos e o nível de organização atual da empresa.",
  },
  {
    number: "02",
    title: "Definimos a solução",
    text: "Indicamos tecnologia, gestão ou uma combinação das duas, de acordo com a realidade do negócio.",
  },
  {
    number: "03",
    title: "Estruturamos a evolução",
    text: "Organizamos processos, informações e ferramentas para criar uma base mais eficiente e escalável.",
  },
];

function LeadForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      interest: String(formData.get("interest") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
      consent: formData.get("consent") === "on",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Não foi possível enviar o contato.");
      }

      form.reset();
      setStatus("success");
      setMessage(
        "Recebemos seu contato. A BravSystems retornará o mais breve possível.",
      );
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar o contato. Tente novamente.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[28px] border border-[#cbddea] bg-white p-6 shadow-xl shadow-[#0b2947]/10 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-bold text-[#334155]">
          Nome *
          <input
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            className="mt-2 h-12 w-full rounded-xl border border-[#cbddea] bg-[#f8fbfd] px-4 font-medium text-[#0f172a] outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10"
            placeholder="Seu nome"
          />
        </label>

        <label className="text-sm font-bold text-[#334155]">
          Empresa
          <input
            name="company"
            maxLength={120}
            autoComplete="organization"
            className="mt-2 h-12 w-full rounded-xl border border-[#cbddea] bg-[#f8fbfd] px-4 font-medium text-[#0f172a] outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10"
            placeholder="Nome da empresa"
          />
        </label>

        <label className="text-sm font-bold text-[#334155]">
          E-mail *
          <input
            type="email"
            name="email"
            required
            maxLength={160}
            autoComplete="email"
            className="mt-2 h-12 w-full rounded-xl border border-[#cbddea] bg-[#f8fbfd] px-4 font-medium text-[#0f172a] outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10"
            placeholder="voce@empresa.com.br"
          />
        </label>

        <label className="text-sm font-bold text-[#334155]">
          Telefone / WhatsApp
          <input
            name="phone"
            maxLength={30}
            autoComplete="tel"
            className="mt-2 h-12 w-full rounded-xl border border-[#cbddea] bg-[#f8fbfd] px-4 font-medium text-[#0f172a] outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10"
            placeholder="(11) 99999-9999"
          />
        </label>
      </div>

      <label className="mt-5 block text-sm font-bold text-[#334155]">
        Tenho interesse em *
        <select
          name="interest"
          required
          defaultValue=""
          className="mt-2 h-12 w-full rounded-xl border border-[#cbddea] bg-[#f8fbfd] px-4 font-medium text-[#0f172a] outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10"
        >
          <option value="" disabled>
            Selecione uma opção
          </option>
          <option value="BravOs">BravOs — Gestão operacional</option>
          <option value="BravHas">BravHas — Gestão administrativa</option>
          <option value="BravCrm">BravCrm — Relacionamento</option>
          <option value="Serviços administrativos">Serviços administrativos</option>
          <option value="Parceria">Parceria comercial</option>
          <option value="Outro">Outro assunto</option>
        </select>
      </label>

      <label className="mt-5 block text-sm font-bold text-[#334155]">
        Como podemos ajudar?
        <textarea
          name="message"
          maxLength={1500}
          rows={5}
          className="mt-2 w-full resize-y rounded-xl border border-[#cbddea] bg-[#f8fbfd] px-4 py-3 font-medium text-[#0f172a] outline-none transition focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10"
          placeholder="Conte brevemente o que sua empresa precisa."
        />
      </label>

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <label className="mt-5 flex items-start gap-3 text-[13px] leading-6 text-[#64748b]">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 accent-[#154b7a]"
        />
        <span>
          Autorizo a BravSystems a utilizar os dados informados para entrar em
          contato comigo sobre esta solicitação, conforme a legislação aplicável
          de proteção de dados.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#154b7a] px-6 text-[15px] font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#0b2947] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Enviando..." : "Solicitar contato"}
      </button>

      {message && (
        <div
          role="status"
          className={`mt-4 rounded-xl px-4 py-3 text-sm font-semibold ${
            status === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <p className="mt-4 text-center text-xs leading-5 text-[#94a3b8]">
        Seus dados não são publicados no site e serão usados apenas para o
        atendimento desta solicitação.
      </p>
    </form>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f4f8fb] text-[#0b2947]">
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
              Solicitar contato
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
                  Solicitar contato
                </a>
              </div>
            </details>
          </div>
        </div>
      </header>

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

        <div className="relative mx-auto grid min-h-[680px] max-w-[1360px] items-center gap-14 px-6 py-16 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-10 lg:py-20">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#bfd8e8] bg-white px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#154b7a] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#16a34a]" />
              Tecnologia e gestão para empresas
            </div>

            <h1 className="max-w-[850px] text-5xl font-bold leading-[0.98] tracking-[-0.055em] text-[#0b2947] sm:text-6xl lg:text-[72px]">
              Cresça com mais
              <span className="mt-1 block text-[#2563eb]">
                controle, clareza e tecnologia.
              </span>
            </h1>

            <p className="mt-7 max-w-[740px] text-[18px] leading-8 text-[#5f7185] sm:text-[19px]">
              A BravSystems conecta tecnologia e gestão para organizar processos,
              centralizar informações e construir operações mais eficientes,
              seguras e preparadas para crescer.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#solucoes"
                className="inline-flex h-13 items-center justify-center rounded-xl bg-[#154b7a] px-7 text-[15px] font-bold text-white shadow-lg shadow-[#154b7a]/20 transition-all hover:-translate-y-0.5 hover:bg-[#0b2947] hover:shadow-xl"
              >
                Conhecer as soluções
                <span className="ml-2 text-lg" aria-hidden="true">
                  →
                </span>
              </a>

              <a
                href="#contato"
                className="inline-flex h-13 items-center justify-center rounded-xl border border-[#bdd3e2] bg-white px-7 text-[15px] font-bold text-[#154b7a] transition-all hover:-translate-y-0.5 hover:border-[#154b7a] hover:shadow-md"
              >
                Solicitar uma apresentação
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#cddfe9] pt-6 text-[14px] font-semibold text-[#60758a]">
              {[
                "Processos mais organizados",
                "Informações centralizadas",
                "Decisões mais claras",
              ].map((item) => (
                <span key={item} className="inline-flex items-center">
                  <strong className="mr-2 text-[#154b7a]">✓</strong>
                  {item}
                </span>
              ))}
            </div>
          </div>

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

                <div className="rounded-full border border-[#cbddea] bg-[#f8fbfd] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#154b7a]">
                  B2B
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 py-5">
                {[
                  ["01", "Tecnologia"],
                  ["02", "Gestão"],
                  ["03", "Evolução"],
                ].map(([number, label]) => (
                  <div
                    key={number}
                    className="rounded-2xl border border-[#d7e8f2] bg-[#eaf3fb] p-4"
                  >
                    <div className="text-[11px] font-bold text-[#2563eb]">
                      {number}
                    </div>
                    <div className="mt-2 text-[13px] font-bold text-[#0b2947]">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-[#0b2947] p-6 text-white sm:p-7">
                <div className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#8db8dc]">
                  O que entregamos
                </div>

                <div className="mt-3 text-2xl font-bold tracking-[-0.02em] sm:text-[28px]">
                  Estrutura para a empresa evoluir.
                </div>

                <p className="mt-3 max-w-[440px] text-[15px] leading-7 text-[#b8cee0]">
                  Produtos próprios e serviços de gestão desenvolvidos para
                  reduzir dispersão de informação, retrabalho e falta de visão
                  operacional.
                </p>

                <div className="mt-6 grid gap-3 border-t border-[#284966] pt-5 text-[13px] font-semibold text-[#dbeaf5]">
                  <div>✓ Tecnologia aplicada a problemas reais</div>
                  <div>✓ Gestão orientada por processos e informação</div>
                  <div>✓ Estrutura preparada para crescimento</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="solucoes"
        className="scroll-mt-24 border-b border-[#d9e6ef] bg-white py-20"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#2563eb]">
                Soluções BravSystems
              </div>
              <h2 className="mt-3 max-w-[760px] text-4xl font-bold tracking-[-0.04em] text-[#0b2947] sm:text-5xl">
                Uma plataforma para cada frente crítica da gestão.
              </h2>
            </div>

            <p className="max-w-xl text-[17px] leading-8 text-[#64748b]">
              Nossos produtos foram concebidos para atacar problemas concretos da
              operação, administração e relacionamento com clientes.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {products.map((product, index) => (
              <article
                key={product.name}
                className="group flex h-full flex-col rounded-3xl border border-[#dce6ed] bg-[#f7fafc] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#bdd2e2] hover:bg-white hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#94a3b8]">
                      Solução 0{index + 1}
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

                <h4 className="mt-6 text-[19px] font-bold leading-7 text-[#0b2947]">
                  {product.headline}
                </h4>

                <p className="mt-3 text-[15px] leading-7 text-[#64748b]">
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
                  className="mt-auto pt-7 inline-flex items-center text-[14px] font-bold text-[#154b7a] transition-colors hover:text-[#2563eb]"
                >
                  Solicitar apresentação
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="como-funciona"
        className="scroll-mt-24 border-b border-[#d9e6ef] bg-[#0b2947] py-20 text-white"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#8db8dc]">
                Como ajudamos
              </div>
              <h2 className="mt-3 text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
                Tecnologia só gera valor quando melhora a gestão.
              </h2>
              <p className="mt-6 max-w-xl text-[17px] leading-8 text-[#b8cee0]">
                Por isso, nossa abordagem começa pelo problema e não pela
                ferramenta. Entendemos o cenário antes de definir o caminho.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              {journey.map((item) => (
                <article
                  key={item.number}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-6"
                >
                  <div className="text-sm font-bold text-[#60a5fa]">
                    {item.number}
                  </div>
                  <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-[14px] leading-7 text-[#b8cee0]">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="bravos"
        className="scroll-mt-24 border-b border-[#d9e6ef] bg-[#eef5fa] py-20"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#2563eb]">
                Demonstração
              </div>

              <h2 className="mt-3 text-4xl font-bold tracking-[-0.04em] text-[#0b2947] sm:text-5xl">
                Conheça o BravOs em ação.
              </h2>

              <p className="mt-6 text-[17px] leading-8 text-[#64748b]">
                Veja a proposta do BravOs e conheça uma plataforma criada para
                transformar processos operacionais em uma gestão mais integrada,
                clara e preparada para crescer.
              </p>

              <div className="mt-7 rounded-3xl bg-[#0b2947] p-7 text-white shadow-xl shadow-[#0b2947]/10">
                <div className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#8db8dc]">
                  BravOs
                </div>

                <h3 className="mt-3 text-2xl font-bold">
                  Mais controle da operação. Menos informação espalhada.
                </h3>

                <p className="mt-3 text-[15px] leading-7 text-[#b8cee0]">
                  Vendas, estoque, fichas técnicas, financeiro, relatórios e
                  operação reunidos para apoiar decisões mais rápidas e seguras.
                </p>

                <a
                  href="#contato"
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-white px-5 text-[14px] font-bold text-[#154b7a] transition-colors hover:bg-[#eaf3fb]"
                >
                  Quero uma apresentação
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
                  Tecnologia construída a partir de necessidades reais de gestão.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                Gestão administrativa com método, informação e acompanhamento.
              </h2>

              <p className="mt-6 max-w-xl text-[17px] leading-8 text-[#64748b]">
                A BravSystems também atua diretamente na organização
                administrativa de empresas que precisam estruturar processos,
                controles e rotinas de gestão.
              </p>

              <div className="mt-8 rounded-3xl bg-[#0b2947] p-7 text-white shadow-xl shadow-[#0b2947]/10">
                <div className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#8db8dc]">
                  Atuação estratégica
                </div>

                <h3 className="mt-3 text-2xl font-bold">
                  Organize a gestão para enxergar melhor o negócio.
                </h3>

                <p className="mt-3 text-[15px] leading-7 text-[#b8cee0]">
                  Conectamos processos, informações e pessoas para aumentar
                  controle, previsibilidade e qualidade das decisões.
                </p>

                <a
                  href="#contato"
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-white px-5 text-[14px] font-bold text-[#154b7a] transition-colors hover:bg-[#eaf3fb]"
                >
                  Falar sobre minha empresa
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

      <section
        id="empresa"
        className="scroll-mt-24 border-b border-[#d9e6ef] bg-[#eef5fa] py-20"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-[#dce6ed] bg-white p-8 shadow-sm">
              <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#2563eb]">
                Quem somos
              </div>

              <h2 className="mt-3 text-4xl font-bold tracking-[-0.04em] text-[#0b2947]">
                Tecnologia construída por quem conhece a operação por dentro.
              </h2>

              <p className="mt-6 text-[17px] leading-8 text-[#64748b]">
                A BravSystems nasce da experiência prática de gestão e da
                convicção de que tecnologia só cria valor quando resolve
                problemas reais.
              </p>

              <p className="mt-5 text-[17px] leading-8 text-[#64748b]">
                Desenvolvemos produtos próprios e serviços especializados para
                organizar informações, melhorar processos e ampliar a capacidade
                de decisão dos gestores.
              </p>
            </article>

            <article className="rounded-3xl bg-[#0b2947] p-8 text-white shadow-xl shadow-[#0b2947]/10">
              <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#8db8dc]">
                Nossa forma de construir
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
        </div>
      </section>

      <section
        id="contato"
        className="scroll-mt-24 bg-[#dfeef7] py-20"
      >
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="lg:sticky lg:top-28">
              <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#2563eb]">
                Vamos conversar
              </div>

              <h2 className="mt-3 text-4xl font-bold tracking-[-0.04em] text-[#0b2947] sm:text-5xl">
                Conte o que sua empresa precisa.
              </h2>

              <p className="mt-6 max-w-xl text-[17px] leading-8 text-[#64748b]">
                Preencha o formulário para conhecer uma solução, solicitar uma
                apresentação, falar sobre serviços administrativos ou discutir
                uma parceria.
              </p>

              <div className="mt-8 rounded-2xl border border-[#cbddea] bg-white/80 p-5">
                <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#94a3b8]">
                  Contato direto
                </div>
                <a
                  href="mailto:contato@bravsystems.com.br"
                  className="mt-2 block text-[17px] font-bold text-[#154b7a] hover:text-[#2563eb]"
                >
                  contato@bravsystems.com.br
                </a>
                <p className="mt-2 text-sm leading-6 text-[#64748b]">
                  Para solicitações comerciais, apresentações, serviços e
                  parcerias.
                </p>
              </div>
            </div>

            <LeadForm />
          </div>
        </div>
      </section>

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