import Image from 'next/image';
import Link from 'next/link';
import { createTranslator, type Locale, type NavigationLink } from '@/lib/eltex';

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
    address: 'Ташкент қ., Юнусабад ауданы, Ифтихор көшесі, 1Б',
    copyright: '© 2026 ЖШС "SMART ALATAU (СМАРТ АЛАТАУ)". Барлық құқықтар қорғалған.',
    privacyPolicy: 'Құпиялылық саясаты',
    userAgreement: 'Пайдаланушы келісімі',
  },
  ru: {
    description: 'Ваша ИТ-инфраструктура под нашим контролем',
    navigationTitle: 'Навигация',
    contactsTitle: 'Контакты',
    address: 'г.Ташкент, Юнусабадский район, ул.Ифтихор 1Б',
    copyright: '© 2026 ТОО "SMART ALATAU (СМАРТ АЛАТАУ)". Все права защищены.',
    privacyPolicy: 'Политика конфиденциальности',
    userAgreement: 'Пользовательское соглашение',
  },
  en: {
    description: 'Your IT infrastructure under our control',
    navigationTitle: 'Navigation',
    contactsTitle: 'Contacts',
    address: '1B Iftikhor Street, Yunusabad District, Tashkent',
    copyright: '© 2026 "SMART ALATAU (СМАРТ АЛАТАУ)" LLP. All rights reserved.',
    privacyPolicy: 'Privacy policy',
    userAgreement: 'User agreement',
  },
    uz: {
    description: 'Sizning IT-infratuzilmangiz bizning nazoratimizda',
    navigationTitle: 'Navigatsiya',
    contactsTitle: 'Kontaktlar',
    address: 'Toshkent sh., Yunusobod tumani, Iftixor koʻchasi, 1B',
    copyright: '© 2026 "SMART ALATAU (СМАРТ АЛАТАУ)" MChJ. Barcha huquqlar himoyalangan.',
    privacyPolicy: 'Maxfiylik siyosati',
    userAgreement: 'Foydalanuvchi shartnomasi',
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
                  href="tel:+77014673649"
                  className="text-sm  text-black transition-colors hover:text-[#353EEA]">
                  +7 701 467 3649, 
                  +998 55 502 55 55
                </a>
              </div>

              <div className="flex flex-col">
                <a
                  href="mailto:b2b@smartalatau.kz"
                  className="text-sm  text-black underline transition-colors hover:text-[#353EEA]">
                  b2b@smartalatau.kz
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
