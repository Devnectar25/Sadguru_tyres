import React, { useState } from "react";
import { Phone, Mail, MapPin, ShieldCheck, Check, Send, X, Lock, FileText } from "lucide-react";

export default function Footer({
  onOpenFinder,
  onNavigateHome,
  onNavigateCatalog,
  onNavigateServices,
  onNavigateAbout,
  onNavigateContact,
  onNavigatePrivacy,
  onNavigateTerms,
  onOpenAdmin,
  shopSettings = {},
}) {
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

  const handleCatalogLink = (e) => {
    e.preventDefault();
    if (onNavigateCatalog) onNavigateCatalog(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleServicesLink = (e, serviceId) => {
    e.preventDefault();
    if (onNavigateServices) onNavigateServices(serviceId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleHomeLink = (e) => {
    e.preventDefault();
    if (onNavigateHome) onNavigateHome();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAboutLink = (e) => {
    e.preventDefault();
    if (onNavigateAbout) onNavigateAbout();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactLink = (e) => {
    e.preventDefault();
    if (onNavigateContact) onNavigateContact();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrivacyLink = (e) => {
    e.preventDefault();
    if (onNavigatePrivacy) onNavigatePrivacy();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTermsLink = (e) => {
    e.preventDefault();
    if (onNavigateTerms) onNavigateTerms();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      style={{
        background: "#EAF2FC",
        position: "relative",
        paddingTop: "20px",
        paddingBottom: "20px",
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
          <div className="footer-col-brand">
            <div
              onClick={handleLogoClick}
              role="button"
              tabIndex={0}
              className="footer-brand-logo"
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

            <p className="footer-brand-desc" style={{ fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "20px", color: "#475569", maxWidth: "340px" }}>
              Premium tyre sales & precision 3D alignment center. Built for maximum road grip, whisper-quiet cruising, and complete driving confidence.
            </p>

            <div className="footer-badges" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ background: "#ffffff", border: "1px solid #cbd5e1", color: "#0f172a", padding: "6px 12px", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <ShieldCheck size={14} color="#ef4444" /> ISO 9001:2026
              </span>
              <span style={{ background: "#ffffff", border: "1px solid #cbd5e1", color: "#0f172a", padding: "6px 12px", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <ShieldCheck size={14} color="#0f172a" /> BIS / ISI Certified
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col-tyres">
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
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.88rem" }}>
              <li><a href="/" onClick={handleHomeLink} className="footer-link">Home</a></li>
              <li><a href="#products" onClick={handleCatalogLink} className="footer-link">Tyre Catalog</a></li>
              <li><a href="#services" onClick={handleServicesLink} className="footer-link">Our Services</a></li>
              <li><a href="#privacy" onClick={handlePrivacyLink} className="footer-link">Privacy Policy</a></li>
              <li><a href="#terms" onClick={handleTermsLink} className="footer-link">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Column 3: Workshop Services */}
          <div className="footer-col-services">
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
              <li><a href="#services" onClick={(e) => handleServicesLink(e, "3d-alignment")} className="footer-link">3D Wheel Alignment</a></li>
              <li><a href="#services" onClick={(e) => handleServicesLink(e, "wheel-balancing")} className="footer-link">Robotic Wheel Balancing</a></li>
              <li><a href="#services" onClick={(e) => handleServicesLink(e, "tyre-fitting")} className="footer-link">Wheel Care & Repair</a></li>
              <li><a href="#services" onClick={(e) => handleServicesLink(e, "nitrogen-air")} className="footer-link">Nitrogen Filling</a></li>
              <li><a href="#services" onClick={(e) => handleServicesLink(e, "tpms-service")} className="footer-link">TPMS Services</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Hotline */}
          <div className="footer-col-contact">
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

            <div className="footer-contact-list" style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.88rem", marginBottom: "0" }}>
              <div className="footer-contact-item" style={{ display: "flex", alignItems: "center", gap: "10px", color: "#0f172a", fontWeight: "600" }}>
                <Phone size={15} color="#ef4444" />
                <span>+91 {shopSettings?.tollFreePhone || "1800 15 11 00"}</span>
              </div>
              <div className="footer-contact-item" style={{ display: "flex", alignItems: "center", gap: "10px", color: "#334155" }}>
                <Mail size={15} color="#0f172a" />
                <span>{shopSettings?.email || "care@sadgurutyres.com"}</span>
              </div>
              <a
                href={shopSettings?.googleMapsUrl || "https://maps.app.goo.gl/j9kVxiwCqT5APoYL8"}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-item"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#ef4444",
                  fontWeight: "600",
                  textDecoration: "none",
                  cursor: "pointer",
                  width: "fit-content",
                  transition: "var(--transition-smooth)"
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                <MapPin size={15} color="#ef4444" />
                <span>Visit Store on Google Maps</span>
              </a>
            </div>

            <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "#475569", marginTop: "2px" }}>
              📍 {shopSettings?.shortAddress || shopSettings?.address || "Near Bus Stand, Main Road, Pune, Maharashtra 411001"}
            </p>
            <p style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "4px" }}>
              {shopSettings?.weekdayHours || "Mon – Sat: 9 AM – 8 PM"} | {shopSettings?.sundayHours || "Sun: Closed"}
            </p>

          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="footer-bottom-bar"
          style={{
            paddingTop: "14px",
            borderTop: "1px solid #d8e5f3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "16px",
            fontSize: "0.8rem",
            color: "#334155",
          }}
        >
          <div className="footer-bottom-copy">
            © {new Date().getFullYear()} Sadguru Tyres & Mobility Solutions. All rights reserved.
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
            gap: 32px 24px !important;
          }
          .footer-col-brand {
            grid-column: 1 / -1 !important;
          }
          .footer-col-tyres {
            grid-column: 1 !important;
          }
          .footer-col-services {
            grid-column: 2 !important;
          }
          .footer-col-contact {
            grid-column: 1 / -1 !important;
          }
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 28px 16px !important;
          }
          .footer-col-brand {
            grid-column: 1 / -1 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          .footer-brand-logo {
            justify-content: center !important;
          }
          .footer-brand-desc {
            text-align: center !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .footer-badges {
            justify-content: center !important;
            flex-wrap: wrap !important;
          }
          .footer-col-tyres {
            grid-column: 1 !important;
            text-align: center !important;
          }
          .footer-col-tyres h4 {
            text-align: center !important;
            font-size: 0.85rem !important;
            margin-bottom: 12px !important;
          }
          .footer-col-tyres ul {
            align-items: center !important;
            text-align: center !important;
            gap: 10px !important;
            font-size: 0.82rem !important;
          }
          .footer-col-tyres li {
            text-align: center !important;
            width: 100% !important;
          }
          .footer-col-services {
            grid-column: 2 !important;
            text-align: center !important;
          }
          .footer-col-services h4 {
            text-align: center !important;
            font-size: 0.85rem !important;
            margin-bottom: 12px !important;
          }
          .footer-col-services ul {
            align-items: center !important;
            text-align: center !important;
            gap: 10px !important;
            font-size: 0.82rem !important;
          }
          .footer-col-services li {
            text-align: center !important;
            width: 100% !important;
          }
          .footer-col-contact {
            grid-column: 1 / -1 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          .footer-col-contact h4 {
            text-align: center !important;
          }
          .footer-contact-list {
            align-items: center !important;
            width: 100% !important;
          }
          .footer-contact-item {
            justify-content: center !important;
            width: 100% !important;
          }
          .footer-newsletter-form {
            width: 100% !important;
            max-width: 320px !important;
            margin: 0 auto !important;
          }
          .footer-newsletter-label {
            text-align: center !important;
          }
          .footer-newsletter-inputs {
            justify-content: center !important;
          }
          .footer-newsletter-success {
            justify-content: center !important;
          }
          .footer-bottom-bar {
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            gap: 14px !important;
          }
          .footer-bottom-copy {
            text-align: center !important;
            width: 100% !important;
          }
          .footer-bottom-links {
            justify-content: center !important;
            flex-wrap: wrap !important;
            width: 100% !important;
          }
          .footer-bottom-social {
            justify-content: center !important;
            width: 100% !important;
          }
          .footer-link {
            word-break: break-word;
            text-align: center !important;
          }
          .footer-link:hover {
            padding-left: 0 !important;
          }
        }
      `}</style>
    </footer>
  );
}
