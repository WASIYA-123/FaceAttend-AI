// ─── ParticleField.jsx ───────────────────────────────────────────────────────
// Floating ambient particles for hero background depth
// Usage: <ParticleField count={30} /> — place inside a relative container

import { useMemo } from "react";
import { motion }  from "framer-motion";

const COLORS = ["#00f5ff", "#a855f7", "#3b82f6"];

export default function ParticleField({ count = 28 }) {
  // generate stable random particles (memo so they don't re-randomise on render)
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id:       i,
        x:        Math.random() * 100,          // % left
        y:        Math.random() * 100,          // % top
        size:     Math.random() * 2.5 + 0.8,   // px radius
        color:    COLORS[i % COLORS.length],
        opacity:  Math.random() * 0.35 + 0.08,
        duration: Math.random() * 8  + 5,
        delay:    Math.random() * 4,
        floatY:   Math.random() * 24 + 10,     // float distance px
      })),
    [count]
  );

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left:       `${p.x}%`,
            top:        `${p.y}%`,
            width:      p.size,
            height:     p.size,
            background: p.color,
            opacity:    p.opacity,
          }}
          animate={{
            y:       [0, -p.floatY, 0],
            opacity: [p.opacity, p.opacity * 2.2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay:    p.delay,
            repeat:   Infinity,
            ease:     "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
