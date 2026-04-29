import type { MetadataRoute } from "next";
import { getMarketplaceProducts } from "@/lib/products";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getMarketplaceProducts();
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: "/", priority: 1, changeFrequency: "weekly" as const },
      { url: "/shop", priority: 0.95, changeFrequency: "weekly" as const },
      { url: "/concept", priority: 0.7, changeFrequency: "monthly" as const },
      { url: "/app-experience", priority: 0.7, changeFrequency: "monthly" as const },
      { url: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
      { url: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
      { url: "/purchase", priority: 0.4, changeFrequency: "yearly" as const }
    ] as const
  ).map((entry) => ({ ...entry, url: `${SITE_URL}${entry.url}`, lastModified }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/product/${product.id}`,
    lastModified,
    priority: 0.9,
    changeFrequency: "weekly"
  }));

  return [...staticRoutes, ...productRoutes];
}
