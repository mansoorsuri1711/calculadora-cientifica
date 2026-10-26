import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import {
  BRAND_HERO,
  OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
} from "@/lib/siteConfig";

const slug = "como-usar-calculadora-cientifica";
const title = "Cómo usar una calculadora científica: guía práctica";
const description =
  "Aprende a usar una calculadora científica paso a paso: DEG/RAD, seno, logaritmos, potencias, Ans y EXP con ejemplos en español de México.";

export const metadata: Metadata = {
  title: "Cómo Usar una Calculadora Científica",
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

export default function BlogComoUsar() {
  return (
    <>
      <BlogPostSchema
        title={title}
        description={description}
        slug={slug}
        datePublished="2026-10-26"
        image={`${SITE_ORIGIN}${BRAND_HERO}`}
      />
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Cómo usar", href: `/blog/${slug}` },
        ]}
      />
      <article className="container mx-auto max-w-3xl px-4 pb-12 pt-8">
        <p className="mb-2 text-sm text-white/50">26 de octubre de 2026 · 12 min</p>
        <h1 className="mb-6 font-display text-3xl font-bold text-white md:text-4xl">{title}</h1>
        <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={BRAND_HERO}
            alt="Estudiante aprendiendo a usar una calculadora científica"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-white/80">
          <p>
            Saber <strong className="text-white">cómo usar una calculadora científica</strong> ahorra
            tiempo en tareas de álgebra, trigonometría y física. La diferencia frente a la calculadora
            básica no es solo “más botones”: es entender el modo angular, el orden de operaciones y
            cómo recuperar el último resultado.
          </p>
          <p>
            En {SITE_NAME} puedes practicar todo en la{" "}
            <Link href="/#calculadora" className="text-orange-soft underline">
              calculadora online
            </Link>{" "}
            mientras lees. También tienes la ruta resumida en{" "}
            <Link href="/como-usar" className="text-orange-soft underline">
              cómo usar
            </Link>
            .
          </p>

          <h2 className="font-display text-2xl font-semibold text-white">1. Ubica DEG y RAD</h2>
          <p>
            Antes de tocar sin, cos o tan, mira si estás en grados o radianes. En secundaria y prepa
            en México casi siempre usarás <strong className="text-white">DEG</strong>. Si calculas
            sin(30) en RAD obtendrás un número distinto de 0.5: ese es el error clásico del examen.
          </p>

          <h2 className="font-display text-2xl font-semibold text-white">2. Escribe funciones con paréntesis</h2>
          <p>
            Lo más seguro es escribir <code className="text-orange-soft">sin(30)</code>,{" "}
            <code className="text-orange-soft">log(100)</code> o{" "}
            <code className="text-orange-soft">sqrt(49)</code>. Así evitas ambigüedades cuando combinas
            operaciones. Para potencias usa <code className="text-orange-soft">2^10</code>.
          </p>

          <h2 className="font-display text-2xl font-semibold text-white">3. Combina operaciones</h2>
          <p>
            Ejemplo: <code className="text-orange-soft">sin(30)+log(100)</code> en DEG debe dar 2.5.
            Si tu calculadora física exige pulsar el número después de la función, adapta el hábito;
            en nuestra web el estilo es expresión completa + igual.
          </p>

          <h2 className="font-display text-2xl font-semibold text-white">4. Ans, 2nd y EXP</h2>
          <p>
            <strong className="text-white">Ans</strong> reutiliza el último resultado.{" "}
            <strong className="text-white">2nd</strong> activa inversas (asin, acos, atan).{" "}
            <strong className="text-white">EXP</strong> escribe notación científica tipo 3.2e+4.
            Amplía con el{" "}
            <Link href="/notacion-cientifica" className="text-orange-soft underline">
              conversor de notación científica
            </Link>
            .
          </p>

          <h2 className="font-display text-2xl font-semibold text-white">Checklist rápida</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>¿Modo angular correcto?</li>
            <li>¿Paréntesis cerrados?</li>
            <li>¿Usaste log (base 10) o ln (natural) según el problema?</li>
            <li>¿El resultado tiene sentido (orden de magnitud)?</li>
          </ul>

          <p>
            Siguiente lectura:{" "}
            <Link href="/blog/seno-coseno-tangente" className="text-orange-soft underline">
              seno, coseno y tangente
            </Link>{" "}
            o la comparación{" "}
            <Link href="/blog/calculadora-cientifica-vs-basica" className="text-orange-soft underline">
              científica vs básica
            </Link>
            .
          </p>
        </div>
      </article>
    </>
  );
}
