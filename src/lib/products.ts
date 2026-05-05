import { products as fallbackProducts, type Product } from "@/data/products";

const API_URL = (
  process.env.API_PUBLIC_URL
  ?? process.env.NEXT_PUBLIC_API_URL
  ?? (process.env.NODE_ENV === "production" ? "https://back-saudade.thehnh.tech" : "http://localhost:4000")
).replace(/\/$/, "");

const productFetchOptions = {
  cache: "no-store",
  headers: { "Cache-Control": "no-cache" }
} as const;

export async function getMarketplaceProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/api/products`, productFetchOptions);
    if (!response.ok) throw new Error("Products unavailable");
    const body = await response.json() as { products?: Product[] };
    return body.products?.length ? body.products : fallbackProducts;
  } catch {
    return fallbackProducts;
  }
}

export async function getMarketplaceProductById(id: string): Promise<Product | undefined> {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`, productFetchOptions);
    if (!response.ok) throw new Error("Product unavailable");
    const body = await response.json() as { product?: Product };
    return body.product;
  } catch {
    return fallbackProducts.find((product) => product.id === id);
  }
}
