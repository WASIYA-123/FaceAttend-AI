// ─── AttendanceAnalytics.jsx ─────────────────────────────────────────────────
// Full analytics: trend charts, course breakdown, heatmap, filters
// Usage: routed at /admin/analytics

import { useState }  from "react";
import { motion }    from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { Icons }     from "@/components/shared/Icons";
import GlassCard     from "@/components/ui/GlassCard";
import StatCard      from "@/components/ui/StatCard";
import TagPill       from "@/components/ui/TagPill";

// ── mock data ─────────────────────────────────────────────────────────────────
const TREND = [
  { month:"Jan", rate:78 }, { month:"Feb", rate:82 },
  { month:"Mar", rate:80 }, { month:"Apr", rate:85 },
  { month:"May", rate:88 }, { month:"Jun", rate:91 },
  { month:"Jul", rate:87 }, { month:"Aug", rate:89 },
];

const BY_COURSE = [
  { course:"CS-101", rate:88, students:45 },
  { course:"CS-201", rate:82, students:38 },
  { course:"CS-301", rate:91, students:32 },
  { course:"CS-401", rate:78, students:28 },
  { course:"CS-501", rate:95, students:22 },
];

const PIE_DATA = [
  { name:"Present",  value:72, color:"#10b981" },
  { name:"Absent",   value:18, color:"#ef4444" },
  { name:"Late",     value:10, color:"#f59e0b" },
];

const HEATMAP_DAYS   = ["Mon","Tue","Wed","Thu","Fri"];
const HEATMAP_WEEKS  = ["W1","W2","W3","W4"];
const HEATMAP_DATA   = HEATMAP_WEEKS.map(()=>
  HEATMAP_DAYS.map(()=>Math.floor(Math.random()*40)+60)
);

const STATS = [
  { value:"87.4%", label:"Overall Attendance", change:"2.1%", changeLabel:"this month",  color:"#00f5ff", icon:<Icons.BarChart  className="w-4 h-4"/> },
  { value:"1,086", label:"Present Today",       change:"94",   changeLabel:"vs yesterday",color:"#10b981", icon:<Icons.UserCheck className="w-4 h-4"/> },
  { value:"161",   label:"Absent Today",        change:"12",   changeLabel:"less",         color:"#ef4444", icon:<Icons.UserX    className="w-4 h-4"/> },
  { value:"24",    label:"Active Sessions",      change:"8",    changeLabel:"right now",   color:"#a855f7", icon:<Icons.Camera   className="w-4 h-4"/> },
];

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0d0d1a] border border-white/10 rounded-xl px-4 py-3 text-[12px]">
      <p className="text-white/40 mb-1 font-mono">{label}</p>
      {payload.map(p=>(
        <p key={p.name} style={{color:p.color||"#00f5ff"}} className="font-bold">
          {p.name}: {p.value}{typeof p.value==="number"&&p.value<100?"%":""}
        </p>
      ))}
    </div>
  );
};

