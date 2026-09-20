import React from "react";

export default function BrandSection() {
  const brands = [
    { id: "yokohama", name: "Yokohama", logo: "/images/YOKOHAMA.png", tagline: "Japan Precision Tech" },
    { id: "mrf", name: "MRF Tyres", logo: "/images/MRF tyres.png", tagline: "Pure Pace & Endurance" },
    { id: "ceat", name: "CEAT", logo: "/images/CEAT tyres.png", tagline: "Crafted for Indian Roads" },
    { id: "goodyear", name: "Goodyear", logo: "/images/Good Year.jpg", tagline: "Global Innovation Leader" },
    { id: "bridgestone", name: "Bridgestone", logo: "/images/bridgestone.png", tagline: "World #1 Premium Grip" },
    { id: "michelin", name: "Michelin", logo: "/images/mechalin.jpg", tagline: "Performance & Innovation" },
  ];

  return (
    <section
      id="brands"
      style={{
        padding: "45px 0 50px 0",
        background: "linear-gradient(180deg, #06070a 0%, #0c0f16 100%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div className="container">
        {/* Centered Heading */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              fontWeight: "800",
              color: "#ffffff",
              marginBottom: "6px",
              letterSpacing: "-0.02em",
            }}
          >
            Our Brands
          </h2>

          <p
            style={{
              fontSize: "0.88rem",
              color: "var(--text-dim)",
              maxWidth: "580px",
              margin: "0 auto",
            }}
          >
            Genuine OEM Manufacturer Warranty • Factory Certified Stock • 100% Original Tyres
          </p>
        </div>

        {/* Brand Logos Grid Container - Centered, reduced width wrapper */}
        <div style={{ maxWidth: "940px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              alignItems: "center",
            }}
            className="brand-grid-container"
          >
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="glass-card"
                style={{
                  padding: "16px 20px 12px 20px",
                  borderRadius: "18px",
                  background: "rgba(255, 255, 255, 0.98)",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
                  minHeight: "160px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 16px 36px rgba(255, 255, 255, 0.35)";
                  e.currentTarget.style.background = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.5)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.98)";
                }}
              >
                <div
                  style={{
                    height: "110px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={brand.logo}
                    alt={`${brand.name} Official Logo`}
                    style={{
                      maxHeight: "108px",
                      maxWidth: "94%",
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      transform: "scale(1.18)",
                      filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.12))",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: "0.76rem",
                    color: "#334155",
                    fontWeight: "700",
                    letterSpacing: "0.02em",
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
