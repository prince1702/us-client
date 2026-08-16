import React, { useContext, useState, useMemo } from 'react';
import { StoreContext } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

export default function Catalog({ setQuickViewProduct, setSelectedProduct, setActivePage }) {
  const { diamondType, products } = useContext(StoreContext);
  
  // Filter States (Basic & Advanced)
  const [selectedShapes, setSelectedShapes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [caratFrom, setCaratFrom] = useState('');
  const [caratTo, setCaratTo] = useState('');
  const [quickCarat, setQuickCarat] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [selectedClarities, setSelectedClarities] = useState([]);
  const [selectedLabs, setSelectedLabs] = useState([]);
  const [selectedCut, setSelectedCut] = useState([]);
  const [selectedPolish, setSelectedPolish] = useState([]);
  const [selectedSymmetry, setSelectedSymmetry] = useState([]);
  const [cutPreset, setCutPreset] = useState('');
  const [depthFrom, setDepthFrom] = useState('');
  const [depthTo, setDepthTo] = useState('');
  const [tableFrom, setTableFrom] = useState('');
  const [tableTo, setTableTo] = useState('');

  // Additional Advanced Filters (Matching User's 2nd Screenshot)
  const [lengthFrom, setLengthFrom] = useState('');
  const [lengthTo, setLengthTo] = useState('');
  const [widthFrom, setWidthFrom] = useState('');
  const [widthTo, setWidthTo] = useState('');
  const [mmDepthFrom, setMmDepthFrom] = useState('');
  const [mmDepthTo, setMmDepthTo] = useState('');

  const [selectedFluorescences, setSelectedFluorescences] = useState([]);
  const [selectedCulets, setSelectedCulets] = useState([]);
  const [selectedGirdles, setSelectedGirdles] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  // UI Controls
  const [isExpanded, setIsExpanded] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('newest');
  const [searchTrigger, setSearchTrigger] = useState(0);

  // Available Filter Options
  const shapeOptions = [
    { id: 'Round', label: 'ROUND', icon: 'M16 4 L28 12 L28 20 L16 28 L4 20 L4 12 Z' },
    { id: 'Oval', label: 'OVAL', icon: 'M16 4 C24 4, 28 10, 28 16 C28 22, 24 28, 16 28 C8 28, 4 22, 4 16 C4 10, 8 4, 16 4 Z' },
    { id: 'Princess', label: 'PRINCESS', icon: 'M5 5 L27 5 L27 27 L5 27 Z' },
    { id: 'Emerald', label: 'EMERALD', icon: 'M8 4 L24 4 L28 8 L28 24 L24 28 L8 28 L4 24 L4 8 Z' },
    { id: 'Pear', label: 'PEAR', icon: 'M16 3 C22 12, 27 18, 27 22 C27 26, 22 29, 16 29 C10 29, 5 26, 5 22 C5 18, 10 12, 16 3 Z' },
    { id: 'Radiant', label: 'RADIANT', icon: 'M8 4 L24 4 L28 8 L28 24 L24 28 L8 28 L4 24 L4 8 Z' },
    { id: 'Cushion', label: 'CUSHION', icon: 'M10 4 L22 4 C27 4, 28 5, 28 10 L28 22 C28 27, 27 28, 22 28 L10 28 C5 28, 4 27, 4 22 L4 10 C4 5, 5 4, 10 4 Z' }
  ];

  const colorOptions = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  const caratPillOptions = ['0.30', '0.40', '0.50', '0.60', '0.70', '0.80', '0.90', '1.00', '1.50', '2.00', '2.50', '3.00', '4.00', '5+'];
  const clarityOptions = ['IF', 'VS1', 'VS2', 'VVS1', 'VVS2', 'FL', 'SI1', 'SI2', 'I1', 'I2', 'I3'];
  const labOptions = ['IGI', 'GIA', 'GCAL', 'SGL', 'GSI', 'None'];
  const cutOptions = ['ID', 'EX', 'VG', 'G'];
  const polishOptions = ['EX', 'VG', 'G'];
  const symmetryOptions = ['EX', 'VG', 'G'];

  const fluorescenceOptions = ['SL', 'VSL', 'Very Strong', 'Strong', 'Medium', 'Faint', 'None'];
  const culetOptions = ['A', 'Long', 'None', 'Pointed', 'N', 'VS', 'S', 'M', 'SL', 'L', 'VL', 'XL', 'P'];
  const girdleOptions = ['XTN', 'TN', 'STN', 'VTN', 'M', 'STK', 'TK', 'VTK', 'XTK'];
  const locationOptions = ['Hong Kong', 'United States', 'USA', 'Canada', 'India'];

  // Multi-select toggle
  const toggleArrayItem = (setter, item) => {
    setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  // Quick Carat Pill Click Handler
  const handleQuickCaratClick = (val) => {
    if (quickCarat === val) {
      setQuickCarat('');
      setCaratFrom('');
      setCaratTo('');
    } else {
      setQuickCarat(val);
      if (val === '5+') {
        setCaratFrom('5.0');
        setCaratTo('');
      } else {
        const num = parseFloat(val);
        setCaratFrom((num - 0.05).toFixed(2));
        setCaratTo((num + 0.05).toFixed(2));
      }
    }
  };

  // Reset All Filters
  const handleResetFilters = () => {
    setSelectedShapes([]);
    setSelectedColors([]);
    setCaratFrom('');
    setCaratTo('');
    setQuickCarat('');
    setPriceFrom('');
    setPriceTo('');
    setSelectedClarities([]);
    setSelectedLabs([]);
    setSelectedCut([]);
    setSelectedPolish([]);
    setSelectedSymmetry([]);
    setCutPreset('');
    setDepthFrom('');
    setDepthTo('');
    setTableFrom('');
    setTableTo('');
    setLengthFrom('');
    setLengthTo('');
    setWidthFrom('');
    setWidthTo('');
    setMmDepthFrom('');
    setMmDepthTo('');
    setSelectedFluorescences([]);
    setSelectedCulets([]);
    setSelectedGirdles([]);
    setSelectedLocations([]);
    setSearchTrigger(prev => prev + 1);
  };

  // Apply / Search Click
  const handleSearchClick = () => {
    setSearchTrigger(prev => prev + 1);
  };

  // Filtering Calculation
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => p.category !== 'Certified Diamonds' && p.category !== 'Melee Diamonds' && p.category !== 'Layouts')
      .filter(p => p.diamondType === diamondType)
      .filter(p => {
        const shape = p.details?.shape || 'Round';
        const color = p.details?.color || p.specifications?.averageColor || 'F';
        const clarity = p.details?.clarity || p.specifications?.averageClarity || 'VS1';
        const lab = p.details?.lab || 'IGI';
        const cut = p.details?.cut || 'Excellent';
        const polish = p.details?.polish || 'Excellent';
        const symmetry = p.details?.symmetry || 'Excellent';
        const carat = p.details?.carat || parseFloat(p.specifications?.totalCarat) || 1.5;
        const depth = p.details?.depth || 62.0;
        const table = p.details?.table || 57.0;

        const length = p.details?.length || 8.0;
        const width = p.details?.width || 6.5;
        const mmDepth = p.details?.mmDepth || 4.0;
        const fluorescence = p.details?.fluorescence || 'None';
        const culet = p.details?.culet || 'None';
        const girdle = p.details?.girdle || 'M';
        const location = p.details?.location || 'United States';

        // 1. Shapes
        if (selectedShapes.length > 0 && !selectedShapes.includes(shape)) return false;

        // 2. Color
        if (selectedColors.length > 0 && !selectedColors.includes(color)) return false;

        // 3. Carat
        if (caratFrom && carat < parseFloat(caratFrom)) return false;
        if (caratTo && carat > parseFloat(caratTo)) return false;

        // 4. Price
        if (priceFrom && p.price < parseFloat(priceFrom)) return false;
        if (priceTo && p.price > parseFloat(priceTo)) return false;

        // 5. Clarity
        if (selectedClarities.length > 0 && !selectedClarities.includes(clarity)) return false;

        // 6. Lab
        if (selectedLabs.length > 0 && !selectedLabs.includes(lab)) return false;

        // 7. Cut Presets or Individual Cut/Polish/Symmetry
        if (cutPreset === '3EX') {
          if (cut !== 'Excellent' || polish !== 'Excellent' || symmetry !== 'Excellent') return false;
        } else if (cutPreset === 'ID CUT') {
          if (cut !== 'Ideal') return false;
        } else if (cutPreset === '3VG+') {
          if (!['Ideal', 'Excellent', 'Very Good'].includes(cut)) return false;
        } else {
          if (selectedCut.length > 0 && !selectedCut.some(c => cut.toUpperCase().includes(c))) return false;
          if (selectedPolish.length > 0 && !selectedPolish.some(pol => polish.toUpperCase().includes(pol))) return false;
          if (selectedSymmetry.length > 0 && !selectedSymmetry.some(sym => symmetry.toUpperCase().includes(sym))) return false;
        }

        // 8. Depth & Table (%)
        if (depthFrom && depth < parseFloat(depthFrom)) return false;
        if (depthTo && depth > parseFloat(depthTo)) return false;
        if (tableFrom && table < parseFloat(tableFrom)) return false;
        if (tableTo && table > parseFloat(tableTo)) return false;

        // 9. Measurements (Length, Width, MM Depth)
        if (lengthFrom && length < parseFloat(lengthFrom)) return false;
        if (lengthTo && length > parseFloat(lengthTo)) return false;
        if (widthFrom && width < parseFloat(widthFrom)) return false;
        if (widthTo && width > parseFloat(widthTo)) return false;
        if (mmDepthFrom && mmDepth < parseFloat(mmDepthFrom)) return false;
        if (mmDepthTo && mmDepth > parseFloat(mmDepthTo)) return false;

        // 10. Fluorescence
        if (selectedFluorescences.length > 0 && !selectedFluorescences.includes(fluorescence)) return false;

        // 11. Culet
        if (selectedCulets.length > 0 && !selectedCulets.includes(culet)) return false;

        // 12. Girdle
        if (selectedGirdles.length > 0 && !selectedGirdles.includes(girdle)) return false;

        // 13. Location
        if (selectedLocations.length > 0 && !selectedLocations.some(loc => location.toLowerCase().includes(loc.toLowerCase()))) return false;

        return true;
      });
  }, [products, diamondType, searchTrigger, selectedShapes, selectedColors, caratFrom, caratTo, priceFrom, priceTo, selectedClarities, selectedLabs, cutPreset, selectedCut, selectedPolish, selectedSymmetry, depthFrom, depthTo, tableFrom, tableTo, lengthFrom, lengthTo, widthFrom, widthTo, mmDepthFrom, mmDepthTo, selectedFluorescences, selectedCulets, selectedGirdles, selectedLocations]);

  // Sort Filtered Products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });
  }, [filteredProducts, sortBy]);

  return (
    <div className="container section animate-fade-in">
      <div className="section-header">
        <span className="section-subtitle">Precision Diamond & Fine Jewelry Finder</span>
        <h1 className="display-title section-title">{diamondType} Jewelry Catalog</h1>
      </div>

      {/* ═══════════════════════════════════════════════════════
         PRECISION DIAMOND FILTER DASHBOARD (COMPLETE WITH USER'S 2ND SCREENSHOT)
         ═══════════════════════════════════════════════════════ */}
      <div className="jewelry-filter-dashboard">
        
        {/* SHAPES SECTION */}
        <div className="filter-group-header">SHAPES</div>
        <div className="shapes-selector-grid">
          {shapeOptions.map(shape => {
            const isActive = selectedShapes.includes(shape.id);
            return (
              <button
                key={shape.id}
                type="button"
                className={`shape-item-btn ${isActive ? 'active' : ''}`}
                onClick={() => toggleArrayItem(setSelectedShapes, shape.id)}
              >
                <svg className="shape-icon-svg" viewBox="0 0 32 32">
                  <path d={shape.icon} strokeLinejoin="round" strokeLinecap="round" />
                </svg>
                <span className="shape-item-label">{shape.label}</span>
              </button>
            );
          })}
        </div>

        {/* EXPANDABLE FILTER BODY */}
        {isExpanded && (
          <div className="animate-fade-in">
            
            {/* COLOR SECTION */}
            <div className="filter-row-section">
              <label className="filter-row-label">Color</label>
              <div className="segmented-button-bar">
                {colorOptions.map(col => (
                  <button
                    key={col}
                    type="button"
                    className={`segment-btn ${selectedColors.includes(col) ? 'active' : ''}`}
                    onClick={() => toggleArrayItem(setSelectedColors, col)}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>

            {/* CARAT SECTION */}
            <div className="filter-row-section">
              <label className="filter-row-label">CARAT</label>
              <div className="range-inputs-container">
                <div className="from-to-box">
                  <input
                    type="number"
                    step="0.01"
                    placeholder="From"
                    className="from-to-input"
                    value={caratFrom}
                    onChange={(e) => { setCaratFrom(e.target.value); setQuickCarat(''); }}
                  />
                  <input
                    type="number"
                    step="0.01"
                    placeholder="To"
                    className="from-to-input"
                    value={caratTo}
                    onChange={(e) => { setCaratTo(e.target.value); setQuickCarat(''); }}
                  />
                </div>
                <div className="quick-pills-bar">
                  {caratPillOptions.map(pill => (
                    <button
                      key={pill}
                      type="button"
                      className={`quick-pill-btn ${quickCarat === pill ? 'active' : ''}`}
                      onClick={() => handleQuickCaratClick(pill)}
                    >
                      {pill}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* PRICE ($) SECTION */}
            <div className="filter-row-section">
              <label className="filter-row-label">PRICE($)</label>
              <div className="from-to-box" style={{ width: '320px' }}>
                <input
                  type="number"
                  placeholder="From"
                  className="from-to-input"
                  value={priceFrom}
                  onChange={(e) => setPriceFrom(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="To"
                  className="from-to-input"
                  value={priceTo}
                  onChange={(e) => setPriceTo(e.target.value)}
                />
              </div>
            </div>

            {/* CLARITY & LAB ROW */}
            <div className="filter-grid-2col filter-row-section">
              <div>
                <label className="filter-row-label">CLARITY</label>
                <div className="segmented-button-bar">
                  {clarityOptions.map(clr => (
                    <button
                      key={clr}
                      type="button"
                      className={`segment-btn ${selectedClarities.includes(clr) ? 'active' : ''}`}
                      onClick={() => toggleArrayItem(setSelectedClarities, clr)}
                    >
                      {clr}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="filter-row-label">LAB</label>
                <div className="segmented-button-bar">
                  {labOptions.map(lab => (
                    <button
                      key={lab}
                      type="button"
                      className={`segment-btn ${selectedLabs.includes(lab) ? 'active' : ''}`}
                      onClick={() => toggleArrayItem(setSelectedLabs, lab)}
                    >
                      {lab}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CUT / POLISH / SYMMETRY & PRESETS */}
            <div className="filter-row-section">
              <label className="filter-row-label" style={{ textAlign: 'center', marginBottom: '12px' }}>CUT / POL / SYM</label>
              <div className="filter-grid-2col" style={{ alignItems: 'flex-start' }}>
                
                {/* Left: Cut, Polish, Symmetry Bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#718096', fontWeight: 700, marginBottom: '4px', display: 'block' }}>CUT</span>
                    <div className="segmented-button-bar">
                      {cutOptions.map(c => (
                        <button
                          key={c}
                          type="button"
                          className={`segment-btn ${selectedCut.includes(c) ? 'active' : ''}`}
                          onClick={() => { setCutPreset(''); toggleArrayItem(setSelectedCut, c); }}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#718096', fontWeight: 700, marginBottom: '4px', display: 'block' }}>POLISH</span>
                    <div className="segmented-button-bar">
                      {polishOptions.map(p => (
                        <button
                          key={p}
                          type="button"
                          className={`segment-btn ${selectedPolish.includes(p) ? 'active' : ''}`}
                          onClick={() => { setCutPreset(''); toggleArrayItem(setSelectedPolish, p); }}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#718096', fontWeight: 700, marginBottom: '4px', display: 'block' }}>SYMMETRY</span>
                    <div className="segmented-button-bar">
                      {symmetryOptions.map(s => (
                        <button
                          key={s}
                          type="button"
                          className={`segment-btn ${selectedSymmetry.includes(s) ? 'active' : ''}`}
                          onClick={() => { setCutPreset(''); toggleArrayItem(setSelectedSymmetry, s); }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Presets Radio Options */}
                <div className="radio-presets-row">
                  <label className="radio-preset-label">
                    <input
                      type="radio"
                      name="cutPreset"
                      checked={cutPreset === 'ID CUT'}
                      onChange={() => { setCutPreset('ID CUT'); setSelectedCut([]); setSelectedPolish([]); setSelectedSymmetry([]); }}
                    />
                    ID CUT
                  </label>
                  <label className="radio-preset-label">
                    <input
                      type="radio"
                      name="cutPreset"
                      checked={cutPreset === '3EX'}
                      onChange={() => { setCutPreset('3EX'); setSelectedCut([]); setSelectedPolish([]); setSelectedSymmetry([]); }}
                    />
                    3EX
                  </label>
                  <label className="radio-preset-label">
                    <input
                      type="radio"
                      name="cutPreset"
                      checked={cutPreset === '3VG+'}
                      onChange={() => { setCutPreset('3VG+'); setSelectedCut([]); setSelectedPolish([]); setSelectedSymmetry([]); }}
                    />
                    3VG+
                  </label>
                  {cutPreset && (
                    <button
                      type="button"
                      onClick={() => setCutPreset('')}
                      style={{ fontSize: '0.65rem', color: '#e53e3e', cursor: 'pointer', background: 'none', border: 'none' }}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* DEPTH (%) & TABLE (%) */}
            <div className="filter-grid-2col filter-row-section">
              <div>
                <label className="filter-row-label">DEPTH(%)</label>
                <div className="from-to-box" style={{ width: '100%' }}>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="From"
                    className="from-to-input"
                    value={depthFrom}
                    onChange={(e) => setDepthFrom(e.target.value)}
                  />
                  <input
                    type="number"
                    step="0.1"
                    placeholder="To"
                    className="from-to-input"
                    value={depthTo}
                    onChange={(e) => setDepthTo(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="filter-row-label">TABLE(%)</label>
                <div className="from-to-box" style={{ width: '100%' }}>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="From"
                    className="from-to-input"
                    value={tableFrom}
                    onChange={(e) => setTableFrom(e.target.value)}
                  />
                  <input
                    type="number"
                    step="0.1"
                    placeholder="To"
                    className="from-to-input"
                    value={tableTo}
                    onChange={(e) => setTableTo(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════
               ADDITIONAL ADVANCED FILTERS (FROM 2ND SCREENSHOT)
               ═══════════════════════════════════════════════════════ */}
            
            {/* MEASUREMENT (LENGTH, WIDTH, DEPTH) */}
            <div className="filter-row-section">
              <label className="filter-row-label" style={{ textAlign: 'center', marginBottom: '12px' }}>MEASUREMENT</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#718096', fontWeight: 700, marginBottom: '4px', display: 'block' }}>LENGTH</span>
                  <div className="from-to-box" style={{ width: '100%' }}>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="From"
                      className="from-to-input"
                      value={lengthFrom}
                      onChange={(e) => setLengthFrom(e.target.value)}
                    />
                    <input
                      type="number"
                      step="0.1"
                      placeholder="To"
                      className="from-to-input"
                      value={lengthTo}
                      onChange={(e) => setLengthTo(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#718096', fontWeight: 700, marginBottom: '4px', display: 'block' }}>WIDTH</span>
                  <div className="from-to-box" style={{ width: '100%' }}>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="From"
                      className="from-to-input"
                      value={widthFrom}
                      onChange={(e) => setWidthFrom(e.target.value)}
                    />
                    <input
                      type="number"
                      step="0.1"
                      placeholder="To"
                      className="from-to-input"
                      value={widthTo}
                      onChange={(e) => setWidthTo(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#718096', fontWeight: 700, marginBottom: '4px', display: 'block' }}>DEPTH</span>
                  <div className="from-to-box" style={{ width: '100%' }}>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="From"
                      className="from-to-input"
                      value={mmDepthFrom}
                      onChange={(e) => setMmDepthFrom(e.target.value)}
                    />
                    <input
                      type="number"
                      step="0.1"
                      placeholder="To"
                      className="from-to-input"
                      value={mmDepthTo}
                      onChange={(e) => setMmDepthTo(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* FLUORESCENCE & CULET */}
            <div className="filter-grid-2col filter-row-section">
              <div>
                <label className="filter-row-label">FLUORESCENCE</label>
                <div className="segmented-button-bar">
                  {fluorescenceOptions.map(fl => (
                    <button
                      key={fl}
                      type="button"
                      className={`segment-btn ${selectedFluorescences.includes(fl) ? 'active' : ''}`}
                      onClick={() => toggleArrayItem(setSelectedFluorescences, fl)}
                    >
                      {fl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="filter-row-label">CULET</label>
                <div className="segmented-button-bar">
                  {culetOptions.map(cul => (
                    <button
                      key={cul}
                      type="button"
                      className={`segment-btn ${selectedCulets.includes(cul) ? 'active' : ''}`}
                      onClick={() => toggleArrayItem(setSelectedCulets, cul)}
                    >
                      {cul}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* GIRDLE */}
            <div className="filter-row-section">
              <label className="filter-row-label">GIRDLE</label>
              <div className="segmented-button-bar">
                {girdleOptions.map(g => (
                  <button
                    key={g}
                    type="button"
                    className={`segment-btn ${selectedGirdles.includes(g) ? 'active' : ''}`}
                    onClick={() => toggleArrayItem(setSelectedGirdles, g)}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* LOCATION */}
            <div className="filter-row-section">
              <label className="filter-row-label">LOCATION</label>
              <div className="segmented-button-bar">
                {locationOptions.map(loc => (
                  <button
                    key={loc}
                    type="button"
                    className={`segment-btn ${selectedLocations.includes(loc) ? 'active' : ''}`}
                    onClick={() => toggleArrayItem(setSelectedLocations, loc)}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* COLLAPSE / EXPAND TOGGLE CIRCLE BUTTON AT BOTTOM CENTER */}
        <div className="collapse-toggle-wrapper">
          <button
            type="button"
            className="collapse-toggle-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Collapse Filter Dashboard' : 'Expand Filter Dashboard'}
          >
            {isExpanded ? '▲' : '▼'}
          </button>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="filter-action-bottom-bar">
          <div className="view-toggle-btns">
            <button
              type="button"
              className={`view-icon-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              ⊞
            </button>
            <button
              type="button"
              className={`view-icon-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              ☰
            </button>
          </div>

          <div style={{ fontSize: '0.85rem', color: '#4a5568' }}>
            Showing <strong style={{ color: '#d53f8c' }}>{sortedProducts.length}</strong> matching items
          </div>

          <div className="filter-buttons-right">
            <button
              type="button"
              className="btn-reset-selection"
              onClick={handleResetFilters}
            >
              Reset Selection
            </button>
            <button
              type="button"
              className="btn-search-apply active"
              onClick={handleSearchClick}
            >
              Search
            </button>
          </div>
        </div>

      </div>

      {/* ═══════════════════════════════════════════════════════
         PRODUCT RESULTS LIST / GRID DISPLAY
         ═══════════════════════════════════════════════════════ */}
      <div>
        {sortedProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', border: '1px dashed #cbd5e0', borderRadius: '12px', background: '#ffffff' }}>
            <p style={{ color: '#4a5568', fontSize: '1rem', marginBottom: '16px' }}>No jewelry products match all the specified filter criteria.</p>
            <button className="btn btn-secondary" onClick={handleResetFilters}>Reset All Filters</button>
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
                <div style={{ background: '#f7fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '120px', borderRadius: '6px' }}>
                  <img src={p.image} alt={p.name} style={{ maxHeight: '100px', maxWidth: '100%', objectFit: 'contain' }} />
                </div>
                <div>
                  <span className="badge badge-approved" style={{ marginBottom: '8px', fontSize: '0.65rem' }}>{p.diamondType}</span>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#1a202c' }}>{p.name}</h3>
                  <p style={{ color: '#4a5568', fontSize: '0.85rem' }}>{p.description}</p>
                  <p style={{ color: '#718096', fontSize: '0.8rem', marginTop: '6px' }}>
                    Shape: {p.details?.shape || 'Round'} • Carat: {p.details?.carat || 1.5}ct • Color: {p.details?.color || 'F'} • Clarity: {p.details?.clarity || 'VS1'} • Lab: {p.details?.lab || 'IGI'} • Location: {p.details?.location || 'USA'}
                  </p>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ fontSize: '1.3rem', fontWeight: '700', color: '#b5945b' }}>${p.price.toLocaleString()}</div>
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
  );
}
