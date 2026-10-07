import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ShieldCheck,
  Building2,
  ExternalLink,
  Car,
  ChevronDown,
  HelpCircle
} from "lucide-react";

export default function ContactPage({ onNavigateHome, onOpenBooking, onSubmitLead, faqsList = [], shopSettings = {} }) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // Fallback FAQs if list not yet loaded
  const displayFaqs = faqsList.length > 0 ? faqsList : [
    {
      id: "f1",
      question: "How often should I get 3D Wheel Alignment done?",
      answer: "We recommend checking your wheel alignment every 5,000 to 7,000 km, or immediately if your car pulls to one side, after hitting a deep pothole, or when installing new tyres."
    },
    {
      id: "f2",
      question: "What is the benefit of Nitrogen inflation over regular air?",
      answer: "Nitrogen molecules are larger than regular oxygen, reducing pressure loss through tyre rubber by up to 3x. It also doesn't expand significantly under highway heat, resulting in cooler running tyres, better fuel economy, and longer tread life."
    },
    {
      id: "f3",
      question: "How long does a full alignment and balancing service take?",
      answer: "Our automated 3D alignment and dynamic wheel balancing process typically takes 35-45 minutes total. You can relax in our air-conditioned lounge while our certified technicians work."
    },
    {
      id: "f4",
      question: "Do you offer warranty on tyre fitting and alignment?",
      answer: "Yes! All wheel alignment services at Sadguru Tyres come with a 15-day or 500 km re-check warranty guarantee, and all tyres carry official manufacturer warranty against manufacturing defects."
    }
  ];

  const [errors, setErrors] = useState({ phone: "", email: "" });
  const [touched, setTouched] = useState({ phone: false, email: false });

  const validatePhone = (val) => {
    const digitsOnly = (val || "").replace(/\D/g, "");
    if (!digitsOnly) return "Phone number is required";
    if (digitsOnly.length < 10) {
      return `Please enter a 10-digit mobile number (${digitsOnly.length}/10 digits)`;
    }
    if (!/^[6-9]/.test(digitsOnly)) {
      return "Mobile number must start with 6, 7, 8, or 9";
    }
    return "";
  };

  const validateEmail = (val) => {
    if (!val || val.trim() === "") return "Email address is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val.trim())) return "Please enter a valid email address (e.g. name@example.com)";
    return "";
  };

  const handlePhoneChange = (e) => {
    const clean = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormState((prev) => ({ ...prev, phone: clean }));
    if (touched.phone) {
      setErrors((prev) => ({ ...prev, phone: validatePhone(clean) }));
    }
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setFormState((prev) => ({ ...prev, email: val }));
    if (touched.email) {
      setErrors((prev) => ({ ...prev, email: validateEmail(val) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ phone: true, email: true });
    const pErr = validatePhone(formState.phone);
    const eErr = validateEmail(formState.email);
    setErrors({ phone: pErr, email: eErr });

    if (!formState.name.trim() || pErr || eErr) return;

    const leadPayload = {
      name: formState.name.trim(),
      phone: formState.phone.trim(),
      email: formState.email.trim(),
      subject: formState.subject || "General Inquiry",
      message: formState.message || "",
      date: new Date().toISOString().split("T")[0],
      status: "New",
    };

    if (onSubmitLead) {
      await onSubmitLead(leadPayload);
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTouched({ phone: false, email: false });
      setErrors({ phone: "", email: "" });
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      });
    }, 4500);
  };

  return (
    <div style={{ background: "#f8fafc", color: "#0f172a", minHeight: "100vh" }}>
      {/* Contact Us Hero Header */}
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
            Get in Touch With <span style={{ color: "#ef4444" }}>Sadguru Tyres</span>
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
            Have a question about tyre sizing, wheel alignment, or wholesale fleet quotes? Our team of certified automotive experts is here to help.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", justifyContent: "flex-start" }}>
            <button
              onClick={() => onOpenBooking()}
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
              <Car size={18} />
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
              <Phone size={17} color="#ef4444" />
              <span>Hotline: {shopSettings?.tollFreePhone || "1800 15 11 00"}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section style={{ padding: "60px 0 40px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "36px" }}>
            {/* Left: Interactive Contact Form */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: "24px",
                padding: "36px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
              }}
            >
              <h2 style={{ fontSize: "1.5rem", fontWeight: "900", color: "#0f172a", marginBottom: "8px" }}>
                Send Us a Direct Message
              </h2>
              <p style={{ fontSize: "0.88rem", color: "#64748b", marginBottom: "28px" }}>
                Fill in your details below and our concierge team will respond within 30 minutes during workshop hours.
              </p>

              {submitted ? (
                <div
                  style={{
                    padding: "24px",
                    borderRadius: "16px",
                    background: "#d1fae5",
                    border: "1px solid #a7f3d0",
                    color: "#047857",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  <CheckCircle2 size={28} color="#047857" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: "800", fontSize: "1rem" }}>Message Sent Successfully!</div>
                    <div style={{ fontSize: "0.85rem", marginTop: "2px" }}>
                      Thank you {formState.name}. Our workshop representative will call you shortly at {formState.phone}.
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikramaditya Rao"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          borderRadius: "12px",
                          border: "1px solid #cbd5e1",
                          background: "#f8fafc",
                          fontSize: "0.9rem",
                          outline: "none",
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="e.g. 9822012345"
                        value={formState.phone}
                        onChange={handlePhoneChange}
                        onBlur={() => {
                          setTouched((prev) => ({ ...prev, phone: true }));
                          setErrors((prev) => ({ ...prev, phone: validatePhone(formState.phone) }));
                        }}
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          borderRadius: "12px",
                          border: errors.phone ? "2px solid #ef4444" : (touched.phone && !errors.phone && formState.phone ? "2px solid #22c55e" : "1px solid #cbd5e1"),
                          background: "#f8fafc",
                          fontSize: "0.9rem",
                          outline: "none",
                        }}
                      />
                      {errors.phone && (
                        <div style={{ fontSize: "0.76rem", color: "#ef4444", fontWeight: "700", marginTop: "4px" }}>
                          ⚠️ {errors.phone}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="vikram@example.com"
                        value={formState.email}
                        onChange={handleEmailChange}
                        onBlur={() => {
                          setTouched((prev) => ({ ...prev, email: true }));
                          setErrors((prev) => ({ ...prev, email: validateEmail(formState.email) }));
                        }}
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          borderRadius: "12px",
                          border: errors.email ? "2px solid #ef4444" : (touched.email && !errors.email && formState.email ? "2px solid #22c55e" : "1px solid #cbd5e1"),
                          background: "#f8fafc",
                          fontSize: "0.9rem",
                          outline: "none",
                        }}
                      />
                      {errors.email && (
                        <div style={{ fontSize: "0.76rem", color: "#ef4444", fontWeight: "700", marginTop: "4px" }}>
                          ⚠️ {errors.email}
                        </div>
                      )}
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                        Subject / Inquiry Type
                      </label>
                      <select
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          borderRadius: "12px",
                          border: "1px solid #cbd5e1",
                          background: "#ffffff",
                          fontSize: "0.9rem",
                          outline: "none",
                        }}
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Service Booking">Service Booking Assistance</option>
                        <option value="Wholesale / Fleet Quote">Wholesale / Fleet Quote</option>
                        <option value="Tyre Warranty Claim">Tyre Warranty Claim</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
                      Your Message / Vehicle Details
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us your car make/model or specific tyre requirements..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "12px",
                        border: "1px solid #cbd5e1",
                        background: "#f8fafc",
                        fontSize: "0.9rem",
                        outline: "none",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      padding: "14px 28px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #ef4444, #dc2626)",
                      color: "#ffffff",
                      border: "none",
                      fontWeight: "800",
                      fontSize: "0.95rem",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                      width: "fit-content",
                      boxShadow: "0 6px 20px rgba(239, 68, 68, 0.3)",
                    }}
                  >
                    <Send size={16} />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right: Contact Details & Store Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Store Details Card */}
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "24px",
                  padding: "32px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <h3 style={{ fontSize: "1.2rem", fontWeight: "900", color: "#0f172a" }}>
                  Workshop & Concierge Info
                </h3>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "#fef2f2", border: "1px solid #fecaca", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: "800", fontSize: "0.95rem", color: "#0f172a" }}>
                      {shopSettings?.hubName || "Main Workshop Hub"}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "2px", lineHeight: 1.5 }}>
                      {shopSettings?.address || "Sadguru Tyres & Alignment Center, Main Highway Junction, Pune, Maharashtra 411001"}
                    </div>
                    <a
                      href={shopSettings?.googleMapsUrl || "https://maps.app.goo.gl/j9kVxiwCqT5APoYL8"}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "0.8rem",
                        color: "#ef4444",
                        fontWeight: "700",
                        marginTop: "8px",
                        textDecoration: "none",
                      }}
                    >
                      Open Directions on Google Maps <ExternalLink size={13} />
                    </a>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "#fef2f2", border: "1px solid #fecaca", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: "800", fontSize: "0.95rem", color: "#0f172a" }}>Phone Hotlines</div>
                    <div style={{ fontSize: "0.85rem", color: "#334155", marginTop: "2px", fontWeight: "600" }}>
                      Toll-Free: {shopSettings?.tollFreePhone || "1800 15 11 00"}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "2px" }}>
                      Direct: {shopSettings?.directPhone || "+91 98220 12345 / 020 2543 8899"}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "#fef2f2", border: "1px solid #fecaca", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: "800", fontSize: "0.95rem", color: "#0f172a" }}>Workshop Hours</div>
                    <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "2px" }}>
                      {shopSettings?.weekdayHours || "Mon - Sat: 9:00 AM - 8:30 PM"}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
                      {shopSettings?.sundayHours || "Sun: 10:00 AM - 4:00 PM (Open 7 Days)"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Roadside Hotline Banner */}
              <div
                style={{
                  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  borderRadius: "24px",
                  padding: "24px 28px",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 25px rgba(239, 68, 68, 0.3)",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.78rem", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.9 }}>
                    24/7 Roadside Assistance
                  </div>
                  <div style={{ fontSize: "1.1rem", fontWeight: "900", marginTop: "4px" }}>
                    Flat Tyre Emergency?
                  </div>
                  <div style={{ fontSize: "0.82rem", opacity: "0.9", marginTop: "2px" }}>
                    Mobile tyre service van dispatch line.
                  </div>
                </div>

                <a
                  href={`tel:${(shopSettings?.tollFreePhone || "1800 15 11 00").replace(/\s+/g, "")}`}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "999px",
                    background: "#ffffff",
                    color: "#ef4444",
                    fontWeight: "800",
                    fontSize: "0.85rem",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Section */}
      <section style={{ padding: "40px 0 80px 0", borderTop: "1px solid #e2e8f0", background: "#ffffff" }}>
        <div className="container" style={{ maxWidth: "840px" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "900", color: "#0f172a", margin: "0 0 10px 0", letterSpacing: "-0.02em" }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: "0.98rem", color: "#64748b", margin: 0 }}>
              Have questions about our service procedures? We've got answers.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {displayFaqs.map((faq, idx) => (
              <div
                key={faq.id || idx}
                style={{
                  background: "#ffffff",
                  borderRadius: "18px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 8px rgba(15, 23, 42, 0.03)",
                  overflow: "hidden",
                  transition: "all 0.2s ease",
                }}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  style={{
                    width: "100%",
                    padding: "20px 24px",
                    background: "none",
                    border: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textAlign: "left",
                    fontWeight: "800",
                    fontSize: "1.02rem",
                    color: "#0f172a",
                    cursor: "pointer",
                  }}
                >
                  <span>{faq.question}</span>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: activeFaq === idx ? "#fef2f2" : "#f1f5f9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: activeFaq === idx ? "#ef4444" : "#64748b",
                      flexShrink: 0,
                      marginLeft: "16px",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <ChevronDown
                      size={18}
                      style={{
                        transform: activeFaq === idx ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}
                    />
                  </div>
                </button>
                {activeFaq === idx && (
                  <div
                    style={{
                      padding: "0 24px 22px 24px",
                      color: "#475569",
                      fontSize: "0.92rem",
                      lineHeight: 1.65,
                      borderTop: "1px solid #f8fafc",
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

