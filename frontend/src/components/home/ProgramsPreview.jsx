import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiArrowRight,
  FiActivity,
  FiBookOpen,
  FiCircle,
  FiFeather,
  FiTarget,
  FiZap,
} from "react-icons/fi";

import "./ProgramsPreview.css";

const programs = [
  {
    number: "01",
    title: "Silambam",
    subtitle: "Traditional Martial Art",
    description:
      "Learn the ancient Tamil martial art through structured training, discipline and traditional techniques.",
    icon: FiZap,
  },
  {
    number: "02",
    title: "Karate",
    subtitle: "Martial Arts",
    description:
      "Build strength, confidence and self-discipline through progressive martial arts training.",
    icon: FiActivity,
  },
  {
    number: "03",
    title: "Yoga",
    subtitle: "Mind & Body",
    description:
      "Develop flexibility, balance, concentration and inner calm through guided yoga practice.",
    icon: FiCircle,
  },
  {
    number: "04",
    title: "Archery",
    subtitle: "Precision & Focus",
    description:
      "Improve concentration, patience and precision through systematic archery training.",
    icon: FiTarget,
  },
  {
    number: "05",
    title: "Skating",
    subtitle: "Balance & Movement",
    description:
      "Develop coordination, balance and confidence through progressive skating sessions.",
    icon: FiFeather,
  },
  {
    number: "06",
    title: "Hindi",
    subtitle: "Language Learning",
    description:
      "Build practical Hindi communication skills through structured and engaging learning.",
    icon: FiBookOpen,
  },
];

export default function ProgramsPreview() {
  return (
    <section className="programs-preview" id="programs">

      <div className="container">

        {/* Header */}
        <div className="programs-preview__header">

          <div>
            <div className="programs-preview__eyebrow">
              <span />
              Our Training Programs
            </div>

            <h2>
              Train With
              <span> Purpose.</span>
            </h2>
          </div>

          <div className="programs-preview__header-right">
            <span>03 / 06</span>

            <p>
              Discover structured programs designed
              to develop physical ability, discipline,
              confidence and character.
            </p>
          </div>

        </div>

        {/* Programs Grid */}
        <div className="programs-preview__grid">

          {programs.map((program) => {
            const Icon = program.icon;

            return (
              <article
                className="program-card"
                key={program.number}
              >

                <div className="program-card__top">

                  <span className="program-card__number">
                    {program.number}
                  </span>

                  <span className="program-card__icon">
                    <Icon />
                  </span>

                </div>

                <div className="program-card__body">

                  <span className="program-card__subtitle">
                    {program.subtitle}
                  </span>

                  <h3>{program.title}</h3>

                  <p>{program.description}</p>

                </div>

                <Link
                  to={`/programs/${program.title.toLowerCase()}`}
                  className="program-card__link"
                  aria-label={`Explore ${program.title}`}
                >
                  <span>Explore Program</span>

                  <span className="program-card__arrow">
                    <FiArrowUpRight />
                  </span>
                </Link>

              </article>
            );
          })}

        </div>

        {/* Bottom CTA */}
        <div className="programs-preview__footer">

          <span>
            06 disciplines · Multiple levels · Expert guidance
          </span>

          <Link to="/programs">
            View All Programs
            <FiArrowRight />
          </Link>

        </div>

      </div>

    </section>
  );
}