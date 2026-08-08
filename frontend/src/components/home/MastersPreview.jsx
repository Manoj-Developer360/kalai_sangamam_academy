import { FiArrowUpRight, FiAward } from "react-icons/fi";
import "./MastersPreview.css";

const masters = [
  {
    id: "01",
    role: "Founder Director",
    name: "Founder Name",
    game: "Kalai Sangamam Academy",
    experience: "Founder & Director",
    image: "/images/masters/founder.jpg",
  },
  {
    id: "02",
    role: "Silambam Master",
    name: "Manoj Kumar V",
    game: "Silambam",
    experience: "Head Coach",
    image: "/images/masters/silambam-master.jpg",
  },
  {
    id: "03",
    role: "Karate Master",
    name: "Master Name",
    game: "Karate",
    experience: "Expert Trainer",
    image: "/images/masters/karate-master.jpg",
  },
  {
    id: "04",
    role: "Yoga Master",
    name: "Master Name",
    game: "Yoga",
    experience: "Expert Trainer",
    image: "/images/masters/yoga-master.jpg",
  },
  {
    id: "05",
    role: "Archery Master",
    name: "Master Name",
    game: "Archery",
    experience: "Expert Trainer",
    image: "/images/masters/archery-master.jpg",
  },
];

export default function MastersPreview() {
  return (
    <section className="masters-preview" id="masters">

      <div className="container">

        <div className="masters-preview__heading">
          <div>
            <span className="masters-preview__eyebrow">
              Our Team
            </span>

            <h2>
              Guided By
              <span> Experience.</span>
            </h2>
          </div>

          <p>
            Experienced trainers dedicated to developing
            skill, discipline and confidence.
          </p>
        </div>

        <div className="masters-preview__grid">

          {masters.map((master) => (
            <article
              className={`master-card ${
                master.id === "01"
                  ? "master-card--founder"
                  : ""
              }`}
              key={master.id}
            >

              <div className="master-card__image">

                <img
                  src={master.image}
                  alt={master.name}
                  loading="lazy"
                />

                <span className="master-card__number">
                  {master.id}
                </span>

                <span className="master-card__icon">
                  <FiAward />
                </span>

              </div>

              <div className="master-card__content">

                <span className="master-card__role">
                  {master.role}
                </span>

                <h3>{master.name}</h3>

                <span className="master-card__game">
                  {master.game}
                </span>

                <div className="master-card__bottom">

                  <span>
                    {master.experience}
                  </span>

                  <FiArrowUpRight />

                </div>

              </div>

            </article>
          ))}

        </div>

      </div>

    </section>
  );
}