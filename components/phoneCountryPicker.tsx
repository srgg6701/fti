"use client";
import { useMemo, useState } from "react";
import "flag-icons/css/flag-icons.min.css";
import { type Country, COUNTRIES } from "@/lib/phones";

type Props = {
  value?: Country;
  onChange?: (c: Country) => void;
  className?: string;
};

export default function PhoneCountryPicker({ value, onChange, className }: Props) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const selected = value ?? COUNTRIES[0];

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return COUNTRIES;
    return COUNTRIES.filter(
      c =>
        c.name.toLowerCase().includes(s) ||
        c.code.toLowerCase().includes(s) ||
        c.dial.includes(s)
    );
  }, [q]);


  return (
    <div className={`relative ${className ?? ""} w-[60px] mr-[5px]`}>
      {/* trigger */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="form-h-45 input-rounded bg-translusent-light w-full flex items-center gap-3">
        <span className={`fi fis fi-${selected.code.toLowerCase()} ml-[15px] mr-[-30px] rounded-[35%]`} aria-hidden />
        <span style={{transform: "rotate(90deg) scale(0.8, 1.1)"}} className="block text-white ml-[28px]">&gt;</span>
      </button>

      {/* drop-down */}
      {open && (
        <div
          className="
            absolute z-50 mt-2 rounded-2xl bg-black/80 backdrop-blur
            border border-white/10 p-2 shadow-lg">
          {/* search field */}
          <input
            autoFocus
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search country or dial…"
            className="
              w-full h-9 px-3 rounded-lg bg-white/5 border border-white/10
              text-white/90 placeholder-white/40 outline-none mb-2
              focus:border-white/20"
          />
          {/* dropdown list of countries */}
          <ul className="max-h-64 overflow-auto space-y-1">
            {filtered.map(c => (
              <li key={c.code}>
                <button
                  type="button"
                  onClick={() => {
                    onChange?.(c);
                    setOpen(false);
                    console.log('c', c);
                    setQ("");
                  }}
                  className="
                    w-full flex items-center gap-3 px-3 py-2 rounded-xl
                    hover:bg-white/5 text-left whitespace-nowrap">
                  <span className={`fi fis fi-${c.code.toLowerCase()}`} aria-hidden />
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
