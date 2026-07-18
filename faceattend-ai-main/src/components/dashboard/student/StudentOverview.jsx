// ─── StudentOverview.jsx ─────────────────────────────────────────────────────
// Student home: overall % ring, subject cards, warning indicators
// Usage: routed at /student/overview

import { motion }    from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  RadialBarChart, RadialBar, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import { Icons }     from "@/components/shared/Icons";
import GlassCard     from "@/components/ui/GlassCard";
import StatCard      from "@/components/ui/StatCard";
import TagPill       from "@/components/ui/TagPill";
import GradientButton from "@/components/ui/GradientButton";
import { ROUTES }    from "@/constants/routes";

const STATS = [
  { value:"88%",  label:"Overall Attendance", change:"Good Standing", changeLabel:"",         color:"#10b981", icon:<Icons.BarChart  className="w-4 h-4"/> },
  { value:"67",   label:"Classes Attended",   change:"of 76",         changeLabel:"total",    color:"#3b82f6", icon:<Icons.UserCheck className="w-4 h-4"/> },
  { value:"6",    label:"Subjects",           change:"Enrolled",      changeLabel:"",         color:"#a855f7", icon:<Icons.Layers    className="w-4 h-4"/> },
  { value:"1",    label:"Warning",            change:"CS-401",        changeLabel:"< 75%",    color:"#f59e0b", icon:<Icons.Warning   className="w-4 h-4"/> },
];

const SUBJECTS = [
  { code:"CS-101", name:"Intro to Programming",    rate:95, present:19, total:20, color:"#10b981" },
  { code:"CS-201", name:"Data Structures",         rate:88, present:21, total:24, color:"#3b82f6" },
  { code:"CS-301", name:"Operating Systems",       rate:83, present:20, total:24, color:"#a855f7" },
  { code:"CS-401", name:"Computer Networks",       rate:67, present:12, total:18, color:"#f59e0b" },
  { code:"CS-501", name:"Machine Learning",        rate:91, present:20, total:22, color:"#00f5ff" },
  { code:"CS-601", name:"Software Engineering",    rate:88, present:14, total:16, color:"#ec4899" },
];

const TREND = [
  {week:"W1",rate:82},{week:"W2",rate:88},{week:"W3",rate:85},
  {week:"W4",rate:91},{week:"W5",rate:88},
];

const radialData = [{ name:"Attendance", value:88, fill:"#3b82f6" }];

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0d0d1a] border border-white/10 rounded-xl px-4 py-3 text-[12px]">
      <p className="text-white/40 font-mono mb-1">{label}</p>
      <p className="text-blue-400 font-bold">{payload[0]?.value}%</p>
    </div>
  );
};

export default function StudentOverview() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">

      {/* welcome */}
      <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
        className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-white text-[22px] font-black tracking-tight">
            Welcome back 👋
          </h2>
          <p className="text-white/35 text-[13px] mt-0.5">
            {new Date().toLocaleDateString("en-US",{ weekday:"long",year:"numeric",month:"long",day:"numeric" })}
          </p>
        </div>
        <GradientButton from="#3b82f6" to="#10b981"
          onClick={() => navigate(ROUTES.STUDENT.HISTORY)}
          className="px-5 py-2.5 rounded-xl text-[13px]">
          <Icons.Activity className="w-4 h-4"/> View History
        </GradientButton>
      </motion.div>

      {/* stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s,i) => (
          <motion.div key={s.label}
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:i*0.07 }}>
            <StatCard {...s}/>
          </motion.div>
        ))}
      </div>

      {/* radial + trend */}
      <div className="grid lg:grid-cols-3 gap-4">

        {/* overall radial */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.3 }}>
          <GlassCard padding="p-5" className="flex flex-col items-center text-center">
            <h3 className="text-white font-bold text-[14px] mb-4 self-start">
              Overall Attendance
            </h3>
            <div className="relative w-40 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart innerRadius="70%" outerRadius="100%"
                  data={radialData} startAngle={90} endAngle={-270}>
                  <RadialBar dataKey="value" cornerRadius={8}
                    background={{ fill:"rgba(255,255,255,0.05)" }}/>
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-4xl font-black text-white">88%</p>
                <p className="text-white/30 text-[11px] font-mono mt-0.5">Attendance</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 w-full text-center text-[12px]">
              <div className="p-2 rounded-xl bg-green-500/10 border border-green-500/20">
                <p className="text-green-400 font-black text-[16px]">67</p>
                <p className="text-white/30">Present</p>
              </div>
              <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-red-400 font-black text-[16px]">9</p>
                <p className="text-white/30">Absent</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* trend chart */}
        <motion.div className="lg:col-span-2"
          initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.35 }}>
          <GlassCard padding="p-5">
            <h3 className="text-white font-bold text-[14px] mb-1">Weekly Trend</h3>
            <p className="text-white/30 text-[12px] mb-5">Your attendance rate over time</p>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={TREND}>
                <defs>
                  <linearGradient id="sGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)"/>
                <XAxis dataKey="week" tick={{fill:"rgba(255,255,255,0.3)",fontSize:11}} axisLine={false} tickLine={false}/>
                <YAxis domain={[60,100]} tick={{fill:"rgba(255,255,255,0.3)",fontSize:11}} axisLine={false} tickLine={false}/>
                <Tooltip content={<ChartTooltip/>}/>
                <Area type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} fill="url(#sGrad)"/>
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>
      </div>

      {/* subject cards */}
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
        transition={{ delay:0.4 }}>
        <GlassCard padding="p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white font-bold text-[14px]">Subject-wise Attendance</h3>
            <button onClick={() => navigate(ROUTES.STUDENT.SUBJECTS)}
              className="text-blue-400 text-[12px] font-mono hover:underline">
              View details →
            </button>
          </div>
          <div className="space-y-3">
            {SUBJECTS.map((sub, i) => (
              <motion.div key={sub.code}
                initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
                transition={{ delay:0.45+i*0.06 }}
                className="flex items-center gap-4 p-4 rounded-xl
                           border border-white/[0.06] bg-white/[0.02]
                           hover:bg-white/[0.04] transition-colors group">
                <TagPill label={sub.code} color={sub.color} size="sm"/>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-[13px] font-medium truncate">{sub.name}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-1.5 rounded-full bg-white/[0.07]">
                      <motion.div className="h-full rounded-full"
                        style={{ background: sub.rate>=75 ? sub.color : "#ef4444" }}
                        initial={{ width:0 }}
                        animate={{ width:`${sub.rate}%` }}
                        transition={{ delay:0.5+i*0.06, duration:0.6 }}/>
                    </div>
                    <span className="text-[11px] font-mono flex-shrink-0"
                      style={{ color: sub.rate>=75 ? sub.color : "#ef4444" }}>
                      {sub.rate}%
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-white/50 text-[12px]">{sub.present}/{sub.total}</p>
                  {sub.rate < 75 && (
                    <div className="flex items-center gap-1 mt-1 justify-end">
                      <Icons.Warning className="w-3 h-3 text-yellow-400"/>
                      <span className="text-yellow-400 text-[10px] font-mono">Warning</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
