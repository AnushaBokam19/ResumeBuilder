import React, { useState } from "react";

const STEP_KEYS = Array.from({ length: 8 }, (_, i) => `rb_step_${i + 1}_artifact`);

export default function Proof() {
  const [lovable, setLovable] = useState(localStorage.getItem("rb_lovable_link") || "");
  const [github, setGithub] = useState(localStorage.getItem("rb_github_link") || "");
  const [deploy, setDeploy] = useState(localStorage.getItem("rb_deploy_link") || "");

  function saveAll() {
    localStorage.setItem("rb_lovable_link", lovable);
    localStorage.setItem("rb_github_link", github);
    localStorage.setItem("rb_deploy_link", deploy);
    alert("Saved");
  }

  function copyFinal() {
    const steps = STEP_KEYS.map((k, i) => {
      return { step: i + 1, artifact: !!localStorage.getItem(k) };
    });
    const submission = {
      project: "AI Resume Builder — Build Track",
      steps,
      lovable,
      github,
      deploy
    };
    navigator.clipboard.writeText(JSON.stringify(submission, null, 2));
    alert("Final submission copied to clipboard");
  }

  return (
    <div>
      <h2>Proof / Final Submission</h2>
      <div>
        <h3>Step Status</h3>
        <ul>
          {STEP_KEYS.map((k, i) => (
            <li key={k}>
              Step {i + 1}: {localStorage.getItem(k) ? "Artifact uploaded" : "Missing"}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 12 }}>
        <label>Lovable link</label>
        <input className="link-input" value={lovable} onChange={(e) => setLovable(e.target.value)} />
      </div>
      <div style={{ marginTop: 8 }}>
        <label>GitHub link</label>
        <input className="link-input" value={github} onChange={(e) => setGithub(e.target.value)} />
      </div>
      <div style={{ marginTop: 8 }}>
        <label>Deploy link</label>
        <input className="link-input" value={deploy} onChange={(e) => setDeploy(e.target.value)} />
      </div>

      <div style={{ marginTop: 12 }} className="step-controls">
        <button className="btn" onClick={saveAll}>
          Save
        </button>
        <button className="btn secondary" onClick={copyFinal}>
          Copy Final Submission
        </button>
      </div>
    </div>
  );
}
