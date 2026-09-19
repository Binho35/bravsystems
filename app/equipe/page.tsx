import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { founder, harpia } from "@/lib/team";

export const metadata: Metadata = {
  title: "Equipe",
  description: "Conheça Robson, Founder & CEO, e Harpia, mascote oficial da BravSystems.",
  alternates: { canonical: "/equipe" },
  openGraph: {
    type: "website",
    url: "https://www.bravsystems.com.br/equipe",
    title: "Robson e Harpia | BravSystems",
    description: "A identidade institucional da BravSystems: Robson e Harpia.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Robson e Harpia | BravSystems",
    description: "Conheça os dois representantes institucionais da BravSystems.",
    images: ["/opengraph-image"],
  },
};

const members = [founder, harpia] as const;

export default function TeamPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7fafc] text-[#082844]">
      <SiteHeader />

      <section className="border-b border-[#e2e8f0] bg-white py-12 sm:py-18">
        <div className="mx-auto max-w-[1100px] px-5 text-center sm:px-8">
          <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">BravSystems</div>
          <h1 className="mx-auto mt-4 max-w-4xl text-[40px] font-black leading-[1.02] tracking-[-.052em] sm:text-6xl">
            Robson e Harpia.
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-[16px] leading-8 text-[#5b7387] sm:text-lg">
            Liderança humana e uma identidade de marca forte, conectadas pelo mesmo objetivo: transformar problemas reais de gestão em soluções claras, úteis e escaláveis.
          </p>
        </div>
      </section>

      <section className="bg-[#f7fafc] py-12 sm:py-18">
        <div className="mx-auto grid max-w-[1100px] gap-5 px-5 sm:px-8 md:grid-cols-2" data-team-grid>
          {members.map((member) => (
            <article key={member.slug} data-team-member={member.slug} className="rounded-[26px] border border-[#dde7ee] bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-5">
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[24px] border border-[#e2e8f0] bg-white shadow-sm">
                  <Image
                    src={member.portraitSrc}
                    alt={member.kind === "mascot" ? "Harpia, mascote oficial da BravSystems" : "Retrato institucional de Robson"}
                    fill
                    sizes="112px"
                    className={member.kind === "mascot" ? "object-contain p-2" : "object-contain object-center"}
                    unoptimized
                    priority
                  />
                </div>
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#2563eb]">
                    {member.kind === "human" ? "Founder & CEO" : "Mascote oficial"}
                  </div>
                  <h2 className="mt-1 text-3xl font-black tracking-[-.045em] text-[#082844]">{member.name}</h2>
                  <div className="mt-2 text-sm font-extrabold text-[#315b7a]">{member.role}</div>
                </div>
              </div>

              <p className="mt-6 text-sm font-semibold leading-6 text-[#45647d]">{member.specialty}</p>
              <p className="mt-3 text-sm leading-7 text-[#60758a]">{member.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#dbe7ef] bg-white py-12 sm:py-16">
        <div className="mx-auto flex max-w-[1100px] flex-col gap-5 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Vamos falar de negócio</div>
            <h2 className="mt-2 text-3xl font-black tracking-[-.04em] sm:text-4xl">Tem um problema de gestão que precisa virar solução?</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#60758a]">
              Conte o cenário da sua empresa. A conversa começa pelo problema real e pela melhor forma de organizar, automatizar ou evoluir a operação.
            </p>
          </div>
          <Link href="/#contato" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#0b4683] px-6 text-sm font-extrabold text-white">
            Falar com a BravSystems →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
