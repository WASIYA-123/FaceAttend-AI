// ─── SubjectAttendance.jsx ───────────────────────────────────────────────────
// Per-subject attendance breakdown with expandable session logs
// Usage: routed at /student/subjects

import { useState }   from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons }      from "@/components/shared/Icons";
import GlassCard      from "@/components/ui/GlassCard";
import TagPill        from "@/components/ui/TagPill";

const SUBJECTS = [
  {
    code:"CS-101", name:"Intro to Programming", color:"#10b981",
    rate:95, present:19, absent:1, total:20,
    teacher:"Prof. Sara Khan", schedule:"Mon/Wed 9:00 AM",
    sessions:[
      {date:"May 17",status:"present"},{date:"May 15",status:"present"},
      {date:"May 12",status:"absent"}, {date:"May 10",status:"present"},
    ],
  },
  {
    code:"CS-301", name:"Operating Systems",   color:"#a855f7",
    rate:83, present:20, absent:4, total:24,
    teacher:"Dr. Ahmed", schedule:"Mon/Wed 2:00 PM",
    sessions:[
      {date:"May 17",status:"present"},{date:"May 15",status:"absent"},
      {date:"May 12",status:"present"},{date:"May 10",status:"present"},
    ],
  },
  {
    code:"CS-401", name:"Computer Networks",   color:"#f59e0b",
    rate:67, present:12, absent:6, total:18,
    teacher:"Dr. Ahmed", schedule:"Fri 10:00 AM",
    sessions:[
      {date:"May 16",status:"absent"}, {date:"May 9",status:"present"},
      {date:"May 2",status:"absent"}, {date:"Apr 25",status:"present"},
    ],
  },
];

const STATUS_C = { present:"#10b981", absent:"#ef4444" };

export default function SubjectAttendance() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="space-y-5">

      {/* header */}
      <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}>
        <h2 className="text-white text-[20px] font-black tracking-tight">
          Subject Attendance
        </h2>
        <p className="text-white/35 text-[13px] mt-0.5">
          Detailed breakdown per subject
        </p>
      </motion.div>

      {/* summary bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label:"Subjects",     value:"6",    color:"#3b82f6" },
          { label:"Good Standing",value:"5",    color:"#10b981" },
          { label:"Warnings",     value:"1",    color:"#f59e0b" },
        ].map((s,i) => (
          <motion.div key={s.label}
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:i*0.07 }}
            className="p-5 rounded-2xl border border-white/[0.07]
                       bg-white/[0.02] text-center">
            <p className="text-[28px] font-black" style={{color:s.color}}>{s.value}</p>
            <p className="text-white/35 text-[12px] mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* subject list */}
      <div className="space-y-3">
        {SUBJECTS.map((sub, i) => (
          <motion.div key={sub.code}
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.2+i*0.08 }}>
            <GlassCard padding="p-0">

              {/* subject row */}
              <button
                onClick={() => setExpanded(expanded===sub.code ? null : sub.code)}
                className="w-full flex items-center gap-4 p-5 text-left
                           hover:bg-white/[0.02] transition-colors rounded-2xl">

                {/* code badge */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center
                                text-[13px] font-black flex-shrink-0"
                  style={{ background:`${sub.color}20`, color:sub.color }}>
                  {sub.code.split("-")[1]}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="text-white font-bold text-[14px]">{sub.name}</p>
                    <TagPill label={sub.code} color={sub.color} size="sm"/>
                    {sub.rate < 75 && (
                      <span className="flex items-center gap-1 text-[10px]
                                       text-yellow-400 font-mono bg-yellow-400/10
                                       px-2 py-0.5 rounded-full border border-yellow-400/20">
                        <Icons.Warning className="w-3 h-3"/> Warning
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-[11px] text-white/35">
                    <span>{sub.teacher}</span>
                    <span>·</span>
                    <span>{sub.schedule}</span>
                  </div>
                </div>

                {/* rate + bar */}
                <div className="hidden sm:flex items-center gap-3 flex-shrink-0 w-40">
                  <div className="flex-1 h-2 rounded-full bg-white/[0.07]">
                    <div className="h-full rounded-full"
                      style={{
                        width:`${sub.rate}%`,
                        background: sub.rate>=75 ? sub.color : "#ef4444",
                      }}/>
                  </div>
                  <span className="text-[13px] font-black w-10 text-right"
                    style={{ color: sub.rate>=75 ? sub.color : "#ef4444" }}>
                    {sub.rate}%
                  </span>
                </div>

                {/* present/absent */}
                <div className="hidden md:flex items-center gap-4 text-[12px] flex-shrink-0">
                  <div className="text-center">
                    <p className="text-green-400 font-black">{sub.present}</p>
                    <p className="text-white/25 text-[10px]">Present</p>
                  </div>
                  <div className="text-center">
                    <p className="text-red-400/80 font-black">{sub.absent}</p>
                    <p className="text-white/25 text-[10px]">Absent</p>
                  </div>
                </div>

                <motion.div
                  animate={{ rotate: expanded===sub.code ? 180 : 0 }}
                  transition={{ duration:0.2 }}
                  className="text-white/30 flex-shrink-0">
                  <Icons.ChevronDown className="w-4 h-4"/>
                </motion.div>
              </button>

              {/* expanded sessions */}
              <AnimatePresence>
                {expanded === sub.code && (
                  <motion.div
                    initial={{ height:0, opacity:0 }}
                    animate={{ height:"auto", opacity:1 }}
                    exit={{ height:0, opacity:0 }}
                    transition={{ duration:0.22 }}
                    className="overflow-hidden">
                    <div className="px-5 pb-5 pt-4 border-t border-white/[0.06]">
                      <p className="text-white/35 text-[12px] font-mono mb-3">
                        Recent sessions
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {sub.sessions.map((s,j) => (
                          <motion.div key={j}
                            initial={{ opacity:0, scale:0.9 }}
                            animate={{ opacity:1, scale:1 }}
                            transition={{ delay:j*0.06 }}
                            className="flex items-center gap-2 p-3 rounded-xl border"
                            style={{
                              border:`0.5px solid ${STATUS_C[s.status]}30`,
                              background:`${STATUS_C[s.status]}08`,
                            }}>
                            <div className="w-2 h-2 rounded-full flex-shrink-0"
                              style={{ background:STATUS_C[s.status] }}/>
                            <div>
                              <p className="text-white/60 text-[11px]">{s.date}</p>
                              <p className="text-[10px] capitalize font-semibold"
                                style={{ color:STATUS_C[s.status] }}>{s.status}</p>
                            </div>
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
