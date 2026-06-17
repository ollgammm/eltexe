import { createTranslator, type Locale } from '@/lib/eltex';

type AboutProps = {
  locale: Locale;
};

export default function About({ locale }: AboutProps) {
  const t = createTranslator(locale);
  const badge = t('about.badge');
  const btn = t('about.btn');

  return (
    <section
      id="about"
      className="bg-cover bg-center bg-no-repeat px-4 sm:px-8 md:px-16 lg:px-36 py-10 lg:py-16"
      style={{ backgroundImage: "url('/about/bg.webp')" }}>
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-[#353EEA] w-2 h-2" />
        <h2 className="text-lg font-semibold text-black">{badge}</h2>
      </div>

      <a
        href="/presentation.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex w-full items-center justify-center gap-1 rounded-full bg-[#353EEA] px-5 py-2 text-sm text-white sm:mt-6 sm:w-max sm:justify-start lg:mt-6 lg:px-6 lg:py-2 lg:text-base">
        {btn}
      </a>
    </section>
  );
}
