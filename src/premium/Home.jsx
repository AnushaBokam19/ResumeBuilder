import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center", paddingTop: 40 }}>
      <h2 style={{ fontSize: 36, margin: 0 }}>Build a Resume That Gets Read.</h2>
      <p style={{ color: "#6b7280", marginTop: 12 }}>
        A premium builder to craft resumes with calm, readable layouts.
      </p>
      <div style={{ marginTop: 24 }}>
        <button
          className="btn"
          style={{ padding: "12px 20px", fontSize: 16 }}
          onClick={() => navigate("/builder")}
        >
          Start Building
        </button>
      </div>
    </div>
  );
}
