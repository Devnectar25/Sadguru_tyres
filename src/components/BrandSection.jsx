import React from "react";

export default function BrandSection() {
  const brands = [
    { id: "yokohama", name: "Yokohama", logo: "/images/YOKOHAMA.png", tagline: "Japan's Premium Tyres" },
    { id: "mrf", name: "MRF Tyres", logo: "/images/MRF tyres.png", tagline: "India's No.1 Tyre Brand" },
    { id: "ceat", name: "CEAT", logo: "/images/CEAT tyres.png", tagline: "Confidence for Every Ride" },
    { id: "goodyear", name: "Goodyear", logo: "/images/Good Year.jpg", tagline: "Global Innovation Leader" },
    { id: "bridgestone", name: "Bridgestone", logo: "/images/bridgestone.png", tagline: "World's #1 Premium Tyre" },
    { id: "michelin", name: "Michelin", logo: "/images/mechalin.jpg", tagline: "Performance & Innovation" },
  ];

  return (
    <section
      id="brands"
      style={{
        padding: "36px 0",
        background: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div className="container">
        {/* Centered Heading */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "7px 20px",
              borderRadius: "9999px",
              background: "#000000",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              fontSize: "0.82rem",
              fontWeight: "700",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "16px",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.25)",
            }}
          >
            OUR BRANDS
          </div>

          <h2
            style={{
              fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
              fontWeight: "800",
              color: "#0f172a",
              marginBottom: "10px",
              letterSpacing: "-0.02em",
            }}
          >
            Trusted Global Brands
          </h2>

          <p
            style={{
              fontSize: "0.95rem",
              color: "#64748b",
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            Genuine Direct-Manufacturer Warranty | Factory Certified Stock | 100% Original Tyres
          </p>
        </div>

        {/* Brand Logos Grid Container */}
        <div style={{ maxWidth: "1040px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
              alignItems: "center",
            }}
            className="brand-grid-container"
          >
            {brands.map((brand) => (
              <div
                key={brand.id}
                style={{
                  padding: "20px 24px",
                  borderRadius: "20px",
                  background: "#ffffff",
                  border: "1px solid #cbd5e1",
                  minHeight: "185px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
                  transition: "var(--transition-smooth)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#94a3b8";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(15, 23, 42, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#cbd5e1";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(15, 23, 42, 0.04)";
                }}
              >
                <div
                  style={{
                    height: "125px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    padding: "0 8px",
                  }}
                >
                  <img
                    src={brand.logo}
                    alt={`${brand.name} Official Logo`}
                    style={{
                      maxHeight: "95px",
                      maxWidth: "92%",
                      width: "auto",
                      height: "auto",
                      objectFit: "contain",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: "0.78rem",
                    color: "#475569",
                    fontWeight: "600",
                    letterSpacing: "0.01em",
                  }}
                >
                  {brand.tagline}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
