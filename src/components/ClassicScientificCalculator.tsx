"use client";

import { useCallback, useState } from "react";
import {
  AngleMode,
  evaluateExpression,
  formatScientific,
} from "@/lib/scientificMath";

type KeyDef = {
  label: string;
  insert?: string;
  action?: "clear" | "back" | "eq" | "neg" | "mode";
  tone?: "fn" | "op" | "eq" | "danger" | "num";
  span?: 2;
};

const ROW1: KeyDef[] = [
  { label: "2nd", action: "mode", tone: "fn" },
  { label: "DEG", action: "mode", tone: "fn" },
  { label: "(", insert: "(", tone: "fn" },
  { label: ")", insert: ")", tone: "fn" },
  { label: "⌫", action: "back", tone: "danger" },
  { label: "AC", action: "clear", tone: "danger" },
];

function buildRows(second: boolean): KeyDef[][] {
  return [
    [
      { label: second ? "asin" : "sin", insert: second ? "asin(" : "sin(", tone: "fn" },
      { label: second ? "acos" : "cos", insert: second ? "acos(" : "cos(", tone: "fn" },
      { label: second ? "atan" : "tan", insert: second ? "atan(" : "tan(", tone: "fn" },
      { label: "π", insert: "pi", tone: "fn" },
      { label: "e", insert: "e", tone: "fn" },
      { label: "^", insert: "^", tone: "op" },
    ],
    [
      { label: "ln", insert: "ln(", tone: "fn" },
      { label: "log", insert: "log(", tone: "fn" },
      { label: "√", insert: "sqrt(", tone: "fn" },
      { label: "x²", insert: "^2", tone: "fn" },
      { label: "xʸ", insert: "^", tone: "fn" },
      { label: "n!", insert: "!", tone: "fn" },
    ],
    [
      { label: "7", insert: "7", tone: "num" },
      { label: "8", insert: "8", tone: "num" },
      { label: "9", insert: "9", tone: "num" },
      { label: "÷", insert: "/", tone: "op" },
      { label: "%", insert: "%", tone: "op" },
      { label: "EXP", insert: "e+", tone: "fn" },
    ],
    [
      { label: "4", insert: "4", tone: "num" },
      { label: "5", insert: "5", tone: "num" },
      { label: "6", insert: "6", tone: "num" },
      { label: "×", insert: "*", tone: "op" },
      { label: "1/x", insert: "^(-1)", tone: "fn" },
      { label: "|x|", insert: "abs(", tone: "fn" },
    ],
    [
      { label: "1", insert: "1", tone: "num" },
      { label: "2", insert: "2", tone: "num" },
      { label: "3", insert: "3", tone: "num" },
      { label: "−", insert: "-", tone: "op" },
      { label: "Ans", insert: "Ans", tone: "fn" },
      { label: "±", action: "neg", tone: "fn" },
    ],
    [
      { label: "0", insert: "0", tone: "num", span: 2 },
      { label: ".", insert: ".", tone: "num" },
      { label: "+", insert: "+", tone: "op" },
      { label: "=", action: "eq", tone: "eq", span: 2 },
    ],
  ];
}

function toneClass(tone: KeyDef["tone"]): string {
  switch (tone) {
    case "eq":
      return "bg-gradient-to-br from-orange to-orange-deep text-white font-bold shadow-[0_8px_24px_-10px_rgba(255,122,26,0.55)]";
    case "op":
      return "bg-orange/10 text-orange-deep hover:bg-orange/15";
    case "fn":
      return "bg-mist text-sky hover:bg-[#e2e8f4]";
    case "danger":
      return "bg-rose-500/10 text-rose-600 hover:bg-rose-500/20";
    default:
      return "bg-brand-soft text-ink hover:bg-ink/[0.08]";
  }
}

