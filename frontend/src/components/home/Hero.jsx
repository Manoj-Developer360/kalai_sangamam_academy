import { Link } from "react-router-dom";
import {
  FiArrowDown,
  FiArrowRight,
  FiCalendar,
  FiMapPin,
} from "react-icons/fi";

import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" id="home">
      {/* Background */}
      <div className="hero__background">
        <div className="hero__overlay" />
        <div className="hero__noise" />
      </div>

      {/* Decorative Elements */}
      <div className="hero__orb hero__orb--one" />
      <div className="hero__orb hero__orb--two" />

      <div className="container hero__container">

        {/* Main Content */}
        <div className="hero__content">

          <div className="hero__eyebrow">
            <span className="hero__eyebrow-line" />
            Dindigul's Multi-Disciplinary Academy
          </div>

          <h1 className="hero__title">
            Tradition.
            <br />

            <span>Discipline.</span>
            <br />

            Excellence.
          </h1>

          <p className="hero__description">
            Nurturing strength, discipline and confidence through
            traditional arts, martial arts and holistic training.
          </p>

          <div className="hero__actions">
            <Link
              to="/programs"
              className="btn btn-primary hero__primary-btn"
            >
              Explore Programs
              <FiArrowRight />
            </Link>

            <Link
              to="/register"
              className="btn btn-outline hero__secondary-btn"
            >
              Join Academy
            </Link>
          </div>

        </div>

        {/* Event Announcement */}
        <div className="hero__announcement">

          <div className="hero__announcement-top">
            <span className="hero__announcement-label">
              <span className="hero__live-dot" />
              Announcement
            </span>

            <span className="hero__announcement-number">
              01
            </span>
          </div>

          <div className="hero__announcement-content">

            <div className="hero__announcement-icon">
              <FiCalendar />
            </div>

            <div>
              <span className="hero__announcement-type">
                Upcoming Event
              </span>

              <h2>
                Inter Academy Championship 2026
              </h2>

              <div className="hero__event-meta">

                <span>
                  <FiCalendar />
                  24 August 2026
                </span>

                <span>
                  <FiMapPin />
                  Dindigul
                </span>

              </div>
            </div>

          </div>

          <Link
            to="/events"
            className="hero__announcement-link"
          >
            View Event
            <FiArrowRight />
          </Link>

        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <a
        href="#about-preview"
        className="hero__scroll"
        aria-label="Scroll to explore"
      >
        <span>Scroll to explore</span>

        <span className="hero__scroll-icon">
          <FiArrowDown />
        </span>
      </a>

      {/* Hero Counter */}
      <div className="hero__counter">
        <span>01</span>
        <span className="hero__counter-line" />
        <span>06</span>
      </div>

    </section>
  );
}