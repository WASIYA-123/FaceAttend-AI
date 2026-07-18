// ─── AdminOverview.jsx ───────────────────────────────────────────────────────
// Admin dashboard home: stat cards + attendance chart + recent activity
// Usage: routed at /admin/overview

import { motion }      from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar,
} from "recharts";
import { Icons }       from "@/components/shared/Icons";
import StatCard        from "@/components/ui/StatCard";
import GlassCard       from "@/components/ui/GlassCard";
import LiveBadge       from "@/components/ui/LiveBadge";
import AnimatedDot     from "@/components/ui/AnimatedDot";

// ── mock data ─────────────────────────────────────────────────────────────────
const STATS = [
  { value: "1,247", label: "Total Students",   change: "12%",  changeLabel: "this month", color: "#00f5ff", icon: <Icons.Users    className="w-4 h-4" /> },
  { value: "38",    label: "Active Courses",   change: "3",    changeLabel: "new",         color: "#a855f7", icon: <Icons.Layers   className="w-4 h-4" /> },
  { value: "24",    label: "Live Sessions",    change: "8",    changeLabel: "vs yesterday",color: "#10b981", icon: <Icons.Camera   className="w-4 h-4" /> },
  { value: "87.4%", label: "Avg Attendance",   change: "2.1%", changeLabel: "this week",  color: "#f59e0b", icon: <Icons.BarChart className="w-4 h-4" /> },
];

const AREA_DATA = [
  { day: "Mon", attendance: 82, sessions: 18 },
  { day: "Tue", attendance: 88, sessions: 22 },
  { day: "Wed", attendance: 75, sessions: 20 },
  { day: "Thu", attendance: 91, sessions: 24 },
  { day: "Fri", attendance: 85, sessions: 21 },
  { day: "Sat", attendance: 70, sessions: 12 },
  { day: "Sun", attendance: 65, sessions: 8  },
];

const BAR_DATA = [
  { course: "CS-101", rate: 92 },
  { course: "CS-201", rate: 85 },
  { course: "CS-301", rate: 78 },
  { course: "CS-401", rate: 88 },
  { course: "CS-501", rate: 95 },
];

const ACTIVITY = [
  { name: "Ali Hassan",    action: "Marked Present",      course: "CS-301", time: "2m ago",  status: "present" },
  { name: "Sara Ahmed",    action: "Marked Absent",       course: "CS-201", time: "5m ago",  status: "absent"  },
  { name: "Usman Malik",   action: "Marked Present",      course: "CS-401", time: "8m ago",  status: "present" },
  { name: "Nadia Khan",    action: "Late Entry Recorded", course: "CS-101", time: "12m ago", status: "late"    },
  { name: "Bilal Ahmed",   action: "Marked Present",      course: "CS-501", time: "15m ago", status: "present" },
  { name: "Ayesha Tariq",  action: "Marked Absent",       course: "CS-301", time: "20m ago", status: "absent"  },
];

const STATUS_COLORS = { present: "#10b981", absent: "#ef4444", late: "#f59e0b" };

// ── custom tooltip ─────────────────────────────────────────────────────────────
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0d0d1a] border border-white/10 rounded-xl
                    px-4 py-3 text-[12px] shadow-xl">
      <p className="text-white/50 mb-2 font-mono">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="font-semibold">
          {p.name}: {p.value}{p.name === "attendance" ? "%" : ""}
        </p>
      ))}
    </div>
  );
};

export default function AdminOverview() {
  return (
    <div className="space-y-6">

      {/* ── welcome strip ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0   }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-white text-[22px] font-black tracking-tight">
            Good morning, Admin 👋
          </h2>
          <p className="text-white/35 text-[13px] mt-0.5">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long", year: "numeric",
              month: "long", day: "numeric",
            })}
          </p>
        </div>
        <LiveBadge label="24 Live Sessions" />
      </motion.div>

      {/* ── stat cards ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ delay: i * 0.07 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* ── charts row ────────────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-4">

        {/* area chart — 2/3 width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <GlassCard padding="p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-white font-bold text-[14px]">
                  Weekly Attendance Trend
                </h3>
                <p className="text-white/30 text-[12px] mt-0.5">
                  Attendance % + sessions per day
                </p>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  Attendance
                </span>
                <span className="flex items-center gap-1.5 text-purple-400">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  Sessions
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={AREA_DATA}>
                <defs>
                  <linearGradient id="gCyan" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#00f5ff" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#00f5ff" stopOpacity={0}    />
                  </linearGradient>
                  <linearGradient id="gPurple" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#a855f7" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="attendance" stroke="#00f5ff" strokeWidth={2} fill="url(#gCyan)"   />
                <Area type="monotone" dataKey="sessions"   stroke="#a855f7" strokeWidth={2} fill="url(#gPurple)" />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>

        {/* bar chart — 1/3 width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ delay: 0.35 }}
        >
          <GlassCard padding="p-5">
            <h3 className="text-white font-bold text-[14px] mb-1">
              Course Attendance
            </h3>
            <p className="text-white/30 text-[12px] mb-5">
              Rate by course this week
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={BAR_DATA} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <XAxis type="number" domain={[0,100]} tick={{ fill:"rgba(255,255,255,0.3)",fontSize:11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="course" tick={{ fill:"rgba(255,255,255,0.4)",fontSize:11 }} axisLine={false} tickLine={false} width={52} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="rate" fill="#00f5ff" radius={[0,4,4,0]} fillOpacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>
      </div>

      {/* ── recent activity table ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ delay: 0.4 }}
      >
        <GlassCard padding="p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white font-bold text-[14px]">
              Recent Attendance Activity
            </h3>
            <button className="text-cyan-400 text-[12px] font-mono
                               hover:underline transition-all">
              View all →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["Student","Action","Course","Time","Status"].map((h) => (
                    <th key={h}
                      className="text-left text-white/30 font-mono text-[11px]
                                 uppercase tracking-wider pb-3 pr-4 last:pr-0">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ACTIVITY.map((row, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0   }}
                    transition={{ delay: 0.45 + i * 0.05 }}
                    className="border-b border-white/[0.04]
                               hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3 pr-4 text-white font-medium">
                      {row.name}
                    </td>
                    <td className="py-3 pr-4 text-white/50">{row.action}</td>
                    <td className="py-3 pr-4">
                      <span className="px-2 py-0.5 rounded-lg text-[11px]
                                       font-mono bg-white/[0.06] text-white/50">
                        {row.course}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-white/30 font-mono text-[11px]">
                      {row.time}
                    </td>
                    <td className="py-3">
                      <span
                        className="flex items-center gap-1.5 text-[11px] font-semibold w-fit
                                   px-2.5 py-1 rounded-full"
                        style={{
                          background: `${STATUS_COLORS[row.status]}15`,
                          color:       STATUS_COLORS[row.status],
                        }}
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: STATUS_COLORS[row.status] }}
                        />
                        {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                      </span>
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
