import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";

export function SiteFooter() {
  return (
    <footer className="bg-[#071f35] text-[#b5c9d8]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/bravsystems-logo.png" alt="BravSystems" width={56} height={56} className="h-12 w-12 rounded-xl bg-white object-contain" />
            <strong className="text-lg text-white">BravSystems</strong>
          </div>
          <p className="mt-4 text-sm leading-6">Empresa brasileira de tecnologia com produtos SaaS próprios para operação, gestão, pessoas, comunicação, aprendizagem e conteúdo corporativo.</p>
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
            <Link href="/acessar" className="font-bold text-white">Central de acesso</Link>
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
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-6 py-5 text-xs text-[#7895aa] sm:flex-row sm:justify-between lg:px-8">
          <span>© 2026 BravSystems. Todos os direitos reservados.</span>
          <span>Disponibilidade comercial e acesso variam conforme homologação de cada produto.</span>
        </div>
      </div>
    </footer>
  );
}
