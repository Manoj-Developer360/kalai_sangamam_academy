import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import { SkeletonGrid, ErrorState, EmptyState } from '../common/StateViews';
import { publicService } from '../../services/publicService';

// Program media lives in frontend assets — replace these files directly,
// no Cloudinary or backend involvement needed for this section.
// Place images at: frontend/src/assets/images/programs/<slug>.jpg
const programImage = (slug) => new URL(`../../assets/images/programs/${slug}.jpg`, import.meta.url).href;

const Programs = () => {
  const [programs, setPrograms] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    publicService
      .getPrograms()
      .then(({ data }) => setPrograms(data.data))
      .catch(() => setError(true));
  }, []);

  return (
    <section id="programs" className="py-24 lg:py-32">
      <div className="container-xl">
        <SectionHeading
          eyebrow="Our Training Programs"
          title="Six disciplines, one standard of excellence"
          subtitle="Silambam, Karate, Yoga, Skating, Archery and Hindi — each with a structured path from introduction to advanced levels."
        />

        {!programs && !error && <SkeletonGrid count={6} className="sm:grid-cols-2 lg:grid-cols-3" />}
        {error && <ErrorState message="Couldn't load training programs right now." />}
        {programs && programs.length === 0 && <EmptyState message="Programs will be listed here soon." />}

        {programs && programs.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="card overflow-hidden group"
              >
                <div className="h-44 overflow-hidden bg-ink-700">
                  <img
                    src={programImage(p.slug)}
                    alt={p.name}
                    onError={(e) => { e.currentTarget.style.opacity = 0; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-parchment-100 mb-2">{p.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{p.introduction}</p>
                  {p.levels?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.levels.map((lvl) => (
                        <span key={lvl} className="text-[11px] px-2.5 py-1 rounded-full bg-brass-500/10 text-brass-400 border border-brass-500/20">
                          {lvl}
                        </span>
                      ))}
                    </div>
                  )}
                  <a href={`#contact`} className="inline-flex items-center gap-1 text-sm text-brass-400 hover:gap-2 transition-all">
                    Enquire <FiArrowRight />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Programs;
