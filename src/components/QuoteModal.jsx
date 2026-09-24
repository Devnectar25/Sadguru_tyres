import React, { useState } from "react";
import { X, Calculator } from "lucide-react";

export default function QuoteModal({ tyre, currency, onClose, onQuoteSubmitted }) {
  const [quantity, setQuantity] = useState(4);
  const [includeAlignment, setIncludeAlignment] = useState(true);
  const [includeNitrogen, setIncludeNitrogen] = useState(true);
  const [email, setEmail] = useState("");
  const [vehicle, setVehicle] = useState(tyre ? tyre.bestSuitedFor.split(",")[0] : "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!tyre) return null;

  const unitPrice = currency === "USD" ? tyre.priceUSD : tyre.priceINR;
  const tyresSubtotal = unitPrice * quantity;
  const alignmentCost = includeAlignment ? (currency === "USD" ? 45 : 2200) : 0;
  const nitrogenCost = includeNitrogen ? (currency === "USD" ? 15 : 600) : 0;
  const total = tyresSubtotal + alignmentCost + nitrogenCost;

  const formatPrice = (amount) =>
    currency === "USD" ? `$${amount}` : `₹${amount.toLocaleString("en-IN")}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onQuoteSubmitted({
        tyreName: tyre.name,
        quantity,
        totalFormatted: formatPrice(total),
        email,
      });
      onClose();
    }, 600);
  };

  return (
    <div className="modal-overlay" onClick={onClose} onWheel={(e) => e.stopPropagation()}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        style={{
          maxWidth: "600px",
          padding: "32px",
          background: "#ffffff",
          borderRadius: "24px",
          color: "#0f172a",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "16px",
            borderBottom: "1px solid #e2e8f0",
            marginBottom: "24px",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                borderRadius: "9999px",
                background: "rgba(239, 68, 68, 0.1)",
                color: "#ef4444",
                fontSize: "0.75rem",
                fontWeight: "700",
                marginBottom: "6px",
              }}
            >
              <Calculator size={13} color="#ef4444" />
              INSTANT ESTIMATE
            </div>
            <h3 style={{ fontSize: "1.45rem", color: "#0f172a", fontWeight: "800" }}>
              Get Instant Quote: {tyre.name}
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "#f1f5f9",
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

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {/* Quantity Selector */}
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#0f172a", textTransform: "uppercase", fontWeight: "700", marginBottom: "8px" }}>
              Tyre Quantity
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
              {[1, 2, 4, 5].map((qty) => (
                <button
                  type="button"
                  key={qty}
                  onClick={() => setQuantity(qty)}
                  style={{
                    padding: "10px",
                    borderRadius: "9999px",
                    background: quantity === qty ? "#0f172a" : "#f1f5f9",
                    border: quantity === qty ? "none" : "1px solid #cbd5e1",
                    color: quantity === qty ? "#ffffff" : "#0f172a",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  {qty} {qty === 1 ? "Tyre" : qty === 5 ? "Set + Spare" : "Tyres"}
                </button>
              ))}
            </div>
          </div>

          {/* Add-on Services Checkboxes */}
          <div style={{ padding: "18px", borderRadius: "16px", background: "#f8fafc", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ fontSize: "0.78rem", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>
              Optional Workshop Services
            </div>

            <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", fontSize: "0.9rem", color: "#0f172a", fontWeight: "600" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="checkbox"
                  checked={includeAlignment}
                  onChange={(e) => setIncludeAlignment(e.target.checked)}
                  style={{ accentColor: "#ef4444", width: "16px", height: "16px" }}
                />
                Hunter 3D Laser Wheel Alignment
              </span>
              <strong style={{ color: "#0f172a" }}>
                +{currency === "USD" ? "$45" : "₹2,200"}
              </strong>
            </label>

            <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", fontSize: "0.9rem", color: "#0f172a", fontWeight: "600" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="checkbox"
                  checked={includeNitrogen}
                  onChange={(e) => setIncludeNitrogen(e.target.checked)}
                  style={{ accentColor: "#ef4444", width: "16px", height: "16px" }}
                />
                Ultra-Pure Nitrogen Purge & Fill
              </span>
              <strong style={{ color: "#0f172a" }}>
                +{currency === "USD" ? "$15" : "₹600"}
              </strong>
            </label>
          </div>

          {/* Contact and Car Info */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "#0f172a", textTransform: "uppercase", fontWeight: "700", marginBottom: "6px" }}>
                Vehicle Details
              </label>
              <input
                type="text"
                required
                placeholder="e.g. BMW M340i"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "12px",
                  background: "#f8fafc",
                  border: "1px solid #cbd5e1",
                  color: "#0f172a",
                  fontSize: "0.88rem",
                  fontWeight: "600",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "#0f172a", textTransform: "uppercase", fontWeight: "700", marginBottom: "6px" }}>
                Email For Quotation
              </label>
              <input
                type="email"
                required
                placeholder="driver@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "12px",
                  background: "#f8fafc",
                  border: "1px solid #cbd5e1",
                  color: "#0f172a",
                  fontSize: "0.88rem",
                  fontWeight: "600",
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* Total Breakdown Display */}
          <div
            style={{
              padding: "18px 20px",
              borderRadius: "16px",
              background: "rgba(239, 68, 68, 0.08)",
              border: "1px solid rgba(239, 68, 68, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: "0.74rem", color: "#ef4444", textTransform: "uppercase", fontWeight: "700" }}>
                Estimated Total (Includes Mounting & Balance)
              </div>
              <div style={{ fontSize: "1.7rem", fontWeight: "800", color: "#0f172a" }}>
                {formatPrice(total)}
              </div>
            </div>

            <span style={{ fontSize: "0.78rem", color: "#64748b", maxWidth: "160px", textAlign: "right" }}>
              Price locked for 14 days with Sadguru Warranty
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
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
            }}
          >
            {isSubmitting ? "Generating Official Quote..." : "Email Me This Official Quote"}
          </button>
        </form>
      </div>
    </div>
  );
}
