import React, { useState } from "react";
import { Phone, Mail, MapPin, ShieldCheck, Check, Send } from "lucide-react";

export default function Footer({ onOpenFinder, onNavigateHome }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
      }, 4000);
    }
  };

  const handleLogoClick = () => {
    if (onNavigateHome) onNavigateHome();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, 50);
  };

  return (
    <footer
      id="contact"
      style={{
        background: "#EAF2FC",
        position: "relative",
        paddingTop: "32px",
        paddingBottom: "16px",
        color: "#334155",
        borderTop: "1px solid #d8e5f3",
      }}
    >
      <div className="container">
        {/* Top Grid: 4 Columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr 1fr 1.3fr",
            gap: "32px",
            marginBottom: "20px",
          }}
          className="footer-grid"
        >
          {/* Column 1: Brand Logo & Info */}
          <div>
            <div
              onClick={handleLogoClick}
              role="button"
              tabIndex={0}
              aria-label="Sadguru Tyres - Back to Top"
              title="Back to Top"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
                cursor: "pointer",
                transition: "transform 0.2s ease, opacity 0.2s ease",
                userSelect: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.85";
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "#0f172a",
                  padding: "3px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 12px rgba(239, 68, 68, 0.4)",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/images/sgt_logo.png"
                  alt="Sadguru Tyres Logo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: "800", color: "#0f172a", letterSpacing: "0.05em" }}>
                  SADGURU <span style={{ color: "#ef4444" }}>TYRES</span>
                </div>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.16em", color: "#64748b", textTransform: "uppercase" }}>
                  TOUGH • PERFORMANCE • TRUST
                </div>
              </div>
            </div>

            <p style={{ fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "20px", color: "#475569", maxWidth: "340px" }}>
              Premium tyre sales & precision 3D alignment center. Built for maximum road grip, whisper-quiet cruising, and complete driving confidence.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ background: "#ffffff", border: "1px solid #cbd5e1", color: "#0f172a", padding: "6px 12px", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <ShieldCheck size={14} color="#ef4444" /> ISO 9001:2026
              </span>
              <span style={{ background: "#ffffff", border: "1px solid #cbd5e1", color: "#0f172a", padding: "6px 12px", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <ShieldCheck size={14} color="#0f172a" /> BIS / ISI Certified
              </span>
            </div>
          </div>

          {/* Column 2: Tyre Collections */}
          <div>
            <h4
              style={{
                fontSize: "0.92rem",
                color: "#0f172a",
                marginBottom: "18px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: "700",
              }}
            >
              Tyre Collections
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.88rem" }}>
              <li><a href="#products" className="footer-link">Passenger Car Tyres</a></li>
              <li><a href="#products" className="footer-link">SUV & 4x4 Tyres</a></li>
              <li><a href="#products" className="footer-link">Commercial Vehicle Tyres</a></li>
              <li><a href="#products" className="footer-link">Two-Wheeler Tyres</a></li>
              <li><a href="#products" className="footer-link">All-Season Tyres</a></li>
            </ul>
          </div>

          {/* Column 3: Workshop Services */}
          <div>
            <h4
              style={{
                fontSize: "0.92rem",
                color: "#0f172a",
                marginBottom: "18px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: "700",
              }}
            >
              Technical Services
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.88rem" }}>
              <li><a href="#services" className="footer-link">3D Wheel Alignment</a></li>
              <li><a href="#services" className="footer-link">Robotic Wheel Balancing</a></li>
              <li><a href="#services" className="footer-link">Wheel Care & Repair</a></li>
              <li><a href="#services" className="footer-link">Nitrogen Filling</a></li>
              <li><a href="#services" className="footer-link">TPMS Services</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Hotline */}
          <div>
            <h4
              style={{
                fontSize: "0.92rem",
                color: "#0f172a",
                marginBottom: "18px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: "700",
              }}
            >
              Concierge & Hotline
            </h4>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.88rem", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#0f172a", fontWeight: "600" }}>
                <Phone size={15} color="#ef4444" />
                <span>+91 1800 15 11 00</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#334155" }}>
                <Mail size={15} color="#0f172a" />
                <span>care@sadgurutyres.com</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#334155" }}>
                <MapPin size={15} color="#0f172a" />
                <span>Mon - Sat 9:00 AM - 8:00 PM</span>
              </div>
            </div>

            {/* Newsletter form */}
            <form onSubmit={handleNewsletterSubmit}>
              <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: "600", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Subscribe for updates
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    background: "#ffffff",
                    border: "1px solid #cbd5e1",
                    borderRadius: "9999px",
                    padding: "10px 16px",
                    color: "#0f172a",
                    fontSize: "0.85rem",
                    outline: "none",
                    flexGrow: 1,
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "10px 18px",
                    borderRadius: "9999px",
                    background: "#ef4444",
                    color: "#ffffff",
                    border: "none",
                    cursor: "pointer",
                    transition: "var(--transition-smooth)",
                  }}
                  title="Subscribe"
                >
                  <Send size={15} />
                </button>
              </div>
              {subscribed && (
                <div style={{ fontSize: "0.78rem", color: "#16a34a", marginTop: "6px", display: "flex", alignItems: "center", gap: "4px", fontWeight: "600" }}>
                  <Check size={12} /> Subscribed to updates!
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: "14px",
            borderTop: "1px solid #d8e5f3",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            fontSize: "0.8rem",
            color: "#334155",
          }}
        >
          <div>
            © {new Date().getFullYear()} Sadguru Tyres. All rights reserved.
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            <a href="#hero" className="footer-sublink">Privacy Policy</a>
            <a href="#hero" className="footer-sublink">Terms & Conditions</a>
            <a href="#hero" className="footer-sublink">Sitemap</a>
          </div>

          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
            {/* Facebook Icon */}
            <a href="#hero" style={{ color: "#475569" }} aria-label="Facebook">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            {/* Instagram Icon */}
            <a href="#hero" style={{ color: "#475569" }} aria-label="Instagram">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            {/* YouTube Icon */}
            <a href="#hero" style={{ color: "#475569" }} aria-label="YouTube">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          color: #475569;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        .footer-link:hover {
          color: #ef4444;
          padding-left: 4px;
        }
        .footer-sublink {
          color: #64748b;
          transition: color 0.2s;
        }
        .footer-sublink:hover {
          color: #ef4444;
        }
        @media (max-width: 980px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
