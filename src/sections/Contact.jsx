import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError('');
    // Simulate sending (replace with EmailJS in production)
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    { icon: '📍', label: 'Location', value: 'Lahore, Pakistan' },
    { icon: '✉️', label: 'Email', value: 'nkhuram897@gmail.com', href: 'mailto:nkhuram897@gmail.com' },
    { icon: '📱', label: 'Phone', value: '+92 300 438 0050', href: 'tel:+923000000000' },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/khuram-nadeem', href: 'https://linkedin.com/in/khuram-nadeem' },
  ];

  return (
    <section id="contact" className="section-padding relative">
      {/* Background effects */}
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-[#915eff]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute right-0 top-1/4 w-80 h-80 bg-[#00d9ff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#915eff] font-semibold tracking-widest uppercase text-sm mb-4">Get In Touch</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
            Contact <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#915eff] to-[#00d9ff] rounded-full mx-auto mt-4" />
          <p className="text-[#aaa6c3] mt-6 max-w-xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you.
            Let's build something amazing together! 🚀
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-white font-bold text-2xl mb-8">Let's <span className="gradient-text">Connect</span></h3>

            <div className="space-y-5 mb-10">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-xl border border-[#915eff]/20 flex-shrink-0 group-hover:border-[#915eff]/60 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[#aaa6c3] text-xs uppercase tracking-wider">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-white font-medium hover:text-[#915eff] transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p className="text-[#aaa6c3] text-sm mb-4">Find me on</p>
              <div className="flex gap-4">
                {[
                  { label: 'GitHub', icon: '🐙', href: 'https://github.com/khuramnadeem' },
                  { label: 'LinkedIn', icon: '💼', href: 'https://linkedin.com/in/khuram-nadeem' },
                  { label: 'Twitter', icon: '🐦', href: 'https://twitter.com/khuramnadeem' },
                  { label: 'Instagram', icon: '📸', href: '#' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-xl border border-[#915eff]/20 hover:border-[#915eff]/60 hover:scale-110 hover:bg-[#915eff]/10 transition-all duration-300"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="mt-10 glass-card rounded-2xl p-5 border border-green-500/30 inline-flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-green-400 rounded-full" />
                <div className="absolute inset-0 bg-green-400 rounded-full ping-slow" />
              </div>
              <span className="text-white text-sm font-medium">Available for freelance & full-time roles</span>
            </div>
          </motion.div>

          {/* Right - Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-8 border border-[#915eff]/20"
            >
              <h3 className="text-white font-bold text-xl mb-6">Send a <span className="gradient-text">Message</span></h3>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-6xl mb-4">🎉</div>
                  <h4 className="text-white text-xl font-bold mb-2">Message Sent!</h4>
                  <p className="text-[#aaa6c3]">Thanks for reaching out. I'll get back to you soon!</p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-6 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#915eff] to-[#00d9ff] text-white text-sm font-medium"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm text-[#aaa6c3] mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-[#0d0b1e] border border-[#915eff]/30 rounded-xl px-4 py-3 text-white placeholder-[#555] focus:outline-none focus:border-[#915eff] transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm text-[#aaa6c3] mb-2">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-[#0d0b1e] border border-[#915eff]/30 rounded-xl px-4 py-3 text-white placeholder-[#555] focus:outline-none focus:border-[#915eff] transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm text-[#aaa6c3] mb-2">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="w-full bg-[#0d0b1e] border border-[#915eff]/30 rounded-xl px-4 py-3 text-white placeholder-[#555] focus:outline-none focus:border-[#915eff] transition-colors resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#915eff] to-[#00d9ff] text-white font-semibold hover:opacity-90 disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>Send Message 🚀</>
                    )}
                  </button>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
