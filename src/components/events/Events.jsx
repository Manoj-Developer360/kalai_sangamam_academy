import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiPhone, FiExternalLink } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import { SkeletonGrid, ErrorState, EmptyState } from '../common/StateViews';
import { publicService } from '../../services/publicService';

const statusStyles = {
  open: 'bg-brass-500/15 text-brass-400 border-brass-500/30',
  closed: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
  coming_soon: 'bg-maroon-500/15 text-maroon-400 border-maroon-500/30',
};
const statusLabel = { open: 'Open', closed: 'Closed', coming_soon: 'Coming Soon' };

const Events = () => {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    publicService
      .getEvents()
      .then(({ data }) => setEvents(data.data))
      .catch(() => setError(true));
  }, []);

  return (
    <section id="events" className="py-24 lg:py-32">
      <div className="container-xl">
        <SectionHeading eyebrow="Upcoming Events" title="Belt tests, championships and camps" />

        {!events && !error && <SkeletonGrid count={3} className="lg:grid-cols-3" />}
        {error && <ErrorState message="Couldn't load upcoming events right now." />}
        {events && events.length === 0 && <EmptyState message="No upcoming events available." />}

        {events && events.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-6">
            {events.map((e, i) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="card overflow-hidden flex flex-col"
              >
                {e.image_url && <img src={e.image_url} alt={e.title} className="h-40 w-full object-cover" />}
                <div className="p-6 flex flex-col flex-1">
                  <span className={`self-start text-xs px-3 py-1 rounded-full border mb-3 ${statusStyles[e.registration_status] || statusStyles.coming_soon}`}>
                    {statusLabel[e.registration_status] || 'Coming Soon'}
                  </span>
                  <h3 className="font-display text-lg text-parchment-100 mb-2">{e.title}</h3>
                  {e.description && <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{e.description}</p>}

                  <div className="text-xs text-slate-400 space-y-1 mb-4">
                    <p className="flex items-center gap-2"><FiCalendar className="text-brass-500" /> {new Date(e.event_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    {e.last_date && <p>Last date to register: {new Date(e.last_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>}
                    {e.contact_info && <p className="flex items-center gap-2"><FiPhone className="text-brass-500" /> {e.contact_info}</p>}
                  </div>

                  <div className="mt-auto flex items-center gap-3">
                    {e.registration_link && e.registration_status === 'open' && (
                      <a href={e.registration_link} target="_blank" rel="noreferrer" className="btn-primary flex-1 !py-2.5 text-xs">
                        Register <FiExternalLink />
                      </a>
                    )}
                    {e.qr_code_url && (
                      <img src={e.qr_code_url} alt="Registration QR" className="w-12 h-12 rounded-sm border border-parchment-100/10" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
