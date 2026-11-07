import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import GradosRadianesCalculator from "@/components/GradosRadianesCalculator";
import {
  BRAND_FEATURE_3,
  OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Grados a Radianes — Conversor Online",
  description:
    "Convierte grados a radianes y radianes a grados con la fórmula π/180. Herramienta gratis para calculadora científica y trigonometría.",
  alternates: { canonical: `${SITE_ORIGIN}/grados-a-radianes` },
  openGraph: {
    title: "Grados a Radianes — Conversor Online",
    description: "Pasa ángulos entre grados y radianes al instante.",
    url: `${SITE_ORIGIN}/grados-a-radianes`,
    siteName: SITE_NAME,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Conversor grados a radianes" }],
  },
};

export default function GradosPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Grados a radianes", href: "/grados-a-radianes" },
        ]}
      />
      <div className="container mx-auto max-w-4xl px-4 pb-12 pt-8">
        <h1 className="mb-3 font-display text-3xl font-bold text-ink md:text-4xl">
          Conversor de grados a radianes
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-ink/80">
          Antes de usar sin, cos o tan en tu{" "}
          <Link href="/" className="text-orange-soft underline">
            calculadora científica
          </Link>
          , confirma si el problema está en grados o radianes. Este conversor aplica las fórmulas
          estándar al instante.
        </p>

        <GradosRadianesCalculator />

        <section className="mt-12 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-ink/10">
            <Image
              src={BRAND_FEATURE_3}
              alt="Conversión de grados a radianes para trigonometría"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="mb-3 font-display text-2xl font-semibold text-ink">Fórmulas</h2>
            <p className="mb-3 leading-relaxed text-ink/80">
              <strong className="text-ink">radianes = grados × π / 180</strong>
            </p>
            <p className="mb-3 leading-relaxed text-ink/80">
              <strong className="text-ink">grados = radianes × 180 / π</strong>
            </p>
            <p className="leading-relaxed text-ink/75">
              Ejemplo: 180° = π rad · 90° = π/2 rad · π rad = 180°. Luego vuelve a la{" "}
              <Link href="/calculadora-trigonometrica" className="text-orange-soft underline">
                calculadora trigonométrica
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
