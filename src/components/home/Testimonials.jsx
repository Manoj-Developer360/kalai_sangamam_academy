import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiUser } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import { SkeletonGrid, ErrorState, EmptyState } from '../common/StateViews';
import { publicService } from '../../services/publicService';

const Testimonials = () => {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    publicService
      .getTestimonials()
      .then(({ data }) => setItems(data.data))
      .catch(() => setError(true));
  }, []);

  const next = () => setIndex((i) => (i + 1) % items.length);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-ink-900/60">
      <div className="container-xl">
        <SectionHeading eyebrow="Testimonials" title="Words from our students" />

        {!items && !error && <SkeletonGrid count={1} className="max-w-2xl mx-auto" />}
        {error && <ErrorState message="Couldn't load testimonials right now." />}
        {items && items.length === 0 && <EmptyState message="Student testimonials will appear here soon." />}

        {items && items.length > 0 && (
          <div className="max-w-2xl mx-auto relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={items[index].id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35 }}
                className="card p-8 text-center"
              >
                <FiUser className="text-3xl text-brass-500 mx-auto mb-4" />
                <p className="text-parchment-200 text-base leading-relaxed italic">&ldquo;{items[index].message}&rdquo;</p>
                <p className="mt-5 font-display text-parchment-100">{items[index].student_name}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {items[index].program}{items[index].designation ? ` &middot; ${items[index].designation}` : ''}
                </p>
              </motion.div>
            </AnimatePresence>

            {items.length > 1 && (
              <div className="flex justify-center gap-4 mt-6">
                <button onClick={prev} className="w-9 h-9 rounded-full border border-parchment-100/15 flex items-center justify-center text-slate-400 hover:text-brass-400 hover:border-brass-500/40">
                  <FiChevronLeft />
                </button>
                <button onClick={next} className="w-9 h-9 rounded-full border border-parchment-100/15 flex items-center justify-center text-slate-400 hover:text-brass-400 hover:border-brass-500/40">
                  <FiChevronRight />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
