import React from "react";
import { Cpu, ShieldCheck, Zap, Award, Disc3, Timer, CheckCircle } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      id: "tech",
      num: "01",
      icon: Cpu,
      title: "Advanced Technology",
      stat: "Factory Tested | Industry Proven",
      desc: "Nano-engineered silica polymers form molecular bonds with asphalt, dynamically adapting flexibility under shifting ambient temperatures.",
      accent: "#ef4444",
      bgLight: "#fef2f2",
      borderLight: "#fecaca",
      pillBg: "#fff5f5",
      pillBorder: "#fee2e2",
      pillText: "#dc2626",
      glow: "rgba(239, 68, 68, 0.14)",
    },
    {
      id: "grip",
      num: "02",
      icon: Disc3,
      title: "Superior Wet Grip",
      stat: "Safety First | Unmatched Stability",
      desc: "Four wide longitudinal hydro-channels evacuate up to 34 liters of water per second at 100 km/h, preventing aquaplaning entirely.",
      accent: "#ef4444",
      bgLight: "#fef2f2",
      borderLight: "#fecaca",
      pillBg: "#fff5f5",
      pillBorder: "#fee2e2",
      pillText: "#dc2626",
      glow: "rgba(239, 68, 68, 0.14)",
    },
    {
      id: "life",
      num: "03",
      icon: Timer,
      title: "Extended Tread Life",
      stat: "Longer Life | Better Value",
      desc: "Even-pressure footprint distribution prevents irregular shoulder wear, extending usable tread depth across multi-season driving.",
      accent: "#ef4444",
      bgLight: "#fef2f2",
      borderLight: "#fecaca",
      pillBg: "#fff5f5",
      pillBorder: "#fee2e2",
      pillText: "#dc2626",
      glow: "rgba(239, 68, 68, 0.14)",
    },
    {
      id: "safety",
      num: "04",
      icon: ShieldCheck,
      title: "Maximum Road Safety",
      stat: "Reliable | Certified Standards",
      desc: "Reinforced Kevlar sidewalls and dual high-tensile steel belts resist severe pothole punctures, curb pinches, and impact shocks.",
      accent: "#ef4444",
      bgLight: "#fef2f2",
      borderLight: "#fecaca",
      pillBg: "#fff5f5",
      pillBorder: "#fee2e2",
      pillText: "#dc2626",
      glow: "rgba(239, 68, 68, 0.14)",
    },
    {
      id: "performance",
      num: "05",
      icon: Zap,
      title: "Precision Performance",
      stat: "Engineered for Excellence",
      desc: "Stiff outer shoulder blocks deliver razor-sharp turn-in steering response and track-day stability under high-speed cornering forces.",
      accent: "#ef4444",
      bgLight: "#fef2f2",
      borderLight: "#fecaca",
      pillBg: "#fff5f5",
      pillBorder: "#fee2e2",
      pillText: "#dc2626",
      glow: "rgba(239, 68, 68, 0.14)",
    },
    {
      id: "quality",
      num: "06",
      icon: Award,
      title: "Certified Indian Quality",
      stat: "Trusted | Quality Assured",
      desc: "Over 2.5 million kilometers of extreme endurance torture testing logged across Indian highway terrains and climate conditions.",
      accent: "#ef4444",
      bgLight: "#fef2f2",
      borderLight: "#fecaca",
      pillBg: "#fff5f5",
      pillBorder: "#fee2e2",
      pillText: "#dc2626",
      glow: "rgba(239, 68, 68, 0.14)",
    },
  ];

  return (
    <section
      id="why-choose-us"
      style={{
        padding: "48px 0",
        position: "relative",
        background: "#ffffff",
        borderTop: "1px solid #e2e8f0",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ marginBottom: "40px" }}>
          <div className="section-eyebrow">
            WHY CHOOSE US
          </div>
          <h2>Why Drivers Choose Sadguru Tyres</h2>
          <p>
            From motorsport roads to everyday commutes, our tyres are built for performance, safety, and long-lasting value — because you deserve the best.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
          }}
        >
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                style={{
                  padding: "32px 28px",
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderTop: `3.5px solid ${item.accent}`,
                  boxShadow: "0 6px 20px rgba(15, 23, 42, 0.04)",
                  transition: "var(--transition-smooth)",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.borderColor = item.borderLight;
                  e.currentTarget.style.borderTopColor = item.accent;
                  e.currentTarget.style.boxShadow = `0 18px 36px ${item.glow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.borderTopColor = item.accent;
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(15, 23, 42, 0.04)";
                }}
              >
                {/* Top Corner Watermark Number */}
                <div
                  style={{
                    position: "absolute",
                    top: "22px",
                    right: "26px",
                    fontSize: "1.25rem",
                    fontWeight: "900",
                    color: item.accent,
                    opacity: 0.22,
                    letterSpacing: "-0.03em",
                    userSelect: "none",
                  }}
                >
                  {item.num}
                </div>

                {/* Icon Container */}
                <div
                  style={{
                    width: "54px",
                    height: "54px",
                    borderRadius: "14px",
                    background: item.bgLight,
                    border: `1px solid ${item.borderLight}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: item.accent,
                    marginBottom: "22px",
                    boxShadow: `0 4px 12px ${item.glow}`,
                  }}
                >
                  <Icon size={26} strokeWidth={2.2} />
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: "1.25rem",
                    marginBottom: "10px",
                    color: "#0f172a",
                    fontWeight: "800",
                  }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: "0.92rem",
                    color: "#64748b",
                    lineHeight: 1.62,
                    marginBottom: "24px",
                  }}
                >
                  {item.desc}
                </p>

                {/* Stat Pill Footer */}
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "16px",
                    borderTop: "1px solid #f1f5f9",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "7px 14px",
                      borderRadius: "10px",
                      background: item.pillBg,
                      border: `1px solid ${item.pillBorder}`,
                      fontSize: "0.82rem",
                      fontWeight: "700",
                      color: item.pillText,
                    }}
                  >
                    <CheckCircle size={15} color={item.accent} strokeWidth={2.4} />
                    <span>{item.stat}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
