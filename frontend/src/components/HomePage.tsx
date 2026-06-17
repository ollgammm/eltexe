'use client';

import { useEffect, useState } from 'react';
import About from './About';
import Advantages from './Advantages';
import Header from './Header';
import Hero from './Hero';
import { DEFAULT_LOCALE, type Locale } from '@/lib/eltex-alatau';
import ChatWidget from './ChatWidget';
import Services from './Services';
import Contacts from './Contacts';
import Footer from './Footer';

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const handleSelectLocale = (nextLocale: Locale) => {
    setLocale(nextLocale);
  };

  return (
    <>
      <Header locale={locale} onSelectLocale={handleSelectLocale} />
      <Hero locale={locale} />
      <About locale={locale} />
      <Advantages locale={locale} />
      <Services locale={locale} />
      {/* <Infrastructure locale={locale} />
      <Achievements locale={locale} />*/}
      <Contacts locale={locale} />
      <Footer locale={locale} />
      <ChatWidget />
    </>
  );
}
