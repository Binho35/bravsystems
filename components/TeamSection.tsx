import Image from "next/image";
import Link from "next/link";

import { founder, harpia } from "@/lib/team";

const members = [founder, harpia] as const;

export function TeamSection() {
  return (
    <section id="equipe" className="border-y border-[#d5e4ed] bg-[#edf6fb] py-14 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[.92fr_1.08fr] lg:items-end">
          <div className="max-w-2xl">
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">BravSystems</div>
            <h2 className="mt-3 text-[32px] font-bold leading-[1.06] tracking-[-.045em] sm:text-5xl">
              Robson e Harpia. A identidade por trás de todo o ecossistema.
            </h2>
          </div>
          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-[15px] leading-7 text-[#5e7588] sm:text-[16px] sm:leading-8">
              A comunicação institucional da BravSystems tem apenas dois representantes: Robson, Founder & CEO, e Harpia, mascote oficial da marca.
            </p>
            <Link href="/equipe" className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0f4d78] px-5 text-sm font-extrabold text-white shadow-lg shadow-[#0f4d78]/10 transition hover:bg-[#092846]">
              Conhecer Robson e Harpia →
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2" data-team-grid>
          {members.map((member) => (
            <article key={member.slug} data-team-member={member.slug} className="grid overflow-hidden rounded-[28px] border border-[#cbdde8] bg-white shadow-sm sm:grid-cols-[180px_1fr]">
              <div className="relative min-h-[210px] bg-[#082844]">
                <Image
                  src={member.portraitSrc}
                  alt={member.kind === "mascot" ? "Harpia, mascote oficial da BravSystems" : "Retrato institucional de Robson"}
                  fill
                  sizes="(max-width: 640px) 100vw, 180px"
                  className={member.kind === "mascot" ? "object-contain p-5" : "object-contain object-center"}
                  unoptimized
                />
              </div>
              <div className="flex flex-col justify-center p-6">
                <div className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#2563eb]">
                  {member.kind === "human" ? "Liderança" : "Mascote oficial"}
                </div>
                <h3 className="mt-2 text-3xl font-black tracking-[-.04em] text-[#082844]">{member.name}</h3>
                <div className="mt-2 text-sm font-extrabold text-[#315b7a]">{member.role}</div>
                <p className="mt-4 text-sm leading-7 text-[#60758a]">{member.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
