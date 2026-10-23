import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * HandsomeBoy — A detailed, stylish developer boy avatar.
 * Sharp jawline · stylish side-swept hair · cursor-following eyes
 * Blink · wave · typing animations — NO circle container.
 */
const HandsomeBoy = () => {
  const containerRef = useRef(null);
  const rafRef       = useRef(null);
  const targetEye    = useRef({ x: 0, y: 0 });
  const currentEye   = useRef({ x: 0, y: 0 });

  const [eyes,     setEyes]     = useState({ x: 0, y: 0 });
  const [headTilt, setHeadTilt] = useState(0);
  const [bodyLean, setBodyLean] = useState(0);
  const [blink,    setBlink]    = useState(false);
  const [wave,     setWave]     = useState(false);
  const [typing,   setTyping]   = useState(false);
  const [glowPulse,setGlowPulse]= useState(false);

  /* ── Smooth lerp mouse tracking ── */
  const onMouse = useCallback((e) => {
    const el = containerRef.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy) || 1;
    const maxE = 5.5;
    targetEye.current = {
      x: (dx / dist) * Math.min(dist / 45, maxE),
      y: (dy / dist) * Math.min(dist / 45, maxE),
    };
    setHeadTilt(Math.max(-9,  Math.min(9,  dx / 28)));
    setBodyLean(Math.max(-4,  Math.min(4,  dx / 65)));
  }, []);

  useEffect(() => {
    const loop = () => {
      currentEye.current.x += (targetEye.current.x - currentEye.current.x) * 0.1;
      currentEye.current.y += (targetEye.current.y - currentEye.current.y) * 0.1;
      setEyes({ x: currentEye.current.x, y: currentEye.current.y });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouse);
    return () => window.removeEventListener('mousemove', onMouse);
  }, [onMouse]);

  /* ── Blink every 2-4 s ── */
  useEffect(() => {
    let t;
    const go = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => { setBlink(false); go(); }, 140);
      }, 2000 + Math.random() * 2500);
    };
    go();
    return () => clearTimeout(t);
  }, []);

  /* ── Idle cycle: wave → typing ── */
  useEffect(() => {
    let t1, t2, t3, t4;
    const cycle = () => {
      t1 = setTimeout(() => {
        setWave(true);
        t2 = setTimeout(() => { setWave(false); }, 1400);
      }, 4500);
      t3 = setTimeout(() => {
        setTyping(true);
        setGlowPulse(true);
        t4 = setTimeout(() => { setTyping(false); setGlowPulse(false); cycle(); }, 2200);
      }, 8000);
    };
    cycle();
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const eyeSY = blink ? 0.04 : 1;
  const ex = eyes.x, ey = eyes.y;

  return (
    <div ref={containerRef} className="relative select-none" style={{ width: 300, height: 420 }}>

      {/* Ground shadow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{ width: 180, height: 20, background: 'radial-gradient(ellipse, rgba(145,94,255,0.4) 0%, transparent 75%)' }} />

      {/* Speech bubble */}
      <div
        className="absolute glass-card rounded-2xl px-4 py-2 border border-[#915eff]/50 whitespace-nowrap text-sm font-semibold text-white z-20 pointer-events-none"
        style={{ top: 8, right: -8, animation: 'hb-float 2.5s ease-in-out infinite' }}
      >
        {wave ? '👋 Hey there!' : typing ? '💻 Coding...' : '😎 Khuram Nadeem'}
        <div className="absolute -bottom-1.5 left-5 w-3 h-3 rotate-45 border-b border-l border-[#915eff]/40"
          style={{ background: 'rgba(13,11,30,0.9)' }} />
      </div>

      {/* Main SVG */}
      <svg viewBox="0 0 220 390" width="300" height="420"
        xmlns="http://www.w3.org/2000/svg" overflow="visible"
        style={{
          transform:  `rotate(${bodyLean}deg)`,
          transition: 'transform 0.3s ease-out',
          filter: 'drop-shadow(0 12px 40px rgba(145,94,255,0.45)) drop-shadow(0 3px 10px rgba(0,0,0,0.6))',
        }}
      >
        <defs>
          {/* Skin */}
          <radialGradient id="hb-skin" cx="42%" cy="30%">
            <stop offset="0%"   stopColor="#fce8d0" />
            <stop offset="60%"  stopColor="#f4c49a" />
            <stop offset="100%" stopColor="#d99a70" />
          </radialGradient>
          {/* Ear inner */}
          <radialGradient id="hb-ear" cx="50%" cy="50%">
            <stop offset="0%"   stopColor="#e8a882" />
            <stop offset="100%" stopColor="#c8785a" />
          </radialGradient>
          {/* Hoodie */}
          <linearGradient id="hb-hoodie" x1="0%" y1="0%" x2="10%" y2="100%">
            <stop offset="0%"   stopColor="#2d1b6e" />
            <stop offset="50%"  stopColor="#1e1254" />
            <stop offset="100%" stopColor="#120c38" />
          </linearGradient>
          {/* Hoodie pocket */}
          <linearGradient id="hb-pocket" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#251660" />
            <stop offset="100%" stopColor="#130b35" />
          </linearGradient>
          {/* Pants */}
          <linearGradient id="hb-pants" x1="0%" y1="0%" x2="5%" y2="100%">
            <stop offset="0%"   stopColor="#1c1c3a" />
            <stop offset="100%" stopColor="#0e0e22" />
          </linearGradient>
          {/* Shoes */}
          <linearGradient id="hb-shoe" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#e8e8f0" />
            <stop offset="40%"  stopColor="#c8c8e0" />
            <stop offset="100%" stopColor="#2a2a40" />
          </linearGradient>
          {/* Shoe sole */}
          <linearGradient id="hb-sole" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#3d3d6b" />
            <stop offset="100%" stopColor="#1a1a35" />
          </linearGradient>
          {/* Hair */}
          <linearGradient id="hb-hair" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%"   stopColor="#1a0a2e" />
            <stop offset="40%"  stopColor="#2d1065" />
            <stop offset="100%" stopColor="#0d0620" />
          </linearGradient>
          {/* Glow filter */}
          <filter id="hb-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          {/* Laptop screen glow */}
          <filter id="hb-screen" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation="1.5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* ══════════ LEGS ══════════ */}
        {/* Left leg */}
        <path d="M 80 232 L 74 330 Q 74 340 84 340 L 96 340 Q 104 340 102 330 L 100 232 Z"
          fill="url(#hb-pants)" />
        {/* Right leg */}
        <path d="M 120 232 L 118 330 Q 116 340 126 340 L 138 340 Q 148 340 146 330 L 140 232 Z"
          fill="url(#hb-pants)" />
        {/* Leg crease lines */}
        <line x1="88" y1="235" x2="86" y2="328" stroke="#2a2a55" strokeWidth="1" opacity="0.6"/>
        <line x1="130" y1="235" x2="132" y2="328" stroke="#2a2a55" strokeWidth="1" opacity="0.6"/>
        {/* Knee highlight */}
        <ellipse cx="88" cy="285" rx="9" ry="6" fill="#252550" opacity="0.4"/>
        <ellipse cx="132" cy="285" rx="9" ry="6" fill="#252550" opacity="0.4"/>

        {/* ══════════ SHOES ══════════ */}
        {/* Left shoe */}
        <path d="M 68 336 Q 66 342 68 348 L 104 348 Q 110 345 108 340 L 98 337 Z"
          fill="url(#hb-shoe)" />
        <path d="M 68 344 Q 66 350 68 352 L 104 352 Q 110 350 108 346 L 68 344 Z"
          fill="url(#hb-sole)" />
        {/* Shoe laces */}
        {[74,80,86].map(x => (
          <line key={x} x1={x} y1="341" x2={x+2} y2="347" stroke="white" strokeWidth="1" opacity="0.5"/>
        ))}
        {/* Shoe brand stripe */}
        <path d="M 70 342 Q 85 339 100 341" fill="none" stroke="#915eff" strokeWidth="1.5" opacity="0.7"/>
        {/* Toe box highlight */}
        <ellipse cx="76" cy="342" rx="8" ry="3" fill="white" opacity="0.12"/>

        {/* Right shoe */}
        <path d="M 112 336 Q 110 342 112 348 L 148 348 Q 154 345 152 340 L 142 337 Z"
          fill="url(#hb-shoe)" />
        <path d="M 112 344 Q 110 350 112 352 L 148 352 Q 154 350 152 346 L 112 344 Z"
          fill="url(#hb-sole)" />
        {[118,124,130].map(x => (
          <line key={x} x1={x} y1="341" x2={x+2} y2="347" stroke="white" strokeWidth="1" opacity="0.5"/>
        ))}
        <path d="M 114 342 Q 129 339 144 341" fill="none" stroke="#915eff" strokeWidth="1.5" opacity="0.7"/>
        <ellipse cx="120" cy="342" rx="8" ry="3" fill="white" opacity="0.12"/>

        {/* ══════════ HOODIE BODY ══════════ */}
        {/* Main body */}
        <path d="M 60 168 Q 55 175 54 200 L 54 235 Q 54 242 61 242 L 159 242 Q 166 242 166 235 L 166 200 Q 165 175 160 168 L 148 160 Q 132 154 110 152 Q 88 154 72 160 Z"
          fill="url(#hb-hoodie)" />
        {/* Hoodie kangaroo pocket */}
        <path d="M 78 200 Q 78 228 110 228 Q 142 228 142 200 Q 142 192 136 190 L 84 190 Q 78 192 78 200 Z"
          fill="url(#hb-pocket)" />
        {/* Pocket stitching */}
        <path d="M 79 190 Q 79 228 110 228 Q 141 228 141 190"
          fill="none" stroke="#3d2080" strokeWidth="1" opacity="0.7"/>
        {/* Hood details — drawstring */}
        <path d="M 100 168 Q 100 180 96 188" fill="none" stroke="#3d2080" strokeWidth="1.5" opacity="0.5"/>
        <path d="M 110 168 Q 110 180 114 188" fill="none" stroke="#3d2080" strokeWidth="1.5" opacity="0.5"/>
        {/* Hoodie side seams */}
        <line x1="68"  y1="172" x2="60"  y2="240" stroke="#1a0a50" strokeWidth="1.5" opacity="0.5"/>
        <line x1="152" y1="172" x2="160" y2="240" stroke="#1a0a50" strokeWidth="1.5" opacity="0.5"/>
        {/* Hoodie bottom rib */}
        <path d="M 54 238 Q 110 246 166 238" fill="none" stroke="#2a1870" strokeWidth="2" opacity="0.6"/>
        {/* Logo on chest */}
        <text x="96" y="180" fontFamily="monospace" fontSize="9" fill="#c4b5fd" opacity="0.75"
          style={{ filter: glowPulse ? 'drop-shadow(0 0 4px #915eff)' : 'none' }}>
          {'</>'}
        </text>

        {/* ══════════ ARMS ══════════ */}
        {/* LEFT ARM — waves */}
        <g style={{
          transformOrigin: '60px 178px',
          transform: wave ? 'rotate(-55deg) translateY(-12px)' : 'rotate(6deg)',
          transition: 'transform 0.35s cubic-bezier(.34,1.56,.64,1)',
        }}>
          {/* Upper arm */}
          <path d="M 42 168 Q 35 170 33 190 L 35 218 Q 36 226 44 226 L 60 224 Q 66 222 66 214 L 64 186 Q 62 170 54 166 Z"
            fill="url(#hb-hoodie)" />
          {/* Arm seam */}
          <line x1="48" y1="170" x2="46" y2="222" stroke="#1a0a50" strokeWidth="1" opacity="0.5"/>
          {/* Wrist / cuff */}
          <ellipse cx="44" cy="226" rx="12" ry="5" fill="#2a1870" />
          {/* Hand */}
          <ellipse cx="44" cy="236" rx="13" ry="12" fill="url(#hb-skin)" />
          {/* Fingers when waving */}
          {wave && [
            { x: 34, y: 226, r: -15 },
            { x: 40, y: 222, r:  -5 },
            { x: 46, y: 221, r:   5 },
            { x: 52, y: 224, r:  12 },
          ].map((f, i) => (
            <rect key={i} x={f.x} y={f.y} width="5" height="12" rx="2.5"
              fill="url(#hb-skin)"
              style={{ transform: `rotate(${f.r}deg)`, transformOrigin: `${f.x+2.5}px ${f.y}px` }}/>
          ))}
          {/* Thumb */}
          <ellipse cx="32" cy="233" rx="5" ry="4" fill="url(#hb-skin)"
            style={{ transform: 'rotate(-20deg)', transformOrigin: '32px 233px' }}/>
        </g>

        {/* RIGHT ARM — casual or typing */}
        <g style={{
          transformOrigin: '160px 178px',
          transform: typing ? 'rotate(-4deg) translateY(6px)' : 'rotate(-6deg)',
          transition: 'transform 0.25s ease',
        }}>
          <path d="M 178 168 Q 185 170 187 190 L 185 218 Q 184 226 176 226 L 160 224 Q 154 222 154 214 L 156 186 Q 158 170 166 166 Z"
            fill="url(#hb-hoodie)" />
          <line x1="172" y1="170" x2="174" y2="222" stroke="#1a0a50" strokeWidth="1" opacity="0.5"/>
          <ellipse cx="176" cy="226" rx="12" ry="5" fill="#2a1870" />
          <ellipse cx="176" cy="236" rx="13" ry="12" fill="url(#hb-skin)" />
          <ellipse cx="188" cy="233" rx="5" ry="4" fill="url(#hb-skin)"
            style={{ transform: 'rotate(20deg)', transformOrigin: '188px 233px' }}/>
        </g>

        {/* ══════════ LAPTOP ══════════ */}
        <g transform="translate(0, 4)">
          {/* Laptop lid back */}
          <rect x="62" y="230" width="96" height="60" rx="5" fill="#1e1e32"/>
          {/* Screen bezel */}
          <rect x="64" y="232" width="92" height="56" rx="4"
            fill={glowPulse ? '#0a1628' : '#0d1220'} />
          {/* Screen glow border */}
          <rect x="64" y="232" width="92" height="56" rx="4"
            fill="none" strokeWidth="1.2"
            stroke={glowPulse ? '#00d9ff' : '#915eff'} opacity="0.8"
            filter="url(#hb-screen)"
          />
          {/* Code lines on screen */}
          {[
            { y:242, txt:"const name = 'Khuram';",  c:'#818cf8' },
            { y:250, txt:'BSCS @ UCP — CGPA 3.31',  c:'#34d399' },
            { y:258, txt:'> React | Node | AWS',     c:'#f59e0b' },
            { y:266, txt:'Smart CA — FYP 🎓',        c:'#fb7185' },
            { y:274, txt:'KaamAura.com 🚀',          c:'#a78bfa' },
          ].map(({ y, txt, c }) => (
            <text key={y} x="68" y={y} fontFamily="monospace" fontSize="4.8"
              fill={c} opacity={glowPulse ? 1 : 0.85}>
              {txt}
            </text>
          ))}
          {/* Blinking cursor */}
          <rect x="68" y="277" width="3" height="5.5" rx="1.2"
            fill={glowPulse ? '#00d9ff' : '#915eff'}
            opacity={typing ? 1 : 0.5} />
          {/* Webcam dot */}
          <circle cx="110" cy="234" r="1.5" fill="#334155" />
          {/* Laptop base */}
          <path d="M 57 288 Q 57 294 63 296 L 157 296 Q 163 294 163 288 L 158 288 L 62 288 Z"
            fill="#181830" />
          {/* Trackpad */}
          <rect x="92" y="290" width="36" height="4" rx="2" fill="#252545" opacity="0.8"/>
          {/* Keyboard hint */}
          {typing && [76,84,92,100,108,116,124,132,140].map(x => (
            <rect key={x} x={x} y="289.5" width="5" height="2.5" rx="0.8"
              fill="#333360" opacity="0.7"/>
          ))}
          {/* Apple-style logo */}
          <text x="107" y="262" fontSize="10" fill="#915eff" opacity="0.12"
            fontFamily="monospace">⌘</text>
        </g>

        {/* ══════════ NECK ══════════ */}
        <path d="M 95 148 Q 88 150 86 162 L 88 168 Q 100 174 132 168 L 134 162 Q 132 150 125 148 Z"
          fill="url(#hb-skin)" />
        {/* Adam's apple subtle */}
        <ellipse cx="110" cy="160" rx="5" ry="3" fill="#d4936a" opacity="0.2"/>

        {/* Hoodie collar / hood */}
        <path d="M 72 162 Q 88 152 110 150 Q 132 152 148 162 Q 140 145 128 140 Q 118 135 110 134 Q 102 135 92 140 Q 80 145 72 162 Z"
          fill="url(#hb-hoodie)" />
        {/* Hood inner shadow */}
        <path d="M 76 162 Q 90 154 110 152 Q 130 154 144 162 Q 136 148 110 146 Q 84 148 76 162 Z"
          fill="#1a0a40" opacity="0.5"/>

        {/* ══════════ HEAD GROUP (tilts with mouse) ══════════ */}
        <g style={{
          transformOrigin: '110px 95px',
          transform: `rotate(${headTilt}deg)`,
          transition: 'transform 0.14s ease-out',
        }}>

          {/* ── HAIR (back layer) ── */}
          <ellipse cx="110" cy="70" rx="46" ry="36" fill="url(#hb-hair)" />
          {/* Side swept top hair */}
          <path d="M 68 72 Q 70 50 85 42 Q 100 35 118 38 Q 136 42 145 55 Q 148 62 146 72"
            fill="url(#hb-hair)" />
          {/* Hair volume top */}
          <path d="M 76 65 Q 82 42 110 36 Q 138 42 144 65" fill="#2d1065" />
          {/* Signature side-swept swoop */}
          <path d="M 72 68 Q 78 48 95 40 Q 108 34 124 38"
            fill="none" stroke="#3d1580" strokeWidth="6" strokeLinecap="round"/>
          <path d="M 72 70 Q 80 52 98 43"
            fill="none" stroke="#4c1d95" strokeWidth="4" strokeLinecap="round"/>
          {/* Hair shine highlight */}
          <path d="M 88 44 Q 102 38 116 42"
            fill="none" stroke="#6d28d9" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
          <path d="M 92 42 Q 104 37 116 40"
            fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
          {/* Side hair strands */}
          <path d="M 66 75 Q 62 82 64 90" fill="none" stroke="#1a0a2e" strokeWidth="7" strokeLinecap="round"/>
          <path d="M 154 75 Q 158 82 156 90" fill="none" stroke="#1a0a2e" strokeWidth="7" strokeLinecap="round"/>
          {/* Wispy fringe */}
          <path d="M 84 58 Q 88 50 86 62" fill="none" stroke="#3730a3" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
          <path d="M 94 52 Q 98 44 96 56" fill="none" stroke="#4338ca" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>

          {/* ── FACE ── */}
          {/* Sharp jawline face shape */}
          <path d="M 68 88 Q 66 95 66 105 Q 66 120 70 130 Q 76 145 88 152 Q 100 158 110 158 Q 120 158 132 152 Q 144 145 150 130 Q 154 120 154 105 Q 154 95 152 88 Q 148 72 134 68 Q 122 64 110 64 Q 98 64 86 68 Q 72 72 68 88 Z"
            fill="url(#hb-skin)" />
          {/* Jaw shadow for definition */}
          <path d="M 72 130 Q 80 148 110 156 Q 140 148 148 130"
            fill="none" stroke="#d4936a" strokeWidth="1" opacity="0.3"/>
          {/* Cheekbone highlight */}
          <ellipse cx="78" cy="112" rx="10" ry="7" fill="#fce8d0" opacity="0.35"
            style={{ transform: 'rotate(-15deg)', transformOrigin: '78px 112px' }}/>
          <ellipse cx="142" cy="112" rx="10" ry="7" fill="#fce8d0" opacity="0.35"
            style={{ transform: 'rotate(15deg)', transformOrigin: '142px 112px' }}/>

          {/* ── EARS ── */}
          <ellipse cx="65" cy="103" rx="7" ry="10" fill="url(#hb-skin)" />
          <ellipse cx="65" cy="103" rx="3.5" ry="6" fill="url(#hb-ear)" opacity="0.5"/>
          {/* Ear cartilage */}
          <path d="M 62 98 Q 60 103 62 108" fill="none" stroke="#c8785a" strokeWidth="1" opacity="0.5"/>
          <ellipse cx="155" cy="103" rx="7" ry="10" fill="url(#hb-skin)" />
          <ellipse cx="155" cy="103" rx="3.5" ry="6" fill="url(#hb-ear)" opacity="0.5"/>
          <path d="M 158 98 Q 160 103 158 108" fill="none" stroke="#c8785a" strokeWidth="1" opacity="0.5"/>
          {/* Earring */}
          <circle cx="65" cy="111" r="3" fill="#915eff"/>
          <circle cx="65" cy="111" r="1.5" fill="#c4b5fd"/>
          <circle cx="65" cy="111" r="3" fill="none" stroke="#7c3aed" strokeWidth="0.5"
            style={{ filter: 'drop-shadow(0 0 3px #915eff)' }}/>

          {/* ── EYEBROWS ── */}
          {/* Left — thick, defined, slight arch */}
          <path d="M 76 87 Q 87 81 98 84"
            fill="none" stroke="#1a0a2e" strokeWidth="3.5" strokeLinecap="round"/>
          <path d="M 77 88 Q 87 82 97 85"
            fill="none" stroke="#2d1065" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
          {/* Right */}
          <path d="M 122 84 Q 133 81 144 87"
            fill="none" stroke="#1a0a2e" strokeWidth="3.5" strokeLinecap="round"/>
          <path d="M 123 85 Q 133 82 143 88"
            fill="none" stroke="#2d1065" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>

          {/* ── EYES ── */}
          {/* Left eye — almond shaped */}
          <path d="M 76 99 Q 82 93 92 96 Q 98 99 92 106 Q 82 109 76 105 Q 72 102 76 99 Z"
            fill="white" />
          {/* Left shadow under eyelid */}
          <path d="M 76 99 Q 82 93 92 96" fill="none" stroke="#e8b090" strokeWidth="0.8" opacity="0.4"/>
          {/* Left iris */}
          <ellipse cx={84 + ex * 0.55} cy={100 + ey * 0.55} rx="6" ry={6 * eyeSY}
            fill="#2a1560"/>
          {/* Iris detail ring */}
          <ellipse cx={84 + ex * 0.55} cy={100 + ey * 0.55} rx="4.5" ry={4.5 * eyeSY}
            fill="#1a0a40" opacity="0.6"/>
          {/* Left pupil */}
          <ellipse cx={84 + ex * 0.65} cy={100 + ey * 0.65} rx="3.2" ry={3.2 * eyeSY}
            fill="#080318"/>
          {/* Main highlight */}
          <ellipse cx={85.5 + ex * 0.45} cy={98 + ey * 0.45} rx="2" ry={2 * eyeSY}
            fill="white" opacity="0.95"/>
          {/* Secondary highlight */}
          <ellipse cx={82 + ex * 0.45} cy={102 + ey * 0.45} rx="0.9" ry={0.9 * eyeSY}
            fill="#c4b5fd" opacity="0.6"/>
          {/* Upper eyelid line */}
          <path d="M 76 99 Q 84 93.5 92 97" fill="none"
            stroke="#3a2040" strokeWidth="1.5" opacity={eyeSY > 0.5 ? 0.8 : 0}/>
          {/* Eyelashes */}
          {eyeSY > 0.3 && [
            [77,97,'rotate(-30deg)'],[80,94.5,'rotate(-15deg)'],[84,93.5,'rotate(0deg)'],
            [88,94,'rotate(12deg)'],[91,96,'rotate(25deg)']
          ].map(([x,y,r],i)=>(
            <line key={i} x1={x} y1={y} x2={x-0.5} y2={y-3.5}
              stroke="#1a0a2e" strokeWidth="1" strokeLinecap="round"
              style={{transform:r,transformOrigin:`${x}px ${y}px`}}/>
          ))}

          {/* Right eye */}
          <path d="M 128 96 Q 138 93 144 99 Q 148 102 144 105 Q 138 109 128 106 Q 122 103 122 100 Q 122 97 128 96 Z"
            fill="white"/>
          <path d="M 128 96 Q 138 93 144 99" fill="none" stroke="#e8b090" strokeWidth="0.8" opacity="0.4"/>
          <ellipse cx={136 + ex * 0.55} cy={100 + ey * 0.55} rx="6" ry={6 * eyeSY}
            fill="#2a1560"/>
          <ellipse cx={136 + ex * 0.55} cy={100 + ey * 0.55} rx="4.5" ry={4.5 * eyeSY}
            fill="#1a0a40" opacity="0.6"/>
          <ellipse cx={136 + ex * 0.65} cy={100 + ey * 0.65} rx="3.2" ry={3.2 * eyeSY}
            fill="#080318"/>
          <ellipse cx={137.5 + ex * 0.45} cy={98 + ey * 0.45} rx="2" ry={2 * eyeSY}
            fill="white" opacity="0.95"/>
          <ellipse cx={134 + ex * 0.45} cy={102 + ey * 0.45} rx="0.9" ry={0.9 * eyeSY}
            fill="#c4b5fd" opacity="0.6"/>
          <path d="M 128 96 Q 136 93 144 97" fill="none"
            stroke="#3a2040" strokeWidth="1.5" opacity={eyeSY > 0.5 ? 0.8 : 0}/>
          {eyeSY > 0.3 && [
            [129,95,'rotate(-25deg)'],[132,93.5,'rotate(-12deg)'],[136,93,'rotate(0deg)'],
            [140,93.5,'rotate(12deg)'],[143,95.5,'rotate(24deg)']
          ].map(([x,y,r],i)=>(
            <line key={i} x1={x} y1={y} x2={x-0.5} y2={y-3.5}
              stroke="#1a0a2e" strokeWidth="1" strokeLinecap="round"
              style={{transform:r,transformOrigin:`${x}px ${y}px`}}/>
          ))}

          {/* ── GLASSES (stylish thin frame) ── */}
          {/* Left frame */}
          <rect x="72" y="91" width="28" height="18" rx="6"
            fill="rgba(145,94,255,0.04)" stroke="#7c3aed" strokeWidth="1.2" opacity="0.85"/>
          {/* Right frame */}
          <rect x="120" y="91" width="28" height="18" rx="6"
            fill="rgba(145,94,255,0.04)" stroke="#7c3aed" strokeWidth="1.2" opacity="0.85"/>
          {/* Bridge */}
          <path d="M 100 100 Q 106 97 120 100" fill="none" stroke="#7c3aed" strokeWidth="1.2" opacity="0.85"/>
          {/* Temples */}
          <line x1="72" y1="100" x2="65" y2="99" stroke="#7c3aed" strokeWidth="1" opacity="0.7"/>
          <line x1="148" y1="100" x2="155" y2="99" stroke="#7c3aed" strokeWidth="1" opacity="0.7"/>
          {/* Lens reflections */}
          <path d="M 75 93 Q 80 91 86 92" fill="none" stroke="white" strokeWidth="0.8" opacity="0.2"/>
          <path d="M 123 93 Q 128 91 134 92" fill="none" stroke="white" strokeWidth="0.8" opacity="0.2"/>

          {/* ── NOSE ── */}
          {/* Nose bridge */}
          <path d="M 110 106 Q 106 114 105 118 Q 106 123 110 124 Q 114 123 115 118 Q 114 114 110 106"
            fill="none" stroke="#c8845a" strokeWidth="1.2" opacity="0.5"/>
          {/* Nose tip highlight */}
          <ellipse cx="110" cy="120" rx="6" ry="4" fill="#fce8d0" opacity="0.3"/>
          {/* Nostrils */}
          <ellipse cx="106" cy="121" rx="3" ry="2" fill="#c8785a" opacity="0.3"/>
          <ellipse cx="114" cy="121" rx="3" ry="2" fill="#c8785a" opacity="0.3"/>

          {/* ── MOUTH ── */}
          {/* Upper lip — cupid's bow */}
          <path d="M 96 130 Q 103 126 110 128 Q 117 126 124 130 Q 118 133 110 133 Q 102 133 96 130 Z"
            fill="#c8785a" opacity="0.7"/>
          {/* Lower lip */}
          <path d="M 97 131 Q 110 140 123 131 Q 116 137 110 138 Q 104 137 97 131 Z"
            fill="#d49070" opacity="0.65"/>
          {/* Smile line */}
          <path d="M 98 130 Q 110 142 122 130"
            fill="none" stroke="#b06040" strokeWidth="1.5" strokeLinecap="round"/>
          {/* Upper lip highlight */}
          <path d="M 104 129 Q 110 127 116 129"
            fill="none" stroke="#f0c8a0" strokeWidth="0.8" opacity="0.5"/>
          {/* Chin dimple */}
          <path d="M 108 146 Q 110 149 112 146"
            fill="none" stroke="#d4936a" strokeWidth="1" opacity="0.35"/>
          {/* Cheek blush */}
          <ellipse cx="76" cy="117" rx="11" ry="7" fill="#ff8fab" opacity="0.14"/>
          <ellipse cx="144" cy="117" rx="11" ry="7" fill="#ff8fab" opacity="0.14"/>

          {/* ── PHILTRUM (detail for realism) ── */}
          <path d="M 107 124 Q 110 122 113 124" fill="none" stroke="#c8845a" strokeWidth="0.8" opacity="0.4"/>

        </g>{/* end head group */}

        {/* ══════════ FLOATING TAGS ══════════ */}
        {[
          { x: 8,   y: 95,  txt: 'React.js', c: '#61dafb', d: '0s'   },
          { x: 170, y: 80,  txt: 'AWS',       c: '#ff9900', d: '0.6s' },
          { x: 5,   y: 200, txt: 'Node.js',   c: '#6bcb77', d: '1.2s' },
          { x: 172, y: 190, txt: 'ML / AI',   c: '#c4b5fd', d: '1.8s' },
          { x: 8,   y: 310, txt: 'MySQL',     c: '#f59e0b', d: '2.4s' },
          { x: 165, y: 300, txt: 'Next.js',   c: '#e5e7eb', d: '0.3s' },
        ].map(({ x, y, txt, c, d }) => (
          <text key={txt} x={x} y={y} fontFamily="monospace" fontSize="7.5"
            fill={c} opacity="0.5"
            style={{ animation: `hb-float 3s ease-in-out ${d} infinite` }}>
            {txt}
          </text>
        ))}

      </svg>

      {/* CSS animations */}
      <style>{`
        @keyframes hb-float {
          0%, 100% { transform: translateY(0);    opacity: 0.5; }
          50%       { transform: translateY(-7px); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default HandsomeBoy;
