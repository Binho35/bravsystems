import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { products } from "@/lib/products";

const valuePillars = [
  ["Operação", "Centralize o fluxo do restaurante e reduza controles paralelos."],
  ["Vendas", "Conecte o PDV à rotina operacional e acompanhe o que acontece no salão."],
  ["Caixa", "Trate pagamentos e fechamento dentro da jornada da operação."],
  ["Estoque", "Aproxime consumo, fichas técnicas e movimentações do dia a dia."],
  ["Produção", "Leve o pedido até a cozinha com mais contexto e rastreabilidade."],
  ["Gestão", "Transforme acontecimentos da operação em informação para decidir melhor."],
] as const;

const operationFlow = [
  ["01", "Pedido", "A venda começa no atendimento e segue com contexto para a operação."],
  ["02", "Cozinha", "A produção recebe o que precisa ser preparado e acompanha o andamento."],
  ["03", "Caixa", "Pagamento e fechamento fazem parte do mesmo fluxo operacional."],
  ["04", "Estoque", "Consumo e movimentações deixam de viver isolados da venda."],
  ["05", "Gestão", "A operação vira informação para controle, acompanhamento e decisão."],
] as const;

const ecosystemSlugs = new Set(["bravos", "bravacademy", "bravmsg"]);
const ecosystemProducts = products.filter((product) => ecosystemSlugs.has(product.slug));
const secondaryProducts = products.filter((product) => !ecosystemSlugs.has(product.slug));

