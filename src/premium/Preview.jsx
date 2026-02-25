import React, { useEffect, useState } from "react";
import { loadData, saveData, computeScore, getImprovements } from "./resumeStore";
import { generatePlainText } from "./resumeStore";

export default function Preview() {
  const [data, setData] = useState({});
  const [score, setScore] = useState(0);
  const [template, setTemplate] = useState("Classic");
  const [improvements, setImprovements] = useState([]);

  useEffect(() => {
    const saved = loadData();
    if (saved) {
      setData(saved);
      setScore(computeScore(saved));
      setTemplate(saved.template || "Classic");
      setImprovements(getImprovements(saved));
    }
  }, []);

  function changeTemplate(t) {
    setTemplate(t);
    const next = { ...(data || {}), template: t };
    saveData(next);
    setData(next);
  }

  const { personal = {}, summary = "", education = [], experience = [], projects = [], skills = "", links = {} } = data;

  return (
    <div className={`preview-container template-${template.toLowerCase()}`} style={{ maxWidth: 760, margin: "0 auto", background: "#fff", padding: 24, borderRadius: 8, color: "#000" }}>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginBottom: 8 }}>
        <button
          className="btn"
          onClick={() => {
            // Validation warning (non-blocking)
            const missingName = !personal.name;
            const hasWork = (experience || []).some((e) => e && (e.title || e.desc)) || (projects || []).some((p) => p && (p.title || p.desc));
            if (missingName || !hasWork) {
              alert("Warning: Your resume may look incomplete.");
            }
            // Trigger print
            window.print();
          }}
        >
          Print / Save as PDF
        </button>
        <button
          className="btn secondary"
          onClick={async () => {
            const txt = generatePlainText(data);
            try {
              await navigator.clipboard.writeText(txt);
              alert("Resume copied as plain text.");
            } catch (e) {
              // fallback
              const ta = document.createElement("textarea");
              ta.value = txt;
              document.body.appendChild(ta);
              ta.select();
              document.execCommand("copy");
              document.body.removeChild(ta);
              alert("Resume copied as plain text.");
            }
          }}
        >
          Copy Resume as Text
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22 }}>{personal.name || "Your Name"}</h1>
          {(personal.email || personal.phone || personal.location) && (
            <div style={{ color: "#111827" }}>{[personal.email, personal.phone, personal.location].filter(Boolean).join(" • ")}</div>
          )}
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: 700 }}>ATS Readiness</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{score}</div>
        </div>
      </div>

      {/* Template tabs */}
      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        {["Classic", "Modern", "Minimal"].map((t) => (
          <button key={t} className={"btn " + (template === t ? "" : "secondary")} onClick={() => changeTemplate(t)}>
            {t}
          </button>
        ))}
      </div>

      {summary && (
        <section style={{ marginTop: 20 }}>
          <h2 style={{ fontSize: 14, margin: "6px 0", fontWeight: 700 }}>Summary</h2>
          <p style={{ margin: 0, lineHeight: 1.5 }}>{summary}</p>
        </section>
      )}

      {experience && experience.length > 0 && experience.some((e) => e && (e.title || e.org || e.desc)) && (
        <section style={{ marginTop: 16 }}>
          <h2 style={{ fontSize: 14, margin: "6px 0", fontWeight: 700 }}>Experience</h2>
          {experience.map((ex) =>
            ex && (ex.title || ex.org || ex.desc) ? (
              <div key={ex.id} style={{ marginTop: 8 }}>
                <div style={{ fontWeight: 700 }}>{ex.title || "Title"}{ex.org ? ` — ${ex.org}` : ""}</div>
                <div style={{ color: "#111827", fontSize: 13 }}>{ex.start}{ex.end ? ` — ${ex.end}` : ""}</div>
                {ex.desc ? <div style={{ marginTop: 6 }}>{ex.desc}</div> : null}
              </div>
            ) : null
          )}
        </section>
      )}

      {projects && projects.length > 0 && projects.some((p) => p && (p.title || p.desc)) && (
        <section style={{ marginTop: 16 }}>
          <h2 style={{ fontSize: 14, margin: "6px 0", fontWeight: 700 }}>Projects</h2>
          {projects.map((p) =>
            p && (p.title || p.desc) ? (
              <div key={p.id} style={{ marginTop: 8 }}>
                <div style={{ fontWeight: 700 }}>{p.title || "Project"}</div>
                {p.desc ? <div style={{ marginTop: 6 }}>{p.desc}</div> : null}
              </div>
            ) : null
          )}
        </section>
      )}

      {education && education.length > 0 && education.some((e) => e && (e.title || e.org)) && (
        <section style={{ marginTop: 16 }}>
          <h2 style={{ fontSize: 14, margin: "6px 0", fontWeight: 700 }}>Education</h2>
          {education.map((ed) =>
            ed && (ed.title || ed.org) ? (
              <div key={ed.id} style={{ marginTop: 8 }}>
                <div style={{ fontWeight: 700 }}>{ed.title || ""}{ed.org ? ` — ${ed.org}` : ""}</div>
                <div style={{ color: "#111827", fontSize: 13 }}>{ed.start}{ed.end ? ` — ${ed.end}` : ""}</div>
              </div>
            ) : null
          )}
        </section>
      )}

      {skills && (
        <section style={{ marginTop: 16 }}>
          <h2 style={{ fontSize: 14, margin: "6px 0", fontWeight: 700 }}>Skills</h2>
          <div>{skills}</div>
        </section>
      )}

      {(links.github || links.linkedin) && (
        <section style={{ marginTop: 16 }}>
          <h2 style={{ fontSize: 14, margin: "6px 0", fontWeight: 700 }}>Links</h2>
          <div style={{ color: "#111827" }}>
            {links.github ? <div><a href={links.github} target="_blank" rel="noreferrer">{links.github}</a></div> : null}
            {links.linkedin ? <div><a href={links.linkedin} target="_blank" rel="noreferrer">{links.linkedin}</a></div> : null}
          </div>
        </section>
      )}

      {/* Improvement panel */}
      {improvements.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div style={{ fontWeight: 700 }}>Top 3 Improvements</div>
          <ul style={{ marginTop: 8 }}>
            {improvements.map((imp, i) => (
              <li key={i} style={{ color: "#6b7280", fontSize: 13 }}>{imp}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
