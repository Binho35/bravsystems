import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    default: "BravSystems | SaaS e Tecnologia para Gestão Empresarial",
    template: "%s | BravSystems",
  },

  description:
    "A BravSystems desenvolve produtos SaaS e soluções tecnológicas para operação, gestão administrativa e financeira, RH e DP, comunicação e universidade corporativa.",

  keywords: [
    "BravSystems",
    "BravOs",
    "BravHas",
    "BravHos",
    "BravMsg",
    "BravAcademy",
    "software SaaS",
    "software de gestão",
    "gestão empresarial",
    "gestão para restaurantes",
    "gestão administrativa e financeira",
    "RH e departamento pessoal",
    "comunicação empresarial",
    "universidade corporativa white label",
  ],

  authors: [{ name: "BravSystems" }],
  creator: "BravSystems",
  publisher: "BravSystems",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://bravsystems.com.br",
    siteName: "BravSystems",
    title: "BravSystems | SaaS e Tecnologia para Gestão Empresarial",
    description:
      "Produtos SaaS e soluções tecnológicas para organizar operação, administração, pessoas, comunicação e capacitação corporativa.",
    images: [
      {
        url: "/bravsystems-logo.png",
        width: 1200,
        height: 630,
        alt: "BravSystems — Tecnologia e Gestão",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "BravSystems | SaaS e Tecnologia para Gestão Empresarial",
    description:
      "Produtos SaaS e soluções tecnológicas para organizar operação, administração, pessoas, comunicação e capacitação corporativa.",
    images: ["/bravsystems-logo.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
