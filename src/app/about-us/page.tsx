import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaButton from "@/components/CtaButton";
import { BRAND_LOGO, CONTACT_EMAIL, SITE_DOMAIN, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Nosotros — Calculadora Científica",
  description:
    "Conoce Calculadora Científica en calculadoracientifica.org: herramienta educativa gratis en español de México para trigonometría, logaritmos y más.",
  alternates: { canonical: `${SITE_ORIGIN}/about-us` },
  openGraph: {
    title: "Nosotros — Calculadora Científica",
    description: `Proyecto educativo independiente en ${SITE_DOMAIN}.`,
    url: `${SITE_ORIGIN}/about-us`,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Nosotros", href: "/about-us" }]} />
      <div className="container mx-auto max-w-4xl px-4 pb-10 pt-8">
        <div className="mb-10 flex flex-col items-start gap-8 md:flex-row">
          <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden rounded-2xl border border-ink/10 bg-brand-soft">
            <Image
              src={BRAND_LOGO}
              alt="Logo de Calculadora Científica"
              fill
              sizes="160px"
              className="object-contain p-3"
              priority
            />
          </div>
          <div>
            <h1 className="mb-4 font-display text-3xl font-bold text-ink md:text-4xl">
              Sobre {SITE_NAME}
            </h1>
            <p className="text-lg leading-relaxed text-ink/80">
              Somos un sitio educativo enfocado en una sola cosa: ofrecerte una{" "}
              <strong className="text-ink">calculadora científica online</strong> clara, rápida y
              acompañada de guías en español de México. Operamos en{" "}
              <strong className="text-ink">{SITE_DOMAIN}</strong>.
            </p>
          </div>
        </div>

        <section className="mb-10 space-y-4 leading-relaxed text-ink/80">
          <h2 className="font-display text-2xl font-semibold text-ink">Nuestra misión</h2>
          <p>
            Muchas páginas del SERP muestran solo un teclado embebido o empujan a comprar hardware.
            Nosotros combinamos la herramienta con contenido que responde lo que realmente buscan
            estudiantes: cómo usar grados y radianes, cómo calcular seno/coseno y cómo escribir
            notación científica.
          </p>
          <p>
            Los cálculos se evalúan en tu navegador. No vendemos cursos milagro ni apps engañosas.
            Si algo falla o quieres sugerir una función, escribe a{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-orange-soft underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 font-display text-2xl font-semibold text-ink">Qué encontrarás</h2>
          <ul className="list-disc space-y-2 pl-5 text-ink/80">
            <li>
              <Link href="/" className="text-orange-soft underline">
                Calculadora científica gratis
              </Link>
            </li>
            <li>
              <Link href="/calculadora-trigonometrica" className="text-orange-soft underline">
                Calculadora trigonométrica
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-orange-soft underline">
                Blog con guías basadas en búsquedas reales
              </Link>
            </li>
          </ul>
        </section>

        <CtaButton href="/#calculadora" ariaLabel="Abrir calculadora científica">
          ABRIR CALCULADORA
        </CtaButton>
      </div>
    </>
  );
}
