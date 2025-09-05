'use client';

import { useState } from 'react';

type Item = { label: string; value: string; disabled?: boolean };

export default function DropdownPill({
  items,
  defaultValue,
  onChange,
  width = 86,
  height = 21,
  className = '',
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
  const [value, setValue] = useState(defaultValue ?? items[0]?.value ?? '');
  const selected = items.find(i => i.value === value);

  return (
    <div className={`relative inline-block ${className}`} style={{ width }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-3"
        style={{
          height,
          borderRadius: height / 2,
          background: 'rgba(244,249,255,0.05)',
          color: '#F4F9FF',
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-sm leading-none whitespace-nowrap">{selected?.label ?? 'Select'}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M2 4l4 4 4-4" stroke="#F4F9FF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div role="listbox" className="absolute left-0 z-50 mt-1 min-w-full overflow-hidden rounded-md border border-white/10 bg-black/70 backdrop-blur-md">
          <ul className="max-h-60 overflow-auto py-1">
            {items.map(it => {
              const isSel = it.value === value;
              return (
                <li key={it.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSel}
                    disabled={it.disabled}
                    onClick={() => {
                      setValue(it.value);
                      onChange?.(it.value);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-[12px] text-white ${
                      it.disabled
                        ? 'opacity-50 cursor-not-allowed'
                        : isSel
                        ? 'bg-white/15'
                        : 'hover:bg-white/10'
                    }`}
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
