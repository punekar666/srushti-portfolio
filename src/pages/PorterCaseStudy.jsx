import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import './PorterCaseStudy.css';

const useCounter = (target, duration = 1200) => {
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
    <motion.div ref={ref} variants={variants} initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  );
};

const StatCard = ({ number, suffix = '', label, delay }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });
  const animated = useCounter(inView ? number : 0, 1200);
  return (
    <Reveal delay={delay}>
      <div ref={ref} className="pc-stat-card">
        <span className="pc-stat-number">{inView ? animated : 0}{suffix}</span>
        <span className="pc-stat-label">{label}</span>
      </div>
    </Reveal>
  );
};

const sections = [
  { id: 'pc-overview', label: 'Overview' },
  { id: 'pc-problem', label: 'Problem' },
  { id: 'pc-solution', label: 'Solution' },
  { id: 'pc-features', label: 'Features' },
  { id: 'pc-process', label: 'Process' },
  { id: 'pc-challenges', label: 'Challenges' },
  { id: 'pc-outcome', label: 'Outcome' },
];

const PorterCaseStudy = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('pc-overview');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pc-page">
      <motion.div className="pc-progress-bar" style={{ scaleX }} />

      {/* NAV */}
      <nav className="pc-nav">
        <span className="pc-nav-eyebrow">UI/UX CASE STUDY</span>
        <button className="pc-back-btn" onClick={() => navigate('/')}>← Back to Portfolio</button>
      </nav>

      {/* FLOATING TRACKER */}
      <div className="pc-section-tracker">
        {sections.map((s) => (
          <button key={s.id}
            className={`pc-tracker-dot ${activeSection === s.id ? 'active' : ''}`}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
            title={s.label}>
            <span className="pc-tracker-tooltip">{s.label}</span>
          </button>
        ))}
      </div>

      {/* HERO */}
      <header className="pc-hero">
        <div className="pc-hero-blobs">
          <div className="pc-blob pc-blob-1" /><div className="pc-blob pc-blob-2" /><div className="pc-blob pc-blob-3" />
        </div>
        <div className="pc-hero-inner">
          <div className="pc-hero-left">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="pc-tag-row">
                <span className="pc-chip">ADMIN &amp; LOGISTICS</span>
                <span className="pc-chip pc-chip-outline">UI/UX Designer</span>
              </div>
            </motion.div>
            <motion.div className="pc-project-icon-wrap" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <img src="/porter_truck_3d.png" alt="Porter" className="pc-project-icon" />
            </motion.div>
            <motion.h1 className="pc-hero-title" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              Logistics<br /><span className="pc-hero-accent">Dashboard</span>
            </motion.h1>
            <motion.p className="pc-hero-tagline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.35 }}>
              Centralized operations management for orders, drivers, vehicles &amp; payments
            </motion.p>
            <motion.div className="pc-meta-row" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
              {[
                { label: 'Role', value: 'UI/UX Designer' },
                { label: 'Platform', value: 'Web Dashboard' },
                { label: 'Tools', value: 'Figma · FigJam' },
              ].map((m, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <div className="pc-meta-divider" />}
                  <div className="pc-meta-block">
                    <span className="pc-meta-label">{m.label}</span>
                    <span className="pc-meta-value">{m.value}</span>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
          </div>
          <motion.div className="pc-hero-right" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <img src="/porter.png" alt="Porter Dashboard" className="pc-hero-mockup" />
            <div className="pc-hero-glow" />
          </motion.div>
        </div>

        {/* Stats Strip */}
        <motion.div className="pc-stats-strip" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }}>
          <StatCard number={4} label="Core Modules" delay={0} />
          <div className="pc-stats-divider" />
          <StatCard number={5} label="Key Features" delay={0.1} />
          <div className="pc-stats-divider" />
          <StatCard number={3} label="Challenges Solved" delay={0.2} />
          <div className="pc-stats-divider" />
          <StatCard number={1} label="Unified Dashboard" delay={0.3} />
        </motion.div>
      </header>

      <div className="pc-page-body">

        {/* OVERVIEW */}
        <section id="pc-overview" className="pc-block">
          <Reveal>
            <div className="pc-section-header">
              <div className="pc-icon-badge pc-badge-blue">📋</div>
              <div><p className="pc-section-eyebrow">01</p><h2 className="pc-section-title">Overview</h2></div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="pc-lead-text">
              A logistics management dashboard designed to simplify and streamline day-to-day
              operations such as order tracking, driver coordination, and delivery management.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="pc-body-text">
              Managing logistics involves multiple moving parts — orders, drivers, vehicles, and payments.
              This project consolidates all of those into a <strong>single, centralized interface</strong> that
              provides clarity and control for operations teams.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="pc-overview-pills">
              {['Order Tracking', 'Driver Management', 'Vehicle Data', 'Payment Analytics', 'Real-time Updates'].map((p, i) => (
                <span key={i} className="pc-overview-pill">{p}</span>
              ))}
            </div>
          </Reveal>
        </section>

        <div className="pc-rule" />

        {/* PROBLEM */}
        <section id="pc-problem" className="pc-block">
          <div className="pc-two-col">
            <div className="pc-text-side">
              <Reveal>
                <div className="pc-section-header">
                  <div className="pc-icon-badge pc-badge-red">❗</div>
                  <div><p className="pc-section-eyebrow">02</p><h2 className="pc-section-title">The Problem</h2></div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="pc-sub-head">Logistics teams face these daily pain points:</p>
                <ul className="pc-bullet-list">
                  <li>Multiple moving parts — orders, drivers, vehicles, payments — with no unified view</li>
                  <li>Cluttered, inefficient systems that slow down decision making</li>
                  <li>No structured way to monitor live operations at a glance</li>
                </ul>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="pc-callout pc-callout-red">
                  <span className="pc-callout-icon">⚡</span>
                  <span>The result: delayed deliveries, miscommunicated assignments, and operational chaos with no single source of truth.</span>
                </div>
              </Reveal>
            </div>
            <Reveal direction="left" delay={0.15}>
              <div className="pc-ill-side">
                <div className="pc-ill-card pc-ill-red">
                  <span className="pc-ill-emoji">🚧</span>
                  <p className="pc-ill-caption">The Problem</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="pc-rule" />

        {/* SOLUTION */}
        <section id="pc-solution" className="pc-block">
          <Reveal>
            <div className="pc-section-header">
              <div className="pc-icon-badge pc-badge-blue">💡</div>
              <div><p className="pc-section-eyebrow">03</p><h2 className="pc-section-title">The Solution</h2></div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="pc-lead-text">
              A <strong>centralized dashboard</strong> that organizes logistics operations into clear, manageable
              sections — making it easier for users to track orders, manage drivers, and monitor overall performance.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="pc-callout pc-callout-blue">
              <span className="pc-callout-icon">🎯</span>
              <span>The focus was on <strong>clarity and structure</strong> — breaking down complex workflows into simple, intuitive
              interactions while maintaining a clean and organized interface.</span>
            </div>
          </Reveal>
        </section>

        <div className="pc-rule" />

        {/* KEY FEATURES */}
        <section id="pc-features" className="pc-block">
          <Reveal>
            <div className="pc-section-header">
              <div className="pc-icon-badge pc-badge-teal">⚙️</div>
              <div><p className="pc-section-eyebrow">04</p><h2 className="pc-section-title">Key Features</h2></div>
            </div>
          </Reveal>
          <div className="pc-features-grid">
            {[
              { icon: '📦', title: 'Order Lifecycle Tracking', desc: 'Real-time visibility across all order states — new, assigned, ongoing, and completed.', color: '#eff6ff' },
              { icon: '🚗', title: 'Driver Management', desc: 'Performance insights, assignment tracking, and availability status for every driver.', color: '#f0fdf4' },
              { icon: '🚛', title: 'Vehicle Management', desc: 'Full fleet overview — vehicle details, assignment history, and maintenance status.', color: '#fffbeb' },
              { icon: '👥', title: 'Customer Data', desc: 'Centralised customer profiles, order history, and communication logs.', color: '#faf5ff' },
              { icon: '💳', title: 'Payment Tracking', desc: 'Revenue analytics, payment status monitoring, and transaction history at a glance.', color: '#fff0f6' },
              { icon: '📊', title: 'Analytics Overview', desc: 'High-level KPI cards and performance charts for quick operational decision-making.', color: '#f0fdfa' },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="pc-feature-card" style={{ background: f.color }}>
                  <div className="pc-feature-icon">{f.icon}</div>
                  <div>
                    <p className="pc-feature-title">{f.title}</p>
                    <p className="pc-feature-desc">{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="pc-rule" />

        {/* DESIGN PROCESS */}
        <section id="pc-process" className="pc-block">
          <Reveal>
            <div className="pc-section-header">
              <div className="pc-icon-badge pc-badge-purple">🎨</div>
              <div><p className="pc-section-eyebrow">05</p><h2 className="pc-section-title">Design Process</h2></div>
            </div>
          </Reveal>
          <div className="pc-process-grid">
            {[
              { icon: '🤝', step: 'Empathize', desc: 'Researching the pain points of logistics teams and operational managers.' },
              { icon: '🎯', step: 'Define', desc: 'Framing the key problem: fragmented data and no unified operations view.' },
              { icon: '✏️', step: 'Ideate', desc: 'Mapping user flows, data hierarchies, and module structures.' },
              { icon: '🖥️', step: 'Design', desc: 'Wireframes to high-fidelity UI — structured layouts with clear visual hierarchy.' },
              { icon: '🧪', step: 'Refine', desc: 'Iterating on usability, data density, and interaction clarity.' },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="pc-process-card">
                  <div className="pc-process-num">0{i + 1}</div>
                  <div className="pc-process-icon">{p.icon}</div>
                  <p className="pc-process-step">{p.step}</p>
                  <p className="pc-process-desc">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="pc-rule" />

        {/* CHALLENGES */}
        <section id="pc-challenges" className="pc-block">
          <Reveal>
            <div className="pc-section-header">
              <div className="pc-icon-badge pc-badge-orange">🔍</div>
              <div><p className="pc-section-eyebrow">06</p><h2 className="pc-section-title">Key Challenges</h2></div>
            </div>
          </Reveal>
          <div className="pc-challenges-grid">
            {[
              { challenge: 'Presenting large volumes of operational data without overwhelming users', solution: 'Used progressive disclosure, KPI cards, and collapsible sections to control information density' },
              { challenge: 'Designing efficient workflows for multiple simultaneous user actions', solution: 'Implemented clear task flows with contextual actions and minimal clicks to completion' },
              { challenge: 'Maintaining usability while handling real-time data updates', solution: 'Designed with live-update indicators, status badges, and non-disruptive refresh patterns' },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className="pc-challenge-card">
                  <div className="pc-ch-prob">
                    <span className="pc-ch-badge">Challenge</span>
                    <p>{c.challenge}</p>
                  </div>
                  <div className="pc-ch-connector">
                    <div className="pc-ch-line" /><div className="pc-ch-icon">→</div><div className="pc-ch-line" />
                  </div>
                  <div className="pc-ch-sol">
                    <span className="pc-ch-badge pc-ch-green">Solution</span>
                    <p>{c.solution}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="pc-rule" />

        {/* OUTCOME */}
        <section id="pc-outcome" className="pc-block">
          <div className="pc-two-col" style={{ gap: '64px' }}>
            <div className="pc-text-side">
              <Reveal>
                <div className="pc-section-header">
                  <div className="pc-icon-badge pc-badge-green">🚀</div>
                  <div><p className="pc-section-eyebrow">07</p><h2 className="pc-section-title">Outcome</h2></div>
                </div>
              </Reveal>
              <div className="pc-impact-list">
                {[
                  { icon: '✅', text: 'Improved operational clarity for logistics teams' },
                  { icon: '⚡', text: 'Faster decision-making with unified data views' },
                  { icon: '📊', text: 'Easier workflow management across all departments' },
                ].map((item, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="pc-impact-row">
                      <div className="pc-impact-icon">{item.icon}</div>
                      <p>{item.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <div className="pc-text-side">
              <Reveal delay={0.1}>
                <div className="pc-section-header">
                  <div className="pc-icon-badge pc-badge-blue">🧠</div>
                  <div><p className="pc-section-eyebrow">08</p><h2 className="pc-section-title">Learnings</h2></div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <ul className="pc-bullet-list">
                  <li>Designing data-heavy dashboards requires strong hierarchy and visual restraint</li>
                  <li>Real-time systems demand careful UX planning for state changes</li>
                  <li>Breaking down complex operations into modular sections dramatically improves usability</li>
                  <li>Early wireframing saved significant time during high-fidelity iterations</li>
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CONCLUSION */}
        <Reveal>
          <section className="pc-conclusion-block">
            <div className="pc-conclusion-inner">
              <div className="pc-conclusion-icon">🚛</div>
              <h2 className="pc-conclusion-title">Conclusion</h2>
              <p className="pc-conclusion-quote">
                "This project proved that <em>clarity is a design feature</em>. By structuring
                complex operational data into a unified, intuitive dashboard, users gained
                the control and confidence to manage logistics efficiently."
              </p>
              <button className="pc-back-btn-large" onClick={() => navigate('/')}>← Back to Portfolio</button>
            </div>
          </section>
        </Reveal>

      </div>
    </div>
  );
};

export default PorterCaseStudy;
