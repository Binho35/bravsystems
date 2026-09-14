import Link from "next/link";
import { aiAgents, founder } from "@/lib/team";

export function TeamSection() {
  return (
    <section id="equipe" className="border-y border-[#d5e4ed] bg-[#edf6fb] py-14 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[.92fr_1.08fr] lg:items-end">
          <div className="max-w-2xl">
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Equipe BravSystems</div>
            <h2 className="mt-3 text-[32px] font-bold leading-[1.06] tracking-[-.045em] sm:text-5xl">Liderança humana. Execução especializada por agentes de IA.</h2>
          </div>
          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-[15px] leading-7 text-[#5e7588] sm:text-[16px] sm:leading-8">
              A BravSystems combina liderança humana com uma estrutura de agentes de inteligência artificial especializados em engenharia, produto, qualidade, operações, pesquisa e experiência digital.
            </p>
            <Link href="/equipe" className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0f4d78] px-5 text-sm font-extrabold text-white shadow-lg shadow-[#0f4d78]/10 transition hover:bg-[#092846]">Conhecer a Equipe BravSystems →</Link>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[28px] border border-[#224f6e] bg-[#082844] shadow-2xl shadow-[#0b2947]/12">
          <div className="grid lg:grid-cols-[.72fr_1.28fr]">
            <article className="relative overflow-hidden border-b border-white/10 p-6 text-white sm:p-8 lg:border-b-0 lg:border-r">
              <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#2b78a7]/30 blur-3xl" aria-hidden="true" />
              <div className="relative flex h-full flex-col">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/[.08] text-xl font-black tracking-[-.04em] text-[#9dd0ef]" aria-hidden="true">{founder.initials}</div>
                  <div>
                    <div className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#7fc0e7]">Liderança humana</div>
                    <h3 className="mt-1 text-2xl font-bold tracking-[-.035em]">{founder.name}</h3>
                    <div className="mt-1 text-sm font-bold text-[#c9deea]">{founder.role}</div>
                  </div>
                </div>
                <p className="mt-6 text-sm leading-7 text-[#c0d6e4]">{founder.description}</p>
                <div className="mt-6 border-t border-white/10 pt-4 text-xs font-bold uppercase tracking-[.12em] text-[#8fc2e2] lg:mt-auto">Estratégia • Portfólio • Decisão final</div>
              </div>
            </article>

            <div className="bg-white p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#6d8799]">Agentes de IA BravSystems</div>
                  <h3 className="mt-1 text-2xl font-bold tracking-[-.035em] text-[#0b2947]">12 frentes especializadas, papéis explícitos.</h3>
                </div>
                <span className="rounded-full border border-[#b9d7e8] bg-[#edf7fc] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.08em] text-[#15517f]">Transparência de IA</span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2" aria-label="Agentes de IA BravSystems">
                {aiAgents.map((agent) => (
                  <span key={agent.slug} className="rounded-xl border border-[#d8e5ed] bg-[#f8fbfd] px-3 py-2 text-xs font-extrabold text-[#315b7a]">{agent.name}</span>
                ))}
              </div>

              <p className="mt-5 text-sm leading-6 text-[#60758a]">Os perfis representam funções de inteligência artificial especializadas. Não são apresentados como funcionários humanos.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
