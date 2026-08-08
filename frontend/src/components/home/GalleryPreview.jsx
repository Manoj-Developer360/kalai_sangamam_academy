import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiChevronRight,
} from "react-icons/fi";

import "./GalleryPreview.css";

const galleryItems = [
  {
    id: 1,
    category: "Silambam",
    title: "Strength in Tradition",
    image:
      "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1200&q=85",
    size: "large",
  },
  {
    id: 2,
    category: "Karate",
    title: "Discipline in Motion",
    image:
      "https://images.unsplash.com/photo-1555597408-26bc8e548a46?auto=format&fit=crop&w=900&q=85",
    size: "small",
  },
  {
    id: 3,
    category: "Yoga",
    title: "Mind. Body. Balance.",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=85",
    size: "small",
  },
  {
    id: 4,
    category: "Competition",
    title: "Built for the Challenge",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=85",
    size: "large",
  },
];

const categories = [
  "All",
  "Silambam",
  "Karate",
  "Yoga",
  "Skating",
  "Archery",
];

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
  },

  visible: (index) => ({
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.75,
      delay: index * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function GalleryPreview() {
  return (
    <section className="gallery-preview" id="gallery">

      <div className="container">

        {/* =================================
            HEADER
        ================================= */}

        <motion.div
          className="gallery-preview__header"
          initial={{
            opacity: 0,
            y: 45,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >

          <div>

            <span className="gallery-preview__eyebrow">
              <span className="gallery-preview__line" />
              Life At Kalai Sangamam
            </span>

            <h2>
              Moments That
              <span> Inspire.</span>
            </h2>

          </div>

          <p>
            Explore the moments, memories and milestones
            that capture the spirit of our academy.
          </p>

        </motion.div>


        {/* =================================
            CATEGORY FILTER
        ================================= */}

        <motion.div
          className="gallery-preview__filters"
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            delay: 0.15,
          }}
        >

          {categories.map((category, index) => (
            <button
              key={category}
              className={
                index === 0
                  ? "gallery-filter gallery-filter--active"
                  : "gallery-filter"
              }
            >
              {category}

              {index === 0 && (
                <span className="gallery-filter__dot" />
              )}
            </button>
          ))}

        </motion.div>


        {/* =================================
            GALLERY GRID
        ================================= */}

        <div className="gallery-preview__grid">

          {galleryItems.map((item, index) => (
            <motion.article
              key={item.id}
              className={`gallery-card gallery-card--${item.size}`}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              custom={index}
            >

              <div className="gallery-card__image">

                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                />

                <div className="gallery-card__overlay" />

                <span className="gallery-card__number">
                  0{item.id}
                </span>

                <motion.div
                  className="gallery-card__arrow"
                  whileHover={{
                    rotate: 45,
                  }}
                >
                  <FiArrowUpRight />
                </motion.div>


                <div className="gallery-card__content">

                  <span>
                    {item.category}
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                </div>

              </div>

            </motion.article>
          ))}

        </div>


        {/* =================================
            FOOTER
        ================================= */}

        <motion.div
          className="gallery-preview__footer"
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
            delay: 0.25,
          }}
        >

          <span>
            Training · Competition · Community
          </span>

          <a href="/gallery">

            <span>
              Explore Full Gallery
            </span>

            <FiChevronRight />

          </a>

        </motion.div>

      </div>

    </section>
  );
}