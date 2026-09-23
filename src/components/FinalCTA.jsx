import React from "react";
import { ArrowRight, Calendar } from "lucide-react";

export default function FinalCTA({ onFinderClick, onExploreClick, onBookClick }) {
  return (
    <section
      id="contact"
      style={{
        padding: "36px 0",
        position: "relative",
        background: "#ffffff",
        overflow: "hidden",
        scrollMarginTop: "85px",
      }}
    >
      <div id="cta" style={{ position: "absolute", top: 0, scrollMarginTop: "85px" }} />
      <div className="container" style={{ position: "relative", zIndex: 5 }}>
        <div
          style={{
            padding: "54px 44px",
            borderRadius: "24px",
            backgroundImage: "url('/images/cta_scenic_bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "1px solid #cbd5e1",
            boxShadow: "0 15px 40px rgba(15, 23, 42, 0.12)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle Contrast Gradient Overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(to right, rgba(255, 255, 255, 0.92) 0%, rgba(255, 255, 255, 0.75) 48%, rgba(255, 255, 255, 0.1) 100%)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />

          {/* Left Side Content */}
          <div style={{ position: "relative", zIndex: 2, maxWidth: "620px" }}>
            {/* Eyebrow */}
            <div className="section-eyebrow" style={{ marginBottom: "16px" }}>
              TAKE COMMAND OF THE ROAD
            </div>

            {/* Headline */}
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                lineHeight: 1.15,
                marginBottom: "14px",
                letterSpacing: "-0.02em",
                color: "#0f172a",
                fontWeight: "800",
              }}
            >
              Ready for Your <span style={{ color: "#ef4444" }}>Next Journey?</span>
            </h2>

            {/* Supporting Copy */}
            <p
              style={{
                fontSize: "1rem",
                color: "#334155",
                maxWidth: "540px",
                marginBottom: "28px",
                lineHeight: 1.6,
                fontWeight: "500",
              }}
            >
              Upgrade today with premium tyres and expert services. Your safety, comfort, and performance are our priority.
            </p>

            {/* Action CTAs matching mockup */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={onExploreClick || onFinderClick}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 30px",
                  borderRadius: "9999px",
                  fontSize: "0.9rem",
                  fontWeight: "700",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  color: "#ffffff",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 8px 25px rgba(239, 68, 68, 0.35)",
                  transition: "var(--transition-smooth)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(239, 68, 68, 0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(239, 68, 68, 0.35)";
                }}
              >
                EXPLORE TYRES NOW
                <ArrowRight size={16} />
              </button>

              <button
                onClick={onBookClick}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 26px",
                  borderRadius: "9999px",
                  fontSize: "0.9rem",
                  fontWeight: "700",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  background: "#ffffff",
                  color: "#0f172a",
                  border: "1px solid #cbd5e1",
                  cursor: "pointer",
                  boxShadow: "0 2px 10px rgba(15, 23, 42, 0.05)",
                  transition: "var(--transition-smooth)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f8fafc";
                  e.currentTarget.style.borderColor = "#0f172a";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#ffffff";
                  e.currentTarget.style.borderColor = "#cbd5e1";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Calendar size={16} color="#0f172a" />
                BOOK FITTING / CONSULTATION
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 840px) {
          #cta div {
            grid-template-columns: 1fr !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}
