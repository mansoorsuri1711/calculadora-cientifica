import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { CONTACT_EMAIL, SITE_NAME, SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Contacto — Calculadora Científica",
  description:
    "Contacta al equipo de Calculadora Científica en calculadoracientifica.org para dudas, sugerencias o soporte.",
  alternates: { canonical: `${SITE_ORIGIN}/contact-us` },
  openGraph: {
    title: "Contacto — Calculadora Científica",
    description: `Escribe al equipo de ${SITE_NAME}.`,
    url: `${SITE_ORIGIN}/contact-us`,
    siteName: SITE_NAME,
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Contacto", href: "/contact-us" }]} />
      <div className="container mx-auto max-w-3xl px-4 pb-10 pt-8">
        <h1 className="mb-3 font-display text-3xl font-bold text-ink md:text-4xl">Contacto</h1>
        <p className="mb-8 text-lg text-ink/80">
          ¿Ideas para nuevas funciones, un error en un cálculo o dudas sobre las guías? Escríbenos a{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-violet-soft underline">
            {CONTACT_EMAIL}
          </a>{" "}
          o usa el formulario.
        </p>
        <ContactForm />
      </div>
    </>
  );
}
