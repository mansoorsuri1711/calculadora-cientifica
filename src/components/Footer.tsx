import Link from 'next/link';
import CtaButton from '@/components/CtaButton';
import { CONTACT_EMAIL, SITE_DOMAIN, SITE_NAME, SITE_TAGLINE } from '@/lib/siteConfig';

export default function Footer() {
  return (
    <footer className="relative z-20 border-t border-ink/10 bg-gradient-to-br from-white via-brand-soft to-mist pt-8 pb-2 px-4 text-ink md:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h2 className="mb-4 font-display text-xl font-bold text-ink">{SITE_NAME}</h2>
            <p className="mb-4 text-sm text-ink/75">{SITE_TAGLINE}</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-violet-soft underline hover:no-underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-ink">Herramientas</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-ink/85 hover:text-ink hover:underline">Calculadora científica</Link></li>
              <li><Link href="/calculadora-trigonometrica" className="text-ink/85 hover:text-ink hover:underline">Calculadora trigonométrica</Link></li>
              <li><Link href="/grados-a-radianes" className="text-ink/85 hover:text-ink hover:underline">Grados a radianes</Link></li>
              <li><Link href="/notacion-cientifica" className="text-ink/85 hover:text-ink hover:underline">Notación científica</Link></li>
              <li><Link href="/funciones" className="text-ink/85 hover:text-ink hover:underline">Funciones</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-ink">Guías</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/como-usar" className="text-ink/85 hover:text-ink hover:underline">Cómo usar</Link></li>
              <li><Link href="/blog/como-usar-calculadora-cientifica" className="text-ink/85 hover:text-ink hover:underline">Guía paso a paso</Link></li>
              <li><Link href="/blog/calculadora-cientifica-vs-basica" className="text-ink/85 hover:text-ink hover:underline">Científica vs básica</Link></li>
              <li><Link href="/blog/seno-coseno-tangente" className="text-ink/85 hover:text-ink hover:underline">Seno, coseno y tangente</Link></li>
              <li><Link href="/blog/notacion-cientifica-explicada" className="text-ink/85 hover:text-ink hover:underline">Notación científica</Link></li>
              <li><Link href="/about-us" className="text-ink/85 hover:text-ink hover:underline">Nosotros</Link></li>
              <li><Link href="/contact-us" className="text-ink/85 hover:text-ink hover:underline">Contacto</Link></li>
              <li><Link href="/privacy" className="text-ink/85 hover:text-ink hover:underline">Privacidad</Link></li>
              <li><Link href="/disclaimer" className="text-ink/85 hover:text-ink hover:underline">Aviso legal</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-ink">Empieza gratis</h2>
            <p className="mb-4 text-sm text-ink/80">
              Resuelve trigonometría, logaritmos y potencias desde el navegador, sin instalar nada.
            </p>
            <CtaButton
              href="/#calculadora"
              size="sm"
              ariaLabel="Abrir la calculadora científica gratis"
              icon="arrow"
            >
              ABRIR CALCULADORA
            </CtaButton>
          </div>
        </div>

        <div className="mt-8 border-t border-ink/15 pt-4 pb-3 text-center text-sm text-ink/70">
          <p className="mb-0">
            © 2026 {SITE_NAME}. Todos los derechos reservados. |{' '}
            <Link href="/" className="underline hover:no-underline text-ink/90">{SITE_DOMAIN}</Link>
          </p>
          <p className="mt-2 text-xs text-ink/45">
            Herramienta educativa gratuita. Verifica resultados críticos en tu curso o laboratorio.
          </p>
        </div>
      </div>
    </footer>
  );
}
