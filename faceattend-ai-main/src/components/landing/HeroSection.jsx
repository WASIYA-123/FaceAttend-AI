// ─── HeroSection.jsx ─────────────────────────────────────────────────────────
// Full-screen hero — headline, sub, CTA buttons, AI scanner, stats, particles
// Usage: <HeroSection />

import { useRef }                        from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate }                   from "react-router-dom";
import AIScannerCard  from "@/components/shared/AIScannerCard";
import ParticleField  from "@/components/shared/ParticleField";
import { Icons }      from "@/components/shared/Icons";
import GlowOrb        from "@/components/ui/GlowOrb";
import GridBg         from "@/components/ui/GridBg";
import AnimatedDot    from "@/components/ui/AnimatedDot";
import GradientButton from "@/components/ui/GradientButton";
import OutlineButton  from "@/components/ui/OutlineButton";
import { ROUTES }     from "@/constants/routes";

// ── stat strip item ───────────────────────────────────────────────────────────
const Stat = ({ num, label, first = false }) => (
  <div className={!first ? "pl-6 ml-6 border-l border-white/[0.08]" : ""}>
    <div className="text-[22px] font-black text-white tracking-tight">{num}</div>
    <div className="text-[11px] text-white/30 font-mono mt-0.5">{label}</div>
  </div>
);

// ── main component ────────────────────────────────────────────────────────────
export default function HeroSection() {
  const ref      = useRef(null);
  const navigate = useNavigate();

  // parallax on scroll
  const { scrollY } = useScroll();
  const y       = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 400], [1,   0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center
                 overflow-hidden bg-[#07070f]"
      aria-label="Hero"
    >
      {/* ── backgrounds ───────────────────────────────────────────────── */}
      <GridBg />
      <ParticleField count={28} />
      <GlowOrb color="#00f5ff" size="480px" top="-10%"  left="-6%"  opacity={0.07} />
      <GlowOrb color="#a855f7" size="420px" top="25%"   left="58%"  opacity={0.09} />
      <GlowOrb color="#3b82f6" size="340px" top="62%"   left="18%"  opacity={0.06} />

      {/* ── parallax content wrapper ──────────────────────────────────── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6
                   pt-32 pb-24 grid lg:grid-cols-2 gap-16 items-center"
      >
        {/* ── LEFT ──────────────────────────────────────────────────── */}
        <div>
          {/* badge */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                       border border-cyan-500/30 bg-cyan-500/[0.06]
                       text-cyan-400 text-[12px] font-medium font-mono mb-8"
          >
            <AnimatedDot color="#00f5ff" size="w-[7px] h-[7px]" />
            AI-Powered &nbsp;·&nbsp; Real-Time &nbsp;·&nbsp; Zero Proxy
          </motion.div>

          {/* headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ delay: 0.18, duration: 0.65 }}
            className="text-5xl lg:text-6xl font-black text-white
                       leading-[1.05] tracking-tight mb-5"
          >
            Attendance.
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(135deg,#00f5ff 0%,#a855f7 55%,#3b82f6 100%)",
              }}
            >
              Redefined
            </span>
            <br />
            by AI.
          </motion.h1>

          {/* subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ delay: 0.3 }}
            className="text-[15px] text-white/45 leading-[1.8] mb-9 max-w-[420px]"
          >
            Next-gen platform powered by{" "}
            <span className="text-white/85 font-semibold">YOLOv8</span> face detection
            &amp;{" "}
            <span className="text-white/85 font-semibold">FaceNet</span> recognition.
            Eliminate proxy attendance and automate roll-calls in real time.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ delay: 0.42 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <GradientButton
              from="#00f5ff"
              to="#a855f7"
              onClick={() => navigate(ROUTES.LOGIN)}
              className="px-7 py-3 rounded-xl text-[13px]"
            >
              <Icons.Play className="w-4 h-4" />
              Live Demo
            </GradientButton>

            <OutlineButton
              onClick={() =>
                window.open("https://github.com/your-repo", "_blank")
              }
              className="px-7 py-3 rounded-xl text-[13px]"
            >
              <Icons.Github className="w-4 h-4" />
              GitHub
            </OutlineButton>
          </motion.div>

          {/* stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.56 }}
            className="flex"
          >
            <Stat num="98.7%"  label="Accuracy"                     first />
            <Stat num="<200ms" label="Latency"                            />
            <Stat num="3 Roles" label="Admin · Teacher · Student"         />
          </motion.div>
        </div>

        {/* ── RIGHT — AI scanner ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, x: 40 }}
          animate={{ opacity: 1, scale: 1,    x: 0  }}
          transition={{ delay: 0.28, duration: 0.75, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          <AIScannerCard size="md" showBadges showConfBar live />
        </motion.div>
      </motion.div>

      {/* ── scroll indicator ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2
                   flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-white/20 text-[10px] font-mono tracking-[2px] uppercase">
          Scroll
        </span>
        <div
          className="w-5 h-8 rounded-full border border-white/[0.1]
                     flex items-start justify-center pt-1.5"
        >
          <motion.div
            className="w-[3px] h-[7px] rounded-full bg-cyan-400/50"
            animate={{ y: [0, 7, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
