import { products, type Product } from "@/lib/products";

export type ProductAccessStatus =
  | "ACESSO DISPONÍVEL"
  | "EM HOMOLOGAÇÃO"
  | "EM DESENVOLVIMENTO"
  | "ACESSO INTERNO";

export type ProductAccess = {
  slug: string;
  name: string;
  category: string;
  description: string;
  commercialHref: string;
  loginHref: string | null;
  status: ProductAccessStatus;
  environmentNote: string;
};

const configuredUrls: Record<string, string | undefined> = {
  bravos: process.env.NEXT_PUBLIC_BRAVOS_APP_URL,
  bravclin: process.env.NEXT_PUBLIC_BRAVCLIN_APP_URL,
  bravhas: process.env.NEXT_PUBLIC_BRAVHAS_APP_URL,
  "bravsystems-finance": process.env.NEXT_PUBLIC_BRAVSYSTEMS_FINANCE_APP_URL,
  bravhos: process.env.NEXT_PUBLIC_BRAVHOS_APP_URL,
  bravmsg: process.env.NEXT_PUBLIC_BRAVMSG_APP_URL,
  bravsocial: process.env.NEXT_PUBLIC_BRAVSOCIAL_APP_URL,
  bravacademy: process.env.NEXT_PUBLIC_BRAVACADEMY_APP_URL,
  bravvideo: process.env.NEXT_PUBLIC_BRAVVIDEO_APP_URL,
};

const governedState: Record<string, { status: ProductAccessStatus; environmentNote: string }> = {
  bravos: { status: "EM HOMOLOGAÇÃO", environmentNote: "Preview em homologação; acesso público depende de endereço oficialmente autorizado." },
  bravclin: { status: "EM DESENVOLVIMENTO", environmentNote: "Projeto em construção; acesso público ainda não liberado." },
  bravacademy: { status: "EM HOMOLOGAÇÃO", environmentNote: "Ambiente de homologação operacional; hostname temporário não é publicado como acesso de cliente." },
  "bravsystems-finance": { status: "EM DESENVOLVIMENTO", environmentNote: "Dashboard financeiro em evolução; acesso comercial ainda não liberado." },
  bravhos: { status: "EM DESENVOLVIMENTO", environmentNote: "Preview web em preparação." },
  bravmsg: { status: "EM DESENVOLVIMENTO", environmentNote: "Ambiente web ainda não liberado para acesso público." },
  bravsocial: { status: "EM HOMOLOGAÇÃO", environmentNote: "Preview técnico homologado; integrações sociais reais ainda dependem de ativos externos." },
  bravhas: { status: "EM HOMOLOGAÇÃO", environmentNote: "Ambiente interno em homologação. Liberação pública não prevista nesta etapa." },
  bravvideo: { status: "EM DESENVOLVIMENTO", environmentNote: "Ambiente de desenvolvimento; acesso público ainda não homologado." },
};

const publicAccessDisabled = new Set(["bravhas"]);

function normalizeOfficialUrl(raw?: string) {
  const value = raw?.trim();
  if (!value) return null;

  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    const blockedHosts = new Set(["localhost", "127.0.0.1", "0.0.0.0"]);
    const technicalHost =
      hostname.endsWith(".local") ||
      /\.vercel\.(?:app|sh)$/.test(hostname) ||
      hostname.endsWith(".hostingersite.com");

    if (url.protocol !== "https:" || blockedHosts.has(hostname) || technicalHost) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

export function getProductAccess(product: Product): ProductAccess {
  const loginHref = publicAccessDisabled.has(product.slug)
    ? null
    : normalizeOfficialUrl(configuredUrls[product.slug]);
  const state = governedState[product.slug] ?? {
    status: product.status === "Em homologação" ? "EM HOMOLOGAÇÃO" : "EM DESENVOLVIMENTO",
    environmentNote: "Acesso público ainda não homologado.",
  };

  return {
    slug: product.slug,
    name: product.name,
    category: product.category,
    description: product.description,
    commercialHref: `/${product.slug}`,
    loginHref,
    status: loginHref ? "ACESSO DISPONÍVEL" : state.status,
    environmentNote: loginHref ? "Acesso oficial configurado para este produto." : state.environmentNote,
  };
}

export const productAccessCatalog = products.map(getProductAccess);
