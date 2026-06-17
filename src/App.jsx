import React, { useState, useMemo, useEffect } from 'react';

// Product Catalog Data
const PRODUCTS = [
  {
    id: 1,
    name: "Milk Rusk",
    desc: "Dehradun's most-gifted souvenir. Crispy, golden, pairs perfectly with your morning chai.",
    price: 120,
    category: "Biscuits & Rusks",
    img: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Plum Cake",
    desc: "Rich, dense, fruit-filled. The most carried-back gift from Dehradun for generations.",
    price: 350,
    category: "Cakes & Pastries",
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Butter Biscuits",
    desc: "Freshly baked daily. Pistachio, almond, coconut, and classic plain varieties available.",
    price: 95,
    category: "Biscuits & Rusks",
    img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "Pastries",
    desc: "Chocolate, black forest, pineapple — made fresh every single morning without fail.",
    price: 60,
    category: "Cakes & Pastries",
    img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 5,
    name: "Cream Rolls",
    desc: "Light, flaky puff pastry filled with fresh cream. A Dehradun evening classic.",
    price: 45,
    category: "Cakes & Pastries",
    img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: 6,
    name: "Stick Jaw Toffees",
    desc: "The legendary butter toffee that sticks to your heart. An Ellora's classic since 1953.",
    price: 80,
    category: "Signature Souvenirs",
    img: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=600&auto=format&fit=crop&q=80"
  }
];

// Outlets Data
const OUTLETS = [
  {
    id: 'rajpur',
    name: "Rajpur Road, Dehradun",
    badge: "Flagship · Est. 1953",
    addr: "29, Rajpur Road, Opp. St. Joseph's Academy, Dehradun – 248001",
    hours: "⏰ Mon–Sun: 8:00 AM – 10:00 PM",
    phone: "+91 97199 91953",
    phone2: "Custom Cakes: +91 74550 01953",
    img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80",
    lat: 30.3275,
    lng: 78.0425
  },
  {
    id: 'airport',
    name: "Jolly Grant Airport",
    badge: "Airport Outlet",
    addr: "Jolly Grant Airport, Domestic Terminal, Dehradun – 248001",
    hours: "⏰ Mon–Sun: 6:00 AM – 7:00 PM",
    phone: "+91 95366 61953",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
    lat: 30.1897,
    lng: 78.1889
  },
  {
    id: 'mussoorie',
    name: "Mall Road, Mussoorie",
    badge: "🆕 NEW · Just Opened",
    addr: "2, Clarence House, Mall Road, Mussoorie – 248179, Uttarakhand",
    hours: "⏰ Mon–Sun: 10:30 AM – 11:30 PM",
    phone: "+91 70881 11953",
    img: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&auto=format&fit=crop&q=80",
    lat: 30.4599,
    lng: 78.0664
  }
];

// Custom Cake Options
const FLAVOURS = [
  { name: "Chocolate Truffle", basePrice: 600, desc: "Rich Belgian chocolate ganache" },
  { name: "Black Forest", basePrice: 550, desc: "Classic chocolate, cherries & fresh cream" },
  { name: "Vanilla Sponge", basePrice: 500, desc: "Light, fluffy with premium vanilla bean" },
  { name: "Pineapple", basePrice: 550, desc: "Tangy sweet pineapple fruit chunks" },
  { name: "Red Velvet", basePrice: 700, desc: "Crimson layers with cream cheese frosting" },
  { name: "Plum Cake Classic", basePrice: 650, desc: "Ellora's secret spiced recipe with rum-soaked fruits" }
];

const SIZES = [
  { name: "0.5 kg", multiplier: 0.5, servings: "Serves 4-6" },
  { name: "1.0 kg", multiplier: 1.0, servings: "Serves 8-10" },
  { name: "1.5 kg", multiplier: 1.5, servings: "Serves 12-15" },
  { name: "2.0 kg", multiplier: 2.0, servings: "Serves 16-20" }
];

const OCCASIONS = [
  "Happy Birthday",
  "Anniversary",
  "Congratulations",
  "Custom Message"
];

const FULFILLMENTS = [
  { name: "Pick up — Rajpur Road", price: 0 },
  { name: "Pick up — Mussoorie", price: 0 },
  { name: "Deliver in Dehradun", price: 100 },
  { name: "Pan India shipping", price: 150 }
];

