// ─── StartAttendance.jsx ─────────────────────────────────────────────────────
// Live camera UI + AI scanning animation + real-time detected student list
// Usage: routed at /teacher/start-attendance

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons }       from "@/components/shared/Icons";
import AIScannerCard   from "@/components/shared/AIScannerCard";
import GlassCard       from "@/components/ui/GlassCard";
import GradientButton  from "@/components/ui/GradientButton";
import AnimatedDot     from "@/components/ui/AnimatedDot";
import TagPill         from "@/components/ui/TagPill";
import LiveBadge       from "@/components/ui/LiveBadge";

const COURSES = ["CS-301 — Operating Systems", "CS-401 — Computer Networks"];

const MOCK_STUDENTS = [
  { id:"CS-2021-001", name:"Ali Hassan",   confidence:98.7, time:"09:02 AM" },
  { id:"CS-2021-002", name:"Sara Ahmed",   confidence:96.4, time:"09:03 AM" },
  { id:"CS-2021-004", name:"Nadia Khan",   confidence:94.1, time:"09:04 AM" },
  { id:"CS-2021-005", name:"Bilal Ahmed",  confidence:99.1, time:"09:05 AM" },
  { id:"CS-2021-007", name:"HamWA Rauf",   confidence:97.3, time:"09:06 AM" },
];

