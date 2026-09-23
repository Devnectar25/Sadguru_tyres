import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedProducts from "./components/FeaturedProducts";
import WhyChooseUs from "./components/WhyChooseUs";
import ServicesSection from "./components/ServicesSection";
import AboutBrand from "./components/AboutBrand";
import Testimonials from "./components/Testimonials";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import CatalogPage from "./components/CatalogPage";
import ProductDetailPage from "./components/ProductDetailPage";
import TyreDetailModal from "./components/TyreDetailModal";
import SearchModal from "./components/SearchModal";
import BookingModal from "./components/BookingModal";
import DealerModal from "./components/DealerModal";
import QuoteModal from "./components/QuoteModal";
import LoginModal from "./components/LoginModal";
import SectionReveal from "./components/SectionReveal";
import BrandSection from "./components/BrandSection";
import ChatBot from "./components/ChatBot";
import { CheckCircle2, X } from "lucide-react";
import { TYRES_DATA } from "./data/tyresData";

export default function App() {
  // Navigation: "home" | "catalog" | "product-detail"
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedTyreId, setSelectedTyreId] = useState(TYRES_DATA[0].id);
  const [shouldScrollToProducts, setShouldScrollToProducts] = useState(false);

  // App settings & interactions
  const [currency, setCurrency] = useState("INR");
  const [wishlistIds, setWishlistIds] = useState(["apex-sport-pro"]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Modals state
  const [quickDetailModalTyre, setQuickDetailModalTyre] = useState(null);
  const [bookingState, setBookingState] = useState({ isOpen: false, service: null, tyre: null });
  const [dealerModalTyre, setDealerModalTyre] = useState(null);
  const [quoteModalTyre, setQuoteModalTyre] = useState(null);
  const [toast, setToast] = useState(null);

  // Global hotkey Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const handleToggleWishlist = (tyreId) => {
    const tyre = TYRES_DATA.find((t) => t.id === tyreId);
    const name = tyre ? tyre.name : "Tyre";
    if (wishlistIds.includes(tyreId)) {
      setWishlistIds(wishlistIds.filter((id) => id !== tyreId));
      showToast(`Removed "${name}" from saved list`);
    } else {
      setWishlistIds([...wishlistIds, tyreId]);
      showToast(`Added "${name}" to saved list`);
    }
  };

  const handleGoToProductDetail = (tyre) => {
    setSelectedTyreId(tyre.id);
    setCurrentPage("product-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGoToCatalog = (scrollToProducts = false) => {
    const shouldScroll = typeof scrollToProducts === "boolean" ? scrollToProducts : false;
    setCurrentPage("catalog");
    setShouldScrollToProducts(shouldScroll ? Date.now() : false);
    if (shouldScroll) {
      setTimeout(() => {
        const el = document.getElementById("catalog-products");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 430, behavior: "smooth" });
        }
      }, 70);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }, 50);
    }
  };

  const handleGoToHome = () => {
    setCurrentPage("home");
    setShouldScrollToProducts(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, 50);
  };

  const scrollToSection = (sectionId) => {
    const targetId = sectionId === "about" ? "why-choose-us" : sectionId;
    const doScroll = () => {
      const el = document.getElementById(targetId) || document.getElementById(sectionId);
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 85;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      }
    };

    if (currentPage !== "home") {
      setCurrentPage("home");
      setTimeout(doScroll, 120);
    } else {
      doScroll();
    }
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* 1. Global Luxury Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigateHome={handleGoToHome}
        onNavigateCatalog={handleGoToCatalog}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenFinder={() => scrollToSection("finder")}
        onOpenLogin={() => setIsLoginOpen(true)}
        currency={currency}
        setCurrency={setCurrency}
        wishlistCount={wishlistIds.length}
      />

      {/* VIEW 1: HOME PAGE */}
      {currentPage === "home" && (
        <main>
          {/* 2. Hero Section */}
          <Hero
            onExploreClick={() => scrollToSection("products")}
            onServicesClick={() => scrollToSection("services")}
            onFinderClick={() => scrollToSection("finder")}
          />

          {/* Brand Partner Showcase (Directly after Hero) */}
          <SectionReveal>
            <BrandSection />
          </SectionReveal>

          {/* 4. Featured Products */}
          <SectionReveal>
            <FeaturedProducts
              currency={currency}
              onSelectTyre={(tyre) => handleGoToProductDetail(tyre)}
            />
          </SectionReveal>

          {/* 5. Why Choose Us */}
          <SectionReveal>
            <WhyChooseUs />
          </SectionReveal>

          {/* 7. Specialized Services */}
          <SectionReveal>
            <ServicesSection
              onBookService={(service) =>
                setBookingState({ isOpen: true, service, tyre: null })
              }
            />
          </SectionReveal>

          {/* 8. Customer Testimonials */}
          <SectionReveal>
            <Testimonials />
          </SectionReveal>

          {/* 10. Final Call to Action */}
          <SectionReveal>
            <FinalCTA
              onExploreClick={() => scrollToSection("products")}
              onFinderClick={() => scrollToSection("finder")}
              onBookClick={() =>
                setBookingState({ isOpen: true, service: null, tyre: null })
              }
            />
          </SectionReveal>
        </main>
      )}

      {/* VIEW 2: TYRE CATALOG PAGE */}
      {currentPage === "catalog" && (
        <CatalogPage
          currency={currency}
          onSelectTyre={(tyre) => handleGoToProductDetail(tyre)}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onNavigateHome={handleGoToHome}
          shouldScrollToProducts={shouldScrollToProducts}
        />
      )}

      {/* VIEW 3: PRODUCT DETAILS PAGE */}
      {currentPage === "product-detail" && (
        <ProductDetailPage
          tyreId={selectedTyreId}
          currency={currency}
          onBackToCatalog={handleGoToCatalog}
          onNavigateHome={handleGoToHome}
          onSelectTyre={(tyre) => handleGoToProductDetail(tyre)}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onOpenDealerModal={(tyre) => setDealerModalTyre(tyre)}
          onOpenQuoteModal={(tyre) => setQuoteModalTyre(tyre)}
          onOpenBookingModal={(tyre) =>
            setBookingState({ isOpen: true, service: null, tyre })
          }
        />
      )}

      {/* 11. Global Footer */}
      <Footer
        onOpenFinder={() => scrollToSection("finder")}
        onNavigateHome={handleGoToHome}
      />

      {/* Global Interactive Modals */}
      {quickDetailModalTyre && (
        <TyreDetailModal
          tyre={quickDetailModalTyre}
          currency={currency}
          onClose={() => setQuickDetailModalTyre(null)}
          onBookTyre={(tyre) =>
            setBookingState({ isOpen: true, service: null, tyre })
          }
        />
      )}

      {isSearchOpen && (
        <SearchModal
          currency={currency}
          onClose={() => setIsSearchOpen(false)}
          onSelectTyre={(tyre) => {
            setIsSearchOpen(false);
            handleGoToProductDetail(tyre);
          }}
        />
      )}

      {dealerModalTyre && (
        <DealerModal
          tyre={dealerModalTyre}
          onClose={() => setDealerModalTyre(null)}
          onSelectDealer={(dealer) => {
            showToast(`Bay Reserved at ${dealer.name} (${dealer.city})!`);
          }}
        />
      )}

      {quoteModalTyre && (
        <QuoteModal
          tyre={quoteModalTyre}
          currency={currency}
          onClose={() => setQuoteModalTyre(null)}
          onQuoteSubmitted={(quote) => {
            showToast(`Official Quote for ${quote.quantity}x ${quote.tyreName} (${quote.totalFormatted}) sent to ${quote.email}`);
          }}
        />
      )}

      {bookingState.isOpen && (
        <BookingModal
          initialService={bookingState.service}
          initialTyre={bookingState.tyre}
          onClose={() =>
            setBookingState({ isOpen: false, service: null, tyre: null })
          }
          onBookingConfirmed={(data) => {
            showToast(
              `Appointment Reserved! ${data.customerName} for ${data.serviceName} on ${data.date} at ${data.timeSlot} (${data.carModel})`
            );
          }}
        />
      )}

      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={(portalName) => {
            showToast(`Access Granted! Logged into ${portalName}`);
          }}
        />
      )}

      {/* Global Toast Notification */}
      {toast && (
        <div className="toast-notice">
          <CheckCircle2 size={20} color="var(--accent-cyan)" />
          <span>{toast}</span>
          <button
            onClick={() => setToast(null)}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              marginLeft: "8px",
            }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Floating Interactive ChatBot */}
      <ChatBot
        onOpenFinder={() => scrollToSection("finder")}
        onOpenBooking={(service) =>
          setBookingState({ isOpen: true, service: service || null, tyre: null })
        }
        onOpenCatalog={handleGoToCatalog}
        onOpenContact={() => scrollToSection("contact")}
      />
    </div>
  );
}
