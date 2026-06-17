import Image from 'next/image';
import { type IconType } from 'react-icons';
import { IoIosArrowRoundForward } from 'react-icons/io';
import {
  LuBoxes,
  LuFileText,
  LuPackageCheck,
  LuScanLine,
  LuThermometer,
  LuTrash2,
} from 'react-icons/lu';
import { type Locale } from '@/lib/eltex';

type ServiceItem = {
  number: string;
  title: string;
};

type ServiceImageLabelKey =
  | 'storage'
  | 'customs'
  | 'packing'
  | 'serialization'
  | 'docs'
  | 'disposal';

type ServiceImageLabel = {
  key: ServiceImageLabelKey;
  title: string;
  meta?: string;
};

type ServicesContent = {
  badge: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  description: string;
  imageAlt: string;
  items: ServiceItem[];
  imageLabels: ServiceImageLabel[];
};

type ServicesProps = {
  locale: Locale;
};

const serviceImageLabelStyles: Record<ServiceImageLabelKey, { icon: IconType; className: string }> =
  {
    storage: {
      icon: LuThermometer,
      className:
        'left-[4%] top-[8%] max-w-[7rem] sm:left-[7%] sm:top-[10%] sm:max-w-[12rem] lg:max-w-[14rem]',
    },
    customs: {
      icon: LuBoxes,
      className:
        'right-[3%] top-[12%] max-w-[7rem] sm:right-[7%] sm:top-[13%] sm:max-w-[12rem] lg:max-w-[15rem]',
    },
    packing: {
      icon: LuPackageCheck,
      className: 'left-[4%] top-[42%] max-w-[6.5rem] sm:left-[7%] sm:top-[43%] sm:max-w-[10rem]',
    },
    serialization: {
      icon: LuScanLine,
      className: 'right-[3%] top-[50%] max-w-[6.5rem] sm:right-[7%] sm:top-[50%] sm:max-w-[11rem]',
    },
    docs: {
      icon: LuFileText,
      className:
        'bottom-[17%] left-[4%] max-w-[7rem] sm:bottom-[18%] sm:left-[7%] sm:max-w-[12rem]',
    },
    disposal: {
      icon: LuTrash2,
      className:
        'bottom-[12%] right-[3%] max-w-[7rem] sm:bottom-[12%] sm:right-[8%] sm:max-w-[12rem]',
    },
  };

const contentByLocale: Record<Locale, ServicesContent> = {
  kk: {
    badge: 'Қызметтер',
    titleStart: 'ТОЛЫҚ',
    titleAccent: 'ЦИКЛДІ',
    titleEnd: 'ШЕШІМДЕР',
    description:
      'Жабдықты өндіру мен жеткізуден бастап оқыту, техникалық, кепілдіктік және кепілдіктен кейінгі қолдауға дейінгі кешенді телекоммуникациялық шешімдер ұсынамыз.',
    imageAlt: 'Қызметтер',
    items: [
      {
        number: '01',
        title: 'Келісімшарттық өндіріс және SMD және THT тақталарын монтаждау қызметтері',
      },
      { number: '02', title: 'Eltex жабдығын сынақтан өткізу үшін жабдық беру' },
      { number: '03', title: 'Eltex жабдығын жөндеу және сервистік қызмет көрсету' },
      {
        number: '04',
        title: '"Eltex Академиясында" инженерлерді оқыту бағдарламалары және сертификаттау',
      },
      { number: '05', title: 'Техникалық мамандықтардағы студенттерге арналған тәжірибе' },
      { number: '06', title: 'Орыс және қазақ тілдерінде техникалық қолдау' },
    ],
    imageLabels: [
      { key: 'storage', title: 'Өз өндірісіміз', meta: '«Алатау» АИП ЕЭА' },
      { key: 'customs', title: 'Келісімшарттық өндіріс' },
      { key: 'packing', title: 'Жабдықты жөндеу және сервис' },
      { key: 'serialization', title: 'Жабдықты тестілеу' },
      { key: 'docs', title: 'Оқыту және сертификаттау' },
      { key: 'disposal', title: 'Кепілдікті қызмет көрсету' },
    ],
  },
  ru: {
    badge: 'Услуги',
    titleStart: 'РЕШЕНИЯ',
    titleAccent: 'ПОЛНОГО',
    titleEnd: 'ЦИКЛА',
    description:
      'Предоставляем комплексные телекоммуникационные решения — от производства и поставки оборудования до обучения, технической,  гарантийной и постгарантийной поддержки.',
    imageAlt: 'Услуги',
    items: [
      { number: '01', title: 'Контрактное производство и услуги по SMD и ТНТ монтажу плат' },
      { number: '02', title: 'Предоставление оборудования на тестирование оборудования Eltex' },
      { number: '03', title: 'Ремонт и сервисное обслуживание оборудования Eltex' },
      { number: '04', title: 'Программы обучения и сертификация инженеров в "Академии Элтекс"' },
      { number: '05', title: 'Практика для студентов технических специальностей' },
      { number: '06', title: 'Техническая поддержка на русском и казахском языках' },
    ],
    imageLabels: [
      { key: 'storage', title: 'Собственное производство', meta: 'СЭЗ ПИТ «Алатау»' },
      { key: 'customs', title: 'Контрактное производство' },
      { key: 'packing', title: 'Ремонт и сервис оборудования' },
      { key: 'serialization', title: 'Тестирование оборудования' },
      { key: 'docs', title: 'Обучение и сертификация' },
      { key: 'disposal', title: 'Гарантийное обслуживание' },
    ],
  },
  en: {
    badge: 'Services',
    titleStart: 'END-TO-END',
    titleAccent: 'SOLUTIONS',
    titleEnd: '',
    description:
      'We provide comprehensive telecommunications solutions — from equipment manufacturing and supply to training, technical, warranty and post-warranty support.',
    imageAlt: 'Services',
    items: [
      { number: '01', title: 'Contract manufacturing and SMD and THT board assembly services' },
      { number: '02', title: 'Providing equipment for Eltex hardware testing' },
      { number: '03', title: 'Repair and maintenance of Eltex equipment' },
      {
        number: '04',
        title: 'Engineer training programs and certification at the "Eltex Academy"',
      },
      { number: '05', title: 'Internship for students of technical specialties' },
      { number: '06', title: 'Technical support in Russian and Kazakh languages' },
    ],
    imageLabels: [
      { key: 'storage', title: 'In-house manufacturing', meta: 'SEZ PIT «Alatau»' },
      { key: 'customs', title: 'Contract manufacturing' },
      { key: 'packing', title: 'Equipment repair and service' },
      { key: 'serialization', title: 'Equipment testing' },
      { key: 'docs', title: 'Training and certification' },
      { key: 'disposal', title: 'Warranty service' },
    ],
  },
};

