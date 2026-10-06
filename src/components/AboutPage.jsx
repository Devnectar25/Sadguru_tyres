import React from "react";
import FounderLegacy from "./FounderLegacy";
import WhyChooseUs from "./WhyChooseUs";
import { Award, ShieldCheck, Users, Building2 } from "lucide-react";

export default function AboutPage({ onNavigateHome, onNavigateCatalog }) {
  return (
    <div style={{ background: "#f8fafc", color: "#0f172a", minHeight: "100vh" }}>
      {/* About Us Hero Header */}
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
            20+ Years of Automotive <span style={{ color: "#ef4444" }}>Excellence & Trust</span>
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
            Established in 2004, Sadguru Tyres has evolved into Maharashtra's premier mobility hub — serving over 50,000 satisfied motorists with genuine high-performance tyres and certified 3D laser alignment.
          </p>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "flex-start" }}>
            {[
              { label: "Satisfied Customers", val: "50,000+" },
              { label: "Years of Heritage", val: "20+ Years" },
              { label: "Partner Brands", val: "12+ Brands" },
              { label: "ISO Certified", val: "ISO 9001" },
            ].map((stat, idx) => (
              <div key={idx} style={{ background: "rgba(15, 23, 42, 0.65)", padding: "8px 18px", borderRadius: "10px", border: "1px solid rgba(255, 255, 255, 0.25)", backdropFilter: "blur(6px)" }}>
                <div style={{ fontSize: "1.15rem", fontWeight: "900", color: "#ef4444" }}>{stat.val}</div>
                <div style={{ fontSize: "0.72rem", color: "#f8fafc", fontWeight: "600" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Legacy Section */}
      <section style={{ padding: "20px 0" }}>
        <FounderLegacy />
      </section>

      {/* Our Mission & Core Values */}
      <section style={{ padding: "24px 0 32px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "650px", margin: "0 auto 24px auto" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: "800", color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.1em" }}>Guiding Principles</span>
            <h2 style={{ fontSize: "2rem", fontWeight: "900", color: "#0f172a", marginTop: "4px" }}>Our Core Brand Values</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {[
              {
                icon: ShieldCheck,
                title: "Uncompromising Safety",
                desc: "We test every tyre for structural integrity and wet-grip compliance. Your safety on high-speed expressways is our highest priority."
              },
              {
                icon: Award,
                title: "100% Genuine Guarantee",
                desc: "Direct authorized partnership with global tyre leaders ensures fresh manufacturing batches with full manufacturer warranties."
              },
              {
                icon: Building2,
                title: "Precision Engineering",
                desc: "We invest in high-tech Italian & German computerized alignment and balancing systems for zero-vibration driving."
              },
              {
                icon: Users,
                title: "Customer-Centric Care",
                desc: "Transparent upfront pricing, zero pressure sales tactics, and dedicated after-sales support for lifetime peace of mind."
              }
            ].map((v, idx) => {
              const IconComp = v.icon;
              return (
                <div key={idx} style={{ background: "#ffffff", padding: "24px", borderRadius: "18px", border: "1px solid #e2e8f0", boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#fef2f2", border: "1px solid #fecaca", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
                    <IconComp size={22} />
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#0f172a", marginBottom: "6px" }}>{v.title}</h3>
                  <p style={{ fontSize: "0.84rem", color: "#64748b", lineHeight: 1.5, margin: 0 }}>{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: "20px 0 36px 0" }}>
        <WhyChooseUs />
      </section>
    </div>
  );
}
