import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  // Assemble/Disassemble paths
  const leftX = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rightX = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const avatarScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const bgTextX = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section className="hero" ref={targetRef}>
      <div className="hero-bg-text-container">
        <motion.h1
          className="hero-bg-text"
          style={{ x: bgTextX, opacity }}
        >
          UI/UX DESIGNER
        </motion.h1>
      </div>

      <div className="hero-bottom-section">
        {/* Left Column - Flies in from Left */}
        <motion.div
          className="hero-left-column"
          style={{ x: leftX, opacity }}
        >
          <div className="hero-sketch-cards">
            {[1, 2, 3].map((num) => (
              <div key={num} className={`sketch-card card-${num}`}>
                <img
                  src={num === 1 ? "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" :
                    num === 2 ? "https://www.vectorlogo.zone/logos/framer/framer-icon.svg" :
                      "https://upload.wikimedia.org/wikipedia/commons/5/59/Sketch_Logo.svg"}
                  alt="Design Tool"
                  className="sketch-logo"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Center Column - Anchor */}
        <motion.div
          className="hero-center-column"
          style={{ scale: avatarScale, opacity }}
        >
          <div className="hero-avatar-wrapper">
            <img src="/avatar.png" alt="Srushti Punekar" className="hero-avatar" />
          </div>
        </motion.div>

        {/* Right Column - Flies in from Right */}
        <motion.div
          className="hero-right-column"
          style={{ x: rightX, opacity }}
        >
          <div className="hero-text-box">
            <h2>Hey. I'm Srushti,</h2>
            <p>
              I am a UI/UX Designer dedicated to weaving complex user problems into seamless, high-impact digital stories.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
