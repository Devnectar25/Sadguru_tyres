import React, { useState } from "react";
import { X, Lock, Mail, User, ShieldCheck, ArrowRight } from "lucide-react";

export default function LoginModal({ onClose, onLoginSuccess }) {
  const [tab, setTab] = useState("client");
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
      onWheel={(e) => e.preventDefault()}
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
        background: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 2000,
        padding: "20px",
      }}
    >
      <div
        className="modal-content"
        style={{
          maxWidth: "460px",
          width: "100%",
          margin: "auto",
          padding: 0,
          overflow: "hidden",
          background: "#ffffff",
          borderRadius: "24px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.preventDefault()}
      >
        {/* Header */}
        <div
          style={{
            padding: "24px 28px 20px",
            background: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
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
                background: "rgba(239, 68, 68, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ef4444",
              }}
            >
              <User size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.2rem", color: "#0f172a", margin: 0, fontWeight: "800" }}>
                Client Access Portal
              </h3>
              <p style={{ fontSize: "0.78rem", color: "#64748b", margin: 0 }}>
                Sadguru Tyres Luxury Member Network
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0f172a",
              cursor: "pointer",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ padding: "20px 28px 0" }}>
          <div
            style={{
              display: "flex",
              background: "#f1f5f9",
              padding: "4px",
              borderRadius: "9999px",
              border: "1px solid #e2e8f0",
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
                borderRadius: "9999px",
                border: "none",
                background: tab === "client" ? "#ef4444" : "transparent",
                color: tab === "client" ? "#ffffff" : "#475569",
                cursor: "pointer",
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
                borderRadius: "9999px",
                border: "none",
                background: tab === "dealer" ? "#ef4444" : "transparent",
                color: tab === "dealer" ? "#ffffff" : "#475569",
                cursor: "pointer",
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
                fontWeight: "700",
                color: "#0f172a",
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
                  color: "#64748b",
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
                  borderRadius: "12px",
                  background: "#f8fafc",
                  border: "1px solid #cbd5e1",
                  color: "#0f172a",
                  fontSize: "0.92rem",
                  fontWeight: "600",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <label
                style={{
                  fontSize: "0.8rem",
                  fontWeight: "700",
                  color: "#0f172a",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Password
              </label>
              <a
                href="#forgot"
                onClick={(e) => e.preventDefault()}
                style={{ fontSize: "0.76rem", color: "#ef4444", textDecoration: "underline", fontWeight: "600" }}
              >
                Forgot Password?
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
                  color: "#64748b",
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
                  borderRadius: "12px",
                  background: "#f8fafc",
                  border: "1px solid #cbd5e1",
                  color: "#0f172a",
                  fontSize: "0.92rem",
                  fontWeight: "600",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "9999px",
              border: "none",
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              color: "#ffffff",
              fontWeight: "700",
              fontSize: "0.95rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: "0 6px 20px rgba(239, 68, 68, 0.3)",
            }}
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
              borderTop: "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              fontSize: "0.76rem",
              color: "#64748b",
            }}
          >
            <ShieldCheck size={14} color="#16a34a" />
            <span>256-Bit SSL Encrypted Automotive Portal</span>
          </div>
        </form>
      </div>
    </div>
  );
}
