// ─── RegisterPage.jsx ────────────────────────────────────────────────────────
// Full-page register — left panel (branding + steps) + right panel (form)
// Usage: routed at "/register" in App.jsx

import { useNavigate, Link } from "react-router-dom";
import { motion }            from "framer-motion";
import { Icons }             from "@/components/shared/Icons";
import Logo                  from "@/components/shared/Logo";
import RegisterForm          from "@/components/auth/RegisterForm";
import GlowOrb               from "@/components/ui/GlowOrb";
import GridBg                from "@/components/ui/GridBg";
import AnimatedDot           from "@/components/ui/AnimatedDot";
import PageWrapper           from "@/components/ui/PageWrapper";
import { ROUTES }            from "@/constants/routes";

// steps shown on left panel
const STEPS = [
  {
    icon:  <Icons.User      className="w-4 h-4" />,
    label: "Create your account",
    desc:  "Fill in your name, ID and role",
    color: "#00f5ff",
  },
  {
    icon:  <Icons.Camera    className="w-4 h-4" />,
    label: "Register your face",
    desc:  "Upload photos for AI training",
    color: "#a855f7",
  },
  {
    icon:  <Icons.UserCheck className="w-4 h-4" />,
    label: "Start attending",
    desc:  "Get marked automatically by AI",
    color: "#10b981",
  },
];

// role → dashboard route
const ROLE_ROUTE = {
  admin:   ROUTES.ADMIN.OVERVIEW,
  teacher: ROUTES.TEACHER.OVERVIEW,
  student: ROUTES.STUDENT.OVERVIEW,
};

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleSuccess = (role) => {
    navigate(ROLE_ROUTE[role] || ROUTES.HOME);
  };

  return (
    <PageWrapper>
      <div className="min-h-screen flex">

        {/* ── LEFT PANEL — branding + steps ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex flex-col justify-between
                     w-[44%] relative overflow-hidden p-12
                     bg-[#030306]"
        >
          <GridBg />
          <GlowOrb color="#a855f7" size="500px" top="-10%" left="-10%" opacity={0.08} />
          <GlowOrb color="#00f5ff" size="380px" top="55%"  left="45%"  opacity={0.07} />

          {/* logo */}
          <div className="relative z-10">
            <Logo size="md" />
          </div>

          {/* headline */}
          <div className="relative z-10">
            <h2 className="text-3xl font-black text-white
                           leading-tight tracking-tight mb-4">
              Join{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg,#a855f7,#00f5ff)",
                }}
              >
                FaceAttend AI
              </span>
            </h2>
            <p className="text-white/40 text-[14px] leading-relaxed mb-10">
              Three simple steps to get your biometric attendance
              running automatically.
            </p>

            {/* steps */}
            <div className="space-y-5">
              {STEPS.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0  }}
                  transition={{ delay: 0.3 + i * 0.12 }}
                  className="flex items-start gap-4"
                >
                  {/* number + icon */}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center
                               justify-center flex-shrink-0"
                    style={{
                      background: `${step.color}18`,
                      color:       step.color,
                      border:     `0.5px solid ${step.color}30`,
                    }}
                  >
                    {step.icon}
                  </div>

                  <div>
                    <p className="text-white text-[13px] font-semibold mb-0.5">
                      {step.label}
                    </p>
                    <p className="text-white/35 text-[12px]">{step.desc}</p>
                  </div>

                  {/* step number watermark */}
                  <div
                    className="ml-auto text-3xl font-black font-mono opacity-[0.06]"
                    style={{ color: step.color }}
                  >
                    0{i + 1}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* bottom note */}
          <div className="relative z-10">
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-xl
                         border border-white/[0.07] bg-white/[0.02]"
            >
              <Icons.Shield className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <p className="text-white/40 text-[12px]">
                Your face data is stored securely as encrypted 128-D embeddings.
                Never shared externally.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT PANEL — form ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col justify-center
                     px-6 sm:px-12 lg:px-16 py-12
                     bg-[#07070f] relative overflow-hidden
                     overflow-y-auto"
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
                <AnimatedDot color="#a855f7" size="w-2 h-2" />
                <span className="text-purple-400 text-[12px] font-mono font-semibold">
                  CREATE ACCOUNT
                </span>
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight mb-2">
                Get started
              </h1>
              <p className="text-white/40 text-[14px]">
                Register to access your FaceAttend AI portal.
              </p>
            </div>

            {/* form */}
            <RegisterForm onSuccess={handleSuccess} />

            {/* divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/[0.07]" />
              <span className="text-white/25 text-[12px]">or</span>
              <div className="flex-1 h-px bg-white/[0.07]" />
            </div>

            {/* login link */}
            <p className="text-center text-[13px] text-white/40">
              Already have an account?{" "}
              <Link
                to={ROUTES.LOGIN}
                className="text-purple-400 font-semibold hover:underline"
              >
                Sign in here
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
