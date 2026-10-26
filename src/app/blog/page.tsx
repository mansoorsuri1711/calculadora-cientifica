import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  BRAND_FEATURE_2,
  BRAND_FEATURE_3,
  BRAND_FEATURE_4,
  BRAND_HERO,
  SITE_NAME,
  SITE_ORIGIN,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Blog de Calculadora Científica",
  description:
    "Guías basadas en búsquedas reales: cómo usar la calculadora científica, científica vs básica, seno/coseno/tangente y notación científica.",
  alternates: { canonical: `${SITE_ORIGIN}/blog` },
  openGraph: {
    title: "Blog de Calculadora Científica",
    description: "Artículos prácticos en español de México.",
    url: `${SITE_ORIGIN}/blog`,
    siteName: SITE_NAME,
    type: "website",
  },
};

const posts = [
  {
    href: "/blog/como-usar-calculadora-cientifica",
    title: "Cómo usar una calculadora científica: guía práctica",
    excerpt:
      "Modo DEG/RAD, paréntesis, seno, logaritmos, Ans y EXP con ejemplos listos para secundaria y prepa.",
    date: "Octubre 2026",
    read: "12 min",
    image: BRAND_HERO,
    alt: "Guía para usar calculadora científica online",
  },
  {
    href: "/blog/calculadora-cientifica-vs-basica",
    title: "Calculadora científica vs básica: diferencias clave",
    excerpt:
      "Cuándo basta sumar y restar, y cuándo necesitas trigonometría, potencias y logaritmos.",
    date: "Octubre 2026",
    read: "9 min",
    image: BRAND_FEATURE_2,
    alt: "Comparación calculadora científica y básica",
  },
  {
    href: "/blog/seno-coseno-tangente",
    title: "Seno, coseno y tangente en la calculadora científica",
    excerpt:
      "Cómo calcular sin, cos y tan sin equivocarte de grados o radianes, con ejemplos de triángulos.",
    date: "Octubre 2026",
    read: "10 min",
    image: BRAND_FEATURE_3,
    alt: "Seno coseno tangente en calculadora científica",
  },
  {
    href: "/blog/notacion-cientifica-explicada",
    title: "Notación científica: qué es y cómo usarla",
    excerpt:
      "De 0.00034 a 3.4×10⁻⁴ y el uso de EXP en la calculadora científica.",
    date: "Octubre 2026",
    read: "8 min",
    image: BRAND_FEATURE_4,
    alt: "Notación científica explicada con ejemplos",
  },
];

export default function BlogPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Blog", href: "/blog" }]} />
      <div className="container mx-auto max-w-5xl px-4 pb-10 pt-8">
        <h1 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">
          Blog de calculadora científica
        </h1>
        <p className="mb-10 text-lg text-white/80">
          Solo temas que la gente busca junto a “calculadora científica”: uso, comparación con la
          básica, trigonometría y notación científica. Sin artículos irrelevantes.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group block overflow-hidden border border-white/10 bg-white/5 transition-colors hover:border-violet/50 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet"
            >
              <article>
                <div className="relative aspect-video">
                  <Image
                    src={post.image}
                    alt={post.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="mb-2 text-xs text-white/50">
                    {post.date} · {post.read}
                  </p>
                  <h2 className="font-display text-xl font-semibold text-white group-hover:text-orange-soft">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{post.excerpt}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
