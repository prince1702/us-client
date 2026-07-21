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
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-grid">
          {/* Left Column: Text & Controls */}
          <div className="hero-content">
            <span className="hero-tag">ESTABLISHED MCMLXXXIV • ROME</span>
            <h1 className="hero-title">
              Crafting <span className="gold-gradient-text">Brilliance</span><br />
              Beyond Measure
            </h1>
            
            {/* Diamond Ecosystem Toggle */}
            <div className="hero-ecosystem-toggle">
              <span className="toggle-label">Ecosystem Class:</span>
              <div className="toggle-buttons-wrapper">
                <button
                  className={`toggle-btn ${diamondType === 'Natural' ? 'active' : ''}`}
                  onClick={() => setDiamondType('Natural')}
                >
                  ✦ Natural Travertine
                </button>
                <button
                  className={`toggle-btn ${diamondType === 'Lab-Grown' ? 'active' : ''}`}
                  onClick={() => setDiamondType('Lab-Grown')}
                >
                  ✧ Lab-Grown Sky
                </button>
              </div>
            </div>

            <p className="hero-desc">
              Discover our elite collection of GIA & IGI certified {diamondType.toLowerCase()} diamonds, matching melee parcels, and custom mounting services engineered for B2B wholesalers and discerning B2C buyers.
            </p>
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <button className="btn btn-primary" onClick={() => setActivePage('jewelry')}>
                View Catalog
              </button>
              <button className="btn btn-secondary" onClick={() => setActivePage('custom-inquiry')}>
                Design Custom Piece
              </button>
            </div>
          </div>

          {/* Right Column: Floating Vault Showcase Card */}
          <div className="hero-visual">
            <div className="vault-showcase-card">
              <div className="glass-card-header">
                <span className="security-status">● VAULT ACTIVE</span>
                <span className="laser-id">Laser ID: MELEE-2026-X</span>
              </div>
              
              <div className="diamond-glow-container">
                <div className="glowing-orb"></div>
                <span className="showcase-diamond-icon">💎</span>
              </div>

              <div className="spec-grid">
                <div className="spec-box">
                  <div className="spec-lbl">CARAT WEIGHT</div>
                  <div className="spec-val">2.45 ct</div>
                </div>
                <div className="spec-box">
                  <div className="spec-lbl">COLOR / CLARITY</div>
                  <div className="spec-val">D / VVS1</div>
                </div>
                <div className="spec-box">
                  <div className="spec-lbl">CUT GRADE</div>
                  <div className="spec-val">EXCELLENT</div>
                </div>
                <div className="spec-box">
                  <div className="spec-lbl">LAB CERTIFIED</div>
                  <div className="spec-val">IGI VERIFIED</div>
                </div>
              </div>

              <div className="price-tag-wrapper">
                <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>ESTIMATED VALUATION</span>
                <div className="valuation-price">
                  {diamondType === 'Natural' ? '$18,400 USD' : '$4,250 USD'}
                </div>
              </div>

              <button className="btn btn-primary" style={{ width: '100%', padding: '10px', fontSize: '0.7rem' }} onClick={() => setActivePage('certified')}>
                Inspect Specifications
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="section" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Curated Modules</span>
            <h2 className="display-title section-title">Explore Our Portfolios</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '30px' }}>
            {/* Fine Jewelry */}
            <div className="card" style={{ padding: '32px', textAlign: 'center', cursor: 'pointer' }} onClick={() => setActivePage('jewelry')}>
              <div style={{ fontSize: '2.5rem', color: 'var(--accent-gold)', marginBottom: '16px' }}>💍</div>
              <h3 className="display-title" style={{ fontSize: '1rem', marginBottom: '12px' }}>Fine Jewelry</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Hand-set rings, earrings, pendants, and tennis bracelets in 18K and Platinum.
              </p>
            </div>

            {/* Melee Diamonds */}
            <div className="card" style={{ padding: '32px', textAlign: 'center', cursor: 'pointer' }} onClick={() => setActivePage('melee')}>
              <div style={{ fontSize: '2.5rem', color: 'var(--accent-gold)', marginBottom: '16px' }}>💎</div>
              <h3 className="display-title" style={{ fontSize: '1rem', marginBottom: '12px' }}>Melee Diamonds</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Round and fancy shape melee pointers sorted by MM size, carat weight, and sieve ranges.
              </p>
            </div>

            {/* Layouts */}
            <div className="card" style={{ padding: '32px', textAlign: 'center', cursor: 'pointer' }} onClick={() => setActivePage('layouts')}>
              <div style={{ fontSize: '2.5rem', color: 'var(--accent-gold)', marginBottom: '16px' }}>⚜️</div>
              <h3 className="display-title" style={{ fontSize: '1rem', marginBottom: '12px' }}>Matched Layouts</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Pre-selected matched stones for tennis necklaces, cuffs, eternity bands, and side stone pairs.
              </p>
            </div>

            {/* Certified Diamonds */}
            <div className="card" style={{ padding: '32px', textAlign: 'center', cursor: 'pointer' }} onClick={() => setActivePage('certified')}>
              <div style={{ fontSize: '2.5rem', color: 'var(--accent-gold)', marginBottom: '16px' }}>🔬</div>
              <h3 className="display-title" style={{ fontSize: '1rem', marginBottom: '12px' }}>Certified Diamonds</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Advanced search engine to filter and compare GIA & IGI certified single loose stones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Exquisite Creations</span>
            <h2 className="display-title section-title">Featured {diamondType} Jewelry</h2>
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

      <section className="section" style={{ background: 'radial-gradient(circle at center, var(--bg-tertiary) 0%, var(--bg-primary) 100%)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container responsive-grid-half" style={{ alignItems: 'center' }}>
          <div>
            <span className="section-subtitle">Bespoke Custom Workshop</span>
            <h2 className="display-title" style={{ fontSize: '2.4rem', marginBottom: '24px', lineHeight: '1.2' }}>
              Bring Your Dream Jewelry to Life
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '1rem' }}>
              Our design laboratory works with master CAD modelers, metal smiths, and setters to bring your exact custom ideas to life. Submit your reference photos, select target budgets, and receive premium quotations and 3D renders from our team.
            </p>
            <button className="btn btn-primary" onClick={() => setActivePage('custom-inquiry')}>
              Initiate Custom Design
            </button>
          </div>
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '32px', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
            <h3 className="display-title" style={{ fontSize: '1rem', color: 'var(--accent-gold)', marginBottom: '20px' }}>Inquiry Workflow</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <div>🟢 <strong>Step 1: Submit Inquiry</strong> - Upload sketches, specify alloys & size.</div>
              <div>🟡 <strong>Step 2: Admin CAD Estimate</strong> - Receive full CAD renderings & pricing quotes.</div>
              <div>🔵 <strong>Step 3: Approval & Cast</strong> - Approved models go directly into physical casting.</div>
              <div>🟣 <strong>Step 4: Insured Escort</strong> - Armored delivery directly to your storefront.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
