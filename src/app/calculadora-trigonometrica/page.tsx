import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CalculadoraCientifica from "@/components/CalculadoraCientifica";
import {
  BRAND_FEATURE_3,
  OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Calculadora Trigonométrica Online",
  description:
    "Calculadora trigonométrica gratis: seno, coseno, tangente e inversas con modo grados o radianes. Ideal para triángulos y física.",
  alternates: { canonical: `${SITE_ORIGIN}/calculadora-trigonometrica` },
  openGraph: {
    title: "Calculadora Trigonométrica Online",
    description: "Resuelve sin, cos y tan en segundos con DEG/RAD.",
    url: `${SITE_ORIGIN}/calculadora-trigonometrica`,
    siteName: SITE_NAME,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Calculadora trigonométrica" }],
  },
};

export default function TrigPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Calculadora trigonométrica", href: "/calculadora-trigonometrica" },
        ]}
      />
      <div className="container mx-auto max-w-5xl px-4 pb-12 pt-8">
        <h1 className="mb-3 font-display text-3xl font-bold text-ink md:text-4xl">
          Calculadora trigonométrica
        </h1>
        <p className="mb-8 max-w-3xl text-lg leading-relaxed text-ink/80">
          Usa la misma <strong className="text-ink">calculadora científica</strong> enfocada en
          trigonometría: verifica el modo DEG/RAD y calcula senos, cosenos, tangentes e inversas.
        </p>

        <CalculadoraCientifica />

        <section className="mt-12 grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-3 font-display text-2xl font-semibold text-ink">
              Ejemplos que sí salen en el examen
            </h2>
            <ul className="space-y-3 text-ink/80">
              <li>
                <code className="text-orange-soft">sin(30)</code> en DEG → 0.5
              </li>
              <li>
                <code className="text-orange-soft">cos(60)</code> en DEG → 0.5
              </li>
              <li>
                <code className="text-orange-soft">tan(45)</code> en DEG → 1
              </li>
              <li>
                <code className="text-orange-soft">asin(0.5)</code> en DEG → 30
              </li>
            </ul>
            <p className="mt-4 leading-relaxed text-ink/75">
              Guía detallada:{" "}
              <Link href="/blog/seno-coseno-tangente" className="text-orange-soft underline">
                seno, coseno y tangente
              </Link>
              . Conversiones:{" "}
              <Link href="/grados-a-radianes" className="text-orange-soft underline">
                grados a radianes
              </Link>
              .
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-ink/10">
            <Image
              src={BRAND_FEATURE_3}
              alt="Calculadora trigonométrica con seno coseno y tangente"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </section>
      </div>
    </>
  );
}
