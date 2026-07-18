// ─── AdminTopbar.jsx ─────────────────────────────────────────────────────────
// Top navigation bar for Admin dashboard
// Usage: used inside AdminLayout.jsx

import { useState }  from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons }     from "@/components/shared/Icons";
import AnimatedDot   from "@/components/ui/AnimatedDot";
import LiveBadge     from "@/components/ui/LiveBadge";

// ── mock notifications ────────────────────────────────────────────────────────
const NOTIFICATIONS = [
  { id: 1, text: "New student registered: Ali Hassan",     time: "2m ago",  color: "#00f5ff", read: false },
  { id: 2, text: "CS-301 session started by Dr.",     time: "10m ago", color: "#a855f7", read: false },
  { id: 3, text: "Attendance report exported successfully", time: "1h ago",  color: "#10b981", read: true  },
  { id: 4, text: "AI model retrained with 24 new faces",   time: "2h ago",  color: "#f59e0b", read: true  },
];

export default function AdminTopbar({ pageTitle = "Dashboard" }) {
  const [notifOpen,   setNotifOpen]   = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search,      setSearch]      = useState("");

  const unread = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <header className="h-16 flex items-center justify-between
                       px-6 border-b border-white/[0.07]
                       bg-[#07070f]/80 backdrop-blur-xl
                       flex-shrink-0 relative z-30">

      {/* ── left: page title ──────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-white font-bold text-[15px] leading-tight">
            {pageTitle}
          </h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <AnimatedDot color="#00f5ff" size="w-1.5 h-1.5" />
            <span className="text-white/30 text-[11px] font-mono">
              Admin Portal
            </span>
          </div>
        </div>
      </div>

      {/* ── center: search ────────────────────────────────────────────── */}
      <div className="hidden md:flex items-center gap-2
                      px-4 py-2 rounded-xl w-72
                      bg-white/[0.04] border border-white/[0.07]
                      focus-within:border-cyan-500/40 transition-all">
        <Icons.Search className="w-4 h-4 text-white/25 flex-shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search students, courses..."
          className="flex-1 bg-transparent text-white/70 text-[13px]
                     placeholder-white/20 outline-none"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="text-white/30 hover:text-white transition-colors"
          >
            <Icons.X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* ── right: actions ───────────────────────────────────────────── */}
      <div className="flex items-center gap-2">

        {/* live badge */}
        <LiveBadge label="System Live" />

        {/* notification bell */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{  scale: 0.95 }}
            onClick={() => { setNotifOpen((v) => !v); setProfileOpen(false); }}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center
                       text-white/40 hover:text-white
                       hover:bg-white/[0.06] transition-all"
            aria-label="Notifications"
          >
            <Icons.Bell className="w-5 h-5" />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full
                               bg-cyan-400 border-2 border-[#07070f]" />
            )}
          </motion.button>

          {/* notification dropdown */}
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1   }}
                exit={{    opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-80 rounded-2xl
                           border border-white/[0.09] shadow-2xl shadow-black/50
                           bg-[#0d0d1a] z-50 overflow-hidden"
              >
                <div className="flex items-center justify-between
                                px-5 py-4 border-b border-white/[0.07]">
                  <span className="text-white font-semibold text-[13px]">
                    Notifications
                  </span>
                  <span className="text-cyan-400 text-[11px] font-mono cursor-pointer">
                    Mark all read
                  </span>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {NOTIFICATIONS.map((n) => (
                    <div
                      key={n.id}
                      className="flex items-start gap-3 px-5 py-3.5
                                 border-b border-white/[0.04]
                                 hover:bg-white/[0.03] transition-colors"
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: n.read ? "rgba(255,255,255,0.15)" : n.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`text-[12px] leading-snug ${
                          n.read ? "text-white/35" : "text-white/70"
                        }`}>
                          {n.text}
                        </p>
                        <p className="text-white/20 text-[10px] mt-1 font-mono">
                          {n.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* profile button */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{  scale: 0.95 }}
            onClick={() => { setProfileOpen((v) => !v); setNotifOpen(false); }}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5
                       rounded-xl hover:bg-white/[0.06] transition-all"
          >
            <div className="w-7 h-7 rounded-lg flex items-center justify-center
                            text-[11px] font-black text-black"
              style={{ background: "linear-gradient(135deg,#00f5ff,#a855f7)" }}
            >
              A
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-white text-[12px] font-semibold leading-tight">
                Admin
              </p>
              <p className="text-white/30 text-[10px]">Super User</p>
            </div>
            <Icons.ChevronDown className="w-3.5 h-3.5 text-white/30" />
          </motion.button>

          {/* profile dropdown */}
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1   }}
                exit={{    opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-52 rounded-2xl
                           border border-white/[0.09] shadow-2xl shadow-black/50
                           bg-[#0d0d1a] z-50 overflow-hidden p-2"
              >
                {[
                  { icon: <Icons.User     className="w-4 h-4" />, label: "My Profile"  },
                  { icon: <Icons.Settings className="w-4 h-4" />, label: "Settings"    },
                  { icon: <Icons.Download className="w-4 h-4" />, label: "Export Data" },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center gap-3 px-3 py-2.5
                               rounded-xl text-[13px] text-white/50
                               hover:text-white hover:bg-white/[0.05]
                               transition-all text-left"
                  >
                    <span className="text-white/30">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
                <div className="h-px bg-white/[0.06] my-1.5" />
                <button
                  className="w-full flex items-center gap-3 px-3 py-2.5
                             rounded-xl text-[13px] text-red-400/70
                             hover:text-red-400 hover:bg-red-400/[0.06]
                             transition-all text-left"
                >
                  <Icons.X className="w-4 h-4" />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
