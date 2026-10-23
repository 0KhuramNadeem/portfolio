const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[#915eff]/20 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#915eff] to-[#00d9ff] rounded-lg flex items-center justify-center font-bold text-white text-sm">
              KN
            </div>
            <span className="text-white font-bold text-lg">
              Khuram<span className="gradient-text">.</span>Nadeem
            </span>
          </div>

          {/* Center links */}
          <div className="flex gap-6 text-sm text-[#aaa6c3]">
            {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[#aaa6c3] text-sm text-center">
            © {year} Khuram Nadeem. Built with{' '}
            <span className="gradient-text font-semibold">❤️ + React + Three.js</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
