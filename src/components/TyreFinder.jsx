import React, { useState } from "react";
import { FINDER_DATA } from "../data/finderData";
import { Search, Car, Truck, Zap, Shield, Disc, CheckCircle2, ChevronRight } from "lucide-react";

export default function TyreFinder({ onFilterApply }) {
  const [vehicleType, setVehicleType] = useState("sedan");
  const [brand, setBrand] = useState("bmw");
  const [model, setModel] = useState("3 Series / M3");
  const [size, setSize] = useState("245/40 R19");
  const [isSearching, setIsSearching] = useState(false);
  const [foundMatchMessage, setFoundMatchMessage] = useState(null);

  const availableBrands = FINDER_DATA.brands[vehicleType] || [];
  const currentBrandObj = availableBrands.find((b) => b.id === brand) || availableBrands[0];
  const availableModels = currentBrandObj ? currentBrandObj.models : [];

  const handleVehicleTypeChange = (newType) => {
    setVehicleType(newType);
    const firstBrand = FINDER_DATA.brands[newType]?.[0];
    if (firstBrand) {
      setBrand(firstBrand.id);
      setModel(firstBrand.models[0] || "");
    }
  };

  const handleBrandChange = (e) => {
    const newBrandId = e.target.value;
    setBrand(newBrandId);
    const brandObj = availableBrands.find((b) => b.id === newBrandId);
    if (brandObj && brandObj.models.length > 0) {
      setModel(brandObj.models[0]);
    }
  };

  const handleFindTyres = () => {
    setIsSearching(true);
    setFoundMatchMessage(null);

    setTimeout(() => {
      setIsSearching(false);
      setFoundMatchMessage(`Found 4 OEM-Approved tyres for ${currentBrandObj?.name} ${model} (${size})`);
      if (onFilterApply) {
        onFilterApply({ vehicleType, brand, model, size });
      }

      const productsElem = document.getElementById("products");
      if (productsElem) {
        productsElem.scrollIntoView({ behavior: "smooth" });
      }
    }, 600);
  };

  return (
    <section
      id="finder"
      style={{
        padding: "36px 0",
        position: "relative",
        background: "#ffffff",
        borderTop: "1px solid #e2e8f0",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: "32px" }}>
          <div className="section-eyebrow">
            FITMENT MATCHING SYSTEM
          </div>
          <h2>Find Perfect Tyres For Your Vehicle</h2>
          <p>Select your vehicle parameters to find 100% factory-compatible tyres with precision guarantees.</p>
        </div>

        {/* Finder Container */}
        <div
          style={{
            padding: "36px",
            background: "#f8fafc",
            borderRadius: "24px",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
            border: "1px solid #e2e8f0",
          }}
        >
          {/* Step 1: Vehicle Type Tab Switcher */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            {FINDER_DATA.vehicleTypes.map((type) => {
              const isSelected = vehicleType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => handleVehicleTypeChange(type.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    padding: "14px 18px",
                    borderRadius: "14px",
                    cursor: "pointer",
                    transition: "var(--transition-smooth)",
                    background: isSelected
                      ? "linear-gradient(135deg, #ef4444, #dc2626)"
                      : "#ffffff",
                    border: isSelected
                      ? "none"
                      : "1px solid #cbd5e1",
                    color: isSelected ? "#ffffff" : "#0f172a",
                    fontWeight: isSelected ? "700" : "600",
                    fontSize: "0.88rem",
                    boxShadow: isSelected ? "0 6px 20px rgba(239, 68, 68, 0.3)" : "0 2px 6px rgba(15, 23, 42, 0.04)",
                  }}
                >
                  {type.id === "sedan" && <Car size={18} color={isSelected ? "#ffffff" : "#0f172a"} />}
                  {type.id === "suv" && <Truck size={18} color={isSelected ? "#ffffff" : "#0f172a"} />}
                  {type.id === "bike" && <Disc size={18} color={isSelected ? "#ffffff" : "#0f172a"} />}
                  {type.id === "ev" && <Zap size={18} color={isSelected ? "#ffffff" : "#0f172a"} />}
                  {type.id === "van" && <Shield size={18} color={isSelected ? "#ffffff" : "#0f172a"} />}
                  {type.name}
                </button>
              );
            })}
          </div>

          {/* Step 2, 3, 4 Inputs Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
              gap: "20px",
              alignItems: "flex-end",
            }}
          >
            {/* Make / Brand */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#0f172a",
                  marginBottom: "8px",
                }}
              >
                1. Vehicle Make
              </label>
              <select
                value={brand}
                onChange={handleBrandChange}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  background: "#ffffff",
                  border: "1px solid #cbd5e1",
                  color: "#0f172a",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                {availableBrands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Model */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#0f172a",
                  marginBottom: "8px",
                }}
              >
                2. Model Series
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  background: "#ffffff",
                  border: "1px solid #cbd5e1",
                  color: "#0f172a",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                {availableModels.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Tyre Rim Size */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.8rem",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#0f172a",
                  marginBottom: "8px",
                }}
              >
                3. Tyre Rim Dimension
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  background: "#ffffff",
                  border: "1px solid #cbd5e1",
                  color: "#0f172a",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                {FINDER_DATA.sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Find Tyres Button */}
            <div>
              <button
                onClick={handleFindTyres}
                disabled={isSearching}
                style={{
                  width: "100%",
                  padding: "15px 20px",
                  fontSize: "0.95rem",
                  fontWeight: "700",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  borderRadius: "9999px",
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  color: "#ffffff",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(239, 68, 68, 0.3)",
                  transition: "var(--transition-smooth)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(239, 68, 68, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(239, 68, 68, 0.3)";
                }}
              >
                {isSearching ? (
                  <>
                    <span
                      style={{
                        display: "inline-block",
                        width: "16px",
                        height: "16px",
                        border: "2px solid #fff",
                        borderTopColor: "transparent",
                        borderRadius: "50%",
                        animation: "spinSlow 1s linear infinite",
                      }}
                    />
                    Scanning Fitments...
                  </>
                ) : (
                  <>
                    <Search size={18} />
                    FIND TYRES
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Match Confirmation Banner */}
          {foundMatchMessage && (
            <div
              style={{
                marginTop: "24px",
                padding: "14px 20px",
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "#1e40af",
                fontSize: "0.9rem",
                fontWeight: "600",
                animation: "fadeIn 0.3s ease-out",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <CheckCircle2 size={18} color="#2563eb" />
                <span>{foundMatchMessage}</span>
              </div>
              <a
                href="#products"
                style={{
                  color: "#ef4444",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                View Matches <ChevronRight size={16} />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
