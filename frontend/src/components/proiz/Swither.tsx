'use client';

import { useEffect, useRef, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { LOCALES, LOCALE_LABELS, LOCALE_NAMES, type Locale } from '@/lib/eltex';

type Props = {
  locale: Locale;
  onSelect: (locale: Locale) => void;
};

export default function LocaleSwitcher({ locale, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1 px-3 py-2 text-sm text-white hover:text-[#353EEA] transition-colors duration-200 cursor-pointer touch-manipulation">
        {LOCALE_LABELS[locale]}
        <MdKeyboardArrowDown
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        role="menu"
        className={`absolute right-0 top-full z-[70] w-44 rounded-2xl border border-white/10 bg-white/90 px-2 pt-2 pb-2 shadow-xl shadow-black/30 backdrop-blur-md transition-all duration-200 ${
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1 opacity-0'
        }`}>
        {LOCALES.map((option) => {
          const isActive = option === locale;
          return (
            <button
              key={option}
              role="menuitem"
              type="button"
              onClick={() => {
                onSelect(option);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors duration-200 cursor-pointer touch-manipulation ${
                isActive ? 'bg-[#353EEA]' : 'hover:bg-black/5'
              }`}>
              <span className={isActive ? 'text-white font-medium' : 'text-black'}>
                {LOCALE_NAMES[option]}
              </span>
              <span
                className={`text-xs font-semibold uppercase ${isActive ? 'text-white' : 'text-black/40'}`}>
                {LOCALE_LABELS[option]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
