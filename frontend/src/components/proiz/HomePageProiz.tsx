'use client';

import { useEffect, useState } from 'react';
import About from './About';
import Advantages from './Advantages';
import Header from './Header';
import Hero from './Hero';
import { DEFAULT_LOCALE, LOCALES,type Locale } from '@/lib/eltex';
import ChatWidget from './ChatWidget';
import Services from './Services';
import Contacts from './Contacts';
import Footer from './Footer';

export default function HomePageProiz() {

  const STORAGE_KEY = 'eltex-locale';
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  // 1) при первой загрузке читаем сохранённый язык
useEffect(() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (LOCALES as string[]).includes(saved)) {
      setLocale(saved as Locale);
    }
  } catch {
    // localStorage может быть недоступен (приватный режим), тогда просто остаётся RU
  }
}, []);

// 2) обновляем lang у <html>
useEffect(() => {
  document.documentElement.lang = locale;
}, [locale]);

// 3) при выборе сохраняем
const handleSelectLocale = (nextLocale: Locale) => {
  setLocale(nextLocale);
  try {
    localStorage.setItem(STORAGE_KEY, nextLocale);
  } catch {}
};
}
