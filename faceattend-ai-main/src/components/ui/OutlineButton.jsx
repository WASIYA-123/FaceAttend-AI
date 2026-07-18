// ─── OutlineButton.jsx ───────────────────────────────────────────────────────
// Secondary ghost/outline button — used alongside GradientButton
// Usage: <OutlineButton onClick={fn}><Icons.Github /> GitHub</OutlineButton>

import { motion } from "framer-motion";

export default function OutlineButton({
  children,
  onClick,
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
          ? { scale: 1.04, backgroundColor: "rgba(255,255,255,0.08)" }
          : undefined
      }
      whileTap={!disabled ? { scale: 0.96 } : undefined}
      className={[
        "flex items-center justify-center gap-2",
        "px-6 py-3 rounded-xl",
        "font-semibold text-[13px] text-white/80 hover:text-white",
        "border border-white/[0.12] bg-white/[0.04]",
        "transition-all duration-200",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className,
      ].join(" ")}
    >
      {children}
    </motion.button>
  );
}
