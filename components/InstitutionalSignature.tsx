import Image from "next/image";

import { founder, harpia } from "@/lib/team";

export function InstitutionalSignature({ productName }: { productName?: string }) {
  return (
    <section className="border-y border-[#d7e4ec] bg-[#f6fafc] py-12" data-institutional-signature>
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid gap-5 md:grid-cols-[1fr_1fr]">
          <article className="flex items-center gap-4 rounded-2xl border border-[#d7e4ec] bg-white p-5">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#082844]">
              <Image src={founder.portraitSrc} alt="Retrato institucional de Robson" fill sizes="80px" className="object-contain" unoptimized />
            </div>
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#2563eb]">Founder & CEO</div>
              <h2 className="mt-1 text-2xl font-black tracking-[-.04em] text-[#082844]">{founder.name}</h2>
              <p className="mt-1 text-xs leading-5 text-[#60758a]">Direção estratégica da BravSystems{productName ? ` e do ${productName}` : ""}.</p>
            </div>
          </article>

          <article className="flex items-center gap-4 rounded-2xl border border-[#d7e4ec] bg-white p-5">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#082844]">
              <Image src={harpia.portraitSrc} alt="Harpia, mascote oficial da BravSystems" fill sizes="80px" className="object-contain p-2" unoptimized />
            </div>
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#2563eb]">Mascote oficial</div>
              <h2 className="mt-1 text-2xl font-black tracking-[-.04em] text-[#082844]">{harpia.name}</h2>
              <p className="mt-1 text-xs leading-5 text-[#60758a]">Inteligência, tecnologia e identidade da marca BravSystems.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
