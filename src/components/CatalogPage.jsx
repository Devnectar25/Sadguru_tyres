import React, { useState, useMemo } from "react";
import { TYRES_DATA } from "../data/tyresData";
import {
  Search,
  Heart,
  Eye,
  Star,
  Car,
  Truck,
  Disc,
  Sparkles,
  X,
} from "lucide-react";

export default function CatalogPage({
  currency,
  onSelectTyre,
  wishlistIds,
  onToggleWishlist,
  onNavigateHome,
}) {
  // Filters state
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

  // Extract unique filter options from data
  const brands = useMemo(
    () => ["All", ...new Set(TYRES_DATA.map((t) => t.brand))],
    []
  );

  const tyreTypes = useMemo(
    () => ["All", ...new Set(TYRES_DATA.map((t) => t.tyreType))],
    []
  );

  const widths = useMemo(
    () =>
      ["All", ...new Set(TYRES_DATA.map((t) => t.width))].sort(),
    []
  );

  const profiles = useMemo(
    () =>
      ["All", ...new Set(TYRES_DATA.map((t) => t.profile))].sort(),
    []
  );

  const rimSizes = useMemo(
    () =>
      ["All", ...new Set(TYRES_DATA.map((t) => t.rimSize))].sort(
        (a, b) => Number(a) - Number(b)
      ),
    []
  );

  const performanceLevels = useMemo(
    () => [
      "All",
      ...new Set(TYRES_DATA.map((t) => t.performanceLevel)),
    ],
    []
  );

  // Filter & Sort Logic
  const filteredTyres = useMemo(() => {
    return TYRES_DATA.filter((tyre) => {
      // Vehicle type filter
      if (
        vehicleType !== "All" &&
        tyre.vehicleType !== vehicleType
      ) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();

        const matches =
          tyre.name.toLowerCase().includes(q) ||
          tyre.brand.toLowerCase().includes(q) ||
          tyre.category.toLowerCase().includes(q) ||
          tyre.bestSuitedFor.toLowerCase().includes(q) ||
          tyre.availableSizes.some((s) =>
            s.toLowerCase().includes(q)
          );

        if (!matches) return false;
      }

      // Brand
      if (
        selectedBrand !== "All" &&
        tyre.brand !== selectedBrand
      ) {
        return false;
      }

      // Tyre Type
      if (
        selectedTyreType !== "All" &&
        tyre.tyreType !== selectedTyreType
      ) {
        return false;
      }

      // Width
      if (
        selectedWidth !== "All" &&
        tyre.width !== selectedWidth
      ) {
        return false;
      }

      // Profile
      if (
        selectedProfile !== "All" &&
        tyre.profile !== selectedProfile
      ) {
        return false;
      }

      // Rim Size
      if (
        selectedRimSize !== "All" &&
        tyre.rimSize !== selectedRimSize
      ) {
        return false;
      }

      // Performance Level
      if (
        selectedPerformance !== "All" &&
        tyre.performanceLevel !== selectedPerformance
      ) {
        return false;
      }

      // Price Filter
      if (tyre.priceUSD > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") {
        return a.priceUSD - b.priceUSD;
      }

      if (sortBy === "price-high") {
        return b.priceUSD - a.priceUSD;
      }

      if (sortBy === "newest") {
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      }

      // Recommended
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

  // Reset filters
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
        background: "var(--bg-dark)",
        paddingTop: "40px",
        paddingBottom: "100px",
      }}
    >
      <div className="container">
        {/* Page Header */}
        <div style={{ marginBottom: "36px" }}>
          <div
            className="badge-pill"
            style={{ marginBottom: "14px" }}
          >
            <Sparkles
              size={13}
              color="var(--accent-crimson)"
            />
            COMPLETE TYRE PORTFOLIO
          </div>

          <h1
            style={{
              fontSize: "clamp(2.5rem, 4.5vw, 3.8rem)",
              lineHeight: 1.1,
              marginBottom: "14px",
            }}
          >
            Explore Our{" "}
            <span className="text-gradient-crimson">
              Tyres
            </span>
          </h1>

          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--text-dim)",
              maxWidth: "680px",
              lineHeight: 1.6,
            }}
          >
            Discover track-tested performance, all-weather
            grand touring comfort, and heavy-duty 4x4
            engineering. Tailored fitments for sports cars,
            luxury SUVs, and superbikes.
          </p>
        </div>

        {/* Vehicle Type Selector */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "36px",
            flexWrap: "wrap",
          }}
        >
          {[
            {
              id: "All",
              label: "All Vehicles",
              count: TYRES_DATA.length,
            },
            {
              id: "Cars",
              label: "Cars & Sports",
              icon: Car,
            },
            {
              id: "SUVs",
              label: "SUVs & 4x4",
              icon: Truck,
            },
            {
              id: "Bikes",
              label: "Superbikes & ADV",
              icon: Disc,
            },
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
                  borderRadius: "12px",
                  fontSize: "0.92rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "var(--transition-smooth)",

                  background: isSelected
                    ? "linear-gradient(135deg, #eba763, #cf7a30)"
                    : "rgba(255, 255, 255, 0.04)",

                  border: isSelected
                    ? "1px solid #eba763"
                    : "1px solid rgba(255, 255, 255, 0.08)",

                  color: isSelected
                    ? "#07080b"
                    : "var(--text-silver)",

                  boxShadow: isSelected
                    ? "0 4px 20px rgba(255, 255, 255, 0.25)"
                    : "none",
                }}
              >
                {Icon && (
                  <Icon
                    size={18}
                    color={
                      isSelected ? "#07080b" : "#ffffff"
                    }
                  />
                )}

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
            marginBottom: "30px",
            padding: "16px 20px",
            background: "rgba(14, 18, 26, 0.7)",
            borderRadius: "14px",
            border: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          {/* Search */}
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
              color="var(--accent-crimson)"
              style={{
                position: "absolute",
                left: "14px",
                top: "13px",
              }}
            />

            <input
              type="text"
              placeholder="Search tyre by name, car model, or size (e.g. Apex, R19, Tesla)..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              style={{
                width: "100%",
                padding: "10px 14px 10px 42px",
                borderRadius: "8px",
                background: "#0c0f16",
                border:
                  "1px solid rgba(255, 255, 255, 0.1)",
                color: "#ffffff",
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
                  color: "var(--text-muted)",
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
            {/* Results Count */}
            <div
              style={{
                fontSize: "0.86rem",
                color: "var(--text-muted)",
              }}
            >
              Showing{" "}
              <strong style={{ color: "#ffffff" }}>
                {filteredTyres.length}
              </strong>{" "}
              tyres
            </div>

            {/* Sort */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "0.82rem",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                }}
              >
                Sort:
              </span>

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
                style={{
                  padding: "10px 14px",
                  borderRadius: "8px",
                  background: "#0c0f16",
                  border:
                    "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#ffffff",
                  fontSize: "0.86rem",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="recommended">
                  Recommended
                </option>

                <option value="newest">
                  Newest First
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>
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
                background:
                  "rgba(14, 18, 26, 0.6)",
                borderRadius: "18px",
                border:
                  "1px dashed rgba(255, 255, 255, 0.1)",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background:
                    "rgba(255, 42, 42, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                  color: "var(--accent-crimson)",
                }}
              >
                <Search size={26} />
              </div>

              <h3
                style={{
                  fontSize: "1.4rem",
                  color: "#fff",
                  marginBottom: "8px",
                }}
              >
                No Tyres Match Your Search Criteria
              </h3>

              <p
                style={{
                  color: "var(--text-dim)",
                  maxWidth: "420px",
                  margin: "0 auto 20px",
                }}
              >
                Try adjusting your search query or vehicle
                type filter to see available tyres.
              </p>

              <button
                onClick={handleResetFilters}
                className="btn btn-primary"
                style={{
                  padding: "10px 20px",
                }}
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div
              className="catalog-grid-3"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(3, 1fr)",
                gap: "28px",
              }}
            >
              {filteredTyres.map((tyre) => {
                const isWishlisted =
                  wishlistIds.includes(tyre.id);

                const displayPrice =
                  currency === "USD"
                    ? `$${tyre.priceUSD}`
                    : `₹${tyre.priceINR.toLocaleString(
                      "en-IN"
                    )}`;

                return (
                  <div
                    key={tyre.id}
                    className="glass-card product-card-hover"
                    style={{
                      borderRadius: "18px",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      background:
                        "rgba(13, 17, 24, 0.85)",
                      border:
                        "1px solid rgba(255, 255, 255, 0.08)",
                      position: "relative",
                    }}
                  >
                    {/* Top Badges & Wishlist */}
                    <div
                      style={{
                        position: "absolute",
                        top: "14px",
                        left: "14px",
                        right: "14px",
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems: "center",
                        zIndex: 3,
                      }}
                    >
                      <span
                        className="badge-pill"
                        style={{
                          background:
                            "rgba(10, 14, 20, 0.85)",
                        }}
                      >
                        {tyre.badge}
                      </span>

                      {/* Wishlist */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(tyre.id);
                        }}
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background: isWishlisted
                            ? "rgba(255, 42, 42, 0.2)"
                            : "rgba(10, 14, 20, 0.8)",
                          border: isWishlisted
                            ? "1px solid var(--accent-crimson)"
                            : "1px solid rgba(255, 255, 255, 0.15)",
                          color: isWishlisted
                            ? "var(--accent-crimson)"
                            : "var(--text-silver)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        title={
                          isWishlisted
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                        }
                      >
                        <Heart
                          size={16}
                          fill={
                            isWishlisted
                              ? "var(--accent-crimson)"
                              : "none"
                          }
                          color={
                            isWishlisted
                              ? "var(--accent-crimson)"
                              : "currentColor"
                          }
                        />
                      </button>
                    </div>

                    {/* Tyre Image */}
                    <div
                      onClick={() =>
                        onSelectTyre(tyre)
                      }
                      style={{
                        height: "290px",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "4px",
                        cursor: "pointer",
                        background:
                          "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, rgba(8, 11, 16, 0.95) 100%)",
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
                          transform: "scale(1.18)",
                          transition:
                            "transform 0.4s ease-out",
                          filter:
                            "drop-shadow(0 15px 30px rgba(0, 0, 0, 0.9))",
                        }}
                        onMouseEnter={(e) =>
                        (e.currentTarget.style.transform =
                          "scale(1.24)")
                        }
                        onMouseLeave={(e) =>
                        (e.currentTarget.style.transform =
                          "scale(1.18)")
                        }
                      />
                    </div>

                    {/* Card Content */}
                    <div
                      style={{
                        padding: "22px",
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                        borderTop:
                          "1px solid rgba(255, 255, 255, 0.06)",
                      }}
                    >
                      {/* Brand & Rating */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent:
                            "space-between",
                          marginBottom: "6px",
                        }}
                      >
                        {/* Brand */}
                        <span
                          style={{
                            fontSize: "0.76rem",
                            color: "var(--text-muted)",
                            textTransform:
                              "uppercase",
                            fontWeight: "700",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {tyre.brand}
                        </span>

                        {/* CLEAN RATING
                            No circle
                            No background
                            No border
                            No shadow
                            No glow
                        */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            background:
                              "transparent",
                            border: "none",
                            boxShadow: "none",
                            padding: 0,
                            margin: 0,
                            borderRadius: 0,
                          }}
                        >
                          <Star
                            size={13}
                            fill="#FFB800"
                            color="#FFB800"
                            strokeWidth={2}
                          />

                          <span
                            style={{
                              fontSize: "0.82rem",
                              fontWeight: "700",
                              color: "#ffffff",
                              background:
                                "transparent",
                            }}
                          >
                            {tyre.rating}
                          </span>
                        </div>
                      </div>

                      {/* Tyre Name */}
                      <h3
                        onClick={() =>
                          onSelectTyre(tyre)
                        }
                        style={{
                          fontSize: "1.25rem",
                          color: "#ffffff",
                          marginBottom: "6px",
                          cursor: "pointer",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) =>
                        (e.currentTarget.style.color =
                          "var(--accent-crimson-light)")
                        }
                        onMouseLeave={(e) =>
                        (e.currentTarget.style.color =
                          "#ffffff")
                        }
                      >
                        {tyre.name}
                      </h3>

                      {/* Size & Vehicle */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "16px",
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.76rem",
                            fontWeight: "700",
                            background:
                              "rgba(255, 255, 255, 0.05)",
                            padding: "3px 8px",
                            borderRadius: "6px",
                            color:
                              "var(--accent-cyan)",
                            border:
                              "1px solid rgba(91, 138, 131, 0.22)",
                          }}
                        >
                          {tyre.availableSizes[0]}
                        </span>

                        <span
                          style={{
                            fontSize: "0.76rem",
                            color: "var(--text-dim)",
                          }}
                        >
                          {tyre.vehicleType}
                        </span>
                      </div>

                      {/* Price & Details */}
                      <div
                        style={{
                          marginTop: "auto",
                          display: "flex",
                          alignItems: "center",
                          justifyContent:
                            "space-between",
                          gap: "10px",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "0.7rem",
                              color:
                                "var(--text-muted)",
                              textTransform:
                                "uppercase",
                            }}
                          >
                            Starting Price
                          </div>

                          <div
                            style={{
                              fontSize: "1.3rem",
                              fontWeight: "700",
                              color: "#ffffff",
                              fontFamily:
                                "var(--font-body)",
                              letterSpacing:
                                "normal",
                            }}
                          >
                            {displayPrice}
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            onSelectTyre(tyre)
                          }
                          className="btn btn-outline-crimson"
                          style={{
                            padding: "9px 16px",
                            fontSize: "0.8rem",
                            borderRadius: "8px",
                          }}
                        >
                          <Eye size={14} />
                          View Details
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

      {/* Component Styles */}
      <style>{`
        .product-card-hover {
          transition:
            transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.35s ease,
            border-color 0.3s ease;
        }

        .product-card-hover:hover {
          transform: translateY(-8px);
          box-shadow:
            0 20px 40px -10px rgba(0, 0, 0, 0.8),
            0 0 30px rgba(255, 42, 42, 0.3);
          border-color: rgba(255, 42, 42, 0.4);
        }

        .product-card-hover:hover .tyre-image-scale {
          transform: scale(1.09) rotate(2deg);
        }

        @media (max-width: 1024px) {
          .catalog-grid-3 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 640px) {
          .catalog-grid-3 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

