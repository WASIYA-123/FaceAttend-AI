// ─── GradientButton.jsx ──────────────────────────────────────────────────────
// Primary CTA button with gradient fill + glow on hover
// Usage:
//   <GradientButton onClick={fn}>
//     <Icons.Camera className="w-4 h-4" /> Live Demo
//   </GradientButton>

import { motion } from "framer-motion";

export default function GradientButton({
  children,
  onClick,
  from      = "#00f5ff",
  to        = "#a855f7",
  className = "",
  type      = "button",
  disabled  = false,
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={
        !disabled
          ? { scale: 1.04, boxShadow: `0 0 32px ${to}45` }
          : undefined
      }
      whileTap={!disabled ? { scale: 0.96 } : undefined}
      className={[
        "flex items-center justify-center gap-2",
        "px-6 py-3 rounded-xl",
        "font-bold text-[13px] text-black",
        "transition-opacity",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className,
      ].join(" ")}
      style={{
        background: `linear-gradient(135deg, ${from}, ${to})`,
      }}
    >
      {children}
    </motion.button>
  );
}
