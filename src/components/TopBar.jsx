import React from "react";

export default function TopBar({ left, center, right }) {
  return (
    <div className="topbar">
      <div>{left}</div>
      <div>{center}</div>
      <div>{right}</div>
    </div>
  );
}
