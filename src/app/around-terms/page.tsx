import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Picture me around — Terms of Use",
  description: "The terms governing the Picture me around app: eligibility, user content and photos of third parties, moderation, ephemerality, and account termination.",
  alternates: { canonical: "/around-terms" },
  openGraph: { type: "article", title: "Picture me around — Terms of Use", url: absoluteUrl("/around-terms") },
  robots: { index: true, follow: true }
};

export default function AroundTermsPage() {
  return (
    <LegalLayout
      pathname="/around-terms"
      eyebrow="Legal"
      title="Picture me around — Terms of Use"
      intro="These Terms govern your use of the Picture me around mobile app. You accept them when you create an account — acceptance is recorded, and you cannot use the app without it. They apply alongside the Picture me around Privacy Policy."
      updated="August 2026"
      sections={[
        {
          heading: "1. Operator",
          body: [
            "Picture me around is operated by thehnh.tech. All references to we, us, or the app refer to thehnh.tech and the Picture me around service.",
            "Contact: hello@saudade.thehnh.tech."
          ]
        },
        {
          heading: "2. Eligibility",
          body: [
            "The app is rated 17+ and is intended for nightlife contexts. You must be at least 17 years old, or older where your local law requires it, to create an account.",
            "One account per person. You are responsible for what happens under your account."
          ]
        },
        {
          heading: "3. The service",
          body: [
            "An around is a temporary photo circle opened at a physical place: it has a radius (up to 300 m) and an open window (1 to 6 hours). Joining requires being physically inside the radius — your position is verified server-side at the moment you join.",
            "During the window, members capture photos in-app. Photos remain blurred for other members until the around's owner approves them one by one. Photos are automatically deleted from the circle 7 days after the window closes.",
            "We may adjust radii, windows, quotas, and rate limits to keep the service safe and available."
          ]
        },
        {
          heading: "4. Your content and people in your photos",
          body: [
            "You keep ownership of the photos you capture. By uploading a photo to an around, you grant us the limited technical licence needed to store, blur, deliver, and delete it as described in the Privacy Policy, and you grant the around's members the right to view it once approved.",
            "You are solely responsible for the content you upload — including for the identifiable people who appear in your photos. Do not upload a photo of someone who objects to it. Anyone who appears in a photo can request its removal, and justified requests are honoured within 24 hours."
          ]
        },
        {
          heading: "5. Acceptable use",
          body: [
            "You must not publish content that is illegal, pornographic, hateful, violent, harassing, or that violates someone's privacy or intellectual property. This applies to every piece of text you choose as well as to your photos — in particular the name you give to an around and your pseudo, both of which are shown to people who have not joined your around, including in the notification announcing that it opened. You must not impersonate others, spoof your GPS position, attempt to access photos you are not entitled to see, or interfere with the service.",
            "Arounds are private circles, not a broadcasting tool. We reserve the right to remove content, close arounds, and suspend or ban accounts that breach these Terms."
          ]
        },
        {
          heading: "6. Moderation, reporting, blocking",
          body: [
            "Every photo can be reported from the app, and every user can be reported or blocked. Blocking is mutual: a blocked user no longer sees your content and you no longer see theirs.",
            "The owner of an around can reject photos and remove members from their circle. Reported content is reviewed and, where justified, removed within 24 hours. Objectionable content and abusive users may be removed or banned without prior notice.",
            "The name of an around is user content in the same sense as a photo: it is subject to section 5, it is filtered when the around is created, and it can be reported by anyone who sees it — including someone who has only received the notification announcing the around and has not joined it. A name that breaches these Terms is removed together with the around it names, and its author may be banned."
          ]
        },
        {
          heading: "7. Ephemerality is not a guarantee",
          body: [
            "Photos disappear from the circle after 7 days — from the circle, not necessarily from the world. Members can save an approved photo to their device or share it outside the app; those copies are outside our control and may persist indefinitely.",
            "Do not rely on the 7-day deletion as a confidentiality guarantee. Only capture and approve photos you and the people in them are comfortable with the circle keeping."
          ]
        },
        {
          heading: "8. Location",
          body: [
            "Joining an around requires location access at the moment of the join; the optional Radar feature uses background location only if you enable it, and can be disabled at any time. Both are described in the Privacy Policy.",
            "Attempting to forge your position (fake GPS, VPN relocation, replayed fixes) is a breach of these Terms and may lead to a ban."
          ]
        },
        {
          heading: "9. Account deletion and termination",
          body: [
            "You can delete your account at any time from the app (Settings → Delete my account). Deletion removes your photos, devices, and Radar position, anonymises your memberships, and closes the arounds you created.",
            "We may suspend or terminate accounts that breach these Terms. Bans take effect immediately across all sessions."
          ]
        },
        {
          heading: "10. Liability",
          body: [
            "The app is provided as is. We do our best to keep it available and to deliver notifications promptly, but we cannot guarantee uninterrupted service, GPS accuracy in every environment, or delivery of every push notification.",
            "To the extent permitted by law, our liability for your use of the app is limited to the amount you paid for it — the app is free, and nothing in these Terms excludes liability that cannot be excluded by law."
          ]
        },
        {
          heading: "11. Governing law",
          body: [
            "These Terms are governed by Swiss law. Any dispute arising from your use of Picture me around will be submitted to the competent courts of Lausanne, Switzerland, unless mandatory consumer law decides otherwise."
          ]
        }
      ]}
    />
  );
}
