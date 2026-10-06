import React from "react";
import { ShieldCheck, Lock, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";

export default function PrivacyPolicyPage({ onNavigateHome }) {
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
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.4)", color: "#fca5a5", padding: "6px 14px", borderRadius: "9999px", fontSize: "0.8rem", fontWeight: "700", marginBottom: "16px" }}>
              <Lock size={14} /> Official Customer Data Protection Statement
            </span>
            <h1 style={{ fontSize: "2.4rem", fontWeight: "900", lineHeight: 1.2, marginBottom: "14px", color: "#ffffff" }}>
              Privacy Policy
            </h1>
            <p style={{ fontSize: "1.05rem", color: "#94a3b8", lineHeight: 1.6 }}>
              At Sadguru Tyres, we are committed to safeguarding your personal data, vehicle booking information, and transaction privacy.
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
              <ShieldCheck size={22} color="#ef4444" /> 1. Information We Collect
            </h2>
            <p style={{ marginBottom: "12px" }}>
              When you interact with our website, request tyre quotes, or book wheel alignment/balancing workshop services, we collect necessary personal details, including:
            </p>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <CheckCircle2 size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: "3px" }} />
                <span><strong>Contact Information:</strong> Full Name, Mobile Number (+91 format), and Email Address.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <CheckCircle2 size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: "3px" }} />
                <span><strong>Vehicle & Tyre Details:</strong> Car make/model, registration year, tyre size dimensions (e.g. 245/40 R19), and requested service type.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <CheckCircle2 size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: "3px" }} />
                <span><strong>Technical Log Data:</strong> Anonymized IP addresses, browser type, device information, and functional cookies used to retain vehicle filters.</span>
              </li>
            </ul>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #f1f5f9", margin: "28px 0" }} />

          {/* Section 2 */}
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "800", color: "#0f172a", marginBottom: "12px" }}>
              2. How We Use Your Information
            </h2>
            <p style={{ marginBottom: "12px" }}>
              Your information is exclusively utilized for legitimate automotive service operations:
            </p>
            <ul style={{ listStyle: "disc", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Processing workshop appointments and technician bay reservations.</li>
              <li>Sending automated SMS/WhatsApp booking updates and service readiness reminders.</li>
              <li>Fulfilling tyre inventory quotes and original manufacturer warranty registration.</li>
              <li>Improving customer service and diagnosing web application technical issues.</li>
            </ul>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #f1f5f9", margin: "28px 0" }} />

          {/* Section 3 */}
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "800", color: "#0f172a", marginBottom: "12px" }}>
              3. Data Security & Third-Party Protection
            </h2>
            <p style={{ marginBottom: "12px" }}>
              Sadguru Tyres enforces enterprise-grade 256-bit SSL encryption and strict cloud server access controls.
            </p>
            <div style={{ background: "#fef2f2", borderLeft: "4px solid #ef4444", padding: "16px 20px", borderRadius: "12px", color: "#991b1b", fontWeight: "600" }}>
              We guarantee that customer contact information is NEVER sold, rented, or distributed to third-party telemarketers or external advertisers under any circumstances.
            </div>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #f1f5f9", margin: "28px 0" }} />

          {/* Section 4 */}
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: "800", color: "#0f172a", marginBottom: "12px" }}>
              4. Cookies & Session Storage Policy
            </h2>
            <p>
              We utilize essential <code>localStorage</code> objects and session cookies strictly to keep track of your active wishlist, selected currency (INR/USD), and vehicle search history. You can clear your browser storage at any time without affecting website navigation.
            </p>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #f1f5f9", margin: "28px 0" }} />

          {/* Section 5: Contact Box */}
          <div style={{ background: "#f8fafc", borderRadius: "18px", padding: "24px 28px", border: "1px solid #cbd5e1" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>
              Questions Regarding Privacy?
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "16px" }}>
              If you have any questions or wish to request data correction or deletion, please contact our Data Protection Lead:
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", fontSize: "0.9rem", color: "#0f172a", fontWeight: "600" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Mail size={16} color="#ef4444" /> privacy@sadgurutyres.in
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Phone size={16} color="#ef4444" /> +91 98220 12345
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <MapPin size={16} color="#ef4444" /> Sadguru Tyres Hub, Main Station Road
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
