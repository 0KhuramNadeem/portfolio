import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import BoyAvatar from '../components/BoyAvatar';

const TITLES = [
  'Full Stack Developer',
  'React & Next.js Engineer',
  'AI / ML Enthusiast',
  'Cloud (AWS) Developer',
  '3D Modeler — Blender',
];

const Hero = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = TITLES[titleIndex];
    let timeout;
    if (!isDeleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex));
        setCharIndex(c => c + 1);
        if (charIndex === current.length) setTimeout(() => setIsDeleting(true), 1500);
      }, 75);
    } else if (isDeleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex));
        setCharIndex(c => c - 1);
        if (charIndex === 0) { setIsDeleting(false); setTitleIndex(i => (i + 1) % TITLES.length); }
      }, 38);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, titleIndex]);

  const stats = [
    { value: 'UCP',  label: 'BSCS — Semester 8' },
    { value: '3.31', label: 'CGPA / 4.00' },
    { value: '3+',   label: 'Live Projects' },
    { value: 'AWS',  label: 'Certified 2025' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#915eff]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00d9ff]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-10 lg:gap-20">

        {/* ── Left content ── */}
        <div className="flex-1 text-center lg:text-left">

          {/* Available badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-[#915eff]/40 mb-8"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-[#aaa6c3]">Open to internships & full-time roles</span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#aaa6c3] text-lg mb-2"
          >
            Hi, I'm 👋
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-tight"
          >
            Khuram{' '}
            <span className="gradient-text">Nadeem</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl sm:text-2xl font-semibold text-[#aaa6c3] mb-6 h-10"
          >
            <span className="text-[#915eff]">&lt;</span>
            <span className="text-white">{displayed}</span>
            <span className="animate-pulse text-[#00d9ff]">|</span>
            <span className="text-[#915eff]">/&gt;</span>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[#aaa6c3] text-base sm:text-lg max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            BSCS student at <span className="text-white font-semibold">University of Central Punjab</span> (Graduating 2027).
            Co-founder of <a href="https://kaamaura.com" target="_blank" rel="noopener noreferrer" className="text-[#915eff] hover:underline">KaamAura</a>.
            Building full-stack apps, AI systems & cloud solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start mb-14"
          >
            <Link to="projects" smooth duration={500}>
              <button className="relative px-8 py-3.5 rounded-full overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-[#915eff] to-[#00d9ff] transition-transform group-hover:scale-105" />
                <span className="relative text-white font-semibold">View Projects 🚀</span>
              </button>
            </Link>
            <a
              href="mailto:nkhuram897@gmail.com"
              className="px-8 py-3.5 rounded-full border border-[#915eff]/50 text-white font-semibold hover:bg-[#915eff]/10 transition-all duration-300 glass-card"
            >
              Hire Me ✉️
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-lg mx-auto lg:mx-0"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center lg:text-left">
                <div className="text-xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-[#aaa6c3] mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-3 mt-8 justify-center lg:justify-start"
          >
            {[
              { icon: '🐙', label: 'GitHub',   href: 'https://github.com/0KhuramNadeem' },
              { icon: '💼', label: 'LinkedIn', href: 'https://linkedin.com/in/khuram-nadeem' },
              { icon: '✉️', label: 'Email',    href: 'mailto:nkhuram897@gmail.com' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="w-11 h-11 glass-card rounded-xl flex items-center justify-center text-xl hover:border-[#915eff]/60 hover:scale-110 transition-all duration-300 border border-[#915eff]/20"
                title={s.label}
              >
                {s.icon}
              </a>
            ))}
          </motion.div>
        </div>

        {/* ── Right — Boy Avatar (no circle!) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, type: 'spring', stiffness: 100 }}
          className="flex-shrink-0 flex flex-col items-center relative"
        >
          <BoyAvatar />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[#aaa6c3] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-0.5 h-8 bg-gradient-to-b from-[#915eff] to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
