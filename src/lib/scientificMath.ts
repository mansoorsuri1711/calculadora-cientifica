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
  "log",
  "ln",
  "sqrt",
  "cbrt",
  "abs",
  "exp",
  "floor",
  "ceil",
  "round",
] as const;

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

function applyFn(name: string, a: number, mode: AngleMode): number {
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
      if (!st.length) throw new Error("Falta argumento");
      st.push(applyFn(tok.v, st.pop()!, mode));
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

export function evaluateExpression(expr: string, mode: AngleMode): EvalResult {
  try {
    if (!expr.trim()) return { ok: false, error: "Escribe una expresión" };
    const tokens = tokenize(expr);
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
