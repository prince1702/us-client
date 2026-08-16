import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

export default function Home({ setActivePage, setQuickViewProduct, setSelectedProduct }) {
  const { diamondType, setDiamondType, products } = useContext(StoreContext);

  // Filter products for trending showcase based on active DiamondType
  const featuredJewelry = products
    .filter((p) => p.category !== 'Certified Diamonds' && p.category !== 'Melee Diamonds' && p.category !== 'Layouts')
    .filter((p) => p.diamondType === diamondType)
    .slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Full-width Professional Hero Banner Section with Pinned Navbar effect */}
      <section className="hero-banner-section">
        <div className="hero-banner-bg" style={{ backgroundImage: `url('/hero_banner.png')` }}>
          <div className="hero-overlay-gradient"></div>
        </div>

        <div className="container hero-banner-container">
          <div className="hero-banner-content">
            {/* Top Accent Gold Bar */}
            <div className="hero-gold-accent-line"></div>
            
            <h1 className="hero-banner-title">
              Premium {diamondType} Diamonds & Fine Jewelry for <span className="gold-text-highlight">Wholesale Professionals</span>
            </h1>
            
            <p className="hero-banner-subtitle">
              Trusted wholesale supplier of fine jewelry, certified diamonds, melee diamonds & fancy layout diamonds. Serving jewelers, retailers, and manufacturers worldwide.
            </p>

            <div className="hero-banner-actions">
              <button className="btn btn-hero-primary" onClick={() => setActivePage('jewelry')}>
                Explore Jewelry Catalog
              </button>
              <button className="btn btn-hero-secondary" onClick={() => setActivePage('certified')}>
                Search Certified Stones
              </button>
              <button className="btn btn-hero-outline" onClick={() => setActivePage('custom-inquiry')}>
                Custom CAD Inquiry
              </button>
            </div>

            {/* Quick Ecosystem Switcher Badge */}
            <div className="hero-eco-badge">
              <span className="eco-badge-label">Active Collection:</span>
              <button 
                className={`eco-badge-btn ${diamondType === 'Natural' ? 'active' : ''}`}
                onClick={() => setDiamondType('Natural')}
              >
                ✦ Natural Diamonds
              </button>
              <button 
                className={`eco-badge-btn ${diamondType === 'Lab-Grown' ? 'active' : ''}`}
                onClick={() => setDiamondType('Lab-Grown')}
              >
                ✧ Lab-Grown Diamonds
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Strip */}
      <section className="trust-badges-strip">
        <div className="container">
          <div className="trust-badges-grid">
            <div className="trust-badge-item">
              <div className="trust-badge-icon">🔬</div>
              <div className="trust-badge-text">
                <strong>GIA & IGI Certified</strong>
                <span>100% Verified Laser Inscription</span>
              </div>
            </div>
            <div className="trust-badge-item">
              <div className="trust-badge-icon">💎</div>
              <div className="trust-badge-text">
                <strong>Precision Calibrated</strong>
                <span>Consistent Sieve & Color Matching</span>
              </div>
            </div>
            <div className="trust-badge-item">
              <div className="trust-badge-icon">🛡️</div>
              <div className="trust-badge-text">
                <strong>Bank Escrow Assurance</strong>
                <span>Secure Wire & Courier Coverage</span>
              </div>
            </div>
            <div className="trust-badge-item">
              <div className="trust-badge-icon">✈️</div>
              <div className="trust-badge-text">
                <strong>Worldwide Insured Shipping</strong>
                <span>Door-to-door armored escort</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="section portfolio-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Curated B2B Portfolios</span>
            <h2 className="section-title">Explore Wholesale Categories</h2>
          </div>

          <div className="categories-card-grid">
            {/* Fine Jewelry */}
            <div className="portfolio-card" onClick={() => setActivePage('jewelry')}>
              <div className="portfolio-icon">💍</div>
              <h3 className="portfolio-title">Fine Jewelry</h3>
              <p className="portfolio-desc">
                Hand-set rings, earrings, pendants, and eternity bracelets crafted in 18K Gold and Platinum.
              </p>
              <span className="portfolio-link">Browse Collection →</span>
            </div>

            {/* Melee Diamonds */}
            <div className="portfolio-card" onClick={() => setActivePage('melee')}>
              <div className="portfolio-icon">💎</div>
              <h3 className="portfolio-title">Melee Diamonds</h3>
              <p className="portfolio-desc">
                Round & fancy cut pointers sorted by MM size, carat weight, color, and sieve clarity ranges.
              </p>
              <span className="portfolio-link">View Melee Parcels →</span>
            </div>

            {/* Layouts */}
            <div className="portfolio-card" onClick={() => setActivePage('layouts')}>
              <div className="portfolio-icon">⚜️</div>
              <h3 className="portfolio-title">Matched Layouts</h3>
              <p className="portfolio-desc">
                Calibrated multi-stone layouts for tennis necklaces, cuffs, eternity bands, and side stone pairs.
              </p>
              <span className="portfolio-link">Explore Layouts →</span>
            </div>

            {/* Certified Diamonds */}
            <div className="portfolio-card" onClick={() => setActivePage('certified')}>
              <div className="portfolio-icon">🔬</div>
              <h3 className="portfolio-title">Certified Loose Diamonds</h3>
              <p className="portfolio-desc">
                GIA & IGI certified loose single stones with 3D 360° video scans and certificate verification.
              </p>
              <span className="portfolio-link">Search Database →</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Exquisite Craftsmanship</span>
            <h2 className="section-title">Featured {diamondType} Creations</h2>
          </div>

          <div className="products-grid">
            {featuredJewelry.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
                onClick={() => {
                  setSelectedProduct(product);
                  setActivePage('product-detail');
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Custom Design CTA Section */}
      <section className="section custom-cta-section">
        <div className="container responsive-grid-half" style={{ alignItems: 'center' }}>
          <div>
            <span className="section-subtitle" style={{ textAlign: 'left' }}>Bespoke Manufacturing Laboratory</span>
            <h2 className="custom-cta-title">
              Engineered CAD Custom Manufacturing
            </h2>
            <p className="custom-cta-desc">
              Our master CAD modelers and setters craft custom mountings to exact millimeter tolerances. Submit reference sketches, target diamond parameters, and receive 3D CAD renders and wholesale quotes within 24 hours.
            </p>
            <button className="btn btn-hero-primary" onClick={() => setActivePage('custom-inquiry')}>
              Initiate Custom CAD Inquiry
            </button>
          </div>

          <div className="workflow-card">
            <h3 className="workflow-card-title">B2B Order Workflow</h3>
            <div className="workflow-steps-list">
              <div className="workflow-step-item">
                <span className="workflow-step-num">1</span>
                <div>
                  <strong>Submit Requirements</strong>
                  <p>Upload CAD models, reference photos, alloy specs, and ring size.</p>
                </div>
              </div>
              <div className="workflow-step-item">
                <span className="workflow-step-num">2</span>
                <div>
                  <strong>CAD Render & Quote</strong>
                  <p>Receive 3D photorealistic renderings and wholesale stone pricing.</p>
                </div>
              </div>
              <div className="workflow-step-item">
                <span className="workflow-step-num">3</span>
                <div>
                  <strong>Casting & Setting</strong>
                  <p>Master goldsmith casting, micro-pavé setting & laser hallmark inscription.</p>
                </div>
              </div>
              <div className="workflow-step-item">
                <span className="workflow-step-num">4</span>
                <div>
                  <strong>Armored Delivery</strong>
                  <p>Insured courier delivery directly to your vault or storefront.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
