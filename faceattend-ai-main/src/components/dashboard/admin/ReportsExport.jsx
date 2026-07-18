// ─── ReportsExport.jsx ───────────────────────────────────────────────────────
// Generate and download attendance reports in PDF / CSV / Excel
// Usage: routed at /admin/reports

import { useState }   from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons }      from "@/components/shared/Icons";
import GlassCard      from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import TagPill        from "@/components/ui/TagPill";

const REPORT_TYPES = [
  { id:"full",    label:"Full Attendance Report",      desc:"All students, all sessions",     color:"#00f5ff", icon:<Icons.File     className="w-5 h-5"/> },
  { id:"course",  label:"Course-wise Report",          desc:"Breakdown per course",            color:"#a855f7", icon:<Icons.Layers   className="w-5 h-5"/> },
  { id:"student", label:"Individual Student Report",   desc:"Single student history",          color:"#3b82f6", icon:<Icons.User     className="w-5 h-5"/> },
  { id:"warning", label:"Warning Students Report",     desc:"Below 75% attendance",            color:"#f59e0b", icon:<Icons.Warning  className="w-5 h-5"/> },
  { id:"daily",   label:"Daily Attendance Sheet",      desc:"One day snapshot",                color:"#10b981", icon:<Icons.Calendar className="w-5 h-5"/> },
  { id:"summary", label:"Semester Summary",            desc:"Complete semester overview",      color:"#ec4899", icon:<Icons.PieChart className="w-5 h-5"/> },
];

const FORMATS = [
  { id:"pdf",  label:"PDF",  icon:"📄" },
  { id:"csv",  label:"CSV",  icon:"📊" },
  { id:"xlsx", label:"Excel",icon:"📗" },
];

const RECENT = [
  { name:"Full_Report_May_2025.pdf",    size:"2.4 MB", date:"Today 10:30 AM",   type:"pdf",  color:"#ef4444" },
  { name:"CS301_Attendance.xlsx",       size:"0.8 MB", date:"Yesterday 3:15 PM",type:"xlsx", color:"#10b981" },
  { name:"Warning_Students_Apr.csv",    size:"0.1 MB", date:"Apr 28, 2025",     type:"csv",  color:"#f59e0b" },
  { name:"Semester_Summary_2025.pdf",   size:"5.2 MB", date:"Apr 20, 2025",     type:"pdf",  color:"#ef4444" },
];

