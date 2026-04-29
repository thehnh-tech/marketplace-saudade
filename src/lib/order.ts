import type { Product } from "@/data/products";

export type DraftOrder = {
  id: string;
  productId: string;
  title: string;
  variant: string;
  size: string;
  quantity: number;
  amountTotal: number;
  currency: "eur";
  status: "draft";
  stripeSessionId: string;
  customerEmail: string;
  createdAt: string;
};

export function createDraftOrder(product: Product, variant: string, size: string): DraftOrder {
  return {
    id: `draft-${Date.now()}`,
    productId: product.id,
    title: product.title,
    variant,
    size,
    quantity: 1,
    amountTotal: product.price,
    currency: "eur",
    status: "draft",
    stripeSessionId: "",
    customerEmail: "",
    createdAt: new Date().toISOString()
  };
}
