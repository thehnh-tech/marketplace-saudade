import type { Metadata, Viewport } from "next";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Camera, Check, ChevronDown, Eye, Radio, ShieldCheck } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import styles from "./page.module.css";

type Language = "fr" | "en";
type PageProps = { searchParams: Promise<{ lang?: string | string[] }> };

const SITE = "https://around.thehnh.tech";
const SUPPORT = "mailto:around@welock.in";
const PRIVACY = "https://saudade.thehnh.tech/around-privacy";
const TERMS = "https://saudade.thehnh.tech/around-terms";

const copy = {
  fr: {
    title: "Picture me around — Une soirée. Tous les regards.",
    description: "Ouvrez un cercle photo avec les personnes autour de vous. Capturez votre soirée, découvrez les regards des autres et retrouvez vos photos pendant sept jours.",
    navHow: "Le principe", navQuestions: "Les réponses", navContact: "Nous contacter",
    language: "Choisir la langue", eyebrow: "Les photos de votre soirée, ensemble",
    heroFirst: "Une soirée.", heroSecond: "Tous les regards.",
    intro: "Vous étiez au même endroit. Retrouvez les moments que chacun a vus, dans un cercle photo ouvert autour de vous.",
    cta: "Découvrir le principe", status: "Nouvelle version iPhone en préparation",
    orbitNote: "Un lieu. Un cercle. Vos regards.", orbitCaption: "Illustration du cercle de proximité",
    stats: [{ value: "50–300", unit: "mètres autour de vous" }, { value: "1 · 3 · 6", unit: "heures pour capturer" }, { value: "7", unit: "jours pour revivre" }],
    storyEyebrow: "Sur place, ensemble",
    storyFirst: "Votre point de vue.", storySecond: "Et tous ceux d’à côté.",
    story: "Le sourire de l’autre côté de la table. Le selfie en plein refrain. Le moment que vous avez manqué. Un around rassemble les photos des personnes présentes dans un même cercle.",
    howEyebrow: "Comment ça marche", howTitle: "Lancez la soirée.\nLe cercle fait le lien.",
    steps: [
      { title: "Ouvrez votre around.", text: "Donnez-lui un nom. Choisissez un rayon de 50 à 300 mètres et une durée de 1, 3 ou 6 heures. Les personnes dans le rayon peuvent rejoindre le cercle tant qu’il est ouvert.", detail: "Un cercle ancré là où vous êtes" },
      { title: "Capturez votre regard.", text: "Prenez vos photos dans l’app : caméra arrière, selfie ou mode Double. La scène et votre réaction, réunies dans une paire recto-verso.", detail: "Trois modes, un même moment" },
      { title: "Découvrez les autres.", text: "L’hôte approuve chaque photo avant qu’elle devienne nette pour le cercle. En attendant, les autres membres voient un aperçu flouté. Vous voyez toujours vos propres photos.", detail: "Une approbation, puis le partage" }
    ],
    radarEyebrow: "Le Radar", radarTitle: "Le moment est\njuste autour.",
    radarText: "Un around s’ouvre près de vous. Ou vous arrivez dans le rayon d’un cercle déjà ouvert. Avec les notifications activées, le Radar peut vous prévenir, même lorsque l’app n’est pas au premier plan.",
    radarNote: "La localisation « Toujours » est nécessaire pour utiliser le Radar et l’app. Les notifications restent facultatives.",
    radarFacts: ["Une seule position Radar, remplacée à chaque mise à jour", "Effacée une heure après le dernier envoi", "Aucun historique des positions Radar"],
    radarPrivacy: "Comprendre la localisation", radarMini: "Le Radar rapproche les moments.",
    sevenEyebrow: "L’après-soirée", sevenTitle: "Les souvenirs restent.\nLe cercle s’efface.",
    sevenText: "Retrouvez les photos du cercle pendant 7 jours après la fermeture des prises de vue. Enregistrez ou partagez vos photos approuvées préférées avant leur suppression.",
    sevenNote: "Les copies enregistrées ou partagées hors de l’app peuvent subsister. La suppression des serveurs est effectuée lors du passage de nettoyage suivant.",
    sevenLabel: "jours après la fermeture",
    controls: "Vous gardez la main.", controlsText: "Signalez du contenu ou bloquez un compte dans l’app. Vous pouvez supprimer votre compte depuis les réglages. L’hôte peut refuser des photos et retirer des membres du cercle.",
    faqEyebrow: "Les réponses", faqTitle: "Avant d’ouvrir\nvotre premier cercle.",
    faqs: [
      { q: "Qui peut rejoindre mon around ?", a: "Les personnes physiquement dans le rayon choisi peuvent le rejoindre pendant sa période d’ouverture. L’app vérifie leur position au moment de rejoindre. Un around n’est pas réservé à une liste d’invités : des personnes à proximité peuvent le découvrir." },
      { q: "Qui voit mes photos ?", a: "Vous voyez vos propres photos et l’hôte les voit pour les examiner. Avant approbation, les autres membres du cercle voient un aperçu flouté. Après approbation, la photo devient nette pour les membres. Les photos signalées peuvent aussi être examinées par la modération." },
      { q: "Pourquoi demander la localisation « Toujours » ?", a: "Le Radar sert à vous prévenir lorsqu’un around s’ouvre près de vous ou lorsque vous entrez dans son rayon. Cette fonction nécessite la localisation en arrière-plan. Vous pouvez désactiver le Radar dans les réglages ; l’app revient alors à son écran d’explication. La position du créateur d’un around est aussi conservée comme centre du cercle pendant sa durée de vie. Les détails figurent dans la politique de confidentialité." },
      { q: "Les photos disparaissent-elles vraiment ?", a: "Elles quittent le cercle 7 jours après la fermeture des prises de vue, avec un nettoyage des serveurs lors du passage suivant, généralement dans la journée. Une copie enregistrée sur un téléphone ou partagée ailleurs peut rester en dehors de l’app. Ne publiez que des photos que les personnes présentes sont à l’aise de partager." },
      { q: "Quand pourrai-je télécharger cette expérience ?", a: "La nouvelle expérience Picture me around pour iPhone est en préparation. Cette page présente ses fonctionnalités ; nous ajouterons le lien de téléchargement lorsqu’elle sera disponible. L’app est proposée en français et en anglais." }
    ],
    supportEyebrow: "Parlons-en", supportTitle: "Une question ?\nOn est juste ici.",
    supportText: "Assistance, signalement de contenu ou demande concernant vos données : écrivez à notre équipe.",
    supportAction: "Écrire à l’équipe", supportHint: "Pour un problème, indiquez votre modèle d’iPhone, la version de l’app et ce qui s’est passé. Ne partagez jamais votre mot de passe.",
    footerTag: "Les moments se vivent. Les regards se partagent.", privacy: "Confidentialité", terms: "Conditions d’utilisation", operator: "Un projet de thehnh.tech", availability: "iPhone · Français / English"
  },
  en: {
    title: "Picture me around — One night. Everyone’s perspective.",
    description: "Open a photo circle with the people around you. Capture your night, discover everyone’s perspective and revisit the shared photos for seven days.",
    navHow: "How it works", navQuestions: "Good to know", navContact: "Get in touch",
    language: "Choose a language", eyebrow: "Your party photos, together",
    heroFirst: "One night.", heroSecond: "Every perspective.",
    intro: "You were in the same place. Bring together the moments everyone saw, in a photo circle opened around you.",
    cta: "See how it works", status: "New iPhone experience in preparation",
    orbitNote: "One place. One circle. Your perspectives.", orbitCaption: "An illustration of a nearby photo circle",
    stats: [{ value: "50–300", unit: "metres around you" }, { value: "1 · 3 · 6", unit: "hours to capture" }, { value: "7", unit: "days to relive it" }],
    storyEyebrow: "In the moment, together",
    storyFirst: "Your point of view.", storySecond: "And everyone else’s.",
    story: "The smile across the table. The selfie in the middle of the chorus. The moment you missed. An around brings photos from the people who are there into one shared circle.",
    howEyebrow: "How it works", howTitle: "Start the night.\nLet the circle connect it.",
    steps: [
      { title: "Open your around.", text: "Give it a name. Choose a radius from 50 to 300 metres and a 1, 3 or 6-hour window. People within the radius can join while the circle is open.", detail: "A circle anchored where you are" },
      { title: "Capture your side.", text: "Take photos in the app with the back camera, a selfie or Double mode. The scene and your reaction, together in a front-and-back pair.", detail: "Three modes, one shared moment" },
      { title: "Discover the others.", text: "The host approves each photo before it becomes clear to the circle. Until then, other members see a blurred preview. You can always see your own photos.", detail: "An approval, then a shared perspective" }
    ],
    radarEyebrow: "The Radar", radarTitle: "The moment is\nright around you.",
    radarText: "An around opens nearby. Or you arrive within a circle that is already open. With notifications enabled, Radar can let you know, even when the app is in the background.",
    radarNote: "Always location permission is required to use Radar and the app. Notifications are optional.",
    radarFacts: ["One Radar position, replaced with each update", "Erased an hour after the last update", "No history of Radar positions"],
    radarPrivacy: "Understand location use", radarMini: "Radar brings nearby moments closer.",
    sevenEyebrow: "The morning after", sevenTitle: "Keep the memories.\nLet the circle fade.",
    sevenText: "Revisit the circle’s photos for 7 days after the camera window closes. Save or share approved favourites before they leave.",
    sevenNote: "Copies saved or shared outside the app may remain. Server deletion happens on the next scheduled cleanup.",
    sevenLabel: "days after the window closes",
    controls: "You stay in control.", controlsText: "Report content or block an account in the app. You can delete your account in Settings. The host can reject photos and remove people from the circle.",
    faqEyebrow: "Good to know", faqTitle: "Before you open\nyour first circle.",
    faqs: [
      { q: "Who can join my around?", a: "People physically within your chosen radius can join while the circle is open. The app checks their location when they join. An around is not limited to an invitation list: people nearby can discover it." },
      { q: "Who can see my photos?", a: "You see your own photos and the host sees them for review. Before approval, other circle members see a blurred preview. Once approved, a photo becomes clear to the members. Reported photos may also be reviewed by moderators." },
      { q: "Why does the app ask for Always location?", a: "Radar lets you know when an around opens near you or when you enter its radius. It needs background location to do this. You can turn Radar off in Settings; the app then returns to its explanation screen. The location of someone who creates an around is also kept as the circle’s centre for its lifetime. The privacy policy explains the details." },
      { q: "Do the photos really disappear?", a: "They leave the circle 7 days after the camera window closes, with server cleanup on the next sweep, generally within a day. A copy saved on a phone or shared elsewhere can remain outside the app. Only post photos that the people in them are comfortable sharing." },
      { q: "When can I download this experience?", a: "The new Picture me around experience for iPhone is in preparation. This page introduces its features; we will add a download link when it is available. The app supports English and French." }
    ],
    supportEyebrow: "Stay close", supportTitle: "A question?\nWe’re right here.",
    supportText: "For help, a content report or a request about your data, write to our team.",
    supportAction: "Email the team", supportHint: "For a problem, include your iPhone model, app version and what happened. Never share your password.",
    footerTag: "Live the moments. Share the perspectives.", privacy: "Privacy", terms: "Terms of use", operator: "A project by thehnh.tech", availability: "iPhone · English / Français"
  }
} as const;

