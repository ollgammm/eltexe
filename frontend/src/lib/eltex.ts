export type Locale = 'kk' | 'ru' | 'en' | 'uz';

export const LOCALES: Locale[] = ['kk', 'ru', 'en', 'uz'];

export const LOCALE_LABELS: Record<Locale, string> = {
  kk: 'KK',
  ru: 'RU',
  en: 'EN',
  uz: 'UZ',
};

export const LOCALE_NAMES: Record<Locale, string> = {
  kk: 'Қазақша',
  ru: 'Русский',
  en: 'English',
  uz: 'O‘zbekcha',
};

export const DEFAULT_LOCALE: Locale = 'uz';

export const PRESENTATION_FILES: Record<Locale, string> = {
  ru: '/presentations/oem-ru.pdf',
  kk: '/presentations/oem-kk.pdf',
  en: '/presentations/oem-en.pdf',
  uz: '/presentations/oem-uz.pdf',
};

export type NavigationLink = { label: string };

export type HeroItem = { title: string; text: string; img: string };
export type AboutItem = { title: string; text: string; icon: string };
export type TextPart = { text: string; accent: boolean };
export type AdvantageItem = { title: TextPart[]; text: TextPart[] };
export type AdvantageStat = { title: string; text: string };

type Dictionary = {
  metadata: {
    title: string;
    description: string;
  };
  proiz: {
    badge: string;
    link: string;
  };
  header: {
    navLinks: NavigationLink[];
    requestCta: string;
    menuLabel: string;
    closeLabel: string;
    switchLocaleLabel: string;
  };
  hero: {
    description: string;
    cta: string;
    cta2: string;
    items: HeroItem[];
  };
  about: {
    badge: string;
    title: string;
    accentTitle: string;
    description: string;
    cta: string;
    items: AboutItem[];
    btn: string;
  };
  advantages: {
    badge: string;
    title: string;
    accentTitle: string;
    description: string;
    items: AdvantageItem[];
    stats: AdvantageStat[];
  };
};

type TranslationMap = {
  'metadata.title': string;
  'metadata.description': string;
  'proiz.badge': string;
  'proiz.link': string;
  'header.navLinks': NavigationLink[];
  'header.requestCta': string;
  'header.menuLabel': string;
  'header.closeLabel': string;
  'header.switchLocaleLabel': string;
  'hero.description': string;
  'about.btn': string;
  'hero.cta': string;
  'hero.cta2': string;
  'hero.items': HeroItem[];
  'about.badge': string;
  'about.title': string;
  'about.accentTitle': string;
  'about.description': string;
  'about.cta': string;
  'about.items': AboutItem[];
  'advantages.badge': string;
  'advantages.title': string;
  'advantages.accentTitle': string;
  'advantages.description': string;
  'advantages.items': AdvantageItem[];
  'advantages.stats': AdvantageStat[];
};

