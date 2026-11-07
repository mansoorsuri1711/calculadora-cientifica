export type AngleMode = "DEG" | "RAD";

export type EvalResult =
  | { ok: true; value: number; display: string }
  | { ok: false; error: string };

const FACTORIAL_MAX = 170;

function factorial(n: number): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("El factorial solo acepta enteros ≥ 0");
  }
  if (n > FACTORIAL_MAX) throw new Error("Factorial demasiado grande");
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function toRad(x: number, mode: AngleMode): number {
  return mode === "DEG" ? (x * Math.PI) / 180 : x;
}

function fromRad(x: number, mode: AngleMode): number {
  return mode === "DEG" ? (x * 180) / Math.PI : x;
}

type Tok =
  | { t: "num"; v: number }
  | { t: "op"; v: string }
  | { t: "fn"; v: string }
  | { t: "lp" }
  | { t: "rp" }
  | { t: "comma" }
  | { t: "const"; v: number }
  | { t: "post"; v: string };

const FN_NAMES = [
  "asinh",
  "acosh",
  "atanh",
  "asin",
  "acos",
  "atan",
  "sinh",
  "cosh",
  "tanh",
  "sin",
  "cos",
  "tan",
  "log10",
  "logb",
  "log",
  "ln",
  "sqrt",
  "cbrt",
  "root",
  "abs",
  "exp",
  "floor",
  "ceil",
  "round",
  "ncr",
  "npr",
  "pol",
  "rec",
] as const;

const BINARY_FNS = new Set(["logb", "root", "ncr", "npr", "pol", "rec"]);

function tokenize(input: string): Tok[] {
  let s = input
    .trim()
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/π/gi, "pi")
    .replace(/\s+/g, "");

  const tokens: Tok[] = [];
  let i = 0;

  while (i < s.length) {
    const c = s[i];

    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < s.length && /[0-9.]/.test(s[j])) j++;
      if (s[j]?.toLowerCase() === "e" && /[+\-]/.test(s[j + 1] || "") || s[j]?.toLowerCase() === "e" && /[0-9]/.test(s[j + 1] || "")) {
        j++;
        if (s[j] === "+" || s[j] === "-") j++;
        while (j < s.length && /[0-9]/.test(s[j])) j++;
      }
      const raw = s.slice(i, j);
      const n = Number(raw);
      if (!Number.isFinite(n)) throw new Error("Número inválido");
      tokens.push({ t: "num", v: n });
      i = j;
      continue;
    }

    if (c === "(") {
      tokens.push({ t: "lp" });
      i++;
      continue;
    }
    if (c === ")") {
      tokens.push({ t: "rp" });
      i++;
      continue;
    }
    if (c === ",") {
      tokens.push({ t: "comma" });
      i++;
      continue;
    }
    if (c === "!") {
      tokens.push({ t: "post", v: "!" });
      i++;
      continue;
    }
    if (c === "%" && (i === s.length - 1 || /[^0-9.]/.test(s[i + 1] || ""))) {
      tokens.push({ t: "post", v: "%" });
      i++;
      continue;
    }

    if ("+-*/^%".includes(c)) {
      tokens.push({ t: "op", v: c === "%" ? "%" : c });
      i++;
      continue;
    }

    if (/[a-zA-Z]/.test(c)) {
      let j = i;
      while (j < s.length && /[a-zA-Z0-9_]/.test(s[j])) j++;
      const name = s.slice(i, j).toLowerCase();
      if (name === "pi") {
        tokens.push({ t: "const", v: Math.PI });
      } else if (name === "e") {
        tokens.push({ t: "const", v: Math.E });
      } else if ((FN_NAMES as readonly string[]).includes(name)) {
        tokens.push({ t: "fn", v: name === "log" ? "log10" : name });
      } else {
        throw new Error(`Función desconocida: ${name}`);
      }
      i = j;
      continue;
    }

    throw new Error(`Carácter no válido cerca de "${c}"`);
  }

  // Unary minus / plus
  const out: Tok[] = [];
  for (let k = 0; k < tokens.length; k++) {
    const tok = tokens[k];
    const prev = out[out.length - 1];
    if (
      tok.t === "op" &&
      (tok.v === "-" || tok.v === "+") &&
      (!prev || prev.t === "op" || prev.t === "lp" || prev.t === "fn" || prev.t === "comma")
    ) {
      if (tok.v === "+") continue;
      out.push({ t: "fn", v: "neg" });
      continue;
    }
    out.push(tok);
  }
  return out;
}

