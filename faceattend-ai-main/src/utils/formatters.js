// ─── formatters.js ───────────────────────────────────────────────────────────
// Shared formatting helpers

export const fmtPercent  = (n) => `${Math.round(n)}%`;
export const fmtDate     = (d) => new Date(d).toLocaleDateString("en-US",
  { year:"numeric", month:"short", day:"numeric" });
export const fmtTime     = (d) => new Date(d).toLocaleTimeString("en-US",
  { hour:"2-digit", minute:"2-digit" });
export const fmtDuration = (s) =>
  `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

export const attendanceStatus = (rate) =>
  rate >= 85 ? "excellent" :
  rate >= 75 ? "good"      :
  rate >= 60 ? "warning"   : "critical";

export const attendanceColor = (rate) =>
  rate >= 85 ? "#10b981" :
  rate >= 75 ? "#3b82f6" :
  rate >= 60 ? "#f59e0b" : "#ef4444";
