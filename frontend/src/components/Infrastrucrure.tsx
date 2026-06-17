import Image from 'next/image';
import { type Locale } from '@/lib/eltex-alatau';

type Item = {
  img: string;
  title: string;
  text: string;
  value?: string;
  className?: string;
};

type InfrastructureContent = {
  title: string;
  accentTitle: string;
  description: string;
  backgroundAlt: string;
  imageAlt: string;
  moreLabel: string;
  items: Item[];
};

type InfrastructureProps = {
  locale: Locale;
};

const infrastructureGridClassName = [
  'grid gap-3 p-3 bg-black',
  'grid-cols-1 auto-rows-[260px]',
  'sm:grid-cols-2 sm:auto-rows-[280px]',
  'xl:grid-cols-12 xl:grid-rows-[220px_220px_260px] xl:auto-rows-auto',
  'px-4 sm:px-10 lg:px-36 py-12 lg:py-16',
].join(' ');

const contentByLocale: Record<Locale, InfrastructureContent> = {
  kk: {
    title: 'ӨНДІРІС',
    accentTitle: 'ИНФРАҚҰРЫЛЫМЫ',
    description:
      'ЭлтексАлатау өндірістік кешені халықаралық сапа стандарттарына сәйкес жобаланып, салынған. Өндірістің әрбір кезеңі жабдықтың сенімділігін қамтамасыз ету үшін көпдеңгейлі бақылаудан өтеді.',
    backgroundAlt: 'Инфрақұрылым фоны',
    imageAlt: 'Инфрақұрылым',
    moreLabel: 'Толығырақ',
    items: [
      {
        img: '/infra/10.jpeg',
        title: 'НАРЫҚТАҒЫ ТӘЖІРИБЕ',
        value: '12+',
        text: 'жыл жабдық өндірісі',
        className: 'sm:col-span-1 xl:col-span-4 xl:row-span-2',
      },
      {
        img: '/infra/12.jpeg',
        title: 'ӨНДІРІСТІК АЛАҢ',
        value: '«Алатау» АИП ЕЭА',
        text: 'Алматы қ., Қазақстан',
        className: 'sm:col-span-1 xl:col-span-4 xl:row-span-1',
      },
      {
        img: '/infra/9.jpg',
        title: 'МАРАПАТ',
        text: '2015 жылғы ҚР Президентінің «Алтын Сапа» сыйлығы',
        className: 'sm:col-span-2 xl:col-span-4 xl:row-span-2',
      },
      {
        img: '/infra/11.jpeg',
        title: 'САПАНЫ БАҚЫЛАУ',
        value: '3 саты',
        text: 'көпдеңгейлі тексеру жүйесі',
        className: 'sm:col-span-1 xl:col-span-4 xl:row-span-1',
      },
      {
        img: '/infra/5.webp',
        title: 'ҚАТЫСУ ЕЛДЕРІ',
        value: '3',
        text: 'Қазақстан, Өзбекстан, Қырғызстан',
        className: 'sm:col-span-1 xl:col-span-4 xl:row-span-1',
      },
      {
        img: '/infra/6.webp',
        title: 'ЖАБДЫҚТАҒЫ ОПЕРАТОРЛАР',
        value: '20+',
        text: 'Қазақстанның балама провайдерлері',
        className: 'sm:col-span-1 xl:col-span-4 xl:row-span-1',
      },
      {
        img: '/infra/7.webp',
        title: '',
        text: '',
        className: 'xl:col-span-4 xl:row-span-1',
      },
    ],
  },
  ru: {
    title: 'ИНФРАСТРУКТУРА',
    accentTitle: 'ПРОИЗВОДСТВА',
    description:
      'Производственный комплекс ЭлтексАлатау спроектирован и построен в соответствии с международными стандартами качества. Каждый этап производства проходит многоуровневый контроль для обеспечения надёжности оборудования.',
    backgroundAlt: 'Фон инфраструктуры',
    imageAlt: 'Инфраструктура',
    moreLabel: 'Подробнее',
    items: [
      {
        img: '/infra/10.jpeg',
        title: '',
        value: 'ФИНАЛЬНАЯ СБОРКА',
        text: '',
        className: 'sm:col-span-1 xl:col-span-4 xl:row-span-2',
      },
      {
        img: '/infra/12.jpeg',
        title: 'ПРОИЗВОДСТВЕННАЯ ПЛОЩАДКА',
        value: 'СЭЗ ПИТ «Алатау»',
        text: 'г. Алматы, Казахстан',
        className: 'sm:col-span-1 xl:col-span-4 xl:row-span-1',
      },
      {
        img: '/infra/9.jpg',
        title: 'ОПЫТ НА РЫНКЕ',
        value: '12+',
        text: 'лет производства оборудования',
        className: 'sm:col-span-2 xl:col-span-4 xl:row-span-2',
      },
      {
        img: '/infra/11.jpeg',
        title: '',
        value: 'МОНТАЖ ПЛАТ',
        text: 'SMD и ТНТ',
        className: 'sm:col-span-1 xl:col-span-4 xl:row-span-1',
      },
      {
        img: '/infra/5.webp',
        title: 'КОНТРОЛЬ КАЧЕСТВА',
        value: '3 ступени',
        text: 'многоуровневая система проверки',
        className: 'sm:col-span-1 xl:col-span-4 xl:row-span-1',
      },
      {
        img: '/infra/6.webp',
        title: 'ОПЕРАТОРЫ НА ОБОРУДОВАНИИ',
        value: '20+',
        text: 'альтернативных провайдеров Казахстана',
        className: 'sm:col-span-1 xl:col-span-4 xl:row-span-1',
      },
      {
        img: '/infra/7.webp',
        title: '',
        text: '',
        className: 'xl:col-span-4 xl:row-span-1',
      },
    ],
  },
  en: {
    title: 'PRODUCTION',
    accentTitle: 'INFRASTRUCTURE',
    description:
      'The EltexAlatau production facility is designed and built in line with international quality standards. Every stage of manufacturing undergoes multi-level quality control to ensure equipment reliability.',
    backgroundAlt: 'Infrastructure background',
    imageAlt: 'Infrastructure',
    moreLabel: 'Learn more',
    items: [
      {
        img: '/infra/10.jpeg',
        title: 'MARKET EXPERIENCE',
        value: '12+',
        text: 'years of equipment manufacturing',
        className: 'sm:col-span-1 xl:col-span-4 xl:row-span-2',
      },
      {
        img: '/infra/12.jpeg',
        title: 'PRODUCTION FACILITY',
        value: 'SEZ PIT «Alatau»',
        text: 'Almaty, Kazakhstan',
        className: 'sm:col-span-1 xl:col-span-4 xl:row-span-1',
      },
      {
        img: '/infra/9.jpg',
        title: 'AWARD',
        text: 'President of Kazakhstan «Altyn Sapa» Award 2015',
        className: 'sm:col-span-2 xl:col-span-4 xl:row-span-2',
      },
      {
        img: '/infra/11.jpeg',
        title: 'QUALITY CONTROL',
        value: '3 stages',
        text: 'multi-level verification system',
        className: 'sm:col-span-1 xl:col-span-4 xl:row-span-1',
      },
      {
        img: '/infra/5.webp',
        title: 'COUNTRIES OF PRESENCE',
        value: '3',
        text: 'Kazakhstan, Uzbekistan, Kyrgyzstan',
        className: 'sm:col-span-1 xl:col-span-4 xl:row-span-1',
      },
      {
        img: '/infra/6.webp',
        title: 'OPERATORS ON EQUIPMENT',
        value: '20+',
        text: 'alternative providers in Kazakhstan',
        className: 'sm:col-span-1 xl:col-span-4 xl:row-span-1',
      },
      {
        img: '/infra/7.webp',
        title: '',
        text: '',
        className: 'xl:col-span-4 xl:row-span-1',
      },
    ],
  },
};

