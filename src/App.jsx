import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedProducts from "./components/FeaturedProducts";
import FounderLegacy from "./components/FounderLegacy";
import ServicesSection from "./components/ServicesSection";
import Testimonials from "./components/Testimonials";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import CatalogPage from "./components/CatalogPage";
import ProductDetailPage from "./components/ProductDetailPage";
import ServicesPage from "./components/ServicesPage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";
import TermsConditionsPage from "./components/TermsConditionsPage";
import ChatBot from "./components/ChatBot";
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
import { SERVICES_DATA } from "./data/servicesData";
import { apiService } from "./services/api";

export function normalizeTyre(t) {
  if (!t || typeof t !== "object") return null;

  const width = String(t.width || "225");
  const profile = String(t.profile || "55");
  const rimSize = String(t.rimSize || t.rim_size || "17");
  const defaultSize = `${width}/${profile} R${rimSize}`;

  let availableSizes = [defaultSize];
  const rawSizes = t.availableSizes || t.available_sizes;
  if (Array.isArray(rawSizes) && rawSizes.length > 0) {
    availableSizes = rawSizes.map(String);
  } else if (typeof rawSizes === "string" && rawSizes.trim()) {
    try {
      const parsed = JSON.parse(rawSizes);
      if (Array.isArray(parsed) && parsed.length > 0) availableSizes = parsed.map(String);
      else availableSizes = [rawSizes.trim()];
    } catch {
      availableSizes = rawSizes.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }

  const priceINR = Number(t.priceINR ?? t.price_inr ?? 12500) || 12500;
  const priceUSD = Number(t.priceUSD ?? t.price_usd ?? 165) || 165;

  return {
    ...t,
    id: String(t.id || `tyre-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`),
    name: t.name || t.model_name || "Sadguru Premium Tyre",
    brand: t.brand || t.brand_name || "Sadguru Apex",
    vehicleType: t.vehicleType || t.vehicle_type || "Cars",
    tyreType: t.tyreType || t.tyre_type || "All-Season",
    performanceLevel: t.performanceLevel || t.performance_level || "High Performance",
    width,
    profile,
    rimSize,
    dateAdded: t.dateAdded || t.date_added || new Date().toISOString().split("T")[0],
    tagline: t.tagline || t.description || "High performance tyre engineered for stability and wet grip.",
    category: t.category || t.performanceLevel || t.performance_level || "High Performance",
    badge: t.badge || "Best Seller",
    rating: Number(t.rating || 4.8),
    reviewsCount: Number(t.reviewsCount || t.reviews_count || 120),
    image: t.image || t.image_url || "/images/hero_tyre.jpg",
    image2: t.image2 || "",
    image3: t.image3 || "",
    gallery: Array.isArray(t.gallery) && t.gallery.length > 0 
      ? t.gallery 
      : [t.image || t.image_url || "/images/hero_tyre.jpg", t.image2, t.image3].filter(Boolean),
    priceUSD,
    priceINR,
    specs: t.specs && typeof t.specs === "object" ? t.specs : {
      wetGrip: "A",
      fuelEfficiency: "B",
      noiseLevel: "68 dB",
      speedRating: "H (210 km/h)",
      warranty: "50,000 km",
    },
    scores: t.scores && typeof t.scores === "object" ? t.scores : {
      dryGrip: 90,
      wetGrip: 88,
      responsiveness: 89,
      comfort: 90,
      longevity: 92,
    },
    bestSuitedFor: t.bestSuitedFor || t.tagline || t.description || "All-Terrain & Highway",
    availableSizes,
  };
}

export default function App() {
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [isChatbotEnabled, setIsChatbotEnabled] = useState(() => {
    const saved = localStorage.getItem("sadguru_chatbot_enabled");
    return saved !== null ? saved === "true" : true; // Default true
  });
  // Navigation & Admin Authentication Session State (Persisted across page refresh)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem("sadguru_admin_auth") === "true";
  });

  const [currentPage, setCurrentPage] = useState(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    
    // Admin takes precedence if in URL
    if (path.includes("/admin") || hash.includes("#admin")) {
      return "admin";
    }
    
    const saved = localStorage.getItem("sadguru_current_page");
    return saved || "home";
  });
  
  const [selectedTyreId, setSelectedTyreId] = useState(() => {
    const saved = localStorage.getItem("sadguru_selected_tyre");
    return saved || TYRES_DATA[0].id;
  });
  
  const [targetServiceId, setTargetServiceId] = useState(() => {
    return localStorage.getItem("sadguru_target_service") || null;
  });
  
  const [shouldScrollToProducts, setShouldScrollToProducts] = useState(false);

  // Sync state to localStorage to survive page refresh
  useEffect(() => {
    localStorage.setItem("sadguru_current_page", currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (selectedTyreId) localStorage.setItem("sadguru_selected_tyre", selectedTyreId);
  }, [selectedTyreId]);

  useEffect(() => {
    if (targetServiceId) localStorage.setItem("sadguru_target_service", targetServiceId);
    else localStorage.removeItem("sadguru_target_service");
  }, [targetServiceId]);

  // Dynamic Store & Inventory State
  const [tyresDataList, setTyresDataList] = useState(() => {
    try {
      const saved = localStorage.getItem("sadguru_tyres_list");
      if (saved && saved !== "undefined" && saved !== "null") {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const clean = parsed.filter(Boolean).map(normalizeTyre).filter(Boolean);
          if (clean.length > 0) return clean;
        }
      }
    } catch (e) {
      console.error("Failed to parse saved tyres list:", e);
    }
    return TYRES_DATA.map(normalizeTyre).filter(Boolean);
  });

  useEffect(() => {
    try {
      localStorage.setItem("sadguru_tyres_list", JSON.stringify(tyresDataList));
    } catch (err) {
      console.warn("Could not save tyres list to localStorage:", err);
    }
  }, [tyresDataList]);

  // Global Error Monitoring Listener
  useEffect(() => {
    const handleGlobalError = async (event) => {
      // Prevent capturing errors from third-party extensions if possible
      if (event.filename && event.filename.includes("extension://")) return;
      
      const errorData = {
        severity: "Critical",
        module: "Frontend Client (Global Catch)",
        message: event.error?.message || event.message || "Unknown client error",
        stack: event.error?.stack || `Error at ${event.filename}:${event.lineno}:${event.colno}`,
      };
      
      try {
        await apiService.createErrorLog(errorData);
      } catch (e) {
        console.error("Failed to log global error to API:", e);
      }
    };

    const handleUnhandledRejection = async (event) => {
      const errorData = {
        severity: "Warning",
        module: "Frontend Client (Unhandled Promise)",
        message: event.reason?.message || "Unhandled Promise Rejection",
        stack: event.reason?.stack || String(event.reason),
      };
      
      try {
        await apiService.createErrorLog(errorData);
      } catch (e) {
        console.error("Failed to log unhandled rejection to API:", e);
      }
    };

    window.addEventListener("error", handleGlobalError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleGlobalError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  useEffect(() => {
    async function loadTyresFromApi() {
      try {
        const apiTyres = await apiService.getTyres();
        if (apiTyres && Array.isArray(apiTyres) && apiTyres.length > 0) {
          const mapped = apiTyres.filter(Boolean).map(normalizeTyre).filter(Boolean);
          if (mapped.length > 0) setTyresDataList(mapped);
        }
      } catch (err) {
        console.error("Error loading tyres from API:", err);
      }
    }
    loadTyresFromApi();
  }, []);
  const [bookingsList, setBookingsList] = useState([
    { customerName: "Rajesh Sharma", carModel: "Honda City (2022)", serviceName: "4-Wheel Alignment & Balancing", date: "2026-10-02", timeSlot: "11:00 AM", phone: "+91 98220 44556", status: "Confirmed", totalINR: 1850 },
    { customerName: "Vikramaditya Deshmukh", carModel: "Toyota Fortuner", serviceName: "Run-Flat Tyre Replacement", date: "2026-10-03", timeSlot: "02:30 PM", phone: "+91 94230 11223", status: "Pending", totalINR: 24500 },
    { customerName: "Amitabh Kulkarni", carModel: "Hyundai Creta", serviceName: "Nitrogen Air Flush & Inspection", date: "2026-10-04", timeSlot: "04:00 PM", phone: "+91 98900 99887", status: "Confirmed", totalINR: 850 },
  ]);
  const [quotesList, setQuotesList] = useState([
    { tyreName: "ApexSport Pro 4S", quantity: 12, email: "fleet@maharashtratravels.com", totalFormatted: "₹2,26,800" },
    { tyreName: "TerraGrip All-Terrain X", quantity: 8, email: "purchasing@westernsafari.in", totalFormatted: "₹1,27,200" },
  ]);
  const [leadsList, setLeadsList] = useState([
    {
      id: "lead-101",
      name: "Vikramaditya Rao",
      phone: "+91 98220 12345",
      email: "vikramaditya.rao@gmail.com",
      subject: "3D Wheel Alignment & Tyre Fitting",
      message: "Need full alignment scan and set of 4 Yokohama BluEarth tyres for Honda City.",
      status: "New",
      date: "2026-10-05",
    },
    {
      id: "lead-102",
      name: "Pooja Deshmukh",
      phone: "+91 98901 88776",
      email: "pooja.d@techmahindra.com",
      subject: "Run-Flat Tyre Price Quote",
      message: "Inquiring about 245/45 R18 Bridgestone Potenza Run-Flat tyres for BMW 3 Series.",
      status: "Contacted",
      date: "2026-10-04",
    },
    {
      id: "lead-103",
      name: "Anand Kulkarni",
      phone: "+91 94220 55443",
      email: "anand.k@logistics.in",
      subject: "Bulk Fleet Tyre Maintenance",
      message: "Looking for monthly tyre alignment and maintenance contract for 10 delivery vans.",
      status: "Closed",
      date: "2026-10-03",
    },
  ]);
  const DEFAULT_BRANDS_LIST = [
    { id: "yokohama", name: "Yokohama", logo: "/images/YOKOHAMA.png", tagline: "Japan's Premium Tyres", status: "Active" },
    { id: "mrf", name: "MRF Tyres", logo: "/images/MRF tyres.png", tagline: "India's No.1 Tyre Brand", status: "Active" },
    { id: "ceat", name: "CEAT", logo: "/images/CEAT tyres.png", tagline: "Confidence for Every Ride", status: "Active" },
    { id: "goodyear", name: "Goodyear", logo: "/images/goodyear.png", tagline: "Global Innovation Leader", status: "Active" },
    { id: "bridgestone", name: "Bridgestone", logo: "/images/bridgestone.png", tagline: "World's #1 Premium Tyre", status: "Active" },
    { id: "michelin", name: "Michelin", logo: "/images/mechalin.jpg", tagline: "Performance & Innovation", status: "Active" },
  ];

  const [brandsList, setBrandsList] = useState(() => {
    try {
      const saved = localStorage.getItem("sadguru_brands_list");
      if (saved && saved !== "undefined" && saved !== "null") {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const clean = parsed.filter(Boolean);
          if (clean.length > 0) return clean;
        }
      }
    } catch (e) {
      console.error("Failed to parse saved brands list:", e);
    }
    return DEFAULT_BRANDS_LIST;
  });

  useEffect(() => {
    try {
      localStorage.setItem("sadguru_brands_list", JSON.stringify(brandsList));
    } catch (err) {
      console.warn("Could not save brands to localStorage:", err);
    }
  }, [brandsList]);

  useEffect(() => {
    async function loadBrandsFromApi() {
      try {
        const apiBrands = await apiService.getBrands();
        if (apiBrands && Array.isArray(apiBrands) && apiBrands.length > 0) {
          setBrandsList(apiBrands.filter(Boolean));
        }
      } catch (err) {
        console.error("Error loading brands from API:", err);
      }
    }
    loadBrandsFromApi();
  }, []);

  const [faqsList, setFaqsList] = useState([]);
  const [servicesList, setServicesList] = useState(SERVICES_DATA);

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
  const handleAddTyre = async (newTyre) => {
    setTyresDataList((prev) => [newTyre, ...prev]);
    const res = await apiService.addTyre(newTyre);
    if (res && res.data) {
      const savedTyre = {
        ...newTyre,
        ...res.data,
        priceINR: res.data.price_inr ?? res.data.priceINR ?? newTyre.priceINR,
        priceUSD: res.data.price_usd ?? res.data.priceUSD ?? newTyre.priceUSD,
        vehicleType: res.data.vehicle_type ?? res.data.vehicleType ?? newTyre.vehicleType,
        tyreType: res.data.tyre_type ?? res.data.tyreType ?? newTyre.tyreType,
        performanceLevel: res.data.performance_level ?? res.data.performanceLevel ?? newTyre.performanceLevel,
        rimSize: res.data.rim_size ?? res.data.rimSize ?? newTyre.rimSize,
        availableSizes: newTyre.availableSizes || [`${newTyre.width}/${newTyre.profile} R${newTyre.rimSize}`],
      };
      setTyresDataList((prev) => prev.map((t) => (t.id === newTyre.id ? savedTyre : t)));
    }
  };

  const handleUpdateTyre = async (updatedTyre) => {
    setTyresDataList((prev) =>
      prev.map((t) => (t.id === updatedTyre.id ? updatedTyre : t))
    );
    await apiService.updateTyre(updatedTyre.id, updatedTyre);
  };

  const handleDeleteTyre = async (tyreId) => {
    setTyresDataList((prev) => prev.filter((t) => t.id !== tyreId));
    await apiService.deleteTyre(tyreId);
  };

  const handleAddBrand = async (newBrand) => {
    setBrandsList((prev) => [...prev, newBrand]);
    try {
      const res = await apiService.addBrand(newBrand);
      if (res && res.data) {
        setBrandsList((prev) => prev.map((b) => (b.id === newBrand.id ? res.data : b)));
      }
    } catch (e) {
      console.warn("Could not save brand to backend:", e);
    }
  };

  const handleUpdateBrand = async (updatedBrand) => {
    setBrandsList((prev) =>
      prev.map((b) => (b.id === updatedBrand.id ? updatedBrand : b))
    );
    try {
      await apiService.updateBrand(updatedBrand.id, updatedBrand);
    } catch (e) {
      console.warn("Could not update brand in backend:", e);
    }
  };

  const handleDeleteBrand = async (brandId) => {
    setBrandsList((prev) => prev.filter((b) => b.id !== brandId));
    try {
      await apiService.deleteBrand(brandId);
    } catch (e) {
      console.warn("Could not delete brand in backend:", e);
    }
  };

  const handleAddFaq = async (newFaq) => {
    if (faqsList.length >= 5) {
      console.warn("FAQ limit reached: Maximum 5 FAQs allowed.");
      return;
    }
    setFaqsList((prev) => [newFaq, ...prev]);
    const res = await apiService.createFaq(newFaq);
    if (res && res.data) {
      setFaqsList((prev) => prev.map((f) => (f.id === newFaq.id ? res.data : f)));
    }
  };

  const handleUpdateFaq = async (updatedFaq) => {
    setFaqsList((prev) =>
      prev.map((f) => (f.id === updatedFaq.id ? updatedFaq : f))
    );
    await apiService.updateFaq(updatedFaq.id, updatedFaq);
  };

  const handleDeleteFaq = async (faqId) => {
    setFaqsList((prev) => prev.filter((f) => f.id !== faqId));
    await apiService.deleteFaq(faqId);
  };

  const handleAddService = async (newService) => {
    setServicesList((prev) => [newService, ...prev]);
    const res = await apiService.addService(newService);
    if (res && res.data) {
      setServicesList((prev) => prev.map((s) => (s.id === newService.id ? res.data : s)));
    }
  };

  const handleUpdateService = async (updatedService) => {
    setServicesList((prev) =>
      prev.map((s) => (s.id === updatedService.id ? updatedService : s))
    );
    await apiService.updateService(updatedService.id, updatedService);
  };

  const handleDeleteService = async (serviceId) => {
    setServicesList((prev) => prev.filter((s) => s.id !== serviceId));
    await apiService.deleteService(serviceId);
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

  // Leads Handlers
  const handleCreateLead = async (leadPayload) => {
    const newLead = {
      id: `lead-${Date.now()}`,
      ...leadPayload,
    };
    setLeadsList((prev) => [newLead, ...prev]);
    showToast(`Inquiry Received! Thank you ${leadPayload.name}, our concierge team will contact ${leadPayload.phone}`);
    const res = await apiService.createLead(leadPayload);
    if (res && res.data) {
      setLeadsList((prev) => prev.map((l) => (l === newLead ? res.data : l)));
    }
  };

  const handleUpdateLeadStatus = async (id, status) => {
    setLeadsList((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    await apiService.updateLeadStatus(id, status);
  };

  const handleDeleteLead = async (id) => {
    setLeadsList((prev) => prev.filter((l) => l.id !== id));
    await apiService.deleteLead(id);
  };

  // Fetch live bookings, quotes, tyres, brands, FAQs, services, and leads from API on mount
  useEffect(() => {
    async function loadApiData() {
      const [apiBookings, apiQuotes, apiTyres, apiBrands, apiFaqs, apiServices, apiLeads] = await Promise.all([
        apiService.getBookings(),
        apiService.getQuotes(),
        apiService.getTyres(),
        apiService.getBrands(),
        apiService.getFaqs(),
        apiService.getServices(),
        apiService.getLeads(),
      ]);

      if (apiBookings && apiBookings.length > 0) {
        setBookingsList(apiBookings);
      }
      if (apiQuotes && apiQuotes.length > 0) {
        setQuotesList(apiQuotes);
      }
      if (apiTyres && apiTyres.length > 0) {
        const normalized = apiTyres.filter(Boolean).map(normalizeTyre).filter(Boolean);
        if (normalized.length > 0) setTyresDataList(normalized);
      }
      if (apiBrands && apiBrands.length > 0) {
        setBrandsList(apiBrands);
      }
      if (apiFaqs && apiFaqs.length > 0) {
        setFaqsList(apiFaqs);
      }
      if (apiServices && apiServices.length > 0) {
        setServicesList(apiServices);
      }
      if (apiLeads && apiLeads.length > 0) {
        setLeadsList(apiLeads);
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

  const handleGoToServices = (serviceId) => {
    setCurrentPage("services");
    if (typeof serviceId === "string" && serviceId.trim()) {
      setTargetServiceId(serviceId.trim());
    } else {
      setTargetServiceId(null);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleGoToAbout = () => {
    setCurrentPage("about");
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleGoToContact = () => {
    setCurrentPage("contact");
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleGoToPrivacy = () => {
    setCurrentPage("privacy");
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleGoToTerms = () => {
    setCurrentPage("terms");
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
          onLoginSuccess={() => {
            localStorage.setItem("sadguru_admin_auth", "true");
            setIsAdminAuthenticated(true);
            setCurrentPage("admin");
          }}
          onReturnToSite={() => {
            localStorage.removeItem("sadguru_admin_auth");
            setIsAdminAuthenticated(false);
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
          localStorage.removeItem("sadguru_admin_auth");
          localStorage.removeItem("sadguru_admin_active_tab");
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
        faqsList={faqsList}
        onAddFaq={handleAddFaq}
        onUpdateFaq={handleUpdateFaq}
        onDeleteFaq={handleDeleteFaq}
        servicesList={servicesList}
        onAddService={handleAddService}
        onUpdateService={handleUpdateService}
        onDeleteService={handleDeleteService}
        leadsList={leadsList}
        onUpdateLeadStatus={handleUpdateLeadStatus}
        onDeleteLead={handleDeleteLead}
        isChatbotEnabled={isChatbotEnabled}
        onToggleChatbotEnabled={() => {
          setIsChatbotEnabled((prev) => {
            const newVal = !prev;
            localStorage.setItem("sadguru_chatbot_enabled", newVal);
            return newVal;
          });
        }}
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
        onNavigateServices={handleGoToServices}
        onNavigateAbout={handleGoToAbout}
        onNavigateContact={handleGoToContact}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenFinder={() => handleGoToHome()}
        onOpenBooking={(service) =>
          setBookingState({ isOpen: true, service: service || null, tyre: null })
        }
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenChatBot={() => setIsChatBotOpen((prev) => !prev)}
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
            onExploreClick={() => handleGoToCatalog(true)}
            onServicesClick={() => handleGoToServices()}
            onFinderClick={() => handleGoToHome()}
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
              tyresData={tyresDataList}
              onSelectTyre={(tyre) => handleGoToProductDetail(tyre)}
            />
          </SectionReveal>

          {/* 7. Specialized Services */}
          <SectionReveal>
            <ServicesSection
              servicesList={servicesList}
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
              onExploreClick={() => handleGoToCatalog(true)}
              onFinderClick={() => handleGoToHome()}
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
          tyresData={tyresDataList}
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
          tyresData={tyresDataList}
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

      {/* VIEW 4: SERVICES PAGE */}
      {currentPage === "services" && (
        <ServicesPage
          servicesList={servicesList}
          targetServiceId={targetServiceId}
          onBookService={(service) =>
            setBookingState({ isOpen: true, service: service || null, tyre: null })
          }
          onNavigateHome={handleGoToHome}
        />
      )}

      {/* VIEW 5: ABOUT US PAGE */}
      {currentPage === "about" && (
        <AboutPage
          onNavigateHome={handleGoToHome}
          onNavigateCatalog={handleGoToCatalog}
          brandsList={brandsList}
        />
      )}

      {/* VIEW 6: CONTACT US PAGE */}
      {currentPage === "contact" && (
        <ContactPage
          faqsList={faqsList}
          onNavigateHome={handleGoToHome}
          onSubmitLead={handleCreateLead}
          onOpenBooking={() =>
            setBookingState({ isOpen: true, service: null, tyre: null })
          }
        />
      )}

      {/* VIEW 7: PRIVACY POLICY PAGE */}
      {currentPage === "privacy" && (
        <PrivacyPolicyPage onNavigateHome={handleGoToHome} />
      )}

      {/* VIEW 8: TERMS & CONDITIONS PAGE */}
      {currentPage === "terms" && (
        <TermsConditionsPage onNavigateHome={handleGoToHome} />
      )}

      {/* 11. Global Constant Footer */}
      <Footer
        onOpenFinder={() => handleGoToHome()}
        onNavigateHome={handleGoToHome}
        onNavigateCatalog={handleGoToCatalog}
        onNavigateServices={handleGoToServices}
        onNavigateAbout={handleGoToAbout}
        onNavigateContact={handleGoToContact}
        onNavigatePrivacy={handleGoToPrivacy}
        onNavigateTerms={handleGoToTerms}
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
          tyresData={tyresDataList}
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

      {/* AI Chatbot Specialist */}
      {isChatbotEnabled && (
        <ChatBot
          isOpen={isChatBotOpen}
          onToggle={(open) => setIsChatBotOpen(open)}
          onOpenFinder={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onOpenBooking={(serviceName) => {
            setBookingState({
              isOpen: true,
              service: serviceName ? { name: serviceName, priceINR: 1850 } : null,
              tyre: null,
            });
          }}
          onOpenCatalog={() => {
            setCurrentPage("catalog");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onOpenContact={() => {
            setCurrentPage("contact");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}

    </div>
  );
}
