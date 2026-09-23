import React, { useState } from "react";
import { X, Star, Check, Calendar } from "lucide-react";

export default function TyreDetailModal({ tyre, onClose, currency, onBookTyre }) {
  const [selectedSize, setSelectedSize] = useState(tyre.availableSizes[0] || "");

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
          background: "#ffffff",
          borderRadius: "24px",
          color: "#0f172a",
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            padding: "20px 28px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#f8fafc",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                background: "#0f172a",
                color: "#ffffff",
                fontSize: "0.72rem",
                fontWeight: "700",
                padding: "4px 12px",
                borderRadius: "9999px",
                textTransform: "uppercase",
              }}
            >
              {tyre.badge}
            </span>
            <span style={{ fontSize: "0.82rem", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>
              {tyre.category}
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "#ffffff",
              border: "1px solid #cbd5e1",
              color: "#0f172a",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "36px",
            padding: "32px",
          }}
          className="modal-body-grid"
        >
          {/* Left Visual */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: "100%",
                height: "320px",
                background: "linear-gradient(180deg, #f1f5f9 0%, #f8fafc 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "20px",
                padding: "20px",
                border: "1px solid #e2e8f0",
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
                  filter: "drop-shadow(0 20px 30px rgba(15, 23, 42, 0.15))",
                }}
              />
            </div>

            {/* Price & Action */}
            <div
              style={{
                width: "100%",
                padding: "16px 20px",
                background: "#f8fafc",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <div>
                <div style={{ fontSize: "0.72rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: "600" }}>
                  Unit Price
                </div>
                <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "#0f172a" }}>
                  {displayPrice}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onBookTyre(tyre);
              }}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "9999px",
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "0.95rem",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(239, 68, 68, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <Calendar size={16} />
              Book Professional Fitting
            </button>
          </div>

          {/* Right Specs */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
              <div style={{ display: "flex", gap: "2px" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#eab308" color="#eab308" />
                ))}
              </div>
              <span style={{ fontSize: "0.86rem", fontWeight: "700", color: "#0f172a" }}>{tyre.rating}</span>
              <span style={{ fontSize: "0.78rem", color: "#64748b" }}>({tyre.reviewsCount} reviews)</span>
            </div>

            <h2 style={{ fontSize: "1.8rem", color: "#0f172a", marginBottom: "8px", fontWeight: "800" }}>
              {tyre.name}
            </h2>
            <p style={{ fontSize: "0.92rem", color: "#64748b", lineHeight: 1.55, marginBottom: "20px" }}>
              {tyre.description}
            </p>

            {/* Performance Benchmark Scores */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "#0f172a", marginBottom: "12px" }}>
                Dynamic Performance Index
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {Object.entries(tyre.scores).map(([metric, score]) => (
                  <div key={metric}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "#64748b", marginBottom: "3px", textTransform: "capitalize", fontWeight: "600" }}>
                      <span>{metric.replace(/([A-Z])/g, " $1")}</span>
                      <span style={{ color: "#0f172a", fontWeight: "700" }}>{score} / 100</span>
                    </div>
                    <div style={{ height: "6px", background: "#f1f5f9", borderRadius: "3px", overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${score}%`,
                          background: score > 94 ? "#ef4444" : "#0284c7",
                          borderRadius: "3px",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "#0f172a", marginBottom: "10px" }}>
                Engineering Highlights
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {tyre.highlights.map((point, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "0.84rem", color: "#334155" }}>
                    <Check size={14} color="#ef4444" style={{ marginTop: "3px", flexShrink: 0 }} />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <div style={{ fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "#0f172a", marginBottom: "8px" }}>
                Available Rim Sizes:
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {tyre.availableSizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "9999px",
                      fontSize: "0.8rem",
                      fontWeight: "700",
                      background: selectedSize === sz ? "#0f172a" : "#ffffff",
                      border: selectedSize === sz ? "none" : "1px solid #cbd5e1",
                      color: selectedSize === sz ? "#ffffff" : "#0f172a",
                      cursor: "pointer",
                    }}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
