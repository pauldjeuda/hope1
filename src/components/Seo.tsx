import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLocale } from "../i18n/LocaleContext";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  absoluteUrl,
  buildDonateActionJsonLd,
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
  getSeoForPath,
} from "../seo/config";

function upsertMeta(
  attr: "name" | "property",
  key: string,
  content: string,
) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string, extra?: Record<string, string>) {
  const extras = extra
    ? Object.entries(extra)
        .map(([k, v]) => `[${k}="${v}"]`)
        .join("")
    : "";
  let el = document.head.querySelector<HTMLLinkElement>(
    `link[rel="${rel}"]${extras}`,
  );
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (extra) {
      for (const [k, v] of Object.entries(extra)) el.setAttribute(k, v);
    }
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id: string, data: object) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/** Met à jour title, meta, Open Graph, Twitter Cards, canonical et JSON-LD. */
export default function Seo() {
  const { pathname } = useLocation();
  const { locale } = useLocale();

  useEffect(() => {
    const page = getSeoForPath(pathname, locale);
    const url = absoluteUrl(pathname);
    const title = page.title;
    const description = page.description;
    const robots = page.noindex ? "noindex, follow" : "index, follow";

    document.title = title;

    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", robots);
    upsertMeta("name", "googlebot", robots);
    upsertMeta("name", "author", SITE_NAME);
    if (page.keywords?.length) {
      upsertMeta("name", "keywords", page.keywords.join(", "));
    }

    upsertMeta("property", "og:type", pathname === "/" ? "website" : "article");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", DEFAULT_OG_IMAGE);
    upsertMeta("property", "og:image:alt", `${SITE_NAME} — Yaoundé, Cameroun`);
    upsertMeta("property", "og:locale", locale === "fr" ? "fr_CM" : "en_CM");
    upsertMeta(
      "property",
      "og:locale:alternate",
      locale === "fr" ? "en_CM" : "fr_CM",
    );

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", DEFAULT_OG_IMAGE);

    upsertLink("canonical", url);

    upsertJsonLd("ld-organization", buildOrganizationJsonLd());
    upsertJsonLd("ld-website", buildWebsiteJsonLd());
    if (pathname === "/don") {
      upsertJsonLd("ld-donate", buildDonateActionJsonLd());
    } else {
      document.getElementById("ld-donate")?.remove();
    }
  }, [pathname, locale]);

  return null;
}
