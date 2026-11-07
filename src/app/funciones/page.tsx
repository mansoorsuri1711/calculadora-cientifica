import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  BRAND_FEATURE_2,
  OG_IMAGE,
  SITE_NAME,
  SITE_ORIGIN,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Funciones de la Calculadora Científica",
  description:
    "Lista de funciones de la calculadora científica: trigonometría, logaritmos, potencias, raíces, factorial, π, e y modo DEG/RAD.",
  alternates: { canonical: `${SITE_ORIGIN}/funciones` },
  openGraph: {
    title: "Funciones de la Calculadora Científica",
    description: "Todo lo que puedes calcular en calculadoracientifica.org",
    url: `${SITE_ORIGIN}/funciones`,
    siteName: SITE_NAME,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Funciones calculadora científica" }],
  },
};

const groups = [
  {
    title: "Trigonometría",
    items: [
      "sin, cos, tan — seno, coseno y tangente",
      "asin, acos, atan — funciones inversas (2nd)",
      "Modo DEG (grados) o RAD (radianes)",
    ],
  },
  {
    title: "Logaritmos y exponenciales",
    items: ["ln(x) — logaritmo natural", "log(x) — logaritmo base 10", "exp(x) — e elevado a x", "x^y — potencias"],
  },
  {
    title: "Álgebra y utilidades",
    items: ["√ y raíces con sqrt(", "x² y 1/x", "Valor absoluto abs(", "Factorial n!", "Porcentaje %", "Constantes π y e"],
  },
];

export default function FuncionesPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Funciones", href: "/funciones" },
        ]}
      />
      <div className="container mx-auto max-w-4xl px-4 pb-12 pt-8">
        <h1 className="mb-4 font-display text-3xl font-bold text-ink md:text-4xl">
          Funciones de la calculadora científica
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-ink/80">
          {SITE_NAME} concentra las operaciones que más buscan estudiantes en México: seno, coseno,
          logaritmos, potencias y notación científica. Aquí tienes el mapa completo antes de abrir el
          teclado.
        </p>

        <div className="relative mb-10 aspect-video overflow-hidden rounded-2xl border border-ink/10">
          <Image
            src={BRAND_FEATURE_2}
            alt="Panel de funciones de la calculadora científica online"
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-8">
          {groups.map((g) => (
            <section key={g.title}>
              <h2 className="mb-3 font-display text-2xl font-semibold text-ink">{g.title}</h2>
              <ul className="space-y-2 text-ink/80">
                {g.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-orange" aria-hidden>
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-10 leading-relaxed text-ink/75">
          Practica en la{" "}
          <Link href="/#calculadora" className="text-orange-soft underline">
            calculadora científica
          </Link>
          , profundiza en{" "}
          <Link href="/calculadora-trigonometrica" className="text-orange-soft underline">
            trigonometría
          </Link>{" "}
          o lee{" "}
          <Link href="/como-usar" className="text-orange-soft underline">
            cómo usarla paso a paso
          </Link>
          .
        </p>
      </div>
    </>
  );
}
