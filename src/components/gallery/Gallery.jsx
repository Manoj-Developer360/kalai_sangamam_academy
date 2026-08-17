import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPlayCircle } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';
import { SkeletonGrid, ErrorState, EmptyState } from '../common/StateViews';
import { publicService } from '../../services/publicService';

const CATEGORIES = ['All', 'Silambam', 'Karate', 'Yoga', 'Skating', 'Archery', 'Hindi', 'Training', 'Competitions', 'Events', 'Award Ceremony'];

const Gallery = () => {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(false);
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    setItems(null);
    publicService
      .getGallery(active === 'All' ? undefined : active)
      .then(({ data }) => setItems(data.data))
      .catch(() => setError(true));
  }, [active]);

  return (
    <section id="gallery" className="py-10">
      <div className="container-xl">
        <SectionHeading eyebrow="Gallery" title="Moments from the mat, the ring and the field" />

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`text-xs px-4 py-2 rounded-full border transition-colors ${
                active === c
                  ? 'bg-brass-500 text-onaccent border-brass-500 font-semibold'
                  : 'border-parchment-100/15 text-slate-400 hover:border-brass-500/40'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {!items && !error && <SkeletonGrid count={8} className="sm:grid-cols-3 lg:grid-cols-4" />}
        {error && <ErrorState message="Couldn't load the gallery right now." />}
        {items && items.length === 0 && <EmptyState message="No media in this category yet." />}

        {items && items.length > 0 && (
          <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: (i % 8) * 0.04 }}
                onClick={() => setLightbox(item)}
                className="relative aspect-square overflow-hidden rounded-md group bg-ink-700"
              >
                <img
                  src={item.media_type === 'video' ? item.video_url : item.image_url}
                  alt={item.title || item.category}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {item.media_type === 'video' && (
                  <FiPlayCircle className="absolute inset-0 m-auto text-3xl text-parchment-100 drop-shadow" />
                )}
                {/* <span className="absolute bottom-0 inset-x-0 bg-ink-950/80 text-[10px] text-slate-300 px-2 py-1 truncate">
                  {item.category}
                </span> */}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-ink-950/95 flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 text-parchment-100 text-2xl" onClick={() => setLightbox(null)}>
              <FiX />
            </button>
            <div className="max-h-[85vh] max-w-full" onClick={(e) => e.stopPropagation()}>
              {lightbox.media_type === 'video' ? (
                <video src={lightbox.video_url} controls autoPlay className="max-h-[72vh] max-w-full rounded-md" />
              ) : (
                <img src={lightbox.image_url} alt={lightbox.title || lightbox.category} className="max-h-[72vh] max-w-full rounded-md object-contain" />
              )}
              <div className="mt-3 text-center">
                <h3 className="font-display text-lg text-parchment-100">{lightbox.title || lightbox.category}</h3>
                <p className="mt-1 text-xs text-brass-400">{lightbox.category}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
