import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

export default function Catalog({ setQuickViewProduct, setSelectedProduct, setActivePage }) {
  const { diamondType, products } = useContext(StoreContext);
  
  // States
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMetals, setSelectedMetals] = useState([]);
  const [maxPrice, setMaxPrice] = useState(30000);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const categories = ['Rings', 'Earrings', 'Bracelets', 'Necklaces'];
  const metals = ['18K White Gold', '18K Yellow Gold', 'Platinum'];

  // Handle category toggle
  const toggleCategory = (cat) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  // Handle metal toggle
  const toggleMetal = (metal) => {
    setSelectedMetals(prev => 
      prev.includes(metal) ? prev.filter(m => m !== metal) : [...prev, metal]
    );
  };

  // Filter products
  const filteredProducts = products
    .filter(p => p.category !== 'Certified Diamonds' && p.category !== 'Melee Diamonds' && p.category !== 'Layouts')
    .filter(p => p.diamondType === diamondType)
    .filter(p => selectedCategories.length === 0 || selectedCategories.includes(p.category))
    .filter(p => selectedMetals.length === 0 || selectedMetals.includes(p.specifications?.metal))
    .filter(p => p.price <= maxPrice);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0; // Default newest / unsorted for mock
  });

  return (
    <div className="container section animate-fade-in">
      <div className="section-header">
        <span className="section-subtitle">Exquisite Creations</span>
        <h1 className="display-title section-title">{diamondType} Jewelry Catalog</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
          Displaying premium hand-set jewelry featuring curated {diamondType.toLowerCase()} diamond centers.
        </p>
      </div>

      {/* Catalog Grid View Options */}
      <div className="catalog-options-bar">
        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Showing <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{sortedProducts.length}</span> Results
        </div>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div>
            <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginRight: '8px' }}>Sort By:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)} 
              className="form-control" 
              style={{ background: 'var(--bg-primary)', padding: '6px 12px', fontSize: '0.85rem', width: 'auto', display: 'inline-block' }}
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div style={{ display: 'flex', border: '1px solid var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
            <button 
              style={{ padding: '6px 12px', background: viewMode === 'grid' ? 'var(--accent-gold)' : 'none', color: viewMode === 'grid' ? 'var(--bg-primary)' : 'var(--text-primary)', cursor: 'pointer' }}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
            <button 
              style={{ padding: '6px 12px', background: viewMode === 'list' ? 'var(--accent-gold)' : 'none', color: viewMode === 'list' ? 'var(--bg-primary)' : 'var(--text-primary)', cursor: 'pointer' }}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
          </div>
        </div>
      </div>

      <div className="catalog-layout">
        {/* Sidebar Filters */}
        <aside className="filter-sidebar">
          {/* Categories */}
          <div className="filter-section">
            <h4 className="filter-title">Category</h4>
            <div className="checkbox-group">
              {categories.map(cat => (
                <label key={cat} className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Metal Options */}
          <div className="filter-section">
            <h4 className="filter-title">Metal Alloy</h4>
            <div className="checkbox-group">
              {metals.map(metal => (
                <label key={metal} className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={selectedMetals.includes(metal)}
                    onChange={() => toggleMetal(metal)}
                  />
                  {metal}
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="filter-section">
            <h4 className="filter-title">Max Price</h4>
            <input 
              type="range" 
              min="1000" 
              max="30000" 
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-gold)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
              <span>$1,000</span>
              <span style={{ color: 'var(--accent-gold)', fontWeight: '600' }}>${maxPrice.toLocaleString()}</span>
            </div>
          </div>
        </aside>

        {/* Product Grid / List */}
        <div>
          {sortedProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', border: '1px dashed var(--border-color)', borderRadius: '8px' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>No jewelry products match the active filters.</p>
              <button className="btn btn-secondary" onClick={() => { setSelectedCategories([]); setSelectedMetals([]); setMaxPrice(30000); }}>Clear Filters</button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="products-grid">
              {sortedProducts.map((p) => (
                <ProductCard 
                  key={p.id} 
                  product={p} 
                  onQuickView={setQuickViewProduct} 
                  onClick={() => { setSelectedProduct(p); setActivePage('product-detail'); }}
                />
              ))}
            </div>
          ) : (
            /* List View Layout */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {sortedProducts.map((p) => (
                <div key={p.id} className="catalog-list-row">
                  <div style={{ background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '120px', borderRadius: '4px' }}>
                    <img src={p.image} alt={p.name} style={{ maxHeight: '100px', maxWidth: '100%', objectFit: 'contain' }} />
                  </div>
                  <div>
                    <span className="badge badge-approved" style={{ marginBottom: '8px', fontSize: '0.65rem' }}>{p.diamondType}</span>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{p.name}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{p.description}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '6px' }}>
                      Alloy: {p.specifications?.metal} • Carat Weight: {p.specifications?.totalCarat}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--accent-gold)' }}>${p.price.toLocaleString()}</div>
                    <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }} onClick={() => { setSelectedProduct(p); setActivePage('product-detail'); }}>
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
