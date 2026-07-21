// ─── CourseReports.jsx ───────────────────────────────────────────────────────
// Per-course attendance breakdown with charts and student table
// Usage: routed at /teacher/reports

import { useState }  from "react";
import { motion }    from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Icons }     from "@/components/shared/Icons";
import GlassCard     from "@/components/ui/GlassCard";
import TagPill       from "@/components/ui/TagPill";
import GradientButton from "@/components/ui/GradientButton";

const COURSES = [
  { id:"CS-301", name:"Operating Systems",   color:"#a855f7", students:32, rate:91, sessions:24 },
  { id:"CS-401", name:"Computer Networks",   color:"#00f5ff", students:28, rate:78, sessions:18 },
];

const STUDENT_STATS = {
  "CS-301": [
    { id:"CS-2021-001", name:"Ali Hassan",   present:22, absent:2,  rate:92 },
    { id:"CS-2021-002", name:"Sara Ahmed",   present:20, absent:4,  rate:83 },
    { id:"CS-2021-004", name:"Nadia Khan",   present:14, absent:10, rate:58 },
    { id:"CS-2021-005", name:"Bilal Ahmed",  present:24, absent:0,  rate:100},
    { id:"CS-2021-007", name:"Hamza Rauf",   present:21, absent:3,  rate:88 },
  ],
  "CS-401": [
    { id:"CS-2021-001", name:"Ali Hassan",   present:16, absent:2,  rate:89 },
    { id:"CS-2021-003", name:"Usman Malik",  present:12, absent:6,  rate:67 },
    { id:"CS-2021-005", name:"Bilal Ahmed",  present:17, absent:1,  rate:94 },
  ],
};

const WEEKLY = {
  "CS-301": [
    {week:"W1",rate:88},{week:"W2",rate:92},{week:"W3",rate:87},
    {week:"W4",rate:95},{week:"W5",rate:91},
  ],
  "CS-401": [
    {week:"W1",rate:75},{week:"W2",rate:80},{week:"W3",rate:78},
    {week:"W4",rate:82},{week:"W5",rate:77},
  ],
};

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0d0d1a] border border-white/10 rounded-xl px-4 py-3 text-[12px]">
      <p className="text-white/40 font-mono mb-1">{label}</p>
      <p className="font-bold text-purple-400">{payload[0]?.value}%</p>
    </div>
  );
};

export default function CourseReports() {
  const [active, setActive] = useState("CS-301");
  const course   = COURSES.find(c => c.id === active);
  const students = STUDENT_STATS[active] || [];
  const weekly   = WEEKLY[active]        || [];

  return (
    <div className="space-y-5">

      {/* header */}
      <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
        className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-white text-[20px] font-black tracking-tight">
            Course Reports
          </h2>
          <p className="text-white/35 text-[13px] mt-0.5">
            Detailed per-course attendance analytics
          </p>
        </div>
        <GradientButton from="#a855f7" to="#3b82f6"
          className="px-5 py-2.5 rounded-xl text-[13px]">
          <Icons.Download className="w-4 h-4"/> Export Report
        </GradientButton>
      </motion.div>

      {/* course tabs */}
      <div className="flex gap-3">
        {COURSES.map(c => (
          <button key={c.id} onClick={() => setActive(c.id)}
            className="px-5 py-2.5 rounded-xl text-[13px] font-semibold
                       transition-all flex items-center gap-2"
            style={active===c.id
              ? {background:`linear-gradient(135deg,${c.color},${c.color}aa)`,color:"#000"}
              : {background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.45)",
                 border:"0.5px solid rgba(255,255,255,0.08)"}
            }>
            {c.id}
            <span className="text-[11px] opacity-70">· {c.rate}%</span>
          </button>
        ))}
      </div>

      {/* course overview cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label:"Students", value:course.students, color:course.color },
          { label:"Sessions", value:course.sessions, color:course.color },
          { label:"Avg Rate", value:`${course.rate}%`, color:course.color },
        ].map((s,i) => (
          <motion.div key={s.label}
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ delay: i*0.07 }}
            className="p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] text-center">
            <p className="text-[28px] font-black" style={{color:s.color}}>{s.value}</p>
            <p className="text-white/35 text-[12px] mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* chart + student table */}
      <div className="grid lg:grid-cols-2 gap-4">

        {/* weekly chart */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.2 }}>
          <GlassCard padding="p-5">
            <h3 className="text-white font-bold text-[14px] mb-1">Weekly Trend</h3>
            <p className="text-white/30 text-[12px] mb-5">{course.name}</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weekly}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                <XAxis dataKey="week" tick={{fill:"rgba(255,255,255,0.35)",fontSize:11}}
                       axisLine={false} tickLine={false}/>
                <YAxis domain={[60,100]} tick={{fill:"rgba(255,255,255,0.3)",fontSize:11}}
                       axisLine={false} tickLine={false}/>
                <Tooltip content={<ChartTooltip/>}/>
                <Bar dataKey="rate" fill={course.color} radius={[4,4,0,0]} fillOpacity={0.85}/>
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>

        {/* student table */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.25 }}>
          <GlassCard padding="p-5">
            <h3 className="text-white font-bold text-[14px] mb-4">Student Breakdown</h3>
            <div className="space-y-2.5">
              {students.map((s, i) => (
                <motion.div key={s.id}
                  initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
                  transition={{ delay:0.3+i*0.06 }}
                  className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center
                                  text-[10px] font-black flex-shrink-0"
                    style={{
                      background: s.rate>=75 ? "rgba(16,185,129,0.15)":"rgba(239,68,68,0.15)",
                      color:      s.rate>=75 ? "#10b981":"#ef4444",
                    }}>
                    {s.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-[12px] font-medium truncate">{s.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="flex-1 h-1 rounded-full bg-white/[0.07]">
                        <div className="h-full rounded-full transition-all"
                          style={{
                            width:`${s.rate}%`,
                            background: s.rate>=75 ? "#10b981":"#ef4444",
                          }}/>
                      </div>
                      <span className="text-[10px] font-mono flex-shrink-0"
                        style={{color:s.rate>=75?"#10b981":"#ef4444"}}>
                        {s.rate}%
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-white/50 text-[11px]">{s.present}P / {s.absent}A</p>
                    {s.rate < 75 && (
                      <span className="text-[10px] text-yellow-400 font-mono">⚠ Low</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
