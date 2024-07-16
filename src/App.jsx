import React from 'react';
import './App.css';
import Hero from './sections/Hero/Hero';
import Projects from './sections/Projects/Projects';
import Skills from './sections/Skills/Skills';
import Contact from './sections/Contact/Contact';
import Footer from './sections/Footer/Footer';
import ParticlesBackground from './sections/Particles/pb';

function App() {
  return (
    <>
      <ParticlesBackground />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;
