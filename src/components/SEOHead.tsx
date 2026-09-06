import { useEffect } from "react";
import { CONTACT, SEO_KEYWORDS, technologies, cities, services } from "@/lib/seo-data";

export interface JsonLdBlock {
  "@context"?: string;
  [key: string]: unknown;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbSchemaItem {
  name: string;
  path?: string;
}

interface OfferInput {
  name: string;
}

interface ServiceSchemaInput {
  name: string;
  description: string;
  path: string;
  areaServed?: string | string[];
  serviceType?: string;
  offers?: OfferInput[];
  /** Canonical @id of the provider entity — defaults to the primary-market LocalBusiness node. */
  providerId?: string;
}

interface ArticleSchemaInput {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}

interface WebPageSchemaInput {
  path: string;
  title: string;
  /** Canonical @id of the entity this page is primarily about, e.g. "#localbusiness" or an absolute "{path}#service". Omitted if not provided. */
  mainEntityId?: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  jsonLd?: JsonLdBlock | JsonLdBlock[];
  ogImage?: string;
  ogType?: "website" | "article";
  keywords?: readonly string[];
  /** Canonical @id this page is primarily about — feeds the auto-generated WebPage node's `about`/`mainEntity`. */
  mainEntityId?: string;
  /**
   * Additional hreflang → path entries beyond the default self-referencing
   * fr-MA/ar-MA/x-default set (locale today is a client-side toggle, not a
   * separate URL — see I18nProvider.tsx — so there's nothing to point these
   * at yet). Prepared for when a real URL-based locale split exists, e.g.
   * `{ en: "/en/entreprises" }`. Omit entirely for current behavior, unchanged.
   */
  hreflangAlternates?: Record<string, string>;
}

export const BASE_URL = "https://touatiayoub.com";
export const SITE_NAME = "Ayoub Touati | Développeur Web Freelance au Maroc";
export const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

export function absoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildFaqSchema(items: FAQItem[]): JsonLdBlock | null {
  if (!items.length) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbSchemaItem[]): JsonLdBlock {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  };
}

export interface OfferCatalogEntry {
  name: string;
  description: string;
  fromMAD: number;
  unit: "one-time" | "monthly";
}

export interface OfferCatalogSchemaInput {
  path: string;
  catalogName: string;
  offers: OfferCatalogEntry[];
}

export function buildOfferCatalogSchema({ path, catalogName, offers }: OfferCatalogSchemaInput): JsonLdBlock {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${absoluteUrl(path)}#offercatalog`,
    name: catalogName,
    url: absoluteUrl(path),
    itemListElement: offers.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      description: offer.description,
      priceCurrency: "MAD",
      price: offer.fromMAD,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: offer.fromMAD,
        priceCurrency: "MAD",
        ...(offer.unit === "monthly" ? { unitCode: "MON" } : {}),
      },
      seller: { "@id": `${BASE_URL}/#localbusiness` },
    })),
  };
}

export interface ReviewInput {
  author: string;
  reviewBody: string;
  ratingValue: number;
}

export function buildReviewSchema(reviews: ReviewInput[]): JsonLdBlock[] {
  return reviews.map((review) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@id": `${BASE_URL}/#localbusiness` },
    author: { "@type": "Person", name: review.author },
    reviewRating: { "@type": "Rating", ratingValue: review.ratingValue, bestRating: 5 },
    reviewBody: review.reviewBody,
  }));
}

export function buildServiceSchema({
  name,
  description,
  path,
  areaServed = "Morocco",
  serviceType,
  offers = [],
  providerId = `${BASE_URL}/#localbusiness`,
}: ServiceSchemaInput): JsonLdBlock {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    description,
    url: absoluteUrl(path),
    serviceType: serviceType || name,
    provider: { "@id": providerId },
    areaServed: Array.isArray(areaServed)
      ? areaServed.map((city) => ({ "@type": "Place", name: city }))
      : { "@type": "Place", name: areaServed },
    ...(offers.length
      ? {
          offers: offers.map((offer) => ({
            "@type": "Offer",
            name: offer.name,
          })),
        }
      : {}),
  };
}

