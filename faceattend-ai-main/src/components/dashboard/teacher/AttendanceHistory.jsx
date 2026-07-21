// ─── AttendanceHistory.jsx (Teacher) ─────────────────────────────────────────
// All past sessions with expand-to-see-student-list feature
// Usage: routed at /teacher/history

import { useState }   from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons }      from "@/components/shared/Icons";
import GlassCard      from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import TagPill        from "@/components/ui/TagPill";

const SESSIONS = [
  {
    id:1, course:"CS-301", name:"Operating Systems",
    date:"May 17, 2025", time:"9:00 AM", duration:"50 min",
    present:30, absent:2, rate:94,
    students:[
      {id:"CS-2021-001",name:"Ali Hassan",  status:"present"},
      {id:"CS-2021-002",name:"Sara Ahmed",  status:"present"},
      {id:"CS-2021-003",name:"Usman Malik", status:"absent"},
      {id:"CS-2021-004",name:"Nadia Khan",  status:"present"},
    ],
  },
  {
    id:2, course:"CS-401", name:"Computer Networks",
    date:"May 16, 2025", time:"2:00 PM", duration:"50 min",
    present:25, absent:3, rate:89,
    students:[
      {id:"CS-2021-001",name:"Ali Hassan",  status:"present"},
      {id:"CS-2021-005",name:"Bilal Ahmed", status:"absent"},
      {id:"CS-2021-007",name:"Hamza Rauf",  status:"present"},
    ],
  },
  {
    id:3, course:"CS-301", name:"Operating Systems",
    date:"May 15, 2025", time:"9:00 AM", duration:"50 min",
    present:28, absent:4, rate:88,
    students:[
      {id:"CS-2021-002",name:"Sara Ahmed",  status:"absent"},
      {id:"CS-2021-004",name:"Nadia Khan",  status:"present"},
    ],
  },
];

const STATUS_C = { present:"#10b981", absent:"#ef4444" };

export default function AttendanceHistory() {
  const [expanded, setExpanded] = useState(null);
  const [search,   setSearch]   = useState("");

  const filtered = SESSIONS.filter(s =>
    s.course.toLowerCase().includes(search.toLowerCase()) ||
    s.date.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">

      {/* header */}
      <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
        className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-white text-[20px] font-black tracking-tight">
            Attendance History
          </h2>
          <p className="text-white/35 text-[13px] mt-0.5">
            {SESSIONS.length} sessions recorded
          </p>
        </div>
        <GradientButton from="#a855f7" to="#3b82f6"
          className="px-5 py-2.5 rounded-xl text-[13px]">
          <Icons.Download className="w-4 h-4" /> Export All
        </GradientButton>
      </motion.div>

      {/* search */}
      <GlassCard padding="p-4">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                        bg-white/[0.04] border border-white/[0.07] max-w-sm
                        focus-within:border-purple-500/40 transition-all">
          <Icons.Search className="w-4 h-4 text-white/25 flex-shrink-0" />
          <input type="text" value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="Search by course or date..."
            className="flex-1 bg-transparent text-white/70 text-[13px]
                       placeholder-white/20 outline-none"/>
        </div>
      </GlassCard>

      {/* sessions list */}
      <div className="space-y-3">
        {filtered.map((session, i) => (
          <motion.div key={session.id}
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ delay: i * 0.07 }}>
            <GlassCard padding="p-0">
              {/* session row */}
              <button
                onClick={() => setExpanded(expanded===session.id ? null : session.id)}
                className="w-full flex items-center gap-4 p-5 text-left
                           hover:bg-white/[0.02] transition-colors rounded-2xl">
                {/* course badge */}
                <div className="w-11 h-11 rounded-xl flex items-center justify-center
                                text-[13px] font-black flex-shrink-0"
                  style={{background:"rgba(168,85,247,0.15)",color:"#a855f7"}}>
                  {session.course.split("-")[1]}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-white font-bold text-[14px]">{session.name}</p>
                    <TagPill label={session.course} color="#a855f7" size="sm"/>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-[11px] text-white/35">
                    <span className="flex items-center gap-1">
                      <Icons.Calendar className="w-3 h-3"/> {session.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icons.Clock className="w-3 h-3"/> {session.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icons.Activity className="w-3 h-3"/> {session.duration}
                    </span>
                  </div>
                </div>

                {/* stats */}
                <div className="hidden sm:flex items-center gap-5 flex-shrink-0">
                  <div className="text-center">
                    <p className="text-green-400 font-black text-[16px]">{session.present}</p>
                    <p className="text-white/25 text-[10px]">Present</p>
                  </div>
                  <div className="text-center">
                    <p className="text-red-400/80 font-black text-[16px]">{session.absent}</p>
                    <p className="text-white/25 text-[10px]">Absent</p>
                  </div>
                  <div className="text-center">
                    <p className="text-purple-400 font-black text-[16px]">{session.rate}%</p>
                    <p className="text-white/25 text-[10px]">Rate</p>
                  </div>
                </div>

                <motion.div
                  animate={{ rotate: expanded===session.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-white/30 flex-shrink-0">
                  <Icons.ChevronDown className="w-4 h-4"/>
                </motion.div>
              </button>

              {/* expanded student list */}
              <AnimatePresence>
                {expanded === session.id && (
                  <motion.div
                    initial={{ height:0, opacity:0 }}
                    animate={{ height:"auto", opacity:1 }}
                    exit={{ height:0, opacity:0 }}
                    transition={{ duration:0.22 }}
                    className="overflow-hidden">
                    <div className="px-5 pb-5 border-t border-white/[0.06] pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-white/40 text-[12px] font-mono">
                          Student attendance list
                        </p>
                        <button className="flex items-center gap-1.5 text-purple-400
                                           text-[11px] font-mono hover:underline">
                          <Icons.Download className="w-3 h-3"/> Export
                        </button>
                      </div>
                      <div className="space-y-2">
                        {session.students.map((s, j) => (
                          <motion.div key={s.id}
                            initial={{ opacity:0, x:-10 }}
                            animate={{ opacity:1, x:0 }}
                            transition={{ delay: j*0.05 }}
                            className="flex items-center gap-3 p-3 rounded-xl
                                       border border-white/[0.05] bg-white/[0.02]">
                            <div className="w-7 h-7 rounded-lg flex items-center
                                            justify-center text-[10px] font-black"
                              style={{
                                background:`${STATUS_C[s.status]}15`,
                                color:STATUS_C[s.status],
                              }}>
                              {s.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-[12px] font-medium">{s.name}</p>
                              <p className="text-white/25 text-[10px] font-mono">{s.id}</p>
                            </div>
                            <span className="text-[11px] font-semibold px-2.5 py-1
                                             rounded-full capitalize"
                              style={{
                                background:`${STATUS_C[s.status]}15`,
                                color:STATUS_C[s.status],
                              }}>
                              {s.status}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
