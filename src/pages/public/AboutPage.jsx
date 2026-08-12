import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiCompass,
  FiTarget,
  FiHeart,
  FiUsers,
  FiShield,
  FiCheckCircle,
  FiAward,
  FiLayers,
  FiTrendingUp,
  FiUserCheck,
  FiBookOpen,
  FiActivity,
  FiFlag,
  FiStar,
  FiArrowRight,
  FiMapPin,
} from "react-icons/fi";
import PublicLayout from "../../layouts/PublicLayout.jsx";
import SectionHeading from "../../components/common/SectionHeading";
import academyImage from "../../assets/images/about-academy.jpg";

// ---------- DATA ----------

const EXPERIENCE = "10+";

const STORY_POINTS = [
  {
    icon: FiCompass,
    title: "Beginnings in Silambam",
    text: "Kalai Sangamam started as a small Silambam circle in Dindigul, teaching the traditional South Indian art of stick fighting with a focus on discipline and technique.",
  },
  {
    icon: FiUsers,
    title: "Growth Into Multiple Disciplines",
    text: "As interest grew, the academy expanded to offer Karate, Yoga, Skating, Archery and Hindi — building a well-rounded, multi-discipline training environment.",
  },
  {
    icon: FiAward,
    title: "Structured, Safety-First Training",
    text: "Every discipline is taught through structured, safety-first coaching led by experienced Masters, helping students build real, lasting skill.",
  },
  {
    icon: FiMapPin,
    title: "Training Across Schools",
    text: "Today, our Masters carry the same founding discipline into partner schools and institutions, bringing traditional and modern training to more students.",
  },
];

const VISION_MISSION = [
  {
    icon: FiCompass,
    title: "Our Vision",
    text: "To make traditional and modern disciplines accessible to every student, building confident, disciplined and capable individuals while preserving cultural heritage.",
  },
  {
    icon: FiTarget,
    title: "Our Mission",
    text: "To provide structured, safe and professional training that develops physical ability, discipline, confidence, teamwork and competitive skill.",
  },
];

const CORE_VALUES = [
  {
    icon: FiCompass,
    title: "Discipline",
    text: "Building consistency, focus, self-control and respect through regular practice.",
  },
  {
    icon: FiTarget,
    title: "Excellence",
    text: "Encouraging students to improve continuously and pursue their personal best.",
  },
  {
    icon: FiHeart,
    title: "Heritage",
    text: "Preserving traditional martial arts and cultural values for future generations.",
  },
  {
    icon: FiUsers,
    title: "Respect",
    text: "Teaching students to respect their Masters, teammates, opponents and community.",
  },
  {
    icon: FiShield,
    title: "Confidence",
    text: "Helping students develop courage, self-belief and the ability to face challenges.",
  },
  {
    icon: FiCheckCircle,
    title: "Integrity",
    text: "Encouraging honesty, responsibility and good character both inside and outside training.",
  },
];

const STRENGTHS = [
  { icon: FiAward, title: "Experienced Masters" },
  { icon: FiLayers, title: "Structured Training" },
  { icon: FiFlag, title: "Multiple Disciplines" },
  { icon: FiTrendingUp, title: "Competition Preparation" },
  { icon: FiUserCheck, title: "Student-Focused Coaching" },
  { icon: FiBookOpen, title: "Traditional Values" },
  { icon: FiActivity, title: "Fitness & Wellness" },
  { icon: FiStar, title: "Character Development" },
];

const PHILOSOPHY_POINTS = [
  { icon: FiCompass, label: "Discipline" },
  { icon: FiShield, label: "Confidence" },
  { icon: FiHeart, label: "Respect" },
  { icon: FiActivity, label: "Fitness" },
  { icon: FiUsers, label: "Teamwork" },
  { icon: FiBookOpen, label: "Cultural Awareness" },
];

// ---------- PAGE ----------

