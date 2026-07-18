// ─── LiveBadge.jsx ───────────────────────────────────────────────────────────
// Animated "Live" indicator pill — used in dashboards + navbar
// Usage: <LiveBadge /> or <LiveBadge label="Session Active" color="#10b981" />

import AnimatedDot from "./AnimatedDot";

export default function LiveBadge({
  label = "Live",
  color = "#10b981",
}) {
  return (
    <div
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                 font-semibold font-mono text-[11px]"
      style={{
        background: `${color}10`,
        border:     `0.5px solid ${color}25`,
        color,
      }}
    >
      <AnimatedDot color={color} size="w-1.5 h-1.5" />
      {label}
    </div>
  );
}
