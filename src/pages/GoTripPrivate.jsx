import React from "react";

export default function GoTripPrivate() {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        marginTop: "40px",
        marginBottom: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "500px", // 🔥 Smaller card
          width: "100%",
          padding: "28px", // 🔥 Reduced padding
          borderRadius: "16px",
          backdropFilter: "blur(12px)",
          background: "rgba(255, 255, 255, 0.06)",
          border: "1px solid rgba(255, 255, 255, 0.12)",

          // 🔴 Softer red neon glow (balanced)
          boxShadow: "0 0 22px rgba(255, 60, 60, 0.45)",

          textAlign: "center",
          color: "white",
          animation: "fadeIn 0.8s ease",
        }}
      >
        <div style={{ fontSize: "38px", marginBottom: "8px" }}>🔒</div>

        <h1
          style={{
            fontSize: "22px",
            fontWeight: "700",
            marginBottom: "12px",
            color: "rgb(255, 70, 70)",
          }}
        >
          GoTrip Repository is Private
        </h1>

        {/* LIVE DEMO BUTTON */}
        <a
          href="https://go-trip-six.vercel.app/"
          style={{
            marginTop: "6px",
            padding: "10px 18px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #ff4b4b, #ff1f1f)",
            color: "white",
            display: "inline-block",
            fontSize: "14px",
            fontWeight: "600",
            textDecoration: "none",
            boxShadow: "0 0 10px rgba(255, 60, 60, 0.6)",
            marginBottom: "14px",
          }}
        >
          🚀 View Live Demo
        </a>

        <p style={{ fontSize: "14px", opacity: 0.85, lineHeight: "1.5" }}>
          Thank you for your interest in 
          <strong> GoTrip – AI Powered Travel Planner</strong>.
        </p>

        <p
          style={{
            marginTop: "12px",
            fontSize: "13px",
            opacity: 0.75,
            lineHeight: "1.5",
          }}
        >
          For security & licensing reasons, this project’s source code is not
          publicly available.  
          If you're a recruiter or collaborator, I'm happy to provide access privately.
        </p>

        <div
          style={{
            marginTop: "20px",
            padding: "12px 18px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #6a5af9, #9353ff)",
            color: "white",
            display: "inline-block",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            userSelect: "text",
          }}
        >
          📧 manishsinghbst0322@gmail.com
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