export default function Home() {
  const platformUrl = process.env.NEXT_PUBLIC_BRAVOS_APP_URL?.trim();
  const platformHref = platformUrl || "#demonstracao";

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f9fc] text-[#092846]">
      <Header platformHref={platformHref} />

      <section id="inicio" className="relative overflow-hidden border-b border-[#d9e7f0] bg-[#f4f9fc]">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-32 -top-44 h-[620px] w-[620px] rounded-full bg-[#d9edf9] blur-3xl" />
          <div className="absolute -bottom-56 left-[18%] h-[440px] w-[440px] rounded-full bg-[#e4f1f8] blur-3xl" />
        </div>

        <div className="relative mx-auto grid min-h-[760px] max-w-[1400px] items-center gap-14 px-6 py-16 lg:grid-cols-[.94fr_1.06fr] lg:px-10 lg:py-20">
          <div className="max-w-[720px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#bcd6e7] bg-white/90 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[.16em] text-[#15517f] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#2563eb]" aria-hidden="true" />
              BravSystems • Tecnologia para operação e crescimento
            </div>

            <h1 className="mt-7 text-[46px] font-bold leading-[1.02] tracking-[-.055em] sm:text-6xl lg:text-[72px]">
              A operação acontece em tempo real. Sua gestão também deveria.
            </h1>
            <p className="mt-7 max-w-[680px] text-[18px] leading-8 text-[#587086] sm:text-[20px]">
              O BravOS conecta vendas, cozinha, caixa, estoque e gestão em uma experiência pensada para a rotina de restaurantes — com mais contexto, rastreabilidade e menos controles paralelos.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#bravos" className="inline-flex min-h-13 items-center justify-center rounded-xl bg-[#0f4d78] px-7 text-[15px] font-extrabold text-white shadow-xl shadow-[#0f4d78]/20 transition hover:bg-[#092846]">
                Conhecer o BravOS →
              </a>
              <a href="#demonstracao" className="inline-flex min-h-13 items-center justify-center rounded-xl border border-[#b8cfdf] bg-white px-7 text-[15px] font-bold text-[#0f4d78] transition hover:border-[#0f4d78]">
                Agendar demonstração
              </a>
              <a href={platformHref} className="inline-flex min-h-13 items-center justify-center rounded-xl px-5 text-[15px] font-bold text-[#315b7a] underline decoration-[#a6c3d7] underline-offset-4 transition hover:text-[#092846]">
                Entrar na plataforma
              </a>
            </div>

            <div className="mt-9 grid gap-3 border-t border-[#cfdfe9] pt-6 text-sm font-semibold text-[#5f7689] sm:grid-cols-3">
              <span>Operação conectada</span>
              <span>Visão centralizada</span>
              <span>Evolução orientada por uso real</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-[36px] bg-gradient-to-br from-[#cce6f5] via-white to-[#b8d7ea] opacity-80 blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[28px] border border-[#b9d1e1] bg-[#08253e] shadow-2xl shadow-[#0b2947]/25">
              <div className="flex h-11 items-center gap-2 border-b border-white/10 bg-[#0b2947] px-4 text-[11px] font-semibold text-[#a9c4d7]">
                <span className="h-2.5 w-2.5 rounded-full bg-white/30" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" aria-hidden="true" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" aria-hidden="true" />
                <span className="ml-3">BravOS • visão do produto</span>
              </div>
              <video className="aspect-video w-full bg-[#061d31] object-cover" controls preload="metadata" playsInline poster="/bravsystems-logo.png" aria-label="Demonstração visual real do BravOS">
                <source src="/bravsystems-video-institucional.mp4" type="video/mp4" />
              </video>
              <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-5">
                {["Pedido", "Cozinha", "Caixa", "Estoque", "Gestão"].map((item) => (
                  <div key={item} className="bg-[#0b2947] px-3 py-4 text-center text-xs font-bold uppercase tracking-[.1em] text-[#d6e7f2]">{item}</div>
                ))}
              </div>
            </div>
            <div className="relative mx-4 -mt-1 flex flex-col gap-2 rounded-b-2xl border-x border-b border-[#c9dce8] bg-white px-5 py-4 text-sm text-[#587086] shadow-lg sm:mx-8 sm:flex-row sm:items-center sm:justify-between">
              <span><strong className="text-[#092846]">Prova visual real:</strong> mídia já existente do BravOS.</span>
              <span className="font-semibold text-[#0f4d78]">Produto em evolução</span>
            </div>
          </div>
        </div>
      </section>

      <section id="bravos" className="bg-white py-20 sm:py-24">
        <SectionTitle eyebrow="BravOS" title="Um sistema pensado para o fluxo do restaurante — não para multiplicar telas e controles." text="O objetivo é aproximar áreas que normalmente ficam separadas. Cada capacidade abaixo representa uma frente real do produto, comunicada sem tratar evolução técnica como homologação final." />
        <div className="mx-auto mt-12 grid max-w-[1280px] gap-4 px-6 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {valuePillars.map(([title, text]) => (
            <article key={title} className="group rounded-3xl border border-[#d8e5ed] bg-[#f8fbfd] p-7 transition hover:-translate-y-1 hover:border-[#b9d5e6] hover:bg-white hover:shadow-xl hover:shadow-[#0b2947]/8">
              <div className="text-xs font-extrabold uppercase tracking-[.16em] text-[#2563eb]">{title}</div>
              <p className="mt-4 text-[16px] leading-7 text-[#5e7487]">{text}</p>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-10 flex max-w-[1280px] flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="max-w-3xl text-sm leading-6 text-[#64798b]">A experiência offline integral ainda não está homologada para todos os cenários, e integrações específicas continuam seguindo seus próprios gates de evolução.</p>
          <Link href="/bravos" className="inline-flex shrink-0 items-center font-extrabold text-[#0f4d78]">Ver página do BravOS →</Link>
        </div>
      </section>

      <section id="operacao" className="relative overflow-hidden bg-[#082844] py-20 text-white sm:py-24">
        <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#175d8c]/35 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1280px] px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#86bce0]">Operação real</div>
              <h2 className="mt-4 text-4xl font-bold tracking-[-.04em] sm:text-5xl">Do pedido à decisão, o contexto não deveria se perder no caminho.</h2>
            </div>
            <p className="max-w-2xl text-[17px] leading-8 text-[#bfd3e1] lg:justify-self-end">O BravOS organiza a jornada operacional em etapas conectadas. A proposta não é prometer automação mágica: é reduzir rupturas de informação entre o que foi vendido, produzido, recebido, consumido e acompanhado.</p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-5">
            {operationFlow.map(([number, title, text]) => (
              <article key={title} className="relative rounded-3xl border border-white/10 bg-white/[.055] p-6">
                <div className="text-xs font-extrabold tracking-[.18em] text-[#71b5df]">{number}</div>
                <h3 className="mt-4 text-2xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#b8cddd]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="ecossistema" className="bg-[#eef6fb] py-20 sm:py-24">
        <SectionTitle eyebrow="Ecossistema Brav" title="Comece pela operação. Evolua para comunicação e desenvolvimento quando fizer sentido." text="O BravOS é a solução principal desta fase comercial. BravAcademy e BravMsg ampliam a visão do ecossistema sem transformar integrações futuras ou dependências externas em promessa de produto pronto." />

        <div className="mx-auto mt-12 grid max-w-[1280px] gap-6 px-6 lg:grid-cols-[1.2fr_.8fr_.8fr] lg:px-8">
          {ecosystemProducts.map((product) => (
            <article key={product.slug} className={`flex min-h-[340px] flex-col rounded-[30px] border p-7 sm:p-8 ${product.slug === "bravos" ? "border-[#0f4d78] bg-[#0b2947] text-white shadow-2xl shadow-[#0b2947]/15" : "border-[#d1e0ea] bg-white"}`}>
              <div className={`text-xs font-extrabold uppercase tracking-[.16em] ${product.slug === "bravos" ? "text-[#86c2e7]" : "text-[#2563eb]"}`}>{product.category}</div>
              <h3 className="mt-3 text-3xl font-bold">{product.name}</h3>
              <p className={`mt-5 text-[15px] leading-7 ${product.slug === "bravos" ? "text-[#c2d5e3]" : "text-[#60758a]"}`}>{product.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {product.benefits.slice(0, 3).map((benefit) => <span key={benefit} className={`rounded-full px-3 py-1 text-xs font-semibold ${product.slug === "bravos" ? "bg-white/10 text-[#dcebf5]" : "bg-[#eef6fb] text-[#4d667b]"}`}>{benefit}</span>)}
              </div>
              <Link href={`/${product.slug}`} className={`mt-auto pt-8 font-extrabold ${product.slug === "bravos" ? "text-white" : "text-[#0f4d78]"}`}>Conhecer {product.name} →</Link>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-w-[1280px] flex-col gap-4 px-6 text-sm leading-6 text-[#63788a] lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p className="max-w-3xl">A arquitetura comercial pode incorporar novas frentes conforme maturidade e homologação. Roadmap não é apresentado como disponibilidade comercial.</p>
          <div className="flex flex-wrap gap-3">
            {secondaryProducts.map((product) => <Link key={product.slug} href={`/${product.slug}`} className="rounded-full border border-[#c7dbe8] bg-white px-4 py-2 font-bold text-[#315d7e]">{product.name}{product.status === "Em homologação" ? " • homologação" : ""}</Link>)}
          </div>
        </div>
      </section>

      <section id="historia" className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
          <article className="rounded-[32px] border border-[#d8e4ec] bg-[#f8fbfd] p-8 sm:p-10">
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Operação-piloto</div>
            <h2 className="mt-4 text-4xl font-bold tracking-[-.04em]">Produto construído olhando para a operação de verdade.</h2>
            <p className="mt-6 text-[17px] leading-8 text-[#60758a]">O ¡Bravazzo! 335 serve como operação-piloto do BravOS. O cotidiano do restaurante ajuda a observar fluxo de atendimento, cozinha e gestão e a transformar necessidades reais em decisões de produto.</p>
          </article>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["01", "Observar", "Entender o problema no contexto em que ele realmente acontece."],
              ["02", "Construir", "Transformar a necessidade em fluxo, regra e experiência de produto."],
              ["03", "Homologar", "Diferenciar capacidade implementada de operação realmente pronta para uso."],
            ].map(([number, title, text]) => (
              <article key={title} className="rounded-[28px] border border-[#d8e4ec] p-7">
                <div className="text-sm font-extrabold text-[#2563eb]">{number}</div>
                <h3 className="mt-4 text-2xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#60758a]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="acesso" className="border-y border-[#d5e5ef] bg-[#e7f2f8] py-14">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Acesso</div>
            <h2 className="mt-3 text-3xl font-bold">Já possui um ambiente BravOS autorizado?</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[#60758a]">
              {platformUrl
                ? "O acesso comercial configurado para este ambiente está disponível no botão ao lado."
                : "A URL comercial do BravOS ainda não está configurada neste ambiente. Enquanto o acesso direto não for homologado, o botão leva à solicitação de demonstração — sem inventar uma rota de login."}
            </p>
          </div>
          <a href={platformHref} className="inline-flex min-h-13 shrink-0 items-center justify-center rounded-xl bg-[#0f4d78] px-7 font-extrabold text-white shadow-lg shadow-[#0f4d78]/15">Entrar na plataforma →</a>
        </div>
      </section>

      <section id="demonstracao" className="bg-[#dcecf6] py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1280px] items-start gap-10 px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
          <div className="lg:sticky lg:top-28">
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Demonstração do BravOS</div>
            <h2 className="mt-4 text-4xl font-bold tracking-[-.04em] sm:text-5xl">Veja o produto aplicado ao seu cenário de operação.</h2>
            <p className="mt-6 text-[17px] leading-8 text-[#5e7588]">Conte como seu restaurante opera hoje. A conversa é direcionada para o BravOS e para as frentes que fazem sentido demonstrar, sem prometer integrações ou maturidade que ainda não estejam homologadas.</p>
            <div className="mt-8 grid gap-3 text-sm font-semibold text-[#45647d]">
              <span>✓ Conversa B2B contextualizada</span>
              <span>✓ Demonstração orientada ao fluxo do restaurante</span>
              <span>✓ Próximo passo definido conforme aderência real</span>
            </div>
            <div className="mt-8 rounded-2xl border border-[#bfd5e4] bg-white/75 p-5">
              <div className="text-xs font-bold uppercase tracking-[.14em] text-[#7a91a3]">Contato direto</div>
              <a href="mailto:contato@bravsystems.com.br" className="mt-2 block font-extrabold text-[#0f4d78]">contato@bravsystems.com.br</a>
            </div>
          </div>
          <LeadForm defaultInterest="BravOS" />
        </div>
      </section>

      <Footer platformHref={platformHref} />
    </main>
  );
}

function Header({ platformHref }: { platformHref: string }) {
  const navigation = [["BravOS", "/#bravos"], ["Operação real", "/#operacao"], ["Ecossistema", "/#ecossistema"], ["História", "/#historia"], ["Demonstração", "/#demonstracao"]] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-[#dbe7ef] bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex min-h-[76px] max-w-[1400px] items-center px-5 lg:px-10">
        <Link href="/#inicio" className="flex items-center gap-3" aria-label="BravSystems — início">
          <Image src="/bravsystems-logo.png" alt="BravSystems" width={64} height={64} priority className="h-[58px] w-[58px] object-contain" />
          <span className="hidden text-sm font-extrabold tracking-[-.02em] text-[#092846] sm:block">BravSystems</span>
        </Link>
        <nav className="ml-auto hidden items-center gap-6 text-sm font-semibold text-[#4e6679] xl:flex" aria-label="Navegação principal">
          {navigation.map(([label, href]) => <Link key={href} href={href} className="transition hover:text-[#0f4d78]">{label}</Link>)}
        </nav>
        <div className="ml-auto hidden items-center gap-2 sm:flex xl:ml-6">
          <a href={platformHref} className="rounded-full border border-[#c3d7e4] bg-white px-5 py-3 text-sm font-bold text-[#315b7a]">Entrar na plataforma</a>
          <Link href="/#bravos" className="rounded-full bg-[#0f4d78] px-5 py-3 text-sm font-extrabold text-white">Conhecer o BravOS</Link>
        </div>
        <details className="relative ml-auto sm:hidden">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-xl border border-[#d6e2eb] bg-white text-xl font-bold text-[#154b7a] [&::-webkit-details-marker]:hidden" aria-label="Abrir menu">☰</summary>
          <nav className="absolute right-0 top-14 w-72 rounded-2xl border border-[#dce6ed] bg-white p-2 shadow-2xl" aria-label="Navegação mobile">
            {navigation.map(([label, href]) => <Link key={href} href={href} className="block rounded-xl px-4 py-3 text-sm font-semibold text-[#334155] hover:bg-[#eef5fa]">{label}</Link>)}
            <a href={platformHref} className="mt-1 block rounded-xl border border-[#cadae5] px-4 py-3 text-center text-sm font-bold text-[#315b7a]">Entrar na plataforma</a>
            <Link href="/#bravos" className="mt-2 block rounded-xl bg-[#0f4d78] px-4 py-3 text-center text-sm font-extrabold text-white">Conhecer o BravOS</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

function Footer({ platformHref }: { platformHref: string }) {
  return (
    <footer className="bg-[#071f35] text-[#b5c9d8]">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3"><Image src="/bravsystems-logo.png" alt="BravSystems" width={56} height={56} className="h-12 w-12 rounded-xl bg-white object-contain" /><strong className="text-lg text-white">BravSystems</strong></div>
          <p className="mt-4 text-sm leading-6">Tecnologia para operação e crescimento, com produtos próprios e evolução orientada por contexto real.</p>
        </div>
        <div>
          <div className="text-xs font-extrabold uppercase tracking-[.16em] text-[#75afd3]">Soluções</div>
          <div className="mt-4 grid gap-3 text-sm"><Link href="/bravos">BravOS</Link><Link href="/bravacademy">BravAcademy</Link><Link href="/bravmsg">BravMsg</Link><Link href="/#ecossistema">Ecossistema Brav</Link></div>
        </div>
        <div>
          <div className="text-xs font-extrabold uppercase tracking-[.16em] text-[#75afd3]">Suporte e contato</div>
          <div className="mt-4 grid gap-3 text-sm"><a href="mailto:contato@bravsystems.com.br">contato@bravsystems.com.br</a><Link href="/#demonstracao">Agendar demonstração</Link><a href={platformHref}>Entrar na plataforma</a></div>
        </div>
        <div>
          <div className="text-xs font-extrabold uppercase tracking-[.16em] text-[#75afd3]">Institucional</div>
          <div className="mt-4 grid gap-3 text-sm"><Link href="/politica-de-privacidade">Política de Privacidade</Link><Link href="/#historia">Operação-piloto</Link><span>Robson Fernandes • Founder/CEO</span></div>
        </div>
      </div>
      <div className="border-t border-white/10"><div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-6 py-5 text-xs text-[#7895aa] sm:flex-row sm:justify-between lg:px-8"><span>BravSystems • Tecnologia e Gestão</span><span>Roadmap e integrações futuras não representam disponibilidade automática.</span></div></div>
    </footer>
  );
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
      <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">{eyebrow}</div>
      <h2 className="mt-4 max-w-5xl text-4xl font-bold tracking-[-.04em] sm:text-5xl">{title}</h2>
      <p className="mt-5 max-w-3xl text-[17px] leading-8 text-[#60758a]">{text}</p>
    </div>
  );
}