export default function AttendanceAnalytics() {
  const [range, setRange] = useState("month");

  return (
    <div className="space-y-5">

      {/* header */}
      <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}
        className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-white text-[20px] font-black tracking-tight">
            Attendance Analytics
          </h2>
          <p className="text-white/35 text-[13px] mt-0.5">
            Deep insights into attendance patterns
          </p>
        </div>
        {/* time range filter */}
        <div className="flex gap-2">
          {["week","month","semester"].map(r=>(
            <button key={r} onClick={()=>setRange(r)}
              className="px-4 py-2 rounded-xl text-[12px] font-semibold
                         transition-all capitalize"
              style={range===r
                ? {background:"rgba(0,245,255,0.15)",color:"#00f5ff",border:"0.5px solid rgba(0,245,255,0.3)"}
                : {background:"rgba(255,255,255,0.04)",color:"rgba(255,255,255,0.4)",border:"0.5px solid rgba(255,255,255,0.07)"}
              }>{r}</button>
          ))}
        </div>
      </motion.div>

      {/* stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s,i)=>(
          <motion.div key={s.label}
            initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
            transition={{delay:i*0.07}}>
            <StatCard {...s}/>
          </motion.div>
        ))}
      </div>

      {/* charts row 1 */}
      <div className="grid lg:grid-cols-3 gap-4">

        {/* trend area chart */}
        <motion.div className="lg:col-span-2"
          initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}}>
          <GlassCard padding="p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-white font-bold text-[14px]">Attendance Trend</h3>
                <p className="text-white/30 text-[12px] mt-0.5">Monthly attendance rate</p>
              </div>
              <TagPill label={`${range.charAt(0).toUpperCase()+range.slice(1)}ly`} color="#00f5ff" size="sm"/>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={TREND}>
                <defs>
                  <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#00f5ff" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#00f5ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                <XAxis dataKey="month" tick={{fill:"rgba(255,255,255,0.3)",fontSize:11}} axisLine={false} tickLine={false}/>
                <YAxis domain={[60,100]} tick={{fill:"rgba(255,255,255,0.3)",fontSize:11}} axisLine={false} tickLine={false}/>
                <Tooltip content={<ChartTooltip/>}/>
                <Area type="monotone" dataKey="rate" stroke="#00f5ff" strokeWidth={2} fill="url(#aGrad)"/>
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>

        {/* pie chart */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.35}}>
          <GlassCard padding="p-5">
            <h3 className="text-white font-bold text-[14px] mb-1">Status Breakdown</h3>
            <p className="text-white/30 text-[12px] mb-4">Today's attendance split</p>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={70}
                  paddingAngle={3} dataKey="value">
                  {PIE_DATA.map((e,i)=><Cell key={i} fill={e.color} fillOpacity={0.85}/>)}
                </Pie>
                <Tooltip content={<ChartTooltip/>}/>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {PIE_DATA.map(d=>(
                <div key={d.name} className="flex items-center justify-between text-[12px]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{background:d.color}}/>
                    <span className="text-white/50">{d.name}</span>
                  </div>
                  <span className="font-bold" style={{color:d.color}}>{d.value}%</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* charts row 2 */}
      <div className="grid lg:grid-cols-2 gap-4">

        {/* course bar chart */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.4}}>
          <GlassCard padding="p-5">
            <h3 className="text-white font-bold text-[14px] mb-1">Course-wise Attendance</h3>
            <p className="text-white/30 text-[12px] mb-5">Rate per course</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={BY_COURSE}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                <XAxis dataKey="course" tick={{fill:"rgba(255,255,255,0.35)",fontSize:11}} axisLine={false} tickLine={false}/>
                <YAxis domain={[60,100]} tick={{fill:"rgba(255,255,255,0.3)",fontSize:11}} axisLine={false} tickLine={false}/>
                <Tooltip content={<ChartTooltip/>}/>
                <Bar dataKey="rate" fill="#a855f7" radius={[4,4,0,0]} fillOpacity={0.8}/>
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>

        {/* weekly heatmap */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.45}}>
          <GlassCard padding="p-5">
            <h3 className="text-white font-bold text-[14px] mb-1">Attendance Heatmap</h3>
            <p className="text-white/30 text-[12px] mb-5">Daily rate by week (%)</p>
            <div className="space-y-2">
              {/* day headers */}
              <div className="flex gap-2 ml-8">
                {HEATMAP_DAYS.map(d=>(
                  <div key={d} className="flex-1 text-center text-[10px]
                                          text-white/30 font-mono">{d}</div>
                ))}
              </div>
              {HEATMAP_DATA.map((week,wi)=>(
                <div key={wi} className="flex items-center gap-2">
                  <span className="text-[10px] text-white/25 font-mono w-6 flex-shrink-0">
                    {HEATMAP_WEEKS[wi]}
                  </span>
                  {week.map((val,di)=>(
                    <motion.div key={di}
                      initial={{opacity:0,scale:0.8}}
                      animate={{opacity:1,scale:1}}
                      transition={{delay:0.5+wi*0.05+di*0.02}}
                      className="flex-1 aspect-square rounded-md flex items-center
                                 justify-center text-[9px] font-mono font-bold"
                      style={{
                        background: val>=90?"rgba(16,185,129,0.4)"
                                  : val>=80?"rgba(0,245,255,0.3)"
                                  : val>=70?"rgba(168,85,247,0.3)"
                                  :         "rgba(239,68,68,0.25)",
                        color: val>=90?"#10b981"
                             : val>=80?"#00f5ff"
                             : val>=70?"#a855f7"
                             :         "#ef4444",
                      }}
                    >{val}</motion.div>
                  ))}
                </div>
              ))}
              {/* legend */}
              <div className="flex items-center gap-3 mt-3 text-[10px] text-white/25">
                {[{c:"#10b981",l:"≥90%"},{c:"#00f5ff",l:"80-89%"},{c:"#a855f7",l:"70-79%"},{c:"#ef4444",l:"<70%"}].map(l=>(
                  <div key={l.l} className="flex items-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{background:l.c+"60"}}/>
                    {l.l}
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
