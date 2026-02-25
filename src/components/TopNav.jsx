import React from "react";
import { NavLink } from "react-router-dom";

export default function TopNav() {
  return (
    <nav style={{ background: "#ffffff", padding: 12, borderBottom: "1px solid #e6eef8" }}>
      <div style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "center" }}>
        <NavLink to="/builder" style={({ isActive }) => ({ fontWeight: isActive ? 700 : 500, color: "#111827", textDecoration: "none" })}>
          Builder
        </NavLink>
        <NavLink to="/preview" style={({ isActive }) => ({ fontWeight: isActive ? 700 : 500, color: "#111827", textDecoration: "none" })}>
          Preview
        </NavLink>
        <NavLink to="/proof" style={({ isActive }) => ({ fontWeight: isActive ? 700 : 500, color: "#111827", textDecoration: "none" })}>
          Proof
        </NavLink>
      </div>
    </nav>
  );
}
