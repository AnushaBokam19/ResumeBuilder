import React from "react";

export default function StepPage({ step, title }) {
  return (
    <div>
      <div className="step-title">{`${step}. ${title}`}</div>
      <div className="muted">
        This route implements the step rail and gating. Resume features are intentionally not
        implemented yet.
      </div>

      <div style={{ marginTop: 16 }}>
        <strong>Instructions</strong>
        <p className="muted">
          Use the build panel on the right to copy into Lovable, build, and upload an artifact.
          You cannot proceed until an artifact has been uploaded for this step.
        </p>
      </div>
    </div>
  );
}
