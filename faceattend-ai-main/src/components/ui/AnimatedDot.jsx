// ─── AnimatedDot.jsx ─────────────────────────────────────────────────────────
// Pulsing colored circle — used in badges, live indicators, nav
// Usage: <AnimatedDot color="#00f5ff" size="w-2 h-2" delay={0.3} />

import { motion } from "framer-motion";

export default function AnimatedDot({
  color = "#00f5ff",
  size  = "w-[7px] h-[7px]",
  delay = 0,
}) {
  return (
    <motion.span
      aria-hidden="true"
      className={`${size} rounded-full inline-block flex-shrink-0`}
      style={{ background: color }}
      animate={{ opacity: [1, 0.2, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}
