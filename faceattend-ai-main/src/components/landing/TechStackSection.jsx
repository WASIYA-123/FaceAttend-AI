// ─── TechStackSection.jsx ────────────────────────────────────────────────────
// Responsive grid of tech badges with emoji + name + category
// Usage: <TechStackSection />

import { motion }     from "framer-motion";
import { Icons }      from "@/components/shared/Icons";
import GlowOrb        from "@/components/ui/GlowOrb";
import SectionBadge   from "@/components/ui/SectionBadge";
import SectionHeader  from "@/components/ui/SectionHeader";
import SectionWrapper from "@/components/ui/SectionWrapper";

const TECHS = [
  { name: "YOLOv8",      cat: "Face Detection",    color: "#f59e0b", emoji: "🎯" },
  { name: "FaceNet",     cat: "Recognition",        color: "#00f5ff", emoji: "🧠" },
  { name: "FastAPI",     cat: "AI Server",          color: "#10b981", emoji: "⚡" },
  { name: "Node.js",     cat: "Backend",            color: "#68a063", emoji: "🟢" },
  { name: "PostgreSQL",  cat: "Database",           color: "#336791", emoji: "🐘" },
  { name: "React.js",    cat: "Frontend",           color: "#61dafb", emoji: "⚛️" },
  { name: "Tailwind",    cat: "Styling",            color: "#38bdf8", emoji: "🎨" },
  { name: "JWT",         cat: "Auth",               color: "#a855f7", emoji: "🔐" },
  { name: "DeepFace",    cat: "Alt Recognition",    color: "#ec4899", emoji: "👁️" },
  { name: "OpenCV",      cat: "Frame Processing",   color: "#ff6b35", emoji: "📸" },
  { name: "React Native",cat: "Mobile",             color: "#61dafb", emoji: "📱" },
  { name: "Framer",      cat: "Animations",         color: "#e879f9", emoji: "✨" },
];

export default function TechStackSection() {
  return (
    <SectionWrapper id="techstack" bg="dark">
      <GlowOrb color="#3b82f6" size="400px" top="40%" left="60%" opacity={0.07} />

      <SectionHeader
        badge={
          <SectionBadge
            icon={<Icons.Cpu className="w-[13px] h-[13px]" />}
            label="Technology Stack"
            color="#3b82f6"
          />
        }
        title="Built with the"
        gradientText="best tools"
        gradientColors={["#3b82f6", "#a855f7"]}
        subtitle="Every technology chosen for performance, scalability, and developer experience."
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {TECHS.map((tech, i) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            whileHover={{ y: -4, scale: 1.05, transition: { duration: 0.18 } }}
            className="group relative p-4 rounded-xl text-center cursor-default
                       border border-white/[0.06] hover:border-white/[0.14]
                       bg-white/[0.02] overflow-hidden
                       transition-colors duration-200"
          >
            {/* hover glow */}
            <div
              className="absolute inset-0 rounded-xl opacity-0
                         group-hover:opacity-100 transition-opacity duration-300
                         pointer-events-none"
              style={{
                background: `radial-gradient(circle at center,
                  ${tech.color}08 0%, transparent 70%)`,
              }}
            />

            <div className="text-2xl mb-2">{tech.emoji}</div>
            <div className="text-white text-[11px] font-bold mb-0.5 leading-tight">
              {tech.name}
            </div>
            <div className="text-white/30 text-[10px] leading-tight">
              {tech.cat}
            </div>

            {/* bottom accent */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0
                         group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(90deg,
                  transparent,${tech.color}80,transparent)`,
              }}
            />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
