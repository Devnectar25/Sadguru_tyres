import React from "react";
import { SERVICES_DATA } from "../data/servicesData";
import { Check, Cpu, ArrowRight } from "lucide-react";

export default function ServicesSection({ onBookService }) {

  return (
    <section
      id="services"
      style={{
        padding: "30px 0",
        position: "relative",
        background: "#f8fafc",
        scrollMarginTop: "85px",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: "26px" }}>
          <div className="section-eyebrow">
            24/7 SUPPORT & INSTALLATION
          </div>
          <h2>Specialized Tyre & Wheel Services</h2>
          <p>
            Equipped with 3D laser alignment and modern touchless tools to deliver premium service for your vehicle.
          </p>
        </div>

        {/* Services Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {SERVICES_DATA.slice(0, 3).map((service) => {
            return (
              <div
                key={service.id}
                className="service-card"
                style={{
                  padding: "22px 22px 18px",
                  borderRadius: "20px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  background: "#ffffff",
                  border: "1px solid #cbd5e1",
                  boxShadow: "0 6px 20px rgba(15, 23, 42, 0.05)",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.borderColor = "#f87171";
                  e.currentTarget.style.boxShadow =
                    "0 16px 36px rgba(239, 68, 68, 0.12), 0 4px 12px rgba(15, 23, 42, 0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#cbd5e1";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(15, 23, 42, 0.05)";
                }}
              >
                {/* Top Subtle Red Accent Line */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: "linear-gradient(90deg, #ef4444 0%, #dc2626 50%, #f87171 100%)",
                  }}
                />

                {/* Top Row: Vibrant Red Badge + Duration */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "14px",
                  }}
                >
                  {/* Solid Vibrant Red Pill Badge */}
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: "800",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      padding: "5px 14px",
                      borderRadius: "9999px",
                      background: "#ef4444",
                      color: "#ffffff",
                      boxShadow: "0 2px 8px rgba(239, 68, 68, 0.25)",
                    }}
                  >
                    {service.badge}
                  </span>

                  {/* Duration Pill Indicator */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      fontSize: "0.72rem",
                      color: "#64748b",
                      fontWeight: "600",
                      background: "#f8fafc",
                      padding: "4px 10px",
                      borderRadius: "999px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <span>{service.duration}</span>
                  </div>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: "1.15rem",
                    marginBottom: "6px",
                    color: "#0f172a",
                    fontWeight: "800",
                    lineHeight: 1.25,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "#475569",
                    lineHeight: 1.48,
                    marginBottom: "10px",
                  }}
                >
                  {service.shortDesc}
                </p>

                {/* Equipment Station Tag */}
                <div
                  style={{
                    fontSize: "0.74rem",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    padding: "6px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "14px",
                  }}
                >
                  <Cpu size={13} color="#ef4444" style={{ flexShrink: 0 }} />
                  <span style={{ color: "#64748b", fontWeight: "600" }}>Station:</span>
                  <span style={{ color: "#0f172a", fontWeight: "700" }}>{service.equipment}</span>
                </div>

                {/* Key Benefits List with Styled Check Badges */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "7px",
                    marginBottom: "18px",
                  }}
                >
                  {service.benefits.slice(0, 3).map((benefit, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                        fontSize: "0.8rem",
                        color: "#334155",
                        lineHeight: 1.35,
                      }}
                    >
                      <span
                        style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          background: "#fef2f2",
                          border: "1px solid #fecaca",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                      >
                        <Check size={10} color="#ef4444" strokeWidth={3} />
                      </span>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Action Footer: Starting Price + Book Button */}
                <div
                  style={{
                    marginTop: "auto",
                    paddingTop: "14px",
                    borderTop: "1px solid #f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "0.68rem",
                        color: "#94a3b8",
                        textTransform: "uppercase",
                        fontWeight: "700",
                        letterSpacing: "0.04em",
                      }}
                    >
                      Starting Rate
                    </div>
                    <div style={{ fontSize: "1.08rem", fontWeight: "800", color: "#0f172a" }}>
                      {service.price}
                    </div>
                  </div>

                  <button
                    onClick={() => onBookService(service)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 16px",
                      fontSize: "0.78rem",
                      fontWeight: "700",
                      letterSpacing: "0.02em",
                      borderRadius: "9999px",
                      border: "none",
                      background: "#0f172a",
                      color: "#ffffff",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      boxShadow: "0 4px 12px rgba(15, 23, 42, 0.18)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#ef4444";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 8px 18px rgba(239, 68, 68, 0.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#0f172a";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(15, 23, 42, 0.18)";
                    }}
                  >
                    <span>BOOK SERVICE</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
