'use client';

import { motion } from 'framer-motion';
import { staggerContainer, scaleIn } from '@/lib/animations';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { WA_GENERIC } from '@/lib/constants';

type Brand = {
  name: string;
  slug: string | null;
  iconColor: string;
  textColor: string;
  bgHover: string;
};

const BRANDS: Brand[] = [
  { name: 'Samsung',   slug: 'samsung',   iconColor: 'ffffff', textColor: '#1428A0', bgHover: 'rgba(20,40,160,0.15)' },
  { name: 'Sony',      slug: 'sony',      iconColor: 'ffffff', textColor: '#FFFFFF', bgHover: 'rgba(255,255,255,0.1)' },
  { name: 'LG',        slug: 'lg',        iconColor: 'ffffff', textColor: '#A50034', bgHover: 'rgba(165,0,52,0.15)'   },
  { name: 'Panasonic', slug: 'panasonic', iconColor: 'ffffff', textColor: '#0A3EA0', bgHover: 'rgba(10,62,160,0.15)'  },
  { name: 'Philips',   slug: 'philips',   iconColor: 'ffffff', textColor: '#0B5ED7', bgHover: 'rgba(11,94,215,0.15)'  },
  { name: 'Sharp',     slug: 'sharp',     iconColor: 'ffffff', textColor: '#CCCCCC', bgHover: 'rgba(200,200,200,0.1)' },
  { name: 'TCL',       slug: 'tcl',       iconColor: 'ffffff', textColor: '#E4002B', bgHover: 'rgba(228,0,43,0.15)'   },
  { name: 'Hisense',   slug: 'hisense',   iconColor: 'ffffff', textColor: '#009FE3', bgHover: 'rgba(0,159,227,0.15)'  },
];

function BrandLogo({ brand }: { brand: Brand }) {
  if (!brand.slug) {
    return (
      <span
        className="font-sans font-black text-2xl select-none"
        style={{ color: brand.textColor }}
      >
        {brand.name}
      </span>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://cdn.simpleicons.org/${brand.slug}/${brand.iconColor}`}
        alt={`${brand.name} logo`}
        width={52}
        height={52}
        className="object-contain"
        style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.1))' }}
        onError={(e) => {
          const img = e.currentTarget;
          img.style.display = 'none';
          const fallback = img.nextElementSibling as HTMLElement | null;
          if (fallback) fallback.style.display = 'block';
        }}
      />
      <span
        className="hidden font-sans font-black text-xl select-none"
        style={{ color: brand.textColor }}
      >
        {brand.name}
      </span>
    </div>
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
            <BrandLogo brand={brand} />
            <span className="mt-3 font-sans text-xs text-brand-gray/50 group-hover:text-brand-gray/80 transition-colors tracking-wide">
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
