// ─── TestimonialsSection.jsx ─────────────────────────────────────────────────
// 3 testimonial cards from supervisor, examiner, and teacher
// Usage: <TestimonialsSection />

import { motion }     from "framer-motion";
import { Icons }      from "@/components/shared/Icons";
import GlowOrb        from "@/components/ui/GlowOrb";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeader  from "@/components/ui/SectionHeader";

const TESTIMONIALS = [
  {
    quote:  "This is the most complete Project I have seen in 10 years of supervising. The AI pipeline is production-ready.",
    name:   "Dr. Ahmed",
    role:   "Project Supervisor · CS Department",
    avatar: "AR",
    color:  "#00f5ff",
  },
  {
    quote:  "YOLOv8 + FaceNet is extremely well chosen. The decoupled FastAPI architecture shows real engineering maturity.",
    name:   "Prof. Samina Khan",
    role:   "External Examiner · AI Lab",
    avatar: "SK",
    color:  "#a855f7",
  },
  {
    quote:  "I never realized attendance could be this seamless. The teacher dashboard is intuitive and recognition is instant.",
    name:   "Usman Tariq",
    role:   "Teacher · Computer Science",
    avatar: "UT",
    color:  "#3b82f6",
  },
];

export default function TestimonialsSection() {
  return (
    <SectionWrapper id="testimonials" bg="dark">
      <GlowOrb color="#00f5ff" size="400px" top="0%" left="70%" opacity={0.06} />

      <SectionHeader
        title="What they're"
        gradientText="saying"
        gradientColors={["#00f5ff", "#a855f7"]}
      />

      <div className="grid md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative p-7 rounded-2xl cursor-default overflow-hidden
                       border border-white/[0.07] hover:border-white/[0.12]
                       bg-white/[0.02] transition-colors duration-300"
          >
            {/* stars */}
            <div className="flex gap-1 mb-5">
              {Array(5).fill(0).map((_, j) => (
                <Icons.Star key={j} className="w-4 h-4 text-yellow-400" />
              ))}
            </div>

            {/* quote */}
            <p className="text-white/55 text-[13px] leading-[1.8] mb-6 italic">
              "{t.quote}"
            </p>

            {/* author */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center
                           justify-center text-sm font-bold flex-shrink-0"
                style={{
                  background: `${t.color}20`,
                  color:       t.color,
                  border:     `0.5px solid ${t.color}30`,
                }}
              >
                {t.avatar}
              </div>
              <div>
                <div className="text-white text-[13px] font-semibold">
                  {t.name}
                </div>
                <div className="text-white/35 text-[11px]">{t.role}</div>
              </div>
            </div>

            {/* decorative quote mark */}
            <div
              className="absolute top-4 right-6 text-6xl font-serif opacity-[0.05]"
              style={{ color: t.color }}
              aria-hidden="true"
            >
              "
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
