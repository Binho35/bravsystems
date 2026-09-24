import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.bravsystems.com.br/#organization",
      name: "BravSystems",
      url: "https://www.bravsystems.com.br",
      logo: "https://www.bravsystems.com.br/bravsystems-logo.png",
      email: "contato@bravsystems.com.br",
      founder: { "@type": "Person", name: "Robson Fernandes" },
      description: "Empresa brasileira de tecnologia que desenvolve plataformas SaaS próprias para operação, clínicas, finanças, administração, pessoas, comunicação, aprendizagem e conteúdo corporativo.",
    },
    {
      "@type": "WebSite",
      "@id": "https://www.bravsystems.com.br/#website",
      url: "https://www.bravsystems.com.br",
      name: "BravSystems",
      publisher: { "@id": "https://www.bravsystems.com.br/#organization" },
      inLanguage: "pt-BR",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bravsystems.com.br"),
  title: {
    default: "BravSystems | Plataformas SaaS para Operação e Gestão",
    template: "%s | BravSystems",
  },
  description: "Conheça o ecossistema SaaS da BravSystems: BravClin, BravOs, BravHas, BravSystems Finance, BravHos, BravMsg, BravSocial, BravAcademy e BravVideo. Soluções para clínicas, operação, finanças, gestão, pessoas, comunicação, aprendizagem e conteúdo.",
  keywords: [
    "BravSystems", "BravClin", "BravOs", "BravSystems Finance", "BravAcademy", "BravMsg", "BravSocial", "BravHas", "BravHos", "BravVideo",
    "SaaS brasileiro", "software empresarial", "software para restaurantes", "gestão de restaurantes",
    "software para clínicas", "gestão de clínicas de estética", "gestão administrativa", "dashboard financeiro", "RH e DP", "universidade corporativa white label", "comunicação empresarial",
    "produção audiovisual corporativa", "tecnologia para gestão",
  ],
  authors: [{ name: "BravSystems" }],
  creator: "BravSystems",
  publisher: "BravSystems",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.bravsystems.com.br",
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

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {children}
      </body>
    </html>
  );
}