export function buildArticleSchema({
  title,
  description,
  path,
  datePublished,
  dateModified,
  image,
}: ArticleSchemaInput): JsonLdBlock {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(path)}#article`,
    headline: title,
    description,
    image: image || DEFAULT_OG_IMAGE,
    datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: absoluteUrl(path),
    author: { "@id": `${BASE_URL}/#person` },
    publisher: { "@id": `${BASE_URL}/#localbusiness` },
  };
}

function buildLocalBusinessSchema(): JsonLdBlock {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#localbusiness`,
    name: CONTACT.name,
    alternateName: SITE_NAME,
    url: BASE_URL,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    image: DEFAULT_OG_IMAGE,
    description: "Expert digital au Maroc : création de sites web React/Laravel, SEO technique, refonte de sites et solutions IA pour PME marocaines.",
    foundingDate: "2020",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 1 },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Meknès",
      addressLocality: "Meknès",
      addressRegion: "Fès-Meknès",
      postalCode: "50000",
      addressCountry: "MA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 33.8935,
      longitude: -5.5547,
    },
    areaServed: [
      { "@type": "Place", name: "Maroc" },
      ...cities.map((city) => ({ "@type": "City", name: city.name })),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services Digitaux",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.name },
      })),
    },
    sameAs: [
      CONTACT.whatsapp,
      "https://www.linkedin.com/in/ayoubtouati",
      "https://github.com/TouatiCoder",
      "https://www.instagram.com/ayoub.touati55/",
      "https://web.facebook.com/touati.ayoub02",
    ],
  };
}

function buildPersonSchema(): JsonLdBlock {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}/#person`,
    name: "Ayoub Touati",
    givenName: "Ayoub",
    familyName: "Touati",
    url: BASE_URL,
    image: `${BASE_URL}/logo.png`,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    jobTitle: "Développeur Full-Stack & Cloud",
    description: "Développeur Full-Stack & Cloud basé à Meknès, Maroc. Spécialisé React, Laravel, Next.js, Flutter, AWS/Azure, WordPress et Shopify pour des clients au Maroc et à l'international.",
    knowsAbout: technologies.map((tech) => tech.name),
    knowsLanguage: ["fr", "ar", "en"],
    nationality: { "@type": "Country", name: "Morocco" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Meknès",
      addressCountry: "MA",
    },
    worksFor: { "@id": `${BASE_URL}/#localbusiness` },
    sameAs: [
      "https://www.linkedin.com/in/ayoubtouati",
      "https://github.com/TouatiCoder",
      "https://www.instagram.com/ayoub.touati55/",
      "https://web.facebook.com/touati.ayoub02",
      CONTACT.whatsapp,
    ],
  };
}

function buildWebsiteSchema(): JsonLdBlock {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: SITE_NAME,
    inLanguage: ["fr-MA", "ar-MA"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/blog?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildProServiceSchema(): JsonLdBlock {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${BASE_URL}/#proservice`,
    name: "Ayoub Touati — Ingénierie Logicielle & Transformation Digitale",
    url: `${BASE_URL}/entreprises`,
    description:
      "Partenaire d'ingénierie logicielle nearshore basé au Maroc, au service d'entreprises en France, Belgique, Suisse, Luxembourg et au Canada.",
    founder: { "@id": `${BASE_URL}/#person` },
    areaServed: [
      { "@type": "Country", name: "France" },
      { "@type": "Country", name: "Belgique" },
      { "@type": "Country", name: "Suisse" },
      { "@type": "Country", name: "Luxembourg" },
      { "@type": "Country", name: "Canada" },
    ],
    sameAs: [
      "https://www.linkedin.com/in/ayoubtouati",
      "https://github.com/TouatiCoder",
      "https://www.instagram.com/ayoub.touati55/",
      "https://web.facebook.com/touati.ayoub02",
    ],
  };
}

export function buildWebPageSchema({ path, title, mainEntityId }: WebPageSchemaInput): JsonLdBlock {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    ...(mainEntityId
      ? {
          about: { "@id": mainEntityId },
          mainEntity: { "@id": mainEntityId },
        }
      : {}),
  };
}

