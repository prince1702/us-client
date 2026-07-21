import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';

export default function AdminDashboard() {
  const { inquiries, updateInquiryStatus, products, attachedExcel, attachExcel, detachExcel, logoutAdmin, changeAdminPassword } = useContext(StoreContext);

  // States
  const [activeTab, setActiveTab] = useState('inquiries');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [statusVal, setStatusVal] = useState('');

  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      alert('Confirm password does not match new password.');
      return;
    }
    const success = changeAdminPassword(oldPass, newPass);
    if (success) {
      alert('Credentials updated successfully. Future logins must use the new passcode signature.');
      setOldPass('');
      setNewPass('');
      setConfirmPass('');
      setActiveTab('inquiries');
    } else {
      alert('Verification rejected. Current password signature is incorrect.');
    }
  };

  // Calculate statistics
  const pendingInquiriesCount = inquiries.filter(i => i.status === 'Pending Review').length;
  const totalRevenueMock = 142800.00;
  const activeOrdersCountMock = 14;

  const handleInquirySelect = (inq) => {
    setSelectedInquiry(inq);
    setStatusVal(inq.status);
  };

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    if (!selectedInquiry) return;
    updateInquiryStatus(selectedInquiry.id, statusVal);
    setSelectedInquiry(prev => ({ ...prev, status: statusVal }));
    alert(`Inquiry ${selectedInquiry.inquiryNumber} status updated to: ${statusVal}`);
  };

  const handleExcelUpload = (e) => {
    e.preventDefault();
    const mockFile = { name: 'customer_inquiries_ledger.xlsx', size: '36 KB' };
    attachExcel(mockFile.name, mockFile.size);
    alert(`Connected: "${mockFile.name}". Inquiries will now log automatically into this sheet structure!`);
  };

  const exportToExcel = () => {
    const headers = [
      'Inquiry ID', 'Customer Name', 'Email', 'Phone', 'Company', 'Country', 
      'Title', 'Category', 'Diamond Type', 'Metal', 'Quantity', 'Budget', 'Delivery Date', 'Status', 'Submitted At'
    ];
    const rows = inquiries.map(inq => [
      inq.inquiryNumber,
      inq.customerName,
      inq.customerEmail,
      inq.customerPhone || '',
      inq.companyName || '',
      inq.country || '',
      inq.title,
      inq.jewelryCategory,
      inq.diamondType,
      inq.metalPreference,
      inq.quantity,
      inq.budgetRange || '',
      inq.deliveryDate || '',
      inq.status,
      inq.createdAt
    ]);

    let csvContent = "\uFEFF"; // UTF-8 BOM for Excel
    csvContent += [headers.join(','), ...rows.map(r => r.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);

    const filename = attachedExcel 
      ? `${attachedExcel.name.replace(/\.[^/.]+$/, "")}_updated.csv`
      : `Inquiries_Vault_${new Date().toISOString().slice(0,10)}.csv`;

    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert(attachedExcel 
      ? `Merged and synced inquiries successfully into connected Excel template: ${filename}`
      : `Inquiries database successfully exported as Excel sheet: ${filename}`
    );
  };

  return (
    <div className="admin-layout animate-fade-in">
      {/* Sidebar navigation */}
      <aside className="admin-sidebar">
        <div style={{ padding: '0 24px 20px', borderBottom: '1px solid var(--border-color)', marginBottom: '20px' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px' }}>Portal Role</span>
          <h4 style={{ color: 'var(--accent-gold)', fontSize: '0.95rem' }}>Super Administrator</h4>
        </div>
        <ul className="admin-menu">
          <li className={`admin-menu-item ${activeTab === 'inquiries' ? 'active' : ''}`} onClick={() => { setActiveTab('inquiries'); setSelectedInquiry(null); }}>
            📨 Custom Inquiries ({pendingInquiriesCount})
          </li>
          <li className={`admin-menu-item ${activeTab === 'products' ? 'active' : ''}`} onClick={() => { setActiveTab('products'); setSelectedInquiry(null); }}>
            💎 Vault Inventory
          </li>
          <li className={`admin-menu-item ${activeTab === 'passcode' ? 'active' : ''}`} onClick={() => { setActiveTab('passcode'); setSelectedInquiry(null); }}>
            🔑 Change Passcode
          </li>
          <li 
            className="admin-menu-item" 
            style={{ marginTop: '40px', color: 'var(--status-cancelled)', borderLeft: 'none' }}
            onClick={() => {
              logoutAdmin();
              alert('Session terminated. Admin Portal locked.');
            }}
          >
            🔒 Terminate Session
          </li>
        </ul>
      </aside>

      {/* Main dashboard content panel */}
      <main className="admin-content">
        {/* Top KPIs */}
        <div className="admin-stats-grid">
          <div className="stat-box">
            <div className="stat-label">Total Revenue (USD)</div>
            <div className="stat-value">${totalRevenueMock.toLocaleString()}</div>
            <div className="stat-change">▲ +18.4% this month</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Active Orders</div>
            <div className="stat-value">{activeOrdersCountMock}</div>
            <div className="stat-change" style={{ color: 'var(--status-pending)' }}>● 3 Awaiting Wire</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Pending Inquiries</div>
            <div className="stat-value">{pendingInquiriesCount}</div>
            <div className="stat-change" style={{ color: 'var(--status-pending)' }}>⚡ Action required</div>
          </div>
          <div className="stat-box">
            <div className="stat-label">Vault Catalog Items</div>
            <div className="stat-value">{products.length}</div>
            <div className="stat-change" style={{ color: 'var(--text-muted)' }}>100% cloud synced</div>
          </div>
        </div>

        {/* Tab 1: Custom Inquiries Manager */}
        {activeTab === 'inquiries' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 className="display-title" style={{ fontSize: '1.2rem', margin: 0 }}>Custom Jewelry Inquiry Manager</h2>
              
              <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8rem' }} onClick={exportToExcel}>
                📥 Export to Excel (.csv)
              </button>
            </div>

            {/* Excel Sync Connection Panel */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '4px', letterSpacing: '1px' }}>Excel Sheet Sync Connection</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {attachedExcel 
                    ? `✓ Connected template file: ${attachedExcel.name} (${attachedExcel.size})`
                    : 'Attach your excel tracker sheet. New inquiries will auto-append to your sheet layout.'
                  }
                </p>
              </div>
              <div>
                {attachedExcel ? (
                  <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem', color: 'var(--status-cancelled)', borderColor: 'var(--status-cancelled)' }} onClick={detachExcel}>
                    Disconnect Sheet
                  </button>
                ) : (
                  <button className="btn btn-primary" style={{ padding: '6px 16px', fontSize: '0.75rem' }} onClick={handleExcelUpload}>
                    Attach Excel File
                  </button>
                )}
              </div>
            </div>
            
            <div className={`admin-grid ${!selectedInquiry ? 'single-col' : ''}`}>
              {/* List */}
              <div className="data-table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Inquiry ID</th>
                      <th>Customer</th>
                      <th>Product Spec</th>
                      <th>Diamond Class</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((inq) => (
                      <tr key={inq.id} style={{ background: selectedInquiry?.id === inq.id ? 'rgba(255,255,255,0.02)' : 'none' }}>
                        <td style={{ color: 'var(--accent-gold)', fontWeight: '600' }}>{inq.inquiryNumber}</td>
                        <td>
                          <div>{inq.customerName}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{inq.companyName || 'B2C Account'}</div>
                        </td>
                        <td>
                          <div>{inq.title}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{inq.jewelryCategory} • {inq.metalPreference}</div>
                        </td>
                        <td>{inq.diamondType}</td>
                        <td>
                          <span className={`badge ${inq.status === 'Pending Review' ? 'badge-pending' : inq.status === 'Quotation Sent' ? 'badge-process' : 'badge-approved'}`}>
                            {inq.status}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.75rem' }} onClick={() => handleInquirySelect(inq)}>
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Detailed reviewer sidebar */}
              {selectedInquiry && (
                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '24px', height: 'fit-content' }} className="animate-fade-in">
                  <h3 className="display-title" style={{ fontSize: '1rem', marginBottom: '16px', color: 'var(--accent-gold)' }}>
                    Reviewing {selectedInquiry.inquiryNumber}
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <div><strong>Customer Profile:</strong> {selectedInquiry.customerName} ({selectedInquiry.customerEmail})</div>
                    <div><strong>Contact Number:</strong> {selectedInquiry.customerPhone || 'Not provided'}</div>
                    <div><strong>Design Category:</strong> {selectedInquiry.jewelryCategory} ({selectedInquiry.metalPreference})</div>
                    <div><strong>Carat Class:</strong> {selectedInquiry.diamondType}</div>
                    <div><strong>Budget Target:</strong> {selectedInquiry.budgetRange}</div>
                    <div><strong>Notes / Description:</strong>
                      <p style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: '4px', marginTop: '6px', color: 'var(--text-primary)', fontStyle: 'italic' }}>
                        "{selectedInquiry.description}"
                      </p>
                    </div>

                    {selectedInquiry.images && selectedInquiry.images.length > 0 && (
                      <div>
                        <strong>Reference Attachments:</strong>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                          {selectedInquiry.images.map((img, i) => (
                            <img key={i} src={img} alt="Reference" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
                          ))}
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleUpdateStatus} style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px', marginTop: '10px' }}>
                      <div className="form-group">
                        <label className="form-label">Update Status</label>
                        <select className="form-control" value={statusVal} onChange={(e) => setStatusVal(e.target.value)}>
                          <option value="Pending Review">Pending Review</option>
                          <option value="Quotation Sent">Quotation Sent</option>
                          <option value="Approved">Approved</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>

                      <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px', fontSize: '0.8rem' }}>
                        Save Status Change
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Vault Inventory */}
        {activeTab === 'products' && (
          <div>
            <h2 className="display-title" style={{ fontSize: '1.2rem', marginBottom: '24px' }}>Vault Catalog Records</h2>
            <div className="data-table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Diamond Ecosystem</th>
                    <th>Price</th>
                    <th>Stock status</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>{p.sku}</td>
                      <td>{p.name}</td>
                      <td>{p.category}</td>
                      <td>
                        <span className={`badge ${p.diamondType === 'Natural' ? 'badge-pending' : 'badge-process'}`}>{p.diamondType}</span>
                      </td>
                      <td style={{ color: 'var(--accent-gold)', fontWeight: '600' }}>
                        {p.category === 'Melee Diamonds' ? `$${p.price.toLocaleString()} / ct` : `$${p.price.toLocaleString()}`}
                      </td>
                      <td>
                        <span className="badge badge-approved">In Stock</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Change Passcode */}
        {activeTab === 'passcode' && (
          <div style={{ maxWidth: '480px' }} className="animate-fade-in">
            <h2 className="display-title" style={{ fontSize: '1.2rem', marginBottom: '24px' }}>Credentials Customization</h2>
            
            <form onSubmit={handlePasswordChange} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>Current Password</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••" 
                  className="form-control"
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>New Password Signature</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••" 
                  className="form-control"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>Confirm New Password</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••" 
                  className="form-control"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
                Update Passcode Signature
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
