import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/LeadForm";
import { getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.category}`,
    description: `${product.description} Conheça dores atendidas, benefícios, capacidades e limitações atuais.`,
    alternates: { canonical: `/${product.slug}` },
    openGraph: {
      type: "website",
      url: `https://bravsystems.com.br/${product.slug}`,
      title: `${product.name} | BravSystems`,
      description: product.description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${product.name} — BravSystems` }],
    },
    twitter: { card: "summary_large_image", title: `${product.name} | BravSystems`, description: product.description, images: ["/opengraph-image"] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const softwareJsonLd = product.slug === "bravvideo" ? null : {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: product.description,
    url: `https://bravsystems.com.br/${product.slug}`,
    publisher: { "@type": "Organization", name: "BravSystems", url: "https://bravsystems.com.br" },
  };

  return (
    <main className="min-h-screen bg-[#f4f8fb] text-[#0b2947]">
      {softwareJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />}
      <header className="border-b border-[#dce6ed] bg-white"><div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-5"><Link href="/" className="font-bold text-[#154b7a]">← BravSystems</Link><a href="#contato" className="rounded-full bg-[#154b7a] px-5 py-3 text-sm font-bold text-white">Agendar apresentação</a></div></header>

      <section className="border-b border-[#d7e3ec] bg-[#eef5fa] py-20"><div className="mx-auto max-w-[1200px] px-6"><div className="flex flex-wrap items-center gap-3"><span className="rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[.14em] text-[#2563eb]">{product.category}</span><span className={`rounded-full px-4 py-2 text-xs font-extrabold uppercase ${product.status === "Em homologação" ? "bg-amber-100 text-amber-800" : "bg-[#dcecf6] text-[#154b7a]"}`}>{product.status}</span></div><h1 className="mt-7 max-w-4xl text-5xl font-bold tracking-[-.05em] sm:text-6xl">{product.headline}</h1><p className="mt-6 max-w-3xl text-[18px] leading-8 text-[#5f7185]">{product.description}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="#contato" className="inline-flex h-12 items-center justify-center rounded-xl bg-[#154b7a] px-6 font-bold text-white">{product.cta}</a><Link href="/#solucoes" className="inline-flex h-12 items-center justify-center rounded-xl border border-[#bdd3e2] bg-white px-6 font-bold text-[#154b7a]">Ver todo o portfólio</Link></div></div></section>

      <section className="bg-white py-20"><div className="mx-auto grid max-w-[1200px] gap-8 px-6 lg:grid-cols-2"><InfoBlock eyebrow="A dor" title="O problema que queremos reduzir" items={product.pain} /><InfoBlock eyebrow="Benefícios" title="O resultado que orienta a solução" items={product.benefits} /></div></section>
      <section className="border-y border-[#d9e6ef] bg-[#eef5fa] py-20"><div className="mx-auto grid max-w-[1200px] gap-8 px-6 lg:grid-cols-[1.15fr_.85fr]"><InfoBlock eyebrow="Capacidades" title="O escopo que podemos comunicar hoje" items={product.capabilities} /><InfoBlock eyebrow="Público" title="Para quem faz sentido conversar" items={product.audience} /></div></section>

      <section className="bg-white py-20"><div className="mx-auto max-w-[1200px] px-6"><div className="rounded-3xl border border-amber-200 bg-amber-50 p-8"><div className="text-xs font-extrabold uppercase tracking-[.16em] text-amber-800">Transparência de maturidade</div><h2 className="mt-3 text-3xl font-bold">Limitações e condições atuais</h2><ul className="mt-6 grid gap-3 text-[15px] leading-7 text-[#5f5a48]">{product.limitations.map((item) => <li key={item} className="flex gap-3"><span>•</span><span>{item}</span></li>)}</ul></div></div></section>

      <section id="contato" className="bg-[#dfeef7] py-20"><div className="mx-auto grid max-w-[1200px] items-start gap-10 px-6 lg:grid-cols-[.8fr_1.2fr]"><div><div className="text-xs font-bold uppercase tracking-[.18em] text-[#2563eb]">Demonstração contextual</div><h2 className="mt-3 text-4xl font-bold tracking-[-.04em]">Vamos conversar sobre {product.name}.</h2><p className="mt-5 text-[17px] leading-8 text-[#64748b]">O formulário já está contextualizado com esta solução. Conte a principal dor para direcionarmos a apresentação.</p></div><LeadForm defaultInterest={product.name} /></div></section>

      <footer className="border-t border-[#d7e3ec] bg-[#eaf3f9]"><div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-6 py-8 text-sm text-[#64748b] sm:flex-row sm:justify-between"><span><strong className="text-[#0b2947]">BravSystems</strong> • Tecnologia e Gestão</span><span className="flex flex-wrap gap-4"><Link href="/politica-de-privacidade" className="font-semibold text-[#154b7a]">Política de Privacidade</Link><a href="mailto:contato@bravsystems.com.br">Contato</a></span></div></footer>
    </main>
  );
}

function InfoBlock({ eyebrow, title, items }: { eyebrow: string; title: string; items: string[] }) {
  return <article className="rounded-3xl border border-[#dce6ed] bg-white p-8"><div className="text-xs font-bold uppercase tracking-[.16em] text-[#2563eb]">{eyebrow}</div><h2 className="mt-3 text-3xl font-bold">{title}</h2><ul className="mt-6 grid gap-3 text-[15px] leading-7 text-[#64748b]">{items.map((item) => <li key={item} className="flex gap-3"><span className="font-bold text-[#154b7a]">✓</span><span>{item}</span></li>)}</ul></article>;
}
