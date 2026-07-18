// ─── AttendanceHistory.jsx (Student) ─────────────────────────────────────────
// Full personal attendance log with filter by subject/status + download
// Usage: routed at /student/history

import { useState }   from "react";
import { motion }     from "framer-motion";
import { Icons }      from "@/components/shared/Icons";
import GlassCard      from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import TagPill        from "@/components/ui/TagPill";

const RECORDS = [
  { date:"May 17, 2025", day:"Friday",    course:"CS-301", name:"Operating Systems",  time:"9:02 AM",  confidence:98.7, status:"present" },
  { date:"May 17, 2025", day:"Friday",    course:"CS-101", name:"Intro to Prog",      time:"11:03 AM", confidence:96.4, status:"present" },
  { date:"May 16, 2025", day:"Thursday",  course:"CS-401", name:"Computer Networks",  time:"—",        confidence:0,    status:"absent"  },
  { date:"May 15, 2025", day:"Wednesday", course:"CS-301", name:"Operating Systems",  time:"9:05 AM",  confidence:97.1, status:"present" },
  { date:"May 15, 2025", day:"Wednesday", course:"CS-201", name:"Data Structures",    time:"11:02 AM", confidence:95.3, status:"present" },
  { date:"May 14, 2025", day:"Tuesday",   course:"CS-501", name:"Machine Learning",   time:"3:04 PM",  confidence:99.0, status:"present" },
  { date:"May 13, 2025", day:"Monday",    course:"CS-401", name:"Computer Networks",  time:"—",        confidence:0,    status:"absent"  },
  { date:"May 13, 2025", day:"Monday",    course:"CS-101", name:"Intro to Prog",      time:"9:01 AM",  confidence:94.2, status:"present" },
];

const STATUS_C = { present:"#10b981", absent:"#ef4444" };

export default function StudentAttendanceHistory() {
  const [filter,   setFilter]   = useState("all");
  const [subject,  setSubject]  = useState("all");

  const subjects = ["all", ...new Set(RECORDS.map(r => r.course))];

  const filtered = RECORDS.filter(r => {
    const matchStatus  = filter==="all"  || r.status===filter;
    const matchSubject = subject==="all" || r.course===subject;
    return matchStatus && matchSubject;
  });

  const presentCount = filtered.filter(r=>r.status==="present").length;
  const absentCount  = filtered.filter(r=>r.status==="absent").length;

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
            {RECORDS.length} records · {presentCount} present · {absentCount} absent
          </p>
        </div>
        <GradientButton from="#3b82f6" to="#10b981"
          className="px-5 py-2.5 rounded-xl text-[13px]">
          <Icons.Download className="w-4 h-4"/> Download PDF
        </GradientButton>
      </motion.div>

      {/* filters */}
      <GlassCard padding="p-4">
        <div className="flex flex-wrap gap-3 items-center">
          {/* status filter */}
          <div className="flex gap-2">
            {["all","present","absent"].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-xl text-[12px] font-semibold
                           transition-all capitalize"
                style={filter===f
                  ? { background:`${f==="present"?"#10b981":f==="absent"?"#ef4444":"#3b82f6"}20`,
                      color: f==="present"?"#10b981":f==="absent"?"#ef4444":"#3b82f6",
                      border:`0.5px solid ${f==="present"?"#10b981":f==="absent"?"#ef4444":"#3b82f6"}40` }
                  : { background:"rgba(255,255,255,0.04)", color:"rgba(255,255,255,0.4)",
                      border:"0.5px solid rgba(255,255,255,0.07)" }
                }>{f}</button>
            ))}
          </div>

          {/* subject filter */}
          <select value={subject} onChange={e => setSubject(e.target.value)}
            className="px-4 py-2 rounded-xl text-[12px] font-semibold
                       bg-white/[0.04] border border-white/[0.07] text-white/60
                       outline-none appearance-none">
            {subjects.map(s => (
              <option key={s} value={s} className="bg-[#0d0d1a]">
                {s==="all" ? "All Subjects" : s}
              </option>
            ))}
          </select>
        </div>
      </GlassCard>

      {/* records table */}
      <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
        transition={{ delay:0.15 }}>
        <GlassCard padding="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-white/[0.07]">
                  {["Date","Day","Subject","Time","Confidence","Status"].map(h => (
                    <th key={h} className="text-left text-white/30 font-mono text-[11px]
                                           uppercase tracking-wider py-4 px-5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r,i) => (
                  <motion.tr key={i}
                    initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
                    transition={{ delay:i*0.04 }}
                    className="border-b border-white/[0.04]
                               hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-5 text-white/70 font-mono text-[12px]">
                      {r.date}
                    </td>
                    <td className="py-3.5 px-5 text-white/40 text-[12px]">{r.day}</td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2">
                        <TagPill label={r.course} color="#3b82f6" size="sm"/>
                        <span className="text-white/50 text-[12px] hidden sm:block">
                          {r.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-white/40 font-mono text-[11px]">
                      {r.time}
                    </td>
                    <td className="py-3.5 px-5">
                      {r.confidence > 0
                        ? <span className="text-green-400 font-mono text-[11px] font-bold">
                            {r.confidence}%
                          </span>
                        : <span className="text-white/20 text-[11px]">—</span>
                      }
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="flex items-center gap-1.5 w-fit px-2.5 py-1
                                       rounded-full text-[11px] font-semibold capitalize"
                        style={{
                          background:`${STATUS_C[r.status]}15`,
                          color:STATUS_C[r.status],
                        }}>
                        <div className="w-1.5 h-1.5 rounded-full"
                          style={{ background:STATUS_C[r.status] }}/>
                        {r.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <Icons.Activity className="w-8 h-8 text-white/10 mx-auto mb-3"/>
                <p className="text-white/25 text-[13px]">No records found</p>
              </div>
            )}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
