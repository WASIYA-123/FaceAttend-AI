// ─── ManualCorrection.jsx ────────────────────────────────────────────────────
// Override AI attendance — mark/unmark individual students for a session
// Usage: routed at /teacher/correction

import { useState }   from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons }      from "@/components/shared/Icons";
import GlassCard      from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import TagPill        from "@/components/ui/TagPill";

const SESSIONS = [
  { id:1, course:"CS-301", date:"May 17, 2025 · 9:00 AM"  },
  { id:2, course:"CS-401", date:"May 16, 2025 · 2:00 PM"  },
  { id:3, course:"CS-301", date:"May 15, 2025 · 9:00 AM"  },
];

const INITIAL_RECORDS = [
  { id:"CS-2021-001", name:"Ali Hassan",   original:"present", current:"present" },
  { id:"CS-2021-002", name:"Sara Ahmed",   original:"present", current:"present" },
  { id:"CS-2021-003", name:"Usman Malik",  original:"absent",  current:"absent"  },
  { id:"CS-2021-004", name:"Nadia Khan",   original:"absent",  current:"absent"  },
  { id:"CS-2021-005", name:"Bilal Ahmed",  original:"present", current:"present" },
  { id:"CS-2021-007", name:"Hamza Rauf",   original:"present", current:"present" },
];

const STATUS_C = { present:"#10b981", absent:"#ef4444" };

