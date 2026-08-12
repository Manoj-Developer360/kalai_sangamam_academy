import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiCalendar, FiMapPin, FiPlayCircle } from 'react-icons/fi';
import { publicService } from '../../services/publicService';

const Hero = () => {
  const navigate = useNavigate();
  const [heroEvent, setHeroEvent] = useState(null);
  const [flashNews, setFlashNews] = useState('');

  useEffect(() => {
    publicService
      .getHeroEvent()
      .then(({ data }) => setHeroEvent(data.data || null))
      .catch(() => setHeroEvent(null));

    publicService
      .getSiteSettings()
      .then(({ data }) => {
        const value = data?.data?.flash_news || '';
        setFlashNews(String(value).trim());
      })
      .catch(() => setFlashNews(''));
  }, []);

  const navigateToPrograms = () => {
    navigate('/programs');
  };

  const navigateToContact = () => {
    navigate('/contact');
  };

  return (
    <section id="home" className="relative pt-32 pb-0 lg:pt-37 lg:pb-0 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-brass-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 -right-40 w-[26rem] h-[26rem] bg-maroon-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container-xl grid gap-12 lg:min-h-[calc(100vh-12rem)] lg:grid-cols-[1.35fr_0.9fr] lg:items-stretch">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="lg:self-center">
          

          {flashNews && (
            <div className="mb-6 flex items-center gap-3 overflow-hidden rounded-full border border-brass-500/25 bg-[#130d09]/80 px-3 py-2 shadow-[0_10px_30px_-18px_rgba(224,133,50,0.8)] backdrop-blur-sm ">
              <span className="shrink-0 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-brass-500">
                Flash News
              </span>
              <div className="min-w-0 flex-1 overflow-hidden">
                <marquee className="text-sm text-parchment-200" behavior="scroll" direction="left" scrollamount="3">
                  <span>{flashNews}</span>
                </marquee>
              </div>
            </div>
          )}
<p className="eyebrow mb-4">Kalai Sangamam &middot; Dindigul</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-semibold leading-[0.98] tracking-[-0.03em] text-parchment-100">
            Tradition.<br />
            <span className="text-brass-400">Discipline.</span><br />
            Excellence.
          </h1>
          <p className="mt-6 text-slate-300 text-base lg:text-lg max-w-xl leading-relaxed">
            Kalai Sangamam is dedicated to nurturing the next generation through traditional arts, martial disciplines, physical fitness, and cultural learning. With guidance from experienced masters, we create an environment where students develop confidence, discipline, respect, and excellence both within and beyond the academy.
          </p>
          

          <div className="mt-9 flex flex-wrap gap-4">
            <button onClick={navigateToPrograms} className="btn-primary">
              Explore Programs <FiArrowRight />
            </button>
            <button onClick={navigateToContact} className="btn-secondary">
              <FiPlayCircle /> Join a Class
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative w-full border border-parchment-100/15 bg-[#1b120d]/80 p-6 shadow-[0_24px_90px_-55px_rgba(224,133,50,0.35)] backdrop-blur-sm sm:p-7 lg:mb-8 lg:max-w-md lg:self-end lg:justify-self-end lg:p-8 xl:mb-12"
        >
          <span className="absolute left-0 top-0 h-px w-16 bg-brass-500" />
          {heroEvent ? (
            <>
              <div className="flex items-center justify-between border-b border-parchment-100/10 pb-5">
                <span className="flex items-center gap-2 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-brass-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-brass-500 shadow-[0_0_12px_rgba(224,133,50,0.8)]" />
                  Featured Event
                </span>
                <span className="font-mono text-xs text-parchment-300/50">01</span>
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
                        {heroEvent.event_date
                          ? new Date(heroEvent.event_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
                          : 'Date to be announced'}
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
                <span className="font-mono text-xs text-parchment-300/50">01</span>
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
    </section>
  );
};

export default Hero;
