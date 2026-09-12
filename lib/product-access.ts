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
};

const configuredUrls: Record<string, string | undefined> = {
  bravos: process.env.NEXT_PUBLIC_BRAVOS_APP_URL,
  bravhas: process.env.NEXT_PUBLIC_BRAVHAS_APP_URL,
  bravhos: process.env.NEXT_PUBLIC_BRAVHOS_APP_URL,
  bravmsg: process.env.NEXT_PUBLIC_BRAVMSG_APP_URL,
  bravacademy: process.env.NEXT_PUBLIC_BRAVACADEMY_APP_URL,
  bravvideo: process.env.NEXT_PUBLIC_BRAVVIDEO_APP_URL,
};

function normalizeOfficialUrl(raw?: string) {
  const value = raw?.trim();
  if (!value) return null;

  try {
    const url = new URL(value);
    const blockedHosts = new Set(["localhost", "127.0.0.1", "0.0.0.0"]);
    if (url.protocol !== "https:" || blockedHosts.has(url.hostname) || url.hostname.endsWith(".local")) {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
}

function statusWithoutPublicAccess(product: Product): ProductAccessStatus {
  if (product.status === "Em homologação") return "EM HOMOLOGAÇÃO";
  return "EM DESENVOLVIMENTO";
}

export function getProductAccess(product: Product): ProductAccess {
  const loginHref = normalizeOfficialUrl(configuredUrls[product.slug]);

  return {
    slug: product.slug,
    name: product.name,
    category: product.category,
    description: product.description,
    commercialHref: `/${product.slug}`,
    loginHref,
    status: loginHref ? "ACESSO DISPONÍVEL" : statusWithoutPublicAccess(product),
  };
}

export const productAccessCatalog = products.map(getProductAccess);
