import type { Product } from "@/data/products";

export const SITE_URL = "https://saudade.thehnh.tech";
export const SITE_NAME = "SAUDADE";
export const SITE_TAGLINE = "Picture me for better memories";
export const SITE_DESCRIPTION =
  "SAUDADE 0024 — Night Access. A premium oversized streetwear t-shirt with a real QR code that turns parties, clubs and trips into a private photo archive. Shipped worldwide from Switzerland.";
export const DEFAULT_OG_IMAGE = "/assets/tee-white-red-card.png";
export const ORGANIZATION_LOGO = "/logo.png";
export const TWITTER_HANDLE = "@saudade";
export const PUBLISHER_HANDLE = "@thehnh";
export const LOCALE = "en_US";

export const KEYWORDS = [
  "saudade",
  "saudade 0024",
  "night access",
  "streetwear marketplace",
  "luxury streetwear",
  "underground fashion",
  "QR code t-shirt",
  "oversized tee",
  "premium graphic tee",
  "techno fashion",
  "rave fashion",
  "club wear",
  "nightlife streetwear",
  "limited edition tee",
  "private photo feed",
  "memory garment",
  "thehnh"
];

export function absoluteUrl(path = "/") {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function productAvailability(product: Product) {
  return product.status === "available"
    ? "https://schema.org/InStock"
    : "https://schema.org/PreOrder";
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: SITE_NAME,
    legalName: "SAUDADE by thehnh.tech",
    url: SITE_URL,
    logo: absoluteUrl(ORGANIZATION_LOGO),
    description: SITE_DESCRIPTION,
    slogan: SITE_TAGLINE,
    founder: { "@type": "Organization", name: "thehnh.tech", url: "https://thehnh.tech" },
    sameAs: ["https://thehnh.tech"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@saudade.thehnh.tech",
      areaServed: "Worldwide",
      availableLanguage: ["English", "French"]
    }
  } as const;
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": `${SITE_URL}#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/shop?q={search_term_string}` },
      "query-input": "required name=search_term_string"
    }
  } as const;
}

export function breadcrumbLd(trail: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url)
    }))
  } as const;
}

export function productLd(product: Product) {
  const url = absoluteUrl(`/product/${product.id}`);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.title,
    description: product.description,
    image: [
      absoluteUrl(product.cardImage),
      ...product.images.map((image) => absoluteUrl(image.src))
    ],
    sku: product.id,
    mpn: product.id,
    category: product.category,
    color: product.colorway,
    audience: { "@type": "PeopleAudience", suggestedGender: "unisex" },
    brand: { "@type": "Brand", name: SITE_NAME },
    manufacturer: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    keywords: product.tags.join(", "),
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "EUR",
      price: product.price.toFixed(2),
      availability: productAvailability(product),
      itemCondition: "https://schema.org/NewCondition",
      areaServed: "Worldwide",
      seller: { "@id": `${SITE_URL}#organization` },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: { "@type": "DefinedRegion", name: "Worldwide" },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 5, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 12, unitCode: "DAY" }
        }
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: ["CH", "FR", "DE", "BE", "NL", "ES", "IT", "AT", "US", "GB"],
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/ReturnShippingFees"
      }
    }
  } as const;
}

export function itemListLd(products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "SAUDADE 0024 — Night Access drop",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/product/${product.id}`),
      name: product.title
    }))
  } as const;
}
