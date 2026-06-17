import Image from 'next/image';
import Link from 'next/link';
import { createTranslator, type Locale, type NavigationLink } from '@/lib/eltex-alatau';

type FooterProps = {
  locale: Locale;
};

type FooterContent = {
  description: string;
  navigationTitle: string;
  contactsTitle: string;
  address: string;
  copyright: string;
  privacyPolicy: string;
  userAgreement: string;
};

const footerLinkHrefs = ['#about', '#advantages', '#services', '#contacts'];

const contentByLocale: Record<Locale, FooterContent> = {
  kk: {
    description: 'Сіздің АТ-инфрақұрылымыңыз біздің бақылауымызда',
    navigationTitle: 'Навигация',
    contactsTitle: 'Байланыс',
    address: 'Алматы қ., Алатау ш/а, Гумилев көш., 16',
    copyright: '© 2026 ЖШС "ЭлтексАлатау". Барлық құқықтар қорғалған.',
    privacyPolicy: 'Құпиялылық саясаты',
    userAgreement: 'Пайдаланушы келісімі',
  },
  ru: {
    description: 'Ваша ИТ-инфраструктура под нашим контролем',
    navigationTitle: 'Навигация',
    contactsTitle: 'Контакты',
    address: 'г.Алматы, мкр. Алатау, ул. Гумилёва, 16',
    copyright: '© 2026 ТОО "ЭлтексАлатау". Все права защищены.',
    privacyPolicy: 'Политика конфиденциальности',
    userAgreement: 'Пользовательское соглашение',
  },
  en: {
    description: 'Your IT infrastructure under our control',
    navigationTitle: 'Navigation',
    contactsTitle: 'Contacts',
    address: 'Almaty, Alatau district, 16 Gumilev St.',
    copyright: '© 2026 EltexAlatau LLP. All rights reserved.',
    privacyPolicy: 'Privacy policy',
    userAgreement: 'User agreement',
  },
};

export default function Footer({ locale }: FooterProps) {
  const t = createTranslator(locale);
  const navLinks = t('header.navLinks') as NavigationLink[];
  const content = contentByLocale[locale];

  return (
    <footer className="bg-white">
      <div className="grid grid-cols-1 items-start gap-8 px-4 py-12 sm:px-10 md:grid-cols-3 md:gap-12 lg:px-36 lg:py-16">
        <div>
          <Link href="/" className="flex items-center gap-1 shrink-0 cursor-pointer">
            <Image src="/logo.png" width={170} height={44} alt="logo" />
          </Link>
          <p
            className="text-black sm:text-base lg:text-lg leading-tight mt-4 max-w-[250px]"
            style={{
              fontSize: 14,
            }}>
            {content.description}
          </p>
        </div>
        <div>
          <nav className="flex flex-col gap-3">
            <h4 className="text-base font-bold tracking-widest text-gray-500 uppercase">
              {content.navigationTitle}
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link, index) => (
                <li key={link.label}>
                  <Link
                    style={{
                      fontSize: 15,
                    }}
                    href={footerLinkHrefs[index] ?? '/'}
                    className=" text-black transition-colors hover:text-[#353EEA] sm:text-base lg:text-lg">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div>
          <div className="flex flex-col gap-3">
            <h4 className="text-base font-bold tracking-widest text-gray-500 uppercase">
              {content.contactsTitle}
            </h4>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <span className="text-sm  text-black">{content.address}</span>
              </div>

              <div className="flex flex-col">
                <a
                  href="tel:+79037181331"
                  className="text-sm  text-black transition-colors hover:text-[#353EEA]">
                  +7 701 467 3649
                </a>
              </div>

              <div className="flex flex-col">
                <a
                  href="mailto:sergey.arutunov@htl.kz"
                  className="text-sm  text-black underline transition-colors hover:text-[#353EEA]">
                  post@eltexalatau.kz
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#111214] px-4 py-4 sm:px-10 lg:px-36">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 text-[11px] leading-none text-white/45">
            <p>{content.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
