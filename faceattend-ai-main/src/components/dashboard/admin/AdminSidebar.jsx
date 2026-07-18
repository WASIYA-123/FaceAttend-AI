// ─── AdminSidebar.jsx ────────────────────────────────────────────────────────
// Collapsible sidebar for Admin dashboard
// Usage: used inside AdminLayout.jsx

import { useState }          from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Icons }             from "@/components/shared/Icons";
import Logo                  from "@/components/shared/Logo";
import AnimatedDot           from "@/components/ui/AnimatedDot";
import DividerLine           from "@/components/ui/DividerLine";
import { ADMIN_NAV }         from "@/constants/navLinks";
import { ROUTES }            from "@/constants/routes";
import { COLORS }            from "@/constants/colors";

const ICON_MAP = {
  BarChart:  <Icons.BarChart  className="w-[18px] h-[18px]" />,
  Users:     <Icons.Users     className="w-[18px] h-[18px]" />,
  UserCheck: <Icons.UserCheck className="w-[18px] h-[18px]" />,
  Layers:    <Icons.Layers    className="w-[18px] h-[18px]" />,
  PieChart:  <Icons.PieChart  className="w-[18px] h-[18px]" />,
  Brain:     <Icons.Brain     className="w-[18px] h-[18px]" />,
  Download:  <Icons.Download  className="w-[18px] h-[18px]" />,
};

const COLOR = COLORS.cyan; // admin accent

export default function AdminSidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(ROUTES.LOGIN);
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="relative flex flex-col h-full
                 border-r border-white/[0.07]
                 bg-[#030306] overflow-hidden flex-shrink-0"
    >
      {/* ── logo + collapse toggle ───────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-5
                      border-b border-white/[0.06]">
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{    opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Logo size="sm" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{  scale: 0.9  }}
          onClick={() => setCollapsed((v) => !v)}
          className="w-8 h-8 rounded-lg flex items-center justify-center
                     text-white/30 hover:text-white
                     hover:bg-white/[0.06] transition-all flex-shrink-0"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed
            ? <Icons.ChevronRight className="w-4 h-4" />
            : <Icons.ChevronLeft  className="w-4 h-4" />
          }
        </motion.button>
      </div>

      {/* ── role badge ───────────────────────────────────────────────── */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-4 mt-4 px-3 py-2 rounded-xl
                     border border-cyan-500/20 bg-cyan-500/[0.06]"
        >
          <div className="flex items-center gap-2">
            <AnimatedDot color={COLOR} size="w-1.5 h-1.5" />
            <span className="text-cyan-400 text-[11px] font-mono font-bold">
              ADMIN PANEL
            </span>
          </div>
        </motion.div>
      )}

      {/* ── nav links ────────────────────────────────────────────────── */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto
                      scrollbar-thin scrollbar-thumb-white/10">
        {ADMIN_NAV.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 px-3 py-2.5 rounded-xl",
                "text-[13px] font-medium transition-all duration-150",
                "group relative overflow-hidden",
                isActive
                  ? "text-black"
                  : "text-white/45 hover:text-white hover:bg-white/[0.05]",
              ].join(" ")
            }
            style={({ isActive }) =>
              isActive
                ? { background: `linear-gradient(135deg,${COLOR},${COLOR}cc)` }
                : {}
            }
          >
            {/* icon */}
            <span className="flex-shrink-0">
              {ICON_MAP[item.icon]}
            </span>

            {/* label */}
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{    opacity: 0, width: 0 }}
                  transition={{ duration: 0.15 }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      <DividerLine color="rgba(255,255,255,0.06)" my="my-0" />

      {/* ── bottom: settings + logout ────────────────────────────────── */}
      <div className="px-3 py-4 space-y-1">
        <NavLink
          to="/admin/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl
                     text-[13px] font-medium text-white/40
                     hover:text-white hover:bg-white/[0.05] transition-all"
        >
          <Icons.Settings className="w-[18px] h-[18px] flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
        </NavLink>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                     text-[13px] font-medium text-red-400/70
                     hover:text-red-400 hover:bg-red-400/[0.06]
                     transition-all text-left"
        >
          <Icons.X className="w-[18px] h-[18px] flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
}
