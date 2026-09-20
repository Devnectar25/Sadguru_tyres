import React, { useState, useEffect, useRef } from "react";
import { TYRES_DATA } from "../data/tyresData";
import { Search, X, ChevronRight, Disc, ArrowRight } from "lucide-react";

export default function SearchModal({ onClose, onSelectTyre, currency }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const results = TYRES_DATA.filter((tyre) => {
    const q = query.toLowerCase();
    return (
      tyre.name.toLowerCase().includes(q) ||
      tyre.category.toLowerCase().includes(q) ||
      tyre.badge.toLowerCase().includes(q) ||
      tyre.bestSuitedFor.toLowerCase().includes(q) ||
      tyre.availableSizes.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "650px",
          padding: "24px",
        }}
      >
        {/* Search Input Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            paddingBottom: "18px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Search size={22} color="var(--accent-crimson)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by tyre name, size (e.g. 245/40 R19) or car (BMW, Tesla, Porsche)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#ffffff",
              fontSize: "1.1rem",
              fontFamily: "inherit",
            }}
          />
          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "none",
              color: "var(--text-muted)",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Search Results List */}
        <div
          style={{
            maxHeight: "420px",
            overflowY: "auto",
            paddingTop: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {results.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-muted)" }}>
              No tyres matching "{query}". Try searching for "Sport", "EV", "R19", or "Touring".
            </div>
          ) : (
            results.map((tyre) => {
              const displayPrice =
                currency === "USD" ? `$${tyre.priceUSD}` : `₹${tyre.priceINR.toLocaleString("en-IN")}`;

              return (
                <div
                  key={tyre.id}
                  onClick={() => {
                    onClose();
                    onSelectTyre(tyre);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255, 42, 42, 0.08)";
                    e.currentTarget.style.borderColor = "rgba(255, 42, 42, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                  }}
                >
                  <img
                    src={tyre.image}
                    alt={tyre.name}
                    style={{ width: "50px", height: "50px", objectFit: "contain" }}
                  />

                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontWeight: "700", color: "#ffffff", fontSize: "0.98rem" }}>
                        {tyre.name}
                      </span>
                      <span className="badge-pill" style={{ fontSize: "0.68rem", padding: "2px 8px" }}>
                        {tyre.badge}
                      </span>
                    </div>

                    <div style={{ fontSize: "0.8rem", color: "var(--text-dim)", marginTop: "2px" }}>
                      {tyre.category} • Speed {tyre.specs.speedRating} • Wet Grip {tyre.specs.wetGrip}
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: "800", color: "#ffffff", fontSize: "1.1rem" }}>
                      {displayPrice}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--accent-crimson)", display: "flex", alignItems: "center", gap: "2px", justifyContent: "flex-end" }}>
                      View <ChevronRight size={12} />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut hint */}
        <div
          style={{
            paddingTop: "14px",
            marginTop: "14px",
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Press ESC to close</span>
          <span>Tip: Filter by rim size like "20" or "R19"</span>
        </div>
      </div>
    </div>
  );
}
