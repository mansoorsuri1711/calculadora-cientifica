"use client";

import { useEffect, useState } from "react";
import ClassicScientificCalculator from "@/components/ClassicScientificCalculator";
import CasioCalculator from "@/components/CasioCalculator";

type StyleId = "classic" | "casio";

const STORAGE_KEY = "calc-style-v1";

export default function CalculadoraCientifica() {
  const [style, setStyle] = useState<StyleId>("casio");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "classic" || saved === "casio") setStyle(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const select = (next: StyleId) => {
    setStyle(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="w-full">
      <div
        className="mb-3 flex flex-wrap items-center justify-center gap-2"
        role="tablist"
        aria-label="Estilo de calculadora"
      >
        <button
          type="button"
          role="tab"
          aria-selected={style === "classic"}
          onClick={() => select("classic")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            style === "classic"
              ? "bg-orange text-white shadow-[0_8px_20px_-10px_rgba(255,122,26,0.8)]"
              : "bg-ink/5 text-ink/75 hover:bg-ink/10"
          }`}
        >
          Clásica
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={style === "casio"}
          onClick={() => select("casio")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            style === "casio"
              ? "bg-ink text-white shadow-[0_8px_20px_-10px_rgba(11,21,40,0.55)]"
              : "bg-ink/5 text-ink/75 hover:bg-ink/10"
          }`}
        >
          Estilo Casio
        </button>
      </div>

      {style === "casio" ? <CasioCalculator /> : <ClassicScientificCalculator />}
    </div>
  );
}
