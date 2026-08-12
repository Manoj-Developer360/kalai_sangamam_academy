import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import { SkeletonGrid, ErrorState, EmptyState } from '../common/StateViews';
import { publicService } from '../../services/publicService';

const Masters = () => {
  const [masters, setMasters] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Backend already returns rows ORDER BY display_order ASC
    publicService
      .getMasters()
      .then(({ data }) => setMasters(data.data))
      .catch(() => setError(true));
  }, []);

  return (
    <section id="masters" className="py-10">
      <div className="container-xl">
        <SectionHeading eyebrow="Masters" title="The people behind the discipline" />

        {!masters && !error && <SkeletonGrid count={4} className="sm:grid-cols-2 lg:grid-cols-4" />}
        {error && <ErrorState message="Couldn't load master profiles right now." />}
        {masters && masters.length === 0 && <EmptyState message="Master profiles will appear here soon." />}

        {masters && masters.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {masters.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="card overflow-hidden text-center"
              >
                <div className="h-56 bg-ink-700 flex items-center justify-center">
                  {m.photo_url ? (
                    <img src={m.photo_url} alt={m.name} className="w-full h-full object-cover" />
                  ) : (
                    <FiUser className="text-5xl text-slate-600" />
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg text-parchment-100">{m.name}</h3>
                  <p className="text-brass-400 text-xs uppercase tracking-wide mt-1">{m.role}</p>
                  {m.specialization && <p className="text-slate-400 text-xs mt-1">{m.specialization}</p>}
                  {m.experience_years && (
                    <p className="text-slate-500 text-xs mt-2">{m.experience_years}+ years experience</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Masters;
