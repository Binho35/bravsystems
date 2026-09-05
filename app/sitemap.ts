import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://bravsystems.com.br";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...products.map((product) => ({
      url: `${base}/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: product.slug === "bravvideo" ? 0.6 : 0.8,
    })),
    { url: `${base}/politica-de-privacidade`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];
}
