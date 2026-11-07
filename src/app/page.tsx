import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import FaqSection from "@/components/FaqSection";
import CalculadoraCientifica from "@/components/CalculadoraCientifica";
import { WEB_APPLICATION_JSON_LD } from "@/lib/appFacts";
import { imageObjectLicensing } from "@/lib/schemaImageLicensing";
import {
  BRAND_FEATURE_2,
  BRAND_FEATURE_3,
  BRAND_FEATURE_4,
  BRAND_HERO,
  OG_IMAGE,
  SITE_HOME,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_RATING,
} from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: {
    default: "Calculadora Científica Online Gratis — Trig y Logs",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Calculadora científica online gratis en español de México. Seno, coseno, logaritmos, potencias, fracciones, grados/radianes y notación científica sin instalar apps.",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: {
    canonical: SITE_HOME,
    languages: { "es-MX": SITE_HOME, es: SITE_HOME },
  },
  openGraph: {
    title: "Calculadora Científica Online Gratis — Trig y Logs",
    description:
      "Resuelve trigonometría, logaritmos y potencias en segundos con nuestra calculadora científica web.",
    url: SITE_HOME,
    siteName: SITE_NAME,
    type: "website",
    locale: "es_MX",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Calculadora Científica — herramienta online gratis",
      },
    ],
  },
};

const faqs = [
  {
    question: "¿Qué es una calculadora científica?",
    answer:
      "Una calculadora científica es una herramienta que, además de sumar, restar, multiplicar y dividir, calcula funciones avanzadas como seno, coseno, tangente, logaritmos, potencias, raíces y factoriales. En calculadoracientifica.org la usas gratis en el navegador.",
  },
  {
    question: "¿Esta calculadora científica online es gratis?",
    answer:
      "Sí. La calculadora científica de calculadoracientifica.org es completamente gratis, sin registro y sin descargas. Funciona en celular, tablet o computadora.",
  },
  {
    question: "¿Debo usar grados o radianes?",
    answer:
      "En secundaria y preparatoria en México casi siempre se trabaja en grados (DEG). En cálculo universitario muchas fórmulas usan radianes (RAD). Cambia el modo en la parte superior de la calculadora antes de pulsar sin, cos o tan. También puedes convertir con nuestra herramienta de grados a radianes.",
  },
  {
    question: "¿Cómo calculo seno, coseno o tangente?",
    answer:
      "Elige DEG o RAD, pulsa sin(, cos( o tan(, escribe el ángulo, cierra el paréntesis y presiona =. Ejemplo en grados: sin(30) = 0.5. Lee la guía completa de seno, coseno y tangente en el blog.",
  },
  {
    question: "¿Sirve para fracciones y notación científica?",
    answer:
      "Puedes escribir divisiones como 3/4, potencias con ^ y notación tipo 1.25e+5. Para convertir entre decimal y notación científica usa la página dedicada de notación científica.",
  },
  {
    question: "¿En qué se diferencia de una calculadora básica?",
    answer:
      "La básica solo hace aritmética. La científica agrega trigonometría, logaritmos, exponentes, raíces y constantes como π y e, ideales para álgebra, física y química. Compara ambas en nuestro artículo científica vs básica.",
  },
  {
    question: "¿Funciona sin internet después de cargar?",
    answer:
      "Necesitas cargar la página una vez. Los cálculos se hacen en tu dispositivo; no enviamos tus expresiones a un servidor para resolverlas.",
  },
  {
    question: "¿Reemplaza a una Casio o TI física?",
    answer:
      "Para tareas escolares, tareas en línea y práctica diaria sí cubre la mayoría de operaciones. En exámenes controlados sigue las reglas de tu escuela o universidad sobre calculadoras permitidas.",
  },
];

