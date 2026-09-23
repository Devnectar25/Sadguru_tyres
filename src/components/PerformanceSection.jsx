import React, { useState } from "react";
import { Gauge, CloudRain, Sun, Snowflake, Activity, Zap, ShieldAlert, ArrowDownRight } from "lucide-react";

export default function PerformanceSection() {
  const [weatherMode, setWeatherMode] = useState("dry");

  const telemetryData = {
    dry: {
      title: "Dry Asphalt Telemetry",
      subtitle: "Peak thermal adhesion on hot dry surfaces",
      brakingDist: "32.4 m",
      brakingSaving: "-16% vs Competitor Average (38.5m)",
      brakingPercent: 88,
      lateralG: "1.18 G",
      lateralPercent: 94,
      acousticNoise: "66 dB",
      noisePercent: 85,
      wearResistance: "96%",
      temperatureRating: "Optimal at 28°C - 85°C",
      accent: "#ef4444",
    },
    wet: {
      title: "Monsoon Wet Telemetry",
      subtitle: "Full throttle water dispersal without hydroplaning",
      brakingDist: "35.8 m",
      brakingSaving: "-19% vs Competitor Average (44.2m)",
      brakingPercent: 82,
      lateralG: "1.02 G",
      lateralPercent: 84,
      acousticNoise: "68 dB",
      noisePercent: 78,
      wearResistance: "92%",
      temperatureRating: "Active silica hydro-bite at 10°C - 35°C",
      accent: "#0284c7",
    },
    snow: {
      title: "Sub-Zero & Ice Telemetry",
      subtitle: "Micro-sipe adhesion on frozen compacted snow",
      brakingDist: "41.2 m",
      brakingSaving: "-22% vs All-Season Standard (53.0m)",
      brakingPercent: 72,
      lateralG: "0.85 G",
      lateralPercent: 70,
      acousticNoise: "67 dB",
      noisePercent: 82,
      wearResistance: "89%",
      temperatureRating: "Flexible cryo-polymer down to -35°C",
      accent: "#7c3aed",
    },
  };

  const current = telemetryData[weatherMode];

  return (
    <section
      id="performance"
      style={{
        padding: "36px 0",
        position: "relative",
        background: "#ffffff",
        borderTop: "1px solid #e2e8f0",
        borderBottom: "1px solid #e2e8f0",
        overflow: "hidden",
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 5 }}>
        {/* Header */}
        <div className="section-header" style={{ marginBottom: "32px" }}>
          <div className="section-eyebrow">
            LIVE TELEMETRY & CHASSIS BENCHMARKS
          </div>
          <h2>Proven Under Extreme Dynamics</h2>
          <p>
            Toggle real-time environmental simulations to observe how Sadguru tyres maintain road contact patches and braking efficiency under shifting track conditions.
          </p>
        </div>

        {/* Weather Simulator Mode Switcher */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            marginBottom: "40px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setWeatherMode("dry")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 24px",
              borderRadius: "9999px",
              background: weatherMode === "dry" ? "linear-gradient(135deg, #ef4444, #dc2626)" : "#ffffff",
              border: weatherMode === "dry" ? "none" : "1px solid #cbd5e1",
              color: weatherMode === "dry" ? "#ffffff" : "#0f172a",
              fontWeight: "700",
              cursor: "pointer",
              transition: "var(--transition-smooth)",
              boxShadow: weatherMode === "dry" ? "0 6px 20px rgba(239, 68, 68, 0.3)" : "0 2px 6px rgba(15, 23, 42, 0.04)",
            }}
          >
            <Sun size={18} color={weatherMode === "dry" ? "#ffffff" : "#ef4444"} />
            Dry Track / High Speed
          </button>

          <button
            onClick={() => setWeatherMode("wet")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 24px",
              borderRadius: "9999px",
              background: weatherMode === "wet" ? "linear-gradient(135deg, #0284c7, #0369a1)" : "#ffffff",
              border: weatherMode === "wet" ? "none" : "1px solid #cbd5e1",
              color: weatherMode === "wet" ? "#ffffff" : "#0f172a",
              fontWeight: "700",
              cursor: "pointer",
              transition: "var(--transition-smooth)",
              boxShadow: weatherMode === "wet" ? "0 6px 20px rgba(2, 132, 199, 0.3)" : "0 2px 6px rgba(15, 23, 42, 0.04)",
            }}
          >
            <CloudRain size={18} color={weatherMode === "wet" ? "#ffffff" : "#0284c7"} />
            Monsoon Torrential Rain
          </button>

          <button
            onClick={() => setWeatherMode("snow")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 24px",
              borderRadius: "9999px",
              background: weatherMode === "snow" ? "linear-gradient(135deg, #7c3aed, #6d28d9)" : "#ffffff",
              border: weatherMode === "snow" ? "none" : "1px solid #cbd5e1",
              color: weatherMode === "snow" ? "#ffffff" : "#0f172a",
              fontWeight: "700",
              cursor: "pointer",
              transition: "var(--transition-smooth)",
              boxShadow: weatherMode === "snow" ? "0 6px 20px rgba(124, 58, 237, 0.3)" : "0 2px 6px rgba(15, 23, 42, 0.04)",
            }}
          >
            <Snowflake size={18} color={weatherMode === "snow" ? "#ffffff" : "#7c3aed"} />
            Sub-Zero Ice & Snow
          </button>
        </div>

        {/* Telemetry Dashboard Display */}
        <div
          style={{
            padding: "40px",
            background: "#f8fafc",
            borderRadius: "24px",
            border: `1px solid #e2e8f0`,
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
            transition: "all 0.4s ease",
          }}
        >
          {/* Telemetry Title & Status */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
              paddingBottom: "24px",
              borderBottom: "1px solid #e2e8f0",
              marginBottom: "32px",
            }}
          >
            <div>
              <div style={{ fontSize: "0.8rem", color: current.accent, fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                ACTIVE SIMULATION ENGINE
              </div>
              <h3 style={{ fontSize: "1.75rem", color: "#0f172a", marginTop: "4px", fontWeight: "800" }}>
                {current.title}
              </h3>
              <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
                {current.subtitle}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 18px",
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: "9999px",
                fontSize: "0.82rem",
                fontWeight: "700",
                color: "#0f172a",
                boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: current.accent,
                }}
              />
              {current.temperatureRating}
            </div>
          </div>

          {/* Telemetry Metrics Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
              marginBottom: "32px",
            }}
          >
            {/* Metric 1 */}
            <div
              style={{
                padding: "24px",
                background: "#ffffff",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b", fontSize: "0.78rem", fontWeight: "700", textTransform: "uppercase", marginBottom: "8px" }}>
                <span>100-0 km/h Braking</span>
                <ArrowDownRight size={16} color={current.accent} />
              </div>
              <div style={{ fontSize: "2.1rem", fontWeight: "800", color: "#0f172a" }}>
                {current.brakingDist}
              </div>
              <div style={{ fontSize: "0.78rem", color: current.accent, fontWeight: "700", marginTop: "4px", marginBottom: "14px" }}>
                {current.brakingSaving}
              </div>
              <div style={{ height: "6px", background: "#f1f5f9", borderRadius: "3px", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${current.brakingPercent}%`,
                    background: current.accent,
                    borderRadius: "3px",
                  }}
                />
              </div>
            </div>

            {/* Metric 2 */}
            <div
              style={{
                padding: "24px",
                background: "#ffffff",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b", fontSize: "0.78rem", fontWeight: "700", textTransform: "uppercase", marginBottom: "8px" }}>
                <span>Lateral G-Force</span>
                <Gauge size={16} color={current.accent} />
              </div>
              <div style={{ fontSize: "2.1rem", fontWeight: "800", color: "#0f172a" }}>
                {current.lateralG}
              </div>
              <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: "500", marginTop: "4px", marginBottom: "14px" }}>
                Track Skidpad Maximum Slip Angle
              </div>
              <div style={{ height: "6px", background: "#f1f5f9", borderRadius: "3px", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${current.lateralPercent}%`,
                    background: current.accent,
                    borderRadius: "3px",
                  }}
                />
              </div>
            </div>

            {/* Metric 3 */}
            <div
              style={{
                padding: "24px",
                background: "#ffffff",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b", fontSize: "0.78rem", fontWeight: "700", textTransform: "uppercase", marginBottom: "8px" }}>
                <span>Cabin Resonance</span>
                <Zap size={16} color={current.accent} />
              </div>
              <div style={{ fontSize: "2.1rem", fontWeight: "800", color: "#0f172a" }}>
                {current.acousticNoise}
              </div>
              <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: "500", marginTop: "4px", marginBottom: "14px" }}>
                Sound-Dampening Foam Cancellation
              </div>
              <div style={{ height: "6px", background: "#f1f5f9", borderRadius: "3px", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${current.noisePercent}%`,
                    background: current.accent,
                    borderRadius: "3px",
                  }}
                />
              </div>
            </div>

            {/* Metric 4 */}
            <div
              style={{
                padding: "24px",
                background: "#ffffff",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 15px rgba(15, 23, 42, 0.03)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b", fontSize: "0.78rem", fontWeight: "700", textTransform: "uppercase", marginBottom: "8px" }}>
                <span>Thermal Uniformity</span>
                <Activity size={16} color={current.accent} />
              </div>
              <div style={{ fontSize: "2.1rem", fontWeight: "800", color: "#0f172a" }}>
                {current.wearResistance}
              </div>
              <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: "500", marginTop: "4px", marginBottom: "14px" }}>
                Even-Footprint Pressure Mapping
              </div>
              <div style={{ height: "6px", background: "#f1f5f9", borderRadius: "3px", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: "95%",
                    background: current.accent,
                    borderRadius: "3px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Telemetry Footer Callout */}
          <div
            style={{
              padding: "16px 20px",
              borderRadius: "12px",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
              fontSize: "0.85rem",
              color: "#64748b",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ShieldAlert size={16} color={current.accent} />
              <span>Tested on 245/40 R19 fitted to an AWD test vehicle on calibrated dynamometer.</span>
            </div>
            <span style={{ color: "#0f172a", fontWeight: "700" }}>DIN 70020 Standard Verified</span>
          </div>
        </div>
      </div>
    </section>
  );
}