async function languageFor({ searchParams }: PageProps): Promise<Language> {
  return (await searchParams).lang === "en" ? "en" : "fr";
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const lang = await languageFor(props);
  const t = copy[lang];
  const url = lang === "en" ? `${SITE}/?lang=en` : SITE;
  return {
    // These canonical, alternate and social URLs are already absolute. Next 15
    // drops root-path query strings when resolving them against metadataBase.
    metadataBase: null,
    title: { absolute: t.title }, description: t.description,
    applicationName: "Picture me around", publisher: "thehnh.tech", category: "Photo & Video", classification: "Photography and social sharing",
    keywords: ["Picture me around", "photos de soirée", "party photos", "photo circle", "around", "Radar"],
    alternates: { canonical: url, languages: { fr: SITE, en: `${SITE}/?lang=en`, "x-default": SITE }, types: {} },
    openGraph: { type: "website", siteName: "Picture me around", title: t.title, description: t.description, url, locale: lang === "fr" ? "fr_FR" : "en_GB", alternateLocale: lang === "fr" ? "en_GB" : "fr_FR", images: [{ url: `${SITE}/around/icon.png`, width: 1024, height: 1024, alt: "Picture me around — Radar" }] },
    twitter: { card: "summary", title: t.title, description: t.description, images: [`${SITE}/around/icon.png`], site: "", creator: "" },
    icons: { icon: "/around/icon.png", apple: "/around/icon.png" },
    manifest: null,
    appleWebApp: { title: "Picture me around", capable: false },
    other: { "msapplication-TileColor": "#060609", "apple-mobile-web-app-capable": "no" }
  };
}

