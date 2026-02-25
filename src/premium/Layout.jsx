import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../components/TopNav";

export default function PremiumLayout() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", color: "#0f172a" }}>
      <header style={{ padding: 20 }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>AI Resume Builder</h1>
        <p style={{ margin: "6px 0 0", color: "#6b7280" }}>Build a resume that gets read.</p>
      </header>
      <TopNav />
      <main style={{ padding: 24 }}>
        <Outlet />
      </main>
      <footer style={{ padding: 16, textAlign: "center", color: "#9ca3af" }}>
        KodNest Premium Design System
      </footer>
    </div>
  );
}
