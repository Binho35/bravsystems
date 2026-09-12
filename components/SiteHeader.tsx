import Image from "next/image";
import Link from "next/link";

const navigation = [
  ["Início", "/#inicio"],
  ["Produtos", "/#produtos"],
  ["Soluções", "/#solucoes"],
  ["Por que BravSystems", "/#por-que-bravsystems"],
  ["Contato", "/#contato"],
] as const;

export function SiteHeader() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#dbe7ef] bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex min-h-[76px] max-w-[1400px] items-center px-5 lg:px-10">
          <Link href="/#inicio" className="flex items-center gap-3" aria-label="BravSystems — início">
            <Image src="/bravsystems-logo.png" alt="BravSystems" width={64} height={64} priority className="h-[58px] w-[58px] object-contain" />
            <span className="hidden text-sm font-extrabold tracking-[-.02em] text-[#092846] sm:block">BravSystems</span>
          </Link>

          <nav className="ml-auto hidden items-center gap-6 text-sm font-semibold text-[#4e6679] xl:flex" aria-label="Navegação principal">
            {navigation.map(([label, href]) => (
              <Link key={href} href={href} className="transition hover:text-[#0f4d78] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb]">
                {label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-2 sm:flex xl:ml-6">
            <Link href="/#contato" className="rounded-full border border-[#c3d7e4] bg-white px-5 py-3 text-sm font-bold text-[#315b7a] transition hover:border-[#0f4d78] hover:text-[#092846]">
              Falar com a BravSystems
            </Link>
            <Link href="/acessar" className="rounded-full bg-[#0f4d78] px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-[#0f4d78]/15 transition hover:bg-[#092846]">
              Acessar
            </Link>
          </div>

          <details className="relative ml-auto sm:hidden">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-xl border border-[#d6e2eb] bg-white text-xl font-bold text-[#154b7a] [&::-webkit-details-marker]:hidden" aria-label="Abrir menu">
              ☰
            </summary>
            <nav className="absolute right-0 top-14 w-72 rounded-2xl border border-[#dce6ed] bg-white p-2 shadow-2xl" aria-label="Navegação mobile">
              {navigation.map(([label, href]) => (
                <Link key={href} href={href} className="block rounded-xl px-4 py-3 text-sm font-semibold text-[#334155] hover:bg-[#eef5fa]">
                  {label}
                </Link>
              ))}
              <Link href="/acessar" className="mt-2 block rounded-xl bg-[#0f4d78] px-4 py-3 text-center text-sm font-extrabold text-white">
                Acessar meu sistema
              </Link>
            </nav>
          </details>
        </div>
      </header>
      <div className="h-[76px]" aria-hidden="true" />
    </>
  );
}
