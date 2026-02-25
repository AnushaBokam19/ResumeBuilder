import React, { useEffect, useState } from "react";
import { loadData, computeScore } from "./resumeStore";

export default function Preview() {
  const [data, setData] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    const saved = loadData();
    if (saved) {
      setData(saved);
      setScore(computeScore(saved));
    }
  }, []);

  const { personal = {}, summary = "", education = [], experience = [], projects = [], skills = "", links = {} } = data;

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", background: "#fff", padding: 24, borderRadius: 8, color: "#000" }}>
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
    </div>
  );
}
