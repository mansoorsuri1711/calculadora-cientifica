import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostSchema from "@/components/BlogPostSchema";
import {
  BRAND_FEATURE_2,
  OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
} from "@/lib/siteConfig";

const slug = "calculadora-cientifica-vs-basica";
const title = "Calculadora científica vs básica: diferencias clave";
const description =
  "Compara la calculadora científica con la básica: funciones, usos escolares en México y cuándo necesitas trigonometría o logaritmos.";

export const metadata: Metadata = {
  title: "Calculadora Científica vs Básica",
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

export default function BlogVsBasica() {
  return (
    <>
      <BlogPostSchema
        title={title}
        description={description}
        slug={slug}
        datePublished="2026-10-26"
        image={`${SITE_ORIGIN}${BRAND_FEATURE_2}`}
      />
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Científica vs básica", href: `/blog/${slug}` },
        ]}
      />
      <article className="container mx-auto max-w-3xl px-4 pb-12 pt-8">
        <p className="mb-2 text-sm text-white/50">26 de octubre de 2026 · 9 min</p>
        <h1 className="mb-6 font-display text-3xl font-bold text-white md:text-4xl">{title}</h1>
        <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={BRAND_FEATURE_2}
            alt="Comparación entre calculadora científica y calculadora básica"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-white/80">
          <p>
            La pregunta <strong className="text-white">calculadora científica vs básica</strong>{" "}
            aparece cuando compras tu primera herramienta para la escuela o cuando descubres que la
            del celular “de siempre” no tiene seno ni logaritmo.
          </p>

          <h2 className="font-display text-2xl font-semibold text-white">Qué hace cada una</h2>
          <p>
            La <strong className="text-white">básica</strong> cubre suma, resta, multiplicación,
            división y a veces porcentaje o raíz cuadrada simple. La{" "}
            <strong className="text-white">científica</strong> agrega trigonometría, logaritmos,
            potencias, factoriales, constantes (π, e) y modos DEG/RAD.
          </p>

          <h2 className="font-display text-2xl font-semibold text-white">Cuándo te alcanza la básica</h2>
          <p>
            Aritmética de primaria, totales de una lista, propinas o fracciones sencillas convertidas
            a decimal. Si tu materia no pide ángulos ni “elevar a”, la básica basta.
          </p>

          <h2 className="font-display text-2xl font-semibold text-white">Cuándo necesitas la científica</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Trigonometría y geometría con senos/cosenos</li>
            <li>Química con notación científica y logaritmos (pH)</li>
            <li>Física con potencias de 10 y constantes</li>
            <li>Álgebra con raíces, exponentes y factoriales</li>
          </ul>

          <h2 className="font-display text-2xl font-semibold text-white">Opción online</h2>
          <p>
            No siempre hace falta comprar hardware el mismo día. Prueba la{" "}
            <Link href="/" className="text-orange-soft underline">
              calculadora científica gratis
            </Link>{" "}
            de {SITE_NAME}, revisa las{" "}
            <Link href="/funciones" className="text-orange-soft underline">
              funciones
            </Link>{" "}
            y decide si más adelante quieres un modelo Casio o TI para el aula.
          </p>

          <p>
            Sigue con{" "}
            <Link href="/blog/como-usar-calculadora-cientifica" className="text-orange-soft underline">
              cómo usarla
            </Link>{" "}
            o con{" "}
            <Link href="/blog/notacion-cientifica-explicada" className="text-orange-soft underline">
              notación científica
            </Link>
            .
          </p>
        </div>
      </article>
    </>
  );
}
