import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './About.css';

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Constructive Assembly Paths (Compressed bounds so they finish before page end)
  const yAvatar = useTransform(scrollYProgress, [0, 0.3], [-100, 0]);
  const xQuote = useTransform(scrollYProgress, [0.05, 0.35], [-150, 0]);
  const yEdu = useTransform(scrollYProgress, [0.1, 0.4], [150, 0]);
  const xExp = useTransform(scrollYProgress, [0, 0.35], [150, 0]);
  const ySkills = useTransform(scrollYProgress, [0.05, 0.4], [100, 0]);
  const yFooter = useTransform(scrollYProgress, [0.1, 0.45], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const experiences = [
    {
      company: 'Black Orange Talent',
      role: 'Product Development and Training Intern',
      date: 'Oct 2023 – May 2024',
      icon: '/black_orange_talent_logo.jpg'
    },
    {
      company: 'LuciaInvent Technologies',
      role: 'Product Development and Training Intern',
      date: 'Dec 2024 – Mar 2025',
      icon: '/lucainvent.jpeg'
    },
    {
      company: 'Thynktech India',
      role: 'UI/UX Design Intern',
      date: 'Current',
      icon: '/Thynk%20tech%20logo.jpg'
    }
  ];

  const designSkills = [
    'UI/UX Design', 'Wireframing', 'Prototyping', 'Figma',
    'User Flows', 'User Research'
  ];

  return (
    <section className="about-section" id="about" ref={containerRef}>
      <div className="about-container">
        <div className="about-grid">

          {/* Left Column */}
          <div className="about-column-left">
            <motion.div
              className="avatar-standalone"
              style={{ y: yAvatar, opacity }}
            >
              <div className="status-badge-standalone">
                <span className="pulse"></span>
                AVAILABLE FOR WORK
              </div>
              <img src="/avatar 2.png" alt="Srushti Punekar" className="avatar-img-standalone" />
            </motion.div>

            <motion.div
              className="about-card quote-card glass-box lime-glass"
              style={{ x: xQuote, opacity }}
            >
              <p className="stylish-quote">
                <span className="serif-italics">Clarity in chaos.</span> <br />
                <span className="sans-bold">Design with intent.</span>
              </p>
            </motion.div>

            <motion.div
              className="about-card education-card glass-box"
              style={{ y: yEdu, opacity }}
            >
              <div className="sect-block">
                <h3>EDUCATION</h3>
                <p>ISBM College of Engineering, Pune<br />
                  <span className="cgpa-pill">CGPA 8.7</span>
                </p>
              </div>
              <div className="sect-block" style={{ marginTop: 'auto' }}>
                <h3>TECHNICAL SKILL</h3>
                <p>HTML, CSS, JavaScript, React.js, Python, C++</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="about-column-right">
            <motion.div
              className="about-card experience-card glass-box"
              style={{ x: xExp, opacity }}
            >
              <h3>PROFESSIONAL EXPERIENCE</h3>
              <div className="exp-list">
                {experiences.map((exp, i) => (
                  <div key={i} className="exp-row">
                    <div className="exp-icon-box glass-box">
                      <img src={exp.icon} alt={exp.company} />
                    </div>
                    <div className="exp-content">
                      <div className="exp-header">
                        <h4>{exp.company}</h4>
                        <span className="exp-date">{exp.date}</span>
                      </div>
                      <p>{exp.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="about-card skills-card glass-box"
              style={{ y: ySkills, opacity }}
            >
              <h3>DESIGN SKILLSET</h3>
              <div className="skill-cloud">
                {designSkills.map((skill, i) => (
                  <span key={i} className="skill-pill">{skill}</span>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="about-card footer-card glass-box lime-glass"
              style={{ y: yFooter, opacity }}
            >
              <div className="social-group">
                {/* GMAIL LINK */}
                <a
                  href="mailto:srushtipunekar@gmail.com"
                  className="social-link"
                  target="_blank"
                  rel="noreferrer"

                >
                  <div className="social-icon-box glass-box">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" />
                  </div>
                </a>

                {/* LINKEDIN LINK */}
                <a
                  href="https://www.linkedin.com/in/srushti-punekar-020294257/"
                  className="social-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="social-icon-box glass-box">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" />
                  </div>
                </a>
              </div>

              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="shimmer-btn" style={{ textDecoration: 'none' }}>
                <span className="shimmer-effect"></span>
                <span className="btn-label">GET RESUME</span>
                <span className="btn-icon">→</span>
              </a>
            </motion.div>
          </div> {/* End of about-column-right */}
        </div> {/* End of about-grid */}
      </div> {/* End of about-container */}
    </section>
  );
};

export default About;