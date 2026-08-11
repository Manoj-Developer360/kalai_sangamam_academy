import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiCompass, FiHeart } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';

const VALUES = [
  { icon: FiCompass, title: 'Our Vision', text: 'To make traditional and modern discipline accessible to every student in Dindigul, one school at a time.' },
  { icon: FiTarget, title: 'Our Mission', text: 'To train confident, disciplined, and physically capable students through structured, safety-first coaching.' },
  { icon: FiHeart, title: 'Core Values', text: 'Respect for tradition, discipline in practice, and steady, honest progress over shortcuts.' },
];

const About = () => (
  <section id="about" className="py-24 lg:py-32">
    <div className="container-xl">
      <SectionHeading eyebrow="About Us" title="Rooted in tradition, built for today" align="left" />

      <div className="grid lg:grid-cols-2 gap-14 items-start">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-slate-400 leading-relaxed text-base lg:text-lg"
        >
          Kalai Sangamam began as a small Silambam circle in Dindigul and grew into a multi-discipline academy
          spanning martial arts, wellness, and language training. Today, our masters carry that same founding
          discipline into every session — across 15+ partner schools — for students who want to build real
          skill, not just attend a class.
        </motion.p>

        <div className="grid sm:grid-cols-1 gap-5">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="card p-6 flex gap-4"
            >
              <v.icon className="text-brass-500 text-2xl shrink-0 mt-1" />
              <div>
                <h3 className="font-display text-lg text-parchment-100 mb-1">{v.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{v.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