const AboutPage = () => (
  <PublicLayout>
    <div className="pt-20 lg:pt-24">

      {/* PAGE INTRO */}
      <div className="container-xl text-center">
        <SectionHeading
          eyebrow="About Kalai Sangamam"
          title="Rooted in Tradition. Built for the Future."
          align="center"
        />
        <p className="mt-4 max-w-2xl mx-auto text-slate-400 leading-relaxed text-base lg:text-lg">
          Discover the journey, values and vision behind Kalai Sangamam Academy.
        </p>
      </div>

      {/* HERO: IMAGE + INTRO */}
      <div className="container-xl mt-10 lg:mt-14 grid lg:grid-cols-[45%_55%] gap-10 sm:gap-12 lg:gap-16 items-center">

        {/* LEFT — IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md"
        >
          <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl border border-brass-500/25 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.7)]">
            <img
              src={academyImage}
              alt="Kalai Sangamam Academy training session"
              className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
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

        {/* RIGHT — ABOUT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="text-left"
        >
          <p className="eyebrow mb-3">About Kalai Sangamam</p>

          <h2 className="section-heading mb-5">
            Rooted in Tradition.
            <br />
            Built for Tomorrow.
          </h2>

          <p className="text-slate-400 leading-relaxed text-base lg:text-lg max-w-xl">
            Kalai Sangamam began as a small Silambam circle in Dindigul and grew
            into a multi-discipline academy offering Silambam, Karate, Yoga,
            Skating, Archery, and Hindi. Every session builds discipline, fitness,
            and confidence — preparing students for real skill and competition,
            not just attendance.
          </p>

          <Link
            to="/contact"
            className="btn-primary group mt-7 inline-flex items-center gap-2"
          >
            Get In Touch
            <FiArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* OUR JOURNEY / STORY TIMELINE */}
      <section className="py-14 sm:py-18 lg:py-24">
        <div className="container-xl">
          <SectionHeading
            eyebrow="How We Got Here"
            title="Our Journey"
            align="left"
          />

          <div className="mt-10 lg:mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STORY_POINTS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card relative p-6 sm:p-7 h-full"
              >
                <span className="font-mono text-xs text-brass-500/70">
                  Step 0{i + 1}
                </span>
                <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-full border border-brass-500/30 bg-[#130d09]/60">
                  <s.icon className="text-brass-500 text-lg" />
                </div>
                <h3 className="mt-4 font-display text-lg text-parchment-100 leading-snug">
                  {s.title}
                </h3>
                <p className="mt-2 text-slate-400 text-sm leading-relaxed">
                  {s.text}
                </p>

                {/* connector line for desktop */}
                {i < STORY_POINTS.length - 1 && (
                  <span className="hidden lg:block absolute top-[52px] -right-3 h-px w-6 bg-brass-500/25" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="py-14 sm:py-18 lg:py-24">
        <div className="container-xl">
          <SectionHeading
            eyebrow="Guiding Principles"
            title="Vision & Mission"
            align="left"
          />

          <div className="mt-10 lg:mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
            {VISION_MISSION.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card p-7 sm:p-9 lg:p-10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brass-500/30 bg-[#130d09]/60 mb-5">
                  <item.icon className="text-brass-500 text-xl" />
                </div>
                <h3 className="font-display text-xl lg:text-2xl text-parchment-100 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-14 sm:py-18 lg:py-24 border-t border-parchment-100/5">
        <div className="container-xl">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Values That Shape Every Student"
            align="left"
          />

          <div className="mt-10 lg:mt-12 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
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
        </div>
      </section>

      {/* TRAINING PHILOSOPHY */}
      <section className="py-14 sm:py-18 lg:py-24 border-t border-parchment-100/5">
        <div className="container-xl">
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow="Our Approach"
              title="More Than Training"
              align="left"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-4 text-slate-400 leading-relaxed"
            >
              At Kalai Sangamam, training goes beyond physical skill. Every
              class is built to develop discipline, mental strength and
              character alongside technique — shaping students who carry these
              values well beyond the training hall.
            </motion.p>
          </div>

          <div className="mt-8 lg:mt-10 flex flex-wrap gap-2.5 sm:gap-3">
            {PHILOSOPHY_POINTS.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-center gap-2 rounded-full border border-brass-500/25 bg-[#130d09]/60 px-3.5 py-2 sm:px-4"
              >
                <p.icon className="text-brass-500 text-sm shrink-0" />
                <span className="text-xs sm:text-sm text-parchment-200 whitespace-nowrap">
                  {p.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GET IN TOUCH CTA */}
      <section className="py-14 sm:py-18 lg:py-24">
        <div className="container-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card flex flex-col items-center gap-5 px-6 py-12 sm:py-14 text-center sm:px-10 lg:px-16 border border-brass-500/20"
          >
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-parchment-100 max-w-xl">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-slate-400 max-w-md leading-relaxed text-sm sm:text-base">
              Take the first step towards discipline, confidence and skill with
              Kalai Sangamam Academy.
            </p>
            <Link
              to="/contact"
              className="btn-primary group mt-2 inline-flex items-center gap-2"
            >
              Get In Touch
              <FiArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  </PublicLayout>
);

export default AboutPage;