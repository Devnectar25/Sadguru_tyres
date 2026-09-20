import React, { useState, useEffect, useRef } from "react";
import { TESTIMONIALS_DATA } from "../data/testimonialsData";
import { Star, MessageSquareQuote, CheckCircle, ThumbsUp, ChevronLeft, ChevronRight } from "lucide-react";

// Rotational Circular Score Ring Gauge Component
function RotationalRatingGauge({ score = 5.0, id }) {
  const gradientId = `ratingGrad-${id}`;
  return (
    <div
      style={{
        position: "relative",
        width: "56px",
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
      title={`Rotational Rating Score: ${score.toFixed(1)} / 5.0`}
    >
      {/* 1. Rotational Animated Ring */}
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        style={{
          position: "absolute",
          inset: 0,
          animation: "spinSlow 10s linear infinite",
        }}
      >
        <circle
          cx="28"
          cy="28"
          r="23"
          fill="none"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="3"
        />
        <circle
          cx="28"
          cy="28"
          r="23"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="3"
          strokeDasharray="144"
          strokeDashoffset="24"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff2a2a" />
            <stop offset="50%" stopColor="#FFB800" />
            <stop offset="100%" stopColor="#00f0ff" />
          </linearGradient>
        </defs>
      </svg>

      {/* 2. Rating Badge Center */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <Star size={13} fill="#FFB800" color="#FFB800" />
        <span
          style={{
            fontSize: "0.76rem",
            fontWeight: "800",
            color: "#ffffff",
            lineHeight: 1,
            marginTop: "2px",
            fontFamily: "var(--font-body)",
          }}
        >
          {score.toFixed(1)}
        </span>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Auto Rotation Interval for Testimonial Carousel
  useEffect(() => {
    if (!isAutoRotating || isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isAutoRotating, isHovered]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const displayItems = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA];

  return (
    <section
      id="testimonials"
      style={{
        padding: "30px 0 15px 0",
        position: "relative",
        background: "var(--bg-dark)",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        overflow: "hidden",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header animate-text-coming" style={{ marginBottom: "28px" }}>
          <div className="section-eyebrow">
            <ThumbsUp size={16} />
            REAL DRIVER EXPERIENCES
          </div>
          <h2>Trusted by Enthusiasts & Executives</h2>
          <p>
            From high-output sports sedans to transcontinental SUVs and track bikes, here is what drivers report after thousands of kilometers on Sadguru tyres.
          </p>
        </div>



        {/* ROTATIONAL CAROUSEL CONTAINER WITH LEFT & RIGHT SIDE ARROWS */}
        <div style={{ position: "relative", width: "100%" }}>
          {/* Left Side Rotation Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous Review"
            title="Previous Review"
            style={{
              position: "absolute",
              left: "-18px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "rgba(13, 17, 24, 0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 20,
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.7), 0 0 15px rgba(255, 42, 42, 0.15)",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ff2a2a";
              e.currentTarget.style.borderColor = "#ff2a2a";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(255, 42, 42, 0.8)";
              e.currentTarget.style.transform = "translateY(-50%) scale(1.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(13, 17, 24, 0.9)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.7), 0 0 15px rgba(255, 42, 42, 0.15)";
              e.currentTarget.style.transform = "translateY(-50%) scale(1)";
            }}
          >
            <ChevronLeft size={22} />
          </button>

          {/* Right Side Rotation Arrow */}
          <button
            onClick={handleNext}
            aria-label="Next Review"
            title="Next Review"
            style={{
              position: "absolute",
              right: "-18px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "rgba(13, 17, 24, 0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 20,
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.7), 0 0 15px rgba(255, 42, 42, 0.15)",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ff2a2a";
              e.currentTarget.style.borderColor = "#ff2a2a";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(255, 42, 42, 0.8)";
              e.currentTarget.style.transform = "translateY(-50%) scale(1.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(13, 17, 24, 0.9)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.7), 0 0 15px rgba(255, 42, 42, 0.15)";
              e.currentTarget.style.transform = "translateY(-50%) scale(1)";
            }}
          >
            <ChevronRight size={22} />
          </button>

          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ overflow: "hidden", position: "relative", width: "100%", padding: "10px 0" }}
          >
          <div
            style={{
              display: "flex",
              gap: "24px",
              transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              transform: `translate3d(-${activeIndex * (100 / 3)}%, 0, 0)`,
            }}
            className="testimonial-carousel-track"
          >
            {displayItems.map((item, index) => {
              const realIndex = index % TESTIMONIALS_DATA.length;
              const isActive = realIndex === activeIndex;
              return (
                <div
                  key={`${item.id}-${index}`}
                  className="glass-card"
                  onClick={() => setActiveIndex(realIndex)}
                  style={{
                    flex: "0 0 calc(33.333% - 16px)",
                    minWidth: "300px",
                    padding: "26px 22px",
                    borderRadius: "18px",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    background: isActive ? "rgba(20, 26, 38, 0.92)" : "rgba(13, 17, 24, 0.75)",
                    border: isActive ? "1px solid var(--border-crimson)" : "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: isActive
                      ? "0 12px 35px rgba(0, 0, 0, 0.8), 0 0 25px rgba(255, 255, 255, 0.15)"
                      : "0 6px 20px rgba(0, 0, 0, 0.4)",
                    cursor: "pointer",
                    transition: "all 0.35s ease",
                    transform: isActive ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  {/* Header: Rotational Rating Ring Gauge + Quote Icon */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "16px",
                    }}
                  >
                    <RotationalRatingGauge score={item.rating || 5.0} id={item.id} />
                    <MessageSquareQuote size={24} color="#ff2a2a" style={{ opacity: 0.6 }} />
                  </div>

                  {/* Review Text */}
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--text-silver)",
                      lineHeight: 1.6,
                      fontStyle: "italic",
                      marginBottom: "20px",
                      flexGrow: 1,
                    }}
                  >
                    "{item.text}"
                  </p>

                  {/* Driver & Car Specs Footer */}
                  <div
                    style={{
                      paddingTop: "14px",
                      borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                      <div style={{ fontWeight: "700", fontSize: "0.95rem", color: "#ffffff" }}>
                        {item.name}
                      </div>
                      {item.verified && (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "0.72rem",
                            color: "var(--accent-cyan)",
                            fontWeight: "600",
                          }}
                        >
                          <CheckCircle size={12} /> Verified
                        </span>
                      )}
                    </div>

                    <div style={{ fontSize: "0.76rem", color: "var(--text-dim)", marginBottom: "8px" }}>
                      {item.role} • {item.location}
                    </div>

                    {/* Car and Tyre Model Tag */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        background: "rgba(255, 255, 255, 0.06)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        fontSize: "0.74rem",
                        color: "#ffffff",
                        fontWeight: "600",
                      }}
                    >
                      🚗 {item.car} | {item.tyreModel}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

        {/* Carousel Pagination Dots Indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginTop: "12px",
          }}
        >
          {TESTIMONIALS_DATA.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setActiveIndex(dotIdx)}
              style={{
                width: activeIndex === dotIdx ? "28px" : "8px",
                height: "8px",
                borderRadius: "999px",
                background: activeIndex === dotIdx ? "#ffffff" : "rgba(255, 255, 255, 0.2)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              title={`Go to review ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