const PREC: Record<string, number> = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
  "%": 2,
  "^": 3,
};

function toRpn(tokens: Tok[]): Tok[] {
  const output: Tok[] = [];
  const stack: Tok[] = [];

  for (const tok of tokens) {
    if (tok.t === "num" || tok.t === "const") {
      output.push(tok);
    } else if (tok.t === "fn") {
      stack.push(tok);
    } else if (tok.t === "op") {
      while (stack.length) {
        const top = stack[stack.length - 1];
        if (top.t === "fn") {
          output.push(stack.pop()!);
          continue;
        }
        if (top.t === "op") {
          const rightAssoc = tok.v === "^";
          const pTop = PREC[top.v] ?? 0;
          const pCur = PREC[tok.v] ?? 0;
          if ((!rightAssoc && pTop >= pCur) || (rightAssoc && pTop > pCur)) {
            output.push(stack.pop()!);
            continue;
          }
        }
        break;
      }
      stack.push(tok);
    } else if (tok.t === "lp") {
      stack.push(tok);
    } else if (tok.t === "rp" || tok.t === "comma") {
      while (stack.length && stack[stack.length - 1].t !== "lp") {
        output.push(stack.pop()!);
      }
      if (!stack.length) throw new Error("Paréntesis desbalanceados");
      if (tok.t === "rp") {
        stack.pop();
        if (stack.length && stack[stack.length - 1].t === "fn") {
          output.push(stack.pop()!);
        }
      }
    } else if (tok.t === "post") {
      output.push(tok);
    }
  }

  while (stack.length) {
    const t = stack.pop()!;
    if (t.t === "lp" || t.t === "rp") throw new Error("Paréntesis desbalanceados");
    output.push(t);
  }
  return output;
}

function permutations(n: number, r: number): number {
  if (!Number.isInteger(n) || !Number.isInteger(r) || n < 0 || r < 0 || r > n) {
    throw new Error("nPr inválido");
  }
  let out = 1;
  for (let i = 0; i < r; i++) out *= n - i;
  return out;
}

function combinations(n: number, r: number): number {
  if (!Number.isInteger(n) || !Number.isInteger(r) || n < 0 || r < 0 || r > n) {
    throw new Error("nCr inválido");
  }
  r = Math.min(r, n - r);
  let out = 1;
  for (let i = 1; i <= r; i++) out = (out * (n - r + i)) / i;
  return out;
}

function applyUnaryFn(name: string, a: number, mode: AngleMode): number {
  switch (name) {
    case "neg":
      return -a;
    case "sin":
      return Math.sin(toRad(a, mode));
    case "cos":
      return Math.cos(toRad(a, mode));
    case "tan":
      return Math.tan(toRad(a, mode));
    case "asin":
      return fromRad(Math.asin(a), mode);
    case "acos":
      return fromRad(Math.acos(a), mode);
    case "atan":
      return fromRad(Math.atan(a), mode);
    case "sinh":
      return Math.sinh(a);
    case "cosh":
      return Math.cosh(a);
    case "tanh":
      return Math.tanh(a);
    case "asinh":
      return Math.asinh(a);
    case "acosh":
      return Math.acosh(a);
    case "atanh":
      return Math.atanh(a);
    case "ln":
      return Math.log(a);
    case "log10":
      return Math.log10(a);
    case "sqrt":
      return Math.sqrt(a);
    case "cbrt":
      return Math.cbrt(a);
    case "abs":
      return Math.abs(a);
    case "exp":
      return Math.exp(a);
    case "floor":
      return Math.floor(a);
    case "ceil":
      return Math.ceil(a);
    case "round":
      return Math.round(a);
    default:
      throw new Error(`Función desconocida: ${name}`);
  }
}

