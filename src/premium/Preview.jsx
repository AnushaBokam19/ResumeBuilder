import React from "react";

export default function Preview() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", background: "#fff", padding: 24, borderRadius: 8 }}>
      <div style={{ fontFamily: "Georgia, serif", color: "#000" }}>
        <header style={{ marginBottom: 12 }}>
          <h1 style={{ margin: 0, fontSize: 22 }}>Your Name</h1>
          <div style={{ color: "#111827" }}>email@example.com • 555-0100 • Remote</div>
        </header>

        <section style={{ marginTop: 12 }}>
          <h2 style={{ fontSize: 14, margin: "6px 0", fontWeight: 700 }}>Summary</h2>
          <p style={{ margin: 0, lineHeight: 1.4 }}>A concise professional summary will appear here.</p>
        </section>

        <section style={{ marginTop: 12 }}>
          <h2 style={{ fontSize: 14, margin: "6px 0", fontWeight: 700 }}>Experience</h2>
          <div>
            <div style={{ fontWeight: 700 }}>Senior Engineer — Acme Co</div>
            <div style={{ color: "#111827" }}>2020 — Present</div>
            <ul>
              <li>Contributed to product features and design.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
