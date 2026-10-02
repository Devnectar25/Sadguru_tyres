import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedProducts from "./components/FeaturedProducts";
import WhyChooseUs from "./components/WhyChooseUs";
import FounderLegacy from "./components/FounderLegacy";
import ServicesSection from "./components/ServicesSection";
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
import AdminLayout from "./components/admin/AdminLayout";
import AdminLogin from "./components/admin/AdminLogin";
import { CheckCircle2, X } from "lucide-react";
import { TYRES_DATA } from "./data/tyresData";
import { apiService } from "./services/api";

export default function App() {
  // Navigation: "home" | "catalog" | "product-detail" | "admin"
  const [currentPage, setCurrentPage] = useState("home");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [selectedTyreId, setSelectedTyreId] = useState(TYRES_DATA[0].id);
  const [shouldScrollToProducts, setShouldScrollToProducts] = useState(false);

  // Dynamic Store & Inventory State
  const [tyresDataList, setTyresDataList] = useState(TYRES_DATA);
  const [bookingsList, setBookingsList] = useState([
    { customerName: "Rajesh Sharma", carModel: "Honda City (2022)", serviceName: "4-Wheel Alignment & Balancing", date: "2026-10-02", timeSlot: "11:00 AM", phone: "+91 98220 44556", status: "Confirmed", totalINR: 1850 },
    { customerName: "Vikramaditya Deshmukh", carModel: "Toyota Fortuner", serviceName: "Run-Flat Tyre Replacement", date: "2026-10-03", timeSlot: "02:30 PM", phone: "+91 94230 11223", status: "Pending", totalINR: 24500 },
    { customerName: "Amitabh Kulkarni", carModel: "Hyundai Creta", serviceName: "Nitrogen Air Flush & Inspection", date: "2026-10-04", timeSlot: "04:00 PM", phone: "+91 98900 99887", status: "Confirmed", totalINR: 850 },
  ]);
  const [quotesList, setQuotesList] = useState([
    { tyreName: "ApexSport Pro 4S", quantity: 12, email: "fleet@maharashtratravels.com", totalFormatted: "₹2,26,800" },
    { tyreName: "TerraGrip All-Terrain X", quantity: 8, email: "purchasing@westernsafari.in", totalFormatted: "₹1,27,200" },
  ]);
  const [brandsList, setBrandsList] = useState([
    { id: "yokohama", name: "Yokohama", logo: "/images/YOKOHAMA.png", tagline: "Japan's Premium Tyres", status: "Active" },
    { id: "mrf", name: "MRF Tyres", logo: "/images/MRF tyres.png", tagline: "India's No.1 Tyre Brand", status: "Active" },
    { id: "ceat", name: "CEAT", logo: "/images/CEAT tyres.png", tagline: "Confidence for Every Ride", status: "Active" },
    { id: "goodyear", name: "Goodyear", logo: "/images/Good Year.jpg", tagline: "Global Innovation Leader", status: "Active" },
    { id: "bridgestone", name: "Bridgestone", logo: "/images/bridgestone.png", tagline: "World's #1 Premium Tyre", status: "Active" },
    { id: "michelin", name: "Michelin", logo: "/images/mechalin.jpg", tagline: "Performance & Innovation", status: "Active" },
  ]);

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

  // Tyre Inventory CRUD Handlers
  const handleAddTyre = (newTyre) => {
    setTyresDataList((prev) => [newTyre, ...prev]);
  };

  const handleUpdateTyre = (updatedTyre) => {
    setTyresDataList((prev) =>
      prev.map((t) => (t.id === updatedTyre.id ? updatedTyre : t))
    );
  };

  const handleDeleteTyre = (tyreId) => {
    setTyresDataList((prev) => prev.filter((t) => t.id !== tyreId));
  };

  const handleAddBrand = (newBrand) => {
    setBrandsList((prev) => [...prev, newBrand]);
  };

  const handleUpdateBrand = (updatedBrand) => {
    setBrandsList((prev) => prev.map((b) => (b.id === updatedBrand.id ? updatedBrand : b)));
  };

  const handleDeleteBrand = (brandId) => {
    setBrandsList((prev) => prev.filter((b) => b.id !== brandId));
  };

  const handleUpdateBookingStatus = async (index, newStatus) => {
    const targetBooking = bookingsList[index];
    setBookingsList((prev) =>
      prev.map((b, i) => (i === index ? { ...b, status: newStatus } : b))
    );
    if (targetBooking && targetBooking.id) {
      await apiService.updateBookingStatus(targetBooking.id, newStatus);
    }
  };

  // Fetch live bookings, quotes, tyres, and brands from API on mount
  useEffect(() => {
    async function loadApiData() {
      const [apiBookings, apiQuotes, apiTyres, apiBrands] = await Promise.all([
        apiService.getBookings(),
        apiService.getQuotes(),
        apiService.getTyres(),
        apiService.getBrands(),
      ]);

      if (apiBookings && apiBookings.length > 0) {
        setBookingsList(apiBookings);
      }
      if (apiQuotes && apiQuotes.length > 0) {
        setQuotesList(apiQuotes);
      }
      if (apiTyres && apiTyres.length > 0) {
        setTyresDataList(apiTyres);
      }
      if (apiBrands && apiBrands.length > 0) {
        setBrandsList(apiBrands);
      }
    }

    loadApiData();
  }, []);

  // URL Route Detection for /admin and /admin/login
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes("/admin") || hash.includes("#admin")) {
        setCurrentPage("admin");
      }
    };

    checkRoute();
    window.addEventListener("popstate", checkRoute);
    window.addEventListener("hashchange", checkRoute);
    return () => {
      window.removeEventListener("popstate", checkRoute);
      window.removeEventListener("hashchange", checkRoute);
    };
  }, []);

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

  // Comprehensive background scroll prevention whenever any modal is open
  const isAnyModalOpen = Boolean(
    quickDetailModalTyre ||
    bookingState.isOpen ||
    dealerModalTyre ||
    quoteModalTyre ||
    isSearchOpen ||
    isLoginOpen
  );

  useEffect(() => {
    if (!isAnyModalOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.classList.add("modal-open");
    document.documentElement.classList.add("modal-open");
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Intercept in the CAPTURE phase so no child stopPropagation can block it, and zero scroll leaks
    const handleGlobalWheel = (e) => {
      const modalContent = e.target.closest ? e.target.closest(".modal-content") : null;
      if (!modalContent) {
        // Over backdrop overlay or outside modal content -> cancel wheel completely
        e.preventDefault();
        return;
      }

      // Check if modal-content is actually configured to scroll
      const style = window.getComputedStyle(modalContent);
      const isScrollableType = style.overflowY === "auto" || style.overflowY === "scroll";
      const maxScroll = modalContent.scrollHeight - modalContent.clientHeight;

      // If it doesn't have auto/scroll overflow or content fits without scrolling (like LoginModal or compact BookingModal)
      if (!isScrollableType || maxScroll <= 2) {
        e.preventDefault();
        return;
      }

      // If it is scrollable, check boundary edges to prevent overscroll chaining to page behind
      const atTop = modalContent.scrollTop <= 0 && e.deltaY < 0;
      const atBottom =
        modalContent.scrollTop + modalContent.clientHeight >= modalContent.scrollHeight - 2 &&
        e.deltaY > 0;

      if (atTop || atBottom) {
        e.preventDefault();
      }
    };

    let touchStartY = 0;
    const handleGlobalTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleGlobalTouchMove = (e) => {
      const modalContent = e.target.closest ? e.target.closest(".modal-content") : null;
      if (!modalContent) {
        e.preventDefault();
        return;
      }

      const style = window.getComputedStyle(modalContent);
      const isScrollableType = style.overflowY === "auto" || style.overflowY === "scroll";
      const maxScroll = modalContent.scrollHeight - modalContent.clientHeight;

      if (!isScrollableType || maxScroll <= 2) {
        e.preventDefault();
        return;
      }

      if (e.touches && e.touches[0]) {
        const currentY = e.touches[0].clientY;
        const deltaY = touchStartY - currentY;
        const atTop = modalContent.scrollTop <= 0 && deltaY < 0;
        const atBottom =
          modalContent.scrollTop + modalContent.clientHeight >= modalContent.scrollHeight - 2 &&
          deltaY > 0;

        if (atTop || atBottom) {
          e.preventDefault();
        }
      }
    };

    window.addEventListener("wheel", handleGlobalWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", handleGlobalTouchStart, { passive: true, capture: true });
    window.addEventListener("touchmove", handleGlobalTouchMove, { passive: false, capture: true });

    return () => {
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.paddingRight = originalBodyPaddingRight;
      window.removeEventListener("wheel", handleGlobalWheel, { capture: true });
      window.removeEventListener("touchstart", handleGlobalTouchStart, { capture: true });
      window.removeEventListener("touchmove", handleGlobalTouchMove, { capture: true });
    };
  }, [isAnyModalOpen]);

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

  if (currentPage === "admin") {
    if (!isAdminAuthenticated) {
      return (
        <AdminLogin
          onLoginSuccess={() => setIsAdminAuthenticated(true)}
          onReturnToSite={() => {
            if (window.history.pushState) {
              window.history.pushState({}, "", "/");
            }
            window.location.hash = "";
            setCurrentPage("home");
          }}
        />
      );
    }

    return (
      <AdminLayout
        onExitAdmin={() => {
          setIsAdminAuthenticated(false);
          if (window.history.pushState) {
            window.history.pushState({}, "", "/");
          }
          window.location.hash = "";
          setCurrentPage("home");
        }}
        tyresData={tyresDataList}
        onAddTyre={handleAddTyre}
        onUpdateTyre={handleUpdateTyre}
        onDeleteTyre={handleDeleteTyre}
        brandsList={brandsList}
        onAddBrand={handleAddBrand}
        onUpdateBrand={handleUpdateBrand}
        onDeleteBrand={handleDeleteBrand}
        bookingsList={bookingsList}
        onUpdateBookingStatus={handleUpdateBookingStatus}
        quotesList={quotesList}
        onUpdateQuoteStatus={() => {}}
      />
    );
  }

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* 1. Global Luxury Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigateHome={handleGoToHome}
        onNavigateCatalog={handleGoToCatalog}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenFinder={() => scrollToSection("finder")}
        onOpenBooking={(service) =>
          setBookingState({ isOpen: true, service: service || null, tyre: null })
        }
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenAdmin={() => setCurrentPage("admin")}
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

          {/* 3. 20-Year Founder Legacy (Directly after Hero) */}
          <SectionReveal>
            <FounderLegacy />
          </SectionReveal>

          {/* Brand Partner Showcase */}
          <SectionReveal>
            <BrandSection brandsList={brandsList} />
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
        onOpenAdmin={() => setCurrentPage("admin")}
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
          onQuoteSubmitted={async (quote) => {
            const newQuote = {
              tyreName: quote.tyreName,
              quantity: quote.quantity,
              email: quote.email,
              totalFormatted: quote.totalFormatted,
            };
            setQuotesList((prev) => [newQuote, ...prev]);
            showToast(`Official Quote for ${quote.quantity}x ${quote.tyreName} (${quote.totalFormatted}) sent to ${quote.email}`);
            const res = await apiService.createQuote(newQuote);
            if (res && res.data) {
              setQuotesList((prev) =>
                prev.map((q) => (q === newQuote ? res.data : q))
              );
            }
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
          onBookingConfirmed={async (data) => {
            const bookingObj = {
              customerName: data.customerName,
              carModel: data.carModel,
              serviceName: data.serviceName,
              date: data.date,
              timeSlot: data.timeSlot,
              phone: data.phone || "+91 98765 43210",
              status: "Pending",
              totalINR: 1850,
            };
            setBookingsList((prev) => [bookingObj, ...prev]);
            showToast(
              `Appointment Reserved! ${data.customerName} for ${data.serviceName} on ${data.date} at ${data.timeSlot} (${data.carModel})`
            );
            const res = await apiService.createBooking(bookingObj);
            if (res && res.data) {
              setBookingsList((prev) =>
                prev.map((b) => (b === bookingObj ? res.data : b))
              );
            }
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

    </div>
  );
}
