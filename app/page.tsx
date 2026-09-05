import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { products } from "@/lib/products";

const pains = [
  { title: "Operação fragmentada", text: "Planilhas, sistemas desconectados e controles paralelos aumentam retrabalho e reduzem visibilidade.", product: "BravOS", href: "/bravos" },
  { title: "Financeiro sem previsibilidade", text: "Contas, vencimentos e fluxo de caixa dispersos atrasam decisões e elevam o risco operacional.", product: "BravHAS", href: "/bravhas" },
  { title: "RH e DP descentralizados", text: "Documentos, ponto, férias e histórico funcional sem centralização dificultam governança e rastreabilidade.", product: "BravHOS", href: "/bravhos" },
  { title: "Comunicação sem histórico", text: "Contatos e mensagens espalhados tornam campanhas, atendimento e relacionamento difíceis de acompanhar.", product: "BravMsg", href: "/bravmsg" },
  { title: "Treinamento sem controle", text: "PDFs, links e vídeos soltos dificultam padronização, avaliação e comprovação de conclusão.", product: "BravAcademy", href: "/bravacademy" },
  { title: "Conteúdo corporativo caro", text: "Gravações tradicionais exigem pessoas, edição e novas produções sempre que o conteúdo muda.", product: "BravVideo — em homologação", href: "/bravvideo" },
];

