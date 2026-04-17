import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import './ShubhVivahCaseStudy.css';

/* ---- Animated counter hook ---- */
const useCounter = (target, duration = 1500) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
};

/* ---- Animate on scroll wrapper ---- */
const Reveal = ({ children, delay = 0, direction = 'up' }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
};

/* ---- Stat counter card ---- */
const StatCard = ({ number, suffix = '', label, delay }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });
  const count = inView ? number : 0;
  const animated = useCounter(count, 1200);
  return (
    <Reveal delay={delay}>
      <div ref={ref} className="cs-stat-card">
        <span className="cs-stat-number">{inView ? animated : 0}{suffix}</span>
        <span className="cs-stat-label">{label}</span>
      </div>
    </Reveal>
  );
};

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'users', label: 'Users' },
  { id: 'journey', label: 'Journey' },
  { id: 'process', label: 'Process' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'impact', label: 'Impact' },
];

const ShubhVivahCaseStudy = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="cs-page">

      {/* Reading progress bar */}
      <motion.div className="cs-progress-bar" style={{ scaleX }} />

      {/* ---- NAV ---- */}
      <nav className="cs-nav">
        <span className="cs-nav-eyebrow">UI/UX CASE STUDY</span>
        <button className="cs-back-btn" onClick={() => navigate('/')}>
          ← Back to Portfolio
        </button>
      </nav>

      {/* ---- Floating Section Indicator ---- */}
      <div className="cs-section-tracker">
        {sections.map((s) => (
          <button
            key={s.id}
            className={`cs-tracker-dot ${activeSection === s.id ? 'active' : ''}`}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
            title={s.label}
          >
            <span className="cs-tracker-tooltip">{s.label}</span>
          </button>
        ))}
      </div>

      {/* ===== HERO ===== */}
      <header className="cs-hero">
        <div className="cs-hero-bg-blobs">
          <div className="cs-blob cs-blob-1" />
          <div className="cs-blob cs-blob-2" />
          <div className="cs-blob cs-blob-3" />
        </div>
        <div className="cs-hero-inner">
          <div className="cs-hero-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="cs-tag-row">
                <span className="cs-chip">WEB &amp; MOBILE</span>
                <span className="cs-chip cs-chip-outline">UI/UX Design Intern</span>
              </div>
            </motion.div>

            <motion.div
              className="cs-project-icon-wrap"
              initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <img src="/wedding_heart_3d.png" alt="Shubh Vivah" className="cs-project-icon" />
            </motion.div>

            <motion.h1
              className="cs-hero-title"
              initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Shubh<br /><span className="cs-hero-accent">Vivah</span>
            </motion.h1>

            <motion.p
              className="cs-hero-tagline"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              Bridging Wedding Service Providers with Customers
            </motion.p>

            <motion.div
              className="cs-meta-row"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {[
                { label: 'Role', value: 'UI/UX Design Intern' },
                { label: 'Platform', value: 'Web & Mobile' },
                { label: 'Tools', value: 'Figma · FigJam' },
              ].map((m, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <div className="cs-meta-divider" />}
                  <div className="cs-meta-block">
                    <span className="cs-meta-label">{m.label}</span>
                    <span className="cs-meta-value">{m.value}</span>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="cs-hero-right"
            initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <img src="/shubh vivah.png" alt="Shubh Vivah Mockup" className="cs-hero-mockup" />
            <div className="cs-hero-glow" />
          </motion.div>
        </div>

        {/* Stats Strip */}
        <motion.div
          className="cs-stats-strip"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <StatCard number={2} label="Platforms Designed" delay={0} />
          <div className="cs-stats-divider" />
          <StatCard number={6} label="Core Features" delay={0.1} />
          <div className="cs-stats-divider" />
          <StatCard number={5} label="User Types" delay={0.2} />
          <div className="cs-stats-divider" />
          <StatCard number={3} label="Challenges Solved" delay={0.3} />
        </motion.div>
      </header>

      <div className="cs-page-body">

        {/* ===== OVERVIEW ===== */}
        <section id="overview" className="cs-block">
          <Reveal>
            <div className="cs-section-header">
              <div className="cs-icon-badge cs-badge-blue">📋</div>
              <div>
                <p className="cs-section-eyebrow">01</p>
                <h2 className="cs-section-title">Overview</h2>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="cs-lead-text">
              Shubh Vivah is a matrimonial and wedding services platform designed to simplify
              the journey from finding a partner to planning a perfect wedding.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="cs-body-text">
              This project focuses on designing a <strong>vendor platform (web + mobile)</strong> that enables
              service providers to showcase and manage their services — acting as a structured bridge
              between vendors and clients, reducing friction on both sides.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="cs-overview-pills">
              {['Vendor Onboarding', 'Service Listings', 'Dashboard Management', 'Mobile Responsive'].map((p, i) => (
                <span key={i} className="cs-overview-pill">{p}</span>
              ))}
            </div>
          </Reveal>
        </section>

        <div className="cs-rule" />

        {/* ===== PROBLEM STATEMENT ===== */}
        <section id="problem" className="cs-block">
          <div className="cs-two-col-section">
            <div className="cs-text-side">
              <Reveal>
                <div className="cs-section-header">
                  <div className="cs-icon-badge cs-badge-red">🎯</div>
                  <div>
                    <p className="cs-section-eyebrow">02</p>
                    <h2 className="cs-section-title">Problem Statement</h2>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="cs-sub-head">Wedding vendors face major pain points:</p>
                <ul className="cs-bullet-list">
                  <li>No dedicated platform for showcasing their services</li>
                  <li>Difficulty reaching relevant, interested customers</li>
                  <li>No structured system for managing bookings &amp; pricing</li>
                </ul>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="cs-callout cs-callout-red">
                  <span className="cs-callout-icon">⚡</span>
                  <span>This fragmentation leads to confusing user journeys, loss of business for vendors,
                  and a broken experience for clients trying to plan their weddings.</span>
                </div>
              </Reveal>
            </div>
            <Reveal direction="left" delay={0.15}>
              <div className="cs-illustration-side">
                <div className="cs-ill-card cs-ill-red">
                  <span className="cs-ill-emoji">❓</span>
                  <p className="cs-ill-caption">The Problem</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="cs-rule" />

        {/* ===== PROPOSED SOLUTION ===== */}
        <section id="solution" className="cs-block">
          <Reveal>
            <div className="cs-section-header">
              <div className="cs-icon-badge cs-badge-green">💡</div>
              <div>
                <p className="cs-section-eyebrow">03</p>
                <h2 className="cs-section-title">Proposed Solution</h2>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="cs-lead-text">
              A <strong>vendor-centric platform</strong> that acts as a structured bridge — simplifying
              onboarding, service discovery, and management for wedding professionals.
            </p>
          </Reveal>
          <div className="cs-features-grid">
            {[
              { icon: '🚀', title: 'Easy Onboarding', desc: 'Step-by-step, simplified sign-up and profile setup — designed especially for non-tech users.', color: '#fff5f5' },
              { icon: '🗂️', title: 'Service Management', desc: 'Add, edit, and organise multiple service categories from one unified dashboard.', color: '#f0fdf4' },
              { icon: '💰', title: 'Pricing Control', desc: 'Full flexibility over pricing tiers, availability windows, and package customisation.', color: '#fffbeb' },
              { icon: '📊', title: 'Dashboard Tracking', desc: 'Real-time overview of bookings, inquiries, and visibility performance metrics.', color: '#eff6ff' },
              { icon: '📱', title: 'Mobile Responsive', desc: 'Consistent, polished experience across desktop and mobile for on-the-go management.', color: '#faf5ff' },
              { icon: '🔍', title: 'Smart Discovery', desc: 'Users can search, filter, and browse vendors by category, location, and price range.', color: '#fff0f6' },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 0.07} direction="up">
                <div className="cs-feature-card" style={{ background: f.color }}>
                  <div className="cs-feature-icon-wrap">{f.icon}</div>
                  <div>
                    <p className="cs-feature-title">{f.title}</p>
                    <p className="cs-feature-desc">{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="cs-rule" />

        {/* ===== TARGET USERS ===== */}
        <section id="users" className="cs-block">
          <div className="cs-two-col-section">
            <Reveal direction="right" delay={0.1}>
              <div className="cs-illustration-side">
                <div className="cs-ill-card cs-ill-yellow">
                  <span className="cs-ill-emoji">👰</span>
                  <p className="cs-ill-caption">Target Users</p>
                </div>
              </div>
            </Reveal>
            <div className="cs-text-side">
              <Reveal>
                <div className="cs-section-header">
                  <div className="cs-icon-badge cs-badge-yellow">👥</div>
                  <div>
                    <p className="cs-section-eyebrow">04</p>
                    <h2 className="cs-section-title">Target Users</h2>
                  </div>
                </div>
              </Reveal>
              <div className="cs-users-grid">
                {[
                  { icon: '📸', label: 'Photographers' },
                  { icon: '🍽️', label: 'Caterers' },
                  { icon: '💐', label: 'Florists' },
                  { icon: '🎪', label: 'Event Managers' },
                  { icon: '🏛️', label: 'Venue Providers' },
                ].map((u, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <div className="cs-user-pill">
                      <span>{u.icon}</span> {u.label}
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.4}>
                <div className="cs-callout cs-callout-yellow">
                  <span className="cs-callout-icon">💡</span>
                  <span>Insight: Many users are <strong>non-tech savvy</strong>, so simplicity and
                  clarity were the core design principles throughout.</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <div className="cs-rule" />

        {/* ===== USER JOURNEY ===== */}
        <section id="journey" className="cs-block">
          <Reveal>
            <div className="cs-section-header">
              <div className="cs-icon-badge cs-badge-purple">🗺️</div>
              <div>
                <p className="cs-section-eyebrow">05</p>
                <h2 className="cs-section-title">User Journey</h2>
              </div>
            </div>
          </Reveal>
          <div className="cs-journey-flow">
            {[
              { label: 'Sign Up', icon: '📝', desc: 'Quick registration' },
              { label: 'Profile Setup', icon: '👤', desc: 'Brand identity' },
              { label: 'Add Services', icon: '➕', desc: 'List offerings' },
              { label: 'Publish', icon: '🚀', desc: 'Go live' },
              { label: 'Manage', icon: '📊', desc: 'Track & grow' },
            ].map((s, i, arr) => (
              <React.Fragment key={i}>
                <Reveal delay={i * 0.1}>
                  <div className="cs-journey-node">
                    <div className="cs-journey-icon-box">{s.icon}</div>
                    <div className="cs-journey-text">
                      <span className="cs-journey-step">STEP 0{i + 1}</span>
                      <span className="cs-journey-label">{s.label}</span>
                      <span className="cs-journey-desc">{s.desc}</span>
                    </div>
                  </div>
                </Reveal>
                {i < arr.length - 1 && <div className="cs-journey-line"><div className="cs-journey-arrow-head" /></div>}
              </React.Fragment>
            ))}
          </div>
        </section>

        <div className="cs-rule" />

        {/* ===== DESIGN PROCESS ===== */}
        <section id="process" className="cs-block">
          <Reveal>
            <div className="cs-section-header">
              <div className="cs-icon-badge cs-badge-teal">🎨</div>
              <div>
                <p className="cs-section-eyebrow">06</p>
                <h2 className="cs-section-title">Design Process</h2>
              </div>
            </div>
          </Reveal>
          <div className="cs-process-grid">
            {[
              { icon: '🤝', step: 'Empathize', desc: 'Researching vendor pain points, behavior, and motivations.' },
              { icon: '🎯', step: 'Define', desc: 'Framing the core problem: fragmented vendor management.' },
              { icon: '✏️', step: 'Ideate', desc: 'Sketching user flows and mapping the platform architecture.' },
              { icon: '🖥️', step: 'Design', desc: 'Low-fidelity wireframes to high-fidelity Figma mockups.' },
              { icon: '🧪', step: 'Test', desc: 'Gathering user feedback and iterating on usability.' },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="cs-process-card">
                  <div className="cs-process-num">0{i + 1}</div>
                  <div className="cs-process-icon">{p.icon}</div>
                  <p className="cs-process-step">{p.step}</p>
                  <p className="cs-process-desc">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="cs-rule" />

        {/* ===== CHALLENGES ===== */}
        <section id="challenges" className="cs-block">
          <Reveal>
            <div className="cs-section-header">
              <div className="cs-icon-badge cs-badge-orange">⚡</div>
              <div>
                <p className="cs-section-eyebrow">07</p>
                <h2 className="cs-section-title">Challenges &amp; Solutions</h2>
              </div>
            </div>
          </Reveal>
          <div className="cs-challenges-grid">
            {[
              { challenge: 'Complex multi-field forms were overwhelming for non-tech users', solution: 'Simplified into guided, step-by-step inputs with clear progress indicators' },
              { challenge: 'Managing multiple services simultaneously felt chaotic', solution: 'Introduced a unified dashboard with categorised service management' },
              { challenge: 'Keeping the UI accessible without sacrificing functionality', solution: 'Used clean layouts, large CTAs, and minimal cognitive load principles' },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className="cs-challenge-card">
                  <div className="cs-challenge-prob">
                    <span className="cs-ch-badge">Challenge</span>
                    <p>{c.challenge}</p>
                  </div>
                  <div className="cs-ch-connector">
                    <div className="cs-ch-line" />
                    <div className="cs-ch-icon">→</div>
                    <div className="cs-ch-line" />
                  </div>
                  <div className="cs-challenge-sol">
                    <span className="cs-ch-badge cs-ch-green">Solution</span>
                    <p>{c.solution}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="cs-rule" />

        {/* ===== IMPACT + LEARNINGS ===== */}
        <section id="impact" className="cs-block">
          <div className="cs-two-col-section" style={{ gap: '64px', alignItems: 'flex-start' }}>
            <div className="cs-text-side">
              <Reveal>
                <div className="cs-section-header">
                  <div className="cs-icon-badge cs-badge-green">📈</div>
                  <div>
                    <p className="cs-section-eyebrow">08</p>
                    <h2 className="cs-section-title">Impact</h2>
                  </div>
                </div>
              </Reveal>
              <div className="cs-impact-list">
                {[
                  { icon: '📈', text: 'Improved vendor visibility on the platform' },
                  { icon: '📵', text: 'Reduced dependency on offline word-of-mouth' },
                  { icon: '🗂️', text: 'Structured, centralised service management' },
                ].map((item, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="cs-impact-row">
                      <div className="cs-impact-ico-wrap">{item.icon}</div>
                      <p>{item.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <div className="cs-text-side">
              <Reveal delay={0.1}>
                <div className="cs-section-header">
                  <div className="cs-icon-badge cs-badge-blue">🧠</div>
                  <div>
                    <p className="cs-section-eyebrow">09</p>
                    <h2 className="cs-section-title">Learnings</h2>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <ul className="cs-bullet-list">
                  <li>Designing for real users with varying tech literacy levels</li>
                  <li>Balancing product goals with genuine user needs</li>
                  <li>Improved confidence in dashboard UX patterns</li>
                  <li>Cross-functional collaboration with developers</li>
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===== CONCLUSION ===== */}
        <Reveal>
          <section className="cs-conclusion-block">
            <div className="cs-conclusion-inner">
              <div className="cs-conclusion-icon">✨</div>
              <h2 className="cs-conclusion-title">Conclusion</h2>
              <p className="cs-conclusion-quote">
                "This project shows how <em>thoughtful design</em> can bridge the gap between vendors and
                users through a simple, structured platform — proving that <em>clarity of intent</em> is
                the most powerful design tool."
              </p>
              <button className="cs-back-btn-large" onClick={() => navigate('/')}>
                ← Back to Portfolio
              </button>
            </div>
          </section>
        </Reveal>

      </div>
    </div>
  );
};

export default ShubhVivahCaseStudy;
