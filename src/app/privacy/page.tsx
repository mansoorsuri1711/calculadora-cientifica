import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CONTACT_EMAIL, SITE_DOMAIN, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Aviso de Privacidad",
  description: `Aviso de privacidad de ${SITE_NAME} en ${SITE_DOMAIN}.`,
  alternates: { canonical: `${SITE_ORIGIN}/privacy` },
};

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Privacidad", href: "/privacy" }]} />
      <div className="container mx-auto max-w-3xl px-4 pb-10 pt-8">
        <h1 className="mb-6 font-display text-3xl font-bold text-ink">Aviso de privacidad</h1>
        <div className="space-y-5 text-ink/80 leading-relaxed">
          <p>Última actualización: 26 de octubre de 2026</p>
          <p>
            {SITE_NAME} (“nosotros”) opera {SITE_DOMAIN}. Este aviso explica qué información
            tratamos cuando usas la calculadora científica y el resto del sitio.
          </p>
          <h2 className="font-display text-xl font-semibold text-ink">Información que recopilamos</h2>
          <p>
            Las expresiones que escribes en la calculadora se procesan en tu navegador para mostrar
            el resultado; no las guardamos como una cuenta de usuario. Si nos contactas, recibimos el
            correo y el mensaje que envías. Los registros del servidor o analítica pueden incluir
            dirección IP, tipo de navegador y páginas visitadas.
          </p>
          <h2 className="font-display text-xl font-semibold text-ink">Uso de la información</h2>
          <p>
            Usamos los mensajes de contacto para responder soporte y comentarios. La analítica
            agregada nos ayuda a mejorar el rendimiento y el contenido. No vendemos datos personales.
          </p>
          <h2 className="font-display text-xl font-semibold text-ink">Cookies y analítica</h2>
          <p>
            Podemos usar cookies propias o herramientas de medición respetuosas con la privacidad.
            Puedes controlar las cookies desde la configuración de tu navegador.
          </p>
          <h2 className="font-display text-xl font-semibold text-ink">Terceros</h2>
          <p>
            El hosting y servicios de infraestructura pueden procesar datos técnicos necesarios para
            entregar el sitio. No compartimos tus mensajes de contacto con anunciantes.
          </p>
          <h2 className="font-display text-xl font-semibold text-ink">Contacto</h2>
          <p>
            Para ejercer derechos de privacidad o hacer preguntas, escribe a{" "}
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
