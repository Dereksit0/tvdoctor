'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { SERVICES, WA_GENERIC } from '@/lib/constants';
import type { ServiceItem } from '@/lib/constants';

function ServiceIcon({ type }: { type: string }) {
  const cls = 'w-8 h-8 text-brand-red';
  switch (type) {
    case 'monitor':
      return (
        <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
        </svg>
      );
    case 'shield':
      return (
        <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      );
    case 'home':
      return (
        <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      );
    case 'smart':
      return (
        <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      );
    case 'search':
      return (
        <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      );
    case 'building':
      return (
        <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
      );
    default:
      return null;
  }
}

function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="glass-card p-6 flex flex-col gap-4 group cursor-default transition-all duration-300 hover:-translate-y-1.5"
      style={{
        transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
      }}
      whileHover={{
        borderColor: 'rgba(185,18,44,0.9)',
        boxShadow: '0 8px 32px rgba(185,18,44,0.18)',
      }}
    >
      <ServiceIcon type={item.iconType} />
      <h3 className="font-sans font-semibold text-white text-base leading-snug">
        {item.title}
      </h3>
      <p className="font-sans font-light text-brand-gray text-sm leading-relaxed flex-1">
        {item.description}
      </p>
    </motion.div>
  );
}

export default function Services() {
  return (
    <SectionWrapper id="servicios">
      <div className="text-center mb-14">
        <p className="text-brand-red text-xs font-semibold font-sans tracking-[0.25em] uppercase mb-3">
          Lo que hacemos
        </p>
        <h2
          className="font-display text-white uppercase"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          NUESTROS <span className="text-brand-red">SERVICIOS</span>
        </h2>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
      >
        {SERVICES.map((service) => (
          <ServiceCard key={service.id} item={service} />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="text-center border border-brand-red/20 rounded-xl p-6 bg-brand-red/5"
      >
        <p className="font-sans text-brand-gray text-sm mb-3">
          ¿No estás seguro si vale la pena reparar?
        </p>
        <a
          href={WA_GENERIC}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans font-semibold text-brand-red-light hover:text-white transition-colors text-sm"
        >
          Consúltanos gratis por WhatsApp →
        </a>
      </motion.div>
    </SectionWrapper>
  );
}