export default function Services({ locale }: ServicesProps) {
  const content = contentByLocale[locale];

  return (
    <section
      id="services"
      className="pl-4 pr-4 pb-10 sm:pl-8 sm:pr-8 md:pl-16 md:pr-16 lg:pb-0 lg:pl-36 lg:pr-0">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="mt-4 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#353EEA]" />
            <h2 className="text-lg font-semibold text-black">{content.badge}</h2>
          </div>
          <p className="mt-4 max-w-lg text-black">{content.description}</p>
          <div className="mt-4 h-[2px] w-[30%] bg-[#353EEA]" />

          <ul className="mt-8 divide-y divide-black/10">
            {content.items.map((item) => (
              <li
                key={item.number}
                className="group grid cursor-pointer grid-cols-[2rem_minmax(0,1fr)_1.5rem] items-start gap-3 px-2 py-4 transition-colors duration-200 sm:grid-cols-[2.5rem_minmax(0,1fr)_2rem] sm:gap-4">
                <span className="pt-0.5 text-sm font-bold text-[#353EEA] sm:text-base">
                  {item.number}
                </span>
                <p className="max-w-[18rem] text-2xl leading-7 text-black transition-colors duration-200 group-hover:text-[#353EEA] sm:max-w-none sm:text-lg">
                  {item.title}
                </p>
                <IoIosArrowRoundForward className="place-self-center text-2xl text-black transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#353EEA]" />
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <div className="relative h-full overflow-hidden bg-white">
            <Image
              src="/services1.jpg"
              alt={content.imageAlt}
              width={1200}
              height={900}
              className="block h-auto w-full    lg:h-full lg:object-cover"
            />
            <div className="pointer-events-none absolute inset-0 z-10 text-black">
              {content.imageLabels.map((label) => {
                const { icon: Icon, className } = serviceImageLabelStyles[label.key];

                return (
                  <div
                    key={label.key}
                    className={`absolute flex items-start gap-1.5 rounded-md bg-black/15 px-1.5 py-1 shadow-sm backdrop-blur-[1px] sm:gap-2.5 sm:px-3 sm:py-2 ${className}`}>
                    <Icon className="h-4 text-white w-4 shrink-0 stroke-[2.3] sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                    <div>
                      <p className="text-[6px] text-white font-semibold uppercase leading-[1.15] tracking-[0] sm:text-[10px] lg:text-[12px]">
                        {label.title}
                      </p>
                      {label.meta ? (
                        <p className="mt-2 whitespace-nowrap text-[6px] text-white font-semibold leading-none tracking-[0] sm:mt-3 sm:text-[10px] lg:text-[12px]">
                          {label.meta}
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