export default function Infrastructure({ locale }: InfrastructureProps) {
  const content = contentByLocale[locale];

  return (
    <section>
      <div className="relative px-4 sm:px-10 lg:px-36 py-12 lg:py-16 bg-black overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-48 sm:h-64 lg:top-0 lg:right-0 lg:left-auto lg:w-1/2 lg:h-full">
          <Image
            src="/infra/bg.webp"
            alt={content.backgroundAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-transparent lg:bg-gradient-to-r lg:from-black lg:via-black/40 lg:to-transparent" />
        </div>

        <div className="flex flex-col gap-8 [@media(min-width:1400px)]:flex-row [@media(min-width:1400px)]:gap-16 md:pb-10">
          <div className="[@media(min-width:1400px)]:max-w-md flex flex-col gap-4 lg:gap-8 shrink-0">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-wide flex flex-col gap-1 lg:gap-2 z-1">
              {content.title}
              <span className="text-[#353EEA]">{content.accentTitle}</span>
            </h3>
            <p className="text-gray-300 text-sm sm:text-base max-w-lg z-1">{content.description}</p>
          </div>
        </div>
      </div>

      <ul className={infrastructureGridClassName}>
        {content.items.map((item) => (
          <li
            key={item.img}
            className={`group relative overflow-hidden rounded-lg bg-zinc-900 ${item.className ?? ''}`}>
            <Image
              src={item.img}
              alt={item.title || content.imageAlt}
              fill
              sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/5" />

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 pr-16">
              <div className="min-w-0 text-white">
                {item.title && (
                  <h4 className="text-sm font-semibold tracking-wide sm:text-base uppercase">
                    {item.title}
                  </h4>
                )}
                {item.value && (
                  <p className="mt-1 text-2xl font-light leading-none tracking-wide sm:text-3xl lg:text-4xl">
                    {item.value}
                  </p>
                )}
                {item.text && (
                  <p className="mt-2 max-w-[20rem] text-xs leading-snug text-gray-300 sm:text-sm">
                    {item.text}
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
