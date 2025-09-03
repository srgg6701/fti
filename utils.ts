export type EmailValidation =
  | { valid: true }
  | { valid: false; reason:
      'empty' | 'too_long' | 'at' | 'local_too_long' |
      'local_chars' | 'local_dots' | 'domain_length' |
      'no_tld' | 'domain_label' | 'tld' };

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

  if (domain.length < 3 || domain.length > 253)
    return { valid: false, reason: 'domain_length' };

  const labels = domain.split('.');
  if (labels.length < 2) return { valid: false, reason: 'no_tld' };

  const labelRe = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)$/;
  if (!labels.every(l => labelRe.test(l)))
    return { valid: false, reason: 'domain_label' };

  const tld = labels[labels.length - 1];
  if (!/^(?:[A-Za-z]{2,63}|xn--[A-Za-z0-9-]{2,59})$/.test(tld))
    return { valid: false, reason: 'tld' };

  return { valid: true };
}
