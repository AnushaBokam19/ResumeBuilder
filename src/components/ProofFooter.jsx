import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProofFooter() {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div className="muted">Proof footer — ready to submit when all steps complete</div>
      <div>
        <button className="btn" onClick={() => navigate("/rb/proof")}>
          Go to Proof
        </button>
      </div>
    </div>
  );
}
