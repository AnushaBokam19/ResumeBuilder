import React, { useState, useEffect } from "react";
import { loadData, saveData, computeScore, getSuggestions, evaluateBullets, getImprovements } from "./resumeStore";

const emptyEntry = () => ({ id: Date.now() + Math.random(), title: "", org: "", start: "", end: "", desc: "" });

export default function Builder() {
  const [personal, setPersonal] = useState({ name: "", email: "", phone: "", location: "" });
  const [summary, setSummary] = useState("");
  const [education, setEducation] = useState([emptyEntry()]);
  const [experience, setExperience] = useState([emptyEntry()]);
  const [projects, setProjects] = useState([emptyEntry()]);
  const [skills, setSkills] = useState("");
  const [links, setLinks] = useState({ github: "", linkedin: "" });
  const [score, setScore] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [template, setTemplate] = useState("Classic");
  const [improvements, setImprovements] = useState([]);

  // Load saved data on mount
  useEffect(() => {
    const saved = loadData();
    if (saved) {
      setPersonal(saved.personal || { name: "", email: "", phone: "", location: "" });
      setSummary(saved.summary || "");
      setEducation(saved.education && saved.education.length ? saved.education : [emptyEntry()]);
      setExperience(saved.experience && saved.experience.length ? saved.experience : [emptyEntry()]);
      setProjects(saved.projects && saved.projects.length ? saved.projects : [emptyEntry()]);
      setSkills(saved.skills || "");
      setLinks(saved.links || { github: "", linkedin: "" });
      setTemplate(saved.template || "Classic");
    }
  }, []);

  // Autosave and compute score/suggestions on change
  useEffect(() => {
    const data = { personal, summary, education, experience, projects, skills, links, template };
    saveData(data);
    setScore(computeScore(data));
    setSuggestions(getSuggestions(data));
    setImprovements(getImprovements(data));
  }, [personal, summary, education, experience, projects, skills, links, template]);

  function add(arrSetter) {
    arrSetter((s) => [...s, emptyEntry()]);
  }

  function updateExperience(id, field, value) {
    setExperience((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  }
 
  function updateEducation(id, field, value) {
    setEducation((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  }

  function updateProject(id, field, value) {
    setProjects((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  }

  function loadSample() {
    setPersonal({ name: "Alex Doe", email: "alex@example.com", phone: "555-0100", location: "Remote" });
    setSummary("Product-focused engineer with 6+ years building web apps.");
    setEducation([{ ...emptyEntry(), title: "B.S. Computer Science", org: "State University", start: "2014", end: "2018", desc: "" }]);
    setExperience([{ ...emptyEntry(), title: "Senior Engineer", org: "Acme Co", start: "2020", end: "Present", desc: "Led feature teams." }]);
    setProjects([{ ...emptyEntry(), title: "Resume Builder", org: "", start: "2023", end: "", desc: "Prototype resume builder." }]);
    setSkills("React,Node.js,TypeScript,GraphQL");
    setLinks({ github: "https://github.com/alex", linkedin: "https://linkedin.com/in/alex" });
  }

  return (
    <div style={{ display: "flex", gap: 24 }}>
      <section style={{ flex: 1, background: "#fff", padding: 20, borderRadius: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0 }}>Builder</h3>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ display: "flex", gap: 6 }}>
              {["Classic", "Modern", "Minimal"].map((t) => (
                <button
                  key={t}
                  className={"btn " + (template === t ? "" : "secondary")}
                  onClick={() => setTemplate(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <button className="btn secondary" onClick={loadSample}>
              Load Sample Data
            </button>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <h4>Personal Info</h4>
          <input placeholder="Name" value={personal.name} onChange={(e) => setPersonal({ ...personal, name: e.target.value })} className="link-input" />
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <input placeholder="Email" value={personal.email} onChange={(e) => setPersonal({ ...personal, email: e.target.value })} className="link-input" />
            <input placeholder="Phone" value={personal.phone} onChange={(e) => setPersonal({ ...personal, phone: e.target.value })} className="link-input" />
            <input placeholder="Location" value={personal.location} onChange={(e) => setPersonal({ ...personal, location: e.target.value })} className="link-input" />
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <h4>Summary</h4>
          <textarea className="textarea" value={summary} onChange={(e) => setSummary(e.target.value)} />
        </div>

        <div style={{ marginTop: 12 }}>
          <h4>Education</h4>
          {education.map((ed) => (
            <div key={ed.id} style={{ marginBottom: 8, borderRadius: 6, padding: 8, background: "#f8fafc" }}>
              <input
                placeholder="Degree / Title"
                className="link-input"
                value={ed.title}
                onChange={(e) => updateEducation(ed.id, "title", e.target.value)}
              />
              <input
                placeholder="School / Organization"
                className="link-input"
                value={ed.org}
                onChange={(e) => updateEducation(ed.id, "org", e.target.value)}
                style={{ marginTop: 6 }}
              />
              <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                <input
                  placeholder="Start"
                  className="link-input"
                  value={ed.start}
                  onChange={(e) => updateEducation(ed.id, "start", e.target.value)}
                />
                <input
                  placeholder="End"
                  className="link-input"
                  value={ed.end}
                  onChange={(e) => updateEducation(ed.id, "end", e.target.value)}
                />
              </div>
            </div>
          ))}
          <button className="btn secondary" onClick={() => add(setEducation)}>
            Add Education
          </button>
        </div>

        <div style={{ marginTop: 12 }}>
          <h4>Experience</h4>
          {experience.map((ex) => (
            <div key={ex.id} style={{ marginBottom: 8, borderRadius: 6, padding: 8, background: "#f8fafc" }}>
              <input
                placeholder="Title"
                className="link-input"
                value={ex.title}
                onChange={(e) => updateExperience(ex.id, "title", e.target.value)}
              />
              <input
                placeholder="Organization"
                className="link-input"
                value={ex.org}
                onChange={(e) => updateExperience(ex.id, "org", e.target.value)}
                style={{ marginTop: 6 }}
              />
              <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                <input
                  placeholder="Start"
                  className="link-input"
                  value={ex.start}
                  onChange={(e) => updateExperience(ex.id, "start", e.target.value)}
                />
                <input
                  placeholder="End"
                  className="link-input"
                  value={ex.end}
                  onChange={(e) => updateExperience(ex.id, "end", e.target.value)}
                />
              </div>
              <textarea
                placeholder="Description (use new lines for bullets)"
                className="textarea"
                value={ex.desc}
                onChange={(e) => updateExperience(ex.id, "desc", e.target.value)}
                style={{ marginTop: 6, height: 80 }}
              />
              {/* Bullet guidance */}
              <div style={{ marginTop: 6 }}>
                {evaluateBullets(ex.desc).map((b, i) => (
                  <div key={i} style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
                    • {b.text}
                    {!b.startsWithVerb && <span style={{ marginLeft: 8, opacity: 0.9 }}> — Start with a strong action verb.</span>}
                    {!b.hasNumber && <span style={{ marginLeft: 8, opacity: 0.9 }}> — Add measurable impact (numbers).</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button className="btn secondary" onClick={() => add(setExperience)}>
            Add Experience
          </button>
        </div>

        <div style={{ marginTop: 12 }}>
          <h4>Projects</h4>
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: 8, borderRadius: 6, padding: 8, background: "#f8fafc" }}>
              <input
                placeholder="Project name"
                className="link-input"
                value={p.title}
                onChange={(e) => updateProject(p.id, "title", e.target.value)}
              />
              <textarea
                placeholder="Description (use new lines for bullets)"
                className="textarea"
                value={p.desc}
                onChange={(e) => updateProject(p.id, "desc", e.target.value)}
                style={{ marginTop: 6, height: 80 }}
              />
              <div style={{ marginTop: 6 }}>
                {evaluateBullets(p.desc).map((b, i) => (
                  <div key={i} style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
                    • {b.text}
                    {!b.startsWithVerb && <span style={{ marginLeft: 8, opacity: 0.9 }}> — Start with a strong action verb.</span>}
                    {!b.hasNumber && <span style={{ marginLeft: 8, opacity: 0.9 }}> — Add measurable impact (numbers).</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button className="btn secondary" onClick={() => add(setProjects)}>
            Add Project
          </button>
        </div>

        <div style={{ marginTop: 12 }}>
          <h4>Skills</h4>
          <input placeholder="React,Node.js,TypeScript" className="link-input" value={skills} onChange={(e) => setSkills(e.target.value)} />
        </div>

        <div style={{ marginTop: 12 }}>
          <h4>Links</h4>
          <input placeholder="GitHub" className="link-input" value={links.github} onChange={(e) => setLinks({ ...links, github: e.target.value })} />
          <input placeholder="LinkedIn" className="link-input" value={links.linkedin} onChange={(e) => setLinks({ ...links, linkedin: e.target.value })} style={{ marginTop: 8 }} />
        </div>
      </section>

      <aside style={{ width: 420, background: "#fff", padding: 20, borderRadius: 8 }}>
        <h3 style={{ marginTop: 0 }}>Live Preview</h3>
        <div className={`live-preview template-${template.toLowerCase()}`} style={{ border: "1px dashed #e5e7eb", padding: 12, minHeight: 400 }}>
          {/* Score meter */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 700 }}>ATS Readiness Score</div>
              <div style={{ fontWeight: 700 }}>{score}</div>
            </div>
            <div style={{ height: 10, background: "#e6eef8", borderRadius: 8, marginTop: 6 }}>
              <div
                style={{
                  height: "100%",
                  width: `${Math.min(100, score)}%`,
                  background: "#0ea5a4",
                  borderRadius: 8
                }}
              />
            </div>
            {suggestions.length > 0 && (
              <ul style={{ marginTop: 8 }}>
                {suggestions.map((s, i) => (
                  <li key={i} style={{ color: "#6b7280", fontSize: 13 }}>
                    {s}
                  </li>
                ))}
              </ul>
            )}

            {/* Improvement panel */}
            {improvements.length > 0 && (
              <div style={{ marginTop: 10 }}>
                <div style={{ fontWeight: 700 }}>Top 3 Improvements</div>
                <ul style={{ marginTop: 6 }}>
                  {improvements.map((imp, i) => (
                    <li key={i} style={{ color: "#6b7280", fontSize: 13 }}>{imp}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Resume content */}
          <div style={{ fontWeight: 700, fontSize: 18 }}>{personal.name || "Your Name"}</div>
          {(personal.email || personal.phone || personal.location) && (
            <div style={{ color: "#6b7280", marginBottom: 12 }}>
              {personal.email} {personal.email && (personal.phone || personal.location) ? " • " : ""} {personal.phone} {personal.phone && personal.location ? " • " : ""} {personal.location}
            </div>
          )}

          {summary ? (
            <div style={{ marginTop: 8, marginBottom: 8, fontStyle: "italic", color: "#374151" }}>
              {summary}
            </div>
          ) : null}

          {education && education.some((e) => e && (e.title || e.org)) && (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: 700 }}>Education</div>
              {education.map((ed) =>
                ed && (ed.title || ed.org) ? (
                  <div key={ed.id} style={{ marginTop: 6 }}>
                    <div style={{ fontWeight: 700 }}>{ed.title || ""} {ed.org ? `— ${ed.org}` : ""}</div>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>{ed.start}{ed.end ? ` — ${ed.end}` : ""}</div>
                  </div>
                ) : null
              )}
            </div>
          )}

          {experience && experience.some((ex) => ex && (ex.title || ex.org || ex.desc)) && (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: 700 }}>Experience</div>
              {experience.map((ex) =>
                ex && (ex.title || ex.org || ex.desc) ? (
                  <div key={ex.id} style={{ marginTop: 8 }}>
                    <div style={{ fontWeight: 700 }}>{ex.title || "Title"} {ex.org ? `— ${ex.org}` : ""}</div>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>{ex.start}{ex.end ? ` — ${ex.end}` : ""}</div>
                    {ex.desc ? <div style={{ marginTop: 4 }}>{ex.desc}</div> : null}
                  </div>
                ) : null
              )}
            </div>
          )}

          {projects && projects.some((p) => p && (p.title || p.desc)) && (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: 700 }}>Projects</div>
              {projects.map((p) =>
                p && (p.title || p.desc) ? (
                  <div key={p.id} style={{ marginTop: 8 }}>
                    <div style={{ fontWeight: 700 }}>{p.title || "Project"}</div>
                    {p.desc ? <div style={{ marginTop: 4 }}>{p.desc}</div> : null}
                  </div>
                ) : null
              )}
            </div>
          )}

          {skills ? (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: 700 }}>Skills</div>
              <div style={{ color: "#6b7280" }}>{skills}</div>
            </div>
          ) : null}

          {(links.github || links.linkedin) && (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontWeight: 700 }}>Links</div>
              <div style={{ color: "#6b7280" }}>
                {links.github ? <div><a href={links.github} target="_blank" rel="noreferrer">{links.github}</a></div> : null}
                {links.linkedin ? <div><a href={links.linkedin} target="_blank" rel="noreferrer">{links.linkedin}</a></div> : null}
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
