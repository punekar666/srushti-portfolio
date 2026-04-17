import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import ShubhVivahCaseStudy from './pages/ShubhVivahCaseStudy';
import PorterCaseStudy from './pages/PorterCaseStudy';
import CRMCaseStudy from './pages/CRMCaseStudy';
import './index.css';



function AppContent() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="app-container">
      <motion.div className="progress-bar" style={{ scaleX }} />
      <Navbar />
      <Hero />
      <Work />
      <About />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/case-study/shubh-vivah" element={<ShubhVivahCaseStudy />} />
        <Route path="/case-study/porter" element={<PorterCaseStudy />} />
        <Route path="/case-study/crm" element={<CRMCaseStudy />} />
      </Routes>
    </Router>
  );
}

export default App;
