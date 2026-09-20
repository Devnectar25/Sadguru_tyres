import React, { useState } from "react";
import { Gauge, CloudRain, Sun, Snowflake, Activity, Zap, ShieldAlert, ArrowDownRight } from "lucide-react";

export default function PerformanceSection() {
  const [weatherMode, setWeatherMode] = useState("dry");

  // Dynamic telemetry data according to weather condition
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
      accent: "var(--accent-crimson)",
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
      accent: "var(--accent-cyan)",
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
      accent: "#A78BFA",
    },
  };

  const current = telemetryData[weatherMode];

  return (
    <section
      id="performance"
      style={{
        padding: "25px 0 30px 0",
        position: "relative",
        background: "radial-gradient(ellipse at 50% 30%, rgba(17, 24, 38, 0.95) 0%, #06070a 100%)",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        overflow: "hidden",
      }}
    >
      {/* Background Neon Grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(255, 42, 42, 0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 5 }}>
        {/* Header */}
        <div className="section-header" style={{ marginBottom: "28px" }}>
          <div className="section-eyebrow">
            <Activity size={16} />
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
            marginBottom: "48px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setWeatherMode("dry")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 26px",
              borderRadius: "12px",
              background: weatherMode === "dry" ? "rgba(255, 42, 42, 0.2)" : "rgba(255, 255, 255, 0.04)",
              border: weatherMode === "dry" ? "1px solid var(--accent-crimson)" : "1px solid rgba(255, 255, 255, 0.08)",
              color: weatherMode === "dry" ? "#ffffff" : "var(--text-dim)",
              fontWeight: "700",
              cursor: "pointer",
              transition: "var(--transition-smooth)",
              boxShadow: weatherMode === "dry" ? "0 0 20px rgba(255, 42, 42, 0.3)" : "none",
            }}
          >
            <Sun size={18} color={weatherMode === "dry" ? "var(--accent-crimson)" : "currentColor"} />
            Dry Track / High Speed
          </button>

          <button
            onClick={() => setWeatherMode("wet")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 26px",
              borderRadius: "12px",
              background: weatherMode === "wet" ? "rgba(0, 240, 255, 0.2)" : "rgba(255, 255, 255, 0.04)",
              border: weatherMode === "wet" ? "1px solid var(--accent-cyan)" : "1px solid rgba(255, 255, 255, 0.08)",
              color: weatherMode === "wet" ? "#ffffff" : "var(--text-dim)",
              fontWeight: "700",
              cursor: "pointer",
              transition: "var(--transition-smooth)",
              boxShadow: weatherMode === "wet" ? "0 0 20px rgba(0, 240, 255, 0.3)" : "none",
            }}
          >
            <CloudRain size={18} color={weatherMode === "wet" ? "var(--accent-cyan)" : "currentColor"} />
            Monsoon Torrential Rain
          </button>

          <button
            onClick={() => setWeatherMode("snow")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 26px",
              borderRadius: "12px",
              background: weatherMode === "snow" ? "rgba(167, 139, 250, 0.2)" : "rgba(255, 255, 255, 0.04)",
              border: weatherMode === "snow" ? "1px solid #A78BFA" : "1px solid rgba(255, 255, 255, 0.08)",
              color: weatherMode === "snow" ? "#ffffff" : "var(--text-dim)",
              fontWeight: "700",
              cursor: "pointer",
              transition: "var(--transition-smooth)",
              boxShadow: weatherMode === "snow" ? "0 0 20px rgba(167, 139, 250, 0.3)" : "none",
            }}
          >
            <Snowflake size={18} color={weatherMode === "snow" ? "#A78BFA" : "currentColor"} />
            Sub-Zero Ice & Snow
          </button>
        </div>

        {/* Telemetry Dashboard Display */}
        <div
          className="glass-panel"
          style={{
            padding: "44px",
            background: "rgba(12, 16, 24, 0.85)",
            border: `1px solid ${current.accent}44`,
            boxShadow: `0 20px 50px rgba(0, 0, 0, 0.8), 0 0 40px ${current.accent}22`,
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
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              marginBottom: "36px",
            }}
          >
            <div>
              <div style={{ fontSize: "0.8rem", color: current.accent, fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                ACTIVE SIMULATION ENGINE
              </div>
              <h3 style={{ fontSize: "1.75rem", color: "#ffffff", marginTop: "4px", fontFamily: "var(--font-body)", fontWeight: "700", letterSpacing: "normal" }}>
                {current.title}
              </h3>
              <p style={{ color: "var(--text-dim)", fontSize: "0.95rem" }}>
                {current.subtitle}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 18px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "999px",
                fontSize: "0.82rem",
                fontWeight: "600",
                color: "#ffffff",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: current.accent,
                  boxShadow: `0 0 10px ${current.accent}`,
                  animation: "pulseSlow 2s infinite",
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
              gap: "28px",
              marginBottom: "36px",
            }}
          >
            {/* Metric 1: Braking Distance */}
            <div
              style={{
                padding: "24px",
                background: "rgba(0, 0, 0, 0.4)",
                borderRadius: "14px",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.78rem", textTransform: "uppercase", marginBottom: "8px" }}>
                <span>100-0 km/h Braking</span>
                <ArrowDownRight size={16} color={current.accent} />
              </div>
              <div style={{ fontSize: "2.1rem", fontWeight: "700", color: "#ffffff", fontFamily: "var(--font-body)", letterSpacing: "normal" }}>
                {current.brakingDist}
              </div>
              <div style={{ fontSize: "0.78rem", color: current.accent, fontWeight: "600", marginTop: "4px", marginBottom: "14px" }}>
                {current.brakingSaving}
              </div>
              {/* Progress Bar */}
              <div style={{ height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "3px", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${current.brakingPercent}%`,
                    background: current.accent,
                    borderRadius: "3px",
                    transition: "width 0.5s ease-out",
                  }}
                />
              </div>
            </div>

            {/* Metric 2: Lateral Cornering G */}
            <div
              style={{
                padding: "24px",
                background: "rgba(0, 0, 0, 0.4)",
                borderRadius: "14px",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.78rem", textTransform: "uppercase", marginBottom: "8px" }}>
                <span>Lateral G-Force</span>
                <Gauge size={16} color={current.accent} />
              </div>
              <div style={{ fontSize: "2.1rem", fontWeight: "700", color: "#ffffff", fontFamily: "var(--font-body)", letterSpacing: "normal" }}>
                {current.lateralG}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", fontWeight: "500", marginTop: "4px", marginBottom: "14px" }}>
                Track Skidpad Maximum Slip Angle
              </div>
              <div style={{ height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "3px", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${current.lateralPercent}%`,
                    background: current.accent,
                    borderRadius: "3px",
                    transition: "width 0.5s ease-out",
                  }}
                />
              </div>
            </div>

            {/* Metric 3: Cabin Acoustic Noise */}
            <div
              style={{
                padding: "24px",
                background: "rgba(0, 0, 0, 0.4)",
                borderRadius: "14px",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.78rem", textTransform: "uppercase", marginBottom: "8px" }}>
                <span>Cabin Resonance</span>
                <Zap size={16} color={current.accent} />
              </div>
              <div style={{ fontSize: "2.1rem", fontWeight: "700", color: "#ffffff", fontFamily: "var(--font-body)", letterSpacing: "normal" }}>
                {current.acousticNoise}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", fontWeight: "500", marginTop: "4px", marginBottom: "14px" }}>
                Sound-Dampening Foam Cancellation
              </div>
              <div style={{ height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "3px", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${current.noisePercent}%`,
                    background: current.accent,
                    borderRadius: "3px",
                    transition: "width 0.5s ease-out",
                  }}
                />
              </div>
            </div>

            {/* Metric 4: Thermal Wear Resistance */}
            <div
              style={{
                padding: "24px",
                background: "rgba(0, 0, 0, 0.4)",
                borderRadius: "14px",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.78rem", textTransform: "uppercase", marginBottom: "8px" }}>
                <span>Thermal Uniformity</span>
                <Activity size={16} color={current.accent} />
              </div>
              <div style={{ fontSize: "2.1rem", fontWeight: "700", color: "#ffffff", fontFamily: "var(--font-body)", letterSpacing: "normal" }}>
                {current.wearResistance}
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", fontWeight: "500", marginTop: "4px", marginBottom: "14px" }}>
                Even-Footprint Pressure Mapping
              </div>
              <div style={{ height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "3px", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: "95%",
                    background: current.accent,
                    borderRadius: "3px",
                    transition: "width 0.5s ease-out",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Telemetry Footer Callout */}
          <div
            style={{
              padding: "16px 20px",
              borderRadius: "10px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
              fontSize: "0.85rem",
              color: "var(--text-dim)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ShieldAlert size={16} color={current.accent} />
              <span>Tested on 245/40 R19 fitted to an AWD test mule on calibrated dynamometer and wet skidpad.</span>
            </div>
            <span style={{ color: "#ffffff", fontWeight: "600" }}>DIN 70020 Standard Verified</span>
          </div>
        </div>
      </div>
    </section>
  );
}
