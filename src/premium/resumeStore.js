// Utilities for persistence and ATS scoring
export const STORAGE_KEY = "resumeBuilderData";

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    return false;
  }
}

function wordCount(text = "") {
  return (text || "").trim().split(/\s+/).filter(Boolean).length;
}

function hasNumbers(text = "") {
  return /\d|%|k\b/i.test(text || "");
}

export function computeScore(data = {}) {
  let score = 0;
  const summaryWords = wordCount(data.summary);
  if (summaryWords >= 40 && summaryWords <= 120) score += 15;
  const projectCount = (data.projects || []).filter(Boolean).length;
  if (projectCount >= 2) score += 10;
  const expCount = (data.experience || []).length;
  if (expCount >= 1) score += 10;
  const skillsCount = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean).length;
  if (skillsCount >= 8) score += 10;
  if ((data.links && (data.links.github || data.links.linkedin)) ) score += 10;

  // measurable impact: any experience or project description contains numbers or % or 'k'
  const anyMeasurable =
    (data.experience || []).some((e) => hasNumbers(e.desc)) ||
    (data.projects || []).some((p) => hasNumbers(p.desc));
  if (anyMeasurable) score += 15;

  // education complete: at least one entry with title, org, start, end
  const eduComplete = (data.education || []).some(
    (ed) => ed && ed.title && ed.org && ed.start && ed.end
  );
  if (eduComplete) score += 10;

  if (score > 100) score = 100;
  return score;
}

export function getSuggestions(data = {}) {
  const suggestions = [];
  const summaryWords = wordCount(data.summary);
  const projectCount = (data.projects || []).filter(Boolean).length;
  const expCount = (data.experience || []).length;
  const skillsCount = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean).length;
  const hasLink = data.links && (data.links.github || data.links.linkedin);
  const anyMeasurable =
    (data.experience || []).some((e) => hasNumbers(e.desc)) ||
    (data.projects || []).some((p) => hasNumbers(p.desc));

  if (projectCount < 2) suggestions.push("Add at least 2 projects.");
  if (!anyMeasurable) suggestions.push("Add measurable impact (numbers) in bullets.");
  if (skillsCount < 8) suggestions.push("Add more skills (target 8+).");
  if (summaryWords < 40 || summaryWords > 120) suggestions.push("Write a stronger summary (40–120 words).");
  if (!hasLink) suggestions.push("Add a GitHub or LinkedIn link.");
  if (expCount === 0) suggestions.push("Add at least one experience entry.");
  if (suggestions.length > 3) return suggestions.slice(0, 3);
  return suggestions;
}

// Action verbs used for bullet guidance
export const ACTION_VERBS = [
  "Built",
  "Developed",
  "Designed",
  "Implemented",
  "Led",
  "Improved",
  "Created",
  "Optimized",
  "Automated",
  "Built",
  "Managed",
  "Reduced",
  "Increased",
  "Decreased"
];

// Evaluate bullets in a multi-line description. Returns array of { text, startsWithVerb, hasNumber }
export function evaluateBullets(text = "") {
  const lines = (text || "").split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  return lines.map((line) => {
    const startsWithVerb = ACTION_VERBS.some((v) => {
      const re = new RegExp("^" + v + "\\b", "i");
      return re.test(line);
    });
    const hasNumberFlag = hasNumbers(line);
    return { text: line, startsWithVerb, hasNumber: hasNumberFlag };
  });
}

// Top improvements (prioritized). Returns up to 3 improvement strings.
export function getImprovements(data = {}) {
  const improvements = [];
  const summaryWords = wordCount(data.summary);
  const projectCount = (data.projects || []).filter(Boolean).length;
  const expCount = (data.experience || []).length;
  const skillsCount = (data.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean).length;
  const anyMeasurable =
    (data.experience || []).some((e) => hasNumbers(e.desc)) ||
    (data.projects || []).some((p) => hasNumbers(p.desc));

  if (projectCount < 2) improvements.push("Add at least 2 projects.");
  if (!anyMeasurable) improvements.push("Add measurable impact (numbers) in bullets.");
  if (summaryWords < 40) improvements.push("Expand your summary to ~40–120 words.");
  if (skillsCount < 8) improvements.push("Add more skills (target 8+).");
  if (expCount === 0) improvements.push("Add experience — include internships or project work.");

  return improvements.slice(0, 3);
}

export function generatePlainText(data = {}) {
  const { personal = {}, summary = "", education = [], experience = [], projects = [], skills = "", links = {} } = data;
  const lines = [];
  if (personal.name) lines.push(personal.name);
  const contact = [personal.email, personal.phone, personal.location].filter(Boolean).join(" • ");
  if (contact) lines.push(contact);
  lines.push("");
  if (summary) {
    lines.push("Summary");
    lines.push(summary);
    lines.push("");
  }
  if (education && education.length > 0 && education.some((e) => e && (e.title || e.org))) {
    lines.push("Education");
    education.forEach((ed) => {
      if (ed && (ed.title || ed.org)) {
        lines.push(`${ed.title || ""}${ed.org ? " — " + ed.org : ""}${ed.start || ed.end ? " (" + [ed.start, ed.end].filter(Boolean).join(" — ") + ")" : ""}`);
      }
    });
    lines.push("");
  }
  if (experience && experience.length > 0 && experience.some((e) => e && (e.title || e.org || e.desc))) {
    lines.push("Experience");
    experience.forEach((ex) => {
      if (ex && (ex.title || ex.org || ex.desc)) {
        lines.push(`${ex.title || ""}${ex.org ? " — " + ex.org : ""}${ex.start || ex.end ? " (" + [ex.start, ex.end].filter(Boolean).join(" — ") + ")" : ""}`);
        if (ex.desc) lines.push(ex.desc);
        lines.push("");
      }
    });
  }
  if (projects && projects.length > 0 && projects.some((p) => p && (p.title || p.desc))) {
    lines.push("Projects");
    projects.forEach((p) => {
      if (p && (p.title || p.desc)) {
        lines.push(`${p.title || ""}`);
        if (p.desc) lines.push(p.desc);
        lines.push("");
      }
    });
  }
  if (skills) {
    lines.push("Skills");
    lines.push(skills);
    lines.push("");
  }
  if (links && (links.github || links.linkedin)) {
    lines.push("Links");
    if (links.github) lines.push(`GitHub: ${links.github}`);
    if (links.linkedin) lines.push(`LinkedIn: ${links.linkedin}`);
    lines.push("");
  }
  return lines.join("\n");
}

