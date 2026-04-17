import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="#hero" className="nav-logo">
          <img src="/nav_logo.png" alt="Srushti Punekar" className="nav-logo-img" />
        </a>

        <div className="nav-links">
          <a href="#work" className="nav-link">Work</a>
          <a href="#about" className="nav-link">About me</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
