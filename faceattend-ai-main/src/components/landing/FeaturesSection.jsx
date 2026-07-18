// ─── FeaturesSection.jsx ─────────────────────────────────────────────────────
// 6 feature cards in a responsive 3-col grid with hover glow + slide-in
// Usage: <FeaturesSection />

import { motion }       from "framer-motion";
import { Icons }        from "@/components/shared/Icons";
import GlowOrb          from "@/components/ui/GlowOrb";
import GridBg           from "@/components/ui/GridBg";
import SectionBadge     from "@/components/ui/SectionBadge";
import SectionHeader    from "@/components/ui/SectionHeader";
import SectionWrapper   from "@/components/ui/SectionWrapper";
import TagPill          from "@/components/ui/TagPill";

// ── feature data ──────────────────────────────────────────────────────────────
const FEATURES = [
  {
    tag: "YOLOv8", color: "#00f5ff",
    icon: <Icons.Camera />,
    title: "Real-Time Face Detection",
    desc:  "YOLOv8 detects and crops all faces in each video frame with sub-200ms latency, even in crowded classrooms.",
  },
  {
    tag: "FaceNet", color: "#a855f7",
    icon: <Icons.Brain />,
    title: "Deep Face Recognition",
    desc:  "FaceNet generates 128-dimensional embeddings per face. Cosine similarity matching ensures 98.7%+ accuracy.",
  },
  {
    tag: "Security", color: "#3b82f6",
    icon: <Icons.Shield />,
    title: "Zero Proxy Attendance",
    desc:  "Biometric verification makes proxy attendance physically impossible. Every mark is cryptographically logged.",
  },
  {
    tag: "Analytics", color: "#10b981",
    icon: <Icons.BarChart />,
    title: "Instant Analytics",
    desc:  "Live dashboards, course-wise reports, and warning indicators for students falling below thresholds.",
  },
  {
    tag: "JWT Auth", color: "#f59e0b",
    icon: <Icons.Users />,
    title: "3-Role Access Control",
    desc:  "Separate JWT-authenticated portals for Admin, Teacher, and Student with role-specific data visibility.",
  },
  {
    tag: "Cross-Platform", color: "#ec4899",
    icon: <Icons.Globe />,
    title: "Web + Mobile",
    desc:  "Full-featured React web portal plus React Native mobile app sharing the same Node.js + FastAPI backend.",
  },
];

// ── FeatureCard ───────────────────────────────────────────────────────────────
const FeatureCard = ({ feature, index }) => {
  const { tag, color, icon, title, desc } = feature;

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.48, delay: index * 0.08 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative rounded-2xl p-6 cursor-default overflow-hidden
                 border border-white/[0.07] hover:border-white/[0.13]
                 bg-white/[0.02] transition-colors duration-300"
    >
      {/* radial glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0
                   group-hover:opacity-100 transition-opacity duration-500
                   pointer-events-none"
        style={{
          background: `radial-gradient(circle at top left,
            ${color}09 0%, transparent 65%)`,
        }}
      />

      {/* bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0
                   group-hover:w-full transition-all duration-500
                   pointer-events-none"
        style={{ background: `linear-gradient(90deg,${color},transparent)` }}
      />

      {/* header row: icon + tag */}
      <div className="flex items-start justify-between mb-5">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center
                     flex-shrink-0 transition-transform duration-300
                     group-hover:scale-110"
          style={{
            background: `${color}18`,
            color,
            border: `0.5px solid ${color}28`,
          }}
        >
          <div className="w-5 h-5">{icon}</div>
        </div>
        <TagPill label={tag} color={color} size="sm" />
      </div>

      {/* text */}
      <h3 className="text-white font-bold text-[15px] leading-snug mb-2">
        {title}
      </h3>
      <p className="text-white/38 text-[13px] leading-[1.75]">{desc}</p>
    </motion.div>
  );
};

// ── FeaturesSection ───────────────────────────────────────────────────────────
export default function FeaturesSection() {
  return (
    <SectionWrapper id="features" bg="dark">
      {/* background */}
      <GridBg />
      <GlowOrb color="#a855f7" size="420px" top="-8%"  left="56%"  opacity={0.07} />
      <GlowOrb color="#00f5ff" size="320px" top="60%"  left="-4%"  opacity={0.05} />

      {/* header */}
      <SectionHeader
        badge={
          <SectionBadge
            icon={<Icons.WAp className="w-[13px] h-[13px]" />}
            label="Platform Features"
            color="#a855f7"
          />
        }
        title="Everything you need to"
        gradientText="automate attendance"
        gradientColors={["#00f5ff", "#a855f7"]}
        subtitle="From real-time face detection to exportable reports — one platform, three powerful dashboards."
      />

      {/* cards grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURES.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} index={i} />
        ))}
      </div>

      {/* bottom tech pills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center"
      >
        <p className="text-white/25 text-[13px] font-mono mb-5">
          Backed by production-grade AI
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          {["YOLOv8","FaceNet","FastAPI","Node.js","PostgreSQL","React.js"].map(
            (tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-[11px] font-mono
                           font-semibold text-white/30
                           border border-white/[0.07] bg-white/[0.02]"
              >
                {tech}
              </span>
            )
          )}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
