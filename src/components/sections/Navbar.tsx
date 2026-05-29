'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { NAV_LINKS, PHONE_HREF, PHONE, WA_GENERIC } from '@/lib/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(0,0,0,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(185,18,44,0.2)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="/" className="shrink-0" aria-label="TV Doctor - Inicio">
            <Image
              src="/imgs/logo.png"
              alt="TV Doctor — Especialista en Pantallas"
              width={149}
              height={54}
              priority
              className="h-10 w-auto object-contain"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-brand-gray hover:text-brand-red-light text-sm font-sans font-medium tracking-wide transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href={PHONE_HREF}
            className="hidden lg:inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white text-sm font-semibold font-sans px-5 py-2.5 rounded-lg btn-glow transition-colors duration-200 min-h-[44px] shrink-0"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            Llámanos ahora
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden relative z-[60] flex flex-col gap-[5px] p-2 min-h-[44px] min-w-[44px] items-center justify-center"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7, backgroundColor: '#FFFFFF' } : { rotate: 0, y: 0, backgroundColor: '#FFFFFF' }}
              transition={{ duration: 0.25 }}
              className="block w-6 h-[2px] bg-white rounded-full origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-[2px] bg-white rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7, backgroundColor: '#FFFFFF' } : { rotate: 0, y: 0, backgroundColor: '#FFFFFF' }}
              transition={{ duration: 0.25 }}
              className="block w-6 h-[2px] bg-white rounded-full origin-center"
            />
          </button>
        </div>
      </header>

      {/* ─── Mobile menu — full-screen professional overlay ─────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[45] bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={closeMenu}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[55] w-full sm:w-[380px] lg:hidden flex flex-col overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, #0A0A0A 0%, #10020a 100%)',
                borderLeft: '1px solid rgba(185,18,44,0.15)',
              }}
            >
              {/* Dot grid texture */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                  backgroundImage: 'radial-gradient(rgba(185,18,44,0.12) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              {/* Red glow corner */}
              <div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(185,18,44,0.25) 0%, transparent 70%)',
                }}
              />

              {/* ── Header ── */}
              <div className="relative z-10 flex items-center justify-between px-6 pt-5 pb-5 border-b border-white/5">
                <a href="/" onClick={closeMenu} className="shrink-0">
                  <Image
                    src="/imgs/logo.png"
                    alt="TV Doctor"
                    width={120}
                    height={43}
                    className="h-9 w-auto object-contain"
                  />
                </a>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-brand-gray hover:text-white hover:border-brand-red/50 transition-all"
                  aria-label="Cerrar menú"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* ── Nav links ── */}
              <nav className="relative z-10 flex-1 flex flex-col justify-center px-6 gap-1 py-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: 0.05 + i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex items-center gap-5 py-4 border-b border-white/5 last:border-0 hover:pl-2 transition-all duration-200"
                  >
                    {/* Number */}
                    <span className="font-display text-sm text-brand-red/50 group-hover:text-brand-red transition-colors w-8 shrink-0">
                      0{i + 1}
                    </span>
                    {/* Link label */}
                    <span
                      className="font-display text-white group-hover:text-brand-red-light transition-colors tracking-wide uppercase"
                      style={{ fontSize: 'clamp(1.8rem, 7vw, 2.5rem)' }}
                    >
                      {link.label}
                    </span>
                    {/* Arrow */}
                    <svg
                      className="w-5 h-5 text-brand-red/0 group-hover:text-brand-red transition-all duration-200 ml-auto group-hover:translate-x-1 translate-x-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.a>
                ))}
              </nav>

              {/* ── Bottom contact section ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="relative z-10 px-6 pb-8 pt-5 border-t border-white/5"
              >
                {/* Schedule */}
                <p className="font-sans text-xs text-brand-gray/60 tracking-widest uppercase mb-4">
                  Horario de atención
                </p>
                <div className="flex gap-4 mb-5">
                  <div className="glass-card px-3 py-2 flex-1 text-center">
                    <p className="font-sans text-[10px] text-brand-gray/60 uppercase tracking-wide">Lun–Vie</p>
                    <p className="font-sans text-xs text-white font-medium mt-0.5">9am – 6pm</p>
                  </div>
                  <div className="glass-card px-3 py-2 flex-1 text-center">
                    <p className="font-sans text-[10px] text-brand-gray/60 uppercase tracking-wide">Sábado</p>
                    <p className="font-sans text-xs text-white font-medium mt-0.5">9am – 3pm</p>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="flex gap-3">
                  <a
                    href={PHONE_HREF}
                    className="flex-1 flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold font-sans text-sm py-3 rounded-xl btn-glow min-h-[48px]"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                    {PHONE}
                  </a>
                  <a
                    href={WA_GENERIC}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 flex items-center justify-center bg-[#25D366]/90 hover:bg-[#25D366] rounded-xl min-h-[48px]"
                    aria-label="WhatsApp"
                  >
                    <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
