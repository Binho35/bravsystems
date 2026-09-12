import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://bravsystems.com.br/#organization",
      name: "BravSystems",
      url: "https://bravsystems.com.br",
      logo: "https://bravsystems.com.br/bravsystems-logo.png",
      email: "contato@bravsystems.com.br",
      founder: { "@type": "Person", name: "Robson Fernandes" },
      description: "Empresa brasileira de tecnologia que desenvolve plataformas SaaS próprias para operação, administração, pessoas, comunicação, aprendizagem e conteúdo corporativo.",
    },
    {
      "@type": "WebSite",
      "@id": "https://bravsystems.com.br/#website",
      url: "https://bravsystems.com.br",
      name: "BravSystems",
      publisher: { "@id": "https://bravsystems.com.br/#organization" },
      inLanguage: "pt-BR",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bravsystems.com.br"),
  title: {
    default: "BravSystems | Plataformas SaaS para Operação e Gestão",
    template: "%s | BravSystems",
  },
  description: "Conheça o ecossistema SaaS da BravSystems: BravOS, BravHAS, BravHOS, BravMsg, BravAcademy e BravVideo. Soluções para operação, gestão, pessoas, comunicação, aprendizagem e conteúdo corporativo.",
  keywords: [
    "BravSystems", "BravOS", "BravAcademy", "BravMsg", "BravHAS", "BravHOS", "BravVideo",
    "SaaS brasileiro", "software empresarial", "software para restaurantes", "gestão de restaurantes",
    "gestão administrativa", "RH e DP", "universidade corporativa white label", "comunicação empresarial",
    "produção audiovisual corporativa", "tecnologia para gestão",
  ],
  authors: [{ name: "BravSystems" }],
  creator: "BravSystems",
  publisher: "BravSystems",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://bravsystems.com.br",
    siteName: "BravSystems",
    title: "BravSystems | Plataformas SaaS para Operação e Gestão",
    description: "Produtos SaaS próprios para transformar processos empresariais em operações digitais mais simples, conectadas e eficientes.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "BravSystems — Ecossistema SaaS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BravSystems | Plataformas SaaS para Operação e Gestão",
    description: "Conheça o ecossistema BravSystems e acesse sua plataforma contratada pelo portal oficial.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {children}
      </body>
    </html>
  );
}
