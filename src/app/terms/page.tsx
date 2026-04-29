import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing the use of saudade.thehnh.tech and the SAUDADE Night Access experience.",
  alternates: { canonical: "/terms" },
  openGraph: { type: "article", title: "SAUDADE — Terms of Service", url: absoluteUrl("/terms") },
  robots: { index: true, follow: true }
};

export default function TermsPage() {
  return (
    <LegalLayout
      pathname="/terms"
      eyebrow="Legal"
      title="Terms of Service"
      intro="These Terms govern your use of saudade.thehnh.tech, the SAUDADE marketplace, and the Night Access app. By browsing the site or placing an order, you accept these Terms."
      updated="April 2026"
      sections={[
        {
          heading: "1. Operator",
          body: [
            "SAUDADE is operated by thehnh.tech. All references to we, us, or SAUDADE refer to thehnh.tech and its drop SAUDADE 0024.",
            "Headquarters and contact: hello@saudade.thehnh.tech."
          ]
        },
        {
          heading: "2. Eligibility",
          body: [
            "You must be at least 16 years old to browse the site and 18 years old, or the age of majority in your country, to place an order.",
            "By placing an order you confirm that the billing and shipping information you provide is accurate."
          ]
        },
        {
          heading: "3. Products",
          body: [
            "SAUDADE drops are produced in limited quantities. Visuals on the site are representative; small variations in fabric, print intensity and stitching can occur on heavy cotton garments.",
            "The QR code printed on each tee is part of the design and links to the SAUDADE Night Access flow described on the Concept page."
          ]
        },
        {
          heading: "4. Account & Night Access",
          body: [
            "Each garment ships with a unique Night Access link. The owner of that link controls the private feed where photos sent through the QR are stored.",
            "You are responsible for keeping your access credentials private. If you believe access has been compromised, contact us immediately."
          ]
        },
        {
          heading: "5. Acceptable use",
          body: [
            "You agree not to use SAUDADE to upload illegal content, harass other users, scrape the site, or attempt to bypass the access control of another person's feed.",
            "We reserve the right to suspend feeds and orders that breach these Terms."
          ]
        },
        {
          heading: "6. Intellectual property",
          body: [
            "All artwork, copy, brand assets, and code on saudade.thehnh.tech are owned by SAUDADE and thehnh.tech and may not be reproduced without written authorisation.",
            "Photos sent through Night Access remain the property of the people who took them. By sending a photo through the QR, the sender grants the garment owner a private, non-commercial right to keep it in their feed."
          ]
        },
        {
          heading: "7. Liability",
          body: [
            "SAUDADE is provided as is. We do our best to keep the site and the Night Access app available, but we cannot guarantee uninterrupted service.",
            "To the extent permitted by law, our liability is limited to the amount you paid for your order."
          ]
        },
        {
          heading: "8. Governing law",
          body: [
            "These Terms are governed by Swiss law. Any dispute arising from your use of SAUDADE will be submitted to the competent courts of Lausanne, Switzerland, unless mandatory consumer law decides otherwise."
          ]
        }
      ]}
    />
  );
}
