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
  Trash2,
  Edit,
  X,
  Check,
  Eye,
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
}) {
  const mainContentRef = useRef(null);

  const [activeTab, setActiveTab] = useState(() => {
    try {
      const hashRaw = window.location.hash.toLowerCase();
      const hash = hashRaw.replace("#admin/", "").replace("#admin", "").replace("#", "");
      const validTabs = [
        "dashboard",
        "analytics",
        "inventory",
        "brands",
        "services",
        "bookings",
        "quotes",
        "leads",
        "chatbot",
        "subadmins",
        "error-monitoring",
        "faqs",
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
  });
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState("all");
  const [serviceStatusFilter, setServiceStatusFilter] = useState("all");

  const handleOpenAddServiceModal = () => {
    setEditingService(null);
    setServiceForm({
      title: "",
      shortDesc: "",
      price: "",
      duration: "30 Mins",
      category: "Tyre Care",
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80",
      status: "Active",
    });
    setShowAddServiceModal(true);
  };

  const handleOpenEditServiceModal = (service) => {
    setEditingService(service);
    setServiceForm({
      ...service,
      title: service.title || "",
      shortDesc: service.shortDesc || "",
      price: service.price || "",
      duration: service.duration || "30 Mins",
      category: service.category || "Tyre Care",
      image: service.image || "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80",
      status: service.status || "Active",
    });
    setShowAddServiceModal(true);
  };

  const handleSaveServiceForm = async (e) => {
    e.preventDefault();
    if (!serviceForm.title) return;

    if (editingService) {
      if (onUpdateService) await onUpdateService({ ...editingService, ...serviceForm });
      triggerToast(`Updated service "${serviceForm.title}"`);
    } else {
      const newService = {
        id: `srv-${Date.now()}`,
        ...serviceForm,
      };
      if (onAddService) await onAddService(newService);
      triggerToast(`Added new service "${serviceForm.title}"`);
    }
    setShowAddServiceModal(false);
  };

  const handleDeleteServiceItem = async (id, name) => {
    if (onDeleteService) await onDeleteService(id);
    triggerToast(`Deleted service "${name}"`);
  };

  const handleToggleServiceStatus = async (service) => {
    const newStatus = service.status === "Active" ? "Inactive" : "Active";
    const updated = { ...service, status: newStatus };
    if (onUpdateService) await onUpdateService(updated);
    triggerToast(`Set "${service.title}" status to ${newStatus}`);
  };

  // Form State for Adding / Editing Tyre
  const [showAddTyreModal, setShowAddTyreModal] = useState(false);
  const [editingTyre, setEditingTyre] = useState(null);
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
  const [subadminsList, setSubadminsList] = useState([]);
  const [auditLogsList, setAuditLogsList] = useState([]);
  const [showAddSubadminModal, setShowAddSubadminModal] = useState(false);
  const [editingSubadmin, setEditingSubadmin] = useState(null);
  const [subadminForm, setSubadminForm] = useState({
    name: "",
    email: "",
    role: "Inventory Manager",
    phone: "+91 98000 00000",
    permissions: ["inventory_read", "inventory_write"],
  });

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
      if (onUpdateFaq) await onUpdateFaq(editingFaq.id, faqForm);
      triggerToast(`Updated FAQ entry`);
    } else {
      if ((faqsList || []).length >= 5) {
        triggerToast("⚠️ FAQ Limit Reached! Maximum 5 FAQs allowed.");
        setShowAddFaqModal(false);
        return;
      }
      if (onAddFaq) await onAddFaq(faqForm);
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
      tagline: tyre.tagline || "Engineered for maximum grip and safety.",
    });
    setShowAddTyreModal(true);
  };

  const handleSaveTyreForm = (e) => {
    e.preventDefault();
    if (!tyreForm.name) return;

    if (!tyreForm.image) {
      triggerToast("Please upload at least one image (Primary Image).");
      return;
    }

    if (editingTyre) {
      onUpdateTyre({
        ...editingTyre,
        ...tyreForm,
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
    setSubadminForm({
      name: "",
      email: "",
      role: "Inventory Manager",
      phone: "+91 98000 00000",
      permissions: ["inventory_read", "inventory_write"],
    });
    setShowAddSubadminModal(true);
  };

  const handleOpenEditSubadmin = (subadmin) => {
    setEditingSubadmin(subadmin);
    setSubadminForm({
      name: subadmin.name,
      email: subadmin.email,
      role: subadmin.role || "Support Executive",
      phone: subadmin.phone || "+91 98000 00000",
      permissions: subadmin.permissions || ["bookings_manage"],
    });
    setShowAddSubadminModal(true);
  };

  const handleSaveSubadminForm = async (e) => {
    e.preventDefault();
    if (!subadminForm.name || !subadminForm.email) return;

    if (editingSubadmin) {
      const res = await apiService.updateSubadmin(editingSubadmin.id, subadminForm);
      if (res && res.success) {
        setSubadminsList((prev) =>
          prev.map((s) => (s.id === editingSubadmin.id ? res.data : s))
        );
        if (res.auditLogs) setAuditLogsList(res.auditLogs);
        triggerToast(`Updated permissions for subadmin "${subadminForm.name}"`);
      }
    } else {
      const res = await apiService.createSubadmin(subadminForm);
      if (res && res.success) {
        setSubadminsList((prev) => [res.data, ...prev]);
        if (res.auditLogs) setAuditLogsList(res.auditLogs);
        triggerToast(`New subadmin account created for "${subadminForm.name}"`);
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

  // Filters & Pagination for Tyre Catalog (5 products per page)
  const [inventoryPage, setInventoryPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    setInventoryPage(1);
  }, [searchTerm, activeTab]);

  const filteredTyres = (tyresData || []).filter(
    (t) =>
      t &&
      ((t.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
       (t.brand || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
       (t.category || "").toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
            { id: "products", label: "Prime Products", icon: Layers },
            { id: "settings", label: "Shop Settings", icon: Settings },
          ].map((item) => {
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
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 12px", borderRadius: "999px", background: "#f1f5f9", border: "1px solid #cbd5e1" }}>
              <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "0.78rem", color: "#ffffff" }}>
                A
              </div>
              <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#0f172a", whiteSpace: "nowrap" }}>Super Admin</span>
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

          {/* ==================== MODULE: PRODUCTS ==================== */}
          {activeTab === "products" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <div>
                  <h2 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>Prime Products</h2>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                    Manage store products, categories, and inventory.
                  </p>
                </div>

              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
                <div onClick={() => setActiveTab("analytics")} style={{ position: "relative", padding: "24px", borderRadius: "18px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(15, 23, 42, 0.08)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(15, 23, 42, 0.04)"; }}>
                  <Lock size={16} color="#f59e0b" style={{ position: "absolute", top: "16px", right: "16px" }} />
                  <BarChart3 size={32} color="#3b82f6" style={{ marginBottom: "12px" }} />
                  <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#0f172a", margin: "0 0 6px 0" }}>Analytics & Report</h3>
                  <p style={{ fontSize: "0.78rem", color: "#64748b", margin: 0 }}>View detailed product performance</p>
                </div>
                
                <div onClick={() => setActiveTab("chatbot")} style={{ position: "relative", padding: "24px", borderRadius: "18px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(15, 23, 42, 0.08)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(15, 23, 42, 0.04)"; }}>
                  <Lock size={16} color="#f59e0b" style={{ position: "absolute", top: "16px", right: "16px" }} />
                  <Bot size={32} color="#10b981" style={{ marginBottom: "12px" }} />
                  <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#0f172a", margin: "0 0 6px 0" }}>Chatbot Support</h3>
                  <p style={{ fontSize: "0.78rem", color: "#64748b", margin: 0 }}>Manage product automated replies</p>
                </div>
                
                <div onClick={() => setActiveTab("error-monitoring")} style={{ position: "relative", padding: "24px", borderRadius: "18px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(15, 23, 42, 0.08)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(15, 23, 42, 0.04)"; }}>
                  <Lock size={16} color="#f59e0b" style={{ position: "absolute", top: "16px", right: "16px" }} />
                  <ShieldAlert size={32} color="#ef4444" style={{ marginBottom: "12px" }} />
                  <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#0f172a", margin: "0 0 6px 0" }}>Error Monitoring</h3>
                  <p style={{ fontSize: "0.78rem", color: "#64748b", margin: 0 }}>Track inventory sync issues</p>
                </div>

                <div style={{ position: "relative", padding: "24px", borderRadius: "18px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(15, 23, 42, 0.08)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(15, 23, 42, 0.04)"; }}>
                  <Lock size={16} color="#f59e0b" style={{ position: "absolute", top: "16px", right: "16px" }} />
                  <Tag size={32} color="#8b5cf6" style={{ marginBottom: "12px" }} />
                  <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#0f172a", margin: "0 0 6px 0" }}>Coupons</h3>
                  <p style={{ fontSize: "0.78rem", color: "#64748b", margin: 0 }}>Create product discount codes</p>
                </div>

                <div style={{ position: "relative", padding: "24px", borderRadius: "18px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", cursor: "pointer", transition: "all 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(15, 23, 42, 0.08)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(15, 23, 42, 0.04)"; }}>
                  <Lock size={16} color="#f59e0b" style={{ position: "absolute", top: "16px", right: "16px" }} />
                  <MessageCircle size={32} color="#22c55e" style={{ marginBottom: "12px" }} />
                  <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#0f172a", margin: "0 0 6px 0" }}>WhatsApp Marketing</h3>
                  <p style={{ fontSize: "0.78rem", color: "#64748b", margin: 0 }}>Send product promos via WhatsApp</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INVENTORY & CATALOG MANAGEMENT */}
          {activeTab === "inventory" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <div>
                  <h2 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>Tyre Catalog Inventory</h2>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                    Manage prices, stock levels, badges, and specifications for all tyres displayed on the live website.
                  </p>
                </div>
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
                  }}
                >
                  <Plus size={16} />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Inventory Table */}
              <div style={{ borderRadius: "20px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                  <thead>
                    <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", color: "#64748b", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      <th style={{ padding: "16px 20px" }}>Product</th>
                      <th style={{ padding: "16px 20px" }}>Vehicle & Type</th>
                      <th style={{ padding: "16px 20px" }}>Size Specs</th>
                      <th style={{ padding: "16px 20px" }}>Price (INR)</th>
                      <th style={{ padding: "16px 20px" }}>Stock</th>
                      <th style={{ padding: "16px 20px" }}>Badge</th>
                      <th style={{ padding: "16px 20px", textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedTyres.map((tyre) => (
                      <tr key={tyre.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                        <td style={{ padding: "16px 20px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                            <img src={tyre.image} alt={tyre.name} style={{ width: "48px", height: "48px", borderRadius: "10px", objectFit: "cover", border: "1px solid #cbd5e1" }} />
                            <div>
                              <div style={{ fontWeight: "700", color: "#0f172a", fontSize: "0.95rem" }}>{tyre.name}</div>
                              <div style={{ fontSize: "0.76rem", color: "#64748b" }}>{tyre.brand}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "16px 20px", color: "#334155" }}>
                          <div>{tyre.vehicleType}</div>
                          <div style={{ fontSize: "0.76rem", color: "#64748b" }}>{tyre.category}</div>
                        </td>
                        <td style={{ padding: "16px 20px", fontWeight: "700", color: "#0f172a" }}>
                          {tyre.width}/{tyre.profile} R{tyre.rimSize}
                        </td>
                        <td style={{ padding: "16px 20px", fontWeight: "800", color: "#ef4444" }}>
                          ₹{(tyre.priceINR || 12000).toLocaleString("en-IN")}
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <span style={{ padding: "4px 10px", borderRadius: "999px", background: "#f1f5f9", border: "1px solid #cbd5e1", color: "#0f172a", fontWeight: "700", fontSize: "0.76rem" }}>
                            {tyre.stock || 45} Units
                          </span>
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <span style={{ padding: "4px 10px", borderRadius: "999px", background: "#fef2f2", border: "1px solid #fecaca", color: "#ef4444", fontWeight: "700", fontSize: "0.74rem" }}>
                            {tyre.badge || "Featured"}
                          </span>
                        </td>
                        <td style={{ padding: "16px 20px", textAlign: "right" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}>
                            <button
                              onClick={() => handleOpenEditModal(tyre)}
                              style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#ffffff", color: "#0f172a", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.78rem" }}
                            >
                              <Edit size={14} /> Edit
                            </button>
                            <button
                              onClick={() => {
                                onDeleteTyre(tyre.id);
                                triggerToast(`Deleted "${tyre.name}" from inventory`);
                              }}
                              style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #fecaca", background: "#fef2f2", color: "#ef4444", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.78rem" }}
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination Bar - 5 products per page */}
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
                  }}
                >
                  <Plus size={16} />
                  <span>Add New Brand</span>
                </button>
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

              {/* Service Stat Badges */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
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
                  <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: "600", textTransform: "uppercase" }}>Service Categories</div>
                  <div style={{ fontSize: "1.6rem", fontWeight: "800", color: "#0f172a", marginTop: "4px" }}>
                    {[...new Set((servicesList || []).map(s => s.category))].length}
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
                          {/* Badges Header: Category & Status */}
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                            <div style={{ background: "#0f172a", color: "#ffffff", fontSize: "0.72rem", fontWeight: "700", padding: "4px 10px", borderRadius: "999px", letterSpacing: "0.04em" }}>
                              {service.category || "Tyre Care"}
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
                              {service.name}
                            </h3>
                          </div>
                          <p style={{ fontSize: "0.83rem", color: "#64748b", margin: "0 0 16px 0", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {service.description || "No description provided."}
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
              <div style={{ marginBottom: "24px" }}>
                <h2 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>Wholesale & Fleet Quote Requests</h2>
                <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                  Review official quote requests submitted by fleet managers and B2B buyers.
                </p>
              </div>

              <div style={{ borderRadius: "20px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)", padding: "24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {quotesList.map((q, idx) => (
                    <div key={idx} style={{ padding: "20px", borderRadius: "16px", background: "#f8fafc", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontWeight: "800", fontSize: "1.05rem", color: "#0f172a" }}>{q.tyreName || "ApexSport Pro 4S"}</div>
                        <div style={{ fontSize: "0.84rem", color: "#64748b", marginTop: "2px" }}>
                          Quantity: {q.quantity || 4} units • Customer Email: <span style={{ color: "#ef4444" }}>{q.email || "fleet@logistics.in"}</span>
                        </div>
                      </div>
                      <div style={{ fontWeight: "800", fontSize: "1.2rem", color: "#0f172a" }}>
                        {q.totalFormatted || "₹75,600"}
                      </div>
                    </div>
                  ))}
                </div>
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

          {/* TAB: CHATBOT AI ASSISTANT MANAGER */}
          {activeTab === "chatbot" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "20px" }}>
                <div>
                  <h2 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                    AI Tyre Specialist & Chatbot Management
                  </h2>
                  <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                    Monitor automated customer consultations, virtual assistant accuracy, and configure quick actions.
                  </p>
                </div>
                
                {/* Chatbot Master Toggle */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "#ffffff", padding: "12px 20px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "0.9rem", fontWeight: "800", color: "#0f172a" }}>Chatbot Status</span>
                    <span style={{ fontSize: "0.75rem", color: isChatbotEnabled ? "#22c55e" : "#ef4444", fontWeight: "700" }}>
                      {isChatbotEnabled ? "Active & Visible" : "Disabled (Hidden)"}
                    </span>
                  </div>
                  <label style={{ position: "relative", display: "inline-block", width: "50px", height: "26px", cursor: "pointer" }}>
                    <input 
                      type="checkbox" 
                      checked={isChatbotEnabled} 
                      onChange={onToggleChatbotEnabled}
                      style={{ opacity: 0, width: 0, height: 0 }} 
                    />
                    <span 
                      style={{
                        position: "absolute",
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: isChatbotEnabled ? "#22c55e" : "#cbd5e1",
                        borderRadius: "26px",
                        transition: ".4s",
                      }}
                    >
                      <span 
                        style={{
                          position: "absolute",
                          content: '""',
                          height: "18px",
                          width: "18px",
                          left: isChatbotEnabled ? "28px" : "4px",
                          bottom: "4px",
                          backgroundColor: "white",
                          borderRadius: "50%",
                          transition: ".4s",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                        }}
                      />
                    </span>
                  </label>
                </div>
              </div>

              {/* Chatbot Overview Cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "18px",
                  marginBottom: "28px",
                }}
              >
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "16px",
                    padding: "20px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontSize: "0.84rem", color: "#64748b", fontWeight: "600" }}>Total AI Consultations</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", color: "#3b82f6" }}>
                      <Bot size={18} />
                    </div>
                  </div>
                  <div style={{ fontSize: "1.6rem", fontWeight: "900", color: "#0f172a" }}>1,482</div>
                  <div style={{ fontSize: "0.75rem", color: "#22c55e", fontWeight: "700", marginTop: "4px" }}>↑ +18.4% this week</div>
                </div>

                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "16px",
                    padding: "20px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontSize: "0.84rem", color: "#64748b", fontWeight: "600" }}>Bookings Triggered</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", color: "#ef4444" }}>
                      <CalendarCheck size={18} />
                    </div>
                  </div>
                  <div style={{ fontSize: "1.6rem", fontWeight: "900", color: "#0f172a" }}>348</div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: "600", marginTop: "4px" }}>23.4% conversion rate</div>
                </div>

                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: "16px",
                    padding: "20px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontSize: "0.84rem", color: "#64748b", fontWeight: "600" }}>AI Knowledge Accuracy</span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", color: "#22c55e" }}>
                      <Zap size={18} />
                    </div>
                  </div>
                  <div style={{ fontSize: "1.6rem", fontWeight: "900", color: "#0f172a" }}>99.2%</div>
                  <div style={{ fontSize: "0.75rem", color: "#22c55e", fontWeight: "700", marginTop: "4px" }}>Active & Trained</div>
                </div>
              </div>

              {/* Bot Settings & Prompts Card */}
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "20px",
                  border: "1px solid #e2e8f0",
                  padding: "24px",
                  boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)",
                }}
              >
                <h3 style={{ fontSize: "1.05rem", fontWeight: "800", color: "#0f172a", margin: "0 0 16px 0" }}>
                  AI Assistant Quick Actions & Auto-Prompts
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    { title: "🚗 Find Tyres for my car", target: "Launches Interactive Tyre Finder", status: "Active" },
                    { title: "🔧 Book 3D Alignment", target: "Opens Service Appointment Booking", status: "Active" },
                    { title: "💰 View Pricing & Offers", target: "Displays Best Deals & Warranty Info", status: "Active" },
                    { title: "📞 Store Hours & Hotline", target: "Shows Workshop Location & Call Link", status: "Active" },
                  ].map((prompt, pIdx) => (
                    <div
                      key={pIdx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "14px 18px",
                        background: "#f8fafc",
                        borderRadius: "12px",
                        border: "1px solid #e2e8f0",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: "700", fontSize: "0.9rem", color: "#0f172a" }}>{prompt.title}</div>
                        <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "2px" }}>{prompt.target}</div>
                      </div>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: "800",
                          padding: "4px 10px",
                          borderRadius: "999px",
                          background: "#dcfce7",
                          color: "#166534",
                        }}
                      >
                        {prompt.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SHOP SETTINGS */}
          {activeTab === "settings" && (
            <div style={{ maxWidth: "700px" }}>
              <div style={{ marginBottom: "24px" }}>
                <h2 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>Store & Operations Settings</h2>
                <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                  Configure shop operational parameters, contact hotline, and global currency defaults.
                </p>
              </div>

              <div style={{ borderRadius: "20px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)", padding: "28px", display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", color: "#334155", marginBottom: "8px" }}>Store Name</label>
                  <input type="text" defaultValue="Sadguru Tyres & Mobility Solutions" style={{ width: "100%", padding: "12px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", outline: "none" }} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", color: "#334155", marginBottom: "8px" }}>Customer Hotline Phone</label>
                  <input type="text" defaultValue="+91 98220 12345 / 020 2543 8899" style={{ width: "100%", padding: "12px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", outline: "none" }} />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", color: "#334155", marginBottom: "8px" }}>Workshop Operating Hours</label>
                  <input type="text" defaultValue="Mon - Sat: 9:00 AM - 8:30 PM | Sun: 10:00 AM - 4:00 PM" style={{ width: "100%", padding: "12px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", outline: "none" }} />
                </div>

                <button
                  onClick={() => triggerToast("Store settings saved successfully!")}
                  style={{ padding: "12px 24px", borderRadius: "12px", background: "linear-gradient(135deg, #ef4444, #dc2626)", border: "none", color: "#ffffff", fontWeight: "700", fontSize: "0.9rem", cursor: "pointer", width: "fit-content" }}
                >
                  Save Store Settings
                </button>
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
              borderRadius: "24px",
              padding: "32px",
              maxWidth: "520px",
              width: "100%",
              boxShadow: "0 25px 50px rgba(15, 23, 42, 0.25)",
              border: "1px solid #e2e8f0",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                {editingSubadmin ? `Edit Sub-Admin "${editingSubadmin.name}"` : "Create Sub-Admin Account"}
              </h3>
              <button onClick={() => setShowAddSubadminModal(false)} style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveSubadminForm} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kulkarni"
                  value={subadminForm.name}
                  onChange={(e) => setSubadminForm({ ...subadminForm, name: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem", outline: "none" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="ramesh.k@sadgurutyres.com"
                  value={subadminForm.email}
                  onChange={(e) => setSubadminForm({ ...subadminForm, email: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem", outline: "none" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Assigned Role</label>
                  <select
                    value={subadminForm.role}
                    onChange={(e) => setSubadminForm({ ...subadminForm, role: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem", background: "#ffffff", outline: "none" }}
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
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem", outline: "none" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "8px" }}>Module Permissions</label>
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
                        onChange={() => togglePermission(p.id)}
                        style={{ accentColor: "#ef4444" }}
                      />
                      <span>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

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
                  style={{ padding: "10px 22px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #ef4444, #dc2626)", color: "#ffffff", fontWeight: "700", fontSize: "0.85rem", cursor: "pointer" }}
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

      {/* Toast Notification */}
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