export function SEOHead({
  title,
  description,
  path,
  noindex,
  jsonLd,
  ogImage,
  ogType = "website",
  keywords = SEO_KEYWORDS,
  mainEntityId,
  hreflangAlternates,
}: SEOHeadProps) {
  useEffect(() => {
    const canonicalUrl = absoluteUrl(path);
    const image = ogImage || DEFAULT_OG_IMAGE;

    document.title = title;

    setMetaByName("description", description);
    setMetaByName("keywords", keywords.join(", "));
    setMetaByName("robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large");
    setMetaByName("twitter:card", "summary_large_image");
    setMetaByName("twitter:title", title);
    setMetaByName("twitter:description", description);
    setMetaByName("twitter:image", image);
    setMetaByName("theme-color", "#0c1222");

    setMetaByProperty("og:title", title);
    setMetaByProperty("og:description", description);
    setMetaByProperty("og:url", canonicalUrl);
    setMetaByProperty("og:type", ogType);
    setMetaByProperty("og:site_name", SITE_NAME);
    setMetaByProperty("og:image", image);
    setMetaByProperty("og:image:alt", title);
    setMetaByProperty("og:locale", "fr_MA");
    setMetaByProperty("og:locale:alternate", "ar_MA");

    setLink("canonical", canonicalUrl);
    // Only fr-MA + x-default are self-referenced. An "ar-MA" alternate
    // pointing at this same French URL is an invalid signal: hreflang must
    // map a locale to a DISTINCT URL, and no Arabic URL exists (locale is a
    // client-side toggle). Sept 2026 Trends check also found no measurable
    // Moroccan search demand in Arabic for these services, so there is no
    // reason to reinstate it until real /ar/ URLs ship.
    const hreflangEntries: Record<string, string> = {
      "fr-MA": canonicalUrl,
      "x-default": canonicalUrl,
      ...(hreflangAlternates
        ? Object.fromEntries(
            Object.entries(hreflangAlternates).map(([lang, altPath]) => [lang, absoluteUrl(altPath)]),
          )
        : {}),
    };
    Object.entries(hreflangEntries).forEach(([lang, href]) => setHreflang(lang, href));

    document.querySelectorAll('script[data-seo-jsonld="true"]').forEach((element) => element.remove());

    const schemas = [
      buildLocalBusinessSchema(),
      buildPersonSchema(),
      buildWebsiteSchema(),
      buildWebPageSchema({ path, title, mainEntityId }),
      ...(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []),
    ].filter(Boolean) as JsonLdBlock[];

    schemas.forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seoJsonld = "true";
      script.textContent = JSON.stringify(
        schema["@context"] ? schema : { "@context": "https://schema.org", ...schema },
      );
      document.head.appendChild(script);
    });

    return () => {
      document.querySelectorAll('link[data-seo-hreflang="true"]').forEach((element) => element.remove());
      document.querySelectorAll('script[data-seo-jsonld="true"]').forEach((element) => element.remove());
    };
  }, [title, description, path, noindex, jsonLd, ogImage, ogType, keywords, mainEntityId, hreflangAlternates]);

  return null;
}

function setMetaByName(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string) {
  let element = document.querySelector(`meta[property="${property}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function setHreflang(language: string, href: string) {
  let element = document.querySelector(`link[rel="alternate"][hreflang="${language}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "alternate");
    element.setAttribute("hreflang", language);
    element.setAttribute("data-seo-hreflang", "true");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}
