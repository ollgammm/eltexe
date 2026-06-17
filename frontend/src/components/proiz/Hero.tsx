import Image from 'next/image';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { createTranslator, type HeroItem, type Locale } from '@/lib/eltex';

type HeroProps = {
  locale: Locale;
};

export default function Hero({ locale }: HeroProps) {
  const t = createTranslator(locale);
  const description = t('hero.description');
  const cta2 = t('hero.cta2');
  const items = t('hero.items') as HeroItem[];

  return (
    <section className="relative flex items-start px-4 pt-24 pb-10 sm:px-8 sm:pt-28 sm:pb-12 md:px-16 md:pt-32 md:pb-14 lg:min-h-screen lg:items-center lg:px-36 lg:py-16">
      <Image
        src={'/hero-bg2.jpeg'}
        fill
        alt="Hero Image"
        className="object-cover"
        style={{ zIndex: -1 }}
        priority
        sizes="100vw"
        quality={75}
      />
      <div
        className="absolute inset-0"
        style={{
          zIndex: -1,
          background:
            'linear-gradient(to right, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.2) 100%)',
        }}
      />
      <div className="flex w-full flex-col gap-8 sm:gap-9 lg:gap-16">
        <div className="flex flex-col gap-4 lg:gap-6">
          <h1 className="flex flex-col text-4xl font-extrabold leading-none tracking-wider sm:text-6xl md:text-7xl lg:text-9xl lg:leading-tight">
            ELTEX <span className="text-[#353EEA] leading-[1.2] tracking-wider">ALATAU</span>
          </h1>
          <p className="max-w-sm text-sm text-white/80 sm:text-base md:max-w-lg lg:text-lg">
            {description}
          </p>
          <a
            href="https://wa.me/77014673649"
            target="_blank"
            className="mt-1 flex w-full items-center justify-center gap-1 rounded-full bg-[#353EEA] px-5 py-3 text-sm text-white sm:mt-2 sm:w-max sm:justify-start lg:mt-4 lg:px-6 lg:py-4 lg:text-base">
            {cta2} <MdOutlineKeyboardArrowRight size={24} />
          </a>
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:flex lg:gap-4">
          {items.map((item, index) => (
            <li className="flex items-center gap-3 sm:max-w-[240px] lg:max-w-xs" key={index}>
              <Image
                src={item.img}
                width={48}
                height={40}
                alt={item.title}
                className="shrink-0"
                style={{ width: 'auto' }}
              />
              <div className="flex flex-col gap-1">
                <span className="text-white font-medium text-base lg:text-xl">{item.title}</span>
                <p className="text-xs lg:text-sm text-white/80">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Image
        src={'/mouse.svg'}
        width={24}
        height={40}
        alt=""
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block"
        style={{ width: 'auto' }}
      />
    </section>
  );
}
