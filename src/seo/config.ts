import { BRAND_FULL, CONTACT } from "../content/landing";
import type { Locale } from "../i18n/types";

/** Domaine canonique — surchargeable via VITE_SITE_URL */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "https://hopebridge.cm"
).replace(/\/$/, "");

export const SITE_NAME = BRAND_FULL;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/brand/og-image.png`;

export type SeoPage = {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  noindex?: boolean;
};

const frPages: SeoPage[] = [
  {
    path: "/",
    title: "HOPE Bridge for the Needy — Association humanitaire à Yaoundé",
    description:
      "Association à but non lucratif à Yaoundé : aide d'urgence, santé primaire, nutrition et protection des plus vulnérables au Cameroun. Soutenez nos actions.",
    keywords: [
      "HOPE Bridge",
      "association humanitaire",
      "Yaoundé",
      "Cameroun",
      "aide d'urgence",
      "don",
      "ONG",
      "nutrition",
      "protection",
    ],
  },
  {
    path: "/a-propos",
    title: "À propos — HOPE Bridge for the Needy",
    description:
      "Découvrez HOPE Bridge for the Needy : mission, valeurs et engagement pour soulager les populations vulnérables au Cameroun.",
    keywords: ["à propos", "mission", "association", "Yaoundé", "HOPE Bridge"],
  },
  {
    path: "/missions",
    title: "Nos actions — Aide, santé, nutrition & protection",
    description:
      "Explorez les programmes de HOPE Bridge : aide d'urgence, santé primaire, nutrition et protection des femmes et des enfants.",
    keywords: [
      "actions humanitaires",
      "santé",
      "nutrition",
      "protection",
      "Cameroun",
    ],
  },
  {
    path: "/don",
    title: "Faire un don — MTN MoMo & Orange Money",
    description:
      "Soutenez HOPE Bridge par Mobile Money (MTN MoMo ou Orange Money). Votre don finance l'aide d'urgence, la santé et la nutrition au Cameroun.",
    keywords: [
      "faire un don",
      "MTN Mobile Money",
      "Orange Money",
      "don association",
      "Cameroun",
    ],
  },
  {
    path: "/contact",
    title: "Contact — HOPE Bridge for the Needy",
    description:
      "Contactez HOPE Bridge for the Needy à Yaoundé. Écrivez-nous pour un partenariat, une question ou le suivi d'un don.",
    keywords: ["contact", "Yaoundé", "association", "HOPE Bridge"],
  },
  {
    path: "/mentions-legales",
    title: "Mentions légales — HOPE Bridge",
    description:
      "Mentions légales du site HOPE Bridge for the Needy : éditeur, objet du site et propriété intellectuelle.",
    noindex: true,
  },
  {
    path: "/confidentialite",
    title: "Politique de confidentialité — HOPE Bridge",
    description:
      "Comment HOPE Bridge for the Needy traite vos données personnelles et vos demandes de contact ou de don.",
    noindex: true,
  },
];

const enPages: SeoPage[] = [
  {
    path: "/",
    title: "HOPE Bridge for the Needy — Humanitarian association in Yaoundé",
    description:
      "Non-profit in Yaoundé: emergency aid, primary health, nutrition and protection for vulnerable people in Cameroon. Support our work.",
    keywords: [
      "HOPE Bridge",
      "humanitarian association",
      "Yaoundé",
      "Cameroon",
      "donate",
      "NGO",
    ],
  },
  {
    path: "/a-propos",
    title: "About us — HOPE Bridge for the Needy",
    description:
      "Learn about HOPE Bridge for the Needy: mission, values and commitment to vulnerable communities in Cameroon.",
  },
  {
    path: "/missions",
    title: "Our work — Aid, health, nutrition & protection",
    description:
      "Explore HOPE Bridge programmes: emergency aid, primary health, nutrition and protection of women and children.",
  },
  {
    path: "/don",
    title: "Donate — MTN MoMo & Orange Money",
    description:
      "Support HOPE Bridge via Mobile Money (MTN MoMo or Orange Money). Your gift funds emergency aid, health and nutrition in Cameroon.",
  },
  {
    path: "/contact",
    title: "Contact — HOPE Bridge for the Needy",
    description:
      "Contact HOPE Bridge for the Needy in Yaoundé for partnerships, questions or donation follow-up.",
  },
  {
    path: "/mentions-legales",
    title: "Legal notice — HOPE Bridge",
    description: "Legal notice for the HOPE Bridge for the Needy website.",
    noindex: true,
  },
  {
    path: "/confidentialite",
    title: "Privacy policy — HOPE Bridge",
    description:
      "How HOPE Bridge for the Needy handles your personal data and contact requests.",
    noindex: true,
  },
];

const byLocale: Record<Locale, SeoPage[]> = { fr: frPages, en: enPages };

export function getSeoForPath(pathname: string, locale: Locale): SeoPage {
  const pages = byLocale[locale];
  const exact = pages.find((p) => p.path === pathname);
  if (exact) return exact;
  return pages[0];
}

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: SITE_NAME,
    alternateName: ["HOPE Bridge", "hopebridge"],
    url: SITE_URL,
    logo: absoluteUrl("/brand/logo-full.png"),
    image: DEFAULT_OG_IMAGE,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Yaoundé",
      addressRegion: "Centre",
      addressCountry: "CM",
      streetAddress: CONTACT.address,
    },
    areaServed: {
      "@type": "Country",
      name: "Cameroon",
    },
    description:
      "Association à but non lucratif à Yaoundé — aide d'urgence, santé, nutrition et protection.",
    sameAs: [],
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ["fr", "en"],
    publisher: {
      "@type": "NGO",
      name: SITE_NAME,
    },
  };
}

export function buildDonateActionJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "DonateAction",
    name: "Faire un don à HOPE Bridge",
    target: {
      "@type": "EntryPoint",
      urlTemplate: absoluteUrl("/don"),
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    recipient: {
      "@type": "NGO",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

/** Pages indexables pour le sitemap */
export const SITEMAP_PATHS = frPages
  .filter((p) => !p.noindex)
  .map((p) => p.path);
