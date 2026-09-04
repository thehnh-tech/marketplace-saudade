import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Picture me around — Privacy Policy",
  description: "How the Picture me around app handles location, photos, and account data — required background location, 7-day retention, owner approval, and your nLPD/GDPR rights.",
  alternates: { canonical: "/around-privacy" },
  openGraph: { type: "article", title: "Picture me around — Privacy Policy", url: absoluteUrl("/around-privacy") },
  robots: { index: true, follow: true }
};

export default function AroundPrivacyPage() {
  return (
    <LegalLayout
      pathname="/around-privacy"
      navLinks={[
        { href: "/around-terms", label: "Terms" },
        { href: "/around-privacy", label: "Privacy" }
      ]}
      contact={{ label: "Questions, reports, data requests", address: "around@welock.in" }}
      eyebrow="Legal"
      title="Picture me around — Privacy Policy"
      intro="Picture me around is a proximity photo app: someone opens an 'around' at a party, people physically nearby join it, capture photos during the open window, and the circle keeps them for 7 days. It runs on background location — the Radar — and that permission is required to use the app at all, not an optional extra. This page explains exactly what data the app processes, why, for how long, and the rights you have over it."
      updated="September 2026"
      sections={[
        {
          heading: "1. Data we collect",
          body: [
            "Account data: your chosen public name, and the identity you signed in with — an anonymous identifier from Sign in with Apple or from Google, or an email address with a password we store only as a bcrypt hash. Where an email address exists it is a login credential and the address we answer support at; it is never shown to other users. We also keep your interface language, whether the Radar is on and when you consented to it, which version of the terms you accepted and when, your account status, and the dates you created the account and last used it.",
            "Signups in progress: if you start creating an email account and never confirm it, your email address, chosen public name and password hash sit in a pending record that deletes itself after 24 hours. Verification codes are stored as keyed digests, never in clear, and expire in 15 minutes.",
            "Device data: an installation identifier, a push notification token, the platform, the app and OS versions, whether notifications are allowed, and when the device was last active. The push token delivers notifications and also lets our server wake the app silently to refresh your Radar position (section 2). A copy of the token is kept for up to 7 days with each notification we send, so we can read back whether it arrived.",
            "Photos: the front/back photos you capture inside an around, with technical metadata (file size, format, capture time).",
            "Location data: GPS positions, in the situations described in section 2 — which include opening an around, browsing the ones near you, joining one, and the Radar running in the background.",
            "Connection data: like any online service, our server receives the IP address your device uses for each request. We use it in transit for abuse prevention, for rate limiting, and to compare the country your connection appears to come from against the position your phone reports. We do not store it on your account or in any join record. What persists from it is a rate-limiting counter whose key contains your IP address (for IPv6, only the first half of it) for the length of the rate-limit window, and our server logs.",
            "We never collect your contacts, your photo library, or advertising identifiers, and we do not track you across other apps or websites."
          ]
        },
        {
          heading: "2. Location: the Radar, opening, browsing, joining",
          body: [
            "The Radar is required, and we would rather say so here than let you find out. Picture me around exists to tell you that something is happening around you right now; an app that only looks while it is open cannot do that, because nobody has it open when the thing starts. So the app asks for the always-on location permission from a screen that explains it first, and until you grant it the app shows that screen and nothing else. Declining leaves you with an app you cannot use, rather than a smaller one.",
            "What the Radar does: while it is on, your phone sends its position to our server, and we notify you when an around opens near you and when you walk into one that is already open. Your position is sent as your phone moves; every five minutes, re-sending the last position it already knew; when you open the app; when our server sends your phone a silent, invisible notification asking it to refresh, which we do when an around opens and we have no recent position for you; and when your phone crosses into an area we asked it to watch. Those areas are the open arounds near you: after each update our server tells your phone roughly where they are, snapped to a 100-metre grid and never at their true centre.",
            "What we keep from it: exactly one position per account. Each update overwrites the previous one, and it is deleted one hour after the last update, when you switch the Radar off, and when you delete your account. There is no location history at any point, and notifications never contain coordinates.",
            "Opening an around: the position you are standing at becomes the centre of the around you create. That one is stored exactly, for as long as the around exists — its open window plus 7 days — because it is the circle itself. It is erased when the around is purged and when you delete your account. Other members are shown distances, never the centre.",
            "Browsing: while the app is open it asks our server, about every thirty seconds, which arounds are near you, sending your current position. We answer with distances rounded up to 50 metres and measured from a point deliberately offset from the true centre, so that repeated requests cannot be used to locate anyone.",
            "Joining: when you tap Join, the app takes two fresh GPS readings and sends them to our server, which checks that you are physically inside the radius. The readings themselves are not kept. What we store on your membership is three numbers per reading — its accuracy, its timestamp and your distance to the centre — plus the distance between the two readings and a flag if something looked implausible.",
            "Anti-spoofing check: at that same moment, and on every browse, we compare the position your phone reports against the country your IP address appears to come from. A gross mismatch blocks the join, or degrades a browse; a moderate one flags the membership for a moderator. Neither the IP address nor the area derived from it is stored on your account or on your membership.",
            "One trail we do keep: so that the same around never notifies you twice, we record which arounds you have been notified about — the around, your account, when, and which of the paths above triggered it. It holds no coordinates, is deleted with the around and when you delete your account, and expires on its own after 8 days."
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
            "Photos live in the around's circle for 7 days after the capture window closes. After that they are deleted from our servers and from our image host (Cloudinary), including the blurred previews and the cached copies (we ask the CDN to invalidate them at deletion). The deletion runs on a sweep rather than on the exact second, so in practice it lands within a day of the 7-day mark.",
            "Deleted with the around: every membership and its join record, the reports attached to it, the notification trail described in section 2, and the photos. The around itself is kept as counters and dates only — its name, its centre and its list of removed members are erased.",
            "The Radar position lasts at most one hour after your phone last spoke (section 2). Notification receipts, which hold a push token, last 7 days. Account data is kept while your account exists and deleted when you delete it (section 7)."
          ]
        },
        {
          heading: "5. Owner approval",
          body: [
            "The person who opened the around acts as its first-level moderator. They see submitted photos in clear before anyone else, and approve or reject them one by one.",
            "Until a photo is approved, other members only see a blurred, low-resolution version. Rejected photos remain visible only to the person who took them. This is enforced on our server: the clear image URL is never issued to anyone who is not entitled to it.",
            "Two limits worth stating. A photo that is reported is also shown in clear to our moderators, which is how a report can be acted on at all. And the image links we issue are signed URLs: once one has been issued to someone entitled to it, that link keeps working until the photo is deleted — leaving the around, being removed from it, being blocked, or deleting your account do not retroactively break a link already handed out."
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
            "You can also delete your account directly in the app (Settings → Delete my account). Deletion cascades immediately. Removed: your photos, from our servers and from Cloudinary; your device records and notification receipts; your Radar position; your notification trail; the accounts you had blocked and the reports you filed or that were filed against you; any pending email verification. Your memberships are anonymised — the join numbers are emptied and the membership is stamped as anonymised. The arounds you opened are closed, and their name and centre erased. If you signed in with Apple, we revoke that grant with Apple.",
            "Two things deliberately outlive the account. Your public name is reserved for 30 days, so that nobody can take it and be mistaken for you; only the lowercased name is kept, with no link to the account. And entries in our moderation journal are kept as the record that a decision was made, unlinked from your account.",
            "If a request is not handled to your satisfaction, you can contact the Swiss Federal Data Protection and Information Commissioner (FDPIC) or your local data protection authority."
          ]
        },
        {
          heading: "8. Processors we rely on",
          body: [
            "We share data only with the processors strictly needed to run the service: Cloudinary (photo storage and delivery, with authenticated access), Expo (push notification delivery, including the silent ones described in section 2), MongoDB Atlas (database hosting), Vercel (hosting of our server and its logs), and Resend (transactional email — the verification codes for email accounts, and moderation alerts).",
            "When you sign in with Apple or with Google, your device talks to them directly and we verify with them that the identity token is genuine; if you later delete an Apple-based account, we ask Apple to revoke the grant.",
            "These providers operate in Switzerland, the European Union and the United States, so your data may be processed outside your country. Each one only receives the data required for its role. We do not sell personal data, and we do not share it with advertisers."
          ]
        },
        {
          heading: "9. Contact",
          body: [
            "For any privacy question, data request, or takedown request concerning Picture me around, write to around@welock.in. Takedown requests for photos of identifiable people are treated as a priority and handled within 24 hours."
          ]
        }
      ]}
    />
  );
}
