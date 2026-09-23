import React, { useState, useRef } from "react";
import { TYRES_DATA } from "../data/tyresData";
import { Star, RotateCw, Heart, CheckCircle2, Navigation, Calculator } from "lucide-react";

export default function ProductDetailPage({
  tyreId,
  currency,
  onToggleWishlist,
  wishlistIds,
  onOpenDealerModal,
  onOpenQuoteModal,
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

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomPos({ x, y });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        paddingTop: "24px",
        paddingBottom: "36px",
      }}
    >
      <div className="container">
        {/* MAIN PRODUCT SHOWCASE (2 Columns) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.05fr",
            gap: "40px",
            alignItems: "flex-start",
            marginBottom: "36px",
          }}
          className="product-hero-grid"
        >
          {/* LEFT COLUMN: IMAGES & 360 VIEWER */}
          <div>
            <div
              ref={imageContainerRef}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
              style={{
                position: "relative",
                height: "460px",
                background: "#ffffff",
                borderRadius: "24px",
                border: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "36px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
                cursor: is360Mode ? "grab" : "crosshair",
              }}
            >
              <div style={{ position: "absolute", top: "18px", left: "18px", zIndex: 10 }}>
                <span
                  style={{
                    background: "#0f172a",
                    color: "#ffffff",
                    fontSize: "0.72rem",
                    fontWeight: "700",
                    padding: "6px 14px",
                    borderRadius: "9999px",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {tyre.badge}
                </span>
              </div>

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
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  background: is360Mode ? "#ef4444" : "#ffffff",
                  border: is360Mode ? "none" : "1px solid #cbd5e1",
                  color: is360Mode ? "#ffffff" : "#0f172a",
                  fontSize: "0.78rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "var(--transition-smooth)",
                  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
                }}
              >
                <RotateCw size={14} className={is360Mode ? "rotate-anim" : ""} />
                {is360Mode ? "Exit 360° Studio" : "360° 3D View"}
              </button>

              {is360Mode ? (
                <div style={{ textAlign: "center", width: "100%" }}>
                  <div
                    style={{
                      height: "300px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={tyre.gallery[activeImageIndex] || tyre.image}
                      alt={tyre.name}
                      style={{
                        maxHeight: "260px",
                        maxWidth: "260px",
                        objectFit: "contain",
                        filter: "drop-shadow(0 20px 30px rgba(15, 23, 42, 0.2))",
                        animation: isSpinning ? "tyreWheelSpin 3s linear infinite" : "none",
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "16px" }}>
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
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveImageIndex(idx);
                      setIs360Mode(false);
                    }}
                    style={{
                      height: "88px",
                      borderRadius: "16px",
                      background: "#ffffff",
                      border: isSelected ? "2px solid #ef4444" : "1px solid #e2e8f0",
                      padding: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(15, 23, 42, 0.04)",
                    }}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      style={{ maxHeight: "56px", maxWidth: "100%", objectFit: "contain" }}
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
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "0.84rem",
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
                }}
              >
                <Heart size={14} fill={isWishlisted ? "#ef4444" : "none"} color={isWishlisted ? "#ef4444" : "currentColor"} />
                {isWishlisted ? "Wishlisted" : "Save"}
              </button>
            </div>

            <h1
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                lineHeight: 1.12,
                color: "#0f172a",
                marginBottom: "12px",
                fontWeight: "800",
              }}
            >
              {tyre.name}
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{ display: "flex", gap: "2px" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#eab308" color="#eab308" />
                ))}
              </div>
              <span style={{ fontWeight: "700", color: "#0f172a", fontSize: "0.95rem" }}>
                {tyre.rating}
              </span>
              <span style={{ color: "#64748b", fontSize: "0.85rem" }}>
                ({tyre.reviewsCount} reviews)
              </span>
            </div>

            <p style={{ fontSize: "1rem", color: "#475569", lineHeight: 1.6, marginBottom: "24px" }}>
              {tyre.tagline}
            </p>

            {/* Price Box */}
            <div
              style={{
                padding: "20px 24px",
                background: "#ffffff",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "28px",
                boxShadow: "0 6px 20px rgba(15, 23, 42, 0.04)",
              }}
            >
              <div>
                <div style={{ fontSize: "0.72rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: "600" }}>
                  Official Unit Price
                </div>
                <div style={{ fontSize: "1.9rem", fontWeight: "800", color: "#0f172a" }}>
                  {displayPrice}
                  <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "500", marginLeft: "4px" }}>
                    /tyre
                  </span>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    color: "#0284c7",
                    background: "#eff6ff",
                    padding: "4px 12px",
                    borderRadius: "9999px",
                    border: "1px solid #bae6fd",
                    display: "inline-block",
                  }}
                >
                  In Stock Across 150 Hubs
                </span>
                <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "4px", fontWeight: "600" }}>
                  Free Fitment Included
                </div>
              </div>
            </div>

            {/* Fitment Sizes */}
            <div style={{ marginBottom: "26px" }}>
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
                      }}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <button
                onClick={() => onOpenDealerModal(tyre)}
                style={{
                  flex: "1 1 200px",
                  padding: "16px 24px",
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
                }}
              >
                <Navigation size={18} />
                Find Dealer & Book Bay
              </button>

              <button
                onClick={() => onOpenQuoteModal(tyre)}
                style={{
                  flex: "1 1 180px",
                  padding: "16px 20px",
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
                }}
              >
                <Calculator size={18} color="#ef4444" />
                Get Instant Quote
              </button>
            </div>
          </div>
        </div>

        {/* TABBED DEEP DIVE SECTION */}
        <div
          style={{
            padding: "24px 28px",
            background: "#ffffff",
            marginBottom: "36px",
            borderRadius: "24px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              borderBottom: "1px solid #e2e8f0",
              paddingBottom: "16px",
              marginBottom: "30px",
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
                  padding: "10px 20px",
                  borderRadius: "9999px",
                  background: activeTab === tab.id ? "#0f172a" : "#f1f5f9",
                  border: "none",
                  color: activeTab === tab.id ? "#ffffff" : "#475569",
                  fontWeight: "700",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div>
              <h3 style={{ fontSize: "1.5rem", color: "#0f172a", marginBottom: "14px", fontWeight: "800" }}>
                {tyre.name} Product Overview
              </h3>
              <p style={{ fontSize: "0.98rem", color: "#475569", lineHeight: 1.7, marginBottom: "24px" }}>
                {tyre.description}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                {tyre.highlights.map((h, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", padding: "16px", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                    <CheckCircle2 size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontSize: "0.88rem", color: "#334155", fontWeight: "600" }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "specs" && (
            <div>
              <h3 style={{ fontSize: "1.5rem", color: "#0f172a", marginBottom: "20px", fontWeight: "800" }}>
                Technical & Homologation Specs
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
                {[
                  { label: "Wet Grip Label", val: `Class ${tyre.specs.wetGrip}` },
                  { label: "Fuel Efficiency Grade", val: `Class ${tyre.specs.fuelEfficiency}` },
                  { label: "Acoustic Noise", val: tyre.specs.noiseLevel },
                  { label: "Speed Rating", val: tyre.specs.speedRating },
                  { label: "Treadwear Rating", val: tyre.specs.treadwear },
                  { label: "Manufacturer Warranty", val: tyre.specs.warranty },
                ].map((row, i) => (
                  <div key={i} style={{ padding: "16px", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: "0.72rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: "700" }}>{row.label}</div>
                    <div style={{ fontSize: "1rem", fontWeight: "800", color: "#0f172a", marginTop: "2px" }}>{row.val}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
