import React, { useState } from "react";
import { X, Calendar, Clock, Car, Phone, User, CheckCircle2, ShieldCheck } from "lucide-react";
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
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "580px",
          padding: "32px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
            paddingBottom: "16px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div>
            <div className="badge-pill" style={{ marginBottom: "6px" }}>
              <ShieldCheck size={13} color="var(--accent-crimson)" />
              VIP WORKSHOP APPOINTMENT
            </div>
            <h3 style={{ fontSize: "1.45rem", color: "#ffffff" }}>
              {initialTyre ? `Book Fitting: ${initialTyre.name}` : "Book Precision Tyre Service"}
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "var(--text-dim)",
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
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {/* Select Service */}
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-silver)", textTransform: "uppercase", fontWeight: "600", marginBottom: "6px" }}>
              Service Required
            </label>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "8px",
                background: "#131722",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#ffffff",
                fontSize: "0.92rem",
                outline: "none",
              }}
            >
              {SERVICES_DATA.map((s) => (
                <option key={s.id} value={s.id} style={{ background: "#131722", color: "#fff" }}>
                  {s.title} ({s.price})
                </option>
              ))}
            </select>
          </div>

          {/* Vehicle Model & Tyre Fitment */}
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-silver)", textTransform: "uppercase", fontWeight: "600", marginBottom: "6px" }}>
              Vehicle Make & Model
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                required
                placeholder="e.g. BMW M340i, Mercedes C-Class, Defender 110"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px 12px 38px",
                  borderRadius: "8px",
                  background: "#131722",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#ffffff",
                  fontSize: "0.92rem",
                  outline: "none",
                }}
              />
              <Car size={16} color="var(--text-muted)" style={{ position: "absolute", left: "14px", top: "14px" }} />
            </div>
          </div>

          {/* Date and Time Slot row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-silver)", textTransform: "uppercase", fontWeight: "600", marginBottom: "6px" }}>
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
                    borderRadius: "8px",
                    background: "#131722",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#ffffff",
                    fontSize: "0.92rem",
                    outline: "none",
                  }}
                />
                <Calendar size={16} color="var(--text-muted)" style={{ position: "absolute", left: "14px", top: "14px" }} />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-silver)", textTransform: "uppercase", fontWeight: "600", marginBottom: "6px" }}>
                Time Slot
              </label>
              <div style={{ position: "relative" }}>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 38px",
                    borderRadius: "8px",
                    background: "#131722",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#ffffff",
                    fontSize: "0.92rem",
                    outline: "none",
                  }}
                >
                  <option value="09:00 AM">09:00 AM - Morning Slot</option>
                  <option value="10:30 AM">10:30 AM - Morning Slot</option>
                  <option value="01:00 PM">01:00 PM - Afternoon Slot</option>
                  <option value="03:30 PM">03:30 PM - Afternoon Slot</option>
                  <option value="05:30 PM">05:30 PM - Evening Slot</option>
                </select>
                <Clock size={16} color="var(--text-muted)" style={{ position: "absolute", left: "14px", top: "14px" }} />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-silver)", textTransform: "uppercase", fontWeight: "600", marginBottom: "6px" }}>
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
                    borderRadius: "8px",
                    background: "#131722",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#ffffff",
                    fontSize: "0.92rem",
                    outline: "none",
                  }}
                />
                <User size={16} color="var(--text-muted)" style={{ position: "absolute", left: "14px", top: "14px" }} />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-silver)", textTransform: "uppercase", fontWeight: "600", marginBottom: "6px" }}>
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
                    borderRadius: "8px",
                    background: "#131722",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#ffffff",
                    fontSize: "0.92rem",
                    outline: "none",
                  }}
                />
                <Phone size={16} color="var(--text-muted)" style={{ position: "absolute", left: "14px", top: "14px" }} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary"
            style={{ width: "100%", padding: "14px", marginTop: "10px" }}
          >
            {isSubmitting ? "Securing Workshop Bay..." : "Confirm VIP Service Reservation"}
          </button>
        </form>
      </div>
    </div>
  );
}
