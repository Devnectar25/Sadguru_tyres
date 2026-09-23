import React, { useState } from "react";
import { TYRES_DATA } from "../data/tyresData";
import { Eye, Star } from "lucide-react";

export default function FeaturedProducts({
  currency,
  onSelectTyre,
  filteredCategory,
}) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Ultra-High Performance",
    "Superbike & Motorcycle",
    "All-Season Touring",
    "4x4 & Off-Road",
    "Electric Vehicle EV",
    "Winter / Extreme Cold",
  ];

  const filteredTyres = TYRES_DATA.filter((tyre) => {
    if (activeCategory === "All") return true;
    return tyre.category === activeCategory;
  });

  const displayedTyres = filteredTyres.slice(0, 6);

  return (
    <section
      id="products"
      style={{
        padding: "36px 0",
        position: "relative",
        background: "#f8fafc",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: "32px" }}>
          <div className="section-eyebrow">
            MOTORSPORT HERITAGE & CONSUMER EXCELLENCE
          </div>
          <h2>Flagship Performance Tyres</h2>
          <p>
            Engineered using high-silica polymers, Kevlar belts, and internal acoustic absorption. Every tyre is dynamically balanced and laboratory tested.
          </p>
        </div>

        {/* Category Tabs - All in a Single Clean Line */}
        <div
          className="hide-scrollbar"
          style={{
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            padding: "4px 4px 16px 4px",
            marginBottom: "32px",
            maxWidth: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              flexWrap: "nowrap",
              width: "max-content",
              minWidth: "100%",
            }}
          >
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "9px 18px",
                    borderRadius: "9999px",
                    fontSize: "0.84rem",
                    fontWeight: isSelected ? "600" : "500",
                    letterSpacing: "0.01em",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    transition: "var(--transition-smooth)",
                    background: isSelected
                      ? "linear-gradient(135deg, #ef4444, #dc2626)"
                      : "#ffffff",
                    color: isSelected ? "#ffffff" : "#0f172a",
                    border: isSelected
                      ? "1px solid #dc2626"
                      : "1px solid #cbd5e1",
                    boxShadow: isSelected ? "0 6px 18px rgba(239, 68, 68, 0.35)" : "0 2px 6px rgba(15, 23, 42, 0.04)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = "#94a3b8";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = "#cbd5e1";
                      e.currentTarget.style.transform = "translateY(0)";
                    }
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tyres Grid (Max 6 Cards) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "32px",
          }}
        >
          {displayedTyres.map((tyre) => {
            const displayPrice =
              currency === "USD"
                ? `$${tyre.priceUSD}`
                : `₹${tyre.priceINR.toLocaleString("en-IN")}`;

            return (
              <div
                key={tyre.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "20px",
                  overflow: "hidden",
                  position: "relative",
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
                  transition: "var(--transition-smooth)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 18px 40px rgba(15, 23, 42, 0.12)";
                  e.currentTarget.style.borderColor = "#cbd5e1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(15, 23, 42, 0.06)";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
              >
                {/* Badge Header Pill */}
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    zIndex: 2,
                  }}
                >
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
                      boxShadow: "0 4px 12px rgba(15, 23, 42, 0.2)",
                    }}
                  >
                    {tyre.badge}
                  </span>
                </div>

                {/* Tyre Image Showcase - Studio Framing */}
                <div
                  style={{
                    height: "280px",
                    position: "relative",
                    background: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "16px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={tyre.image}
                    alt={tyre.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      transform: "scale(1.05)",
                      transition: "transform 0.4s ease-out",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  />
                </div>

                {/* Card Body */}
                <div
                  style={{
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    borderTop: "1px solid #f1f5f9",
                  }}
                >
                  {/* Category & Rating */}
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
                        fontSize: "0.78rem",
                        color: "#ef4444",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {tyre.category}
                    </span>

                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Star size={14} fill="#eab308" color="#eab308" />
                      <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "#0f172a" }}>
                        {tyre.rating}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                        ({tyre.reviewsCount})
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3
                    style={{
                      fontSize: "1.3rem",
                      marginBottom: "6px",
                      color: "#0f172a",
                      fontWeight: "800",
                    }}
                  >
                    {tyre.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "#64748b",
                      marginBottom: "20px",
                      lineHeight: 1.5,
                    }}
                  >
                    {tyre.tagline}
                  </p>

                  {/* Price and Details CTA */}
                  <div
                    style={{
                      marginTop: "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                      paddingTop: "16px",
                      borderTop: "1px solid #f1f5f9",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "0.72rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: "600" }}>
                        Starting Price
                      </div>
                      <div
                        style={{
                          fontSize: "1.3rem",
                          fontWeight: "800",
                          color: "#0f172a",
                        }}
                      >
                        {displayPrice}
                        <span style={{ fontSize: "0.75rem", fontWeight: "500", color: "#64748b", marginLeft: "4px" }}>
                          /tyre
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectTyre(tyre)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "10px 18px",
                        fontSize: "0.82rem",
                        fontWeight: "700",
                        borderRadius: "9999px",
                        border: "1px solid #cbd5e1",
                        background: "#ffffff",
                        color: "#0f172a",
                        cursor: "pointer",
                        transition: "var(--transition-smooth)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#0f172a";
                        e.currentTarget.style.color = "#ffffff";
                        e.currentTarget.style.borderColor = "#0f172a";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#ffffff";
                        e.currentTarget.style.color = "#0f172a";
                        e.currentTarget.style.borderColor = "#cbd5e1";
                      }}
                    >
                      <Eye size={15} />
                      VIEW DETAILS
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
