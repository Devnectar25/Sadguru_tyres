import React, { useState } from "react";
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
  DollarSign,
  TrendingUp,
  Filter,
  Trash2,
  Edit,
  X,
  Check,
  Eye,
  Award
} from "lucide-react";

export default function AdminLayout({
  onExitAdmin,
  tyresData,
  onAddTyre,
  onUpdateTyre,
  onDeleteTyre,
  brandsList = [],
  onAddBrand,
  onUpdateBrand,
  onDeleteBrand,
  bookingsList,
  onUpdateBookingStatus,
  quotesList,
  onUpdateQuoteStatus
}) {
  const [activeTab, setActiveTab] = useState("dashboard"); // "dashboard" | "inventory" | "brands" | "bookings" | "quotes" | "settings"
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddTyreModal, setShowAddTyreModal] = useState(false);
  const [editingTyre, setEditingTyre] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState(null);

  // Form State for Adding / Editing Brand
  const [showAddBrandModal, setShowAddBrandModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [brandForm, setBrandForm] = useState({
    name: "",
    logo: "/images/YOKOHAMA.png",
    tagline: "Official Partner",
  });

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

    if (editingBrand) {
      if (onUpdateBrand) {
        onUpdateBrand({
          ...editingBrand,
          ...brandForm,
        });
      }
      triggerToast(`Updated brand "${brandForm.name}"`);
    } else {
      const newId = brandForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();
      if (onAddBrand) {
        onAddBrand({
          ...brandForm,
          id: newId,
          status: "Active",
        });
      }
      triggerToast(`New brand "${brandForm.name}" added to Showcase`);
    }
    setShowAddBrandModal(false);
  };

  // Form State for Adding / Editing Tyre
  const [tyreForm, setTyreForm] = useState({
    name: "",
    brand: "Sadguru Apex",
    vehicleType: "Cars",
    tyreType: "All-Season Premium",
    performanceLevel: "High Performance",
    width: "225",
    profile: "55",
    rimSize: "17",
    category: "Premium Passenger",
    badge: "Bestseller",
    priceINR: 12500,
    priceUSD: 165,
    stock: 45,
    rating: 4.8,
    image: "/images/tyre_sport.jpg",
    tagline: "Superior comfort and durability for everyday driving.",
  });

  const triggerToast = (msg) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  // Pre-calculated Metrics
  const totalRevenueINR = bookingsList.reduce((acc, b) => acc + (b.totalINR || 1850), 0) + 1450000;
  const pendingBookingsCount = bookingsList.filter((b) => b.status === "Pending").length;
  const confirmedBookingsCount = bookingsList.filter((b) => b.status === "Confirmed").length;
  const totalTyresCount = tyresData.length;

  const handleOpenAddModal = () => {
    setEditingTyre(null);
    setTyreForm({
      name: "",
      brand: "Sadguru Apex",
      vehicleType: "Cars",
      tyreType: "All-Season Premium",
      performanceLevel: "High Performance",
      width: "225",
      profile: "55",
      rimSize: "17",
      category: "Premium Passenger",
      badge: "Bestseller",
      priceINR: 12500,
      priceUSD: 165,
      stock: 45,
      rating: 4.8,
      image: "/images/tyre_sport.jpg",
      tagline: "Superior comfort and durability for everyday driving.",
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
      image: tyre.image || "/images/tyre_sport.jpg",
      tagline: tyre.tagline || "Engineered for maximum grip and safety.",
    });
    setShowAddTyreModal(true);
  };

  const handleSaveTyreForm = (e) => {
    e.preventDefault();
    if (!tyreForm.name) return;

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

  const filteredTyres = tyresData.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        color: "#0f172a",
        display: "flex",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* SIDEBAR NAVIGATION - OPTIMIZED SPACING & LAYOUT */}
      <aside
        style={{
          width: "230px",
          background: "#ffffff",
          borderRight: "1px solid #e2e8f0",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          boxShadow: "2px 0 10px rgba(15, 23, 42, 0.02)",
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            padding: "16px 16px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            gap: "10px",
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
        <nav style={{ padding: "16px 10px", flexGrow: 1, display: "flex", flexDirection: "column", gap: "5px" }}>
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "inventory", label: "Tyre Inventory", icon: Package, badge: totalTyresCount },
            { id: "brands", label: "Partner Brands", icon: Award, badge: (brandsList || []).length },
            { id: "bookings", label: "Service Bookings", icon: CalendarCheck, badge: pendingBookingsCount > 0 ? `${pendingBookingsCount} New` : null, badgeColor: "#ef4444" },
            { id: "quotes", label: "Quote Inquiries", icon: FileText },
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
                  fontSize: "0.86rem",
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
                {item.badge && (
                  <span
                    style={{
                      fontSize: "0.7rem",
                      padding: "2px 7px",
                      borderRadius: "999px",
                      background: isActive ? "rgba(255, 255, 255, 0.25)" : item.badgeColor || "#e2e8f0",
                      color: isActive ? "#ffffff" : item.badgeColor ? "#ffffff" : "#334155",
                      fontWeight: "700",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      marginLeft: "6px",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Exit / Logout Sidebar Footer */}
        <div style={{ padding: "12px 10px", borderTop: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "8px" }}>
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
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ef4444";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.borderColor = "#ef4444";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fef2f2";
              e.currentTarget.style.color = "#ef4444";
              e.currentTarget.style.borderColor = "#fecaca";
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
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#0f172a";
              e.currentTarget.style.background = "#f1f5f9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#64748b";
              e.currentTarget.style.background = "transparent";
            }}
          >
            <ExternalLink size={13} />
            <span>Return to Website</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA - CRISP WHITE LIGHT THEME */}
      <main style={{ flexGrow: 1, display: "flex", flexDirection: "column", minWidth: 0, height: "100vh", overflowY: "auto" }}>
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
            boxShadow: "0 2px 6px rgba(15, 23, 42, 0.02)",
          }}
        >
          {/* Search Bar - Positioned on Left & Expanded Size */}
          <div style={{ position: "relative", width: "100%", maxWidth: "440px" }}>
            <Search
              size={17}
              color="#64748b"
              style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
            />
            <input
              type="text"
              placeholder="Search tyres by name, brand, size, or customer bookings..."
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
                boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.03)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.borderColor = "#ef4444";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(239, 68, 68, 0.12)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.background = "#f8fafc";
                e.currentTarget.style.borderColor = "#cbd5e1";
                e.currentTarget.style.boxShadow = "inset 0 1px 2px rgba(0, 0, 0, 0.03)";
              }}
            />
          </div>

          {/* Right Controls: User Profile & Logout */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            {/* User Profile Pill */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 12px", borderRadius: "999px", background: "#f1f5f9", border: "1px solid #cbd5e1" }}>
              <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "0.78rem", color: "#ffffff" }}>
                A
              </div>
              <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#0f172a", whiteSpace: "nowrap" }}>Admin Manager</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={onExitAdmin}
              title="Logout from Admin Panel"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "7px 16px",
                borderRadius: "999px",
                border: "1px solid #fecaca",
                background: "#fef2f2",
                color: "#ef4444",
                fontWeight: "700",
                fontSize: "0.8rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ef4444";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.borderColor = "#ef4444";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fef2f2";
                e.currentTarget.style.color = "#ef4444";
                e.currentTarget.style.borderColor = "#fecaca";
              }}
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
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
                    <DollarSign size={20} color="#10b981" />
                  </div>
                  <div style={{ fontSize: "1.75rem", fontWeight: "800", color: "#0f172a", lineHeight: 1.1, marginBottom: "6px" }}>
                    ₹{totalRevenueINR.toLocaleString("en-IN")}
                  </div>
                  <div style={{ fontSize: "0.76rem", color: "#10b981", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
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
                    <span style={{ fontSize: "0.82rem", fontWeight: "700", color: "#64748b" }}>TYRE CATALOG</span>
                    <Package size={20} color="#2563eb" />
                  </div>
                  <div style={{ fontSize: "1.75rem", fontWeight: "800", color: "#0f172a", lineHeight: 1.1, marginBottom: "6px" }}>
                    {totalTyresCount} Products
                  </div>
                  <div style={{ fontSize: "0.76rem", color: "#2563eb", fontWeight: "600" }}>
                    All items in stock & active
                  </div>
                </div>

                <div style={{ padding: "22px", borderRadius: "18px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: "700", color: "#64748b" }}>DEALER NETWORK</span>
                    <Building2 size={20} color="#d97706" />
                  </div>
                  <div style={{ fontSize: "1.75rem", fontWeight: "800", color: "#0f172a", lineHeight: 1.1, marginBottom: "6px" }}>
                    125+ Outlets
                  </div>
                  <div style={{ fontSize: "0.76rem", color: "#d97706", fontWeight: "600" }}>
                    Active across India
                  </div>
                </div>
              </div>

              {/* Recent Bookings & Inventory Highlights */}
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
                              background: b.status === "Confirmed" ? "#d1fae5" : "#fef2f2",
                              color: b.status === "Confirmed" ? "#047857" : "#ef4444",
                              border: b.status === "Confirmed" ? "1px solid #a7f3d0" : "1px solid #fecaca",
                            }}
                          >
                            {b.status || "Pending"}
                          </span>
                          <button
                            onClick={() => onUpdateBookingStatus(idx, b.status === "Confirmed" ? "Pending" : "Confirmed")}
                            style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#ffffff", color: "#0f172a", fontSize: "0.76rem", fontWeight: "700", cursor: "pointer" }}
                          >
                            Toggle Status
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Quick Inventory Highlights */}
                <div style={{ padding: "24px", borderRadius: "20px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                      Featured Tyres
                    </h3>
                    <button
                      onClick={() => setActiveTab("inventory")}
                      style={{ background: "transparent", border: "none", color: "#2563eb", fontSize: "0.82rem", fontWeight: "700", cursor: "pointer" }}
                    >
                      Manage ({tyresData.length})
                    </button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {tyresData.slice(0, 4).map((t) => (
                      <div
                        key={t.id}
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
                        <img src={t.image} alt={t.name} style={{ width: "42px", height: "42px", borderRadius: "10px", objectFit: "cover", border: "1px solid #cbd5e1" }} />
                        <div style={{ flexGrow: 1 }}>
                          <div style={{ fontWeight: "700", fontSize: "0.88rem", color: "#0f172a" }}>{t.name}</div>
                          <div style={{ fontSize: "0.76rem", color: "#ef4444", fontWeight: "700" }}>
                            ₹{(t.priceINR || 12000).toLocaleString("en-IN")}
                          </div>
                        </div>
                        <button
                          onClick={() => handleOpenEditModal(t)}
                          style={{ padding: "6px 10px", borderRadius: "8px", border: "1px solid #cbd5e1", background: "#ffffff", color: "#475569", cursor: "pointer" }}
                        >
                          <Edit size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
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
                    {filteredTyres.map((tyre) => (
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
                          <span style={{ padding: "4px 10px", borderRadius: "999px", background: "#d1fae5", border: "1px solid #a7f3d0", color: "#047857", fontWeight: "700", fontSize: "0.76rem" }}>
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
                      position: "relative",
                    }}
                  >
                    <div style={{ height: "90px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                      <img src={brand.logo} alt={brand.name} style={{ maxHeight: "70px", maxWidth: "180px", objectFit: "contain" }} />
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

          {/* TAB 3: BOOKINGS MANAGER */}
          {activeTab === "bookings" && (
            <div>
              <div style={{ marginBottom: "24px" }}>
                <h2 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>Service Appointments</h2>
                <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
                  Manage customer appointments for tyre replacement, wheel alignment, and maintenance services.
                </p>
              </div>

              <div style={{ borderRadius: "20px", background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)", padding: "24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {bookingsList.map((b, idx) => (
                    <div
                      key={idx}
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
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <div style={{ width: "46px", height: "46px", borderRadius: "12px", background: "#fef2f2", border: "1px solid #fecaca", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <CalendarCheck size={22} />
                        </div>
                        <div>
                          <div style={{ fontSize: "1.05rem", fontWeight: "800", color: "#0f172a" }}>
                            {b.customerName || "Customer Appointment"}
                          </div>
                          <div style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "2px" }}>
                            Vehicle: <strong style={{ color: "#0f172a" }}>{b.carModel || "Standard Sedan"}</strong> • Service: <strong style={{ color: "#ef4444" }}>{b.serviceName || "Wheel Alignment & Tyre Fitting"}</strong>
                          </div>
                          <div style={{ fontSize: "0.78rem", color: "#94a3b8", marginTop: "4px" }}>
                            Requested Date: {b.date || "2026-10-05"} at {b.timeSlot || "11:00 AM"} | Phone: {b.phone || "+91 98765 43210"}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span style={{ padding: "6px 14px", borderRadius: "999px", fontSize: "0.78rem", fontWeight: "800", background: b.status === "Confirmed" ? "#d1fae5" : "#fef2f2", border: b.status === "Confirmed" ? "1px solid #a7f3d0" : "1px solid #fecaca", color: b.status === "Confirmed" ? "#047857" : "#ef4444" }}>
                          STATUS: {b.status || "Pending"}
                        </span>
                        <button
                          onClick={() => {
                            onUpdateBookingStatus(idx, b.status === "Confirmed" ? "Pending" : "Confirmed");
                            triggerToast(`Updated booking status to ${b.status === "Confirmed" ? "Pending" : "Confirmed"}`);
                          }}
                          style={{ padding: "10px 18px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #ef4444, #dc2626)", color: "#ffffff", fontWeight: "700", fontSize: "0.82rem", cursor: "pointer" }}
                        >
                          Toggle Confirmation
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
                      <div style={{ fontWeight: "800", fontSize: "1.2rem", color: "#047857" }}>
                        {q.totalFormatted || "₹75,600"}
                      </div>
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
        </div>
      </main>

      {/* ADD / EDIT TYRE MODAL - CRISP LIGHT THEME */}
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
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#f8fafc", border: "1px solid #cbd5e1", color: "#0f172a", outline: "none" }}
                  />
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
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Logo Image Path / URL</label>
                <input
                  type="text"
                  required
                  placeholder="/images/YOKOHAMA.png"
                  value={brandForm.logo}
                  onChange={(e) => setBrandForm({ ...brandForm, logo: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem", outline: "none" }}
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
