import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

export default function Layouts({ setActivePage, setQuickViewProduct, setSelectedProduct }) {
  const { diamondType, products } = useContext(StoreContext);

  // States
  const [selectedShape, setSelectedShape] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const shapes = ['All', 'Pear', 'Emerald', 'Baguette', 'Cushion'];
  const types = ['All', 'Matched Pair', 'Multi-Stone Line'];

  // Filter layouts
  const layoutProducts = products
    .filter(p => p.category === 'Layouts')
    .filter(p => p.diamondType === diamondType)
    .filter(p => selectedShape === 'All' || p.details.shape === selectedShape)
    .filter(p => selectedType === 'All' || p.details.layoutType === selectedType);

  return (
    <div className="container section animate-fade-in">
      <div className="section-header">
        <span className="section-subtitle">Stone Matching Systems</span>
        <h1 className="display-title section-title">{diamondType} Layouts Catalog</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
          Explore pre-matched side stones, pairs, and eternity lines calibrated for consistency in shape, color, clarity, and dimensions.
        </p>
      </div>

      {/* Filter Options */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '20px', marginBottom: '32px' }}>
        <div>
          <label className="form-label" style={{ marginBottom: '6px' }}>Stone Shape</label>
          <select className="form-control" value={selectedShape} onChange={(e) => setSelectedShape(e.target.value)} style={{ background: 'var(--bg-primary)', padding: '8px 16px', fontSize: '0.85rem' }}>
            {shapes.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="form-label" style={{ marginBottom: '6px' }}>Layout Category</label>
          <select className="form-control" value={selectedType} onChange={(e) => setSelectedType(e.target.value)} style={{ background: 'var(--bg-primary)', padding: '8px 16px', fontSize: '0.85rem' }}>
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Products Display */}
      {layoutProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', border: '1px dashed var(--border-color)', borderRadius: '8px' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>No stone layouts matching the filters exist in this context.</p>
          <button className="btn btn-secondary" onClick={() => { setSelectedShape('All'); setSelectedType('All'); }}>Reset Filters</button>
        </div>
      ) : (
        <div className="products-grid">
          {layoutProducts.map((p) => (
            <ProductCard 
              key={p.id} 
              product={p} 
              onQuickView={setQuickViewProduct} 
              onClick={() => { setSelectedProduct(p); setActivePage('product-detail'); }}
            />
          ))}
        </div>
      )}

      {/* Dynamic Spec Highlight */}
      <div style={{ marginTop: '50px', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: '16px 24px', borderBottom: '1px solid var(--border-color)' }}>
          <h3 className="display-title" style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>Layout Matching Standards</h3>
        </div>
        <div className="responsive-grid-half" style={{ padding: '24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>🔬 Color & Clarity Matching</h4>
            <p>Every stone within a layout is matched to within a single color grade (e.g. D to E) and a single clarity grade (e.g. VVS2 to VS1) to prevent noticeable differences in finished settings.</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>📏 Millimeter Calibrations</h4>
            <p>Layout stone heights and widths are sorted using electronic micrometers. Maximum allowable deviation across side pairs is under 0.05mm, ensuring seamless fits into eternity prongs.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
