import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import { SkeletonGrid, ErrorState, EmptyState } from '../common/StateViews';
import { publicService } from '../../services/publicService';

const isFounder = (master) => master.role?.trim().toLowerCase().includes('founder');
const isLeadership = (master) => /founder|director|head\s*coach/i.test(master.role || '');

const leadershipPriority = (master) => {
  const role = master.role?.toLowerCase() || '';
  if (role.includes('founder')) return 0;
  if (role.includes('director')) return 1;
  if (/head\s*coach/.test(role)) return 2;
  return 3;
};

const initials = (name = '') => name
  .split(/\s+/)
  .filter(Boolean)
  .slice(0, 2)
  .map((part) => part[0])
  .join('')
  .toUpperCase();

const MasterCard = ({ master, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45, delay: index * 0.06 }}
    className="overflow-hidden rounded-2xl border border-parchment-100/20 bg-[#17110d] shadow-[0_18px_55px_-30px_rgba(0,0,0,0.95)]"
  >
    <div className="aspect-[1.08/1] bg-gradient-to-br from-[#3a2b23] via-[#211814] to-[#100d0b] flex items-center justify-center overflow-hidden">
      {master.photo_url ? (
        <img src={master.photo_url} alt={master.name} className="w-full h-full object-cover" />
      ) : (
        <span className="font-display text-5xl sm:text-6xl text-[#f5d383]">{initials(master.name)}</span>
      )}
    </div>
    <div className="p-6 sm:p-7 text-left">
      <h3 className="font-display text-2xl text-parchment-100 leading-tight">{master.name}</h3>
      <p className="text-brass-400 text-xs font-bold uppercase tracking-[0.12em] mt-2">{master.role}</p>
      {(master.specialization || master.experience_years) && <div className="my-5 border-t border-parchment-100/15" />}
      <div className="space-y-4 text-sm">
        {master.specialization && (
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wide">Specialization</p>
            <p className="text-parchment-100 mt-1">{master.specialization}</p>
          </div>
        )}
        {master.experience_years && (
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wide">Experience</p>
            <p className="text-parchment-100 mt-1">{master.experience_years} years</p>
          </div>
        )}
      </div>
    </div>
  </motion.article>
);

const MasterGrid = ({ masters }) => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
    {masters.map((master, index) => <MasterCard key={master.id} master={master} index={index} />)}
  </div>
);

const Masters = ({ limit, showViewAll = false, pageView = false }) => {
  const [masters, setMasters] = useState(null);
  const [error, setError] = useState(false);
  const [activeDiscipline, setActiveDiscipline] = useState('All');

  useEffect(() => {
    publicService
      .getMasters()
      .then(({ data }) => setMasters(data.data))
      .catch(() => setError(true));
  }, []);

  const adminOrderedMasters = masters
    ? [...masters].sort((a, b) => Number(a.display_order) - Number(b.display_order))
    : [];
  // The home preview features founders first; the full page retains the Admin order.
  const homeMasters = [...adminOrderedMasters].sort((a, b) => (
    Number(isFounder(b)) - Number(isFounder(a)) || Number(a.display_order) - Number(b.display_order)
  )).slice(0, limit || adminOrderedMasters.length);

  const leadership = adminOrderedMasters
    .filter(isLeadership)
    .sort((a, b) => leadershipPriority(a) - leadershipPriority(b) || Number(a.display_order) - Number(b.display_order))
    .slice(0, 3);
  const coaches = adminOrderedMasters.filter((master) => !isLeadership(master));
  const disciplines = [...new Set(coaches.map((master) => master.specialization?.trim()).filter(Boolean))];
  const visibleCoaches = activeDiscipline === 'All'
    ? coaches
    : coaches.filter((master) => master.specialization?.trim() === activeDiscipline);

  const isLoading = !masters && !error;
  const hasNoMasters = masters && masters.length === 0;

  if (pageView) {
    return (
      <section id="masters" className="py-12 sm:py-16">
        <div className="container-xl">
          <header className="max-w-3xl mx-auto text-center mb-16">
            <p className="eyebrow mb-3">Our Masters</p>
            <h1 className="section-heading">Our Masters</h1>
            <p className="mt-5 text-brass-400 font-display text-xl sm:text-2xl">Trained under decorated coaches and national-level competitors</p>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">Each master brings years of competitive and teaching experience across their discipline.</p>
          </header>

          {isLoading && <SkeletonGrid count={6} className="sm:grid-cols-2 lg:grid-cols-3" />}
          {error && <ErrorState message="Couldn't load master profiles right now." />}
          {hasNoMasters && <EmptyState message="Master profiles will appear here soon." />}

          {masters?.length > 0 && (
            <div className="space-y-16">
              {leadership.length > 0 && (
                <section>
                  <div className="text-center mb-12">
                    <h2 className="section-heading">Leadership</h2>
                    <p className="mt-3 text-brass-400 font-display text-lg">Common Leadership</p>
                  </div>
                  <MasterGrid masters={leadership} />
                </section>
              )}

              {coaches.length > 0 && (
                <section>
                  <div className="text-center mb-12">
                    <h2 className="section-heading">Programme Coaches</h2>
                    <p className="mt-3 text-brass-400 font-display text-lg">Game-wise Masters</p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {['All', ...disciplines].map((discipline) => (
                      <button
                        key={discipline}
                        type="button"
                        onClick={() => setActiveDiscipline(discipline)}
                        className={`px-4 py-2 rounded-full border text-xs font-semibold uppercase tracking-wide transition-colors ${activeDiscipline === discipline ? 'bg-brass-500 border-brass-500 text-ink-950' : 'border-parchment-100/15 text-slate-300 hover:border-brass-400 hover:text-brass-400'}`}
                      >
                        {discipline}
                      </button>
                    ))}
                  </div>
                  {visibleCoaches.length > 0 ? <MasterGrid masters={visibleCoaches} /> : <EmptyState message="No masters are listed for this discipline yet." />}
                </section>
              )}
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section id="masters" className="py-10">
      <div className="container-xl">
        <SectionHeading
          eyebrow="Our Masters"
          title="The people behind the discipline"
          subtitle="Our founder, directors and masters bring experience, discipline and care to every training session."
        />

        {isLoading && <SkeletonGrid count={limit || 4} className="sm:grid-cols-2 lg:grid-cols-3" />}
        {error && <ErrorState message="Couldn't load master profiles right now." />}
        {hasNoMasters && <EmptyState message="Master profiles will appear here soon." />}

        {homeMasters.length > 0 && (
          <>
            <MasterGrid masters={homeMasters} />
            {showViewAll && (
              <div className="mt-9 text-center">
                <Link to="/masters" className="btn-secondary">
                  Meet Our Masters <FiArrowRight />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Masters;
