import React, { useState } from "react";
import { Lock, Mail, ShieldCheck, ArrowRight, Eye, EyeOff, KeyRound } from "lucide-react";

export default function AdminLogin({ onLoginSuccess, onReturnToSite }) {
  const [username, setUsername] = useState("admin@sadgurutyres.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!username || !password) {
      setErrorMessage("Please enter both username and password.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess();
    }, 700);
  };

  const handleDemoFill = () => {
    setUsername("admin@sadgurutyres.com");
    setPassword("admin123");
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess();
    }, 500);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "var(--font-body)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Ambient Glows */}
      <div
        style={{
          position: "absolute",
          top: "-150px",
          right: "-150px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(239, 68, 68, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-150px",
          left: "-150px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(15, 23, 42, 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Main Login Card */}
      <div
        style={{
          maxWidth: "440px",
          width: "100%",
          background: "#ffffff",
          borderRadius: "24px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 20px 50px -10px rgba(15, 23, 42, 0.1)",
          overflow: "hidden",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Top Brand Banner Header */}
        <div
          style={{
            padding: "36px 32px 24px 32px",
            background: "#ffffff",
            borderBottom: "1px solid #f1f5f9",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "#0f172a",
              border: "3px solid #ef4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px auto",
              boxShadow: "0 8px 20px rgba(239, 68, 68, 0.25)",
            }}
          >
            <img
              src="/images/sgt_logo.png"
              alt="SGT Logo"
              style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
            />
          </div>

          <h2 style={{ fontSize: "1.4rem", fontWeight: "900", color: "#0f172a", margin: "0 0 6px 0", letterSpacing: "-0.02em" }}>
            Sadguru Tyres
          </h2>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "999px", background: "#fef2f2", border: "1px solid #fecaca", fontSize: "0.74rem", fontWeight: "700", color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            <ShieldCheck size={14} />
            <span>ADMINISTRATOR LOGIN PORTAL</span>
          </div>
        </div>

        {/* Form Body */}
        <div style={{ padding: "32px" }}>
          {errorMessage && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "10px",
                background: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#dc2626",
                fontSize: "0.82rem",
                fontWeight: "600",
                marginBottom: "20px",
              }}
            >
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "8px" }}>
                Admin Username or Email
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={18} color="#94a3b8" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@sadgurutyres.com"
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 42px",
                    borderRadius: "12px",
                    border: "1px solid #cbd5e1",
                    background: "#f8fafc",
                    color: "#0f172a",
                    fontSize: "0.92rem",
                    fontWeight: "500",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "8px" }}>
                Admin Access Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock size={18} color="#94a3b8" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  style={{
                    width: "100%",
                    padding: "12px 42px 12px 42px",
                    borderRadius: "12px",
                    border: "1px solid #cbd5e1",
                    background: "#f8fafc",
                    color: "#0f172a",
                    fontSize: "0.92rem",
                    fontWeight: "500",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    color: "#94a3b8",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Quick Demo Autofill Hint */}
            <div
              style={{
                padding: "12px 14px",
                borderRadius: "12px",
                background: "#f1f5f9",
                border: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ fontSize: "0.78rem", color: "#475569" }}>
                <strong>Demo Credentials:</strong> <br />
                admin / admin123
              </div>
              <button
                type="button"
                onClick={handleDemoFill}
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  background: "#ffffff",
                  color: "#ef4444",
                  fontWeight: "700",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                }}
              >
                Auto Login
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "14px 20px",
                borderRadius: "999px",
                border: "none",
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "0.95rem",
                cursor: "pointer",
                boxShadow: "0 8px 20px rgba(239, 68, 68, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.2s ease",
              }}
            >
              {isSubmitting ? (
                <span>Authenticating Access...</span>
              ) : (
                <>
                  <span>Sign In to Admin Panel</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Return to Live Site */}
          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <button
              type="button"
              onClick={onReturnToSite}
              style={{
                background: "transparent",
                border: "none",
                color: "#64748b",
                fontWeight: "600",
                fontSize: "0.85rem",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Return to Live Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
