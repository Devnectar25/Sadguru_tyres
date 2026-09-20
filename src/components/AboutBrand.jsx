import React from "react";
import { ShieldCheck, Award, Flag, ChevronRight, CheckCircle2, History } from "lucide-react";

export default function AboutBrand({ onExploreClick }) {
  return (
    <section
      id="about"
      style={{
        padding: "50px 0 25px 0",
        position: "relative",
        background: "linear-gradient(180deg, #0d1017 0%, #06070a 100%)",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.05fr 1fr",
            gap: "60px",
            alignItems: "center",
          }}
          className="about-grid"
        >
          {/* Left Column: Workshop Image & Floating Metric */}
          <div style={{ position: "relative" }}>
            {/* Image Frame with Glass Accent */}
            <div
              style={{
                position: "relative",
                borderRadius: "22px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 42, 42, 0.2)",
              }}
            >
              <img
                src="/images/brand_heritage.jpg"
                alt="Sadguru Tyres Precision Engineering Workshop and Testing Facility"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Floating Experience Badge */}
            <div
              className="glass-panel"
              style={{
                position: "absolute",
                bottom: "-25px",
                right: "-20px",
                padding: "20px 26px",
                background: "rgba(10, 14, 22, 0.92)",
                border: "1px solid rgba(255, 42, 42, 0.4)",
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.7)",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "10px",
                  background: "var(--accent-crimson)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                }}
              >
                <History size={26} />
              </div>
              <div>
                <div style={{ fontSize: "1.7rem", fontWeight: "800", color: "#ffffff", lineHeight: 1.1, fontFamily: "var(--font-heading)" }}>
                  25+ YEARS
                </div>
                <div style={{ fontSize: "0.76rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Engineering Excellence
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Story & Key Pillars */}
          <div>
            <div className="section-eyebrow" style={{ marginBottom: "16px" }}>
              <Flag size={16} />
              THE SADGURU HERITAGE
            </div>

            <h2
              style={{
                fontSize: "clamp(2.2rem, 3.8vw, 3.2rem)",
                lineHeight: 1.14,
                marginBottom: "22px",
              }}
            >
              Forged on the Track. <br />
              <span className="text-gradient-crimson">Mastered for the Road.</span>
            </h2>

            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--text-dim)",
                lineHeight: 1.65,
                marginBottom: "20px",
              }}
            >
              Founded with a relentless obsession for automotive safety and dynamic handling, Sadguru Tyres bridges the gap between motorsport-grade rubber polymers and daily driving comfort. 
            </p>

            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--text-muted)",
                lineHeight: 1.65,
                marginBottom: "32px",
              }}
            >
              Whether conquering sub-zero alpine passes, navigating heavy monsoon highways, or setting lap times on the circuit, our tyres undergo rigorous 3D laser diagnostics and stress-strain testing before touching tarmac.
            </p>

            {/* 4 Stats Counters */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "20px",
                marginBottom: "36px",
              }}
            >
              <div
                style={{
                  padding: "16px 20px",
                  background: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--accent-crimson)", fontFamily: "var(--font-heading)" }}>
                  500,000+
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-silver)", fontWeight: "500" }}>
                  Tyres Fitted & Certified
                </div>
              </div>

              <div
                style={{
                  padding: "16px 20px",
                  background: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--accent-cyan)", fontFamily: "var(--font-heading)" }}>
                  150+
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-silver)", fontWeight: "500" }}>
                  Service Network Hubs
                </div>
              </div>

              <div
                style={{
                  padding: "16px 20px",
                  background: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "var(--accent-amber)", fontFamily: "var(--font-heading)" }}>
                  99.8%
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-silver)", fontWeight: "500" }}>
                  Customer Satisfaction
                </div>
              </div>

              <div
                style={{
                  padding: "16px 20px",
                  background: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                <div style={{ fontSize: "1.8rem", fontWeight: "800", color: "#10B981", fontFamily: "var(--font-heading)" }}>
                  100%
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-silver)", fontWeight: "500" }}>
                  OEM Rim Fitment Guarantee
                </div>
              </div>
            </div>

            {/* Story CTA */}
            <a
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                onExploreClick();
              }}
              className="btn btn-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              Explore Our Lineup
              <ChevronRight size={18} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
