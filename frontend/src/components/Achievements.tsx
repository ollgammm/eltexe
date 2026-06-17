import { type Locale } from '@/lib/eltex-alatau';

type AchievementStat = {
  value: string;
  title: string;
  subtitle: string;
};

type AchievementsContent = {
  title: string;
  description: string;
  stats: AchievementStat[];
};

type AchievementsProps = {
  locale: Locale;
};

const contentByLocale: Record<Locale, AchievementsContent> = {
  kk: {
    title: 'Біздің жетістіктеріміз',
    description: 'Сандармен\nдәлелденген\nсенімділік.',
    stats: [
      {
        value: '12+',
        title: 'жыл нарықта',
        subtitle: 'Телекоммуникациялық жабдық өндірісі',
      },
      {
        value: '20+',
        title: 'Қазақстан провайдерлері',
        subtitle: 'Біздің жабдықта жұмыс істейді',
      },
      {
        value: '3',
        title: 'қатысу елі',
        subtitle: 'Қазақстан, Өзбекстан, Қырғызстан',
      },
    ],
  },
  ru: {
    title: 'Наши достижения',
    description: 'Надежность,\nподтвержденная\nцифрами.',
    stats: [
      {
        value: '12+',
        title: 'лет на рынке',
        subtitle: 'Производство телекоммуникационного оборудования',
      },
      {
        value: '20+',
        title: 'провайдеров Казахстана',
        subtitle: 'Работают на нашем оборудовании',
      },
      {
        value: '3',
        title: 'страны присутствия',
        subtitle: 'Казахстан, Узбекистан, Кыргызстан',
      },
    ],
  },
  en: {
    title: 'Our achievements',
    description: 'Reliability\nconfirmed\nby figures.',
    stats: [
      {
        value: '12+',
        title: 'years on the market',
        subtitle: 'Telecommunications equipment manufacturing',
      },
      {
        value: '20+',
        title: 'providers in Kazakhstan',
        subtitle: 'Operating on our equipment',
      },
      {
        value: '3',
        title: 'countries of presence',
        subtitle: 'Kazakhstan, Uzbekistan, Kyrgyzstan',
      },
    ],
  },
};

export default function Achievements({ locale }: AchievementsProps) {
  const content = contentByLocale[locale];

  return (
    <section id="companies" className=" px-4 sm:px-10 lg:px-36 py-12 lg:py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 items-start">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-black  text-3xl font-bold tracking-wider uppercase">
              {content.title}
            </h2>
          </div>
          <div className="w-[40%] h-[2px] bg-[#353EEA] mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
            {content.description}
          </p>
        </div>
        {content.stats.map((stat, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-4xl lg:text-5xl font-bold text-[#353EEA] mb-4">{stat.value}</span>
            <span className="text-sm font-semibold text-black mb-1">{stat.title}</span>
            <span className="text-xs text-gray-500">{stat.subtitle}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
