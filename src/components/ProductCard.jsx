import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

export default function ProductCard({ product, onQuickView, onClick }) {
  const { wishlist, toggleWishlist, addToCart } = useContext(StoreContext);
  
  const isWishlisted = wishlist.includes(product.id);

  // Formatting helpers
  const getSubDetails = () => {
    if (product.category === 'Certified Diamonds') {
      return `${product.details.carat}ct ${product.details.shape} • ${product.details.color} • ${product.details.clarity} • ${product.details.lab}`;
    }
    if (product.category === 'Melee Diamonds') {
      return `${product.details.shape} Melee • ${product.details.pointerSize} (${product.details.mmSize})`;
    }
    if (product.category === 'Layouts') {
      return `${product.details.shape} Layout • ${product.details.stoneCount} stones • ${product.details.carat}ctw`;
    }
    return product.specifications?.metal || 'Fine Custom Setting';
  };

  const getPriceLabel = () => {
    if (product.category === 'Melee Diamonds') {
      return `$${product.price.toLocaleString()} / carat`;
    }
    return `$${product.price.toLocaleString()}`;
  };

  return (
    <div className="card animate-fade-in">
      <div className="card-img-container">
        <span className="card-tag">{product.diamondType}</span>
        <img 
          src={product.image} 
          alt={product.name} 
          className="card-img" 
          onClick={onClick}
          style={{ cursor: 'pointer' }}
        />
        <div className="card-actions">
          <button 
            className="card-action-btn"
            style={{ color: isWishlisted ? 'var(--accent-gold)' : 'var(--text-primary)' }}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            title="Add to Wishlist"
          >
            {isWishlisted ? '♥' : '♡'}
          </button>
          <button 
            className="card-action-btn"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            title="Quick View"
          >
            👁
          </button>
          {product.category !== 'Melee Diamonds' && product.category !== 'Certified Diamonds' && (
            <button 
              className="card-action-btn"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, 1);
                alert(`${product.name} added to cart!`);
              }}
              title="Add to Cart"
            >
              ＋
            </button>
          )}
        </div>
      </div>

      <div className="card-info">
        <div>
          <div className="card-category">{product.category}</div>
          <h3 
            className="card-title" 
            onClick={onClick}
            style={{ cursor: 'pointer', fontSize: '1rem', lineHeight: '1.4' }}
          >
            {product.name}
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            {getSubDetails()}
          </p>
        </div>
        <div className="card-price">{getPriceLabel()}</div>
      </div>
    </div>
  );
}
