import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const STEP_PATHS = [
  "/rb/01-problem",
  "/rb/02-market",
  "/rb/03-architecture",
  "/rb/04-hld",
  "/rb/05-lld",
  "/rb/06-build",
  "/rb/07-test",
  "/rb/08-ship"
];

function pathToStep(pathname) {
  const idx = STEP_PATHS.indexOf(pathname);
  return idx >= 0 ? idx + 1 : null;
}

export default function BuildPanel({ step, navigate }) {
  const location = useLocation();
  const currentStep = pathToStep(location.pathname);
  const [text, setText] = useState("");
  const [artifact, setArtifact] = useState(localStorage.getItem(`rb_step_${currentStep}_artifact`) || null);
  const [status, setStatus] = useState(localStorage.getItem(`rb_step_${currentStep}_status`) || "");

  useEffect(() => {
    setArtifact(localStorage.getItem(`rb_step_${currentStep}_artifact`) || null);
    setStatus(localStorage.getItem(`rb_step_${currentStep}_status`) || "");
    setText("");
  }, [currentStep]);

  function copyText() {
    navigator.clipboard.writeText(text || "");
    alert("Copied");
  }

  function onFileChange(e) {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem(`rb_step_${currentStep}_artifact`, reader.result);
      setArtifact("uploaded");
      alert("Artifact uploaded");
    };
    reader.readAsDataURL(f);
  }

  function markStatus(s) {
    localStorage.setItem(`rb_step_${currentStep}_status`, s);
    setStatus(s);
  }

  function goNext() {
    if (!artifact) return;
    const nextIdx = STEP_PATHS.indexOf(location.pathname) + 1;
    if (nextIdx < STEP_PATHS.length) {
      navigate(STEP_PATHS[nextIdx]);
    } else {
      navigate("/rb/proof");
    }
  }

  return (
    <div>
      <h3>Copy This Into Lovable</h3>
      <textarea className="textarea" value={text} onChange={(e) => setText(e.target.value)} />
      <div style={{ marginTop: 8 }}>
        <button className="btn" onClick={copyText}>
          Copy
        </button>
        <button
          className="btn secondary"
          onClick={() => window.open("https://lovable.example.com", "_blank")}
        >
          Build in Lovable
        </button>
      </div>

      <hr style={{ margin: "12px 0" }} />

      <div>
        <label className="muted">Upload artifact for this step</label>
        <input type="file" onChange={onFileChange} />
        <div style={{ marginTop: 8 }}>
          <button
            className="btn"
            onClick={goNext}
            disabled={!artifact}
            title={!artifact ? "Upload artifact to enable Next" : "Go to next step"}
          >
            Next
          </button>
          <span className="muted"> {artifact ? "Artifact present" : "No artifact uploaded"}</span>
        </div>
      </div>

      <hr style={{ margin: "12px 0" }} />
      <div>
        <div className="muted">Build result</div>
        <div className="step-controls" style={{ marginTop: 8 }}>
          <button className="btn" onClick={() => markStatus("It Worked")}>
            It Worked
          </button>
          <button className="btn secondary" onClick={() => markStatus("Error")}>
            Error
          </button>
          <button className="btn secondary" onClick={() => markStatus("Add Screenshot")}>
            Add Screenshot
          </button>
          <div style={{ marginLeft: 8 }}>{status ? <span>{status}</span> : null}</div>
        </div>
      </div>
    </div>
  );
}