export default function ReportsExport() {
  const [selected, setSelected] = useState("full");
  const [format,   setFormat]   = useState("pdf");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo,   setDateTo]   = useState("");
  const [loading,  setLoading]  = useState(false);
  const [done,     setDone]     = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setDone(false);
    setTimeout(()=>{ setLoading(false); setDone(true); }, 2000);
    setTimeout(()=>setDone(false), 5000);
  };

  const selectedType = REPORT_TYPES.find(r=>r.id===selected);

  return (
    <div className="space-y-5">

      {/* header */}
      <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}
        className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-white text-[20px] font-black tracking-tight">
            Reports & Export
          </h2>
          <p className="text-white/35 text-[13px] mt-0.5">
            Generate and download attendance reports
          </p>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-5">

        {/* ── left: report config ──────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-4">

          {/* report type grid */}
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}}>
            <GlassCard padding="p-5">
              <h3 className="text-white font-bold text-[14px] mb-4">Report Type</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {REPORT_TYPES.map((r,i)=>(
                  <motion.button key={r.id}
                    initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}
                    transition={{delay:i*0.05}}
                    onClick={()=>setSelected(r.id)}
                    className="flex flex-col items-start gap-2 p-4 rounded-xl
                               border transition-all text-left"
                    style={selected===r.id
                      ? {border:`1px solid ${r.color}50`,background:`${r.color}10`}
                      : {border:"1px solid rgba(255,255,255,0.07)",background:"rgba(255,255,255,0.02)"}
                    }>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{background:`${r.color}20`,color:r.color}}>
                      {r.icon}
                    </div>
                    <div>
                      <p className="text-white text-[12px] font-bold leading-tight">
                        {r.label}
                      </p>
                      <p className="text-white/30 text-[11px] mt-0.5">{r.desc}</p>
                    </div>
                    {selected===r.id && (
                      <div className="absolute top-2 right-2 w-4 h-4 rounded-full
                                      flex items-center justify-center"
                        style={{background:r.color}}>
                        <Icons.Check className="w-2.5 h-2.5 text-black"/>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* date range + format */}
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}}>
            <GlassCard padding="p-5">
              <h3 className="text-white font-bold text-[14px] mb-4">Configure Report</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-[12px] text-white/40 mb-1.5 block">From Date</label>
                  <input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-[13px] text-white/70
                               bg-white/[0.05] border border-white/[0.08] outline-none
                               focus:border-cyan-500/50 transition-colors"/>
                </div>
                <div>
                  <label className="text-[12px] text-white/40 mb-1.5 block">To Date</label>
                  <input type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-[13px] text-white/70
                               bg-white/[0.05] border border-white/[0.08] outline-none
                               focus:border-cyan-500/50 transition-colors"/>
                </div>
              </div>

              {/* format picker */}
              <div>
                <label className="text-[12px] text-white/40 mb-2 block">Export Format</label>
                <div className="flex gap-3">
                  {FORMATS.map(f=>(
                    <button key={f.id} onClick={()=>setFormat(f.id)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                                 text-[13px] font-semibold transition-all border"
                      style={format===f.id
                        ? {background:"rgba(0,245,255,0.12)",color:"#00f5ff",
                           border:"0.5px solid rgba(0,245,255,0.3)"}
                        : {background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.45)",
                           border:"0.5px solid rgba(255,255,255,0.07)"}
                      }>
                      <span>{f.icon}</span> {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* generate button */}
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}}>
            <GradientButton
              from={selectedType?.color||"#00f5ff"}
              to="#a855f7"
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-4 rounded-xl text-[14px]">
              {loading
                ? <><motion.div animate={{rotate:360}}
                    transition={{duration:0.8,repeat:Infinity,ease:"linear"}}
                    className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"/>
                    Generating Report...</>
                : <><Icons.Download className="w-4 h-4"/> Generate & Download {format.toUpperCase()}</>
              }
            </GradientButton>

            <AnimatePresence>
              {done && (
                <motion.div initial={{opacity:0,y:5}} animate={{opacity:1,y:0}}
                  exit={{opacity:0}} className="mt-3 flex items-center gap-2 px-4 py-3
                  rounded-xl border border-green-500/20 bg-green-500/[0.07] text-green-400 text-[13px]">
                  <Icons.Check className="w-4 h-4"/>
                  Report generated successfully! Download started.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── right: recent reports ─────────────────────────────────── */}
        <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:0.25}}>
          <GlassCard padding="p-5">
            <h3 className="text-white font-bold text-[14px] mb-5">Recent Reports</h3>
            <div className="space-y-3">
              {RECENT.map((r,i)=>(
                <motion.div key={i}
                  initial={{opacity:0,x:10}} animate={{opacity:1,x:0}}
                  transition={{delay:0.3+i*0.07}}
                  className="flex items-start gap-3 p-3 rounded-xl
                             border border-white/[0.06] bg-white/[0.02]
                             hover:bg-white/[0.04] transition-all group">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center
                                  text-lg flex-shrink-0"
                    style={{background:`${r.color}15`}}>
                    {r.type==="pdf"?"📄":r.type==="xlsx"?"📗":"📊"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-[12px] font-semibold truncate">
                      {r.name}
                    </p>
                    <p className="text-white/30 text-[11px] mt-0.5">{r.size} · {r.date}</p>
                  </div>
                  <button className="p-1.5 rounded-lg text-white/20
                                     hover:text-cyan-400 hover:bg-cyan-400/10
                                     opacity-0 group-hover:opacity-100 transition-all">
                    <Icons.Download className="w-3.5 h-3.5"/>
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-white/[0.06]">
              <button className="w-full text-center text-cyan-400 text-[12px]
                                 font-mono hover:underline">
                View all reports →
              </button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
