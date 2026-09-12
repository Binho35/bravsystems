import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PortalAccessLauncher } from "@/components/PortalAccessLauncher";
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
      description: "Empresa de tecnologia com produtos próprios para operação e crescimento. O BravOS é a solução principal atual para operação e gestão de restaurantes, com BravAcademy, BravMsg e outras frentes em evolução no ecossistema.",
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
    default: "BravSystems | Tecnologia para Operação e Crescimento",
    template: "%s | BravSystems",
  },
  description: "Conheça o BravOS, solução da BravSystems para conectar vendas, cozinha, caixa, estoque e gestão de restaurantes. Solicite uma demonstração e explore o ecossistema Brav.",
  keywords: [
    "BravSystems", "BravOS", "BravAcademy", "BravMsg", "BravHAS", "BravHOS", "BravVideo",
    "software para restaurantes", "gestão de restaurantes", "PDV para restaurantes", "estoque para restaurantes",
    "operação de restaurantes", "tecnologia para gestão", "universidade corporativa white label", "comunicação empresarial",
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
    title: "BravSystems | Tecnologia para Operação e Crescimento",
    description: "BravOS conecta vendas, cozinha, caixa, estoque e gestão em uma experiência pensada para a operação de restaurantes. Conheça o ecossistema BravSystems.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "BravSystems — Tecnologia para operação e crescimento" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BravSystems | Tecnologia para Operação e Crescimento",
    description: "Conheça o BravOS e o ecossistema BravSystems para operação, comunicação e desenvolvimento.",
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
        <PortalAccessLauncher />
      </body>
    </html>
  );
}
