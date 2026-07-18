// ─── GlowOrb.jsx ─────────────────────────────────────────────────────────────
// Decorative blurred color blob used for background depth/atmosphere
// Usage: <GlowOrb color="#00f5ff" size="400px" top="10%" left="20%" />

export default function GlowOrb({
  color   = "#00f5ff",
  size    = "400px",
  top,
  left,
  right,
  bottom,
  opacity = 0.08,
  blur    = "90px",
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute rounded-full pointer-events-none"
      style={{
        width:    size,
        height:   size,
        top,
        left,
        right,
        bottom,
        background: color,
        filter:     `blur(${blur})`,
        opacity,
      }}
    />
  );
}
