// ─── SectionHeader.jsx ───────────────────────────────────────────────────────
// Full centered section header: badge + gradient title + subtitle
// Usage:
//   <SectionHeader
//     badge={<SectionBadge label="Features" color="#a855f7" />}
//     title="Everything you need to"
//     gradientText="automate attendance"
//     gradientColors={["#00f5ff", "#a855f7"]}
//     subtitle="From real-time detection to exportable reports."
//   />

import { motion } from "framer-motion";

export default function SectionHeader({
  badge,
  title,
  gradientText,
  gradientColors = ["#00f5ff", "#a855f7"],
  subtitle,
  align          = "center",   // "center" | "left"
  className      = "",
}) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
      className={`mb-16 ${isCenter ? "text-center" : "text-left"} ${className}`}
    >
      {/* badge slot */}
      {badge}

      {/* headline */}
      <h2
        className="text-4xl lg:text-[44px] font-black text-white
                   leading-[1.08] tracking-tight mb-4"
      >
        {title}{" "}
        {gradientText && (
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: `linear-gradient(135deg,
                ${gradientColors[0]}, ${gradientColors[1]})`,
            }}
          >
            {gradientText}
          </span>
        )}
      </h2>

      {/* subtitle */}
      {subtitle && (
        <p
          className={`text-white/40 text-[15px] leading-[1.75]
            ${isCenter ? "max-w-xl mx-auto" : "max-w-xl"}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
