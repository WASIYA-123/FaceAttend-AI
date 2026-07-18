// ─── LoginPage.jsx ───────────────────────────────────────────────────────────
// Full-page login — left panel (branding) + right panel (form)
// Usage: routed at "/login" in App.jsx

import { useNavigate, Link } from "react-router-dom";
import { motion }            from "framer-motion";
import { Icons }             from "@/components/shared/Icons";
import Logo                  from "@/components/shared/Logo";
import AIScannerCard         from "@/components/shared/AIScannerCard";
import LoginForm             from "@/components/auth/LoginForm";
import GlowOrb               from "@/components/ui/GlowOrb";
import GridBg                from "@/components/ui/GridBg";
import AnimatedDot           from "@/components/ui/AnimatedDot";
import PageWrapper           from "@/components/ui/PageWrapper";
import { ROUTES }            from "@/constants/routes";

// role → dashboard route mapping
const ROLE_ROUTE = {
  admin:   ROUTES.ADMIN.OVERVIEW,
  teacher: ROUTES.TEACHER.OVERVIEW,
  student: ROUTES.STUDENT.OVERVIEW,
};

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSuccess = (role) => {
    navigate(ROLE_ROUTE[role] || ROUTES.HOME);
  };

  return (
    <PageWrapper>
      <div className="min-h-screen flex">

        {/* ── LEFT PANEL — branding ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex flex-col justify-between
                     w-[46%] relative overflow-hidden p-12
                     bg-[#030306]"
        >
          <GridBg />
          <GlowOrb color="#00f5ff" size="500px" top="-10%" left="-10%" opacity={0.08} />
          <GlowOrb color="#a855f7" size="400px" top="60%"  left="40%"  opacity={0.08} />

          {/* top: logo */}
          <div className="relative z-10">
            <Logo size="md" />
          </div>

          {/* middle: scanner + tagline */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <AIScannerCard size="md" showBadges showConfBar />
            <h2 className="mt-10 text-3xl font-black text-white
                           leading-tight tracking-tight">
              Attendance.{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg,#00f5ff,#a855f7)",
                }}
              >
                Automated.
              </span>
            </h2>
            <p className="mt-3 text-white/40 text-[14px] max-w-xs leading-relaxed">
              YOLOv8 + FaceNet powers real-time biometric attendance
              with 98.7% accuracy and zero proxy.
            </p>
          </div>

          {/* bottom: stats strip */}
          <div className="relative z-10 flex items-center gap-6">
            {[
              { num: "98.7%",  label: "Accuracy" },
              { num: "<200ms", label: "Latency"  },
              { num: "0",      label: "Proxies"  },
            ].map((s, i) => (
              <div key={i} className={i ? "pl-6 border-l border-white/10" : ""}>
                <div className="text-lg font-black text-white">{s.num}</div>
                <div className="text-[11px] text-white/30 font-mono">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── RIGHT PANEL — form ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col justify-center
                     px-6 sm:px-12 lg:px-16 py-12
                     bg-[#07070f] relative overflow-hidden"
        >
          <GlowOrb color="#a855f7" size="350px" top="60%" left="60%" opacity={0.06} />

          <div className="relative z-10 w-full max-w-md mx-auto">

            {/* mobile logo */}
            <div className="lg:hidden mb-8">
              <Logo size="md" />
            </div>

            {/* heading */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <AnimatedDot color="#00f5ff" size="w-2 h-2" />
                <span className="text-cyan-400 text-[12px] font-mono font-semibold">
                  SECURE LOGIN
                </span>
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                Welcome back
              </h1>
              <p className="text-white/40 text-[14px]">
                Sign in to your FaceAttend AI account.
              </p>
            </div>

            {/* form */}
            <LoginForm onSuccess={handleSuccess} />

            {/* divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/[0.07]" />
              <span className="text-white/25 text-[12px]">or</span>
              <div className="flex-1 h-px bg-white/[0.07]" />
            </div>

            {/* register link */}
            <p className="text-center text-[13px] text-white/40">
              Don't have an account?{" "}
              <Link
                to={ROUTES.REGISTER}
                className="text-cyan-400 font-semibold hover:underline"
              >
                Register here
              </Link>
            </p>

            {/* back to home */}
            <div className="mt-8 flex justify-center">
              <Link
                to={ROUTES.HOME}
                className="flex items-center gap-1.5 text-[12px]
                           text-white/25 hover:text-white/60 transition-colors"
              >
                <Icons.ArrowLeft className="w-3.5 h-3.5" />
                Back to home
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
