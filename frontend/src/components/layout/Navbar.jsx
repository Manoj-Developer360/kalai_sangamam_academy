import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";

import "./Navbar.css";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Programs", path: "/programs" },
  { label: "Masters", path: "/masters" },
  { label: "Achievements", path: "/achievements" },
  { label: "Gallery", path: "/gallery" },
  { label: "Events", path: "/events" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`navbar ${
        scrolled ? "navbar--scrolled" : ""
      }`}
    >
      <div className="navbar__inner container">

        {/* Logo */}
        <Link to="/" className="navbar__brand">
          <span className="navbar__mark">
            KS
          </span>

          <span className="navbar__brand-text">
            <strong>Kalai Sangamam</strong>
            <small>Academy</small>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar__nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar__link ${
                location.pathname === link.path
                  ? "navbar__link--active"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          to="/login"
          className="navbar__login"
        >
          <span>Student Login</span>
          <FiArrowUpRight />
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="navbar__menu-btn"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={
            menuOpen
              ? "Close navigation"
              : "Open navigation"
          }
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`navbar__mobile ${
          menuOpen ? "navbar__mobile--open" : ""
        }`}
      >
        <nav className="navbar__mobile-nav">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar__mobile-link ${
                location.pathname === link.path
                  ? "navbar__mobile-link--active"
                  : ""
              }`}
              style={{
                transitionDelay: menuOpen
                  ? `${index * 40}ms`
                  : "0ms",
              }}
            >
              <span>
                0{index + 1}
              </span>

              {link.label}
            </Link>
          ))}

          <Link
            to="/login"
            className="navbar__mobile-login"
          >
            Student Login
            <FiArrowUpRight />
          </Link>
        </nav>
      </div>
    </header>
  );
}