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

export const DEFAULT_LOCALE: Locale = 'ru';

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
        'Eltex Alatau — Алматыдағы қазақстандық телекоммуникациялық жабдық өндірушісі. Келісімшарттық өндіріс (локализация) және баспа платаларын SMD-монтаждау қызметтері. Компания 2012 жылы құрылған.',
    },
    proiz: {
      badge: 'ӨНДІРІС',
      link: 'Бару',
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
        'Сіздің IT-инфрақұрылымыңыз біздің бақылауымызда. Техникалық қолдау (орыс, өзбек тілдері), жеткізу мерзімдері және кепілдіктен кейінгі қолдау.',
      cta: 'Жобаны тіркеу',
      cta2: 'Жобаны тіркеу ----',
      items: [
        {
          title: 'Ташкенттегі қойма',
          text: 'Өзбекстан өңірлері бойынша жеткізу',
          img: '/hero/hero-icon1.webp',
        },
        {
          title: 'Компанияның ресурстары мен мүмкіндіктері:',
          text: 'Техникалық қолдау (орыс, өзбек тілдері), жеткізу мерзімдері және кепілдіктен кейінгі қолдау',
          img: '/hero/hero-icon2.webp',
        },
      ],
    },
    about: {
      badge: 'КОМПАНИЯ ТУРАЛЫ',
      title: 'БИЗНЕСКЕ АРНАЛҒАН',
      accentTitle: 'ТЕЛЕКОММУНИКАЦИЯ',
      description:
        'EltexAlatau — операторлық деңгейдегі электроника және телекоммуникациялық жабдық өндірушісі. 12 жыл жұмыс барысында біздің жабдықтар Қазақстан, Өзбекстан және Қырғызстанның ірі операторлары желілерінде орнатылды.',
      cta: 'Компания туралы толығырақ',
      btn: 'Презентация',
      items: [
        {
          title: 'Сапаны бақылау',
          text: 'Өндірістің 3 сатылы сапаны бақылау жүйесі',
          icon: '/about/about1.svg',
        },
        {
          title: 'Ресми өкіл',
          text: 'Қазақстандағы Eltex зауытының жалғыз ресми серіктесі',
          icon: '/about/about2.svg',
        },
        {
          title: 'Жергілікті өндіріс',
          text: 'Алматыдағы «Алатау» АИП ЕЭА аумағындағы өндірістік кешен',
          icon: '/about/about3.svg',
        },
        {
          title: 'Мемлекеттік қолдау',
          text: '«Самрұқ-Қазына» АҚ, ҚР БҒМ және басқа мемлекеттік құрылымдармен жұмыс істейміз',
          icon: '/about/about4.svg',
        },
      ],
    },
    advantages: {
      badge: 'АРТЫҚШЫЛЫҚТАРЫ',
      title: 'СТАРТАПТАРҒА. ӨНДІРУШІЛЕРГЕ.',
      accentTitle: 'ӘЗІРЛЕУШІЛЕРГЕ.',
      description:
        'Жобаңызға брендтерді ауыстыру нұсқасын іздеп жүрсіз бе? Eltex компаниясының кешенді шешімдерін көрсету арқылы тегін тестілеу. Технологиялар: xPON, ДОЖ (Деректерді өңдеу жайлары), қол жеткізу және агрегациялау желілері, Wi-Fi, IP АТС, VoIP телефония, бейнекамералар және бейнеаналитика. Бүгінгі күні желілер Eltex-тен басталады.',
      items: [
        {
          title: [
            { text: 'Өз ', accent: false },
            { text: 'өндірісіміз', accent: false },
          ],
          text: [
            { text: 'Алматыдағы ', accent: false },
            { text: '«Алатау» АИП ЕЭА ', accent: true },
            { text: 'аумағында толық', accent: false },
            { text: ' өндіріс циклі.', accent: false },
          ],
        },
        {
          title: [
            { text: 'Шығарылатын', accent: false },
            { text: 'өнімдер', accent: false },
          ],
          text: [
            { text: 'Eltex операторлық сыныптағы жабдық ', accent: false },
            { text: 'Өнеркәсіптік және ауылшаруашылық электроника ', accent: true },
            { text: 'Премиум сегменттегі киілетін электроника', accent: false },
          ],
        },
        {
          title: [
            { text: 'Сапаны бақылау ', accent: false },
            { text: 'барлық кезеңде', accent: false },
          ],
          text: [
            { text: 'Әр құрылғының ', accent: false },
            { text: 'сапасын бақылаудың', accent: true },
            { text: ' 3 сатылы жүйесі.', accent: false },
          ],
        },
        {
          title: [
            { text: 'Қазақстандағы ', accent: true },
            { text: 'локализация', accent: false },
          ],
          text: [
            { text: 'Жабдықты елде тікелей ', accent: false },
            { text: 'өндіру және қолдау —', accent: false },
            { text: ' жылдам және сенімді.', accent: false },
          ],
        },
      ],
      stats: [
        { title: '15', text: 'нарықта жыл' },
        { title: '4,5млн+', text: 'Ethernet портов' },
        { title: '12млн', text: 'PON OLT портов' },
        { title: '6,1млн', text: 'VoIP портов' },
      ],
    },
  },
  ru: {
    metadata: {
      title: 'Eltex',
      description:
        'EltexALatau - казахстанский производитель телекоммуникационного оборудования в Алматы. Контрактное производство (локализация) и услуги SMD-монтажа плат. Компания основана в 2012 году.',
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
        'Ваша IT - инфраструктура под нашим контролем. Тех. поддержка (русский, узбекский ), сроки поставки и пост гарантийная поддержка',
      cta: 'Регистрация проекта', 
      cta2: 'Оценить стоимость монтажа платы --- это страница решений!!!!!!!!',
      items: [
        {
          title: 'Склад в Ташкенте',
          text: 'Доставка по регионам Узбекистана',
          img: '/hero/hero-icon1.webp',
        },
        {
          title: 'Ресурсы и возможности компании:',
          text: 'Тех. поддержка (русский, узбекский), сроки поставки и пост гарантийная поддержка',
          img: '/hero/hero-icon2.webp',
        },
      ],
    },
    about: {
      badge: 'О КОМПАНИИ.',
      title: 'ТЕЛЕКОММУНИКАЦИИ ДЛЯ',
      accentTitle: 'БИЗНЕСА',
      description:
        'EltexALatau — казахстанский производитель электроники и телекоммуникационного оборудования операторского уровня. За 12 лет работы наше оборудование установлено на сетях крупнейших операторов Казахстана, Узбекистана и Кыргызстана.',
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
          text: 'Единственный официальный партнёр завода Eltex в Узбекистане',
          icon: '/about/about2.svg',
        },
        {
          title: 'Локальное производство',
          text: 'Производственный комплекс на территории СЭЗ ПИТ «Алатау» в Алматы',
          icon: '/about/about3.svg',
        },
        {
          title: 'Господдержка',
          text: 'Работаем с госструктурами',
          icon: '/about/about4.svg',
        },
      ],
    },
    advantages: {
      badge: 'ПРЕИМУЩЕСТВА',
      title: 'ИНТЕГРАТОРАМ. ОПЕРАТОРАМ СВЯЗИ.',
      accentTitle: 'КОРПОРАТИВНЫМ и ГОС. ЗАКАЗЧИКАМ.',
      description:
        'Ищете замену по брендам на проект? - Бесплатное тестирование с демонстрацией комплексных решений от Eltex. Технологии: xPON, ЦОД, Сети доступа и агрегации, Wi-Fi, IP ATC, VoIP телефония, видеокамеры и видеоаналитика. Сегодня сети начинаются с Eltex.',
      items: [
        {
          title: [
            { text: 'Партнерская ', accent: false },
            { text: 'программа', accent: false },
          ],
          text: [
            { text: 'Привилегии для партнеров Eltex. ', accent: false },
            { text: 'Возможность стать ', accent: false },
            { text: 'Авторизированным партнером', accent: true },
          ],
        },
        {
          title: [
            { text: 'Академия ', accent: false },
            { text: 'Eltex', accent: false },
          ],
          text: [
            { text: 'Обучение в групах ', accent: false },
            { text: 'по направлениям MES ESR VoIP WI-FI ', accent: true },
            { text: 'Аттестация и сертификация', accent: false },
          ],
        },
        {
          title: [
            { text: 'Техническая и  ', accent: false },
            { text: 'постграйтийная поддержка', accent: false },
          ],
          text: [
            { text: 'Стандартная 8/5 (казахский, русский) ', accent: false },
            { text: 'постгарантийное сервисное обслуживание', accent: true },
          ],
        },
        {
          title: [{ text: 'Сетификация ', accent: true }],
          text: [
            { text: 'СТ-1 ', accent: false },
            { text: 'Выпистка с реестра КТП ', accent: false },
            { text: 'Сертификат инф. безопасности', accent: false },
          ],
        },
      ],
      stats: [
        { title: '15', text: 'лет на рынке' },
        { title: '4,5млн+', text: 'Ethernet портов' },
        { title: '12млн', text: 'PON OLT портов' },
        { title: '6,1млн', text: 'VoIP портов' },
      ],
    },
  },
  en: {
    metadata: {
      title: 'Eltex',
      description:
        'A Kazakhstani manufacturer of electronics and modern telecommunications equipment. The sole official representative of the Eltex factory in Kazakhstan.',
    },
    proiz: {
      badge: 'PRODUCTION',
      link: 'go',
    },
    header: {
      navLinks: [
        { label: 'About' },
        { label: 'Advantages' },
        { label: 'Services' },
        { label: 'Contact' },
        { label: 'Production' },
      ],
      requestCta: 'Submit a request',
      menuLabel: 'Menu',
      closeLabel: 'Close',
      switchLocaleLabel: 'Switch language',
    },
    hero: {
      description:
        'EltexAlatau is a manufacturer of electronics and modern telecommunications equipment. The sole official representative of the Novosibirsk Eltex factory in Kazakhstan. Founded in 2012.',
      cta: 'Get installation quote',
      cta2: 'Register project',
      items: [
        {
          title: 'Manufacturing in Almaty',
          text: 'Delivery to all regions of Kazakhstan',
          img: '/hero/hero-icon1.webp',
        },
        {
          title: 'Company resources and capabilities:',
          text: 'Technical support (Russian, Kazakh), delivery timelines, and post-warranty support',
          img: '/hero/hero-icon2.webp',
        },
      ],
    },
    about: {
      badge: 'ABOUT US',
      title: 'TELECOMMUNICATIONS FOR',
      accentTitle: 'BUSINESS',
      description:
        'EltexAlatau is a Kazakhstani manufacturer of electronics and carrier-grade telecommunications equipment. Over 12 years, our equipment has been deployed across the networks of major operators in Kazakhstan, Uzbekistan and Kyrgyzstan.',
      cta: 'Learn more about the company',
      btn: 'Presentation',
      items: [
        {
          title: 'Quality Control',
          text: 'A 3-stage quality control system throughout production',
          icon: '/about/about1.svg',
        },
        {
          title: 'Official Representative',
          text: 'The sole official partner of the Eltex factory in Kazakhstan',
          icon: '/about/about2.svg',
        },
        {
          title: 'Local Manufacturing',
          text: 'Production facility within the SEZ PIT «Alatau» in Almaty',
          icon: '/about/about3.svg',
        },
        {
          title: 'Government Partnership',
          text: 'Working with Samruk-Kazyna JSC, Ministry of Education of Kazakhstan and other government bodies',
          icon: '/about/about4.svg',
        },
      ],
    },
    advantages: {
      badge: 'ADVANTAGES',
      title: 'FOR STARTUPS. FOR MANUFACTURERS.',
      accentTitle: 'FOR DEVELOPERS.',
      description:
        'Looking for a brand replacement for your project? Free testing with a demonstration of comprehensive Eltex solutions. Technologies: xPON, Data Centers, Access and Aggregation Networks, Wi-Fi, IP PBX, VoIP telephony, video cameras and video analytics. Today, networks start with Eltex.',
      items: [
        {
          title: [
            { text: 'In-house ', accent: false },
            { text: 'manufacturing', accent: false },
          ],
          text: [
            { text: 'Full production cycle ', accent: false },
            { text: 'at the SEZ PIT «Alatau» ', accent: true },
            { text: 'facility', accent: false },
            { text: ' in Almaty.', accent: false },
          ],
        },
        {
          title: [
            { text: 'Products', accent: false },
            { text: 'manufactured', accent: false },
          ],
          text: [
            { text: 'Eltex operator-class equipment ', accent: false },
            { text: 'Industrial and agricultural electronics ', accent: true },
            { text: 'Premium-segment wearable electronics', accent: false },
          ],
        },
        {
          title: [
            { text: 'Quality control ', accent: false },
            { text: 'at every stage', accent: false },
          ],
          text: [
            { text: 'A 3-stage ', accent: false },
            { text: 'quality assurance', accent: true },
            { text: ' system for every device.', accent: false },
          ],
        },
        {
          title: [
            { text: 'Localization ', accent: true },
            { text: 'in Kazakhstan', accent: false },
          ],
          text: [
            { text: 'Equipment manufactured and supported ', accent: false },
            { text: 'right in the country — ', accent: false },
            { text: 'fast and reliable.', accent: false },
          ],
        },
      ],
      stats: [
        { title: '15', text: 'years in the market' },
        { title: '4,5M+', text: 'Ethernet ports' },
        { title: '12M+', text: 'PON OLT ports' },
        { title: '6,1M+', text: 'VoIP ports' },
      ],
    },
  },
  uz: {
    metadata: {
      title: 'Eltex',
      description: 'Eltex Alatau — Almatidagi qozogʻistonlik telekommunikatsiya uskunalari ishlab chiqaruvchisi. Shartnoma asosidagi ishlab chiqarish (lokalizatsiya) va platalarni SMD-montaj qilish xizmatlari. Kompaniya 2012-yilda tashkil etilgan.',
    },
    proiz: {
      badge: 'ISHLAB CHIQARISH',
      link: 'Oʻtish',
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
      description: 'Sizning IT-infratuzilmangiz bizning nazoratimiz ostida. Texnik qoʻllab-quvvatlash (rus, oʻzbek tillarida), yetkazib berish muddatlari va kafolatdan keyingi xizmat koʻrsatish',
      cta: 'Loyihani roʻyxatdan oʻtkazish',
      cta2: 'Plata montaji narxini baholash',
      items: [
        {
          title: 'Toshkentdagi omborы',
          text: 'Oʻzbekiston hududlari boʻylab yetkazib berish',
          img: '/hero/hero-icon1.webp',
        },
        {
          title: 'Kompaniyaning resurslari va imkoniyatlari:',
          text: 'Texnik qoʻllab-quvvatlash (rus, oʻzbek tillarida), yetkazib berish muddatlari va kafolatdan keyingi xizmat koʻrsatish',
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
      text: 'Eltex zavodining Oʻzbekistondagi yagona rasmiy hamkori',
          icon: '/about/about2.svg',
        },
        {
          title: 'Mahalliy ishlab chiqarish',
      text: 'Almatidagi «Alatau» innovatsion texnologiyalar parki MIZ hududidagi ishlab chiqarish majmuasi',
          icon: '/about/about3.svg',
        },
        {
          title: 'Davlat qoʻllab-quvvatlovi',
           text: 'Davlat tuzilmalari bilan ishlaymiz',
          icon: '/about/about4.svg',
        },
      ],
    },
    advantages: {
      badge: 'AFZALLIKLAR',
      title: 'INTEGRATORLAR UCHUN. ALOQA OPERATORLARI UCHUN.',
      accentTitle: 'KORPORATIV VA DAVLAT BUYURTMACHILARI UCHUN.',
description: 'Loyiha uchun brendlarga muqobil qidiryapsizmi? - Eltex kompleks yechimlarini namoyish qilgan holda bepul sinov. Texnologiyalar: xPON, maʼlumotlarni qayta ishlash markazlari (DATA-markaz), Access va agregatsiya tarmoqlari, Wi-Fi, IP-ATS, VoIP telefoniya, videokameralar va videoanalitika. Bugun tarmoqlar Eltex bilan boshlanadi.',
items: [
        {
          title: [
      { text: 'Hamkorlik ', accent: false },
      { text: 'dasturi', accent: false },
    ],
    text: [
      { text: 'Eltex hamkorlari uchun imtiyozlar. ', accent: false },
      { text: 'Quyidagi maqomga ega boʻlish imkoniyati: ', accent: false },
      { text: 'Avtorizatsiyalangan hamkor', accent: true },
    ],
  },
  {
    title: [
      { text: 'Eltex ', accent: false },
      { text: 'akademiyasi', accent: false },
    ],
    text: [
      { text: 'Guruhlarda oʻqitish ', accent: false },
      { text: 'MES ESR VoIP WI-FI yoʻnalishlari boʻyicha ', accent: true },
      { text: 'Attestatsiya va sertifikatlash', accent: false },
    ],
  },
  {
    title: [
      { text: 'Texnik va ', accent: false },
      { text: 'kafolatdan keyingi qoʻllab-quvvatlash', accent: false },
    ],
    text: [
      { text: 'Standart 8/5 (qozoq, rus tillarida) ', accent: false },
      { text: 'kafolatdan keyingi servis xizmati', accent: true },
    ],
  },
  {
    title: [{ text: 'Sertifikatlar ', accent: true }],
    text: [
      { text: 'ST-1 ', accent: false },
      { text: 'KTP reyestridan koʻchirma ', accent: false },
      { text: 'Axborot xavfsizligi sertifikati', accent: false },
    ],
  },
],
      stats: [
        { title: '15', text: 'yil bozorda' },
        { title: '4,5mln+', text: 'Ethernet portlari' },
  { title: '12mln', text: 'PON OLT portlari' },
  { title: '6,1mln', text: 'VoIP portlari' },
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
