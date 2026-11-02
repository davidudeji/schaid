import { useState } from 'react';
import { Link } from 'react-router-dom';

const products = [
  { label: 'Administration', to: '/app/admin/users' },
  { label: 'Academics', to: '/app/academic/courses' },
  { label: 'Finance', to: '/app/finance/fees' },
  { label: 'Family portals', to: '/app/portals/student' },
];

function BrandMark() {
  return (
    <span className="site-mark" aria-hidden="true">
      {Array.from({ length: 9 }, (_, index) => <span key={index} />)}
    </span>
  );
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="landing site-home">
      <header className="site-header">
        <Link to="/" className="site-brand" aria-label="Schaid home">
          <span>Schaid</span>
        </Link>

        <button
          className="site-menu-toggle"
          type="button"
          aria-expanded={mobileMenuOpen}
          aria-controls="site-navigation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? 'Close' : 'Menu'}
        </button>

        <nav
          className={`site-navigation${mobileMenuOpen ? ' is-open' : ''}`}
          id="site-navigation"
          aria-label="Main navigation"
        >
          <Link to="/app/academic/courses" onClick={() => setMobileMenuOpen(false)}>Academics</Link>
          <Link to="/app/portals/student" onClick={() => setMobileMenuOpen(false)}>Student portal</Link>
          <Link to="/app/portals/parent" onClick={() => setMobileMenuOpen(false)}>For families</Link>
          <Link to="/app" className="site-sign-in" onClick={() => setMobileMenuOpen(false)}>Sign in</Link>
        </nav>
      </header>

      <main>
        <section className="site-hero" aria-labelledby="site-headline">
          <div className="site-hero-content">
            <BrandMark />
            <p className="site-kicker">School management, thoughtfully connected</p>
            <h1 id="site-headline">A clearer way to run your school.</h1>
            <p className="site-description">
              One considered platform for your people, learning, finances, and the families who make it all matter.
            </p>
            <div className="site-actions">
              <Link to="/app" className="site-button site-button-primary">Explore Schaid</Link>
              <Link to="/app/academic/courses" className="site-text-link">Discover academics</Link>
            </div>
          </div>
        </section>

        <section className="site-products" aria-label="Explore the platform">
          <span className="site-products-label">Explore the platform</span>
          <nav className="site-product-links" aria-label="Platform areas">
            {products.map((product) => (
              <Link key={product.label} to={product.to}>{product.label}</Link>
            ))}
          </nav>
        </section>
      </main>

      <footer className="site-footer">
        <Link to="/" className="site-footer-brand">Schaid ERP</Link>
        <span>One platform for every part of school life.</span>
        <Link to="/app">Open platform</Link>
      </footer>
    </div>
  );
}
