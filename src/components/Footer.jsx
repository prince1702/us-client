import React from 'react';

export default function Footer({ setActivePage }) {
  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', padding: '60px 0 30px' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '40px', marginBottom: '40px' }}>
        <div>
          <div className="logo display-title" style={{ fontSize: '1.2rem', marginBottom: '16px' }}>
            <span style={{ color: 'var(--accent-gold)' }}>MELEE</span> DIAMONDS
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px', maxWidth: '320px' }}>
            Providing B2B and B2C partners with the highest standard of Natural and Lab-Grown diamonds, luxury custom mountings, and layouts worldwide.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ color: 'var(--accent-gold)', cursor: 'pointer' }}>FB</span>
            <span style={{ color: 'var(--accent-gold)', cursor: 'pointer' }}>IG</span>
            <span style={{ color: 'var(--accent-gold)', cursor: 'pointer' }}>PIN</span>
            <span style={{ color: 'var(--accent-gold)', cursor: 'pointer' }}>WA</span>
          </div>
        </div>

        <div>
          <h4 className="display-title" style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginBottom: '16px', letterSpacing: '1px' }}>Collections</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <li style={{ cursor: 'pointer' }} onClick={() => setActivePage('jewelry')}>Fine Jewelry</li>
            <li style={{ cursor: 'pointer' }} onClick={() => setActivePage('melee')}>Melee Diamonds</li>
            <li style={{ cursor: 'pointer' }} onClick={() => setActivePage('layouts')}>Layouts Catalog</li>
            <li style={{ cursor: 'pointer' }} onClick={() => setActivePage('certified')}>Certified Stones</li>
          </ul>
        </div>

        <div>
          <h4 className="display-title" style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginBottom: '16px', letterSpacing: '1px' }}>Company</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <li style={{ cursor: 'pointer' }}>About Us</li>
            <li style={{ cursor: 'pointer' }}>Contact Showroom</li>
            <li style={{ cursor: 'pointer' }}>Privacy Policy</li>
            <li style={{ cursor: 'pointer' }}>Terms & Conditions</li>
          </ul>
        </div>

        <div>
          <h4 className="display-title" style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginBottom: '16px', letterSpacing: '1px' }}>Newsletter</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>
            Subscribe to receive priority notifications on wholesale parcel shipments and new layout designs.
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="email" 
              placeholder="Email address" 
              className="form-control" 
              style={{ fontSize: '0.85rem', padding: '8px 12px' }}
            />
            <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>Join</button>
          </div>
        </div>
      </div>

      <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        <p>© 2026 Melee Diamonds Inc. All Rights Reserved.</p>
        <p>Enterprise Jewelry Platform Specification v1.0</p>
      </div>
    </footer>
  );
}
