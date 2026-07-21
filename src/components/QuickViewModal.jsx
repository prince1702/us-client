import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';

export default function QuickViewModal({ product, onClose, onNavigateToInquiry, onNavigateToDetail }) {
  const { addToCart } = useContext(StoreContext);
  const [selectedMetal, setSelectedMetal] = useState('18K White Gold');
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, qty, selectedMetal);
    alert(`${qty} x ${product.name} (${selectedMetal}) added to cart!`);
    onClose();
  };

  const isLooseDiamond = product.category === 'Certified Diamonds' || product.category === 'Melee Diamonds';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '850px' }}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          {/* Left Column: Image */}
          <div style={{ background: 'radial-gradient(circle, var(--bg-tertiary) 0%, var(--bg-secondary) 100%)', borderRadius: '8px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
            <img src={product.image} alt={product.name} style={{ maxWidth: '100%', maxHeight: '280px', objectFit: 'contain' }} />
          </div>

          {/* Right Column: Details & Configuration */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="badge badge-approved" style={{ marginBottom: '8px' }}>{product.diamondType}</span>
              <h2 className="display-title" style={{ fontSize: '1.4rem', marginBottom: '12px', lineHeight: '1.3' }}>{product.name}</h2>
              <p style={{ color: 'var(--accent-gold)', fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px' }}>
                {product.category === 'Melee Diamonds' ? `$${product.price.toLocaleString()} / ct` : `$${product.price.toLocaleString()}`}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
                {product.description || 'Stunning hand-crafted cut jewelry representing the absolute pinnacle of manufacturing and design excellence.'}
              </p>

              {/* Specifications Table */}
              <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '16px', marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px', letterSpacing: '1px' }}>Specifications</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.85rem' }}>
                  {product.specifications ? (
                    <>
                      <div>Metal: <span style={{ color: 'var(--text-primary)' }}>{product.specifications.metal}</span></div>
                      <div>Total Carat: <span style={{ color: 'var(--text-primary)' }}>{product.specifications.totalCarat}</span></div>
                      <div>Color Grade: <span style={{ color: 'var(--text-primary)' }}>{product.specifications.averageColor}</span></div>
                      <div>Clarity: <span style={{ color: 'var(--text-primary)' }}>{product.specifications.averageClarity}</span></div>
                    </>
                  ) : product.details ? (
                    <>
                      <div>Shape: <span style={{ color: 'var(--text-primary)' }}>{product.details.shape}</span></div>
                      <div>Carat Weight: <span style={{ color: 'var(--text-primary)' }}>{product.details.carat || product.details.pointerSize}</span></div>
                      <div>Color: <span style={{ color: 'var(--text-primary)' }}>{product.details.color}</span></div>
                      <div>Clarity: <span style={{ color: 'var(--text-primary)' }}>{product.details.clarity}</span></div>
                      {product.details.lab && (
                        <div>Report Lab: <span style={{ color: 'var(--text-primary)' }}>{product.details.lab}</span></div>
                      )}
                      {product.details.certificateNumber && (
                        <div>Cert #: <span style={{ color: 'var(--text-primary)' }}>{product.details.certificateNumber}</span></div>
                      )}
                    </>
                  ) : (
                    <div>No specific details listed. Contact admin for report.</div>
                  )}
                </div>
              </div>

              {/* Configuration options for Finished Jewelry */}
              {!isLooseDiamond && (
                <div style={{ marginBottom: '20px' }}>
                  <label className="form-label">Metal Option</label>
                  <select 
                    className="form-control" 
                    value={selectedMetal}
                    onChange={(e) => setSelectedMetal(e.target.value)}
                    style={{ background: 'var(--bg-primary)', padding: '10px 16px' }}
                  >
                    <option value="18K White Gold">18K White Gold</option>
                    <option value="18K Yellow Gold">18K Yellow Gold</option>
                    <option value="14K Rose Gold">14K Rose Gold</option>
                    <option value="Platinum">Platinum</option>
                  </select>
                </div>
              )}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              {!isLooseDiamond ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'var(--bg-primary)' }}>
                    <button style={{ padding: '8px 12px', cursor: 'pointer' }} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                    <span style={{ padding: '0 12px', fontSize: '0.9rem' }}>{qty}</span>
                    <button style={{ padding: '8px 12px', cursor: 'pointer' }} onClick={() => setQty(q => q + 1)}>＋</button>
                  </div>
                  <button className="btn btn-primary" style={{ flexGrow: 1 }} onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                </>
              ) : (
                <button 
                  className="btn btn-primary" 
                  style={{ flexGrow: 1 }}
                  onClick={() => onNavigateToInquiry(product)}
                >
                  Submit Inquiry
                </button>
              )}
              
              <button 
                className="btn btn-secondary" 
                onClick={() => onNavigateToDetail(product)}
              >
                Full Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
