'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import { WA_DIAGNOSTIC, TRUST_BADGES } from '@/lib/constants';

const PARTICLES = [
  { id: 1, top: '14%', left: '8%',  size: 3, duration: '6.0s', delay: '0.0s' },
  { id: 2, top: '22%', left: '88%', size: 2, duration: '7.5s', delay: '1.2s' },
  { id: 3, top: '63%', left: '4%',  size: 4, duration: '5.5s', delay: '2.1s' },
  { id: 4, top: '71%', left: '93%', size: 2, duration: '8.0s', delay: '0.7s' },
  { id: 5, top: '38%', left: '13%', size: 3, duration: '6.5s', delay: '1.8s' },
  { id: 6, top: '19%', left: '66%', size: 2, duration: '7.0s', delay: '3.2s' },
  { id: 7, top: '81%', left: '29%', size: 3, duration: '5.8s', delay: '2.5s' },
  { id: 8, top: '48%', left: '78%', size: 2, duration: '9.0s', delay: '0.3s' },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-[100svh] flex flex-col items-center lg:items-start justify-center overflow-hidden hero-scanlines"
      style={{ background: '#000000' }}
    >
      {/* ─── Banner image — right side desktop, full bg mobile ──────── */}
      <div className="absolute inset-0 lg:left-[50%] overflow-hidden">
        <Image
          src="/imgs/banner.png"
          alt="Técnico experto reparando pantalla en TV Doctor Puebla"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark overlay on image */}
        <div className="absolute inset-0 bg-black/60 lg:bg-black/30" />
        {/* Left-edge gradient fade — desktop only */}
        <div
          className="hidden lg:block absolute inset-y-0 left-0 w-48"
          style={{
            background:
              'linear-gradient(to right, #000000 0%, rgba(0,0,0,0.85) 40%, transparent 100%)',
          }}
        />
      </div>

      {/* Red radial glow — left/center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 25% 50%, rgba(185,18,44,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Particles */}
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            animation: `float ${p.duration} ease-in-out ${p.delay} infinite`,
            zIndex: 3,
          }}
        />
      ))}

      {/* ─── Content ─────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full lg:w-[48%] max-w-6xl mx-auto lg:mx-0 px-5 lg:pl-44 lg:pr-8">
        <div className="max-w-[640px] pt-24 pb-32">
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            custom={0}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-red/60 bg-brand-red/10 px-4 py-1.5 text-xs font-semibold font-sans tracking-widest text-brand-red-light uppercase">
              ⚡ Servicio a domicilio disponible
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={fadeInUp}
            custom={1.5}
            initial="hidden"
            animate="visible"
            className="font-display leading-none tracking-wide mb-6 uppercase"
            style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', lineHeight: 1.0 }}
          >
            <span className="block text-white">REPARAMOS</span>
            <span className="block text-white">TU PANTALLA</span>
            <span className="block text-brand-red">COMO NUEVA</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            custom={3}
            initial="hidden"
            animate="visible"
            className="font-sans font-light text-base lg:text-lg text-brand-gray mb-8 leading-relaxed"
          >
            Especialistas certificados en todo tipo de pantallas. Plasma, LCD, LED, OLED, QLED, Smart TV y más.{' '}
            <span className="text-white font-medium">Diagnóstico gratuito.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            custom={4.5}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href={WA_DIAGNOSTIC}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold font-sans px-8 py-4 rounded-lg text-base btn-glow min-h-[52px]"
            >
              Solicitar diagnóstico →
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/40 hover:border-white hover:bg-white/5 text-white font-semibold font-sans px-8 py-4 rounded-lg text-base transition-all duration-200 min-h-[52px]"
            >
              Ver servicios ↓
            </a>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            variants={fadeInUp}
            custom={6}
            initial="hidden"
            animate="visible"
            className="mt-10 border-t border-brand-red/30 pt-7"
          >
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {TRUST_BADGES.map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 text-sm font-sans text-brand-gray"
                >
                  <span className="text-brand-red-light">{badge.icon}</span>
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bounce arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={{ animation: 'bounce-slow 2s ease-in-out infinite' }}
      >
        <svg className="w-6 h-6 text-brand-red/60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
