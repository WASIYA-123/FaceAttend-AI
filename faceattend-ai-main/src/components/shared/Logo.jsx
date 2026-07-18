// ─── Logo.jsx ────────────────────────────────────────────────────────────────
// FaceAttend AI brand logo — used in Navbar, Sidebars, Auth pages, Footer
// Usage:
//   <Logo />                        — default full logo
//   <Logo size="sm" />              — smaller variant
//   <Logo iconOnly />               — icon box only (collapsed sidebar)
//   <Logo href="/" onClick={fn} />  — as a link

import { motion } from "framer-motion";

const SIZES = {
  sm: { box: "w-7 h-7",  icon: 13, text: "text-[14px]", ai: "text-[10px]" },
  md: { box: "w-8 h-8",  icon: 15, text: "text-[16px]", ai: "text-[11px]" },
  lg: { box: "w-10 h-10",icon: 18, text: "text-[20px]", ai: "text-[13px]" },
};

export default function Logo({
  size     = "md",
  iconOnly = false,
  href,
  onClick,
  className = "",
}) {
  const s = SIZES[size] || SIZES.md;

  const inner = (
    <span className={`flex items-center gap-2.5 ${className}`}>
      {/* icon box */}
      <span className="relative flex-shrink-0">
        <span
          className={`${s.box} rounded-[9px] flex items-center justify-center`}
          style={{
            background: "linear-gradient(135deg, #00f5ff, #a855f7)",
          }}
        >
          {/* face silhouette */}
          <svg
            width={s.icon}
            height={s.icon}
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="12" cy="10" r="4" fill="white" />
            <path
              d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </span>

        {/* subtle glow ring */}
        <motion.span
          aria-hidden="true"
          className={`absolute inset-0 rounded-[9px] bg-cyan-400/25 blur-sm -z-10`}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>

      {/* wordmark — hidden when iconOnly */}
      {!iconOnly && (
        <span
          className={`${s.text} font-black text-white tracking-tight leading-none`}
        >
          Face
          <span className="text-cyan-400">Attend</span>
          <span
            className={`${s.ai} text-purple-400 font-normal ml-0.5`}
          >
            AI
          </span>
        </span>
      )}
    </span>
  );

  // render as <a> if href provided, else as <button> if onClick, else plain div
  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className="flex items-center"
        aria-label="FaceAttend AI — Home"
      >
        {inner}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="flex items-center bg-transparent border-0"
        aria-label="FaceAttend AI — Home"
      >
        {inner}
      </button>
    );
  }

  return <div className="flex items-center">{inner}</div>;
}
