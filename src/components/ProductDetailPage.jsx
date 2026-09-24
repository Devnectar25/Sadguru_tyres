import React, { useState, useRef, useMemo } from "react";
import { TYRES_DATA } from "../data/tyresData";
import {
  Star,
  RotateCw,
  Heart,
  CheckCircle2,
  Navigation,
  Calculator,
  ArrowLeft,
  ChevronRight,
  Calendar,
  ShieldCheck,
  Check,
} from "lucide-react";

export default function ProductDetailPage({
  tyreId,
  currency = "INR",
  onToggleWishlist,
  wishlistIds = [],
  onOpenDealerModal,
  onOpenQuoteModal,
  onOpenBookingModal,
  onBackToCatalog,
  onNavigateHome,
  onSelectTyre,
}) {
  const tyre = TYRES_DATA.find((t) => t.id === tyreId) || TYRES_DATA[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [is360Mode, setIs360Mode] = useState(false);
  const [isSpinning, setIsSpinning] = useState(true);
  const [selectedSize, setSelectedSize] = useState(tyre.availableSizes[0] || "");
  const [activeTab, setActiveTab] = useState("overview");

  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef(null);

  const displayPrice =
    currency === "USD" ? `$${tyre.priceUSD}` : `₹${tyre.priceINR.toLocaleString("en-IN")}`;

  const isWishlisted = wishlistIds.includes(tyre.id);

  // Similar tyres for comparison
  const similarTyres = useMemo(() => {
    return TYRES_DATA.filter(
      (t) => t.id !== tyre.id && (t.vehicleType === tyre.vehicleType || t.category === tyre.category)
    ).slice(0, 3);
  }, [tyre.id, tyre.vehicleType, tyre.category]);

  const handleMouseMove = (e) => {
    if (window.matchMedia && !window.matchMedia("(hover: hover)").matches) return;
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomPos({ x, y });
  };

  const handleMouseEnter = () => {
    if (window.matchMedia && window.matchMedia("(hover: hover)").matches) {
      setIsZooming(true);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        paddingTop: "20px",
        paddingBottom: "80px",
      }}
    >
      <div className="container">
        {/* TOP BREADCRUMB / BACK BAR */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={() => (onBackToCatalog ? onBackToCatalog() : onNavigateHome ? onNavigateHome() : null)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "9999px",
              background: "#ffffff",
              border: "1px solid #cbd5e1",
              color: "#0f172a",
              fontSize: "0.84rem",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(15, 23, 42, 0.04)",
              transition: "var(--transition-smooth)",
            }}
          >
            <ArrowLeft size={16} />
            Back to Tyres Catalog
          </button>

          <nav
            aria-label="Breadcrumb"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.82rem",
              color: "#64748b",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => (onNavigateHome ? onNavigateHome() : null)}
              style={{
                background: "none",
                border: "none",
                color: "#64748b",
                cursor: "pointer",
                padding: "2px 4px",
                fontWeight: "500",
              }}
            >
              Home
            </button>
            <ChevronRight size={13} color="#94a3b8" />
            <button
              onClick={() => (onBackToCatalog ? onBackToCatalog() : null)}
              style={{
                background: "none",
                border: "none",
                color: "#64748b",
                cursor: "pointer",
                padding: "2px 4px",
                fontWeight: "500",
              }}
            >
              Tyre Catalog
            </button>
            <ChevronRight size={13} color="#94a3b8" />
            <span style={{ color: "#ef4444", fontWeight: "700" }}>{tyre.name}</span>
          </nav>
        </div>

        {/* MAIN PRODUCT SHOWCASE (Responsive Grid) */}
        <div className="product-hero-grid">
          {/* LEFT COLUMN: IMAGES & 360 VIEWER */}
          <div>
            <div
              ref={imageContainerRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
              className="product-image-stage"
              style={{
                cursor: is360Mode ? "grab" : "crosshair",
              }}
            >
              {/* Image Stage Floating Control Bar (Never overlaps on mobile) */}
              <div
                style={{
                  position: "absolute",
                  top: "14px",
                  left: "14px",
                  right: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              >
                <div style={{ pointerEvents: "auto", flexShrink: 0 }}>
                  <span
                    style={{
                      background: "#0f172a",
                      color: "#ffffff",
                      fontSize: "0.72rem",
                      fontWeight: "700",
                      padding: "6px 12px",
                      borderRadius: "9999px",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      display: "inline-block",
                      boxShadow: "0 2px 8px rgba(15, 23, 42, 0.15)",
                    }}
                  >
                    {tyre.badge}
                  </span>
                </div>

                <button
                  onClick={() => setIs360Mode(!is360Mode)}
                  style={{
                    pointerEvents: "auto",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 14px",
                    borderRadius: "9999px",
                    background: is360Mode ? "#ef4444" : "#ffffff",
                    border: is360Mode ? "none" : "1px solid #cbd5e1",
                    color: is360Mode ? "#ffffff" : "#0f172a",
                    fontSize: "0.76rem",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "var(--transition-smooth)",
                    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
                  }}
                >
                  <RotateCw size={13} className={is360Mode ? "rotate-anim" : ""} />
                  {is360Mode ? "Exit Studio" : "360° Studio"}
                </button>
              </div>

              {is360Mode ? (
                <div style={{ textAlign: "center", width: "100%", marginTop: "20px" }}>
                  <div
                    style={{
                      height: "260px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={tyre.gallery[activeImageIndex] || tyre.image}
                      alt={tyre.name}
                      style={{
                        maxHeight: "220px",
                        maxWidth: "220px",
                        objectFit: "contain",
                        filter: "drop-shadow(0 20px 30px rgba(15, 23, 42, 0.2))",
                        animation: isSpinning ? "tyreWheelSpin 3s linear infinite" : "none",
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "12px" }}>
                    <button
                      onClick={() => setIsSpinning(!isSpinning)}
                      style={{
                        padding: "8px 20px",
                        borderRadius: "9999px",
                        background: "#0f172a",
                        color: "#ffffff",
                        fontSize: "0.82rem",
                        fontWeight: "700",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {isSpinning ? "Pause Spin" : "Auto Spin"}
                    </button>
                  </div>
                </div>
              ) : (
                <img
                  src={tyre.gallery[activeImageIndex] || tyre.image}
                  alt={tyre.name}
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                    filter: "drop-shadow(0 20px 30px rgba(15, 23, 42, 0.18))",
                    transform: isZooming ? "scale(1.18)" : "scale(1)",
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transition: isZooming ? "transform 0.1s ease-out" : "transform 0.3s ease-out",
                  }}
                />
              )}
            </div>

            {/* Thumbnail Nav */}
            <div className="product-thumbnails-grid">
              {tyre.gallery.map((imgUrl, idx) => {
                const isSelected = activeImageIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveImageIndex(idx);
                      setIs360Mode(false);
                    }}
                    style={{
                      height: "76px",
                      borderRadius: "14px",
                      background: "#ffffff",
                      border: isSelected ? "2px solid #ef4444" : "1px solid #e2e8f0",
                      padding: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(15, 23, 42, 0.04)",
                      transition: "var(--transition-smooth)",
                    }}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      style={{ maxHeight: "50px", maxWidth: "100%", objectFit: "contain" }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: SPECS & ACTIONS */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "0.82rem",
                  fontWeight: "700",
                  color: "#ef4444",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                }}
              >
                {tyre.brand} • {tyre.category}
              </span>

              <button
                onClick={() => onToggleWishlist(tyre.id)}
                style={{
                  background: isWishlisted ? "rgba(239, 68, 68, 0.1)" : "#ffffff",
                  border: isWishlisted ? "1px solid #ef4444" : "1px solid #cbd5e1",
                  color: isWishlisted ? "#ef4444" : "#0f172a",
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  fontSize: "0.78rem",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                  transition: "var(--transition-smooth)",
                }}
              >
                <Heart
                  size={14}
                  fill={isWishlisted ? "#ef4444" : "none"}
                  color={isWishlisted ? "#ef4444" : "currentColor"}
                />
                {isWishlisted ? "Saved" : "Save"}
              </button>
            </div>

            <h1
              style={{
                fontSize: "clamp(1.7rem, 4vw, 2.6rem)",
                lineHeight: 1.15,
                color: "#0f172a",
                marginBottom: "10px",
                fontWeight: "800",
                wordBreak: "break-word",
              }}
            >
              {tyre.name}
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: "2px" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#eab308" color="#eab308" />
                ))}
              </div>
              <span style={{ fontWeight: "700", color: "#0f172a", fontSize: "0.95rem" }}>
                {tyre.rating}
              </span>
              <span style={{ color: "#64748b", fontSize: "0.85rem" }}>
                ({tyre.reviewsCount} verified reviews)
              </span>
            </div>

            <p style={{ fontSize: "0.96rem", color: "#475569", lineHeight: 1.6, marginBottom: "22px" }}>
              {tyre.tagline}
            </p>

            {/* Responsive Price Box */}
            <div className="product-price-box">
              <div>
                <div style={{ fontSize: "0.72rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: "600" }}>
                  Official Unit Price
                </div>
                <div style={{ fontSize: "1.85rem", fontWeight: "800", color: "#0f172a", marginTop: "2px" }}>
                  {displayPrice}
                  <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "500", marginLeft: "4px" }}>
                    /tyre
                  </span>
                </div>
              </div>

              <div>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    color: "#0284c7",
                    background: "#eff6ff",
                    padding: "5px 14px",
                    borderRadius: "9999px",
                    border: "1px solid #bae6fd",
                    display: "inline-block",
                  }}
                >
                  In Stock Across 150 Hubs
                </span>
                <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "4px", fontWeight: "600" }}>
                  Free Alignment & Fitment Included
                </div>
              </div>
            </div>

            {/* Fitment Sizes */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <label style={{ fontSize: "0.78rem", textTransform: "uppercase", color: "#0f172a", fontWeight: "700" }}>
                  Select Fitment Size:
                </label>
                <span style={{ fontSize: "0.78rem", color: "#ef4444", fontWeight: "700" }}>
                  {selectedSize}
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
                        padding: "8px 16px",
                        borderRadius: "9999px",
                        fontSize: "0.84rem",
                        fontWeight: "700",
                        background: isSel ? "linear-gradient(135deg, #ef4444, #dc2626)" : "#ffffff",
                        border: isSel ? "none" : "1px solid #cbd5e1",
                        color: isSel ? "#ffffff" : "#0f172a",
                        cursor: "pointer",
                        boxShadow: isSel ? "0 4px 14px rgba(239, 68, 68, 0.3)" : "none",
                        transition: "var(--transition-smooth)",
                      }}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Responsive Action Buttons */}
            <div className="product-action-buttons">
              <button
                onClick={() => onOpenDealerModal(tyre)}
                style={{
                  flex: "1 1 200px",
                  padding: "15px 22px",
                  borderRadius: "9999px",
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  color: "#ffffff",
                  fontSize: "0.92rem",
                  fontWeight: "700",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 8px 25px rgba(239, 68, 68, 0.35)",
                  transition: "var(--transition-smooth)",
                }}
              >
                <Navigation size={18} />
                Find Dealer & Book Bay
              </button>

              {onOpenBookingModal && (
                <button
                  onClick={() => onOpenBookingModal(tyre)}
                  style={{
                    flex: "1 1 180px",
                    padding: "15px 20px",
                    borderRadius: "9999px",
                    background: "#0f172a",
                    color: "#ffffff",
                    fontSize: "0.92rem",
                    fontWeight: "700",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    boxShadow: "0 6px 20px rgba(15, 23, 42, 0.2)",
                    transition: "var(--transition-smooth)",
                  }}
                >
                  <Calendar size={18} color="#ef4444" />
                  Book Fitting Service
                </button>
              )}

              <button
                onClick={() => onOpenQuoteModal(tyre)}
                style={{
                  flex: "1 1 170px",
                  padding: "15px 20px",
                  borderRadius: "9999px",
                  background: "#ffffff",
                  color: "#0f172a",
                  fontSize: "0.92rem",
                  fontWeight: "700",
                  border: "1px solid #cbd5e1",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 2px 8px rgba(15, 23, 42, 0.05)",
                  transition: "var(--transition-smooth)",
                }}
              >
                <Calculator size={18} color="#ef4444" />
                Get Instant Quote
              </button>
            </div>
          </div>
        </div>

        {/* TABBED DEEP DIVE SECTION */}
        <div className="product-deep-dive-card">
          <div
            className="hide-scrollbar"
            style={{
              display: "flex",
              gap: "10px",
              borderBottom: "1px solid #e2e8f0",
              paddingBottom: "16px",
              marginBottom: "26px",
              overflowX: "auto",
            }}
          >
            {[
              { id: "overview", label: "Product Overview" },
              { id: "specs", label: "Engineering Specifications" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "10px 22px",
                  borderRadius: "9999px",
                  background: activeTab === tab.id ? "#0f172a" : "#f1f5f9",
                  border: "none",
                  color: activeTab === tab.id ? "#ffffff" : "#475569",
                  fontWeight: "700",
                  fontSize: "0.88rem",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "var(--transition-smooth)",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div>
              <h3 style={{ fontSize: "1.4rem", color: "#0f172a", marginBottom: "12px", fontWeight: "800" }}>
                {tyre.name} Product Overview
              </h3>
              <p style={{ fontSize: "0.96rem", color: "#475569", lineHeight: 1.7, marginBottom: "24px" }}>
                {tyre.description}
              </p>
              <div className="product-highlights-grid">
                {tyre.highlights.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "12px",
                      padding: "16px",
                      background: "#f8fafc",
                      borderRadius: "14px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <CheckCircle2 size={18} color="#ef4444" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontSize: "0.88rem", color: "#334155", fontWeight: "600", lineHeight: 1.5 }}>
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "specs" && (
            <div>
              <h3 style={{ fontSize: "1.4rem", color: "#0f172a", marginBottom: "18px", fontWeight: "800" }}>
                Technical & Homologation Specs
              </h3>
              <div className="product-specs-grid">
                {[
                  { label: "Wet Grip Label", val: `Class ${tyre.specs.wetGrip}` },
                  { label: "Fuel Efficiency Grade", val: `Class ${tyre.specs.fuelEfficiency}` },
                  { label: "Acoustic Noise", val: tyre.specs.noiseLevel },
                  { label: "Speed Rating", val: tyre.specs.speedRating },
                  { label: "Treadwear Rating", val: tyre.specs.treadwear },
                  { label: "Manufacturer Warranty", val: tyre.specs.warranty },
                ].map((row, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "16px",
                      background: "#f8fafc",
                      borderRadius: "14px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <div style={{ fontSize: "0.72rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: "700" }}>
                      {row.label}
                    </div>
                    <div style={{ fontSize: "1.05rem", fontWeight: "800", color: "#0f172a", marginTop: "4px" }}>
                      {row.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SIMILAR / RECOMMENDED TYRES SECTION */}
        {similarTyres.length > 0 && (
          <div style={{ marginTop: "16px", marginBottom: "30px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "18px",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <div>
                <span style={{ fontSize: "0.76rem", fontWeight: "700", color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  COMPARE & EXPLORE
                </span>
                <h3 style={{ fontSize: "1.35rem", fontWeight: "800", color: "#0f172a", marginTop: "2px" }}>
                  Similar High-Performance Tyres
                </h3>
              </div>
              <button
                onClick={() => (onBackToCatalog ? onBackToCatalog() : null)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#ef4444",
                  fontWeight: "700",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                View Full Catalog <ChevronRight size={15} />
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "18px",
              }}
            >
              {similarTyres.map((simTyre) => (
                <div
                  key={simTyre.id}
                  onClick={() => {
                    if (onSelectTyre) {
                      onSelectTyre(simTyre);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  style={{
                    background: "#ffffff",
                    borderRadius: "18px",
                    border: "1px solid #e2e8f0",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
                    transition: "var(--transition-smooth)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#cbd5e1";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                    <span style={{ fontSize: "0.74rem", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>
                      {simTyre.brand}
                    </span>
                    <span style={{ fontSize: "0.68rem", fontWeight: "700", background: "#f1f5f9", padding: "3px 10px", borderRadius: "9999px", color: "#334155" }}>
                      {simTyre.category}
                    </span>
                  </div>

                  <div style={{ height: "130px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                    <img
                      src={simTyre.image}
                      alt={simTyre.name}
                      style={{ maxHeight: "110px", maxWidth: "100%", objectFit: "contain" }}
                    />
                  </div>

                  <div>
                    <h4 style={{ fontSize: "1.02rem", fontWeight: "700", color: "#0f172a", marginBottom: "8px" }}>
                      {simTyre.name}
                    </h4>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "12px" }}>
                      <span style={{ fontSize: "1.15rem", fontWeight: "800", color: "#0f172a" }}>
                        {currency === "USD" ? `$${simTyre.priceUSD}` : `₹${simTyre.priceINR.toLocaleString("en-IN")}`}
                      </span>
                      <span
                        style={{
                          fontSize: "0.78rem",
                          fontWeight: "700",
                          color: "#ef4444",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        View Details <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
