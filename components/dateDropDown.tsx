"use client";

import { useState } from "react";

type Item = { label: string; value: string; disabled?: boolean };

export default function DropdownPill({
  items,
  defaultValue,
  onChange,
  width = 86,
  height = 21,
  className = "",
  onSelect,
}: {
  items: Item[];
  defaultValue?: string;
  onChange?: (v: string) => void;
  width?: number;
  height?: number;
  className?: string;
  onSelect?: (item: any) => void;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue ?? items[0]?.value ?? "");
  const selected = items.find((i) => i.value === value);

  return (
    <div className={`relative inline-block ${className}`} style={{ width }}>
      <button
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex w-full items-center justify-between px-3"
        style={{
          height,
          borderRadius: height / 2,
          background: "rgba(244,249,255,0.05)",
          color: "#F4F9FF",
        }}
        type="button"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="text-sm leading-none whitespace-nowrap">
          {selected?.label ?? "Select"}
        </span>
        <svg
          className={`transition-transform ${open ? "rotate-180" : ""}`}
          height="12"
          viewBox="0 0 12 12"
          width="12"
        >
          <path
            d="M2 4l4 4 4-4"
            stroke="#F4F9FF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.25"
          />
        </svg>
      </button>

      {open && (
        <div
          className="absolute left-0 z-50 mt-1 min-w-full overflow-hidden rounded-md border border-white/10 bg-black/70 backdrop-blur-md"
          role="listbox"
        >
          <ul className="max-h-60 overflow-auto py-1">
            {items.map((it) => {
              const isSel = it.value === value;

              return (
                <li key={it.value}>
                  <button
                    aria-selected={isSel}
                    className={`w-full px-3 py-1.5 text-left text-[12px] text-white ${
                      it.disabled
                        ? "cursor-not-allowed opacity-50"
                        : isSel
                          ? "bg-white/15"
                          : "hover:bg-white/10"
                    }`}
                    disabled={it.disabled}
                    role="option"
                    type="button"
                    onClick={() => {
                      setValue(it.value);
                      onChange?.(it.value); // если где-то используется
                      onSelect?.(it);
                      setOpen(false);
                    }}
                  >
                    {it.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
