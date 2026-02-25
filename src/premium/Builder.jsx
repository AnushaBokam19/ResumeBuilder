import React, { useState } from "react";

const emptyEntry = () => ({ id: Date.now() + Math.random(), title: "", org: "", start: "", end: "", desc: "" });

export default function Builder() {
  const [personal, setPersonal] = useState({ name: "", email: "", phone: "", location: "" });
  const [summary, setSummary] = useState("");
  const [education, setEducation] = useState([emptyEntry()]);
  const [experience, setExperience] = useState([emptyEntry()]);
  const [projects, setProjects] = useState([emptyEntry()]);
  const [skills, setSkills] = useState("");
  const [links, setLinks] = useState({ github: "", linkedin: "" });

  function add(arrSetter) {
    arrSetter((s) => [...s, emptyEntry()]);
  }

  function updateExperience(id, field, value) {
    setExperience((prev) => prev.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
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
          <button className="btn secondary" onClick={loadSample}>
            Load Sample Data
          </button>
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
          {education.map((ed, idx) => (
            <div key={ed.id} style={{ marginBottom: 8 }}>
              <input placeholder="Degree" className="link-input" />
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
                placeholder="Description"
                className="textarea"
                value={ex.desc}
                onChange={(e) => updateExperience(ex.id, "desc", e.target.value)}
                style={{ marginTop: 6, height: 60 }}
              />
            </div>
          ))}
          <button className="btn secondary" onClick={() => add(setExperience)}>
            Add Experience
          </button>
        </div>

        <div style={{ marginTop: 12 }}>
          <h4>Projects</h4>
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: 8 }}>
              <input placeholder="Project name" className="link-input" />
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
        <div style={{ border: "1px dashed #e5e7eb", padding: 12, minHeight: 400 }}>
          <div style={{ fontWeight: 700, fontSize: 18 }}>{personal.name || "Your Name"}</div>
          <div style={{ color: "#6b7280", marginBottom: 12 }}>{personal.email} • {personal.phone} • {personal.location}</div>
          <div style={{ marginTop: 8, marginBottom: 8, fontStyle: "italic", color: "#374151" }}>{summary || "Summary will appear here."}</div>
          <div style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 700 }}>Experience</div>
            {experience.length === 0 ? (
              <div style={{ color: "#6b7280" }}>No experience yet.</div>
            ) : (
              experience.map((ex) => (
                <div key={ex.id} style={{ marginTop: 8 }}>
                  <div style={{ fontWeight: 700 }}>{ex.title || "Title" } {ex.org ? `— ${ex.org}` : ""}</div>
                  <div style={{ color: "#6b7280", fontSize: 13 }}>{ex.start}{ex.end ? ` — ${ex.end}` : ""}</div>
                  {ex.desc ? <div style={{ marginTop: 4 }}>{ex.desc}</div> : null}
                </div>
              ))
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
