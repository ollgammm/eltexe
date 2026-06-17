import Image from 'next/image';
import { createTranslator, type AdvantageItem, type AdvantageStat, type Locale } from '@/lib/eltex';

type AdvantagesProps = {
  locale: Locale;
};

export default function Advantages({ locale }: AdvantagesProps) {
  const t = createTranslator(locale);
  const badge = t('advantages.badge');
  const title = t('advantages.title');
  const accentTitle = t('advantages.accentTitle');
  const description = t('advantages.description');
  const items = t('advantages.items') as AdvantageItem[];
  const stats = t('advantages.stats') as AdvantageStat[];

  return (
    <section
      id="advantages"
      className="relative px-4 sm:px-10 lg:px-36 py-12 lg:py-16 bg-black overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-48 sm:h-64 lg:top-0 lg:right-0 lg:left-auto lg:w-1/2 lg:h-full">
        <Image
          src="/bg-adv.webp"
          alt="bg-adv"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-transparent lg:bg-gradient-to-r lg:from-black lg:via-black/40 lg:to-transparent" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="rounded-full bg-[#353EEA] w-2 h-2 shrink-0" />
          <h2 className="text-sm sm:text-lg font-semibold text-white tracking-widest">{badge}</h2>
        </div>

        <div className="flex flex-col gap-8 [@media(min-width:1400px)]:flex-row [@media(min-width:1400px)]:gap-16">
          <div className="[@media(min-width:1400px)]:max-w-md flex flex-col gap-4 lg:gap-8 shrink-0">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-wide flex flex-col gap-1 lg:gap-2">
              {title}
              <span className="text-[#353EEA]">{accentTitle}</span>
            </h3>
            <p className="text-gray-300 text-sm sm:text-base max-w-lg">{description}</p>
          </div>

          <div className="flex flex-col">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 border-b-2 border-[#353EEA] pb-8 lg:pb-16">
              {items.map((item, index) => (
                <li key={index} className="flex flex-col items-start gap-2 lg:gap-3">
                  <h4 className="text-base lg:text-lg font-semibold text-white">
                    {item.title.map((part, i) => (
                      <span key={i} className={part.accent ? 'text-[#353EEA]' : ''}>
                        {part.text}
                      </span>
                    ))}
                  </h4>
                  <p className="text-gray-300 text-sm">
                    {item.text.map((part, i) => (
                      <span key={i} className={part.accent ? 'text-[#353EEA]' : ''}>
                        {part.text}
                      </span>
                    ))}
                  </p>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-8 lg:mt-12 mb-12 sm:mb-14 lg:mb-0">
              {stats.map((item, index) => (
                <div key={index} className="flex flex-col items-start">
                  <h4 className="text-3xl sm:text-4xl lg:text-5xl text-[#353EEA] font-bold">
                    {item.title}
                  </h4>
                  <p className="text-gray-300 text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
