'use client';

import Image from 'next/image';
import { useState, useEffect, type MouseEvent } from 'react';
import { MdMenu, MdClose } from 'react-icons/md';
import { createTranslator, type Locale, type NavigationLink } from '@/lib/eltex';
import LocaleSwitcher from './Swither';
import Link from 'next/link';

type HeaderProps = {
  locale: Locale;
  onSelectLocale: (locale: Locale) => void;
};

const headerLinkHrefs = ['#about', '#advantages', '#services', '#contacts', '/proizvodstvo'];
const scrollOffset = 96;

export default function Header({ locale, onSelectLocale }: HeaderProps) {
  const t = createTranslator(locale);
  const navLinks = t('header.navLinks') as NavigationLink[];
  const requestCta = t('header.requestCta');
  const menuLabel = t('header.menuLabel');
  const closeLabel = t('header.closeLabel');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleMenu = () => setMenuOpen((v) => !v);
  const closeMobileMenu = () => setMenuOpen(false);
  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;

    event.preventDefault();

    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    closeMobileMenu();
    window.history.pushState(null, '', href);

    window.requestAnimationFrame(() => {
      const top = target.getBoundingClientRect().top + window.scrollY - scrollOffset;
      window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
    });
  };

  return (
    <>
      <header
        data-scrolled={scrolled}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4 sm:px-8 md:px-16 lg:px-36">
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 transition-all duration-300 ${
            scrolled
              ? 'bg-black/60 border-b border-white/10 shadow-lg shadow-black/20'
              : 'bg-transparent'
          }`}
          style={
            scrolled
              ? {
                  WebkitBackdropFilter: 'blur(12px)',
                  backdropFilter: 'blur(12px)',
                }
              : undefined
          }
        />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-1 shrink-0 cursor-pointer">
              <Image src="/logo.png" width={170} height={44} alt="logo" />
            </Link>

            <nav className="hidden lg:block">
              <ul className="flex items-center gap-6 xl:gap-8">
                {navLinks.map((link, index) => (
                  <li key={link.label}>
                    <Link
                      href={headerLinkHrefs[index] ?? '/'}
                      onClick={(event) => handleAnchorClick(event, headerLinkHrefs[index] ?? '/')}
                      className="text-base xl:text-lg cursor-pointer hover:text-[#353EEA] transition-colors duration-200 whitespace-nowrap">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <LocaleSwitcher locale={locale} onSelect={onSelectLocale} />
            <Link
              href="#contacts"
              onClick={(event) => handleAnchorClick(event, '#contacts')}
              className="px-4 py-1 border border-[#353EEA] text-white rounded-full hover:bg-[#353EEA] transition-colors duration-200 whitespace-nowrap cursor-pointer">
              {requestCta}
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <LocaleSwitcher locale={locale} onSelect={onSelectLocale} />
            <button
              type="button"
              onClick={handleToggleMenu}
              className="p-2 text-2xl text-white focus:outline-none cursor-pointer touch-manipulation"
              aria-label={menuLabel}>
              {menuOpen ? <MdClose /> : <MdMenu />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 lg:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobileMenu}
      />

      <div
        className={`fixed top-0 right-0 z-[60] h-full w-72 sm:w-80 bg-[#0a0a0a] border-l border-white/10 flex flex-col pt-20 px-6 pb-8 transition-transform duration-300 ease-in-out lg:hidden ${
          menuOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'
        }`}>
        <button
          type="button"
          onClick={closeMobileMenu}
          className="absolute top-4 right-4 p-2 text-white text-2xl touch-manipulation"
          aria-label={closeLabel}>
          <MdClose />
        </button>

        <nav className="flex-1">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link, index) => (
              <li key={link.label}>
                <Link
                  href={headerLinkHrefs[index] ?? '/'}
                  onClick={(event) => handleAnchorClick(event, headerLinkHrefs[index] ?? '/')}
                  className="block w-full py-4 text-left text-lg text-white border-b border-white/10 hover:text-[#353EEA] transition-colors duration-200 cursor-pointer touch-manipulation">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto pt-6">
          <a
            href="https://wa.me/77014673649"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 border border-[#353EEA] text-center text-white rounded-full hover:bg-[#353EEA] transition-colors duration-200 text-base font-medium touch-manipulation">
            {requestCta}
          </a>
        </div>
      </div>
    </>
  );
}
