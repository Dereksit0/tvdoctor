'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { PROCESS_STEPS } from '@/lib/constants';

export default function Process() {
  return (
    <SectionWrapper id="garantia" dark dotPattern>
      <div className="text-center mb-14">
        <p className="text-brand-red text-xs font-semibold font-sans tracking-[0.25em] uppercase mb-3">
          Simple y transparente
        </p>
        <h2
          className="font-display text-white uppercase"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          CÓMO <span className="text-brand-red">FUNCIONA</span>
        </h2>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="relative"
      >
        {/* Connector line — desktop only */}
        <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-brand-red/20 z-0" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              variants={fadeInUp}
              className="relative z-10 flex flex-col items-center text-center lg:items-center"
            >
              {/* Vertical line for mobile */}
              {index < PROCESS_STEPS.length - 1 && (
                <div className="lg:hidden absolute top-16 left-1/2 -translate-x-1/2 w-px h-[calc(100%+2rem)] bg-brand-red/20 z-0" />
              )}

              {/* Number circle */}
              <div className="relative z-10 w-16 h-16 rounded-full border-2 border-brand-red bg-brand-dark flex items-center justify-center mb-4 shadow-lg shadow-brand-red/20">
                <span className="font-display text-2xl text-brand-red">
                  {step.number}
                </span>
              </div>

              <h3 className="font-sans font-semibold text-white text-base mb-2">
                {step.title}
              </h3>
              <p className="font-sans font-light text-brand-gray text-sm leading-relaxed max-w-[200px]">
                {step.description}
              </p>

              {/* Special badge on step 4 */}
              {index === 3 && (
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, type: 'spring', stiffness: 260 }}
                  className="mt-3 inline-flex items-center gap-1 bg-brand-red text-white text-xs font-semibold font-sans px-3 py-1.5 rounded-full tracking-wide"
                >
                  🛡 3–6 MESES DE GARANTÍA
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
