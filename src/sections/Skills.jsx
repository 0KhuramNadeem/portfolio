import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { technologies } from '../constants';

const SkillBar = ({ name, icon, color, level, index }) => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <span className="text-white text-sm font-medium">{name}</span>
        </div>
        <span className="text-sm font-bold" style={{ color }}>{level}%</span>
      </div>
      <div className="h-2 bg-[#151030] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay: index * 0.07 + 0.3, ease: 'easeOut' }}
          className="h-full rounded-full relative"
          style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg" style={{ boxShadow: `0 0 8px ${color}` }} />
        </motion.div>
      </div>
    </motion.div>
  );
};

const SkillBubble = ({ name, icon, color, index }) => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.15, rotate: 5 }}
      className="flex flex-col items-center gap-2 cursor-default"
    >
      <div
        className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center text-3xl border transition-all duration-300 hover:shadow-lg"
        style={{ borderColor: `${color}40`, boxShadow: `0 0 20px ${color}20` }}
      >
        {icon}
      </div>
      <span className="text-xs text-[#aaa6c3] font-medium">{name}</span>
    </motion.div>
  );
};

const Skills = () => {
  const half = Math.ceil(technologies.length / 2);
  const leftSkills = technologies.slice(0, half);
  const rightSkills = technologies.slice(half);

  return (
    <section id="skills" className="section-padding relative">
      {/* Background accent */}
      <div className="absolute left-0 top-1/2 w-72 h-72 bg-[#915eff]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#915eff] font-semibold tracking-widest uppercase text-sm mb-4">What I Know</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#915eff] to-[#00d9ff] rounded-full mx-auto mt-4" />
        </div>

        {/* Skill bubbles */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mb-20"
        >
          {technologies.map((tech, i) => (
            <SkillBubble key={tech.name} {...tech} index={i} />
          ))}
        </motion.div>

        {/* Skill bars - two columns */}
        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-6">
          {leftSkills.map((tech, i) => (
            <SkillBar key={tech.name} {...tech} index={i} />
          ))}
          {rightSkills.map((tech, i) => (
            <SkillBar key={tech.name} {...tech} index={i + half} />
          ))}
        </div>

        {/* Tools & extras */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-16 glass-card rounded-2xl p-8 border border-[#915eff]/20"
        >
          <h3 className="text-white font-bold text-xl mb-6 text-center">
            Tools & <span className="gradient-text">Technologies</span>
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              'VS Code', 'Figma', 'Postman', 'Docker', 'AWS', 'GitHub Actions',
              'Jira', 'Webpack', 'Vite', 'GraphQL', 'Redis', 'Nginx',
            ].map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 rounded-full text-sm text-[#aaa6c3] border border-[#915eff]/20 hover:border-[#915eff]/60 hover:text-white hover:bg-[#915eff]/10 transition-all duration-200 cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
