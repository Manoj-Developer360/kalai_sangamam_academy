import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiCalendar,
  FiMapPin,
  FiPlayCircle,
  FiZap,
  FiShield,
  FiSun,
  FiActivity,
  FiTarget,
  FiBookOpen,
} from "react-icons/fi";
import { publicService } from "../../services/publicService";
import academyImage from "../../assets/images/hero/banner.jpg";

// clipped-corner "premium frame" shape, used for the mobile floating badge only
const FRAME_CLIP =
  "polygon(22px 0, 100% 0, 100% calc(100% - 22px), calc(100% - 22px) 100%, 0 100%, 0 22px)";

// discipline tags with icons — swap for real data from publicService if/when available
const DISCIPLINES = [
  { icon: FiZap, label: "Silambam" },
  { icon: FiShield, label: "Karate" },
  { icon: FiSun, label: "Yoga" },
  { icon: FiActivity, label: "Skating" },
  { icon: FiTarget, label: "Archery" },
  { icon: FiBookOpen, label: "Hindi" },
];

const formatEventDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

const Hero = () => {
  const navigate = useNavigate();
  const [heroEvent, setHeroEvent] = useState(null);
  const [flashNews, setFlashNews] = useState("");

  useEffect(() => {
    publicService
      .getHeroEvent()
      .then(({ data }) => setHeroEvent(data.data || null))
      .catch(() => setHeroEvent(null));

    publicService
      .getSiteSettings()
      .then(({ data }) => {
        const value = data?.data?.flash_news || "";
        setFlashNews(String(value).trim());
      })
      .catch(() => setFlashNews(""));
  }, []);

  const navigateToPrograms = () => {
    navigate("/programs");
  };

  const navigateToContact = () => {
    navigate("/contact");
  };

  return (
    <section
      id="home"
      className="relative pt-24 pb-16 lg:pt-20 lg:pr-12 lg:pb-0 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-brass-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 -right-40 w-[26rem] h-[26rem] bg-maroon-500/10 rounded-full blur-3xl" />
      </div>

      {flashNews && (
        <div className="mb-4 flex justify-center lg:hidden">
          <div className="flex w-full max-w-md items-center gap-3 overflow-hidden rounded-full border border-brass-500/25 bg-ink-900/80 px-3 py-2 shadow-[0_10px_30px_-18px_rgba(224,133,50,0.8)] backdrop-blur-sm sm:max-w-lg">
            <span className="shrink-0 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-brass-500">
              Flash News
            </span>
            <div className="min-w-0 flex-1 overflow-hidden">
              <marquee
                className="text-sm text-parchment-200"
                behavior="scroll"
                direction="left"
                scrollamount="3"
              >
                <span>{flashNews}</span>
              </marquee>
            </div>
          </div>
        </div>
      )}

      <div className="relative lg:min-h-[42rem]">
        {flashNews && (
          <div className="absolute left-1/2 top-0 z-30 hidden w-[min(32rem,calc(100%-3rem))] -translate-x-1/2 items-center gap-3 overflow-hidden rounded-full border border-brass-500/25 bg-ink-900/85 px-4 py-2.5 shadow-[0_10px_30px_-18px_rgba(224,133,50,0.8)] backdrop-blur-md lg:flex">
            <span className="shrink-0 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-brass-500">
              Flash News
            </span>
            <div className="min-w-0 flex-1 overflow-hidden">
              <marquee
                className="text-sm text-parchment-200"
                behavior="scroll"
                direction="left"
                scrollamount="3"
              >
                <span>{flashNews}</span>
              </marquee>
            </div>
          </div>
        )}

        {/* DESKTOP ONLY: full-bleed banner image, flush to the viewport's right edge,
            with the event info floating as an overlay card on top of it */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-y-0 right-0 z-20 hidden w-[58%] overflow-hidden rounded-l-[2.5rem] lg:block"
        >
          <img
            src={academyImage}
            alt="Kalai Sangamam academy"
            className="absolute inset-0 h-full w-full object-cover object-top"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 16%)",
              maskImage: "linear-gradient(to right, transparent, black 16%)",
            }}
          />

          <div className="absolute inset-x-6 bottom-6 z-10 flex items-center justify-between gap-6 rounded-2xl border border-white/10 bg-ink-900/80 p-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.85)] backdrop-blur-md">
            <div className="flex min-w-0 items-center gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-brass-500/30 bg-brass-500/10 text-brass-500">
                <FiCalendar />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-brass-500">
                  {heroEvent ? "Featured Event" : "Flash News"}
                </p>
                <h4 className="mt-1 truncate font-display text-lg leading-tight text-parchment-100">
                  {heroEvent ? heroEvent.title : "No featured event"}
                </h4>
                <p className="mt-1 truncate text-xs text-parchment-300/60">
                  {heroEvent
                    ? `${formatEventDate(heroEvent.event_date) || "Date to be announced"} \u2022 Dindigul`
                    : "Check back soon for upcoming academy updates."}
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                navigate(
                  heroEvent ? `/events#event-${heroEvent.id}` : "/events",
                )
              }
              className="flex shrink-0 items-center gap-2 px-3 py-2 font-display text-sm font-semibold uppercase tracking-wide text-parchment-100 transition-colors hover:text-brass-400"
            >
              View All Events <FiArrowRight className="text-brass-500" />
            </button>
          </div>
        </motion.div>

        <div className="container-xl relative z-10 lg:flex lg:h-full lg:min-h-[42rem] lg:items-center">
          {/* LEFT: hero text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative lg:w-[46%]"
          >
            {/* MOBILE-ONLY floating framed image, sits to the right of the heading */}
            <motion.div
              initial={{ opacity: 0, x: 120, scale: 1.3 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1.3,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute right-5 top-9 z-10 h-28 w-28 sm:h-36 sm:w-32 lg:hidden"
            >
              <div className="relative h-full w-full overflow-hidden rounded-sm">
                {/* Image */}
                <img
                  src={academyImage}
                  alt="Kalai Sangamam academy"
                  className="h-full w-full object-cover"
                  style={{
                    WebkitMaskImage: `
    linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%),
    linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)
  `,
                    WebkitMaskComposite: "source-in",
                    maskImage: `
    linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%),
    linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)
  `,
                    maskComposite: "intersect",
                  }}
                />
              </div>
            </motion.div>

            <p className="eyebrow mb-4 pr-28 sm:pr-36 lg:pr-0">
              Kalai Sangamam &middot; Dindigul
            </p>

            {/* Tamil display heading — negative tracking removed and line-height opened up,
                since Tamil conjuncts/matras clip under tight latin-style leading/tracking */}
            <h1 className="pr-28 sm:pr-36 lg:pr-0 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold leading-[1.25] tracking-wider text-parchment-100">
              Tradition.
              <br />
              <span className="text-brass-400">Discipline.</span>
              <br />
              Champions.
            </h1>

            <p className="mt-3 font-display text-base sm:text-lg font-semibold tracking-wide text-brass-400">
              Where Tradition Builds Champions.
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 text-justify lg:text-lg">
              We blend tradition, disciplined training, and modern excellence to
              build strength, focus, confidence, and character — from Silambam &
              Karate to Yoga, Skating & Archery.
            </p>

            {/* discipline tags with icons */}
            {/* <div className="mt-8 flex flex-wrap gap-x-7 gap-y-4">
              {DISCIPLINES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex w-14 flex-col items-center gap-2 text-center"
                >
                  <span className="grid h-9 w-9 place-items-center border border-brass-500/25 text-brass-500">
                    <Icon className="text-base" />
                  </span>
                  <span className="text-[0.7rem] leading-none text-parchment-300/70">
                    {label}
                  </span>
                </div>
              ))}
            </div> */}

            {/* short Tamil affirmation line, set apart with a brass rule above it */}
            <div className="mt-4 border-t border-brass-500/20 pt-6">
              <p className="font-display text-base sm:text-lg leading-relaxed text-parchment-100">
                கலையை கற்று. ஒழுக்கத்தை வளர்த்து.
                <br className="hidden sm:block" /> உன் வெற்றியை உருவாக்கு.
              </p>
              <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-brass-500/80">
                Kalai Sangamam &mdash; TRAIN. DISCIPLINE. EXCEL.
              </p>
            </div>

            <div className="mt-9 flex flex-nowrap gap-3 sm:gap-4">
              <button
                onClick={navigateToPrograms}
                className="btn-primary flex-1 whitespace-nowrap !px-3 text-xs sm:flex-none sm:!px-6 sm:text-sm"
              >
                Explore Programs <FiArrowRight />
              </button>
              <button
                onClick={navigateToContact}
                className="btn-secondary flex-1 whitespace-nowrap !px-3 text-xs sm:flex-none sm:!px-6 sm:text-sm"
              >
                <FiPlayCircle /> Join a Class
              </button>
            </div>
          </motion.div>

          {/* MOBILE-ONLY event card, kept exactly as-is per your confirmation */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative mt-8 w-full border border-parchment-100/15 bg-ink-800/80 p-6 shadow-[0_24px_90px_-55px_rgba(224,133,50,0.35)] backdrop-blur-sm sm:p-7 lg:hidden"
          >
            <span className="absolute left-0 top-0 h-px w-16 bg-brass-500" />
            {heroEvent ? (
              <>
                <div className="flex items-center justify-between border-b border-parchment-100/10 pb-5">
                  <span className="flex items-center gap-2 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-brass-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-brass-500 shadow-[0_0_12px_rgba(224,133,50,0.8)]" />
                    Featured Event
                  </span>
                  <span className="font-mono text-xs text-parchment-300/50">
                    01
                  </span>
                </div>

                <div className="grid gap-5 py-7 sm:grid-cols-[3.25rem_1fr]">
                  <span className="grid h-12 w-12 place-items-center border border-brass-500/25 text-brass-500">
                    <FiCalendar className="text-lg" />
                  </span>
                  <div>
                    <p className="mb-3 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-parchment-300/55">
                      Upcoming Event
                    </p>
                    <h3 className="font-display text-2xl leading-[1.05] text-parchment-100 lg:text-3xl">
                      {heroEvent.title}
                    </h3>
                    <div className="mt-5 grid gap-2.5 text-sm text-parchment-300/65">
                      <div className="flex items-center gap-2.5">
                        <FiCalendar className="text-brass-500" />
                        <span>
                          {formatEventDate(heroEvent.event_date) ||
                            "Date to be announced"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <FiMapPin className="text-brass-500" />
                        <span>Dindigul</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/events#event-${heroEvent.id}`)}
                  className="w-full flex items-center justify-between border-t border-parchment-100/10 pt-5 font-display text-sm font-semibold uppercase tracking-wide text-parchment-100 transition-colors hover:text-brass-400"
                >
                  <span>View Event</span>
                  <FiArrowRight className="text-brass-500" />
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between border-b border-parchment-100/10 pb-5">
                  <span className="flex items-center gap-2 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-brass-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-brass-500 shadow-[0_0_12px_rgba(224,133,50,0.8)]" />
                    Featured Event
                  </span>
                  <span className="font-mono text-xs text-parchment-300/50">
                    01
                  </span>
                </div>
                <div className="grid gap-5 py-7 sm:grid-cols-[3.25rem_1fr]">
                  <span className="grid h-12 w-12 place-items-center border border-brass-500/25 text-brass-500">
                    <FiCalendar className="text-base" />
                  </span>
                  <div>
                    <p className="mb-3 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-parchment-300/55">
                      Flash News
                    </p>
                    <h3 className="font-display text-2xl leading-[1.05] text-parchment-100 lg:text-3xl">
                      No featured event
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-parchment-300/60">
                      Check back soon for upcoming academy updates.
                    </p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
