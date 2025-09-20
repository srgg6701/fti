export type EmailValidation =
  | { valid: true }
  | {
      valid: false;
      reason:
        | "empty"
        | "too_long"
        | "at"
        | "local_too_long"
        | "local_chars"
        | "local_dots"
        | "domain_length"
        | "no_tld"
        | "domain_label"
        | "tld";
    };

export function validateEmail(email: string): EmailValidation {
  const e = email.trim();

  if (!e) return { valid: false, reason: "empty" };
  if (e.length > 254) return { valid: false, reason: "too_long" };

  const at = e.indexOf("@");

  if (at <= 0 || at !== e.lastIndexOf("@"))
    return { valid: false, reason: "at" };

  const local = e.slice(0, at);
  const domain = e.slice(at + 1);

  if (local.length > 64) return { valid: false, reason: "local_too_long" };
  if (!/^[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-]+$/.test(local))
    return { valid: false, reason: "local_chars" };
  if (local.startsWith(".") || local.endsWith(".") || local.includes(".."))
    return { valid: false, reason: "local_dots" };

  if (domain.length < 3 || domain.length > 253)
    return { valid: false, reason: "domain_length" };

  const labels = domain.split(".");

  if (labels.length < 2) return { valid: false, reason: "no_tld" };

  const labelRe = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)$/;

  if (!labels.every((l) => labelRe.test(l)))
    return { valid: false, reason: "domain_label" };

  const tld = labels[labels.length - 1];

  if (!/^(?:[A-Za-z]{2,63}|xn--[A-Za-z0-9-]{2,59})$/.test(tld))
    return { valid: false, reason: "tld" };

  return { valid: true };
}

// password-validate.ts
export type PasswordValidation =
  | { valid: true }
  | {
      valid: false;
      reason:
        | "empty"
        | "too_short"
        | "too_long"
        | "whitespace"
        | "invalid_char"
        | "lower"
        | "upper"
        | "digit"
        | "symbol"
        | "repeat"
        | "sequence"
        | "common";
    };

type Opts = {
  min?: number; // default 8
  max?: number; // default 128
  allowUnicode?: boolean; // default false (ASCII only)
  allowSpaces?: boolean; // default false
  disallow?: string[];
};

export function validatePassword(
  pw: string,
  opts: Opts = {},
): PasswordValidation {
  const {
    min = 8,
    max = 128,
    allowUnicode = false,
    allowSpaces = false,
    disallow = [
      "password",
      "123456",
      "qwerty",
      "111111",
      "abc123",
      "password1",
      "12345678",
      "admin",
      "letmein",
    ],
  } = opts;

  const p = pw ?? "";

  if (!p) return { valid: false, reason: "empty" };
  if (p.length < min) return { valid: false, reason: "too_short" };
  if (p.length > max) return { valid: false, reason: "too_long" };

  if (!allowSpaces && /\s/.test(p))
    return { valid: false, reason: "whitespace" };
  if (!allowUnicode && /[^\x20-\x7E]/.test(p))
    return { valid: false, reason: "invalid_char" }; // только ASCII

  if (!/[a-z]/.test(p)) return { valid: false, reason: "lower" };
  if (!/[A-Z]/.test(p)) return { valid: false, reason: "upper" };
  if (!/\d/.test(p)) return { valid: false, reason: "digit" };
  // ASCII-punctuation as a symbok
  if (!/[!@#$%^&*()\-_=+\[\]{};:'",.<>/?\\|`~]/.test(p))
    return { valid: false, reason: "symbol" };

  // 3+ the same
  if (/(.)\1{2,}/.test(p)) return { valid: false, reason: "repeat" };

  // Sequence like abcd / 1234
  const isSeq = (s: string) => {
    let up = 1,
      down = 1;
    const norm = s.toLowerCase();
    const isAlnum = (c: string) => /[a-z0-9]/.test(c);
    let prev: number | null = null;

    for (const ch of norm) {
      if (!isAlnum(ch)) {
        up = down = 1;
        prev = null;
        continue;
      }
      const code = ch.charCodeAt(0);

      if (prev !== null) {
        up = code === prev + 1 ? up + 1 : 1;
        down = code === prev - 1 ? down + 1 : 1;
        if (up >= 4 || down >= 4) return true;
      }
      prev = code;
    }

    return false;
  };

  if (isSeq(p)) return { valid: false, reason: "sequence" };

  if (disallow.includes(p.toLowerCase()))
    return { valid: false, reason: "common" };

  return { valid: true };
}

export const routesAside = ["/", "/create-account", "/login", "/logout"];

export function checkRouteAside(segment: string) {
  return routesAside.some((seg) => seg === segment);
}

export const getUrlSegments = (path: () => string, segment: number) => {
  const pathname = path();
  const pathArray = pathname.split("/");

  return `/${pathArray[segment]}`;
};

// clampText.ts
export function clampText(
  raw: string,
  {
    max = 70,
    min = 50,
    suffix = "…", // what to append
    stripHtml = true, // cut out tags
  }: { max?: number; min?: number; suffix?: string; stripHtml?: boolean } = {},
): string {
  if (!raw) return "";

  let text = String(raw);

  if (stripHtml) {
    // removing tags
    text = text.replace(/<[^>]*>/g, "");
  }

  // \s normalization
  text = text.replace(/\s+/g, " ").trim();

  if (text.length <= max) return text;

  // cutting off
  const punct = /[.!?…,:;—-]/g;
  const cutoff = text.lastIndexOf(" ", max);
  let cut = cutoff > 0 ? cutoff : max;

  // attempt to improve
  const matchPunct = [...text.slice(0, max).matchAll(punct)].pop();

  if (matchPunct && matchPunct.index! >= (min ?? 0)) {
    cut = Math.max(cut, matchPunct.index! + 1);
  }

  // ensure the string's sufficient length
  if (cut < min) {
    const nextSpace = text.indexOf(" ", max);

    if (nextSpace !== -1) cut = nextSpace;
  }

  const head = text.slice(0, cut).trim();

  // control if we need suffics
  return head.length < text.length
    ? head.replace(/[,.!?:;—-]+$/, "") + suffix
    : head;
}

export function parseAmount(s: string) {
  // strip $ , spaces etc.
  const n = Number(s.replace(/[^\d.]/g, ""));

  return Number.isFinite(n) ? n : NaN;
}

export function validateMinNumberValue(
  value: string,
  MIN: number,
  setError: Function,
) {
  const n = parseAmount(value);

  if (!Number.isFinite(n)) {
    setError("Enter a valid amount");
  } else if (n < MIN) {
    setError("The minimum amount is $1,500");
  } else {
    setError(null);
  }
}

export function setInvalidEmailMessage(reason: string): string {
  let errMess = "";

  switch (reason) {
    case "too_long":
      errMess = "Too long email";
      break;
    case "at":
      errMess = "'@' is missed";
      break;
    case "local_too_long":
      errMess = "You put too many characters before '@'";
      break;
    case "local_chars":
      errMess = "You used invalid characters";
      break;
    case "local_dots":
      errMess = "You used '.' in wrong position or with wrong sequence";
      break;
    case "domain_length":
      errMess = "You put too less characters after '@'";
      break;
    case "no_tld":
      errMess = "Wrong value after '@'";
      break;
    case "domain_label":
      errMess = "Wrong characters after '@'";
      break;
    case "tld":
      errMess = "Wrong domain ending";
      break;
    default:
      errMess = "Please, enter your email";
      break;
  }

  return errMess;
}