/** Binary fns return one number; pol/rec pack two values via side channel. */
let lastPair: [number, number] | null = null;

export function getLastPair(): [number, number] | null {
  return lastPair;
}

function applyBinaryFn(name: string, a: number, b: number, mode: AngleMode): number {
  switch (name) {
    case "logb":
      if (a <= 0 || a === 1 || b <= 0) throw new Error("log base inválida");
      return Math.log(b) / Math.log(a);
    case "root":
      if (a === 0) throw new Error("Índice de raíz inválido");
      return Math.pow(b, 1 / a);
    case "npr":
      return permutations(a, b);
    case "ncr":
      return combinations(a, b);
    case "pol": {
      const r = Math.hypot(a, b);
      const theta = fromRad(Math.atan2(b, a), mode);
      lastPair = [r, theta];
      return r;
    }
    case "rec": {
      const x = a * Math.cos(toRad(b, mode));
      const y = a * Math.sin(toRad(b, mode));
      lastPair = [x, y];
      return x;
    }
    default:
      throw new Error(`Función desconocida: ${name}`);
  }
}

function evalRpn(rpn: Tok[], mode: AngleMode): number {
  const st: number[] = [];
  for (const tok of rpn) {
    if (tok.t === "num" || tok.t === "const") {
      st.push(tok.v);
    } else if (tok.t === "post") {
      if (!st.length) throw new Error("Expresión incompleta");
      const a = st.pop()!;
      if (tok.v === "!") st.push(factorial(a));
      else if (tok.v === "%") st.push(a / 100);
    } else if (tok.t === "fn") {
      if (BINARY_FNS.has(tok.v)) {
        if (st.length < 2) throw new Error("Faltan argumentos");
        const b = st.pop()!;
        const a = st.pop()!;
        st.push(applyBinaryFn(tok.v, a, b, mode));
      } else {
        if (!st.length) throw new Error("Falta argumento");
        st.push(applyUnaryFn(tok.v, st.pop()!, mode));
      }
    } else if (tok.t === "op") {
      if (st.length < 2) throw new Error("Expresión incompleta");
      const b = st.pop()!;
      const a = st.pop()!;
      switch (tok.v) {
        case "+":
          st.push(a + b);
          break;
        case "-":
          st.push(a - b);
          break;
        case "*":
          st.push(a * b);
          break;
        case "/":
          if (b === 0) throw new Error("División entre cero");
          st.push(a / b);
          break;
        case "%":
          st.push(a % b);
          break;
        case "^":
          st.push(Math.pow(a, b));
          break;
        default:
          throw new Error("Operador inválido");
      }
    }
  }
  if (st.length !== 1) throw new Error("Expresión incompleta");
  return st[0];
}

export function formatScientific(value: number): string {
  if (!Number.isFinite(value)) return "Error";
  if (Object.is(value, -0)) return "0";
  const abs = Math.abs(value);
  if (abs !== 0 && (abs >= 1e10 || abs < 1e-6)) {
    return value.toExponential(8).replace(/\.?0+e/, "e").replace(/e\+/, "e+");
  }
  const s = Number(value.toPrecision(12)).toString();
  return s;
}

export type VarMap = Record<string, number>;

function substituteVars(expr: string, vars: VarMap = {}): string {
  let s = expr;
  // Longer names first; wrap values in parentheses for safety
  const keys = Object.keys(vars).sort((a, b) => b.length - a.length);
  for (const k of keys) {
    const re = new RegExp(`(?<![A-Za-z0-9_])${k}(?![A-Za-z0-9_])`, "gi");
    s = s.replace(re, `(${formatScientific(vars[k])})`);
  }
  return s;
}

export function evaluateExpression(
  expr: string,
  mode: AngleMode,
  vars: VarMap = {}
): EvalResult {
  try {
    lastPair = null;
    if (!expr.trim()) return { ok: false, error: "Escribe una expresión" };
    const prepared = substituteVars(expr, vars);
    const tokens = tokenize(prepared);
    const rpn = toRpn(tokens);
    const value = evalRpn(rpn, mode);
    if (!Number.isFinite(value)) {
      return { ok: false, error: "Resultado no numérico" };
    }
    return { ok: true, value, display: formatScientific(value) };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Error de cálculo" };
  }
}

