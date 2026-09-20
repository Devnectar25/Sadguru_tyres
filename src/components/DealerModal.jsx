import React, { useState } from "react";
import { X, MapPin, Phone, Clock, Navigation, CheckCircle2, Search } from "lucide-react";

export default function DealerModal({ tyre, onClose, onSelectDealer }) {
  const [searchCity, setSearchCity] = useState("");

  const dealers = [
    {
      id: "dl-1",
      name: "Sadguru Flagship Performance Hub",
      city: "Mumbai",
      address: "Plot 42, Western Express Highway, Andheri East, Mumbai 400069",
      phone: "+91 22 8844 1100",
      hours: "Mon - Sat: 08:30 - 20:00",
      equipment: "Hunter Hawkeye 3D Elite • Touchless Robotic Bay",
      stockStatus: "In Stock (12 Units)",
      distance: "2.4 km away",
    },
    {
      id: "dl-2",
      name: "Sadguru Motorsport Lounge & Pro Shop",
      city: "Pune",
      address: "Senapati Bapat Road, Near ICC Tech Park, Pune 411016",
      phone: "+91 20 6633 9922",
      hours: "Mon - Sat: 09:00 - 19:30",
      equipment: "Corghi Laser Balancer • Track Dyno Alignment",
      stockStatus: "In Stock (8 Units)",
      distance: "5.1 km away",
    },
    {
      id: "dl-3",
      name: "Sadguru Luxury Wheel Experience Center",
      city: "Delhi NCR",
      address: "Golf Course Road, Sector 54, Gurugram, Haryana 122002",
      phone: "+91 124 4922 880",
      hours: "All 7 Days: 09:00 - 20:30",
      equipment: "Nitrogen Purge Tower • Ceramic Rim Care Bay",
      stockStatus: "In Stock (16 Units)",
      distance: "8.7 km away",
    },
    {
      id: "dl-4",
      name: "Sadguru Precision Fitment Studio",
      city: "Bengaluru",
      address: "100 Feet Road, Indiranagar, Bengaluru 560038",
      phone: "+91 80 4155 3300",
      hours: "Mon - Sat: 09:00 - 20:00",
      equipment: "Hunter Road Force Elite • Touchless Arms",
      stockStatus: "In Stock (6 Units)",
      distance: "3.8 km away",
    },
  ];

  const filteredDealers = dealers.filter(
    (d) =>
      d.name.toLowerCase().includes(searchCity.toLowerCase()) ||
      d.city.toLowerCase().includes(searchCity.toLowerCase()) ||
      d.address.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "720px",
          padding: "30px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "18px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            marginBottom: "20px",
          }}
        >
          <div>
            <div className="badge-pill" style={{ marginBottom: "6px" }}>
              <Navigation size={13} color="var(--accent-crimson)" />
              AUTHORIZED SERVICE NETWORK
            </div>
            <h3 style={{ fontSize: "1.4rem", color: "#fff" }}>
              Find an Authorized Dealer Near You
            </h3>
            {tyre && (
              <p style={{ fontSize: "0.84rem", color: "var(--text-dim)", marginTop: "2px" }}>
                Checking real-time bay availability for <strong style={{ color: "#fff" }}>{tyre.name}</strong>
              </p>
            )}
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

        {/* Search input */}
        <div
          style={{
            position: "relative",
            marginBottom: "20px",
          }}
        >
          <Search
            size={18}
            color="var(--text-muted)"
            style={{ position: "absolute", left: "14px", top: "14px" }}
          />
          <input
            type="text"
            placeholder="Search by city, area, or pin code (e.g. Mumbai, Pune, Delhi, Bengaluru)..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px 12px 42px",
              borderRadius: "10px",
              background: "#131722",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#ffffff",
              fontSize: "0.92rem",
              outline: "none",
            }}
          />
        </div>

        {/* Dealers list */}
        <div
          style={{
            maxHeight: "380px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {filteredDealers.map((d) => (
            <div
              key={d.id}
              style={{
                padding: "20px",
                borderRadius: "12px",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: "1.05rem", fontWeight: "700", color: "#ffffff" }}>
                    {d.name}
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--text-dim)", display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                    <MapPin size={14} color="var(--accent-crimson)" />
                    {d.address}
                  </div>
                </div>

                <span
                  style={{
                    fontSize: "0.74rem",
                    fontWeight: "700",
                    color: "var(--accent-cyan)",
                    background: "rgba(0, 240, 255, 0.1)",
                    padding: "4px 10px",
                    borderRadius: "999px",
                    border: "1px solid rgba(0, 240, 255, 0.25)",
                  }}
                >
                  {d.distance}
                </span>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Phone size={13} color="var(--accent-crimson)" /> {d.phone}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Clock size={13} /> {d.hours}
                </span>
                <span style={{ color: "#34D399", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                  <CheckCircle2 size={13} /> {d.stockStatus}
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "8px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  {d.equipment}
                </span>

                <button
                  onClick={() => {
                    onSelectDealer(d);
                    onClose();
                  }}
                  className="btn btn-outline-crimson"
                  style={{ padding: "6px 14px", fontSize: "0.78rem" }}
                >
                  Select This Bay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
