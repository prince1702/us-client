import React from 'react';

export default function Footer({ setActivePage }) {
  const handleNav = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinkStyle = {
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    padding: '2px 0',
    display: 'inline-block'
  };

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        {/* Brand Column */}
        <div>
          <div className="logo display-title" style={{ fontSize: '1.15rem', marginBottom: '16px', letterSpacing: '3.5px' }}>
            <span style={{ color: 'var(--accent-gold)' }}>MELEE</span>
            {' '}
            <span style={{ fontWeight: 400, opacity: 0.8 }}>DIAMONDS</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '24px', maxWidth: '300px', lineHeight: '1.7' }}>
            Providing B2B and B2C partners with the highest standard of Natural and Lab-Grown diamonds, luxury custom mountings, and layouts worldwide.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            {['FB', 'IG', 'PIN', 'WA'].map((social) => (
              <span
                key={social}
                style={{
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '1px',
                  fontWeight: 600,
                  padding: '6px 10px',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.color = 'var(--accent-gold-dark)';
                  e.target.style.borderColor = 'var(--accent-gold)';
                  e.target.style.background = 'var(--accent-gold-soft)';
                }}
                onMouseOut={(e) => {
                  e.target.style.color = 'var(--text-muted)';
                  e.target.style.borderColor = 'var(--border-subtle)';
                  e.target.style.background = 'transparent';
                }}
              >
                {social}
              </span>
            ))}
          </div>
        </div>

        {/* Collections Column */}
        <div>
          <h4 className="display-title" style={{ fontSize: '0.75rem', color: 'var(--text-primary)', marginBottom: '18px', letterSpacing: '2px' }}>Collections</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            <li style={footerLinkStyle} onClick={() => handleNav('jewelry')}>Fine Jewelry</li>
            <li style={footerLinkStyle} onClick={() => handleNav('melee')}>Melee Diamonds</li>
            <li style={footerLinkStyle} onClick={() => handleNav('layouts')}>Layouts Catalog</li>
            <li style={footerLinkStyle} onClick={() => handleNav('certified')}>Certified Stones</li>
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h4 className="display-title" style={{ fontSize: '0.75rem', color: 'var(--text-primary)', marginBottom: '18px', letterSpacing: '2px' }}>Company</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            <li style={footerLinkStyle} onClick={() => handleNav('about')}>About Us</li>
            <li style={footerLinkStyle} onClick={() => handleNav('contact')}>Contact Showroom</li>
            <li style={footerLinkStyle}>Privacy Policy</li>
            <li style={footerLinkStyle}>Terms & Conditions</li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <h4 className="display-title" style={{ fontSize: '0.75rem', color: 'var(--text-primary)', marginBottom: '18px', letterSpacing: '2px' }}>Newsletter</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px', lineHeight: '1.65' }}>
            Subscribe to receive priority notifications on wholesale parcel shipments and new layout designs.
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="email" 
              placeholder="Email address" 
              className="form-control" 
              style={{ fontSize: '0.85rem', padding: '9px 14px', flex: 1 }}
            />
            <button className="btn btn-primary" style={{ padding: '9px 18px', fontSize: '0.72rem', whiteSpace: 'nowrap' }}>Join</button>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© 2026 Melee Diamonds Inc. All Rights Reserved.</p>
        <p style={{ fontFamily: 'var(--font-display)', letterSpacing: '1px', fontSize: '0.72rem' }}>Enterprise Jewelry Platform v1.0</p>
      </div>
    </footer>
  );
}
