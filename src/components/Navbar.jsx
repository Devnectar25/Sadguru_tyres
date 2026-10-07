import React, { useState, useEffect } from "react";
import { Phone, Menu, X, Wrench, MapPin } from "lucide-react";

export default function Navbar({
  onOpenSearch,
  onOpenFinder,
  onOpenLogin,
  onOpenBooking,
  onOpenChatBot,
  onOpenAdmin,
  currency,
  setCurrency,
  currentPage,
  onNavigateHome,
  onNavigateCatalog,
  onNavigateServices,
  onNavigateAbout,
  onNavigateContact,
  wishlistCount,
  shopSettings = {},
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
      if (onNavigateHome) onNavigateHome();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else if (target === "tyres" || target === "catalog") {
      if (onNavigateCatalog) onNavigateCatalog(false);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else if (target === "services") {
      if (onNavigateServices) onNavigateServices();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else if (target === "about") {
      if (onNavigateAbout) onNavigateAbout();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else if (target === "contact") {
      if (onNavigateContact) onNavigateContact();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
            height: "78px",
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
              gap: "14px",
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
                width: "58px",
                height: "58px",
                borderRadius: "50%",
                background: "#0f172a",
                padding: "3px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 14px rgba(239, 68, 68, 0.35)",
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
                  fontSize: "1.6rem",
                  fontWeight: "900",
                  letterSpacing: "0.05em",
                  color: "#0f172a",
                  lineHeight: 1.05,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                SADGURU <span style={{ color: "#ef4444" }}>TYRES</span>
              </div>
              <div
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.18em",
                  color: "#64748b",
                  textTransform: "uppercase",
                  fontWeight: "700",
                  marginTop: "2px",
                }}
              >
                20+ YEARS OF LEGACY
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
                (nav.id === currentPage) ||
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
            {/* Google Maps Store Location Link */}
            <a
              href="https://maps.app.goo.gl/j9kVxiwCqT5APoYL8"
              target="_blank"
              rel="noopener noreferrer"
              title="Open Store Location on Google Maps"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "#ffffff",
                border: "1.5px solid #ef4444",
                color: "#ef4444",
                transition: "var(--transition-smooth)",
                cursor: "pointer",
                flexShrink: 0,
                boxShadow: "0 2px 10px rgba(239, 68, 68, 0.18)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ef4444";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.transform = "translateY(-2px) scale(1.05)";
                e.currentTarget.style.boxShadow = "0 6px 18px rgba(239, 68, 68, 0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.color = "#ef4444";
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 2px 10px rgba(239, 68, 68, 0.18)";
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"/>
              </svg>
            </a>



            {/* Book Service Button Pill */}
            <button
              onClick={() => onOpenBooking && onOpenBooking()}
              className="desktop-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 22px",
                borderRadius: "999px",
                fontSize: "0.86rem",
                fontWeight: "700",
                background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                color: "#ffffff",
                boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
                transition: "var(--transition-smooth)",
                whiteSpace: "nowrap",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(239, 68, 68, 0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(239, 68, 68, 0.3)";
              }}
            >
              <Wrench size={15} />
              <span>Book Appointment</span>
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
            top: "78px",
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
              (item.id === currentPage) ||
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

          <a
            href={shopSettings?.googleMapsUrl || "https://maps.app.goo.gl/j9kVxiwCqT5APoYL8"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              background: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "999px",
              fontSize: "0.95rem",
              fontWeight: "600",
              color: "#ef4444",
              padding: "12px",
              marginTop: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              textDecoration: "none",
            }}
          >
            <MapPin size={18} color="#ef4444" />
            <span>Store Location on Google Maps</span>
          </a>

          <a
            href={`tel:${(shopSettings?.tollFreePhone || "1800 15 11 00").replace(/\s+/g, "")}`}
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
            <span>Call {shopSettings?.tollFreePhone || "1800 15 11 00"}</span>
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
