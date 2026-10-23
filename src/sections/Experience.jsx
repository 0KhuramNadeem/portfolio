import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { experiences } from '../constants';

const ExperienceCard = ({ title, company_name, date, color, points, index, isLast }) => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 }}
      className={`relative flex gap-8 ${isEven ? 'flex-row' : 'flex-row-reverse'} items-start mb-12`}
    >
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-5 h-5 rounded-full mt-6 z-10 shadow-lg ring-4"
          style={{
            backgroundColor: color,
            ringColor: `${color}40`,
            boxShadow: `0 0 15px ${color}80`,
          }}
        />
        {!isLast && (
          <div
            className="w-0.5 flex-1 mt-2 min-h-16 opacity-30"
            style={{ background: `linear-gradient(to bottom, ${color}, transparent)` }}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ scale: 1.02, translateY: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="flex-1 glass-card rounded-2xl p-8 border cursor-default transition-shadow duration-300 hover:shadow-xl"
        style={{ borderColor: `${color}30` }}
      >
        {/* Top */}
        <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
          <div>
            <h3 className="text-white text-xl font-bold">{title}</h3>
            <p className="font-semibold mt-1" style={{ color }}>{company_name}</p>
          </div>
          <span className="glass-card px-4 py-1.5 rounded-full text-sm text-[#aaa6c3] border border-white/10 whitespace-nowrap">
            📅 {date}
          </span>
        </div>

        {/* Points */}
        <ul className="space-y-2.5">
          {points.map((point, i) => (
            <li key={i} className="flex gap-3 text-[#aaa6c3] text-sm leading-relaxed">
              <span style={{ color }} className="mt-0.5 flex-shrink-0">▶</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="section-padding relative">
      <div className="absolute right-0 top-1/3 w-72 h-72 bg-[#00d9ff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#915eff] font-semibold tracking-widest uppercase text-sm mb-4">My Journey</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#915eff] to-[#00d9ff] rounded-full mx-auto mt-4" />
        </div>

        {/* Timeline */}
        <div>
          {experiences.map((exp, i) => (
            <ExperienceCard
              key={exp.company_name}
              {...exp}
              index={i}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