export default function ManualCorrection() {
  const [selectedSession, setSelectedSession] = useState(null);
  const [records, setRecords] = useState(INITIAL_RECORDS);
  const [reason,  setReason ] = useState("");
  const [saved,   setSaved  ] = useState(false);

  const changed = records.filter(r => r.original !== r.current);

  const toggle = (id) => {
    setRecords(prev => prev.map(r =>
      r.id === id
        ? { ...r, current: r.current === "present" ? "absent" : "present" }
        : r
    ));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-5">

      {/* header */}
      <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
        className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-white text-[20px] font-black tracking-tight">
            Manual Correction
          </h2>
          <p className="text-white/35 text-[13px] mt-0.5">
            Override AI attendance for any session
          </p>
        </div>
        {changed.length > 0 && (
          <TagPill label={`${changed.length} change${changed.length>1?"s":""} pending`}
            color="#f59e0b" size="md"/>
        )}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-5">

        {/* ── session picker ────────────────────────────────────────── */}
        <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
          transition={{ delay:0.1 }}>
          <GlassCard padding="p-5">
            <h3 className="text-white font-bold text-[14px] mb-4">Select Session</h3>
            <div className="space-y-2.5">
              {SESSIONS.map(s => (
                <button key={s.id} onClick={() => setSelectedSession(s.id)}
                  className="w-full flex items-center gap-3 p-3.5 rounded-xl
                             border transition-all text-left"
                  style={selectedSession===s.id
                    ? {border:"1px solid rgba(168,85,247,0.5)",background:"rgba(168,85,247,0.1)"}
                    : {border:"1px solid rgba(255,255,255,0.07)",background:"rgba(255,255,255,0.02)"}
                  }>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center
                                  text-[11px] font-black flex-shrink-0"
                    style={{background:"rgba(168,85,247,0.15)",color:"#a855f7"}}>
                    {s.course.split("-")[1]}
                  </div>
                  <div>
                    <p className={`text-[13px] font-semibold ${selectedSession===s.id?"text-white":"text-white/60"}`}>
                      {s.course}
                    </p>
                    <p className="text-white/30 text-[11px] mt-0.5">{s.date}</p>
                  </div>
                </button>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* ── records editor ────────────────────────────────────────── */}
        <motion.div className="lg:col-span-2"
          initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
          transition={{ delay:0.15 }}>
          <GlassCard padding="p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold text-[14px]">
                {selectedSession
                  ? `Session ${selectedSession} — Attendance Records`
                  : "Select a session to edit"}
              </h3>
              {selectedSession && (
                <span className="text-white/25 text-[11px] font-mono">
                  Click to toggle status
                </span>
              )}
            </div>

            {!selectedSession ? (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <Icons.Edit className="w-8 h-8 text-white/10 mb-3"/>
                <p className="text-white/25 text-[13px]">
                  Select a session from the left to start editing
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-2.5 mb-5">
                  {records.map((r, i) => {
                    const wasChanged = r.original !== r.current;
                    return (
                      <motion.button key={r.id}
                        initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
                        transition={{ delay:i*0.05 }}
                        onClick={() => toggle(r.id)}
                        className="w-full flex items-center gap-3 p-3.5 rounded-xl
                                   border transition-all text-left group"
                        style={{
                          border: wasChanged
                            ? "1px solid rgba(245,158,11,0.4)"
                            : "1px solid rgba(255,255,255,0.07)",
                          background: wasChanged
                            ? "rgba(245,158,11,0.05)"
                            : "rgba(255,255,255,0.02)",
                        }}>
                        {/* avatar */}
                        <div className="w-9 h-9 rounded-xl flex items-center
                                        justify-center text-[11px] font-black flex-shrink-0"
                          style={{
                            background:`${STATUS_C[r.current]}15`,
                            color:STATUS_C[r.current],
                          }}>
                          {r.name.charAt(0)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="text-white text-[13px] font-semibold truncate">
                            {r.name}
                          </p>
                          <p className="text-white/30 text-[11px] font-mono">{r.id}</p>
                        </div>

                        {/* changed badge */}
                        {wasChanged && (
                          <span className="text-[10px] font-mono text-yellow-400
                                           bg-yellow-400/10 px-2 py-0.5 rounded-full">
                            Changed
                          </span>
                        )}

                        {/* toggle button */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[11px] font-semibold px-2.5 py-1
                                           rounded-full capitalize"
                            style={{
                              background:`${STATUS_C[r.current]}15`,
                              color:STATUS_C[r.current],
                            }}>
                            {r.current}
                          </span>
                          <Icons.Edit className="w-3.5 h-3.5 text-white/20
                                                 group-hover:text-white/50 transition-colors"/>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* reason input */}
                {changed.length > 0 && (
                  <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                    className="mb-4">
                    <label className="text-[12px] text-white/40 mb-1.5 block">
                      Reason for correction <span className="text-red-400">*</span>
                    </label>
                    <textarea value={reason} onChange={e=>setReason(e.target.value)}
                      placeholder="e.g. Student was present but not recognized by camera due to lighting..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl text-[13px] text-white
                                 placeholder-white/20 outline-none resize-none
                                 bg-white/[0.05] border border-white/[0.08]
                                 focus:border-purple-500/50 transition-colors"/>
                  </motion.div>
                )}

                {/* save button */}
                <div className="flex gap-3">
                  <button onClick={() => setRecords(INITIAL_RECORDS)}
                    className="px-5 py-2.5 rounded-xl text-[13px] font-semibold
                               text-white/50 border border-white/10
                               hover:bg-white/[0.05] transition-all">
                    Reset
                  </button>
                  <GradientButton from="#a855f7" to="#3b82f6"
                    onClick={handleSave}
                    disabled={changed.length===0||!reason.trim()}
                    className="flex-1 py-2.5 rounded-xl text-[13px]">
                    <Icons.Check className="w-4 h-4"/>
                    Save {changed.length} Correction{changed.length>1?"s":""}
                  </GradientButton>
                </div>

                {/* success */}
                <AnimatePresence>
                  {saved && (
                    <motion.div initial={{ opacity:0, y:5 }} animate={{ opacity:1, y:0 }}
                      exit={{ opacity:0 }}
                      className="mt-3 flex items-center gap-2 px-4 py-3 rounded-xl
                                 border border-green-500/20 bg-green-500/[0.07]
                                 text-green-400 text-[13px]">
                      <Icons.Check className="w-4 h-4"/>
                      Corrections saved successfully!
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
