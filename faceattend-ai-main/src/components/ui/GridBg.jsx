// ─── GridBg.jsx ──────────────────────────────────────────────────────────────
// Subtle dot/line grid overlay — place as first child inside a relative section
// Usage: <GridBg /> or <GridBg color="rgba(168,85,247,0.04)" size="60px" />

export default function GridBg({
  color = "rgba(0,245,255,0.03)",
  size  = "48px",
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(${color} 1px, transparent 1px),
          linear-gradient(90deg, ${color} 1px, transparent 1px)
        `,
        backgroundSize: `${size} ${size}`,
      }}
    />
  );
}
