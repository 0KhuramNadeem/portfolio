import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects } from '../constants';
import WebsitePreviewModal from '../components/WebsitePreviewModal';

const ProjectCard = ({ project, onPreview, index }) => {
  const { name, description, tags, gradient, icon, source_code_link } = project;
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 15, y: -x * 15 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.15 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? 'transform 0.1s ease' : 'transform 0.5s ease',
        }}
        className="glass-card rounded-2xl overflow-hidden border border-[#915eff]/20 hover:border-[#915eff]/50 transition-colors duration-300 h-full flex flex-col cursor-pointer group"
        onClick={() => onPreview(project)}
        title="Click to preview website"
      >
        {/* Gradient header */}
        <div className={`relative bg-gradient-to-br ${gradient} p-8 flex items-center justify-between`}>
          <span className="text-5xl">{icon}</span>

          <div className="flex gap-2">
            {/* Preview button */}
            <button
              onClick={(e) => { e.stopPropagation(); onPreview(project); }}
              className="w-10 h-10 bg-black/30 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
              title="Preview Website"
            >
              🔍
            </button>
            <a
              href={source_code_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-10 h-10 bg-black/30 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors"
              title="GitHub"
            >
              🐙
            </a>
          </div>

          {/* Shine effect */}
          {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
          )}

          {/* "Click to preview" label on hover */}
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur px-3 py-1 rounded-full pointer-events-none"
          >
            <span className="text-white text-[10px] font-medium whitespace-nowrap">🔍 Click to preview</span>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-white font-bold text-lg mb-3 group-hover:text-[#915eff] transition-colors">
            {name}
          </h3>
          <p className="text-[#aaa6c3] text-sm leading-relaxed flex-1">{description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full glass-card border border-[#915eff]/20 text-[#aaa6c3]"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Preview hint */}
          <div className="mt-4 flex items-center gap-2 text-[#915eff]/60 text-xs group-hover:text-[#915eff] transition-colors">
            <span>🌐</span>
            <span>Click card to preview website</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [previewProject, setPreviewProject] = useState(null);

  const categories = ['All', 'React', 'Node.js', 'Three.js', 'Next.js'];

  const filtered = filter === 'All'
    ? projects
    : projects.filter(p => p.tags.some(t => t.toLowerCase().includes(filter.toLowerCase())));

  return (
    <section id="projects" className="section-padding relative">
      <div className="absolute right-1/4 bottom-1/4 w-80 h-80 bg-[#ff6b6b]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#915eff] font-semibold tracking-widest uppercase text-sm mb-4">My Work</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#915eff] to-[#00d9ff] rounded-full mx-auto mt-4" />
          <p className="text-[#aaa6c3] mt-6 max-w-2xl mx-auto">
            Here are some of my best projects. <span className="text-[#915eff]">Click any card</span> to
            see a live website preview with auto-scroll! 🔍
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? 'bg-gradient-to-r from-[#915eff] to-[#00d9ff] text-white shadow-lg shadow-[#915eff]/30'
                  : 'glass-card border border-[#915eff]/20 text-[#aaa6c3] hover:text-white hover:border-[#915eff]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={i}
              onPreview={setPreviewProject}
            />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <p className="text-[#aaa6c3] mb-5">Want to see more of my work?</p>
          <a
            href="https://github.com/khuramnadeem"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-[#915eff]/50 text-white hover:bg-[#915eff]/10 transition-all duration-300 glass-card"
          >
            <span>🐙</span>
            <span>View GitHub Profile</span>
          </a>
        </motion.div>
      </div>

      {/* Website Preview Modal */}
      {previewProject && (
        <WebsitePreviewModal
          project={previewProject}
          onClose={() => setPreviewProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;
