import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';

export default function ProductDetail({ product, setActivePage, onNavigateToInquiry }) {
  const { addToCart, products } = useContext(StoreContext);
  const [selectedMetal, setSelectedMetal] = useState('18K White Gold');
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div className="container section text-center" style={{ padding: '100px 0' }}>
        <h2>No Product Selected</h2>
        <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={() => setActivePage('jewelry')}>Go to Catalog</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, qty, selectedMetal);
    alert(`${qty} x ${product.name} (${selectedMetal}) added to cart!`);
  };

  const isLooseStone = product.category === 'Certified Diamonds' || product.category === 'Melee Diamonds';

  // Get related products (same category, excluding current product)
  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="container section animate-fade-in">
      {/* Breadcrumbs */}
      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '1px' }}>
        <span style={{ cursor: 'pointer' }} onClick={() => setActivePage('home')}>Home</span> / {' '}
        <span style={{ cursor: 'pointer' }} onClick={() => setActivePage('jewelry')}>{product.category}</span> / {' '}
        <span style={{ color: 'var(--text-primary)' }}>{product.name}</span>
      </div>

      <div className="responsive-grid-half" style={{ gap: '50px', marginBottom: '60px' }}>
        {/* Left: Product Images / Zoom simulation */}
        <div>
          <div style={{ background: 'radial-gradient(circle, var(--bg-tertiary) 0%, var(--bg-secondary) 100%)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '40px', textAlign: 'center', position: 'relative', overflow: 'hidden', height: '450px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ maxWidth: '80%', maxHeight: '100%', objectFit: 'contain', transition: 'transform 0.3s ease' }}
              onMouseMove={(e) => {
                const img = e.target;
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                img.style.transformOrigin = `${x}% ${y}%`;
                img.style.transform = 'scale(1.5)';
              }}
              onMouseLeave={(e) => {
                const img = e.target;
                img.style.transform = 'scale(1)';
              }}
            />
            <span style={{ position: 'absolute', bottom: '16px', right: '16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>🔍 Hover to magnify</span>
          </div>
        </div>

        {/* Right: Specifications & CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span className="badge badge-approved" style={{ marginBottom: '12px' }}>{product.diamondType}</span>
            <h1 className="display-title" style={{ fontSize: '2rem', marginBottom: '16px', lineHeight: '1.2' }}>{product.name}</h1>
            <p style={{ fontSize: '1.6rem', fontWeight: '700', color: 'var(--accent-gold)', marginBottom: '24px' }}>
              {product.category === 'Melee Diamonds' ? `$${product.price.toLocaleString()} / ct` : `$${product.price.toLocaleString()}`}
            </p>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '32px' }}>
              {product.description || 'This masterfully fashioned design coordinates pristine metal alignments with highly fire-rated, hand-matched loose diamonds. Fully customizable upon request.'}
            </p>

            {/* Customization Controls */}
            {!isLooseStone && (
              <div className="responsive-grid-half" style={{ gap: '20px', marginBottom: '32px' }}>
                <div>
                  <label className="form-label">Metal Composition</label>
                  <select 
                    className="form-control" 
                    value={selectedMetal} 
                    onChange={(e) => setSelectedMetal(e.target.value)}
                    style={{ background: 'var(--bg-primary)', padding: '10px 16px' }}
                  >
                    <option value="18K White Gold">18K White Gold</option>
                    <option value="18K Yellow Gold">18K Yellow Gold</option>
                    <option value="Platinum">Platinum</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Total Quantity</label>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'var(--bg-primary)', height: '45px' }}>
                    <button style={{ padding: '0 16px', cursor: 'pointer', fontSize: '1.1rem' }} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                    <span style={{ flexGrow: 1, textAlign: 'center', fontSize: '0.95rem' }}>{qty}</span>
                    <button style={{ padding: '0 16px', cursor: 'pointer', fontSize: '1.1rem' }} onClick={() => setQty(q => q + 1)}>＋</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
            {!isLooseStone ? (
              <>
                <button className="btn btn-primary" style={{ flexGrow: 1, padding: '16px' }} onClick={handleAddToCart}>
                  Add to Shopping Cart
                </button>
                <button className="btn btn-secondary" style={{ flexGrow: 1, padding: '16px' }} onClick={() => onNavigateToInquiry(product)}>
                  Custom Quotation
                </button>
              </>
            ) : (
              <button className="btn btn-primary" style={{ flexGrow: 1, padding: '16px' }} onClick={() => onNavigateToInquiry(product)}>
                Submit Diamond Inquiry
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div style={{ borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '32px', marginBottom: '32px' }}>
        <button 
          style={{ padding: '12px 0', borderBottom: `2px solid ${activeTab === 'description' ? 'var(--accent-gold)' : 'transparent'}`, color: activeTab === 'description' ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: '600', cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}
          onClick={() => setActiveTab('description')}
        >
          Product Details
        </button>
        <button 
          style={{ padding: '12px 0', borderBottom: `2px solid ${activeTab === 'reports' ? 'var(--accent-gold)' : 'transparent'}`, color: activeTab === 'reports' ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: '600', cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}
          onClick={() => setActiveTab('reports')}
        >
          Certifications & Reports
        </button>
      </div>

      <div style={{ marginBottom: '80px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
        {activeTab === 'description' ? (
          <div>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>Master Craftsmanship Specifications</h3>
            <p style={{ marginBottom: '16px' }}>Each setting is custom-made to order, hand-polished and double-audited for quality settings. Prongs are carefully configured according to stone carat sizes to achieve minimal metal distraction and maximize refractive light paths.</p>
            <ul>
              <li style={{ marginBottom: '8px' }}>Authentic, conflict-free sourced diamonds matching international standards.</li>
              <li style={{ marginBottom: '8px' }}>Free fully-insured delivery in custom wood packaging boxes.</li>
              <li style={{ marginBottom: '8px' }}>Laser engravings of report numbers on loose stones.</li>
            </ul>
          </div>
        ) : (
          <div>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>Diamond Credentials</h3>
            {product.details ? (
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '20px' }}>
                <p style={{ marginBottom: '12px' }}>This stone has been analyzed and graded according to international color, clarity, cut, and weight metrics.</p>
                <strong>Report Number:</strong> <span style={{ color: 'var(--accent-gold)' }}>{product.details.certificateNumber || 'AVAIL-902810'}</span>
                <br /><br />
                <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem' }} onClick={() => alert('Downloading Report PDF (Simulation)')}>
                  Download {product.details.lab || 'IGI'} Grading PDF
                </button>
              </div>
            ) : (
              <p>This is a custom-mounted item. Certification reports for center diamonds will be included separately based on custom settings selected during production.</p>
            )}
          </div>
        )}
      </div>

      {/* Related Products Section */}
      {related.length > 0 && (
        <section style={{ borderTop: '1px solid var(--border-color)', paddingTop: '60px' }}>
          <h2 className="display-title" style={{ fontSize: '1.4rem', marginBottom: '32px' }}>Related Creations</h2>
          <div className="products-grid">
            {related.map(item => (
              <div 
                key={item.id} 
                className="card" 
                style={{ cursor: 'pointer' }}
                onClick={() => { setSelectedProduct(item); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                <div className="card-img-container">
                  <span className="card-tag">{item.diamondType}</span>
                  <img src={item.image} alt={item.name} className="card-img" />
                </div>
                <div className="card-info">
                  <div>
                    <div className="card-category">{item.category}</div>
                    <h3 className="card-title" style={{ fontSize: '0.95rem' }}>{item.name}</h3>
                  </div>
                  <div className="card-price">${item.price.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
