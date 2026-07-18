// ─── WorkflowSection.jsx ─────────────────────────────────────────────────────
// 5-step AI pipeline — alternating left/right timeline with animated dots
// Usage: <WorkflowSection />

import { motion }      from "framer-motion";
import { Icons }       from "@/components/shared/Icons";
import GlowOrb         from "@/components/ui/GlowOrb";
import GridBg          from "@/components/ui/GridBg";
import PulsingDot      from "@/components/ui/PulsingDot";
import SectionBadge    from "@/components/ui/SectionBadge";
import SectionHeader   from "@/components/ui/SectionHeader";
import SectionWrapper  from "@/components/ui/SectionWrapper";
import AnimatedDot     from "@/components/ui/AnimatedDot";

// ── step data ─────────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: "01", color: "#00f5ff",
    icon: <Icons.Camera />,
    title: "Camera Captures Frame",
    desc:  "Teacher starts session. Camera streams live video frames to the FastAPI AI server via REST endpoint.",
  },
  {
    num: "02", color: "#a855f7",
    icon: <Icons.Cpu />,
    title: "YOLOv8 Detects Faces",
    desc:  "YOLOv8 processes each frame in real-time, detecting and cropping all visible faces with bounding boxes.",
  },
  {
    num: "03", color: "#3b82f6",
    icon: <Icons.Brain />,
    title: "FaceNet Generates Embeddings",
    desc:  "Each cropped face is encoded into a 128-dimensional vector using FaceNet / DeepFace deep learning models.",
  },
  {
    num: "04", color: "#10b981",
    icon: <Icons.WAp />,
    title: "Cosine Similarity Matching",
    desc:  "Embeddings are compared against the student DB using cosine similarity. Confidence threshold set at 0.6.",
  },
  {
    num: "05", color: "#f59e0b",
    icon: <Icons.Database />,
    title: "Attendance Logged to DB",
    desc:  "Matched student IDs are returned to Node.js. Backend writes timestamped records to PostgreSQL instantly.",
  },
];

// ── StepCard ──────────────────────────────────────────────────────────────────
const StepCard = ({ step, index, isRight }) => {
  const { num, color, icon, title, desc } = step;

  return (
    <motion.div
      initial={{ opacity: 0, x: isRight ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.52, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group flex-1 p-5 rounded-2xl cursor-default
                 border border-white/[0.07] hover:border-white/[0.13]
                 bg-white/[0.025] relative overflow-hidden
                 transition-colors duration-300"
    >
      {/* hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0
                   group-hover:opacity-100 transition-opacity duration-500
                   pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${isRight ? "top right" : "top left"},
            ${color}0a 0%, transparent 65%)`,
        }}
      />

      {/* icon + step num */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-[38px] h-[38px] rounded-xl flex items-center
                     justify-center flex-shrink-0
                     group-hover:scale-110 transition-transform duration-300"
          style={{
            background: `${color}18`,
            color,
            border: `0.5px solid ${color}28`,
          }}
        >
          <div className="w-[18px] h-[18px]">{icon}</div>
        </div>
        <span
          className="text-[10px] font-mono font-bold tracking-widest uppercase"
          style={{ color }}
        >
          Step {num}
        </span>
      </div>

      <h3 className="text-white font-bold text-[14px] leading-snug mb-2">
        {title}
      </h3>
      <p className="text-white/35 text-[12px] leading-[1.75]">{desc}</p>
    </motion.div>
  );
};

// ── WorkflowSection ───────────────────────────────────────────────────────────
export default function WorkflowSection() {
  return (
    <SectionWrapper id="workflow" bg="dark">
      {/* background */}
      <GridBg />
      <GlowOrb color="#00f5ff" size="380px" top="8%"  left="-7%"  opacity={0.06} />
      <GlowOrb color="#a855f7" size="320px" top="55%" left="66%"  opacity={0.06} />

      {/* header */}
      <SectionHeader
        badge={
          <SectionBadge
            icon={<Icons.Cpu className="w-[13px] h-[13px]" />}
            label="AI Recognition Pipeline"
            color="#00f5ff"
          />
        }
        title="How the"
        gradientText="AI works"
        gradientColors={["#00f5ff", "#3b82f6"]}
        subtitle="From camera frame to attendance record in under 200 milliseconds."
      />

      {/* timeline */}
      <div className="relative max-w-3xl mx-auto">

        {/* vertical connector line — desktop only */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute left-1/2 top-0 bottom-0
                     w-px -translate-x-1/2 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom,
              rgba(0,245,255,0.3),
              rgba(168,85,247,0.3),
              rgba(59,130,246,0.25),
              rgba(16,185,129,0.2),
              transparent)`,
          }}
        />

        <div className="space-y-5">
          {STEPS.map((step, i) => {
            const isRight = i % 2 !== 0;
            return (
              <div
                key={step.num}
                className={`flex items-center gap-0
                  ${isRight ? "lg:flex-row-reverse" : "lg:flex-row"}`}
              >
                {/* card */}
                <StepCard step={step} index={i} isRight={isRight} />

                {/* center dot — desktop only */}
                <div className="hidden lg:flex w-[60px] flex-shrink-0
                                items-center justify-center relative z-10">
                  <PulsingDot color={step.color} delay={i * 0.3} />
                </div>

                {/* spacer on opposite side */}
                <div className="hidden lg:block flex-1" />
              </div>
            );
          })}
        </div>
      </div>

      {/* latency badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-14 mx-auto max-w-md flex items-center justify-center gap-3
                   px-6 py-4 rounded-2xl
                   border border-cyan-500/[0.15] bg-cyan-500/[0.04]"
      >
        <AnimatedDot color="#00f5ff" size="w-2 h-2" />
        <p className="font-mono text-[12px] text-white/50 text-center">
          Total pipeline latency:{" "}
          <span className="text-cyan-400 font-bold">&lt; 200ms</span>
          {" "}— frame to record
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
