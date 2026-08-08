import { motion, useInView } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { useRef, useState, useEffect } from "react";

import "./AchievementsPreview.css";

const achievements = [
  {
    number: "01",
    value: 10,
    suffix: "+",
    title: "National Championships",
    label: "National Level",
  },
  {
    number: "02",
    value: 25,
    suffix: "+",
    title: "State Championships",
    label: "State Level",
  },
  {
    number: "03",
    value: 100,
    suffix: "+",
    title: "Competition Awards",
    label: "Awards & Medals",
  },
];

function AnimatedNumber({ value, suffix, active }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let start = 0;
    const duration = 1600;
    const incrementTime = 25;
    const increment = value / (duration / incrementTime);

    const timer = setInterval(() => {
      start += increment;

      if (start >= value) {
        start = value;
        clearInterval(timer);
      }

      setCount(Math.floor(start));
    }, incrementTime);

    return () => clearInterval(timer);
  }, [active, value]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

export default function AchievementsPreview() {
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.25,
  });

  return (
    <section
      ref={sectionRef}
      className="achievements-preview"
      id="achievements"
    >
      <div className="container">

        {/* =================================
            HEADER
        ================================= */}

        <motion.div
          className="achievements-preview__header"
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div>

            <span className="achievements-preview__eyebrow">
              <span className="eyebrow-line" />
              Our Achievements
            </span>

            <h2>
              Trained To
              <span> Perform.</span>
            </h2>

          </div>

          <p>
            Discipline creates consistency.
            Consistency creates champions.
            Our students continue to challenge
            themselves at every level.
          </p>
        </motion.div>


        {/* =================================
            ACHIEVEMENT CARDS
        ================================= */}

        <div className="achievements-preview__grid">

          {achievements.map((achievement, index) => (
            <motion.article
              className="achievement-card"
              key={achievement.number}

              initial={{
                opacity: 0,
                y: 70,
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
                duration: 0.7,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}

              whileHover={{
                y: -10,
              }}
            >

              {/* Background Number */}

              <span className="achievement-card__background-number">
                {achievement.number}
              </span>


              {/* Top */}

              <div className="achievement-card__top">

                <span className="achievement-card__number">
                  {achievement.number}
                </span>

                <motion.span
                  className="achievement-card__icon"
                  whileHover={{
                    rotate: 45,
                    scale: 1.1,
                  }}
                >
                  <FiArrowUpRight />
                </motion.span>

              </div>


              {/* Counter */}

              <div className="achievement-card__value">

                <AnimatedNumber
                  value={achievement.value}
                  suffix={achievement.suffix}
                  active={isInView}
                />

              </div>


              {/* Content */}

              <h3>
                {achievement.title}
              </h3>

              <span className="achievement-card__label">
                {achievement.label}
              </span>


              {/* Bottom */}

              <div className="achievement-card__bottom">

                <span>
                  Academy Record
                </span>

                <span className="achievement-card__dot" />

              </div>

            </motion.article>
          ))}

        </div>


        {/* =================================
            FOOTER
        ================================= */}

        <motion.div
          className="achievements-preview__footer"

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
            duration: 0.7,
            delay: 0.5,
          }}
        >

          <span>
            Discipline · Dedication · Excellence
          </span>

          <a href="/achievements">
            View All Achievements
            <FiArrowUpRight />
          </a>

        </motion.div>

      </div>
    </section>
  );
}