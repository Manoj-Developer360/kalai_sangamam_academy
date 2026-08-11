import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiShield, FiUsers, FiCheckSquare } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';

const REASONS = [
  { icon: FiUsers, title: 'Experienced Masters', text: 'Founders, directors and game-wise coaches with years of hands-on training experience.' },
  { icon: FiAward, title: 'Professional Training', text: 'Structured curricula with clear levels, so every student can track real progress.' },
  { icon: FiShield, title: 'Safety Standards', text: 'Supervised sessions and age-appropriate training across every discipline we teach.' },
  { icon: FiCheckSquare, title: 'Certified Programs', text: 'Recognized training pathways from beginner levels through advanced belts and stages.' },
];

const WhyChooseUs = () => (
  <section id="why-us" className="py-24 lg:py-32 bg-ink-900/60">
    <div className="container-xl">
      <SectionHeading eyebrow="Why Choose Us" title="Training that earns your trust" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {REASONS.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="card p-6 hover:border-brass-500/40 transition-colors group"
          >
            <r.icon className="text-brass-500 text-3xl mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-display text-base text-parchment-100 mb-2">{r.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{r.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
