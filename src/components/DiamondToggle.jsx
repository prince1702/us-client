import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

export default function DiamondToggle() {
  const { diamondType, setDiamondType } = useContext(StoreContext);

  return (
    <div className="eco-selector-wrapper">
      <div className="container">
        <div className="eco-selector">
          <button 
            className={`eco-btn ${diamondType === 'Lab-Grown' ? 'active' : ''}`}
            onClick={() => setDiamondType('Lab-Grown')}
          >
            ✧ Lab-Grown Diamonds
          </button>
          <button 
            className={`eco-btn ${diamondType === 'Natural' ? 'active' : ''}`}
            onClick={() => setDiamondType('Natural')}
          >
            ✦ Natural Diamonds
          </button>
        </div>
      </div>
    </div>
  );
}
