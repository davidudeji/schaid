import {
  GraduationCap, ArrowRight, CheckCircle2, Shield, BarChart2,
  ScanLine, CreditCard, Bell, Users, BookOpen, QrCode,
  TrendingUp, Menu, X, Star, ChevronRight, Globe,
  Zap, Lock, Activity, Award, Building2, Layers
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <Users size={22} />,
    color: '#6366F1',
    glow: 'rgba(99,102,241,0.15)',
    title: 'Role-Based Access Control',
    desc: 'Multi-tenant routing with granular permissions for Admins, Lecturers, Students, Parents, and Class Reps.',
  },
  {
    icon: <BookOpen size={22} />,
    color: '#10B981',
    glow: 'rgba(16,185,129,0.15)',
    title: 'Course & Curriculum Engine',
    desc: 'Structure departments, credit weights, prerequisites, and syllabi with a centralized academic framework.',
  },
  {
    icon: <QrCode size={22} />,
    color: '#0EA5E9',
    glow: 'rgba(14,165,233,0.15)',
    title: 'Dynamic QR Attendance',
    desc: 'Lecturers generate time-blocked QR codes. Students scan to mark presence. Real-time roster updates instantly.',
  },
  {
    icon: <BarChart2 size={22} />,
    color: '#8B5CF6',
    glow: 'rgba(139,92,246,0.15)',
    title: 'GPA Automation Engine',
    desc: 'High-density grade matrix that auto-calculates CA scores, GPA, and CGPA with printable report cards.',
  },
  {
    icon: <CreditCard size={22} />,
    color: '#F59E0B',
    glow: 'rgba(245,158,11,0.15)',
    title: 'Integrated Payment Gateways',
    desc: 'Stripe, Flutterwave, and PayPal connected natively. Auto-generated PDF receipts on every transaction.',
  },
  {
    icon: <Bell size={22} />,
    color: '#F43F5E',
    glow: 'rgba(244,63,94,0.15)',
    title: 'Mass Notification Dispatch',
    desc: 'Broadcast urgent alerts, term updates, or individual fee reminders via SMS, Email, or push — from one panel.',
  },
];

const stats = [
  { value: '4,200+', label: 'Students managed', icon: <Users size={18} /> },
  { value: '187', label: 'Staff members', icon: <Award size={18} /> },
  { value: '99.8%', label: 'Uptime SLA', icon: <Activity size={18} /> },
  { value: 'GHS 2.8M', label: 'Revenue tracked', icon: <TrendingUp size={18} /> },
];

const modules = [
  {
    icon: <Shield size={28} />,
    label: 'Module 1',
    title: 'Administration Pillar',
    color: '#6366F1',
    items: ['User Management & RBAC', 'Admissions Pipeline', 'HR & Payroll Engine', 'Inventory & Asset Tracking'],
  },
  {
    icon: <BookOpen size={28} />,
    label: 'Module 2',
    title: 'Academic Pillar',
    color: '#10B981',
    items: ['Course & Curriculum', 'Timetable & Scheduling', 'QR Attendance Loop', 'Gradebook & GPA'],
  },
  {
    icon: <CreditCard size={28} />,
    label: 'Module 3',
    title: 'Financial Pillar',
    color: '#F59E0B',
    items: ['Automated Fee Invoicing', 'Debtor Ledger', 'Multi-Gateway Payments', 'Expense Tracking'],
  },
  {
    icon: <Bell size={28} />,
    label: 'Module 4',
    title: 'Communication Pillar',
    color: '#8B5CF6',
    items: ['Student Workspace', 'Parent Overview Portal', 'Mass Notifications', 'Priority Alert System'],
  },
];

const testimonials = [
  { name: 'Dr. Kweku Ansah', role: 'Vice Chancellor, Accra Technical University', text: 'Schaid transformed how we manage 6,000 students across 14 departments. The QR attendance system alone saved us 3 hours per day.', stars: 5 },
  { name: 'Madam Efua Boateng', role: 'Registrar, West African Business School', text: 'Admissions used to be a 3-week paper process. Now we approve and matriculate applicants in under 48 hours.', stars: 5 },
  { name: 'Prof. Yaw Mensah', role: 'Dean, Faculty of Engineering', text: 'The gradebook automation is incredible. GPA calculations that took our team 2 weeks now run instantly at semester-end.', stars: 5 },
];