export function degreesToRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function radiansToDegrees(rad: number): number {
  return (rad * 180) / Math.PI;
}

export function toScientificNotation(n: number): { coefficient: number; exponent: number; display: string } {
  if (!Number.isFinite(n) || n === 0) {
    return { coefficient: 0, exponent: 0, display: "0 × 10⁰" };
  }
  const exponent = Math.floor(Math.log10(Math.abs(n)));
  const coefficient = n / Math.pow(10, exponent);
  const coeff = Number(coefficient.toPrecision(10));
  return {
    coefficient: coeff,
    exponent,
    display: `${coeff} × 10^${exponent}`,
  };
}

export function fromScientificNotation(coefficient: number, exponent: number): number {
  return coefficient * Math.pow(10, exponent);
}

export function formatEngineering(value: number): string {
  if (!Number.isFinite(value) || value === 0) return "0";
  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);
  let exp = Math.floor(Math.log10(abs));
  exp = Math.floor(exp / 3) * 3;
  const mantissa = abs / Math.pow(10, exp);
  const m = Number(mantissa.toPrecision(10));
  return `${sign}${m}e${exp >= 0 ? "+" : ""}${exp}`;
}

export function toMixedFraction(value: number, maxDen = 10000): string {
  if (!Number.isFinite(value)) return "Error";
  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);
  const whole = Math.floor(abs + 1e-12);
  const frac = abs - whole;
  if (frac < 1e-12) return `${sign}${whole}`;

  let bestN = 1;
  let bestD = 1;
  let bestErr = Math.abs(frac - 1);
  for (let d = 1; d <= maxDen; d++) {
    const n = Math.round(frac * d);
    const err = Math.abs(frac - n / d);
    if (err < bestErr) {
      bestErr = err;
      bestN = n;
      bestD = d;
      if (err < 1e-12) break;
    }
  }
  if (bestN === 0) return `${sign}${whole}`;
  if (whole === 0) return `${sign}${bestN}/${bestD}`;
  return `${sign}${whole} ${bestN}/${bestD}`;
}

export function decimalToDms(value: number): string {
  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);
  const deg = Math.floor(abs);
  const minFloat = (abs - deg) * 60;
  const min = Math.floor(minFloat);
  const sec = (minFloat - min) * 60;
  return `${sign}${deg}°${min}'${sec.toFixed(2)}"`;
}

export function dmsToDecimal(deg: number, min = 0, sec = 0): number {
  const sign = deg < 0 ? -1 : 1;
  return sign * (Math.abs(deg) + min / 60 + sec / 3600);
}

/** Numerical derivative at x0 for expression f(x) with variable x. */
export function numericalDerivative(
  exprWithX: string,
  x0: number,
  mode: AngleMode,
  h = 1e-6
): EvalResult {
  const left = evaluateExpression(exprWithX.split("x").join(`(${formatScientific(x0 - h)})`), mode);
  const right = evaluateExpression(exprWithX.split("x").join(`(${formatScientific(x0 + h)})`), mode);
  if (!left.ok) return left;
  if (!right.ok) return right;
  const d = (right.value - left.value) / (2 * h);
  if (!Number.isFinite(d)) return { ok: false, error: "Derivada no numérica" };
  return { ok: true, value: d, display: formatScientific(d) };
}

/** Trapezoidal integral of expression f(x) from a to b. */
export function numericalIntegral(
  exprWithX: string,
  a: number,
  b: number,
  mode: AngleMode,
  n = 256
): EvalResult {
  if (n < 2) n = 2;
  const h = (b - a) / n;
  let sum = 0;
  for (let i = 0; i <= n; i++) {
    const x = a + i * h;
    const r = evaluateExpression(exprWithX.split("x").join(`(${formatScientific(x)})`), mode);
    if (!r.ok) return r;
    sum += (i === 0 || i === n ? 1 : 2) * r.value;
  }
  const value = (h / 2) * sum;
  if (!Number.isFinite(value)) return { ok: false, error: "Integral no numérica" };
  return { ok: true, value, display: formatScientific(value) };
}

