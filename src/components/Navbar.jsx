import React, { useState, useEffect } from "react";
import { Disc, Menu, X, User } from "lucide-react";

export default function Navbar({
  onOpenSearch,
  onOpenFinder,
  onOpenLogin,
  currency,
  setCurrency,
  currentPage,
  onNavigateHome,
  onNavigateCatalog,
  wishlistCount,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (target) => {
    setMobileMenuOpen(false);
    if (target === "home") {
      onNavigateHome();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (target === "tyres" || target === "catalog") {
      onNavigateCatalog();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // If currently on catalog or product-detail, first go home then scroll
      if (currentPage !== "home") {
        onNavigateHome();
        setTimeout(() => {
          const el = document.getElementById(target);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          transition: "var(--transition-smooth)",
          background: scrolled ? "rgba(8, 10, 14, 0.95)" : "rgba(8, 10, 14, 0.8)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: scrolled
            ? "1px solid rgba(255, 255, 255, 0.15)"
            : "1px solid rgba(255, 255, 255, 0.06)",
          boxShadow: scrolled ? "0 10px 30px rgba(0, 0, 0, 0.6)" : "none",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "80px",
          }}
        >
          {/* Logo */}
          <div
            onClick={() => handleNav("home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
            }}
          >
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
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.35rem",
                  fontWeight: "800",
                  letterSpacing: "0.08em",
                  color: "#ffffff",
                  lineHeight: 1.1,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                SADGURU <span style={{ color: "#ff2a2a", textShadow: "0 0 12px rgba(255, 42, 42, 0.4)" }}>TYRES</span>
              </div>
              <div
                style={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.18em",
                  color: "var(--text-dim)",
                  textTransform: "uppercase",
                  fontWeight: "600",
                }}
              >
                PRECISION • PERFORMANCE • SAFETY
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "26px",
            }}
            className="desktop-nav"
          >
            <button
              onClick={() => handleNav("home")}
              style={{
                background: "none",
                border: "none",
                fontSize: "0.92rem",
                fontWeight: currentPage === "home" ? "700" : "500",
                color: currentPage === "home" ? "#ffffff" : "var(--text-silver)",
                cursor: "pointer",
                padding: "6px 0",
                transition: "var(--transition-smooth)",
              }}
            >
              Home
            </button>

            <button
              onClick={() => handleNav("tyres")}
              style={{
                background: "none",
                border: "none",
                fontSize: "0.92rem",
                fontWeight: currentPage === "catalog" ? "700" : "500",
                color: currentPage === "catalog" ? "#ffffff" : "var(--text-silver)",
                cursor: "pointer",
                padding: "6px 0",
                transition: "var(--transition-smooth)",
              }}
            >
              Tyres
            </button>

            <button
              onClick={() => handleNav("tyres")}
              style={{
                background: "none",
                border: "none",
                fontSize: "0.92rem",
                fontWeight: "500",
                color: "var(--text-silver)",
                cursor: "pointer",
                padding: "6px 0",
                transition: "var(--transition-smooth)",
              }}
            >
              Products
            </button>

            <button
              onClick={() => handleNav("services")}
              style={{
                background: "none",
                border: "none",
                fontSize: "0.92rem",
                fontWeight: "500",
                color: "var(--text-silver)",
                cursor: "pointer",
                padding: "6px 0",
                transition: "var(--transition-smooth)",
              }}
            >
              Services
            </button>

            <button
              onClick={() => handleNav("about")}
              style={{
                background: "none",
                border: "none",
                fontSize: "0.92rem",
                fontWeight: "500",
                color: "var(--text-silver)",
                cursor: "pointer",
                padding: "6px 0",
                transition: "var(--transition-smooth)",
              }}
            >
              About Us
            </button>

            <button
              onClick={() => handleNav("contact")}
              style={{
                background: "none",
                border: "none",
                fontSize: "0.92rem",
                fontWeight: "500",
                color: "var(--text-silver)",
                cursor: "pointer",
                padding: "6px 0",
                transition: "var(--transition-smooth)",
              }}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Container: Premium Log In Button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <button
              onClick={onOpenLogin}
              className="desktop-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 22px",
                borderRadius: "999px",
                fontSize: "0.85rem",
                fontWeight: "700",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                background: "rgba(255, 255, 255, 0.07)",
                border: "1px solid rgba(255, 255, 255, 0.22)",
                color: "#ffffff",
                cursor: "pointer",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.color = "#07080b";
                e.currentTarget.style.borderColor = "#ffffff";
                e.currentTarget.style.boxShadow = "0 6px 25px rgba(255, 255, 255, 0.35)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.07)";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.22)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.4)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <User size={15} />
              <span>Log In</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
              style={{
                background: "transparent",
                border: "none",
                color: "#ffffff",
                display: "none",
                padding: "6px",
                cursor: "pointer",
              }}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "80px",
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(7, 8, 11, 0.98)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            zIndex: 890,
            padding: "32px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            borderTop: "1px solid rgba(255, 42, 42, 0.2)",
            animation: "fadeIn 0.25s ease-out",
          }}
        >
          <button
            onClick={() => handleNav("home")}
            style={{
              background: "none",
              border: "none",
              fontFamily: "var(--font-heading)",
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#ffffff",
              textAlign: "left",
              padding: "10px 0",
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              cursor: "pointer",
            }}
          >
            Home
          </button>

          <button
            onClick={() => handleNav("tyres")}
            style={{
              background: "none",
              border: "none",
              fontFamily: "var(--font-heading)",
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "var(--accent-crimson)",
              textAlign: "left",
              padding: "10px 0",
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Explore All Tyres</span>
            <span>→</span>
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenLogin();
            }}
            style={{
              background: "none",
              border: "none",
              fontFamily: "var(--font-heading)",
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#ffffff",
              textAlign: "left",
              padding: "10px 0",
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <User size={20} />
            <span>Log In</span>
          </button>

          <button
            onClick={() => handleNav("services")}
            style={{
              background: "none",
              border: "none",
              fontFamily: "var(--font-heading)",
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#ffffff",
              textAlign: "left",
              padding: "10px 0",
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              cursor: "pointer",
            }}
          >
            Services
          </button>

          <button
            onClick={() => handleNav("about")}
            style={{
              background: "none",
              border: "none",
              fontFamily: "var(--font-heading)",
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#ffffff",
              textAlign: "left",
              padding: "10px 0",
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              cursor: "pointer",
            }}
          >
            About Us
          </button>

          <button
            onClick={() => handleNav("contact")}
            style={{
              background: "none",
              border: "none",
              fontFamily: "var(--font-heading)",
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#ffffff",
              textAlign: "left",
              padding: "10px 0",
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              cursor: "pointer",
            }}
          >
            Contact
          </button>

        </div>
      )}

      <style>{`
        @media (max-width: 980px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
