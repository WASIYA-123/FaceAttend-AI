// ─── StatsSection.jsx ────────────────────────────────────────────────────────
// 4 animated stat cards proving the platform's performance
// Usage: <StatsSection />

import { motion }     from "framer-motion";
import GlowOrb        from "@/components/ui/GlowOrb";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader  from "@/components/ui/SectionHeader";

const STATS = [
  {
    num: "98.7%",
    label: "Recognition Accuracy",
    sub:   "FaceNet cosine similarity matching",
    color: "#00f5ff",
  },
  {
    num: "<200ms",
    label: "End-to-End Latency",
    sub:   "Frame to attendance record",
    color: "#a855f7",
  },
  {
    num: "128D",
    label: "Embedding Dimensions",
    sub:   "Per face via FaceNet / DeepFace",
    color: "#3b82f6",
  },
  {
    num: "0",
    label: "Proxy Attendances",
    sub:   "Biometric verification enforced",
    color: "#10b981",
  },
];

export default function StatsSection() {
  return (
    <SectionWrapper id="stats" bg="darker">
      {/* orb */}
      <GlowOrb color="#a855f7" size="600px" top="50%" left="30%" opacity={0.07} />

      {/* header */}
      <SectionHeader
        title="Proven by"
        gradientText="numbers"
        gradientColors={["#a855f7", "#00f5ff"]}
        subtitle="Real performance metrics from our AI recognition pipeline."
      />

      {/* stat cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="group relative text-center p-8 rounded-2xl cursor-default
                       border border-white/[0.06] hover:border-white/[0.12]
                       bg-white/[0.02] overflow-hidden
                       transition-colors duration-300"
          >
            {/* hover glow */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0
                         group-hover:opacity-100 transition-opacity duration-500
                         pointer-events-none"
              style={{
                background: `radial-gradient(circle at center,
                  ${stat.color}08 0%, transparent 70%)`,
              }}
            />

            {/* value */}
            <div
              className="text-5xl lg:text-6xl font-black mb-3
                         text-transparent bg-clip-text"
              style={{
                backgroundImage: `linear-gradient(135deg,
                  ${stat.color}, ${stat.color}88)`,
              }}
            >
              {stat.num}
            </div>

            <div className="text-white font-semibold text-[14px] mb-2">
              {stat.label}
            </div>
            <div className="text-white/35 text-[12px]">{stat.sub}</div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
