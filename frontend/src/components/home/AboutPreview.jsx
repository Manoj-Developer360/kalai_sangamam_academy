import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiAward,
  FiTarget,
  FiUsers,
} from "react-icons/fi";

import "./AboutPreview.css";

export default function AboutPreview() {
  return (
    <section className="about-preview" id="about-preview">
      <div className="container">

        {/* Section Header */}
        <div className="about-preview__header">

          <div className="about-preview__eyebrow">
            <span className="about-preview__line" />
            About Kalai Sangamam
          </div>

          <span className="about-preview__number">
            02 / 06
          </span>

        </div>

        {/* Main Content */}
        <div className="about-preview__grid">

          {/* Left Visual */}
          <div className="about-preview__visual">

            <div className="about-preview__image-wrapper">

              <img
                src="https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1200&q=85"
                alt="Martial arts training"
                className="about-preview__image"
              />

              <div className="about-preview__image-overlay" />

              <div className="about-preview__visual-label">
                <span>Est.</span>
                <strong>Kalai Sangamam</strong>
                <span>Academy</span>
              </div>

            </div>

            {/* Experience Badge */}
            <div className="about-preview__badge">

              <span className="about-preview__badge-icon">
                <FiAward />
              </span>

              <div>
                <strong>Excellence</strong>
                <span>Through Discipline</span>
              </div>

            </div>

          </div>

          {/* Right Content */}
          <div className="about-preview__content">

            <span className="about-preview__mini-title">
              More Than Training
            </span>

            <h2>
              Building
              <span> Character </span>
              Through
              <br />
              Traditional Arts.
            </h2>

            <p className="about-preview__lead">
              Kalai Sangamam Academy is a multi-disciplinary training
              academy dedicated to developing discipline, confidence,
              physical strength and cultural values in every student.
            </p>

            <p className="about-preview__text">
              From traditional Silambam and martial arts to Yoga,
              Skating, Archery and Hindi, our programs are designed
              to help students discover their potential while
              building a strong foundation for life.
            </p>

            {/* Highlights */}
            <div className="about-preview__highlights">

              <div className="about-preview__highlight">
                <span>
                  <FiTarget />
                </span>

                <div>
                  <strong>Focused Training</strong>
                  <small>Structured learning programs</small>
                </div>
              </div>

              <div className="about-preview__highlight">
                <span>
                  <FiUsers />
                </span>

                <div>
                  <strong>Expert Masters</strong>
                  <small>Experienced trainers & mentors</small>
                </div>
              </div>

            </div>

            {/* CTA */}
            <Link
              to="/about"
              className="about-preview__link"
            >
              Discover Our Story

              <span>
                <FiArrowUpRight />
              </span>
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}