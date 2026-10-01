import React from "react";
import { Award } from "lucide-react";

export default function FounderLegacy() {
  return (
    <section
      id="founder-legacy"
      style={{
        padding: "32px 0 8px 0",
        background: "#ffffff",
        position: "relative",
      }}
    >
      <div className="container" style={{ maxWidth: "1120px" }}>
        {/* Card Container with clean neutral & red brand theme (NO BLUE) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 16px 40px rgba(15, 23, 42, 0.06)",
            border: "1px solid #e2e8f0",
            background: "#ffffff",
          }}
          className="founder-legacy-grid"
        >
          {/* LEFT PANEL - 100% FULL-BLEED FOUNDER BACKGROUND IMAGE & OVERLAY STATS */}
          <div
            style={{
              position: "relative",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              overflow: "hidden",
              height: "100%",
              boxSizing: "border-box",
              borderRight: "1px solid #e2e8f0",
              background: "#0f172a",
            }}
          >
            {/* 100% Cover Background Image */}
            <img
              src="/images/founder_portrait.jpg"
              alt="Founder & Visionary of Sadguru Tyres"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 20%",
                zIndex: 0,
              }}
            />

            {/* Dark Legibility Gradient Overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.4) 45%, rgba(15, 23, 42, 0.1) 100%)",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />

            {/* Glassmorphic Stat Overlay Strip at Bottom of Image */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                width: "100%",
                padding: "16px 14px",
                background: "rgba(15, 23, 42, 0.72)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "8px",
                textAlign: "center",
                boxSizing: "border-box",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "800",
                    color: "#ffffff",
                    lineHeight: 1,
                    marginBottom: "4px",
                  }}
                >
                  20+
                </div>
                <div
                  style={{
                    fontSize: "0.62rem",
                    fontWeight: "700",
                    letterSpacing: "0.05em",
                    color: "#f87171",
                    textTransform: "uppercase",
                  }}
                >
                  YEARS OF LEGACY
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "800",
                    color: "#ffffff",
                    lineHeight: 1,
                    marginBottom: "4px",
                  }}
                >
                  85K+
                </div>
                <div
                  style={{
                    fontSize: "0.62rem",
                    fontWeight: "700",
                    letterSpacing: "0.05em",
                    color: "#cbd5e1",
                    textTransform: "uppercase",
                  }}
                >
                  HAPPY DRIVERS
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "800",
                    color: "#ffffff",
                    lineHeight: 1,
                    marginBottom: "4px",
                  }}
                >
                  100+
                </div>
                <div
                  style={{
                    fontSize: "0.62rem",
                    fontWeight: "700",
                    letterSpacing: "0.05em",
                    color: "#cbd5e1",
                    textTransform: "uppercase",
                  }}
                >
                  EXPERT TECHS
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - PURE CRISP WHITE BACKGROUND WITH RED ACCENTS (NO BLUE) */}
          <div
            style={{
              background: "#ffffff",
              padding: "40px 48px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              color: "#0f172a",
              overflow: "hidden",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            {/* Eyebrow Pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 18px",
                borderRadius: "999px",
                background: "#fef2f2",
                border: "1px solid #fecaca",
                width: "fit-content",
                fontSize: "0.82rem",
                fontWeight: "600",
                color: "#ef4444",
                marginBottom: "20px",
                flexShrink: 0,
              }}
            >
              <Award size={15} color="#ef4444" />
              <span>Our Foundation & Legacy</span>
            </div>

            {/* Permanent Headline */}
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.5rem, 2.5vw, 2.05rem)",
                fontWeight: "800",
                color: "#0f172a",
                lineHeight: 1.3,
                marginBottom: "20px",
                margin: "0 0 20px 0",
              }}
            >
              He Built a Foundation on Which{" "}
              <span style={{ color: "#ef4444" }}>Generations of Drivers</span> Depend
            </h2>

            {/* Brand Logo & Author Attribution */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "#0f172a",
                  padding: "2px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #ef4444",
                  boxShadow: "0 0 10px rgba(239, 68, 68, 0.25)",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/images/sgt_logo.png"
                  alt="Sadguru Tyres"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div>
                <div style={{ fontSize: "0.98rem", fontWeight: "600", color: "#0f172a" }}>
                  — Founder & Visionary
                </div>
                <div style={{ fontSize: "0.82rem", fontWeight: "600", color: "#ef4444" }}>
                  Sadguru Tyres & Mobility Solutions
                </div>
              </div>
            </div>

            {/* Permanent Quote Description */}
            <p
              style={{
                fontSize: "1.02rem",
                color: "#475569",
                lineHeight: 1.6,
                fontWeight: "400",
                maxWidth: "600px",
                margin: 0,
              }}
            >
              "Sadguru Tyres was founded 20 years ago on one unshakeable principle: absolute road safety, premium tyre engineering, and zero compromise on customer trust."
            </p>
          </div>
        </div>
      </div>

      {/* Responsive Styles & Fixed Grid Height */}
      <style>{`
        @media (min-width: 900px) {
          .founder-legacy-grid {
            grid-template-columns: 42% 58% !important;
            height: 410px !important;
            min-height: 410px !important;
            max-height: 410px !important;
          }
        }
      `}</style>
    </section>
  );
}
