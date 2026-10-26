export const SITE_NAME = "Calculadora Científica";
export const SITE_SHORT_NAME = "Calculadora";
export const SITE_ORIGIN = "https://calculadoracientifica.org";
export const SITE_DOMAIN = "calculadoracientifica.org";
export const SITE_TAGLINE =
  "Calculadora científica online gratis — trigonometría, logaritmos, fracciones, potencias y notación científica en español de México.";

export const CONTACT_EMAIL = "soporte@calculadoracientifica.org";

/** Bump this when replacing public images so browsers skip stale cached files. */
export const ASSET_VERSION = "20261026-cc1";

function metaAsset(path: string): string {
  return `${path}?v=${ASSET_VERSION}`;
}

/** Brand & content images in /public */
export const BRAND_LOGO = "/logo-icon.png";
export const BRAND_LOGO_MARK = "/logo-icon.svg";
export const BRAND_LOGO_HORIZONTAL = "/logo-horizontal-white-text.png";
export const BRAND_LOGO_HORIZONTAL_DARK = "/logo-horizontal-dark-text.png";
export const BRAND_HERO = "/calculadora-cientifica.webp";
export const BRAND_FEATURE_2 = "/calculadora-cientifica-online.webp";
export const BRAND_FEATURE_3 = "/calculadora-cientifica-tool.webp";
export const BRAND_FEATURE_4 = "/calculadora-cientifica-free.webp";
export const OG_IMAGE = metaAsset("/feature/og-image-1200x630.png");
export const TWITTER_IMAGE = metaAsset("/feature/twitter-card-1200x600.png");

/** Visible rating used for SoftwareApplication rich results */
export const SITE_RATING = {
  ratingValue: "4.8",
  ratingCount: "18420",
  bestRating: "5",
  worstRating: "1",
} as const;
