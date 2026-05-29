'use client';

import { motion } from 'framer-motion';
import { slideInLeft, slideInRight } from '@/lib/animations';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { PHONE, PHONE_HREF, WA_GENERIC, MAPS_URL, MAPS_EMBED } from '@/lib/constants';

export default function Contact() {
  return (
    <SectionWrapper id="contacto">
      <div className="text-center mb-14">
        <p className="text-brand-red text-xs font-semibold font-sans tracking-[0.25em] uppercase mb-3">
          Estamos cerca de ti
        </p>
        <h2
          className="font-display text-white uppercase"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          ENCUÉNTRANOS
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Left column */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col gap-6"
        >
          {/* Schedule */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-5 h-5 text-brand-red shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-sans font-semibold text-white text-sm tracking-wide uppercase">
                Horario de atención
              </h3>
            </div>
            <div className="space-y-2 font-sans text-sm">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-brand-gray">Lunes a Viernes</span>
                <span className="text-white font-medium">9:00 AM – 6:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-brand-gray">Sábado</span>
                <span className="text-white font-medium">9:00 AM – 3:00 PM</span>
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div className="glass-card p-6 space-y-4">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-brand-red/10 border border-brand-red/30 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-brand-red" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-brand-gray font-sans uppercase tracking-wide mb-0.5">Teléfono</p>
                <p className="text-white font-semibold font-sans group-hover:text-brand-red-light transition-colors">
                  {PHONE}
                </p>
              </div>
            </a>

            <a
              href={WA_GENERIC}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="#25D366" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-brand-gray font-sans uppercase tracking-wide mb-0.5">WhatsApp</p>
                <p className="text-white font-semibold font-sans group-hover:text-[#25D366] transition-colors">
                  {PHONE}
                </p>
              </div>
            </a>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-red/10 border border-brand-red/30 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-brand-red" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-brand-gray font-sans uppercase tracking-wide mb-0.5">Zona de servicio</p>
                <p className="text-white font-semibold font-sans text-sm">Puebla y zona metropolitana</p>
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-semibold font-sans px-5 py-3 rounded-lg text-sm btn-glow min-h-[44px]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              Abrir en Google Maps
            </a>
            <a
              href={WA_GENERIC}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-transparent border border-white/30 hover:border-white hover:bg-white/5 text-white font-semibold font-sans px-5 py-3 rounded-lg text-sm transition-all duration-200 min-h-[44px]"
            >
              Enviar WhatsApp
            </a>
          </div>
        </motion.div>

        {/* Right column — map */}
        <motion.div
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="rounded-xl overflow-hidden"
          style={{ border: '1px solid rgba(185,18,44,0.3)' }}
        >
          <iframe
            src={MAPS_EMBED}
            width="100%"
            className="h-[260px] sm:h-[400px] w-full block"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de TV Doctor en Puebla"
          />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
