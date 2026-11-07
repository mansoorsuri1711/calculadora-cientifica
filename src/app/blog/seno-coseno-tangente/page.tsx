import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import {
  BRAND_FEATURE_3,
  OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
} from "@/lib/siteConfig";

const slug = "seno-coseno-tangente";
const title = "Seno, coseno y tangente en la calculadora científica";
const description =
  "Cómo calcular seno, coseno y tangente en una calculadora científica sin equivocarte de grados o radianes, con ejemplos claros.";

export const metadata: Metadata = {
  title: "Seno, Coseno y Tangente en Calculadora Científica",
  description,
  alternates: { canonical: `${SITE_ORIGIN}/blog/${slug}` },
  openGraph: {
    title,
    description,
    url: `${SITE_ORIGIN}/blog/${slug}`,
    siteName: SITE_NAME,
    type: "article",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: title }],
  },
};

export default function BlogTrig() {
  return (
    <>
      <BlogPostSchema
        title={title}
        description={description}
        slug={slug}
        datePublished="2026-10-26"
        image={`${SITE_ORIGIN}${BRAND_FEATURE_3}`}
      />
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Seno coseno tangente", href: `/blog/${slug}` },
        ]}
      />
      <article className="container mx-auto max-w-3xl px-4 pb-12 pt-8">
        <p className="mb-2 text-sm text-ink/50">26 de octubre de 2026 · 10 min</p>
        <h1 className="mb-6 font-display text-3xl font-bold text-ink md:text-4xl">{title}</h1>
        <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-ink/10">
          <Image
            src={BRAND_FEATURE_3}
            alt="Cálculo de seno coseno y tangente en calculadora científica"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-ink/80">
          <p>
            Dominar <strong className="text-ink">seno, coseno y tangente</strong> en la calculadora
            científica es esencial para triángulos rectángulos, ondas y problemas de física. El truco
            no está en memorizar más botones: está en el modo angular correcto.
          </p>

          <h2 className="font-display text-2xl font-semibold text-ink">Valores que debes reconocer</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>sin(30°) = 0.5 · cos(60°) = 0.5 · tan(45°) = 1</li>
            <li>sin(90°) = 1 · cos(0°) = 1</li>
            <li>asin(0.5) en DEG = 30°</li>
          </ul>

          <h2 className="font-display text-2xl font-semibold text-ink">Pasos en la calculadora</h2>
          <ol className="list-decimal space-y-2 pl-5">
            <li>Pon DEG si el ángulo viene en grados.</li>
            <li>Escribe sin(, cos( o tan(.</li>
            <li>Ingresa el ángulo, cierra ) y pulsa =.</li>
            <li>Para el ángulo a partir de una razón, usa 2nd → asin/acos/atan.</li>
          </ol>

          <h2 className="font-display text-2xl font-semibold text-ink">Errores frecuentes</h2>
          <p>
            Estar en RAD sin darte cuenta; olvidar paréntesis en expresiones mixtas; usar tan cerca
            de 90° (el valor crece sin límite). Si necesitas pasar el ángulo de un sistema a otro,
            usa el{" "}
            <Link href="/grados-a-radianes" className="text-orange-soft underline">
              conversor grados ↔ radianes
            </Link>
            .
          </p>

          <p>
            Practica en la{" "}
            <Link href="/calculadora-trigonometrica" className="text-orange-soft underline">
              calculadora trigonométrica
            </Link>{" "}
            de {SITE_NAME} o vuelve a la{" "}
            <Link href="/" className="text-orange-soft underline">
              calculadora científica
            </Link>
            .
          </p>
        </div>
      </article>
    </>
  );
}
