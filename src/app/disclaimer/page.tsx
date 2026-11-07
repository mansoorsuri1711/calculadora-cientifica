import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CONTACT_EMAIL, SITE_DOMAIN, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Aviso Legal",
  description: `Aviso legal de ${SITE_NAME}: herramienta educativa, no sustituye asesoría académica profesional.`,
  alternates: { canonical: `${SITE_ORIGIN}/disclaimer` },
};

export default function DisclaimerPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Aviso legal", href: "/disclaimer" }]} />
      <div className="container mx-auto max-w-3xl px-4 pb-10 pt-8">
        <h1 className="mb-6 font-display text-3xl font-bold text-ink">Aviso legal</h1>
        <div className="space-y-5 text-ink/80 leading-relaxed">
          <p>Última actualización: 26 de octubre de 2026</p>
          <p>
            {SITE_NAME} en {SITE_DOMAIN} ofrece una calculadora científica y artículos educativos.
            No somos una institución académica oficial ni sustituimos el criterio de tu profesor,
            laboratorio o reglamento de examen.
          </p>
          <h2 className="font-display text-xl font-semibold text-ink">Sin garantías absolutas</h2>
          <p>
            Los resultados dependen de la expresión ingresada, el modo DEG/RAD y los límites
            numéricos del navegador. Verifica siempre los cálculos críticos (exámenes, reportes o
            diseño) con una segunda fuente cuando el margen de error importe.
          </p>
          <h2 className="font-display text-xl font-semibold text-ink">Uso educativo</h2>
          <p>
            El contenido está pensado para aprendizaje y práctica. Eres responsable de cumplir las
            reglas de tu escuela o universidad sobre el uso de calculadoras en evaluaciones.
          </p>
          <h2 className="font-display text-xl font-semibold text-ink">Exactitud</h2>
          <p>
            Procuramos fórmulas y guías claras, pero el contenido puede contener errores o
            desactualizarse. El uso del sitio es bajo tu propio riesgo. Dudas:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-violet-soft underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}
