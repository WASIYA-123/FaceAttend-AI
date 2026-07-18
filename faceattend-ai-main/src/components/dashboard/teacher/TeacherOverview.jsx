// ─── TeacherOverview.jsx ─────────────────────────────────────────────────────
// Teacher home: stat cards, today's classes, recent sessions
// Usage: routed at /teacher/overview

import { motion }     from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Icons }      from "@/components/shared/Icons";
import StatCard       from "@/components/ui/StatCard";
import GlassCard      from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import LiveBadge      from "@/components/ui/LiveBadge";
import TagPill        from "@/components/ui/TagPill";
import { ROUTES }     from "@/constants/routes";

const STATS = [
  { value: "4",   label: "My Courses",      change: "Active",   changeLabel: "",           color: "#a855f7", icon: <Icons.Layers   className="w-4 h-4" /> },
  { value: "156", label: "Total Sessions",  change: "38",       changeLabel: "this week",  color: "#00f5ff", icon: <Icons.Camera   className="w-4 h-4" /> },
  { value: "91%", label: "Avg Attendance",  change: "1.5%",     changeLabel: "vs last wk", color: "#10b981", icon: <Icons.BarChart className="w-4 h-4" /> },
  { value: "89",  label: "Present Today",   change: "6",        changeLabel: "absent",     color: "#f59e0b", icon: <Icons.Users    className="w-4 h-4" /> },
];

const TREND = [
  { day: "Mon", rate: 88 }, { day: "Tue", rate: 92 },
  { day: "Wed", rate: 85 }, { day: "Thu", rate: 95 },
  { day: "Fri", rate: 90 }, { day: "Sat", rate: 78 },
  { day: "Sun", rate: 82 },
];

const TODAY_CLASSES = [
  { course: "CS-301", name: "Operating Systems",  time: "9:00 AM",  room: "CS-301", students: 32, status: "completed" },
  { course: "CS-401", name: "Computer Networks",  time: "2:00 PM",  room: "CS-401", students: 28, status: "upcoming"  },
];

const RECENT_SESSIONS = [
  { course: "CS-301", date: "Today 9:00 AM",     present: 30, absent: 2,  rate: 94 },
  { course: "CS-201", date: "Yesterday 11:00 AM", present: 34, absent: 4,  rate: 89 },
  { course: "CS-401", date: "Mon 2:00 PM",        present: 25, absent: 3,  rate: 89 },
  { course: "CS-301", date: "Mon 9:00 AM",        present: 28, absent: 4,  rate: 88 },
];

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0d0d1a] border border-white/10 rounded-xl px-4 py-3 text-[12px]">
      <p className="text-white/40 mb-1 font-mono">{label}</p>
      <p className="text-purple-400 font-bold">{payload[0]?.value}%</p>
    </div>
  );
};

export default function TeacherOverview() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">

      {/* welcome */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-white text-[22px] font-black tracking-tight">
            Good morning, Dr. 👋
          </h2>
          <p className="text-white/35 text-[13px] mt-0.5">
            {new Date().toLocaleDateString("en-US", { weekday:"long", year:"numeric", month:"long", day:"numeric" })}
          </p>
        </div>
        <GradientButton from="#a855f7" to="#3b82f6"
          onClick={() => navigate(ROUTES.TEACHER.START)}
          className="px-5 py-2.5 rounded-xl text-[13px]">
          <Icons.Camera className="w-4 h-4" />
          Start Attendance
        </GradientButton>
      </motion.div>

      {/* stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}>
            <StatCard {...s} />
          </motion.div>
        ))}
      </div>

      {/* today's classes + chart */}
      <div className="grid lg:grid-cols-2 gap-4">

        {/* today's classes */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}>
          <GlassCard padding="p-5">
            <h3 className="text-white font-bold text-[14px] mb-4">Today's Classes</h3>
            <div className="space-y-3">
              {TODAY_CLASSES.map((cls, i) => (
                <div key={i}
                  className="flex items-center gap-4 p-4 rounded-xl
                             border border-white/[0.06] bg-white/[0.02]">
                  {/* color dot */}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center
                                  text-[13px] font-black flex-shrink-0"
                    style={{ background: "rgba(168,85,247,0.15)", color: "#a855f7" }}>
                    {cls.course.split("-")[1]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-[13px] truncate">{cls.name}</p>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-white/35">
                      <span className="flex items-center gap-1">
                        <Icons.Clock    className="w-3 h-3" /> {cls.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icons.Users    className="w-3 h-3" /> {cls.students}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icons.Globe    className="w-3 h-3" /> {cls.room}
                      </span>
                    </div>
                  </div>
                  {cls.status === "upcoming" ? (
                    <GradientButton from="#a855f7" to="#3b82f6"
                      onClick={() => navigate(ROUTES.TEACHER.START)}
                      className="px-3 py-1.5 rounded-lg text-[11px] flex-shrink-0">
                      Start
                    </GradientButton>
                  ) : (
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0
                                     bg-green-500/15 text-green-400">
                      Done
                    </span>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* trend chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}>
          <GlassCard padding="p-5">
            <h3 className="text-white font-bold text-[14px] mb-1">Weekly Trend</h3>
            <p className="text-white/30 text-[12px] mb-5">Attendance rate this week</p>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={TREND}>
                <defs>
                  <linearGradient id="tGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#a855f7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="day" tick={{ fill:"rgba(255,255,255,0.3)",fontSize:11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[70,100]} tick={{ fill:"rgba(255,255,255,0.3)",fontSize:11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="rate" stroke="#a855f7" strokeWidth={2} fill="url(#tGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>
      </div>

      {/* recent sessions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}>
        <GlassCard padding="p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white font-bold text-[14px]">Recent Sessions</h3>
            <button onClick={() => navigate(ROUTES.TEACHER.HISTORY)}
              className="text-purple-400 text-[12px] font-mono hover:underline">
              View all →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["Course","Date & Time","Present","Absent","Rate"].map(h => (
                    <th key={h} className="text-left text-white/30 font-mono text-[11px]
                                           uppercase tracking-wider pb-3 pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_SESSIONS.map((s, i) => (
                  <motion.tr key={i}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 + i * 0.05 }}
                    className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                    <td className="py-3 pr-4">
                      <TagPill label={s.course} color="#a855f7" size="sm" />
                    </td>
                    <td className="py-3 pr-4 text-white/50 font-mono text-[11px]">{s.date}</td>
                    <td className="py-3 pr-4 text-green-400 font-bold">{s.present}</td>
                    <td className="py-3 pr-4 text-red-400/70">{s.absent}</td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 rounded-full bg-white/[0.07]">
                          <div className="h-full rounded-full bg-purple-500"
                            style={{ width: `${s.rate}%` }} />
                        </div>
                        <span className="text-purple-400 font-mono text-[11px]">{s.rate}%</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