export const viewport: Viewport = { themeColor: "#060609", colorScheme: "dark", width: "device-width", initialScale: 1 };

function Orbit({ compact = false }: { compact?: boolean }) {
  return <div className={compact ? styles.orbitCompact : styles.orbit} aria-hidden="true">
    <svg viewBox="0 0 600 600" fill="none">
      <circle cx="300" cy="300" r="264" stroke="currentColor" strokeOpacity=".1" />
      <circle cx="300" cy="300" r="190" stroke="currentColor" strokeOpacity=".18" />
      <circle cx="300" cy="300" r="114" stroke="currentColor" strokeOpacity=".28" />
      <path d="M300 12v26M300 562v26M12 300h26M562 300h26" stroke="currentColor" strokeOpacity=".3" />
      <path d="M300 300 452 186M300 300 146 398M300 300 356 403" stroke="currentColor" strokeOpacity=".12" strokeDasharray="3 8" />
      <circle className={styles.orbitPulse} cx="300" cy="300" r="42" stroke="#40E1F5" strokeOpacity=".2" />
      <circle cx="300" cy="300" r="19" fill="#40E1F5" />
      <circle cx="452" cy="186" r="7" fill="#40E1F5" />
      <circle cx="146" cy="398" r="7" fill="#40E1F5" />
      <circle cx="356" cy="403" r="5" fill="#F4F0FF" fillOpacity=".75" />
      <circle cx="226" cy="123" r="4" fill="#F4F0FF" fillOpacity=".4" />
      <circle cx="535" cy="421" r="4" fill="#F4F0FF" fillOpacity=".3" />
    </svg>
  </div>;
}

