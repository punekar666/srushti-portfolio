import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import './CRMCaseStudy.css';

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
    hidden: { opacity: 0, y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0, x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0 },
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
      <div ref={ref} className="crm-stat-card">
        <span className="crm-stat-number">{inView ? animated : 0}{suffix}</span>
        <span className="crm-stat-label">{label}</span>
      </div>
    </Reveal>
  );
};

const sections = [
  { id: 'crm-overview', label: 'Overview' },
  { id: 'crm-problem', label: 'Problem' },
  { id: 'crm-solution', label: 'Solution' },
  { id: 'crm-features', label: 'Features' },
  { id: 'crm-process', label: 'Process' },
  { id: 'crm-challenges', label: 'Challenges' },
  { id: 'crm-outcome', label: 'Outcome' },
];

const CRMCaseStudy = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('crm-overview');
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
    <div className="crm-page">
      <motion.div className="crm-progress-bar" style={{ scaleX }} />

      {/* NAV */}
      <nav className="crm-nav">
        <span className="crm-nav-eyebrow">UI/UX CASE STUDY</span>
        <button className="crm-back-btn" onClick={() => navigate('/')}>← Back to Portfolio</button>
      </nav>

      {/* FLOATING TRACKER */}
      <div className="crm-section-tracker">
        {sections.map((s) => (
          <button key={s.id}
            className={`crm-tracker-dot ${activeSection === s.id ? 'active' : ''}`}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
            title={s.label}>
            <span className="crm-tracker-tooltip">{s.label}</span>
          </button>
        ))}
      </div>

      {/* HERO */}
      <header className="crm-hero">
        <div className="crm-hero-blobs">
          <div className="crm-blob crm-blob-1" /><div className="crm-blob crm-blob-2" /><div className="crm-blob crm-blob-3" />
        </div>
        <div className="crm-hero-inner">
          <div className="crm-hero-left">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="crm-tag-row">
                <span className="crm-chip">CRM &amp; SALES</span>
                <span className="crm-chip crm-chip-outline">UI/UX Designer</span>
              </div>
            </motion.div>
            <motion.div className="crm-project-icon-wrap" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <img src="/crm_icon_3d.png" alt="CRM" className="crm-project-icon" />
            </motion.div>
            <motion.h1 className="crm-hero-title" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              Sales CRM<br /><span className="crm-hero-accent">Dashboard</span>
            </motion.h1>
            <motion.p className="crm-hero-tagline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.35 }}>
              Managing leads, tracking pipelines, and organizing client interactions — all in one place
            </motion.p>
            <motion.div className="crm-meta-row" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
              {[
                { label: 'Role', value: 'UI/UX Designer' },
                { label: 'Platform', value: 'Web Dashboard' },
                { label: 'Tools', value: 'Figma · FigJam' },
              ].map((m, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <div className="crm-meta-divider" />}
                  <div className="crm-meta-block">
                    <span className="crm-meta-label">{m.label}</span>
                    <span className="crm-meta-value">{m.value}</span>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
          </div>
          <motion.div className="crm-hero-right" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <img src="/crm.png" alt="CRM Dashboard" className="crm-hero-mockup" />
            <div className="crm-hero-glow" />
          </motion.div>
        </div>

        {/* Stats Strip */}
        <motion.div className="crm-stats-strip" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }}>
          <StatCard number={4} label="Core Features" delay={0} />
          <div className="crm-stats-divider" />
          <StatCard number={3} label="Challenges Solved" delay={0.1} />
          <div className="crm-stats-divider" />
          <StatCard number={1} label="Kanban Pipeline" delay={0.2} />
          <div className="crm-stats-divider" />
          <StatCard number={5} label="Process Steps" delay={0.3} />
        </motion.div>
      </header>

      <div className="crm-page-body">

        {/* OVERVIEW */}
        <section id="crm-overview" className="crm-block">
          <Reveal>
            <div className="crm-section-header">
              <div className="crm-icon-badge crm-badge-teal">📋</div>
              <div><p className="crm-section-eyebrow">01</p><h2 className="crm-section-title">Overview</h2></div>
            </div>
          </Reveal>
          <Reveal delay={0.1}><p className="crm-lead-text">A CRM dashboard designed to help sales teams manage leads, track pipelines, and organize client interactions in a clear and efficient way.</p></Reveal>
          <Reveal delay={0.2}><p className="crm-body-text">Sales teams often deal with scattered information and unstructured workflows. This project consolidates leads, contacts, deals, and tasks into a <strong>single, structured CRM interface</strong> that keeps every team member aligned and productive.</p></Reveal>
          <Reveal delay={0.3}>
            <div className="crm-overview-pills">
              {['Lead Management', 'Sales Pipeline', 'Client Contacts', 'Task Tracking', 'Performance Reports'].map((p, i) => (
                <span key={i} className="crm-overview-pill">{p}</span>
              ))}
            </div>
          </Reveal>
        </section>

        <div className="crm-rule" />

        {/* PROBLEM */}
        <section id="crm-problem" className="crm-block">
          <div className="crm-two-col">
            <div className="crm-text-side">
              <Reveal>
                <div className="crm-section-header">
                  <div className="crm-icon-badge crm-badge-red">❗</div>
                  <div><p className="crm-section-eyebrow">02</p><h2 className="crm-section-title">The Problem</h2></div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="crm-sub-head">Sales teams struggle with:</p>
                <ul className="crm-bullet-list">
                  <li>Scattered lead information with no unified view</li>
                  <li>Unstructured workflows making follow-ups inconsistent</li>
                  <li>No clear way to track deals across pipeline stages</li>
                </ul>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="crm-callout crm-callout-red">
                  <span className="crm-callout-icon">⚡</span>
                  <span>The result: missed deals, inconsistent follow-ups, and teams spending more time <em>finding</em> information than <em>acting</em> on it.</span>
                </div>
              </Reveal>
            </div>
            <Reveal direction="left" delay={0.15}>
              <div className="crm-ill-side">
                <div className="crm-ill-card crm-ill-red">
                  <span className="crm-ill-emoji">📉</span>
                  <p className="crm-ill-caption">The Problem</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="crm-rule" />

        {/* SOLUTION */}
        <section id="crm-solution" className="crm-block">
          <Reveal>
            <div className="crm-section-header">
              <div className="crm-icon-badge crm-badge-green">💡</div>
              <div><p className="crm-section-eyebrow">03</p><h2 className="crm-section-title">The Solution</h2></div>
            </div>
          </Reveal>
          <Reveal delay={0.1}><p className="crm-lead-text">A <strong>structured CRM system</strong> that organizes leads, contacts, and deals into a clear workflow — helping users easily track progress and manage their entire sales process from one place.</p></Reveal>
          <Reveal delay={0.2}>
            <div className="crm-callout crm-callout-teal">
              <span className="crm-callout-icon">🎯</span>
              <span>The design focuses on <strong>clarity and usability</strong> — ensuring users can navigate complex sales processes easily while staying focused on closing deals.</span>
            </div>
          </Reveal>
        </section>

        <div className="crm-rule" />

        {/* KEY FEATURES */}
        <section id="crm-features" className="crm-block">
          <Reveal>
            <div className="crm-section-header">
              <div className="crm-icon-badge crm-badge-teal">⚙️</div>
              <div><p className="crm-section-eyebrow">04</p><h2 className="crm-section-title">Key Features</h2></div>
            </div>
          </Reveal>
          <div className="crm-features-grid">
            {[
              { icon: '👤', title: 'Lead & Contact Management', desc: 'Centralized profiles for all leads and contacts with full history, notes, and activity timelines.', color: '#f0fdf4' },
              { icon: '📊', title: 'Deal Pipeline — Kanban', desc: 'Visual Kanban board to track deals across every stage of the sales pipeline at a glance.', color: '#f0fdfa' },
              { icon: '✅', title: 'Task & Activity Tracking', desc: 'Assign tasks, set reminders, and log every interaction to ensure no follow-up is ever missed.', color: '#fffbeb' },
              { icon: '📈', title: 'Reports & Performance', desc: 'Real-time insights into team performance, deal conversion rates, and revenue forecasting.', color: '#eff6ff' },
              { icon: '🔔', title: 'Smart Notifications', desc: 'Contextual alerts for deal stage changes, upcoming tasks, and overdue follow-ups.', color: '#faf5ff' },
              { icon: '🔍', title: 'Search & Filter', desc: 'Powerful filtering across leads, deals, and contacts to surface the right information instantly.', color: '#fff7ed' },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="crm-feature-card" style={{ background: f.color }}>
                  <div className="crm-feature-icon">{f.icon}</div>
                  <div>
                    <p className="crm-feature-title">{f.title}</p>
                    <p className="crm-feature-desc">{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="crm-rule" />

        {/* DESIGN PROCESS */}
        <section id="crm-process" className="crm-block">
          <Reveal>
            <div className="crm-section-header">
              <div className="crm-icon-badge crm-badge-purple">🎨</div>
              <div><p className="crm-section-eyebrow">05</p><h2 className="crm-section-title">Design Process</h2></div>
            </div>
          </Reveal>
          <div className="crm-process-grid">
            {[
              { icon: '🤝', step: 'Empathize', desc: 'Researching the daily workflows and frustrations of sales teams.' },
              { icon: '🎯', step: 'Define', desc: 'Framing the core problem: scattered data and missing workflow structure.' },
              { icon: '✏️', step: 'Ideate', desc: 'Mapping pipeline stages, user flows, and data hierarchy models.' },
              { icon: '🖥️', step: 'Design', desc: 'Wireframes evolving into polished, high-fidelity Figma screens.' },
              { icon: '🧪', step: 'Refine', desc: 'Iterating on navigation clarity, data density, and interaction patterns.' },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="crm-process-card">
                  <div className="crm-process-num">0{i + 1}</div>
                  <div className="crm-process-icon">{p.icon}</div>
                  <p className="crm-process-step">{p.step}</p>
                  <p className="crm-process-desc">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="crm-rule" />

        {/* CHALLENGES */}
        <section id="crm-challenges" className="crm-block">
          <Reveal>
            <div className="crm-section-header">
              <div className="crm-icon-badge crm-badge-orange">🔍</div>
              <div><p className="crm-section-eyebrow">06</p><h2 className="crm-section-title">Key Challenges</h2></div>
            </div>
          </Reveal>
          <div className="crm-challenges-grid">
            {[
              { challenge: 'Organising multiple stages of the sales pipeline without overwhelming users', solution: 'Used a visual Kanban board with clear stage labels, deal counts, and drag-friendly interactions' },
              { challenge: 'Managing large volumes of client and deal data across the interface', solution: 'Applied smart filtering, search, and pagination with progressive data disclosure' },
              { challenge: 'Ensuring smooth and intuitive workflow transitions between CRM sections', solution: 'Designed consistent navigation patterns and contextual side panels to reduce context switching' },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div className="crm-challenge-card">
                  <div className="crm-ch-prob">
                    <span className="crm-ch-badge">Challenge</span>
                    <p>{c.challenge}</p>
                  </div>
                  <div className="crm-ch-connector">
                    <div className="crm-ch-line" /><div className="crm-ch-icon">→</div><div className="crm-ch-line" />
                  </div>
                  <div className="crm-ch-sol">
                    <span className="crm-ch-badge crm-ch-green">Solution</span>
                    <p>{c.solution}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="crm-rule" />

        {/* OUTCOME */}
        <section id="crm-outcome" className="crm-block">
          <div className="crm-two-col" style={{ gap: '64px' }}>
            <div className="crm-text-side">
              <Reveal>
                <div className="crm-section-header">
                  <div className="crm-icon-badge crm-badge-green">🚀</div>
                  <div><p className="crm-section-eyebrow">07</p><h2 className="crm-section-title">Outcome</h2></div>
                </div>
              </Reveal>
              <div className="crm-impact-list">
                {[
                  { icon: '✅', text: 'Improved workflow organisation for sales teams' },
                  { icon: '📊', text: 'Easier tracking of deals and client interactions' },
                  { icon: '⚡', text: 'Reduced time spent searching for information' },
                ].map((item, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="crm-impact-row">
                      <div className="crm-impact-icon">{item.icon}</div>
                      <p>{item.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
            <div className="crm-text-side">
              <Reveal delay={0.1}>
                <div className="crm-section-header">
                  <div className="crm-icon-badge crm-badge-teal">🧠</div>
                  <div><p className="crm-section-eyebrow">08</p><h2 className="crm-section-title">Learnings</h2></div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <ul className="crm-bullet-list">
                  <li>Designing for data-rich environments requires strong visual hierarchy and restraint</li>
                  <li>Kanban and pipeline views demand careful interaction design for drag-and-drop flows</li>
                  <li>Consistency across modules is critical in multi-feature dashboard products</li>
                  <li>User flows should always be mapped before jumping into high-fidelity design</li>
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CONCLUSION */}
        <Reveal>
          <section className="crm-conclusion-block">
            <div className="crm-conclusion-inner">
              <div className="crm-conclusion-icon">📈</div>
              <h2 className="crm-conclusion-title">Conclusion</h2>
              <p className="crm-conclusion-quote">
                "This project demonstrated that <em>structured design</em> is the backbone of a great CRM.
                By turning scattered sales data into a clear, navigable system, teams gained
                the clarity to <em>focus on what matters — closing deals.</em>"
              </p>
              <button className="crm-back-btn-large" onClick={() => navigate('/')}>← Back to Portfolio</button>
            </div>
          </section>
        </Reveal>

      </div>
    </div>
  );
};

export default CRMCaseStudy;
