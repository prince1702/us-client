import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';

export default function CertifiedDiamonds({ setActivePage, setQuickViewProduct }) {
  const { diamondType, products } = useContext(StoreContext);

  // Filter States
  const [selectedShape, setSelectedShape] = useState('All');
  const [selectedLab, setSelectedLab] = useState('All');
  const [minCarat, setMinCarat] = useState(0.5);
  const [maxCarat, setMaxCarat] = useState(5.0);
  const [selectedColor, setSelectedColor] = useState('All');
  const [selectedClarity, setSelectedClarity] = useState('All');
  const [compareList, setCompareList] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const shapes = ['All', 'Round', 'Oval', 'Cushion'];
  const colors = ['All', 'D', 'E', 'F', 'G'];
  const clarities = ['All', 'VVS1', 'VVS2', 'VS1'];

  // Filter Certified Diamonds
  const certDiamonds = products
    .filter(p => p.category === 'Certified Diamonds')
    .filter(p => p.diamondType === diamondType)
    .filter(p => selectedShape === 'All' || p.details.shape === selectedShape)
    .filter(p => selectedLab === 'All' || p.details.lab === selectedLab)
    .filter(p => p.details.carat >= minCarat && p.details.carat <= maxCarat)
    .filter(p => selectedColor === 'All' || p.details.color === selectedColor)
    .filter(p => selectedClarity === 'All' || p.details.clarity === selectedClarity);

  // Handle Comparison select
  const toggleCompare = (diamond) => {
    setCompareList(prev => {
      const exists = prev.find(item => item.id === diamond.id);
      if (exists) {
        return prev.filter(item => item.id !== diamond.id);
      }
      if (prev.length >= 4) {
        alert('You can compare a maximum of 4 diamonds at once.');
        return prev;
      }
      return [...prev, diamond];
    });
  };

  return (
    <div className="container section animate-fade-in">
      <div className="section-header">
        <span className="section-subtitle">Certified Loose Stones</span>
        <h1 className="display-title section-title">{diamondType} Diamond Search</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
          Query our live vault of GIA and IGI certified diamonds. Compare proportions, ratios, and certifications instantly.
        </p>
      </div>

      {/* Advanced Filter Dashboard */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '32px', marginBottom: '32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          
          {/* Shape Dropdown */}
          <div>
            <label className="form-label">Stone Shape</label>
            <select className="form-control" value={selectedShape} onChange={(e) => setSelectedShape(e.target.value)}>
              {shapes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Lab Selection */}
          <div>
            <label className="form-label">Report Laboratory</label>
            <select className="form-control" value={selectedLab} onChange={(e) => setSelectedLab(e.target.value)}>
              <option value="All">All Labs (GIA/IGI)</option>
              <option value="GIA">GIA Only</option>
              <option value="IGI">IGI Only</option>
            </select>
          </div>

          {/* Carat Ranges */}
          <div>
            <label className="form-label">Carat Weight Range</label>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <input 
                type="number" 
                step="0.05"
                min="0.3"
                value={minCarat} 
                onChange={(e) => setMinCarat(Number(e.target.value))} 
                className="form-control" 
                style={{ padding: '8px', background: 'var(--bg-primary)' }}
              />
              <span style={{ color: 'var(--text-muted)' }}>to</span>
              <input 
                type="number" 
                step="0.05"
                max="10.0"
                value={maxCarat} 
                onChange={(e) => setMaxCarat(Number(e.target.value))} 
                className="form-control" 
                style={{ padding: '8px', background: 'var(--bg-primary)' }}
              />
            </div>
          </div>

          {/* Color Grade */}
          <div>
            <label className="form-label">Color Grade</label>
            <select className="form-control" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
              {colors.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Clarity Grade */}
          <div>
            <label className="form-label">Clarity Grade</label>
            <select className="form-control" value={selectedClarity} onChange={(e) => setSelectedClarity(e.target.value)}>
              {clarities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Floating Compare Drawer */}
      {compareList.length > 0 && (
        <div style={{ position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)', background: 'var(--bg-secondary)', border: '1px solid var(--accent-gold)', borderRadius: '30px', padding: '12px 32px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: 'var(--shadow-lg)', zIndex: '99' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
            Selected <strong style={{ color: 'var(--accent-gold)' }}>{compareList.length}</strong> stones for comparison
          </span>
          <button className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '0.75rem', borderRadius: '20px' }} onClick={() => setShowCompareModal(true)}>
            Compare Specs
          </button>
          <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem' }} onClick={() => setCompareList([])}>
            Clear
          </button>
        </div>
      )}

      {/* Search Result Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>Select</th>
              <th>Certificate #</th>
              <th>Shape</th>
              <th>Carat</th>
              <th>Color</th>
              <th>Clarity</th>
              <th>Cut Grade</th>
              <th>Laboratory</th>
              <th>Price</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {certDiamonds.length === 0 ? (
              <tr>
                <td colSpan="10" style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
                  No loose diamonds match your detailed filters. Try expanding search parameters.
                </td>
              </tr>
            ) : (
              certDiamonds.map((p) => {
                const isCompared = compareList.some(item => item.id === p.id);
                return (
                  <tr key={p.id}>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={isCompared} 
                        onChange={() => toggleCompare(p)} 
                        style={{ accentColor: 'var(--accent-gold)', scale: '1.2', cursor: 'pointer' }}
                      />
                    </td>
                    <td style={{ color: 'var(--accent-gold)', fontWeight: '600' }}>{p.details.certificateNumber}</td>
                    <td>{p.details.shape}</td>
                    <td>{p.details.carat} ct</td>
                    <td>{p.details.color}</td>
                    <td>{p.details.clarity}</td>
                    <td>{p.details.cut}</td>
                    <td>{p.details.lab}</td>
                    <td style={{ fontWeight: '700', color: 'var(--text-primary)' }}>${p.price.toLocaleString()}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        className="btn btn-secondary" 
                        style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                        onClick={() => setQuickViewProduct(p)}
                      >
                        Inspect Details
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Spec Comparison Overlay Modal */}
      {showCompareModal && (
        <div className="modal-overlay" onClick={() => setShowCompareModal(false)}>
          <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px' }}>
            <button className="modal-close" onClick={() => setShowCompareModal(false)}>×</button>
            <h2 className="display-title" style={{ fontSize: '1.2rem', marginBottom: '24px' }}>Side-by-Side Comparison</h2>
            
            <div style={{ overflowX: 'auto', width: '100%', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: `150px repeat(${compareList.length}, minmax(160px, 1fr))`, minWidth: '650px' }}>
                
                {/* Row: Header */}
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderBottom: '1px solid var(--border-color)', fontWeight: '700' }}>Spec / Stone</div>
                {compareList.map((d) => (
                  <div key={d.id} style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderBottom: '1px solid var(--border-color)', textAlign: 'center', fontWeight: '700', color: 'var(--accent-gold)' }}>
                    {d.details.certificateNumber}
                  </div>
                ))}

                {/* Row: Shape */}
                <div style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Shape</div>
                {compareList.map((d) => (
                  <div key={d.id} style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>{d.details.shape}</div>
                ))}

                {/* Row: Carats */}
                <div style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Carats</div>
                {compareList.map((d) => (
                  <div key={d.id} style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>{d.details.carat} ct</div>
                ))}

                {/* Row: Color */}
                <div style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Color</div>
                {compareList.map((d) => (
                  <div key={d.id} style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>{d.details.color}</div>
                ))}

                {/* Row: Clarity */}
                <div style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Clarity</div>
                {compareList.map((d) => (
                  <div key={d.id} style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>{d.details.clarity}</div>
                ))}

                {/* Row: Proportions */}
                <div style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Depth / Table</div>
                {compareList.map((d) => (
                  <div key={d.id} style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                    {d.details.depth}% / {d.details.table}%
                  </div>
                ))}

                {/* Row: Price */}
                <div style={{ padding: '12px', fontWeight: '700' }}>Price</div>
                {compareList.map((d) => (
                  <div key={d.id} style={{ padding: '12px', textAlign: 'center', fontWeight: '700', color: 'var(--text-primary)' }}>
                    ${d.price.toLocaleString()}
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{ marginTop: '24px', textAlign: 'right' }}>
              <button className="btn btn-secondary" onClick={() => setShowCompareModal(false)}>Close Comparison</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
