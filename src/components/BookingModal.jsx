import React, { useState } from "react";
import { X, Calendar, Clock, Car, Phone, User, ShieldCheck } from "lucide-react";
import { SERVICES_DATA } from "../data/servicesData";

export default function BookingModal({ initialService, initialTyre, onClose, onBookingConfirmed }) {
  const [selectedServiceId, setSelectedServiceId] = useState(
    initialService?.id || SERVICES_DATA[0].id
  );
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [carModel, setCarModel] = useState(initialTyre ? initialTyre.bestSuitedFor.split(",")[0] : "");
  const [date, setDate] = useState("2026-09-24");
  const [timeSlot, setTimeSlot] = useState("10:30 AM");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const serviceName =
        SERVICES_DATA.find((s) => s.id === selectedServiceId)?.title || "Tyre Fitting";
      onBookingConfirmed({
        serviceName,
        customerName: customerName || "Customer",
        date,
        timeSlot,
        carModel: carModel || "Vehicle",
        tyreName: initialTyre?.name,
      });
      onClose();
    }, 600);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content hide-scrollbar"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "580px",
          padding: "26px 28px",
          background: "#ffffff",
          borderRadius: "24px",
          color: "#0f172a",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "18px",
            paddingBottom: "14px",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                borderRadius: "9999px",
                background: "rgba(239, 68, 68, 0.1)",
                color: "#ef4444",
                fontSize: "0.75rem",
                fontWeight: "700",
                marginBottom: "6px",
              }}
            >
              <ShieldCheck size={13} color="#ef4444" />
              VIP WORKSHOP APPOINTMENT
            </div>
            <h3 style={{ fontSize: "1.45rem", color: "#0f172a", fontWeight: "800" }}>
              {initialTyre ? `Book Fitting: ${initialTyre.name}` : "Book Precision Tyre Service"}
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "#f1f5f9",
              border: "1px solid #cbd5e1",
              color: "#0f172a",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#0f172a", textTransform: "uppercase", fontWeight: "700", marginBottom: "6px" }}>
              Service Required
            </label>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "12px",
                background: "#f8fafc",
                border: "1px solid #cbd5e1",
                color: "#0f172a",
                fontSize: "0.92rem",
                fontWeight: "600",
                outline: "none",
              }}
            >
              {SERVICES_DATA.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} ({s.price})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "#0f172a", textTransform: "uppercase", fontWeight: "700", marginBottom: "6px" }}>
              Vehicle Make & Model
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                required
                placeholder="e.g. BMW M340i, Mercedes C-Class"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px 12px 38px",
                  borderRadius: "12px",
                  background: "#f8fafc",
                  border: "1px solid #cbd5e1",
                  color: "#0f172a",
                  fontSize: "0.92rem",
                  fontWeight: "600",
                  outline: "none",
                }}
              />
              <Car size={16} color="#64748b" style={{ position: "absolute", left: "14px", top: "14px" }} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "#0f172a", textTransform: "uppercase", fontWeight: "700", marginBottom: "6px" }}>
                Preferred Date
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 38px",
                    borderRadius: "12px",
                    background: "#f8fafc",
                    border: "1px solid #cbd5e1",
                    color: "#0f172a",
                    fontSize: "0.92rem",
                    fontWeight: "600",
                    outline: "none",
                  }}
                />
                <Calendar size={16} color="#64748b" style={{ position: "absolute", left: "14px", top: "14px" }} />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "#0f172a", textTransform: "uppercase", fontWeight: "700", marginBottom: "6px" }}>
                Time Slot
              </label>
              <div style={{ position: "relative" }}>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 38px",
                    borderRadius: "12px",
                    background: "#f8fafc",
                    border: "1px solid #cbd5e1",
                    color: "#0f172a",
                    fontSize: "0.92rem",
                    fontWeight: "600",
                    outline: "none",
                  }}
                >
                  <option value="09:00 AM">09:00 AM - Morning Slot</option>
                  <option value="10:30 AM">10:30 AM - Morning Slot</option>
                  <option value="01:00 PM">01:00 PM - Afternoon Slot</option>
                  <option value="03:30 PM">03:30 PM - Afternoon Slot</option>
                  <option value="05:30 PM">05:30 PM - Evening Slot</option>
                </select>
                <Clock size={16} color="#64748b" style={{ position: "absolute", left: "14px", top: "14px" }} />
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "#0f172a", textTransform: "uppercase", fontWeight: "700", marginBottom: "6px" }}>
                Full Name
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 38px",
                    borderRadius: "12px",
                    background: "#f8fafc",
                    border: "1px solid #cbd5e1",
                    color: "#0f172a",
                    fontSize: "0.92rem",
                    fontWeight: "600",
                    outline: "none",
                  }}
                />
                <User size={16} color="#64748b" style={{ position: "absolute", left: "14px", top: "14px" }} />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "#0f172a", textTransform: "uppercase", fontWeight: "700", marginBottom: "6px" }}>
                Phone Number
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="tel"
                  required
                  placeholder="+91 98000 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 38px",
                    borderRadius: "12px",
                    background: "#f8fafc",
                    border: "1px solid #cbd5e1",
                    color: "#0f172a",
                    fontSize: "0.92rem",
                    fontWeight: "600",
                    outline: "none",
                  }}
                />
                <Phone size={16} color="#64748b" style={{ position: "absolute", left: "14px", top: "14px" }} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "10px",
              borderRadius: "9999px",
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              color: "#ffffff",
              fontWeight: "700",
              fontSize: "0.95rem",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(239, 68, 68, 0.3)",
            }}
          >
            {isSubmitting ? "Securing Workshop Bay..." : "Confirm VIP Service Reservation"}
          </button>
        </form>
      </div>
    </div>
  );
}
