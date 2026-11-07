import { SITE_ORIGIN } from "@/lib/siteConfig";

function imageLoc(path: string): string {
  return `${SITE_ORIGIN}${path}`;
}

export type SitemapPage = {
  path: string;
  lastMod: string;
  changeFreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
  images?: Array<{ loc: string; title: string; caption: string }>;
};

const LASTMOD = "2026-11-07";

export const SITEMAP_PAGES: SitemapPage[] = [
  {
    path: "/",
    lastMod: LASTMOD,
    changeFreq: "daily",
    priority: 1,
    images: [
      {
        loc: imageLoc("/logo-icon.png"),
        title: "Logo Calculadora Científica",
        caption: "Marca de Calculadora Científica en calculadoracientifica.org",
      },
      {
        loc: imageLoc("/calculadora-cientifica.webp"),
        title: "Calculadora científica online",
        caption: "Calculadora científica gratis en el navegador",
      },
    ],
  },
  {
    path: "/funciones",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/calculadora-cientifica-online.webp"),
        title: "Funciones de la calculadora científica",
        caption: "Trigonometría, logaritmos, potencias y más",
      },
    ],
  },
  {
    path: "/como-usar",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/calculadora-cientifica-tool.webp"),
        title: "Cómo usar la calculadora científica",
        caption: "Guía paso a paso DEG/RAD y funciones",
      },
    ],
  },
  {
    path: "/calculadora-trigonometrica",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.95,
    images: [
      {
        loc: imageLoc("/calculadora-cientifica-tool.webp"),
        title: "Calculadora trigonométrica",
        caption: "Seno, coseno y tangente online",
      },
    ],
  },
  {
    path: "/grados-a-radianes",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.95,
    images: [
      {
        loc: imageLoc("/calculadora-cientifica-tool.webp"),
        title: "Grados a radianes",
        caption: "Conversor de ángulos para trigonometría",
      },
    ],
  },
  {
    path: "/notacion-cientifica",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.95,
    images: [
      {
        loc: imageLoc("/calculadora-cientifica-free.webp"),
        title: "Notación científica",
        caption: "Conversor decimal ↔ a×10ⁿ",
      },
    ],
  },
  {
    path: "/about-us",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.7,
    images: [
      {
        loc: imageLoc("/logo-icon.png"),
        title: "Sobre Calculadora Científica",
        caption: "Logo en la página Nosotros",
      },
    ],
  },
  {
    path: "/blog",
    lastMod: LASTMOD,
    changeFreq: "weekly",
    priority: 0.8,
  },
  {
    path: "/blog/como-usar-calculadora-cientifica",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.9,
    images: [
      {
        loc: imageLoc("/calculadora-cientifica.webp"),
        title: "Cómo usar calculadora científica",
        caption: "Tutorial práctico en español de México",
      },
    ],
  },
  {
    path: "/blog/calculadora-cientifica-vs-basica",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.85,
    images: [
      {
        loc: imageLoc("/calculadora-cientifica-online.webp"),
        title: "Científica vs básica",
        caption: "Diferencias entre calculadoras",
      },
    ],
  },
  {
    path: "/blog/seno-coseno-tangente",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.85,
    images: [
      {
        loc: imageLoc("/calculadora-cientifica-tool.webp"),
        title: "Seno coseno tangente",
        caption: "Trigonometría en calculadora científica",
      },
    ],
  },
  {
    path: "/blog/notacion-cientifica-explicada",
    lastMod: LASTMOD,
    changeFreq: "monthly",
    priority: 0.85,
    images: [
      {
        loc: imageLoc("/calculadora-cientifica-free.webp"),
        title: "Notación científica explicada",
        caption: "Guía de a×10ⁿ y tecla EXP",
      },
    ],
  },
  {
    path: "/contact-us",
    lastMod: LASTMOD,
    changeFreq: "yearly",
    priority: 0.6,
  },
  {
    path: "/privacy",
    lastMod: LASTMOD,
    changeFreq: "yearly",
    priority: 0.4,
  },
  {
    path: "/disclaimer",
    lastMod: LASTMOD,
    changeFreq: "yearly",
    priority: 0.4,
  },
];

export function absoluteUrl(path: string): string {
  if (path === "/") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path}`;
}
