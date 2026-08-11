import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

// Parses "15+" -> { number: 15, suffix: '+' }, "100+ Students" style values -> number/suffix pair.
const parseValue = (raw) => {
  const match = String(raw).match(/^(\d+)(.*)$/);
  if (!match) return { number: 0, suffix: raw };
  return { number: Number(match[1]), suffix: match[2] };
};

const AnimatedCounter = ({ value, label }) => {
  const { number, suffix } = parseValue(value);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, number, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, number]);

  return (
    <motion.div ref={ref} className="text-center">
      <p className="font-mono text-4xl lg:text-5xl font-semibold text-brass-500">
        {display}
        {suffix}
      </p>
      <p className="text-slate-400 text-sm mt-2 uppercase tracking-wide">{label}</p>
    </motion.div>
  );
};

export default AnimatedCounter;
