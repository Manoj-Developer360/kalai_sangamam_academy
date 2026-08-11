import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Programs', href: '#programs' },
  { label: 'Masters', href: '#masters' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Events', href: '#events' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-ink-950/95 backdrop-blur border-b border-parchment-100/5' : 'bg-transparent'
      }`}
    >
      <div className="container-xl flex items-center justify-between h-16 lg:h-20">
        <a href="#home" className="font-display text-xl lg:text-2xl font-semibold text-parchment-100">
          Kalai <span className="text-brass-500">Sangamam</span>
        </a>

        <nav className="hidden xl:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-parchment-300 hover:text-brass-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden xl:block">
          <Link to="/student/login" className="btn-secondary !py-2 !px-5 !text-xs">
            Student Login
          </Link>
        </div>

        <button
          className="xl:hidden text-parchment-100 text-2xl"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {open && (
        <div className="xl:hidden bg-ink-900 border-t border-parchment-100/5 px-5 py-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-parchment-200 text-sm"
            >
              {link.label}
            </a>
          ))}
          <Link to="/student/login" onClick={() => setOpen(false)} className="btn-primary mt-2">
            Student Login
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
