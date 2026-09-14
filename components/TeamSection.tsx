const operatingAreas = [
  {
    number: "01",
    title: "Produto e tecnologia",
    text: "Arquitetura, experiência e evolução de produtos próprios orientadas por problemas concretos de operação.",
  },
  {
    number: "02",
    title: "Operações e qualidade",
    text: "Homologação, segurança e prontidão para produção tratadas como gates diferentes do desenvolvimento.",
  },
  {
    number: "03",
    title: "Comercial e relacionamento",
    text: "Conversas conduzidas a partir da necessidade real, sem prometer recursos ou acessos ainda não homologados.",
  },
] as const;

export function TeamSection() {
  return (
    <section id="equipe" className="border-y border-[#d5e4ed] bg-[#edf6fb] py-14 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[.88fr_1.12fr] lg:items-end">
          <div className="max-w-2xl">
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Equipe BravSystems</div>
            <h2 className="mt-3 text-[32px] font-bold leading-[1.06] tracking-[-.045em] sm:text-5xl">
              Liderança clara. Execução multidisciplinar.
            </h2>
          </div>
          <p className="max-w-2xl text-[15px] leading-7 text-[#5e7588] sm:text-[16px] sm:leading-8 lg:justify-self-end">
            A BravSystems reúne visão de produto, tecnologia, operação e negócio para desenvolver software com contexto, governança e responsabilidade sobre cada etapa de maturidade.
          </p>
        </div>

        <div className="mt-8 grid overflow-hidden rounded-[28px] border border-[#224f6e] bg-[#082844] shadow-2xl shadow-[#0b2947]/12 lg:grid-cols-[.9fr_1.1fr]">
          <article className="relative overflow-hidden border-b border-white/10 p-6 text-white sm:p-9 lg:border-b-0 lg:border-r">
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#2b78a7]/30 blur-3xl" aria-hidden="true" />
            <div className="relative flex h-full flex-col">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/[.08] text-xl font-black tracking-[-.04em] text-[#9dd0ef]" aria-hidden="true">
                  RF
                </div>
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#7fc0e7]">Founder &amp; CEO</div>
                  <h3 className="mt-1 text-2xl font-bold tracking-[-.035em]">Robson Fernandes</h3>
                </div>
              </div>

              <p className="mt-7 text-[15px] leading-7 text-[#c0d6e4] sm:text-[16px] sm:leading-8">
                Responsável pela visão dos produtos, pelas prioridades do portfólio e pela decisão final sobre evolução, homologação e posicionamento comercial da BravSystems.
              </p>

              <div className="mt-8 border-t border-white/10 pt-5 text-xs font-bold uppercase tracking-[.13em] text-[#8fc2e2] lg:mt-auto">
                Estratégia • Produto • Negócio
              </div>
            </div>
          </article>

          <div className="bg-white p-5 sm:p-7">
            <div className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#6d8799]">Modelo de atuação</div>
            <div className="mt-4 grid gap-3">
              {operatingAreas.map((area) => (
                <article key={area.number} className="grid grid-cols-[42px_1fr] gap-3 rounded-2xl border border-[#d8e5ed] bg-[#f8fbfd] p-4 sm:grid-cols-[48px_1fr] sm:p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e2f0f8] text-[11px] font-black text-[#15517f] sm:h-12 sm:w-12">
                    {area.number}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#0b2947]">{area.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-[#60758a]">{area.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
