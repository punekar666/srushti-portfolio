import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('.wheel-node')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const springConfig = { damping: 20, stiffness: 250 };
  const cursorX = useSpring(mousePos.x - 10, springConfig);
  const cursorY = useSpring(mousePos.y - 10, springConfig);

  return (
    <motion.div
      className={`custom-cursor ${isHovering ? 'hover' : ''}`}
      style={{
        left: cursorX,
        top: cursorY,
      }}
    >
      <div className="cursor-dot" />
    </motion.div>
  );
};

export default CustomCursor;
