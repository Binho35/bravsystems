import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { aiAgents, founder, type TeamMember } from "@/lib/team";

export const metadata: Metadata = {
  title: "Equipe | BravSystems",
  description: "Conheça a liderança humana e a estrutura de agentes de inteligência artificial especializados que apoiam a evolução do ecossistema BravSystems.",
  alternates: { canonical: "/equipe" },
  openGraph: {
    type: "website",
    url: "https://bravsystems.com.br/equipe",
    title: "Equipe | BravSystems",
    description: "Liderança humana combinada a agentes de IA especializados em engenharia, produto, qualidade, operações, pesquisa e experiência digital.",
  },
};

const portraitTones = [
  "from-[#0b2947] via-[#15517f] to-[#8bc8ed]",
  "from-[#102a43] via-[#2563eb] to-[#badcf0]",
  "from-[#173f5f] via-[#39739a] to-[#d4eaf6]",
  "from-[#0f3658] via-[#4b7b9a] to-[#c3dce9]",
  "from-[#1d3557] via-[#457b9d] to-[#d9ecf5]",
  "from-[#11324d] via-[#2d6a8c] to-[#b9d9e9]",
] as const;

function Portrait({ member, index = 0, priority = false }: { member: TeamMember; index?: number; priority?: boolean }) {
  if (member.portraitSrc) {
    return (
      <Image
        src={member.portraitSrc}
        alt={`Retrato institucional de ${member.name}`}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover object-center"
      />
    );
  }

  const tone = portraitTones[index % portraitTones.length];
  return (
    <div
      className={`absolute inset-0 overflow-hidden bg-gradient-to-br ${tone}`}
      data-portrait-status={member.portraitStatus}
      aria-label={`Identidade visual institucional provisória de ${member.name}`}
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/20 bg-white/10" />
      <div className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full border border-white/15 bg-[#061a2d]/20" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#061a2d]/55 to-transparent" />
      <div className="relative flex h-full flex-col justify-between p-5 text-white sm:p-6">
        <span className="self-start rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[9px] font-extrabold uppercase tracking-[.16em] backdrop-blur-sm">
          {member.kind === "ai" ? "IA" : "Founder"}
        </span>
        <div>
          <div className="text-5xl font-black tracking-[-.08em] sm:text-6xl">{member.initials}</div>
          <div className="mt-2 text-[10px] font-bold uppercase tracking-[.14em] text-white/70">Identidade institucional</div>
        </div>
      </div>
    </div>
  );
}

function AgentCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <article className="group overflow-hidden rounded-[26px] border border-[#d7e4ec] bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#a9c9db] hover:shadow-xl" data-team-member={member.slug}>
      <div className="relative aspect-[4/3] overflow-hidden bg-[#dfeef7]">
        <Portrait member={member} index={index} />
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#2563eb]">{member.role}</span>
          <span className="rounded-full border border-[#b9d7e8] bg-[#edf7fc] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[.08em] text-[#15517f]">Agente de IA BravSystems</span>
        </div>
        <h2 className="mt-3 text-2xl font-bold tracking-[-.035em] text-[#082844]">{member.name}</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-[#315b7a]">{member.specialty}</p>
        <p className="mt-3 text-sm leading-6 text-[#60758a]">{member.description}</p>
      </div>
    </article>
  );
}

export default function TeamPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f4f8fb] text-[#082844]">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-[#d5e4ed] bg-white py-12 sm:py-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-52 -top-60 h-[640px] w-[640px] rounded-full bg-[#dceef8] blur-3xl" />
          <div className="absolute -bottom-80 left-[8%] h-[520px] w-[520px] rounded-full bg-[#edf6fa] blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-[1280px] gap-8 px-4 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Liderança humana + agentes de IA</div>
            <h1 className="mt-4 max-w-4xl text-[38px] font-bold leading-[1.02] tracking-[-.052em] sm:text-6xl">Uma estrutura híbrida para construir, operar e evoluir tecnologia.</h1>
            <p className="mt-5 max-w-3xl text-[16px] leading-8 text-[#5b7387] sm:text-lg">
              A BravSystems combina liderança humana com uma estrutura de agentes de inteligência artificial especializados em engenharia, produto, qualidade, operações, pesquisa e experiência digital.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {[
              ["1", "Founder & CEO"],
              [String(aiAgents.length), "Agentes de IA"],
              ["6", "Produtos SaaS"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-[#d5e4ed] bg-[#f8fbfd] px-3 py-4 text-center sm:px-4 sm:py-5">
                <div className="text-2xl font-black tracking-[-.05em] text-[#0f4d78] sm:text-3xl">{value}</div>
                <div className="mt-1 text-[9px] font-extrabold uppercase tracking-[.08em] text-[#718799] sm:text-[10px]">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#082844] py-12 text-white sm:py-16" data-team-founder>
        <div className="mx-auto grid max-w-[1280px] gap-7 px-4 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-white/10 bg-[#123c5b] shadow-2xl shadow-black/20">
            <Portrait member={founder} priority />
          </div>
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#8bc8ed]">Liderança humana</div>
            <h2 className="mt-3 text-4xl font-bold tracking-[-.045em] sm:text-5xl">{founder.name}</h2>
            <div className="mt-3 text-lg font-bold text-white">{founder.role}</div>
            <p className="mt-2 text-sm font-semibold leading-7 text-[#9fc4da]">{founder.specialty}</p>
            <p className="mt-5 max-w-3xl text-[15px] leading-7 text-[#c3d7e4] sm:text-base sm:leading-8">{founder.description}</p>
            <div className="mt-6 inline-flex rounded-full border border-white/15 bg-white/[.06] px-4 py-2 text-xs font-bold text-[#d9ebf5]">Decisão final: liderança humana</div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f8fb] py-14 sm:py-20" id="agentes">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Estrutura especializada</div>
            <h2 className="mt-3 text-[34px] font-bold leading-[1.05] tracking-[-.045em] sm:text-5xl">Agentes de IA com papéis claros no ecossistema.</h2>
            <p className="mt-4 text-[15px] leading-7 text-[#60758a] sm:text-base sm:leading-8">Cada agente atua em uma frente definida. Os perfis abaixo representam funções de inteligência artificial da BravSystems — não cargos humanos nem históricos profissionais fictícios.</p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3" data-team-grid>
            {aiAgents.map((member, index) => <AgentCard key={member.slug} member={member} index={index} />)}
          </div>
        </div>
      </section>

      <section className="border-y border-[#d5e4ed] bg-white py-12 sm:py-16">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-5 px-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Trabalho coordenado</div>
            <h2 className="mt-2 text-3xl font-bold tracking-[-.04em] sm:text-4xl">Pessoas decidem. Agentes especializados aceleram execução e controle.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#60758a]">A estrutura combina direção executiva humana, governança tecnológica e frentes especializadas por produto e disciplina.</p>
          </div>
          <Link href="/#produtos" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#0f4d78] px-6 text-sm font-extrabold text-white">Conhecer o ecossistema →</Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