const dictionaries: Record<Locale, Dictionary> = {
  kk: {
    metadata: {
  title: 'Eltex',
  description:
    'Алматыдағы қазақстандық телекоммуникациялық жабдық өндірушісі. Келісімшарттық өндіріс (локализация) және платаларды SMD-монтаждау қызметтері. Компания 2012 жылы құрылған.',
},
proiz: {
  badge: 'ӨНДІРІС',
  link: 'Перейти',
},
header: {
  navLinks: [
    { label: 'Компания туралы' },
    { label: 'Артықшылықтар' },
    { label: 'Қызметтер' },
    { label: 'Байланыс' },
    { label: 'Өндіріс' },
  ],
  requestCta: 'Өтінім қалдыру',
  menuLabel: 'Мәзір',
  closeLabel: 'Жабу',
  switchLocaleLabel: 'Тілді ауыстыру',
},
hero: {
  description:
    'Eltex Alatau — Алматыдағы телекоммуникациялық жабдық өндірушісі. Келісімшарттық өндіріс (локализация) және платаларды SMD және THT монтаждау қызметтері. Компания 2012 жылы құрылған.',
  cta: 'Жобаны тіркеу',
  cta2: 'Плата монтажының құнын бағалау',
  items: [
    {
      title: 'Алматыдағы өндіріс',
      text: 'Алматы қ., Алатау шағынауданы, Гумилёв көшесі, 16 b2b@smartalatau.kz',
      img: '/hero/hero-icon1.webp',
    },
    {
      title: 'Компанияның ресурстары мен мүмкіндіктері:',
      text: 'Платаларды SMD және THT монтаждау, Тестілеу, Платаны пысықтау, Соңғы құрастыру',
      img: '/hero/hero-icon2.webp',
    },
  ],
},
about: {
  badge: 'КОМПАНИЯ ТУРАЛЫ',
  title: 'ТЕЛЕКОММУНИКАЦИЯЛАР',
  accentTitle: 'БИЗНЕС ҮШІН',
  description:
    'Eltex Alatau — электроника мен оператор деңгейіндегі телекоммуникациялық жабдықтың қазақстандық өндірушісі. 12 жыл жұмыс істеу барысында біздің жабдығымыз Қазақстанның, Өзбекстанның және Қырғызстанның ірі операторларының желілеріне орнатылған.',
  cta: 'Компания туралы толығырақ',
  btn: 'Таныстырылым',
  items: [
    {
      title: 'Сапаны бақылау',
      text: 'Өндіріс сапасын бақылаудың 3 сатылы жүйесі',
      icon: '/about/about1.svg',
    },
    {
      title: 'Ресми өкіл',
      text: 'Eltex зауытының Қазақстандағы жалғыз ресми серіктесі',
      icon: '/about/about2.svg',
    },
    {
      title: 'Жергілікті өндіріс',
      text: 'Алматыдағы «Алатау» инновациялық технологиялар паркі АЭА аумағындағы өндірістік кешен',
      icon: '/about/about3.svg',
    },
    {
      title: 'Мемлекеттік қолдау',
      text: '«Самұрық-Қазына» АҚ, ҚР Білім және ғылым министрлігі және басқа да мемлекеттік құрылымдармен жұмыс істейміз',
      icon: '/about/about4.svg',
    },
  ],
},
advantages: {
  badge: 'АРТЫҚШЫЛЫҚТАР',
  title: 'СТАРТАПТАРҒА. ӨНДІРУШІЛЕРГЕ.',
  accentTitle: 'ӘЗІРЛЕУШІЛЕРГЕ.',
  description:
    'Біз оператор деңгейіндегі телекоммуникациялық жабдық шығарамыз, сондай-ақ өзге IT-құрылғыларға арналған платаларды SMD және THT монтаждау қызметтерін көрсетеміз.',
  items: [
    {
      title: [
        { text: 'Өз ', accent: false },
        { text: 'өндірісіміз', accent: false },
      ],
      text: [
        { text: 'Толық өндірістік цикл ', accent: false },
        { text: 'Алматы қ., Алатау шағынауданы, ', accent: false },
        { text: 'Гумилёв көшесі, 16', accent: true },
      ],
    },
    {
      title: [
        { text: 'Шығарылатын ', accent: false },
        { text: 'өнім', accent: false },
      ],
      text: [
        { text: 'Eltex оператор класындағы жабдығы ', accent: false },
        { text: 'Өнеркәсіптік және ауыл шаруашылығы электроникасы. ', accent: true },
        { text: 'Премиум-сегменттің киілетін электроникасы', accent: false },
      ],
    },
    {
      title: [
        { text: 'Сапаны бақылау   ', accent: false },
        { text: 'барлық кезеңдерде', accent: false },
      ],
      text: [
        { text: '3 сатылы жүйе ', accent: false },
        { text: 'әрбір құрылғының сапасын бақылау', accent: true },
      ],
    },
    {
      title: [{ text: 'Қазақстандағы локализация ', accent: false }],
      text: [
        { text: 'Жабдықты өндіру және қолдау ', accent: false },
        { text: 'елдің өзінде — жылдам әрі сенімді ', accent: false },
        { text: '', accent: false },
      ],
    },
  ],
  stats: [
    { title: '15', text: 'жыл нарықта' },
    { title: '1млн+', text: 'өндірілген өнім' },
    { title: '50+', text: 'номенклатура түрі' },
    { title: '70+', text: 'риза тапсырыс беруші' },
      ],
    },
  },
  ru: {
    metadata: {
      title: 'Eltex',
      description:
        'Казахстанский производитель телекоммуникационного оборудования в Алматы. Контрактное производство (локализация) и услуги SMD-монтажа плат. Компания основана в 2012 году.',
    },
    proiz: {
      badge: 'ПРОИЗВОДСТВО',
      link: 'Перейти',
    },
    header: {
      navLinks: [
        { label: 'О компании' },
        { label: 'Преимущества' },
        { label: 'Услуги' },
        { label: 'Контакты' },
        { label: 'Производство' },
      ],
      requestCta: 'Оставить заявку',
      menuLabel: 'Меню',
      closeLabel: 'Закрыть',
      switchLocaleLabel: 'Сменить язык',
    },
    hero: {
      description:
        'ЭлтексАлатау - производитель телекоммуникационного оборудования в Алматы. Услуги контрактного производства (локализация) и SMD - ТНТ монтаж плат. Компания основана в 2012 году.',
      cta: 'Регистрация проекта --- это стр произв',
      cta2: 'Оценить стоимость монтажа платы.',
      items: [
        {
          title: 'Производство в Алматы',
          text: 'г. Алматы, мкр. Алатау, ул. Гумилёва, 16 b2b@smartalatau.kz',
          img: '/hero/hero-icon1.webp',
        },
        {
          title: 'Ресурсы и возможности компании:',
          text: 'SMD и ТНТ - монтаж плат, Тестирование, Финальная сборка',
          img: '/hero/hero-icon2.webp',
        },
      ],
    },
    about: {
      badge: 'О КОМПАНИИ',
      title: 'ТЕЛЕКОММУНИКАЦИИ ДЛЯ',
      accentTitle: 'БИЗНЕСА',
      description:
        'ЭлтексАлатау — казахстанский производитель электроники и телекоммуникационного оборудования операторского уровня. За 12 лет работы наше оборудование установлено на сетях крупнейших операторов Казахстана, Узбекистана и Кыргызстана.',
      cta: 'Подробнее о компании',
      btn: 'Презентация',
      items: [
        {
          title: 'Контроль качества',
          text: '3-х ступенчатая система контроля качества производства',
          icon: '/about/about1.svg',
        },
        {
          title: 'Официальный представитель',
          text: 'Единственный официальный партнёр завода Eltex в Казахстане',
          icon: '/about/about2.svg',
        },
        {
          title: 'Локальное производство',
          text: 'Производственный комплекс на территории СЭЗ ПИТ «Алатау» в Алматы',
          icon: '/about/about3.svg',
        },
        {
          title: 'Господдержка',
          text: 'Работаем с АО «Самрук-Қазына», МОН РК и другими госструктурами',
          icon: '/about/about4.svg',
        },
      ],
    },
    advantages: {
      badge: 'ПРЕИМУЩЕСТВА',
      title: 'СТАРТАПАМ. ПРОИЗВОДИТЕЛЯМ.',
      accentTitle: 'РАЗРАБОТЧИКАМ.',
      description:
        'Мы производим телекоммуникационное оборудование операторского уровня, оказываем услуги по SMD и ТНТ монтажу плат для иных IT устройств.',
      items: [
        {
          title: [
            { text: 'Собственное ', accent: false },
            { text: 'производство', accent: false },
          ],
          text: [
            { text: 'Полный цикл производства ', accent: false },
            { text: 'г. Алматы, мкр Алатау, ', accent: false },
            { text: 'ул. Гумилёва, 16', accent: true },
          ],
        },
        {
          title: [
            { text: 'Выпускаемая ', accent: false },
            { text: 'продукция', accent: false },
          ],
          text: [
            { text: 'Оборудование операторского класса Eltex ', accent: false },
            { text: 'Промышленная и сельскохозяйственная электроника. ', accent: true },
            { text: 'Носимая электроника премиум-сегмента', accent: false },
          ],
        },
        {
          title: [
            { text: 'Контроль качества   ', accent: false },
            { text: 'на всех этапах', accent: false },
          ],
          text: [
            { text: '3-х ступенчатая система на  ', accent: false },
            { text: 'контроля качества каждого устройства', accent: true },
          ],
        },
        {
          title: [{ text: 'Локализация в Казахстане ', accent: true }],
          text: [
            { text: 'Производство и поддержка оборудования ', accent: false },
            { text: 'прямо в стране — быстро и надёжно ', accent: false },
            { text: '', accent: false },
          ],
        },
      ],
      stats: [
        { title: '15', text: 'лет на рынке' },
        { title: '1млн+', text: 'произведенной продукции' },
        { title: '50+', text: 'видов номенклатуры' },
        { title: '70+', text: 'довольных заказчиков' },
      ],
    },
  },
  en: {
    metadata: {
  title: 'Eltex',
  description:
    'A Kazakhstani manufacturer of telecommunications equipment in Almaty. Contract manufacturing (localization) and SMD board assembly services. The company was founded in 2012.',
},
proiz: {
  badge: 'PRODUCTION',
  link: 'Перейти',
},
header: {
  navLinks: [
    { label: 'About us' },
    { label: 'Advantages' },
    { label: 'Services' },
    { label: 'Contacts' },
    { label: 'Production' },
  ],
  requestCta: 'Submit a request',
  menuLabel: 'Menu',
  closeLabel: 'Close',
  switchLocaleLabel: 'Change language',
},
hero: {
  description:
    'Eltex Alatau is a manufacturer of telecommunications equipment in Almaty. Contract manufacturing (localization) services and SMD and THT board assembly. The company was founded in 2012.',
  cta: 'Project registration',
  cta2: 'Estimate board assembly cost',
  items: [
    {
      title: 'Production in Almaty',
      text: 'Almaty, Alatau microdistrict, 16 Gumilyov Street b2b@smartalatau.kz',
      img: '/hero/hero-icon1.webp',
    },
    {
      title: 'Company resources and capabilities:',
      text: 'SMD and THT board assembly, Testing, Board modification, Final assembly',
      img: '/hero/hero-icon2.webp',
    },
  ],
},
about: {
  badge: 'ABOUT THE COMPANY',
  title: 'TELECOMMUNICATIONS FOR',
  accentTitle: 'BUSINESS',
  description:
    'Eltex Alatau is a Kazakhstani manufacturer of electronics and carrier-grade telecommunications equipment. Over 12 years of operation, our equipment has been installed on the networks of the largest operators in Kazakhstan, Uzbekistan and Kyrgyzstan.',
  cta: 'More about the company',
  btn: 'Presentation',
  items: [
    {
      title: 'Quality control',
      text: 'Three-stage production quality control system',
      icon: '/about/about1.svg',
    },
    {
      title: 'Official representative',
      text: 'The only official partner of the Eltex plant in Kazakhstan',
      icon: '/about/about2.svg',
    },
    {
      title: 'Local production',
      text: 'Production complex in the Alatau Innovation Technologies Park SEZ in Almaty',
      icon: '/about/about3.svg',
    },
    {
      title: 'State support',
      text: 'We work with Samruk-Kazyna JSC, the Ministry of Education and Science of Kazakhstan and other government agencies',
      icon: '/about/about4.svg',
    },
  ],
},
advantages: {
  badge: 'ADVANTAGES',
  title: 'STARTUPS. MANUFACTURERS.',
  accentTitle: 'DEVELOPERS.',
  description:
    'We manufacture carrier-grade telecommunications equipment and provide SMD and THT board assembly services for other IT devices.',
  items: [
    {
      title: [
        { text: 'In-house ', accent: false },
        { text: 'production', accent: false },
      ],
      text: [
        { text: 'Full production cycle ', accent: false },
        { text: 'Almaty, Alatau microdistrict, ', accent: false },
        { text: '16 Gumilyov Street', accent: true },
      ],
    },
    {
      title: [
        { text: 'Manufactured ', accent: false },
        { text: 'products', accent: false },
      ],
      text: [
        { text: 'Eltex carrier-class equipment ', accent: false },
        { text: 'Industrial and agricultural electronics. ', accent: true },
        { text: 'Premium-segment wearable electronics', accent: false },
      ],
    },
    {
      title: [
        { text: 'Quality control   ', accent: false },
        { text: 'at every stage', accent: false },
      ],
      text: [
        { text: '3-stage system of ', accent: false },
        { text: 'quality control for every device', accent: true },
      ],
    },
    {
      title: [{ text: 'Localization in Kazakhstan ', accent: false }],
      text: [
        { text: 'Equipment production and support ', accent: false },
        { text: 'right in the country — fast and reliable ', accent: false },
        { text: '', accent: false },
      ],
    },
  ],
  stats: [
    { title: '15', text: 'years on the market' },
    { title: '1M+', text: 'products manufactured' },
    { title: '50+', text: 'product types' },
    { title: '70+', text: 'satisfied customers' },
      ],
    },
  },
  uz: {
    metadata: {
  title: 'Eltex',
  description:
    'Almatidagi qozogʻistonlik telekommunikatsiya uskunalari ishlab chiqaruvchisi. Shartnoma asosidagi ishlab chiqarish (lokalizatsiya) va platalarni SMD-montaj qilish xizmatlari. Kompaniya 2012-yilda tashkil etilgan.',
},
proiz: {
  badge: 'ISHLAB CHIQARISH',
  link: 'Перейти',
},
header: {
  navLinks: [
    { label: 'Kompaniya haqida' },
    { label: 'Afzalliklar' },
    { label: 'Xizmatlar' },
    { label: 'Aloqa' },
    { label: 'Ishlab chiqarish' },
  ],
  requestCta: 'Ariza qoldirish',
  menuLabel: 'Menyu',
  closeLabel: 'Yopish',
  switchLocaleLabel: 'Tilni oʻzgartirish',
},
hero: {
  description:
    'Eltex Alatau — Almatidagi telekommunikatsiya uskunalari ishlab chiqaruvchisi. Shartnoma asosidagi ishlab chiqarish (lokalizatsiya) xizmatlari hamda platalarni SMD va THT montaj qilish. Kompaniya 2012-yilda tashkil etilgan.',
  cta: 'Loyihani roʻyxatdan oʻtkazish',
  cta2: 'Plata montaji narxini baholash',
  items: [
    {
      title: 'Almatidagi ishlab chiqarish',
      text: 'Almati sh., Alatau mkr., Gumilyov koʻchasi, 16 b2b@smartalatau.kz',
      img: '/hero/hero-icon1.webp',
    },
    {
      title: 'Kompaniyaning resurslari va imkoniyatlari:',
      text: 'Platalarni SMD va THT montaj qilish, Sinovdan oʻtkazish, Platani takomillashtirish, Yakuniy yigʻish',
      img: '/hero/hero-icon2.webp',
    },
  ],
},
about: {
  badge: 'KOMPANIYA HAQIDA',
  title: 'TELEKOMMUNIKATSIYALAR',
  accentTitle: 'BIZNES UCHUN',
  description:
    'Eltex Alatau — elektronika va operator darajasidagi telekommunikatsiya uskunalarining qozogʻistonlik ishlab chiqaruvchisi. 12 yillik faoliyat davomida bizning uskunalarimiz Qozogʻiston, Oʻzbekiston va Qirgʻizistonning yirik operatorlari tarmoqlariga oʻrnatilgan.',
  cta: 'Kompaniya haqida batafsil',
  btn: 'Taqdimot',
  items: [
    {
      title: 'Sifat nazorati',
      text: 'Ishlab chiqarish sifatini nazorat qilishning 3 bosqichli tizimi',
      icon: '/about/about1.svg',
    },
    {
      title: 'Rasmiy vakil',
      text: 'Eltex zavodining Qozogʻistondagi yagona rasmiy hamkori',
      icon: '/about/about2.svg',
    },
    {
      title: 'Mahalliy ishlab chiqarish',
      text: 'Almatidagi «Alatau» innovatsion texnologiyalar parki MIZ hududidagi ishlab chiqarish majmuasi',
      icon: '/about/about3.svg',
    },
    {
      title: 'Davlat qoʻllab-quvvatlovi',
      text: '«Samruk-Qazyna» AJ, Qozogʻiston Respublikasi Taʼlim va fan vazirligi hamda boshqa davlat tuzilmalari bilan ishlaymiz',
      icon: '/about/about4.svg',
    },
  ],
},
advantages: {
  badge: 'AFZALLIKLAR',
  title: 'STARTAPLAR UCHUN. ISHLAB CHIQARUVCHILAR UCHUN.',
  accentTitle: 'ISHLAB CHIQUVCHILAR UCHUN.',
  description:
    'Biz operator darajasidagi telekommunikatsiya uskunalarini ishlab chiqaramiz, shuningdek, boshqa IT-qurilmalar uchun platalarni SMD va THT montaj qilish xizmatlarini koʻrsatamiz.',
  items: [
    {
      title: [
        { text: 'Oʻz ', accent: false },
        { text: 'ishlab chiqarishimiz', accent: false },
      ],
      text: [
        { text: 'Toʻliq ishlab chiqarish sikli ', accent: false },
        { text: 'Almati sh., Alatau mkr., ', accent: false },
        { text: 'Gumilyov koʻchasi, 16', accent: true },
      ],
    },
    {
      title: [
        { text: 'Ishlab chiqariladigan ', accent: false },
        { text: 'mahsulot', accent: false },
      ],
      text: [
        { text: 'Eltex operator sinfidagi uskunalari ', accent: false },
        { text: 'Sanoat va qishloq xoʻjaligi elektronikasi. ', accent: true },
        { text: 'Premium segmentdagi kiyiladigan elektronika', accent: false },
      ],
    },
    {
      title: [
        { text: 'Sifat nazorati   ', accent: false },
        { text: 'barcha bosqichlarda', accent: false },
      ],
      text: [
        { text: '3 bosqichli tizim ', accent: false },
        { text: 'har bir qurilma sifatini nazorat qilish', accent: true },
      ],
    },
    {
      title: [{ text: 'Qozogʻistondagi lokalizatsiya ', accent: false }],
      text: [
        { text: 'Uskunalarni ishlab chiqarish va qoʻllab-quvvatlash ', accent: false },
        { text: 'mamlakatning oʻzida — tez va ishonchli ', accent: false },
        { text: '', accent: false },
      ],
    },
  ],
  stats: [
    { title: '15', text: 'yil bozorda' },
    { title: '1mln+', text: 'ishlab chiqarilgan mahsulot' },
    { title: '50+', text: 'nomenklatura turlari' },
    { title: '70+', text: 'mamnun buyurtmachilar' },
      ],
    },
  },
};

function getTranslationValue<Key extends keyof TranslationMap>(
  dictionary: Dictionary,
  key: Key,
): TranslationMap[Key] {
  return key.split('.').reduce<unknown>((value, segment) => {
    if (!value || typeof value !== 'object' || !(segment in value)) {
      throw new Error(`Missing translation for key "${key}"`);
    }

    return (value as Record<string, unknown>)[segment];
  }, dictionary) as TranslationMap[Key];
}

export function createTranslator(locale: Locale = DEFAULT_LOCALE) {
  const dictionary = dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];

  return function t<Key extends keyof TranslationMap>(key: Key): TranslationMap[Key] {
    return getTranslationValue(dictionary, key);
  };
}
