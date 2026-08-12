import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiTarget, FiCompass, FiHeart, FiArrowRight } from "react-icons/fi";

import SectionHeading from "../common/SectionHeading";

// Replace this with your actual existing image asset if needed.
import academyImage from "../../assets/images/about-academy.jpg";

const EXPERIENCE = "10+";

const VALUES = [
  {
    icon: FiCompass,
    title: "Discipline",
    text: "Build focus, consistency, respect and self-control through structured training.",
  },
  {
    icon: FiTarget,
    title: "Excellence",
    text: "Encourage students to continuously improve their skills and perform with confidence.",
  },
  {
    icon: FiHeart,
    title: "Heritage",
    text: "Preserve traditional martial arts and cultural values for the next generation.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24">
      <div className="container-xl">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="About Kalai Sangamam"
          title="Rooted in Tradition. Built for Tomorrow."
          align="center"
        />

        {/* Main About Layout */}
        <div className="mt-10 grid items-center gap-10 sm:gap-12 lg:mt-12 lg:grid-cols-[45%_55%] lg:gap-16">
          {/* =====================================================
              LEFT — IMAGE
          ====================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md"
          >
            {/* Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-brass-500/25 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.7)]">
              <img
                src={academyImage}
                alt="Kalai Sangamam Academy training session"
                className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />

              {/* Image Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
            </div>

            {/* Experience Badge */}
            <div className="absolute -bottom-4 right-3 flex flex-col items-center justify-center rounded-xl border border-brass-500/40 bg-ink-950/90 px-3.5 py-2.5 text-center shadow-[0_15px_35px_-15px_rgba(224,133,50,0.6)] backdrop-blur-sm sm:-bottom-5 sm:right-5 sm:px-5 sm:py-4">
              <span className="font-display text-xl leading-none text-brass-500 sm:text-3xl">
                {EXPERIENCE}
              </span>

              <span className="mt-1 font-mono text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-parchment-100 sm:text-[0.65rem]">
                Years
              </span>

              <span className="font-mono text-[0.5rem] uppercase tracking-[0.14em] text-parchment-200 sm:text-[0.6rem]">
                of Excellence
              </span>
            </div>
          </motion.div>

          {/* =====================================================
              RIGHT — ABOUT CONTENT
          ====================================================== */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.1,
            }}
            className="text-justify lg:text-left"
          >
            {/* Small Tagline */}
            <p className="eyebrow mb-3">Our Story</p>

            {/* Main Heading */}
            <h2 className="font-display text-3xl font-semibold tracking-tight text-parchment-100 sm:text-4xl lg:text-5xl">
              Rooted in Tradition.
              <br />
              <span className="text-brass-500">Built for Tomorrow.</span>
            </h2>

            {/* Short About */}
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 lg:text-lg">
              Kalai Sangamam began as a small Silambam circle in Dindigul and
              grew into a multi-discipline academy offering Silambam, Karate,
              Yoga, Skating, Archery, and Hindi. Every session builds
              discipline, fitness, and confidence — preparing students for real
              skill and competition, not just attendance.
            </p>

            {/* =================================================
                CORE VALUES
            ================================================== */}
            <div className="mt-7 grid gap-4">
              {VALUES.map((value, index) => {
                const Icon = value.icon;

                return (
                  <motion.div
                    key={value.title}
                    initial={{
                      opacity: 0,
                      x: 15,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.08,
                    }}
                    className="group flex gap-4 border-l-2 border-brass-500/30 pl-4 transition-colors duration-300 hover:border-brass-500"
                  >
                    {/* Icon */}
                    <div className="mt-1 shrink-0">
                      <Icon className="text-xl text-brass-500 transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="font-display text-lg text-parchment-100">
                        {value.title}
                      </h3>

                      <p className="mt-1 text-sm leading-relaxed text-slate-400">
                        {value.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* =================================================
                CTA
            ================================================== */}
            <div className="mt-8 flex justify-center lg:justify-start">
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brass-500 transition-colors duration-300 hover:text-brass-400 sm:text-sm"
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
};

export default About;
