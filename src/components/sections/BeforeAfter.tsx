'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { scaleIn } from '@/lib/animations';
import SectionWrapper from '@/components/ui/SectionWrapper';

export default function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isReady, setIsReady] = useState(false);
  const isDragging = useRef(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const updateFromClient = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    setPosition(Math.min(100, Math.max(0, ((clientX - left) / width) * 100)));
  }, []);

  return (
    <SectionWrapper id="antes-despues">
      <div className="text-center mb-12">
        <p className="text-brand-red text-xs font-semibold font-sans tracking-[0.25em] uppercase mb-3">
          Resultados reales
        </p>
        <h2
          className="font-display text-white uppercase"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          ANTES Y{' '}
          <span className="text-brand-red">DESPUÉS</span>
        </h2>
        <p className="mt-3 font-sans font-light text-brand-gray text-sm">
          Arrastra el control para comparar cómo dejamos cada pantalla.
        </p>
      </div>

      <motion.div
        variants={scaleIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-4xl mx-auto"
      >
        {/* Comparison container */}
        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-2xl select-none"
          style={{
            aspectRatio: '1672/940',
            cursor: 'col-resize',
            border: '1px solid rgba(185,18,44,0.2)',
          }}
          onMouseDown={() => { isDragging.current = true; }}
          onMouseUp={() => { isDragging.current = false; }}
          onMouseLeave={() => { isDragging.current = false; }}
          onMouseMove={(e) => { if (isDragging.current) updateFromClient(e.clientX); }}
          onTouchStart={() => { isDragging.current = true; }}
          onTouchEnd={() => { isDragging.current = false; }}
          onTouchMove={(e) => updateFromClient(e.touches[0].clientX)}
        >
          {/* ANTES — bottom layer (full width always visible) */}
          <div className="absolute inset-0">
            <Image
              src="/imgs/antes.png"
              alt="Pantalla dañada — antes de la reparación"
              fill
              className="object-cover object-center"
              draggable={false}
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
            {/* Label */}
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-sm text-white font-sans font-semibold text-xs px-3 py-1.5 rounded-full border border-white/10 tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-brand-gray inline-block" />
                Antes
              </span>
            </div>
          </div>

          {/* DESPUÉS — top layer clipped to left portion */}
          {isReady && (
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <Image
                src="/imgs/despues.png"
                alt="Pantalla reparada — después del servicio TV Doctor"
                fill
                className="object-cover object-center"
                draggable={false}
                priority
                sizes="(max-width: 768px) 100vw, 896px"
              />
              {/* Label */}
              <div className="absolute top-4 right-4 z-10">
                <span className="inline-flex items-center gap-1.5 bg-brand-red/90 backdrop-blur-sm text-white font-sans font-semibold text-xs px-3 py-1.5 rounded-full tracking-widest uppercase">
                  <span className="w-2 h-2 rounded-full bg-white inline-block" />
                  Después
                </span>
              </div>
            </div>
          )}

          {/* Divider line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 z-20 pointer-events-none"
            style={{
              left: `${position}%`,
              background: 'white',
              boxShadow: '0 0 14px rgba(255,255,255,0.7)',
            }}
          />

          {/* Handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 pointer-events-none"
            style={{ left: `${position}%` }}
          >
            <div className="w-11 h-11 rounded-full bg-white shadow-2xl flex items-center justify-center border-2 border-brand-red gap-0.5">
              {/* Left arrow */}
              <svg className="w-3 h-3 text-brand-red" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {/* Right arrow */}
              <svg className="w-3 h-3 text-brand-red" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Bottom gradient caption */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-10" />
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <span className="font-sans text-white/50 text-xs tracking-wide">← arrastra para comparar →</span>
          </div>
        </div>

        {/* Caption row */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-card px-5 py-3 flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-brand-gray shrink-0" />
            <span className="font-sans text-sm text-brand-gray leading-snug">
              <strong className="text-white">Antes:</strong> Pantalla rota, sin imagen o retroiluminación fallida
            </span>
          </div>
          <div className="glass-card px-5 py-3 flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-brand-red shrink-0" />
            <span className="font-sans text-sm text-brand-gray leading-snug">
              <strong className="text-white">Después:</strong> Imagen perfecta, garantía por escrito incluida
            </span>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
