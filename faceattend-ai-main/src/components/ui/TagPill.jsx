// ─── TagPill.jsx ─────────────────────────────────────────────────────────────
// Small colored tag / pill badge — used on feature cards, tech badges, roles
// Usage: <TagPill label="YOLOv8" color="#00f5ff" size="sm" />

export default function TagPill({
  label,
  color = "#00f5ff",
  size  = "md",   // "sm" | "md"
}) {
  const sizeClass =
    size === "sm"
      ? "text-[10px] px-2 py-0.5"
      : "text-[11px] px-3 py-1";

  return (
    <span
      className={`font-mono font-bold rounded-full ${sizeClass}`}
      style={{
        background: `${color}14`,
        color,
        border:     `0.5px solid ${color}25`,
      }}
    >
      {label}
    </span>
  );
}
