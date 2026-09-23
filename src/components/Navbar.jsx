import React, { useState, useEffect } from "react";
import { Phone, Menu, X, User } from "lucide-react";

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
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }, 50);
    } else if (target === "tyres" || target === "catalog") {
      onNavigateCatalog(false);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }, 50);
    } else {
      const targetId = target === "about" ? "why-choose-us" : target;
      const doScroll = () => {
        const el = document.getElementById(targetId) || document.getElementById(target);
        if (el) {
          const y = el.getBoundingClientRect().top + window.pageYOffset - 85;
          window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
        }
      };
      if (currentPage !== "home") {
        onNavigateHome();
        setTimeout(doScroll, 120);
      } else {
        doScroll();
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
          background: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          boxShadow: scrolled ? "0 8px 25px rgba(15, 23, 42, 0.08)" : "0 2px 10px rgba(15, 23, 42, 0.03)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "70px",
          }}
        >
          {/* Logo */}
          <div
            onClick={() => handleNav("home")}
            role="button"
            tabIndex={0}
            aria-label="Sadguru Tyres - Back to Top of Home"
            title="Sadguru Tyres - Home"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              cursor: "pointer",
              transition: "transform 0.2s ease, opacity 0.2s ease",
              userSelect: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.88";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <div
              style={{
                width: "46px",
                height: "46px",
                borderRadius: "50%",
                background: "#0f172a",
                padding: "3px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 12px rgba(239, 68, 68, 0.3)",
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
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.3rem",
                  fontWeight: "800",
                  letterSpacing: "0.05em",
                  color: "#0f172a",
                  lineHeight: 1.1,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                SADGURU <span style={{ color: "#ef4444" }}>TYRES</span>
              </div>
              <div
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.16em",
                  color: "#64748b",
                  textTransform: "uppercase",
                  fontWeight: "600",
                }}
              >
                TOUGH • PERFORMANCE • TRUST
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
            }}
            className="desktop-nav"
          >
            {[
              { id: "home", label: "Home" },
              { id: "catalog", label: "Products" },
              { id: "services", label: "Services" },
              { id: "about", label: "About Us" },
              { id: "contact", label: "Contact Us" },
            ].map((nav) => {
              const isActive =
                (nav.id === "home" && currentPage === "home") ||
                (nav.id === "catalog" && (currentPage === "catalog" || currentPage === "product-detail"));

              return (
                <button
                  key={nav.id}
                  onClick={() => handleNav(nav.id)}
                  onMouseDown={(e) => e.preventDefault()}
                  style={{
                    background: "none",
                    border: "none",
                    outline: "none",
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    caretColor: "transparent",
                    fontSize: "0.92rem",
                    fontWeight: isActive ? "600" : "500",
                    color: isActive ? "#ef4444" : "#334155",
                    cursor: "pointer",
                    padding: "6px 2px",
                    position: "relative",
                    transition: "var(--transition-smooth)",
                  }}
                >
                  {nav.label}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: "-4px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "14px",
                        height: "3px",
                        background: "#ef4444",
                        borderRadius: "999px",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Container */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {/* Phone Button Pill matching reference design */}
            <a
              href="tel:1800151100"
              className="desktop-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "9px 20px",
                borderRadius: "999px",
                fontSize: "0.85rem",
                fontWeight: "700",
                background: "#0f172a",
                color: "#ffffff",
                boxShadow: "0 4px 14px rgba(15, 23, 42, 0.2)",
                transition: "var(--transition-smooth)",
                whiteSpace: "nowrap",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1e293b";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#0f172a";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Phone size={14} fill="#ffffff" color="#ffffff" />
              <span>1800 15 11 00</span>
            </a>

            {/* Log In Button */}
            <button
              onClick={onOpenLogin}
              className="desktop-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "9px 18px",
                borderRadius: "999px",
                fontSize: "0.85rem",
                fontWeight: "500",
                background: "#f1f5f9",
                border: "1px solid #cbd5e1",
                color: "#0f172a",
                cursor: "pointer",
                transition: "var(--transition-smooth)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#e2e8f0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#f1f5f9";
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
                color: "#0f172a",
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
            top: "62px",
            left: 0,
            right: 0,
            bottom: 0,
            background: "#ffffff",
            zIndex: 890,
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            borderTop: "1px solid #e2e8f0",
            boxShadow: "0 20px 40px rgba(15, 23, 42, 0.15)",
          }}
        >
          {[
            { id: "home", label: "Home" },
            { id: "catalog", label: "Products" },
            { id: "services", label: "Services" },
            { id: "about", label: "About Us" },
            { id: "contact", label: "Contact Us" },
          ].map((item) => {
            const isActive =
              (item.id === "home" && currentPage === "home") ||
              (item.id === "catalog" && (currentPage === "catalog" || currentPage === "product-detail"));

            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: "var(--font-body)",
                  fontSize: "1.1rem",
                  fontWeight: isActive ? "600" : "500",
                  color: isActive ? "#ef4444" : "#0f172a",
                  textAlign: "left",
                  padding: "10px 0",
                  borderBottom: "1px solid #f1f5f9",
                  cursor: "pointer",
                }}
              >
                {item.label}
              </button>
            );
          })}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenLogin();
            }}
            style={{
              background: "#0f172a",
              border: "none",
              borderRadius: "999px",
              fontSize: "1rem",
              fontWeight: "500",
              color: "#ffffff",
              padding: "12px",
              marginTop: "10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <User size={18} />
            <span>Log In</span>
          </button>

          <a
            href="tel:1800151100"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "999px",
              fontSize: "0.95rem",
              fontWeight: "600",
              color: "#0f172a",
              padding: "12px",
              marginTop: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              textDecoration: "none",
            }}
          >
            <Phone size={16} color="#0f172a" />
            <span>Call 1800 15 11 00</span>
          </a>
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
