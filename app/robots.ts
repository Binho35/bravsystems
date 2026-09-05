import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://bravsystems.com.br/sitemap.xml",
    host: "https://bravsystems.com.br",
  };
}