export default function ClassicScientificCalculator() {
  const [expr, setExpr] = useState("");
  const [display, setDisplay] = useState("0");
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<AngleMode>("DEG");
  const [second, setSecond] = useState(false);
  const [ans, setAns] = useState(0);
  const [justEvaluated, setJustEvaluated] = useState(false);

  const insert = useCallback(
    (text: string) => {
      setError(null);
      let piece = text;
      if (piece === "Ans") piece = formatScientific(ans);

      if (justEvaluated && /^[0-9.]/.test(piece)) {
        setExpr(piece);
        setDisplay(piece);
        setJustEvaluated(false);
        return;
      }
      if (justEvaluated && piece === "e+") {
        setExpr(`${formatScientific(ans)}e+`);
        setDisplay(`${formatScientific(ans)}e+`);
        setJustEvaluated(false);
        return;
      }

      setExpr((prev) => {
        const next = justEvaluated && /^[+\-*/^]/.test(piece)
          ? `${formatScientific(ans)}${piece}`
          : `${prev}${piece}`;
        setDisplay(next || "0");
        return next;
      });
      setJustEvaluated(false);
    },
    [ans, justEvaluated]
  );

  const evaluate = useCallback(() => {
    const result = evaluateExpression(expr || String(ans), mode);
    if (!result.ok) {
      setError(result.error);
      setDisplay("Error");
      return;
    }
    setAns(result.value);
    setDisplay(result.display);
    setExpr(result.display);
    setError(null);
    setJustEvaluated(true);
  }, [ans, expr, mode]);

  const onKey = (key: KeyDef) => {
    if (key.label === "2nd" || (key.action === "mode" && key.label === "2nd")) {
      setSecond((s) => !s);
      return;
    }
    if (key.label === "DEG" || key.label === "RAD" || (key.action === "mode" && key.label !== "2nd")) {
      setMode((m) => (m === "DEG" ? "RAD" : "DEG"));
      return;
    }
    if (key.action === "clear") {
      setExpr("");
      setDisplay("0");
      setError(null);
      setJustEvaluated(false);
      return;
    }
    if (key.action === "back") {
      setError(null);
      setJustEvaluated(false);
      setExpr((prev) => {
        const next = prev.slice(0, -1);
        setDisplay(next || "0");
        return next;
      });
      return;
    }
    if (key.action === "eq") {
      evaluate();
      return;
    }
    if (key.action === "neg") {
      setError(null);
      if (justEvaluated) {
        const v = -ans;
        setAns(v);
        const d = formatScientific(v);
        setExpr(d);
        setDisplay(d);
        return;
      }
      setExpr((prev) => {
        const next = prev.startsWith("-") ? prev.slice(1) : `-${prev}`;
        setDisplay(next || "0");
        return next;
      });
      return;
    }
    if (key.insert) insert(key.insert);
  };

  const rows = buildRows(second);
  const modeKeys: KeyDef[] = [
    { label: "2nd", action: "mode", tone: second ? "eq" : "fn" },
    { label: mode, action: "mode", tone: "fn" },
    ...ROW1.slice(2),
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-gradient-to-b from-white to-brand-soft shadow-[0_24px_60px_-28px_rgba(11,21,40,0.18)]">
      <div className="border-b border-ink/10 bg-white px-4 py-3 sm:px-5">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-medium text-ink/60">
          <span className={`rounded-md px-2 py-0.5 ${second ? "bg-orange/20 text-orange-deep" : "bg-ink/5"}`}>
            2nd {second ? "ON" : "OFF"}
          </span>
          <span className="rounded-md bg-sky/15 px-2 py-0.5 text-sky">{mode}</span>
          <span className="text-ink/40">Ans = {formatScientific(ans)}</span>
        </div>
        <div
          className="min-h-[3.25rem] break-all text-right font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
          aria-live="polite"
        >
          {display}
        </div>
        {error ? (
          <p className="mt-1 text-right text-sm text-rose-600" role="alert">
            {error}
          </p>
        ) : (
          <p className="mt-1 truncate text-right text-xs text-ink/45">{expr || " "}</p>
        )}
      </div>

      <div className="grid gap-2 p-3 sm:gap-2.5 sm:p-4" role="group" aria-label="Teclado de la calculadora científica">
        <div className="grid grid-cols-6 gap-2">
          {modeKeys.map((key) => (
            <button
              key={`top-${key.label}`}
              type="button"
              onClick={() => onKey(key)}
              className={`min-h-[2.75rem] rounded-xl text-sm font-semibold transition active:scale-[0.98] sm:min-h-[3rem] sm:text-base ${toneClass(key.tone)}`}
            >
              {key.label}
            </button>
          ))}
        </div>
        {rows.map((row, ri) => (
          <div key={ri} className="grid grid-cols-6 gap-2">
            {row.map((key, ki) => (
              <button
                key={`${ri}-${ki}-${key.label}`}
                type="button"
                onClick={() => onKey(key)}
                className={`min-h-[2.75rem] rounded-xl text-sm font-semibold transition active:scale-[0.98] sm:min-h-[3.1rem] sm:text-base ${toneClass(key.tone)} ${
                  key.span === 2 ? "col-span-2" : ""
                }`}
              >
                {key.label}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
