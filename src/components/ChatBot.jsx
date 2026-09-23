import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  Bot,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export default function ChatBot({
  onOpenFinder,
  onOpenBooking,
  onOpenCatalog,
  onOpenContact,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showHoverPopup, setShowHoverPopup] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const hoverTimerRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "bot",
      text: "Hello! 👋 Welcome to **Sadguru Tyres**. I'm your AI Tyre & Alignment Specialist. How can I help you today?",
      time: "Just now",
      actions: [
        { label: "🚗 Find Tyres for my car", type: "finder" },
        { label: "🔧 Book 3D Alignment", type: "booking", payload: "3D Wheel Alignment" },
        { label: "💰 View Pricing & Offers", type: "offers" },
        { label: "📞 Store Hours & Hotline", type: "contact" },
      ],
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatWindowRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Prevent scroll chaining to background document when reaching chatbot scroll boundaries
  useEffect(() => {
    const windowEl = chatWindowRef.current;
    if (!windowEl || !isOpen) return;

    const handleWheel = (e) => {
      const messagesEl = messagesContainerRef.current;
      if (!messagesEl) {
        e.preventDefault();
        return;
      }

      const isScrollable = messagesEl.scrollHeight > messagesEl.clientHeight;
      if (!isScrollable) {
        e.preventDefault();
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = messagesEl;
      const atTop = scrollTop <= 0 && e.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0;

      if (atTop || atBottom) {
        e.preventDefault();
      }
    };

    windowEl.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      windowEl.removeEventListener("wheel", handleWheel);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
      if (typeof window !== "undefined" && window.innerWidth <= 768) {
        document.body.style.overflow = "hidden";
      }
    } else {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [isOpen, messages, isTyping]);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    setShowHoverPopup(true);
    // Disappear in 3 seconds
    hoverTimerRef.current = setTimeout(() => {
      setShowHoverPopup(false);
    }, 3000);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    setShowHoverPopup(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    handleMouseLeave();
  };

  const handleToggle = () => {
    if (isOpen) {
      handleClose();
    } else {
      handleMouseLeave();
      setIsOpen(true);
    }
  };

  const executeAction = (action) => {
    if (!action) return;
    if (action.type === "finder") {
      handleClose();
      onOpenFinder?.();
    } else if (action.type === "booking") {
      handleClose();
      onOpenBooking?.(action.payload || "3D Wheel Alignment");
    } else if (action.type === "catalog") {
      handleClose();
      onOpenCatalog?.();
    } else if (action.type === "contact") {
      handleClose();
      onOpenContact?.();
    } else if (action.type === "call") {
      window.location.href = "tel:1800151100";
    } else if (action.type === "offers") {
      simulateReply("What offers and discounts are available currently?");
    }
  };

  const getBotResponse = (userText) => {
    const query = userText.toLowerCase().trim();

    // 1. Vehicle Models / Sizing / Tyre Finder
    if (
      query.includes("swift") ||
      query.includes("creta") ||
      query.includes("innova") ||
      query.includes("fortuner") ||
      query.includes("city") ||
      query.includes("nexon") ||
      query.includes("car") ||
      query.includes("suv") ||
      query.includes("size") ||
      query.includes("fit") ||
      query.includes("r14") ||
      query.includes("r15") ||
      query.includes("r16") ||
      query.includes("r17") ||
      query.includes("r18") ||
      query.includes("finder") ||
      query.includes("which tyre")
    ) {
      return {
        text: "We stock precision-matched tyres for all major vehicles (Maruti, Hyundai, Honda, Toyota, Tata, Mahindra & luxury brands) from Michelin, Bridgestone, CEAT, Apollo & Goodyear. You can launch our interactive Tyre Finder to filter by your exact car model or rim size!",
        actions: [
          { label: "🔍 Open Tyre Finder", type: "finder" },
          { label: "📦 Browse All Tyres", type: "catalog" },
          { label: "📞 Speak to Fitment Expert", type: "call" },
        ],
      };
    }

    // 2. Alignment / Balancing / Mechanical Services
    if (
      query.includes("align") ||
      query.includes("balance") ||
      query.includes("balancing") ||
      query.includes("nitrogen") ||
      query.includes("repair") ||
      query.includes("vibrat") ||
      query.includes("pull") ||
      query.includes("service") ||
      query.includes("tpms")
    ) {
      return {
        text: "Our workshop is equipped with Corghi 3D computerized camera alignment, high-speed dynamic wheel balancing, and automated touchless tyre changers to protect alloy rims. We recommend alignment check every 5,000 km or whenever you notice steering vibration.",
        actions: [
          { label: "📅 Book Alignment Bay", type: "booking", payload: "3D Wheel Alignment" },
          { label: "⚡ Book Dynamic Balancing", type: "booking", payload: "Robotic Wheel Balancing" },
          { label: "📞 Call Service Desk", type: "call" },
        ],
      };
    }

    // 3. Store Location / Timing / Contact / Phone
    if (
      query.includes("time") ||
      query.includes("hour") ||
      query.includes("open") ||
      query.includes("sunday") ||
      query.includes("phone") ||
      query.includes("number") ||
      query.includes("call") ||
      query.includes("location") ||
      query.includes("address") ||
      query.includes("where")
    ) {
      return {
        text: "📍 **Sadguru Tyres & Wheel Care Center**\n\n• **Operating Hours:** Mon – Sat: 9:00 AM – 8:00 PM (Closed Sundays)\n• **Helpline:** 1800 15 11 00 (Toll-Free)\n• **Email:** care@sadgurutyres.com\n• **Turnaround:** Express 30-minute fitment & alignment.",
        actions: [
          { label: "📞 Call Now: 1800 15 11 00", type: "call" },
          { label: "📍 View Contact Section", type: "contact" },
        ],
      };
    }

    // 4. Pricing / Cost / Offers / Warranty
    if (
      query.includes("price") ||
      query.includes("cost") ||
      query.includes("cheap") ||
      query.includes("rate") ||
      query.includes("how much") ||
      query.includes("offer") ||
      query.includes("discount") ||
      query.includes("deal") ||
      query.includes("warranty") ||
      query.includes("guarantee")
    ) {
      return {
        text: "Tyres start from **₹2,400** for entry hatchbacks up to **₹18,000+** for all-terrain SUV tyres. \n\n🎉 **Current Promotion:** Buy any set of 4 tyres and receive **FREE German tubeless valves**, **complimentary dynamic wheel balancing**, and up to **5-year manufacturer warranty** coverage!",
        actions: [
          { label: "📦 View Tyre Catalog & Prices", type: "catalog" },
          { label: "📞 Get Custom Quotation", type: "call" },
        ],
      };
    }

    // 5. Booking appointment
    if (
      query.includes("book") ||
      query.includes("appointment") ||
      query.includes("reserve") ||
      query.includes("slot")
    ) {
      return {
        text: "You can reserve a priority bay in advance to skip the queue! Choose your preferred service, date, and 30-minute time slot.",
        actions: [
          { label: "📅 Reserve Service Bay Now", type: "booking", payload: "3D Wheel Alignment" },
          { label: "📞 Call to Reserve by Phone", type: "call" },
        ],
      };
    }

    // 6. Greetings
    if (
      query.includes("hi") ||
      query.includes("hello") ||
      query.includes("hey") ||
      query.includes("good morning") ||
      query.includes("good evening") ||
      query.includes("namaste")
    ) {
      return {
        text: "Hello! Welcome to Sadguru Tyres. Are you looking to upgrade your tyres, check prices, or schedule a 3D alignment session?",
        actions: [
          { label: "🚗 Find Tyres for my car", type: "finder" },
          { label: "🔧 Book Service Appointment", type: "booking", payload: "3D Wheel Alignment" },
          { label: "📦 View Product Catalog", type: "catalog" },
        ],
      };
    }

    // Default Fallback
    return {
      text: "I can help you locate the exact tyre size for your vehicle, give pricing estimates, explain our 5-year warranty, or book a Corghi 3D alignment slot. What would you like to explore?",
      actions: [
        { label: "🔍 Launch Tyre Finder", type: "finder" },
        { label: "🔧 Book 3D Alignment", type: "booking", payload: "3D Wheel Alignment" },
        { label: "📞 Speak with an Expert", type: "call" },
      ],
    };
  };

  const simulateReply = (userQueryText) => {
    const userMsg = {
      id: "user-" + Date.now(),
      sender: "user",
      text: userQueryText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(userQueryText);
      const botMsg = {
        id: "bot-" + Date.now(),
        sender: "bot",
        text: botResponse.text,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actions: botResponse.actions,
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, 450);
  };

  const handleSend = (e) => {
    e?.preventDefault();
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");
    simulateReply(text);
  };

  return (
    <>
      {/* Floating Action Button & Hover Tooltip - Hidden when chatbot is open */}
      {!isOpen && (
        <div
          className="chatbot-fab-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            position: "fixed",
            bottom: "13px",
            right: "9px",
            zIndex: 995,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {/* Tooltip / Popup - Opens on hover on the LEFT side of the bot, disappears in 3 sec */}
          <div
            className="chatbot-tooltip-popup"
            onClick={handleToggle}
            role="button"
            tabIndex={0}
            style={{
              background: "#0f172a",
              color: "#ffffff",
              padding: "9px 16px",
              borderRadius: "14px",
              fontSize: "0.85rem",
              fontWeight: "600",
              boxShadow: "0 10px 25px rgba(15, 23, 42, 0.25)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              userSelect: "none",
              whiteSpace: "nowrap",
              transition: "opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              opacity: showHoverPopup ? 1 : 0,
              transform: showHoverPopup ? "translateX(0)" : "translateX(8px)",
              pointerEvents: showHoverPopup ? "auto" : "none",
            }}
          >
            <span style={{ fontSize: "1rem" }}>💬</span>
            <span>Chat with us</span>
          </div>

          {/* Floating Action Circular Button - White with Red Bot Icon */}
          <button
            onClick={handleToggle}
            aria-label="Open Tyre Chatbot"
            title="Chat with Tyre Assistant"
            style={{
              width: "58px",
              height: "58px",
              borderRadius: "50%",
              background: "#ffffff",
              border: "2px solid #ef4444",
              color: "#ef4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 10px 28px rgba(15, 23, 42, 0.16), 0 4px 14px rgba(239, 68, 68, 0.25)",
              transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              position: "relative",
              outline: "none",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.08)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(239, 68, 68, 0.35), 0 4px 16px rgba(15, 23, 42, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 10px 28px rgba(15, 23, 42, 0.16), 0 4px 14px rgba(239, 68, 68, 0.25)";
            }}
          >
            <Bot size={28} color="#ef4444" />
          </button>
        </div>
      )}

      {/* Floating Interactive Chat Window */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className="chatbot-window"
          style={{
            position: "fixed",
            bottom: "1px",
            right: "9px",
            width: "385px",
            maxWidth: "calc(100vw - 32px)",
            height: "530px",
            maxHeight: "calc(100vh - 48px)",
            background: "#ffffff",
            borderRadius: "22px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.25), 0 0 25px rgba(239, 68, 68, 0.08)",
            zIndex: 994,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            overscrollBehavior: "contain",
            animation: "chatWindowOpen 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Header */}
          <div
            className="chatbot-header"
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
              padding: "16px 18px",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(239, 68, 68, 0.3)",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "#ef4444",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  boxShadow: "0 0 10px rgba(239, 68, 68, 0.5)",
                }}
              >
                <Bot size={20} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "0.98rem",
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  SGT Assistant
                  <Sparkles size={14} color="#f87171" />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <button
                onClick={handleClose}
                title="Close Chat"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  color: "#e2e8f0",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(239, 68, 68, 0.8)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Quick Shortcuts Bar */}
          <div
            style={{
              padding: "8px 12px",
              background: "#f8fafc",
              borderBottom: "1px solid #e2e8f0",
              display: "flex",
              gap: "6px",
              overflowX: "auto",
              whiteSpace: "nowrap",
              scrollbarWidth: "none",
              flexShrink: 0,
            }}
          >
            {[
              { label: "🚗 Find Tyres", query: "Find tyres for my car" },
              { label: "🔧 3D Alignment", query: "I want to book 3D alignment" },
              { label: "💰 Pricing & Deals", query: "What offers and tyre prices are available?" },
              { label: "📍 Hours & Phone", query: "What are your store hours and contact number?" },
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => simulateReply(chip.query)}
                style={{
                  background: "#ffffff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "999px",
                  padding: "4px 10px",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#0f172a",
                  cursor: "pointer",
                  flexShrink: 0,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#ef4444";
                  e.currentTarget.style.color = "#ef4444";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#cbd5e1";
                  e.currentTarget.style.color = "#0f172a";
                }}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div
            ref={messagesContainerRef}
            className="chatbot-messages-area hide-scrollbar"
            style={{
              flexGrow: 1,
              padding: "16px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              background: "#ffffff",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              overscrollBehavior: "contain",
            }}
          >
            {messages.map((msg) => {
              const isBot = msg.sender === "bot";
              return (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isBot ? "flex-start" : "flex-end",
                    gap: "4px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      gap: "8px",
                      maxWidth: "88%",
                      flexDirection: isBot ? "row" : "row-reverse",
                    }}
                  >
                    {isBot && (
                      <div
                        style={{
                          width: "26px",
                          height: "26px",
                          borderRadius: "50%",
                          background: "#0f172a",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          fontSize: "0.75rem",
                        }}
                      >
                        <Bot size={15} />
                      </div>
                    )}
                    <div
                      style={{
                        background: isBot ? "#f1f5f9" : "#0f172a",
                        color: isBot ? "#0f172a" : "#ffffff",
                        padding: "11px 15px",
                        borderRadius: isBot
                          ? "16px 16px 16px 4px"
                          : "16px 16px 4px 16px",
                        fontSize: "0.86rem",
                        lineHeight: 1.5,
                        boxShadow: isBot
                          ? "0 2px 6px rgba(15, 23, 42, 0.04)"
                          : "0 4px 12px rgba(15, 23, 42, 0.15)",
                        border: isBot ? "1px solid #e2e8f0" : "none",
                        wordBreak: "break-word",
                      }}
                    >
                      {msg.text.split("\n").map((line, i) => (
                        <p key={i} style={{ margin: i > 0 ? "6px 0 0 0" : 0 }}>
                          {line.replace(/\*\*(.*?)\*\*/g, "$1")}
                        </p>
                      ))}

                      {/* Interactive Action Buttons inside Bot Message */}
                      {isBot && msg.actions && msg.actions.length > 0 && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px",
                            marginTop: "10px",
                          }}
                        >
                          {msg.actions.map((act, actIdx) => (
                            <button
                              key={actIdx}
                              onClick={() => executeAction(act)}
                              style={{
                                background: "#ffffff",
                                border: "1px solid #cbd5e1",
                                color: "#0f172a",
                                padding: "7px 12px",
                                borderRadius: "8px",
                                fontSize: "0.8rem",
                                fontWeight: "600",
                                cursor: "pointer",
                                textAlign: "left",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                transition: "all 0.2s",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "#ef4444";
                                e.currentTarget.style.color = "#ef4444";
                                e.currentTarget.style.background = "#fff5f5";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "#cbd5e1";
                                e.currentTarget.style.color = "#0f172a";
                                e.currentTarget.style.background = "#ffffff";
                              }}
                            >
                              <span>{act.label}</span>
                              <ExternalLink size={13} />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "0.68rem",
                      color: "#94a3b8",
                      marginRight: isBot ? 0 : "4px",
                      marginLeft: isBot ? "34px" : 0,
                    }}
                  >
                    {msg.time}
                  </span>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "8px",
                  maxWidth: "80%",
                }}
              >
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    background: "#0f172a",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Bot size={15} />
                </div>
                <div
                  style={{
                    background: "#f1f5f9",
                    padding: "10px 16px",
                    borderRadius: "16px 16px 16px 4px",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span className="typing-dot" />
                  <span className="typing-dot" style={{ animationDelay: "0.2s" }} />
                  <span className="typing-dot" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            className="chatbot-input-footer"
            onSubmit={handleSend}
            style={{
              padding: "12px 14px",
              background: "#ffffff",
              borderTop: "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              className="chatbot-input-field"
              type="text"
              placeholder="Ask about tyre sizes, alignment, prices..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flexGrow: 1,
                padding: "10px 14px",
                borderRadius: "999px",
                border: "1px solid #cbd5e1",
                background: "#f8fafc",
                fontSize: "0.85rem",
                outline: "none",
                color: "#0f172a",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#ef4444";
                e.currentTarget.style.background = "#ffffff";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#cbd5e1";
                e.currentTarget.style.background = "#f8fafc";
              }}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: input.trim() ? "#ef4444" : "#e2e8f0",
                color: input.trim() ? "#ffffff" : "#94a3b8",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: input.trim() ? "pointer" : "default",
                transition: "all 0.2s",
                flexShrink: 0,
              }}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Global Bot Animations & Styling */}
      <style>{`
        @keyframes floatSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        @keyframes chatWindowOpen {
          from {
            opacity: 0;
            transform: scale(0.92) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .typing-dot {
          width: 6px;
          height: 6px;
          background: #ef4444;
          border-radius: 50%;
          display: inline-block;
          animation: dotBlink 1.4s infinite ease-in-out both;
        }
        @keyframes dotBlink {
          0%, 80%, 100% {
            transform: scale(0.4);
            opacity: 0.4;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @media (max-width: 768px) {
          .chatbot-fab-container {
            bottom: 16px !important;
            right: 14px !important;
          }
          .chatbot-window {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            max-width: 100vw !important;
            height: 100vh !important;
            height: 100dvh !important;
            max-height: 100dvh !important;
            border-radius: 0 !important;
            border: none !important;
            box-shadow: none !important;
            z-index: 99999 !important;
            animation: mobileChatScreenOpen 0.28s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
          .chatbot-header {
            padding-top: max(16px, env(safe-area-inset-top, 16px)) !important;
            border-radius: 0 !important;
          }
          .chatbot-input-footer {
            padding-bottom: max(14px, env(safe-area-inset-bottom, 14px)) !important;
          }
          .chatbot-input-field {
            font-size: 16px !important;
          }
        }
        @keyframes mobileChatScreenOpen {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Invisible Scrollbars & Isolated Scroll Chaining */
        .chatbot-window,
        .chatbot-window *,
        .chatbot-messages-area {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
          overscroll-behavior: contain !important;
          overscroll-behavior-y: contain !important;
        }
        .chatbot-window::-webkit-scrollbar,
        .chatbot-window *::-webkit-scrollbar,
        .chatbot-messages-area::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        @media (hover: none) {
          .chatbot-tooltip-popup {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
