// ─── GlassCard.jsx ───────────────────────────────────────────────────────────
// Base glassmorphism card — used across landing sections + all dashboards
// Usage:
//   <GlassCard>...</GlassCard>
//   <GlassCard hoverLift hoverGlow glowColor="#a855f7" onClick={fn}>...</GlassCard>

import { motion } from "framer-motion";

export default function GlassCard({
  children,
  className  = "",
  style      = {},
  hoverLift  = false,
  hoverGlow  = false,
  glowColor  = "#00f5ff",
  onClick,
  padding    = "p-6",
}) {
  return (
    <motion.div
      whileHover={
        hoverLift
          ? { y: -4, transition: { duration: 0.2 } }
          : undefined
      }
      onClick={onClick}
      className={[
        "group relative rounded-2xl overflow-hidden",
        "border border-white/[0.07] hover:border-white/[0.13]",
        "bg-white/[0.025]",
        "transition-colors duration-300",
        onClick ? "cursor-pointer" : "cursor-default",
        padding,
        className,
      ].join(" ")}
      style={style}
    >
      {/* optional radial glow on hover */}
      {hoverGlow && (
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl opacity-0
                     group-hover:opacity-100 transition-opacity duration-500
                     pointer-events-none"
          style={{
            background: `radial-gradient(circle at top left,
              ${glowColor}09 0%, transparent 65%)`,
          }}
        />
      )}

      {/* content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
