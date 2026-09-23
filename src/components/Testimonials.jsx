import React, { useState, useEffect } from "react";
import { TESTIMONIALS_DATA } from "../data/testimonialsData";
import { Star, MessageSquareQuote, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

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
        padding: "36px 0",
        position: "relative",
        background: "#ffffff",
        borderTop: "1px solid #e2e8f0",
        borderBottom: "1px solid #e2e8f0",
        overflow: "hidden",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: "36px" }}>
          <div className="section-eyebrow">
            OUR HAPPY CUSTOMERS
          </div>
          <h2>Trusted by Enthusiasts & Executives</h2>
          <p>
            Real stories, real journeys. Our customers trust us for safety, silence and performance.
          </p>
        </div>

        {/* Carousel Container */}
        <div style={{ position: "relative", width: "100%" }}>
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous Review"
            style={{
              position: "absolute",
              left: "-18px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "#ffffff",
              border: "1px solid #cbd5e1",
              color: "#0f172a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 20,
              boxShadow: "0 6px 20px rgba(15, 23, 42, 0.12)",
              transition: "var(--transition-smooth)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ef4444";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.borderColor = "#ef4444";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.color = "#0f172a";
              e.currentTarget.style.borderColor = "#cbd5e1";
            }}
          >
            <ChevronLeft size={22} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            aria-label="Next Review"
            style={{
              position: "absolute",
              right: "-18px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "#ffffff",
              border: "1px solid #cbd5e1",
              color: "#0f172a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 20,
              boxShadow: "0 6px 20px rgba(15, 23, 42, 0.12)",
              transition: "var(--transition-smooth)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ef4444";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.borderColor = "#ef4444";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#ffffff";
              e.currentTarget.style.color = "#0f172a";
              e.currentTarget.style.borderColor = "#cbd5e1";
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
                    onClick={() => setActiveIndex(realIndex)}
                    style={{
                      flex: "0 0 calc(33.333% - 16px)",
                      minWidth: "300px",
                      padding: "28px 24px",
                      borderRadius: "20px",
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      background: "#ffffff",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 6px 20px rgba(15, 23, 42, 0.04)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {/* Stars & Quote */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "16px",
                      }}
                    >
                      <div style={{ display: "flex", gap: "3px" }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} fill="#eab308" color="#eab308" />
                        ))}
                      </div>
                      <MessageSquareQuote size={24} color="#94a3b8" style={{ opacity: 0.8 }} />
                    </div>

                    {/* Review Text */}
                    <p
                      style={{
                        fontSize: "0.92rem",
                        color: "#334155",
                        lineHeight: 1.6,
                        fontStyle: "italic",
                        marginBottom: "20px",
                        flexGrow: 1,
                      }}
                    >
                      "{item.text}"
                    </p>

                    {/* Driver Profile */}
                    <div
                      style={{
                        paddingTop: "16px",
                        borderTop: "1px solid #f1f5f9",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "42px",
                          height: "42px",
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                          color: "#ffffff",
                          fontWeight: "800",
                          fontSize: "0.9rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {item.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div>
                        <div style={{ fontWeight: "700", fontSize: "0.95rem", color: "#0f172a" }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: "0.76rem", color: "#64748b" }}>
                          {item.location}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginTop: "20px",
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
                background: activeIndex === dotIdx ? "#0f172a" : "#cbd5e1",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
