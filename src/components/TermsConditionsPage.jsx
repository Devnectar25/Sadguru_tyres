import React from "react";
import { FileText, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

export default function TermsConditionsPage({ onNavigateHome }) {
  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", paddingTop: "20px", paddingBottom: "60px", color: "#0f172a" }}>
      <div className="container">


        {/* Page Hero Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            borderRadius: "24px",
            padding: "48px 36px",
            color: "#ffffff",
            marginBottom: "36px",
            boxShadow: "0 20px 40px rgba(15, 23, 42, 0.12)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "relative", zIndex: 2, maxWidth: "720px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(37, 99, 235, 0.15)", border: "1px solid rgba(37, 99, 235, 0.4)", color: "#93c5fd", padding: "6px 14px", borderRadius: "9999px", fontSize: "0.8rem", fontWeight: "700", marginBottom: "16px" }}>
              <FileText size={14} /> Official Workshop & Online Purchase Agreement
            </span>
            <h1 style={{ fontSize: "2.4rem", fontWeight: "900", lineHeight: 1.2, marginBottom: "14px", color: "#ffffff" }}>
              Terms & Conditions
            </h1>
            <p style={{ fontSize: "1.05rem", color: "#94a3b8", lineHeight: 1.6 }}>
              Standard terms governing workshop service reservations, tyre sales, manufacturer warranties, and customer obligations at Sadguru Tyres.
            </p>
          </div>
        </div>

        {/* Main Content Card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            padding: "44px 40px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
            lineHeight: 1.7,
            fontSize: "0.95rem",
            color: "#334155",
          }}
        >
          {/* Section 1 */}
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "800", color: "#0f172a", marginBottom: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
              <CheckCircle2 size={22} color="#ef4444" /> 1. Workshop Service Bookings
            </h2>
            <p style={{ marginBottom: "12px" }}>
              Online service bookings made via Sadguru Tyres reserve a priority technician bay for 3D Laser Alignment, Robotic Balancing, Nitrogen Flush, or Tyre Fitting.
            </p>
            <ul style={{ listStyle: "disc", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Reserved slots are held for up to 15 minutes past the scheduled time before being made available to walk-in clients.</li>
              <li>Estimated service durations (e.g. 25-30 mins) may vary depending on rim condition and severe suspension misalignment.</li>
              <li>Pre-service computerized alignment scans are provided free of cost prior to mechanical adjustment.</li>
            </ul>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #f1f5f9", margin: "28px 0" }} />

          {/* Section 2 */}
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "800", color: "#0f172a", marginBottom: "12px" }}>
              2. Manufacturer Tyre Warranties
            </h2>
            <p style={{ marginBottom: "12px" }}>
              All brand-new tyres sold through Sadguru Tyres carry official manufacturer warranties (Yokohama, CEAT, MRF, Michelin, Bridgestone, Goodyear):
            </p>
            <ul style={{ listStyle: "disc", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li><strong>Warranty Scope:</strong> Covers manufacturing defects, inner liner porosity, and ply separation under normal road usage.</li>
              <li><strong>Exclusions:</strong> Road hazard impacts, curb bulges, unmaintained pressure wear, or mechanical suspension neglect are excluded per manufacturer policy.</li>
              <li>Official tax invoice and warranty card provided at the time of workshop installation must be presented for warranty inspection claims.</li>
            </ul>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #f1f5f9", margin: "28px 0" }} />

          {/* Section 3 */}
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "800", color: "#0f172a", marginBottom: "12px" }}>
              3. Quotations, Pricing & Payments
            </h2>
            <p style={{ marginBottom: "12px" }}>
              Tyre prices and service charges displayed in INR (₹) or USD ($) on the website represent standard retail estimates:
            </p>
            <ul style={{ listStyle: "disc", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>All final billing includes mandatory local taxes (GST) and environmental tyre recycling charges where applicable.</li>
              <li>Prices are subject to stock availability and sudden manufacturer price list updates.</li>
              <li>Quotes requested online are valid for 7 calendar days from the issue date.</li>
            </ul>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #f1f5f9", margin: "28px 0" }} />

          {/* Section 4 */}
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "800", color: "#0f172a", marginBottom: "12px" }}>
              4. Free Cancellation & Rescheduling
            </h2>
            <p style={{ marginBottom: "12px" }}>
              We understand plans change. Customers may reschedule or cancel any workshop booking without penalty:
            </p>
            <div style={{ background: "#f0fdf4", borderLeft: "4px solid #16a34a", padding: "16px 20px", borderRadius: "12px", color: "#14532d", fontWeight: "600" }}>
              Cancellations made at least 2 hours prior to the time slot incur ZERO fees. Any advance payment will be fully refunded within 3 to 5 business days.
            </div>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #f1f5f9", margin: "28px 0" }} />

          {/* Section 5 */}
          <div style={{ marginBottom: "12px" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "800", color: "#0f172a", marginBottom: "12px" }}>
              5. Customer Vehicle Safety Obligations
            </h2>
            <p style={{ marginBottom: "12px" }}>
              Tyre recommendations provided by our digital Tyre Finder are based on OEM factory vehicle specifications. Customers fitting custom alloy wheels or modified lift kits are responsible for ensuring correct offset and wheel well clearance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
