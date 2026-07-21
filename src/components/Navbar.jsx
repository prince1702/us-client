import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';

export default function Navbar({ activePage, setActivePage }) {
  const { cart, wishlist } = useContext(StoreContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'jewelry', label: 'Jewelry' },
    { id: 'melee', label: 'Melee' },
    { id: 'layouts', label: 'Layouts' },
    { id: 'certified', label: 'Certified' },
    { id: 'custom-inquiry', label: 'Inquiry' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileOpen(false);
  };

  return (
    <header className="site-header">
      {/* Gold Top Banner */}
      <div className="announcement-bar">
        ✦ COMPLIMENTARY INSURED COURIER DELIVERY & BANK ESCROW ASSURANCE ✦
      </div>

      <div className="navbar">
        {/* Mobile menu trigger */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>

        {/* Brand Logo */}
        <div className="logo display-title" onClick={() => handleNavClick('home')} style={{ cursor: 'pointer' }}>
          <span style={{ color: 'var(--accent-gold)' }}>MELEE</span> DIAMONDS
        </div>

        {/* Center navigation links */}
        <nav>
          <ul className={`nav-links ${mobileOpen ? 'mobile-active' : ''}`}>
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </nav>

        {/* Header Action Buttons */}
        <div className="header-actions">
          <button 
            className="nav-item wishlist-btn" 
            style={{ border: 'none', background: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={() => handleNavClick('wishlist')}
          >
            ♡ <span className="wishlist-count">({wishlist.length})</span>
          </button>
          
          <button 
            className="btn btn-secondary nav-action-btn" 
            onClick={() => handleNavClick('cart')}
          >
            Cart ({cartCount})
          </button>

          <button 
            className="btn btn-primary nav-action-btn" 
            onClick={() => handleNavClick('admin')}
          >
            Portal
          </button>
        </div>
      </div>
    </header>
  );
}
