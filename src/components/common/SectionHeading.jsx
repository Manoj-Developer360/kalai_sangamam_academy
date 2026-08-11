import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({ eyebrow, title, subtitle, align = 'center' }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.5 }}
    className={`max-w-2xl mb-12 ${align === 'center' ? 'mx-auto text-center' : ''}`}
  >
    {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
    <h2 className="section-heading bg-clip-text text-transparent bg-gradient-to-r from-brass-400 via-parchment-100 to-brass-400">{title}</h2>
    {subtitle && <p className="mt-4 text-slate-300 text-base leading-relaxed">{subtitle}</p>}
  </motion.div>
);

export default SectionHeading;
