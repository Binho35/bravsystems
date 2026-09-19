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
    <main className="min-h-screen overflow-x-hidden bg-[#f4f8fb] text-[#082844]">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-[#d5e4ed] bg-[#eef6fb] py-12 sm:py-20">
        <div className="pointer-events-none absolute -right-52 -top-60 h-[640px] w-[640px] rounded-full bg-[#dceef8] blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1180px] px-4 text-center sm:px-8">
          <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">BravSystems</div>
          <h1 className="mx-auto mt-4 max-w-4xl text-[40px] font-black leading-[1.02] tracking-[-.052em] sm:text-6xl">
            Robson e Harpia.
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-[16px] leading-8 text-[#5b7387] sm:text-lg">
            A BravSystems se apresenta publicamente por sua liderança humana e por seu mascote oficial. Os demais papéis técnicos permanecem internos à operação e ao desenvolvimento.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-[1180px] gap-5 px-4 sm:px-8 md:grid-cols-2" data-team-grid>
          {members.map((member) => (
            <article key={member.slug} data-team-member={member.slug} className="overflow-hidden rounded-[30px] border border-[#d4e3ec] bg-[#f9fcfe] shadow-sm">
              <div className="relative aspect-[5/4] overflow-hidden bg-[#082844]">
                <Image
                  src={member.portraitSrc}
                  alt={member.kind === "mascot" ? "Harpia, mascote oficial da BravSystems" : "Retrato institucional de Robson"}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={member.kind === "mascot" ? "object-contain p-8 sm:p-12" : "object-contain object-center"}
                  unoptimized
                  priority
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#2563eb]">
                  {member.kind === "human" ? "Founder & CEO" : "Mascote oficial"}
                </div>
                <h2 className="mt-2 text-4xl font-black tracking-[-.045em] text-[#082844]">{member.name}</h2>
                <div className="mt-3 text-sm font-extrabold text-[#315b7a]">{member.role}</div>
                <p className="mt-4 text-sm font-semibold leading-6 text-[#45647d]">{member.specialty}</p>
                <p className="mt-4 text-sm leading-7 text-[#60758a]">{member.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#d5e4ed] bg-[#eef6fb] py-12 sm:py-16">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-5 px-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Um só ecossistema</div>
            <h2 className="mt-2 text-3xl font-black tracking-[-.04em] sm:text-4xl">A mesma identidade em todos os produtos BravSystems.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#60758a]">BravOs, BravHas, BravHos, BravMsg, BravAcademy, BravVideo e BravSocial seguem a mesma representação institucional: Robson + Harpia.</p>
          </div>
          <Link href="/#solucoes" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-[#0f4d78] px-6 text-sm font-extrabold text-white">
            Conhecer o ecossistema →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