export default function StartAttendance() {
  const [course,    setCourse]    = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [detected,  setDetected]  = useState([]);
  const [elapsed,   setElapsed]   = useState(0);
  const [ended,     setEnded]     = useState(false);

  // simulate students being detected one by one
  useEffect(() => {
    if (!isRunning) return;
    setDetected([]);
    MOCK_STUDENTS.forEach((s, i) => {
      setTimeout(() => {
        setDetected(prev => [...prev, s]);
      }, (i + 1) * 2200);
    });
  }, [isRunning]);

  // elapsed timer
  useEffect(() => {
    if (!isRunning) return;
    const t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, [isRunning]);

  const fmt = (s) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  const handleStart = () => {
    if (!course) return;
    setIsRunning(true);
    setEnded(false);
    setElapsed(0);
  };

  const handleEnd = () => {
    setIsRunning(false);
    setEnded(true);
  };

  return (
    <div className="space-y-5">

      {/* header */}
      <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
        className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-white text-[20px] font-black tracking-tight">
            Start Attendance Session
          </h2>
          <p className="text-white/35 text-[13px] mt-0.5">
            AI will automatically detect and mark students
          </p>
        </div>
        {isRunning && <LiveBadge label="Session Live" color="#a855f7" />}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-5">

        {/* ── left: camera + scanner ───────────────────────────────── */}
        <div className="space-y-4">

          {/* course select */}
          {!isRunning && !ended && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}>
              <GlassCard padding="p-5">
                <h3 className="text-white font-bold text-[14px] mb-4">
                  Select Course
                </h3>
                <div className="space-y-2.5">
                  {COURSES.map(c => (
                    <button key={c} onClick={() => setCourse(c)}
                      className="w-full flex items-center gap-3 p-4 rounded-xl
                                 border transition-all text-left"
                      style={course===c
                        ? {border:"1px solid rgba(168,85,247,0.5)",background:"rgba(168,85,247,0.1)"}
                        : {border:"1px solid rgba(255,255,255,0.07)",background:"rgba(255,255,255,0.02)"}
                      }>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center
                                      text-[12px] font-black"
                        style={{background:"rgba(168,85,247,0.15)",color:"#a855f7"}}>
                        {c.split("—")[0].trim().split("-")[1]}
                      </div>
                      <span className={`text-[13px] font-medium ${course===c?"text-white":"text-white/50"}`}>
                        {c}
                      </span>
                      {course===c && <Icons.Check className="w-4 h-4 text-purple-400 ml-auto"/>}
                    </button>
                  ))}
                </div>
                <GradientButton from="#a855f7" to="#3b82f6"
                  onClick={handleStart} disabled={!course}
                  className="w-full mt-4 py-3.5 rounded-xl text-[14px]">
                  <Icons.Play className="w-4 h-4" />
                  Start AI Detection
                </GradientButton>
              </GlassCard>
            </motion.div>
          )}

          {/* live scanner */}
          {isRunning && (
            <motion.div initial={{ opacity:0, scale:0.95 }}
              animate={{ opacity:1, scale:1 }}>
              <GlassCard padding="p-5">
                {/* session info bar */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-white font-bold text-[14px]">
                      {course.split("—")[1]?.trim()}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <AnimatedDot color="#a855f7" size="w-1.5 h-1.5" />
                      <span className="text-purple-400 text-[11px] font-mono">
                        SCANNING · {fmt(elapsed)}
                      </span>
                    </div>
                  </div>
                  <button onClick={handleEnd}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px]
                               font-semibold text-red-400 border border-red-400/20
                               bg-red-400/10 hover:bg-red-400/20 transition-all">
                    <Icons.Stop className="w-3.5 h-3.5" />
                    End Session
                  </button>
                </div>

                {/* scanner animation */}
                <div className="flex justify-center py-4">
                  <AIScannerCard size="md" showBadges={false} showConfBar />
                </div>

                {/* live stats */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {[
                    { label:"Detected",  value:detected.length,                         color:"#10b981" },
                    { label:"Absent",    value:MOCK_STUDENTS.length-detected.length,     color:"#ef4444" },
                    { label:"Total",     value:MOCK_STUDENTS.length,                     color:"#a855f7" },
                  ].map(s => (
                    <div key={s.label} className="text-center p-3 rounded-xl
                                                   border border-white/[0.06] bg-white/[0.02]">
                      <p className="text-[20px] font-black" style={{color:s.color}}>{s.value}</p>
                      <p className="text-white/30 text-[11px] mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* session ended */}
          {ended && (
            <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}>
              <GlassCard padding="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-green-500/15
                                  flex items-center justify-center mx-auto mb-4">
                    <Icons.Check className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-white font-black text-[18px] mb-2">
                    Session Complete!
                  </h3>
                  <p className="text-white/40 text-[13px] mb-5">
                    {detected.length} of {MOCK_STUDENTS.length} students marked present
                  </p>
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { label:"Present", value:detected.length,                        color:"#10b981" },
                      { label:"Absent",  value:MOCK_STUDENTS.length-detected.length,   color:"#ef4444" },
                      { label:"Rate",    value:`${Math.round((detected.length/MOCK_STUDENTS.length)*100)}%`, color:"#a855f7" },
                    ].map(s=>(
                      <div key={s.label} className="p-3 rounded-xl
                                                     border border-white/[0.06] bg-white/[0.02]">
                        <p className="text-[18px] font-black" style={{color:s.color}}>{s.value}</p>
                        <p className="text-white/30 text-[11px]">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => { setEnded(false); setCourse(""); }}
                      className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold
                                 text-white/60 border border-white/10
                                 hover:bg-white/[0.05] transition-all">
                      New Session
                    </button>
                    <GradientButton from="#a855f7" to="#3b82f6"
                      className="flex-1 py-2.5 rounded-xl text-[13px]">
                      <Icons.Download className="w-4 h-4" /> Export
                    </GradientButton>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </div>

        {/* ── right: detected students list ────────────────────────── */}
        <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
          transition={{ delay:0.2 }}>
          <GlassCard padding="p-5" className="h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-[14px]">
                Detected Students
              </h3>
              <TagPill
                label={`${detected.length} / ${MOCK_STUDENTS.length}`}
                color="#a855f7" size="sm" />
            </div>

            {detected.length === 0 && !ended && (
              <div className="flex flex-col items-center justify-center
                              h-48 text-center">
                <Icons.Scan className="w-8 h-8 text-white/10 mb-3" />
                <p className="text-white/25 text-[13px]">
                  {isRunning ? "Scanning for faces..." : "Start a session to begin"}
                </p>
              </div>
            )}

            <div className="space-y-2.5">
              <AnimatePresence>
                {detected.map((s, i) => (
                  <motion.div key={s.id}
                    initial={{ opacity:0, x:20, scale:0.95 }}
                    animate={{ opacity:1, x:0,  scale:1 }}
                    className="flex items-center gap-3 p-3.5 rounded-xl
                               border border-green-500/20 bg-green-500/[0.05]">
                    <div className="w-9 h-9 rounded-xl flex items-center
                                    justify-center text-[11px] font-black flex-shrink-0"
                      style={{background:"rgba(16,185,129,0.15)",color:"#10b981"}}>
                      {s.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-[13px] font-semibold truncate">
                        {s.name}
                      </p>
                      <p className="text-white/30 text-[11px] font-mono">{s.id}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-green-400 text-[12px] font-bold">
                        {s.confidence}%
                      </p>
                      <p className="text-white/25 text-[10px] font-mono">{s.time}</p>
                    </div>
                    <Icons.Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
