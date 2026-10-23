import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * WebsitePreviewModal
 * Shows a browser-chrome style modal with an iframe that auto-scrolls
 * to preview the linked website.
 */
const WebsitePreviewModal = ({ project, onClose }) => {
  const iframeRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const scrollIntervalRef = useRef(null);
  const isPlaceholder = !project.live_link || project.live_link === '#';

  /* ── Close on Escape ── */
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
      clearInterval(scrollIntervalRef.current);
    };
  }, [onClose]);

  /* ── Auto-scroll after iframe loads ── */
  const handleIframeLoad = () => {
    setLoaded(true);
    startAutoScroll();
  };

  const startAutoScroll = () => {
    setScrolling(true);
    let scrollY = 0;
    let direction = 1;
    clearInterval(scrollIntervalRef.current);
    scrollIntervalRef.current = setInterval(() => {
      const iframe = iframeRef.current;
      if (!iframe) return;
      try {
        const win = iframe.contentWindow;
        const doc = iframe.contentDocument || win.document;
        const maxScroll = doc.body.scrollHeight - iframe.offsetHeight;
        scrollY += direction * 1.2;
        if (scrollY >= maxScroll) { direction = -1; }
        if (scrollY <= 0) { direction = 1; scrollY = 0; }
        win.scrollTo(0, scrollY);
      } catch {
        // cross-origin blocked — show fallback
      }
    }, 16);
  };

  const stopAutoScroll = () => {
    setScrolling(false);
    clearInterval(scrollIntervalRef.current);
  };

  /* ── For placeholder URLs, show a demo preview card ── */
  const DemoPreview = () => (
    <div className="w-full h-full bg-gradient-to-br from-[#0d0b1e] to-[#1a0a3e] flex flex-col items-center justify-center gap-6 p-10">
      <div className="text-7xl">{project.icon}</div>
      <h2 className="text-white text-3xl font-bold text-center">{project.name}</h2>
      <p className="text-[#aaa6c3] text-center max-w-md leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {project.tags.map(t => (
          <span key={t} className="px-3 py-1 rounded-full text-xs bg-[#915eff]/20 text-[#915eff] border border-[#915eff]/30">
            #{t}
          </span>
        ))}
      </div>
      <div className="flex gap-4 mt-4">
        <a href={project.source_code_link} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#915eff] to-[#00d9ff] text-white font-medium text-sm hover:opacity-90 transition-opacity">
          🐙 View Code
        </a>
      </div>
      <p className="text-[#555] text-xs mt-2">Live demo coming soon…</p>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

        {/* Modal window */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 40 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="relative w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl"
          style={{ boxShadow: '0 0 80px rgba(145,94,255,0.3), 0 0 160px rgba(0,217,255,0.1)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── Browser Chrome ── */}
          <div className="bg-[#1a1030] border-b border-[#915eff]/30 px-4 py-3 flex items-center gap-3">
            {/* Traffic lights */}
            <div className="flex gap-2">
              <button onClick={onClose}
                className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-400 transition-colors flex items-center justify-center group">
                <span className="text-[8px] text-red-900 opacity-0 group-hover:opacity-100">✕</span>
              </button>
              <div className="w-3.5 h-3.5 rounded-full bg-yellow-500" />
              <div className="w-3.5 h-3.5 rounded-full bg-green-500" />
            </div>

            {/* Address bar */}
            <div className="flex-1 mx-4 bg-[#0d0b1e] rounded-lg px-4 py-1.5 flex items-center gap-2 border border-[#915eff]/20">
              <span className="text-green-400 text-xs">🔒</span>
              <span className="text-[#aaa6c3] text-xs font-mono truncate">
                {isPlaceholder ? `${project.name.toLowerCase().replace(/\s+/g, '-')}.vercel.app` : project.live_link}
              </span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {!isPlaceholder && (
                <button
                  onClick={scrolling ? stopAutoScroll : startAutoScroll}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border border-[#915eff]/30 text-[#aaa6c3] hover:text-white hover:border-[#915eff] transition-all"
                  title={scrolling ? 'Pause scroll' : 'Auto-scroll'}
                >
                  {scrolling ? '⏸ Pause' : '▶ Scroll'}
                </button>
              )}
              {!isPlaceholder && (
                <a href={project.live_link} target="_blank" rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-[#915eff] to-[#00d9ff] text-white hover:opacity-90 transition-opacity whitespace-nowrap">
                  Open ↗
                </a>
              )}
              <button onClick={onClose}
                className="w-8 h-8 rounded-lg glass-card border border-[#915eff]/20 text-[#aaa6c3] hover:text-white flex items-center justify-center hover:border-red-500/50 transition-all text-sm">
                ✕
              </button>
            </div>
          </div>

          {/* Project info strip */}
          <div className={`bg-gradient-to-r ${project.gradient} px-6 py-3 flex items-center gap-3`}>
            <span className="text-2xl">{project.icon}</span>
            <div>
              <h3 className="text-white font-bold text-sm">{project.name}</h3>
              <div className="flex gap-1.5 mt-1">
                {project.tags.slice(0, 4).map(t => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-black/30 text-white/80">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="ml-auto flex gap-3">
              <a href={project.source_code_link} target="_blank" rel="noopener noreferrer"
                className="text-xs text-white/80 hover:text-white transition-colors">🐙 Code</a>
            </div>
          </div>

          {/* ── Content / iframe ── */}
          <div className="relative bg-[#050816]" style={{ height: '65vh' }}>
            {isPlaceholder ? (
              <DemoPreview />
            ) : (
              <>
                {/* Loading spinner */}
                {!loaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#050816]">
                    <div className="w-12 h-12 border-2 border-[#915eff]/30 border-t-[#915eff] rounded-full animate-spin" />
                    <p className="text-[#aaa6c3] text-sm">Loading website preview…</p>
                  </div>
                )}
                <iframe
                  ref={iframeRef}
                  src={project.live_link}
                  title={project.name}
                  className="w-full h-full border-0"
                  onLoad={handleIframeLoad}
                  style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s' }}
                />
                {/* Scroll indicator */}
                {loaded && scrolling && (
                  <div className="absolute bottom-4 right-4 glass-card px-3 py-1.5 rounded-full border border-[#915eff]/30 flex items-center gap-2 pointer-events-none">
                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="w-1 h-4 bg-gradient-to-b from-[#915eff] to-[#00d9ff] rounded-full"
                    />
                    <span className="text-xs text-[#aaa6c3]">Auto-scrolling</span>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Bottom status bar */}
          <div className="bg-[#0d0b1e] border-t border-[#915eff]/20 px-4 py-2 flex items-center justify-between">
            <span className="text-[#555] text-xs font-mono">
              {isPlaceholder ? 'Demo Mode' : (loaded ? '✓ Page loaded' : 'Loading...')}
            </span>
            <span className="text-[#555] text-xs">Press ESC to close</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WebsitePreviewModal;
