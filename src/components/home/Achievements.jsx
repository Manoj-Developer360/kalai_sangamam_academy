import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import AnimatedCounter from '../common/AnimatedCounter';
import { SkeletonGrid, ErrorState, EmptyState } from '../common/StateViews';
import { publicService } from '../../services/publicService';

const Achievements = () => {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    publicService
      .getAchievements()
      .then(({ data }) => setItems(data.data))
      .catch(() => setError(true));
  }, []);

  const stats = items?.filter((i) => i.type === 'stat') || [];
  const milestones = (items?.filter((i) => i.type === 'milestone') || []).sort((a, b) => (a.year || 0) - (b.year || 0));

  return (
    <section id="achievements" className="py-10 ">
      <div className="container-xl">
        <SectionHeading eyebrow="Achievements" title="Numbers that reflect real training" />

        {!items && !error && <SkeletonGrid count={4} className="sm:grid-cols-2 lg:grid-cols-4" />}
        {error && <ErrorState message="Couldn't load achievements right now." />}
        {items && items.length === 0 && <EmptyState message="Achievement statistics will be added here soon." />}

        {stats.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 card py-10 px-6">
            {stats.map((s) => (
              <AnimatedCounter key={s.id} value={s.value} label={s.label} />
            ))}
          </div>
        )}

        {milestones.length > 0 && (
          <div className="mt-16 relative pl-6 border-l border-brass-500/30 space-y-8">
            {milestones.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative"
              >
                <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-brass-500" />
                <p className="font-mono text-brass-400 text-sm">{m.year}</p>
                <p className="text-parchment-200 text-sm mt-1">{m.description || m.label}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Achievements;
