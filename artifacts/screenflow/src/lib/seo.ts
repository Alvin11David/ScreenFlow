import { homeFaqs, landingPages, type Faq } from "./content";

export const SITE_URL = "https://screen-flow-ltd.vercel.app";

export type SeoRoute = {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  noindex?: boolean;
  jsonLd: Record<string, unknown>[];
};

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === "/" ? "/" : path}`;
}

function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

function breadcrumbJsonLd(path: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ScreenFlow",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: absoluteUrl(path),
      },
    ],
  };
}

const softwareJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ScreenFlow",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web, Windows, macOS, Linux",
  description:
    "ScreenFlow is the best screen recording software for creating professional videos. Record your screen, webcam, and audio simultaneously, edit with powerful tools, and share instantly.",
  url: absoluteUrl("/"),
  image: `${SITE_URL}/opengraph.jpg`,
  offers: [
    { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD" },
    { "@type": "Offer", name: "Pro", price: "12", priceCurrency: "USD" },
    { "@type": "Offer", name: "Team", price: "29", priceCurrency: "USD" },
  ],
  featureList: [
    "Screen, webcam, and audio recording",
    "4K at 60fps",
    "No watermark on the free plan",
    "Built-in video editor",
    "Cloud sharing links",
  ],
};

const websiteJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ScreenFlow",
  url: absoluteUrl("/"),
};

const organizationJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ScreenFlow",
  url: absoluteUrl("/"),
  logo: `${SITE_URL}/favicon.svg`,
};

export const seoRoutes: SeoRoute[] = [
  {
    path: "/",
    title: "ScreenFlow — Screen Recording Software | Free Online Screen Recorder & Video Editor",
    description:
      "ScreenFlow is the best free online screen recording software. Record your screen, webcam, and system audio, edit videos with annotations and effects, and share instantly. No download required.",
    keywords: [
      "screen recording software",
      "screen recorder",
      "free screen recorder",
      "online screen recorder",
      "record screen",
      "video editor",
    ],
    jsonLd: [
      softwareJsonLd,
      websiteJsonLd,
      organizationJsonLd,
      faqJsonLd(homeFaqs),
    ],
  },
  {
    path: "/thanks",
    title: "Thanks for your interest — ScreenFlow",
    description:
      "Thanks for getting in touch with ScreenFlow. Head back to the homepage to start recording your screen for free.",
    keywords: [],
    noindex: true,
    jsonLd: [],
  },
  ...landingPages.map((page): SeoRoute => {
    const articleJsonLd: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: page.h1,
      description: page.description,
      datePublished: "2026-01-15",
      dateModified: "2026-01-15",
      author: {
        "@type": "Organization",
        name: "ScreenFlow",
        url: absoluteUrl("/"),
      },
      publisher: {
        "@type": "Organization",
        name: "ScreenFlow",
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/favicon.svg`,
        },
      },
      mainEntityOfPage: absoluteUrl(page.path),
    };

    return {
      path: page.path,
      title: page.title,
      description: page.description,
      keywords: page.keywords,
      jsonLd: [
        articleJsonLd,
        faqJsonLd(page.faqs),
        breadcrumbJsonLd(page.path, page.h1),
      ],
    };
  }),
];