export default async function AroundPage(props: PageProps) {
  const lang = await languageFor(props);
  const t = copy[lang];
  const stepIcons = [Radio, Camera, Eye];
  return <main className={styles.page} lang={lang} id="top">
    <JsonLd id="ld-around-website" data={{ "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE}/#website`, name: "Picture me around", url: SITE, description: t.description, inLanguage: ["fr", "en"], publisher: { "@type": "Organization", name: "thehnh.tech", url: "https://thehnh.tech" } }} />
    <div className={styles.container}>
      <header className={styles.header}>
        <a href="#top" className={styles.brand} aria-label="Picture me around">
          <Image src="/around/icon.png" width={44} height={44} alt="" priority />
          <span>picture me <strong>around</strong><span className={styles.brandDot}>.</span></span>
        </a>
        <nav className={styles.nav} aria-label={lang === "fr" ? "Navigation principale" : "Main navigation"}>
          <a href="#how-it-works">{t.navHow}</a><a href="#questions">{t.navQuestions}</a><a href="#support">{t.navContact} <ArrowUpRight size={14} /></a>
        </nav>
        <nav className={styles.languages} aria-label={t.language}>
          <a href="?lang=fr" lang="fr" aria-current={lang === "fr" ? "page" : undefined}>FR</a>
          <span aria-hidden="true">/</span>
          <a href="?lang=en" lang="en" aria-current={lang === "en" ? "page" : undefined}>EN</a>
        </nav>
      </header>

      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span className={styles.signal} />{t.eyebrow}</p>
          <h1 id="hero-title">{t.heroFirst}<br /><span>{t.heroSecond}</span></h1>
          <p className={styles.intro}>{t.intro}</p>
          <a className={styles.primaryLink} href="#how-it-works">{t.cta}<ArrowDown size={18} /></a>
          <p className={styles.status}>{t.status}</p>
        </div>
        <figure className={styles.heroVisual} aria-label={t.orbitCaption}>
          <Orbit />
          <figcaption><span className={styles.tinyCross}>+</span>{t.orbitNote}<span className={styles.tinyCross}>+</span></figcaption>
        </figure>
      </section>

      <dl className={styles.stats}>{t.stats.map(stat => <div key={stat.unit}><dt>{stat.unit}</dt><dd>{stat.value}<span aria-hidden="true">.</span></dd></div>)}</dl>

      <section className={styles.story}>
        <p className={styles.eyebrow}>{t.storyEyebrow}</p>
        <div><h2>{t.storyFirst}<br /><span className={styles.muted}>{t.storySecond}</span></h2><p>{t.story}</p></div>
      </section>

      <section className={styles.how} id="how-it-works">
        <div className={styles.sectionHeading}><p className={styles.eyebrow}>{t.howEyebrow}</p><h2>{t.howTitle}</h2></div>
        <div className={styles.steps}>{t.steps.map((step, index) => {
          const Icon = stepIcons[index];
          return <article className={styles.step} key={step.title}>
            <div className={styles.stepTop}><span>0{index + 1}</span><Icon size={24} strokeWidth={1.25} /></div>
            <h3>{step.title}</h3><p>{step.text}</p><span className={styles.stepDetail}>{step.detail}</span>
          </article>;
        })}</div>
      </section>

      <section className={styles.radar}>
        <div className={styles.radarVisual}><Orbit compact /><p>{t.radarMini}</p></div>
        <div className={styles.radarCopy}>
          <p className={styles.eyebrow}>{t.radarEyebrow}</p><h2>{t.radarTitle}</h2><p className={styles.bodyText}>{t.radarText}</p>
          <ul className={styles.facts}>{t.radarFacts.map(fact => <li key={fact}><Check size={15} />{fact}</li>)}</ul>
          <p className={styles.permission}>{t.radarNote}</p>
          <a className={styles.textLink} href={PRIVACY}>{t.radarPrivacy}<ArrowUpRight size={16} /></a>
        </div>
      </section>

      <section className={styles.seven}>
        <div><p className={styles.eyebrow}>{t.sevenEyebrow}</p><h2>{t.sevenTitle}</h2><p className={styles.bodyText}>{t.sevenText}</p><p className={styles.smallPrint}>{t.sevenNote}</p></div>
        <div className={styles.sevenNumber}><span>7<span className={styles.brandDot}>.</span></span><p>{t.sevenLabel}</p></div>
      </section>

      <aside className={styles.controls}><ShieldCheck size={28} strokeWidth={1.25} /><h3>{t.controls}</h3><p>{t.controlsText}</p></aside>

      <section className={styles.faq} id="questions">
        <div><p className={styles.eyebrow}>{t.faqEyebrow}</p><h2>{t.faqTitle}</h2></div>
        <div className={styles.faqList}>{t.faqs.map(item => <details key={item.q}><summary>{item.q}<ChevronDown size={19} /></summary><p>{item.a}</p></details>)}</div>
      </section>

      <section className={styles.support} id="support">
        <div><p className={styles.eyebrow}>{t.supportEyebrow}</p><h2>{t.supportTitle}</h2></div>
        <div><p className={styles.bodyText}>{t.supportText}</p><a className={styles.contactLink} href={SUPPORT}>around@welock.in<ArrowUpRight size={24} /></a><p className={styles.smallPrint}>{t.supportHint}</p></div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerTop}><p>picture me <strong>around</strong><span className={styles.brandDot}>.</span></p><span>{t.footerTag}</span></div>
        <div className={styles.footerBottom}><span>{t.availability}</span><nav aria-label={lang === "fr" ? "Informations légales" : "Legal information"}><a href={PRIVACY}>{t.privacy}</a><a href={TERMS}>{t.terms}</a><a href={SUPPORT}>{t.navContact}</a></nav><a href="https://thehnh.tech">{t.operator}<ArrowUpRight size={12} /></a></div>
      </footer>
    </div>
  </main>;
}
