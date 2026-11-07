"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import {
  AngleMode,
  Complex,
  complexAdd,
  complexDiv,
  complexMul,
  complexSub,
  decimalToDms,
  det2,
  evaluateExpression,
  formatComplex,
  formatEngineering,
  formatMatrix2,
  formatScientific,
  getLastPair,
  inv2,
  mul2,
  numericalDerivative,
  numericalIntegral,
  solveQuadratic,
  summarizeStats,
  toMixedFraction,
  VarMap,
} from "@/lib/scientificMath";

type CalcMode = "normal" | "complejo" | "estadistica" | "matrices" | "ecuaciones";
type Modifier = "none" | "shift" | "alpha";
type HypMode = boolean;

type KeyTone = "fn" | "num" | "del" | "ac" | "eq" | "shift" | "alpha";

const MODES: { id: CalcMode; label: string }[] = [
  { id: "normal", label: "Normal" },
  { id: "complejo", label: "Complejo" },
  { id: "estadistica", label: "Estadística" },
  { id: "matrices", label: "Matrices" },
  { id: "ecuaciones", label: "Ecuaciones" },
];

function KeyButton({
  id,
  shift,
  alpha,
  hint,
  label,
  tone = "fn",
  active,
  onPress,
}: {
  id?: string;
  shift?: string;
  alpha?: string;
  hint?: string;
  label: ReactNode;
  tone?: KeyTone;
  active?: boolean;
  onPress: () => void;
}) {
  const base =
    tone === "num"
      ? "bg-[#f3f4f6] text-[#111827] shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_2px_0_#9ca3af]"
      : tone === "del"
        ? "bg-[#e67e22] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_0_#a85a12]"
        : tone === "ac"
          ? "bg-[#c0392b] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_0_#8e2a1f]"
          : tone === "eq"
            ? "bg-[#27ae60] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_0_#1e8449]"
            : tone === "shift"
              ? "bg-[#2a2d3a] text-[#f1c40f] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_0_#151821]"
              : tone === "alpha"
                ? "bg-[#2a2d3a] text-[#ff6bcb] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_0_#151821]"
                : "bg-[#2a2d3a] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_0_#151821]";

  return (
    <button
      type="button"
      data-casio-key={id}
      onClick={onPress}
      className={`relative flex min-h-[2.35rem] w-full flex-col items-center justify-end rounded-md px-0.5 pb-1.5 pt-3 text-[11px] font-semibold leading-none transition active:translate-y-[1px] active:shadow-none sm:min-h-[2.6rem] sm:text-xs ${base} ${
        active ? "ring-2 ring-[#5dade2]" : ""
      }`}
    >
      {(shift || alpha || hint) && (
        <span className="pointer-events-none absolute left-0.5 right-0.5 top-0.5 flex items-start justify-between gap-0.5 text-[8px] font-bold leading-none sm:text-[9px]">
          <span className="text-[#f1c40f]">{shift || ""}</span>
          <span className="text-[#5dade2]">{hint || ""}</span>
          <span className="text-[#ff6bcb]">{alpha || ""}</span>
        </span>
      )}
      <span className="relative z-[1]">{label}</span>
    </button>
  );
}

