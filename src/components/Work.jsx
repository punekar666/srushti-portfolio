import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Work.css';

const projects = [
  {
    id: 0,
    tag: 'ADMIN & LOGISTICS',
    title: 'Logistics Management Dashboard',
    desc: 'A comprehensive admin dashboard designed to manage orders, drivers, vehicles, and payments, providing real-time tracking and data insights.',
    largeImg: '/porter.png',
    glowColor: 'rgba(59, 130, 246, 0.4)', /* Blue Glow */
    iconImg: '/porter_truck_3d.png',
    path: '/case-study/porter'
  },
  {
    id: 1,
    tag: 'WEB & MOBILE',
    title: 'Shubh Vivah — Wedding Vendor Platform',
    desc: 'A two-sided platform designed to connect wedding service providers with users, helping couples easily discover and book quality vendors.',
    largeImg: '/shubh vivah.png',
    glowColor: 'rgba(239, 68, 68, 0.25)', /* Red Glow */
    iconImg: '/wedding_heart_3d.png',
    path: '/case-study/shubh-vivah'
  },
  {
    id: 2,
    tag: 'CRM & SALES',
    title: 'Sales CRM Dashboard',
    desc: 'A CRM system focused on managing leads, tracking sales pipelines, and handling client interactions via an intuitive interface.',
    largeImg: '/crm.png',
    glowColor: 'rgba(16, 185, 129, 0.3)', /* Teal Glow */
    iconImg: '/crm_icon_3d.png',
    path: '/case-study/crm'
  }
];

const Work = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [animDir, setAnimDir] = useState('up');
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Enter [0→0.35] = fly in | Stay [0.35→0.65] = visible | Exit [0.65→1] = fly out + fade
  const xDetails = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [-200, 0, 0, -200]);
  const xWheel   = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [200, 0, 0, 200]);
  const wheelScale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.8, 1, 1, 0.8]);
  const opacity  = useTransform(scrollYProgress, [0, 0.25, 0.7, 1], [0, 1, 1, 0]);

  const wheelRotation = (1 - activeIndex) * 20;

  const handleNodeClick = (index) => {
    if (index === activeIndex) return;
    setAnimDir(index > activeIndex ? 'up' : 'down');
    setActiveIndex(index);
  };

  const handleCaseStudyClick = () => {
    navigate(projects[activeIndex].path);
  };

  return (
    <section className="work-section" id="work" ref={sectionRef}>
      <div className="work-container">

        {/* Project Details - Flies from Left */}
        <motion.div 
          className="work-left"
          style={{ x: xDetails, opacity }}
        >
          <div className="project-card">
            <div key={activeIndex} className={`animated-text-group scroll-${animDir}`}>
              <span className="project-index">0{activeIndex + 1}</span>
              <span className="project-tag">{projects[activeIndex].tag}</span>
              <h2 className="project-title">{projects[activeIndex].title}</h2>
              <p className="project-desc">{projects[activeIndex].desc}</p>
            </div>
            <button className="project-btn" onClick={handleCaseStudyClick}>
              CASE STUDY
            </button>
          </div>
        </motion.div>

        {/* Logo Wheel - Flies from Right */}
        <motion.div 
          className="work-right"
          style={{ x: xWheel, scale: wheelScale, opacity }}
        >
          {/* Center Showcase - Floating 3D Device & Orbits */}
          <div className="hero-mockup-wrapper">
            <img 
              key={`img-${activeIndex}`}
              src={projects[activeIndex].largeImg}
              alt={projects[activeIndex].title}
              className={`wheel-showcase-img fade-in-${animDir}`}
              style={{ filter: `drop-shadow(0 40px 60px ${projects[activeIndex].glowColor})` }}
            />
          </div>

          <div className="wheel-wrapper">
            <div
              className="wheel-track"
              style={{ transform: `translateY(-50%) rotate(${wheelRotation}deg)` }}
            >
              {projects.map((proj, index) => {
                const isActive = activeIndex === index;
                const angleDeg = 180 + (index - 1) * 20;
                const angleRad = (angleDeg * Math.PI) / 180;
                
                const xPos = 600 + 600 * Math.cos(angleRad);
                const yPos = 600 + 600 * Math.sin(angleRad);

                return (
                  <div
                    key={proj.id}
                    className={`wheel-node ${isActive ? 'active' : ''}`}
                    style={{ left: `${xPos}px`, top: `${yPos}px` }}
                    onClick={() => handleNodeClick(index)}
                  >
                    <div
                      className="node-content"
                      style={{ transform: `translate(-50%, -50%) rotate(${-wheelRotation}deg)` }}
                    >
                      <img src={proj.iconImg} alt={proj.tag} className="node-dot" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Work;
