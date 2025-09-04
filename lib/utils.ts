export type EmailValidation =
  | { valid: true }
  | {
      valid: false;
      reason:
        | 'empty'
        | 'too_long'
        | 'at'
        | 'local_too_long'
        | 'local_chars'
        | 'local_dots'
        | 'domain_length'
        | 'no_tld'
        | 'domain_label'
        | 'tld';
    };

export function validateEmail(email: string): EmailValidation {
  const e = email.trim();

  if (!e) return { valid: false, reason: 'empty' };
  if (e.length > 254) return { valid: false, reason: 'too_long' };

  const at = e.indexOf('@');

  if (at <= 0 || at !== e.lastIndexOf('@')) return { valid: false, reason: 'at' };

  const local = e.slice(0, at);
  const domain = e.slice(at + 1);

  if (local.length > 64) return { valid: false, reason: 'local_too_long' };
  if (!/^[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-]+$/.test(local))
    return { valid: false, reason: 'local_chars' };
  if (local.startsWith('.') || local.endsWith('.') || local.includes('..'))
    return { valid: false, reason: 'local_dots' };

  if (domain.length < 3 || domain.length > 253) return { valid: false, reason: 'domain_length' };

  const labels = domain.split('.');

  if (labels.length < 2) return { valid: false, reason: 'no_tld' };

  const labelRe = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)$/;

  if (!labels.every((l) => labelRe.test(l))) return { valid: false, reason: 'domain_label' };

  const tld = labels[labels.length - 1];

  if (!/^(?:[A-Za-z]{2,63}|xn--[A-Za-z0-9-]{2,59})$/.test(tld))
    return { valid: false, reason: 'tld' };

  return { valid: true };
}

// password-validate.ts
export type PasswordValidation =
  | { valid: true }
  | {
      valid: false;
      reason:
        | 'empty'
        | 'too_short'
        | 'too_long'
        | 'whitespace'
        | 'invalid_char'
        | 'lower'
        | 'upper'
        | 'digit'
        | 'symbol'
        | 'repeat'
        | 'sequence'
        | 'common';
    };

type Opts = {
  min?: number; // default 8
  max?: number; // default 128
  allowUnicode?: boolean; // default false (ASCII only)
  allowSpaces?: boolean; // default false
  disallow?: string[];
};

export function validatePassword(pw: string, opts: Opts = {}): PasswordValidation {
  const {
    min = 8,
    max = 128,
    allowUnicode = false,
    allowSpaces = false,
    disallow = [
      'password',
      '123456',
      'qwerty',
      '111111',
      'abc123',
      'password1',
      '12345678',
      'admin',
      'letmein',
    ],
  } = opts;

  const p = pw ?? '';

  if (!p) return { valid: false, reason: 'empty' };
  if (p.length < min) return { valid: false, reason: 'too_short' };
  if (p.length > max) return { valid: false, reason: 'too_long' };

  if (!allowSpaces && /\s/.test(p)) return { valid: false, reason: 'whitespace' };
  if (!allowUnicode && /[^\x20-\x7E]/.test(p)) return { valid: false, reason: 'invalid_char' }; // только ASCII

  if (!/[a-z]/.test(p)) return { valid: false, reason: 'lower' };
  if (!/[A-Z]/.test(p)) return { valid: false, reason: 'upper' };
  if (!/\d/.test(p)) return { valid: false, reason: 'digit' };
  // ASCII-punctuation as a symbok
  if (!/[!@#$%^&*()\-_=+\[\]{};:'",.<>/?\\|`~]/.test(p)) return { valid: false, reason: 'symbol' };

  // 3+ the same
  if (/(.)\1{2,}/.test(p)) return { valid: false, reason: 'repeat' };

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

  if (isSeq(p)) return { valid: false, reason: 'sequence' };

  if (disallow.includes(p.toLowerCase())) return { valid: false, reason: 'common' };

  return { valid: true };
}

export const routesAside = ['/', '/create-account', '/login', '/logout'];

export function checkRouteAside(segment: string) {
  return routesAside.some((seg) => seg === segment);
}

export const getUrlSegments = (path: () => string, segment: number) => {
  const pathname = path();
  const pathArray = pathname.split('/');

  return `/${pathArray[segment]}`;
};
