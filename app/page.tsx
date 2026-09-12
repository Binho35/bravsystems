import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { ProductVideoDialog } from "@/components/ProductVideoDialog";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getProductVideo } from "@/lib/product-videos";
import { products } from "@/lib/products";

const solutionPillars = [
  ["Operação", "BravOS", "Processos do restaurante deixam de viver em controles separados e passam a compartilhar contexto."],
  ["Administração", "BravHAS", "Financeiro, pessoas e rotinas administrativas ganham uma visão mais centralizada."],
  ["Pessoas", "BravHOS", "A jornada do colaborador fica mais rastreável para RH, DP e gestão de pessoas."],
  ["Comunicação", "BravMsg", "Contatos, campanhas e atendimento deixam de depender de históricos fragmentados."],
  ["Aprendizagem", "BravAcademy", "Treinamentos dispersos viram jornadas corporativas organizadas e acompanháveis."],
  ["Conteúdo", "BravVideo", "Produção audiovisual corporativa evolui para um fluxo mais padronizado e escalável."],
] as const;

const operationFlow = [
  ["01", "Pedido", "A venda começa no atendimento e segue com contexto para a operação."],
  ["02", "Cozinha", "A produção recebe o que precisa ser preparado e acompanha o andamento."],
  ["03", "Caixa", "Pagamento e fechamento fazem parte do mesmo fluxo operacional."],
  ["04", "Estoque", "Consumo e movimentações deixam de viver isolados da venda."],
  ["05", "Gestão", "A operação vira informação para controle, acompanhamento e decisão."],
] as const;

const homepageVideoSlugs = new Set(["bravos", "bravhas", "bravvideo"]);
const homepageVideoProducts = products.flatMap((product) => {
  if (!homepageVideoSlugs.has(product.slug)) return [];
  const video = getProductVideo(product.slug);
  return video?.assetPresent ? [{ product, video }] : [];
});

