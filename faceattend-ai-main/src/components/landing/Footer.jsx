// ─── Footer.jsx ──────────────────────────────────────────────────────────────
// Site footer with logo, nav links, tech pills, and social icons
// Usage: <Footer />

import { Icons }     from "@/components/shared/Icons";
import Logo          from "@/components/shared/Logo";
import DividerLine   from "@/components/ui/DividerLine";
import { LANDING_NAV } from "@/constants/navLinks";

const SOCIALS = [
  { icon: <Icons.Github   className="w-4 h-4" />, href: "#", label: "GitHub"   },
  { icon: <Icons.Twitter  className="w-4 h-4" />, href: "#", label: "Twitter"  },
  { icon: <Icons.Linkedin className="w-4 h-4" />, href: "#", label: "LinkedIn" },
  { icon: <Icons.Mail     className="w-4 h-4" />, href: "#", label: "Email"    },
];

const TECH_PILLS = [
  { label: "YOLOv8",  color: "#00f5ff" },
  { label: "FaceNet", color: "#a855f7" },
  { label: "FastAPI", color: "#3b82f6" },
];

const scrollTo = (href) =>
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

export default function Footer() {
  return (
    <footer
      className="bg-[#020204] border-t border-white/[0.05] px-6 pt-12 pb-8"
      aria-label="Site footer"
    >
      <div className="max-w-6xl mx-auto">

        {/* ── top row ───────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-start
                        justify-between gap-10 mb-10">

          {/* brand */}
          <div className="max-w-xs">
            <Logo className="mb-4" />
            <p className="text-white/30 text-[13px] leading-[1.7]">
              AI-Powered Facial Recognition Attendance System.
              Built as a Project using YOLOv8, FaceNet, and FastAPI.
            </p>
          </div>

          {/* nav links */}
          <div>
            <h4 className="text-white/50 text-[11px] font-mono font-bold
                           uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <div className="space-y-2.5">
              {LANDING_NAV.map(({ label, href }) => (
                <button
                  key={label}
                  onClick={() => scrollTo(href)}
                  className="block text-[13px] text-white/35
                             hover:text-white transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* tech stack */}
          <div>
            <h4 className="text-white/50 text-[11px] font-mono font-bold
                           uppercase tracking-wider mb-4">
              Tech Stack
            </h4>
            <div className="space-y-2">
              {[
                "YOLOv8 · FaceNet · DeepFace",
                "FastAPI · Node.js · Express",
                "PostgreSQL · React.js",
                "Tailwind CSS · Framer Motion",
                "JWT Authentication",
              ].map((item) => (
                <p
                  key={item}
                  className="text-[12px] text-white/30 font-mono"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* social */}
          <div>
            <h4 className="text-white/50 text-[11px] font-mono font-bold
                           uppercase tracking-wider mb-4">
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              {SOCIALS.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex items-center gap-2.5 text-white/35
                             hover:text-white transition-colors text-[13px]"
                >
                  {icon}
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <DividerLine color="rgba(255,255,255,0.06)" my="my-0" />

        {/* ── bottom row ────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center
                        justify-between gap-4 mt-8">
          <span className="text-white/20 text-[12px]">
            © 2025 FaceAttend AI · Wasiya · Project
          </span>

          {/* tech pills */}
          <div className="flex items-center gap-2">
            {TECH_PILLS.map(({ label, color }) => (
              <span
                key={label}
                className="font-mono px-2.5 py-1 rounded-lg text-[10px] font-bold"
                style={{
                  background: `${color}10`,
                  color,
                  border:     `0.5px solid ${color}25`,
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
