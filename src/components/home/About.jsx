import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiTarget, FiCompass, FiHeart, FiArrowRight } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';

// TODO: Replace with your existing academy image asset/constant if one already
// exists in the project (e.g. from `src/assets/images/...` or a shared constants file).
import academyImage from '../../assets/images/about-academy.jpg';

const EXPERIENCE = '10+';

const VALUES = [
  {
    icon: FiCompass,
    title: 'Discipline',
    text: 'Build focus, consistency, respect and self-control through structured training.',
  },
  {
    icon: FiTarget,
    title: 'Excellence',
    text: 'Encourage students to continuously improve their skills and perform with confidence.',
  },
  {
    icon: FiHeart,
    title: 'Heritage',
    text: 'Preserve traditional martial arts and cultural values for the next generation.',
  },
];

const About = () => (
  <section id="about" className="py-16 sm:py-20 lg:py-24">
    <div className="container-xl">
      <SectionHeading
        eyebrow="About Kalai Sangamam"
        title="Rooted in Tradition. Built for Tomorrow."
        align="center"
      />

      <div className="mt-10 lg:mt-12 grid lg:grid-cols-[45%_55%] gap-10 sm:gap-12 lg:gap-16 items-center">
        {/* LEFT — IMAGE (medium, capped size) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md"
        >
          <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl border border-brass-500/25 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.7)]">
            <img
              src={academyImage}
              alt="Kalai Sangamam Academy training session"
              className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
            {/* subtle overlay for depth */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
          </div>

          {/* Experience Badge */}
          <div className="absolute -bottom-4 right-3 sm:-bottom-5 sm:right-5 flex flex-col items-center justify-center rounded-xl border border-brass-500/40 bg-ink-950/90 px-3.5 py-2.5 sm:px-5 sm:py-4 text-center shadow-[0_15px_35px_-15px_rgba(224,133,50,0.6)] backdrop-blur-sm">
            <span className="font-display text-xl sm:text-3xl leading-none text-brass-500">
              {EXPERIENCE}
            </span>
            <span className="mt-1 font-mono text-[0.55rem] sm:text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-parchment-100">
              Years
            </span>
            <span className="font-mono text-[0.5rem] sm:text-[0.6rem] uppercase tracking-[0.14em] text-parchment-200">
              of Excellence
            </span>
          </div>
        </motion.div>

        {/* RIGHT — CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-8 lg:mt-0 text-justify lg:text-left"
        >
          <p className="text-slate-400 leading-relaxed text-base lg:text-lg max-w-xl mx-auto lg:mx-0">
            Kalai Sangamam began as a small Silambam circle in Dindigul and grew
            into a multi-discipline academy offering Silambam, Karate, Yoga,
            Skating, Archery, and Hindi. Every session builds discipline,
            fitness, and confidence — preparing students for real skill and
            competition, not just attendance.
          </p>

          {/* CORE VALUES */}
          <div className="mt-8 grid gap-5 sm:grid-cols-3 sm:gap-4 text-left">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.1 }}
                className="group border-t border-brass-500/20 pt-4 transition-colors duration-300 hover:border-brass-500/50"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs text-brass-500">
                    0{i + 1}
                  </span>
                  <v.icon className="text-brass-500 text-base" />
                  <h3 className="font-display text-base text-parchment-100">
                    {v.title}
                  </h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {v.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 flex justify-center lg:justify-start">
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-brass-500 transition-colors duration-300 hover:text-brass-400"
            >
              View Full Story
              <FiArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default About;