// ─── PulsingDot.jsx ──────────────────────────────────────────────────────────
// Dot with expanding ring pulse — used in timeline center nodes
// Usage: <PulsingDot color="#a855f7" delay={0.3} />

import { motion } from "framer-motion";

export default function PulsingDot({ color = "#00f5ff", delay = 0 }) {
  return (
    <div className="relative w-[14px] h-[14px] flex-shrink-0">
      {/* solid core */}
      <motion.div
        className="w-full h-full rounded-full"
        style={{
          background:  color,
          boxShadow:   `0 0 14px ${color}90`,
        }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.2, repeat: Infinity, delay, ease: "easeInOut" }}
      />
      {/* expanding ring */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-full border"
        style={{ borderColor: color }}
        animate={{ scale: [0.8, 2.4], opacity: [0.7, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay, ease: "easeOut" }}
      />
    </div>
  );
}
