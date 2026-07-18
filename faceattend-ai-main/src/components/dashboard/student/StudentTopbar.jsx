// ─── StudentTopbar.jsx ───────────────────────────────────────────────────────
// Top navigation bar for Student dashboard
// Usage: used inside StudentLayout.jsx

import { useState }               from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons }                  from "@/components/shared/Icons";
import AnimatedDot                from "@/components/ui/AnimatedDot";

const NOTIFICATIONS = [
  { id:1, text:"Your attendance in CS-401 dropped below 75%", time:"1h ago",  color:"#f59e0b", read:false },
  { id:2, text:"CS-301 attendance marked: Present",           time:"3h ago",  color:"#10b981", read:false },
  { id:3, text:"Semester report is now available",            time:"1d ago",  color:"#3b82f6", read:true  },
];

export default function StudentTopbar({ pageTitle = "Dashboard" }) {
  const [notifOpen,   setNotifOpen]   = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const unread = NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <header className="h-16 flex items-center justify-between px-6
                       border-b border-white/[0.07] bg-[#07070f]/80
                       backdrop-blur-xl flex-shrink-0 relative z-30">

      {/* left */}
      <div>
        <h1 className="text-white font-bold text-[15px] leading-tight">
          {pageTitle}
        </h1>
        <div className="flex items-center gap-1.5 mt-0.5">
          <AnimatedDot color="#3b82f6" size="w-1.5 h-1.5" />
          <span className="text-white/30 text-[11px] font-mono">Student Portal</span>
        </div>
      </div>

      {/* right */}
      <div className="flex items-center gap-2">

        {/* notifications */}
        <div className="relative">
          <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
            onClick={() => { setNotifOpen(v=>!v); setProfileOpen(false); }}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center
                       text-white/40 hover:text-white hover:bg-white/[0.06] transition-all">
            <Icons.Bell className="w-5 h-5"/>
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full
                               bg-blue-400 border-2 border-[#07070f]"/>
            )}
          </motion.button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity:0, y:8, scale:0.95 }}
                animate={{ opacity:1, y:0, scale:1 }}
                exit={{ opacity:0, y:8, scale:0.95 }}
                transition={{ duration:0.15 }}
                className="absolute right-0 top-12 w-72 rounded-2xl
                           border border-white/[0.09] bg-[#0d0d1a]
                           shadow-2xl shadow-black/50 z-50 overflow-hidden"
              >
                <div className="flex items-center justify-between px-5 py-4
                                border-b border-white/[0.07]">
                  <span className="text-white font-semibold text-[13px]">Notifications</span>
                  <span className="text-blue-400 text-[11px] font-mono cursor-pointer">
                    Mark all read
                  </span>
                </div>
                {NOTIFICATIONS.map(n => (
                  <div key={n.id}
                    className="flex items-start gap-3 px-5 py-3.5
                               border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors">
                    <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{ background: n.read ? "rgba(255,255,255,0.15)" : n.color }}/>
                    <div>
                      <p className={`text-[12px] leading-snug ${n.read?"text-white/35":"text-white/70"}`}>
                        {n.text}
                      </p>
                      <p className="text-white/20 text-[10px] mt-1 font-mono">{n.time}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* profile */}
        <div className="relative">
          <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
            onClick={() => { setProfileOpen(v=>!v); setNotifOpen(false); }}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5
                       rounded-xl hover:bg-white/[0.06] transition-all">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center
                            text-[11px] font-black text-black"
              style={{ background:"linear-gradient(135deg,#3b82f6,#10b981)" }}>
              W
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-white text-[12px] font-semibold leading-tight">Wasiya</p>
              <p className="text-white/30 text-[10px]">CS-2021-001</p>
            </div>
            <Icons.ChevronDown className="w-3.5 h-3.5 text-white/30"/>
          </motion.button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity:0, y:8, scale:0.95 }}
                animate={{ opacity:1, y:0, scale:1 }}
                exit={{ opacity:0, y:8, scale:0.95 }}
                transition={{ duration:0.15 }}
                className="absolute right-0 top-12 w-48 rounded-2xl
                           border border-white/[0.09] bg-[#0d0d1a]
                           shadow-2xl shadow-black/50 z-50 p-2">
                {[
                  { icon:<Icons.User     className="w-4 h-4"/>, label:"My Profile"     },
                  { icon:<Icons.Download className="w-4 h-4"/>, label:"Download Report"},
                  { icon:<Icons.Settings className="w-4 h-4"/>, label:"Settings"       },
                ].map(item => (
                  <button key={item.label}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                               text-[13px] text-white/50 hover:text-white
                               hover:bg-white/[0.05] transition-all text-left">
                    <span className="text-white/30">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
                <div className="h-px bg-white/[0.06] my-1.5"/>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                                   text-[13px] text-red-400/70 hover:text-red-400
                                   hover:bg-red-400/[0.06] transition-all text-left">
                  <Icons.X className="w-4 h-4"/> Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