export function solveQuadratic(
  a: number,
  b: number,
  c: number
): { ok: true; roots: number[]; display: string } | { ok: false; error: string } {
  if (a === 0) {
    if (b === 0) return { ok: false, error: "No es una ecuación" };
    return { ok: true, roots: [-c / b], display: `x=${formatScientific(-c / b)}` };
  }
  const disc = b * b - 4 * a * c;
  if (disc < 0) {
    const re = -b / (2 * a);
    const im = Math.sqrt(-disc) / (2 * a);
    return {
      ok: true,
      roots: [],
      display: `x=${formatScientific(re)}±${formatScientific(im)}i`,
    };
  }
  const s = Math.sqrt(disc);
  const x1 = (-b + s) / (2 * a);
  const x2 = (-b - s) / (2 * a);
  if (Math.abs(disc) < 1e-12) {
    return { ok: true, roots: [x1], display: `x=${formatScientific(x1)}` };
  }
  return {
    ok: true,
    roots: [x1, x2],
    display: `x₁=${formatScientific(x1)}  x₂=${formatScientific(x2)}`,
  };
}

export type StatSummary = {
  n: number;
  mean: number;
  sum: number;
  sumSq: number;
  popStd: number;
  sampleStd: number;
  min: number;
  max: number;
};

export function summarizeStats(data: number[]): StatSummary | null {
  if (!data.length) return null;
  const n = data.length;
  const sum = data.reduce((a, b) => a + b, 0);
  const sumSq = data.reduce((a, b) => a + b * b, 0);
  const mean = sum / n;
  const popVar = sumSq / n - mean * mean;
  const sampleVar = n > 1 ? (sumSq - (sum * sum) / n) / (n - 1) : 0;
  return {
    n,
    mean,
    sum,
    sumSq,
    popStd: Math.sqrt(Math.max(0, popVar)),
    sampleStd: Math.sqrt(Math.max(0, sampleVar)),
    min: Math.min(...data),
    max: Math.max(...data),
  };
}

export type Complex = { re: number; im: number };

export function complexAdd(a: Complex, b: Complex): Complex {
  return { re: a.re + b.re, im: a.im + b.im };
}
export function complexSub(a: Complex, b: Complex): Complex {
  return { re: a.re - b.re, im: a.im - b.im };
}
export function complexMul(a: Complex, b: Complex): Complex {
  return { re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re };
}
export function complexDiv(a: Complex, b: Complex): Complex {
  const d = b.re * b.re + b.im * b.im;
  if (d === 0) throw new Error("División entre cero");
  return {
    re: (a.re * b.re + a.im * b.im) / d,
    im: (a.im * b.re - a.re * b.im) / d,
  };
}
export function formatComplex(z: Complex): string {
  if (Math.abs(z.im) < 1e-12) return formatScientific(z.re);
  if (Math.abs(z.re) < 1e-12) return `${formatScientific(z.im)}i`;
  const sign = z.im >= 0 ? "+" : "-";
  return `${formatScientific(z.re)}${sign}${formatScientific(Math.abs(z.im))}i`;
}

export function det2(m: number[][]): number {
  return m[0][0] * m[1][1] - m[0][1] * m[1][0];
}

export function mul2(a: number[][], b: number[][]): number[][] {
  return [
    [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
    [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]],
  ];
}

export function inv2(m: number[][]): number[][] | null {
  const d = det2(m);
  if (Math.abs(d) < 1e-12) return null;
  return [
    [m[1][1] / d, -m[0][1] / d],
    [-m[1][0] / d, m[0][0] / d],
  ];
}

export function formatMatrix2(m: number[][]): string {
  return `[[${formatScientific(m[0][0])}, ${formatScientific(m[0][1])}], [${formatScientific(m[1][0])}, ${formatScientific(m[1][1])}]]`;
}
