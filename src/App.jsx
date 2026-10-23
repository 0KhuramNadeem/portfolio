import './index.css';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Blog from './sections/Blog';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="relative min-h-screen bg-[#050816] text-white overflow-x-hidden">
      {/* 3D Particle Background */}
      <ParticleBackground />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Blog />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Scroll to top */}
      <ScrollToTop />
    </div>
  );
}

export default App;
