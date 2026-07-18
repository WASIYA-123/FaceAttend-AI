// ─── DividerLine.jsx ─────────────────────────────────────────────────────────
// Subtle horizontal rule with fade edges — used between sections or in cards
// Usage: <DividerLine /> or <DividerLine color="rgba(168,85,247,0.12)" my="my-6" />

export default function DividerLine({
  color = "rgba(255,255,255,0.07)",
  my    = "my-8",
}) {
  return (
    <div
      aria-hidden="true"
      className={`w-full h-px ${my}`}
      style={{
        background: `linear-gradient(90deg,
          transparent, ${color}, transparent)`,
      }}
    />
  );
}