const profiles = [
  ["Restaurantes", "Operação, estoque, produção, vendas e compras", "BravOS"],
  ["Pequenas e médias empresas", "Financeiro, administrativo, pessoas e comunicação", "BravHAS + BravHOS + BravMsg"],
  ["Empresas com muitos colaboradores", "RH, comunicação e desenvolvimento", "BravHOS + BravAcademy + BravMsg"],
  ["Treinamento recorrente", "Capacitação padronizada e rastreável", "BravAcademy + BravVideo (futuro)"],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f8fb] text-[#0b2947]">
      <Header />

      <section id="inicio" className="relative overflow-hidden border-b border-[#d7e3ec] bg-[#eef5fa]">
        <div className="absolute -right-48 -top-48 h-[560px] w-[560px] rounded-full bg-[#d8ebf8]" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[650px] max-w-[1360px] items-center gap-12 px-6 py-16 lg:grid-cols-[1.08fr_.92fr] lg:px-10">
          <div>
            <div className="inline-flex rounded-full border border-[#bfd8e8] bg-white px-4 py-2 text-[11px] font-extrabold uppercase tracking-[.18em] text-[#154b7a]">Software próprio para problemas reais de gestão</div>
            <h1 className="mt-7 max-w-[850px] text-5xl font-bold leading-[1.02] tracking-[-.055em] sm:text-6xl lg:text-[70px]">
              Sistemas para organizar, controlar e fazer a operação evoluir.
            </h1>
            <p className="mt-7 max-w-[760px] text-[18px] leading-8 text-[#5f7185]">
              A BravSystems transforma processos dispersos, controles manuais e falta de visibilidade em soluções de tecnologia voltadas à operação, financeiro, pessoas, comunicação e treinamento.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#solucoes" className="inline-flex h-13 items-center justify-center rounded-xl bg-[#154b7a] px-7 text-[15px] font-bold text-white shadow-lg transition hover:bg-[#0b2947]">Conheça nossas soluções →</a>
              <a href="#contato" className="inline-flex h-13 items-center justify-center rounded-xl border border-[#bdd3e2] bg-white px-7 text-[15px] font-bold text-[#154b7a] transition hover:border-[#154b7a]">Agende uma apresentação</a>
            </div>
            <div className="mt-9 grid gap-3 border-t border-[#cddfe9] pt-6 text-sm font-semibold text-[#60758a] sm:grid-cols-3">
              <span>✓ Menos retrabalho</span><span>✓ Mais controle</span><span>✓ Informação centralizada</span>
            </div>
          </div>
          <div className="rounded-[30px] border border-[#c4d9e7] bg-white p-7 shadow-2xl shadow-[#0b2947]/15">
            <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2563eb]">Ecossistema BravSystems</div>
            <h2 className="mt-3 text-3xl font-bold">Tecnologia aplicada às áreas que sustentam o negócio.</h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[["Operação","BravOS"],["Financeiro","BravHAS"],["Pessoas","BravHOS"],["Relacionamento","BravMsg"],["Treinamento","BravAcademy"],["Conteúdo","BravVideo"]].map(([area, product]) => (
                <div key={product} className="rounded-2xl border border-[#d7e8f2] bg-[#f7fafc] p-4"><div className="text-xs font-bold uppercase text-[#64748b]">{area}</div><div className="mt-1 text-lg font-bold">{product}</div></div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-[#64748b]">Uma empresa pode começar por uma solução e evoluir conforme a necessidade. Ecossistema aqui significa complementaridade estratégica — não integração técnica automática entre todos os produtos.</p>
          </div>
        </div>
      </section>

      <section id="dores" className="bg-white py-20">
        <SectionTitle eyebrow="Problemas que resolvemos" title="A tecnologia começa pela dor — não pelo nome do sistema." text="Nosso portfólio foi construído para atacar gargalos operacionais concretos: dispersão de informação, retrabalho, falta de rastreabilidade e baixa capacidade de decisão." />
        <div className="mx-auto mt-12 grid max-w-[1280px] gap-5 px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {pains.map((pain) => <article key={pain.title} className="rounded-3xl border border-[#dce6ed] bg-[#f8fbfd] p-7"><h3 className="text-xl font-bold">{pain.title}</h3><p className="mt-3 text-[15px] leading-7 text-[#64748b]">{pain.text}</p><Link href={pain.href} className="mt-6 inline-flex font-bold text-[#154b7a]">Solução: {pain.product} →</Link></article>)}
        </div>
      </section>

      <section id="solucoes" className="border-y border-[#d9e6ef] bg-[#eef5fa] py-20">
        <SectionTitle eyebrow="Portfólio" title="Seis frentes para problemas diferentes de gestão." text="Cada produto tem uma responsabilidade comercial clara. Maturidade e limitações são comunicadas de forma transparente." />
        <div className="mx-auto mt-12 grid max-w-[1280px] gap-6 px-6 lg:grid-cols-3 lg:px-8">
          {products.map((product) => (
            <article key={product.slug} className="flex h-full flex-col rounded-3xl border border-[#d3e1ea] bg-white p-7 shadow-sm">
              <div className="flex items-start justify-between gap-3"><div><div className="text-xs font-bold uppercase tracking-[.14em] text-[#2563eb]">{product.category}</div><h3 className="mt-2 text-3xl font-bold">{product.name}</h3></div><span className={`rounded-full px-3 py-1 text-[10px] font-extrabold uppercase ${product.status === "Em homologação" ? "bg-amber-100 text-amber-800" : "bg-[#e5f1f8] text-[#154b7a]"}`}>{product.status}</span></div>
              <h4 className="mt-5 text-lg font-bold leading-7">{product.headline}</h4>
              <p className="mt-3 text-[15px] leading-7 text-[#64748b]">{product.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">{product.benefits.slice(0,3).map((benefit) => <span key={benefit} className="rounded-full bg-[#f0f6fa] px-3 py-1 text-xs font-semibold text-[#475569]">{benefit}</span>)}</div>
              <Link href={`/${product.slug}`} className="mt-auto pt-7 font-bold text-[#154b7a]">Conhecer {product.name} →</Link>
            </article>
          ))}
        </div>
      </section>

      <section id="perfis" className="bg-white py-20">
        <SectionTitle eyebrow="Soluções para sua empresa" title="Encontre a frente mais aderente ao seu cenário." text="O ponto de partida pode ser uma área específica. A evolução do portfólio acontece conforme a necessidade real da operação." />
        <div className="mx-auto mt-12 grid max-w-[1280px] gap-5 px-6 sm:grid-cols-2 lg:px-8">
          {profiles.map(([profile, pain, solution]) => <article key={profile} className="rounded-3xl border border-[#dce6ed] p-7"><div className="text-xs font-bold uppercase tracking-[.14em] text-[#2563eb]">{profile}</div><h3 className="mt-3 text-2xl font-bold">{pain}</h3><p className="mt-4 text-sm font-semibold text-[#64748b]">Produtos possíveis: <strong className="text-[#154b7a]">{solution}</strong></p></article>)}
        </div>
      </section>

      <section id="como-trabalhamos" className="bg-[#0b2947] py-20 text-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-8"><div className="max-w-3xl"><div className="text-xs font-bold uppercase tracking-[.18em] text-[#8db8dc]">Como trabalhamos</div><h2 className="mt-3 text-4xl font-bold tracking-[-.04em] sm:text-5xl">Da dor à solução, com implantação orientada ao contexto.</h2></div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{["Diagnóstico do cenário","Identificação da dor prioritária","Demonstração aderente ao caso","Definição da solução","Implantação e configuração","Acompanhamento da evolução"].map((step,index) => <div key={step} className="rounded-2xl border border-white/10 bg-white/[.05] p-6"><div className="text-sm font-bold text-[#60a5fa]">0{index+1}</div><div className="mt-3 text-lg font-bold">{step}</div></div>)}</div>
        </div>
      </section>

      <section id="demonstracoes" className="border-b border-[#d9e6ef] bg-[#eef5fa] py-20">
        <SectionTitle eyebrow="Demonstrações" title="Veja o que já podemos mostrar — e solicite o que precisa de apresentação guiada." text="Não exibimos arquivos futuros ou placeholders técnicos como se fossem demonstrações prontas." />
        <div className="mx-auto mt-12 grid max-w-[1280px] gap-6 px-6 lg:grid-cols-3 lg:px-8">
          <article className="overflow-hidden rounded-3xl border border-[#bed5e5] bg-white p-4 shadow-lg"><video className="aspect-video w-full rounded-2xl bg-[#071f35] object-cover" controls preload="metadata" playsInline poster="/bravsystems-logo.png" aria-label="Apresentação BravOS"><source src="/bravsystems-video-institucional.mp4" type="video/mp4" /></video><h3 className="mt-5 text-2xl font-bold">BravOS</h3><p className="mt-2 text-sm leading-6 text-[#64748b]">Conheça uma visão da solução para operação de restaurantes.</p><Link href="/?interest=BravOS#contato" className="mt-5 inline-flex font-bold text-[#154b7a]">Agendar apresentação →</Link></article>
          {products.filter((p) => p.slug !== "bravos").slice(0,2).map((product) => <article key={product.slug} className="flex flex-col rounded-3xl border border-[#bed5e5] bg-white p-7 shadow-lg"><div className="flex aspect-video items-center justify-center rounded-2xl bg-[#0b2947] text-center text-white"><div><div className="text-xs font-extrabold uppercase tracking-[.16em] text-[#8db8dc]">Apresentação guiada</div><div className="mt-2 text-2xl font-bold">{product.name}</div></div></div><p className="mt-5 text-sm leading-6 text-[#64748b]">Converse com a BravSystems para uma apresentação contextualizada à sua necessidade.</p><Link href={`/?interest=${encodeURIComponent(product.name)}#contato`} className="mt-auto pt-5 font-bold text-[#154b7a]">Solicitar demonstração →</Link></article>)}
        </div>
        <div className="mx-auto mt-8 max-w-[1280px] px-6 text-center lg:px-8"><a href="#contato" className="inline-flex h-12 items-center rounded-xl bg-[#154b7a] px-6 font-bold text-white">Solicitar demonstração de outra solução</a></div>
      </section>

      <section id="empresa" className="bg-white py-20">
        <div className="mx-auto grid max-w-[1280px] gap-6 px-6 lg:grid-cols-2 lg:px-8"><article className="rounded-3xl border border-[#dce6ed] p-8"><div className="text-xs font-bold uppercase tracking-[.18em] text-[#2563eb]">Quem somos</div><h2 className="mt-3 text-4xl font-bold tracking-[-.04em]">Tecnologia construída com visão de operação e gestão.</h2><p className="mt-6 text-[17px] leading-8 text-[#64748b]">A BravSystems desenvolve produtos próprios para resolver problemas administrativos e operacionais concretos. A abordagem é prática: entender o processo, reduzir dispersão e transformar informação em controle.</p></article><article className="rounded-3xl bg-[#0b2947] p-8 text-white"><div className="text-xs font-bold uppercase tracking-[.18em] text-[#8db8dc]">Por que BravSystems</div><div className="mt-6 grid gap-4">{["Produtos próprios e modulares","Foco em problemas operacionais reais","Visão integrada de tecnologia e gestão","Evolução orientada por uso e governança"].map((item) => <div key={item} className="rounded-xl border border-white/10 bg-white/[.05] p-4 font-semibold">✓ {item}</div>)}</div></article></div>
      </section>

      <section id="contato" className="bg-[#dfeef7] py-20">
        <div className="mx-auto grid max-w-[1280px] items-start gap-10 px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8"><div className="lg:sticky lg:top-28"><div className="text-xs font-bold uppercase tracking-[.18em] text-[#2563eb]">Vamos conversar</div><h2 className="mt-3 text-4xl font-bold tracking-[-.04em] sm:text-5xl">Qual dor merece ser resolvida primeiro?</h2><p className="mt-6 text-[17px] leading-8 text-[#64748b]">Conte o cenário. Direcionamos a conversa para a solução mais adequada sem transformar roadmap em promessa comercial.</p><div className="mt-8 rounded-2xl border border-[#cbddea] bg-white/80 p-5"><div className="text-xs font-bold uppercase text-[#94a3b8]">Contato direto</div><a href="mailto:contato@bravsystems.com.br" className="mt-2 block text-lg font-bold text-[#154b7a]">contato@bravsystems.com.br</a></div></div><LeadForm /></div>
      </section>

      <Footer />
    </main>
  );
}

function Header() { return <header className="sticky top-0 z-50 border-b border-[#dce6ed] bg-white/95 shadow-sm backdrop-blur"><div className="mx-auto flex min-h-[78px] max-w-[1360px] items-center px-5 lg:px-10"><Link href="/#inicio" aria-label="BravSystems — início"><Image src="/bravsystems-logo.png" alt="BravSystems" width={78} height={78} priority className="h-[64px] w-[64px] object-contain" /></Link><nav className="ml-auto hidden items-center gap-6 text-sm font-semibold text-[#475569] lg:flex" aria-label="Navegação principal"><a href="#dores">Problemas</a><a href="#solucoes">Soluções</a><a href="#perfis">Para quem</a><a href="#empresa">Empresa</a><a href="#contato">Contato</a></nav><a href="#contato" className="ml-auto rounded-full bg-[#154b7a] px-5 py-3 text-sm font-bold text-white lg:ml-6">Agendar apresentação</a></div></header>; }

function Footer() { return <footer className="border-t border-[#d7e3ec] bg-[#eaf3f9]"><div className="mx-auto flex max-w-[1280px] flex-col gap-5 px-6 py-8 text-sm text-[#64748b] sm:flex-row sm:items-center sm:justify-between"><div><div><strong className="text-[#0b2947]">BravSystems</strong> • Tecnologia e Gestão</div><div className="mt-2"><strong className="text-[#334155]">Robson Fernandes</strong> • Fundador e CEO</div></div><div className="flex flex-wrap gap-4"><Link href="/politica-de-privacidade" className="font-semibold text-[#154b7a]">Política de Privacidade</Link><a href="mailto:contato@bravsystems.com.br">contato@bravsystems.com.br</a></div></div></footer>; }

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) { return <div className="mx-auto max-w-[1280px] px-6 lg:px-8"><div className="text-xs font-bold uppercase tracking-[.18em] text-[#2563eb]">{eyebrow}</div><h2 className="mt-3 max-w-4xl text-4xl font-bold tracking-[-.04em] sm:text-5xl">{title}</h2><p className="mt-5 max-w-3xl text-[17px] leading-8 text-[#64748b]">{text}</p></div>; }
