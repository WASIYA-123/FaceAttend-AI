// ─── StatCard.jsx ────────────────────────────────────────────────────────────
// Analytics stat card — used in all 3 dashboards + landing stats section
// Usage:
//   <StatCard
//     value="98.7%"  label="Recognition Accuracy"
//     change="+2.1%" changeLabel="vs last week"
//     color="#00f5ff" icon={<Icons.Brain />}
//   />

import { motion } from "framer-motion";

export default function StatCard({
  value,
  label,
  change,
  changeLabel = "",
  color       = "#00f5ff",
  icon,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
      className="group relative p-5 rounded-2xl overflow-hidden cursor-default
                 border border-white/[0.07] hover:border-white/[0.13]
                 bg-white/[0.025] transition-colors duration-300"
    >
      {/* hover glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl opacity-0
                   group-hover:opacity-100 transition-opacity duration-400
                   pointer-events-none"
        style={{
          background: `radial-gradient(circle at top left,
            ${color}08 0%, transparent 65%)`,
        }}
      />

      {/* top row: label + icon */}
      <div className="relative z-10 flex items-start justify-between mb-3">
        <span className="text-white/40 text-[12px] font-medium">{label}</span>
        {icon && (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${color}15`, color }}
          >
            <div className="w-4 h-4">{icon}</div>
          </div>
        )}
      </div>

      {/* value */}
      <div className="relative z-10 text-[28px] font-black text-white tracking-tight mb-1">
        {value}
      </div>

      {/* change indicator */}
      {change && (
        <div className="relative z-10 flex items-center gap-1.5">
          <span className="text-[11px] font-semibold" style={{ color }}>
            ↑ {change}
          </span>
          {changeLabel && (
            <span className="text-white/25 text-[11px]">{changeLabel}</span>
          )}
        </div>
      )}
    </motion.div>
  );
}
