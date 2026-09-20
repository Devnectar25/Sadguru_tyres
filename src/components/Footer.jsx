import React, { useState } from "react";
import { Disc, Phone, Mail, MapPin, ShieldCheck, Check, Send, Heart } from "lucide-react";

export default function Footer({ onOpenFinder }) {
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

  return (
    <footer
      id="contact"
      style={{
        background: "linear-gradient(180deg, #07080b 0%, #040507 100%)",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        position: "relative",
        paddingTop: "65px",
        paddingBottom: "36px",
        color: "var(--text-dim)",
      }}
    >
      {/* Subtle Crimson/Titanium Accent Line at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255, 42, 42, 0.6), rgba(255, 255, 255, 0.4), transparent)",
        }}
      />

      <div className="container">
        {/* Top Grid: 4 Columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr 1fr 1.3fr",
            gap: "42px",
            marginBottom: "48px",
          }}
          className="footer-grid"
        >
          {/* Column 1: Brand Logo & Badges */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "#ffffff",
                  padding: "3px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 15px rgba(255, 42, 42, 0.4)",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/images/sgt_logo.png"
                  alt="Sadguru Tyres SGT Logo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: "800", color: "#fff" }}>
                  SADGURU <span style={{ color: "#ff2a2a", textShadow: "0 0 10px rgba(255, 42, 42, 0.4)" }}>TYRES</span>
                </div>
                <div style={{ fontSize: "0.62rem", letterSpacing: "0.18em", color: "var(--text-muted)", textTransform: "uppercase" }}>
                  PRECISION • PERFORMANCE • SAFETY
                </div>
              </div>
            </div>

            <p style={{ fontSize: "0.88rem", lineHeight: 1.55, marginBottom: "18px", color: "var(--text-dim)", maxWidth: "340px" }}>
              Premium tyre sales & precision 3D alignment center. Engineered for maximum road grip, whisper-quiet cruising, and complete driving confidence.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <span className="badge-silver" style={{ fontSize: "0.72rem", padding: "5px 12px" }}>
                <ShieldCheck size={13} color="#ffffff" /> ISO 9001:2026
              </span>
              <span className="badge-silver" style={{ fontSize: "0.72rem", padding: "5px 12px" }}>
                <ShieldCheck size={13} color="#ff2a2a" /> BIS / ISI Certified
              </span>
            </div>
          </div>

          {/* Column 2: Tyre Collections */}
          <div>
            <h4
              style={{
                fontSize: "0.92rem",
                color: "#ffffff",
                marginBottom: "16px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: "700",
              }}
            >
              Tyre Collections
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.88rem" }}>
              <li><a href="#products" className="footer-link">ApexSport Pro 4S (UHP)</a></li>
              <li><a href="#products" className="footer-link">ApexMoto Corsa GP (Bike)</a></li>
              <li><a href="#products" className="footer-link">GrandTouring GT Silent</a></li>
              <li><a href="#products" className="footer-link">TerraForce All-Terrain X</a></li>
              <li><a href="#products" className="footer-link">VoltDrive EV AeroMax</a></li>
            </ul>
          </div>

          {/* Column 3: Workshop Services */}
          <div>
            <h4
              style={{
                fontSize: "0.92rem",
                color: "#ffffff",
                marginBottom: "16px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: "700",
              }}
            >
              Technical Services
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.88rem" }}>
              <li><a href="#services" className="footer-link">3D Laser Wheel Alignment</a></li>
              <li><a href="#services" className="footer-link">Dynamic Wheel Balancing</a></li>
              <li><a href="#services" className="footer-link">Touchless Rim Mounting</a></li>
              <li><a href="#services" className="footer-link">TPMS Sensor Calibration</a></li>
              <li><a href="#services" className="footer-link">Pure Nitrogen Inflation</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div>
            <h4
              style={{
                fontSize: "0.92rem",
                color: "#ffffff",
                marginBottom: "16px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: "700",
              }}
            >
              Concierge & Hotline
            </h4>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.86rem", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#ffffff" }}>
                <Phone size={15} color="#ff2a2a" />
                <span>+91 98220 00000 / 1800-SADGURU</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-silver)" }}>
                <Mail size={15} color="var(--accent-cyan)" />
                <span>performance@sadgurutyres.com</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-silver)" }}>
                <MapPin size={15} color="#ffffff" />
                <span>Mumbai / Pune Expressway Hub</span>
              </div>
            </div>

            {/* Newsletter form */}
            <form onSubmit={handleNewsletterSubmit}>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: "600", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Subscribe to Newsletter
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "8px",
                    padding: "9px 12px",
                    color: "#ffffff",
                    fontSize: "0.85rem",
                    outline: "none",
                    flexGrow: 1,
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    padding: "9px 16px",
                    borderRadius: "8px",
                    background: "#ffffff",
                    color: "#07080b",
                  }}
                  title="Subscribe"
                >
                  <Send size={15} />
                </button>
              </div>
              {subscribed && (
                <div style={{ fontSize: "0.78rem", color: "#10B981", marginTop: "6px", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Check size={12} /> Subscribed to Sadguru updates!
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Legal */}
        <div
          style={{
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "14px",
            fontSize: "0.8rem",
            color: "var(--text-muted)",
          }}
        >
          <div>
            © {new Date().getFullYear()} Sadguru Tyres Ltd. All Rights Reserved.
          </div>

          <div style={{ display: "flex", gap: "18px" }}>
            <a href="#hero" className="footer-sublink">Privacy Policy</a>
            <a href="#hero" className="footer-sublink">Warranty Terms</a>
            <a href="#hero" className="footer-sublink">Cookie Settings</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          color: var(--text-dim);
          transition: all 0.2s ease;
        }
        .footer-link:hover {
          color: #ffffff;
          padding-left: 4px;
        }
        .footer-sublink {
          color: var(--text-muted);
          transition: color 0.2s;
        }
        .footer-sublink:hover {
          color: #ffffff;
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
