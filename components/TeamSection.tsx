import Image from "next/image";
import Link from "next/link";

import { founder, harpia } from "@/lib/team";

const members = [founder, harpia] as const;

export function TeamSection() {
  return (
    <section id="equipe" className="border-y border-[#e2e8f0] bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid gap-7 lg:grid-cols-[1fr_.9fr] lg:items-end">
          <div className="max-w-3xl">
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Quem está por trás</div>
            <h2 className="mt-3 text-[34px] font-black leading-[1.04] tracking-[-.045em] text-[#0b2947] sm:text-5xl">
              Estratégia humana. Identidade forte. Soluções construídas para problemas reais.
            </h2>
          </div>
          <div className="max-w-xl lg:justify-self-end">
            <p className="text-[15px] leading-7 text-[#60758a] sm:text-[16px] sm:leading-8">
              Robson conduz a BravSystems e a Harpia representa a inteligência da marca. O foco é simples: entender a operação, identificar o gargalo e construir uma solução que faça sentido para o negócio.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="#contato" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0b4683] px-5 text-sm font-extrabold text-white transition hover:bg-[#082f5d]">
                Falar sobre minha empresa →
              </a>
              <Link href="/equipe" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#d3e0e8] bg-[#f8fafc] px-5 text-sm font-bold text-[#315b7a]">
                Conhecer Robson e Harpia
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2" data-team-grid>
          {members.map((member) => (
            <article
              key={member.slug}
              data-team-member={member.slug}
              className="grid items-center gap-5 rounded-[24px] border border-[#dde7ee] bg-[#fbfdfe] p-5 shadow-sm sm:grid-cols-[112px_1fr] sm:p-6"
            >
              <div className="relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-[22px] border border-[#e2e8f0] bg-white shadow-sm sm:mx-0">
                <Image
                  src={member.portraitSrc}
                  alt={member.kind === "mascot" ? "Harpia, mascote oficial da BravSystems" : "Retrato institucional de Robson"}
                  fill
                  sizes="112px"
                  className={member.kind === "mascot" ? "object-contain p-2" : "object-contain object-center"}
                  unoptimized
                />
              </div>
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#2563eb]">
                  {member.kind === "human" ? "Founder & CEO" : "Mascote oficial"}
                </div>
                <h3 className="mt-1 text-3xl font-black tracking-[-.04em] text-[#082844]">{member.name}</h3>
                <div className="mt-1 text-sm font-extrabold text-[#315b7a]">{member.role}</div>
                <p className="mt-3 text-sm leading-6 text-[#60758a]">
                  {member.kind === "human"
                    ? "Visão de negócio, direção dos produtos e decisão final sobre a evolução da BravSystems."
                    : "Símbolo de inteligência, precisão e evolução em todo o ecossistema BravSystems."}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
