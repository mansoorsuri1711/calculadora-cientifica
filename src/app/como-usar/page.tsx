import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import {
  BRAND_FEATURE_3,
  OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Cómo Usar la Calculadora Científica",
  description:
    "Aprende a usar la calculadora científica online: DEG/RAD, seno, logaritmos, potencias, Ans y notación científica con ejemplos en español de México.",
  alternates: { canonical: `${SITE_ORIGIN}/como-usar` },
  openGraph: {
    title: "Cómo Usar la Calculadora Científica",
    description: "Guía práctica con ejemplos para secundaria, prepa y universidad.",
    url: `${SITE_ORIGIN}/como-usar`,
    siteName: SITE_NAME,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Cómo usar calculadora científica" }],
  },
};

const faqs = [
  {
    question: "¿Por qué mi seno no da 0.5 en 30?",
    answer:
      "Casi seguro estás en modo RAD. Cambia a DEG, borra con AC y vuelve a calcular sin(30).",
  },
  {
    question: "¿Cómo escribo 2×10³?",
    answer:
      "Puedes usar 2*10^3 o 2e+3 con la tecla EXP. También convierte en la página de notación científica.",
  },
];

export default function ComoUsarPage() {
  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cómo usar la calculadora científica online",
    description: "Pasos para resolver operaciones científicas en calculadoracientifica.org",
    inLanguage: "es-MX",
    step: [
      { "@type": "HowToStep", name: "Abre la calculadora", text: "Ve a la página de inicio y localiza el teclado científico." },
      { "@type": "HowToStep", name: "Elige DEG o RAD", text: "Selecciona el modo angular según tu problema." },
      { "@type": "HowToStep", name: "Escribe la expresión", text: "Usa funciones, paréntesis y operadores." },
      { "@type": "HowToStep", name: "Presiona igual", text: "Revisa el resultado y reutiliza Ans si lo necesitas." },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }} />
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Cómo usar", href: "/como-usar" },
        ]}
      />
      <article className="container mx-auto max-w-4xl px-4 pb-12 pt-8">
        <h1 className="mb-4 font-display text-3xl font-bold text-white md:text-4xl">
          Cómo usar la calculadora científica
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-white/80">
          Esta guía resume el flujo correcto para no equivocarte con ángulos, paréntesis ni notación
          científica. Combínala con la herramienta en vivo de {SITE_NAME}.
        </p>

        <div className="relative mb-10 aspect-video overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={BRAND_FEATURE_3}
            alt="Estudiante usando la calculadora científica paso a paso"
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            priority
          />
        </div>

        <section className="mb-10">
          <h2 className="mb-3 font-display text-2xl font-semibold text-white">1. Elige el modo angular</h2>
          <p className="leading-relaxed text-white/80">
            En México, la mayoría de problemas de secundaria y prepa usan <strong className="text-white">grados</strong>.
            Si tu fórmula de cálculo o física pide radianes, cambia a RAD antes de tocar sin, cos o tan.
            Puedes convertir valores en{" "}
            <Link href="/grados-a-radianes" className="text-orange-soft underline">
              grados a radianes
            </Link>
            .
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 font-display text-2xl font-semibold text-white">2. Respeta paréntesis y orden</h2>
          <p className="leading-relaxed text-white/80">
            Escribe funciones con paréntesis: <code className="text-orange-soft">sin(45)</code>,{" "}
            <code className="text-orange-soft">log(1000)</code>,{" "}
            <code className="text-orange-soft">sqrt(81)</code>. Para potencias usa{" "}
            <code className="text-orange-soft">2^8</code>. El teclado inserta muchos paréntesis por ti;
            ciérralos antes de pulsar =.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 font-display text-2xl font-semibold text-white">3. Usa 2nd, Ans y EXP</h2>
          <p className="leading-relaxed text-white/80">
            <strong className="text-white">2nd</strong> cambia senos por arcoseno y similares.{" "}
            <strong className="text-white">Ans</strong> reutiliza el último resultado.{" "}
            <strong className="text-white">EXP</strong> escribe notación tipo{" "}
            <code className="text-orange-soft">1.25e+5</code>. Amplía con el{" "}
            <Link href="/blog/como-usar-calculadora-cientifica" className="text-orange-soft underline">
              tutorial del blog
            </Link>
            .
          </p>
        </section>

        <section className="mb-10 rounded-2xl border border-orange/30 bg-orange/10 p-6">
          <h2 className="mb-2 font-display text-xl font-semibold text-white">Practica ahora</h2>
          <p className="mb-4 text-white/80">Prueba: sin(30)+cos(60)+log(10)</p>
          <Link
            href="/#calculadora"
            className="inline-flex rounded-xl bg-orange px-5 py-3 text-sm font-bold text-white hover:brightness-110"
          >
            Abrir calculadora
          </Link>
        </section>

        <FaqSection items={faqs} title="Dudas frecuentes al usarla" />
      </article>
    </>
  );
}
