import React, { useState } from "react";
import { FINDER_DATA } from "../data/finderData";
import { Search, Compass, Car, Truck, Zap, Shield, Disc, CheckCircle2, ChevronRight } from "lucide-react";

export default function TyreFinder({ onFilterApply }) {
  const [vehicleType, setVehicleType] = useState("sedan");
  const [brand, setBrand] = useState("bmw");
  const [model, setModel] = useState("3 Series / M3");
  const [size, setSize] = useState("245/40 R19");
  const [isSearching, setIsSearching] = useState(false);
  const [foundMatchMessage, setFoundMatchMessage] = useState(null);

  // Available brands based on chosen vehicle type
  const availableBrands = FINDER_DATA.brands[vehicleType] || [];
  
  // Available models based on chosen brand
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

      // Smooth scroll to products section
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
        padding: "36px 0 50px 0",
        position: "relative",
        background: "linear-gradient(180deg, #06070a 0%, #0c0f16 100%)",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", marginBottom: 0 }}>
            Find Perfect Tyres For Your Vehicle
          </h2>
        </div>

        {/* Finder Glass Container */}
        <div
          className="glass-panel"
          style={{
            padding: "32px",
            background: "rgba(14, 18, 26, 0.8)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.7), 0 0 25px rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
          }}
        >
          {/* Step 1: Vehicle Type Tab Switcher */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "12px",
              marginBottom: "30px",
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
                    borderRadius: "10px",
                    cursor: "pointer",
                    transition: "var(--transition-smooth)",
                    background: isSelected
                      ? "linear-gradient(135deg, #ffffff, #e2e8f0)"
                      : "rgba(255, 255, 255, 0.04)",
                    border: isSelected
                      ? "1px solid #ffffff"
                      : "1px solid rgba(255, 255, 255, 0.08)",
                    color: isSelected ? "#07080b" : "var(--text-silver)",
                    fontWeight: isSelected ? "700" : "500",
                    fontSize: "0.88rem",
                    boxShadow: isSelected ? "0 4px 15px rgba(255, 255, 255, 0.2)" : "none",
                  }}
                >
                  {type.id === "sedan" && <Car size={18} color={isSelected ? "#07080b" : "currentColor"} />}
                  {type.id === "suv" && <Truck size={18} color={isSelected ? "#07080b" : "currentColor"} />}
                  {type.id === "bike" && <Disc size={18} color={isSelected ? "#07080b" : "currentColor"} />}
                  {type.id === "ev" && <Zap size={18} color={isSelected ? "#07080b" : "currentColor"} />}
                  {type.id === "van" && <Shield size={18} color={isSelected ? "#07080b" : "currentColor"} />}
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
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--text-silver)",
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
                  borderRadius: "8px",
                  background: "#121722",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#ffffff",
                  fontSize: "0.95rem",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                {availableBrands.map((b) => (
                  <option key={b.id} value={b.id} style={{ background: "#121722", color: "#fff" }}>
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
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--text-silver)",
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
                  borderRadius: "8px",
                  background: "#121722",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#ffffff",
                  fontSize: "0.95rem",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                {availableModels.map((m) => (
                  <option key={m} value={m} style={{ background: "#121722", color: "#fff" }}>
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
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "var(--text-silver)",
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
                  borderRadius: "8px",
                  background: "#121722",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#ffffff",
                  fontSize: "0.95rem",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                {FINDER_DATA.sizes.map((s) => (
                  <option key={s} value={s} style={{ background: "#121722", color: "#fff" }}>
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
                className="btn btn-primary"
                style={{
                  width: "100%",
                  padding: "15px 20px",
                  fontSize: "0.95rem",
                  letterSpacing: "0.06em",
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
                    Find Tyres
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
                background: "rgba(0, 240, 255, 0.08)",
                border: "1px solid rgba(0, 240, 255, 0.3)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "#ffffff",
                fontSize: "0.9rem",
                animation: "fadeIn 0.3s ease-out",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <CheckCircle2 size={18} color="var(--accent-cyan)" />
                <span>{foundMatchMessage}</span>
              </div>
              <a
                href="#products"
                style={{
                  color: "var(--accent-cyan)",
                  fontWeight: "600",
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
