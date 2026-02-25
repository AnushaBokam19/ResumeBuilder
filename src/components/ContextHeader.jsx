import React from "react";

export default function ContextHeader({ step }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <strong>Build Track</strong>
        <div className="muted">Follow the steps to produce build artifacts</div>
      </div>
      <div>{step ? <span className="status-pill">Step {step} of 8</span> : null}</div>
    </div>
  );
}
