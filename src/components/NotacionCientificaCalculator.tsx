"use client";

import { useMemo, useState } from "react";
import {
  formatScientific,
  fromScientificNotation,
  toScientificNotation,
} from "@/lib/scientificMath";

export default function NotacionCientificaCalculator() {
  const [raw, setRaw] = useState("125000");
  const [coeff, setCoeff] = useState("1.25");
  const [exp, setExp] = useState("5");
  const [mode, setMode] = useState<"to" | "from">("to");

  const converted = useMemo(() => {
    if (mode === "to") {
      const n = Number(raw);
      if (!Number.isFinite(n)) return null;
      return { ...toScientificNotation(n), decimal: n };
    }
    const c = Number(coeff);
    const e = Number(exp);
    if (!Number.isFinite(c) || !Number.isFinite(e)) return null;
    const decimal = fromScientificNotation(c, e);
    return { ...toScientificNotation(decimal), decimal, coefficient: c, exponent: e };
  }, [raw, coeff, exp, mode]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMode("to")}
          className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
            mode === "to" ? "bg-orange text-white" : "bg-white/10 text-white/70"
          }`}
        >
          Decimal → notación
        </button>
        <button
          type="button"
          onClick={() => setMode("from")}
          className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
            mode === "from" ? "bg-orange text-white" : "bg-white/10 text-white/70"
          }`}
        >
          Notación → decimal
        </button>
      </div>

      {mode === "to" ? (
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-white/70">Número decimal</span>
          <input
            type="number"
            inputMode="decimal"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-[#0B1528] px-4 py-3 text-lg text-white outline-none ring-orange/40 focus:ring-2"
          />
        </label>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/70">Coeficiente</span>
            <input
              type="number"
              inputMode="decimal"
              value={coeff}
              onChange={(e) => setCoeff(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-[#0B1528] px-4 py-3 text-lg text-white outline-none ring-orange/40 focus:ring-2"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-white/70">Exponente (10^n)</span>
            <input
              type="number"
              inputMode="numeric"
              value={exp}
              onChange={(e) => setExp(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-[#0B1528] px-4 py-3 text-lg text-white outline-none ring-orange/40 focus:ring-2"
            />
          </label>
        </div>
      )}

      {converted ? (
        <div className="mt-5 space-y-2 rounded-xl border border-sky/25 bg-sky/10 p-4 text-sm text-white/85">
          <p>
            Notación científica:{" "}
            <strong className="text-orange-soft">{converted.display}</strong>
          </p>
          <p>
            Decimal: <strong className="text-white">{formatScientific(converted.decimal)}</strong>
          </p>
        </div>
      ) : (
        <p className="mt-4 text-sm text-rose-300">Revisa los valores ingresados.</p>
      )}
    </div>
  );
}
