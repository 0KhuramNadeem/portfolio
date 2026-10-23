import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { services } from '../constants';

const SectionWrapper = ({ children, id }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      id={id}
    >
      {children}
    </motion.div>
  );
};

const ServiceCard = ({ title, icon, description, index }) => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative p-0.5 rounded-2xl overflow-hidden cursor-default"
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#915eff] via-[#00d9ff] to-[#ff6b6b] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative glass-card rounded-2xl p-8 h-full border border-[#915eff]/20 group-hover:border-transparent transition-all duration-300 group-hover:bg-[#1a0a3e]/80">
        <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <h3 className="text-white text-xl font-bold mb-3">{title}</h3>
        <p className="text-[#aaa6c3] text-sm leading-relaxed">{description}</p>
        <div className="mt-6 w-12 h-1 bg-gradient-to-r from-[#915eff] to-[#00d9ff] rounded-full group-hover:w-full transition-all duration-500" />
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <SectionWrapper>
          {/* Section header */}
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[#915eff] font-semibold tracking-widest uppercase text-sm mb-4"
            >
              Introduction
            </motion.p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#915eff] to-[#00d9ff] rounded-full mx-auto mt-4" />
          </div>

          {/* About content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <p className="text-[#aaa6c3] text-base sm:text-lg leading-8 mb-6">
                I'm <span className="text-white font-semibold">Khuram Nadeem</span>, a passionate
                Full Stack Web Developer with <span className="gradient-text font-semibold">5+ years</span> of
                experience building modern, scalable, and beautiful web applications.
              </p>
              <p className="text-[#aaa6c3] text-base sm:text-lg leading-8 mb-6">
                I specialize in <span className="text-[#915eff] font-medium">React</span>,{' '}
                <span className="text-[#00d9ff] font-medium">Node.js</span>, and{' '}
                <span className="text-[#ff6b6b] font-medium">Three.js</span>, crafting immersive
                digital experiences that push the boundaries of what's possible on the web.
              </p>
              <p className="text-[#aaa6c3] text-base sm:text-lg leading-8">
                When I'm not coding, I'm exploring new technologies, contributing to open source,
                or mentoring aspiring developers. I believe in clean code, thoughtful design, and
                the power of continuous learning. 🚀
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                {[
                  { label: 'Location', value: '📍 Lahore, Pakistan' },
                  { label: 'Email', value: '✉️ khuram@example.com' },
                  { label: 'Availability', value: '✅ Open to work' },
                ].map((info) => (
                  <div key={info.label} className="glass-card rounded-xl px-4 py-3 border border-[#915eff]/20">
                    <span className="text-[#aaa6c3] text-sm">{info.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Visual element */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative flex items-center justify-center"
            >
              <div className="relative w-72 h-72">
                {/* Rotating rings */}
                <div className="absolute inset-0 rounded-full border-2 border-[#915eff]/30 animate-spin" style={{ animationDuration: '20s' }} />
                <div className="absolute inset-4 rounded-full border-2 border-[#00d9ff]/30 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                <div className="absolute inset-8 rounded-full border-2 border-[#ff6b6b]/30 animate-spin" style={{ animationDuration: '10s' }} />

                {/* Center content */}
                <div className="absolute inset-12 rounded-full bg-gradient-to-br from-[#915eff]/20 to-[#00d9ff]/20 glass-card flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-black gradient-text">5+</div>
                    <div className="text-xs text-[#aaa6c3] mt-1">Years of<br />Excellence</div>
                  </div>
                </div>

                {/* Orbiting icons */}
                {['⚛️', '🟢', '🎨', '🗄️'].map((icon, i) => {
                  const angle = (i * 90) * (Math.PI / 180);
                  const r = 130;
                  const x = Math.cos(angle) * r;
                  const y = Math.sin(angle) * r;
                  return (
                    <div
                      key={i}
                      className="absolute w-10 h-10 glass-card rounded-full flex items-center justify-center text-lg border border-[#915eff]/30"
                      style={{
                        left: `calc(50% + ${x}px - 20px)`,
                        top: `calc(50% + ${y}px - 20px)`,
                      }}
                    >
                      {icon}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Service cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.title} {...service} index={i} />
            ))}
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
};

export default About;
