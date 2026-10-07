import React, { useState, useEffect } from "react";
import {
  Wrench,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Cpu,
  Gauge,
  CircleCheck,
  Zap,
  PhoneCall,
  Car
} from "lucide-react";

export default function ServicesPage({ servicesList = [], onBookService, onNavigateHome, targetServiceId, shopSettings = {} }) {
  useEffect(() => {
    if (targetServiceId) {
      const timer = setTimeout(() => {
        const el = document.getElementById(`service-card-${targetServiceId}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [targetServiceId]);

  return (
    <div style={{ background: "#f8fafc", color: "#0f172a", minHeight: "100vh" }}>
      {/* Services Hero Header */}
      <section
        style={{
          background: "linear-gradient(90deg, rgba(15, 23, 42, 0.92) 0%, rgba(15, 23, 42, 0.80) 50%, rgba(15, 23, 42, 0.15) 100%), url('/images/hero_bg_banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          color: "#ffffff",
          height: "320px",
          minHeight: "320px",
          maxHeight: "320px",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "left", width: "100%" }}>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "2.5rem",
              fontWeight: "900",
              lineHeight: 1.15,
              marginBottom: "12px",
              color: "#ffffff",
              textAlign: "left",
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.7)",
            }}
          >
            Precision Workshop & <span style={{ color: "#ef4444" }}>Tyre Services</span>
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#f8fafc",
              fontWeight: "500",
              maxWidth: "680px",
              lineHeight: 1.5,
              margin: "0 0 18px 0",
              textAlign: "left",
              textShadow: "0 1px 4px rgba(0, 0, 0, 0.8)",
            }}
          >
            Equipped with state-of-the-art Italian mounting systems and German 3D HD laser sensors. Delivering maximum driving comfort, fuel efficiency, and road safety.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", justifyContent: "flex-start" }}>
            <button
              onClick={() => onBookService()}
              style={{
                padding: "12px 26px",
                borderRadius: "999px",
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                border: "none",
                color: "#ffffff",
                fontWeight: "800",
                fontSize: "0.95rem",
                cursor: "pointer",
                boxShadow: "0 10px 25px rgba(239, 68, 68, 0.5)",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Wrench size={18} />
              <span>Book Appointment Now</span>
            </button>
            <a
              href={`tel:${(shopSettings?.tollFreePhone || "1800 15 11 00").replace(/\s+/g, "")}`}
              style={{
                padding: "12px 24px",
                borderRadius: "999px",
                background: "rgba(15, 23, 42, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.35)",
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "0.95rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backdropFilter: "blur(6px)",
              }}
            >
              <PhoneCall size={17} color="#ef4444" />
              <span>Hotline: {shopSettings?.tollFreePhone || "1800 15 11 00"}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: "18px 0 24px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "650px", margin: "0 auto 20px auto" }}>
            <h2 style={{ fontSize: "2.1rem", fontWeight: "900", color: "#0f172a", marginBottom: "8px" }}>
              Our Specialized Services
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#64748b", lineHeight: 1.5 }}>
              Every service is backed by transparent pricing, factory-trained technicians, and our 100% satisfaction guarantee.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px" }}>
            {servicesList.map((srv) => {
              const IconComp = srv.icon || Wrench;
              const isTarget = targetServiceId === srv.id;
              return (
                <div
                  key={srv.id}
                  id={`service-card-${srv.id}`}
                  style={{
                    background: isTarget ? "#fff7f7" : "#ffffff",
                    borderRadius: "22px",
                    padding: "24px 24px 22px",
                    border: isTarget ? "2px solid #ef4444" : "1px solid #e2e8f0",
                    boxShadow: isTarget ? "0 12px 35px rgba(239, 68, 68, 0.25)" : "0 4px 20px rgba(15, 23, 42, 0.04)",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    if (!isTarget) e.currentTarget.style.boxShadow = "0 12px 30px rgba(15, 23, 42, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    if (!isTarget) e.currentTarget.style.boxShadow = "0 4px 20px rgba(15, 23, 42, 0.04)";
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                    <div style={{ width: "46px", height: "46px", borderRadius: "14px", background: "#fef2f2", border: "1px solid #fecaca", display: "flex", alignItems: "center", justifyContent: "center", color: "#ef4444" }}>
                      <IconComp size={22} />
                    </div>
                    <span style={{ fontSize: "0.74rem", padding: "4px 12px", borderRadius: "999px", background: "#f1f5f9", color: "#475569", fontWeight: "700" }}>
                      {srv.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.2rem", fontWeight: "800", color: "#0f172a", marginBottom: "8px", lineHeight: 1.25 }}>
                    {srv.title || srv.name}
                  </h3>

                  <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.5, marginBottom: "14px" }}>
                    {srv.shortDesc || srv.description}
                  </p>

                  <div style={{ marginBottom: "16px", flexGrow: 1 }}>
                    {(srv.benefits && srv.benefits.length > 0) && (
                      <div style={{ fontSize: "0.76rem", fontWeight: "700", color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                        What's Included:
                      </div>
                    )}
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
                      {(srv.benefits || []).map((feat, idx) => (
                        <li key={idx} style={{ fontSize: "0.82rem", color: "#334155", display: "flex", alignItems: "flex-start", gap: "8px" }}>
                          <CheckCircle2 size={15} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "14px", marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: "1.3rem", fontWeight: "900", color: "#ef4444" }}>
                        {srv.price || (srv.priceINR ? `₹ ${srv.priceINR.toLocaleString("en-IN")}` : (srv.price_inr ? `₹ ${srv.price_inr.toLocaleString("en-IN")}` : "Free"))}
                      </div>
                      <div style={{ fontSize: "0.74rem", color: "#64748b", display: "flex", alignItems: "center", gap: "4px" }}>
                        <Clock size={12} /> Approx {srv.duration || srv.time || "30 Mins"}
                      </div>
                    </div>

                    <button
                      onClick={() => onBookService(srv.title)}
                      style={{
                        padding: "10px 20px",
                        borderRadius: "12px",
                        background: "#0f172a",
                        color: "#ffffff",
                        border: "none",
                        fontWeight: "700",
                        fontSize: "0.85rem",
                        cursor: "pointer",
                        transition: "background 0.2s ease",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#ef4444"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "#0f172a"}
                    >
                      Book Service
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section style={{ background: "#ffffff", padding: "24px 0 24px 0", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 16px auto" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: "800", color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.1em" }}>Workflow Efficiency</span>
            <h2 style={{ fontSize: "1.9rem", fontWeight: "900", color: "#0f172a", marginTop: "6px" }}>Our 4-Step Workshop Process</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
            {[
              { step: "01", title: "Digital Diagnostics", desc: "Computerized scan of tread depth, alignment angles, and tire condition." },
              { step: "02", title: "Expert Recommendation", desc: "Transparent breakdown of recommended services with zero hidden fees." },
              { step: "03", title: "Precision Execution", desc: "Services performed using calibrated Italian & German equipment." },
              { step: "04", title: "Quality Check & Drive", desc: "Final test drive and digital alignment report handed over to you." },
            ].map((p, idx) => (
              <div key={idx} style={{ padding: "22px 20px", borderRadius: "18px", background: "#f8fafc", border: "1px solid #e2e8f0", textAlign: "center" }}>
                <div style={{ fontSize: "1.9rem", fontWeight: "900", color: "#ef4444", marginBottom: "6px" }}>{p.step}</div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: "800", color: "#0f172a", marginBottom: "6px" }}>{p.title}</h3>
                <p style={{ fontSize: "0.82rem", color: "#64748b", margin: 0, lineHeight: 1.45 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
