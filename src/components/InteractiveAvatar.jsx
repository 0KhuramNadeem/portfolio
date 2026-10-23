import { useEffect, useRef, useState } from 'react';

/**
 * Interactive SVG Avatar that tracks mouse cursor.
 * Eyes, eyebrows and head tilt follow the mouse.
 */
const InteractiveAvatar = () => {
  const avatarRef = useRef(null);
  const [look, setLook] = useState({ x: 0, y: 0 });       // eye offset
  const [head, setHead] = useState({ rotX: 0, rotY: 0 }); // head tilt
  const [blink, setBlink] = useState(false);
  const [mood, setMood] = useState('happy'); // happy | surprised | focused

  /* ─── Mouse tracking ─── */
  useEffect(() => {
    const handleMouse = (e) => {
      const el = avatarRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Eye movement (max ±6px)
      const maxEye = 6;
      const eyeX = (dx / Math.max(dist, 1)) * Math.min(dist / 30, maxEye);
      const eyeY = (dy / Math.max(dist, 1)) * Math.min(dist / 30, maxEye);

      // Head tilt (max ±12deg)
      const rotY = Math.max(-12, Math.min(12, dx / 25));
      const rotX = Math.max(-8, Math.min(8, -dy / 30));

      setLook({ x: eyeX, y: eyeY });
      setHead({ rotX, rotY });

      // Mood based on distance
      if (dist < 80) setMood('surprised');
      else if (dist < 200) setMood('focused');
      else setMood('happy');
    };

    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  /* ─── Random blinking ─── */
  useEffect(() => {
    const scheduleNextBlink = () => {
      const delay = 2000 + Math.random() * 3000;
      return setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 150);
        scheduleNextBlink();
      }, delay);
    };
    const t = scheduleNextBlink();
    return () => clearTimeout(t);
  }, []);

  const eyeScaleY = blink ? 0.05 : 1;

  /* Mouth shape based on mood */
  const mouthPath = {
    happy:     'M 35 68 Q 50 80 65 68',
    surprised: 'M 40 66 Q 50 78 60 66',
    focused:   'M 38 70 Q 50 70 62 70',
  }[mood];

  const eyebrowLeft = {
    happy:     'M 24 34 Q 34 28 44 32',
    surprised: 'M 22 28 Q 33 22 44 28',
    focused:   'M 24 35 Q 34 31 44 35',
  }[mood];

  const eyebrowRight = {
    happy:     'M 56 32 Q 66 28 76 34',
    surprised: 'M 56 28 Q 67 22 78 28',
    focused:   'M 56 35 Q 66 31 76 35',
  }[mood];

  return (
    <div
      ref={avatarRef}
      className="relative select-none"
      style={{
        transform: `perspective(600px) rotateX(${head.rotX}deg) rotateY(${head.rotY}deg)`,
        transition: 'transform 0.15s ease-out',
        willChange: 'transform',
      }}
    >
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#915eff] to-[#00d9ff] blur-2xl opacity-30 pointer-events-none" />

      {/* Avatar Circle */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden"
           style={{ border: '2px solid rgba(145,94,255,0.5)' }}>

        {/* Background gradient */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1a0a3e] via-[#151030] to-[#050816]" />

        {/* SVG Face */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ── Face / Head ── */}
          <ellipse cx="50" cy="54" rx="32" ry="36"
            fill="url(#skinGrad)" stroke="rgba(145,94,255,0.3)" strokeWidth="0.5" />

          {/* ── Hair ── */}
          <ellipse cx="50" cy="24" rx="30" ry="16" fill="#1a0826" />
          <ellipse cx="50" cy="19" rx="28" ry="13" fill="#2a0a3e" />
          {/* Hair detail lines */}
          <path d="M 28 22 Q 35 14 50 12 Q 65 14 72 22"
            fill="none" stroke="#915eff" strokeWidth="0.8" opacity="0.6" />
          {/* Side hair strands */}
          <path d="M 20 30 Q 18 40 19 50" fill="none" stroke="#1a0826" strokeWidth="4" />
          <path d="M 80 30 Q 82 40 81 50" fill="none" stroke="#1a0826" strokeWidth="4" />

          {/* ── Neck ── */}
          <rect x="42" y="82" width="16" height="12" rx="4" fill="url(#skinGrad)" />

          {/* ── T-Shirt / Collar ── */}
          <path d="M 15 100 Q 20 86 42 86 L 42 90 Q 50 84 58 90 L 58 86 Q 80 86 85 100 Z"
            fill="#2d1b69" />
          <path d="M 42 86 Q 50 80 58 86" fill="none"
            stroke="#915eff" strokeWidth="1" />

          {/* ── Glasses frame ── */}
          <rect x="21" y="38" width="22" height="16" rx="6"
            fill="none" stroke="#00d9ff" strokeWidth="1.2" opacity="0.9" />
          <rect x="57" y="38" width="22" height="16" rx="6"
            fill="none" stroke="#00d9ff" strokeWidth="1.2" opacity="0.9" />
          <line x1="43" y1="45" x2="57" y2="45"
            stroke="#00d9ff" strokeWidth="1" opacity="0.7" />
          {/* Glasses temples */}
          <line x1="21" y1="45" x2="17" y2="44"
            stroke="#00d9ff" strokeWidth="1" opacity="0.6" />
          <line x1="79" y1="45" x2="83" y2="44"
            stroke="#00d9ff" strokeWidth="1" opacity="0.6" />

          {/* ── LEFT EYE ── */}
          <g transform={`translate(${look.x}, ${look.y})`}>
            <ellipse cx="32" cy="46" rx="7" ry={7 * eyeScaleY}
              fill="white" />
            <ellipse cx={32 + look.x * 0.3} cy={46 + look.y * 0.3}
              rx="4" ry={4 * eyeScaleY} fill="#1a0040" />
            <ellipse cx={32 + look.x * 0.3 + 1} cy={46 + look.y * 0.3 - 1}
              rx="1.5" ry={1.5 * eyeScaleY} fill="white" opacity="0.8" />
            {/* Pupil highlight dot */}
            <ellipse cx={32 + look.x * 0.3 - 1} cy={46 + look.y * 0.3 + 1.5}
              rx="0.8" ry={0.8 * eyeScaleY} fill="#915eff" opacity="0.6" />
          </g>

          {/* ── RIGHT EYE ── */}
          <g transform={`translate(${look.x}, ${look.y})`}>
            <ellipse cx="68" cy="46" rx="7" ry={7 * eyeScaleY}
              fill="white" />
            <ellipse cx={68 + look.x * 0.3} cy={46 + look.y * 0.3}
              rx="4" ry={4 * eyeScaleY} fill="#1a0040" />
            <ellipse cx={68 + look.x * 0.3 + 1} cy={46 + look.y * 0.3 - 1}
              rx="1.5" ry={1.5 * eyeScaleY} fill="white" opacity="0.8" />
            <ellipse cx={68 + look.x * 0.3 - 1} cy={46 + look.y * 0.3 + 1.5}
              rx="0.8" ry={0.8 * eyeScaleY} fill="#915eff" opacity="0.6" />
          </g>

          {/* ── Eyebrows ── */}
          <path d={eyebrowLeft} fill="none"
            stroke="#2a0a3e" strokeWidth="2.5" strokeLinecap="round"
            style={{ transition: 'd 0.3s ease' }} />
          <path d={eyebrowRight} fill="none"
            stroke="#2a0a3e" strokeWidth="2.5" strokeLinecap="round"
            style={{ transition: 'd 0.3s ease' }} />

          {/* ── Nose ── */}
          <path d="M 50 52 Q 47 58 49 61 Q 51 62 53 61 Q 55 58 50 52"
            fill="none" stroke="rgba(145,94,255,0.4)" strokeWidth="1" />

          {/* ── Mouth ── */}
          <path d={mouthPath} fill="none"
            stroke="#cc6699" strokeWidth="2" strokeLinecap="round"
            style={{ transition: 'd 0.3s ease' }} />
          {/* Lip shine */}
          {mood === 'happy' && (
            <path d="M 42 70 Q 50 68 58 70" fill="none"
              stroke="rgba(255,150,200,0.4)" strokeWidth="1" />
          )}

          {/* ── Cheek blush ── */}
          <ellipse cx="23" cy="60" rx="7" ry="4"
            fill="#ff6b9d" opacity="0.2" />
          <ellipse cx="77" cy="60" rx="7" ry="4"
            fill="#ff6b9d" opacity="0.2" />

          {/* ── Ear ── */}
          <ellipse cx="18" cy="53" rx="4" ry="6"
            fill="url(#skinGrad)" stroke="rgba(145,94,255,0.2)" strokeWidth="0.5" />
          <ellipse cx="82" cy="53" rx="4" ry="6"
            fill="url(#skinGrad)" stroke="rgba(145,94,255,0.2)" strokeWidth="0.5" />

          {/* ── Tech glow on forehead ── */}
          <text x="50" y="22" textAnchor="middle"
            fontSize="5" fill="#00d9ff" opacity="0.5" fontFamily="monospace">
            &lt;/&gt;
          </text>

          {/* Gradients */}
          <defs>
            <radialGradient id="skinGrad" cx="40%" cy="35%">
              <stop offset="0%" stopColor="#f5c5a0" />
              <stop offset="60%" stopColor="#e8a882" />
              <stop offset="100%" stopColor="#c98060" />
            </radialGradient>
          </defs>
        </svg>

        {/* Scanline overlay for tech effect */}
        <div className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(145,94,255,0.02) 3px, rgba(145,94,255,0.02) 4px)',
          }} />
      </div>

      {/* Mood badge */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 glass-card px-3 py-1 rounded-full border border-[#915eff]/30 whitespace-nowrap">
        <span className="text-xs text-[#aaa6c3]">
          {mood === 'happy' && '😊 Chill Mode'}
          {mood === 'surprised' && '😮 Oh hello!'}
          {mood === 'focused' && '🧐 Focused'}
        </span>
      </div>
    </div>
  );
};

export default InteractiveAvatar;
