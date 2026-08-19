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

export const metadata: Metadata = {
  metadataBase: new URL("https://bravsystems.com.br"),

  title: {
    default: "BravSystems | Tecnologia e Gestão para Empresas",
    template: "%s | BravSystems",
  },

  description:
    "A BravSystems conecta tecnologia e gestão para organizar processos, centralizar informações e construir operações mais eficientes, seguras e preparadas para crescer.",

  keywords: [
    "BravSystems",
    "BravOs",
    "BravHas",
    "BravCrm",
    "software de gestão",
    "sistema de gestão empresarial",
    "gestão empresarial",
    "gestão operacional",
    "gestão administrativa",
    "tecnologia para empresas",
    "automação de processos",
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
    title: "BravSystems | Tecnologia e Gestão para Empresas",
    description:
      "Tecnologia e gestão para organizar processos, centralizar informações e preparar empresas para crescer.",
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
    title: "BravSystems | Tecnologia e Gestão para Empresas",
    description:
      "Tecnologia e gestão para organizar processos, centralizar informações e preparar empresas para crescer.",
    images: ["/bravsystems-logo.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}