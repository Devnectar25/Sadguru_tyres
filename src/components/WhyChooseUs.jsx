import React from "react";
import { Cpu, ShieldCheck, Zap, Award, Disc3, Timer, CheckCircle } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      id: "tech",
      icon: Cpu,
      title: "Advanced Technology",
      stat: "4th Gen Silica",
      desc: "Nano-engineered silica polymers form molecular bonds with asphalt, dynamically adapting flexibility under shifting ambient temperatures.",
    },
    {
      id: "grip",
      icon: Disc3,
      title: "Superior Wet Grip",
      stat: "Class A Rated",
      desc: "Four wide longitudinal hydro-channels evacuate up to 34 liters of water per second at 100 km/h, preventing aquaplaning entirely.",
    },
    {
      id: "life",
      icon: Timer,
      title: "Extended Tread Life",
      stat: "80,000+ KM",
      desc: "Even-pressure footprint distribution prevents irregular shoulder wear, extending usable tread depth across multi-season driving.",
    },
    {
      id: "safety",
      icon: ShieldCheck,
      title: "Maximum Road Safety",
      stat: "Dual Steel Belts",
      desc: "Reinforced Kevlar sidewalls and dual high-tensile steel belts resist severe pothole punctures, curb pinches, and impact shocks.",
    },
    {
      id: "performance",
      icon: Zap,
      title: "Precision Performance",
      stat: "1.18G Lateral",
      desc: "Stiff outer shoulder blocks deliver razor-sharp turn-in steering response and track-day stability under high-speed cornering forces.",
    },
    {
      id: "quality",
      icon: Award,
      title: "Certified Indian Quality",
      stat: "BIS / ISI & ISO",
      desc: "Over 2.5 million kilometers of extreme endurance torture testing logged across Indian highway terrains and climate conditions.",
    },
  ];

  return (
    <section
      id="why-choose-us"
      style={{
        padding: "20px 0 25px 0",
        position: "relative",
        background: "linear-gradient(180deg, #07080b 0%, #0d1017 100%)",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="section-header animate-text-coming">
          <div className="section-eyebrow">
            <ShieldCheck size={16} />
            ENGINEERED WITHOUT COMPROMISE
          </div>
          <h2 className="animate-text-coming animate-delay-1">Why Drivers Choose Sadguru Tyres</h2>
          <p className="animate-text-coming animate-delay-2">
            From motorsport track days to luxury trans-continental touring, our tyres are benchmarked against the toughest standards in the automotive industry.
          </p>
        </div>

        {/* Feature Cards Grid (6 cards - Unified Platinum Silver / Titanium Palette) */}
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
                className="glass-card"
                style={{
                  padding: "36px 30px",
                  borderRadius: "18px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                {/* Unified Platinum Silver Glow Accent Corner */}
                <div
                  style={{
                    position: "absolute",
                    top: "-30px",
                    right: "-30px",
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.12)",
                    opacity: 0.25,
                    filter: "blur(30px)",
                    pointerEvents: "none",
                  }}
                />

                {/* Icon & Stat Pill */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "24px",
                  }}
                >
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.16)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ffffff",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.4)",
                    }}
                  >
                    <Icon size={26} color="#ffffff" />
                  </div>

                  <span
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: "700",
                      padding: "5px 14px",
                      borderRadius: "999px",
                      background: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.14)",
                      color: "#f1f5f9",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {item.stat}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: "1.3rem",
                    marginBottom: "12px",
                    color: "#ffffff",
                    fontWeight: "700",
                  }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: "0.92rem",
                    color: "var(--text-dim)",
                    lineHeight: 1.6,
                    marginBottom: "20px",
                  }}
                >
                  {item.desc}
                </p>

                {/* Footer Checkmark */}
                <div
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "0.78rem",
                    fontWeight: "600",
                    color: "var(--text-silver)",
                    paddingTop: "14px",
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <CheckCircle size={15} color="#e2e8f0" />
                  Factory Standard Testing Passed
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
