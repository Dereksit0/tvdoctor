import type { Metadata } from 'next';
import { Bebas_Neue, Inter } from 'next/font/google';
import './globals.css';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TV Doctor | Reparación de Pantallas en Puebla — Especialista',
  description:
    'Reparación y mantenimiento de pantallas en Puebla. Plasma, LCD, LED, OLED, QLED, Smart TV. Todas las marcas. Diagnóstico gratis. 3–6 meses de garantía. Tel: 222 713 2551.',
  keywords:
    'reparación pantallas puebla, servicio tv puebla, reparar televisión puebla, técnico pantallas puebla, reparación smart tv puebla, OLED QLED LED puebla',
  openGraph: {
    title: 'TV Doctor — Especialista en Pantallas en Puebla',
    description:
      'Diagnóstico gratuito. Todas las marcas. 3–6 meses de garantía. Servicio a domicilio.',
    url: 'https://tvdoctor.mx',
    siteName: 'TV Doctor',
    locale: 'es_MX',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'TV Doctor',
  description: 'Especialista en reparación y mantenimiento de pantallas',
  telephone: '+522227132551',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Puebla',
    addressRegion: 'Puebla',
    addressCountry: 'MX',
  },
  openingHours: ['Mo-Fr 09:00-18:00', 'Sa 09:00-15:00'],
  url: 'https://tvdoctor.mx',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bebasNeue.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-brand-black text-brand-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
