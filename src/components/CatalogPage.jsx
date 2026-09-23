import React, { useState, useMemo } from "react";
import { TYRES_DATA } from "../data/tyresData";
import { Search, Heart, Eye, Star, Car, Truck, Disc, Sparkles, X, RotateCw } from "lucide-react";

export default function CatalogPage({
  currency,
  onSelectTyre,
  wishlistIds,
  onToggleWishlist,
  onNavigateHome,
}) {
  const [vehicleType, setVehicleType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedTyreType, setSelectedTyreType] = useState("All");
  const [selectedWidth, setSelectedWidth] = useState("All");
  const [selectedProfile, setSelectedProfile] = useState("All");
  const [selectedRimSize, setSelectedRimSize] = useState("All");
  const [selectedPerformance, setSelectedPerformance] = useState("All");
  const [maxPrice, setMaxPrice] = useState(300);
  const [sortBy, setSortBy] = useState("recommended");

  const filteredTyres = useMemo(() => {
    return TYRES_DATA.filter((tyre) => {
      if (vehicleType !== "All" && tyre.vehicleType !== vehicleType) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          tyre.name.toLowerCase().includes(q) ||
          tyre.brand.toLowerCase().includes(q) ||
          tyre.category.toLowerCase().includes(q) ||
          tyre.bestSuitedFor.toLowerCase().includes(q) ||
          tyre.availableSizes.some((s) => s.toLowerCase().includes(q));
        if (!matches) return false;
      }
      if (selectedBrand !== "All" && tyre.brand !== selectedBrand) return false;
      if (selectedTyreType !== "All" && tyre.tyreType !== selectedTyreType) return false;
      if (selectedWidth !== "All" && tyre.width !== selectedWidth) return false;
      if (selectedProfile !== "All" && tyre.profile !== selectedProfile) return false;
      if (selectedRimSize !== "All" && tyre.rimSize !== selectedRimSize) return false;
      if (selectedPerformance !== "All" && tyre.performanceLevel !== selectedPerformance) return false;
      if (tyre.priceUSD > maxPrice) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.priceUSD - b.priceUSD;
      if (sortBy === "price-high") return b.priceUSD - a.priceUSD;
      if (sortBy === "newest") return new Date(b.dateAdded) - new Date(a.dateAdded);
      return b.rating * b.reviewsCount - a.rating * a.reviewsCount;
    });
  }, [
    vehicleType,
    searchQuery,
    selectedBrand,
    selectedTyreType,
    selectedWidth,
    selectedProfile,
    selectedRimSize,
    selectedPerformance,
    maxPrice,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setVehicleType("All");
    setSearchQuery("");
    setSelectedBrand("All");
    setSelectedTyreType("All");
    setSelectedWidth("All");
    setSelectedProfile("All");
    setSelectedRimSize("All");
    setSelectedPerformance("All");
    setMaxPrice(300);
    setSortBy("recommended");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        paddingTop: "10px",
        paddingBottom: "100px",
      }}
    >
      <div className="container">
        {/* Dynamic Tyre Motion Showcase Section - Width aligned with other sections */}
        <section
          style={{
            position: "relative",
            width: "100%",
            minHeight: "400px",
            display: "flex",
            alignItems: "center",
            marginBottom: "24px",
            overflow: "hidden",
            borderRadius: "20px",
            background: "#000000",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
          }}
        >
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              zIndex: 0,
              display: "block",
            }}
          >
            <source src="/videos/generate_this_tyre_video_with.mp4" type="video/mp4" />
          </video>

          {/* Minimal Motivational Words Layer */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              width: "100%",
              padding: "clamp(24px, 4.5vw, 44px)",
              pointerEvents: "none",
              userSelect: "none",
              WebkitUserSelect: "none",
            }}
          >
            <div style={{ maxWidth: "560px", pointerEvents: "none" }}>
              <h1
                style={{
                  fontSize: "clamp(2.4rem, 4.8vw, 3.8rem)",
                  fontWeight: "800",
                  color: "#ffffff",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  textTransform: "uppercase",
                  textShadow: "0 4px 20px rgba(0, 0, 0, 0.85), 0 2px 6px rgba(0, 0, 0, 0.95)",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  caretColor: "transparent",
                  cursor: "default",
                  pointerEvents: "none",
                }}
              >
                Power. Precision. <span style={{ color: "#ef4444" }}>Grip.</span>
              </h1>
            </div>
          </div>
        </section>

        {/* Vehicle Type Selector */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          {[
            { id: "All", label: "All Vehicles", count: TYRES_DATA.length },
            { id: "Cars", label: "Cars & Sports", icon: Car },
            { id: "SUVs", label: "SUVs & 4x4", icon: Truck },
            { id: "Bikes", label: "Superbikes & ADV", icon: Disc },
          ].map((item) => {
            const isSelected = vehicleType === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setVehicleType(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px 24px",
                  borderRadius: "9999px",
                  fontSize: "0.92rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "var(--transition-smooth)",
                  background: isSelected
                    ? "linear-gradient(135deg, #ef4444, #dc2626)"
                    : "#ffffff",
                  border: isSelected ? "none" : "1px solid #cbd5e1",
                  color: isSelected ? "#ffffff" : "#0f172a",
                  boxShadow: isSelected ? "0 6px 20px rgba(239, 68, 68, 0.3)" : "0 2px 6px rgba(15, 23, 42, 0.04)",
                }}
              >
                {Icon && <Icon size={18} color={isSelected ? "#ffffff" : "#0f172a"} />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Bar & Sort */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "20px",
            padding: "16px 20px",
            background: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
          }}
        >
          {/* Search Input */}
          <div
            style={{
              position: "relative",
              flexGrow: 1,
              maxWidth: "480px",
              minWidth: "260px",
            }}
          >
            <Search
              size={18}
              color="#ef4444"
              style={{
                position: "absolute",
                left: "14px",
                top: "13px",
              }}
            />

            <input
              type="text"
              placeholder="Search tyre by name, car model, or size..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px 10px 42px",
                borderRadius: "9999px",
                background: "#f8fafc",
                border: "1px solid #cbd5e1",
                color: "#0f172a",
                fontSize: "0.9rem",
                outline: "none",
              }}
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "10px",
                  background: "none",
                  border: "none",
                  color: "#64748b",
                  cursor: "pointer",
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div style={{ fontSize: "0.86rem", color: "#64748b" }}>
              Showing <strong style={{ color: "#0f172a" }}>{filteredTyres.length}</strong> tyres
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "0.82rem", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>
                Sort:
              </span>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: "10px 14px",
                  borderRadius: "9999px",
                  background: "#f8fafc",
                  border: "1px solid #cbd5e1",
                  color: "#0f172a",
                  fontSize: "0.86rem",
                  fontWeight: "600",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="recommended">Recommended</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <main>
          {filteredTyres.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 20px",
                background: "#ffffff",
                borderRadius: "20px",
                border: "1px dashed #cbd5e1",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "rgba(239, 68, 68, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  color: "#ef4444",
                }}
              >
                <Search size={26} />
              </div>

              <h3 style={{ fontSize: "1.4rem", color: "#0f172a", marginBottom: "8px", fontWeight: "800" }}>
                No Tyres Match Your Search Criteria
              </h3>

              <p style={{ color: "#64748b", maxWidth: "420px", margin: "0 auto 20px" }}>
                Try adjusting your search query or vehicle type filter to see available tyres.
              </p>

              <button
                onClick={handleResetFilters}
                style={{
                  padding: "10px 24px",
                  borderRadius: "9999px",
                  background: "#ef4444",
                  color: "#ffffff",
                  border: "none",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "28px",
              }}
            >
              {filteredTyres.map((tyre) => {
                const isWishlisted = wishlistIds.includes(tyre.id);
                const displayPrice =
                  currency === "USD"
                    ? `$${tyre.priceUSD}`
                    : `₹${tyre.priceINR.toLocaleString("en-IN")}`;

                return (
                  <div
                    key={tyre.id}
                    style={{
                      borderRadius: "20px",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      background: "#ffffff",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
                      position: "relative",
                      transition: "var(--transition-smooth)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 18px 40px rgba(15, 23, 42, 0.1)";
                      e.currentTarget.style.borderColor = "#cbd5e1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 10px 30px rgba(15, 23, 42, 0.05)";
                      e.currentTarget.style.borderColor = "#e2e8f0";
                    }}
                  >
                    {/* Top Badge & Wishlist */}
                    <div
                      style={{
                        position: "absolute",
                        top: "14px",
                        left: "14px",
                        right: "14px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        zIndex: 3,
                      }}
                    >
                      <span
                        style={{
                          background: "#0f172a",
                          color: "#ffffff",
                          fontSize: "0.72rem",
                          fontWeight: "700",
                          padding: "6px 14px",
                          borderRadius: "9999px",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {tyre.badge}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(tyre.id);
                        }}
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background: isWishlisted ? "rgba(239, 68, 68, 0.15)" : "#ffffff",
                          border: isWishlisted ? "1px solid #ef4444" : "1px solid #cbd5e1",
                          color: isWishlisted ? "#ef4444" : "#0f172a",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          boxShadow: "0 2px 8px rgba(15, 23, 42, 0.1)",
                        }}
                        title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        <Heart
                          size={16}
                          fill={isWishlisted ? "#ef4444" : "none"}
                          color={isWishlisted ? "#ef4444" : "currentColor"}
                        />
                      </button>
                    </div>

                    {/* Image Showcase */}
                    <div
                      onClick={() => onSelectTyre(tyre)}
                      style={{
                        height: "270px",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "12px",
                        cursor: "pointer",
                        background: "#ffffff",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={tyre.image}
                        alt={tyre.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          transform: "scale(1.05)",
                          transition: "transform 0.4s ease-out",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                      />
                    </div>

                    {/* Card Content */}
                    <div
                      style={{
                        padding: "22px",
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                        borderTop: "1px solid #f1f5f9",
                      }}
                    >
                      {/* Brand & Rating */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "6px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.76rem",
                            color: "#ef4444",
                            textTransform: "uppercase",
                            fontWeight: "700",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {tyre.brand}
                        </span>

                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          <Star size={14} fill="#eab308" color="#eab308" />
                          <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "#0f172a" }}>
                            {tyre.rating}
                          </span>
                        </div>
                      </div>

                      {/* Name */}
                      <h3
                        onClick={() => onSelectTyre(tyre)}
                        style={{
                          fontSize: "1.25rem",
                          color: "#0f172a",
                          marginBottom: "6px",
                          fontWeight: "800",
                          cursor: "pointer",
                        }}
                      >
                        {tyre.name}
                      </h3>

                      <p style={{ fontSize: "0.86rem", color: "#64748b", marginBottom: "16px", lineHeight: 1.5 }}>
                        {tyre.tagline}
                      </p>

                      {/* Price & CTA Footer */}
                      <div
                        style={{
                          marginTop: "auto",
                          paddingTop: "16px",
                          borderTop: "1px solid #f1f5f9",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <div style={{ fontSize: "0.72rem", color: "#94a3b8", textTransform: "uppercase", fontWeight: "600" }}>
                            Starting Price
                          </div>
                          <div style={{ fontSize: "1.25rem", fontWeight: "800", color: "#0f172a" }}>
                            {displayPrice}
                            <span style={{ fontSize: "0.75rem", fontWeight: "500", color: "#64748b", marginLeft: "4px" }}>
                              /tyre
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => onSelectTyre(tyre)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "9px 16px",
                            fontSize: "0.82rem",
                            fontWeight: "700",
                            borderRadius: "9999px",
                            background: "#0f172a",
                            color: "#ffffff",
                            border: "none",
                            cursor: "pointer",
                            transition: "var(--transition-smooth)",
                          }}
                        >
                          <Eye size={15} />
                          DETAILS
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
