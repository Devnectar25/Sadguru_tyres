import React from "react";
import { SERVICES_DATA } from "../data/servicesData";
import { Wrench, Disc, Check, Clock, Calendar, ShieldAlert, ArrowRight } from "lucide-react";

export default function ServicesSection({ onBookService }) {
  return (
    <section
      id="services"
      style={{
        padding: "20px 0 50px 0",
        position: "relative",
        background: "var(--bg-dark)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header animate-text-coming" style={{ marginBottom: "32px" }}>
          <div className="section-eyebrow">
            <Wrench size={16} />
            EXPERT AUTOMOTIVE CARE & INSTALLATION
          </div>
          <h2 className="animate-text-coming animate-delay-1">Specialized Tyre & Wheel Services</h2>
          <p className="animate-text-coming animate-delay-2">
            Equipped with 3D laser alignment and touchless robotic demounters to protect your premium forged alloy wheels.
          </p>
        </div>

        {/* Services Grid (Showing 3 Core Services) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px",
          }}
        >
          {SERVICES_DATA.slice(0, 3).map((service, index) => (
            <div
              key={service.id}
              className="glass-card"
              style={{
                padding: "32px",
                borderRadius: "18px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                background: "rgba(13, 17, 24, 0.8)",
              }}
            >
              {/* Header Badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    fontSize: "0.74rem",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "4px 12px",
                    borderRadius: "6px",
                    background: "rgba(255, 42, 42, 0.12)",
                    color: "var(--accent-crimson-light)",
                    border: "1px solid rgba(255, 42, 42, 0.25)",
                  }}
                >
                  {service.badge}
                </span>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.78rem",
                    color: "var(--text-muted)",
                  }}
                >
                  <Clock size={14} />
                  {service.duration}
                </div>
              </div>

              {/* Title & Description */}
              <h3
                style={{
                  fontSize: "1.35rem",
                  marginBottom: "10px",
                  color: "#ffffff",
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--text-dim)",
                  lineHeight: 1.55,
                  marginBottom: "20px",
                }}
              >
                {service.shortDesc}
              </p>

              {/* Equipment Used tag */}
              <div
                style={{
                  fontSize: "0.78rem",
                  color: "var(--accent-cyan)",
                  fontWeight: "600",
                  marginBottom: "18px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Disc size={14} />
                <span>Station: {service.equipment}</span>
              </div>

              {/* Key Benefits Checklist */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  marginBottom: "26px",
                }}
              >
                {service.benefits.map((benefit, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      fontSize: "0.84rem",
                      color: "var(--text-silver)",
                    }}
                  >
                    <Check
                      size={14}
                      color="var(--accent-crimson)"
                      style={{ marginTop: "3px", flexShrink: 0 }}
                    />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Action Footer */}
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: "20px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                    Service Rate
                  </div>
                  <div style={{ fontSize: "1rem", fontWeight: "700", color: "#ffffff" }}>
                    {service.price}
                  </div>
                </div>

                <button
                  onClick={() => onBookService(service)}
                  className="btn btn-secondary"
                  style={{
                    padding: "9px 18px",
                    fontSize: "0.82rem",
                    borderRadius: "8px",
                    borderColor: "rgba(255, 42, 42, 0.3)",
                  }}
                >
                  <Calendar size={14} color="var(--accent-crimson)" />
                  Book Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
