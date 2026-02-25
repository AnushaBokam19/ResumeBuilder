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

