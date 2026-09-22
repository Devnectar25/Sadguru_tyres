import React, { useState, useRef } from "react";
import { ChevronRight, Settings, ShieldCheck, Gauge, Award, Sparkles, Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function Hero({ onExploreClick, onFinderClick, onServicesClick }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "78vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        padding: "20px 0 45px 0",
        overflow: "hidden",
        background: "#14110d",
        textAlign: "left",
      }}
    >
      {/* 1. FULL-BLEED RACING CAR BACKGROUND VIDEO */}
      <video
        ref={videoRef}
        src="/videos/hero_3d_tyre.mp4"
        poster="/images/tyre_tread_macro.jpg"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
          filter: "brightness(0.68) contrast(1.1) saturate(1.15) sepia(0.08)",
        }}
      />

      {/* 2. DARK LUXURY VIGNETTE OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: `
            linear-gradient(to bottom, rgba(20, 17, 13, 0.55) 0%, rgba(20, 17, 13, 0.25) 40%, rgba(20, 17, 13, 0.88) 100%),
            linear-gradient(to right, rgba(20, 17, 13, 0.75) 0%, rgba(20, 17, 13, 0.3) 55%, rgba(20, 17, 13, 0.65) 100%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* 3. SPEED GRID TEXTURE OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
          opacity: 0.35,
        }}
      />

      {/* 4. HERO CONTENT LAYER (20PX TOP GAP BELOW NAVBAR) */}
      <div className="container" style={{ position: "relative", zIndex: 10, width: "100%", paddingTop: "0px", marginTop: "0px" }}>
        <div
          style={{
            maxWidth: "780px",
            textAlign: "left",
            marginLeft: 0,
            paddingTop: "0px",
            marginTop: "0px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {/* Main Headline */}
          <h1
            className="animate-fade-in-up"
            style={{
              fontSize: "clamp(2.6rem, 5.5vw, 4.8rem)",
              lineHeight: 1.05,
              marginBottom: "20px",
              letterSpacing: "-0.03em",
              color: "#ffffff",
              textAlign: "left",
              textShadow: "0 10px 30px rgba(0,0,0,0.9)",
              userSelect: "none",
              WebkitUserSelect: "none",
              caretColor: "transparent",
              outline: "none",
            }}
          >
            Engineered for <br />
            <span
              style={{
                background: "linear-gradient(180deg, #f7f1e7 30%, #d9822f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                userSelect: "none",
                WebkitUserSelect: "none",
                caretColor: "transparent",
              }}
            >
              Every Journey.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p
            className="animate-fade-in-up animate-delay-1"
            style={{
              fontSize: "clamp(1.05rem, 1.3vw, 1.25rem)",
              color: "rgba(241, 245, 249, 0.9)",
              lineHeight: 1.6,
              marginBottom: "32px",
              maxWidth: "620px",
              textAlign: "left",
              textShadow: "0 4px 15px rgba(0,0,0,0.9)",
            }}
          >
            Uncompromising grip, whisper-quiet cruising, and track-proven durability. Experience next-generation silica compounds forged for high-performance sports cars, luxury SUVs, and daily driving.
          </p>

          {/* Action CTAs */}
          <div
            className="animate-fade-in-up animate-delay-2"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "18px",
              marginBottom: "44px",
              justifyContent: "flex-start",
            }}
          >
            <button
              onClick={onExploreClick}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "15px 36px",
                borderRadius: "8px",
                fontWeight: "700",
                fontSize: "0.96rem",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "var(--transition-smooth)",
                border: "none",
                background: "linear-gradient(135deg, #eba763, #cf7a30)",
                color: "#1c1712",
                boxShadow: "0 10px 25px rgba(217, 130, 47, 0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 14px 30px rgba(217, 130, 47, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(217, 130, 47, 0.25)";
              }}
            >
              Explore Tyres
              <ChevronRight size={18} color="#1c1712" />
            </button>

            <button
              onClick={onServicesClick || onFinderClick}
              className="btn btn-secondary"
              style={{
                padding: "15px 32px",
                fontSize: "0.96rem",
                background: "rgba(10, 14, 22, 0.75)",
                borderColor: "rgba(255, 255, 255, 0.2)",
                color: "#ffffff",
              }}
            >
              <Settings size={18} />
              View Services
            </button>
          </div>

          {/* Hero Telemetry Quick Strip */}
          <div
            className="animate-fade-in-up animate-delay-3"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "28px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(255, 255, 255, 0.12)",
              justifyContent: "flex-start",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                }}
              >
                <ShieldCheck size={20} />
              </div>
              <div>
                <div style={{ fontWeight: "700", fontSize: "0.95rem", color: "#fff" }}>
                  80,000 KM
                </div>
                <div style={{ fontSize: "0.74rem", color: "var(--text-dim)" }}>
                  Treadwear Warranty
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-cyan)",
                }}
              >
                <Gauge size={20} />
              </div>
              <div>
                <div style={{ fontWeight: "700", fontSize: "0.95rem", color: "#fff" }}>
                  -15% Shorter
                </div>
                <div style={{ fontSize: "0.74rem", color: "var(--text-dim)" }}>
                  Wet Braking Distance
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--accent-amber)",
                }}
              >
                <Award size={20} />
              </div>
              <div>
                <div style={{ fontWeight: "700", fontSize: "0.95rem", color: "#fff" }}>
                  BIS / ISI
                </div>
                <div style={{ fontSize: "0.74rem", color: "var(--text-dim)" }}>
                  Indian Certified
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. FLOATING VIDEO CONTROL BUTTONS (Bottom Right - Titanium Glass) */}
      <div
        style={{
          position: "absolute",
          bottom: "24px",
          right: "28px",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          gap: "12px",
          background: "rgba(10, 14, 22, 0.85)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          borderRadius: "999px",
          padding: "8px 14px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.8)",
        }}
      >
        <button
          onClick={togglePlay}
          style={{
            background: "none",
            border: "none",
            color: "var(--text-silver)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: 0,
            transition: "color 0.2s",
          }}
          title={isPlaying ? "Pause 3D Video" : "Play 3D Video"}
        >
          {isPlaying ? <Pause size={15} /> : <Play size={15} />}
        </button>

        <button
          onClick={toggleMute}
          style={{
            background: "none",
            border: "none",
            color: "var(--text-silver)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: 0,
            transition: "color 0.2s",
          }}
          title={isMuted ? "Unmute Audio" : "Mute Audio"}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
      </div>
    </section>
  );
}
