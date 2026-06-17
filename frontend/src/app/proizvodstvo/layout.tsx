import type { Metadata } from 'next';
import { DEFAULT_LOCALE, createTranslator } from '@/lib/eltex-alatau';
import '../globals.css';

const t = createTranslator(DEFAULT_LOCALE);

export const metadata: Metadata = {
  title: t('metadata.title'),
  description: t('metadata.description'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={DEFAULT_LOCALE} translate="no" className="h-full antialiased notranslate">
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body className="min-h-full flex flex-col notranslate">{children}</body>
    </html>
  );
}
