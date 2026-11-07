import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import NotacionCientificaCalculator from "@/components/NotacionCientificaCalculator";
import {
  BRAND_FEATURE_4,
  OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Notación Científica — Conversor Online",
  description:
    "Convierte números a notación científica y viceversa. Aprende a usar EXP en la calculadora científica con ejemplos claros.",
  alternates: { canonical: `${SITE_ORIGIN}/notacion-cientifica` },
  openGraph: {
    title: "Notación Científica — Conversor Online",
    description: "De decimal a a×10^n y de regreso, gratis.",
    url: `${SITE_ORIGIN}/notacion-cientifica`,
    siteName: SITE_NAME,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Conversor notación científica" }],
  },
};

export default function NotacionPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Notación científica", href: "/notacion-cientifica" },
        ]}
      />
      <div className="container mx-auto max-w-4xl px-4 pb-12 pt-8">
        <h1 className="mb-3 font-display text-3xl font-bold text-ink md:text-4xl">
          Conversor de notación científica
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-ink/80">
          La notación científica expresa números muy grandes o muy pequeños como{" "}
          <strong className="text-ink">a × 10ⁿ</strong>. Úsala en química, física y al trabajar con
          la tecla EXP de la calculadora.
        </p>

        <NotacionCientificaCalculator />

        <section className="mt-12 grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-3 font-display text-2xl font-semibold text-ink">
              Cómo escribirla en la calculadora
            </h2>
            <p className="mb-3 leading-relaxed text-ink/80">
              En {SITE_NAME} puedes escribir <code className="text-orange-soft">1.25e+5</code> o
              usar EXP después del coeficiente. El resultado 125000 equivale a 1.25 × 10⁵.
            </p>
            <p className="leading-relaxed text-ink/75">
              Explicación completa en el{" "}
              <Link href="/blog/notacion-cientifica-explicada" className="text-orange-soft underline">
                artículo de notación científica
              </Link>{" "}
              o prueba la{" "}
              <Link href="/#calculadora" className="text-orange-soft underline">
                calculadora principal
              </Link>
              .
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-ink/10">
            <Image
              src={BRAND_FEATURE_4}
              alt="Conversor de notación científica en calculadora online"
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
