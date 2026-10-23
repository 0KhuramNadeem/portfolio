import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * CartoonBoy — Clearly masculine cartoon boy.
 * Angular jawline · flat thick brows · no feminine lashes
 * Round glasses · big brown eyes · messy hair · blue t-shirt · arms crossed
 */
const CartoonBoy = () => {
  const containerRef = useRef(null);
  const rafRef       = useRef(null);

  const targetEye  = useRef({ x: 0, y: 0 });
  const currentEye = useRef({ x: 0, y: 0 });
  const targetRot  = useRef({ x: 0, y: 0 });
  const currentRot = useRef({ x: 0, y: 0 });

  const [eyes,  setEyes]  = useState({ x: 0, y: 0 });
  const [rot,   setRot]   = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  const onMouse = useCallback((e) => {
    const el = containerRef.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy) || 1;

    // Pupil movement
    targetEye.current = {
      x: (dx / dist) * Math.min(dist / 50, 5),
      y: (dy / dist) * Math.min(dist / 50, 5),
    };
    // 3D face rotation: Y = left/right, X = up/down
    targetRot.current = {
      y: Math.max(-22, Math.min(22,  dx / 22)),
      x: Math.max(-14, Math.min(14, -dy / 30)),
    };
  }, []);

  // Single rAF — lerp both eyes and rotation
  useEffect(() => {
    const loop = () => {
      currentEye.current.x += (targetEye.current.x - currentEye.current.x) * 0.1;
      currentEye.current.y += (targetEye.current.y - currentEye.current.y) * 0.1;
      setEyes({ x: currentEye.current.x, y: currentEye.current.y });

      currentRot.current.x += (targetRot.current.x - currentRot.current.x) * 0.07;
      currentRot.current.y += (targetRot.current.y - currentRot.current.y) * 0.07;
      setRot({ x: currentRot.current.x, y: currentRot.current.y });

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouse);
    return () => window.removeEventListener('mousemove', onMouse);
  }, [onMouse]);

  useEffect(() => {
    let t;
    const go = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => { setBlink(false); go(); }, 120);
      }, 2500 + Math.random() * 2500);
    };
    go();
    return () => clearTimeout(t);
  }, []);

  const eyeSY = blink ? 0.05 : 1;
  const ex = eyes.x, ey = eyes.y;

  return (
    <div
      ref={containerRef}
      className="relative select-none flex items-center justify-center"
      style={{ width: 320, height: 370 }}
    >
      {/* Ground glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
        style={{ width: 200, height: 20, background: 'radial-gradient(ellipse, rgba(145,94,255,0.35) 0%, transparent 72%)' }} />

      <svg
        viewBox="0 0 280 330"
        width="320" height="370"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
        style={{
          /* 3D face turn — rotateY = left/right, rotateX = up/down */
          transform: `perspective(700px) rotateY(${rot.y}deg) rotateX(${rot.x}deg)`,
          transition: 'transform 0.05s linear',
          transformOrigin: 'center center',
          willChange: 'transform',
          filter: 'drop-shadow(0 10px 35px rgba(145,94,255,0.35)) drop-shadow(0 3px 12px rgba(0,0,0,0.5))',
        }}
      >
        <defs>
          <radialGradient id="b-skin" cx="40%" cy="30%">
            <stop offset="0%"   stopColor="#f5c898" />
            <stop offset="60%"  stopColor="#e0a870" />
            <stop offset="100%" stopColor="#c08050" />
          </radialGradient>
          <radialGradient id="b-skin2" cx="50%" cy="50%">
            <stop offset="0%"   stopColor="#d49060" />
            <stop offset="100%" stopColor="#b87040" />
          </radialGradient>
          <radialGradient id="b-hair" cx="35%" cy="25%">
            <stop offset="0%"   stopColor="#5a2e0a" />
            <stop offset="50%"  stopColor="#3a1c06" />
            <stop offset="100%" stopColor="#200e02" />
          </radialGradient>
          <radialGradient id="b-iris" cx="35%" cy="32%">
            <stop offset="0%"   stopColor="#7a4a28" />
            <stop offset="45%"  stopColor="#4a2a10" />
            <stop offset="100%" stopColor="#200e04" />
          </radialGradient>
          <linearGradient id="b-shirt" x1="0%" y1="0%" x2="8%" y2="100%">
            <stop offset="0%"   stopColor="#6878a8" />
            <stop offset="50%"  stopColor="#526090" />
            <stop offset="100%" stopColor="#384268" />
          </linearGradient>
          <linearGradient id="b-shirt2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#384268" stopOpacity="0"/>
            <stop offset="100%" stopColor="#202840" stopOpacity="0.7"/>
          </linearGradient>
        </defs>

        {/* ══ BODY / T-SHIRT ══ */}
        {/* Wide masculine shoulders */}
        <path d="M 25 222 Q 18 232 16 265 L 16 325 Q 16 330 22 330 L 258 330 Q 264 330 264 325 L 264 265 Q 262 232 255 222 Q 232 208 195 204 L 170 200 L 140 198 L 110 200 L 85 204 Q 48 208 25 222 Z"
          fill="url(#b-shirt)"/>
        <path d="M 25 222 Q 18 232 16 265 L 16 325 Q 16 330 22 330 L 258 330 Q 264 330 264 325 L 264 265 Q 262 232 255 222 Q 232 208 195 204 L 170 200 L 140 198 L 110 200 L 85 204 Q 48 208 25 222 Z"
          fill="url(#b-shirt2)"/>

        {/* V-neck */}
        <path d="M 108 200 Q 122 214 140 220 Q 158 214 172 200 Q 158 194 140 192 Q 122 194 108 200 Z"
          fill="#384268"/>
        <path d="M 112 200 L 140 226 L 168 200"
          fill="none" stroke="#4a5278" strokeWidth="2.5" strokeLinecap="round"/>

        {/* Left sleeve — wide/masculine */}
        <path d="M 24 224 Q 8 234 5 260 L 7 295 Q 9 305 20 305 L 52 305 Q 64 302 68 290 L 72 258 Q 64 234 48 222 Z"
          fill="url(#b-shirt)"/>
        {/* Right sleeve */}
        <path d="M 256 224 Q 272 234 275 260 L 273 295 Q 271 305 260 305 L 228 305 Q 216 302 212 290 L 208 258 Q 216 234 232 222 Z"
          fill="url(#b-shirt)"/>
        {/* Sleeve fold */}
        <path d="M 9 278 Q 36 287 68 276" fill="none" stroke="#526090" strokeWidth="2" opacity="0.5"/>
        <path d="M 271 278 Q 244 287 212 276" fill="none" stroke="#526090" strokeWidth="2" opacity="0.5"/>

        {/* ══ ARMS CROSSED ══ */}
        {/* Left forearm — goes right across chest (on top) */}
        <path d="M 32 288 Q 50 310 140 316 Q 185 315 215 308 L 218 294 Q 188 304 140 303 Q 85 304 50 290 Z"
          fill="url(#b-skin)"/>
        {/* Left fist */}
        <path d="M 28 280 Q 18 282 16 292 Q 16 302 26 304 L 48 305 Q 58 303 60 294 Q 60 284 50 282 Z"
          fill="url(#b-skin)"/>
        {/* Left fist knuckles */}
        {[22,30,38,46].map((x,i)=>(
          <ellipse key={i} cx={x} cy={287} rx="4" ry="3" fill="#c08050" opacity="0.25"/>
        ))}

        {/* Right forearm — goes left (under) */}
        <path d="M 248 288 Q 230 310 140 316 Q 95 315 65 308 L 62 294 Q 92 304 140 303 Q 195 304 230 290 Z"
          fill="url(#b-skin)" opacity="0.82"/>
        {/* Right fist */}
        <path d="M 252 280 Q 262 282 264 292 Q 264 302 254 304 L 232 305 Q 222 303 220 294 Q 220 284 230 282 Z"
          fill="url(#b-skin)" opacity="0.82"/>
        {[258,250,242,234].map((x,i)=>(
          <ellipse key={i} cx={x} cy={287} rx="4" ry="3" fill="#c08050" opacity="0.22"/>
        ))}

        {/* ══ NECK — short & thicker (masculine) ══ */}
        <path d="M 114 188 Q 110 198 110 210 L 114 216 Q 128 224 140 224 Q 152 224 166 216 L 170 210 Q 170 198 166 188 Q 156 180 140 179 Q 124 180 114 188 Z"
          fill="url(#b-skin)"/>
        {/* Neck shadow */}
        <path d="M 116 190 Q 114 208 116 216" fill="none" stroke="#b07048" strokeWidth="2.5" opacity="0.18"/>
        <path d="M 164 190 Q 166 208 164 216" fill="none" stroke="#b07048" strokeWidth="2.5" opacity="0.18"/>
        {/* Collar shadow */}
        <path d="M 114 188 Q 128 196 140 198 Q 152 196 166 188"
          fill="none" stroke="#384268" strokeWidth="5" opacity="0.35"/>

        {/* ══ HEAD ══ */}
        <g>

          {/* ── HAIR BASE (back) ── */}
          <ellipse cx="140" cy="82" rx="78" ry="70" fill="url(#b-hair)"/>
          <path d="M 68 95 Q 72 62 88 46 Q 108 30 140 26 Q 172 30 192 46 Q 208 62 212 95"
            fill="url(#b-hair)"/>
          <path d="M 74 90 Q 80 55 105 38 Q 120 28 140 26 Q 160 28 175 38 Q 200 55 206 90"
            fill="#2a1404"/>

          {/* ── MESSY HAIR TUFTS ── */}
          {/* Top messy tufts */}
          <path d="M 126 34 Q 128 16 140 12 Q 150 8 154 20 Q 148 28 140 30 Q 134 32 126 34 Z"
            fill="url(#b-hair)"/>
          <path d="M 112 36 Q 110 20 118 14 Q 123 10 127 18 L 122 34 Z"
            fill="#3a1c06"/>
          <path d="M 138 28 Q 140 12 146 10 Q 150 8 151 16 L 145 28 Z"
            fill="url(#b-hair)"/>
          {/* Left side tufts */}
          <path d="M 82 56 Q 74 40 82 32 Q 88 26 95 34 Q 90 44 87 56 Z"
            fill="url(#b-hair)"/>
          <path d="M 74 66 Q 64 50 72 40 Q 77 33 85 40 Q 80 52 78 64 Z"
            fill="#2a1404"/>
          {/* Right side tufts */}
          <path d="M 198 56 Q 206 40 198 32 Q 192 26 185 34 Q 190 44 193 56 Z"
            fill="url(#b-hair)"/>
          <path d="M 206 66 Q 216 50 208 40 Q 203 33 195 40 Q 200 52 202 64 Z"
            fill="#2a1404"/>
          {/* Blue streak (left side) */}
          <path d="M 76 54 Q 70 40 77 32 Q 80 28 84 34 L 82 54 Z"
            fill="#3b82f6" opacity="0.9"/>
          <path d="M 72 62 Q 66 48 72 40 L 78 54 Z"
            fill="#60a5fa" opacity="0.7"/>
          {/* Hair shine */}
          <ellipse cx="112" cy="50" rx="20" ry="10" fill="#7a4020" opacity="0.35"
            style={{ transform: 'rotate(-25deg)', transformOrigin: '112px 50px' }}/>

          {/* ── FACE — angular/masculine shape ── */}
          {/* More square jaw, less round */}
          <path d="
            M 70 108
            Q 68 125  70 140
            Q 72 162  82 176
            Q 96  192 116 198
            Q 128 202 140 202
            Q 152 202 164 198
            Q 184 192 198 176
            Q 208 162 210 140
            Q 212 125 210 108
            Q 206  84 192  72
            Q 176  60 140  58
            Q 104  60  88  72
            Q 74   84  70 108 Z"
            fill="url(#b-skin)"/>

          {/* Face side shadows for jaw definition */}
          <path d="M 72 140 Q 78 172 100 188 Q 116 198 140 200"
            fill="none" stroke="#b07048" strokeWidth="1.5" opacity="0.15"/>
          <path d="M 208 140 Q 202 172 180 188 Q 164 198 140 200"
            fill="none" stroke="#b07048" strokeWidth="1.5" opacity="0.15"/>
          {/* Cheekbone planes */}
          <ellipse cx="82"  cy="140" rx="16" ry="11" fill="#f5c898" opacity="0.3"
            style={{ transform: 'rotate(-10deg)', transformOrigin: '82px 140px' }}/>
          <ellipse cx="198" cy="140" rx="16" ry="11" fill="#f5c898" opacity="0.3"
            style={{ transform: 'rotate(10deg)', transformOrigin: '198px 140px' }}/>

          {/* ── EARS ── */}
          <ellipse cx="68"  cy="126" rx="10" ry="13" fill="url(#b-skin)"/>
          <ellipse cx="68"  cy="126" rx="5"  ry="7"  fill="url(#b-skin2)" opacity="0.5"/>
          <path d="M 65 120 Q 62 126 65 132" fill="none" stroke="#b07048" strokeWidth="1.2" opacity="0.4"/>
          <ellipse cx="212" cy="126" rx="10" ry="13" fill="url(#b-skin)"/>
          <ellipse cx="212" cy="126" rx="5"  ry="7"  fill="url(#b-skin2)" opacity="0.5"/>
          <path d="M 215 120 Q 218 126 215 132" fill="none" stroke="#b07048" strokeWidth="1.2" opacity="0.4"/>

          {/* ── EYEBROWS — THICK, FLAT, MASCULINE ── */}
          {/* Left — straight, thick, dark */}
          <path d="M 88 95 Q 104 89 120 93"
            fill="#200e02" stroke="#200e02" strokeWidth="6.5" strokeLinecap="round"/>
          {/* slight inner arch only */}
          <path d="M 90 94 Q 104 90 118 93"
            fill="none" stroke="#3a1c06" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
          {/* Right — same */}
          <path d="M 160 93 Q 176 89 192 95"
            fill="#200e02" stroke="#200e02" strokeWidth="6.5" strokeLinecap="round"/>
          <path d="M 162 93 Q 176 90 190 94"
            fill="none" stroke="#3a1c06" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>

          {/* ── EYES — round, big, boyish (NO feminine lashes) ── */}
          {/* Left eye — slightly less tall, more circular */}
          <ellipse cx="104" cy="120" rx="19" ry={15 * eyeSY} fill="white"/>
          {/* Eye shadow under lid — subtle */}
          <path d="M 86 115 Q 104 107 122 114"
            fill="none" stroke="#d8a078" strokeWidth="1" opacity="0.3"/>

          {/* Left iris */}
          <ellipse cx={104 + ex * 0.55} cy={120 + ey * 0.55}
            rx="12" ry={12 * eyeSY} fill="url(#b-iris)"/>
          <ellipse cx={104 + ex * 0.55} cy={120 + ey * 0.55}
            rx="9.5" ry={9.5 * eyeSY} fill="#2a1206" opacity="0.5"/>
          {/* Left pupil */}
          <ellipse cx={104 + ex * 0.65} cy={120 + ey * 0.65}
            rx="6" ry={6 * eyeSY} fill="#080402"/>
          {/* Catchlight — single, large, clean */}
          <ellipse cx={106 + ex * 0.4} cy={115 + ey * 0.4}
            rx="4.5" ry={4.5 * eyeSY} fill="white" opacity="0.95"/>
          {/* Small bottom catchlight */}
          <ellipse cx={102 + ex * 0.4} cy={124 + ey * 0.4}
            rx="1.8" ry={1.8 * eyeSY} fill="white" opacity="0.45"/>

          {/* Upper eyelid line — simple, THICK, no lashes */}
          <path d="M 86 113 Q 104 105 122 112"
            fill="none" stroke="#200e02" strokeWidth="3.5" strokeLinecap="round"
            opacity={eyeSY > 0.3 ? 0.95 : 0}/>
          {/* Lower eyelid — simple */}
          <path d="M 87 127 Q 104 133 121 127"
            fill="none" stroke="#b07048" strokeWidth="1.2" strokeLinecap="round" opacity="0.3"/>

          {/* Right eye white */}
          <ellipse cx="176" cy="120" rx="19" ry={15 * eyeSY} fill="white"/>
          <path d="M 158 115 Q 176 107 194 114"
            fill="none" stroke="#d8a078" strokeWidth="1" opacity="0.3"/>

          {/* Right iris */}
          <ellipse cx={176 + ex * 0.55} cy={120 + ey * 0.55}
            rx="12" ry={12 * eyeSY} fill="url(#b-iris)"/>
          <ellipse cx={176 + ex * 0.55} cy={120 + ey * 0.55}
            rx="9.5" ry={9.5 * eyeSY} fill="#2a1206" opacity="0.5"/>
          {/* Right pupil */}
          <ellipse cx={176 + ex * 0.65} cy={120 + ey * 0.65}
            rx="6" ry={6 * eyeSY} fill="#080402"/>
          <ellipse cx={178 + ex * 0.4} cy={115 + ey * 0.4}
            rx="4.5" ry={4.5 * eyeSY} fill="white" opacity="0.95"/>
          <ellipse cx={174 + ex * 0.4} cy={124 + ey * 0.4}
            rx="1.8" ry={1.8 * eyeSY} fill="white" opacity="0.45"/>

          {/* Upper eyelid line right */}
          <path d="M 158 113 Q 176 105 194 112"
            fill="none" stroke="#200e02" strokeWidth="3.5" strokeLinecap="round"
            opacity={eyeSY > 0.3 ? 0.95 : 0}/>
          <path d="M 159 127 Q 176 133 193 127"
            fill="none" stroke="#b07048" strokeWidth="1.2" strokeLinecap="round" opacity="0.3"/>

          {/* ── GLASSES — round, THICK dark frames ── */}
          {/* Left frame */}
          <circle cx="104" cy="120" r="25"
            fill="rgba(10,6,2,0.07)" stroke="#100804" strokeWidth="6"/>
          <circle cx="104" cy="120" r="25"
            fill="none" stroke="#2a1404" strokeWidth="2" opacity="0.4"/>
          {/* Right frame */}
          <circle cx="176" cy="120" r="25"
            fill="rgba(10,6,2,0.07)" stroke="#100804" strokeWidth="6"/>
          <circle cx="176" cy="120" r="25"
            fill="none" stroke="#2a1404" strokeWidth="2" opacity="0.4"/>
          {/* Nose bridge */}
          <path d="M 129 120 Q 140 115 151 120"
            fill="none" stroke="#100804" strokeWidth="5" strokeLinecap="round"/>
          <path d="M 130 119 Q 140 115 150 119"
            fill="none" stroke="#2a1404" strokeWidth="2" opacity="0.4"/>
          {/* Temples */}
          <path d="M 80 108 Q 72 106 66 110"
            fill="none" stroke="#100804" strokeWidth="4.5" strokeLinecap="round"/>
          <path d="M 200 108 Q 208 106 214 110"
            fill="none" stroke="#100804" strokeWidth="4.5" strokeLinecap="round"/>
          {/* Lens glare */}
          <path d="M 88 108 Q 95 103 104 106"
            fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.22"/>
          <path d="M 160 108 Q 167 103 176 106"
            fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.22"/>

          {/* ── NOSE — masculine, simple ── */}
          <path d="M 140 134 Q 135 146 133 152 Q 136 158 140 159 Q 144 158 147 152 Q 145 146 140 134"
            fill="none" stroke="#a06840" strokeWidth="1.8" opacity="0.45"/>
          <ellipse cx="140" cy="155" rx="10" ry="6" fill="#e8b080" opacity="0.4"/>
          {/* Nostrils */}
          <path d="M 133 155 Q 131 160 134 161" fill="none" stroke="#a06840" strokeWidth="1.5" opacity="0.4"/>
          <path d="M 147 155 Q 149 160 146 161" fill="none" stroke="#a06840" strokeWidth="1.5" opacity="0.4"/>

          {/* ── MOUTH — BOY smile (no cupid's bow, no lip gloss) ── */}
          {/* Simple straight-ish smile */}
          <path d="M 118 171 Q 130 180 140 181 Q 150 180 162 171"
            fill="none" stroke="#a06040" strokeWidth="3" strokeLinecap="round"/>
          {/* Upper lip — flat / masculine */}
          <path d="M 120 170 Q 140 168 160 170"
            fill="#c08060" opacity="0.5"/>
          {/* Lower lip — simple, boyish */}
          <path d="M 120 171 Q 130 180 140 182 Q 150 180 160 171 Q 152 178 140 179 Q 128 178 120 171 Z"
            fill="#c89070" opacity="0.5"/>
          {/* Teeth hint */}
          <path d="M 126 174 Q 140 178 154 174 Q 148 180 140 180 Q 132 180 126 174 Z"
            fill="white" opacity="0.6"/>
          {/* Smile creases at corners — boyish */}
          <path d="M 116 171 Q 112 175 114 179" fill="none" stroke="#b07048" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
          <path d="M 164 171 Q 168 175 166 179" fill="none" stroke="#b07048" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>

          {/* Subtle chin definition */}
          <path d="M 128 194 Q 140 200 152 194"
            fill="none" stroke="#b07048" strokeWidth="1.2" opacity="0.2"/>

          {/* ── Hair front layer (over forehead) ── */}
          {/* Forehead hair pieces */}
          <path d="M 92 88 Q 100 72 112 74"
            fill="none" stroke="#2a1404" strokeWidth="4.5" strokeLinecap="round"/>
          <path d="M 104 76 Q 114 60 124 66"
            fill="none" stroke="#3a1c06" strokeWidth="4" strokeLinecap="round"/>
          <path d="M 118 66 Q 128 52 134 60"
            fill="none" stroke="#2a1404" strokeWidth="3.5" strokeLinecap="round"/>
          {/* Main forehead curtain */}
          <path d="M 84 92 Q 96 72 114 68 Q 128 64 140 66 Q 154 68 162 74 Q 178 84 186 94"
            fill="#2a1404"/>
          <path d="M 94 88 Q 108 70 128 68"
            fill="none" stroke="#3a1c06" strokeWidth="3" strokeLinecap="round"/>
          {/* Side frames */}
          <path d="M 72 105 Q 68 88 78 74 Q 88 62 102 62"
            fill="#2a1404"/>
          <path d="M 208 105 Q 212 88 202 74 Q 192 62 178 62"
            fill="#2a1404"/>

        </g>{/* end head group */}

      </svg>
    </div>
  );
};

export default CartoonBoy;
