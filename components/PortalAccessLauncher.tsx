import Link from "next/link";

export function PortalAccessLauncher() {
  return (
    <Link
      href="/meus-sistemas"
      aria-label="Entrar no portal Meus Sistemas da BravSystems"
      className="fixed bottom-5 right-5 z-50 inline-flex min-h-12 items-center justify-center rounded-full border border-white/20 bg-[#0f4d78] px-5 text-sm font-extrabold text-white shadow-2xl shadow-[#0b2947]/25 transition hover:bg-[#092846] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563eb] sm:bottom-7 sm:right-7"
    >
      Entrar
    </Link>
  );
}
