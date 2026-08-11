import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCalendar, FiPlayCircle } from 'react-icons/fi';
import { publicService } from '../../services/publicService';

const statusStyles = {
  open: 'bg-brass-500/15 text-brass-400 border-brass-500/30',
  closed: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
  coming_soon: 'bg-maroon-500/15 text-maroon-400 border-maroon-500/30',
};
const statusLabel = { open: 'Registration Open', closed: 'Registration Closed', coming_soon: 'Coming Soon' };

const Hero = () => {
  const [announcement, setAnnouncement] = useState(null);

  useEffect(() => {
    publicService
      .getHeroAnnouncement()
      .then(({ data }) => setAnnouncement(data.data))
      .catch(() => setAnnouncement(null));
  }, []);

  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Ambient backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-[30rem] h-[30rem] bg-brass-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 -right-40 w-[26rem] h-[26rem] bg-maroon-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container-xl grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow mb-4">Kalai Sangamam &middot; Dindigul</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold leading-[1.1] text-parchment-100">
            Where tradition <span className="text-brass-500">strikes</span><br />
            discipline into shape.
          </h1>
          <p className="mt-6 text-slate-400 text-base lg:text-lg max-w-xl leading-relaxed">
            A Dindigul academy training students in Silambam, Karate, Yoga, Skating, Archery and Hindi —
            guided by experienced masters across 15+ schools, built on safety, structure and steady progress.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#programs" className="btn-primary">
              Explore Programs <FiArrowRight />
            </a>
            <a href="#about" className="btn-secondary">
              <FiPlayCircle /> About the Academy
            </a>
          </div>

          <div className="stick-divider mt-14 max-w-md" />
        </motion.div>

        {/* Announcement card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="card p-6 lg:p-7"
        >
          {announcement ? (
            <>
              <p className="eyebrow mb-3">Flash News</p>
              {announcement.image_url && (
                <img
                  src={announcement.image_url}
                  alt={announcement.title}
                  className="w-full h-36 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="font-display text-lg text-parchment-100 mb-2">{announcement.title}</h3>
              {announcement.description && (
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{announcement.description}</p>
              )}
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                <FiCalendar className="text-brass-500" />
                {announcement.event_date
                  ? new Date(announcement.event_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                  : 'Date to be announced'}
              </div>
              <span className={`inline-block text-xs px-3 py-1 rounded-full border mb-4 ${statusStyles[announcement.registration_status] || statusStyles.coming_soon}`}>
                {statusLabel[announcement.registration_status] || 'Coming Soon'}
              </span>
              {announcement.registration_link && (
                <a href={announcement.registration_link} target="_blank" rel="noreferrer" className="btn-primary w-full">
                  Register Now
                </a>
              )}
            </>
          ) : (
            <div className="py-10 text-center">
              <p className="eyebrow mb-2">Flash News</p>
              <p className="text-slate-500 text-sm">No announcements at the moment. Check back soon.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
