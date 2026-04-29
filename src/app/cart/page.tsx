import type { Metadata } from "next";
import { CartClient } from "@/components/CartClient";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your SAUDADE draft order. Stripe checkout follows.",
  alternates: { canonical: "/cart" },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false }
  }
};

export default function CartPage() {
  return (
    <main className="px-4 py-24 sm:px-6 lg:px-8">
      <CartClient />
    </main>
  );
}
