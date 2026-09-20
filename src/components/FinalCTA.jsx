import React from "react";
import { Compass, PhoneCall, ShieldCheck, Sparkles } from "lucide-react";

export default function FinalCTA({ onFinderClick, onBookClick }) {
  return (
    <section
      id="cta"
      style={{
        padding: "15px 0 45px 0",
        position: "relative",
        background: "linear-gradient(180deg, #06070a 0%, #0d1017 100%)",
        overflow: "hidden",
      }}
    >
      {/* Red ambient speed blur */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "240px",
          background: "radial-gradient(circle, rgba(255, 42, 42, 0.18) 0%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 5 }}>
        <div
          className="glass-panel"
          style={{
            padding: "36px 30px",
            textAlign: "center",
            background: "rgba(14, 18, 27, 0.88)",
            border: "1px solid rgba(255, 42, 42, 0.3)",
            boxShadow: "0 20px 45px rgba(0, 0, 0, 0.7), 0 0 35px rgba(255, 42, 42, 0.15)",
            borderRadius: "20px",
            maxWidth: "840px",
            margin: "0 auto",
          }}
        >
          {/* Eyebrow */}
          <div
            className="badge-pill"
            style={{
              marginBottom: "14px",
              boxShadow: "0 0 12px rgba(255, 42, 42, 0.15)",
              fontSize: "0.76rem",
              padding: "4px 12px",
            }}
          >
            <Sparkles size={13} color="var(--accent-crimson)" />
            TAKE COMMAND OF THE ROAD
          </div>

          {/* Headline */}
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
              lineHeight: 1.15,
              marginBottom: "12px",
              letterSpacing: "-0.02em",
            }}
          >
            Ready for Your <span className="text-gradient-crimson">Next Journey?</span>
          </h2>

          {/* Supporting Copy */}
          <p
            style={{
              fontSize: "0.96rem",
              color: "var(--text-dim)",
              maxWidth: "580px",
              margin: "0 auto 24px",
              lineHeight: 1.55,
            }}
          >
            Upgrade to Sadguru high-performance tyres today. Experience razor-sharp handling, hydroplane-free safety, and a quiet ride guaranteed by our 80,000 KM warranty.
          </p>

          {/* Action CTAs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={onFinderClick}
              className="btn btn-primary"
              style={{
                padding: "12px 26px",
                fontSize: "0.88rem",
              }}
            >
              <Compass size={16} />
              Find Your Tyre Now
            </button>

            <button
              onClick={onBookClick}
              className="btn btn-secondary"
              style={{
                padding: "12px 24px",
                fontSize: "0.88rem",
                borderColor: "rgba(255, 255, 255, 0.2)",
              }}
            >
              <PhoneCall size={16} color="var(--accent-crimson)" />
              Book Fitting Consultation
            </button>
          </div>

          {/* Guarantee Badges row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "24px",
              flexWrap: "wrap",
              marginTop: "24px",
              paddingTop: "20px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              fontSize: "0.8rem",
              color: "var(--text-silver)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <ShieldCheck size={16} color="var(--accent-crimson)" />
              <span>30-Day Ride Satisfaction Guarantee</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <ShieldCheck size={16} color="var(--accent-cyan)" />
              <span>Free Lifetime Rotation & Balancing</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <ShieldCheck size={16} color="var(--accent-amber)" />
              <span>24/7 Roadside Assistance Included</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