export default function Home() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_ORIGIN}/#website`,
        url: `${SITE_ORIGIN}/`,
        name: SITE_NAME,
        description:
          "Calculadora científica online gratis con trigonometría, logaritmos y notación científica.",
        inLanguage: "es-MX",
        publisher: { "@id": `${SITE_ORIGIN}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_ORIGIN}/#webpage`,
        url: SITE_HOME,
        name: "Calculadora Científica Online Gratis — Trig y Logs",
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        inLanguage: "es-MX",
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_ORIGIN}${BRAND_HERO}`,
          width: 1600,
          height: 900,
          ...imageObjectLicensing,
        },
      },
      {
        ...WEB_APPLICATION_JSON_LD,
        "@id": `${SITE_ORIGIN}/#software`,
        description:
          "Calculadora científica web gratuita para trigonometría, logaritmos, potencias y notación científica.",
      },
      {
        "@type": "HowTo",
        name: "Cómo usar la calculadora científica online",
        description: "Resuelve un cálculo científico en cuatro pasos.",
        inLanguage: "es-MX",
        step: [
          {
            "@type": "HowToStep",
            name: "Elige grados o radianes",
            text: "Toca DEG/RAD según el tipo de ángulo que uses en tu problema.",
          },
          {
            "@type": "HowToStep",
            name: "Escribe la expresión",
            text: "Usa el teclado para senos, logaritmos, potencias, raíces o paréntesis.",
          },
          {
            "@type": "HowToStep",
            name: "Presiona igual",
            text: "Pulsa = para obtener el resultado con precisión científica.",
          },
          {
            "@type": "HowToStep",
            name: "Reutiliza Ans",
            text: "Continúa con Ans o EXP si necesitas notación científica.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <section id="calculadora" className="relative overflow-hidden scroll-mt-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="hero-glow absolute -left-20 top-0 h-48 w-48 rounded-full bg-violet/20 blur-3xl" />
          <div
            className="hero-glow absolute -right-10 top-20 h-56 w-56 rounded-full bg-teal/15 blur-3xl"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-8 pt-5 sm:px-6 sm:pb-12 sm:pt-8 lg:px-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-orange-soft">
            calculadoracientifica.org
          </p>
          <h1 className="mb-2 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            <span className="brand-gradient-text">{SITE_NAME}</span>
          </h1>
          <p className="mb-6 max-w-2xl font-display text-lg font-semibold leading-snug text-ink sm:text-xl md:text-2xl">
            Online, gratis y lista para trigonometría, logaritmos y potencias
          </p>

          <CalculadoraCientifica />

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/80 sm:text-lg">
            Calculadora científica en español de México: sin apps, sin cuenta y con modo DEG/RAD para
            escuela, prepa y universidad.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-ink/70 sm:gap-3">
            <span
              className="inline-flex items-center gap-1.5"
              aria-label={`Calificación ${SITE_RATING.ratingValue} de 5`}
            >
              <span className="font-semibold text-gold">{SITE_RATING.ratingValue}</span>
              <span className="tracking-tight text-gold" aria-hidden="true">
                ★★★★★
              </span>
              <span>({Number(SITE_RATING.ratingCount).toLocaleString("es-MX")})</span>
            </span>
            <span className="text-ink/40">·</span>
            <span>Gratis</span>
            <span className="text-ink/40">·</span>
            <span>Web</span>
            <span className="text-ink/40">·</span>
            <span>Educación</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-12">
        <section className="mb-16 grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="mb-4 font-display text-2xl font-bold text-ink md:text-3xl">
              Calculadora científica online para estudiantes en México
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-ink/80">
              Una <strong className="text-ink">calculadora científica</strong> te permite resolver
              en segundos lo que en papel tomaría varios minutos: ángulos, potencias, raíces y
              logaritmos. En este sitio la herramienta vive arriba de la página para que practiques
              mientras lees ejemplos reales de secundaria, prepa y primeros semestres de ingeniería.
            </p>
            <p className="mb-4 leading-relaxed text-ink/75">
              En Google, herramientas como Desmos, GeoGebra o Symbolab destacan por el teclado, pero
              dejan poco texto útil en español. Aquí combinamos la calculadora con guías claras:
              cuándo usar grados, cómo evitar errores de paréntesis y cómo pasar un resultado a
              notación científica.
            </p>
            <p className="leading-relaxed text-ink/75">
              Si llegaste buscando una calculadora científica gratis, un emulador estilo Casio o una
              opción para celular, el flujo es el mismo: escribe la expresión, elige DEG o RAD y
              pulsa igual. Sin publicidad invasiva ni descarga obligatoria.
            </p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-ink/10">
            <Image
              src={BRAND_HERO}
              alt="Calculadora científica online mostrando teclado científico y pantalla de resultados"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={70}
              className="object-cover"
              priority
            />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-display text-2xl font-bold text-ink md:text-3xl">
            Cómo usar esta calculadora científica paso a paso
          </h2>
          <p className="mb-6 max-w-3xl leading-relaxed text-ink/80">
            Las búsquedas de “cómo usar calculadora científica” suelen llevar a videos. Esta versión
            escrita te deja seguir el proceso y probarlo al instante en la misma pestaña.
          </p>
          <ol className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "01",
                t: "Revisa el modo angular",
                d: "DEG para grados (lo más común en México) o RAD para radianes en cálculo.",
              },
              {
                n: "02",
                t: "Arma la expresión",
                d: "Usa sin(, log(, sqrt(, ^ y paréntesis para respetar el orden de operaciones.",
              },
              {
                n: "03",
                t: "Evalúa con =",
                d: "El resultado aparece con precisión científica; Ans guarda el último valor.",
              },
              {
                n: "04",
                t: "Ajusta el formato",
                d: "EXP ayuda con notación científica; 2nd cambia a funciones inversas.",
              },
            ].map((step) => (
              <li key={step.n} className="border-t border-violet/40 pt-4">
                <span className="font-display text-sm font-bold text-teal">{step.n}</span>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink">{step.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{step.d}</p>
              </li>
            ))}
          </ol>
          <div className="rounded-xl border border-ink/10 bg-ink/[0.03] p-5 sm:p-6">
            <h3 className="mb-2 font-display text-lg font-semibold text-ink">
              Ejemplo rápido: sin(30°) + log(100)
            </h3>
            <p className="mb-3 leading-relaxed text-ink/75">
              En modo DEG escribe <code className="text-orange-soft">sin(30)+log(100)</code>. El seno
              de 30° es 0.5 y log base 10 de 100 es 2, así que el resultado es{" "}
              <strong className="text-ink">2.5</strong>. Si el modo estuviera en RAD, sin(30) ya no
              sería 0.5: ese es el error más frecuente en exámenes.
            </p>
            <p className="leading-relaxed text-ink/70">
              Más ejemplos en la{" "}
              <Link href="/como-usar" className="text-orange-soft underline hover:no-underline">
                guía de cómo usar
              </Link>{" "}
              y en el{" "}
              <Link
                href="/blog/como-usar-calculadora-cientifica"
                className="text-orange-soft underline hover:no-underline"
              >
                tutorial completo del blog
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="mb-16 grid gap-10 md:grid-cols-2 md:items-center">
          <div className="relative order-2 aspect-video overflow-hidden rounded-2xl border border-ink/10 md:order-1">
            <Image
              src={BRAND_FEATURE_2}
              alt="Calculadora científica online para trigonometría y funciones avanzadas"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={70}
              className="object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="mb-4 font-display text-2xl font-bold text-ink md:text-3xl">
              Funciones que cubren el temario escolar
            </h2>
            <ul className="space-y-3 text-ink/80">
              <li>
                <strong className="text-ink">Trigonometría:</strong> sin, cos, tan e inversas (asin,
                acos, atan) con control DEG/RAD.
              </li>
              <li>
                <strong className="text-ink">Logaritmos y exponenciales:</strong> ln, log (base 10),
                exp y potencias con ^.
              </li>
              <li>
                <strong className="text-ink">Álgebra básica:</strong> raíces, valor absoluto,
                factorial y porcentaje.
              </li>
              <li>
                <strong className="text-ink">Constantes:</strong> π y e listas para fórmulas de
                círculos, crecimiento y física.
              </li>
            </ul>
            <p className="mt-4 leading-relaxed text-ink/75">
              Detalle completo en{" "}
              <Link href="/funciones" className="text-orange-soft underline hover:no-underline">
                funciones de la calculadora
              </Link>{" "}
              y en la{" "}
              <Link
                href="/calculadora-trigonometrica"
                className="text-orange-soft underline hover:no-underline"
              >
                calculadora trigonométrica
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-display text-2xl font-bold text-ink md:text-3xl">
            Grados, radianes y notación científica sin confusiones
          </h2>
          <p className="mb-6 max-w-3xl leading-relaxed text-ink/80">
            Tres intenciones de búsqueda aparecen una y otra vez junto a “calculadora científica”:
            convertir grados a radianes, entender notación científica y comparar con la calculadora
            básica. Aquí tienes atajos a cada una.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                href: "/grados-a-radianes",
                title: "Grados ↔ radianes",
                text: "Convierte ángulos y revisa la fórmula π/180 con ejemplos de física y trig.",
                img: BRAND_FEATURE_3,
                alt: "Herramienta para convertir grados a radianes",
              },
              {
                href: "/notacion-cientifica",
                title: "Notación científica",
                text: "Pasa de 125000 a 1.25×10⁵ o escribe coeficientes y exponentes a mano.",
                img: BRAND_FEATURE_4,
                alt: "Conversor de notación científica online",
              },
              {
                href: "/blog/calculadora-cientifica-vs-basica",
                title: "Científica vs básica",
                text: "Cuándo te alcanza la de cuatro operaciones y cuándo necesitas senos y logs.",
                img: BRAND_FEATURE_2,
                alt: "Comparación entre calculadora científica y básica",
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group overflow-hidden rounded-2xl border border-ink/10 bg-ink/[0.03] transition hover:border-orange/40"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={card.img}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={65}
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-semibold text-ink">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{card.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-display text-2xl font-bold text-ink md:text-3xl">
            ¿Para quién es esta calculadora científica?
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-ink/10 bg-ink/[0.03] p-6">
              <h3 className="font-display text-xl font-semibold text-ink">Estudiantes</h3>
              <p className="mt-3 leading-relaxed text-ink/75">
                Ideal para tareas de álgebra, trigonometría, química y física cuando no tienes la
                Casio a la mano. Practica en el celular entre clases y verifica resultados antes de
                entregar.
              </p>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-ink/[0.03] p-6">
              <h3 className="font-display text-xl font-semibold text-ink">Docentes y tutores</h3>
              <p className="mt-3 leading-relaxed text-ink/75">
                Proyecta la herramienta en clase, muestra el efecto de DEG vs RAD y comparte las
                guías del blog para reforzar el uso correcto fuera del salón.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 font-display text-2xl font-bold text-ink md:text-3xl">
            Ventajas frente a apps y páginas delgadas
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              "Interfaz en español de México, no solo teclado inglés.",
              "Contenido educativo alrededor del tool: ejemplos, FAQs y guías SERP.",
              "Cálculo local en el navegador; no dependes de un solver remoto para lo básico.",
              "Herramientas hermanas: trigonometría, grados/radianes y notación científica.",
              "Sin forzar descarga de APK ni tiendas de hardware.",
              "Esquema FAQ, HowTo y SoftwareApplication listo para rich results.",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-ink/10 bg-ink/[0.02] px-4 py-3 text-ink/80"
              >
                <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-orange" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-16 rounded-2xl border border-orange/30 bg-gradient-to-br from-orange/15 to-teal/10 p-6 sm:p-8">
          <h2 className="mb-3 font-display text-2xl font-bold text-ink md:text-3xl">
            Empieza ahora en calculadoracientifica.org
          </h2>
          <p className="mb-5 max-w-2xl leading-relaxed text-ink/80">
            Abre la calculadora científica, prueba sin(30)+log(100) y guarda esta página para tus
            próximas tareas. Si necesitas más práctica, visita el blog o las herramientas
            especializadas.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#calculadora"
              className="inline-flex rounded-xl bg-orange px-5 py-3 text-sm font-bold text-white shadow-[0_12px_30px_-12px_rgba(255,122,26,0.9)] hover:brightness-110"
            >
              Ir a la calculadora
            </Link>
            <Link
              href="/blog"
              className="inline-flex rounded-xl border border-ink/20 px-5 py-3 text-sm font-semibold text-ink hover:bg-ink/5"
            >
              Leer guías del blog
            </Link>
          </div>
        </section>

        <FaqSection
          items={faqs}
          title="Preguntas frecuentes sobre la calculadora científica"
          includeSchema={false}
        />
      </div>
    </>
  );
}
