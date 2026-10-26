import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import {
  BRAND_FEATURE_4,
  OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
} from "@/lib/siteConfig";

const slug = "notacion-cientifica-explicada";
const title = "Notación científica: qué es y cómo usarla";
const description =
  "Qué es la notación científica, cómo pasar de decimal a a×10ⁿ y cómo usar EXP en la calculadora científica con ejemplos.";

export const metadata: Metadata = {
  title: "Notación Científica Explicada",
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

export default function BlogNotacion() {
  return (
    <>
      <BlogPostSchema
        title={title}
        description={description}
        slug={slug}
        datePublished="2026-10-26"
        image={`${SITE_ORIGIN}${BRAND_FEATURE_4}`}
      />
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Notación científica", href: `/blog/${slug}` },
        ]}
      />
      <article className="container mx-auto max-w-3xl px-4 pb-12 pt-8">
        <p className="mb-2 text-sm text-white/50">26 de octubre de 2026 · 8 min</p>
        <h1 className="mb-6 font-display text-3xl font-bold text-white md:text-4xl">{title}</h1>
        <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={BRAND_FEATURE_4}
            alt="Ejemplos de notación científica en calculadora"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-white/80">
          <p>
            La <strong className="text-white">notación científica</strong> escribe un número como{" "}
            <strong className="text-white">a × 10ⁿ</strong>, donde 1 ≤ |a| &lt; 10 (salvo el cero) y n
            es un entero. Sirve para distancias astronómicas, masas atómicas o resultados muy
            pequeños en laboratorio.
          </p>

          <h2 className="font-display text-2xl font-semibold text-white">Ejemplos rápidos</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>125000 = 1.25 × 10⁵</li>
            <li>0.00034 = 3.4 × 10⁻⁴</li>
            <li>6.02 × 10²³ (orden del número de Avogadro)</li>
          </ul>

          <h2 className="font-display text-2xl font-semibold text-white">En la calculadora científica</h2>
          <p>
            En {SITE_NAME} puedes escribir <code className="text-orange-soft">1.25e+5</code> con la
            tecla EXP o convertir con el{" "}
            <Link href="/notacion-cientifica" className="text-orange-soft underline">
              conversor de notación científica
            </Link>
            . Evita confundir la tecla de exponente ^ con la notación e+/e−.
          </p>

          <h2 className="font-display text-2xl font-semibold text-white">Consejo de verificación</h2>
          <p>
            Después de convertir, multiplica mentalmente: 1.25 × 100000 debe verse como 125000. Si el
            orden de magnitud no cuadra, revisa el signo del exponente.
          </p>

          <p>
            Practica también en la{" "}
            <Link href="/#calculadora" className="text-orange-soft underline">
              calculadora científica
            </Link>{" "}
            y sigue con{" "}
            <Link href="/blog/como-usar-calculadora-cientifica" className="text-orange-soft underline">
              cómo usarla paso a paso
            </Link>
            .
          </p>
        </div>
      </article>
    </>
  );
}
