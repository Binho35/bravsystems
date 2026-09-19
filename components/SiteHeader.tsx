import Image from "next/image";
import Link from "next/link";

const navigation = [
  ["Empresa", "/#empresa"],
  ["Soluções", "/#solucoes"],
  ["Gestão", "/#gestao"],
  ["Nossa visão", "/#visao"],
  ["Contato", "/#contato"],
] as const;

export function SiteHeader() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#d7e6f0]/70 bg-[#eef6fb]/95 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[78px] max-w-[1440px] items-center px-4 sm:min-h-[92px] sm:px-8 lg:px-10">
          <Link href="/#inicio" className="flex shrink-0 items-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/40" aria-label="BravSystems — início">
            <Image
              src="/bravsystems-logo.png"
              alt="BravSystems — Technology & Management"
              width={92}
              height={92}
              priority
              className="h-[66px] w-[66px] object-contain mix-blend-multiply sm:h-[80px] sm:w-[80px]"
            />
          </Link>

          <nav className="ml-auto hidden items-center gap-8 text-[15px] font-semibold text-[#163b62] lg:flex xl:gap-11" aria-label="Navegação principal">
            {navigation.map(([label, href]) => (
              <Link key={href} href={href} className="rounded-md px-1 py-2 transition hover:text-[#2563eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/30">
                {label}
              </Link>
            ))}
          </nav>

          <Link href="/#contato" className="ml-auto hidden min-h-12 items-center justify-center rounded-full bg-[#0b4683] px-7 text-sm font-extrabold text-white shadow-lg shadow-[#0b4683]/15 transition hover:-translate-y-0.5 hover:bg-[#082f5d] lg:ml-12 lg:inline-flex">
            Fale conosco
          </Link>

          <details className="relative ml-auto lg:hidden">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-xl border border-[#bed5e5] bg-white/65 text-xl font-bold text-[#154b7a] shadow-sm [&::-webkit-details-marker]:hidden" aria-label="Abrir menu de navegação">
              ☰
            </summary>
            <nav className="fixed left-4 right-4 top-[82px] z-[60] max-h-[calc(100dvh-98px)] overflow-y-auto rounded-2xl border border-[#cfdfeb] bg-[#f7fbfe] p-2 shadow-2xl sm:absolute sm:left-auto sm:right-0 sm:top-14 sm:w-72" aria-label="Navegação responsiva">
              {navigation.map(([label, href]) => (
                <Link key={href} href={href} className="block rounded-xl px-4 py-3 text-sm font-semibold text-[#234d70] hover:bg-[#e8f2f8]">
                  {label}
                </Link>
              ))}
              <Link href="/#contato" className="mt-2 block rounded-xl bg-[#0b4683] px-4 py-3 text-center text-sm font-extrabold text-white">
                Fale conosco
              </Link>
              <Link href="/acessar" className="mt-2 block rounded-xl border border-[#c9dce8] px-4 py-3 text-center text-sm font-bold text-[#154b7a]">
                Meus Sistemas
              </Link>
            </nav>
          </details>
        </div>
      </header>
      <div className="h-[78px] bg-[#eef6fb] sm:h-[92px]" aria-hidden="true" />
    </>
  );
}