const plans = [
  {
    name: 'Core',
    price: 'GHS 2,400',
    period: '/year',
    desc: 'Perfect for small colleges and polytechnics.',
    features: ['Up to 500 students', 'Administration module', 'Academic module', 'Email support'],
    cta: 'Get started',
    highlight: false,
  },
  {
    name: 'Institution',
    price: 'GHS 7,200',
    period: '/year',
    desc: 'Full suite for growing universities.',
    features: ['Up to 5,000 students', 'All 4 modules', 'Payment gateway integration', 'Priority support', 'Custom branding'],
    cta: 'Start free trial',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'Multi-campus, unlimited scale.',
    features: ['Unlimited students', 'Multi-campus management', 'Dedicated account manager', 'SLA guarantee', 'API access'],
    cta: 'Contact sales',
    highlight: false,
  },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="landing">
      {/* ─── NAV ─── */}
      <nav className="landing-nav">
        <div className="landing-container landing-nav-inner">
          <div className="landing-logo">
            <div className="sidebar-logo-mark" style={{ width: 36, height: 36 }}>
              <GraduationCap size={20} />
            </div>
            <div className="landing-logo-text">
              <span className="landing-logo-name">Schaid</span>
              <span className="landing-logo-tag">ERP</span>
            </div>
          </div>

          <div className="landing-nav-links">
            <a href="#features" className="landing-nav-link">Features</a>
            <a href="#modules"  className="landing-nav-link">Modules</a>
            <a href="#pricing"  className="landing-nav-link">Pricing</a>
            <a href="#about"    className="landing-nav-link">About</a>
          </div>

          <div className="landing-nav-actions">
            <Link to="/app" className="btn btn-ghost btn-sm">Sign in</Link>
            <Link to="/app" className="btn btn-primary btn-sm">Get started <ArrowRight size={13} /></Link>
          </div>

          <button className="landing-mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="landing-mobile-menu">
            <a href="#features" className="landing-nav-link" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#modules"  className="landing-nav-link" onClick={() => setMobileMenuOpen(false)}>Modules</a>
            <a href="#pricing"  className="landing-nav-link" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <Link to="/app" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>Get started</Link>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section className="landing-hero">
        {/* Background grid */}
        <div className="landing-hero-grid" aria-hidden="true" />
        <div className="landing-hero-glow landing-hero-glow-1" aria-hidden="true" />
        <div className="landing-hero-glow landing-hero-glow-2" aria-hidden="true" />

        <div className="landing-container landing-hero-content">
          <div className="landing-eyebrow">
            <Activity size={12} style={{ color: 'var(--emerald-400)' }} />
            <span>Now serving 4,200+ students in West Africa</span>
          </div>

          <h1 className="landing-hero-headline">
            The complete ERP for<br />
            <span className="landing-gradient-text">modern institutions</span>
          </h1>

          <p className="landing-hero-desc">
            Schaid unifies admissions, academics, HR, finance, and communication
            into one intelligent platform — purpose-built for African universities
            and polytechnics.
          </p>

          <div className="landing-hero-actions">
            <Link to="/app" className="btn btn-primary btn-lg" id="hero-cta-primary">
              Launch platform <ArrowRight size={16} />
            </Link>
            <a href="#features" className="btn btn-secondary btn-lg" id="hero-cta-secondary">
              Explore features
            </a>
          </div>

          <div className="landing-hero-trust">
            <Lock size={13} style={{ color: 'var(--text-muted)' }} />
            <span>SOC 2 compliant · End-to-end encrypted · 99.8% uptime SLA</span>
          </div>
        </div>

        {/* Hero dashboard preview */}
        <div className="landing-container">
          <div className="landing-hero-preview">
            <div className="landing-preview-bar">
              <div className="landing-preview-dots">
                <span className="dot dot-red" /><span className="dot dot-yellow" /><span className="dot dot-green" />
              </div>
              <div className="landing-preview-url">
                <Globe size={11} />
                app.schaid.edu/dashboard
              </div>
            </div>
            <div className="landing-preview-body">
              {/* Mini stat grid */}
              <div className="landing-preview-stats">
                {[
                  { label: 'Total Students', value: '4,218', color: '#6366F1', delta: '+124' },
                  { label: 'Active Courses', value: '64', color: '#10B981', delta: '+8' },
                  { label: 'Revenue (Sep)', value: 'GHS 318K', color: '#F59E0B', delta: '+18.4%' },
                  { label: 'Attendance Rate', value: '82%', color: '#0EA5E9', delta: '+3.1%' },
                ].map((s, i) => (
                  <div key={i} className="landing-preview-stat">
                    <div className="landing-preview-stat-label">{s.label}</div>
                    <div className="landing-preview-stat-value" style={{ color: s.color }}>{s.value}</div>
                    <div className="landing-preview-stat-delta">
                      <TrendingUp size={9} style={{ color: 'var(--emerald-400)' }} />
                      {s.delta}
                    </div>
                  </div>
                ))}
              </div>
              {/* Mini chart + activity */}
              <div className="landing-preview-bottom">
                <div className="landing-preview-chart">
                  {[45, 62, 55, 78, 72, 90].map((h, i) => (
                    <div key={i} className="landing-preview-bar-item" style={{ height: `${h}%`, background: i === 5 ? '#6366F1' : 'rgba(99,102,241,0.3)' }} />
                  ))}
                </div>
                <div className="landing-preview-activity">
                  {[
                    { dot: '#10B981', text: 'Zara Ibrahim — Paid GHS 6,500', time: '2m ago' },
                    { dot: '#6366F1', text: 'CS301 QR session started', time: '8m ago' },
                    { dot: '#F59E0B', text: '3 new applications pending', time: '15m ago' },
                  ].map((a, i) => (
                    <div key={i} className="landing-preview-activity-item">
                      <div className="landing-preview-activity-dot" style={{ background: a.dot }} />
                      <span>{a.text}</span>
                      <span className="landing-preview-activity-time">{a.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="landing-stats-bar">
        <div className="landing-container landing-stats-inner">
          {stats.map((s, i) => (
            <div key={i} className="landing-stat-item">
              <div className="landing-stat-icon">{s.icon}</div>
              <div>
                <div className="landing-stat-value">{s.value}</div>
                <div className="landing-stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="landing-section" id="features">
        <div className="landing-container">
          <div className="landing-section-header">
            <div className="landing-section-eyebrow">
              <Zap size={12} />
              Core features
            </div>
            <h2 className="landing-section-title">
              Every tool your institution<br />will ever need
            </h2>
            <p className="landing-section-desc">
              Six powerful modules working in harmony — from first application to final transcript.
            </p>
          </div>

          <div className="landing-features-grid">
            {features.map((f, i) => (
              <div key={i} className="landing-feature-card">
                <div className="landing-feature-icon" style={{ background: f.glow, color: f.color }}>
                  {f.icon}
                </div>
                <h3 className="landing-feature-title">{f.title}</h3>
                <p className="landing-feature-desc">{f.desc}</p>
                <div className="landing-feature-link">
                  Learn more <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MODULES ─── */}
      <section className="landing-section landing-section-dark" id="modules">
        <div className="landing-container">
          <div className="landing-section-header">
            <div className="landing-section-eyebrow">
              <Layers size={12} />
              Platform architecture
            </div>
            <h2 className="landing-section-title">
              Four pillars.<br />One unified platform.
            </h2>
            <p className="landing-section-desc">
              Each module is self-contained yet deeply integrated — so data flows automatically across your institution.
            </p>
          </div>

          <div className="landing-modules-grid">
            {modules.map((m, i) => (
              <div key={i} className="landing-module-card" style={{ '--module-color': m.color } as React.CSSProperties}>
                <div className="landing-module-header">
                  <div className="landing-module-icon" style={{ color: m.color, background: `${m.color}18` }}>
                    {m.icon}
                  </div>
                  <div>
                    <div className="landing-module-label">{m.label}</div>
                    <div className="landing-module-title">{m.title}</div>
                  </div>
                </div>
                <ul className="landing-module-list">
                  {m.items.map((item, j) => (
                    <li key={j} className="landing-module-item">
                      <CheckCircle2 size={13} style={{ color: m.color, flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── QR SPOTLIGHT ─── */}
      <section className="landing-section landing-spotlight">
        <div className="landing-container landing-spotlight-inner">
          <div className="landing-spotlight-content">
            <div className="landing-section-eyebrow">
              <ScanLine size={12} />
              Attendance innovation
            </div>
            <h2 className="landing-section-title" style={{ textAlign: 'left', maxWidth: '100%' }}>
              Attendance in seconds,<br />not registers.
            </h2>
            <p className="landing-section-desc" style={{ textAlign: 'left', maxWidth: '100%' }}>
              Lecturers generate a time-locked QR code at the start of every class.
              Students scan it from their phone. The attendance roster updates in real time
              on the lecturer's dashboard — no paper, no disputes, no delay.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 4 }}>
              {['Class Rep sharing routes QR to student devices instantly', 'Optimistic UI updates — roster populates as students scan', 'Time-blocked codes expire automatically after session ends'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--emerald-400)', flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
            <Link to="/app/academic/attendance" className="btn btn-primary btn-lg" id="spotlight-cta" style={{ marginTop: 16, width: 'fit-content' }}>
              See it live <ArrowRight size={16} />
            </Link>
          </div>

          <div className="landing-spotlight-visual">
            <div className="landing-qr-card">
              <div className="landing-qr-card-header">
                <ScanLine size={16} style={{ color: 'var(--indigo-400)' }} />
                <span>CS301 — Live Session</span>
                <span className="badge badge-emerald" style={{ marginLeft: 'auto', fontSize: 10 }}>
                  <Activity size={9} />Active
                </span>
              </div>
              {/* QR */}
              <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0 16px' }}>
                <div className="qr-block">
                  <svg width="140" height="140" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
                    <rect width="140" height="140" fill="white"/>
                    <rect x="8" y="8" width="52" height="52" rx="4" fill="#0B1120"/>
                    <rect x="16" y="16" width="36" height="36" rx="2" fill="white"/>
                    <rect x="23" y="23" width="22" height="22" rx="1" fill="#0B1120"/>
                    <rect x="80" y="8" width="52" height="52" rx="4" fill="#0B1120"/>
                    <rect x="88" y="16" width="36" height="36" rx="2" fill="white"/>
                    <rect x="95" y="23" width="22" height="22" rx="1" fill="#0B1120"/>
                    <rect x="8" y="80" width="52" height="52" rx="4" fill="#0B1120"/>
                    <rect x="16" y="88" width="36" height="36" rx="2" fill="white"/>
                    <rect x="23" y="95" width="22" height="22" rx="1" fill="#0B1120"/>
                    <rect x="80" y="80" width="8" height="8" fill="#0B1120"/>
                    <rect x="93" y="80" width="8" height="8" fill="#0B1120"/>
                    <rect x="106" y="80" width="8" height="8" fill="#0B1120"/>
                    <rect x="119" y="80" width="13" height="8" fill="#0B1120"/>
                    <rect x="80" y="93" width="13" height="8" fill="#0B1120"/>
                    <rect x="98" y="93" width="8" height="8" fill="#0B1120"/>
                    <rect x="111" y="93" width="21" height="8" fill="#0B1120"/>
                    <rect x="80" y="106" width="8" height="8" fill="#0B1120"/>
                    <rect x="93" y="106" width="21" height="8" fill="#0B1120"/>
                    <rect x="119" y="106" width="13" height="8" fill="#0B1120"/>
                    <rect x="80" y="119" width="17" height="13" fill="#0B1120"/>
                    <rect x="103" y="119" width="8" height="13" fill="#0B1120"/>
                    <rect x="116" y="119" width="16" height="13" fill="#0B1120"/>
                  </svg>
                </div>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', marginBottom: 16 }}>
                Session ID: QR-482019 · Expires in <strong style={{ color: 'var(--amber-400)' }}>7:24</strong>
              </div>
              {/* Mini roster */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { name: 'Zara Ibrahim', time: '08:03', color: '#10B981' },
                  { name: 'Kwame Adjei', time: '08:05', color: '#10B981' },
                  { name: 'Felix Boateng', time: '08:09', color: '#10B981' },
                  { name: 'Afia Mensah', time: '08:26', color: '#F59E0B' },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', background: 'var(--bg-overlay)', borderRadius: 6 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: r.color, flexShrink: 0 }} />
                    <span style={{ flex: 1, fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>{r.name}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{r.time}</span>
                    <CheckCircle2 size={12} style={{ color: r.color }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="landing-section">
        <div className="landing-container">
          <div className="landing-section-header">
            <div className="landing-section-eyebrow">
              <Star size={12} />
              Social proof
            </div>
            <h2 className="landing-section-title">
              Trusted by academic<br />leaders across West Africa
            </h2>
          </div>
          <div className="landing-testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="landing-testimonial-card">
                <div className="landing-stars">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={13} fill="#F59E0B" style={{ color: '#F59E0B' }} />
                  ))}
                </div>
                <p className="landing-testimonial-text">"{t.text}"</p>
                <div className="landing-testimonial-author">
                  <div className="avatar avatar-md" style={{ background: '#6366F1', color: '#fff', flexShrink: 0 }}>
                    {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="landing-section landing-section-dark" id="pricing">
        <div className="landing-container">
          <div className="landing-section-header">
            <div className="landing-section-eyebrow">
              <CreditCard size={12} />
              Pricing
            </div>
            <h2 className="landing-section-title">
              Simple, transparent pricing
            </h2>
            <p className="landing-section-desc">
              No per-student fees. No hidden charges. Just one annual plan for your institution.
            </p>
          </div>

          <div className="landing-pricing-grid">
            {plans.map((p, i) => (
              <div key={i} className={`landing-pricing-card ${p.highlight ? 'landing-pricing-card-featured' : ''}`}>
                {p.highlight && <div className="landing-pricing-badge">Most popular</div>}
                <div className="landing-pricing-name">{p.name}</div>
                <div className="landing-pricing-price">
                  {p.price}
                  {p.period && <span className="landing-pricing-period">{p.period}</span>}
                </div>
                <p className="landing-pricing-desc">{p.desc}</p>
                <ul className="landing-pricing-features">
                  {p.features.map((f, j) => (
                    <li key={j}>
                      <CheckCircle2 size={14} style={{ color: p.highlight ? 'var(--indigo-400)' : 'var(--emerald-400)', flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/app"
                  className={`btn btn-lg ${p.highlight ? 'btn-primary' : 'btn-secondary'}`}
                  id={`pricing-cta-${p.name.toLowerCase()}`}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {p.cta} <ArrowRight size={15} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="landing-cta-section" id="about">
        <div className="landing-container landing-cta-inner">
          <div className="landing-cta-glow" aria-hidden="true" />
          <div className="landing-section-eyebrow" style={{ justifyContent: 'center' }}>
            <Building2 size={12} />
            Built for African institutions
          </div>
          <h2 className="landing-section-title" style={{ marginBottom: 16 }}>
            Ready to modernise<br />your institution?
          </h2>
          <p className="landing-section-desc">
            Join hundreds of schools, universities, and polytechnics already running on Schaid.
            Start your 30-day free trial — no credit card required.
          </p>
          <div className="landing-hero-actions" style={{ justifyContent: 'center' }}>
            <Link to="/app" className="btn btn-primary btn-lg" id="final-cta-primary">
              Launch your platform <ArrowRight size={16} />
            </Link>
            <a href="mailto:hello@schaid.edu" className="btn btn-secondary btn-lg" id="final-cta-contact">
              Talk to sales
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="landing-footer">
        <div className="landing-container landing-footer-inner">
          <div className="landing-footer-brand">
            <div className="landing-logo" style={{ marginBottom: 12 }}>
              <div className="sidebar-logo-mark" style={{ width: 32, height: 32 }}>
                <GraduationCap size={16} />
              </div>
              <div className="landing-logo-text">
                <span className="landing-logo-name">Schaid</span>
                <span className="landing-logo-tag">ERP</span>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 240 }}>
              The complete school management platform for modern African institutions.
            </p>
          </div>
          <div className="landing-footer-links">
            <div className="landing-footer-col">
              <div className="landing-footer-col-title">Product</div>
              <a href="#features">Features</a>
              <a href="#modules">Modules</a>
              <a href="#pricing">Pricing</a>
              <Link to="/app">Dashboard</Link>
            </div>
            <div className="landing-footer-col">
              <div className="landing-footer-col-title">Modules</div>
              <Link to="/app/admin/admissions">Admissions</Link>
              <Link to="/app/academic/grades">Gradebook</Link>
              <Link to="/app/finance/fees">Fee Collection</Link>
              <Link to="/app/portals/student">Student Portal</Link>
            </div>
            <div className="landing-footer-col">
              <div className="landing-footer-col-title">Company</div>
              <a href="#about">About</a>
              <a href="mailto:hello@schaid.edu">Contact</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="landing-footer-bottom">
          <div className="landing-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--text-disabled)' }}>© 2026 Schaid Technologies Ltd. All rights reserved.</span>
            <span style={{ fontSize: 12, color: 'var(--text-disabled)' }}>Built with <span style={{ color: 'var(--rose-400)' }}>♥</span> for African education</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
