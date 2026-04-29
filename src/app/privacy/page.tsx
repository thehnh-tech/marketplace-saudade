import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy & Conditions of Use",
  description: "How SAUDADE collects, stores, and uses data across the marketplace and the Night Access app.",
  alternates: { canonical: "/privacy" },
  openGraph: { type: "article", title: "SAUDADE — Privacy & Conditions of Use", url: absoluteUrl("/privacy") },
  robots: { index: true, follow: true }
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      pathname="/privacy"
      eyebrow="Legal"
      title="Privacy & Conditions of Use"
      intro="This page explains how SAUDADE handles personal data on saudade.thehnh.tech and inside the Night Access app, and the conditions under which you can use the service."
      updated="April 2026"
      sections={[
        {
          heading: "1. Data we collect",
          body: [
            "Order data: name, billing and shipping address, email, phone number, items purchased, payment confirmation from Stripe.",
            "Account & feed data: the unique Night Access link tied to your garment, the photos sent to your feed, and the timestamps of those events.",
            "Technical data: IP address, browser, device type, basic analytics on which pages are visited."
          ]
        },
        {
          heading: "2. Why we collect it",
          body: [
            "To process your order, ship the product worldwide, and answer support requests.",
            "To run the Night Access feed: storing photos, linking them to the right garment, and protecting access.",
            "To improve the site, debug issues, and prevent abuse."
          ]
        },
        {
          heading: "3. Payment",
          body: [
            "Payments are processed by Stripe. We never store your full card number on our servers. Stripe acts as an independent data controller for the payment data they receive.",
            "You can review Stripe's privacy policy on stripe.com."
          ]
        },
        {
          heading: "4. Sharing",
          body: [
            "We share data only with providers strictly needed to run the service: Stripe (payments), our shipping carriers (delivery), and our cloud and email providers.",
            "We do not sell personal data."
          ]
        },
        {
          heading: "5. Storage & retention",
          body: [
            "Order data is stored for the period required by accounting law (10 years in Switzerland and the EU).",
            "Photos sent through Night Access stay in your feed until you delete them or close your account."
          ]
        },
        {
          heading: "6. Your rights",
          body: [
            "You can request access, rectification, deletion, or portability of your data at any time by writing to hello@saudade.thehnh.tech.",
            "If a request is not handled to your satisfaction, you can contact your local data protection authority."
          ]
        },
        {
          heading: "7. Cookies",
          body: [
            "SAUDADE uses a minimal cookie set: a session cookie for the cart, and aggregated analytics. We do not use third-party advertising cookies.",
            "You can clear cookies at any time from your browser settings."
          ]
        },
        {
          heading: "8. Conditions of use",
          body: [
            "You agree to use the site and the app for lawful purposes only, not to attempt to gain access to other users' feeds, and not to upload content that is illegal, hateful, or violates someone else's privacy.",
            "We may suspend access if these conditions are not respected."
          ]
        }
      ]}
    />
  );
}
