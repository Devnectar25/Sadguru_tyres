import React, { useState } from "react";
import { X, Calculator, ShieldCheck, Check, Send, Sparkles } from "lucide-react";

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
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "600px",
          padding: "32px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "16px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            marginBottom: "24px",
          }}
        >
          <div>
            <div className="badge-pill" style={{ marginBottom: "6px" }}>
              <Calculator size={13} color="var(--accent-crimson)" />
              INSTANT DEMO ESTIMATE
            </div>
            <h3 style={{ fontSize: "1.45rem", color: "#fff" }}>
              Get Instant Quote: {tyre.name}
            </h3>
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
            }}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {/* Quantity Selector */}
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-silver)", textTransform: "uppercase", fontWeight: "600", marginBottom: "8px" }}>
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
                    borderRadius: "8px",
                    background: quantity === qty ? "#ffffff" : "rgba(255, 255, 255, 0.05)",
                    border: quantity === qty ? "1px solid #ffffff" : "1px solid rgba(255, 255, 255, 0.1)",
                    color: quantity === qty ? "#07080b" : "var(--text-silver)",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {qty} {qty === 1 ? "Tyre" : qty === 5 ? "Set + Spare" : "Tyres"}
                </button>
              ))}
            </div>
          </div>

          {/* Add-on Services Checkboxes */}
          <div style={{ padding: "16px", borderRadius: "10px", background: "rgba(0, 0, 0, 0.3)", border: "1px solid rgba(255, 255, 255, 0.06)", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "600" }}>
              Optional Workshop Services
            </div>

            <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", fontSize: "0.88rem", color: "var(--text-silver)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="checkbox"
                  checked={includeAlignment}
                  onChange={(e) => setIncludeAlignment(e.target.checked)}
                  style={{ accentColor: "var(--accent-crimson)", width: "16px", height: "16px" }}
                />
                Hunter 3D Laser Wheel Alignment
              </span>
              <strong style={{ color: "#ffffff" }}>
                +{currency === "USD" ? "$45" : "₹2,200"}
              </strong>
            </label>

            <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", fontSize: "0.88rem", color: "var(--text-silver)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="checkbox"
                  checked={includeNitrogen}
                  onChange={(e) => setIncludeNitrogen(e.target.checked)}
                  style={{ accentColor: "var(--accent-crimson)", width: "16px", height: "16px" }}
                />
                Ultra-Pure Nitrogen Purge & Fill
              </span>
              <strong style={{ color: "#ffffff" }}>
                +{currency === "USD" ? "$15" : "₹600"}
              </strong>
            </label>
          </div>

          {/* Contact and Car Info */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-silver)", textTransform: "uppercase", fontWeight: "600", marginBottom: "6px" }}>
                Vehicle Details
              </label>
              <input
                type="text"
                required
                placeholder="e.g. BMW M340i, Defender"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  background: "#131722",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#ffffff",
                  fontSize: "0.88rem",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-silver)", textTransform: "uppercase", fontWeight: "600", marginBottom: "6px" }}>
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
                  borderRadius: "8px",
                  background: "#131722",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#ffffff",
                  fontSize: "0.88rem",
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* Total Breakdown Display */}
          <div
            style={{
              padding: "18px 20px",
              borderRadius: "12px",
              background: "rgba(255, 42, 42, 0.08)",
              border: "1px solid rgba(255, 42, 42, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: "0.74rem", color: "var(--accent-crimson-light)", textTransform: "uppercase", fontWeight: "700" }}>
                Estimated Total (Includes Mounting & Balance)
              </div>
              <div style={{ fontSize: "1.7rem", fontWeight: "800", color: "#ffffff", fontFamily: "var(--font-heading)" }}>
                {formatPrice(total)}
              </div>
            </div>

            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", maxWidth: "160px", textAlign: "right" }}>
              Price locked for 14 days with Sadguru Warranty
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
            style={{ width: "100%", padding: "14px" }}
          >
            {isSubmitting ? "Generating Official Quote..." : "Email Me This Official Quote"}
          </button>
        </form>
      </div>
    </div>
  );
}
