import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/StoreContext';

export default function CustomInquiry({ prefilledProduct, onClearPrefill }) {
  const { submitInquiry } = useContext(StoreContext);

  // Form Wizard Steps: 1, 2, 3
  const [step, setStep] = useState(1);
  const [inquiryNumber, setInquiryNumber] = useState(null);

  // Form Data State
  const [formData, setFormData] = useState({
    title: '',
    jewelryCategory: 'Rings',
    diamondType: 'Lab-Grown',
    metalPreference: 'Platinum',
    description: '',
    quantity: 1,
    budgetRange: '$2,000 - $5,000',
    deliveryDate: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    companyName: '',
    country: 'United States',
    uploadedImages: []
  });

  // Handle prefilled products (e.g. from loose diamonds or catalog quick inquiry)
  useEffect(() => {
    if (prefilledProduct) {
      setFormData(prev => ({
        ...prev,
        title: `Custom Design: ${prefilledProduct.name}`,
        jewelryCategory: prefilledProduct.category === 'Certified Diamonds' || prefilledProduct.category === 'Melee Diamonds' ? 'Rings' : prefilledProduct.category,
        diamondType: prefilledProduct.diamondType,
        description: `I am interested in creating a custom mount/item based on product SKU ${prefilledProduct.sku} (${prefilledProduct.name}).`,
        budgetRange: `$${Math.round(prefilledProduct.price * 0.8)} - $${Math.round(prefilledProduct.price * 1.2)}`
      }));
    }
  }, [prefilledProduct]);

  // Image upload simulator
  const handleFileUpload = (e) => {
    e.preventDefault();
    // Simulated upload URLs
    const mockURLs = [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=300&q=80'
    ];
    setFormData(prev => ({
      ...prev,
      uploadedImages: [...prev.uploadedImages, ...mockURLs]
    }));
    alert('Simulated file uploaded successfully!');
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.customerEmail || !formData.title) {
      alert('Please fill out all required fields: Inquiry Title, Name, and Email.');
      return;
    }

    const assignedNumber = submitInquiry({
      title: formData.title,
      jewelryCategory: formData.jewelryCategory,
      diamondType: formData.diamondType,
      metalPreference: formData.metalPreference,
      description: formData.description,
      quantity: formData.quantity,
      budgetRange: formData.budgetRange,
      deliveryDate: formData.deliveryDate,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      companyName: formData.companyName,
      country: formData.country,
      images: formData.uploadedImages
    });

    setInquiryNumber(assignedNumber);
    setStep(4); // Success step
    if (onClearPrefill) onClearPrefill();
  };

  return (
    <div className="container section animate-fade-in">
      <div className="section-header">
        <span className="section-subtitle">Bespoke Diamond Laboratory</span>
        <h1 className="display-title section-title">Bespoke Custom Inquiry</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
          Create a detailed customization request. Our CAD modelers will respond with full estimates and 3D wireframe renders.
        </p>
      </div>

      {step < 4 && (
        <div className="wizard-container">
          {/* Progress Tracker */}
          <div className="wizard-steps">
            <div className={`wizard-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>1</div>
            <div className={`wizard-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>2</div>
            <div className={`wizard-step ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>3</div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '32px', letterSpacing: '1px' }}>
            <span>Design Specs</span>
            <span>Uploader & Notes</span>
            <span>Customer Profile</span>
          </div>

          <form onSubmit={handleSubmit}>
            {/* STEP 1: Design Specs */}
            {step === 1 && (
              <div className="animate-fade-in">
                <div className="form-group">
                  <label className="form-label">Inquiry Title *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Split-shank Oval Cushion Halo Engagement Ring"
                    className="form-control"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                <div className="responsive-grid-half" style={{ gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Jewelry Category</label>
                    <select 
                      className="form-control"
                      value={formData.jewelryCategory}
                      onChange={(e) => setFormData({...formData, jewelryCategory: e.target.value})}
                    >
                      <option value="Rings">Rings</option>
                      <option value="Earrings">Earrings</option>
                      <option value="Bracelets">Bracelets</option>
                      <option value="Necklaces">Necklaces</option>
                      <option value="Pendants">Pendants</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Diamond Ecosystem</label>
                    <select 
                      className="form-control"
                      value={formData.diamondType}
                      onChange={(e) => setFormData({...formData, diamondType: e.target.value})}
                    >
                      <option value="Lab-Grown">Lab-Grown Diamonds</option>
                      <option value="Natural">Natural Rare Diamonds</option>
                    </select>
                  </div>
                </div>

                <div className="responsive-grid-half" style={{ gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Metal Preference</label>
                    <select 
                      className="form-control"
                      value={formData.metalPreference}
                      onChange={(e) => setFormData({...formData, metalPreference: e.target.value})}
                    >
                      <option value="Platinum">Platinum (Premium)</option>
                      <option value="18K White Gold">18K White Gold</option>
                      <option value="18K Yellow Gold">18K Yellow Gold</option>
                      <option value="14K Rose Gold">14K Rose Gold</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Target Budget (Optional)</label>
                    <select 
                      className="form-control"
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({...formData, budgetRange: e.target.value})}
                    >
                      <option value="$1,000 - $2,000">$1,000 - $2,000</option>
                      <option value="$2,000 - $5,000">$2,000 - $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000+">$10,000+</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Description & Reference Files */}
            {step === 2 && (
              <div className="animate-fade-in">
                <div className="form-group">
                  <label className="form-label">Design Description & Requirements</label>
                  <textarea 
                    className="form-control" 
                    rows="5"
                    placeholder="Describe specific details (band width, prong settings, finger size, target carat details)..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Reference Image Uploads</label>
                  <div className="file-upload-zone" onClick={handleFileUpload}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📂</div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Click to simulate uploading reference images or drawings</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>PNG, JPG, PDF up to 10MB</p>
                  </div>

                  {formData.uploadedImages.length > 0 && (
                    <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                      {formData.uploadedImages.map((img, i) => (
                        <div key={i} style={{ border: '1px solid var(--border-color)', borderRadius: '4px', padding: '6px', fontSize: '0.8rem', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          🖼️ uploaded_design_{i+1}.jpg
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 3: Customer Details */}
            {step === 3 && (
              <div className="animate-fade-in">
                <div className="responsive-grid-half" style={{ gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Jane Doe"
                      className="form-control"
                      value={formData.customerName}
                      onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="jane.doe@email.com"
                      className="form-control"
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
                    />
                  </div>
                </div>

                <div className="responsive-grid-half" style={{ gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">Phone / Mobile Number</label>
                    <input 
                      type="text" 
                      placeholder="+1 (555) 019-2834"
                      className="form-control"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Company Name (B2B Partners)</label>
                    <input 
                      type="text" 
                      placeholder="Gold & Co. Wholesales"
                      className="form-control"
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Shipping Country</label>
                  <input 
                    type="text" 
                    placeholder="United States"
                    className="form-control"
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                  />
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="wizard-buttons">
              {step > 1 ? (
                <button type="button" className="btn btn-secondary" onClick={handlePrev}>Back</button>
              ) : (
                <div></div>
              )}

              {step < 3 ? (
                <button type="button" className="btn btn-primary" onClick={handleNext}>Next Step</button>
              ) : (
                <button type="submit" className="btn btn-primary">Submit Custom Inquiry</button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Success Page */}
      {step === 4 && (
        <div className="wizard-container text-center animate-fade-in" style={{ textAlign: 'center', padding: '60px 40px' }}>
          <div style={{ fontSize: '4rem', color: 'var(--status-approved)', marginBottom: '24px' }}>✓</div>
          <h2 className="display-title" style={{ fontSize: '1.6rem', marginBottom: '16px' }}>Bespoke Inquiry Initiated</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '550px', margin: '0 auto 32px' }}>
            Your custom jewelry request has been registered in our CAD workshop queue. A transaction log and confirmation invoice have been dispatched to your email address.
          </p>

          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '24px', maxWidth: '400px', margin: '0 auto 40px' }}>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>Inquiry Reference Key</div>
            <div style={{ fontSize: '1.6rem', fontWeight: '700', color: 'var(--accent-gold)', letterSpacing: '1px' }}>{inquiryNumber}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>Status: <span style={{ color: 'var(--status-pending)', fontWeight: '600' }}>Pending CAD Review</span></div>
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => setStep(1)}>Create Another Request</button>
            <button className="btn btn-secondary" onClick={() => setActivePage('admin')}>Access Admin Portal</button>
          </div>
        </div>
      )}
    </div>
  );
}
