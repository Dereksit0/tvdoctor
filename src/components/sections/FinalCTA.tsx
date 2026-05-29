'use client';

import { motion } from 'framer-motion';
import { scaleIn } from '@/lib/animations';
import { WA_DIAGNOSTIC, PHONE } from '@/lib/constants';

export default function FinalCTA() {
  return (
    <section
      className="relative py-20 lg:py-28 px-5 lg:px-8 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #B9122C 0%, #8A0D20 100%)',
      }}
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col items-center gap-6"
        >
          <h2
            className="font-display text-white uppercase leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.0 }}
          >
            ¿TU PANTALLA TIENE UN PROBLEMA?
          </h2>

          <p className="font-sans font-light text-white/80 text-base lg:text-lg max-w-xl leading-relaxed">
            No la cambies antes de consultarnos. Diagnóstico gratuito, presupuesto sin costo y garantía incluida.
          </p>

          <a
            href={WA_DIAGNOSTIC}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-brand-red font-bold font-sans px-10 py-4 rounded-lg text-base hover:bg-brand-gray-light transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105 min-h-[52px]"
          >
            SOLICITAR DIAGNÓSTICO GRATIS →
          </a>

          <p className="font-sans text-white/60 text-sm">
            📞 {PHONE} · Lunes–Viernes 9am–6pm · Sábado 9am–3pm
          </p>
        </motion.div>
      </div>
    </section>
  );
}
