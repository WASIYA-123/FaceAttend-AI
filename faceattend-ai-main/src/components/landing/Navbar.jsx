// ─── Navbar.jsx ──────────────────────────────────────────────────────────────
// Landing page navigation bar
// - Transparent → glassmorphism on scroll
// - Smooth scroll to sections
// - Mobile hamburger menu with AnimatePresence
// - JWT-aware Sign In → redirects by role
// Usage: <Navbar />

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo            from "@/components/shared/Logo";
import { Icons }       from "@/components/shared/Icons";
import AnimatedDot     from "@/components/ui/AnimatedDot";
import GradientButton  from "@/components/ui/GradientButton";
import { LANDING_NAV } from "@/constants/navLinks";
import { ROUTES }      from "@/constants/routes";

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const navigate = useNavigate();

  // ── detect scroll ──────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── close mobile menu on resize ───────────────────────────────────────────
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── smooth scroll helper ──────────────────────────────────────────────────
  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // ── sign in → navigate to login ───────────────────────────────────────────
  const handleSignIn = () => navigate(ROUTES.LOGIN);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1  }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4"
    >
      <div
        className={[
          "w-full max-w-6xl rounded-2xl px-5 py-3",
          "transition-all duration-300",
          scrolled
            ? "bg-[#07070f]/80 backdrop-blur-xl border border-white/[0.09] shadow-2xl shadow-black/50"
            : "bg-transparent border border-transparent",
        ].join(" ")}
      >
        {/* ── top row ───────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-4">

          {/* logo */}
          <Logo
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="cursor-pointer"
          />

          {/* desktop nav links */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            {LANDING_NAV.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => scrollTo(href)}
                className="px-4 py-2 text-[13px] font-medium
                           text-white/50 hover:text-white
                           hover:bg-white/[0.06] rounded-xl
                           transition-all duration-150"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* desktop actions */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* live indicator */}
            <span className="flex items-center gap-1.5 text-[12px] text-white/30 font-mono">
              <AnimatedDot color="#00f5ff" size="w-[7px] h-[7px]" />
              Live
            </span>

            {/* divider */}
            <div className="w-px h-5 bg-white/10" />

            {/* sign in */}
            <button
              onClick={handleSignIn}
              className="px-4 py-2 text-[13px] font-medium
                         text-white/60 hover:text-white
                         rounded-xl transition-colors"
            >
              Sign In
            </button>

            {/* get started */}
            <GradientButton
              onClick={() => navigate(ROUTES.REGISTER)}
              from="#00f5ff"
              to="#a855f7"
              className="px-5 py-2 text-[13px] rounded-xl"
            >
              Get Started →
            </GradientButton>
          </div>

          {/* mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center
                       w-9 h-9 rounded-xl
                       bg-white/[0.06] border border-white/[0.09]
                       text-white/60 hover:text-white transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen
              ? <Icons.X       className="w-5 h-5" />
              : <Icons.Menu    className="w-5 h-5" />
            }
          </button>
        </div>

        {/* ── mobile menu ───────────────────────────────────────────────── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{    opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-white/[0.07] space-y-0.5">
                {/* nav links */}
                {LANDING_NAV.map(({ label, href }) => (
                  <button
                    key={label}
                    onClick={() => scrollTo(href)}
                    className="block w-full text-left px-4 py-3
                               text-[13px] font-medium
                               text-white/55 hover:text-white
                               hover:bg-white/[0.05] rounded-xl
                               transition-all"
                  >
                    {label}
                  </button>
                ))}

                {/* mobile action buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSignIn}
                    className="flex-1 py-2.5 text-[13px] font-medium
                               text-white/60 hover:text-white
                               border border-white/10 rounded-xl
                               hover:bg-white/[0.05] transition-all"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate(ROUTES.REGISTER)}
                    className="flex-1 py-2.5 text-[13px] font-semibold
                               text-black rounded-xl"
                    style={{
                      background: "linear-gradient(135deg,#00f5ff,#a855f7)",
                    }}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