const CAKE_THEMES = {
  "Chocolate Truffle": {
    gradient: "radial-gradient(circle at 40% 40%, #7B4A28 10%, #3D1C02 70%)",
    rim: "linear-gradient(to bottom, #3D1C02, #1A0900)",
    border: "#A0693A",
    swirl: "#D4956A",
    emoji: "🍫",
    glow: "rgba(125,70,30,0.5)"
  },
  "Black Forest": {
    gradient: "radial-gradient(circle at 40% 40%, #A03030 10%, #3B0D0D 70%)",
    rim: "linear-gradient(to bottom, #3B0D0D, #0F0303)",
    border: "#C47A7A",
    swirl: "#F0AAAA",
    emoji: "🍒",
    glow: "rgba(139,30,30,0.5)"
  },
  "Vanilla Sponge": {
    gradient: "radial-gradient(circle at 40% 40%, #FFF7CC 10%, #D4A820 70%)",
    rim: "linear-gradient(to bottom, #C49020, #7A5A00)",
    border: "#FFF3A0",
    swirl: "#FFF8EE",
    emoji: "🌼",
    glow: "rgba(200,146,42,0.45)"
  },
  "Pineapple": {
    gradient: "radial-gradient(circle at 40% 40%, #FFE566 10%, #D47A00 70%)",
    rim: "linear-gradient(to bottom, #B46A00, #6A3A00)",
    border: "#FFD040",
    swirl: "#FFF8C0",
    emoji: "🍍",
    glow: "rgba(220,160,0,0.5)"
  },
  "Red Velvet": {
    gradient: "radial-gradient(circle at 40% 40%, #C81230 10%, #6B0010 70%)",
    rim: "linear-gradient(to bottom, #6B0010, #2D0005)",
    border: "#F08090",
    swirl: "#FFB0BC",
    emoji: "❤️",
    glow: "rgba(180,20,50,0.5)"
  },
  "Plum Cake Classic": {
    gradient: "radial-gradient(circle at 40% 40%, #7A4A8A 10%, #2D0D3A 70%)",
    rim: "linear-gradient(to bottom, #2D0D3A, #0D0015)",
    border: "#C4A0D4",
    swirl: "#DFC0F0",
    emoji: "🫐",
    glow: "rgba(90,30,120,0.5)"
  }
};

const SIZE_SCALES = {
  "0.5 kg": 0.75,
  "1.0 kg": 1.0,
  "1.5 kg": 1.15,
  "2.0 kg": 1.28
};

const OCCASION_DECOR = {
  "Happy Birthday": { candles: true, topEmoji: "🎂" },
  "Anniversary":    { candles: false, topEmoji: "💑" },
  "Congratulations":{ candles: false, topEmoji: "🎊" },
  "Custom Message": { candles: false, topEmoji: "✨" }
};

