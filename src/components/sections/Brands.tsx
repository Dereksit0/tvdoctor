'use client';

import { motion } from 'framer-motion';
import { staggerContainer, scaleIn } from '@/lib/animations';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { WA_GENERIC } from '@/lib/constants';

type Brand = {
  name: string;
  /** Texto del wordmark (puede diferir del nombre mostrado debajo). */
  wordmark: string;
  color: string;
  /** Clases extra de estilo tipográfico para imitar el logotipo. */
  className?: string;
  style?: React.CSSProperties;
};

const BRANDS: Brand[] = [
  {
    name: 'Samsung',
    wordmark: 'SAMSUNG',
    color: '#FFFFFF',
    className: 'font-sans font-bold',
    style: { letterSpacing: '0.12em', fontSize: '1.25rem' },
  },
  {
    name: 'Sony',
    wordmark: 'SONY',
    color: '#FFFFFF',
    className: 'font-sans font-extrabold',
    style: { letterSpacing: '0.22em', fontSize: '1.4rem' },
  },
  {
    name: 'LG',
    wordmark: 'LG',
    color: '#FFFFFF',
    className: 'font-sans font-black',
    style: { letterSpacing: '0.04em', fontSize: '1.9rem' },
  },
  {
    name: 'Panasonic',
    wordmark: 'Panasonic',
    color: '#FFFFFF',
    className: 'font-sans font-bold italic',
    style: { letterSpacing: '0.01em', fontSize: '1.4rem' },
  },
  {
    name: 'Philips',
    wordmark: 'PHILIPS',
    color: '#FFFFFF',
    className: 'font-sans font-semibold',
    style: { letterSpacing: '0.18em', fontSize: '1.3rem' },
  },
  {
    name: 'Sharp',
    wordmark: 'SHARP',
    color: '#FFFFFF',
    className: 'font-sans font-black italic',
    style: { letterSpacing: '0.05em', fontSize: '1.45rem' },
  },
  {
    name: 'TCL',
    wordmark: 'TCL',
    color: '#FFFFFF',
    className: 'font-sans font-black',
    style: { letterSpacing: '0.1em', fontSize: '1.85rem' },
  },
  {
    name: 'Hisense',
    wordmark: 'Hisense',
    color: '#FFFFFF',
    className: 'font-sans font-bold',
    style: { letterSpacing: '0.02em', fontSize: '1.5rem' },
  },
];

function BrandLogo({ brand }: { brand: Brand }) {
  return (
    <span
      className={`select-none leading-none ${brand.className ?? ''}`}
      style={{ color: brand.color, ...brand.style }}
    >
      {brand.wordmark}
    </span>
  );
}

export default function Brands() {
  return (
    <SectionWrapper id="marcas">
      <div className="text-center mb-12">
        <p className="text-brand-red text-xs font-semibold font-sans tracking-[0.25em] uppercase mb-3">
          Cobertura completa
        </p>
        <h2
          className="font-display text-white uppercase"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          TODAS LAS{' '}
          <span className="text-brand-red">MARCAS PRINCIPALES</span>
        </h2>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10"
      >
        {BRANDS.map((brand) => (
          <motion.div
            key={brand.name}
            variants={scaleIn}
            className="glass-card aspect-[4/3] flex flex-col items-center justify-center p-6 group cursor-default transition-all duration-300"
            whileHover={{
              borderColor: 'rgba(185,18,44,0.7)',
              boxShadow: '0 0 24px rgba(185,18,44,0.18)',
              scale: 1.03,
            }}
          >
            <div className="flex items-center justify-center h-12">
              <BrandLogo brand={brand} />
            </div>
            <span className="mt-4 font-sans text-xs text-brand-gray/50 group-hover:text-brand-gray/80 transition-colors tracking-wide">
              {brand.name}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="font-sans text-brand-gray text-sm">
          ¿Tu marca no está en la lista?{' '}
          <a
            href={WA_GENERIC}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-red-light hover:text-white font-semibold transition-colors"
          >
            Contáctanos — probablemente también la reparamos.
          </a>
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
