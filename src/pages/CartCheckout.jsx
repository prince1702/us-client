import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';

export default function CartCheckout({ setActivePage }) {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useContext(StoreContext);
  
  // Checkout States
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [shippingMethod, setShippingMethod] = useState('armored'); // 'armored' or 'showroom'
  const [paymentMethod, setPaymentMethod] = useState('stripe'); // 'stripe', 'paypal', 'bank'
  const [couponApplied, setCouponApplied] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState(null);

  // Stripe Form State
  const [stripeForm, setStripeForm] = useState({ card: '', name: '', exp: '', cvc: '' });

  // Calculate totals
  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const discount = subtotal * discountPercent;
  const shipping = shippingMethod === 'armored' ? (subtotal > 10000 ? 0 : 150) : 0;
  const taxRate = 0.0825; // 8.25% state tax
  const tax = (subtotal - discount) * taxRate;
  const total = subtotal - discount + shipping + tax;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'WELCOME10') {
      setDiscountPercent(0.10);
      setCouponApplied(true);
      alert('10% discount applied successfully!');
    } else {
      alert('Invalid coupon code. Try WELCOME10.');
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // Generate simulated order
    const year = new Date().getFullYear();
    const orderKey = `ORD-${year}-${Math.floor(100000 + Math.random() * 900000)}`;
    setInvoiceNumber(orderKey);
    setOrderCompleted(true);
    clearCart();
  };

  return (
    <div className="container section animate-fade-in">
      <div className="section-header">
        <span className="section-subtitle">Escrow & Secure Acquisition</span>
        <h1 className="display-title section-title">Checkout Portal</h1>
      </div>

      {!orderCompleted ? (
        cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', border: '1px dashed var(--border-color)', borderRadius: '8px' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>Your shopping cart is empty.</p>
            <button className="btn btn-primary" onClick={() => setActivePage('jewelry')}>Browse Catalog</button>
          </div>
        ) : (
          <div className="checkout-layout">
            {/* Left: Cart items & Payment forms */}
            <div>
              {/* Item lists */}
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '24px', marginBottom: '32px' }}>
                <h3 className="display-title" style={{ fontSize: '1rem', marginBottom: '20px' }}>Items Summary</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {cart.map((item) => (
                    <div 
                      key={`${item.product.sku}-${item.metalOption}`} 
                      style={{ display: 'grid', gridTemplateColumns: '80px 1fr 120px 80px', gap: '16px', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px' }}
                    >
                      <div style={{ background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px', borderRadius: '4px' }}>
                        <img src={item.product.image} alt={item.product.name} style={{ maxHeight: '50px', maxWidth: '100%' }} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '600' }}>{item.product.name}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Alloy: {item.metalOption}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'var(--bg-primary)', width: 'fit-content' }}>
                        <button style={{ padding: '4px 8px', cursor: 'pointer' }} onClick={() => updateCartQuantity(item.product.sku, item.metalOption, Math.max(1, item.quantity - 1))}>−</button>
                        <span style={{ padding: '0 8px', fontSize: '0.85rem' }}>{item.quantity}</span>
                        <button style={{ padding: '4px 8px', cursor: 'pointer' }} onClick={() => updateCartQuantity(item.product.sku, item.metalOption, item.quantity + 1)}>＋</button>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: 'var(--accent-gold)', fontWeight: '600', fontSize: '0.95rem' }}>
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </div>
                        <button 
                          style={{ background: 'none', border: 'none', color: 'var(--status-cancelled)', cursor: 'pointer', fontSize: '0.75rem', marginTop: '6px' }}
                          onClick={() => removeFromCart(item.product.sku, item.metalOption)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Method */}
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '24px', marginBottom: '32px' }}>
                <h3 className="display-title" style={{ fontSize: '1rem', marginBottom: '16px' }}>Delivery Options</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label className="checkbox-label" style={{ border: '1px solid var(--border-color)', padding: '16px', borderRadius: '4px', background: shippingMethod === 'armored' ? 'var(--accent-gold-soft)' : 'none' }}>
                    <input type="radio" checked={shippingMethod === 'armored'} onChange={() => setShippingMethod('armored')} style={{ accentColor: 'var(--accent-gold)' }} />
                    <div>
                      <strong>Fully-Insured Armored Express</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Delivered via armored courier (Malca-Amit/Brinks) to your designated commercial storefront. (1-3 business days)</div>
                    </div>
                  </label>
                  <label className="checkbox-label" style={{ border: '1px solid var(--border-color)', padding: '16px', borderRadius: '4px', background: shippingMethod === 'showroom' ? 'var(--accent-gold-soft)' : 'none' }}>
                    <input type="radio" checked={shippingMethod === 'showroom'} onChange={() => setShippingMethod('showroom')} style={{ accentColor: 'var(--accent-gold)' }} />
                    <div>
                      <strong>Showroom Vault Pickup</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Pick up directly in our security vaults (Chicago or New York). Identity screening required. (Free)</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Payment details */}
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '24px' }}>
                <h3 className="display-title" style={{ fontSize: '1rem', marginBottom: '20px' }}>Payment Integration</h3>
                
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                  <button 
                    className={`btn ${paymentMethod === 'stripe' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flexGrow: 1, padding: '10px 16px', fontSize: '0.8rem' }}
                    onClick={() => setPaymentMethod('stripe')}
                  >
                    Credit / Debit Card
                  </button>
                  <button 
                    className={`btn ${paymentMethod === 'paypal' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flexGrow: 1, padding: '10px 16px', fontSize: '0.8rem' }}
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    PayPal Gateway
                  </button>
                  <button 
                    className={`btn ${paymentMethod === 'bank' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flexGrow: 1, padding: '10px 16px', fontSize: '0.8rem' }}
                    onClick={() => setPaymentMethod('bank')}
                  >
                    B2B Bank Transfer
                  </button>
                </div>

                <form onSubmit={handleCheckout}>
                  {paymentMethod === 'stripe' && (
                    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div className="form-group">
                        <label className="form-label">Cardholder Full Name</label>
                        <input type="text" required placeholder="Marcus Aurelius" className="form-control" value={stripeForm.name} onChange={(e) => setStripeForm({...stripeForm, name: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Credit Card Number</label>
                        <input type="text" required placeholder="4111 2222 3333 4444" className="form-control" value={stripeForm.card} onChange={(e) => setStripeForm({...stripeForm, card: e.target.value})} />
                      </div>
                      <div className="responsive-grid-half" style={{ gap: '20px' }}>
                        <div className="form-group">
                          <label className="form-label">Expiration Date</label>
                          <input type="text" required placeholder="MM/YY" className="form-control" value={stripeForm.exp} onChange={(e) => setStripeForm({...stripeForm, exp: e.target.value})} />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Security CVC</label>
                          <input type="password" required placeholder="•••" className="form-control" value={stripeForm.cvc} onChange={(e) => setStripeForm({...stripeForm, cvc: e.target.value})} />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="animate-fade-in" style={{ textAlign: 'center', padding: '24px', background: 'var(--bg-primary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                      <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.9rem' }}>You will be redirected securely to the PayPal login gate to authorize the transaction.</p>
                      <div style={{ background: '#FFC439', color: '#111', fontWeight: '700', padding: '12px 24px', borderRadius: '4px', display: 'inline-block', fontSize: '0.9rem' }}>PayPal Secure Pay</div>
                    </div>
                  )}

                  {paymentMethod === 'bank' && (
                    <div className="animate-fade-in" style={{ padding: '20px', background: 'var(--bg-primary)', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <h4 style={{ color: 'var(--accent-gold)', marginBottom: '12px' }}>Wholesale Wire Coordinates</h4>
                      <p style={{ marginBottom: '8px' }}><strong>Bank Name:</strong> JPMorgan Chase & Co.</p>
                      <p style={{ marginBottom: '8px' }}><strong>Routing Number (ABA):</strong> 021000021</p>
                      <p style={{ marginBottom: '8px' }}><strong>Account Number (IBAN):</strong> US89 CHASE 0012 3902 1029 38</p>
                      <p style={{ marginBottom: '16px' }}><strong>SWIFT / BIC:</strong> CHASUS33XXX</p>
                      <p style={{ fontStyle: 'italic', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Note: Submit your wire transfers immediately. Items will be shipped upon receipt and verification of funds by our treasury department.</p>
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', marginTop: '24px', fontWeight: '700' }}>
                    Authorize Payment (${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
                  </button>
                </form>
              </div>
            </div>

            {/* Right: Summary panel */}
            <aside className="summary-box">
              <h3 className="display-title" style={{ fontSize: '1rem', marginBottom: '20px' }}>Purchase Summary</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.9rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '20px', marginBottom: '20px', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal</span>
                  <span style={{ color: 'var(--text-primary)' }}>${subtotal.toLocaleString()}</span>
                </div>
                
                {couponApplied && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--status-approved)' }}>
                    <span>Coupon Discount (10%)</span>
                    <span>-${discount.toLocaleString()}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Armored Cargo Escort</span>
                  <span style={{ color: 'var(--text-primary)' }}>{shipping === 0 ? 'Free' : `$${shipping.toLocaleString()}`}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Estimated Taxes (8.25%)</span>
                  <span style={{ color: 'var(--text-primary)' }}>${tax.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '700', marginBottom: '32px' }}>
                <span>Grand Total</span>
                <span style={{ color: 'var(--accent-gold)' }}>${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>

              {/* Coupon entry */}
              <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  placeholder="Coupon (e.g. WELCOME10)" 
                  className="form-control" 
                  style={{ fontSize: '0.85rem', padding: '8px 12px' }}
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button type="submit" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>Apply</button>
              </form>
            </aside>
          </div>
        )
      ) : (
        /* Success invoice step */
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '60px 40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ fontSize: '4rem', color: 'var(--status-approved)', marginBottom: '24px' }}>✓</div>
          <h2 className="display-title" style={{ fontSize: '1.6rem', marginBottom: '16px' }}>Escrow Confirmed</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
            We have authorized the payment escrow. Packing files and courier tracking details will follow immediately via transactional email logs.
          </p>

          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '24px', marginBottom: '40px' }}>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>Transaction Receipt Key</div>
            <div style={{ fontSize: '1.6rem', fontWeight: '700', color: 'var(--accent-gold)', letterSpacing: '1px' }}>{invoiceNumber}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>Status: <span style={{ color: 'var(--status-approved)', fontWeight: '600' }}>Processing Shipment</span></div>
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => setActivePage('jewelry')}>Continue Shopping</button>
            <button className="btn btn-secondary" onClick={() => { setOrderCompleted(false); setActivePage('home'); }}>Back to Home</button>
          </div>
        </div>
      )}
    </div>
  );
}