export default function App() {
  // Navigation & Toasts
  const [toasts, setToasts] = useState([]);
  
  const triggerToast = (msg) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleCopyNumber = (number, name) => {
    navigator.clipboard.writeText(number.replace(/\s+/g, ''));
    triggerToast(`Copied ${name} hotline to clipboard!`);
  };

  // Cart State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Catalog State
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Modals
  const [activeOutlet, setActiveOutlet] = useState(null);
  
  // Checkout Wizard state
  const [checkoutStep, setCheckoutStep] = useState("idle"); // "idle", "form", "success"
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    address: '',
    note: ''
  });
  const [placedOrder, setPlacedOrder] = useState(null);

  // Custom Cake Builder State
  const [cakeStep, setCakeStep] = useState(1);
  const [cakeConfig, setCakeConfig] = useState({
    flavour: FLAVOURS[0].name,
    size: SIZES[1].name,
    occasion: OCCASIONS[0],
    customMessage: "",
    fulfillment: FULFILLMENTS[0].name
  });

  // Derived Values
  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.qty, 0), [cart]);
  const cartSubtotal = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.qty), 0), [cart]);
  
  const currentFlavourObj = useMemo(() => FLAVOURS.find(f => f.name === cakeConfig.flavour), [cakeConfig.flavour]);
  const currentSizeObj = useMemo(() => SIZES.find(s => s.name === cakeConfig.size), [cakeConfig.size]);
  const currentFulfillmentObj = useMemo(() => FULFILLMENTS.find(f => f.name === cakeConfig.fulfillment), [cakeConfig.fulfillment]);

  const calculatedCakePrice = useMemo(() => {
    if (!currentFlavourObj || !currentSizeObj || !currentFulfillmentObj) return 0;
    return (currentFlavourObj.basePrice * currentSizeObj.multiplier) + currentFulfillmentObj.price;
  }, [currentFlavourObj, currentSizeObj, currentFulfillmentObj]);

  // Product Catalog Filtering
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCategory = filter === "All" || p.category === filter;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.desc.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [filter, search]);

  // Cart Handlers
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id && !item.isCustomCake);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && !item.isCustomCake) ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1, isCustomCake: false }];
    });
    triggerToast(`Added ${product.name} to cart!`);
  };

  const handleAddCakeToCart = () => {
    const cakeItem = {
      id: `cake-${Date.now()}`,
      name: `Custom Cake (${cakeConfig.flavour})`,
      price: calculatedCakePrice,
      qty: 1,
      isCustomCake: true,
      img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80",
      meta: { ...cakeConfig }
    };
    setCart((prev) => [...prev, cakeItem]);
    setIsCartOpen(true);
    triggerToast(`Custom ${cakeConfig.flavour} Cake added to cart!`);
    // Reset wizard
    setCakeStep(1);
    setCakeConfig({
      flavour: FLAVOURS[0].name,
      size: SIZES[1].name,
      occasion: OCCASIONS[0],
      customMessage: "",
      fulfillment: FULFILLMENTS[0].name
    });
  };

  const handleUpdateQty = (itemId, isCustom, delta) => {
    setCart((prev) => {
      return prev.map(item => {
        if (item.id === itemId && item.isCustomCake === isCustom) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const handleRemoveItem = (itemId, isCustom) => {
    setCart((prev) => prev.filter(item => !(item.id === itemId && item.isCustomCake === isCustom)));
    triggerToast("Item removed from cart");
  };

  // Checkout Handlers
  const handleStartCheckout = () => {
    if (cart.length === 0) {
      triggerToast("Your cart is empty!");
      return;
    }
    setIsCartOpen(false);
    setCheckoutStep("form");
  };

  const handleCheckoutFormSubmit = (e) => {
    e.preventDefault();
    if (!orderForm.name || !orderForm.phone || !orderForm.address) {
      triggerToast("Please fill in all required fields.");
      return;
    }

    const orderId = `EL-${Math.floor(100000 + Math.random() * 900000)}`;
    const finalOrder = {
      orderId,
      date: new Date().toLocaleString(),
      items: [...cart],
      subtotal: cartSubtotal,
      shipping: 50, // Flat packing/shipping
      total: cartSubtotal + 50,
      customer: { ...orderForm }
    };

    setPlacedOrder(finalOrder);
    setCart([]);
    setCheckoutStep("success");
    triggerToast("Order placed successfully!");
  };

  const handleCloseCheckout = () => {
    setCheckoutStep("idle");
    setPlacedOrder(null);
    setOrderForm({ name: '', phone: '', address: '', note: '' });
  };

  return (
    <div>
      {/* Toast Notifications Stack */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className="toast-item">
            <b>🚧 Ellora's Store:</b> {t.msg}
          </div>
        ))}
      </div>

      {/* Upgrade Demo Bar */}
      <div className="demo-bar">
        🔧 UPGRADE DEMO — Ellora's Melting Moments · New: Interactive Cart · Custom Cake Live Message Preview · Outlet Details with Mock Maps · Search & Filter Catalog
      </div>

      {/* Navbar */}
      <nav>
        <div className="logo-box" onClick={() => window.scrollTo(0,0)}>
          <span className="lbox-script">Elloras<sup>®</sup></span>
          <span className="lbox-brand">Melting Moments</span>
          <span className="lbox-since">Since 1953</span>
        </div>
        <div className="nav-links">
          <a href="#story">Our Story</a>
          <a href="#outlets">Outlets</a>
          <a href="#products">Products</a>
          <a href="#builder">Cake Builder</a>
          <a href="#contact">Contact</a>
        </div>
        <button className="nav-cart" onClick={() => setIsCartOpen(true)}>
          🛒 Cart ({cartCount})
        </button>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <img 
          className="hero-img" 
          src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&auto=format&fit=crop&q=80" 
          alt="Freshly baked goods at Ellora's" 
        />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-inner">
            <div className="hero-eyebrow">Since 1953 · Dehradun's Sacred Gem</div>
            <h1>A bite of <em>Dehradun,</em><br />delivered to your door.</h1>
            <p className="hero-desc">
              Founded by ex-army man Shri Krishan Lal Gulati, Ellora's has been the taste of home for over seven decades — plum cakes, milk rusks, stick jaw toffees, and 500+ baked delights loved across India.
            </p>
            <div className="hero-btns">
              <a href="#products" className="btn-gold" style={{ textDecoration: 'none', display: 'inline-block' }}>
                Order Fresh Bakery
              </a>
              <a href="#builder" className="btn-outline" style={{ textDecoration: 'none', display: 'inline-block' }}>
                Build Custom Cake
              </a>
            </div>
            <div className="hero-stats">
              <div>
                <div className="hstat-n">70+</div>
                <div className="hstat-l">Years of baking</div>
              </div>
              <div>
                <div className="hstat-n">500+</div>
                <div className="hstat-l">Products crafted</div>
              </div>
              <div>
                <div className="hstat-n">300+</div>
                <div className="hstat-l">Team members</div>
              </div>
              <div>
                <div className="hstat-n">3</div>
                <div className="hstat-l">Outlets in UK</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          <span>PLUM CAKE</span><span className="sep">✦</span>
          <span>MILK RUSK</span><span className="sep">✦</span>
          <span>STICK JAW TOFFEES</span><span className="sep">✦</span>
          <span>BUTTER BISCUITS</span><span className="sep">✦</span>
          <span>CREAM ROLLS</span><span className="sep">✦</span>
          <span>CUSTOM CAKES</span><span className="sep">✦</span>
          <span>PASTRIES</span><span className="sep">✦</span>
          <span>PLUM CAKE</span><span className="sep">✦</span>
          <span>MILK RUSK</span><span className="sep">✦</span>
          <span>STICK JAW TOFFEES</span><span className="sep">✦</span>
          <span>BUTTER BISCUITS</span><span className="sep">✦</span>
          <span>CREAM ROLLS</span><span className="sep">✦</span>
          <span>CUSTOM CAKES</span><span className="sep">✦</span>
          <span>PASTRIES</span><span className="sep">✦</span>
        </div>
      </div>

      {/* Outlets Locations Section */}
      <section className="outlets-sec" id="outlets">
        <div className="eyebrow">Our Locations</div>
        <h2 className="sec-title">Find us across Uttarakhand</h2>
        <p className="sec-sub">Three outlets, one 70-year legacy. Walk in anytime — Ellora's is always close.</p>
        
        <div className="outlets-grid">
          {OUTLETS.map((outlet) => (
            <div key={outlet.id} className="outlet-card">
              <div className="outlet-img-container">
                <img className="outlet-img" src={outlet.img} alt={outlet.name} />
              </div>
              <div className="outlet-body">
                <div className="outlet-badge">{outlet.badge}</div>
                <h3 className="outlet-name">{outlet.name}</h3>
                <p className="outlet-addr">{outlet.addr}</p>
                <div className="outlet-hours">{outlet.hours}</div>
                <div className="outlet-phone"><strong>Phone:</strong> {outlet.phone}</div>
                {outlet.phone2 && <div className="outlet-phone"><strong>{outlet.phone2}</strong></div>}
                <div className="outlet-map" onClick={() => setActiveOutlet(outlet)}>
                  📍 Get Directions & View Map →
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Products Catalog Section */}
      <section className="products-sec" id="products">
        <div className="eyebrow">Our Products</div>
        <h2 className="sec-title">500+ baked delights, crafted since 1953</h2>
        <p className="sec-sub">No preservatives, no shortcuts. Every product made fresh with authentic flavours that melt in your mouth.</p>
        
        {/* Catalog Toolbar */}
        <div className="catalog-toolbar">
          <div className="filter-tabs">
            {["All", "Signature Souvenirs", "Biscuits & Rusks", "Cakes & Pastries"].map((cat) => (
              <button 
                key={cat} 
                className={`filter-tab ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="search-box">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search rusks, cakes..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map((p) => (
            <div key={p.id} className="prod-card">
              <div className="prod-img-container">
                <img className="prod-img" src={p.img} alt={p.name} />
              </div>
              <div className="prod-body">
                <h3 className="prod-name">{p.name}</h3>
                <p className="prod-desc">{p.desc}</p>
                <div className="prod-footer">
                  <span className="prod-price">₹{p.price}</span>
                  <button className="add-cart" onClick={() => handleAddToCart(p)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>
              No products found matching your criteria. Try another search!
            </div>
          )}
        </div>
      </section>

      {/* Custom Cake Builder */}
      <section className="cake-builder-sec" id="builder">
        <div className="eyebrow" style={{ color: 'var(--gold)' }}>Interactive Feature</div>
        <h2 className="sec-title" style={{ color: '#fff' }}>Build Your Custom Cake Online</h2>
        <p className="sec-sub" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>
          Celebrate your special moments with a bespoke Ellora's creation. Custom decorated and baked fresh.
        </p>

        <div className="builder-layout">
          {/* Wizard Controls */}
          <div className="builder-wizard">
            {/* Step Navigation */}
            <div className="wizard-steps-nav">
              {[1, 2, 3, 4].map((stepNum) => {
                const labels = ["Flavour", "Size", "Occasion", "Delivery"];
                let statusClass = "";
                if (cakeStep === stepNum) statusClass = "active";
                else if (cakeStep > stepNum) statusClass = "completed";

                return (
                  <div 
                    key={stepNum} 
                    className={`wizard-step-indicator ${statusClass}`}
                    onClick={() => setCakeStep(stepNum)}
                  >
                    <div className="indicator-dot">{stepNum}</div>
                    <div className="indicator-label">{labels[stepNum - 1]}</div>
                  </div>
                );
              })}
            </div>

            {/* Step 1: Flavour */}
            {cakeStep === 1 && (
              <div>
                <h3 className="step-title">Step 01: Choose Flavour</h3>
                <div className="options-grid">
                  {FLAVOURS.map((f) => (
                    <div 
                      key={f.name}
                      className={`option-card ${cakeConfig.flavour === f.name ? 'selected' : ''}`}
                      onClick={() => setCakeConfig({ ...cakeConfig, flavour: f.name })}
                    >
                      <div style={{ fontSize: '24px' }}>🍰</div>
                      <div className="option-name">{f.name}</div>
                      <div className="option-price-tag">₹{f.basePrice}/kg</div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>
                  * Selected Flavour: <strong>{cakeConfig.flavour}</strong> ({currentFlavourObj?.desc})
                </p>
              </div>
            )}

            {/* Step 2: Size */}
            {cakeStep === 2 && (
              <div>
                <h3 className="step-title">Step 02: Choose Weight</h3>
                <div className="options-grid">
                  {SIZES.map((s) => (
                    <div 
                      key={s.name}
                      className={`option-card ${cakeConfig.size === s.name ? 'selected' : ''}`}
                      onClick={() => setCakeConfig({ ...cakeConfig, size: s.name })}
                    >
                      <div style={{ fontSize: '24px' }}>⚖️</div>
                      <div className="option-name">{s.name}</div>
                      <div className="option-price-tag">{s.servings}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Message & Occasion */}
            {cakeStep === 3 && (
              <div>
                <h3 className="step-title">Step 03: Occasion & Custom Message</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div>
                    <label className="form-label" style={{ color: '#fff' }}>Occasion</label>
                    <select 
                      className="form-input" 
                      style={{ background: '#2a1005', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                      value={cakeConfig.occasion}
                      onChange={(e) => setCakeConfig({ ...cakeConfig, occasion: e.target.value })}
                    >
                      {OCCASIONS.map((o) => (
                        <option key={o} value={o} style={{ background: '#3B1F0C' }}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="form-label" style={{ color: '#fff' }}>Custom Message on Cake (max 25 chars)</label>
                    <input 
                      type="text" 
                      className="form-input"
                      placeholder="e.g. Happy Birthday Sunita"
                      maxLength={25}
                      style={{ background: '#2a1005', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                      value={cakeConfig.customMessage}
                      onChange={(e) => setCakeConfig({ ...cakeConfig, customMessage: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Fulfillment */}
            {cakeStep === 4 && (
              <div>
                <h3 className="step-title">Step 04: Pickup or Delivery</h3>
                <div className="options-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                  {FULFILLMENTS.map((f) => (
                    <div 
                      key={f.name}
                      className={`option-card ${cakeConfig.fulfillment === f.name ? 'selected' : ''}`}
                      onClick={() => setCakeConfig({ ...cakeConfig, fulfillment: f.name })}
                    >
                      <div style={{ fontSize: '24px' }}>🚚</div>
                      <div className="option-name">{f.name}</div>
                      <div className="option-price-tag">{f.price > 0 ? `+ ₹${f.price}` : 'Free'}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <button className="btn-gold" onClick={handleAddCakeToCart}>
                    Add Custom Cake to Cart (₹{calculatedCakePrice}) →
                  </button>
                </div>
              </div>
            )}

            {/* Wizard Navigation Buttons */}
            <div className="wizard-nav-btns">
              <button 
                className="btn-wizard" 
                disabled={cakeStep === 1}
                onClick={() => setCakeStep((prev) => prev - 1)}
              >
                ← Previous
              </button>
              {cakeStep < 4 ? (
                <button 
                  className="btn-wizard primary" 
                  onClick={() => setCakeStep((prev) => prev + 1)}
                >
                  Next Step →
                </button>
              ) : null}
            </div>
          </div>

          {/* Live circular Cake visualizer and Summary */}
          <div className="cake-preview-panel">
            <h3 style={{ fontSize: '18px', color: 'var(--gold)', marginBottom: '5px' }}>Live Cake Preview</h3>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Interactive 3D-styled model</p>
            
            {/* Styled Circular Cake */}
            <div className="cake-visualization">
              <div className="cake-visual-model">
                <div className="cake-circle">
                  <div className="cake-cream-swirls"></div>
                  <div className="cake-message-preview">
                    {cakeConfig.customMessage || cakeConfig.occasion}
                  </div>
                </div>
                <div className="cake-side-rim"></div>
              </div>
            </div>

            {/* Order Configuration Summary */}
            <div className="summary-card">
              <h4 className="summary-title">Configuration Summary</h4>
              <div className="summary-row">
                <span>Flavour:</span>
                <strong>{cakeConfig.flavour}</strong>
              </div>
              <div className="summary-row">
                <span>Weight:</span>
                <strong>{cakeConfig.size} ({currentSizeObj?.servings})</strong>
              </div>
              <div className="summary-row">
                <span>Message:</span>
                <strong>{cakeConfig.customMessage ? `"${cakeConfig.customMessage}"` : 'None'}</strong>
              </div>
              <div className="summary-row">
                <span>Fulfillment:</span>
                <strong>{cakeConfig.fulfillment}</strong>
              </div>
              <div className="summary-row total">
                <span>Estimated Price:</span>
                <span>₹{calculatedCakePrice}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fulfillment Options Info Cards */}
      <section className="delivery-sec">
        <div className="eyebrow">Order Online</div>
        <h2 className="sec-title">Ellora's, Wherever You Are</h2>
        
        <div className="delivery-grid">
          <div className="del-card">
            <img className="del-img" src="https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600&auto=format&fit=crop&q=80" alt="Delivery in Dehradun" />
            <div className="del-body">
              <h3 className="del-title">Dehradun Delivery</h3>
              <p className="del-desc">Order by 7 PM for same-day delivery within Dehradun. Also available on Zomato & Swiggy. 45–90 min delivery.</p>
              <a href="#products" className="del-btn" style={{ textDecoration: 'none' }}>
                Order in Dehradun →
              </a>
            </div>
          </div>
          <div className="del-card">
            <img className="del-img" src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600&auto=format&fit=crop&q=80" alt="Pan India shipping" />
            <div className="del-body">
              <h3 className="del-title">Pan India Shipping</h3>
              <p className="del-desc">Rusks, toffees, and biscuits packaged airtight for travel. 500+ products, shipped to all states in 3–5 days.</p>
              <a href="#products" className="del-btn" style={{ textDecoration: 'none' }}>
                Order Pan India →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy and Values Section */}
      <section className="legacy-sec" id="story">
        <div className="legacy-inner">
          <img className="legacy-img" src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=700&auto=format&fit=crop&q=80" alt="Ellora's legacy bakery" />
          <div>
            <div className="eyebrow">Our Story</div>
            <h2 className="sec-title">From one shop on Rajpur Road to Uttarakhand's most loved bakery</h2>
            <p className="legacy-body">
              Founded in 1953 by Shri Krishan Lal Gulati — an ex-Army man who brought discipline and passion into every bake. Succeeded by his son Virendra Gulati, an IHM Pusa Delhi alumnus, Ellora's has grown from one counter to 300 employees and 500+ products shipped across India.
            </p>
            
            <div className="values">
              <div className="val">
                <div className="val-dot"></div>
                <div className="val-text">
                  <strong>No Preservatives, Ever</strong>
                  Fresh ingredients, authentic flavours, baked the same way since 1953.
                </div>
              </div>
              <div className="val">
                <div className="val-dot"></div>
                <div className="val-text">
                  <strong>Pocket Friendly Always</strong>
                  Decadent taste for everyone — we've never believed in premium pricing.
                </div>
              </div>
              <div className="val">
                <div className="val-dot"></div>
                <div className="val-text">
                  <strong>Quality Commitment</strong>
                  Safety standards and cleanliness — something we have never compromised on.
                </div>
              </div>
            </div>

            <div className="legacy-stats">
              <div>
                <div className="lstat-n">70+</div>
                <div className="lstat-l">Years of baking</div>
              </div>
              <div>
                <div className="lstat-n">500+</div>
                <div className="lstat-l">Products</div>
              </div>
              <div>
                <div className="lstat-n">300+</div>
                <div className="lstat-l">Employees</div>
              </div>
              <div>
                <div className="lstat-n">3</div>
                <div className="lstat-l">Outlets</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testi-sec">
        <div className="eyebrow">What People Say</div>
        <h2 className="sec-title">A taste that stays with you</h2>
        <div className="testi-grid">
          <div className="testi-card">
            <div className="stars">★★★★★</div>
            <p className="testi-q">"When visiting Dehradun, you do not have many gifting options. Just go to Ellora's for Milk Rusk and cookies — their stuff is very fresh and loved by everyone."</p>
            <div className="testi-auth">— Rahul S., Mumbai · Tripadvisor</div>
          </div>
          <div className="testi-card">
            <div className="stars">★★★★★</div>
            <p className="testi-q">"Plum cakes never disappoint — soft, fresh, and richly flavoured. A Dehradun staple for our entire family for 20+ years."</p>
            <div className="testi-auth">— Megha R., Delhi · Google</div>
          </div>
          <div className="testi-card">
            <div className="stars">★★★★★</div>
            <p className="testi-q">"One of the finest and most trustworthy bakery brands in India. Lovely variety, maintaining the quality and freshness of each product."</p>
            <div className="testi-auth">— Fahad A., Dehradun · JustDial</div>
          </div>
          <div className="testi-card">
            <div className="stars">★★★★★</div>
            <p className="testi-q">"I order Pan India every month — the packaging keeps everything perfectly fresh. Their rusk with morning chai is absolutely unbeatable."</p>
            <div className="testi-auth">— Bhalchandra A., Pune · Google</div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div className="contact-bar" id="contact">
        <div className="eyebrow" style={{ color: 'var(--gold)' }}>Get in Touch</div>
        <h2 className="sec-title" style={{ color: '#FFF8EE' }}>Call the right team,<br />get the right answer</h2>
        
        <div className="contact-section-wrapper">
          {/* Left Panel: Brand info and primary hotline */}
          <div className="contact-brand-card">
            <div className="brand-logo-container">
              <div className="logo-box" style={{ cursor: 'default' }}>
                <span className="lbox-script">Elloras<sup>®</sup></span>
                <span className="lbox-brand">Melting Moments</span>
                <span className="lbox-since">Since 1953</span>
              </div>
            </div>
            
            <p className="contact-brand-desc">
              Seven decades of baking memories in Dehradun. Connect directly with our specialized teams for deliveries, custom celebrations, or support.
            </p>
            
            <div className="primary-hotline-container">
              <span className="primary-hotline-label">🏆 Primary Helpline</span>
              <a href="tel:+919719991953" className="primary-hotline-num">+91 97199 91953</a>
              <p className="primary-hotline-sub">Dehradun Home Delivery & General Enquiries</p>
              <div className="primary-hotline-actions">
                <a href="tel:+919719991953" className="btn-call-now">
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  Call Now
                </a>
                <button type="button" className="btn-copy-num" onClick={() => handleCopyNumber('+91 97199 91953', 'Dehradun Delivery')}>
                  Copy
                </button>
              </div>
            </div>
          </div>
          
          {/* Right Panel: Organized Department contacts */}
          <div className="contact-groups">
            {/* Group 1 */}
            <div className="contact-group">
              <h4 className="contact-group-title">Orders & Catering</h4>
              <div className="contact-group-grid">
                <div className="contact-card-premium">
                  <div className="contact-card-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                  </div>
                  <div className="contact-card-info">
                    <span className="contact-card-role">National Shipping</span>
                    <a href="tel:+919193931953" className="contact-card-num">+91 91939 31953</a>
                  </div>
                  <button type="button" className="contact-card-copy" onClick={() => handleCopyNumber('+91 91939 31953', 'National Shipping')} title="Copy Number">📋</button>
                </div>
                
                <div className="contact-card-premium">
                  <div className="contact-card-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v10M18 8H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zM12 2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path></svg>
                  </div>
                  <div className="contact-card-info">
                    <span className="contact-card-role">Custom Cakes</span>
                    <a href="tel:+917455001953" className="contact-card-num">+91 74550 01953</a>
                  </div>
                  <button type="button" className="contact-card-copy" onClick={() => handleCopyNumber('+91 74550 01953', 'Custom Cakes')} title="Copy Number">📋</button>
                </div>
                
                <div className="contact-card-premium">
                  <div className="contact-card-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                  </div>
                  <div className="contact-card-info">
                    <span className="contact-card-role">Zomato / Swiggy</span>
                    <a href="tel:+919675551953" className="contact-card-num">+91 96755 51953</a>
                  </div>
                  <button type="button" className="contact-card-copy" onClick={() => handleCopyNumber('+91 96755 51953', 'Zomato / Swiggy')} title="Copy Number">📋</button>
                </div>
              </div>
            </div>

            {/* Group 2 */}
            <div className="contact-group">
              <h4 className="contact-group-title">Store Locations</h4>
              <div className="contact-group-grid">
                <div className="contact-card-premium">
                  <div className="contact-card-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div className="contact-card-info">
                    <span className="contact-card-role">Mussoorie Mall Road</span>
                    <a href="tel:+917088111953" className="contact-card-num">+91 70881 11953</a>
                  </div>
                  <button type="button" className="contact-card-copy" onClick={() => handleCopyNumber('+91 70881 11953', 'Mussoorie Outlet')} title="Copy Number">📋</button>
                </div>
                
                <div className="contact-card-premium">
                  <div className="contact-card-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div className="contact-card-info">
                    <span className="contact-card-role">Airport Terminal</span>
                    <a href="tel:+919536661953" className="contact-card-num">+91 95366 61953</a>
                  </div>
                  <button type="button" className="contact-card-copy" onClick={() => handleCopyNumber('+91 95366 61953', 'Airport Outlet')} title="Copy Number">📋</button>
                </div>
              </div>
            </div>

            {/* Group 3 */}
            <div className="contact-group">
              <h4 className="contact-group-title">Support & Careers</h4>
              <div className="contact-group-grid">
                <div className="contact-card-premium">
                  <div className="contact-card-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"></path></svg>
                  </div>
                  <div className="contact-card-info">
                    <span className="contact-card-role">Customer Support</span>
                    <a href="tel:+918755801953" className="contact-card-num">+91 87558 01953</a>
                  </div>
                  <button type="button" className="contact-card-copy" onClick={() => handleCopyNumber('+91 87558 01953', 'Customer Support')} title="Copy Number">📋</button>
                </div>
                
                <div className="contact-card-premium">
                  <div className="contact-card-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                  </div>
                  <div className="contact-card-info">
                    <span className="contact-card-role">Jobs / Careers</span>
                    <a href="tel:+917409111953" className="contact-card-num">+91 74091 11953</a>
                  </div>
                  <button type="button" className="contact-card-copy" onClick={() => handleCopyNumber('+91 74091 11953', 'Jobs & Careers')} title="Copy Number">📋</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="foot-logo">Ellora's Melting Moments © 1953–2025</div>
        <div className="foot-links">
          <a onClick={() => triggerToast('Shipping Policy is being updated for 2026.')}>Shipping</a>
          <a onClick={() => triggerToast('Returns policy details are coming soon.')}>Returns</a>
          <a onClick={() => triggerToast('Privacy statement is being prepared.')}>Privacy</a>
        </div>
        <div className="foot-copy">Made with love in Dehradun, Uttarakhand</div>
      </footer>

      {/* Shopping Cart Sidebar Drawer */}
      {isCartOpen && (
        <>
          <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>
          <div className="cart-drawer">
            <div className="cart-header">
              <h3 className="cart-title">🛍️ Your Cart ({cartCount})</h3>
              <button className="btn-close-cart" onClick={() => setIsCartOpen(false)}>×</button>
            </div>
            
            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="cart-empty">
                  <div className="cart-empty-icon">🛒</div>
                  <p>Your cart is empty.</p>
                  <p style={{ fontSize: '12px' }}>Add some delicious items from our catalog to get started!</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.id}-${item.isCustomCake}`} className="cart-item">
                    <img className="cart-item-img" src={item.img} alt={item.name} />
                    <div className="cart-item-info">
                      <div>
                        <h4 className="cart-item-name">{item.name}</h4>
                        {item.isCustomCake && item.meta && (
                          <div className="cart-item-meta">
                            Size: {item.meta.size} | Msg: {item.meta.customMessage ? `"${item.meta.customMessage}"` : 'None'}
                          </div>
                        )}
                      </div>
                      <div className="cart-item-footer">
                        <span className="cart-item-price">₹{item.price * item.qty}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div className="qty-controls">
                            <button className="qty-btn" onClick={() => handleUpdateQty(item.id, item.isCustomCake, -1)}>-</button>
                            <span className="qty-val">{item.qty}</span>
                            <button className="qty-btn" onClick={() => handleUpdateQty(item.id, item.isCustomCake, 1)}>+</button>
                          </div>
                          <button className="cart-item-remove" onClick={() => handleRemoveItem(item.id, item.isCustomCake)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-summary-row">
                  <span>Subtotal:</span>
                  <strong>₹{cartSubtotal}</strong>
                </div>
                <div className="cart-summary-row">
                  <span>Packaging & Shipping:</span>
                  <strong>₹50</strong>
                </div>
                <div className="cart-summary-row total">
                  <span>Total Amount:</span>
                  <span>₹{cartSubtotal + 50}</span>
                </div>
                <button className="btn-checkout" onClick={handleStartCheckout}>
                  Proceed to Checkout →
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Outlet Details Modal with Mock Google Map */}
      {activeOutlet && (
        <div className="modal-overlay" onClick={() => setActiveOutlet(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontFamily: 'var(--font-serif)', color: '#fff', fontSize: '18px' }}>
                📍 Outlet Map & Details
              </h3>
              <button 
                className="btn-close-cart" 
                style={{ color: '#fff' }} 
                onClick={() => setActiveOutlet(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <img 
                src={activeOutlet.img} 
                alt={activeOutlet.name} 
                style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1.25rem' }} 
              />
              <h3 style={{ color: 'var(--brown)', fontSize: '22px', marginBottom: '8px' }}>
                {activeOutlet.name}
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '12px' }}>
                {activeOutlet.addr}
              </p>
              
              <div style={{ background: '#f5efe4', padding: '1rem', borderRadius: '6px', fontSize: '13.5px' }}>
                <p><strong>Operating Hours:</strong> {activeOutlet.hours}</p>
                <p style={{ marginTop: '5px' }}><strong>Contact Phone:</strong> {activeOutlet.phone}</p>
              </div>

              {/* Styled Mock Google Map */}
              <div className="mock-map">
                <img 
                  className="mock-map-bg" 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&auto=format&fit=crop&q=80" 
                  alt="City Grid map" 
                />
                <div className="mock-map-pin">
                  <div className="mock-pin-icon">📍</div>
                  <div className="mock-pin-label">{activeOutlet.name}</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                  GPS Coordinates: {activeOutlet.lat}, {activeOutlet.lng}
                </span>
                <button className="btn-gold" style={{ padding: '10px 20px' }} onClick={() => {
                  triggerToast(`Routing directions configured for ${activeOutlet.name}!`);
                  setActiveOutlet(null);
                }}>
                  Open in Google Maps
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Form Modal */}
      {checkoutStep === "form" && (
        <div className="modal-overlay" onClick={() => setCheckoutStep("idle")}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ color: '#fff', fontSize: '18px' }}>🛵 Complete Your Order</h3>
              <button className="btn-close-cart" style={{ color: '#fff' }} onClick={() => setCheckoutStep("idle")}>×</button>
            </div>
            <form onSubmit={handleCheckoutFormSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Customer Name *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required 
                    placeholder="Enter your full name" 
                    value={orderForm.name}
                    onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input 
                    type="tel" 
                    className="form-input" 
                    required 
                    placeholder="+91 XXXXX XXXXX" 
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Delivery Address *</label>
                  <textarea 
                    className="form-input" 
                    required 
                    rows={3} 
                    style={{ resize: 'none', fontFamily: 'inherit' }}
                    placeholder="Enter your detailed shipping address" 
                    value={orderForm.address}
                    onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Special Baking Instructions / Note</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. eggless, deliver in evening" 
                    value={orderForm.note}
                    onChange={(e) => setOrderForm({ ...orderForm, note: e.target.value })}
                  />
                </div>
                <div style={{ background: '#fcfaf7', padding: '1rem', borderRadius: '6px', marginTop: '1.5rem', border: '1px solid rgba(59,31,12,0.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '5px' }}>
                    <span>Items Subtotal:</span>
                    <span>₹{cartSubtotal}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '5px' }}>
                    <span>Shipping fee:</span>
                    <span>₹50</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: '700', borderTop: '1px dashed #ccc', paddingTop: '8px', marginTop: '8px' }}>
                    <span>Total Bill:</span>
                    <span>₹{cartSubtotal + 50}</span>
                  </div>
                </div>
              </div>
              <div style={{ padding: '1.5rem 2rem', background: '#f5efe4', borderTop: '1px solid rgba(59,31,12,0.1)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" className="btn-outline" style={{ color: 'var(--brown)', borderColor: 'rgba(59,31,12,0.3)', padding: '10px 20px' }} onClick={() => setCheckoutStep("idle")}>
                  Cancel
                </button>
                <button type="submit" className="btn-gold" style={{ padding: '10px 24px' }}>
                  Place Order (Cash on Delivery)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Checkout Success Modal / Print Receipt */}
      {checkoutStep === "success" && placedOrder && (
        <div className="modal-overlay">
          <div className="modal-container" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3 style={{ color: '#fff', fontSize: '18px' }}>🎉 Order Placed Successfully!</h3>
            </div>
            <div className="modal-body">
              <p style={{ textAlign: 'center', fontSize: '14px', marginBottom: '1.5rem', color: 'var(--muted)' }}>
                Thank you for your order! Your baked goods will be prepared and delivered shortly.
              </p>
              
              {/* Receipt */}
              <div className="receipt">
                <div className="receipt-title">ELLORA'S MELTING MOMENTS</div>
                <div style={{ textAlign: 'center', fontSize: '10px', marginBottom: '10px' }}>SINCE 1953 · DEHRADUN</div>
                <div className="receipt-header">
                  <div>Order ID: {placedOrder.orderId}</div>
                  <div>Date: {placedOrder.date}</div>
                  <div>Payment: Cash on Delivery</div>
                </div>
                
                {placedOrder.items.map((item, idx) => (
                  <div key={idx} className="receipt-row">
                    <span>{item.qty}x {item.name.substring(0, 24)}{item.name.length > 24 ? '..' : ''}</span>
                    <span>₹{item.price * item.qty}</span>
                  </div>
                ))}
                
                <div className="receipt-divider"></div>
                <div className="receipt-row">
                  <span>Subtotal</span>
                  <span>₹{placedOrder.subtotal}</span>
                </div>
                <div className="receipt-row">
                  <span>Packaging & Shipping</span>
                  <span>₹{placedOrder.shipping}</span>
                </div>
                <div className="receipt-divider"></div>
                <div className="receipt-total">
                  <span>GRAND TOTAL</span>
                  <span>₹{placedOrder.total}</span>
                </div>
                <div className="receipt-divider"></div>
                
                <div style={{ fontSize: '10px', color: '#555', marginTop: '10px' }}>
                  <div><strong>Customer:</strong> {placedOrder.customer.name}</div>
                  <div><strong>Phone:</strong> {placedOrder.customer.phone}</div>
                  <div><strong>Address:</strong> {placedOrder.customer.address}</div>
                  {placedOrder.customer.note && <div><strong>Note:</strong> {placedOrder.customer.note}</div>}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                <button className="btn-gold" style={{ width: '100%' }} onClick={handleCloseCheckout}>
                  Close & Back to Shop
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
