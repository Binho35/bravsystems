import Image from "next/image";

import { founder, harpia } from "@/lib/team";

export function InstitutionalSignature({ productName }: { productName?: string }) {
  return (
    <section className="border-y border-[#e2e8f0] bg-white py-10" data-institutional-signature>
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid gap-4 md:grid-cols-2">
          <article className="flex items-center gap-4 rounded-2xl border border-[#e2e8f0] bg-[#fbfdfe] p-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
              <Image src={founder.portraitSrc} alt="Retrato institucional de Robson" fill sizes="64px" className="object-contain" unoptimized />
            </div>
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#2563eb]">Founder & CEO</div>
              <h2 className="mt-1 text-xl font-black tracking-[-.04em] text-[#082844]">{founder.name}</h2>
              <p className="mt-1 text-xs leading-5 text-[#60758a]">
                Direção estratégica da BravSystems{productName ? ` e do ${productName}` : ""}.
              </p>
            </div>
          </article>

          <article className="flex items-center gap-4 rounded-2xl border border-[#e2e8f0] bg-[#fbfdfe] p-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
              <Image src={harpia.portraitSrc} alt="Harpia, mascote oficial da BravSystems" fill sizes="64px" className="object-contain p-1.5" unoptimized />
            </div>
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#2563eb]">Mascote oficial</div>
              <h2 className="mt-1 text-xl font-black tracking-[-.04em] text-[#082844]">{harpia.name}</h2>
              <p className="mt-1 text-xs leading-5 text-[#60758a]">Inteligência, precisão e evolução como identidade da marca.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
