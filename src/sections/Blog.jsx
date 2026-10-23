import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const posts = [
  {
    title: 'Building Immersive 3D Experiences with Three.js and React',
    excerpt: 'Learn how to integrate Three.js into your React applications to create stunning 3D visualizations and interactive experiences that wow your users.',
    date: 'Sep 28, 2026',
    readTime: '8 min read',
    category: 'Three.js',
    categoryColor: '#915eff',
    icon: '🎮',
  },
  {
    title: 'Mastering GSAP Animations: From Zero to Hero',
    excerpt: 'A comprehensive guide to using GreenSock Animation Platform (GSAP) to create buttery-smooth animations that elevate the user experience of any web app.',
    date: 'Sep 15, 2026',
    readTime: '12 min read',
    category: 'Animation',
    categoryColor: '#00d9ff',
    icon: '✨',
  },
  {
    title: 'React Performance Optimization: 10 Techniques That Actually Work',
    excerpt: 'Discover proven techniques to make your React applications blazing fast — from code splitting and memo to virtualization and bundle analysis.',
    date: 'Sep 2, 2026',
    readTime: '10 min read',
    category: 'React',
    categoryColor: '#ff6b6b',
    icon: '⚛️',
  },
];

const BlogCard = ({ title, excerpt, date, readTime, category, categoryColor, icon, index }) => {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ translateY: -6 }}
      className="glass-card rounded-2xl overflow-hidden border border-[#915eff]/20 hover:border-[#915eff]/50 transition-all duration-300 cursor-pointer group flex flex-col"
    >
      {/* Header */}
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-4">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold border"
            style={{ color: categoryColor, borderColor: `${categoryColor}40`, background: `${categoryColor}15` }}
          >
            {category}
          </span>
          <span className="text-3xl group-hover:scale-110 transition-transform">{icon}</span>
        </div>
        <h3 className="text-white font-bold text-lg leading-snug mb-3 group-hover:text-[#915eff] transition-colors">
          {title}
        </h3>
        <p className="text-[#aaa6c3] text-sm leading-relaxed">{excerpt}</p>
      </div>

      {/* Footer */}
      <div className="p-6 pt-5 mt-auto flex items-center justify-between border-t border-white/5">
        <span className="text-[#aaa6c3] text-xs">📅 {date}</span>
        <span className="text-[#aaa6c3] text-xs">⏱ {readTime}</span>
      </div>

      {/* Bottom gradient line on hover */}
      <div
        className="h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
        style={{ background: `linear-gradient(90deg, ${categoryColor}, ${categoryColor}50)` }}
      />
    </motion.div>
  );
};

const Blog = () => {
  return (
    <section id="blog" className="section-padding relative">
      <div className="absolute right-1/4 top-1/3 w-72 h-72 bg-[#00d9ff]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#915eff] font-semibold tracking-widest uppercase text-sm mb-4">Latest Articles</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
            From The <span className="gradient-text">Blog</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#915eff] to-[#00d9ff] rounded-full mx-auto mt-4" />
          <p className="text-[#aaa6c3] mt-6 max-w-xl mx-auto">
            I share my knowledge and experiences through articles about web development,
            design patterns, and emerging technologies.
          </p>
        </div>

        {/* Blog cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-12">
          {posts.map((post, i) => (
            <BlogCard key={post.title} {...post} index={i} />
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#915eff]/50 text-white hover:bg-[#915eff]/10 transition-all duration-300 glass-card group"
          >
            <span>View All Articles</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
