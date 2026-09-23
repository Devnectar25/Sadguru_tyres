import React, { useState, useEffect, useRef } from "react";
import { TYRES_DATA } from "../data/tyresData";
import { Search, X, ChevronRight } from "lucide-react";

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
          background: "#ffffff",
          borderRadius: "24px",
          color: "#0f172a",
        }}
      >
        {/* Search Input Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            paddingBottom: "18px",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <Search size={22} color="#ef4444" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by tyre name, size (e.g. 245/40 R19) or car..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#0f172a",
              fontSize: "1.1rem",
              fontWeight: "600",
            }}
          />
          <button
            onClick={onClose}
            style={{
              background: "#f1f5f9",
              border: "1px solid #cbd5e1",
              color: "#0f172a",
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
            <div style={{ textAlign: "center", padding: "40px 20px", color: "#64748b" }}>
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
                    borderRadius: "14px",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#ffffff";
                    e.currentTarget.style.borderColor = "#ef4444";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(239, 68, 68, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f8fafc";
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <img
                    src={tyre.image}
                    alt={tyre.name}
                    style={{ width: "50px", height: "50px", objectFit: "contain" }}
                  />

                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontWeight: "800", color: "#0f172a", fontSize: "0.98rem" }}>
                        {tyre.name}
                      </span>
                      <span
                        style={{
                          background: "#0f172a",
                          color: "#ffffff",
                          fontSize: "0.68rem",
                          fontWeight: "700",
                          padding: "2px 8px",
                          borderRadius: "9999px",
                        }}
                      >
                        {tyre.badge}
                      </span>
                    </div>

                    <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "2px" }}>
                      {tyre.category} • Speed {tyre.specs.speedRating}
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: "800", color: "#0f172a", fontSize: "1.1rem" }}>
                      {displayPrice}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#ef4444", fontWeight: "700", display: "flex", alignItems: "center", gap: "2px", justifyContent: "flex-end" }}>
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
            borderTop: "1px solid #e2e8f0",
            fontSize: "0.75rem",
            color: "#64748b",
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
