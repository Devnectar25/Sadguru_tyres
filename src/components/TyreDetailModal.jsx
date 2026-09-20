import React, { useState } from "react";
import { X, Star, ShieldCheck, Check, Fuel, Volume2, Gauge, Award, Calendar } from "lucide-react";

export default function TyreDetailModal({ tyre, onClose, currency, onBookTyre }) {
  const [selectedSize, setSelectedSize] = useState(tyre.availableSizes[0] || "");
  const [activeTab, setActiveTab] = useState("overview");

  if (!tyre) return null;

  const displayPrice =
    currency === "USD" ? `$${tyre.priceUSD}` : `₹${tyre.priceINR.toLocaleString("en-IN")}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "880px",
          padding: "0",
          overflow: "hidden",
        }}
      >
        {/* Modal Header Bar */}
        <div
          style={{
            padding: "20px 28px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(10, 13, 19, 0.95)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span className="badge-pill">{tyre.badge}</span>
            <span style={{ fontSize: "0.82rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {tyre.category}
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "var(--text-dim)",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "var(--border-crimson)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-dim)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Inner Body */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "36px",
            padding: "32px",
          }}
          className="modal-body-grid"
        >
          {/* Left: Product Visual & Fitment */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: "100%",
                height: "320px",
                background: "radial-gradient(circle at 50% 50%, rgba(255, 42, 42, 0.12) 0%, transparent 75%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "16px",
                padding: "20px",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                marginBottom: "20px",
              }}
            >
              <img
                src={tyre.image}
                alt={tyre.name}
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.9))",
                }}
              />
            </div>

            {/* Price & Action Row */}
            <div
              style={{
                width: "100%",
                padding: "16px 20px",
                background: "rgba(0, 0, 0, 0.4)",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  Unit Price
                </div>
                <div style={{ fontSize: "1.5rem", fontWeight: "700", fontFamily: "var(--font-body)", letterSpacing: "normal", color: "#fff" }}>
                  {displayPrice}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onBookTyre(tyre);
              }}
              className="btn btn-primary"
              style={{ width: "100%", padding: "14px" }}
            >
              <Calendar size={16} />
              Book Professional Fitting
            </button>
          </div>

          {/* Right: Detailed Tabs & Engineering Specs */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
              <div style={{ display: "flex", gap: "2px" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#FFB800" color="#FFB800" />
                ))}
              </div>
              <span style={{ fontSize: "0.86rem", fontWeight: "700", color: "#fff" }}>{tyre.rating}</span>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>({tyre.reviewsCount} reviews)</span>
            </div>

            <h2 style={{ fontSize: "1.8rem", color: "#ffffff", marginBottom: "8px" }}>
              {tyre.name}
            </h2>
            <p style={{ fontSize: "0.92rem", color: "var(--text-dim)", lineHeight: 1.55, marginBottom: "20px" }}>
              {tyre.description}
            </p>

            {/* Performance Benchmark Scores */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "#fff", marginBottom: "12px" }}>
                Dynamic Performance Index
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {Object.entries(tyre.scores).map(([metric, score]) => (
                  <div key={metric}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--text-dim)", marginBottom: "3px", textTransform: "capitalize" }}>
                      <span>{metric.replace(/([A-Z])/g, " $1")}</span>
                      <span style={{ color: "#fff", fontWeight: "700" }}>{score} / 100</span>
                    </div>
                    <div style={{ height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px", overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${score}%`,
                          background: score > 94 ? "var(--accent-crimson)" : "var(--accent-cyan)",
                          borderRadius: "3px",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Highlights */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "#fff", marginBottom: "10px" }}>
                Engineering Highlights
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {tyre.highlights.map((point, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "0.84rem", color: "var(--text-silver)" }}>
                    <Check size={14} color="var(--accent-crimson)" style={{ marginTop: "3px", flexShrink: 0 }} />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Fitments Selector */}
            <div>
              <div style={{ fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "#fff", marginBottom: "8px" }}>
                Available Rim Sizes:
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {tyre.availableSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      background: selectedSize === sz ? "#ffffff" : "rgba(255, 255, 255, 0.05)",
                      border: selectedSize === sz ? "1px solid #ffffff" : "1px solid rgba(255, 255, 255, 0.1)",
                      color: selectedSize === sz ? "#07080b" : "var(--text-silver)",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {sz}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "8px" }}>
                Recommended for: <strong style={{ color: "var(--text-silver)" }}>{tyre.bestSuitedFor}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .modal-body-grid {
            grid-template-columns: 1fr !important;
            padding: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
