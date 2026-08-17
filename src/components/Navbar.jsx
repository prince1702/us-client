import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';

export default function Navbar({ activePage, setActivePage }) {
  const { cart, wishlist, diamondType, setDiamondType } = useContext(StoreContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);



  const subCategories = [
    { id: 'home', label: 'Home' },
    { id: 'jewelry', label: 'All Jewelry' },
    { id: 'certified', label: 'Loose Diamonds' },
    { id: 'melee', label: 'Melee Parcels' },
    { id: 'layouts', label: 'Layout Sets' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Showroom' },
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="site-header-pinned">
      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        <span>✦ COMPLIMENTARY INSURED COURIER DELIVERY & BANK ESCROW ASSURANCE ✦</span>
      </div>

      {/* Main Sticky Navbar */}
      <div className="navbar-main">
        <div className="container navbar-container">
          {/* Mobile menu trigger */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>

          {/* Brand Logo */}
          <div className="logo display-title" onClick={() => handleNavClick('home')}>
            <span className="logo-brand">MELEE</span>
            <span className="logo-sub">DIAMONDS</span>
          </div>



          {/* Header Action Buttons */}
          <div className="header-actions">
            {/* Diamond Ecosystem Switcher */}
            <div className="mini-eco-toggle">
              <button 
                className={`mini-eco-btn ${diamondType === 'Natural' ? 'active' : ''}`}
                onClick={() => setDiamondType('Natural')}
              >
                Natural
              </button>
              <button 
                className={`mini-eco-btn ${diamondType === 'Lab-Grown' ? 'active' : ''}`}
                onClick={() => setDiamondType('Lab-Grown')}
              >
                Lab-Grown
              </button>
            </div>

            <button 
              className="nav-icon-btn" 
              onClick={() => handleNavClick('wishlist')}
              title="Saved Wishlist"
            >
              ♡ <span className="badge-count">{wishlist.length}</span>
            </button>
            
            <button 
              className="nav-icon-btn" 
              onClick={() => handleNavClick('cart')}
              title="Shopping Cart"
            >
              🛒 <span className="badge-count">{cartCount}</span>
            </button>

            <button 
              className="btn btn-portal-nav" 
              onClick={() => handleNavClick('admin')}
            >
              PORTAL
            </button>
          </div>
        </div>
      </div>

      {/* Sub Navigation Strip */}
      <div className="sub-navbar">
        <div className="container sub-nav-container">
          {subCategories.map((sub) => (
            <span 
              key={sub.id} 
              className={`sub-nav-item ${activePage === sub.id ? 'active' : ''}`}
              onClick={() => handleNavClick(sub.id)}
            >
              {sub.label}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
