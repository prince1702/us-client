import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';

export default function MeleeDiamonds({ setActivePage, setQuickViewProduct }) {
  const { diamondType, products } = useContext(StoreContext);

  // States for Melee filters
  const [selectedShape, setSelectedShape] = useState('All');
  const [selectedPointer, setSelectedPointer] = useState('All');
  const [selectedClarity, setSelectedClarity] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');

  const shapes = ['All', 'Round', 'Princess', 'Pear', 'Marquise'];
  const pointers = ['All', '0.02ct', '0.05ct', '0.10ct'];
  const clarities = ['All', 'VVS2-VS1', 'VS1-VS2'];
  const colors = ['All', 'E-F', 'F-G'];

  // Filter melee diamonds
  const meleeProducts = products
    .filter(p => p.category === 'Melee Diamonds')
    .filter(p => p.diamondType === diamondType)
    .filter(p => selectedShape === 'All' || p.details.shape === selectedShape)
    .filter(p => selectedPointer === 'All' || p.details.pointerSize === selectedPointer)
    .filter(p => selectedClarity === 'All' || p.details.clarity === selectedClarity)
    .filter(p => selectedColor === 'All' || p.details.color === selectedColor);

  return (
    <div className="container section animate-fade-in">
      <div className="section-header">
        <span className="section-subtitle">Loose Parcel Modules</span>
        <h1 className="display-title section-title">{diamondType} Melee Pointers</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
          Select precision-sorted melee diamonds by pointer size, color grade, and millimeter range. Ideal for micro-pave layouts.
        </p>
      </div>

      {/* Advanced Filtering Grid */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '24px', marginBottom: '32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
          {/* Shape */}
          <div>
            <label className="form-label">Diamond Shape</label>
            <select className="form-control" value={selectedShape} onChange={(e) => setSelectedShape(e.target.value)}>
              {shapes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Pointer Size */}
          <div>
            <label className="form-label">Pointer Weight</label>
            <select className="form-control" value={selectedPointer} onChange={(e) => setSelectedPointer(e.target.value)}>
              {pointers.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          {/* Color */}
          <div>
            <label className="form-label">Color Range</label>
            <select className="form-control" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
              {colors.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Clarity */}
          <div>
            <label className="form-label">Clarity Range</label>
            <select className="form-control" value={selectedClarity} onChange={(e) => setSelectedClarity(e.target.value)}>
              {clarities.map(cl => <option key={cl} value={cl}>{cl}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Results Tabular Layout */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Shape</th>
              <th>Pointer Size</th>
              <th>MM Sieve Range</th>
              <th>Color Grade</th>
              <th>Clarity Grade</th>
              <th>Cut / Polish</th>
              <th>Price per Carat</th>
              <th>Availability</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {meleeProducts.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
                  No melee diamond parcels match the chosen criteria.
                </td>
              </tr>
            ) : (
              meleeProducts.map((p) => (
                <tr key={p.id}>
                  <td style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
                    {p.details.shape === 'Round' ? '⚪' : '✦'} {p.details.shape}
                  </td>
                  <td>{p.details.pointerSize}</td>
                  <td>{p.details.mmSize}</td>
                  <td>{p.details.color}</td>
                  <td>{p.details.clarity}</td>
                  <td>{p.details.cut} / {p.details.polish}</td>
                  <td style={{ color: 'var(--accent-gold)', fontWeight: '600' }}>${p.price.toLocaleString()} / ct</td>
                  <td>
                    <span className="badge badge-approved" style={{ fontSize: '0.65rem' }}>{p.details.availability}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      className="btn btn-primary" 
                      style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                      onClick={() => setQuickViewProduct(p)}
                    >
                      Inquire Parcel
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Info Section */}
      <div style={{ marginTop: '40px', background: 'var(--accent-gold-soft)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '24px' }}>
        <h4 className="display-title" style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', marginBottom: '8px' }}>B2B Melee Purchasing Guidelines</h4>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          All melee orders are sold in minimum parcels of 1.00 carat weight. Natural melee is verified by automated CVD/HPHT screening machines to guarantee 100% natural origin. For custom mount orders, setting charges are calculated separately inside the checkout panel.
        </p>
      </div>
    </div>
  );
}
