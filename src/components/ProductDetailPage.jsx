import React, { useState, useRef } from "react";
import { TYRES_DATA } from "../data/tyresData";
import {
  Star,
  ShieldCheck,
  Check,
  ChevronRight,
  Compass,
  FileText,
  RotateCw,
  Heart,
  Share2,
  Volume2,
  Fuel,
  Award,
  Calendar,
  Layers,
  Sparkles,
  Car,
  Activity,
  User,
  CheckCircle2,
  Navigation,
  Calculator,
  ArrowRight,
} from "lucide-react";

export default function ProductDetailPage({
  tyreId,
  currency,
  onBackToCatalog,
  onNavigateHome,
  onSelectTyre,
  wishlistIds,
  onToggleWishlist,
  onOpenDealerModal,
  onOpenQuoteModal,
  onOpenBookingModal,
}) {
  const tyre = TYRES_DATA.find((t) => t.id === tyreId) || TYRES_DATA[0];

  // Gallery and 360 view states
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [is360Mode, setIs360Mode] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [selectedSize, setSelectedSize] = useState(tyre.availableSizes[0] || "");
  const [activeTab, setActiveTab] = useState("overview"); // overview, specs, performance, tech, safety, reviews

  // Zoom lens state
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef(null);

  // Related tyres (from same vehicle category, excluding current)
  const relatedTyres = TYRES_DATA.filter(
    (t) => t.id !== tyre.id && (t.vehicleType === tyre.vehicleType || t.category === tyre.category)
  ).slice(0, 3);

  const displayPrice =
    currency === "USD" ? `$${tyre.priceUSD}` : `₹${tyre.priceINR.toLocaleString("en-IN")}`;

  const isWishlisted = wishlistIds.includes(tyre.id);

  // Mouse move handler for zoom lens
  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomPos({ x, y });
  };

  // 360 simulation rotation
  const rotateLeft = () => setRotationAngle((prev) => (prev - 45 + 360) % 360);
  const rotateRight = () => setRotationAngle((prev) => (prev + 45) % 360);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-dark)",
        paddingTop: "30px",
        paddingBottom: "100px",
      }}
    >
      <div className="container">


        {/* MAIN PRODUCT SHOWCASE (2 Columns) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.05fr",
            gap: "50px",
            alignItems: "flex-start",
            marginBottom: "80px",
          }}
          className="product-hero-grid"
        >
          {/* ================= LEFT COLUMN: IMAGES & 360 VIEWER ================= */}
          <div>
            {/* Main Image Stage */}
            <div
              ref={imageContainerRef}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
              style={{
                position: "relative",
                height: "460px",
                background: "radial-gradient(circle at 50% 50%, rgba(255, 42, 42, 0.1) 0%, #0d111a 75%)",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "36px",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.7)",
                cursor: is360Mode ? "grab" : "crosshair",
              }}
            >
              {/* Badge Overlay */}
              <div style={{ position: "absolute", top: "18px", left: "18px", zIndex: 10 }}>
                <span className="badge-pill">{tyre.badge}</span>
              </div>

              {/* 360 Visualizer Mode Toggle */}
              <button
                onClick={() => setIs360Mode(!is360Mode)}
                style={{
                  position: "absolute",
                  top: "18px",
                  right: "18px",
                  zIndex: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "7px 14px",
                  borderRadius: "999px",
                  background: is360Mode ? "#ffffff" : "rgba(10, 14, 20, 0.8)",
                  border: is360Mode ? "1px solid #ffffff" : "1px solid rgba(255, 255, 255, 0.15)",
                  color: is360Mode ? "#07080b" : "#ffffff",
                  fontSize: "0.78rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <RotateCw size={14} className={is360Mode ? "rotate-anim" : ""} />
                {is360Mode ? "Exit 360° Studio" : "360° 3D View"}
              </button>

              {/* Normal vs 360 Render */}
              {is360Mode ? (
                <div style={{ textAlign: "center", width: "100%" }}>
                  <div
                    style={{
                      height: "300px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: `rotateY(${rotationAngle}deg)`,
                      transition: "transform 0.4s ease-out",
                    }}
                  >
                    <img
                      src={tyre.gallery[activeImageIndex] || tyre.image}
                      alt={tyre.name}
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                        filter: "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.9))",
                      }}
                    />
                  </div>
                  {/* 360 Angle Controls */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginTop: "16px" }}>
                    <button onClick={rotateLeft} className="btn btn-secondary" style={{ padding: "6px 14px", fontSize: "0.75rem" }}>
                      ↺ Rotate Left
                    </button>
                    <span style={{ fontSize: "0.8rem", color: "var(--accent-cyan)", fontWeight: "700" }}>
                      {rotationAngle}° Angle
                    </span>
                    <button onClick={rotateRight} className="btn btn-secondary" style={{ padding: "6px 14px", fontSize: "0.75rem" }}>
                      Rotate Right ↻
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Normal image with Zoom Lens on hover */}
                  <img
                    src={tyre.gallery[activeImageIndex] || tyre.image}
                    alt={tyre.name}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                      filter: "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.9))",
                      transform: isZooming ? "scale(1.18)" : "scale(1)",
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      transition: isZooming ? "transform 0.1s ease-out" : "transform 0.3s ease-out",
                    }}
                  />
                  {isZooming && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "14px",
                        left: "14px",
                        background: "rgba(0,0,0,0.7)",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        fontSize: "0.72rem",
                        color: "var(--text-silver)",
                        pointerEvents: "none",
                      }}
                    >
                      🔍 Interactive Zoom Active (Hover to inspect tread)
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Thumbnail Navigation Bar */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "14px",
                marginTop: "16px",
              }}
            >
              {tyre.gallery.map((imgUrl, idx) => {
                const isSelected = activeImageIndex === idx;
                const labels = ["Perspective 3D", "Macro Tread Sipes", "Mounted Rim", "Testing Lab"];
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveImageIndex(idx);
                      setIs360Mode(false);
                    }}
                    style={{
                      height: "88px",
                      borderRadius: "12px",
                      background: isSelected ? "rgba(255, 42, 42, 0.12)" : "rgba(18, 23, 33, 0.8)",
                      border: isSelected ? "2px solid var(--accent-crimson)" : "1px solid rgba(255, 255, 255, 0.08)",
                      padding: "8px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "var(--transition-smooth)",
                    }}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      style={{ maxHeight: "48px", maxWidth: "100%", objectFit: "contain" }}
                    />
                    <span style={{ fontSize: "0.64rem", color: isSelected ? "#fff" : "var(--text-muted)", marginTop: "4px", fontWeight: "600" }}>
                      {labels[idx] || `View ${idx + 1}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================= RIGHT COLUMN: SPECIFICATIONS & ACTIONS ================= */}
          <div>
            {/* Top Brand & Wishlist Row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "0.84rem",
                  fontWeight: "700",
                  color: "var(--accent-crimson-light)",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                }}
              >
                {tyre.brand} • {tyre.category}
              </span>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  onClick={() => onToggleWishlist(tyre.id)}
                  style={{
                    background: isWishlisted ? "rgba(255, 42, 42, 0.15)" : "rgba(255, 255, 255, 0.05)",
                    border: isWishlisted ? "1px solid var(--accent-crimson)" : "1px solid rgba(255, 255, 255, 0.1)",
                    color: isWishlisted ? "var(--accent-crimson)" : "var(--text-silver)",
                    padding: "6px 14px",
                    borderRadius: "8px",
                    fontSize: "0.78rem",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    cursor: "pointer",
                  }}
                >
                  <Heart
                    size={14}
                    fill={isWishlisted ? "var(--accent-crimson)" : "none"}
                    color={isWishlisted ? "var(--accent-crimson)" : "currentColor"}
                  />
                  {isWishlisted ? "Wishlisted" : "Save"}
                </button>
              </div>
            </div>

            {/* Product Title */}
            <h1
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                lineHeight: 1.12,
                color: "#ffffff",
                marginBottom: "12px",
              }}
            >
              {tyre.name}
            </h1>

            {/* Ratings Bar */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ display: "flex", gap: "2px" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#FFB800" color="#FFB800" />
                ))}
              </div>
              <span style={{ fontWeight: "700", color: "#ffffff", fontSize: "0.95rem" }}>
                {tyre.rating}
              </span>
              <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                ({tyre.reviewsCount} verified track & highway reviews)
              </span>
            </div>

            {/* Short Description */}
            <p
              style={{
                fontSize: "1rem",
                color: "var(--text-dim)",
                lineHeight: 1.6,
                marginBottom: "24px",
              }}
            >
              {tyre.tagline}
            </p>

            {/* Price Box */}
            <div
              style={{
                padding: "20px 24px",
                background: "rgba(14, 18, 27, 0.8)",
                borderRadius: "14px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "28px",
              }}
            >
              <div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Official Unit Price
                </div>
                <div
                  style={{
                    fontSize: "1.9rem",
                    fontWeight: "700",
                    fontFamily: "var(--font-body)",
                    letterSpacing: "normal",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "baseline",
                    gap: "6px",
                  }}
                >
                  {displayPrice}
                  <span style={{ fontSize: "0.85rem", color: "var(--text-dim)", fontWeight: "400" }}>
                    / tyre (incl. VAT)
                  </span>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    color: "var(--accent-cyan)",
                    background: "rgba(0, 240, 255, 0.1)",
                    padding: "4px 10px",
                    borderRadius: "999px",
                    border: "1px solid rgba(0, 240, 255, 0.25)",
                    display: "inline-block",
                  }}
                >
                  In Stock Across 150 Hubs
                </span>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "4px" }}>
                  Free Fitment Included
                </div>
              </div>
            </div>

            {/* Available Sizes Interactive Selector */}
            <div style={{ marginBottom: "26px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <label style={{ fontSize: "0.78rem", textTransform: "uppercase", color: "var(--text-silver)", fontWeight: "700" }}>
                  Select Fitment Size:
                </label>
                <span style={{ fontSize: "0.78rem", color: "var(--accent-crimson-light)", fontWeight: "600" }}>
                  Selected: {selectedSize}
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {tyre.availableSizes.map((sz) => {
                  const isSel = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      style={{
                        padding: "8px 14px",
                        borderRadius: "8px",
                        fontSize: "0.84rem",
                        fontWeight: "700",
                        background: isSel ? "#ffffff" : "rgba(255, 255, 255, 0.05)",
                        border: isSel ? "1px solid #ffffff" : "1px solid rgba(255, 255, 255, 0.1)",
                        color: isSel ? "#07080b" : "var(--text-silver)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Vehicle Compatibility */}
            <div
              style={{
                padding: "14px 18px",
                background: "rgba(255, 255, 255, 0.03)",
                borderRadius: "10px",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                marginBottom: "28px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <Car size={20} color="var(--accent-crimson)" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: "0.82rem", color: "var(--text-dim)" }}>
                <strong style={{ color: "#ffffff" }}>OEM Approvals & Recommended Vehicles:</strong> {tyre.bestSuitedFor}
              </div>
            </div>

            {/* Key Specifications Quick Strip */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "10px",
                marginBottom: "32px",
              }}
            >
              <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
                <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Wet Grip</div>
                <div style={{ fontSize: "1.15rem", fontWeight: "800", color: "var(--accent-cyan)" }}>Grade {tyre.specs.wetGrip}</div>
              </div>
              <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
                <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Noise Rating</div>
                <div style={{ fontSize: "1.15rem", fontWeight: "800", color: "#FBBF24" }}>{tyre.specs.noiseLevel}</div>
              </div>
              <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
                <div style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Max Speed</div>
                <div style={{ fontSize: "1.15rem", fontWeight: "800", color: "#ffffff" }}>{tyre.specs.speedRating.split(" ")[0]}</div>
              </div>
            </div>

            {/* Action Buttons Row: "Find Dealer" & "Get Quote" */}
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <button
                onClick={() => onOpenDealerModal(tyre)}
                className="btn btn-primary"
                style={{ flex: "1 1 200px", padding: "16px 24px" }}
              >
                <Navigation size={18} />
                Find Dealer & Book Bay
              </button>

              <button
                onClick={() => onOpenQuoteModal(tyre)}
                className="btn btn-secondary"
                style={{ flex: "1 1 180px", padding: "16px 20px" }}
              >
                <Calculator size={18} color="var(--accent-crimson)" />
                Get Instant Quote
              </button>
            </div>
          </div>
        </div>

        {/* ================= VISUAL SPECIFICATION CARDS (6 METRICS) ================= */}
        <div style={{ marginBottom: "80px" }}>
          <div className="section-header" style={{ marginBottom: "40px", textAlign: "left" }}>
            <div className="section-eyebrow">
              <Activity size={16} />
              BENCHMARK DIAGNOSTIC TELEMETRY
            </div>
            <h2>Performance & Compound Scores</h2>
            <p>
              Quantified dynamic ratings measured against high-grade European testing facility benchmarks.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px",
            }}
          >
            {[
              { key: "grip", title: "Dry & Cornering Grip", icon: Activity, data: tyre.visualSpecs.grip, color: "var(--accent-crimson)" },
              { key: "mileage", title: "Treadwear Mileage", icon: Calendar, data: tyre.visualSpecs.mileage, color: "var(--accent-amber)" },
              { key: "wetPerformance", title: "Wet & Hydro-Braking", icon: ShieldCheck, data: tyre.visualSpecs.wetPerformance, color: "var(--accent-cyan)" },
              { key: "comfort", title: "Ride Suppleness & Comfort", icon: Layers, data: tyre.visualSpecs.comfort, color: "#10B981" },
              { key: "noise", title: "Cabin Acoustic Dampening", icon: Volume2, data: tyre.visualSpecs.noise, color: "#A78BFA" },
              { key: "durability", title: "Puncture & Impact Durability", icon: Award, data: tyre.visualSpecs.durability, color: "#F43F5E" },
            ].map((spec) => {
              const Icon = spec.icon;
              return (
                <div
                  key={spec.key}
                  className="glass-card"
                  style={{
                    padding: "24px",
                    borderRadius: "16px",
                    background: "rgba(14, 18, 26, 0.75)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "8px",
                          background: `${spec.color}18`,
                          border: `1px solid ${spec.color}33`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: spec.color,
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <span style={{ fontWeight: "700", color: "#fff", fontSize: "0.95rem" }}>
                        {spec.title}
                      </span>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: "1.2rem", fontWeight: "800", color: spec.color, fontFamily: "var(--font-heading)" }}>
                        {spec.data.score}
                      </span>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>/100</span>
                    </div>
                  </div>

                  {/* Progress Indicator Bar */}
                  <div style={{ height: "6px", background: "rgba(255, 255, 255, 0.08)", borderRadius: "3px", overflow: "hidden", marginBottom: "12px" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${spec.data.score}%`,
                        background: spec.color,
                        borderRadius: "3px",
                      }}
                    />
                  </div>

                  <div style={{ fontSize: "0.82rem", fontWeight: "600", color: "var(--text-silver)", marginBottom: "4px" }}>
                    {spec.data.label}
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                    {spec.data.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= TABBED DEEP DIVE SECTION ================= */}
        <div
          className="glass-panel"
          style={{
            padding: "40px",
            background: "rgba(12, 16, 24, 0.85)",
            marginBottom: "90px",
            borderRadius: "20px",
          }}
        >
          {/* Tabs Navigation */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              paddingBottom: "16px",
              marginBottom: "30px",
              overflowX: "auto",
            }}
          >
            {[
              { id: "overview", label: "Product Overview" },
              { id: "specs", label: "Engineering Specifications" },
              { id: "technology", label: "Silica & Polymer Tech" },
              { id: "safety", label: "Structural Safety Features" },
              { id: "reviews", label: `Customer Reviews (${tyre.reviewsCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  background: activeTab === tab.id ? "rgba(255, 42, 42, 0.15)" : "transparent",
                  border: activeTab === tab.id ? "1px solid var(--accent-crimson)" : "none",
                  color: activeTab === tab.id ? "#ffffff" : "var(--text-dim)",
                  fontWeight: activeTab === tab.id ? "700" : "500",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div>
              <h3 style={{ fontSize: "1.5rem", color: "#ffffff", marginBottom: "14px" }}>
                {tyre.name} Product Overview
              </h3>
              <p style={{ fontSize: "0.98rem", color: "var(--text-silver)", lineHeight: 1.7, marginBottom: "24px" }}>
                {tyre.description}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                {tyre.highlights.map((h, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", padding: "14px", background: "rgba(255, 255, 255, 0.02)", borderRadius: "10px", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                    <CheckCircle2 size={16} color="var(--accent-crimson)" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontSize: "0.88rem", color: "var(--text-silver)" }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: SPECIFICATIONS */}
          {activeTab === "specs" && (
            <div>
              <h3 style={{ fontSize: "1.5rem", color: "#ffffff", marginBottom: "20px" }}>
                Technical & Homologation Specs
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
                {[
                  { label: "Wet Grip European Label", val: `Class ${tyre.specs.wetGrip}` },
                  { label: "Fuel Efficiency Grade", val: `Class ${tyre.specs.fuelEfficiency}` },
                  { label: "Pass-by Acoustic Noise", val: tyre.specs.noiseLevel },
                  { label: "Speed Rating Symbol", val: tyre.specs.speedRating },
                  { label: "Factory Treadwear Rating", val: tyre.specs.treadwear },
                  { label: "Standard Tread Depth", val: tyre.specs.treadDepth },
                  { label: "Manufacturer Warranty", val: tyre.specs.warranty },
                  { label: "Sidewall Casing Armor", val: tyre.specs.sidewall },
                  { label: "Run-Flat Technology", val: tyre.specs.runFlat },
                  { label: "Load Index & Ply Rating", val: tyre.specs.loadIndex },
                ].map((row, i) => (
                  <div key={i} style={{ padding: "14px", background: "rgba(0, 0, 0, 0.3)", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase" }}>{row.label}</div>
                    <div style={{ fontSize: "1rem", fontWeight: "700", color: "#ffffff", marginTop: "2px" }}>{row.val}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TECHNOLOGY */}
          {activeTab === "technology" && (
            <div>
              <h3 style={{ fontSize: "1.5rem", color: "#ffffff", marginBottom: "14px" }}>
                Next-Gen Rubber Polymers & Architecture
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                <div style={{ padding: "20px", background: "rgba(255, 255, 255, 0.02)", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
                  <div style={{ color: "var(--accent-crimson)", fontWeight: "700", fontSize: "1.1rem", marginBottom: "8px" }}>
                    Bi-Compound Nano-Matrix
                  </div>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-dim)", lineHeight: 1.6 }}>
                    Features an outer shoulder reinforced with dry racing elastomers for relentless lateral cornering, seamlessly mated to a high-silica inner band that breaks surface tension in standing water.
                  </p>
                </div>
                <div style={{ padding: "20px", background: "rgba(255, 255, 255, 0.02)", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
                  <div style={{ color: "var(--accent-cyan)", fontWeight: "700", fontSize: "1.1rem", marginBottom: "8px" }}>
                    AcousticSilence Cavity Foam
                  </div>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-dim)", lineHeight: 1.6 }}>
                    Specially developed open-cell polyurethane foam bonded to the tyre's inner circumference filters out airborne road vibrations, reducing perceived interior passenger cabin noise by 9dB.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SAFETY */}
          {activeTab === "safety" && (
            <div>
              <h3 style={{ fontSize: "1.5rem", color: "#ffffff", marginBottom: "14px" }}>
                Structural Carcass & Impact Armor
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ display: "flex", gap: "12px", padding: "16px", background: "rgba(0,0,0,0.3)", borderRadius: "10px" }}>
                  <ShieldCheck size={22} color="var(--accent-crimson)" style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: "#fff", display: "block", marginBottom: "4px" }}>Dual High-Tensile Steel Belts</strong>
                    <span style={{ fontSize: "0.88rem", color: "var(--text-dim)" }}>
                      Engineered to maintain a completely flat footprint across severe emergency braking maneuvers, delivering true 100-0 km/h deceleration distance stability.
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "12px", padding: "16px", background: "rgba(0,0,0,0.3)", borderRadius: "10px" }}>
                  <ShieldCheck size={22} color="var(--accent-cyan)" style={{ flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: "#fff", display: "block", marginBottom: "4px" }}>Aramid / Kevlar Curb Guard Flange</strong>
                    <span style={{ fontSize: "0.88rem", color: "var(--text-dim)" }}>
                      A thickened rubber buffer extends beyond the wheel rim flange, preventing forged alloy damage from parallel parking kerb encounters and potholes.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: REVIEWS */}
          {activeTab === "reviews" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "1.5rem", color: "#ffffff" }}>
                  Verified Driver Feedback
                </h3>
                <span className="badge-pill">4.9 / 5.0 Average Rating</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  { author: "Karan Singhania", car: "BMW M4 Competition", rating: 5, date: "3 weeks ago", comment: "The dry grip on this tyre is extraordinary. Trail braking into turn 3 at BIC, the front axle just planted without any wander. Far superior to OEM factory equipment." },
                  { author: "David Henderson", car: "Porsche Taycan 4S", rating: 5, date: "1 month ago", comment: "Whisper quiet on the expressway. High torque launches in electric cars usually cause shoulder scuffing, but after 12,000 km the tread depth is remarkably even." },
                ].map((rev, i) => (
                  <div key={i} style={{ padding: "18px", background: "rgba(0,0,0,0.3)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <div style={{ fontWeight: "700", color: "#fff" }}>{rev.author} <span style={{ color: "var(--accent-crimson)", fontSize: "0.8rem", fontWeight: "400" }}>({rev.car})</span></div>
                      <span style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>{rev.date}</span>
                    </div>
                    <div style={{ display: "flex", gap: "2px", marginBottom: "8px" }}>
                      {[...Array(rev.rating)].map((_, idx) => (
                        <Star key={idx} size={13} fill="#FFB800" color="#FFB800" />
                      ))}
                    </div>
                    <p style={{ fontSize: "0.88rem", color: "var(--text-silver)", lineHeight: 1.5 }}>
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ================= RELATED TYRES SECTION ================= */}
        <div>
          <div className="section-header" style={{ marginBottom: "36px", textAlign: "left" }}>
            <div className="section-eyebrow">
              <Sparkles size={16} />
              RECOMMENDED ALTERNATIVES
            </div>
            <h2>Related Performance Tyres</h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
              gap: "28px",
            }}
          >
            {relatedTyres.map((rel) => {
              const relPrice =
                currency === "USD" ? `$${rel.priceUSD}` : `₹${rel.priceINR.toLocaleString("en-IN")}`;

              return (
                <div
                  key={rel.id}
                  className="glass-card product-card-hover"
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    padding: "20px",
                    background: "rgba(13, 17, 24, 0.8)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ height: "180px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                    <img
                      src={rel.image}
                      alt={rel.name}
                      style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                    />
                  </div>
                  <span className="badge-pill" style={{ alignSelf: "flex-start", marginBottom: "6px" }}>
                    {rel.badge}
                  </span>
                  <h4 style={{ fontSize: "1.15rem", color: "#fff", marginBottom: "4px" }}>
                    {rel.name}
                  </h4>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", marginBottom: "14px" }}>
                    {rel.category} • {rel.availableSizes[0]}
                  </div>
                  <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontSize: "1.25rem", fontWeight: "800", color: "#fff" }}>
                      {relPrice}
                    </div>
                    <button
                      onClick={() => {
                        onSelectTyre(rel);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="btn btn-outline-crimson"
                      style={{ padding: "7px 14px", fontSize: "0.78rem" }}
                    >
                      Inspect <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .rotate-anim {
          animation: spin 3s linear infinite;
        }
        @media (max-width: 980px) {
          .product-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </div>
  );
}
