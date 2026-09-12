import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

export function SiteFooter() {
  return (
    <footer className="bg-[#061a2d] text-[#b8cad7]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.2fr_.9fr_.9fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/bravsystems-logo.png" alt="BravSystems" width={56} height={56} className="h-12 w-12 rounded-xl bg-white object-contain" />
            <strong className="text-lg text-white">BravSystems</strong>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-7">Empresa brasileira de tecnologia com produtos SaaS próprios para operação, administração, pessoas, comunicação, aprendizagem e conteúdo corporativo.</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[.12em] text-[#6fa9cc]">Tecnologia com contexto e governança</p>
        </div>

        <div>
          <div className="text-xs font-extrabold uppercase tracking-[.16em] text-[#75afd3]">Produtos</div>
          <div className="mt-4 grid gap-3 text-sm">
            {products.map((product) => <Link key={product.slug} href={`/${product.slug}`} className="transition hover:text-white">{product.name}</Link>)}
          </div>
        </div>

        <div>
          <div className="text-xs font-extrabold uppercase tracking-[.16em] text-[#75afd3]">Clientes</div>
          <div className="mt-4 grid gap-3 text-sm">
            <Link href="/acessar" className="font-bold text-white">Entrar / Meus Sistemas</Link>
            <a href="mailto:contato@bravsystems.com.br" className="transition hover:text-white">Suporte e atendimento</a>
            <Link href="/#contato" className="transition hover:text-white">Falar com a BravSystems</Link>
          </div>
        </div>

        <div>
          <div className="text-xs font-extrabold uppercase tracking-[.16em] text-[#75afd3]">Institucional e legal</div>
          <div className="mt-4 grid gap-3 text-sm">
            <Link href="/#por-que-bravsystems" className="transition hover:text-white">Sobre a BravSystems</Link>
            <Link href="/politica-de-privacidade" className="transition hover:text-white">Política de Privacidade</Link>
            <span className="text-[#7895aa]">Termos de Uso — pendente de publicação</span>
            <span className="text-[#7895aa]">Cookies — avaliar conforme necessidade</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-5 py-5 text-xs text-[#7895aa] sm:flex-row sm:justify-between sm:px-8">
          <span>© 2026 BravSystems. Todos os direitos reservados.</span>
          <span>Desenvolvimento, homologação e produção são estágios distintos.</span>
        </div>
      </div>
    </footer>
  );
}
