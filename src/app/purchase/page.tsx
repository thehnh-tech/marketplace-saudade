import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Purchase Conditions",
  description: "Pricing, payment, worldwide shipping, returns, and warranty for SAUDADE Night Access drops.",
  alternates: { canonical: "/purchase" },
  openGraph: { type: "article", title: "SAUDADE — Purchase Conditions", url: absoluteUrl("/purchase") },
  robots: { index: true, follow: true }
};

export default function PurchasePage() {
  return (
    <LegalLayout
      pathname="/purchase"
      eyebrow="Legal"
      title="Purchase Conditions"
      intro="These conditions apply to every order placed on saudade.thehnh.tech. They detail prices, payment, shipping (worldwide), returns, and after-sales support."
      updated="April 2026"
      sections={[
        {
          heading: "1. Prices",
          body: [
            "Prices are displayed in EUR and include applicable VAT for the European Union. Customs duties for orders outside the EU are at the buyer's expense.",
            "We reserve the right to change prices between drops. The price displayed at checkout is the price you pay."
          ]
        },
        {
          heading: "2. Payment",
          body: [
            "Payment is processed securely by Stripe. We accept major credit cards, Apple Pay, Google Pay, and selected local payment methods, depending on your country.",
            "Your order is confirmed once Stripe authorises the payment. You receive a confirmation email immediately after."
          ]
        },
        {
          heading: "3. Shipping",
          body: [
            "SAUDADE ships worldwide. Standard shipping is dispatched from our Swiss warehouse within 3 to 5 business days after the order is placed.",
            "Estimated delivery: 2 to 5 business days inside Europe, 5 to 12 business days outside Europe.",
            "A tracking number is sent by email once the parcel leaves the warehouse."
          ]
        },
        {
          heading: "4. Customs & taxes outside the EU",
          body: [
            "For destinations outside the European Union, the buyer is responsible for any local import duties, VAT, or fees applied by customs.",
            "We declare the real value of the goods on every shipping label."
          ]
        },
        {
          heading: "5. Right of withdrawal",
          body: [
            "European Union customers have 14 days from the day the order is delivered to withdraw from the contract without justification.",
            "To exercise this right, send an email to hello@saudade.thehnh.tech. The product must be returned unworn and unwashed, with the original packaging."
          ]
        },
        {
          heading: "6. Returns & exchanges",
          body: [
            "We accept returns for size or fit issues within 14 days of delivery. Return shipping is at the customer's expense, except in case of a manufacturing defect.",
            "Exchanges depend on stock availability of the requested size."
          ]
        },
        {
          heading: "7. Refunds",
          body: [
            "Once the returned product is received and inspected, refunds are processed within 7 business days using the original payment method.",
            "Original shipping costs are refunded only when the return is due to a manufacturing defect or a shipping error from us."
          ]
        },
        {
          heading: "8. Warranty",
          body: [
            "Every SAUDADE garment is covered by the legal conformity warranty applicable in your country.",
            "If you discover a defect, contact us within 30 days of delivery and we will arrange a replacement or a refund."
          ]
        },
        {
          heading: "9. Care",
          body: [
            "Heavy cotton tees soften over time. To preserve the print, wash inside out at 30°C and avoid tumble drying."
          ]
        }
      ]}
    />
  );
}
