import React, { useState } from "react";
import { X, Lock, Mail, User, ShieldCheck, ArrowRight, KeyRound } from "lucide-react";

export default function LoginModal({ onClose, onLoginSuccess }) {
  const [tab, setTab] = useState("client"); // "client" | "dealer"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(tab === "client" ? "Member Account" : "Authorized Dealer Portal");
      onClose();
    }, 800);
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(5, 6, 8, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        zIndex: 2000,
        padding: "20px",
      }}
    >
      <div
        className="modal-content glass-panel"
        style={{
          maxWidth: "460px",
          width: "100%",
          margin: "auto",
          padding: 0,
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 255, 255, 0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Header */}
        <div
          style={{
            padding: "24px 28px 20px",
            background: "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              <User size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.2rem", color: "#ffffff", margin: 0, fontWeight: "700" }}>
                Client Access Portal
              </h3>
              <p style={{ fontSize: "0.78rem", color: "var(--text-dim)", margin: 0 }}>
                Sadguru Tyres Luxury Member Network
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-silver)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ padding: "20px 28px 0" }}>
          <div
            style={{
              display: "flex",
              background: "rgba(0, 0, 0, 0.4)",
              padding: "4px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <button
              type="button"
              onClick={() => setTab("client")}
              style={{
                flex: 1,
                padding: "8px 0",
                fontSize: "0.82rem",
                fontWeight: "700",
                borderRadius: "8px",
                border: "none",
                background: tab === "client" ? "#ffffff" : "transparent",
                color: tab === "client" ? "#07080b" : "var(--text-dim)",
                cursor: "pointer",
                transition: "all 0.25s",
              }}
            >
              Member Login
            </button>
            <button
              type="button"
              onClick={() => setTab("dealer")}
              style={{
                flex: 1,
                padding: "8px 0",
                fontSize: "0.82rem",
                fontWeight: "700",
                borderRadius: "8px",
                border: "none",
                background: tab === "dealer" ? "#ffffff" : "transparent",
                color: tab === "dealer" ? "#07080b" : "var(--text-dim)",
                cursor: "pointer",
                transition: "all 0.25s",
              }}
            >
              Dealer / Fleet Portal
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: "24px 28px 28px" }}>
          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.8rem",
                fontWeight: "600",
                color: "var(--text-silver)",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {tab === "client" ? "Email or Mobile Number" : "Dealer ID / Business Email"}
            </label>
            <div style={{ position: "relative" }}>
              <Mail
                size={18}
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-dim)",
                }}
              />
              <input
                type="text"
                required
                placeholder={tab === "client" ? "driver@sadgurutyres.com" : "D-84920@dealer.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px 12px 44px",
                  borderRadius: "10px",
                  background: "rgba(15, 20, 28, 0.9)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#ffffff",
                  fontSize: "0.92rem",
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#ffffff")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.15)")}
              />
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <label
                style={{
                  fontSize: "0.8rem",
                  fontWeight: "600",
                  color: "var(--text-silver)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Password
              </label>
              <a
                href="#forgot"
                onClick={(e) => e.preventDefault()}
                style={{ fontSize: "0.76rem", color: "var(--text-dim)", textDecoration: "underline" }}
              >
                Forgot Code?
              </a>
            </div>
            <div style={{ position: "relative" }}>
              <Lock
                size={18}
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-dim)",
                }}
              />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px 12px 44px",
                  borderRadius: "10px",
                  background: "rgba(15, 20, 28, 0.9)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#ffffff",
                  fontSize: "0.92rem",
                  outline: "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#ffffff")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.15)")}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(135deg, #eba763, #cf7a30)",
              color: "#07080b",
              fontWeight: "700",
              fontSize: "0.95rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: "0 8px 25px rgba(255, 255, 255, 0.2)",
              transition: "all 0.25s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In To Portal</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>

          <div
            style={{
              marginTop: "20px",
              paddingTop: "16px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              fontSize: "0.76rem",
              color: "var(--text-dim)",
            }}
          >
            <ShieldCheck size={14} color="#34D399" />
            <span>256-Bit SSL Encrypted Automotive Portal</span>
          </div>
        </form>
      </div>
    </div>
  );
}
