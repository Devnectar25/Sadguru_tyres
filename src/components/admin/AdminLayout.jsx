import React, { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  Package,
  CalendarCheck,
  FileText,
  Settings,
  LogOut,
  Bell,
  Search,
  Plus,
  ArrowUpRight,
  ShieldAlert,
  Users,
  Building2,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  DollarSign,
  TrendingUp,
  Filter,
  CreditCard,
  Sparkles,
  Trash2,
  Edit,
  X,
  Check,
  Eye,
  EyeOff,
  Award,
  BarChart3,
  UserCheck,
  ShieldCheck,
  AlertTriangle,
  Activity,
  RefreshCw,
  Play,
  Download,
  UserPlus,
  XCircle,
  AlertCircle,
  Terminal,
  Cpu,
  Server,
  Lock,
  FileSpreadsheet,
  Layers,
  PieChart,
  Zap,
  HelpCircle,
  Wrench,
  Upload,
  Bot,
  Phone,
  Mail,
  Tag,
  MessageCircle,
  MapPin,
  RotateCcw,
} from "lucide-react";
import { apiService } from "../../services/api";

export default function AdminLayout({
  onExitAdmin,
  tyresData = [],
  onAddTyre,
  onUpdateTyre,
  onDeleteTyre,
  brandsList = [],
  onAddBrand,
  onUpdateBrand,
  onDeleteBrand,
  bookingsList = [],
  onUpdateBookingStatus,
  quotesList = [],
  onUpdateQuoteStatus,
  faqsList = [],
  onAddFaq,
  onUpdateFaq,
  onDeleteFaq,
  servicesList = [],
  onAddService,
  onUpdateService,
  onDeleteService,
  leadsList = [],
  onUpdateLeadStatus,
  onDeleteLead,
  isChatbotEnabled,
  onToggleChatbotEnabled,
  unlockedPrimeFeatures: externalUnlockedPrimeFeatures,
  onUpdateUnlockedPrimeFeatures,
  shopSettings,
  onUpdateShopSettings,
  onResetShopSettings,
}) {
  const mainContentRef = useRef(null);

  const [activeTab, setActiveTab] = useState(() => {
    try {
      const hashRaw = window.location.hash.toLowerCase();
      const hash = hashRaw.replace("#admin/", "").replace("#admin", "").replace("#", "");
      const validTabs = [
        "dashboard",
        "inventory",
        "brands",
        "services",
        "bookings",
        "quotes",
        "leads",
        "subadmins",
        "faqs",
        "analytics",
        "chatbot",
        "error-monitoring",
        "coupons",
        "whatsapp",
        "products",
        "settings",
      ];
      if (hash && validTabs.includes(hash)) {
        return hash;
      }
      const saved = localStorage.getItem("sadguru_admin_active_tab");
      if (saved && validTabs.includes(saved)) {
        return saved;
      }
    } catch (e) {
      console.error("Failed to read saved admin tab:", e);
    }
    return "dashboard";
  });

  // Sync activeTab changes to localStorage and URL Hash + Scroll content container to top
  useEffect(() => {
    if (activeTab) {
      if (mainContentRef.current) {
        mainContentRef.current.scrollTop = 0;
      }
      window.scrollTo({ top: 0, left: 0 });
      try {
        localStorage.setItem("sadguru_admin_active_tab", activeTab);
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, "", `#admin/${activeTab}`);
        } else {
          window.location.hash = `admin/${activeTab}`;
        }
      } catch (e) {
        console.error("Failed to persist active admin tab:", e);
      }
    }
  }, [activeTab]);

  const [searchTerm, setSearchTerm] = useState("");
  const [notificationMsg, setNotificationMsg] = useState(null);

  // ==================== NEW MODULE: SERVICES MANAGEMENT STATE ====================
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    title: "",
    shortDesc: "",
    price: "",
    duration: "30 Mins",
    category: "Tyre Care",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80",
    status: "Active",
    showOnHome: true,
  });
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState("all");
  const [serviceStatusFilter, setServiceStatusFilter] = useState("all");

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // ==================== PRIME FEATURES UNLOCK & PAYMENT STATE ====================
  const PRIME_FEATURES = [
    {
      id: "analytics",
      name: "Analytics & Report",
      subtitle: "View detailed product performance & sales funnel",
      icon: BarChart3,
      color: "#3b82f6",
      priceINR: 2000,
      tagline: "Comprehensive revenue graphs, customer conversion analytics & sales audit reports",
      benefits: [
        "Real-time revenue, order volume & sales tracking",
        "Conversion funnel analysis (Page views → Inquiries → Sales)",
        "Top selling tyre models & manufacturer breakdown",
        "One-click JSON & CSV business audit export",
      ],
    },
    {
      id: "chatbot",
      name: "Chatbot Support",
      subtitle: "Manage product automated replies & AI assistant",
      icon: Bot,
      color: "#10b981",
      priceINR: 2000,
      tagline: "24/7 AI-driven customer support, automated tyre lookup, and instant appointment booking",
      benefits: [
        "Automated tyre size & vehicle compatibility recommendations",
        "Instant 24/7 customer query resolution & booking capture",
        "Customizable greeting, business hours & FAQ triggers",
        "Live conversation simulator and visitor query logs",
      ],
    },
    {
      id: "error-monitoring",
      name: "Error Monitoring",
      subtitle: "Track inventory sync issues & server diagnostics",
      icon: ShieldAlert,
      color: "#ef4444",
      priceINR: 2000,
      tagline: "Real-time system health diagnostics, latency monitoring, and automated exception tracking",
      benefits: [
        "Real-time server uptime, DB health & latency diagnostics",
        "Automated critical exception logs with full stack traces",
        "Filter by severity (Critical, Warning, Info) & status",
        "Interactive error simulation sandbox & log resolution tools",
      ],
    },
    {
      id: "coupons",
      name: "Coupons & Discounts",
      subtitle: "Create product discount codes & promo campaigns",
      icon: Tag,
      color: "#8b5cf6",
      priceINR: 2000,
      tagline: "Create and manage promo discount codes, seasonal deals, and instant cart discounts",
      benefits: [
        "Create Percentage (%) or Flat (₹) discount coupon codes",
        "Set expiry dates, minimum spend limits & max redemption caps",
        "Instant copyable coupon codes with active status toggling",
        "Track coupon redemptions and gross customer savings",
      ],
    },
    {
      id: "whatsapp",
      name: "WhatsApp Marketing",
      subtitle: "Send product promos & order alerts via WhatsApp",
      icon: MessageCircle,
      color: "#22c55e",
      priceINR: 2000,
      tagline: "Broadcast marketing campaigns, tyre maintenance alerts, and booking updates directly to WhatsApp",
      benefits: [
        "Broadcast promotional deals & festive tyre discounts",
        "Target customer segments (Leads, Recent Buyers, Quotes)",
        "Realistic WhatsApp chat bubble template preview",
        "Simulate broadcast campaign delivery with live progress metrics",
      ],
    },
  ];

  const [internalUnlockedFeatures, setInternalUnlockedFeatures] = useState(() => {
    try {
      localStorage.removeItem("sadguru_unlocked_prime_features");
      localStorage.removeItem("sadguru_prime_unlocked");
      localStorage.removeItem("sadguru_prime_features_v3");
      localStorage.removeItem("sadguru_prime_features_v2");
      localStorage.removeItem("sadguru_prime_features_v1");
      const saved = localStorage.getItem("sadguru_prime_features_v4");
      if (saved) return JSON.parse(saved);
      return [];
    } catch (_) {
      return [];
    }
  });

  const unlockedPrimeFeatures = externalUnlockedPrimeFeatures !== undefined
    ? externalUnlockedPrimeFeatures
    : internalUnlockedFeatures;

  const setUnlockedPrimeFeatures = (newFeatures) => {
    setInternalUnlockedFeatures(newFeatures);
    if (onUpdateUnlockedPrimeFeatures) {
      onUpdateUnlockedPrimeFeatures(newFeatures);
    } else {
      if (newFeatures && newFeatures.length > 0) {
        localStorage.setItem("sadguru_prime_features_v4", JSON.stringify(newFeatures));
      } else {
        localStorage.removeItem("sadguru_prime_features_v4");
      }
    }
  };

  const handleLockAllPrimeFeatures = () => {
    setUnlockedPrimeFeatures([]);
    setPrimePaymentReceipt(null);
    localStorage.removeItem("sadguru_prime_features_v4");
    localStorage.removeItem("sadguru_prime_features_v3");
    localStorage.removeItem("sadguru_prime_features_v2");
    localStorage.removeItem("sadguru_prime_features_v1");
    localStorage.removeItem("sadguru_unlocked_prime_features");
    localStorage.removeItem("sadguru_prime_unlocked");
    localStorage.removeItem("sadguru_prime_last_receipt");
    triggerToast("🔒 All Prime Products have been locked. Payment required to unlock.");
  };

  const isFeatureUnlocked = (featureId) => {
    return (
      Array.isArray(unlockedPrimeFeatures) &&
      (unlockedPrimeFeatures.includes("all") || unlockedPrimeFeatures.includes(featureId))
    );
  };

  const [showPrimeUnlockModal, setShowPrimeUnlockModal] = useState(false);
  const [selectedPrimeFeatureForUnlock, setSelectedPrimeFeatureForUnlock] = useState(null);
  const [selectedPrimePlan, setSelectedPrimePlan] = useState("single"); // "single" (₹2000) or "bundle" (₹9000)
  const [showPrimePaymentSuccessModal, setShowPrimePaymentSuccessModal] = useState(false);
  const [primePaymentReceipt, setPrimePaymentReceipt] = useState(() => {
    try {
      const saved = localStorage.getItem("sadguru_prime_last_receipt");
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return null;
  });

  // Coupons State
  const [couponsList, setCouponsList] = useState([
    { id: "c1", code: "MONSOON20", type: "percentage", value: 20, minSpend: 4000, maxDiscount: 1500, expiry: "2026-10-31", uses: 48, status: "Active" },
    { id: "c2", code: "FIRSTTYRE10", type: "percentage", value: 10, minSpend: 2000, maxDiscount: 800, expiry: "2026-12-31", uses: 112, status: "Active" },
    { id: "c3", code: "DIWALI500", type: "flat", value: 500, minSpend: 6000, maxDiscount: 500, expiry: "2026-11-15", uses: 29, status: "Active" },
    { id: "c4", code: "SADGURU100", type: "flat", value: 100, minSpend: 1000, maxDiscount: 100, expiry: "2026-12-31", uses: 75, status: "Inactive" },
  ]);
  const [showAddCouponModal, setShowAddCouponModal] = useState(false);
  const [couponForm, setCouponForm] = useState({
    code: "",
    type: "percentage",
    value: 15,
    minSpend: 2500,
    maxDiscount: 1000,
    expiry: "2026-12-31",
    status: "Active",
  });

  // WhatsApp Marketing State
  const [whatsappTemplate, setWhatsappTemplate] = useState("monsoon_tyre_check");
  const [whatsappAudience, setWhatsappAudience] = useState("all_leads");
  const [whatsappCustomMsg, setWhatsappCustomMsg] = useState(
    "🚗 Monsoon Tyre Safety Reminder from Sadguru Tyres! Get 20% OFF on 3D Laser Alignment & complimentary tyre health check this week. Book today at https://sadgurutyres.com or call +91 98220 12345."
  );
  const [isBroadcastingWhatsapp, setIsBroadcastingWhatsapp] = useState(false);
  const [whatsappBroadcastLogs, setWhatsappBroadcastLogs] = useState([]);

  // Chatbot State
  const [chatbotActive, setChatbotActive] = useState(isChatbotEnabled !== false);
  const [chatbotGreeting, setChatbotGreeting] = useState(
    "Hello! Welcome to Sadguru Tyres Pune 🚗. How can I help you today with tyres, wheel alignment, or fitting services?"
  );
  const [chatbotPhone, setChatbotPhone] = useState("+91 98220 12345");
  const [simulatedChatMessages, setSimulatedChatMessages] = useState([
    { from: "bot", text: "Hello! Welcome to Sadguru Tyres Pune 🚗. How can I help you today?" },
    { from: "user", text: "I need Apollo 205/55 R16 tyres for my Honda City." },
    { from: "bot", text: "We have Apollo Alnac 4G (₹5,400) and Apollo Aspire 4G (₹6,200) in stock with free laser alignment. Would you like to book a fitting appointment?" },
  ]);
  const [testChatInput, setTestChatInput] = useState("");

  // Store & Workshop Settings State
  const DEFAULT_SETTINGS = {
    storeName: "Sadguru Tyres & Alignment Center",
    hubName: "Main Workshop Hub",
    address: "Sadguru Tyres & Alignment Center, Main Highway Junction, Pune, Maharashtra 411001",
    shortAddress: "Near Bus Stand, Main Road, Pune, Maharashtra 411001",
    googleMapsUrl: "https://maps.app.goo.gl/j9kVxiwCqT5APoYL8",
    tollFreePhone: "1800 15 11 00",
    directPhone: "+91 98220 12345 / 020 2543 8899",
    email: "care@sadgurutyres.com",
    weekdayHours: "Mon - Sat: 9:00 AM - 8:30 PM",
    sundayHours: "Sun: 10:00 AM - 4:00 PM (Open 7 Days)",
    closedNotice: "Open 7 Days",
    currency: "INR",
    expressTurnaround: "Express 30-minute fitment & alignment.",
  };

  const [settingsForm, setSettingsForm] = useState(() => {
    try {
      const local = localStorage.getItem("sadguru_shop_settings");
      if (local && local !== "undefined" && local !== "null") {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(local) };
      }
    } catch (_) {}
    return shopSettings || DEFAULT_SETTINGS;
  });
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  useEffect(() => {
    if (shopSettings && typeof shopSettings === "object") {
      setSettingsForm((prev) => ({ ...prev, ...shopSettings }));
    }
  }, [shopSettings]);

  const handleSaveStoreSettings = async (e) => {
    if (e) e.preventDefault();
    setIsSavingSettings(true);
    try {
      const payload = { ...DEFAULT_SETTINGS, ...settingsForm, updated_at: new Date().toISOString() };
      localStorage.setItem("sadguru_shop_settings", JSON.stringify(payload));
      if (onUpdateShopSettings) {
        await onUpdateShopSettings(payload);
      }
      triggerToast("✨ Workshop & Concierge settings updated dynamically across the website!");
    } catch (err) {
      console.error("Save settings error:", err);
      triggerToast("⚠️ Failed to save shop settings. Please try again.");
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleResetStoreSettings = async () => {
    if (window.confirm("Are you sure you want to reset store settings to default workshop information?")) {
      setSettingsForm(DEFAULT_SETTINGS);
      localStorage.removeItem("sadguru_shop_settings");
      if (onResetShopSettings) {
        await onResetShopSettings();
      } else if (onUpdateShopSettings) {
        await onUpdateShopSettings(DEFAULT_SETTINGS);
      }
      triggerToast("↺ Store settings restored to factory defaults!");
    }
  };

  // Handle Prime Card Click
  const handlePrimeCardClick = (feature) => {
    if (isFeatureUnlocked(feature.id)) {
      setActiveTab(feature.id);
    } else {
      setSelectedPrimeFeatureForUnlock(feature);
      setSelectedPrimePlan("single");
      setShowPrimeUnlockModal(true);
    }
  };

  // Launch Razorpay Payment for Prime Features
  const handleInitiatePrimeRazorpayPayment = async (feature, plan = "single") => {
    setIsProcessingPayment(true);
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      setIsProcessingPayment(false);
      triggerToast("⚠️ Failed to load Razorpay checkout. Please check internet connection.");
      return;
    }

    const isBundle = plan === "bundle";
    const amountINR = isBundle ? 9000 : (feature?.priceINR || 2000);
    const featureName = isBundle ? "All 5 Prime Features Suite" : (feature?.name || "Prime Feature");
    const featureKey = isBundle ? "all" : (feature?.id || "custom");

    const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_SIPp9QznVVM48W";

    const options = {
      key: keyId,
      amount: amountINR * 100,
      currency: "INR",
      name: "DevNectar Consultancy",
      description: `Unlock Prime: ${featureName}`,
      image: "/images/sgt_logo.png",
      handler: async function (response) {
        try {
          const verifyPayload = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id || `order_prime_${Date.now()}`,
            amount: amountINR,
            feature: `prime_${featureKey}`,
            userName: currentUser?.name || "SuperAdmin",
            userEmail: currentUser?.email || "admin@sadgurutyres.com",
          };

          await apiService.verifyPayment(verifyPayload);

          const receiptData = {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id || `ord_prime_${Date.now()}`,
            amount: amountINR,
            currency: "INR",
            feature: featureName,
            featureKey: featureKey,
            date: new Date().toLocaleString("en-IN"),
            paidBy: currentUser?.name || "Super Administrator",
            email: currentUser?.email || "admin@sadgurutyres.com",
            status: "Captured & Verified",
          };

          const newUnlocked = isBundle
            ? ["analytics", "chatbot", "error-monitoring", "coupons", "whatsapp", "all"]
            : [...new Set([...unlockedPrimeFeatures, featureKey])];

          setUnlockedPrimeFeatures(newUnlocked);
          localStorage.setItem("sadguru_prime_features_v4", JSON.stringify(newUnlocked));
          localStorage.setItem("sadguru_prime_last_receipt", JSON.stringify(receiptData));
          setPrimePaymentReceipt(receiptData);

          setShowPrimeUnlockModal(false);
          setIsProcessingPayment(false);
          setShowPrimePaymentSuccessModal(true);
          triggerToast(`🎉 Payment Successful! ${featureName} is now unlocked.`);
        } catch (err) {
          console.error("Prime payment post-processing error:", err);
          const fallbackReceipt = {
            paymentId: response.razorpay_payment_id,
            amount: amountINR,
            currency: "INR",
            feature: featureName,
            featureKey: featureKey,
            date: new Date().toLocaleString("en-IN"),
            paidBy: currentUser?.name || "Super Administrator",
            status: "Captured",
          };
          const newUnlocked = isBundle
            ? ["analytics", "chatbot", "error-monitoring", "coupons", "whatsapp", "all"]
            : [...new Set([...unlockedPrimeFeatures, featureKey])];

          setUnlockedPrimeFeatures(newUnlocked);
          localStorage.setItem("sadguru_prime_features_v4", JSON.stringify(newUnlocked));
          localStorage.setItem("sadguru_prime_last_receipt", JSON.stringify(fallbackReceipt));
          setPrimePaymentReceipt(fallbackReceipt);

          setShowPrimeUnlockModal(false);
          setIsProcessingPayment(false);
          setShowPrimePaymentSuccessModal(true);
        }
      },
      prefill: {
        name: currentUser?.name || "Super Administrator",
        email: currentUser?.email || "admin@sadgurutyres.com",
        contact: "+91 98220 12345",
      },
      notes: {
        feature_unlock: featureName,
        store: "DevNectar Consultancy",
      },
      theme: {
        color: "#1e3a8a", // Navy Blue
      },
      modal: {
        ondismiss: function () {
          setIsProcessingPayment(false);
        },
      },
    };

    try {
      const rzpInstance = new window.Razorpay(options);
      rzpInstance.on("payment.failed", function (failResponse) {
        setIsProcessingPayment(false);
        triggerToast(`⚠️ Payment Declined: ${failResponse.error?.description || "Transaction failed"}`);
      });
      rzpInstance.open();
    } catch (e) {
      console.error("Razorpay prime open error:", e);
      setIsProcessingPayment(false);
      triggerToast("⚠️ Error launching Razorpay gateway.");
    }
  };

  // Dynamic Razorpay Script Loader
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleOpenAddServiceModal = () => {
    if ((servicesList || []).length >= 12) {
      triggerToast("⚠️ Maximum limit of 12 services reached. You cannot add more services.");
      return;
    }
    const currentHomeCount = (servicesList || []).filter(
      (s) => Boolean(s.showOnHome ?? s.show_on_home)
    ).length;
    setEditingService(null);
    setServiceForm({
      title: "",
      name: "",
      shortDesc: "",
      description: "",
      price: "",
      priceINR: "",
      duration: "30 Mins",
      category: "Tyre Care",
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80",
      status: "Active",
      showOnHome: currentHomeCount < 3,
    });
    setShowAddServiceModal(true);
  };

  const handleOpenEditServiceModal = (service) => {
    setEditingService(service);
    const serviceName = service.title || service.name || "";
    const serviceDesc = service.shortDesc || service.description || "";
    const servicePrice = service.price || service.priceINR || service.price_inr || "";
    const isShowOnHome = Boolean(service.showOnHome ?? service.show_on_home);
    setServiceForm({
      ...service,
      title: serviceName,
      name: serviceName,
      shortDesc: serviceDesc,
      description: serviceDesc,
      price: servicePrice,
      priceINR: service.priceINR || service.price_inr || "",
      duration: service.duration || "30 Mins",
      category: service.category || "Tyre Care",
      image: service.image || "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80",
      status: service.status || "Active",
      showOnHome: isShowOnHome,
    });
    setShowAddServiceModal(true);
  };

  const handleSaveServiceForm = async (e) => {
    e.preventDefault();
    const serviceName = serviceForm.title || serviceForm.name;
    if (!serviceName) return;

    if (!editingService && (servicesList || []).length >= 12) {
      triggerToast("⚠️ Maximum limit of 12 services reached. You cannot add more services.");
      return;
    }

    const showOnHome = Boolean(serviceForm.showOnHome ?? serviceForm.show_on_home);
    if (showOnHome) {
      const activeHomeCount = (servicesList || []).filter(
        (s) => (!editingService || s.id !== editingService.id) && Boolean(s.showOnHome ?? s.show_on_home)
      ).length;
      if (activeHomeCount >= 3) {
        triggerToast("⚠️ Maximum 3 services can be displayed on the Home page. Please uncheck 'Show on Home' or hide another service first.");
        return;
      }
    }

    let numPrice = 0;
    if (typeof serviceForm.price === "number") numPrice = serviceForm.price;
    else if (typeof serviceForm.priceINR === "number") numPrice = serviceForm.priceINR;
    else if (serviceForm.price || serviceForm.priceINR) {
      const raw = String(serviceForm.price || serviceForm.priceINR).replace(/[^0-9.]/g, "");
      numPrice = parseFloat(raw) || 0;
    }

    const payload = {
      ...serviceForm,
      title: serviceName,
      name: serviceName,
      shortDesc: serviceForm.shortDesc || serviceForm.description || "",
      description: serviceForm.shortDesc || serviceForm.description || "",
      priceINR: numPrice,
      price_inr: numPrice,
      price: serviceForm.price || `₹ ${numPrice.toLocaleString("en-IN")}`,
      duration: serviceForm.duration || "30 Mins",
      category: serviceForm.category || "Tyre Care",
      image: serviceForm.image || "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80",
      status: serviceForm.status || "Active",
      showOnHome: showOnHome,
      show_on_home: showOnHome,
    };

    if (editingService) {
      if (onUpdateService) await onUpdateService({ ...editingService, ...payload });
      triggerToast(`Updated service "${serviceName}"`);
    } else {
      const newService = {
        id: `srv-${Date.now()}`,
        ...payload,
      };
      if (onAddService) await onAddService(newService);
      triggerToast(`Added new service "${serviceName}"`);
    }
    setShowAddServiceModal(false);
  };

  const handleDeleteServiceItem = async (id, name) => {
    if (onDeleteService) await onDeleteService(id);
    triggerToast(`Deleted service "${name || "Service"}"`);
  };

  const handleToggleServiceStatus = async (service) => {
    const newStatus = service.status === "Active" ? "Inactive" : "Active";
    const updated = { ...service, status: newStatus };
    if (onUpdateService) await onUpdateService(updated);
    triggerToast(`Set "${service.title || service.name}" status to ${newStatus}`);
  };

  const handleToggleServiceShowOnHome = async (service) => {
    const currentVal = Boolean(service.showOnHome ?? service.show_on_home);
    const newShowOnHome = !currentVal;

    if (newShowOnHome) {
      const activeHomeCount = (servicesList || []).filter(
        (s) => s.id !== service.id && Boolean(s.showOnHome ?? s.show_on_home)
      ).length;
      if (activeHomeCount >= 3) {
        triggerToast("⚠️ Maximum 3 services can be featured on the Home screen. Hide another service before enabling this one.");
        return;
      }
    }

    const updated = {
      ...service,
      showOnHome: newShowOnHome,
      show_on_home: newShowOnHome,
    };
    if (onUpdateService) await onUpdateService(updated);
    triggerToast(
      `Service "${service.title || service.name}" ${newShowOnHome ? "is now visible on Home screen" : "hidden from Home screen"}`
    );
  };

  // Form State for Adding / Editing Tyre
  const [showAddTyreModal, setShowAddTyreModal] = useState(false);
  const [editingTyre, setEditingTyre] = useState(null);
  const [selectedDetailTyre, setSelectedDetailTyre] = useState(null);
  const [tyreForm, setTyreForm] = useState({
    name: "",
    brand: "",
    vehicleType: "",
    tyreType: "",
    performanceLevel: "",
    width: "",
    profile: "",
    rimSize: "",
    category: "",
    badge: "",
    priceINR: "",
    priceUSD: "",
    stock: "",
    rating: "",
    image: "",
    image2: "",
    image3: "",
    tagline: "",
  });

  // Form State for Adding / Editing Brand
  const [showAddBrandModal, setShowAddBrandModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [brandForm, setBrandForm] = useState({
    name: "",
    logo: "/images/YOKOHAMA.png",
    tagline: "Official Partner",
  });

  // ==================== NEW MODULE: SUB-ADMINS & ROLES STATE ====================
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("sadguru_current_user");
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return {
      id: "superadmin",
      name: "SuperAdmin",
      email: "admin@sadgurutyres.com",
      role: "Super Administrator",
      isSuperAdmin: true,
      permissions: ["all"],
      avatarColor: "#ef4444",
    };
  });
  const [subadminsList, setSubadminsList] = useState([]);
  const [auditLogsList, setAuditLogsList] = useState([]);
  const [showAddSubadminModal, setShowAddSubadminModal] = useState(false);
  const [editingSubadmin, setEditingSubadmin] = useState(null);
  const [subadminForm, setSubadminForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Inventory Manager",
    phone: "+91 98000 00000",
    permissions: ["inventory_read", "inventory_write"],
  });
  const [subadminFormErrors, setSubadminFormErrors] = useState({});
  const [showSubadminPassword, setShowSubadminPassword] = useState(false);

  // Sub-Admin Module Permission Checker
  const isTabPermitted = (tabId) => {
    if (!currentUser) return true;
    if (currentUser.isSuperAdmin || (currentUser.permissions && currentUser.permissions.includes("all"))) {
      return true;
    }
    const perms = currentUser.permissions || [];
    switch (tabId) {
      case "dashboard":
        return true;
      case "inventory":
      case "products":
        return perms.includes("inventory_read") || perms.includes("inventory_write");
      case "brands":
        return perms.includes("brands_manage");
      case "services":
        return perms.includes("inventory_write") || perms.includes("inventory_read") || perms.includes("bookings_manage");
      case "bookings":
        return perms.includes("bookings_manage");
      case "quotes":
        return perms.includes("quotes_manage");
      case "leads":
        return perms.includes("bookings_manage") || perms.includes("quotes_manage");
      case "faqs":
        return perms.includes("bookings_manage") || perms.includes("inventory_write");
      case "chatbot":
        return perms.includes("bookings_manage");
      case "coupons":
        return perms.includes("inventory_write") || perms.includes("bookings_manage");
      case "whatsapp":
        return perms.includes("bookings_manage");
      case "subadmins":
      case "settings":
      case "error-monitoring":
      case "analytics":
        return false; // SuperAdmin only
      default:
        return false;
    }
  };

  // Redirect Sub-Admin to dashboard if navigating to unauthorized tab
  useEffect(() => {
    if (activeTab && !isTabPermitted(activeTab)) {
      setActiveTab("dashboard");
    }
  }, [activeTab, currentUser]);

  // ==================== NEW MODULE: ERROR MONITORING STATE ====================
  const [errorLogs, setErrorLogs] = useState([]);
  const [errorSummary, setErrorSummary] = useState({
    unresolved: 0,
    critical: 0,
    systemUptime: "99.98%",
    avgLatencyMs: 38,
    dbStatus: "Healthy",
  });
  const [errorSeverityFilter, setErrorSeverityFilter] = useState("all");
  const [errorStatusFilter, setErrorStatusFilter] = useState("all");
  const [showSimulateErrorModal, setShowSimulateErrorModal] = useState(false);
  const [simulatedErrorForm, setSimulatedErrorForm] = useState({
    severity: "Warning",
    module: "API Endpoint Handler",
    message: "High response latency (>650ms) on tyre search API",
    stack: "Warning: Slow database connection response at getTyres (routes/tyres.js:14)",
  });

  // ==================== NEW MODULE: ANALYTICS STATE ====================
  const [analyticsPeriod, setAnalyticsPeriod] = useState("30d");
  const [analyticsData, setAnalyticsData] = useState(null);

  // ==================== NEW MODULE: FAQ MANAGER STATE ====================
  const [showAddFaqModal, setShowAddFaqModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [faqForm, setFaqForm] = useState({
    question: "",
    answer: "",
    category: "Services & Workshop",
    status: "Active",
  });
  const [faqCategoryFilter, setFaqCategoryFilter] = useState("all");

  const handleOpenAddFaqModal = () => {
    if ((faqsList || []).length >= 5) {
      triggerToast("⚠️ FAQ Limit Reached! Maximum 5 FAQs allowed. Edit or delete existing ones.");
      return;
    }
    setEditingFaq(null);
    setFaqForm({
      question: "",
      answer: "",
      category: "Services & Workshop",
      status: "Active",
    });
    setShowAddFaqModal(true);
  };

  const handleOpenEditFaqModal = (faq) => {
    setEditingFaq(faq);
    setFaqForm({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || "Services & Workshop",
      status: faq.status || "Active",
    });
    setShowAddFaqModal(true);
  };

  const handleSaveFaqForm = async (e) => {
    e.preventDefault();
    if (!faqForm.question || !faqForm.answer) return;

    if (editingFaq) {
      const updatedItem = {
        ...editingFaq,
        ...faqForm,
        id: editingFaq.id,
      };
      if (onUpdateFaq) await onUpdateFaq(editingFaq.id, updatedItem);
      triggerToast(`Updated FAQ entry`);
    } else {
      if ((faqsList || []).length >= 5) {
        triggerToast("⚠️ FAQ Limit Reached! Maximum 5 FAQs allowed.");
        setShowAddFaqModal(false);
        return;
      }
      const newFaqItem = {
        id: `faq_${Date.now()}`,
        ...faqForm,
      };
      if (onAddFaq) await onAddFaq(newFaqItem);
      triggerToast(`Created new FAQ entry`);
    }
    setShowAddFaqModal(false);
  };

  const handleDeleteFaqItem = async (id, question) => {
    if (onDeleteFaq) await onDeleteFaq(id);
    triggerToast(`Deleted FAQ item`);
  };

  // Toast Helper
  const triggerToast = (msg) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  // Pre-calculated Metrics for Dashboard
  const safeBookings = (bookingsList || []).filter(Boolean);
  const safeTyres = (tyresData || []).filter(Boolean);
  const safeErrors = (errorLogs || []).filter(Boolean);

  const totalRevenueINR = safeBookings.reduce((acc, b) => acc + (b.totalINR || 1850), 0) + 1450000;
  const pendingBookingsCount = safeBookings.filter((b) => b.status === "Pending").length;
  const totalTyresCount = safeTyres.length;
  const unresolvedErrorsCount = safeErrors.filter((e) => e.status === "Unresolved").length;

  // Initial Fetch for Subadmins, Errors, and Analytics
  useEffect(() => {
    async function loadAdminData() {
      // Load Subadmins
      const subRes = await apiService.getSubadmins();
      if (subRes && subRes.success) {
        setSubadminsList(subRes.data || []);
        setAuditLogsList(subRes.auditLogs || []);
      }

      // Load Errors
      const errRes = await apiService.getErrors();
      if (errRes && errRes.success) {
        setErrorLogs(errRes.data || []);
        setErrorSummary(errRes.summary || {});
      }

      // Load Analytics
      const analyticsRes = await apiService.getAnalytics(analyticsPeriod);
      if (analyticsRes) {
        setAnalyticsData(analyticsRes);
      }
    }
    loadAdminData();
  }, [analyticsPeriod]);

  // Brand Handlers
  const handleOpenAddBrandModal = () => {
    if ((brandsList || []).length >= 6) {
      triggerToast("⚠️ Maximum 6 Partner Brands allowed in Showcase. Edit or delete an existing brand.");
      return;
    }
    setEditingBrand(null);
    setBrandForm({
      name: "",
      logo: "/images/YOKOHAMA.png",
      tagline: "Official Partner",
    });
    setShowAddBrandModal(true);
  };

  const handleOpenEditBrandModal = (brand) => {
    setEditingBrand(brand);
    setBrandForm({
      name: brand.name,
      logo: brand.logo || "/images/YOKOHAMA.png",
      tagline: brand.tagline || "Official Partner",
    });
    setShowAddBrandModal(true);
  };

  const handleSaveBrandForm = (e) => {
    e.preventDefault();
    if (!brandForm.name) return;

    try {
      if (editingBrand) {
        if (onUpdateBrand) onUpdateBrand({ ...editingBrand, ...brandForm });
        triggerToast(`Updated brand "${brandForm.name}"`);
      } else {
        if ((brandsList || []).length >= 6) {
          triggerToast("⚠️ Maximum 6 Partner Brands allowed in Showcase.");
          setShowAddBrandModal(false);
          return;
        }
        const newId = brandForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();
        if (onAddBrand) onAddBrand({ ...brandForm, id: newId, status: "Active" });
        triggerToast(`New brand "${brandForm.name}" added to Showcase`);
      }
    } catch (err) {
      console.error("Error saving brand:", err);
      triggerToast(`⚠️ Failed to save brand details`);
    }
    setShowAddBrandModal(false);
  };

  // Tyre Handlers
  const handleOpenAddModal = () => {
    setEditingTyre(null);
    setTyreForm({
      name: "",
      brand: "",
      vehicleType: "Cars",
      tyreType: "All-Season",
      performanceLevel: "High Performance",
      width: "225",
      profile: "45",
      rimSize: "17",
      category: "Passenger Tyre",
      badge: "Featured",
      priceINR: 12500,
      priceUSD: 195,
      stock: 30,
      rating: 4.8,
      image: "",
      image2: "",
      image3: "",
      showOnHome: true,
      tagline: "",
    });
    setShowAddTyreModal(true);
  };

  const handleOpenEditModal = (tyre) => {
    setEditingTyre(tyre);
    setTyreForm({
      name: tyre.name,
      brand: tyre.brand || "Sadguru Apex",
      vehicleType: tyre.vehicleType || "Cars",
      tyreType: tyre.tyreType || "All-Season Premium",
      performanceLevel: tyre.performanceLevel || "High Performance",
      width: tyre.width || "225",
      profile: tyre.profile || "55",
      rimSize: tyre.rimSize || "17",
      category: tyre.category || "Premium Passenger",
      badge: tyre.badge || "Bestseller",
      priceINR: tyre.priceINR || 12500,
      priceUSD: tyre.priceUSD || 165,
      stock: tyre.stock || 30,
      rating: tyre.rating || 4.8,
      image: tyre.image || "https://zfxkqnwmydzoqqojrjms.supabase.co/storage/v1/object/public/tyres_products/tyre_sport.jpg",
      image2: tyre.image2 || "",
      image3: tyre.image3 || "",
      showOnHome: tyre.showOnHome !== false && tyre.show_on_home !== false && tyre.visual_specs?.show_on_home !== false,
      tagline: tyre.tagline || "Engineered for maximum grip and safety.",
    });
    setShowAddTyreModal(true);
  };

  const DEFAULT_TYRE_IMAGE = "https://zfxkqnwmydzoqqojrjms.supabase.co/storage/v1/object/public/tyres_products/tyre_sport.jpg";

  const handleSaveTyreForm = (e) => {
    e.preventDefault();
    if (!tyreForm.name) return;

    const primaryImage = tyreForm.image || DEFAULT_TYRE_IMAGE;
    const secondaryImage = tyreForm.image2 || "";
    const tertiaryImage = tyreForm.image3 || "";
    const showOnHome = tyreForm.showOnHome !== false;

    if (editingTyre) {
      onUpdateTyre({
        ...editingTyre,
        ...tyreForm,
        image: primaryImage,
        image2: secondaryImage,
        image3: tertiaryImage,
        showOnHome,
        show_on_home: showOnHome,
        visual_specs: {
          ...(editingTyre.visual_specs || {}),
          image2: secondaryImage,
          image3: tertiaryImage,
          show_on_home: showOnHome,
        },
        priceINR: Number(tyreForm.priceINR),
        priceUSD: Number(tyreForm.priceUSD),
        stock: Number(tyreForm.stock),
      });
      triggerToast(`Successfully updated tyre "${tyreForm.name}"`);
    } else {
      const newId = tyreForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();
      onAddTyre({
        ...tyreForm,
        id: newId,
        image: primaryImage,
        image2: secondaryImage,
        image3: tertiaryImage,
        showOnHome,
        show_on_home: showOnHome,
        visual_specs: {
          image2: secondaryImage,
          image3: tertiaryImage,
          show_on_home: showOnHome,
        },
        reviewsCount: 1,
        dateAdded: new Date().toISOString().split("T")[0],
        priceINR: Number(tyreForm.priceINR),
        priceUSD: Number(tyreForm.priceUSD),
        stock: Number(tyreForm.stock),
        specs: {
          wetGrip: "A",
          fuelEfficiency: "A",
          noiseLevel: "67 dB",
          speedRating: "Y (300 km/h)",
          warranty: "60,000 Km",
          treadwear: "340 A A",
          loadIndex: "98Y XL",
          sidewall: "Reinforced Kevlar",
          treadDepth: "8.5 mm",
          runFlat: "Available",
        },
      });
      triggerToast(`New tyre "${tyreForm.name}" added to inventory`);
    }
    setShowAddTyreModal(false);
  };

  // ==================== SUB-ADMIN HANDLERS ====================
  const handleOpenAddSubadmin = () => {
    setEditingSubadmin(null);
    setSubadminFormErrors({});
    setShowSubadminPassword(false);
    setSubadminForm({
      name: "",
      email: "",
      password: "",
      role: "Inventory Manager",
      phone: "+91 98000 00000",
      permissions: ["inventory_read", "inventory_write"],
    });
    setShowAddSubadminModal(true);
  };

  const handleOpenEditSubadmin = (subadmin) => {
    setEditingSubadmin(subadmin);
    setSubadminFormErrors({});
    setShowSubadminPassword(false);
    setSubadminForm({
      name: subadmin.name || "",
      email: subadmin.email || "",
      password: "", // Optional on edit
      role: subadmin.role || "Support Executive",
      phone: subadmin.phone || "+91 98000 00000",
      permissions: subadmin.permissions || ["bookings_manage"],
    });
    setShowAddSubadminModal(true);
  };

  const handleSaveSubadminForm = async (e) => {
    e.preventDefault();
    const errors = {};

    const cleanName = (subadminForm.name || "").trim();
    const cleanEmail = (subadminForm.email || "").trim().toLowerCase();
    const cleanPassword = (subadminForm.password || "").trim();
    const cleanPhone = (subadminForm.phone || "").trim();

    if (!cleanName || cleanName.length < 2) {
      errors.name = "Full name is required (minimum 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      errors.email = "Please enter a valid email address.";
    } else {
      const isDuplicate = (subadminsList || []).some(
        (s) => s.email && s.email.toLowerCase() === cleanEmail && (!editingSubadmin || s.id !== editingSubadmin.id)
      );
      if (isDuplicate) {
        errors.email = "This email is already registered to another sub-admin.";
      }
    }

    if (!editingSubadmin) {
      if (!cleanPassword || cleanPassword.length < 6) {
        errors.password = "Password is required (minimum 6 characters).";
      }
    } else {
      if (cleanPassword && cleanPassword.length < 6) {
        errors.password = "Password must be at least 6 characters if changing.";
      }
    }

    if (!subadminForm.permissions || subadminForm.permissions.length === 0) {
      errors.permissions = "Please select at least one module permission.";
    }

    if (Object.keys(errors).length > 0) {
      setSubadminFormErrors(errors);
      triggerToast("⚠️ Please correct the highlighted errors in the form.");
      return;
    }

    setSubadminFormErrors({});

    const payload = {
      ...subadminForm,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
    };
    if (cleanPassword) {
      payload.password = cleanPassword;
    }

    if (editingSubadmin) {
      const res = await apiService.updateSubadmin(editingSubadmin.id, payload);
      if (res && res.success) {
        setSubadminsList((prev) =>
          prev.map((s) => (s.id === editingSubadmin.id ? res.data : s))
        );
        if (res.auditLogs) setAuditLogsList(res.auditLogs);
        triggerToast(`Updated sub-admin account for "${cleanName}"`);
      }
    } else {
      const res = await apiService.createSubadmin(payload);
      if (res && res.success) {
        setSubadminsList((prev) => [res.data, ...prev]);
        if (res.auditLogs) setAuditLogsList(res.auditLogs);
        triggerToast(`New sub-admin account created for "${cleanName}"`);
      }
    }
    setShowAddSubadminModal(false);
  };

  const handleToggleSubadminStatus = async (subadmin) => {
    const newStatus = subadmin.status === "Active" ? "Inactive" : "Active";
    const res = await apiService.updateSubadmin(subadmin.id, { status: newStatus });
    if (res && res.success) {
      setSubadminsList((prev) =>
        prev.map((s) => (s.id === subadmin.id ? { ...s, status: newStatus } : s))
      );
      if (res.auditLogs) setAuditLogsList(res.auditLogs);
      triggerToast(`Set "${subadmin.name}" status to ${newStatus}`);
    }
  };

  const handleDeleteSubadmin = async (id, name) => {
    const res = await apiService.deleteSubadmin(id);
    if (res && res.success) {
      setSubadminsList((prev) => prev.filter((s) => s.id !== id));
      if (res.auditLogs) setAuditLogsList(res.auditLogs);
      triggerToast(`Removed subadmin account for "${name}"`);
    }
  };

  const togglePermission = (perm) => {
    setSubadminForm((prev) => {
      const exists = prev.permissions.includes(perm);
      return {
        ...prev,
        permissions: exists
          ? prev.permissions.filter((p) => p !== perm)
          : [...prev.permissions, perm],
      };
    });
  };

  // ==================== ERROR MONITORING HANDLERS ====================
  const handleSimulateErrorSubmit = async (e) => {
    e.preventDefault();
    const res = await apiService.createErrorLog(simulatedErrorForm);
    if (res && res.success) {
      setErrorLogs((prev) => [res.data, ...prev]);
      triggerToast(`Simulated test error logged: "${simulatedErrorForm.message}"`);
    }
    setShowSimulateErrorModal(false);
  };

  const handleToggleErrorStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Resolved" ? "Unresolved" : "Resolved";
    const res = await apiService.updateErrorStatus(id, newStatus);
    if (res && res.success) {
      setErrorLogs((prev) =>
        prev.map((err) => (err.id === id ? { ...err, status: newStatus } : err))
      );
      triggerToast(`Marked error #${id} as ${newStatus}`);
    }
  };

  const handleClearResolvedErrors = async () => {
    const res = await apiService.clearResolvedErrors();
    if (res && res.success) {
      setErrorLogs((prev) => prev.filter((err) => err.status !== "Resolved"));
      triggerToast(res.message || "Cleared resolved error logs");
    }
  };

  const handleDeleteErrorLog = async (id) => {
    const res = await apiService.deleteErrorLog(id);
    if (res && res.success) {
      setErrorLogs((prev) => prev.filter((err) => err.id !== id));
      triggerToast(`Deleted error log entry #${id}`);
    }
  };

  // ==================== ANALYTICS HANDLERS ====================
  const handleExportAnalyticsReport = () => {
    const reportData = {
      storeName: "Sadguru Tyres & Mobility Solutions",
      exportDate: new Date().toISOString(),
      period: analyticsPeriod,
      summary: analyticsData?.overview || {},
      serviceBreakdown: analyticsData?.serviceBreakdown || [],
      brandPerformance: analyticsData?.brandPerformance || [],
      salesTrends: analyticsData?.salesTrends || [],
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Sadguru_Tyres_Analytics_Report_${analyticsPeriod}.json`;
    link.click();
    URL.revokeObjectURL(url);
    triggerToast("Analytics report downloaded successfully!");
  };

  // Filters & Pagination for Tyre Catalog
  const [inventoryPage, setInventoryPage] = useState(1);
  const [inventoryFilter, setInventoryFilter] = useState("all"); // 'all', 'visible', 'hidden'
  const [inventoryItemsPerPage, setInventoryItemsPerPage] = useState(5);
  const ITEMS_PER_PAGE = inventoryItemsPerPage;

  useEffect(() => {
    setInventoryPage(1);
  }, [searchTerm, inventoryFilter, inventoryItemsPerPage, activeTab]);

  const visibleTyresCount = (tyresData || []).filter(
    (t) => t && t.showOnHome !== false && t.show_on_home !== false && t.visual_specs?.show_on_home !== false
  ).length;

  const hiddenTyresCount = (tyresData || []).length - visibleTyresCount;

  const filteredTyres = (tyresData || []).filter((t) => {
    if (!t) return false;
    const isVisible = t.showOnHome !== false && t.show_on_home !== false && t.visual_specs?.show_on_home !== false;
    if (inventoryFilter === "visible" && !isVisible) return false;
    if (inventoryFilter === "hidden" && isVisible) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        (t.name || "").toLowerCase().includes(q) ||
        (t.brand || "").toLowerCase().includes(q) ||
        (t.category || "").toLowerCase().includes(q) ||
        (t.vehicleType || "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalInventoryPages = Math.ceil(filteredTyres.length / ITEMS_PER_PAGE) || 1;
  const currentInventoryPage = Math.min(inventoryPage, totalInventoryPages);
  const paginatedTyres = filteredTyres.slice(
    (currentInventoryPage - 1) * ITEMS_PER_PAGE,
    currentInventoryPage * ITEMS_PER_PAGE
  );

  const filteredErrorLogs = errorLogs.filter((err) => {
    const matchesSeverity =
      errorSeverityFilter === "all" || err.severity === errorSeverityFilter;
    const matchesStatus =
      errorStatusFilter === "all" || err.status === errorStatusFilter;
    const matchesSearch =
      !searchTerm ||
      err.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      err.module.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSeverity && matchesStatus && matchesSearch;
  });

  const [errorPage, setErrorPage] = useState(1);
  const ERRORS_PER_PAGE = 5;

  useEffect(() => {
    setErrorPage(1);
  }, [searchTerm, errorSeverityFilter, errorStatusFilter, activeTab]);

  const totalErrorPages = Math.ceil(filteredErrorLogs.length / ERRORS_PER_PAGE) || 1;
  const currentErrorPage = Math.min(errorPage, totalErrorPages);
  const paginatedErrorLogs = filteredErrorLogs.slice(
    (currentErrorPage - 1) * ERRORS_PER_PAGE,
    currentErrorPage * ERRORS_PER_PAGE
  );

  // Filters & Pagination for Services Management (6 cards per page)
  const [servicesPage, setServicesPage] = useState(1);
  const SERVICES_PER_PAGE = 6;

  useEffect(() => {
    setServicesPage(1);
  }, [searchTerm, serviceCategoryFilter, serviceStatusFilter, activeTab]);

  const filteredServices = (servicesList || []).filter((s) => {
    const matchesCat = serviceCategoryFilter === "all" || s.category === serviceCategoryFilter;
    const matchesStatus = serviceStatusFilter === "all" || s.status === serviceStatusFilter;
    const matchesSearch =
      !searchTerm ||
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.description && s.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesStatus && matchesSearch;
  });

  const totalServicesPages = Math.ceil(filteredServices.length / SERVICES_PER_PAGE) || 1;
  const currentServicesPage = Math.min(servicesPage, totalServicesPages);
  const paginatedServices = filteredServices.slice(
    (currentServicesPage - 1) * SERVICES_PER_PAGE,
    currentServicesPage * SERVICES_PER_PAGE
  );

  // Filters & Pagination for Service Bookings (7 items per page)
  const [bookingsPage, setBookingsPage] = useState(1);
  const BOOKINGS_PER_PAGE = 7;

  useEffect(() => {
    setBookingsPage(1);
  }, [searchTerm, activeTab]);

  const filteredBookings = (bookingsList || []).filter((b) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      (b.customerName && b.customerName.toLowerCase().includes(search)) ||
      (b.carModel && b.carModel.toLowerCase().includes(search)) ||
      (b.serviceName && b.serviceName.toLowerCase().includes(search)) ||
      (b.phone && b.phone.toLowerCase().includes(search))
    );
  });

  const totalBookingsPages = Math.ceil(filteredBookings.length / BOOKINGS_PER_PAGE) || 1;
  const currentBookingsPage = Math.min(bookingsPage, totalBookingsPages);
  const paginatedBookings = filteredBookings.slice(
    (currentBookingsPage - 1) * BOOKINGS_PER_PAGE,
    currentBookingsPage * BOOKINGS_PER_PAGE
  );

  // Filters & Pagination for Leads Management
  const [leadsStatusFilter, setLeadsStatusFilter] = useState("all");
  const [leadsPage, setLeadsPage] = useState(1);
  const LEADS_PER_PAGE = 5;

  useEffect(() => {
    setLeadsPage(1);
  }, [searchTerm, leadsStatusFilter, activeTab]);

  const filteredLeads = (leadsList || []).filter((l) => {
    const matchesStatus = leadsStatusFilter === "all" || l.status === leadsStatusFilter;
    const search = (searchTerm || "").toLowerCase();
    const matchesSearch =
      !search ||
      (l.name && String(l.name).toLowerCase().includes(search)) ||
      (l.phone && String(l.phone).toLowerCase().includes(search)) ||
      (l.email && String(l.email).toLowerCase().includes(search)) ||
      (l.subject && String(l.subject).toLowerCase().includes(search)) ||
      (l.message && String(l.message).toLowerCase().includes(search));
    return matchesStatus && matchesSearch;
  });

  const totalLeadsPages = Math.ceil(filteredLeads.length / LEADS_PER_PAGE) || 1;
  const currentLeadsPage = Math.min(leadsPage, totalLeadsPages);
  const paginatedLeads = filteredLeads.slice(
    (currentLeadsPage - 1) * LEADS_PER_PAGE,
    currentLeadsPage * LEADS_PER_PAGE
  );

  // Filters & Pagination for Wholesale & Fleet Quote Requests (5 items per page)
  const [quotesPage, setQuotesPage] = useState(1);
  const [quotesItemsPerPage, setQuotesItemsPerPage] = useState(5);
  const QUOTES_PER_PAGE = quotesItemsPerPage;

  useEffect(() => {
    setQuotesPage(1);
  }, [searchTerm, quotesItemsPerPage, activeTab]);

  const filteredQuotes = (quotesList || []).filter((q) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      (q.tyreName && q.tyreName.toLowerCase().includes(search)) ||
      (q.email && q.email.toLowerCase().includes(search)) ||
      (q.totalFormatted && q.totalFormatted.toLowerCase().includes(search))
    );
  });

  const totalQuotesPages = Math.ceil(filteredQuotes.length / QUOTES_PER_PAGE) || 1;
  const currentQuotesPage = Math.min(quotesPage, totalQuotesPages);
  const paginatedQuotes = filteredQuotes.slice(
    (currentQuotesPage - 1) * QUOTES_PER_PAGE,
    currentQuotesPage * QUOTES_PER_PAGE
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        color: "#0f172a",
        display: "flex",
        fontFamily: "var(--font-body, system-ui, -apple-system, sans-serif)",
      }}
    >
      {/* SIDEBAR NAVIGATION */}
      <aside
        style={{
          width: "240px",
          height: "100vh",
          position: "sticky",
          top: 0,
          background: "#ffffff",
          borderRight: "1px solid #e2e8f0",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          boxShadow: "2px 0 10px rgba(15, 23, 42, 0.02)",
          zIndex: 50,
        }}
      >
        {/* Dynamic Brand Header */}
        <div
          onClick={() => setActiveTab("dashboard")}
          title="Go to Dashboard Overview"
          style={{
            padding: "16px 16px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            position: "sticky",
            top: 0,
            background: "#ffffff",
            zIndex: 10,
            transition: "all 0.2s ease",
            userSelect: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f8fafc";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#ffffff";
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "#0f172a",
              border: "2px solid #ef4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 8px rgba(239, 68, 68, 0.25)",
              flexShrink: 0,
              transition: "transform 0.2s ease",
            }}
          >
            <img
              src="/images/sgt_logo.png"
              alt="SGT Logo"
              style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
            />
          </div>
          <div>
            <div style={{ fontWeight: "800", fontSize: "0.98rem", color: "#0f172a", lineHeight: 1.1, whiteSpace: "nowrap" }}>
              Sadguru Tyres
            </div>
            <div style={{ fontSize: "0.68rem", color: "#ef4444", fontWeight: "700", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
              ADMIN PANEL
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav
          className="hide-scrollbar"
          style={{
            padding: "16px 10px",
            flexGrow: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Main Navigation Items */}
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "inventory", label: "Tyre Inventory", icon: Package },
            { id: "brands", label: "Partner Brands", icon: Award },
            { id: "services", label: "Services Management", icon: Wrench },
            { id: "bookings", label: "Service Bookings", icon: CalendarCheck },
            { id: "quotes", label: "Quote Inquiries", icon: FileText },
            { id: "leads", label: "Leads", icon: Users },
            { id: "subadmins", label: "Sub-Admins", icon: UserCheck },
            { id: "faqs", label: "FAQ Manager", icon: HelpCircle },
          ]
            .filter((item) => isTabPermitted(item.id))
            .map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "9px 12px",
                    borderRadius: "10px",
                    border: "none",
                    background: isActive ? "linear-gradient(135deg, #ef4444, #dc2626)" : "transparent",
                    color: isActive ? "#ffffff" : "#475569",
                    fontWeight: isActive ? "700" : "500",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    textAlign: "left",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = "#f1f5f9";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                    <Icon size={17} style={{ flexShrink: 0 }} />
                    <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.label}</span>
                  </div>
                </button>
              );
            })}

          {/* Dynamic Unlocked Prime Features (Appears ONLY when paid/unlocked) */}
          {[
            { id: "analytics", label: "Analytics & Report", icon: BarChart3 },
            { id: "chatbot", label: "Chatbot Support", icon: Bot },
            { id: "error-monitoring", label: "Error Monitoring", icon: ShieldAlert },
            { id: "coupons", label: "Coupons & Discounts", icon: Tag },
            { id: "whatsapp", label: "WhatsApp Marketing", icon: MessageCircle },
          ]
            .filter((item) => isFeatureUnlocked(item.id) && isTabPermitted(item.id))
            .map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "9px 12px",
                    borderRadius: "10px",
                    border: "none",
                    background: isActive ? "linear-gradient(135deg, #ef4444, #dc2626)" : "transparent",
                    color: isActive ? "#ffffff" : "#475569",
                    fontWeight: isActive ? "700" : "500",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    textAlign: "left",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = "#f1f5f9";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                    <Icon size={17} style={{ flexShrink: 0 }} />
                    <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.label}</span>
                  </div>
                </button>
              );
            })}

          {[
            { id: "products", label: "Prime Products", icon: Layers },
            { id: "settings", label: "Shop Settings", icon: Settings },
          ]
            .filter((item) => isTabPermitted(item.id))
            .map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "9px 12px",
                    borderRadius: "10px",
                    border: "none",
                    background: isActive ? "linear-gradient(135deg, #ef4444, #dc2626)" : "transparent",
                    color: isActive ? "#ffffff" : "#475569",
                    fontWeight: isActive ? "700" : "500",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    textAlign: "left",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = "#f1f5f9";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                    <Icon size={17} style={{ flexShrink: 0 }} />
                    <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.label}</span>
                  </div>
                </button>
              );
            })}
        </nav>

        {/* Dynamic Sidebar Footer */}
        <div
          style={{
            padding: "12px 10px",
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            position: "sticky",
            bottom: 0,
            background: "#ffffff",
            zIndex: 10,
            flexShrink: 0,
          }}
        >
          <button
            onClick={onExitAdmin}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "9px 12px",
              borderRadius: "10px",
              border: "1px solid #fecaca",
              background: "#fef2f2",
              color: "#ef4444",
              fontWeight: "700",
              fontSize: "0.84rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fee2e2";
              e.currentTarget.style.borderColor = "#fca5a5";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(239, 68, 68, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fef2f2";
              e.currentTarget.style.borderColor = "#fecaca";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <LogOut size={15} />
            <span>Logout Admin</span>
          </button>
          <button
            onClick={onExitAdmin}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "7px 10px",
              borderRadius: "8px",
              border: "none",
              background: "transparent",
              color: "#64748b",
              fontWeight: "600",
              fontSize: "0.76rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#f1f5f9";
              e.currentTarget.style.color = "#0f172a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#64748b";
            }}
          >
            <ExternalLink size={13} />
            <span>Return to Website</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main
        ref={mainContentRef}
        className="hide-scrollbar"
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          height: "100vh",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Sticky Header */}
        <header
          style={{
            padding: "12px 28px",
            background: "#ffffff",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 100,
            boxShadow: "0 2px 6px rgba(15, 23, 42, 0.04)",
          }}
        >
          {/* Search Bar */}
          <div style={{ position: "relative", width: "100%", maxWidth: "440px" }}>
            <Search
              size={17}
              color="#64748b"
              style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
            />
            <input
              type="text"
              placeholder="Search tyres, bookings, error logs, or sub-admins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 16px 9px 40px",
                borderRadius: "999px",
                border: "1px solid #cbd5e1",
                background: "#f8fafc",
                color: "#0f172a",
                fontSize: "0.88rem",
                outline: "none",
                transition: "all 0.2s ease",
              }}
            />
          </div>

          {/* Right Header Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            {/* Profile Pill */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "5px 14px", borderRadius: "999px", background: "#f1f5f9", border: "1px solid #cbd5e1" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: currentUser?.avatarColor || (currentUser?.isSuperAdmin ? "#ef4444" : "#2563eb"), display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "0.8rem", color: "#ffffff", flexShrink: 0 }}>
                {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "A"}
              </div>
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
                <span style={{ fontSize: "0.82rem", fontWeight: "800", color: "#0f172a", whiteSpace: "nowrap" }}>
                  {currentUser?.name || "Super Admin"}
                </span>
                <span style={{ fontSize: "0.66rem", fontWeight: "700", color: currentUser?.isSuperAdmin ? "#ef4444" : "#2563eb", whiteSpace: "nowrap" }}>
                  {currentUser?.role || (currentUser?.isSuperAdmin ? "Super Administrator" : "Sub-Admin")}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* TAB CONTENTS */}
        <div style={{ padding: "32px", flexGrow: 1 }}>
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === "dashboard" && (
            <div>
              {/* Top Metrics Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "32px" }}>
                <div style={{ padding: "22px", borderRadius: "18px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: "700", color: "#64748b" }}>ESTIMATED REVENUE</span>
                    <DollarSign size={20} color="#ef4444" />
                  </div>
                  <div style={{ fontSize: "1.75rem", fontWeight: "800", color: "#0f172a", lineHeight: 1.1, marginBottom: "6px" }}>
                    ₹{totalRevenueINR.toLocaleString("en-IN")}
                  </div>
                  <div style={{ fontSize: "0.76rem", color: "#ef4444", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                    <TrendingUp size={14} /> +14.2% from last month
                  </div>
                </div>

                <div style={{ padding: "22px", borderRadius: "18px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: "700", color: "#64748b" }}>SERVICE BOOKINGS</span>
                    <CalendarCheck size={20} color="#ef4444" />
                  </div>
                  <div style={{ fontSize: "1.75rem", fontWeight: "800", color: "#0f172a", lineHeight: 1.1, marginBottom: "6px" }}>
                    {bookingsList.length} Total
                  </div>
                  <div style={{ fontSize: "0.76rem", color: "#ef4444", fontWeight: "600" }}>
                    {pendingBookingsCount} Pending Approvals
                  </div>
                </div>

                <div style={{ padding: "22px", borderRadius: "18px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: "700", color: "#64748b" }}>SUB-ADMIN TEAM</span>
                    <UserCheck size={20} color="#0f172a" />
                  </div>
                  <div style={{ fontSize: "1.75rem", fontWeight: "800", color: "#0f172a", lineHeight: 1.1, marginBottom: "6px" }}>
                    {subadminsList.length} Accounts
                  </div>
                  <div style={{ fontSize: "0.76rem", color: "#64748b", fontWeight: "600" }}>
                    {subadminsList.filter((s) => s.status === "Active").length} Active Managers
                  </div>
                </div>

                <div style={{ padding: "22px", borderRadius: "18px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: "700", color: "#64748b" }}>SYSTEM MONITOR</span>
                    <ShieldAlert size={20} color={unresolvedErrorsCount > 0 ? "#ef4444" : "#0f172a"} />
                  </div>
                  <div style={{ fontSize: "1.75rem", fontWeight: "800", color: "#0f172a", lineHeight: 1.1, marginBottom: "6px" }}>
                    {unresolvedErrorsCount} Unresolved
                  </div>
                  <div style={{ fontSize: "0.76rem", color: unresolvedErrorsCount > 0 ? "#ef4444" : "#0f172a", fontWeight: "600" }}>
                    {unresolvedErrorsCount > 0 ? "Requires Administrator Attention" : "All Systems Operational"}
                  </div>
                </div>
              </div>

              {/* Quick Jump Modules */}
              <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "28px" }}>
                {/* Left: Recent Service Appointments */}
                <div style={{ padding: "24px", borderRadius: "20px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                      Recent Service Appointments
                    </h3>
                    <button
                      onClick={() => setActiveTab("bookings")}
                      style={{ background: "transparent", border: "none", color: "#ef4444", fontSize: "0.82rem", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
                    >
                      View All ({bookingsList.length}) <ChevronRight size={14} />
                    </button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {bookingsList.slice(0, 5).map((b, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: "14px 18px",
                          borderRadius: "14px",
                          background: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: "700", fontSize: "0.92rem", color: "#0f172a" }}>
                            {b.customerName || "Customer Appointment"}
                          </div>
                          <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "2px" }}>
                            {b.serviceName || "Tyre Fitting & Alignment"} • {b.date || "Today"} ({b.timeSlot || "10:00 AM"})
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <span
                            style={{
                              padding: "4px 10px",
                              borderRadius: "999px",
                              fontSize: "0.72rem",
                              fontWeight: "700",
                              background: b.status === "Confirmed" ? "#f1f5f9" : "#fef2f2",
                              color: b.status === "Confirmed" ? "#0f172a" : "#ef4444",
                              border: b.status === "Confirmed" ? "1px solid #cbd5e1" : "1px solid #fecaca",
                            }}
                          >
                            {b.status || "Pending"}
                          </span>
                          <button
                            onClick={() => onUpdateBookingStatus && onUpdateBookingStatus(idx, b.status === "Confirmed" ? "Pending" : "Confirmed")}
                            style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#ffffff", color: "#0f172a", fontSize: "0.76rem", fontWeight: "700", cursor: "pointer" }}
                          >
                            Toggle Status
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Sub-Admin Quick Roster & Health */}
                <div style={{ padding: "24px", borderRadius: "20px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                      Sub-Admin Roster
                    </h3>
                    <button
                      onClick={() => setActiveTab("subadmins")}
                      style={{ background: "transparent", border: "none", color: "#ef4444", fontSize: "0.82rem", fontWeight: "700", cursor: "pointer" }}
                    >
                      Manage ({subadminsList.length})
                    </button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {subadminsList.slice(0, 4).map((sub) => (
                      <div
                        key={sub.id}
                        style={{
                          padding: "12px 16px",
                          borderRadius: "14px",
                          background: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                        }}
                      >
                        <div
                          style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "50%",
                            background: "#0f172a",
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "800",
                            fontSize: "0.85rem",
                          }}
                        >
                          {sub.name.charAt(0)}
                        </div>
                        <div style={{ flexGrow: 1 }}>
                          <div style={{ fontWeight: "700", fontSize: "0.88rem", color: "#0f172a" }}>{sub.name}</div>
                          <div style={{ fontSize: "0.76rem", color: "#64748b" }}>{sub.role}</div>
                        </div>
                        <span
                          style={{
                            fontSize: "0.72rem",
                            padding: "3px 8px",
                            borderRadius: "999px",
                            fontWeight: "700",
                            background: sub.status === "Active" ? "#f1f5f9" : "#fef2f2",
                            color: sub.status === "Active" ? "#0f172a" : "#ef4444",
                            border: sub.status === "Active" ? "1px solid #cbd5e1" : "1px solid #fecaca",
                          }}
                        >
                          {sub.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== MODULE 1: ANALYTICS DASHBOARD ==================== */}
          {activeTab === "analytics" && (
            <div>
              {!isFeatureUnlocked("analytics") ? (
                <div style={{ background: "#ffffff", borderRadius: "24px", padding: "48px 32px", textAlign: "center", border: "1px solid #e2e8f0", maxWidth: "600px", margin: "40px auto", boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)" }}>
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px auto", border: "2px solid #fde68a" }}>
                    <Lock size={30} color="#d97706" />
                  </div>
                  <span style={{ fontSize: "0.74rem", fontWeight: "800", background: "#fef3c7", color: "#92400e", padding: "4px 12px", borderRadius: "999px" }}>
                    PRIME MODULE • PAYMENT REQUIRED
                  </span>
                  <h2 style={{ fontSize: "1.4rem", fontWeight: "900", color: "#0f172a", margin: "14px 0 8px 0" }}>
                    Business & Sales Analytics
                  </h2>
                  <p style={{ fontSize: "0.88rem", color: "#64748b", margin: "0 0 24px 0", lineHeight: 1.5 }}>
                    Unlock real-time sales revenue tracking, customer conversion funnels, top selling tyre brands, and exportable business audit reports.
                  </p>
                  <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
                    <button
                      onClick={() => {
                        setSelectedPrimeFeatureForUnlock(PRIME_FEATURES.find((f) => f.id === "analytics") || { name: "Analytics & Report", priceINR: 2000, id: "analytics" });
                        setSelectedPrimePlan("single");
                        setShowPrimeUnlockModal(true);
                      }}
                      style={{ padding: "12px 24px", borderRadius: "12px", background: "linear-gradient(135deg, #ef4444, #dc2626)", border: "none", color: "#ffffff", fontWeight: "800", fontSize: "0.9rem", cursor: "pointer", boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)" }}
                    >
                      Pay ₹2,000 to Unlock
                    </button>
                    <button
                      onClick={() => setActiveTab("products")}
                      style={{ padding: "12px 20px", borderRadius: "12px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#475569", fontWeight: "700", fontSize: "0.88rem", cursor: "pointer" }}
                    >
                      View All Prime Modules
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => setActiveTab("products")}
                    style={{ background: "transparent", border: "none", color: "#ef4444", fontWeight: "700", fontSize: "0.82rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", padding: 0, marginBottom: "8px" }}
                  >
                    &larr; Back to Prime Products
                  </button>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
                    <div>
                      <h2 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>Business & Sales Analytics</h2>
                      <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                        Monitor store revenue, customer conversion funnel, and top performing tyre manufacturer sales.
                      </p>
                    </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {/* Period Selector Tabs */}
                  <div style={{ display: "flex", background: "#e2e8f0", padding: "4px", borderRadius: "12px", gap: "4px" }}>
                    {[
                      { id: "7d", label: "7 Days" },
                      { id: "30d", label: "30 Days" },
                      { id: "quarter", label: "Quarter" },
                      { id: "ytd", label: "Year to Date" },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setAnalyticsPeriod(p.id)}
                        style={{
                          padding: "6px 14px",
                          borderRadius: "8px",
                          border: "none",
                          background: analyticsPeriod === p.id ? "#ffffff" : "transparent",
                          color: analyticsPeriod === p.id ? "#0f172a" : "#64748b",
                          fontWeight: analyticsPeriod === p.id ? "700" : "500",
                          fontSize: "0.8rem",
                          cursor: "pointer",
                          boxShadow: analyticsPeriod === p.id ? "0 1px 3px rgba(0, 0, 0, 0.08)" : "none",
                        }}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  {/* Export Button */}
                  <button
                    onClick={handleExportAnalyticsReport}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "9px 18px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #ef4444, #dc2626)",
                      border: "none",
                      color: "#ffffff",
                      fontWeight: "700",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                    }}
                  >
                    <Download size={15} />
                    <span>Export JSON Report</span>
                  </button>
                </div>
              </div>

              {/* Metric Cards Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "18px", marginBottom: "28px" }}>
                <div style={{ padding: "20px", borderRadius: "16px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)" }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: "700", color: "#64748b", marginBottom: "8px" }}>STORE REVENUE</div>
                  <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#0f172a" }}>
                    ₹{(analyticsData?.overview?.totalRevenueINR || totalRevenueINR).toLocaleString("en-IN")}
                  </div>
                  <div style={{ fontSize: "0.74rem", color: "#ef4444", fontWeight: "700", marginTop: "4px" }}>
                    ↑ +18.4% growth vs previous period
                  </div>
                </div>

                <div style={{ padding: "20px", borderRadius: "16px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)" }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: "700", color: "#64748b", marginBottom: "8px" }}>COMPLETED ORDERS</div>
                  <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#0f172a" }}>
                    {analyticsData?.overview?.totalOrders || 184}
                  </div>
                  <div style={{ fontSize: "0.74rem", color: "#0f172a", fontWeight: "700", marginTop: "4px" }}>
                    Avg Value: ₹{(analyticsData?.overview?.avgBookingValueINR || 10500).toLocaleString("en-IN")}
                  </div>
                </div>

                <div style={{ padding: "20px", borderRadius: "16px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)" }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: "700", color: "#64748b", marginBottom: "8px" }}>CONVERSION RATE</div>
                  <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#0f172a" }}>
                    {analyticsData?.overview?.conversionRatePct || 4.8}%
                  </div>
                  <div style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: "700", marginTop: "4px" }}>
                    {analyticsData?.overview?.quoteToSaleRatio || "68%"} Quote-to-Sale
                  </div>
                </div>

                <div style={{ padding: "20px", borderRadius: "16px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)" }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: "700", color: "#64748b", marginBottom: "8px" }}>WEBSITE VISITORS</div>
                  <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#0f172a" }}>
                    {(analyticsData?.overview?.totalVisitors || 12450).toLocaleString("en-IN")}
                  </div>
                  <div style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: "700", marginTop: "4px" }}>
                    Unique customer sessions
                  </div>
                </div>
              </div>

              {/* Revenue Trend Visualizer Chart */}
              <div style={{ padding: "24px", borderRadius: "20px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)", marginBottom: "28px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>Daily Sales & Service Revenue Trend</h3>
                    <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "2px 0 0 0" }}>Daily breakdown of store turnover (in INR ₹)</p>
                  </div>
                  <span style={{ fontSize: "0.76rem", fontWeight: "700", color: "#ef4444", padding: "4px 10px", borderRadius: "999px", background: "#fef2f2", border: "1px solid #fecaca" }}>
                    Live Analytics Feed
                  </span>
                </div>

                {/* SVG Visual Bar Chart */}
                <div style={{ height: "200px", width: "100%", display: "flex", alignItems: "flex-end", gap: "16px", padding: "10px 0 20px 0", borderBottom: "1px dashed #cbd5e1" }}>
                  {(analyticsData?.salesTrends || [
                    { date: "Sep 26", revenue: 45000, bookings: 5 },
                    { date: "Sep 27", revenue: 62000, bookings: 7 },
                    { date: "Sep 28", revenue: 88000, bookings: 9 },
                    { date: "Sep 29", revenue: 54000, bookings: 6 },
                    { date: "Sep 30", revenue: 95000, bookings: 11 },
                    { date: "Oct 01", revenue: 110000, bookings: 13 },
                    { date: "Oct 02", revenue: 128000, bookings: 14 },
                  ]).map((item, idx) => {
                    const maxVal = 130000;
                    const heightPct = Math.min(100, Math.max(15, (item.revenue / maxVal) * 100));
                    return (
                      <div key={idx} style={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end" }}>
                        <div style={{ fontSize: "0.72rem", fontWeight: "800", color: "#ef4444", marginBottom: "6px" }}>
                          ₹{(item.revenue / 1000).toFixed(0)}k
                        </div>
                        <div
                          style={{
                            width: "100%",
                            maxWidth: "42px",
                            height: `${heightPct}%`,
                            background: "linear-gradient(180deg, #ef4444, #dc2626)",
                            borderRadius: "8px 8px 0 0",
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                          }}
                          title={`${item.date}: ₹${item.revenue.toLocaleString()} (${item.bookings} bookings)`}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "#dc2626"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(180deg, #ef4444, #dc2626)"; }}
                        />
                        <div style={{ fontSize: "0.74rem", fontWeight: "700", color: "#64748b", marginTop: "8px" }}>
                          {item.date}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Service & Brand Breakdown Grids */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }}>
                {/* Service Revenue Distribution */}
                <div style={{ padding: "24px", borderRadius: "20px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#0f172a", margin: "0 0 16px 0" }}>
                    Service Revenue Breakdown
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {(analyticsData?.serviceBreakdown || [
                      { name: "Wheel Alignment & Balancing", revenue: 151700, percentage: 44.5 },
                      { name: "Tyre Replacement & Fitting", revenue: 675000, percentage: 29.3 },
                      { name: "Nitrogen Air Flush", revenue: 23800, percentage: 15.2 },
                      { name: "Run-Flat Inspection & Repair", revenue: 490000, percentage: 11.0 },
                    ]).map((srv, idx) => (
                      <div key={idx}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.84rem", fontWeight: "700", color: "#0f172a", marginBottom: "6px" }}>
                          <span>{srv.name}</span>
                          <span style={{ color: "#ef4444" }}>₹{srv.revenue.toLocaleString("en-IN")} ({srv.percentage}%)</span>
                        </div>
                        <div style={{ height: "8px", width: "100%", background: "#f1f5f9", borderRadius: "999px", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${srv.percentage}%`, background: "linear-gradient(90deg, #ef4444, #dc2626)", borderRadius: "999px" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Manufacturer Share */}
                <div style={{ padding: "24px", borderRadius: "20px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#0f172a", margin: "0 0 16px 0" }}>
                    Partner Brand Sales Share
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {(analyticsData?.brandPerformance || [
                      { brand: "Yokohama", soldUnits: 64, revenueINR: 800000, marketShare: "34%" },
                      { brand: "Michelin", soldUnits: 42, revenueINR: 630000, marketShare: "27%" },
                      { brand: "Bridgestone", soldUnits: 38, revenueINR: 494000, marketShare: "21%" },
                      { brand: "MRF Tyres", soldUnits: 25, revenueINR: 225000, marketShare: "12%" },
                    ]).map((b, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                        <div style={{ fontWeight: "800", color: "#0f172a", fontSize: "0.9rem" }}>{b.brand}</div>
                        <div style={{ fontSize: "0.8rem", color: "#64748b" }}>{b.soldUnits} Units Sold</div>
                        <div style={{ fontWeight: "800", color: "#0f172a", fontSize: "0.9rem" }}>₹{b.revenueINR.toLocaleString("en-IN")}</div>
                        <span style={{ fontSize: "0.76rem", padding: "3px 8px", borderRadius: "999px", background: "#f1f5f9", color: "#0f172a", fontWeight: "700", border: "1px solid #cbd5e1" }}>{b.marketShare}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

          {/* ==================== MODULE 2: SUB-ADMINS & ROLES ==================== */}
          {activeTab === "subadmins" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <div>
                  <h2 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>Sub-Admin Team & Role Permissions</h2>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                    Manage store sub-administrators, assign module permissions, and audit recent staff actions.
                  </p>
                </div>
                <button
                  onClick={handleOpenAddSubadmin}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #ef4444, #dc2626)",
                    border: "none",
                    color: "#ffffff",
                    fontWeight: "700",
                    fontSize: "0.88rem",
                    cursor: "pointer",
                  }}
                >
                  <UserPlus size={16} />
                  <span>Add Sub-Admin</span>
                </button>
              </div>

              {/* Sub-Admin Cards Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px", marginBottom: "32px", alignItems: "stretch" }}>
                {subadminsList.map((sub) => (
                  <div
                    key={sub.id}
                    style={{
                      padding: "24px",
                      borderRadius: "20px",
                      background: "#ffffff",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                      boxSizing: "border-box",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {/* Header Info */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", minWidth: 0, flex: 1 }}>
                          <div
                            style={{
                              width: "46px",
                              height: "46px",
                              borderRadius: "50%",
                              background: "#0f172a",
                              color: "#ffffff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: "800",
                              fontSize: "1.1rem",
                              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                              flexShrink: 0,
                            }}
                          >
                            {sub.name.charAt(0)}
                          </div>
                          <div style={{ minWidth: 0, flex: 1, minHeight: "48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <div style={{ fontWeight: "800", fontSize: "1.05rem", color: "#0f172a", lineHeight: 1.25 }}>
                              {sub.name}
                            </div>
                            <div style={{ fontSize: "0.8rem", color: "#ef4444", fontWeight: "700", marginTop: "2px", lineHeight: 1.25 }}>
                              {sub.role}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleToggleSubadminStatus(sub)}
                          style={{
                            padding: "4px 12px",
                            borderRadius: "999px",
                            border: sub.status === "Active" ? "1px solid #cbd5e1" : "1px solid #fecaca",
                            fontSize: "0.74rem",
                            fontWeight: "800",
                            cursor: "pointer",
                            background: sub.status === "Active" ? "#f1f5f9" : "#fef2f2",
                            color: sub.status === "Active" ? "#0f172a" : "#ef4444",
                            flexShrink: 0,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {sub.status === "Active" ? "Active ●" : "Inactive ○"}
                        </button>
                      </div>

                      {/* Contact Info */}
                      <div style={{ fontSize: "0.8rem", color: "#64748b", display: "flex", flexDirection: "column", gap: "4px", minHeight: "42px", justifyContent: "center" }}>
                        <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          Email: <strong style={{ color: "#0f172a" }}>{sub.email}</strong>
                        </div>
                        <div>
                          Phone: <strong style={{ color: "#0f172a" }}>{sub.phone || "+91 98220 00000"}</strong>
                        </div>
                      </div>

                      {/* Permissions Badges */}
                      <div style={{ minHeight: "64px" }}>
                        <div style={{ fontSize: "0.74rem", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", marginBottom: "6px" }}>
                          Assigned Permissions:
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                          {(sub.permissions || []).map((perm, idx) => (
                            <span
                              key={idx}
                              style={{
                                fontSize: "0.7rem",
                                padding: "3px 8px",
                                borderRadius: "6px",
                                background: "#f1f5f9",
                                color: "#334155",
                                border: "1px solid #cbd5e1",
                                fontWeight: "600",
                              }}
                            >
                              {perm}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions Pinned at Bottom */}
                    <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "14px", marginTop: "16px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                      <button
                        onClick={() => handleOpenEditSubadmin(sub)}
                        style={{ padding: "7px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#ffffff", color: "#0f172a", fontSize: "0.78rem", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
                      >
                        <Edit size={14} /> Edit Role
                      </button>
                      <button
                        onClick={() => handleDeleteSubadmin(sub.id, sub.name)}
                        style={{ padding: "7px 14px", borderRadius: "8px", border: "1px solid #fecaca", background: "#fef2f2", color: "#ef4444", fontSize: "0.78rem", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>


            </div>
          )}

          {/* ==================== MODULE 3: ERROR MONITORING ==================== */}
          {activeTab === "error-monitoring" && (
            <div>
              {!isFeatureUnlocked("error-monitoring") ? (
                <div style={{ background: "#ffffff", borderRadius: "24px", padding: "48px 32px", textAlign: "center", border: "1px solid #e2e8f0", maxWidth: "600px", margin: "40px auto", boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)" }}>
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px auto", border: "2px solid #fde68a" }}>
                    <Lock size={30} color="#d97706" />
                  </div>
                  <span style={{ fontSize: "0.74rem", fontWeight: "800", background: "#fef3c7", color: "#92400e", padding: "4px 12px", borderRadius: "999px" }}>
                    PRIME MODULE • PAYMENT REQUIRED
                  </span>
                  <h2 style={{ fontSize: "1.4rem", fontWeight: "900", color: "#0f172a", margin: "14px 0 8px 0" }}>
                    Real-Time Error Monitoring & Diagnostics
                  </h2>
                  <p style={{ fontSize: "0.88rem", color: "#64748b", margin: "0 0 24px 0", lineHeight: 1.5 }}>
                    Unlock real-time server health tracking, automated exception capture with stack traces, database latency diagnostics, and log resolution tools.
                  </p>
                  <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
                    <button
                      onClick={() => {
                        setSelectedPrimeFeatureForUnlock(PRIME_FEATURES.find((f) => f.id === "error-monitoring") || { name: "Error Monitoring", priceINR: 2000, id: "error-monitoring" });
                        setSelectedPrimePlan("single");
                        setShowPrimeUnlockModal(true);
                      }}
                      style={{ padding: "12px 24px", borderRadius: "12px", background: "linear-gradient(135deg, #ef4444, #dc2626)", border: "none", color: "#ffffff", fontWeight: "800", fontSize: "0.9rem", cursor: "pointer", boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)" }}
                    >
                      Pay ₹2,000 to Unlock
                    </button>
                    <button
                      onClick={() => setActiveTab("products")}
                      style={{ padding: "12px 20px", borderRadius: "12px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#475569", fontWeight: "700", fontSize: "0.88rem", cursor: "pointer" }}
                    >
                      View All Prime Modules
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => setActiveTab("products")}
                    style={{ background: "transparent", border: "none", color: "#ef4444", fontWeight: "700", fontSize: "0.82rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", padding: 0, marginBottom: "8px" }}
                  >
                    &larr; Back to Prime Products
                  </button>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
                    <div>
                      <h2 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>Real-Time Error Monitoring & Diagnostics</h2>
                      <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                        Track API exceptions, database warnings, and trigger simulated test errors for health checks.
                      </p>
                    </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    onClick={() => setShowSimulateErrorModal(true)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "10px 18px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #ef4444, #dc2626)",
                      border: "none",
                      color: "#ffffff",
                      fontWeight: "700",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                    }}
                  >
                    <Zap size={16} />
                    <span>Simulate Test Error</span>
                  </button>

                  <button
                    onClick={handleClearResolvedErrors}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "10px 16px",
                      borderRadius: "12px",
                      background: "#ffffff",
                      border: "1px solid #cbd5e1",
                      color: "#475569",
                      fontWeight: "700",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                    }}
                  >
                    <Trash2 size={15} />
                    <span>Clear Resolved Logs</span>
                  </button>
                </div>
              </div>

              {/* Health Diagnostics Bar */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "18px", marginBottom: "28px" }}>
                <div style={{ padding: "18px 20px", borderRadius: "16px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)" }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: "700", color: "#64748b" }}>SERVER UPTIME</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "#0f172a", marginTop: "4px" }}>
                    {errorSummary.systemUptime || "99.98%"}
                  </div>
                  <div style={{ fontSize: "0.74rem", color: "#64748b", marginTop: "2px" }}>Zero critical outages in 30d</div>
                </div>

                <div style={{ padding: "18px 20px", borderRadius: "16px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)" }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: "700", color: "#64748b" }}>AVG LATENCY</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "#0f172a", marginTop: "4px" }}>
                    {errorSummary.avgLatencyMs || 38} ms
                  </div>
                  <div style={{ fontSize: "0.74rem", color: "#64748b", marginTop: "2px" }}>Fast response time</div>
                </div>

                <div style={{ padding: "18px 20px", borderRadius: "16px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)" }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: "700", color: "#64748b" }}>DATABASE STATUS</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "#0f172a", marginTop: "4px" }}>
                    {errorSummary.dbStatus || "Healthy"}
                  </div>
                  <div style={{ fontSize: "0.74rem", color: "#64748b", marginTop: "2px" }}>Supabase client active</div>
                </div>

                <div style={{ padding: "18px 20px", borderRadius: "16px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)" }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: "700", color: "#64748b" }}>ACTIVE ERRORS</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "800", color: unresolvedErrorsCount > 0 ? "#ef4444" : "#0f172a", marginTop: "4px" }}>
                    {unresolvedErrorsCount} Unresolved
                  </div>
                  <div style={{ fontSize: "0.74rem", color: "#64748b", marginTop: "2px" }}>Total logs: {errorLogs.length}</div>
                </div>
              </div>

              {/* Filters Bar */}
              <div style={{ display: "flex", gap: "16px", marginBottom: "20px", flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#64748b" }}>Severity:</span>
                  {["all", "Critical", "Warning", "Info"].map((sev) => (
                    <button
                      key={sev}
                      onClick={() => setErrorSeverityFilter(sev)}
                      style={{
                        padding: "5px 12px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        background: errorSeverityFilter === sev ? "#0f172a" : "#ffffff",
                        color: errorSeverityFilter === sev ? "#ffffff" : "#475569",
                        fontWeight: "700",
                        fontSize: "0.78rem",
                        cursor: "pointer",
                      }}
                    >
                      {sev}
                    </button>
                  ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#64748b" }}>Status:</span>
                  {["all", "Unresolved", "Resolved"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setErrorStatusFilter(st)}
                      style={{
                        padding: "5px 12px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        background: errorStatusFilter === st ? "#ef4444" : "#ffffff",
                        color: errorStatusFilter === st ? "#ffffff" : "#475569",
                        fontWeight: "700",
                        fontSize: "0.78rem",
                        cursor: "pointer",
                      }}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Log Entries Feed */}
              <div style={{ borderRadius: "20px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)", overflow: "hidden" }}>
                {filteredErrorLogs.length === 0 ? (
                  <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
                    <CheckCircle2 size={32} color="#0f172a" style={{ marginBottom: "8px" }} />
                    <div style={{ fontWeight: "700" }}>No error logs found matching filters.</div>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {paginatedErrorLogs.map((err) => {
                      const isCritical = err.severity === "Critical";
                      return (
                        <div
                          key={err.id}
                          style={{
                            padding: "20px 24px",
                            borderBottom: "1px solid #e2e8f0",
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            background: err.status === "Resolved" ? "#fafafa" : "#ffffff",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                              <span
                                style={{
                                  padding: "4px 10px",
                                  borderRadius: "999px",
                                  fontSize: "0.72rem",
                                  fontWeight: "800",
                                  background: isCritical ? "#fef2f2" : "#f1f5f9",
                                  color: isCritical ? "#ef4444" : "#0f172a",
                                  border: isCritical ? "1px solid #fecaca" : "1px solid #cbd5e1",
                                }}
                              >
                                {err.severity}
                              </span>
                              <span style={{ fontSize: "0.8rem", fontWeight: "800", color: "#0f172a" }}>
                                {err.module}
                              </span>
                              <span style={{ fontSize: "0.74rem", color: "#94a3b8" }}>
                                #{err.id} • {new Date(err.timestamp).toLocaleString()}
                              </span>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <button
                                onClick={() => handleToggleErrorStatus(err.id, err.status)}
                                style={{
                                  padding: "6px 14px",
                                  borderRadius: "8px",
                                  border: "1px solid #cbd5e1",
                                  background: err.status === "Resolved" ? "#ffffff" : "#f1f5f9",
                                  color: err.status === "Resolved" ? "#475569" : "#0f172a",
                                  fontWeight: "700",
                                  fontSize: "0.76rem",
                                  cursor: "pointer",
                                }}
                              >
                                {err.status === "Resolved" ? "Reopen Log" : "Mark Resolved ✓"}
                              </button>

                              <button
                                onClick={() => handleDeleteErrorLog(err.id)}
                                style={{ padding: "6px 10px", borderRadius: "8px", border: "1px solid #fecaca", background: "#fef2f2", color: "#ef4444", cursor: "pointer" }}
                                title="Delete log entry"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>

                          <div style={{ fontWeight: "700", fontSize: "0.92rem", color: "#0f172a" }}>
                            {err.message}
                          </div>

                          {err.stack && (
                            <pre
                              style={{
                                padding: "10px 14px",
                                borderRadius: "8px",
                                background: "#0f172a",
                                color: "#f8fafc",
                                fontSize: "0.76rem",
                                overflowX: "auto",
                                margin: 0,
                                fontFamily: "monospace",
                              }}
                            >
                              {err.stack}
                            </pre>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {/* Error Monitoring Pagination */}
                {filteredErrorLogs.length > ERRORS_PER_PAGE && (
                  <div style={{ display: "flex", justifyContent: "center", gap: "8px", padding: "16px", background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
                    <button
                      disabled={currentErrorPage <= 1}
                      onClick={() => setErrorPage((prev) => Math.max(prev - 1, 1))}
                      style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#ffffff", cursor: "pointer", fontSize: "0.85rem", fontWeight: "600", color: currentErrorPage <= 1 ? "#94a3b8" : "#0f172a" }}
                    >
                      Previous
                    </button>
                    <span style={{ fontSize: "0.85rem", padding: "6px 12px", fontWeight: "700", color: "#475569" }}>
                      Page {currentErrorPage} of {totalErrorPages}
                    </span>
                    <button
                      disabled={currentErrorPage >= totalErrorPages}
                      onClick={() => setErrorPage((prev) => Math.min(prev + 1, totalErrorPages))}
                      style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#ffffff", cursor: "pointer", fontSize: "0.85rem", fontWeight: "600", color: currentErrorPage >= totalErrorPages ? "#94a3b8" : "#0f172a" }}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

          {/* ==================== MODULE: PRIME PRODUCTS & PRO SUITE ==================== */}
          {activeTab === "products" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
                <div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "999px", background: "linear-gradient(135deg, #fef3c7, #fde68a)", color: "#92400e", fontSize: "0.72rem", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>
                    <Sparkles size={13} />
                    <span>PREMIUM SUITE</span>
                  </div>
                  <h2 style={{ fontSize: "1.35rem", fontWeight: "900", color: "#0f172a", margin: 0 }}>Prime Products & Pro Modules</h2>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                    Unlock specialized enterprise capabilities: Business analytics, 24/7 AI chatbot, coupons & WhatsApp marketing.
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                  {/* Unlock All Bundle Button */}
                  {!isFeatureUnlocked("all") && unlockedPrimeFeatures.length < 5 && (
                    <button
                      onClick={() => {
                        setSelectedPrimeFeatureForUnlock({ name: "All 5 Prime Features Suite", priceINR: 9000, id: "all" });
                        setSelectedPrimePlan("bundle");
                        setShowPrimeUnlockModal(true);
                      }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px 18px",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #0f172a, #1e293b)",
                        border: "1px solid #334155",
                        color: "#fbbf24",
                        fontWeight: "800",
                        fontSize: "0.84rem",
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(15, 23, 42, 0.2)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Sparkles size={15} />
                      <span>Unlock All 5 Features (₹9,000 Bundle)</span>
                    </button>
                  )}

                  {/* Lock All Products Button (If any unlocked) */}
                  {unlockedPrimeFeatures.length > 0 && (
                    <button
                      onClick={handleLockAllPrimeFeatures}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "9px 14px",
                        borderRadius: "10px",
                        background: "#fef2f2",
                        border: "1px solid #fecaca",
                        color: "#dc2626",
                        fontWeight: "700",
                        fontSize: "0.82rem",
                        cursor: "pointer",
                      }}
                      title="Lock all prime products again"
                    >
                      <Lock size={14} />
                      <span>Lock All Products</span>
                    </button>
                  )}

                  {/* Payment Receipt Button */}
                  {primePaymentReceipt && (
                    <button
                      onClick={() => setShowPrimePaymentSuccessModal(true)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "9px 16px",
                        borderRadius: "10px",
                        background: "#ffffff",
                        border: "1px solid #cbd5e1",
                        color: "#475569",
                        fontWeight: "700",
                        fontSize: "0.82rem",
                        cursor: "pointer",
                      }}
                    >
                      <FileText size={14} />
                      <span>Prime Receipt</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Prime Features Cards Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
                {PRIME_FEATURES.map((feature) => {
                  const Icon = feature.icon;
                  const unlocked = isFeatureUnlocked(feature.id);
                  return (
                    <div
                      key={feature.id}
                      onClick={() => handlePrimeCardClick(feature)}
                      style={{
                        position: "relative",
                        padding: "24px",
                        borderRadius: "20px",
                        background: "#ffffff",
                        border: unlocked ? "1.5px solid #a7f3d0" : "1px solid #e2e8f0",
                        boxShadow: unlocked ? "0 4px 20px rgba(16, 185, 129, 0.08)" : "0 4px 15px rgba(15, 23, 42, 0.04)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.boxShadow = unlocked ? "0 10px 25px rgba(16, 185, 129, 0.15)" : "0 10px 25px rgba(15, 23, 42, 0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = unlocked ? "0 4px 20px rgba(16, 185, 129, 0.08)" : "0 4px 15px rgba(15, 23, 42, 0.04)";
                      }}
                    >
                      {/* Status Badge at Top Right */}
                      <div style={{ position: "absolute", top: "14px", right: "14px" }}>
                        {unlocked ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.7rem", fontWeight: "800", background: "#ecfdf5", color: "#059669", padding: "3px 8px", borderRadius: "999px", border: "1px solid #a7f3d0" }}>
                            👑 UNLOCKED
                          </span>
                        ) : (
                          <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #fde68a" }} title="Click to pay & unlock">
                            <Lock size={14} color="#d97706" />
                          </div>
                        )}
                      </div>

                      <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: `${feature.color}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px", color: feature.color }}>
                        <Icon size={28} />
                      </div>

                      <h3 style={{ fontSize: "1.05rem", fontWeight: "800", color: "#0f172a", margin: "0 0 6px 0" }}>
                        {feature.name}
                      </h3>
                      <p style={{ fontSize: "0.8rem", color: "#64748b", margin: "0 0 16px 0", lineHeight: 1.4, flexGrow: 1 }}>
                        {feature.subtitle}
                      </p>

                      {/* Footer Call to Action */}
                      <div style={{ width: "100%", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
                        {unlocked ? (
                          <span style={{ fontSize: "0.78rem", fontWeight: "700", color: "#059669", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                            ✓ Active • Click to Open &rarr;
                          </span>
                        ) : (
                          <span style={{ fontSize: "0.78rem", fontWeight: "700", color: "#ef4444", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                            🔒 Pay ₹{Number(feature.priceINR || 2000).toLocaleString("en-IN")} to Unlock &rarr;
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ==================== MODULE: COUPONS & DISCOUNTS ==================== */}
          {activeTab === "coupons" && (
            <div>
              {!isFeatureUnlocked("coupons") ? (
                <div style={{ background: "#ffffff", borderRadius: "24px", padding: "48px 32px", textAlign: "center", border: "1px solid #e2e8f0", maxWidth: "600px", margin: "40px auto", boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)" }}>
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px auto", border: "2px solid #fde68a" }}>
                    <Lock size={30} color="#d97706" />
                  </div>
                  <span style={{ fontSize: "0.74rem", fontWeight: "800", background: "#fef3c7", color: "#92400e", padding: "4px 12px", borderRadius: "999px" }}>
                    PRIME MODULE • PAYMENT REQUIRED
                  </span>
                  <h2 style={{ fontSize: "1.4rem", fontWeight: "900", color: "#0f172a", margin: "14px 0 8px 0" }}>
                    Coupons & Promo Codes
                  </h2>
                  <p style={{ fontSize: "0.88rem", color: "#64748b", margin: "0 0 24px 0", lineHeight: 1.5 }}>
                    Create custom percentage & flat discount codes, set expiration limits, minimum cart spend, and track gross customer savings.
                  </p>
                  <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
                    <button
                      onClick={() => {
                        setSelectedPrimeFeatureForUnlock(PRIME_FEATURES.find((f) => f.id === "coupons") || { name: "Coupons & Discounts", priceINR: 2000, id: "coupons" });
                        setSelectedPrimePlan("single");
                        setShowPrimeUnlockModal(true);
                      }}
                      style={{ padding: "12px 24px", borderRadius: "12px", background: "linear-gradient(135deg, #ef4444, #dc2626)", border: "none", color: "#ffffff", fontWeight: "800", fontSize: "0.9rem", cursor: "pointer", boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)" }}
                    >
                      Pay ₹2,000 to Unlock
                    </button>
                    <button
                      onClick={() => setActiveTab("products")}
                      style={{ padding: "12px 20px", borderRadius: "12px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#475569", fontWeight: "700", fontSize: "0.88rem", cursor: "pointer" }}
                    >
                      View All Prime Modules
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
                    <div>
                      <button
                        onClick={() => setActiveTab("products")}
                        style={{ background: "transparent", border: "none", color: "#ef4444", fontWeight: "700", fontSize: "0.82rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", padding: 0, marginBottom: "6px" }}
                      >
                        &larr; Back to Prime Products
                      </button>
                      <h2 style={{ fontSize: "1.35rem", fontWeight: "900", color: "#0f172a", margin: 0 }}>Coupons & Promo Codes</h2>
                      <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                        Create seasonal discount codes for tyre purchases and workshop appointments.
                      </p>
                    </div>

                <button
                  onClick={() => {
                    setCouponForm({
                      code: "",
                      type: "percentage",
                      value: 15,
                      minSpend: 2500,
                      maxDiscount: 1000,
                      expiry: "2026-12-31",
                      status: "Active",
                    });
                    setShowAddCouponModal(true);
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #ef4444, #dc2626)",
                    border: "none",
                    color: "#ffffff",
                    fontWeight: "700",
                    fontSize: "0.88rem",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(239, 68, 68, 0.25)",
                  }}
                >
                  <Plus size={16} />
                  <span>Create New Coupon</span>
                </button>
              </div>

              {/* Coupons Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                {couponsList.map((cpn) => (
                  <div key={cpn.id} style={{ background: "#ffffff", borderRadius: "18px", border: "1px solid #e2e8f0", padding: "22px", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                        <span style={{ fontSize: "0.78rem", fontWeight: "800", background: "#f5f3ff", color: "#7c3aed", padding: "4px 10px", borderRadius: "999px", border: "1px solid #ddd6fe" }}>
                          {cpn.type === "percentage" ? `${cpn.value}% DISCOUNT` : `₹${cpn.value} FLAT OFF`}
                        </span>
                        <span style={{ fontSize: "0.72rem", fontWeight: "700", padding: "3px 8px", borderRadius: "999px", background: cpn.status === "Active" ? "#ecfdf5" : "#f1f5f9", color: cpn.status === "Active" ? "#059669" : "#64748b", border: cpn.status === "Active" ? "1px solid #a7f3d0" : "1px solid #cbd5e1" }}>
                          {cpn.status}
                        </span>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f8fafc", padding: "10px 14px", borderRadius: "10px", border: "1.5px dashed #cbd5e1", marginBottom: "14px" }}>
                        <span style={{ fontFamily: "monospace", fontSize: "1.1rem", fontWeight: "800", color: "#0f172a", letterSpacing: "0.08em" }}>{cpn.code}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(cpn.code);
                            triggerToast(`Copied code "${cpn.code}" to clipboard!`);
                          }}
                          style={{ background: "#ffffff", border: "1px solid #cbd5e1", padding: "4px 10px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: "700", color: "#334155", cursor: "pointer" }}
                        >
                          Copy
                        </button>
                      </div>

                      <div style={{ fontSize: "0.8rem", color: "#64748b", display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div>• Min Spend: ₹{cpn.minSpend?.toLocaleString("en-IN")}</div>
                        <div>• Max Cap: ₹{cpn.maxDiscount?.toLocaleString("en-IN")}</div>
                        <div>• Expires On: {cpn.expiry}</div>
                        <div>• Redemptions: {cpn.uses} times</div>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "8px", marginTop: "16px", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
                      <button
                        onClick={() => {
                          const updated = couponsList.map((c) => (c.id === cpn.id ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" } : c));
                          setCouponsList(updated);
                          triggerToast(`Toggled "${cpn.code}" status.`);
                        }}
                        style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#ffffff", color: "#475569", fontWeight: "700", fontSize: "0.78rem", cursor: "pointer" }}
                      >
                        {cpn.status === "Active" ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        onClick={() => {
                          setCouponsList(couponsList.filter((c) => c.id !== cpn.id));
                          triggerToast(`Deleted coupon "${cpn.code}"`);
                        }}
                        style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #fecaca", background: "#fef2f2", color: "#ef4444", cursor: "pointer" }}
                        title="Delete coupon"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== MODULE: WHATSAPP MARKETING ==================== */}
          {activeTab === "whatsapp" && (
            <div>
              {!isFeatureUnlocked("whatsapp") ? (
                <div style={{ background: "#ffffff", borderRadius: "24px", padding: "48px 32px", textAlign: "center", border: "1px solid #e2e8f0", maxWidth: "600px", margin: "40px auto", boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)" }}>
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px auto", border: "2px solid #fde68a" }}>
                    <Lock size={30} color="#d97706" />
                  </div>
                  <span style={{ fontSize: "0.74rem", fontWeight: "800", background: "#fef3c7", color: "#92400e", padding: "4px 12px", borderRadius: "999px" }}>
                    PRIME MODULE • PAYMENT REQUIRED
                  </span>
                  <h2 style={{ fontSize: "1.4rem", fontWeight: "900", color: "#0f172a", margin: "14px 0 8px 0" }}>
                    WhatsApp Marketing Hub
                  </h2>
                  <p style={{ fontSize: "0.88rem", color: "#64748b", margin: "0 0 24px 0", lineHeight: 1.5 }}>
                    Unlock promotional WhatsApp broadcasts, maintenance reminder alerts to leads and buyers, and live delivery simulator.
                  </p>
                  <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
                    <button
                      onClick={() => {
                        setSelectedPrimeFeatureForUnlock(PRIME_FEATURES.find((f) => f.id === "whatsapp") || { name: "WhatsApp Marketing", priceINR: 2000, id: "whatsapp" });
                        setSelectedPrimePlan("single");
                        setShowPrimeUnlockModal(true);
                      }}
                      style={{ padding: "12px 24px", borderRadius: "12px", background: "linear-gradient(135deg, #ef4444, #dc2626)", border: "none", color: "#ffffff", fontWeight: "800", fontSize: "0.9rem", cursor: "pointer", boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)" }}
                    >
                      Pay ₹2,000 to Unlock
                    </button>
                    <button
                      onClick={() => setActiveTab("products")}
                      style={{ padding: "12px 20px", borderRadius: "12px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#475569", fontWeight: "700", fontSize: "0.88rem", cursor: "pointer" }}
                    >
                      View All Prime Modules
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
                    <div>
                      <button
                        onClick={() => setActiveTab("products")}
                        style={{ background: "transparent", border: "none", color: "#ef4444", fontWeight: "700", fontSize: "0.82rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", padding: 0, marginBottom: "6px" }}
                      >
                        &larr; Back to Prime Products
                      </button>
                      <h2 style={{ fontSize: "1.35rem", fontWeight: "900", color: "#0f172a", margin: 0 }}>WhatsApp Marketing & Broadcast Hub</h2>
                      <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                        Send direct promotional WhatsApp campaigns, seasonal maintenance alerts, and service reminders.
                      </p>
                    </div>
                  </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
                {/* Campaign Composer */}
                <div style={{ background: "#ffffff", borderRadius: "20px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#0f172a", margin: "0 0 16px 0" }}>Compose Broadcast</h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Campaign Template</label>
                      <select
                        value={whatsappTemplate}
                        onChange={(e) => {
                          setWhatsappTemplate(e.target.value);
                          if (e.target.value === "monsoon") {
                            setWhatsappCustomMsg("🚗 Monsoon Tyre Safety Reminder from Sadguru Tyres! Get 20% OFF on 3D Laser Alignment & complimentary tread inspection. Book at https://sadgurutyres.com or call +91 98220 12345.");
                          } else if (e.target.value === "diwali") {
                            setWhatsappCustomMsg("🪔 Festive Special: Get ₹500 OFF on purchase of 4 Michelin or Bridgestone tyres with free robotic fitting at Sadguru Tyres Pune!");
                          } else if (e.target.value === "service_reminder") {
                            setWhatsappCustomMsg("🔧 Routine Maintenance Due: Your vehicle is due for wheel balancing and alignment check. Visit Sadguru Tyres today for smooth driving!");
                          }
                        }}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem", outline: "none" }}
                      >
                        <option value="monsoon">Monsoon Tyre Safety & Inspection (20% OFF)</option>
                        <option value="diwali">Festive Mega Tyre Discount (₹500 OFF)</option>
                        <option value="service_reminder">Wheel Alignment & Service Due Reminder</option>
                        <option value="custom">Custom Promotional Message</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Target Audience Segment</label>
                      <select
                        value={whatsappAudience}
                        onChange={(e) => setWhatsappAudience(e.target.value)}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem", outline: "none" }}
                      >
                        <option value="all_leads">All Customer Leads (48 verified numbers)</option>
                        <option value="recent_buyers">Recent Tyre Buyers (32 customers)</option>
                        <option value="quote_requests">Pending Quote Requesters (19 customers)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Message Content</label>
                      <textarea
                        rows={4}
                        value={whatsappCustomMsg}
                        onChange={(e) => setWhatsappCustomMsg(e.target.value)}
                        style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem", outline: "none", fontFamily: "inherit" }}
                      />
                    </div>

                    <button
                      disabled={isBroadcastingWhatsapp}
                      onClick={() => {
                        setIsBroadcastingWhatsapp(true);
                        setTimeout(() => {
                          setIsBroadcastingWhatsapp(false);
                          setWhatsappBroadcastLogs((prev) => [
                            { id: Date.now(), time: new Date().toLocaleTimeString(), audience: whatsappAudience, count: 48, status: "Broadcast Delivered ✓" },
                            ...prev,
                          ]);
                          triggerToast("🎉 WhatsApp Broadcast dispatched to 48 customers!");
                        }, 1200);
                      }}
                      style={{
                        padding: "12px",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #22c55e, #16a34a)",
                        border: "none",
                        color: "#ffffff",
                        fontWeight: "700",
                        fontSize: "0.9rem",
                        cursor: isBroadcastingWhatsapp ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      <MessageCircle size={18} />
                      <span>{isBroadcastingWhatsapp ? "Sending Broadcast..." : "Send Broadcast Campaign"}</span>
                    </button>
                  </div>
                </div>

                {/* WhatsApp Chat Preview */}
                <div style={{ background: "#efeae2", borderRadius: "20px", border: "1px solid #cbd5e1", padding: "20px", display: "flex", flexDirection: "column" }}>
                  <div style={{ background: "#075e54", color: "#ffffff", padding: "12px 16px", borderRadius: "12px 12px 0 0", display: "flex", alignItems: "center", gap: "10px", margin: "-20px -20px 20px -20px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <img src="/images/sgt_logo.png" alt="SGT" style={{ width: "32px", height: "32px", borderRadius: "50%" }} />
                    </div>
                    <div>
                      <div style={{ fontWeight: "800", fontSize: "0.9rem" }}>Sadguru Tyres Official</div>
                      <div style={{ fontSize: "0.72rem", color: "#dcf8c6" }}>Verified WhatsApp Business Account</div>
                    </div>
                  </div>

                  <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div style={{ background: "#ffffff", padding: "14px 16px", borderRadius: "12px 12px 12px 0", maxWidth: "90%", boxShadow: "0 1px 2px rgba(0,0,0,0.15)", alignSelf: "flex-start", position: "relative" }}>
                      <div style={{ fontSize: "0.85rem", color: "#111b21", whiteSpace: "pre-wrap", lineHeight: 1.45 }}>
                        {whatsappCustomMsg}
                      </div>
                      <div style={{ textAlign: "right", fontSize: "0.68rem", color: "#667781", marginTop: "4px" }}>
                        {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} ✓✓
                      </div>
                    </div>
                  </div>

                  {whatsappBroadcastLogs.length > 0 && (
                    <div style={{ marginTop: "16px", background: "rgba(255,255,255,0.85)", padding: "12px", borderRadius: "10px", fontSize: "0.76rem" }}>
                      <div style={{ fontWeight: "800", color: "#0f172a", marginBottom: "4px" }}>Recent Broadcast History:</div>
                      {whatsappBroadcastLogs.slice(0, 2).map((log) => (
                        <div key={log.id} style={{ color: "#15803d" }}>
                          • {log.time} — Sent to {log.count} recipients ({log.status})
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== MODULE: CHATBOT SUPPORT ==================== */}
          {activeTab === "chatbot" && (
            <div>
              {!isFeatureUnlocked("chatbot") ? (
                <div style={{ background: "#ffffff", borderRadius: "24px", padding: "48px 32px", textAlign: "center", border: "1px solid #e2e8f0", maxWidth: "600px", margin: "40px auto", boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)" }}>
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px auto", border: "2px solid #fde68a" }}>
                    <Lock size={30} color="#d97706" />
                  </div>
                  <span style={{ fontSize: "0.74rem", fontWeight: "800", background: "#fef3c7", color: "#92400e", padding: "4px 12px", borderRadius: "999px" }}>
                    PRIME MODULE • PAYMENT REQUIRED
                  </span>
                  <h2 style={{ fontSize: "1.4rem", fontWeight: "900", color: "#0f172a", margin: "14px 0 8px 0" }}>
                    AI Chatbot Support Assistant
                  </h2>
                  <p style={{ fontSize: "0.88rem", color: "#64748b", margin: "0 0 24px 0", lineHeight: 1.5 }}>
                    Unlock the 24/7 automated AI concierge on your customer website, customizable greetings, phone hotline fallbacks, and interactive response simulator.
                  </p>
                  <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
                    <button
                      onClick={() => {
                        setSelectedPrimeFeatureForUnlock(PRIME_FEATURES.find((f) => f.id === "chatbot") || { name: "Chatbot Support", priceINR: 2000, id: "chatbot" });
                        setSelectedPrimePlan("single");
                        setShowPrimeUnlockModal(true);
                      }}
                      style={{ padding: "12px 24px", borderRadius: "12px", background: "linear-gradient(135deg, #ef4444, #dc2626)", border: "none", color: "#ffffff", fontWeight: "800", fontSize: "0.9rem", cursor: "pointer", boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)" }}
                    >
                      Pay ₹2,000 to Unlock
                    </button>
                    <button
                      onClick={() => setActiveTab("products")}
                      style={{ padding: "12px 20px", borderRadius: "12px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#475569", fontWeight: "700", fontSize: "0.88rem", cursor: "pointer" }}
                    >
                      View All Prime Modules
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
                    <div>
                      <button
                        onClick={() => setActiveTab("products")}
                        style={{ background: "transparent", border: "none", color: "#ef4444", fontWeight: "700", fontSize: "0.82rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", padding: 0, marginBottom: "6px" }}
                      >
                        &larr; Back to Prime Products
                      </button>
                      <h2 style={{ fontSize: "1.35rem", fontWeight: "900", color: "#0f172a", margin: 0 }}>AI Chatbot Support Assistant</h2>
                      <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                        Configure automated 24/7 customer inquiry replies, tyre size advisor bot, and test replies.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
                    {/* Chatbot Config Settings */}
                    <div style={{ background: "#ffffff", borderRadius: "20px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)" }}>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#0f172a", margin: "0 0 16px 0" }}>Chatbot Configuration</h3>

                      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {/* Bot Toggle */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px", borderRadius: "12px", background: "#f8fafc", border: "1px solid #cbd5e1" }}>
                          <div>
                            <div style={{ fontWeight: "800", fontSize: "0.88rem", color: "#0f172a" }}>Chatbot Status</div>
                            <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Show floating AI assistant on customer website</div>
                          </div>
                          <button
                            onClick={() => {
                              const next = !chatbotActive;
                              setChatbotActive(next);
                              if (onToggleChatbotEnabled) onToggleChatbotEnabled(next);
                              triggerToast(`Chatbot is now ${next ? "Enabled" : "Disabled"}`);
                            }}
                            style={{ padding: "6px 14px", borderRadius: "8px", border: "none", background: chatbotActive ? "#10b981" : "#cbd5e1", color: "#ffffff", fontWeight: "800", fontSize: "0.8rem", cursor: "pointer" }}
                          >
                            {chatbotActive ? "Active ON" : "Disabled OFF"}
                          </button>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Greeting Message</label>
                          <textarea
                            rows={3}
                            value={chatbotGreeting}
                            onChange={(e) => setChatbotGreeting(e.target.value)}
                            style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem", outline: "none", fontFamily: "inherit" }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Human Fallback Hotline</label>
                          <input
                            type="text"
                            value={chatbotPhone}
                            onChange={(e) => setChatbotPhone(e.target.value)}
                            style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem", outline: "none" }}
                          />
                        </div>

                        <button
                          onClick={() => triggerToast("Chatbot settings saved successfully!")}
                          style={{ padding: "12px", borderRadius: "12px", background: "linear-gradient(135deg, #ef4444, #dc2626)", border: "none", color: "#ffffff", fontWeight: "700", fontSize: "0.88rem", cursor: "pointer" }}
                        >
                          Save Configuration
                        </button>
                      </div>
                    </div>

                    {/* Interactive Test Simulator */}
                    <div style={{ background: "#ffffff", borderRadius: "20px", border: "1px solid #e2e8f0", padding: "24px", display: "flex", flexDirection: "column", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid #f1f5f9" }}>
                        <Bot size={22} color="#10b981" />
                        <div>
                          <h3 style={{ fontSize: "1.05rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>Interactive Bot Simulator</h3>
                          <div style={{ fontSize: "0.74rem", color: "#64748b" }}>Test AI responses in real-time</div>
                        </div>
                      </div>

                      <div style={{ flexGrow: 1, minHeight: "220px", display: "flex", flexDirection: "column", gap: "10px", overflowY: "auto", padding: "10px", background: "#f8fafc", borderRadius: "12px", marginBottom: "14px" }}>
                        {simulatedChatMessages.map((msg, i) => (
                          <div
                            key={i}
                            style={{
                              alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                              background: msg.from === "user" ? "#0f172a" : "#ffffff",
                              color: msg.from === "user" ? "#ffffff" : "#0f172a",
                              padding: "10px 14px",
                              borderRadius: msg.from === "user" ? "14px 14px 2px 14px" : "14px 14px 14px 2px",
                              fontSize: "0.82rem",
                              maxWidth: "85%",
                              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                              border: msg.from === "bot" ? "1px solid #e2e8f0" : "none",
                            }}
                          >
                            {msg.text}
                          </div>
                        ))}
                      </div>

                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!testChatInput.trim()) return;
                          const userMsg = testChatInput;
                          setSimulatedChatMessages((prev) => [...prev, { from: "user", text: userMsg }]);
                          setTestChatInput("");

                          setTimeout(() => {
                            let reply = "I can help check pricing and schedule a service appointment for you at our Sadguru Tyres Pune workshop!";
                            if (userMsg.toLowerCase().includes("align")) reply = "Our 3D Laser Alignment is ₹2,200 with 30-min precision calibration. Would you like to book now?";
                            else if (userMsg.toLowerCase().includes("michelin") || userMsg.toLowerCase().includes("apollo") || userMsg.toLowerCase().includes("price")) reply = "We have high performance Michelin, Apollo, and Bridgestone tyres in stock with warranty and instant fitting!";
                            setSimulatedChatMessages((prev) => [...prev, { from: "bot", text: reply }]);
                          }, 500);
                        }}
                        style={{ display: "flex", gap: "8px" }}
                      >
                        <input
                          type="text"
                          placeholder="Type a test customer message..."
                          value={testChatInput}
                          onChange={(e) => setTestChatInput(e.target.value)}
                          style={{ flexGrow: 1, padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.85rem", outline: "none" }}
                        />
                        <button
                          type="submit"
                          style={{ padding: "10px 16px", borderRadius: "10px", background: "#0f172a", color: "#ffffff", border: "none", fontWeight: "700", fontSize: "0.85rem", cursor: "pointer" }}
                        >
                          Send
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: INVENTORY & CATALOG MANAGEMENT */}
          {activeTab === "inventory" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "16px" }}>
                <div>
                  <h2 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>Tyre Catalog Inventory</h2>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                    Manage prices, stock levels, badges, specifications, and Home screen showcase visibility.
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <button
                    onClick={handleOpenAddModal}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 20px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #ef4444, #dc2626)",
                      border: "none",
                      color: "#ffffff",
                      fontWeight: "700",
                      fontSize: "0.88rem",
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(239, 68, 68, 0.25)",
                    }}
                  >
                    <Plus size={16} />
                    <span>Add New Product</span>
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 16px",
                  borderRadius: "14px",
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  marginBottom: "16px",
                  boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, position: "relative" }}>
                  <Search size={18} color="#64748b" style={{ flexShrink: 0 }} />
                  <input
                    type="text"
                    placeholder="Search tyres by model name, brand, vehicle type, or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      fontSize: "0.88rem",
                      color: "#0f172a",
                      background: "transparent",
                    }}
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm("")}
                      style={{
                        background: "#f1f5f9",
                        border: "none",
                        borderRadius: "50%",
                        width: "22px",
                        height: "22px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#64748b",
                        cursor: "pointer",
                      }}
                      title="Clear search"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>
                {searchTerm && (
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "600", whiteSpace: "nowrap" }}>
                    {filteredTyres.length} {filteredTyres.length === 1 ? "product" : "products"} found
                  </div>
                )}
              </div>

              {/* Inventory Table */}
              <div style={{ borderRadius: "20px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      <th style={{ padding: "16px 20px", width: "42%" }}>Product</th>
                      <th style={{ padding: "16px 20px", width: "24%" }}>Vehicle & Type</th>
                      <th style={{ padding: "16px 20px", textAlign: "center", width: "18%" }}>Show on Home</th>
                      <th style={{ padding: "16px 20px", textAlign: "right", width: "16%" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTyres.map((tyre) => {
                      const isVisibleOnHome = tyre.showOnHome !== false && tyre.show_on_home !== false && tyre.visual_specs?.show_on_home !== false;
                      return (
                        <tr
                          key={tyre.id}
                          style={{
                            borderBottom: "1px solid #e2e8f0",
                            transition: "background-color 0.15s ease",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                          <td style={{ padding: "14px 20px" }}>
                            <div
                              onClick={() => setSelectedDetailTyre(tyre)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "14px",
                                cursor: "pointer",
                                width: "fit-content",
                              }}
                              title="Click to view full specifications, price, stock & details"
                            >
                              <img
                                src={tyre.image || DEFAULT_TYRE_IMAGE}
                                alt={tyre.name}
                                style={{
                                  width: "48px",
                                  height: "48px",
                                  borderRadius: "10px",
                                  objectFit: "cover",
                                  border: "1px solid #cbd5e1",
                                  background: "#f1f5f9",
                                  transition: "transform 0.2s ease",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                              />
                              <div>
                                <div
                                  style={{
                                    fontWeight: "700",
                                    color: "#0f172a",
                                    fontSize: "0.95rem",
                                    transition: "color 0.2s ease",
                                  }}
                                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                                  onMouseLeave={(e) => (e.currentTarget.style.color = "#0f172a")}
                                >
                                  {tyre.name}
                                </div>
                                <div style={{ fontSize: "0.76rem", color: "#64748b", marginTop: "2px" }}>
                                  {tyre.brand || "Sadguru Apex"}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td style={{ padding: "14px 20px", color: "#334155" }}>
                            <div style={{ fontWeight: "600", color: "#0f172a" }}>{tyre.vehicleType || "Cars"}</div>
                            <div style={{ fontSize: "0.76rem", color: "#64748b" }}>{tyre.category || "Passenger Tyre"}</div>
                          </td>

                          <td style={{ padding: "14px 20px", textAlign: "center" }}>
                            <button
                              type="button"
                              onClick={() => {
                                const newStatus = !isVisibleOnHome;
                                onUpdateTyre({
                                  ...tyre,
                                  showOnHome: newStatus,
                                  show_on_home: newStatus,
                                  visual_specs: {
                                    ...(tyre.visual_specs || {}),
                                    show_on_home: newStatus,
                                  },
                                });
                                triggerToast(`"${tyre.name}" is now ${newStatus ? "Visible" : "Hidden"} on Home screen`);
                              }}
                              style={{
                                padding: "6px 14px",
                                borderRadius: "9999px",
                                border: isVisibleOnHome ? "1px solid #86efac" : "1px solid #cbd5e1",
                                background: isVisibleOnHome ? "#f0fdf4" : "#f8fafc",
                                color: isVisibleOnHome ? "#15803d" : "#64748b",
                                fontWeight: "700",
                                fontSize: "0.76rem",
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                transition: "all 0.2s ease",
                                whiteSpace: "nowrap",
                              }}
                              title="Click to toggle visibility on Home Screen"
                            >
                              <span
                                style={{
                                  width: "8px",
                                  height: "8px",
                                  borderRadius: "50%",
                                  background: isVisibleOnHome ? "#22c55e" : "#94a3b8",
                                }}
                              />
                              {isVisibleOnHome ? "Visible on Home" : "Hidden"}
                            </button>
                          </td>

                          <td style={{ padding: "14px 20px", textAlign: "right" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}>
                              <button
                                onClick={() => handleOpenEditModal(tyre)}
                                style={{
                                  padding: "8px 12px",
                                  borderRadius: "8px",
                                  border: "1px solid #cbd5e1",
                                  background: "#ffffff",
                                  color: "#0f172a",
                                  cursor: "pointer",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "6px",
                                  fontSize: "0.78rem",
                                  fontWeight: "600",
                                  transition: "all 0.15s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.borderColor = "#0f172a";
                                  e.currentTarget.style.background = "#f8fafc";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.borderColor = "#cbd5e1";
                                  e.currentTarget.style.background = "#ffffff";
                                }}
                              >
                                <Edit size={14} /> Edit
                              </button>
                              <button
                                onClick={() => {
                                  onDeleteTyre(tyre.id);
                                  triggerToast(`Deleted "${tyre.name}" from inventory`);
                                }}
                                style={{
                                  padding: "8px 12px",
                                  borderRadius: "8px",
                                  border: "1px solid #fecaca",
                                  background: "#fef2f2",
                                  color: "#ef4444",
                                  cursor: "pointer",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "6px",
                                  fontSize: "0.78rem",
                                  fontWeight: "600",
                                  transition: "all 0.15s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = "#fee2e2";
                                  e.currentTarget.style.borderColor = "#ef4444";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = "#fef2f2";
                                  e.currentTarget.style.borderColor = "#fecaca";
                                }}
                              >
                                <Trash2 size={14} /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Pagination Bar */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 20px",
                    background: "#ffffff",
                    borderTop: "1px solid #e2e8f0",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                    <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: "500" }}>
                      Showing{" "}
                      <strong style={{ color: "#0f172a" }}>
                        {filteredTyres.length === 0 ? 0 : (currentInventoryPage - 1) * ITEMS_PER_PAGE + 1}
                      </strong>{" "}
                      to{" "}
                      <strong style={{ color: "#0f172a" }}>
                        {Math.min(currentInventoryPage * ITEMS_PER_PAGE, filteredTyres.length)}
                      </strong>{" "}
                      of <strong style={{ color: "#0f172a" }}>{filteredTyres.length}</strong> products
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "#64748b" }}>
                      <span>Per page:</span>
                      <select
                        value={inventoryItemsPerPage}
                        onChange={(e) => setInventoryItemsPerPage(Number(e.target.value))}
                        style={{
                          padding: "4px 8px",
                          borderRadius: "6px",
                          border: "1px solid #cbd5e1",
                          background: "#f8fafc",
                          color: "#0f172a",
                          fontSize: "0.8rem",
                          fontWeight: "600",
                          outline: "none",
                          cursor: "pointer",
                        }}
                      >
                        <option value={5}>5 per page</option>
                        <option value={6}>6 per page (Home Set)</option>
                        <option value={10}>10 per page</option>
                        <option value={20}>20 per page</option>
                        <option value={100}>All products</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button
                      disabled={currentInventoryPage <= 1}
                      onClick={() => setInventoryPage((prev) => Math.max(prev - 1, 1))}
                      style={{
                        padding: "8px 14px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        background: currentInventoryPage <= 1 ? "#f1f5f9" : "#ffffff",
                        color: currentInventoryPage <= 1 ? "#94a3b8" : "#0f172a",
                        cursor: currentInventoryPage <= 1 ? "not-allowed" : "pointer",
                        fontWeight: "600",
                        fontSize: "0.82rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <ChevronLeft size={16} /> Previous
                    </button>

                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      {Array.from({ length: totalInventoryPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => setInventoryPage(pageNum)}
                          style={{
                            width: "34px",
                            height: "34px",
                            borderRadius: "8px",
                            border: pageNum === currentInventoryPage ? "none" : "1px solid #cbd5e1",
                            background: pageNum === currentInventoryPage ? "linear-gradient(135deg, #ef4444, #dc2626)" : "#ffffff",
                            color: pageNum === currentInventoryPage ? "#ffffff" : "#0f172a",
                            fontWeight: "700",
                            fontSize: "0.82rem",
                            cursor: "pointer",
                          }}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>

                    <button
                      disabled={currentInventoryPage >= totalInventoryPages}
                      onClick={() => setInventoryPage((prev) => Math.min(prev + 1, totalInventoryPages))}
                      style={{
                        padding: "8px 14px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        background: currentInventoryPage >= totalInventoryPages ? "#f1f5f9" : "#ffffff",
                        color: currentInventoryPage >= totalInventoryPages ? "#94a3b8" : "#0f172a",
                        cursor: currentInventoryPage >= totalInventoryPages ? "not-allowed" : "pointer",
                        fontWeight: "600",
                        fontSize: "0.82rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      Next <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: BRANDS MANAGER */}
          {activeTab === "brands" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <div>
                  <h2 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>Partner Brands Showcase</h2>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                    Manage global tyre manufacturer logos, taglines, and brand showcase featured on the live store homepage.
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: "700",
                      background: (brandsList || []).length >= 6 ? "#fef2f2" : "#f1f5f9",
                      color: (brandsList || []).length >= 6 ? "#ef4444" : "#475569",
                      padding: "6px 14px",
                      borderRadius: "999px",
                      border: (brandsList || []).length >= 6 ? "1px solid #fecaca" : "1px solid #cbd5e1",
                    }}
                  >
                    {(brandsList || []).length} / 6 Partner Brands {(brandsList || []).length >= 6 ? "(Showcase Full)" : "Max"}
                  </div>

                  {(brandsList || []).length < 6 && (
                    <button
                      onClick={handleOpenAddBrandModal}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px 20px",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #ef4444, #dc2626)",
                        border: "none",
                        color: "#ffffff",
                        fontWeight: "700",
                        fontSize: "0.88rem",
                        cursor: "pointer",
                        boxShadow: "0 4px 12px rgba(239, 68, 68, 0.25)",
                      }}
                    >
                      <Plus size={16} />
                      <span>Add New Brand</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Brands Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
                {brandsList.map((brand) => (
                  <div
                    key={brand.id}
                    style={{
                      padding: "24px",
                      borderRadius: "20px",
                      background: "#ffffff",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ height: "90px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        style={{ maxHeight: "70px", maxWidth: "180px", objectFit: "contain" }}
                      />
                    </div>
                    <div style={{ fontWeight: "800", fontSize: "1.05rem", color: "#0f172a", marginBottom: "4px" }}>
                      {brand.name}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "600", marginBottom: "16px" }}>
                      {brand.tagline}
                    </div>
                    <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "10px", width: "100%", justifyContent: "center" }}>
                      <button
                        onClick={() => handleOpenEditBrandModal(brand)}
                        style={{ padding: "8px 16px", borderRadius: "10px", border: "1px solid #cbd5e1", background: "#ffffff", color: "#0f172a", fontWeight: "700", fontSize: "0.78rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
                      >
                        <Edit size={14} /> Edit
                      </button>
                      <button
                        onClick={() => {
                          if (onDeleteBrand) onDeleteBrand(brand.id);
                          triggerToast(`Deleted brand "${brand.name}"`);
                        }}
                        style={{ padding: "8px 16px", borderRadius: "10px", border: "1px solid #fecaca", background: "#fef2f2", color: "#ef4444", fontWeight: "700", fontSize: "0.78rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==================== MODULE: SERVICES MANAGEMENT ==================== */}
          {activeTab === "services" && (
            <div>
              {/* Header Bar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
                <div>
                  <h2 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                    Workshop Services Management
                  </h2>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                    Manage specialized workshop offerings, pricing (₹), estimated duration, and availability status.
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                  {/* Add New Service Button */}
                  <button
                    onClick={handleOpenAddServiceModal}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 20px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #ef4444, #dc2626)",
                      border: "none",
                      color: "#ffffff",
                      fontWeight: "700",
                      fontSize: "0.88rem",
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(239, 68, 68, 0.25)",
                    }}
                  >
                    <Plus size={16} />
                    <span>Add New Service</span>
                  </button>
                </div>
              </div>

              {/* Service Stat Badges */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "24px" }}>
                <div style={{ background: "#ffffff", borderRadius: "16px", padding: "18px 20px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)" }}>
                  <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: "600", textTransform: "uppercase" }}>Total Services</div>
                  <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#0f172a", marginTop: "4px" }}>{(servicesList || []).length}</div>
                </div>
                <div style={{ background: "#ffffff", borderRadius: "16px", padding: "18px 20px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)" }}>
                  <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: "600", textTransform: "uppercase" }}>Active Services</div>
                  <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#0f172a", marginTop: "4px" }}>
                    {(servicesList || []).filter(s => s.status === "Active").length}
                  </div>
                </div>
                <div style={{ background: "#ffffff", borderRadius: "16px", padding: "18px 20px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)" }}>
                  <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: "600", textTransform: "uppercase" }}>Featured on Home</div>
                  <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#059669", marginTop: "4px", display: "flex", alignItems: "baseline", gap: "6px" }}>
                    <span>{(servicesList || []).filter(s => Boolean(s.showOnHome ?? s.show_on_home)).length}</span>
                    <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "600" }}>/ 3 max</span>
                  </div>
                </div>
                <div style={{ background: "#ffffff", borderRadius: "16px", padding: "18px 20px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)" }}>
                  <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: "600", textTransform: "uppercase" }}>Avg Service Price</div>
                  <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#ef4444", marginTop: "4px" }}>
                    ₹ {servicesList && servicesList.length > 0 ? Math.round(servicesList.reduce((acc, s) => acc + (s.priceINR || s.price_inr || 0), 0) / servicesList.length) : 0}
                  </div>
                </div>
              </div>

              {/* Filters & Search */}
              <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ flex: 1, minWidth: "240px", position: "relative" }}>
                  <Search size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                  <input
                    type="text"
                    placeholder="Search services by title or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px 10px 40px",
                      borderRadius: "12px",
                      border: "1px solid #cbd5e1",
                      background: "#ffffff",
                      fontSize: "0.88rem",
                      color: "#0f172a",
                      outline: "none",
                    }}
                  />
                </div>
                <select
                  value={serviceCategoryFilter}
                  onChange={(e) => setServiceCategoryFilter(e.target.value)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: "12px",
                    border: "1px solid #cbd5e1",
                    background: "#ffffff",
                    fontSize: "0.85rem",
                    color: "#0f172a",
                    fontWeight: "600",
                    outline: "none",
                  }}
                >
                  <option value="all">All Categories</option>
                  <option value="Tyre Care">Tyre Care</option>
                  <option value="Fitting & Mounting">Fitting & Mounting</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Repair & Inspection">Repair & Inspection</option>
                  <option value="Chassis & Brakes">Chassis & Brakes</option>
                </select>
                <select
                  value={serviceStatusFilter}
                  onChange={(e) => setServiceStatusFilter(e.target.value)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: "12px",
                    border: "1px solid #cbd5e1",
                    background: "#ffffff",
                    fontSize: "0.85rem",
                    color: "#0f172a",
                    fontWeight: "600",
                    outline: "none",
                  }}
                >
                  <option value="all">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Services Cards Grid */}
              {filteredServices.length === 0 ? (
                <div style={{ background: "#ffffff", borderRadius: "16px", padding: "48px", textAlign: "center", border: "1px solid #e2e8f0" }}>
                  <Wrench size={40} style={{ color: "#94a3b8", marginBottom: "12px" }} />
                  <h3 style={{ fontSize: "1.1rem", color: "#0f172a", margin: 0 }}>No Workshop Services Found</h3>
                  <p style={{ color: "#64748b", fontSize: "0.85rem", marginTop: "4px" }}>
                    Try clearing search filters or click "Add New Service" to create one.
                  </p>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
                  {paginatedServices.map((service) => (
                    <div
                      key={service.id}
                      style={{
                        background: "#ffffff",
                        borderRadius: "16px",
                        border: "1px solid #e2e8f0",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)",
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      }}
                    >
                      {/* Service Info Body */}
                      <div style={{ padding: "20px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <div>
                          {/* Badges Header: Category, Show on Home & Status */}
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", gap: "8px", flexWrap: "wrap" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                              <div style={{ background: "#0f172a", color: "#ffffff", fontSize: "0.72rem", fontWeight: "700", padding: "4px 10px", borderRadius: "999px", letterSpacing: "0.04em" }}>
                                {service.category || "Tyre Care"}
                              </div>
                              <button
                                type="button"
                                onClick={() => handleToggleServiceShowOnHome(service)}
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  padding: "3px 10px",
                                  borderRadius: "999px",
                                  fontSize: "0.72rem",
                                  fontWeight: "700",
                                  cursor: "pointer",
                                  transition: "all 0.2s ease",
                                  background: Boolean(service.showOnHome ?? service.show_on_home) ? "#ecfdf5" : "#f8fafc",
                                  color: Boolean(service.showOnHome ?? service.show_on_home) ? "#059669" : "#64748b",
                                  border: Boolean(service.showOnHome ?? service.show_on_home) ? "1px solid #a7f3d0" : "1px solid #cbd5e1",
                                }}
                                title="Click to toggle Show on Home Screen"
                              >
                                <span>{Boolean(service.showOnHome ?? service.show_on_home) ? "✓ On Home" : "Hidden"}</span>
                              </button>
                            </div>
                            <div
                              style={{
                                background: service.status === "Active" ? "#10b981" : "#64748b",
                                color: "#ffffff",
                                fontSize: "0.72rem",
                                fontWeight: "700",
                                padding: "4px 10px",
                                borderRadius: "999px",
                              }}
                            >
                              {service.status || "Active"}
                            </div>
                          </div>

                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", marginBottom: "8px" }}>
                            <h3 style={{ fontSize: "1.05rem", fontWeight: "800", color: "#0f172a", margin: 0, lineHeight: 1.3 }}>
                              {service.title || service.name}
                            </h3>
                          </div>
                          <p style={{ fontSize: "0.83rem", color: "#64748b", margin: "0 0 16px 0", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {service.description || service.shortDesc || "No description provided."}
                          </p>
                        </div>

                        {/* Price & Duration */}
                        <div style={{ paddingTop: "14px", borderTop: "1px solid #f1f5f9" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", color: "#475569", fontWeight: "600" }}>
                              <Clock size={15} style={{ color: "#ef4444" }} />
                              <span>{service.duration || "30 Mins"}</span>
                            </div>
                            <div style={{ fontSize: "1.2rem", fontWeight: "900", color: "#0f172a" }}>
                              ₹ {(service.priceINR || service.price_inr || 0).toLocaleString("en-IN")}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 40px", gap: "8px" }}>
                            <button
                              onClick={() => handleOpenEditServiceModal(service)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "6px",
                                padding: "8px",
                                borderRadius: "10px",
                                background: "#0f172a",
                                border: "none",
                                color: "#ffffff",
                                fontSize: "0.8rem",
                                fontWeight: "700",
                                cursor: "pointer",
                              }}
                            >
                              <Edit size={14} />
                              <span>Edit</span>
                            </button>

                            <button
                              onClick={() => handleToggleServiceStatus(service)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "8px",
                                borderRadius: "10px",
                                background: service.status === "Active" ? "#f1f5f9" : "#ef4444",
                                border: "1px solid #cbd5e1",
                                color: service.status === "Active" ? "#334155" : "#ffffff",
                                fontSize: "0.8rem",
                                fontWeight: "700",
                                cursor: "pointer",
                              }}
                            >
                              <span>{service.status === "Active" ? "Deactivate" : "Activate"}</span>
                            </button>

                            <button
                              onClick={() => handleDeleteServiceItem(service.id, service.title)}
                              title="Delete Service"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "8px",
                                borderRadius: "10px",
                                background: "#ffffff",
                                border: "1px solid #fca5a5",
                                color: "#ef4444",
                                cursor: "pointer",
                              }}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Services Pagination Bar */}
              {filteredServices.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "24px",
                    padding: "16px 20px",
                    background: "#ffffff",
                    borderRadius: "14px",
                    border: "1px solid #e2e8f0",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: "500" }}>
                    Showing{" "}
                    <strong style={{ color: "#0f172a" }}>
                      {(currentServicesPage - 1) * SERVICES_PER_PAGE + 1}
                    </strong>{" "}
                    to{" "}
                    <strong style={{ color: "#0f172a" }}>
                      {Math.min(currentServicesPage * SERVICES_PER_PAGE, filteredServices.length)}
                    </strong>{" "}
                    of <strong style={{ color: "#0f172a" }}>{filteredServices.length}</strong> services
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button
                      disabled={currentServicesPage <= 1}
                      onClick={() => setServicesPage((prev) => Math.max(prev - 1, 1))}
                      style={{
                        padding: "8px 14px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        background: currentServicesPage <= 1 ? "#f1f5f9" : "#ffffff",
                        color: currentServicesPage <= 1 ? "#94a3b8" : "#0f172a",
                        cursor: currentServicesPage <= 1 ? "not-allowed" : "pointer",
                        fontWeight: "600",
                        fontSize: "0.82rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <ChevronLeft size={16} /> Previous
                    </button>

                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      {Array.from({ length: totalServicesPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => setServicesPage(pageNum)}
                          style={{
                            width: "34px",
                            height: "34px",
                            borderRadius: "8px",
                            border: pageNum === currentServicesPage ? "none" : "1px solid #cbd5e1",
                            background: pageNum === currentServicesPage ? "linear-gradient(135deg, #ef4444, #dc2626)" : "#ffffff",
                            color: pageNum === currentServicesPage ? "#ffffff" : "#334155",
                            fontWeight: "700",
                            fontSize: "0.82rem",
                            cursor: "pointer",
                          }}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>

                    <button
                      disabled={currentServicesPage >= totalServicesPages}
                      onClick={() => setServicesPage((prev) => Math.min(prev + 1, totalServicesPages))}
                      style={{
                        padding: "8px 14px",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                        background: currentServicesPage >= totalServicesPages ? "#f1f5f9" : "#ffffff",
                        color: currentServicesPage >= totalServicesPages ? "#94a3b8" : "#0f172a",
                        cursor: currentServicesPage >= totalServicesPages ? "not-allowed" : "pointer",
                        fontWeight: "600",
                        fontSize: "0.82rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      Next <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: BOOKINGS MANAGER */}
          {activeTab === "bookings" && (
            <div>
              <div style={{ marginBottom: "24px" }}>
                <h2 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>Service Appointments</h2>
                <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                  Manage customer appointments for tyre replacement, wheel alignment, and maintenance services.
                </p>
              </div>

              {filteredBookings.length === 0 ? (
                <div style={{ background: "#ffffff", borderRadius: "16px", padding: "48px", textAlign: "center", border: "1px solid #e2e8f0" }}>
                  <CalendarCheck size={40} style={{ color: "#94a3b8", marginBottom: "12px" }} />
                  <h3 style={{ fontSize: "1.1rem", color: "#0f172a", margin: 0 }}>No Service Appointments Found</h3>
                  <p style={{ color: "#64748b", fontSize: "0.85rem", marginTop: "4px" }}>
                    No customer bookings match your search query.
                  </p>
                </div>
              ) : (
                <div style={{ borderRadius: "20px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)", padding: "24px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {paginatedBookings.map((b, idx) => {
                      const realIndex = bookingsList.indexOf(b);
                      return (
                        <div
                          key={b.id || idx}
                          style={{
                            padding: "20px 24px",
                            borderRadius: "16px",
                            background: "#f8fafc",
                            border: "1px solid #e2e8f0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: "16px",
                            minHeight: "92px",
                            boxSizing: "border-box",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "16px", minWidth: 0, flex: 1 }}>
                            <div style={{ width: "46px", height: "46px", borderRadius: "12px", background: "#fef2f2", border: "1px solid #fecaca", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              <CalendarCheck size={22} />
                            </div>
                            <div style={{ minWidth: 0, flex: 1 }}>
                              <div style={{ fontSize: "1.05rem", fontWeight: "800", color: "#0f172a", lineHeight: 1.25 }}>
                                {b.customerName || "Customer Appointment"}
                              </div>
                              <div style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "4px", lineHeight: 1.3 }}>
                                Vehicle: <strong style={{ color: "#0f172a" }}>{b.carModel || "Standard Sedan"}</strong> • Service: <strong style={{ color: "#ef4444" }}>{b.serviceName || "Wheel Alignment & Tyre Fitting"}</strong>
                              </div>
                              <div style={{ fontSize: "0.78rem", color: "#94a3b8", marginTop: "4px" }}>
                                Requested Date: {b.date || "2026-10-05"} at {b.timeSlot || "11:00 AM"} | Phone: {b.phone || "+91 98765 43210"}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                            <span
                              style={{
                                width: "155px",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "8px 14px",
                                borderRadius: "999px",
                                fontSize: "0.78rem",
                                fontWeight: "800",
                                background: b.status === "Confirmed" ? "#f1f5f9" : "#fef2f2",
                                border: b.status === "Confirmed" ? "1px solid #cbd5e1" : "1px solid #fecaca",
                                color: b.status === "Confirmed" ? "#0f172a" : "#ef4444",
                                textAlign: "center",
                                whiteSpace: "nowrap",
                                boxSizing: "border-box",
                              }}
                            >
                              STATUS: {b.status || "Pending"}
                            </span>
                            <button
                              onClick={() => {
                                const targetIdx = realIndex !== -1 ? realIndex : idx;
                                if (onUpdateBookingStatus) onUpdateBookingStatus(targetIdx, b.status === "Confirmed" ? "Pending" : "Confirmed");
                                triggerToast(`Updated booking status to ${b.status === "Confirmed" ? "Pending" : "Confirmed"}`);
                              }}
                              style={{
                                width: "165px",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "10px 18px",
                                borderRadius: "10px",
                                border: "none",
                                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                                color: "#ffffff",
                                fontWeight: "700",
                                fontSize: "0.82rem",
                                cursor: "pointer",
                                textAlign: "center",
                                whiteSpace: "nowrap",
                                boxSizing: "border-box",
                                boxShadow: "0 4px 10px rgba(239, 68, 68, 0.2)",
                                transition: "all 0.2s ease",
                              }}
                            >
                              Toggle Confirmation
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bookings Pagination Bar */}
                  {filteredBookings.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "20px",
                        paddingTop: "16px",
                        borderTop: "1px solid #e2e8f0",
                        flexWrap: "wrap",
                        gap: "12px",
                      }}
                    >
                      <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: "500" }}>
                        Showing{" "}
                        <strong style={{ color: "#0f172a" }}>
                          {(currentBookingsPage - 1) * BOOKINGS_PER_PAGE + 1}
                        </strong>{" "}
                        to{" "}
                        <strong style={{ color: "#0f172a" }}>
                          {Math.min(currentBookingsPage * BOOKINGS_PER_PAGE, filteredBookings.length)}
                        </strong>{" "}
                        of <strong style={{ color: "#0f172a" }}>{filteredBookings.length}</strong> bookings
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <button
                          disabled={currentBookingsPage <= 1}
                          onClick={() => setBookingsPage((prev) => Math.max(prev - 1, 1))}
                          style={{
                            padding: "8px 14px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                            background: currentBookingsPage <= 1 ? "#f1f5f9" : "#ffffff",
                            color: currentBookingsPage <= 1 ? "#94a3b8" : "#0f172a",
                            cursor: currentBookingsPage <= 1 ? "not-allowed" : "pointer",
                            fontWeight: "600",
                            fontSize: "0.82rem",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <ChevronLeft size={16} /> Previous
                        </button>

                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          {Array.from({ length: totalBookingsPages }, (_, i) => i + 1).map((pageNum) => (
                            <button
                              key={pageNum}
                              onClick={() => setBookingsPage(pageNum)}
                              style={{
                                width: "34px",
                                height: "34px",
                                borderRadius: "8px",
                                border: pageNum === currentBookingsPage ? "none" : "1px solid #cbd5e1",
                                background: pageNum === currentBookingsPage ? "linear-gradient(135deg, #ef4444, #dc2626)" : "#ffffff",
                                color: pageNum === currentBookingsPage ? "#ffffff" : "#334155",
                                fontWeight: "700",
                                fontSize: "0.82rem",
                                cursor: "pointer",
                              }}
                            >
                              {pageNum}
                            </button>
                          ))}
                        </div>

                        <button
                          disabled={currentBookingsPage >= totalBookingsPages}
                          onClick={() => setBookingsPage((prev) => Math.min(prev + 1, totalBookingsPages))}
                          style={{
                            padding: "8px 14px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                            background: currentBookingsPage >= totalBookingsPages ? "#f1f5f9" : "#ffffff",
                            color: currentBookingsPage >= totalBookingsPages ? "#94a3b8" : "#0f172a",
                            cursor: currentBookingsPage >= totalBookingsPages ? "not-allowed" : "pointer",
                            fontWeight: "600",
                            fontSize: "0.82rem",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          Next <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: QUOTES MANAGER */}
          {activeTab === "quotes" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
                <div>
                  <h2 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>Wholesale & Fleet Quote Requests</h2>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                    Review official quote requests submitted by fleet managers and B2B buyers.
                  </p>
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: "700",
                    background: "#f1f5f9",
                    color: "#0f172a",
                    padding: "6px 14px",
                    borderRadius: "999px",
                    border: "1px solid #cbd5e1",
                  }}
                >
                  {filteredQuotes.length} Total Quote Requests
                </div>
              </div>

              {/* Search Bar for Quotes */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 16px",
                  borderRadius: "14px",
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  marginBottom: "16px",
                  boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)",
                  gap: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, position: "relative" }}>
                  <Search size={18} color="#64748b" style={{ flexShrink: 0 }} />
                  <input
                    type="text"
                    placeholder="Search quote requests by tyre model, customer email, or total amount..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: "100%",
                      border: "none",
                      outline: "none",
                      fontSize: "0.88rem",
                      color: "#0f172a",
                      background: "transparent",
                    }}
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm("")}
                      style={{
                        background: "#f1f5f9",
                        border: "none",
                        borderRadius: "50%",
                        width: "22px",
                        height: "22px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#64748b",
                        cursor: "pointer",
                      }}
                      title="Clear search"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>
                {searchTerm && (
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "600", whiteSpace: "nowrap" }}>
                    {filteredQuotes.length} {filteredQuotes.length === 1 ? "quote" : "quotes"} found
                  </div>
                )}
              </div>

              <div style={{ borderRadius: "20px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)", overflow: "hidden" }}>
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                  {paginatedQuotes.length === 0 ? (
                    <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
                      No quote requests found matching your search.
                    </div>
                  ) : (
                    paginatedQuotes.map((q, idx) => (
                      <div key={q.id || idx} style={{ padding: "20px", borderRadius: "16px", background: "#f8fafc", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", transition: "all 0.2s ease" }}>
                        <div>
                          <div style={{ fontWeight: "800", fontSize: "1.05rem", color: "#0f172a" }}>{q.tyreName || "ApexSport Pro 4S"}</div>
                          <div style={{ fontSize: "0.84rem", color: "#64748b", marginTop: "2px" }}>
                            Quantity: <strong style={{ color: "#0f172a" }}>{q.quantity || 4} units</strong> • Customer Email: <span style={{ color: "#ef4444", fontWeight: "600" }}>{q.email || "fleet@logistics.in"}</span>
                          </div>
                        </div>
                        <div style={{ fontWeight: "800", fontSize: "1.2rem", color: "#0f172a" }}>
                          {q.totalFormatted || (q.totalINR ? `₹${Number(q.totalINR).toLocaleString("en-IN")}` : "₹75,600")}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Pagination Bar */}
                {filteredQuotes.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "16px 24px",
                      background: "#ffffff",
                      borderTop: "1px solid #e2e8f0",
                      flexWrap: "wrap",
                      gap: "12px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                      <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: "500" }}>
                        Showing{" "}
                        <strong style={{ color: "#0f172a" }}>
                          {(currentQuotesPage - 1) * QUOTES_PER_PAGE + 1}
                        </strong>{" "}
                        to{" "}
                        <strong style={{ color: "#0f172a" }}>
                          {Math.min(currentQuotesPage * QUOTES_PER_PAGE, filteredQuotes.length)}
                        </strong>{" "}
                        of <strong style={{ color: "#0f172a" }}>{filteredQuotes.length}</strong> quote requests
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "#64748b" }}>
                        <span>Per page:</span>
                        <select
                          value={quotesItemsPerPage}
                          onChange={(e) => setQuotesItemsPerPage(Number(e.target.value))}
                          style={{
                            padding: "4px 8px",
                            borderRadius: "6px",
                            border: "1px solid #cbd5e1",
                            background: "#f8fafc",
                            color: "#0f172a",
                            fontSize: "0.8rem",
                            fontWeight: "600",
                            outline: "none",
                            cursor: "pointer",
                          }}
                        >
                          <option value={3}>3 per page</option>
                          <option value={5}>5 per page</option>
                          <option value={10}>10 per page</option>
                          <option value={20}>20 per page</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <button
                        disabled={currentQuotesPage <= 1}
                        onClick={() => setQuotesPage((prev) => Math.max(prev - 1, 1))}
                        style={{
                          padding: "8px 14px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          background: currentQuotesPage <= 1 ? "#f1f5f9" : "#ffffff",
                          color: currentQuotesPage <= 1 ? "#94a3b8" : "#0f172a",
                          cursor: currentQuotesPage <= 1 ? "not-allowed" : "pointer",
                          fontWeight: "600",
                          fontSize: "0.82rem",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <ChevronLeft size={16} /> Previous
                      </button>

                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        {Array.from({ length: totalQuotesPages }, (_, i) => i + 1).map((pageNum) => (
                          <button
                            key={pageNum}
                            onClick={() => setQuotesPage(pageNum)}
                            style={{
                              width: "34px",
                              height: "34px",
                              borderRadius: "8px",
                              border: pageNum === currentQuotesPage ? "none" : "1px solid #cbd5e1",
                              background: pageNum === currentQuotesPage ? "linear-gradient(135deg, #ef4444, #dc2626)" : "#ffffff",
                              color: pageNum === currentQuotesPage ? "#ffffff" : "#0f172a",
                              fontWeight: "700",
                              fontSize: "0.82rem",
                              cursor: "pointer",
                            }}
                          >
                            {pageNum}
                          </button>
                        ))}
                      </div>

                      <button
                        disabled={currentQuotesPage >= totalQuotesPages}
                        onClick={() => setQuotesPage((prev) => Math.min(prev + 1, totalQuotesPages))}
                        style={{
                          padding: "8px 14px",
                          borderRadius: "8px",
                          border: "1px solid #cbd5e1",
                          background: currentQuotesPage >= totalQuotesPages ? "#f1f5f9" : "#ffffff",
                          color: currentQuotesPage >= totalQuotesPages ? "#94a3b8" : "#0f172a",
                          cursor: currentQuotesPage >= totalQuotesPages ? "not-allowed" : "pointer",
                          fontWeight: "600",
                          fontSize: "0.82rem",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        Next <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: LEADS MANAGER */}
          {activeTab === "leads" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
                <div>
                  <h2 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                    Customer Leads & Inquiries
                  </h2>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                    Manage customer contact form submissions, phone inquiries, and validated contact details.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const blob = new Blob([JSON.stringify(leadsList, null, 2)], { type: "application/json" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `Sadguru_Tyres_Leads_${new Date().toISOString().split("T")[0]}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                    triggerToast("Leads report exported successfully!");
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 18px",
                    borderRadius: "10px",
                    background: "#0f172a",
                    color: "#ffffff",
                    fontSize: "0.85rem",
                    fontWeight: "700",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.15)",
                  }}
                >
                  <Download size={16} /> Export Leads Data
                </button>
              </div>

              {/* Overview Metric Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
                <div style={{ background: "#ffffff", borderRadius: "16px", padding: "18px 20px", border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(15, 23, 42, 0.03)" }}>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Total Recorded Leads</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "900", color: "#0f172a" }}>{leadsList.length}</div>
                </div>

                <div style={{ background: "#ffffff", borderRadius: "16px", padding: "18px 20px", border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(15, 23, 42, 0.03)" }}>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>New (Pending Action)</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "900", color: "#ef4444" }}>
                    {leadsList.filter((l) => l.status === "New").length}
                  </div>
                </div>

                <div style={{ background: "#ffffff", borderRadius: "16px", padding: "18px 20px", border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(15, 23, 42, 0.03)" }}>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Contacted & In Progress</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "900", color: "#3b82f6" }}>
                    {leadsList.filter((l) => l.status === "Contacted").length}
                  </div>
                </div>

                <div style={{ background: "#ffffff", borderRadius: "16px", padding: "18px 20px", border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(15, 23, 42, 0.03)" }}>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>Resolved / Closed</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: "900", color: "#22c55e" }}>
                    {leadsList.filter((l) => l.status === "Closed").length}
                  </div>
                </div>
              </div>

              {/* Filter Tabs */}
              <div style={{ background: "#ffffff", borderRadius: "20px", border: "1px solid #e2e8f0", padding: "24px", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {["all", "New", "Contacted", "Closed"].map((statusKey) => (
                      <button
                        key={statusKey}
                        onClick={() => setLeadsStatusFilter(statusKey)}
                        style={{
                          padding: "8px 16px",
                          borderRadius: "999px",
                          border: "none",
                          background: leadsStatusFilter === statusKey ? "#0f172a" : "#f1f5f9",
                          color: leadsStatusFilter === statusKey ? "#ffffff" : "#475569",
                          fontWeight: "700",
                          fontSize: "0.82rem",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {statusKey === "all" ? `All Leads (${leadsList.length})` : `${statusKey} (${leadsList.filter((l) => l.status === statusKey).length})`}
                      </button>
                    ))}
                  </div>

                  <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: "600" }}>
                    Showing {filteredLeads.length} leads
                  </div>
                </div>

                {/* Leads List Cards */}
                {paginatedLeads.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px 20px", color: "#94a3b8" }}>
                    <Users size={36} style={{ marginBottom: "8px", opacity: 0.5 }} />
                    <p style={{ margin: 0, fontWeight: "600" }}>No customer leads match the selected filter.</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {paginatedLeads.map((lead) => {
                      const isNew = lead.status === "New";
                      const isContacted = lead.status === "Contacted";
                      return (
                        <div
                          key={lead.id}
                          style={{
                            padding: "20px",
                            borderRadius: "16px",
                            background: "#f8fafc",
                            border: "1px solid #e2e8f0",
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                            <div>
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={{ fontWeight: "800", fontSize: "1.05rem", color: "#0f172a" }}>
                                  {lead.name}
                                </span>
                                <span
                                  style={{
                                    fontSize: "0.74rem",
                                    fontWeight: "800",
                                    padding: "3px 10px",
                                    borderRadius: "999px",
                                    background: isNew ? "#fee2e2" : isContacted ? "#dbeafe" : "#dcfce7",
                                    color: isNew ? "#991b1b" : isContacted ? "#1e40af" : "#166534",
                                  }}
                                >
                                  {lead.status}
                                </span>
                              </div>
                              <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "3px" }}>
                                Date Received: {lead.date || lead.created_at?.split("T")[0]}
                              </div>
                            </div>

                            {/* Status Change Selector & Actions */}
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <select
                                value={lead.status}
                                onChange={async (e) => {
                                  const newStat = e.target.value;
                                  if (onUpdateLeadStatus) await onUpdateLeadStatus(lead.id, newStat);
                                  triggerToast(`Lead "${lead.name}" status updated to ${newStat}`);
                                }}
                                style={{
                                  padding: "6px 12px",
                                  borderRadius: "8px",
                                  border: "1px solid #cbd5e1",
                                  fontSize: "0.82rem",
                                  fontWeight: "700",
                                  background: "#ffffff",
                                  color: "#0f172a",
                                  cursor: "pointer",
                                  outline: "none",
                                }}
                              >
                                <option value="New">Status: New</option>
                                <option value="Contacted">Status: Contacted</option>
                                <option value="Closed">Status: Closed</option>
                              </select>

                              <button
                                onClick={async () => {
                                  if (window.confirm(`Delete lead entry for "${lead.name}"?`)) {
                                    if (onDeleteLead) await onDeleteLead(lead.id);
                                    triggerToast(`Deleted lead "${lead.name}"`);
                                  }
                                }}
                                style={{
                                  padding: "6px 10px",
                                  borderRadius: "8px",
                                  border: "1px solid #fca5a5",
                                  background: "#fef2f2",
                                  color: "#ef4444",
                                  cursor: "pointer",
                                  display: "inline-flex",
                                  alignItems: "center",
                                }}
                                title="Delete Lead"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </div>

                          {/* Contact Info Row */}
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", fontSize: "0.86rem" }}>
                            <a
                              href={`tel:${lead.phone}`}
                              style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#ef4444", fontWeight: "700", textDecoration: "none" }}
                            >
                              <Phone size={14} /> {lead.phone}
                            </a>

                            <a
                              href={`mailto:${lead.email}`}
                              style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#3b82f6", fontWeight: "600", textDecoration: "none" }}
                            >
                              <Mail size={14} /> {lead.email}
                            </a>

                            <span style={{ color: "#64748b", fontWeight: "600" }}>
                              Subject: <strong style={{ color: "#0f172a" }}>{lead.subject}</strong>
                            </span>
                          </div>

                          {/* Customer Message */}
                          {lead.message && (
                            <div
                              style={{
                                background: "#ffffff",
                                padding: "12px 14px",
                                borderRadius: "10px",
                                border: "1px solid #e2e8f0",
                                fontSize: "0.86rem",
                                color: "#334155",
                                lineHeight: 1.5,
                              }}
                            >
                              <strong>Customer Message:</strong> "{lead.message}"
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Pagination */}
                {filteredLeads.length > LEADS_PER_PAGE && (
                  <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "20px" }}>
                    <button
                      disabled={currentLeadsPage <= 1}
                      onClick={() => setLeadsPage((prev) => Math.max(prev - 1, 1))}
                      style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#ffffff", cursor: "pointer" }}
                    >
                      Previous
                    </button>
                    <span style={{ fontSize: "0.85rem", padding: "6px 12px", fontWeight: "700" }}>
                      Page {currentLeadsPage} of {totalLeadsPages}
                    </span>
                    <button
                      disabled={currentLeadsPage >= totalLeadsPages}
                      onClick={() => setLeadsPage((prev) => Math.min(prev + 1, totalLeadsPages))}
                      style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#ffffff", cursor: "pointer" }}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: SHOP SETTINGS */}
          {activeTab === "settings" && (
            <div style={{ maxWidth: "1200px" }}>
              {/* Header & Action Bar */}
              <div style={{ marginBottom: "24px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.72rem", fontWeight: "800", background: "#ecfdf5", color: "#059669", padding: "3px 10px", borderRadius: "999px", marginBottom: "6px", border: "1px solid #a7f3d0" }}>
                  <Sparkles size={12} />
                  <span>LIVE WEBSITE CONFIGURATION</span>
                </div>
                <h2 style={{ fontSize: "1.4rem", fontWeight: "900", color: "#0f172a", margin: 0, letterSpacing: "-0.02em" }}>
                  Workshop & Concierge Settings
                </h2>
                <p style={{ fontSize: "0.86rem", color: "#64748b", margin: "4px 0 0 0" }}>
                  Configure workshop hub location, Google Maps directions link, phone hotlines, and operating hours dynamically.
                </p>
              </div>

              {/* Grid: Left = Form, Right = Live Website Preview */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "24px", alignItems: "start" }}>
                
                {/* LEFT: SETTINGS FORM */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  
                  {/* Card 1: Workshop Location & Google Maps */}
                  <div style={{ background: "#ffffff", borderRadius: "20px", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)", padding: "24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px", paddingBottom: "12px", borderBottom: "1px solid #f1f5f9" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#fef2f2", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <MapPin size={18} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: "0.98rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                          Workshop Hub & Location
                        </h3>
                        <p style={{ fontSize: "0.76rem", color: "#64748b", margin: 0 }}>
                          Physical address and Google Maps directions link
                        </p>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                          Workshop Hub Title
                        </label>
                        <input
                          type="text"
                          value={settingsForm.hubName || ""}
                          onChange={(e) => setSettingsForm({ ...settingsForm, hubName: e.target.value })}
                          placeholder="e.g. Main Workshop Hub"
                          style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", fontSize: "0.88rem", outline: "none" }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                          Store Business Name
                        </label>
                        <input
                          type="text"
                          value={settingsForm.storeName || ""}
                          onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                          placeholder="e.g. Sadguru Tyres & Alignment Center"
                          style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", fontSize: "0.88rem", outline: "none" }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                          Full Workshop Address (Displayed on Contact Page)
                        </label>
                        <textarea
                          rows={2}
                          value={settingsForm.address || ""}
                          onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                          placeholder="Full street address, landmark, city, state, pin"
                          style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", fontSize: "0.88rem", outline: "none", resize: "vertical", fontFamily: "inherit" }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                          Short Footer Address
                        </label>
                        <input
                          type="text"
                          value={settingsForm.shortAddress || ""}
                          onChange={(e) => setSettingsForm({ ...settingsForm, shortAddress: e.target.value })}
                          placeholder="e.g. Near Bus Stand, Main Road, Pune, Maharashtra 411001"
                          style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", fontSize: "0.88rem", outline: "none" }}
                        />
                      </div>

                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                          <label style={{ fontSize: "0.78rem", fontWeight: "700", color: "#334155" }}>
                            Google Maps Directions URL
                          </label>
                          {settingsForm.googleMapsUrl && (
                            <a
                              href={settingsForm.googleMapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ fontSize: "0.74rem", color: "#ef4444", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "3px", textDecoration: "none" }}
                            >
                              Test Link <ExternalLink size={11} />
                            </a>
                          )}
                        </div>
                        <input
                          type="url"
                          value={settingsForm.googleMapsUrl || ""}
                          onChange={(e) => setSettingsForm({ ...settingsForm, googleMapsUrl: e.target.value })}
                          placeholder="https://maps.app.goo.gl/..."
                          style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", fontSize: "0.88rem", outline: "none" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Phone Hotlines & Support */}
                  <div style={{ background: "#ffffff", borderRadius: "20px", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)", padding: "24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px", paddingBottom: "12px", borderBottom: "1px solid #f1f5f9" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#eff6ff", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Phone size={18} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: "0.98rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                          Phone Hotlines & Customer Care
                        </h3>
                        <p style={{ fontSize: "0.76rem", color: "#64748b", margin: 0 }}>
                          Toll-free helpline and direct workshop telephone lines
                        </p>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                          Toll-Free Helpline (Navbar & Hero Pills)
                        </label>
                        <input
                          type="text"
                          value={settingsForm.tollFreePhone || ""}
                          onChange={(e) => setSettingsForm({ ...settingsForm, tollFreePhone: e.target.value })}
                          placeholder="e.g. 1800 15 11 00"
                          style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", fontSize: "0.88rem", outline: "none" }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                          Direct Telephone Lines
                        </label>
                        <input
                          type="text"
                          value={settingsForm.directPhone || ""}
                          onChange={(e) => setSettingsForm({ ...settingsForm, directPhone: e.target.value })}
                          placeholder="e.g. +91 98220 12345 / 020 2543 8899"
                          style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", fontSize: "0.88rem", outline: "none" }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                          Customer Support Email
                        </label>
                        <input
                          type="email"
                          value={settingsForm.email || ""}
                          onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                          placeholder="e.g. care@sadgurutyres.com"
                          style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", fontSize: "0.88rem", outline: "none" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Operating Hours */}
                  <div style={{ background: "#ffffff", borderRadius: "20px", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)", padding: "24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px", paddingBottom: "12px", borderBottom: "1px solid #f1f5f9" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#fef3c7", color: "#d97706", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Clock size={18} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: "0.98rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                          Workshop Operating Schedule
                        </h3>
                        <p style={{ fontSize: "0.76rem", color: "#64748b", margin: 0 }}>
                          Opening and closing hours displayed to visiting motorists
                        </p>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                          Weekday Timings (Monday – Saturday)
                        </label>
                        <input
                          type="text"
                          value={settingsForm.weekdayHours || ""}
                          onChange={(e) => setSettingsForm({ ...settingsForm, weekdayHours: e.target.value })}
                          placeholder="e.g. Mon - Sat: 9:00 AM - 8:30 PM"
                          style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", fontSize: "0.88rem", outline: "none" }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                          Sunday / Weekend Timings
                        </label>
                        <input
                          type="text"
                          value={settingsForm.sundayHours || ""}
                          onChange={(e) => setSettingsForm({ ...settingsForm, sundayHours: e.target.value })}
                          placeholder="e.g. Sun: 10:00 AM - 4:00 PM (Open 7 Days)"
                          style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", fontSize: "0.88rem", outline: "none" }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                          Express Service Turnaround Tagline
                        </label>
                        <input
                          type="text"
                          value={settingsForm.expressTurnaround || ""}
                          onChange={(e) => setSettingsForm({ ...settingsForm, expressTurnaround: e.target.value })}
                          placeholder="e.g. Express 30-minute fitment & alignment."
                          style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", fontSize: "0.88rem", outline: "none" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save Settings Action Row */}
                  <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      onClick={handleResetStoreSettings}
                      style={{
                        padding: "14px 20px",
                        borderRadius: "14px",
                        background: "#ffffff",
                        border: "1px solid #cbd5e1",
                        color: "#475569",
                        fontWeight: "700",
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                      title="Reset to factory defaults"
                    >
                      <RotateCcw size={15} />
                      <span>Reset Defaults</span>
                    </button>

                    <button
                      type="button"
                      disabled={isSavingSettings}
                      onClick={handleSaveStoreSettings}
                      style={{
                        flex: 1,
                        padding: "14px 24px",
                        borderRadius: "14px",
                        background: "linear-gradient(135deg, #ef4444, #dc2626)",
                        border: "none",
                        color: "#ffffff",
                        fontWeight: "800",
                        fontSize: "0.95rem",
                        cursor: isSavingSettings ? "not-allowed" : "pointer",
                        boxShadow: "0 6px 20px rgba(239, 68, 68, 0.35)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        minWidth: "220px",
                      }}
                    >
                      <CheckCircle2 size={18} />
                      <span>{isSavingSettings ? "Saving Changes..." : "Save Store Settings"}</span>
                    </button>
                  </div>
                </div>

                {/* RIGHT: LIVE REAL-TIME WEBSITE PREVIEW */}
                <div style={{ position: "sticky", top: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ background: "#0f172a", borderRadius: "18px", padding: "14px 18px", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Eye size={16} color="#38bdf8" />
                      <span style={{ fontSize: "0.84rem", fontWeight: "800" }}>Live Website Preview</span>
                    </div>
                    <span style={{ fontSize: "0.72rem", background: "rgba(56, 189, 248, 0.15)", color: "#38bdf8", padding: "3px 8px", borderRadius: "999px", fontWeight: "700" }}>
                      Updates as you type
                    </span>
                  </div>

                  {/* PREVIEW CARD: WORKSHOP & CONCIERGE INFO (Exact match to website card) */}
                  <div
                    style={{
                      background: "#ffffff",
                      borderRadius: "24px",
                      padding: "28px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <h3 style={{ fontSize: "1.15rem", fontWeight: "900", color: "#0f172a", margin: 0 }}>
                        Workshop & Concierge Info
                      </h3>
                      <span style={{ fontSize: "0.68rem", fontWeight: "800", color: "#059669", background: "#ecfdf5", padding: "2px 8px", borderRadius: "999px", border: "1px solid #a7f3d0" }}>
                        ● OPEN
                      </span>
                    </div>

                    {/* Hub & Address */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                      <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "#fef2f2", border: "1px solid #fecaca", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <MapPin size={20} />
                      </div>
                      <div>
                        <div style={{ fontWeight: "800", fontSize: "0.95rem", color: "#0f172a" }}>
                          {settingsForm.hubName || "Main Workshop Hub"}
                        </div>
                        <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "2px", lineHeight: 1.5 }}>
                          {settingsForm.address || "Sadguru Tyres & Alignment Center, Main Highway Junction, Pune, Maharashtra 411001"}
                        </div>
                        <a
                          href={settingsForm.googleMapsUrl || "https://maps.app.goo.gl/j9kVxiwCqT5APoYL8"}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "0.8rem",
                            color: "#ef4444",
                            fontWeight: "700",
                            marginTop: "8px",
                            textDecoration: "none",
                          }}
                        >
                          Open Directions on Google Maps <ExternalLink size={13} />
                        </a>
                      </div>
                    </div>

                    {/* Phone Hotlines */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                      <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "#fef2f2", border: "1px solid #fecaca", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Phone size={20} />
                      </div>
                      <div>
                        <div style={{ fontWeight: "800", fontSize: "0.95rem", color: "#0f172a" }}>Phone Hotlines</div>
                        <div style={{ fontSize: "0.85rem", color: "#334155", marginTop: "2px", fontWeight: "600" }}>
                          Toll-Free: {settingsForm.tollFreePhone || "1800 15 11 00"}
                        </div>
                        <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "2px" }}>
                          Direct: {settingsForm.directPhone || "+91 98220 12345 / 020 2543 8899"}
                        </div>
                      </div>
                    </div>

                    {/* Workshop Hours */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                      <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "#fef2f2", border: "1px solid #fecaca", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Clock size={20} />
                      </div>
                      <div>
                        <div style={{ fontWeight: "800", fontSize: "0.95rem", color: "#0f172a" }}>Workshop Hours</div>
                        <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "2px" }}>
                          {settingsForm.weekdayHours || "Mon - Sat: 9:00 AM - 8:30 PM"}
                        </div>
                        <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
                          {settingsForm.sundayHours || "Sun: 10:00 AM - 4:00 PM (Open 7 Days)"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PREVIEW CARD: FOOTER CONCIERGE PREVIEW */}
                  <div style={{ background: "#ffffff", borderRadius: "18px", padding: "20px", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)" }}>
                    <div style={{ fontSize: "0.78rem", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px" }}>
                      Footer Concierge Snippet Preview
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.84rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#0f172a", fontWeight: "700" }}>
                        <Phone size={14} color="#ef4444" />
                        <span>+91 {settingsForm.tollFreePhone || "1800 15 11 00"}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#475569" }}>
                        <Mail size={14} color="#0f172a" />
                        <span>{settingsForm.email || "care@sadgurutyres.com"}</span>
                      </div>
                      <div style={{ color: "#64748b", fontSize: "0.78rem", marginTop: "4px" }}>
                        📍 {settingsForm.shortAddress || "Near Bus Stand, Main Road, Pune, Maharashtra 411001"}
                      </div>
                      <div style={{ color: "#94a3b8", fontSize: "0.74rem" }}>
                        {settingsForm.weekdayHours || "Mon – Sat: 9 AM – 8 PM"} | {settingsForm.sundayHours || "Sun: 10 AM - 4 PM"}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ==================== MODULE: FAQ MANAGER ==================== */}
          {activeTab === "faqs" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
                <div>
                  <h2 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>Frequently Asked Questions (FAQ) Manager</h2>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                    Create, edit, and organize FAQs displayed on the Contact Us and Services website pages.
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: "700",
                      background: (faqsList || []).length >= 5 ? "#fef2f2" : "#f1f5f9",
                      color: (faqsList || []).length >= 5 ? "#ef4444" : "#475569",
                      padding: "6px 12px",
                      borderRadius: "999px",
                      border: (faqsList || []).length >= 5 ? "1px solid #fecaca" : "1px solid #cbd5e1",
                    }}
                  >
                    {(faqsList || []).length} / 5 FAQs {(faqsList || []).length >= 5 ? "(Limit Reached)" : "Max"}
                  </div>
                  <button
                    onClick={handleOpenAddFaqModal}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 20px",
                      borderRadius: "12px",
                      background: (faqsList || []).length >= 5 ? "#94a3b8" : "linear-gradient(135deg, #ef4444, #dc2626)",
                      border: "none",
                      color: "#ffffff",
                      fontWeight: "700",
                      fontSize: "0.88rem",
                      cursor: (faqsList || []).length >= 5 ? "not-allowed" : "pointer",
                      opacity: (faqsList || []).length >= 5 ? 0.8 : 1,
                    }}
                  >
                    <Plus size={16} />
                    <span>Add New FAQ</span>
                  </button>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
                {["all", "Services & Workshop", "Tyres & Warranty", "Orders & Quotes", "General"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFaqCategoryFilter(cat)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "10px",
                      border: "1px solid #cbd5e1",
                      background: faqCategoryFilter === cat ? "#0f172a" : "#ffffff",
                      color: faqCategoryFilter === cat ? "#ffffff" : "#475569",
                      fontWeight: "700",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                  >
                    {cat === "all" ? "All Categories" : cat}
                  </button>
                ))}
              </div>

              {/* FAQs Cards List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {(faqsList || []).filter((f) => faqCategoryFilter === "all" || f.category === faqCategoryFilter).length === 0 ? (
                  <div style={{ padding: "40px", borderRadius: "20px", background: "#ffffff", border: "1px solid #e2e8f0", textAlign: "center", color: "#64748b" }}>
                    No FAQs found in this category. Click "Add New FAQ" to create one.
                  </div>
                ) : (
                  (faqsList || [])
                    .filter((f) => faqCategoryFilter === "all" || f.category === faqCategoryFilter)
                    .map((faq) => (
                      <div
                        key={faq.id}
                        style={{
                          padding: "20px 24px",
                          borderRadius: "18px",
                          background: "#ffffff",
                          border: "1px solid #e2e8f0",
                          boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{ padding: "3px 10px", borderRadius: "999px", background: "#f1f5f9", color: "#475569", fontWeight: "700", fontSize: "0.74rem" }}>
                              {faq.category || "General"}
                            </span>
                            <span style={{ padding: "3px 10px", borderRadius: "999px", background: faq.status === "Active" ? "#f1f5f9" : "#fef2f2", color: faq.status === "Active" ? "#0f172a" : "#ef4444", border: faq.status === "Active" ? "1px solid #cbd5e1" : "1px solid #fecaca", fontWeight: "700", fontSize: "0.74rem" }}>
                              {faq.status || "Active"}
                            </span>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <button
                              onClick={() => handleOpenEditFaqModal(faq)}
                              style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#ffffff", color: "#0f172a", fontSize: "0.78rem", fontWeight: "700", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}
                            >
                              <Edit size={14} /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteFaqItem(faq.id, faq.question)}
                              style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid #fecaca", background: "#fef2f2", color: "#ef4444", fontSize: "0.78rem", fontWeight: "700", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        </div>

                        <div style={{ fontWeight: "800", fontSize: "1.05rem", color: "#0f172a" }}>
                          Q: {faq.question}
                        </div>

                        <div style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.6, background: "#f8fafc", padding: "14px", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
                          A: {faq.answer}
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ==================== MODALS ==================== */}

      {/* ADD / EDIT SUB-ADMIN MODAL */}
      {showAddSubadminModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              padding: "24px",
              maxWidth: "420px",
              width: "100%",
              boxShadow: "0 25px 50px rgba(15, 23, 42, 0.25)",
              border: "1px solid #e2e8f0",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                {editingSubadmin ? `Edit Sub-Admin "${editingSubadmin.name}"` : "Create Sub-Admin Account"}
              </h3>
              <button onClick={() => setShowAddSubadminModal(false)} style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer", padding: "4px" }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveSubadminForm} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Full Name */}
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kulkarni"
                  value={subadminForm.name}
                  onChange={(e) => {
                    setSubadminForm({ ...subadminForm, name: e.target.value });
                    if (subadminFormErrors.name) setSubadminFormErrors({ ...subadminFormErrors, name: null });
                  }}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: subadminFormErrors.name ? "1.5px solid #ef4444" : "1px solid #cbd5e1",
                    background: subadminFormErrors.name ? "#fff5f5" : "#ffffff",
                    fontSize: "0.88rem",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                {subadminFormErrors.name && (
                  <div style={{ color: "#ef4444", fontSize: "0.76rem", fontWeight: "600", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                    <AlertCircle size={13} /> {subadminFormErrors.name}
                  </div>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="ramesh.k@sadgurutyres.com"
                  value={subadminForm.email}
                  onChange={(e) => {
                    setSubadminForm({ ...subadminForm, email: e.target.value });
                    if (subadminFormErrors.email) setSubadminFormErrors({ ...subadminFormErrors, email: null });
                  }}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: subadminFormErrors.email ? "1.5px solid #ef4444" : "1px solid #cbd5e1",
                    background: subadminFormErrors.email ? "#fff5f5" : "#ffffff",
                    fontSize: "0.88rem",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                {subadminFormErrors.email && (
                  <div style={{ color: "#ef4444", fontSize: "0.76rem", fontWeight: "600", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                    <AlertCircle size={13} /> {subadminFormErrors.email}
                  </div>
                )}
              </div>

              {/* Access Password with Eye Toggle */}
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                  {editingSubadmin ? "Access Password (Optional - leave blank to keep existing)" : "Access Password *"}
                </label>
                <div style={{ position: "relative" }}>
                  <Lock size={16} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                  <input
                    type={showSubadminPassword ? "text" : "password"}
                    placeholder={editingSubadmin ? "Enter new password (min. 6 characters)" : "Create login password (min. 6 characters)"}
                    value={subadminForm.password}
                    onChange={(e) => {
                      setSubadminForm({ ...subadminForm, password: e.target.value });
                      if (subadminFormErrors.password) setSubadminFormErrors({ ...subadminFormErrors, password: null });
                    }}
                    style={{
                      width: "100%",
                      padding: "10px 38px 10px 36px",
                      borderRadius: "10px",
                      border: subadminFormErrors.password ? "1.5px solid #ef4444" : "1px solid #cbd5e1",
                      background: subadminFormErrors.password ? "#fff5f5" : "#ffffff",
                      fontSize: "0.88rem",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSubadminPassword(!showSubadminPassword)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "transparent",
                      border: "none",
                      color: "#94a3b8",
                      cursor: "pointer",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                    }}
                    title={showSubadminPassword ? "Hide password" : "Show password"}
                  >
                    {showSubadminPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {subadminFormErrors.password && (
                  <div style={{ color: "#ef4444", fontSize: "0.76rem", fontWeight: "600", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                    <AlertCircle size={13} /> {subadminFormErrors.password}
                  </div>
                )}
              </div>

              {/* Role & Phone */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Assigned Role</label>
                  <select
                    value={subadminForm.role}
                    onChange={(e) => setSubadminForm({ ...subadminForm, role: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem", background: "#ffffff", outline: "none", boxSizing: "border-box" }}
                  >
                    <option value="Inventory Manager">Inventory Manager</option>
                    <option value="Service Operations Lead">Service Operations Lead</option>
                    <option value="Billing & Audit Executive">Billing & Audit Executive</option>
                    <option value="Support Executive">Support Executive</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91 98220 12345"
                    value={subadminForm.phone}
                    onChange={(e) => setSubadminForm({ ...subadminForm, phone: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              {/* Permissions */}
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "8px" }}>
                  Module Permissions *
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  {[
                    { id: "inventory_read", label: "View Inventory" },
                    { id: "inventory_write", label: "Manage Inventory" },
                    { id: "bookings_manage", label: "Manage Bookings" },
                    { id: "quotes_manage", label: "Manage Quotes" },
                    { id: "analytics_view", label: "View Analytics" },
                    { id: "brands_manage", label: "Manage Brands" },
                  ].map((p) => (
                    <label key={p.id} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", color: "#334155", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={subadminForm.permissions.includes(p.id)}
                        onChange={() => {
                          togglePermission(p.id);
                          if (subadminFormErrors.permissions) setSubadminFormErrors({ ...subadminFormErrors, permissions: null });
                        }}
                        style={{ accentColor: "#ef4444" }}
                      />
                      <span>{p.label}</span>
                    </label>
                  ))}
                </div>
                {subadminFormErrors.permissions && (
                  <div style={{ color: "#ef4444", fontSize: "0.76rem", fontWeight: "600", marginTop: "6px", display: "flex", alignItems: "center", gap: "4px" }}>
                    <AlertCircle size={13} /> {subadminFormErrors.permissions}
                  </div>
                )}
              </div>

              {/* Modal Buttons */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setShowAddSubadminModal(false)}
                  style={{ padding: "10px 18px", borderRadius: "10px", border: "1px solid #cbd5e1", background: "#ffffff", color: "#475569", fontWeight: "700", fontSize: "0.85rem", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "10px 22px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #ef4444, #dc2626)", color: "#ffffff", fontWeight: "700", fontSize: "0.85rem", cursor: "pointer", boxShadow: "0 4px 12px rgba(239, 68, 68, 0.25)" }}
                >
                  Save Sub-Admin Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SIMULATE TEST ERROR MODAL */}
      {showSimulateErrorModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "24px",
              padding: "32px",
              maxWidth: "500px",
              width: "100%",
              boxShadow: "0 25px 50px rgba(15, 23, 42, 0.25)",
              border: "1px solid #e2e8f0",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                Simulate System Test Error
              </h3>
              <button onClick={() => setShowSimulateErrorModal(false)} style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSimulateErrorSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Severity Level</label>
                <select
                  value={simulatedErrorForm.severity}
                  onChange={(e) => setSimulatedErrorForm({ ...simulatedErrorForm, severity: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem", background: "#ffffff", outline: "none" }}
                >
                  <option value="Critical">Critical 🔴</option>
                  <option value="Warning">Warning 🟡</option>
                  <option value="Info">Info 🔵</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Module Name</label>
                <input
                  type="text"
                  required
                  value={simulatedErrorForm.module}
                  onChange={(e) => setSimulatedErrorForm({ ...simulatedErrorForm, module: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Error Message Description</label>
                <textarea
                  required
                  rows={3}
                  value={simulatedErrorForm.message}
                  onChange={(e) => setSimulatedErrorForm({ ...simulatedErrorForm, message: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem", outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setShowSimulateErrorModal(false)}
                  style={{ padding: "10px 18px", borderRadius: "10px", border: "1px solid #cbd5e1", background: "#ffffff", color: "#475569", fontWeight: "700", fontSize: "0.85rem", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "10px 22px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #ef4444, #dc2626)", color: "#ffffff", fontWeight: "700", fontSize: "0.85rem", cursor: "pointer" }}
                >
                  Trigger Error Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD / EDIT TYRE MODAL */}
      {showAddTyreModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(6px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            className="hide-scrollbar"
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "24px",
              padding: "32px",
              maxWidth: "680px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px rgba(15, 23, 42, 0.25)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                {editingTyre ? "Edit Tyre Details" : "Add New Tyre Product"}
              </h3>
              <button onClick={() => setShowAddTyreModal(false)} style={{ background: "#f1f5f9", border: "none", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", cursor: "pointer" }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveTyreForm} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Product Images Upload Section - 3 Images */}
              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#334155", marginBottom: "10px" }}>
                  Product Images (Upload up to 3) *
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                  {/* Image 1 (Primary) */}
                  <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "14px", border: "1px dashed #cbd5e1", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: "700", color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.05em" }}>Image 1 (Primary)</span>
                    <div style={{ width: "72px", height: "72px", borderRadius: "10px", background: "#ffffff", border: "1px solid #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      {tyreForm.image ? (
                        <img src={tyreForm.image} alt="Preview 1" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                      ) : (
                        <Upload size={22} style={{ color: "#94a3b8" }} />
                      )}
                    </div>
                    <label htmlFor="tyre-upload-1" style={{ padding: "6px 12px", borderRadius: "8px", background: "linear-gradient(135deg, #ef4444, #dc2626)", color: "#ffffff", fontSize: "0.72rem", fontWeight: "700", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <Upload size={12} /> Upload
                    </label>
                    <input id="tyre-upload-1" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => {
                      const file = e.target.files && e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (evt) => {
                          const img = new Image();
                          img.onload = () => {
                            const canvas = document.createElement("canvas");
                            const maxDim = 500; let w = img.width; let h = img.height;
                            if (w > h) { if (w > maxDim) { h = Math.round((h * maxDim) / w); w = maxDim; } }
                            else { if (h > maxDim) { w = Math.round((w * maxDim) / h); h = maxDim; } }
                            canvas.width = w; canvas.height = h;
                            canvas.getContext("2d").drawImage(img, 0, 0, w, h);
                            setTyreForm((prev) => ({ ...prev, image: canvas.toDataURL("image/jpeg", 0.85) }));
                          };
                          img.src = evt.target.result;
                        };
                        reader.readAsDataURL(file);
                      }
                    }} />
                    <input type="text" value={tyreForm.image} onChange={(e) => setTyreForm({ ...tyreForm, image: e.target.value })} placeholder="Or paste URL"
                      style={{ width: "100%", padding: "6px 8px", borderRadius: "8px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#0f172a", fontSize: "0.72rem", outline: "none" }} />
                  </div>

                  {/* Image 2 (Optional) */}
                  <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "14px", border: "1px dashed #cbd5e1", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: "700", color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.05em" }}>Image 2 (Optional)</span>
                    <div style={{ width: "72px", height: "72px", borderRadius: "10px", background: "#ffffff", border: "1px solid #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      {tyreForm.image2 ? (
                        <img src={tyreForm.image2} alt="Preview 2" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                      ) : (
                        <Upload size={22} style={{ color: "#94a3b8" }} />
                      )}
                    </div>
                    <label htmlFor="tyre-upload-2" style={{ padding: "6px 12px", borderRadius: "8px", background: "linear-gradient(135deg, #ef4444, #dc2626)", color: "#ffffff", fontSize: "0.72rem", fontWeight: "700", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <Upload size={12} /> Upload
                    </label>
                    <input id="tyre-upload-2" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => {
                      const file = e.target.files && e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (evt) => {
                          const img = new Image();
                          img.onload = () => {
                            const canvas = document.createElement("canvas");
                            const maxDim = 500; let w = img.width; let h = img.height;
                            if (w > h) { if (w > maxDim) { h = Math.round((h * maxDim) / w); w = maxDim; } }
                            else { if (h > maxDim) { w = Math.round((w * maxDim) / h); h = maxDim; } }
                            canvas.width = w; canvas.height = h;
                            canvas.getContext("2d").drawImage(img, 0, 0, w, h);
                            setTyreForm((prev) => ({ ...prev, image2: canvas.toDataURL("image/jpeg", 0.85) }));
                          };
                          img.src = evt.target.result;
                        };
                        reader.readAsDataURL(file);
                      }
                    }} />
                    <input type="text" value={tyreForm.image2} onChange={(e) => setTyreForm({ ...tyreForm, image2: e.target.value })} placeholder="Or paste URL"
                      style={{ width: "100%", padding: "6px 8px", borderRadius: "8px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#0f172a", fontSize: "0.72rem", outline: "none" }} />
                  </div>

                  {/* Image 3 (Optional) */}
                  <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "14px", border: "1px dashed #cbd5e1", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: "700", color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.05em" }}>Image 3 (Optional)</span>
                    <div style={{ width: "72px", height: "72px", borderRadius: "10px", background: "#ffffff", border: "1px solid #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      {tyreForm.image3 ? (
                        <img src={tyreForm.image3} alt="Preview 3" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                      ) : (
                        <Upload size={22} style={{ color: "#94a3b8" }} />
                      )}
                    </div>
                    <label htmlFor="tyre-upload-3" style={{ padding: "6px 12px", borderRadius: "8px", background: "linear-gradient(135deg, #ef4444, #dc2626)", color: "#ffffff", fontSize: "0.72rem", fontWeight: "700", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <Upload size={12} /> Upload
                    </label>
                    <input id="tyre-upload-3" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => {
                      const file = e.target.files && e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (evt) => {
                          const img = new Image();
                          img.onload = () => {
                            const canvas = document.createElement("canvas");
                            const maxDim = 500; let w = img.width; let h = img.height;
                            if (w > h) { if (w > maxDim) { h = Math.round((h * maxDim) / w); w = maxDim; } }
                            else { if (h > maxDim) { w = Math.round((w * maxDim) / h); h = maxDim; } }
                            canvas.width = w; canvas.height = h;
                            canvas.getContext("2d").drawImage(img, 0, 0, w, h);
                            setTyreForm((prev) => ({ ...prev, image3: canvas.toDataURL("image/jpeg", 0.85) }));
                          };
                          img.src = evt.target.result;
                        };
                        reader.readAsDataURL(file);
                      }
                    }} />
                    <input type="text" value={tyreForm.image3} onChange={(e) => setTyreForm({ ...tyreForm, image3: e.target.value })} placeholder="Or paste URL"
                      style={{ width: "100%", padding: "6px 8px", borderRadius: "8px", background: "#ffffff", border: "1px solid #cbd5e1", color: "#0f172a", fontSize: "0.72rem", outline: "none" }} />
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Tyre Model Name *</label>
                  <input
                    type="text"
                    required
                    value={tyreForm.name}
                    onChange={(e) => setTyreForm({ ...tyreForm, name: e.target.value })}
                    placeholder="e.g. ApexSport Pro 4S"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", outline: "none" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Brand Name</label>
                  <input
                    type="text"
                    value={tyreForm.brand}
                    onChange={(e) => setTyreForm({ ...tyreForm, brand: e.target.value })}
                    placeholder="e.g. Sadguru Apex, Yokohama, Michelin"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", outline: "none" }}
                  />
                </div>
              </div>

              {/* Vehicle Type, Tyre Category, and Performance Level Dropdowns */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Vehicle Category</label>
                  <select
                    value={tyreForm.vehicleType}
                    onChange={(e) => setTyreForm({ ...tyreForm, vehicleType: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", outline: "none", fontWeight: "600" }}
                  >
                    <option value="Cars">Cars</option>
                    <option value="SUVs">SUVs</option>
                    <option value="Luxury Sedans">Luxury Sedans</option>
                    <option value="EVs">EVs (Electric)</option>
                    <option value="Commercial/Trucks">Commercial / Trucks</option>
                    <option value="Off-Road 4x4">Off-Road 4x4</option>
                    <option value="Performance/Sports">Performance / Sports</option>
                    <option value="Bikes">Bikes / Two-Wheelers</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Tyre Type / Season</label>
                  <select
                    value={tyreForm.tyreType}
                    onChange={(e) => setTyreForm({ ...tyreForm, tyreType: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", outline: "none", fontWeight: "600" }}
                  >
                    <option value="All-Season">All-Season</option>
                    <option value="Summer Sport">Summer Sport</option>
                    <option value="Winter/Snow">Winter / Snow</option>
                    <option value="All-Terrain">All-Terrain</option>
                    <option value="Highway Terrain">Highway Terrain</option>
                    <option value="Mud-Terrain">Mud-Terrain</option>
                    <option value="Run-Flat RFT">Run-Flat RFT</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Performance Grade</label>
                  <select
                    value={tyreForm.performanceLevel}
                    onChange={(e) => setTyreForm({ ...tyreForm, performanceLevel: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", outline: "none", fontWeight: "600" }}
                  >
                    <option value="Ultra-High Performance">Ultra-High Performance</option>
                    <option value="High Performance">High Performance</option>
                    <option value="Grand Touring">Grand Touring</option>
                    <option value="Eco/Efficiency">Eco / Efficiency</option>
                    <option value="All-Terrain">All-Terrain</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Price (INR ₹)</label>
                  <input
                    type="number"
                    value={tyreForm.priceINR}
                    onChange={(e) => setTyreForm({ ...tyreForm, priceINR: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", outline: "none" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Price (USD $)</label>
                  <input
                    type="number"
                    value={tyreForm.priceUSD}
                    onChange={(e) => setTyreForm({ ...tyreForm, priceUSD: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", outline: "none" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Stock Quantity</label>
                  <input
                    type="number"
                    value={tyreForm.stock}
                    onChange={(e) => setTyreForm({ ...tyreForm, stock: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", outline: "none" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Width (mm)</label>
                  <input
                    type="text"
                    value={tyreForm.width}
                    onChange={(e) => setTyreForm({ ...tyreForm, width: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", outline: "none" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Aspect Ratio</label>
                  <input
                    type="text"
                    value={tyreForm.profile}
                    onChange={(e) => setTyreForm({ ...tyreForm, profile: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", outline: "none" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Rim Size (inches)</label>
                  <input
                    type="text"
                    value={tyreForm.rimSize}
                    onChange={(e) => setTyreForm({ ...tyreForm, rimSize: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", outline: "none" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Product Badge / Highlight Tag</label>
                <input
                  type="text"
                  value={tyreForm.badge}
                  onChange={(e) => setTyreForm({ ...tyreForm, badge: e.target.value })}
                  placeholder="e.g. Track Master, Bestseller, Eco Choice"
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Product Description / Tagline</label>
                <textarea
                  rows={2}
                  value={tyreForm.tagline}
                  onChange={(e) => setTyreForm({ ...tyreForm, tagline: e.target.value })}
                  placeholder="e.g. Engineered with proprietary compound matrix for ultimate dry and wet grip."
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", outline: "none", resize: "vertical", fontFamily: "inherit" }}
                />
              </div>

              {/* Show on Home Screen Toggle */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "#f8fafc", borderRadius: "12px", border: "1px solid #cbd5e1" }}>
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "#0f172a" }}>Show on Home Screen</div>
                  <div style={{ fontSize: "0.74rem", color: "#64748b" }}>Feature this tyre in the Flagship Performance Tyres section on the homepage.</div>
                </div>
                <label style={{ position: "relative", display: "inline-block", width: "44px", height: "24px", cursor: "pointer", flexShrink: 0 }}>
                  <input
                    type="checkbox"
                    checked={tyreForm.showOnHome !== false}
                    onChange={(e) => setTyreForm({ ...tyreForm, showOnHome: e.target.checked })}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      cursor: "pointer",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: tyreForm.showOnHome !== false ? "#ef4444" : "#cbd5e1",
                      transition: ".3s",
                      borderRadius: "24px",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        content: '""',
                        height: "18px",
                        width: "18px",
                        left: tyreForm.showOnHome !== false ? "22px" : "3px",
                        bottom: "3px",
                        backgroundColor: "white",
                        transition: ".3s",
                        borderRadius: "50%",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                      }}
                    />
                  </span>
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setShowAddTyreModal(false)}
                  style={{ padding: "10px 20px", borderRadius: "10px", border: "1px solid #cbd5e1", background: "#ffffff", color: "#475569", fontWeight: "600", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "10px 24px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #ef4444, #dc2626)", color: "#ffffff", fontWeight: "700", cursor: "pointer" }}
                >
                  {editingTyre ? "Save Product Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRODUCT DETAILS POPUP MODAL */}
      {selectedDetailTyre && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.55)",
            backdropFilter: "blur(6px)",
            zIndex: 1050,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setSelectedDetailTyre(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#ffffff",
              borderRadius: "24px",
              maxWidth: "680px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 25px 60px rgba(15, 23, 42, 0.25)",
              border: "1px solid #e2e8f0",
              padding: "28px",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px", borderBottom: "1px solid #f1f5f9", paddingBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {selectedDetailTyre.brand || "Sadguru"}
                    </span>
                    {selectedDetailTyre.badge && (
                      <span
                        style={{
                          padding: "2px 10px",
                          borderRadius: "999px",
                          background: "#fef2f2",
                          border: "1px solid #fecaca",
                          color: "#ef4444",
                          fontWeight: "800",
                          fontSize: "0.72rem",
                        }}
                      >
                        {selectedDetailTyre.badge}
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: "1.35rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                    {selectedDetailTyre.name}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedDetailTyre(null)}
                style={{
                  background: "#f1f5f9",
                  border: "none",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#64748b",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#e2e8f0";
                  e.currentTarget.style.color = "#0f172a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#f1f5f9";
                  e.currentTarget.style.color = "#64748b";
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Top Product Hero Showcase */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                gap: "20px",
                padding: "16px",
                background: "#f8fafc",
                borderRadius: "18px",
                border: "1px solid #e2e8f0",
                marginBottom: "20px",
                alignItems: "center",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <img
                  src={selectedDetailTyre.image || DEFAULT_TYRE_IMAGE}
                  alt={selectedDetailTyre.name}
                  style={{
                    width: "140px",
                    height: "140px",
                    objectFit: "contain",
                    borderRadius: "14px",
                    background: "#ffffff",
                    border: "1px solid #cbd5e1",
                    padding: "8px",
                  }}
                />
              </div>
              <div>
                <div style={{ fontSize: "0.85rem", color: "#475569", lineHeight: "1.5", marginBottom: "12px" }}>
                  {selectedDetailTyre.tagline ||
                    selectedDetailTyre.description ||
                    "Premium tyre engineered for superior road adhesion, responsive cornering, and reduced braking distances."}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  <span style={{ padding: "4px 10px", borderRadius: "8px", background: "#ffffff", border: "1px solid #cbd5e1", fontSize: "0.78rem", fontWeight: "600", color: "#334155" }}>
                    🚗 {selectedDetailTyre.vehicleType || "Cars"}
                  </span>
                  <span style={{ padding: "4px 10px", borderRadius: "8px", background: "#ffffff", border: "1px solid #cbd5e1", fontSize: "0.78rem", fontWeight: "600", color: "#334155" }}>
                    🏷️ {selectedDetailTyre.category || "Passenger Tyre"}
                  </span>
                  <span style={{ padding: "4px 10px", borderRadius: "8px", background: "#ffffff", border: "1px solid #cbd5e1", fontSize: "0.78rem", fontWeight: "600", color: "#334155" }}>
                    ⚡ {selectedDetailTyre.performanceLevel || selectedDetailTyre.tyreType || "High Performance"}
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Core Specifications Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "14px", marginBottom: "20px" }}>
              {/* Size Specification */}
              <div style={{ padding: "14px 16px", borderRadius: "14px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 2px 6px rgba(15, 23, 42, 0.03)" }}>
                <div style={{ fontSize: "0.74rem", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "4px" }}>
                  Size Specification
                </div>
                <div style={{ fontSize: "1.25rem", fontWeight: "800", color: "#0f172a" }}>
                  {selectedDetailTyre.width || "—"}/{selectedDetailTyre.profile || "—"} R{selectedDetailTyre.rimSize || "—"}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "2px" }}>
                  Width: {selectedDetailTyre.width || "—"}mm • Ratio: {selectedDetailTyre.profile || "—"} • Rim: {selectedDetailTyre.rimSize || "—"}"
                </div>
              </div>

              {/* Price */}
              <div style={{ padding: "14px 16px", borderRadius: "14px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 2px 6px rgba(15, 23, 42, 0.03)" }}>
                <div style={{ fontSize: "0.74rem", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "4px" }}>
                  Price (INR & USD)
                </div>
                <div style={{ fontSize: "1.25rem", fontWeight: "800", color: "#ef4444" }}>
                  ₹{(selectedDetailTyre.priceINR || 12000).toLocaleString("en-IN")}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "2px" }}>
                  {selectedDetailTyre.priceUSD ? `Approx. $${selectedDetailTyre.priceUSD} USD` : "All inclusive store pricing"}
                </div>
              </div>

              {/* Stock Quantity */}
              <div style={{ padding: "14px 16px", borderRadius: "14px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 2px 6px rgba(15, 23, 42, 0.03)" }}>
                <div style={{ fontSize: "0.74rem", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "4px" }}>
                  Inventory Stock
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "1.25rem", fontWeight: "800", color: "#0f172a" }}>
                    {selectedDetailTyre.stock ?? 45} Units
                  </span>
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: "6px",
                      fontSize: "0.7rem",
                      fontWeight: "700",
                      background: (selectedDetailTyre.stock ?? 45) > 10 ? "#ecfdf5" : (selectedDetailTyre.stock ?? 45) > 0 ? "#fffbeb" : "#fef2f2",
                      color: (selectedDetailTyre.stock ?? 45) > 10 ? "#059669" : (selectedDetailTyre.stock ?? 45) > 0 ? "#d97706" : "#dc2626",
                      border: (selectedDetailTyre.stock ?? 45) > 10 ? "1px solid #a7f3d0" : (selectedDetailTyre.stock ?? 45) > 0 ? "1px solid #fde68a" : "1px solid #fecaca",
                    }}
                  >
                    {(selectedDetailTyre.stock ?? 45) > 10 ? "In Stock" : (selectedDetailTyre.stock ?? 45) > 0 ? "Low Stock" : "Out of Stock"}
                  </span>
                </div>
                <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "2px" }}>
                  Available in Sadguru physical store
                </div>
              </div>

              {/* Badge & Home Visibility */}
              <div style={{ padding: "14px 16px", borderRadius: "14px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 2px 6px rgba(15, 23, 42, 0.03)" }}>
                <div style={{ fontSize: "0.74rem", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "4px" }}>
                  Product Badge & Showcase
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "999px",
                      background: "#fef2f2",
                      border: "1px solid #fecaca",
                      color: "#ef4444",
                      fontWeight: "800",
                      fontSize: "0.78rem",
                    }}
                  >
                    {selectedDetailTyre.badge || "Featured"}
                  </span>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "999px",
                      background: (selectedDetailTyre.showOnHome !== false && selectedDetailTyre.show_on_home !== false) ? "#f0fdf4" : "#f8fafc",
                      border: (selectedDetailTyre.showOnHome !== false && selectedDetailTyre.show_on_home !== false) ? "1px solid #86efac" : "1px solid #cbd5e1",
                      color: (selectedDetailTyre.showOnHome !== false && selectedDetailTyre.show_on_home !== false) ? "#15803d" : "#64748b",
                      fontWeight: "700",
                      fontSize: "0.76rem",
                    }}
                  >
                    {(selectedDetailTyre.showOnHome !== false && selectedDetailTyre.show_on_home !== false) ? "✓ Home Flagship" : "Hidden"}
                  </span>
                </div>
                <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "4px" }}>
                  Rating: ⭐ {selectedDetailTyre.rating || 4.8} / 5.0
                </div>
              </div>
            </div>

            {/* Technical Specs Breakdown (if available) */}
            {selectedDetailTyre.specs && (
              <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "14px", border: "1px solid #e2e8f0", marginBottom: "20px" }}>
                <div style={{ fontSize: "0.78rem", fontWeight: "800", color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "10px" }}>
                  Technical Parameters & Ratings
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", fontSize: "0.8rem" }}>
                  {selectedDetailTyre.specs.wetGrip && (
                    <div style={{ background: "#ffffff", padding: "8px 12px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                      <span style={{ color: "#64748b", fontSize: "0.72rem", display: "block" }}>Wet Grip</span>
                      <strong style={{ color: "#0f172a" }}>{selectedDetailTyre.specs.wetGrip}</strong>
                    </div>
                  )}
                  {selectedDetailTyre.specs.fuelEfficiency && (
                    <div style={{ background: "#ffffff", padding: "8px 12px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                      <span style={{ color: "#64748b", fontSize: "0.72rem", display: "block" }}>Fuel Efficiency</span>
                      <strong style={{ color: "#0f172a" }}>{selectedDetailTyre.specs.fuelEfficiency}</strong>
                    </div>
                  )}
                  {selectedDetailTyre.specs.noiseLevel && (
                    <div style={{ background: "#ffffff", padding: "8px 12px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                      <span style={{ color: "#64748b", fontSize: "0.72rem", display: "block" }}>Noise Level</span>
                      <strong style={{ color: "#0f172a" }}>{selectedDetailTyre.specs.noiseLevel}</strong>
                    </div>
                  )}
                  {selectedDetailTyre.specs.speedRating && (
                    <div style={{ background: "#ffffff", padding: "8px 12px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                      <span style={{ color: "#64748b", fontSize: "0.72rem", display: "block" }}>Speed Rating</span>
                      <strong style={{ color: "#0f172a" }}>{selectedDetailTyre.specs.speedRating}</strong>
                    </div>
                  )}
                  {selectedDetailTyre.specs.warranty && (
                    <div style={{ background: "#ffffff", padding: "8px 12px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                      <span style={{ color: "#64748b", fontSize: "0.72rem", display: "block" }}>Warranty</span>
                      <strong style={{ color: "#0f172a" }}>{selectedDetailTyre.specs.warranty}</strong>
                    </div>
                  )}
                  {selectedDetailTyre.specs.treadwear && (
                    <div style={{ background: "#ffffff", padding: "8px 12px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                      <span style={{ color: "#64748b", fontSize: "0.72rem", display: "block" }}>Treadwear</span>
                      <strong style={{ color: "#0f172a" }}>{selectedDetailTyre.specs.treadwear}</strong>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Modal Footer Actions */}
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "12px", borderTop: "1px solid #f1f5f9", paddingTop: "16px" }}>
              <button
                type="button"
                onClick={() => setSelectedDetailTyre(null)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                  background: "#ffffff",
                  color: "#475569",
                  fontWeight: "700",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const targetTyre = selectedDetailTyre;
                  setSelectedDetailTyre(null);
                  handleOpenEditModal(targetTyre);
                }}
                style={{
                  padding: "10px 22px",
                  borderRadius: "10px",
                  border: "none",
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  color: "#ffffff",
                  fontWeight: "700",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: "0 4px 12px rgba(239, 68, 68, 0.25)",
                }}
              >
                <Edit size={15} />
                Edit Tyre Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT BRAND MODAL */}
      {showAddBrandModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(4px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "24px",
              padding: "32px",
              maxWidth: "480px",
              width: "100%",
              boxShadow: "0 20px 50px rgba(15, 23, 42, 0.2)",
              border: "1px solid #e2e8f0",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                {editingBrand ? `Edit Brand "${editingBrand.name}"` : "Add New Partner Brand"}
              </h3>
              <button onClick={() => setShowAddBrandModal(false)} style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveBrandForm} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Brand Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Michelin, Pirelli, Dunlop"
                  value={brandForm.name}
                  onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                  Brand Logo Image *
                </label>

                {brandForm.logo ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 14px",
                      borderRadius: "14px",
                      background: "#f8fafc",
                      border: "1px solid #cbd5e1",
                    }}
                  >
                    <img
                      src={brandForm.logo}
                      alt="Brand Logo Preview"
                      style={{
                        width: "52px",
                        height: "52px",
                        objectFit: "contain",
                        borderRadius: "10px",
                        background: "#ffffff",
                        border: "1px solid #e2e8f0",
                        padding: "4px",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "0.82rem", fontWeight: "700", color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {brandForm.logo.startsWith("data:") ? "Uploaded Image File" : brandForm.logo}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#10b981", fontWeight: "600", marginTop: "2px" }}>
                        ✓ Image Selected
                      </div>
                    </div>
                    <label
                      htmlFor="brand-logo-file-picker"
                      style={{
                        padding: "8px 14px",
                        borderRadius: "8px",
                        background: "#ef4444",
                        color: "#ffffff",
                        fontSize: "0.78rem",
                        fontWeight: "700",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <Upload size={14} />
                      Upload New
                    </label>
                  </div>
                ) : (
                  <label
                    htmlFor="brand-logo-file-picker"
                    style={{
                      border: "2px dashed #cbd5e1",
                      borderRadius: "14px",
                      padding: "24px 16px",
                      textAlign: "center",
                      cursor: "pointer",
                      background: "#f8fafc",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "8px",
                      transition: "all 0.2s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = "#ef4444";
                      e.currentTarget.style.background = "#fef2f2";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = "#cbd5e1";
                      e.currentTarget.style.background = "#f8fafc";
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        background: "#fee2e2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ef4444",
                      }}
                    >
                      <Upload size={20} />
                    </div>
                    <span style={{ fontSize: "0.88rem", fontWeight: "700", color: "#0f172a" }}>
                      Click to Upload Brand Logo Image
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                      PNG, JPG, WEBP, SVG supported
                    </span>
                  </label>
                )}

                <input
                  id="brand-logo-file-picker"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files && e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const rawData = event.target?.result;
                        if (rawData) {
                          const img = new Image();
                          img.onload = () => {
                            const canvas = document.createElement("canvas");
                            const maxDim = 400;
                            let w = img.width;
                            let h = img.height;
                            if (w > h) {
                              if (w > maxDim) {
                                h = Math.round((h * maxDim) / w);
                                w = maxDim;
                              }
                            } else {
                              if (h > maxDim) {
                                w = Math.round((w * maxDim) / h);
                                h = maxDim;
                              }
                            }
                            canvas.width = w;
                            canvas.height = h;
                            const ctx = canvas.getContext("2d");
                            ctx.drawImage(img, 0, 0, w, h);
                            const mimeType = file.type === "image/png" ? "image/png" : "image/jpeg";
                            const compressedDataUrl = canvas.toDataURL(mimeType, 0.85);
                            setBrandForm((prev) => ({ ...prev, logo: compressedDataUrl }));
                          };
                          img.src = rawData;
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Tagline / Subtitle</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. World Class Performance & Innovation"
                  value={brandForm.tagline}
                  onChange={(e) => setBrandForm({ ...brandForm, tagline: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem", outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setShowAddBrandModal(false)}
                  style={{ padding: "10px 18px", borderRadius: "10px", border: "1px solid #cbd5e1", background: "#ffffff", color: "#475569", fontWeight: "700", fontSize: "0.85rem", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "10px 22px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #ef4444, #dc2626)", color: "#ffffff", fontWeight: "700", fontSize: "0.85rem", cursor: "pointer" }}
                >
                  Save Brand
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD / EDIT FAQ MODAL */}
      {showAddFaqModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "24px",
              padding: "32px",
              maxWidth: "540px",
              width: "100%",
              boxShadow: "0 25px 50px rgba(15, 23, 42, 0.25)",
              border: "1px solid #e2e8f0",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                {editingFaq ? "Edit FAQ Entry" : "Create New FAQ"}
              </h3>
              <button onClick={() => setShowAddFaqModal(false)} style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveFaqForm} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Question *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How often should I get 3D Wheel Alignment done?"
                  value={faqForm.question}
                  onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Answer Details *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Provide a clear, detailed answer for customers..."
                  value={faqForm.answer}
                  onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem", outline: "none" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Category</label>
                  <select
                    value={faqForm.category}
                    onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem", background: "#ffffff", outline: "none" }}
                  >
                    <option value="Services & Workshop">Services & Workshop</option>
                    <option value="Tyres & Warranty">Tyres & Warranty</option>
                    <option value="Orders & Quotes">Orders & Quotes</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Display Status</label>
                  <select
                    value={faqForm.status}
                    onChange={(e) => setFaqForm({ ...faqForm, status: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem", background: "#ffffff", outline: "none" }}
                  >
                    <option value="Active">Active (Visible)</option>
                    <option value="Hidden">Hidden (Draft)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setShowAddFaqModal(false)}
                  style={{ padding: "10px 18px", borderRadius: "10px", border: "1px solid #cbd5e1", background: "#ffffff", color: "#475569", fontWeight: "700", fontSize: "0.85rem", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "10px 22px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #ef4444, #dc2626)", color: "#ffffff", fontWeight: "700", fontSize: "0.85rem", cursor: "pointer" }}
                >
                  Save FAQ Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== ADD / EDIT SERVICE MODAL ==================== */}
      {showAddServiceModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
          <div style={{ background: "#ffffff", borderRadius: "20px", width: "100%", maxWidth: "560px", boxShadow: "0 20px 40px rgba(15, 23, 42, 0.2)", overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", background: "#0f172a", color: "#ffffff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff" }}>
                  <Wrench size={18} />
                </div>
                <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "800", color: "#ffffff" }}>
                  {editingService ? "Edit Workshop Service" : "Add New Workshop Service"}
                </h3>
              </div>
              <button
                onClick={() => setShowAddServiceModal(false)}
                style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveServiceForm} style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3D Laser Wheel Alignment & Balancing"
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.9rem", outline: "none" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                    Category
                  </label>
                  <select
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.9rem", outline: "none", background: "#ffffff" }}
                  >
                    <option value="Tyre Care">Tyre Care</option>
                    <option value="Fitting & Mounting">Fitting & Mounting</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Repair & Inspection">Repair & Inspection</option>
                    <option value="Chassis & Brakes">Chassis & Brakes</option>
                    <option value="General Maintenance">General Maintenance</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                    Price Text *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="From ₹1,800"
                    value={serviceForm.price}
                    onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.9rem", outline: "none" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                    Estimated Duration
                  </label>
                  <input
                    type="text"
                    placeholder="45 Mins"
                    value={serviceForm.duration}
                    onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.9rem", outline: "none" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                    Availability Status
                  </label>
                  <select
                    value={serviceForm.status}
                    onChange={(e) => setServiceForm({ ...serviceForm, status: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.9rem", outline: "none", background: "#ffffff" }}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                  Detailed Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Computerized 3D laser alignment and precision wheel weight balancing for smooth driving..."
                  value={serviceForm.shortDesc}
                  onChange={(e) => setServiceForm({ ...serviceForm, shortDesc: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem", outline: "none", fontFamily: "inherit" }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    background: "#f8fafc",
                    border: "1px solid #cbd5e1",
                    cursor: "pointer",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "0.86rem", fontWeight: "700", color: "#0f172a", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>Show on Home Screen</span>
                      <span style={{ fontSize: "0.72rem", background: "#ecfdf5", color: "#059669", padding: "2px 8px", borderRadius: "999px", border: "1px solid #a7f3d0" }}>Max 3 Allowed</span>
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "2px" }}>
                      Feature this service in the Specialized Services section on the website homepage.
                    </div>
                  </div>
                  <div style={{ position: "relative", width: "44px", height: "24px" }}>
                    <input
                      type="checkbox"
                      checked={Boolean(serviceForm.showOnHome ?? serviceForm.show_on_home)}
                      onChange={(e) => {
                        const willBeChecked = e.target.checked;
                        if (willBeChecked) {
                          const activeHomeCount = (servicesList || []).filter(
                            (s) => (!editingService || s.id !== editingService.id) && Boolean(s.showOnHome ?? s.show_on_home)
                          ).length;
                          if (activeHomeCount >= 3) {
                            triggerToast("⚠️ Maximum 3 services can be displayed on the Home page. Please hide another service first.");
                            return;
                          }
                        }
                        setServiceForm({ ...serviceForm, showOnHome: willBeChecked, show_on_home: willBeChecked });
                      }}
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        cursor: "pointer",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: Boolean(serviceForm.showOnHome ?? serviceForm.show_on_home) ? "#ef4444" : "#cbd5e1",
                        transition: "0.3s",
                        borderRadius: "24px",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          height: "18px",
                          width: "18px",
                          left: Boolean(serviceForm.showOnHome ?? serviceForm.show_on_home) ? "22px" : "3px",
                          bottom: "3px",
                          backgroundColor: "white",
                          transition: "0.3s",
                          borderRadius: "50%",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                        }}
                      />
                    </div>
                  </div>
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "8px" }}>
                <button
                  type="button"
                  onClick={() => setShowAddServiceModal(false)}
                  style={{ padding: "10px 18px", borderRadius: "10px", border: "1px solid #0f172a", background: "#ffffff", color: "#0f172a", fontWeight: "700", fontSize: "0.85rem", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "10px 22px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #ef4444, #dc2626)", color: "#ffffff", fontWeight: "700", fontSize: "0.85rem", cursor: "pointer" }}
                >
                  {editingService ? "Update Service" : "Save Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



      {/* ==================== PRIME FEATURE UNLOCK MODAL ==================== */}
      {showPrimeUnlockModal && selectedPrimeFeatureForUnlock && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10005,
            background: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "24px",
              width: "100%",
              maxWidth: "520px",
              boxShadow: "0 25px 60px rgba(15, 23, 42, 0.3)",
              overflow: "hidden",
              border: "1px solid #e2e8f0",
              maxHeight: "92vh",
              overflowY: "auto",
            }}
          >
            {/* Modal Top Banner */}
            <div
              style={{
                padding: "24px 26px",
                background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                color: "#ffffff",
                position: "relative",
              }}
            >
              <button
                onClick={() => {
                  if (!isProcessingPayment) setShowPrimeUnlockModal(false);
                }}
                disabled={isProcessingPayment}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  background: "rgba(255,255,255,0.1)",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  cursor: isProcessingPayment ? "not-allowed" : "pointer",
                }}
              >
                <X size={18} />
              </button>

              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "999px", background: "rgba(251, 191, 36, 0.15)", border: "1px solid rgba(251, 191, 36, 0.35)", color: "#fef08a", fontSize: "0.72rem", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px" }}>
                <Sparkles size={13} />
                <span>PREMIUM SUITE UNLOCK</span>
              </div>

              <h3 style={{ margin: "0 0 6px 0", fontSize: "1.3rem", fontWeight: "900", color: "#ffffff", letterSpacing: "-0.02em" }}>
                Unlock {selectedPrimeFeatureForUnlock.name}
              </h3>
              <p style={{ margin: 0, fontSize: "0.83rem", color: "#94a3b8", lineHeight: 1.4 }}>
                {selectedPrimeFeatureForUnlock.tagline || selectedPrimeFeatureForUnlock.subtitle || "Enterprise grade pro capabilities for Sadguru Tyres management."}
              </p>
            </div>

            {/* Price & Plan Selection */}
            <div style={{ padding: "24px 26px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                {/* Single Module Plan */}
                <div
                  onClick={() => setSelectedPrimePlan("single")}
                  style={{
                    padding: "14px 16px",
                    borderRadius: "14px",
                    border: selectedPrimePlan === "single" ? "2px solid #1e3a8a" : "1px solid #cbd5e1",
                    background: selectedPrimePlan === "single" ? "#eff6ff" : "#f8fafc",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div style={{ fontSize: "0.72rem", fontWeight: "800", color: selectedPrimePlan === "single" ? "#1e3a8a" : "#64748b", textTransform: "uppercase" }}>
                    THIS MODULE ONLY
                  </div>
                  <div style={{ fontSize: "1.35rem", fontWeight: "900", color: "#0f172a", marginTop: "4px" }}>
                    ₹{Number(selectedPrimeFeatureForUnlock.priceINR || 2000).toLocaleString("en-IN")}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#64748b" }}>One-time lifetime fee</div>
                </div>

                {/* All Bundle Plan */}
                <div
                  onClick={() => setSelectedPrimePlan("bundle")}
                  style={{
                    padding: "14px 16px",
                    borderRadius: "14px",
                    border: selectedPrimePlan === "bundle" ? "2px solid #1e3a8a" : "1px solid #cbd5e1",
                    background: selectedPrimePlan === "bundle" ? "#eff6ff" : "#f8fafc",
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span style={{ position: "absolute", top: "-8px", right: "10px", background: "#1e3a8a", color: "#ffffff", fontSize: "0.64rem", fontWeight: "800", padding: "2px 6px", borderRadius: "999px" }}>
                    BEST VALUE
                  </span>
                  <div style={{ fontSize: "0.72rem", fontWeight: "800", color: selectedPrimePlan === "bundle" ? "#1e3a8a" : "#64748b", textTransform: "uppercase" }}>
                    ALL 5 PRIME APPS
                  </div>
                  <div style={{ fontSize: "1.35rem", fontWeight: "900", color: "#0f172a", marginTop: "4px" }}>
                    ₹9,000
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#64748b" }}>All modules included</div>
                </div>
              </div>

              {/* Benefits Checklist */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                {(selectedPrimePlan === "bundle"
                  ? [
                      "Full access to Business & Sales Analytics dashboard",
                      "24/7 Automated AI Chatbot Support & query resolver",
                      "Real-time Server Error Monitoring & diagnostics",
                      "Coupon Management & discount campaign creator",
                      "WhatsApp Marketing Broadcast Engine & lead engagement",
                    ]
                  : selectedPrimeFeatureForUnlock.benefits || [
                      "Lifetime unlock with zero recurring subscriptions",
                      "Instant activation with verified Razorpay payment receipt",
                      "Full administrative control and audit tracking",
                    ]
                ).map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#ecfdf5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                      <Check size={12} />
                    </div>
                    <span style={{ fontSize: "0.82rem", color: "#334155" }}>{b}</span>
                  </div>
                ))}
              </div>

              {/* Security Badge */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontSize: "0.75rem", color: "#64748b", marginBottom: "20px" }}>
                <ShieldCheck size={16} color="#059669" />
                <span>100% Secure Checkout via UPI, Cards & NetBanking</span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={() => setShowPrimeUnlockModal(false)}
                  style={{
                    flex: 1,
                    padding: "11px 16px",
                    borderRadius: "12px",
                    border: "1px solid #cbd5e1",
                    background: "#ffffff",
                    color: "#475569",
                    fontWeight: "700",
                    fontSize: "0.85rem",
                    cursor: isProcessingPayment ? "not-allowed" : "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={() => handleInitiatePrimeRazorpayPayment(selectedPrimeFeatureForUnlock, selectedPrimePlan)}
                  style={{
                    flex: 2,
                    padding: "11px 20px",
                    borderRadius: "12px",
                    border: "none",
                    background: "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)",
                    color: "#ffffff",
                    fontWeight: "800",
                    fontSize: "0.9rem",
                    cursor: isProcessingPayment ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    boxShadow: "0 4px 15px rgba(30, 58, 138, 0.35)",
                  }}
                >
                  <Lock size={15} />
                  <span>
                    {isProcessingPayment ? "Connecting Razorpay..." : `Pay ₹${selectedPrimePlan === "bundle" ? "9,000" : Number(selectedPrimeFeatureForUnlock.priceINR || 2000).toLocaleString("en-IN")} & Unlock`}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== PRIME PAYMENT SUCCESS CELEBRATION MODAL ==================== */}
      {showPrimePaymentSuccessModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10006,
            background: "rgba(15, 23, 42, 0.65)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "24px",
              width: "100%",
              maxWidth: "460px",
              boxShadow: "0 25px 60px rgba(15, 23, 42, 0.3)",
              overflow: "hidden",
              border: "1px solid #e2e8f0",
              textAlign: "center",
              padding: "32px 28px",
            }}
          >
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#ecfdf5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px auto", border: "4px solid #d1fae5" }}>
              <CheckCircle2 size={36} />
            </div>

            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "3px 10px", borderRadius: "999px", background: "#ecfdf5", color: "#059669", fontSize: "0.72rem", fontWeight: "800", textTransform: "uppercase", marginBottom: "8px" }}>
              <Sparkles size={13} />
              <span>PAYMENT CONFIRMED</span>
            </div>

            <h3 style={{ margin: "0 0 6px 0", fontSize: "1.35rem", fontWeight: "900", color: "#0f172a" }}>
              Prime Feature Unlocked!
            </h3>
            <p style={{ margin: "0 0 20px 0", fontSize: "0.84rem", color: "#64748b" }}>
              Your Razorpay transaction was verified successfully. The requested feature is now ready to use.
            </p>

            <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "14px", border: "1px solid #e2e8f0", textAlign: "left", display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px", fontSize: "0.8rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Unlocked:</span>
                <strong style={{ color: "#0f172a" }}>{primePaymentReceipt?.feature || "Prime Feature"}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Payment ID:</span>
                <span style={{ color: "#ef4444", fontWeight: "700", fontFamily: "monospace" }}>{primePaymentReceipt?.paymentId || "pay_verified"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Amount:</span>
                <strong style={{ color: "#0f172a" }}>₹{Number(primePaymentReceipt?.amount || 2000).toLocaleString("en-IN")} INR</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Status:</span>
                <span style={{ color: "#059669", fontWeight: "800" }}>● Captured & Verified</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                onClick={() => {
                  setShowPrimePaymentSuccessModal(false);
                  if (primePaymentReceipt?.featureKey && primePaymentReceipt?.featureKey !== "all") {
                    setActiveTab(primePaymentReceipt.featureKey);
                  } else {
                    setActiveTab("products");
                  }
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  border: "none",
                  color: "#ffffff",
                  fontWeight: "800",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
              >
                Launch Feature Workspace &rarr;
              </button>
              <button
                onClick={() => setShowPrimePaymentSuccessModal(false)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  background: "transparent",
                  border: "1px solid #cbd5e1",
                  color: "#475569",
                  fontWeight: "700",
                  fontSize: "0.84rem",
                  cursor: "pointer",
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== ADD COUPON MODAL ==================== */}
      {showAddCouponModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10003,
            background: "rgba(15, 23, 42, 0.5)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              padding: "24px",
              maxWidth: "440px",
              width: "100%",
              boxShadow: "0 25px 50px rgba(15, 23, 42, 0.25)",
              border: "1px solid #e2e8f0",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>Create Promo Coupon</h3>
              <button onClick={() => setShowAddCouponModal(false)} style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer", padding: "4px" }}>
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!couponForm.code.trim()) return;
                const newCoupon = {
                  id: `cpn-${Date.now()}`,
                  code: couponForm.code.toUpperCase().replace(/\s+/g, ""),
                  type: couponForm.type,
                  value: Number(couponForm.value) || 10,
                  minSpend: Number(couponForm.minSpend) || 0,
                  maxDiscount: Number(couponForm.maxDiscount) || 500,
                  expiry: couponForm.expiry || "2026-12-31",
                  uses: 0,
                  status: couponForm.status || "Active",
                };
                setCouponsList([newCoupon, ...couponsList]);
                setShowAddCouponModal(false);
                triggerToast(`Created coupon code "${newCoupon.code}"!`);
              }}
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MONSOON25"
                  value={couponForm.code}
                  onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.9rem", outline: "none", textTransform: "uppercase", fontWeight: "700" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>Discount Type</label>
                  <select
                    value={couponForm.type}
                    onChange={(e) => setCouponForm({ ...couponForm, type: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.85rem", outline: "none" }}
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>Discount Value *</label>
                  <input
                    type="number"
                    required
                    placeholder={couponForm.type === "percentage" ? "e.g. 15" : "e.g. 500"}
                    value={couponForm.value}
                    onChange={(e) => setCouponForm({ ...couponForm, value: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.85rem", outline: "none" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>Min Cart Value (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 2000"
                    value={couponForm.minSpend}
                    onChange={(e) => setCouponForm({ ...couponForm, minSpend: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.85rem", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>Max Cap (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 1000"
                    value={couponForm.maxDiscount}
                    onChange={(e) => setCouponForm({ ...couponForm, maxDiscount: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.85rem", outline: "none" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>Expiry Date</label>
                <input
                  type="date"
                  value={couponForm.expiry}
                  onChange={(e) => setCouponForm({ ...couponForm, expiry: e.target.value })}
                  style={{ width: "100%", padding: "10px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.85rem", outline: "none" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "6px" }}>
                <button
                  type="button"
                  onClick={() => setShowAddCouponModal(false)}
                  style={{ padding: "9px 16px", borderRadius: "10px", border: "1px solid #cbd5e1", background: "#ffffff", color: "#475569", fontWeight: "700", fontSize: "0.85rem", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "9px 20px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #ef4444, #dc2626)", color: "#ffffff", fontWeight: "700", fontSize: "0.85rem", cursor: "pointer" }}
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {notificationMsg && (
        <div
          style={{
            position: "fixed",
            bottom: "28px",
            right: "28px",
            background: "#ffffff",
            border: "1px solid #ef4444",
            color: "#0f172a",
            padding: "14px 20px",
            borderRadius: "14px",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)",
            zIndex: 1100,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: "600",
            fontSize: "0.88rem",
          }}
        >
          <CheckCircle2 size={18} color="#ef4444" />
          <span>{notificationMsg}</span>
        </div>
      )}
    </div>
  );
}
