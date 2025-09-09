'use client';
import { useMemo, useState } from 'react';

import 'flag-icons/css/flag-icons.min.css';
import { type Country, COUNTRIES } from '@/lib/phones';

type Props = {
  value?: Country;
  onChange?: (c: Country) => void;
  className?: string;
};

export default function PhoneCountryPicker({ value, onChange, className }: Props) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const selected = value ?? COUNTRIES[0];

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();

    if (!s) return COUNTRIES;

    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(s) || c.code.toLowerCase().includes(s) || c.dial.includes(s),
    );
  }, [q]);

  return (
    <div className={`relative ${className ?? ''} mr-[5px] w-[60px]`}>
      {/* trigger */}
      <button
        className="blick-rounded bg-translusent-light flex w-full items-center gap-3"
        type="button"
        onClick={() => setOpen((v) => !v)}
      >
        <span
          aria-hidden
          className={`fi fis fi-${selected.code.toLowerCase()} mr-[-30px] ml-[15px] rounded-[35%]`}
        />
        <span
          className="ml-[28px] block text-white"
          style={{ transform: 'rotate(90deg) scale(0.8, 1.1)' }}
        >
          &gt;
        </span>
      </button>
      {/* drop-down */}
      {open && (
        <div className="absolute z-50 mt-2 rounded-2xl border border-white/10 bg-black/80 p-2 shadow-lg backdrop-blur">
          {/* search field */}
          <input
            className="mb-2 h-9 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-white/90 placeholder-white/40 outline-none focus:border-white/20"
            placeholder="Search country or dial…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          {/* dropdown list of countries */}
          <ul className="max-h-64 space-y-1 overflow-auto">
            {filtered.map((c) => (
              <li key={c.code}>
                <button
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left whitespace-nowrap hover:bg-white/5"
                  type="button"
                  onClick={() => {
                    onChange?.(c);
                    setOpen(false);
                    console.log('c', c);
                    setQ('');
                  }}
                >
                  <span aria-hidden className={`fi fis fi-${c.code.toLowerCase()}`} />
                  <span className="text-white/90">{c.name}</span>
                  <span className="ml-auto text-white/60">{c.dial}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Клик вне — закрыть */}
      {open && (
        <button
          aria-hidden
          className="fixed inset-0 z-40 cursor-default"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}
