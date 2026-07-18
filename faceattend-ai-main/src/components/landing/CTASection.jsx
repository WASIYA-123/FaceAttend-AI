// ─── CTASection.jsx ──────────────────────────────────────────────────────────
// Final call-to-action section with email form + action buttons
// Usage: <CTASection />

import { useState }   from "react";
import { motion }     from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Icons }       from "@/components/shared/Icons";
import GlowOrb         from "@/components/ui/GlowOrb";
import GridBg          from "@/components/ui/GridBg";
import GradientButton  from "@/components/ui/GradientButton";
import OutlineButton   from "@/components/ui/OutlineButton";
import AnimatedDot     from "@/components/ui/AnimatedDot";
import SectionWrapper  from "@/components/ui/SectionWrapper";
import { ROUTES }      from "@/constants/routes";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const navigate          = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to backend contact API
    alert(`Thanks! We'll reach out to ${email}`);
    setEmail("");
  };

  return (
    <SectionWrapper id="contact" bg="darker">
      <GridBg />
      <GlowOrb color="#00f5ff" size="400px" top="50%" left="20%"  opacity={0.08} />
      <GlowOrb color="#a855f7" size="400px" top="20%" left="70%"  opacity={0.08} />

      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* live badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                       border border-cyan-500/30 bg-cyan-500/[0.06]
                       text-cyan-400 text-[12px] font-medium font-mono mb-8"
          >
            <AnimatedDot color="#00f5ff" size="w-[7px] h-[7px]" />
            Ready to Deploy
          </div>

          {/* headline */}
          <h2
            className="text-5xl lg:text-6xl font-black text-white
                       leading-tight tracking-tight mb-6"
          >
            The future of{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(135deg,#00f5ff,#a855f7,#3b82f6)",
              }}
            >
              attendance
            </span>{" "}
            is here.
          </h2>

          <p className="text-white/40 text-[17px] leading-[1.75] mb-12 max-w-xl mx-auto">
            From classroom to cloud — AI-powered, proxy-proof, and
            production-ready.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <GradientButton
              from="#00f5ff"
              to="#a855f7"
              onClick={() => navigate(ROUTES.LOGIN)}
              className="px-8 py-3.5 rounded-xl text-[14px]"
            >
              <Icons.Play className="w-4 h-4" />
              View Live Demo
            </GradientButton>

            <OutlineButton
              onClick={() =>
                window.open("https://github.com/your-repo", "_blank")
              }
              className="px-8 py-3.5 rounded-xl text-[14px]"
            >
              <Icons.Github className="w-4 h-4" />
              Source Code
            </OutlineButton>
          </div>

          {/* contact form */}
          <div
            className="rounded-2xl border border-white/[0.07] p-8
                       bg-white/[0.02]"
          >
            <h3 className="text-white font-bold text-[18px] mb-6">
              Get in Touch
            </h3>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-5 py-3 rounded-xl text-white text-[13px]
                           placeholder-white/25 outline-none
                           bg-white/[0.05] border border-white/[0.08]
                           focus:border-cyan-500/50 transition-colors"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2
                           px-6 py-3 rounded-xl font-semibold text-[13px] text-white"
                style={{
                  background: "rgba(0,245,255,0.08)",
                  border:     "0.5px solid rgba(0,245,255,0.3)",
                }}
              >
                <Icons.Mail className="w-4 h-4" />
                Send Message
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
