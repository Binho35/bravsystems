import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f4f8fb] text-[#082844]">
      <SiteHeader />
      <section className="relative overflow-hidden border-b border-[#d5e4ed] bg-white py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-40 -top-44 h-[480px] w-[480px] rounded-full bg-[#dceef8] blur-3xl" />
          <div className="absolute -bottom-56 left-[8%] h-[420px] w-[420px] rounded-full bg-[#edf6fa] blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-[900px] px-5 text-center sm:px-8">
          <div className="text-sm font-black uppercase tracking-[.22em] text-[#2563eb]">404</div>
          <h1 className="mt-4 text-[42px] font-bold leading-[1.03] tracking-[-.05em] sm:text-6xl">Esta página não faz parte do caminho atual.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-8 text-[#60758a] sm:text-lg">O endereço pode ter mudado ou não existir. Use os atalhos abaixo para voltar ao ecossistema BravSystems.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#0f4d78] px-6 text-sm font-extrabold text-white">Voltar para o início</Link>
            <Link href="/acessar" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#c7d9e4] bg-white px-6 text-sm font-extrabold text-[#0f4d78]">Ir para Meus Sistemas</Link>
            <Link href="/#contato" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#c7d9e4] bg-white px-6 text-sm font-extrabold text-[#0f4d78]">Falar com a BravSystems</Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
