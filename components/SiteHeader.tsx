import Image from "next/image";
import Link from "next/link";

const navigation = [
  ["Ecossistema", "/#produtos"],
  ["Destaques", "/#destaques"],
  ["Por que BravSystems", "/#por-que-bravsystems"],
  ["Equipe", "/equipe"],
  ["Central", "/acessar"],
  ["Contato", "/#contato"],
] as const;

export function SiteHeader() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#dbe7ef] bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex min-h-[68px] max-w-[1400px] items-center px-4 sm:min-h-[76px] sm:px-6 lg:px-10">
          <Link href="/#inicio" className="flex items-center gap-2.5 rounded-lg sm:gap-3" aria-label="BravSystems — início">
            <Image src="/bravsystems-logo.png" alt="BravSystems" width={64} height={64} priority className="h-[54px] w-[54px] object-contain sm:h-[60px] sm:w-[60px]" />
            <div className="block">
              <div className="text-[15px] font-black tracking-[-.025em] text-[#092846] sm:text-base">BravSystems</div>
              <div className="mt-0.5 hidden text-[9px] font-extrabold uppercase tracking-[.16em] text-[#6e8597] sm:block">Ecossistema SaaS B2B</div>
            </div>
          </Link>

          <nav className="ml-auto hidden items-center gap-4 text-sm font-semibold text-[#4e6679] xl:flex 2xl:gap-5" aria-label="Navegação principal">
            {navigation.map(([label, href]) => (
              <Link key={href} href={href} className="rounded-md transition hover:text-[#0f4d78]">
                {label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-2 sm:flex xl:ml-5 2xl:ml-6">
            <Link href="/#contato" className="rounded-full border border-[#c3d7e4] bg-white px-4 py-2.5 text-sm font-bold text-[#315b7a] transition hover:border-[#0f4d78] hover:text-[#092846]">
              Falar com especialista
            </Link>
            <Link href="/acessar" className="rounded-full bg-[#0f4d78] px-4 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-[#0f4d78]/15 transition hover:bg-[#092846]">
              Meus Sistemas
            </Link>
          </div>

          <details className="relative ml-auto sm:hidden">
            <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-xl border border-[#d6e2eb] bg-white text-lg font-bold text-[#154b7a] [&::-webkit-details-marker]:hidden" aria-label="Abrir menu">
              ☰
            </summary>
            <nav className="absolute right-0 top-12 w-[min(19rem,calc(100vw-2rem))] rounded-2xl border border-[#dce6ed] bg-white p-2 shadow-2xl" aria-label="Navegação mobile">
              {navigation.map(([label, href]) => (
                <Link key={href} href={href} className="block rounded-xl px-4 py-3 text-sm font-semibold text-[#334155] hover:bg-[#eef5fa]">
                  {label}
                </Link>
              ))}
              <Link href="/#contato" className="mt-2 block rounded-xl border border-[#d4e2eb] px-4 py-3 text-center text-sm font-bold text-[#315b7a]">
                Falar com especialista
              </Link>
              <Link href="/acessar" className="mt-2 block rounded-xl bg-[#0f4d78] px-4 py-3 text-center text-sm font-extrabold text-white">
                Entrar / Meus Sistemas
              </Link>
            </nav>
          </details>
        </div>
      </header>
      <div className="h-[68px] sm:h-[76px]" aria-hidden="true" />
    </>
  );
}
