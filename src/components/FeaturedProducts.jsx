import React, { useState } from "react";
import { TYRES_DATA } from "../data/tyresData";
import { Eye, Star, Volume2, Fuel, Shield, Sparkles } from "lucide-react";

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
        padding: "30px 0 20px 0",
        position: "relative",
        background: "var(--bg-dark)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: "24px" }}>
          <div className="section-eyebrow">
            <Sparkles size={16} />
            MOTORSPORT HERITAGE & CONSUMER EXCELLENCE
          </div>
          <h2 style={{ marginBottom: "10px" }}>Flagship Performance Tyres</h2>
          <p>
            Engineered using high-silica polymers, Kevlar belts, and internal acoustic absorption. Every tyre is dynamically balanced and laboratory tested.
          </p>
        </div>

        {/* Category Tabs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "32px",
          }}
        >
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "10px 22px",
                  borderRadius: "9999px",
                  fontSize: "0.86rem",
                  fontWeight: isSelected ? "700" : "600",
                  letterSpacing: "0.02em",
                  cursor: "pointer",
                  transition: "var(--transition-smooth)",
                  background: isSelected
                    ? "#ffffff"
                    : "rgba(255, 255, 255, 0.05)",
                  color: isSelected ? "#07080b" : "var(--text-silver)",
                  border: isSelected
                    ? "1px solid #ffffff"
                    : "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: isSelected ? "0 6px 20px rgba(255, 255, 255, 0.25)" : "none",
                }}
              >
                {cat}
              </button>
            );
          })}
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
                className="glass-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "18px",
                  overflow: "hidden",
                  position: "relative",
                  background: "rgba(13, 17, 24, 0.8)",
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
                  <span className="badge-pill" style={{ background: "rgba(10, 14, 20, 0.85)" }}>
                    {tyre.badge}
                  </span>
                </div>

                {/* Tyre Image Showcase - Large Studio Framing */}
                <div
                  style={{
                    height: "310px",
                    position: "relative",
                    background: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, rgba(8, 11, 16, 0.95) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "4px",
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
                      transform: "scale(1.18)",
                      transition: "transform 0.4s ease-out",
                      filter: "drop-shadow(0 15px 30px rgba(0, 0, 0, 0.9))",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.24)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.18)")}
                  />
                </div>

                {/* Card Body */}
                <div
                  style={{
                    padding: "26px",
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
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
                        color: "var(--accent-crimson-light)",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {tyre.category}
                    </span>

                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Star size={14} fill="#FFB800" color="#FFB800" />
                      <span style={{ fontSize: "0.82rem", fontWeight: "700", color: "#ffffff" }}>
                        {tyre.rating}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        ({tyre.reviewsCount})
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3
                    style={{
                      fontSize: "1.35rem",
                      marginBottom: "6px",
                      color: "#ffffff",
                    }}
                  >
                    {tyre.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--text-dim)",
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
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                        Starting Price
                      </div>
                      <div
                        style={{
                          fontSize: "1.35rem",
                          fontWeight: "700",
                          fontFamily: "var(--font-body)",
                          letterSpacing: "normal",
                          color: "#ffffff",
                        }}
                      >
                        {displayPrice}
                        <span style={{ fontSize: "0.75rem", fontWeight: "400", color: "var(--text-dim)", marginLeft: "4px" }}>
                          / tyre
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectTyre(tyre)}
                      className="btn btn-outline-crimson"
                      style={{
                        padding: "10px 18px",
                        fontSize: "0.82rem",
                        borderRadius: "8px",
                      }}
                    >
                      <Eye size={15} />
                      View Details
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
