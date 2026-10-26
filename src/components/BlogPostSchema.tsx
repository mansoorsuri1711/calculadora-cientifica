import { imageObjectLicensing, SITE_ORIGIN } from "@/lib/schemaImageLicensing";
import { BRAND_LOGO, SITE_NAME } from "@/lib/siteConfig";

function safeJsonLd(obj: object): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

type BlogPostSchemaProps = {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  breadcrumbOnly?: boolean;
  articleBody?: string;
};

export default function BlogPostSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  image = `${SITE_ORIGIN}${BRAND_LOGO}`,
  breadcrumbOnly = false,
  articleBody,
}: BlogPostSchemaProps) {
  const url = `${SITE_ORIGIN}/blog/${slug}`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_ORIGIN}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_ORIGIN}/blog` },
      { "@type": "ListItem", position: 3, name: title, item: url },
    ],
  };
  const article: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description,
    url,
    image,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_ORIGIN },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_ORIGIN}${BRAND_LOGO}`,
        width: 512,
        height: 512,
        ...imageObjectLicensing,
        creditText: `Logo de ${SITE_NAME}`,
      },
    },
    datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "es-MX",
    ...(articleBody && { articleBody }),
  };
  return (
    <div suppressHydrationWarning style={{ display: "contents" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumb) }}
      />
      {!breadcrumbOnly && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(article) }}
        />
      )}
    </div>
  );
}
