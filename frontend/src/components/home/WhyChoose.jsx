import {
  FiAward,
  FiShield,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiHeart,
} from "react-icons/fi";

import "./WhyChoose.css";

const reasons = [
  {
    number: "01",
    icon: FiUsers,
    title: "Expert Masters",
    description:
      "Learn under experienced trainers who guide students with discipline, knowledge and individual attention.",
  },
  {
    number: "02",
    icon: FiTarget,
    title: "Structured Training",
    description:
      "Progress through carefully designed training levels that build skills step by step.",
  },
  {
    number: "03",
    icon: FiAward,
    title: "Competition Experience",
    description:
      "Prepare for competitions with practical training, performance guidance and experienced mentorship.",
  },
  {
    number: "04",
    icon: FiTrendingUp,
    title: "Continuous Growth",
    description:
      "Develop physical ability, confidence and skills through consistent practice and progression.",
  },
  {
    number: "05",
    icon: FiShield,
    title: "Discipline & Character",
    description:
      "Training goes beyond physical skills by developing discipline, respect, focus and responsibility.",
  },
  {
    number: "06",
    icon: FiHeart,
    title: "Holistic Development",
    description:
      "A balanced approach combining martial arts, fitness, creativity, concentration and learning.",
  },
];

export default function WhyChoose() {
  return (
    <section className="why-choose" id="why-choose">

      <div className="container">

        {/* Header */}
        <div className="why-choose__header">

          <div className="why-choose__title-block">

            <div className="why-choose__eyebrow">
              <span />
              Why Kalai Sangamam
            </div>

            <h2>
              Training That
              <br />
              Builds <span>Character.</span>
            </h2>

          </div>

          <div className="why-choose__intro">

            <span className="why-choose__number">
              04 / 06
            </span>

            <p>
              We believe true training is not only about
              learning a skill. It is about building the
              discipline, confidence and character to use
              that skill with purpose.
            </p>

          </div>

        </div>

        {/* Reasons */}
        <div className="why-choose__grid">

          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <article
                className="why-card"
                key={reason.number}
              >

                <div className="why-card__top">

                  <span className="why-card__number">
                    {reason.number}
                  </span>

                  <span className="why-card__icon">
                    <Icon />
                  </span>

                </div>

                <div className="why-card__content">

                  <h3>{reason.title}</h3>

                  <p>
                    {reason.description}
                  </p>

                </div>

                <div className="why-card__line" />

              </article>
            );
          })}

        </div>

        {/* Bottom Statement */}
        <div className="why-choose__statement">

          <div className="why-choose__statement-mark">
            "
          </div>

          <p>
            Strength in body.
            <span> Discipline in mind.</span>
            <br />
            Confidence in life.
          </p>

          <div className="why-choose__statement-line" />

        </div>

      </div>

    </section>
  );
}