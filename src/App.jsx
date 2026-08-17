import React, { useState, useContext, useEffect } from 'react';
import { StoreProvider, StoreContext } from './context/StoreContext';
import Navbar from './components/Navbar';
import DiamondToggle from './components/DiamondToggle';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import MeleeDiamonds from './pages/MeleeDiamonds';
import Layouts from './pages/Layouts';
import CertifiedDiamonds from './pages/CertifiedDiamonds';
import CustomInquiry from './pages/CustomInquiry';
import ProductDetail from './pages/ProductDetail';
import CartCheckout from './pages/CartCheckout';
import AdminDashboard from './pages/AdminDashboard';
import QuickViewModal from './components/QuickViewModal';
import './styles/app.css';

function MainLayout() {
  const [activePage, setActivePage] = useState('home');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [prefilledProduct, setPrefilledProduct] = useState(null);

  const { diamondType, wishlist, products, toggleWishlist, addToCart, isAdminLoggedIn } = useContext(StoreContext);

  // Render the page based on the active tab state
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <Home 
            setActivePage={setActivePage} 
            setQuickViewProduct={setQuickViewProduct} 
            setSelectedProduct={setSelectedProduct} 
          />
        );
      case 'jewelry':
        return (
          <Catalog 
            setQuickViewProduct={setQuickViewProduct} 
            setSelectedProduct={setSelectedProduct} 
            setActivePage={setActivePage} 
          />
        );
      case 'melee':
        return (
          <MeleeDiamonds 
            setActivePage={setActivePage} 
            setQuickViewProduct={setQuickViewProduct} 
          />
        );
      case 'layouts':
        return (
          <Layouts 
            setActivePage={setActivePage} 
            setQuickViewProduct={setQuickViewProduct} 
            setSelectedProduct={setSelectedProduct} 
          />
        );
      case 'certified':
        return (
          <CertifiedDiamonds 
            setActivePage={setActivePage} 
            setQuickViewProduct={setQuickViewProduct} 
          />
        );
      case 'custom-inquiry':
        return (
          <CustomInquiry 
            prefilledProduct={prefilledProduct} 
            onClearPrefill={() => setPrefilledProduct(null)} 
          />
        );
      case 'product-detail':
        return (
          <ProductDetail 
            product={selectedProduct} 
            setActivePage={setActivePage} 
            onNavigateToInquiry={(p) => {
              setPrefilledProduct(p);
              setActivePage('custom-inquiry');
            }}
          />
        );
      case 'cart':
        return <CartCheckout setActivePage={setActivePage} />;
        
      case 'wishlist':
        // Inline rendering for wishlist page
        const wishlistedItems = products.filter(p => wishlist.includes(p.id));
        return (
          <div className="container section animate-fade-in">
            <div className="section-header">
              <span className="section-subtitle">Saved Selections</span>
              <h1 className="display-title section-title">Your Wishlist</h1>
            </div>
            
            {wishlistedItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', border: '1px dashed var(--border-color)', borderRadius: '8px' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>Your wishlist is currently empty.</p>
                <button className="btn btn-primary" onClick={() => setActivePage('jewelry')}>Explore Catalog</button>
              </div>
            ) : (
              <div className="products-grid">
                {wishlistedItems.map(p => (
                  <div key={p.id} className="card">
                    <div className="card-img-container">
                      <span className="card-tag">{p.diamondType}</span>
                      <img src={p.image} alt={p.name} className="card-img" />
                    </div>
                    <div className="card-info">
                      <div>
                        <div className="card-category">{p.category}</div>
                        <h3 className="card-title">{p.name}</h3>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                        <div className="card-price">${p.price.toLocaleString()}</div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            className="btn btn-secondary" 
                            style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                            onClick={() => toggleWishlist(p.id)}
                          >
                            Remove
                          </button>
                          {p.category !== 'Melee Diamonds' && p.category !== 'Certified Diamonds' && (
                            <button 
                              className="btn btn-primary" 
                              style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                              onClick={() => {
                                addToCart(p, 1);
                                alert('Added to cart!');
                              }}
                            >
                              + Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
        
      case 'admin':
        return isAdminLoggedIn ? <AdminDashboard /> : <PortalLockScreen />;
      case 'about':
        return (
          <div className="container section animate-fade-in" style={{ padding: '80px 24px' }}>
            <div className="section-header" style={{ marginBottom: '40px' }}>
              <span className="section-subtitle">Heritage & Legacy</span>
              <h2 className="section-title">The Melee Craft</h2>
            </div>
            <div className="responsive-grid-half" style={{ alignItems: 'center' }}>
              <div>
                <p style={{ fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--accent-gold-dark)', marginBottom: '24px', fontFamily: 'var(--font-serif)' }}>
                  "For generations, Melee Diamonds has scanner-mapped raw diamonds, hand-forging high-carat jewelry with GIA and IGI certification compliance."
                </p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Melee Diamonds operates state-of-the-art scanning facilities in Chicago, Illinois, and Antwerp, Belgium, verifying each diamond facet to construct perfect matched parcels, eternity lines, and engagement structures.
                </p>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Our jewelry showrooms are accessible to private clientele via reserved appointments, establishing institutional escrow checkout gates and certified diamond listings.
                </p>
              </div>
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '40px', textAlign: 'center' }}>
                <h4 style={{ color: 'var(--accent-gold)', marginBottom: '16px', fontFamily: 'var(--font-display)', letterSpacing: '2px' }}>OUR PRINCIPLES</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <li>✓ 100% Conflict-Free Natural Origin</li>
                  <li>✓ IGI / GIA Full Laser Inscription Verification</li>
                  <li>✓ In-house Master Bench Jeweler Fabrication</li>
                  <li>✓ Escrow Bank Wire Transfer Protection</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="container section animate-fade-in" style={{ padding: '80px 24px' }}>
            <div className="section-header" style={{ marginBottom: '40px' }}>
              <span className="section-subtitle">Reserve An Appointment</span>
              <h2 className="section-title">Showroom Coordination</h2>
            </div>
            <div className="responsive-grid-half">
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '40px' }}>
                <h3 className="display-title" style={{ fontSize: '1.1rem', marginBottom: '24px', color: 'var(--accent-gold)' }}>SEND INQUIRY WIRE</h3>
                <form onSubmit={(e) => { e.preventDefault(); alert('Showroom inquiry transmitted successfully. Coordination coordinators will reach out in 24 hours.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Full Name</label>
                    <input type="text" required placeholder="e.g. John Doe" className="form-control" />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Email Coordinates</label>
                    <input type="email" required placeholder="e.g. client@domain.com" className="form-control" />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Preferred Location</label>
                    <select className="form-control">
                      <option>Chicago Private Suite Showroom</option>
                      <option>New York Diamond District Suite</option>
                      <option>Antwerp Vaults Showroom</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                    Reserve Placement
                  </button>
                </form>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '30px' }}>
                <div>
                  <h4 style={{ color: 'var(--accent-gold)', marginBottom: '8px', letterSpacing: '1px', fontSize: '0.9rem' }}>CHICAGO OFFICES</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    55 East Washington St, Chicago, IL 60602<br />
                    Phone: +1 (312) 555-0192<br />
                    Email: Chicago@meleediamonds.com
                  </p>
                </div>
                <div>
                  <h4 style={{ color: 'var(--accent-gold)', marginBottom: '8px', letterSpacing: '1px', fontSize: '0.9rem' }}>ANTWERP OFFICE</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    Hoveniersstraat 30, 2018 Antwerp, Belgium<br />
                    Phone: +32 3 555 9290<br />
                    Email: Antwerp@meleediamonds.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  const themeClass = diamondType === 'Natural' ? 'theme-natural' : 'theme-labgrown';

  return (
    <div className={themeClass} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', transition: 'background-color var(--transition-normal), color var(--transition-normal)' }}>
      {/* 1. Global Eco selector switch (hidden on home) */}
      {activePage !== 'home' && <DiamondToggle />}

      {/* 2. Main Navigation menu bar */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* 3. Main content route switcher */}
      <div style={{ flexGrow: 1 }}>
        {renderPage()}
      </div>

      {/* 4. Footer */}
      <Footer setActivePage={setActivePage} />

      {/* 5. Floating Quick View overlay */}
      {quickViewProduct && (
        <QuickViewModal 
          product={quickViewProduct} 
          onClose={() => setQuickViewProduct(null)} 
          onNavigateToInquiry={(p) => {
            setPrefilledProduct(p);
            setQuickViewProduct(null);
            setActivePage('custom-inquiry');
          }}
          onNavigateToDetail={(p) => {
            setSelectedProduct(p);
            setQuickViewProduct(null);
            setActivePage('product-detail');
          }}
        />
      )}
    </div>
  );
}

function PortalLockScreen() {
  const { loginAdmin, adminPassword } = useContext(StoreContext);
  const [username, setUsername] = useState('MELEE');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    const success = loginAdmin(username, password);
    if (!success) {
      setError('Invalid ID or Password signature. Access rejected.');
    }
  };

  const handleFillDemo = () => {
    setUsername('MELEE');
    setPassword(adminPassword || 'admin');
    setError('');
  };

  return (
    <div className="container section animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '600px', padding: '60px 24px' }}>
      <div className="card" style={{ maxWidth: '440px', width: '100%', padding: '44px 36px', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'var(--bg-secondary)', boxShadow: 'var(--shadow-lg)', textAlign: 'center' }}>
        
        {/* Brand Icon Header */}
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--accent-gold-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.8rem', border: '1px solid var(--accent-gold)' }}>
          🔐
        </div>

        <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--accent-gold)', fontWeight: '700', display: 'block', marginBottom: '6px' }}>
          Melee Diamonds Internal Portal
        </span>
        <h2 className="display-title" style={{ fontSize: '1.4rem', marginBottom: '10px', color: 'var(--text-primary)' }}>Admin Security Access</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '28px', lineHeight: '1.6' }}>
          Restricted administrative gateway. Enter your authorization credentials to manage inquiries and inventory.
        </p>

        {error && (
          <div style={{ color: 'var(--status-cancelled)', background: 'rgba(220, 38, 38, 0.08)', border: '1px solid rgba(220, 38, 38, 0.2)', padding: '12px 14px', borderRadius: '6px', fontSize: '0.82rem', marginBottom: '20px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
          <div className="form-group" style={{ marginBottom: '18px' }}>
            <label className="form-label" style={{ fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: '700' }}>
              Security Profile ID (Username)
            </label>
            <input 
              type="text" 
              required
              placeholder="e.g. MELEE" 
              className="form-control"
              style={{ padding: '12px 14px', fontSize: '0.9rem', borderRadius: '6px' }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label" style={{ fontSize: '0.72rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: '700' }}>
              Passcode Signature (Password)
            </label>
            <input 
              type="password" 
              required
              placeholder="••••••••" 
              className="form-control"
              style={{ padding: '12px 14px', fontSize: '0.9rem', borderRadius: '6px' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '0.8rem', letterSpacing: '1.5px', fontWeight: '700', borderRadius: '6px', cursor: 'pointer' }}>
            Login to Admin Dashboard
          </button>
        </form>

        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px dashed var(--border-color)', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Default Credentials: ID: <strong>MELEE</strong> | Password: <strong>admin</strong>
          </span>
          <button 
            type="button" 
            onClick={handleFillDemo}
            className="btn btn-secondary"
            style={{ fontSize: '0.72rem', padding: '6px 16px', borderRadius: '4px', letterSpacing: '1px' }}
          >
            ⚡ Auto-Fill Demo Credentials
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
