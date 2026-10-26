import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe. Vuelve a Calculadora Científica.",
};

export default function NotFound() {
  return (
    <div className="container mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <h1 className="mb-4 font-display text-4xl font-bold text-white">404</h1>
      <p className="mb-8 text-lg text-white/75">
        Esa página ya no existe o nunca estuvo aquí. Vuelve a la calculadora científica para seguir
        practicando.
      </p>
      <Link
        href="/"
        className="rounded-xl bg-orange px-5 py-3 text-sm font-bold text-white hover:brightness-110"
      >
        Ir al inicio
      </Link>
    </div>
  );
}
