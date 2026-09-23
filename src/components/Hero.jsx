import React, { useState, useEffect } from "react";
import { ArrowRight, Settings, Users, Store, Globe2 } from "lucide-react";

const HERO_SLIDES = [
  {
    image: "/images/hero_scenic_bg.png",
    alt: "High-Performance Car Tyres on Scenic Alpine Highway",
  },
  {
    image: "/images/hero_slide_2.jpg",
    alt: "Dual-Sport Adventure Motorcycle Tyre in Lush Forest Road",
  },
  {
    image: "/images/hero_slide_3.png",
    alt: "Heavy Duty Commercial Truck Tyre in Logistics Port",
  },
];

export default function Hero({ onExploreClick, onFinderClick, onServicesClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "520px",
        display: "flex",
        alignItems: "center",
        padding: "26px 0 38px 0",
        scrollMarginTop: "90px",
        overflow: "hidden",
        background: "#0f172a",
        textAlign: "left",
      }}
    >
      {/* Background Scenic Carousel Images - Smooth 3-Second Crossfade */}
      {HERO_SLIDES.map((slide, index) => (
        <img
          key={slide.image}
          src={slide.image}
          alt={slide.alt}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center right",
            zIndex: 0,
            opacity: currentSlide === index ? 1 : 0,
            transform: currentSlide === index ? "scale(1.02)" : "scale(1)",
            transition: "opacity 0.9s ease-in-out, transform 3.5s ease-out",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Soft Clear Gradient Overlay (No blur) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(to right, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.45) 50%, rgba(255, 255, 255, 0.1) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* HERO CONTENT LAYER */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
        }}
      >
        <div style={{ maxWidth: "760px" }}>
          {/* Eyebrow Badge */}
          <div
            className="animate-fade-in-up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "7px 18px",
              borderRadius: "999px",
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
            <span>PREMIUM TYRES FOR A SMOOTHER TOMORROW</span>
          </div>

          {/* Main Headline */}
          <h1
            className="animate-fade-in-up"
            style={{
              fontSize: "clamp(2.4rem, 4.2vw, 3.6rem)",
              lineHeight: 1.12,
              marginBottom: "16px",
              letterSpacing: "-0.02em",
              color: "#0f172a",
              fontWeight: "800",
              userSelect: "none",
              WebkitUserSelect: "none",
              caretColor: "transparent",
            }}
          >
            Engineered for <br />
            <span
              style={{
                color: "#ef4444",
                background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Every Journey.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p
            className="animate-fade-in-up"
            style={{
              fontSize: "1.08rem",
              color: "#334155",
              lineHeight: 1.6,
              marginBottom: "32px",
              maxWidth: "600px",
              fontWeight: "500",
            }}
          >
            Uncompromising grip, superior quiet riding and made for proven durability — for safer roads, longer life and a smoother ride, every time.
          </p>

          {/* Action CTAs */}
          <div
            className="animate-fade-in-up"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "30px",
            }}
          >
            <button
              onClick={onExploreClick}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "16px 36px",
                borderRadius: "999px",
                fontWeight: "700",
                fontSize: "0.98rem",
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "var(--transition-smooth)",
                border: "none",
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                color: "#ffffff",
                boxShadow: "0 8px 25px rgba(239, 68, 68, 0.35)",
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
              EXPLORE TYRES
              <ArrowRight size={18} />
            </button>

            <button
              onClick={onServicesClick}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "16px 32px",
                borderRadius: "999px",
                fontWeight: "700",
                fontSize: "0.98rem",
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "var(--transition-smooth)",
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                color: "#0f172a",
                boxShadow: "0 2px 10px rgba(15, 23, 42, 0.05)",
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
              <Settings size={18} />
              VIEW SERVICES
            </button>
          </div>

          {/* Hero Statistics Badges Strip */}
          <div
            className="animate-fade-in-up"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: "#ffffff",
                padding: "14px 24px",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 15px rgba(15, 23, 42, 0.05)",
              }}
            >
              <Users size={24} color="#ef4444" />
              <div>
                <div style={{ fontWeight: "800", fontSize: "1.15rem", color: "#0f172a", lineHeight: 1.1 }}>
                  85,000+
                </div>
                <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: "600" }}>
                  Happy Customers
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: "#ffffff",
                padding: "14px 24px",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 15px rgba(15, 23, 42, 0.05)",
              }}
            >
              <Store size={24} color="#0f172a" />
              <div>
                <div style={{ fontWeight: "800", fontSize: "1.15rem", color: "#0f172a", lineHeight: 1.1 }}>
                  +125 Dealers
                </div>
                <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: "600" }}>
                  Across India
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: "#ffffff",
                padding: "14px 24px",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 15px rgba(15, 23, 42, 0.05)",
              }}
            >
              <Globe2 size={24} color="#0f172a" />
              <div>
                <div style={{ fontWeight: "800", fontSize: "1.15rem", color: "#0f172a", lineHeight: 1.1 }}>
                  85+
                </div>
                <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: "600" }}>
                  Global Brands
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Slide Indicators */}
      <div
        className="hero-slide-indicators"
        style={{
          position: "absolute",
          bottom: "18px",
          right: "32px",
          zIndex: 12,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          padding: "6px 12px",
          borderRadius: "999px",
          border: "1px solid rgba(226, 232, 240, 0.8)",
          boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
        }}
      >
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Slide ${idx + 1}`}
            style={{
              width: currentSlide === idx ? "22px" : "8px",
              height: "7px",
              borderRadius: "999px",
              background: currentSlide === idx ? "#ef4444" : "#94a3b8",
              border: "none",
              cursor: "pointer",
              transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              padding: 0,
            }}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 960px) {
          #hero {
            padding: 22px 0 46px 0 !important;
            min-height: auto !important;
          }
          .hero-slide-indicators {
            bottom: 12px !important;
            right: 50% !important;
            transform: translateX(50%) !important;
          }
        }
      `}</style>
    </section>
  );
}
