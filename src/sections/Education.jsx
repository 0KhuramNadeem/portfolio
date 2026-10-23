import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { education } from '../constants';

const EducationCard = ({ degree, institution, period, grade, icon, color, description, index }) => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ translateY: -8 }}
      className="relative glass-card rounded-2xl p-8 border cursor-default transition-all duration-300 hover:shadow-xl group"
      style={{ borderColor: `${color}30` }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
      />

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-6 shadow-lg"
        style={{ background: `${color}20`, boxShadow: `0 0 20px ${color}30` }}
      >
        {icon}
      </div>

      <h3 className="text-white font-bold text-lg mb-2 leading-snug">{degree}</h3>
      <p className="font-semibold mb-1" style={{ color }}>{institution}</p>
      <p className="text-[#aaa6c3] text-sm mb-2">{description}</p>

      <div className="flex flex-wrap gap-3 mt-4">
        <span className="glass-card px-3 py-1.5 rounded-full text-xs text-[#aaa6c3] border border-white/10">
          📅 {period}
        </span>
        <span
          className="px-3 py-1.5 rounded-full text-xs font-semibold border"
          style={{ color, borderColor: `${color}40`, background: `${color}15` }}
        >
          🏆 {grade}
        </span>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 40px ${color}10` }}
      />
    </motion.div>
  );
};

const Education = () => {
  const certifications = [
    { name: 'React Developer Certification', org: 'Meta', year: '2023', icon: '⚛️' },
    { name: 'Node.js Application Developer', org: 'OpenJS Foundation', year: '2022', icon: '🟢' },
    { name: 'AWS Cloud Practitioner', org: 'Amazon Web Services', year: '2022', icon: '☁️' },
    { name: 'Google Analytics Certified', org: 'Google', year: '2021', icon: '📊' },
    { name: 'MongoDB Associate Developer', org: 'MongoDB Inc.', year: '2021', icon: '🍃' },
    { name: 'Docker Certified Associate', org: 'Docker Inc.', year: '2023', icon: '🐳' },
  ];

  return (
    <section id="education" className="section-padding relative">
      <div className="absolute left-1/3 top-1/4 w-64 h-64 bg-[#915eff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#915eff] font-semibold tracking-widest uppercase text-sm mb-4">Academic Background</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
            Education & <span className="gradient-text">Certifications</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#915eff] to-[#00d9ff] rounded-full mx-auto mt-4" />
        </div>

        {/* Education cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-16">
          {education.map((edu, i) => (
            <EducationCard key={edu.degree} {...edu} index={i} />
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h3 className="text-white font-bold text-2xl text-center mb-8">
            Professional <span className="gradient-text">Certifications</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="glass-card rounded-xl p-5 border border-[#915eff]/20 flex items-center gap-4 hover:border-[#915eff]/50 transition-all duration-300 group cursor-default"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">{cert.icon}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{cert.name}</p>
                  <p className="text-[#aaa6c3] text-xs mt-1">{cert.org} · {cert.year}</p>
                </div>
                <span className="ml-auto text-[#915eff] opacity-0 group-hover:opacity-100 transition-opacity">✓</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
