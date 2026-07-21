import React, { createContext, useState, useEffect } from 'react';

export const StoreContext = createContext();

// Mock high-quality image placeholders using elegant gradients
const mockImg = (text) => `https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80`;
const earringImg = () => `https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80`;
const braceletImg = () => `https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80`;
const pendantImg = () => `https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=600&q=80`;
const looseDiamondImg = () => `https://images.unsplash.com/photo-1588444839799-eb0c99e986fc?auto=format&fit=crop&w=600&q=80`;

export const StoreProvider = ({ children }) => {
  // Global States
  const [diamondType, setDiamondType] = useState('Lab-Grown'); // 'Lab-Grown' or 'Natural'
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [inquiries, setInquiries] = useState([
    {
      id: 'inq-1',
      inquiryNumber: 'INQ-2026-000001',
      customerName: 'Marcus Sterling',
      customerEmail: 'm.sterling@sterlingdesigns.com',
      customerPhone: '+1 (312) 555-0192',
      companyName: 'Sterling Fine Jewelers',
      country: 'United States',
      title: 'Custom Platinum Radiant Split-Shank',
      description: 'Customer requests a 2.5ct Radiant cut center stone with a split-shank setting studded with melee diamonds. Band size 6.5.',
      jewelryCategory: 'Rings',
      diamondType: 'Natural',
      metalPreference: 'Platinum',
      quantity: 1,
      budgetRange: '$12,000 - $15,000',
      deliveryDate: '2026-08-15',
      status: 'Pending Review',
      assignedStaff: 'Elena Rostova',
      createdAt: '2026-07-09T10:30:00Z',
      images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=300&q=80']
    },
    {
      id: 'inq-2',
      inquiryNumber: 'INQ-2026-000002',
      customerName: 'Sarah Jenkins',
      customerEmail: 'sarah.j@gmail.com',
      customerPhone: '+44 7700 900077',
      companyName: '',
      country: 'United Kingdom',
      title: 'Lab-Grown Emerald Cut Eternity Band',
      description: 'Looking to construct a full emerald cut eternity band in 18K Yellow Gold. Approximately 4.5 carats total weight.',
      jewelryCategory: 'Bracelets',
      diamondType: 'Lab-Grown',
      metalPreference: '18K Yellow Gold',
      quantity: 1,
      budgetRange: '$4,000 - $6,000',
      deliveryDate: '2026-09-01',
      status: 'Quotation Sent',
      assignedStaff: 'David Miller',
      createdAt: '2026-07-10T08:15:00Z',
      images: []
    }
  ]);
  const [attachedExcel, setAttachedExcel] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState(() => {
    return localStorage.getItem('auradiamond_admin_pass') || 'admin';
  });

  const loginAdmin = (username, password) => {
    const normalizedUser = username.trim().toUpperCase();
    const normalizedPass = password.trim();

    // Allow custom active password or 'admin' as universal fallback
    const isUsernameValid = normalizedUser === 'MELEE' || normalizedUser === 'ADMIN';
    const isPasswordValid = normalizedPass === adminPassword || normalizedPass === 'admin';

    if (isUsernameValid && isPasswordValid) {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
  };

  const changeAdminPassword = (oldPassword, newPassword) => {
    if (oldPassword === adminPassword) {
      setAdminPassword(newPassword);
      localStorage.setItem('auradiamond_admin_pass', newPassword);
      return true;
    }
    return false;
  };

  const attachExcel = (fileName, fileSize) => {
    setAttachedExcel({
      name: fileName,
      size: fileSize,
      attachedAt: new Date().toISOString()
    });
  };

  const detachExcel = () => {
    setAttachedExcel(null);
  };

  // Master product database
  const [products] = useState([
    // --- JEWELRY ---
    // Rings
    {
      id: 'ring-1',
      sku: 'RING-LGD-001',
      name: 'Aria Oval Halo Engagement Ring',
      category: 'Rings',
      diamondType: 'Lab-Grown',
      price: 2450.00,
      image: mockImg('Aria Ring'),
      description: 'A stunning oval-cut lab-grown diamond surrounded by a delicate micro-pavé halo setting.',
      specifications: { metal: '18K White Gold', averageColor: 'F', averageClarity: 'VS1', totalCarat: '1.50 ctw' }
    },
    {
      id: 'ring-2',
      sku: 'RING-NAT-002',
      name: 'The Crown Solitaire Ring',
      category: 'Rings',
      diamondType: 'Natural',
      price: 8900.00,
      image: mockImg('Crown Ring'),
      description: 'An exquisite natural diamond centered on an elegant, tapered four-prong setting of pure platinum.',
      specifications: { metal: 'Platinum', averageColor: 'D', averageClarity: 'VVS2', totalCarat: '1.20 ctw' }
    },
    // Earrings
    {
      id: 'earring-1',
      sku: 'EAR-LGD-001',
      name: 'Celestial Diamond Studs',
      category: 'Earrings',
      diamondType: 'Lab-Grown',
      price: 1800.00,
      image: earringImg(),
      description: 'Classic round brilliant studs crafted with lab-grown diamonds, offering maximum fire and scintillation.',
      specifications: { metal: '14K White Gold', averageColor: 'E', averageClarity: 'VS2', totalCarat: '2.00 ctw' }
    },
    {
      id: 'earring-2',
      sku: 'EAR-NAT-002',
      name: 'Royal Heritage Drop Earrings',
      category: 'Earrings',
      diamondType: 'Natural',
      price: 14500.00,
      image: earringImg(),
      description: 'Art-deco inspired natural diamond drop earrings with matching pear and marquise shaped diamonds.',
      specifications: { metal: 'Platinum', averageColor: 'F', averageClarity: 'VS1', totalCarat: '3.50 ctw' }
    },
    // Bracelets
    {
      id: 'bracelet-1',
      sku: 'BRAC-LGD-001',
      name: 'Eternity Tennis Bracelet',
      category: 'Bracelets',
      diamondType: 'Lab-Grown',
      price: 5200.00,
      image: braceletImg(),
      description: 'A classic line design featuring perfectly matched round lab-grown diamonds, set in 18K Yellow Gold.',
      specifications: { metal: '18K Yellow Gold', averageColor: 'F', averageClarity: 'VS1', totalCarat: '5.00 ctw' }
    },
    {
      id: 'bracelet-2',
      sku: 'BRAC-NAT-002',
      name: 'Duchess Marquise Cuff',
      category: 'Bracelets',
      diamondType: 'Natural',
      price: 28000.00,
      image: braceletImg(),
      description: 'An elite natural diamond statement cuff featuring interlocking marquise-cut stones of unparalleled brilliance.',
      specifications: { metal: 'Platinum', averageColor: 'D', averageClarity: 'VVS1', totalCarat: '10.50 ctw' }
    },
    // Necklaces
    {
      id: 'neck-1',
      sku: 'NECK-LGD-001',
      name: 'Cascade Cluster Necklace',
      category: 'Necklaces',
      diamondType: 'Lab-Grown',
      price: 3950.00,
      image: pendantImg(),
      description: 'A modern design cluster representing cascading dew drops of bright, lab-grown diamonds.',
      specifications: { metal: '18K White Gold', averageColor: 'F', averageClarity: 'VS1', totalCarat: '2.80 ctw' }
    },
    {
      id: 'neck-2',
      sku: 'NECK-NAT-002',
      name: 'Empress Solitaire Necklace',
      category: 'Necklaces',
      diamondType: 'Natural',
      price: 18500.00,
      image: pendantImg(),
      description: 'A timeless investment piece: a magnificent 2.0ct GIA certified natural round brilliant diamond on a platinum chain.',
      specifications: { metal: 'Platinum', averageColor: 'E', averageClarity: 'VVS2', totalCarat: '2.00 ctw' }
    },

    // --- CERTIFIED LOOSE DIAMONDS ---
    {
      id: 'cert-1',
      sku: 'DIA-LGD-001',
      name: '2.04ct Round Brilliant (Lab)',
      category: 'Certified Diamonds',
      diamondType: 'Lab-Grown',
      price: 2850.00,
      image: looseDiamondImg(),
      details: {
        shape: 'Round',
        carat: 2.04,
        color: 'E',
        clarity: 'VVS2',
        cut: 'Excellent',
        polish: 'Excellent',
        symmetry: 'Excellent',
        fluorescence: 'None',
        lab: 'IGI',
        certificateNumber: 'IGI-4829103',
        depth: 61.2,
        table: 57.0,
        ratio: 1.01,
        length: 8.12,
        width: 8.08
      }
    },
    {
      id: 'cert-2',
      sku: 'DIA-NAT-002',
      name: '1.51ct Oval Brilliant (Nat)',
      category: 'Certified Diamonds',
      diamondType: 'Natural',
      price: 16800.00,
      image: looseDiamondImg(),
      details: {
        shape: 'Oval',
        carat: 1.51,
        color: 'D',
        clarity: 'VVS1',
        cut: 'Ideal',
        polish: 'Excellent',
        symmetry: 'Excellent',
        fluorescence: 'Faint',
        lab: 'GIA',
        certificateNumber: 'GIA-22083918',
        depth: 62.8,
        table: 56.5,
        ratio: 1.45,
        length: 9.15,
        width: 6.31
      }
    },
    {
      id: 'cert-3',
      sku: 'DIA-LGD-003',
      name: '3.15ct Cushion Brilliant (Lab)',
      category: 'Certified Diamonds',
      diamondType: 'Lab-Grown',
      price: 4900.00,
      image: looseDiamondImg(),
      details: {
        shape: 'Cushion',
        carat: 3.15,
        color: 'F',
        clarity: 'VS1',
        cut: 'Excellent',
        polish: 'Excellent',
        symmetry: 'Very Good',
        fluorescence: 'None',
        lab: 'IGI',
        certificateNumber: 'IGI-82910398',
        depth: 64.1,
        table: 58.0,
        ratio: 1.05,
        length: 8.90,
        width: 8.48
      }
    },
    {
      id: 'cert-4',
      sku: 'DIA-NAT-004',
      name: '2.02ct Round Brilliant (Nat)',
      category: 'Certified Diamonds',
      diamondType: 'Natural',
      price: 34500.00,
      image: looseDiamondImg(),
      details: {
        shape: 'Round',
        carat: 2.02,
        color: 'E',
        clarity: 'VVS2',
        cut: 'Excellent',
        polish: 'Excellent',
        symmetry: 'Excellent',
        fluorescence: 'None',
        lab: 'GIA',
        certificateNumber: 'GIA-6391028',
        depth: 61.8,
        table: 56.0,
        ratio: 1.00,
        length: 8.10,
        width: 8.12
      }
    },

    // --- MELEE DIAMONDS ---
    {
      id: 'melee-1',
      sku: 'MEL-LGD-001',
      name: 'Round Melee Pointers 0.02ct',
      category: 'Melee Diamonds',
      diamondType: 'Lab-Grown',
      price: 420.00, // Price per carat
      image: looseDiamondImg(),
      details: {
        shape: 'Round',
        pointerSize: '0.02ct',
        mmSize: '1.7mm',
        carat: 0.02,
        color: 'F-G',
        clarity: 'VS1-VS2',
        cut: 'Excellent',
        polish: 'Excellent',
        symmetry: 'Excellent',
        fluorescence: 'None',
        availability: 'In Stock'
      }
    },
    {
      id: 'melee-2',
      sku: 'MEL-NAT-002',
      name: 'Round Melee Pointers 0.05ct',
      category: 'Melee Diamonds',
      diamondType: 'Natural',
      price: 890.00, // Price per carat
      image: looseDiamondImg(),
      details: {
        shape: 'Round',
        pointerSize: '0.05ct',
        mmSize: '2.3mm',
        carat: 0.05,
        color: 'E-F',
        clarity: 'VVS2-VS1',
        cut: 'Excellent',
        polish: 'Excellent',
        symmetry: 'Excellent',
        fluorescence: 'None',
        availability: 'In Stock'
      }
    },

    // --- LAYOUTS ---
    {
      id: 'layout-1',
      sku: 'LAY-LGD-001',
      name: 'Matched Pair Pear Layout',
      category: 'Layouts',
      diamondType: 'Lab-Grown',
      price: 1850.00,
      image: looseDiamondImg(),
      details: {
        shape: 'Pear',
        layoutType: 'Matched Pair',
        stoneCount: 2,
        mmSize: '6.0 x 4.0mm',
        carat: 0.80,
        availability: 'In Stock'
      }
    },
    {
      id: 'layout-2',
      sku: 'LAY-NAT-002',
      name: '5-Stone Emerald Layout',
      category: 'Layouts',
      diamondType: 'Natural',
      price: 9200.00,
      image: looseDiamondImg(),
      details: {
        shape: 'Emerald',
        layoutType: 'Multi-Stone Line',
        stoneCount: 5,
        mmSize: '5.0 x 3.5mm',
        carat: 2.25,
        availability: 'In Stock'
      }
    }
  ]);

  // Shopping Cart actions
  const addToCart = (product, quantity = 1, metal = '18K White Gold') => {
    setCart((prev) => {
      const exists = prev.find((item) => item.product.sku === product.sku && item.metalOption === metal);
      if (exists) {
        return prev.map((item) =>
          item.product.sku === product.sku && item.metalOption === metal
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, metalOption: metal }];
    });
  };

  const removeFromCart = (sku, metal) => {
    setCart((prev) => prev.filter((item) => !(item.product.sku === sku && item.metalOption === metal)));
  };

  const updateCartQuantity = (sku, metal, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.sku === sku && item.metalOption === metal ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  // Wishlist actions
  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Inquiry Submission
  const submitInquiry = (inquiryData) => {
    const year = new Date().getFullYear();
    const count = String(inquiries.length + 1).padStart(6, '0');
    const newInquiryNumber = `INQ-${year}-${count}`;

    const newInquiry = {
      id: `inq-${inquiries.length + 1}`,
      inquiryNumber: newInquiryNumber,
      status: 'Pending Review',
      assignedStaff: 'Elena Rostova',
      createdAt: new Date().toISOString(),
      images: inquiryData.images || [],
      ...inquiryData
    };

    setInquiries((prev) => [newInquiry, ...prev]);
    return newInquiryNumber;
  };

  const updateInquiryStatus = (id, newStatus) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );
  };

  return (
    <StoreContext.Provider
      value={{
        diamondType,
        setDiamondType,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        inquiries,
        submitInquiry,
        updateInquiryStatus,
        products,
        attachedExcel,
        attachExcel,
        detachExcel,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        adminPassword,
        changeAdminPassword
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