export default function Home() {
  const legacyBravOSConfiguredUrl = process.env.NEXT_PUBLIC_BRAVOS_APP_URL?.trim();

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f9fc] text-[#092846]">
      <SiteHeader />

      <section id="inicio" className="relative overflow-hidden border-b border-[#d9e7f0] bg-[#f4f9fc]">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-32 -top-44 h-[620px] w-[620px] rounded-full bg-[#d9edf9] blur-3xl" />
          <div className="absolute -bottom-56 left-[18%] h-[440px] w-[440px] rounded-full bg-[#e4f1f8] blur-3xl" />
        </div>

        <div className="relative mx-auto grid min-h-[760px] max-w-[1400px] items-center gap-14 px-6 py-16 lg:grid-cols-[.95fr_1.05fr] lg:px-10 lg:py-20">
          <div className="max-w-[720px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#bcd6e7] bg-white/90 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[.16em] text-[#15517f] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#2563eb]" aria-hidden="true" />
              BravSystems • Ecossistema SaaS
            </div>

            <h1 className="mt-7 text-[46px] font-bold leading-[1.02] tracking-[-.055em] sm:text-6xl lg:text-[72px]">
              Tecnologia para transformar operações complexas em gestão simples, conectada e escalável.
            </h1>
            <p className="mt-7 max-w-[680px] text-[18px] leading-8 text-[#587086] sm:text-[20px]">
              A BravSystems é uma empresa brasileira de tecnologia que desenvolve plataformas SaaS próprias para operação, administração, pessoas, comunicação, aprendizagem e conteúdo corporativo.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#produtos" className="inline-flex min-h-13 items-center justify-center rounded-xl bg-[#0f4d78] px-7 text-[15px] font-extrabold text-white shadow-xl shadow-[#0f4d78]/20 transition hover:bg-[#092846]">
                Conheça nossas soluções →
              </a>
              <a href="#contato" className="inline-flex min-h-13 items-center justify-center rounded-xl border border-[#b8cfdf] bg-white px-7 text-[15px] font-bold text-[#0f4d78] transition hover:border-[#0f4d78]">
                Fale com a BravSystems
              </a>
              <Link href="/acessar" className="inline-flex min-h-13 items-center justify-center rounded-xl px-5 text-[15px] font-bold text-[#315b7a] underline decoration-[#a6c3d7] underline-offset-4 transition hover:text-[#092846]">
                Acessar plataforma
              </Link>
            </div>

            <div className="mt-9 grid gap-3 border-t border-[#cfdfe9] pt-6 text-sm font-semibold text-[#5f7689] sm:grid-cols-3">
              <span>Produtos próprios</span>
              <span>Jornadas B2B</span>
              <span>Evolução com governança</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-[36px] bg-gradient-to-br from-[#cce6f5] via-white to-[#b8d7ea] opacity-80 blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[30px] border border-[#b9d1e1] bg-[#08253e] p-5 shadow-2xl shadow-[#0b2947]/25 sm:p-6">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#71b5df]">Ecossistema BravSystems</div>
                  <div className="mt-2 text-xl font-bold text-white">Um portfólio. Diferentes frentes de gestão.</div>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-[#b7cfdf]">SaaS</div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {solutionPillars.map(([area, product]) => (
                  <div key={product} className="rounded-2xl border border-white/10 bg-white/[.055] p-4">
                    <div className="text-[10px] font-extrabold uppercase tracking-[.15em] text-[#78bce4]">{area}</div>
                    <div className="mt-2 text-xl font-bold text-white">{product}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-4 text-sm text-[#587086]">
                <span>Cliente BravSystems?</span>
                <Link href="/acessar" className="font-extrabold text-[#0f4d78]">Ir para a Central de Acesso →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="solucoes" className="bg-white py-20 sm:py-24">
        <SectionTitle eyebrow="Soluções" title="O problema vem primeiro. A tecnologia entra para reduzir atrito, dispersão e falta de visibilidade." text="Cada produto nasce para organizar uma frente real de gestão. A comunicação pública segue o que está implementado e o estágio de maturidade de cada plataforma." />
        <div className="mx-auto mt-12 grid max-w-[1280px] gap-5 px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {solutionPillars.map(([area, product, text]) => (
            <article key={product} className="rounded-[28px] border border-[#d8e5ed] bg-[#f8fbfd] p-7 transition hover:-translate-y-1 hover:border-[#b9d5e6] hover:bg-white hover:shadow-xl hover:shadow-[#0b2947]/8">
              <div className="text-xs font-extrabold uppercase tracking-[.16em] text-[#2563eb]">{area}</div>
              <h3 className="mt-3 text-2xl font-bold">{product}</h3>
              <p className="mt-4 text-[15px] leading-7 text-[#5e7487]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="produtos" className="border-y border-[#d5e5ef] bg-[#eef6fb] py-20 sm:py-24">
        <SectionTitle eyebrow="Produtos" title="Seis produtos no ecossistema BravSystems, apresentados com maturidade e escopo reais." text="Novo cliente conhece a solução e solicita demonstração. Cliente existente usa a Central de Acesso para chegar ao ambiente oficial contratado." />
        <div className="mx-auto mt-12 grid max-w-[1280px] gap-6 px-6 md:grid-cols-2 xl:grid-cols-3 lg:px-8">
          {products.map((product) => (
            <article key={product.slug} className="flex min-h-[410px] flex-col rounded-[30px] border border-[#cbdde8] bg-white p-7 shadow-lg shadow-[#0b2947]/5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#2563eb]">{product.category}</div>
                  <h3 className="mt-2 text-3xl font-bold tracking-[-.03em]">{product.name}</h3>
                </div>
                <span className={`rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.08em] ${product.status === "Em homologação" ? "bg-amber-100 text-amber-800" : "bg-[#e7f2f8] text-[#315d7e]"}`}>{product.status}</span>
              </div>
              <p className="mt-5 text-sm leading-7 text-[#60758a]">{product.description}</p>
              <div className="mt-6 rounded-2xl border border-[#e1ebf1] bg-[#f8fbfd] p-4">
                <div className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#7990a2]">Dor principal</div>
                <p className="mt-2 text-sm font-semibold leading-6 text-[#415f76]">{product.pain[0]}</p>
              </div>
              <div className="mt-auto flex flex-wrap items-center gap-4 pt-7">
                <Link href={`/${product.slug}`} className="font-extrabold text-[#0f4d78]">Conhecer {product.name} →</Link>
                <Link href="/acessar" className="text-sm font-bold text-[#60758a] underline decoration-[#b7cbd8] underline-offset-4">Acesso do cliente</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="bravos" className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">BravOS • operação de restaurantes</div>
            <h2 className="mt-4 text-4xl font-bold tracking-[-.04em] sm:text-5xl">A operação acontece em tempo real. Sua gestão também deveria.</h2>
            <p className="mt-6 text-[17px] leading-8 text-[#60758a]">O BravOS conecta vendas, cozinha, caixa, estoque e gestão em uma experiência pensada para a rotina de restaurantes — com mais contexto, rastreabilidade e menos controles paralelos.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/bravos" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#0f4d78] px-6 font-extrabold text-white">Conhecer o BravOS →</Link>
              <a href="#contato" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#c3d7e4] bg-white px-6 font-bold text-[#315b7a]">Agendar demonstração</a>
              <Link href="/acessar" className="inline-flex min-h-12 items-center justify-center px-3 font-bold text-[#315b7a]">Entrar na plataforma</Link>
            </div>
            {legacyBravOSConfiguredUrl ? <p className="mt-4 text-xs text-[#71879a]">O acesso oficial configurado é apresentado exclusivamente na Central de Acesso.</p> : null}
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[36px] bg-[#dcecf6] blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[28px] border border-[#bfd4e2] bg-[#082844] shadow-2xl shadow-[#0b2947]/18">
              <Image src="/bravos-hero-approved.webp" alt="Visão do produto BravOS" width={1025} height={770} className="h-auto w-full object-contain" />
            </div>
          </div>
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
            <p className="max-w-2xl text-[17px] leading-8 text-[#bfd3e1] lg:justify-self-end">O BravOS organiza a jornada operacional em etapas conectadas. O ¡Bravazzo! 335 funciona como operação-piloto para observar necessidades reais e separar capacidade implementada de prontidão homologada.</p>
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

      <section className="bg-[#eef6fb] py-20 sm:py-24" data-homepage-product-videos>
        <SectionTitle eyebrow="Produtos em contexto" title="Conheça algumas frentes do ecossistema em apresentações sob demanda." text="Vídeos são exibidos apenas quando o asset aprovado está presente. Ausência de mídia não é tratada como disponibilidade comercial." />
        <div className="mx-auto mt-12 grid max-w-[1280px] gap-6 px-6 lg:grid-cols-3 lg:px-8">
          {homepageVideoProducts.map(({ product, video }) => (
            <article key={product.slug} data-homepage-video={product.slug} className="rounded-[30px] border border-[#cbdde8] bg-white p-6 shadow-xl shadow-[#0b2947]/7 sm:p-7">
              <div className="grid grid-cols-[112px_minmax(0,1fr)] gap-5">
                <div className="overflow-hidden rounded-2xl border border-[#d4e3ec] bg-[#082844] shadow-lg shadow-[#0b2947]/10">
                  <Image src={video.poster} alt={`Poster da apresentação do ${product.name}`} width={512} height={910} unoptimized className="aspect-[512/910] h-auto w-full object-cover" />
                </div>
                <div className="min-w-0 py-1">
                  <div className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#2563eb]">{product.category}</div>
                  <h3 className="mt-2 text-2xl font-bold tracking-[-.03em]">{product.name}</h3>
                  <p className="mt-3 line-clamp-5 text-sm leading-6 text-[#60758a]">{product.description}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[#e1ebf1] pt-5">
                <ProductVideoDialog video={video} />
                <Link href={`/${product.slug}`} className="inline-flex min-h-12 items-center px-2 font-extrabold text-[#0f4d78]">Conhecer {product.name} →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="por-que-bravsystems" className="bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Por que BravSystems</div>
            <h2 className="mt-4 text-4xl font-bold tracking-[-.04em] sm:text-5xl">Software construído para resolver operação real — com transparência sobre o que já está pronto.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Produto próprio", "Construímos e evoluímos nossas plataformas como ativos de longo prazo."],
              ["Contexto real", "Problemas operacionais orientam decisões de produto, não apenas listas de funcionalidades."],
              ["Governança", "Capacidade implementada, homologação e disponibilidade comercial são tratadas como etapas distintas."],
              ["Ecossistema", "Produtos independentes podem atender diferentes frentes sem forçar uma única solução para todos os cenários."],
            ].map(([title, text]) => (
              <article key={title} className="rounded-[26px] border border-[#d8e4ec] bg-[#f8fbfd] p-6">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#60758a]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="acesso" className="border-y border-[#d5e5ef] bg-[#e7f2f8] py-16">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-7 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Já é cliente BravSystems?</div>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Acesse rapidamente a plataforma contratada.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[#60758a]">A Central de Acesso reúne os produtos do ecossistema e só libera login quando existe ambiente oficial homologado. Nenhum Preview ou branch de desenvolvimento é apresentado como produção.</p>
          </div>
          <Link href="/acessar" className="inline-flex min-h-13 shrink-0 items-center justify-center rounded-xl bg-[#0f4d78] px-7 font-extrabold text-white shadow-lg shadow-[#0f4d78]/15">Acessar meu sistema →</Link>
        </div>
      </section>

      <section id="contato" className="bg-[#dcecf6] py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1280px] items-start gap-10 px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
          <div className="lg:sticky lg:top-28">
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Demonstração do BravOS e contato comercial</div>
            <h2 className="mt-4 text-4xl font-bold tracking-[-.04em] sm:text-5xl">Conte o que sua operação precisa organizar.</h2>
            <p className="mt-6 text-[17px] leading-8 text-[#5e7588]">O formulário permite contextualizar a solução de interesse. A conversa comercial deve partir da dor real e do estágio de maturidade do produto, sem prometer integrações ou disponibilidade que ainda não tenham sido homologadas.</p>
            <div className="mt-8 grid gap-3 text-sm font-semibold text-[#45647d]">
              <span>✓ Conversa B2B contextualizada</span>
              <span>✓ Demonstração orientada à necessidade real</span>
              <span>✓ Próximo passo definido conforme aderência e disponibilidade</span>
            </div>
            <div className="mt-8 rounded-2xl border border-[#bfd5e4] bg-white/75 p-5">
              <div className="text-xs font-bold uppercase tracking-[.14em] text-[#7a91a3]">Contato direto</div>
              <a href="mailto:contato@bravsystems.com.br" className="mt-2 block font-extrabold text-[#0f4d78]">contato@bravsystems.com.br</a>
            </div>
          </div>
          <LeadForm defaultInterest="BravOS" />
        </div>
      </section>

      <SiteFooter />
    </main>
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
