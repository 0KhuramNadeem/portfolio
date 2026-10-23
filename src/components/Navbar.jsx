import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { navLinks } from '../constants';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#050816]/90 backdrop-blur-xl border-b border-[#915eff]/20 shadow-lg shadow-[#915eff]/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="hero" smooth duration={500} className="cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#915eff] to-[#00d9ff] rounded-lg opacity-80 blur-sm" />
              <div className="relative bg-gradient-to-br from-[#915eff] to-[#00d9ff] rounded-lg w-full h-full flex items-center justify-center font-bold text-white text-sm">
                KN
              </div>
            </div>
            <span className="text-white font-bold text-xl tracking-wide hidden sm:block">
              Khuram<span className="gradient-text">.</span>
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                to={link.id}
                smooth
                duration={500}
                spy
                onSetActive={() => setActiveSection(link.id)}
                className={`cursor-pointer text-sm font-medium transition-all duration-300 relative group ${
                  activeSection === link.id ? 'text-[#915eff]' : 'text-[#aaa6c3] hover:text-white'
                }`}
              >
                {link.title}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#915eff] to-[#00d9ff] transition-all duration-300 ${
                    activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Hire Me button */}
        <a
          href="mailto:khuram@example.com"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#915eff] to-[#00d9ff] text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <span>Hire Me</span>
          <span>✉️</span>
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass-card mx-4 mb-4 rounded-2xl p-6">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.id}
                  smooth
                  duration={500}
                  onClick={() => setMenuOpen(false)}
                  className="text-[#aaa6c3] hover:text-white cursor-pointer text-base font-medium transition-colors"
                >
                  {link.title}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="mailto:khuram@example.com"
                className="inline-block px-6 py-2.5 rounded-full bg-gradient-to-r from-[#915eff] to-[#00d9ff] text-white text-sm font-medium mt-2"
              >
                Hire Me ✉️
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
