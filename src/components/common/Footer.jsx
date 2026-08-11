import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiYoutube, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const Footer = ({ site }) => (
  <footer className="bg-ink-900 border-t border-parchment-100/5 pt-16 pb-8">
    <div className="container-xl grid grid-cols-1 md:grid-cols-4 gap-10">
      <div>
        <h3 className="font-display text-xl font-semibold text-parchment-100 mb-3">
          Kalai <span className="text-brass-500">Sangamam</span>
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">
          {site?.tagline || 'A Dindigul academy for Silambam, Karate, Yoga, Skating, Archery and Hindi — discipline built one session at a time.'}
        </p>
        <div className="flex gap-4 mt-5 text-lg text-slate-400">
          {site?.facebook && <a href={site.facebook} aria-label="Facebook" className="hover:text-brass-400"><FiFacebook /></a>}
          {site?.instagram && <a href={site.instagram} aria-label="Instagram" className="hover:text-brass-400"><FiInstagram /></a>}
          {site?.youtube && <a href={site.youtube} aria-label="YouTube" className="hover:text-brass-400"><FiYoutube /></a>}
        </div>
      </div>

      <div>
        <h4 className="text-parchment-100 font-display text-sm uppercase tracking-wide mb-4">Quick Links</h4>
        <ul className="space-y-2 text-sm text-slate-400">
          <li><a href="#about" className="hover:text-brass-400">About Us</a></li>
          <li><a href="#masters" className="hover:text-brass-400">Masters</a></li>
          <li><a href="#gallery" className="hover:text-brass-400">Gallery</a></li>
          <li><a href="#events" className="hover:text-brass-400">Upcoming Events</a></li>
          <li><a href="#faq" className="hover:text-brass-400">FAQ</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-parchment-100 font-display text-sm uppercase tracking-wide mb-4">Training Programs</h4>
        <ul className="space-y-2 text-sm text-slate-400">
          {['Silambam', 'Karate', 'Yoga', 'Skating', 'Archery', 'Hindi'].map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-parchment-100 font-display text-sm uppercase tracking-wide mb-4">Contact</h4>
        <ul className="space-y-3 text-sm text-slate-400">
          <li className="flex items-start gap-2"><FiMapPin className="mt-0.5 text-brass-500 shrink-0" /> {site?.address || 'Dindigul, Tamil Nadu'}</li>
          <li className="flex items-center gap-2"><FiPhone className="text-brass-500 shrink-0" /> {site?.phone || '+91 00000 00000'}</li>
          <li className="flex items-center gap-2"><FiMail className="text-brass-500 shrink-0" /> {site?.email || 'info@kalaisangamam.com'}</li>
        </ul>
        <div className="flex gap-3 mt-5">
          <Link to="/student/login" className="text-xs text-brass-400 underline underline-offset-4">Student Login</Link>
          <Link to="/admin/login" className="text-xs text-slate-500 underline underline-offset-4">Admin Login</Link>
        </div>
      </div>
    </div>

    <div className="container-xl mt-12 pt-6 border-t border-parchment-100/5 text-xs text-slate-500 flex flex-col sm:flex-row justify-between gap-2">
      <p>&copy; {new Date().getFullYear()} Kalai Sangamam, Dindigul. All rights reserved.</p>
      <p>Built for discipline, tradition and modern athletic excellence.</p>
    </div>
  </footer>
);

export default Footer;
