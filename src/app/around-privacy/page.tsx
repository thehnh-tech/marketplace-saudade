import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Picture me around — Privacy Policy",
  description: "How the Picture me around app handles location, photos, and account data — consent, 7-day retention, owner approval, and your nLPD/GDPR rights.",
  alternates: { canonical: "/around-privacy" },
  openGraph: { type: "article", title: "Picture me around — Privacy Policy", url: absoluteUrl("/around-privacy") },
  robots: { index: true, follow: true }
};

export default function AroundPrivacyPage() {
  return (
    <LegalLayout
      pathname="/around-privacy"
      eyebrow="Legal"
      title="Picture me around — Privacy Policy"
      intro="Picture me around is a proximity photo app: someone opens an 'around' at a party, people physically nearby join it, capture photos during the open window, and the circle keeps them for 7 days. This page explains exactly what data the app processes, why, for how long, and the rights you have over it."
      updated="August 2026"
      sections={[
        {
          heading: "1. Data we collect",
          body: [
            "Account data: an anonymous identifier from Apple or Google Sign-In, your chosen pseudo, and — if the provider shares it — a verified email address used only to link sign-in methods to the same account and to answer support requests. Your email is never shown to other users.",
            "Device data: an installation identifier, a push notification token, platform and app version — used to deliver notifications and to sign you out of lost devices.",
            "Photos: the front/back photos you capture inside an around, with technical metadata (file size, format, capture time).",
            "Location data: GPS fixes, only in the situations described in section 2. We never collect your contacts, your photo library, or advertising identifiers, and we do not track you across other apps or websites."
          ]
        },
        {
          heading: "2. Location: consent, verification at join, Radar",
          body: [
            "Your location is processed only with your consent, expressed through the iOS location permission prompts, and only for two purposes.",
            "Joining an around: when you tap Join, the app takes two fresh GPS fixes and sends them to our server, which verifies that you are physically inside the around's radius. These fixes are kept as a join audit record for the around's lifetime (to detect location spoofing) and deleted with it.",
            "Radar (optional): if you enable the Radar toggle, the app periodically shares your approximate position in the background so we can notify you when an around opens nearby. Radar is strictly opt-in, is explained before the system permission is requested, and can be revoked at any time from Settings — the app is fully functional without it.",
            "We never build a location history. The Radar position is a single record per account that is overwritten by each update and automatically deleted after at most one hour without a refresh. Past positions are not retained, and push notifications never contain coordinates."
          ]
        },
        {
          heading: "3. Photos of identifiable people",
          body: [
            "Photos captured at a party will often show identifiable people. If you upload a photo, you are responsible for it: you confirm that the people who appear in it do not object to it being shared within the around's private circle.",
            "Anyone who appears in a photo — whether or not they use the app — can request its removal by using the in-app report feature or by writing to the contact address below. Reported content is reviewed and, where justified, taken down within 24 hours.",
            "Photos are never public: they are visible only to the members of the around, behind authenticated, signed URLs, and only after the owner has approved them (see section 5)."
          ]
        },
        {
          heading: "4. Retention: 7 days",
          body: [
            "Photos live in the around's circle for 7 days after the capture window closes. After that, they are automatically deleted from our servers and from our image host (Cloudinary), including the blurred previews and cached copies (CDN invalidation is requested at deletion).",
            "Join audit records, memberships, and reports tied to an around are deleted with it. Account data is kept while your account exists, and deleted when you delete your account (section 7)."
          ]
        },
        {
          heading: "5. Owner approval",
          body: [
            "The person who opened the around acts as its first-level moderator. They see submitted photos in clear before anyone else, and approve or reject them one by one.",
            "Until a photo is approved, other members only see a blurred, low-resolution version. Rejected photos remain visible only to the person who took them. This is enforced server-side: the clear image URL is simply never issued to anyone who is not entitled to it."
          ]
        },
        {
          heading: "6. Saving and sharing: what ephemeral really means",
          body: [
            "Photos disappear from the circle after 7 days — but ephemerality cannot be guaranteed beyond that. Members of the around can save an approved photo to their camera roll or share it through other apps. A saved or shared photo is a copy that lives outside the app and outside our control: we cannot delete it.",
            "We say this plainly because we would rather be honest than reassuring: only post photos you are comfortable with the members of the circle keeping."
          ]
        },
        {
          heading: "7. Your rights & deleting your account",
          body: [
            "Under the Swiss Federal Act on Data Protection (nLPD) and the GDPR, you can request access to, rectification of, deletion of, or a portable copy of your data at any time by writing to the contact address below.",
            "You can also delete your account directly in the app (Settings → Delete my account). Deletion cascades immediately: your photos are removed from our servers and from Cloudinary, your device records and Radar position are erased, and your memberships are anonymised. Arounds you created are closed.",
            "If a request is not handled to your satisfaction, you can contact the Swiss Federal Data Protection and Information Commissioner (FDPIC) or your local data protection authority."
          ]
        },
        {
          heading: "8. Processors we rely on",
          body: [
            "We share data only with the processors strictly needed to run the service: Cloudinary (photo storage and delivery, with authenticated access), Expo (push notification delivery), MongoDB Atlas (database hosting), and Resend (transactional email, e.g. moderation alerts).",
            "Each processor only receives the data required for its role. We do not sell personal data, and we do not share it with advertisers."
          ]
        },
        {
          heading: "9. Contact",
          body: [
            "For any privacy question, data request, or takedown request concerning Picture me around, write to hello@saudade.thehnh.tech. Takedown requests for photos of identifiable people are treated as a priority and handled within 24 hours."
          ]
        }
      ]}
    />
  );
}
