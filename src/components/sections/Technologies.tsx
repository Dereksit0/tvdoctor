'use client';

import { motion } from 'framer-motion';
import { staggerFast, fadeInUp } from '@/lib/animations';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { TECHNOLOGIES } from '@/lib/constants';

export default function Technologies() {
  return (
    <SectionWrapper dark dotPattern>
      <div className="text-center mb-12">
        <p className="text-brand-red text-xs font-semibold font-sans tracking-[0.25em] uppercase mb-3">
          Compatibilidad total
        </p>
        <h2
          className="font-display text-white uppercase"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          CUALQUIER TECNOLOGÍA,{' '}
          <span className="text-brand-red">UNA SOLUCIÓN</span>
        </h2>
      </div>

      <motion.div
        variants={staggerFast}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="flex flex-wrap justify-center gap-3"
      >
        {TECHNOLOGIES.map((tech) => (
          <motion.span
            key={tech}
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            className="group inline-flex items-center px-4 py-2 rounded-full border border-brand-red/40 text-white text-sm font-sans font-medium cursor-default select-none transition-all duration-200 hover:bg-brand-red hover:border-brand-red hover:text-white"
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
