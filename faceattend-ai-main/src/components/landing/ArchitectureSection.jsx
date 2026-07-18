// ─── ArchitectureSection.jsx ─────────────────────────────────────────────────
// 4-layer system architecture cards: Client → API → AI Server → Database
// Usage: <ArchitectureSection />

import { motion }      from "framer-motion";
import { Icons }       from "@/components/shared/Icons";
import GlowOrb         from "@/components/ui/GlowOrb";
import SectionBadge    from "@/components/ui/SectionBadge";
import SectionHeader   from "@/components/ui/SectionHeader";
import SectionWrapper  from "@/components/ui/SectionWrapper";

// ── layer data ────────────────────────────────────────────────────────────────
const LAYERS = [
  {
    num: "01", color: "#00f5ff",
    label: "Client Layer",
    icon: <Icons.Globe />,
    items: ["React.js Web App", "React Native Mobile", "Tailwind CSS UI"],
  },
  {
    num: "02", color: "#a855f7",
    label: "API Gateway",
    icon: <Icons.Layers />,
    items: ["Node.js + Express", "JWT Auth Middleware", "REST API Routes"],
  },
  {
    num: "03", color: "#3b82f6",
    label: "AI Server",
    icon: <Icons.Brain />,
    items: ["FastAPI (Python)", "YOLOv8 Detection", "FaceNet Recognition"],
  },
  {
    num: "04", color: "#10b981",
    label: "Data Layer",
    icon: <Icons.Database />,
    items: ["PostgreSQL DB", "Face Embeddings Store", "Attendance Records"],
  },
];

// ── LayerCard ─────────────────────────────────────────────────────────────────
const LayerCard = ({ layer, index }) => {
  const { num, color, label, icon, items } = layer;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group flex-1 relative p-6 rounded-2xl cursor-default
                 border border-white/[0.07] hover:border-white/[0.13]
                 bg-white/[0.02] overflow-hidden
                 transition-colors duration-300 flex flex-col"
    >
      {/* hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0
                   group-hover:opacity-100 transition-opacity duration-500
                   pointer-events-none"
        style={{
          background: `radial-gradient(circle at center,
            ${color}06 0%, transparent 70%)`,
        }}
      />

      {/* header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center
                     flex-shrink-0"
          style={{ background: `${color}15`, color }}
        >
          <div className="w-5 h-5">{icon}</div>
        </div>
        <span
          className="text-[11px] font-mono font-bold uppercase tracking-wider"
          style={{ color }}
        >
          {label}
        </span>
      </div>

      {/* items */}
      <div className="space-y-2.5 flex-1">
        {items.map((item, j) => (
          <motion.div
            key={j}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 + j * 0.06 + 0.3 }}
            className="flex items-center gap-2.5 text-[13px] text-white/60"
          >
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: color }}
            />
            {item}
          </motion.div>
        ))}
      </div>

      {/* large faded number */}
      <div
        className="mt-6 text-5xl font-black font-mono opacity-[0.05]"
        style={{ color }}
      >
        {num}
      </div>
    </motion.div>
  );
};

// ── ArchitectureSection ───────────────────────────────────────────────────────
export default function ArchitectureSection() {
  return (
    <SectionWrapper id="architecture" bg="darker">
      {/* background */}
      <GlowOrb color="#3b82f6" size="500px" top="30%" left="60%" opacity={0.08} />

      {/* header */}
      <SectionHeader
        badge={
          <SectionBadge
            icon={<Icons.Layers className="w-[13px] h-[13px]" />}
            label="System Architecture"
            color="#3b82f6"
          />
        }
        title="Built for"
        gradientText="scale"
        gradientColors={["#a855f7", "#3b82f6"]}
        subtitle="A decoupled microservice architecture that keeps AI logic independent and backend scalable."
      />

      {/* layers */}
      <div className="flex flex-col lg:flex-row gap-4">
        {LAYERS.map((layer, i) => (
          <LayerCard key={layer.label} layer={layer} index={i} />
        ))}
      </div>

      {/* flow caption */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mt-8 flex items-center justify-center gap-4"
      >
        <div
          className="h-px flex-1 max-w-xs"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)",
          }}
        />
        <span className="text-white/25 text-[11px] font-mono whitespace-nowrap">
          ← bidirectional REST API data flow →
        </span>
        <div
          className="h-px flex-1 max-w-xs"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)",
          }}
        />
      </motion.div>
    </SectionWrapper>
  );
}