export default function CasioCalculator() {
  const [calcMode, setCalcMode] = useState<CalcMode>("normal");
  const [angle, setAngle] = useState<AngleMode>("DEG");
  const [mod, setMod] = useState<Modifier>("none");
  const [stoArmed, setStoArmed] = useState(false);
  const [hyp, setHyp] = useState<HypMode>(false);
  const [expr, setExpr] = useState("");
  const [display, setDisplay] = useState("0");
  const [line2, setLine2] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [ans, setAns] = useState(0);
  const [memory, setMemory] = useState(0);
  const [vars, setVars] = useState<VarMap>({ A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, M: 0, x: 0, y: 0 });
  const [justEval, setJustEval] = useState(false);
  const [eng, setEng] = useState(false);
  const [fractionView, setFractionView] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [showSetup, setShowSetup] = useState(false);
  const [statData, setStatData] = useState<number[]>([]);
  const [statInput, setStatInput] = useState("");
  const [eqA, setEqA] = useState("1");
  const [eqB, setEqB] = useState("0");
  const [eqC, setEqC] = useState("0");
  const [matA, setMatA] = useState([
    [1, 0],
    [0, 1],
  ]);
  const [matB, setMatB] = useState([
    [1, 0],
    [0, 1],
  ]);
  const [cRe, setCRe] = useState("0");
  const [cIm, setCIm] = useState("0");
  const [cAcc, setCAcc] = useState<Complex>({ re: 0, im: 0 });
  const [cOp, setCOp] = useState<"+" | "-" | "*" | "/" | null>(null);
  const [integralPrompt, setIntegralPrompt] = useState(false);
  const [derivPrompt, setDerivPrompt] = useState(false);
  const [ia, setIa] = useState("0");
  const [ib, setIb] = useState("1");
  const [ix0, setIx0] = useState("1");

  const allVars = useMemo<VarMap>(() => ({ ...vars, M: memory, Ans: ans }), [vars, memory, ans]);

  const formatOut = useCallback(
    (value: number) => {
      if (fractionView) return toMixedFraction(value);
      if (eng) return formatEngineering(value);
      return formatScientific(value);
    },
    [eng, fractionView]
  );

  const setExprAtCursor = useCallback(
    (next: string, newCursor?: number) => {
      setExpr(next);
      setCursor(newCursor ?? next.length);
      setDisplay(next || "0");
      setJustEval(false);
      setError(null);
    },
    []
  );

  const insertText = useCallback(
    (text: string) => {
      setMod("none");
      if (justEval && /^[0-9.]/.test(text)) {
        setExprAtCursor(text, text.length);
        return;
      }
      if (justEval && /^[+\-*/^]/.test(text)) {
        const base = formatScientific(ans);
        const next = `${base}${text}`;
        setExprAtCursor(next, next.length);
        return;
      }
      const left = expr.slice(0, cursor);
      const right = expr.slice(cursor);
      const next = `${left}${text}${right}`;
      setExprAtCursor(next, left.length + text.length);
    },
    [ans, cursor, expr, justEval, setExprAtCursor]
  );

  const clearAll = () => {
    setExpr("");
    setDisplay("0");
    setLine2("");
    setError(null);
    setJustEval(false);
    setCursor(0);
    setMod("none");
    setHyp(false);
  };

  const backspace = () => {
    if (justEval) {
      clearAll();
      return;
    }
    if (cursor <= 0) return;
    const next = expr.slice(0, cursor - 1) + expr.slice(cursor);
    setExprAtCursor(next, cursor - 1);
  };

  const evaluate = useCallback(() => {
    const source = expr.trim() ? expr : String(ans);
    const result = evaluateExpression(source, angle, allVars);
    if (!result.ok) {
      setError(result.error);
      setDisplay("Error");
      setLine2(result.error);
      return;
    }
    const pair = getLastPair();
    setAns(result.value);
    setVars((v) => ({ ...v, Ans: result.value }));
    setDisplay(formatOut(result.value));
    setExpr(formatScientific(result.value));
    setCursor(formatScientific(result.value).length);
    setJustEval(true);
    setError(null);
    setMod("none");
    setHyp(false);
    if (pair) {
      setLine2(`${formatScientific(pair[0])} , ${formatScientific(pair[1])}`);
    } else {
      setLine2(source);
    }
  }, [allVars, angle, ans, expr, formatOut]);

  const storeVar = (name: string) => {
    let value = ans;
    if (expr.trim() && !justEval) {
      const r = evaluateExpression(expr, angle, allVars);
      if (!r.ok) {
        setError(r.error);
        return;
      }
      value = r.value;
    }
    if (name === "M") setMemory(value);
    setVars((v) => ({ ...v, [name]: value }));
    setLine2(`${name} = ${formatScientific(value)}`);
    setMod("none");
    setStoArmed(false);
    setJustEval(true);
  };

  const recallVar = (name: string) => {
    const value = name === "M" ? memory : (allVars[name] ?? 0);
    insertText(formatScientific(value));
    setLine2(`${name} = ${formatScientific(value)}`);
  };

  const alphaVar = (name: string) => {
    if (stoArmed) {
      storeVar(name);
      return;
    }
    insertText(name);
  };

  const pressWithShiftAlpha = (
    normal: () => void,
    shiftFn?: () => void,
    alphaFn?: () => void
  ) => {
    if (mod === "shift" && shiftFn) {
      setMod("none");
      shiftFn();
      return;
    }
    if (mod === "alpha" && alphaFn) {
      setMod("none");
      alphaFn();
      return;
    }
    setMod("none");
    normal();
  };

  const runIntegral = () => {
    const a = Number(ia);
    const b = Number(ib);
    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      setError("Límites inválidos");
      return;
    }
    const body = expr.includes("x") ? expr : `${expr || "0"}`;
    const r = numericalIntegral(body, a, b, angle);
    setIntegralPrompt(false);
    if (!r.ok) {
      setError(r.error);
      setDisplay("Error");
      return;
    }
    setAns(r.value);
    setDisplay(formatOut(r.value));
    setLine2(`∫(${body}) dx [${a},${b}]`);
    setJustEval(true);
  };

  const runDerivative = () => {
    const x0 = Number(ix0);
    if (!Number.isFinite(x0)) {
      setError("x0 inválido");
      return;
    }
    const body = expr.includes("x") ? expr : "x";
    const r = numericalDerivative(body, x0, angle);
    setDerivPrompt(false);
    if (!r.ok) {
      setError(r.error);
      setDisplay("Error");
      return;
    }
    setAns(r.value);
    setDisplay(formatOut(r.value));
    setLine2(`d/dx(${body})|x=${x0}`);
    setJustEval(true);
  };

  const dPad = (dir: "up" | "down" | "left" | "right") => {
    if (dir === "left") setCursor((c) => Math.max(0, c - 1));
    if (dir === "right") setCursor((c) => Math.min(expr.length, c + 1));
    if (dir === "up") setShowSetup(true);
    if (dir === "down") setShowSetup(false);
  };

  const toggleSD = () => {
    if (!Number.isFinite(ans)) return;
    if (mod === "shift") {
      // improper <-> mixed already covered by fraction formatter
      setFractionView(true);
      setDisplay(toMixedFraction(ans));
      setMod("none");
      return;
    }
    setFractionView((f) => {
      const next = !f;
      setDisplay(next ? toMixedFraction(ans) : eng ? formatEngineering(ans) : formatScientific(ans));
      return next;
    });
  };

  const complexApply = (op: "+" | "-" | "*" | "/") => {
    const z: Complex = { re: Number(cRe) || 0, im: Number(cIm) || 0 };
    if (!cOp) {
      setCAcc(z);
      setCOp(op);
      setCRe("0");
      setCIm("0");
      return;
    }
    try {
      const fn =
        cOp === "+"
          ? complexAdd
          : cOp === "-"
            ? complexSub
            : cOp === "*"
              ? complexMul
              : complexDiv;
      const out = fn(cAcc, z);
      setCAcc(out);
      setCOp(op);
      setDisplay(formatComplex(out));
      setLine2(formatComplex(out));
      setCRe(String(out.re));
      setCIm(String(out.im));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error complejo");
    }
  };

  const complexEquals = () => {
    const z: Complex = { re: Number(cRe) || 0, im: Number(cIm) || 0 };
    if (!cOp) {
      setDisplay(formatComplex(z));
      return;
    }
    try {
      const fn =
        cOp === "+"
          ? complexAdd
          : cOp === "-"
            ? complexSub
            : cOp === "*"
              ? complexMul
              : complexDiv;
      const out = fn(cAcc, z);
      setCAcc(out);
      setCOp(null);
      setDisplay(formatComplex(out));
      setLine2(formatComplex(out));
      setAns(out.re);
      setCRe(String(out.re));
      setCIm(String(out.im));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error complejo");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-[1.4rem] border border-[#0b0d14] bg-[#141821] p-3 shadow-[0_28px_60px_-24px_rgba(0,0,0,0.65)] sm:p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowSetup((s) => !s)}
            className="inline-flex items-center gap-1 rounded-md bg-[#2f80ed] px-2.5 py-1 text-[11px] font-bold text-white"
          >
            {angle}
            <span aria-hidden>▾</span>
          </button>
          {showSetup && (
            <div className="absolute left-0 top-full z-20 mt-1 min-w-[9rem] overflow-hidden rounded-lg border border-white/10 bg-[#1c2130] shadow-xl">
              {(["DEG", "RAD"] as AngleMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  className={`block w-full px-3 py-2 text-left text-xs text-white hover:bg-white/10 ${
                    angle === m ? "bg-white/10 font-bold" : ""
                  }`}
                  onClick={() => {
                    setAngle(m);
                    setShowSetup(false);
                  }}
                >
                  {m === "DEG" ? "Grados (DEG)" : "Radianes (RAD)"}
                </button>
              ))}
              <button
                type="button"
                className="block w-full border-t border-white/10 px-3 py-2 text-left text-xs text-[#f1c40f] hover:bg-white/10"
                onClick={() => {
                  setEng((e) => !e);
                  setShowSetup(false);
                }}
              >
                ENG {eng ? "ON" : "OFF"}
              </button>
            </div>
          )}
        </div>
        <p className="text-[11px] font-bold tracking-[0.14em] text-white/80">ESTILO CASIO</p>
        <div className="w-[3.2rem]" />
      </div>

      <div className="mb-3 rounded-lg border border-[#9aa39a] bg-[#cfd6c4] px-3 py-2 shadow-[inset_0_2px_6px_rgba(0,0,0,0.25)]">
        <div className="mb-1 flex min-h-[1rem] items-center justify-between text-[10px] font-semibold text-[#3f4a3a]">
          <span>
            {mod === "shift" ? "S" : mod === "alpha" ? "A" : ""}
            {hyp ? " hyp" : ""}
            {memory !== 0 ? " M" : ""}
          </span>
          <span>{angle}{eng ? " ENG" : ""}</span>
        </div>
        <div className="min-h-[1.1rem] truncate text-right text-[11px] text-[#2f3a2c]" aria-live="polite">
          {error ? error : line2 || "\u00A0"}
        </div>
        <div className="min-h-[2.4rem] break-all text-right font-mono text-3xl font-semibold leading-tight text-[#152015]">
          {!justEval && expr ? (
            <>
              {expr.slice(0, cursor)}
              <span className="mx-[1px] inline-block h-[1.1em] w-[2px] animate-pulse align-middle bg-[#152015]" />
              {expr.slice(cursor)}
            </>
          ) : (
            display
          )}
        </div>
      </div>

      <div className="mb-3 flex gap-1 overflow-x-auto pb-1">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => {
              setCalcMode(m.id);
              setError(null);
              setLine2("");
            }}
            className={`whitespace-nowrap rounded-md px-2.5 py-1.5 text-[11px] font-semibold transition ${
              calcMode === m.id
                ? "bg-[#2f80ed] text-white shadow-[0_0_0_1px_rgba(47,128,237,0.5)]"
                : "bg-[#222633] text-white/70 hover:bg-[#2a3142]"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {calcMode === "estadistica" && (
        <div className="mb-3 rounded-lg border border-white/10 bg-[#1c2130] p-3 text-white">
          <p className="mb-2 text-xs text-white/70">Ingresa datos (uno por línea o separados por coma)</p>
          <textarea
            value={statInput}
            onChange={(e) => setStatInput(e.target.value)}
            className="mb-2 h-20 w-full rounded-md border border-white/10 bg-[#141821] px-2 py-1.5 text-sm text-white outline-none focus:ring-1 focus:ring-[#2f80ed]"
            placeholder="12, 15, 18, 20"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-md bg-[#2f80ed] px-3 py-1.5 text-xs font-bold"
              onClick={() => {
                const nums = statInput
                  .split(/[\s,;]+/)
                  .map(Number)
                  .filter((n) => Number.isFinite(n));
                setStatData(nums);
                const s = summarizeStats(nums);
                if (!s) {
                  setError("Sin datos");
                  return;
                }
                setDisplay(formatScientific(s.mean));
                setLine2(`n=${s.n}  x̄=${formatScientific(s.mean)}  σ=${formatScientific(s.popStd)}  s=${formatScientific(s.sampleStd)}`);
                setAns(s.mean);
              }}
            >
              Calcular
            </button>
            <button
              type="button"
              className="rounded-md bg-white/10 px-3 py-1.5 text-xs"
              onClick={() => {
                const s = summarizeStats(statData);
                if (!s) return;
                setDisplay(formatScientific(s.sum));
                setLine2(`Σx=${formatScientific(s.sum)}  Σx²=${formatScientific(s.sumSq)}`);
              }}
            >
              Σx / Σx²
            </button>
          </div>
        </div>
      )}

      {calcMode === "ecuaciones" && (
        <div className="mb-3 rounded-lg border border-white/10 bg-[#1c2130] p-3 text-white">
          <p className="mb-2 text-xs text-white/70">ax² + bx + c = 0</p>
          <div className="mb-2 grid grid-cols-3 gap-2">
            {[
              ["a", eqA, setEqA],
              ["b", eqB, setEqB],
              ["c", eqC, setEqC],
            ].map(([label, val, setVal]) => (
              <label key={label as string} className="text-xs">
                <span className="mb-1 block text-white/60">{label as string}</span>
                <input
                  value={val as string}
                  onChange={(e) => (setVal as (v: string) => void)(e.target.value)}
                  className="w-full rounded-md border border-white/10 bg-[#141821] px-2 py-1.5 text-sm outline-none focus:ring-1 focus:ring-[#2f80ed]"
                />
              </label>
            ))}
          </div>
          <button
            type="button"
            className="rounded-md bg-[#27ae60] px-3 py-1.5 text-xs font-bold"
            onClick={() => {
              const r = solveQuadratic(Number(eqA), Number(eqB), Number(eqC));
              if (!r.ok) {
                setError(r.error);
                return;
              }
              setDisplay(r.display);
              setLine2("SOLVE");
              if (r.roots[0] != null) setAns(r.roots[0]);
            }}
          >
            SOLVE
          </button>
        </div>
      )}

      {calcMode === "matrices" && (
        <div className="mb-3 rounded-lg border border-white/10 bg-[#1c2130] p-3 text-xs text-white">
          <p className="mb-2 text-white/70">Matrices 2×2 — A y B</p>
          <div className="mb-2 grid grid-cols-2 gap-3">
            {(["A", "B"] as const).map((name) => {
              const m = name === "A" ? matA : matB;
              const setM = name === "A" ? setMatA : setMatB;
              return (
                <div key={name}>
                  <p className="mb-1 font-bold">Mat {name}</p>
                  <div className="grid grid-cols-2 gap-1">
                    {[0, 1].map((r) =>
                      [0, 1].map((c) => (
                        <input
                          key={`${name}-${r}-${c}`}
                          value={String(m[r][c])}
                          onChange={(e) => {
                            const n = Number(e.target.value);
                            const copy = m.map((row) => [...row]);
                            copy[r][c] = Number.isFinite(n) ? n : 0;
                            setM(copy);
                          }}
                          className="rounded border border-white/10 bg-[#141821] px-1 py-1 text-center outline-none"
                        />
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded bg-[#2f80ed] px-2 py-1 font-bold"
              onClick={() => {
                const d = det2(matA);
                setAns(d);
                setDisplay(formatScientific(d));
                setLine2("det(A)");
              }}
            >
              det(A)
            </button>
            <button
              type="button"
              className="rounded bg-white/10 px-2 py-1"
              onClick={() => {
                const out = mul2(matA, matB);
                setDisplay(formatMatrix2(out));
                setLine2("A×B");
              }}
            >
              A×B
            </button>
            <button
              type="button"
              className="rounded bg-white/10 px-2 py-1"
              onClick={() => {
                const out = inv2(matA);
                if (!out) {
                  setError("Matriz singular");
                  return;
                }
                setDisplay(formatMatrix2(out));
                setLine2("A⁻¹");
              }}
            >
              A⁻¹
            </button>
          </div>
        </div>
      )}

      {calcMode === "complejo" && (
        <div className="mb-3 rounded-lg border border-white/10 bg-[#1c2130] p-3 text-white">
          <p className="mb-2 text-xs text-white/70">Número complejo a + bi</p>
          <div className="mb-2 grid grid-cols-2 gap-2">
            <label className="text-xs">
              <span className="mb-1 block text-white/60">Real</span>
              <input
                value={cRe}
                onChange={(e) => setCRe(e.target.value)}
                className="w-full rounded-md border border-white/10 bg-[#141821] px-2 py-1.5 text-sm outline-none"
              />
            </label>
            <label className="text-xs">
              <span className="mb-1 block text-white/60">Imag</span>
              <input
                value={cIm}
                onChange={(e) => setCIm(e.target.value)}
                className="w-full rounded-md border border-white/10 bg-[#141821] px-2 py-1.5 text-sm outline-none"
              />
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["+", "-", "*", "/"] as const).map((op) => (
              <button
                key={op}
                type="button"
                className="rounded bg-white/10 px-3 py-1 text-sm font-bold"
                onClick={() => complexApply(op)}
              >
                {op === "*" ? "×" : op === "/" ? "÷" : op}
              </button>
            ))}
            <button
              type="button"
              className="rounded bg-[#27ae60] px-3 py-1 text-sm font-bold"
              onClick={complexEquals}
            >
              =
            </button>
          </div>
        </div>
      )}

      {(integralPrompt || derivPrompt) && (
        <div className="mb-3 rounded-lg border border-[#f1c40f]/40 bg-[#1c2130] p-3 text-white">
          {integralPrompt ? (
            <>
              <p className="mb-2 text-xs text-[#f1c40f]">∫ f(x) dx — usa x en la expresión</p>
              <div className="mb-2 grid grid-cols-2 gap-2">
                <input value={ia} onChange={(e) => setIa(e.target.value)} placeholder="a" className="rounded border border-white/10 bg-[#141821] px-2 py-1 text-sm" />
                <input value={ib} onChange={(e) => setIb(e.target.value)} placeholder="b" className="rounded border border-white/10 bg-[#141821] px-2 py-1 text-sm" />
              </div>
              <button type="button" onClick={runIntegral} className="rounded bg-[#f1c40f] px-3 py-1.5 text-xs font-bold text-black">
                Calcular integral
              </button>
            </>
          ) : (
            <>
              <p className="mb-2 text-xs text-[#f1c40f]">d/dx f(x) en x₀</p>
              <input value={ix0} onChange={(e) => setIx0(e.target.value)} className="mb-2 w-full rounded border border-white/10 bg-[#141821] px-2 py-1 text-sm" />
              <button type="button" onClick={runDerivative} className="rounded bg-[#f1c40f] px-3 py-1.5 text-xs font-bold text-black">
                Calcular derivada
              </button>
            </>
          )}
        </div>
      )}

      {/* SHIFT / ALPHA / D-pad / SETUP */}
      <div className="mb-2 grid grid-cols-[1fr_1fr_1.35fr_1fr_1fr] items-end gap-1.5">
        <KeyButton
          id="SHIFT" tone="shift"
          label="SHIFT"
          active={mod === "shift"}
          onPress={() => setMod((m) => (m === "shift" ? "none" : "shift"))}
        />
        <KeyButton
          id="ALPHA" tone="alpha"
          label="ALPHA"
          active={mod === "alpha"}
          onPress={() => setMod((m) => (m === "alpha" ? "none" : "alpha"))}
        />
        <div className="relative mx-auto mb-0.5 flex h-[4.4rem] w-[4.4rem] items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#1a1d28] shadow-[inset_0_2px_6px_rgba(0,0,0,0.55)]" />
          <button type="button" aria-label="Arriba" onClick={() => dPad("up")} className="absolute top-1 left-1/2 z-10 -translate-x-1/2 text-white/80">▲</button>
          <button type="button" aria-label="Abajo" onClick={() => dPad("down")} className="absolute bottom-1 left-1/2 z-10 -translate-x-1/2 text-white/80">▼</button>
          <button type="button" aria-label="Izquierda" onClick={() => dPad("left")} className="absolute left-1 top-1/2 z-10 -translate-y-1/2 text-white/80">◀</button>
          <button type="button" aria-label="Derecha" onClick={() => dPad("right")} className="absolute right-1 top-1/2 z-10 -translate-y-1/2 text-white/80">▶</button>
          <div className="relative z-[1] h-3 w-3 rounded-full bg-[#2f80ed]/80" />
        </div>
        <KeyButton
          shift="SETUP"
          label={<span className="text-base">▦</span>}
          onPress={() =>
            pressWithShiftAlpha(
              () => setShowSetup(true),
              () => setShowSetup(true)
            )
          }
        />
        <KeyButton
          label={<span className="text-base">⚙</span>}
          onPress={() => setShowSetup((s) => !s)}
        />
      </div>

      <div className="mb-1.5 grid grid-cols-4 gap-1.5">
        <KeyButton
          shift="SOLVE"
          label="CALC"
          onPress={() =>
            pressWithShiftAlpha(
              () => {
                setCalcMode("ecuaciones");
                setLine2("CALC / SOLVE");
              },
              () => {
                setCalcMode("ecuaciones");
                setLine2("SOLVE");
              }
            )
          }
        />
        <KeyButton
          shift="d/dx"
          label="∫dx"
          onPress={() =>
            pressWithShiftAlpha(
              () => {
                setIntegralPrompt(true);
                setDerivPrompt(false);
                setLine2("∫ f(x) dx");
              },
              () => {
                setDerivPrompt(true);
                setIntegralPrompt(false);
                setLine2("d/dx");
              }
            )
          }
        />
        <KeyButton
          shift="x!"
          label="x⁻¹"
          onPress={() =>
            pressWithShiftAlpha(
              () => insertText("^(-1)"),
              () => insertText("!")
            )
          }
        />
        <KeyButton
          shift="Σ"
          label="log□(□)"
          onPress={() =>
            pressWithShiftAlpha(
              () => insertText("logb("),
              () => {
                setCalcMode("estadistica");
                setLine2("Σ estadísticas");
              }
            )
          }
        />
      </div>

      <div className="mb-1.5 grid grid-cols-6 gap-1.5">
        <KeyButton shift="a b/c" label="a/b" onPress={() => pressWithShiftAlpha(() => insertText("/"), () => {
          setFractionView(true);
          setDisplay(toMixedFraction(ans));
        })} />
        <KeyButton shift="∛" label="√" onPress={() => pressWithShiftAlpha(() => insertText("sqrt("), () => insertText("cbrt("))} />
        <KeyButton shift="x³" label="x²" onPress={() => pressWithShiftAlpha(() => insertText("^2"), () => insertText("^3"))} />
        <KeyButton shift="ʸ√x" label="xʸ" onPress={() => pressWithShiftAlpha(() => insertText("^"), () => insertText("root("))} />
        <KeyButton id="log" shift="10ˣ" label="log" onPress={() => pressWithShiftAlpha(() => insertText("log("), () => insertText("10^("))} />
        <KeyButton id="ln" shift="eˣ" label="ln" onPress={() => pressWithShiftAlpha(() => insertText("ln("), () => insertText("exp("))} />
      </div>

      <div className="mb-1.5 grid grid-cols-6 gap-1.5">
        <KeyButton
          alpha="A"
          label="(-)"
          onPress={() =>
            pressWithShiftAlpha(
              () => insertText("-"),
              undefined,
              () => alphaVar("A")
            )
          }
        />
        <KeyButton
          shift="←"
          alpha="B"
          label={`°′″`}
          onPress={() =>
            pressWithShiftAlpha(
              () => {
                setDisplay(decimalToDms(ans));
                setLine2("DMS");
              },
              () => dPad("left"),
              () => alphaVar("B")
            )
          }
        />
        <KeyButton
          alpha="C"
          label="hyp"
          active={hyp}
          onPress={() =>
            pressWithShiftAlpha(
              () => setHyp((h) => !h),
              undefined,
              () => alphaVar("C")
            )
          }
        />
        <KeyButton
          shift="sin⁻¹"
          alpha="D"
          id="sin"
          label="sin"
          onPress={() =>
            pressWithShiftAlpha(
              () => insertText(hyp ? "sinh(" : "sin("),
              () => insertText(hyp ? "asinh(" : "asin("),
              () => alphaVar("D")
            )
          }
        />
        <KeyButton
          shift="cos⁻¹"
          alpha="E"
          label="cos"
          onPress={() =>
            pressWithShiftAlpha(
              () => insertText(hyp ? "cosh(" : "cos("),
              () => insertText(hyp ? "acosh(" : "acos("),
              () => alphaVar("E")
            )
          }
        />
        <KeyButton
          shift="tan⁻¹"
          alpha="F"
          label="tan"
          onPress={() =>
            pressWithShiftAlpha(
              () => insertText(hyp ? "tanh(" : "tan("),
              () => insertText(hyp ? "atanh(" : "atan("),
              () => alphaVar("F")
            )
          }
        />
      </div>

      <div className="mb-2 grid grid-cols-6 gap-1.5">
        <KeyButton
          shift="STO"
          label="RCL"
          onPress={() =>
            pressWithShiftAlpha(
              () => recallVar("M"),
              () => {
                setStoArmed(true);
                setLine2("STO — elige A–F o M (ALPHA)");
                setMod("alpha");
              }
            )
          }
        />
        <KeyButton
          shift="←"
          label="ENG"
          onPress={() =>
            pressWithShiftAlpha(
              () => {
                setEng(true);
                setFractionView(false);
                setDisplay(formatEngineering(ans));
              },
              () => dPad("left")
            )
          }
        />
        <KeyButton
          shift="%"
          alpha="x"
          id="lp"
          label="("
          onPress={() =>
            pressWithShiftAlpha(
              () => insertText("("),
              () => insertText("%"),
              () => insertText("x")
            )
          }
        />
        <KeyButton
          shift=","
          alpha="y"
          id="rp"
          label=")"
          onPress={() =>
            pressWithShiftAlpha(
              () => insertText(")"),
              () => insertText(","),
              () => insertText("y")
            )
          }
        />
        <KeyButton
          shift="ab/c⇔d/c"
          label="S⇔D"
          onPress={toggleSD}
        />
        <KeyButton
          shift="M-"
          alpha="M"
          label="M+"
          onPress={() =>
            pressWithShiftAlpha(
              () => {
                let num = ans;
                if (expr.trim() && !justEval) {
                  const r = evaluateExpression(expr, angle, allVars);
                  if (r.ok) num = r.value;
                }
                setMemory((m) => {
                  const next = m + num;
                  setVars((vr) => ({ ...vr, M: next }));
                  setLine2(`M = ${formatScientific(next)}`);
                  return next;
                });
              },
              () => {
                const num = ans;
                setMemory((m) => {
                  const next = m - num;
                  setVars((vr) => ({ ...vr, M: next }));
                  setLine2(`M = ${formatScientific(next)}`);
                  return next;
                });
              },
              () => alphaVar("M")
            )
          }
        />
      </div>

      {/* Number pad */}
      <div className="grid grid-cols-5 gap-1.5">
        <KeyButton id="7" tone="num" label="7" onPress={() => insertText("7")} />
        <KeyButton id="8" tone="num" label="8" onPress={() => insertText("8")} />
        <KeyButton id="9" tone="num" label="9" onPress={() => insertText("9")} />
        <KeyButton id="DEL" tone="del" label="DEL" onPress={backspace} />
        <KeyButton id="AC" tone="ac" label="AC" onPress={clearAll} />

        <KeyButton id="4" tone="num" label="4" onPress={() => insertText("4")} />
        <KeyButton id="5" tone="num" label="5" onPress={() => insertText("5")} />
        <KeyButton id="6" tone="num" label="6" onPress={() => insertText("6")} />
        <KeyButton
          id="mul"
          hint="Pol"
          tone="num"
          label="×"
          onPress={() =>
            pressWithShiftAlpha(
              () => insertText("*"),
              () => insertText("pol(")
            )
          }
        />
        <KeyButton
          id="div"
          hint="Rec"
          tone="num"
          label="÷"
          onPress={() =>
            pressWithShiftAlpha(
              () => insertText("/"),
              () => insertText("rec(")
            )
          }
        />

        <KeyButton id="1" tone="num" label="1" onPress={() => insertText("1")} />
        <KeyButton id="2" tone="num" label="2" onPress={() => insertText("2")} />
        <KeyButton id="3" tone="num" label="3" onPress={() => insertText("3")} />
        <KeyButton
          id="add"
          hint="DMS"
          tone="num"
          label="+"
          onPress={() =>
            pressWithShiftAlpha(
              () => insertText("+"),
              () => {
                setDisplay(decimalToDms(ans));
                setLine2("→DMS");
              }
            )
          }
        />
        <KeyButton id="sub" tone="num" label="−" onPress={() => insertText("-")} />

        <KeyButton id="0" tone="num" label="0" onPress={() => insertText("0")} />
        <KeyButton id="dot" tone="num" label="." onPress={() => insertText(".")} />
        <KeyButton
          hint="π"
          tone="num"
          label="×10ˣ"
          onPress={() =>
            pressWithShiftAlpha(
              () => insertText("e+"),
              () => insertText("pi")
            )
          }
        />
        <KeyButton id="Ans" tone="num" label="Ans" onPress={() => insertText(formatScientific(ans))} />
        <KeyButton id="eq" tone="eq" label="=" onPress={evaluate} />
      </div>
    </div>
  );
}
