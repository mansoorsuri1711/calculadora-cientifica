"use client";

import { useMemo, useState } from "react";
import { degreesToRadians, radiansToDegrees, formatScientific } from "@/lib/scientificMath";

export default function GradosRadianesCalculator() {
  const [deg, setDeg] = useState("180");
  const [rad, setRad] = useState(String(Math.PI));
  const [lastEdited, setLastEdited] = useState<"deg" | "rad">("deg");

  const result = useMemo(() => {
    if (lastEdited === "deg") {
      const d = Number(deg);
      if (!Number.isFinite(d)) return null;
      const r = degreesToRadians(d);
      return { deg: d, rad: r, from: "deg" as const };
    }
    const r = Number(rad);
    if (!Number.isFinite(r)) return null;
    const d = radiansToDegrees(r);
    return { deg: d, rad: r, from: "rad" as const };
  }, [deg, rad, lastEdited]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-white/70">Grados (°)</span>
          <input
            type="number"
            inputMode="decimal"
            value={deg}
            onChange={(e) => {
              setDeg(e.target.value);
              setLastEdited("deg");
            }}
            className="w-full rounded-xl border border-white/15 bg-[#0B1528] px-4 py-3 text-lg text-white outline-none ring-orange/40 focus:ring-2"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-white/70">Radianes (rad)</span>
          <input
            type="number"
            inputMode="decimal"
            value={rad}
            onChange={(e) => {
              setRad(e.target.value);
              setLastEdited("rad");
            }}
            className="w-full rounded-xl border border-white/15 bg-[#0B1528] px-4 py-3 text-lg text-white outline-none ring-orange/40 focus:ring-2"
          />
        </label>
      </div>

      {result ? (
        <div className="mt-5 rounded-xl border border-orange/30 bg-orange/10 p-4 text-sm leading-relaxed text-white/85">
          <p>
            <strong className="text-white">{formatScientific(result.deg)}°</strong>
            {" = "}
            <strong className="text-orange-soft">{formatScientific(result.rad)} rad</strong>
          </p>
          <p className="mt-2 text-white/60">
            Fórmulas: rad = grados × π / 180 · grados = rad × 180 / π
          </p>
        </div>
      ) : (
        <p className="mt-4 text-sm text-rose-300">Ingresa un número válido.</p>
      )}
    </div>
  );
}
