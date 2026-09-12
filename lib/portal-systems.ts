export type PortalEnvironment = "production" | "homologation" | "preview" | "development";

export type PortalSystem = {
  slug: "bravos" | "bravacademy" | "bravhos" | "bravmsg" | "bravhas" | "bravvideo";
  name: string;
  environment: PortalEnvironment;
  environmentLabel: string;
  status: string;
  description: string;
  productHref: string;
  accessUrl: string | null;
  accessLabel: "ACESSAR SISTEMA" | "ABRIR PREVIEW";
};

/**
 * URLs de acesso ficam deliberadamente nulas até certificação explícita por Argos.
 * Para ativar um produto futuramente, basta preencher accessUrl com a URL homologada;
 * a camada visual não precisa ser redesenhada.
 */
export const portalSystems: PortalSystem[] = [
  {
    slug: "bravos",
    name: "BravOS",
    environment: "preview",
    environmentLabel: "PREVIEW",
    status: "PREVIEW — EM HOMOLOGAÇÃO",
    description: "Operação e gestão para restaurantes.",
    productHref: "/bravos",
    accessUrl: null,
    accessLabel: "ABRIR PREVIEW",
  },
  {
    slug: "bravacademy",
    name: "BravAcademy",
    environment: "development",
    environmentLabel: "EM DESENVOLVIMENTO",
    status: "EM DESENVOLVIMENTO — ACESSO WEB EM IMPLANTAÇÃO",
    description: "Universidade corporativa white label.",
    productHref: "/bravacademy",
    accessUrl: null,
    accessLabel: "ACESSAR SISTEMA",
  },
  {
    slug: "bravhos",
    name: "BravHOS",
    environment: "development",
    environmentLabel: "EM DESENVOLVIMENTO",
    status: "EM DESENVOLVIMENTO — PREVIEW WEB EM PREPARAÇÃO",
    description: "RH, DP e gestão de pessoas.",
    productHref: "/bravhos",
    accessUrl: null,
    accessLabel: "ABRIR PREVIEW",
  },
  {
    slug: "bravmsg",
    name: "BravMsg",
    environment: "development",
    environmentLabel: "EM DESENVOLVIMENTO",
    status: "EM DESENVOLVIMENTO",
    description: "Comunicação, campanhas e relacionamento.",
    productHref: "/bravmsg",
    accessUrl: null,
    accessLabel: "ACESSAR SISTEMA",
  },
  {
    slug: "bravhas",
    name: "BravHAS",
    environment: "development",
    environmentLabel: "EM DESENVOLVIMENTO",
    status: "EM DESENVOLVIMENTO / AMBIENTE A AUDITAR",
    description: "Head Administrative System.",
    productHref: "/bravhas",
    accessUrl: null,
    accessLabel: "ABRIR PREVIEW",
  },
  {
    slug: "bravvideo",
    name: "BravVideo",
    environment: "development",
    environmentLabel: "EM DESENVOLVIMENTO",
    status: "EM DESENVOLVIMENTO",
    description: "Produção audiovisual corporativa com IA.",
    productHref: "/bravvideo",
    accessUrl: null,
    accessLabel: "ACESSAR SISTEMA",
  },
];
