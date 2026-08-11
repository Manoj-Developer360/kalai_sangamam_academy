import React, { useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiMessageCircle } from 'react-icons/fi';
import SectionHeading from '../common/SectionHeading';

const Contact = ({ site }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend contact-form endpoint was specified in the brief; this
    // captures the message locally and confirms receipt to the visitor.
    // Wire this up to a /api/contact route + email service if needed.
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-ink-900/60">
      <div className="container-xl">
        <SectionHeading eyebrow="Contact" title="Come train with us" />

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="card p-7 space-y-5">
            <div className="flex items-start gap-3">
              <FiMapPin className="text-brass-500 mt-1 shrink-0" />
              <p className="text-slate-300 text-sm">{site?.address || 'Dindigul, Tamil Nadu, India'}</p>
            </div>
            <div className="flex items-center gap-3">
              <FiPhone className="text-brass-500 shrink-0" />
              <p className="text-slate-300 text-sm">{site?.phone || '+91 00000 00000'}</p>
            </div>
            <div className="flex items-center gap-3">
              <FiMessageCircle className="text-brass-500 shrink-0" />
              <p className="text-slate-300 text-sm">{site?.whatsapp || '+91 00000 00000'}</p>
            </div>
            <div className="flex items-center gap-3">
              <FiMail className="text-brass-500 shrink-0" />
              <p className="text-slate-300 text-sm">{site?.email || 'info@kalaisangamam.com'}</p>
            </div>
            <div className="h-48 rounded-md bg-ink-700 flex items-center justify-center text-slate-500 text-xs">
              Map embed placeholder — add a Google Maps iframe here
            </div>
          </div>

          <form onSubmit={handleSubmit} className="card p-7 space-y-4">
            {sent ? (
              <div className="h-full flex items-center justify-center text-center py-10">
                <p className="text-brass-400 text-sm">Thanks — we've received your message and will get back to you soon.</p>
              </div>
            ) : (
              <>
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block">Full Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-ink-950 border border-parchment-100/10 rounded-sm px-4 py-2.5 text-sm text-parchment-100 focus:border-brass-500 outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block">Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-ink-950 border border-parchment-100/10 rounded-sm px-4 py-2.5 text-sm text-parchment-100 focus:border-brass-500 outline-none"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1.5 block">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-ink-950 border border-parchment-100/10 rounded-sm px-4 py-2.5 text-sm text-parchment-100 focus:border-brass-500 outline-none resize-none"
                    placeholder="Tell us what you're interested in"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">Send Message</button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
