// ─── DashboardPreview.jsx ────────────────────────────────────────────────────
// Interactive tab switcher showing Admin / Teacher / Student dashboard mocks
// Usage: <DashboardPreview />

import { useState }   from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons }       from "@/components/shared/Icons";
import GlowOrb         from "@/components/ui/GlowOrb";
import GridBg          from "@/components/ui/GridBg";
import AnimatedDot     from "@/components/ui/AnimatedDot";
import LiveBadge       from "@/components/ui/LiveBadge";
import SectionBadge    from "@/components/ui/SectionBadge";
import SectionHeader   from "@/components/ui/SectionHeader";
import SectionWrapper  from "@/components/ui/SectionWrapper";

// ── tab config ────────────────────────────────────────────────────────────────
const TABS = [
  { id: "admin",   label: "Admin",   color: "#00f5ff" },
  { id: "teacher", label: "Teacher", color: "#a855f7" },
  { id: "student", label: "Student", color: "#3b82f6" },
];

// ── dashboard data per role ───────────────────────────────────────────────────
const DASHBOARD_DATA = {
  admin: {
    title: "Admin Overview",
    url:   "faceattend.ai/admin",
    stats: [
      { label: "Total Students",   value: "1,247", change: "+12%",   color: "#00f5ff" },
      { label: "Active Courses",   value: "38",    change: "+3",     color: "#a855f7" },
      { label: "Today's Sessions", value: "24",    change: "Live",   color: "#10b981" },
      { label: "Avg Attendance",   value: "87.4%", change: "+2.1%",  color: "#f59e0b" },
    ],
    chart: [72, 85, 91, 78, 95, 88, 93],
    activity: [
      { name: "Ali Hassan",   action: "Marked Present",  time: "2m ago",  status: "present" },
      { name: "Sara Ahmed",   action: "Marked Absent",   time: "5m ago",  status: "absent"  },
      { name: "Usman Malik",  action: "Marked Present",  time: "8m ago",  status: "present" },
      { name: "Nadia Khan",   action: "Late Entry",      time: "12m ago", status: "late"    },
    ],
  },
  teacher: {
    title: "Teacher Dashboard",
    url:   "faceattend.ai/teacher",
    stats: [
      { label: "My Courses",      value: "4",    change: "Active",    color: "#a855f7" },
      { label: "Present Today",   value: "89",   change: "Students",  color: "#10b981" },
      { label: "Avg Attendance",  value: "91%",  change: "+1.5%",     color: "#00f5ff" },
      { label: "Sessions Run",    value: "156",  change: "This Sem",  color: "#f59e0b" },
    ],
    chart: [80, 88, 76, 92, 85, 90, 87],
    activity: [
      { name: "CS-301",    action: "Session Started",   time: "Now",     status: "present" },
      { name: "CS-401",    action: "Report Generated",  time: "1h ago",  status: "present" },
      { name: "CS-201",    action: "Session Ended",     time: "3h ago",  status: "absent"  },
      { name: "CS-101",    action: "Manual Override",   time: "1d ago",  status: "late"    },
    ],
  },
  student: {
    title: "Student Portal",
    url:   "faceattend.ai/student",
    stats: [
      { label: "Overall Attendance", value: "88%", change: "Good",      color: "#10b981" },
      { label: "Classes Attended",   value: "67",  change: "of 76",     color: "#00f5ff" },
      { label: "Subjects",           value: "6",   change: "Enrolled",  color: "#a855f7" },
      { label: "Warnings",           value: "1",   change: "Subject",   color: "#f59e0b" },
    ],
    chart: [90, 85, 100, 75, 90, 85, 95],
    activity: [
      { name: "Data Structures",   action: "Present",         time: "Today",   status: "present" },
      { name: "OS Concepts",       action: "Present",         time: "Today",   status: "present" },
      { name: "Networking",        action: "Absent",          time: "Tuesday", status: "absent"  },
      { name: "Database Systems",  action: "Present",         time: "Monday",  status: "present" },
    ],
  },
};

// ── status dot ────────────────────────────────────────────────────────────────
const StatusDot = ({ status }) => {
  const colors = { present: "#10b981", absent: "#ef4444", late: "#f59e0b" };
  return (
    <div
      className="w-2 h-2 rounded-full flex-shrink-0"
      style={{ background: colors[status] || "#6b7280" }}
    />
  );
};

// ── mini bar chart ────────────────────────────────────────────────────────────
const MiniChart = ({ data, color }) => (
  <div className="flex items-end gap-1.5 h-16">
    {data.map((val, i) => (
      <motion.div
        key={i}
        className="flex-1 rounded-t-sm"
        style={{
          background: `linear-gradient(to top, ${color}70, ${color}20)`,
        }}
        initial={{ height: 0 }}
        animate={{ height: `${val}%` }}
        transition={{ delay: i * 0.04, duration: 0.4, ease: "easeOut" }}
      />
    ))}
  </div>
);

// ── dashboard mock UI ─────────────────────────────────────────────────────────
const DashboardMock = ({ data, color, tabId }) => (
  <motion.div
    key={tabId}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{    opacity: 0, y: -16 }}
    transition={{ duration: 0.28 }}
    className="rounded-2xl border border-white/[0.08] overflow-hidden"
    style={{ background: "rgba(10,10,20,0.85)", backdropFilter: "blur(20px)" }}
  >
    {/* ── fake browser bar ──────────────────────────────────────────── */}
    <div className="flex items-center gap-2 px-5 py-3.5
                    border-b border-white/[0.06] bg-white/[0.02]">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"    />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60"  />
      </div>
      <div className="flex-1 mx-4 bg-white/[0.05] rounded-lg
                      px-4 py-1.5 text-[11px] text-white/30 font-mono">
        {data.url}
      </div>
      <LiveBadge />
    </div>

    <div className="p-6">
      {/* ── dashboard header ────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-bold text-[16px]">{data.title}</h3>
          <p className="text-white/30 text-[12px] mt-0.5 font-mono">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long", month: "long", day: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[12px] text-white/30">
          <Icons.Bell className="w-4 h-4" />
          <Icons.Settings className="w-4 h-4" />
        </div>
      </div>

      {/* ── stat cards ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {data.stats.map((stat, i) => (
          <motion.div
            key={`${tabId}-${i}`}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1  }}
            transition={{ delay: i * 0.06 }}
            className="p-4 rounded-xl border border-white/[0.06]
                       bg-white/[0.02]"
          >
            <div className="text-[22px] font-black text-white mb-1">
              {stat.value}
            </div>
            <div className="text-[11px] text-white/35 mb-2">{stat.label}</div>
            <div
              className="text-[11px] font-semibold font-mono"
              style={{ color: stat.color }}
            >
              ↑ {stat.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── bottom row: chart + activity ────────────────────────────── */}
      <div className="grid lg:grid-cols-2 gap-4">

        {/* chart */}
        <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white text-[12px] font-semibold">
              Attendance Trend
            </span>
            <span className="text-white/25 text-[11px] font-mono">
              Last 7 days
            </span>
          </div>
          <MiniChart data={data.chart} color={color} />
          <div className="flex justify-between mt-2">
            {["M","T","W","T","F","S","S"].map((d, i) => (
              <span key={i}
                className="flex-1 text-center text-[9px] text-white/25 font-mono">
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* recent activity */}
        <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white text-[12px] font-semibold">
              Recent Activity
            </span>
            <span
              className="text-[10px] font-mono cursor-pointer"
              style={{ color }}
            >
              View all →
            </span>
          </div>
          <div className="space-y-2.5">
            {data.activity.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="flex items-center gap-3"
              >
                <StatusDot status={item.status} />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-[12px] font-medium truncate">
                    {item.name}
                  </p>
                  <p className="text-white/30 text-[10px]">{item.action}</p>
                </div>
                <span className="text-white/20 text-[10px] font-mono flex-shrink-0">
                  {item.time}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// ── DashboardPreview ──────────────────────────────────────────────────────────
export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("admin");

  const tab  = TABS.find((t) => t.id === activeTab);
  const data = DASHBOARD_DATA[activeTab];

  return (
    <SectionWrapper id="dashboard" bg="dark">
      <GridBg />
      <GlowOrb color="#00f5ff" size="400px" top="20%" left="50%" opacity={0.05} />

      {/* header */}
      <SectionHeader
        badge={
          <SectionBadge
            icon={<Icons.BarChart className="w-[13px] h-[13px]" />}
            label="Dashboard Preview"
            color="#10b981"
          />
        }
        title="Three powerful"
        gradientText="dashboards"
        gradientColors={["#10b981", "#00f5ff"]}
        subtitle="Role-specific interfaces built for maximum clarity and efficiency."
      />

      {/* tab switcher */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex justify-center gap-2 mb-8"
      >
        {TABS.map((t) => (
          <motion.button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-2.5 rounded-xl text-[13px] font-semibold
                       transition-all duration-200"
            style={
              activeTab === t.id
                ? {
                    background: `linear-gradient(135deg,${t.color},${t.color}aa)`,
                    color: "#000",
                  }
                : {
                    background: "rgba(255,255,255,0.04)",
                    color: "rgba(255,255,255,0.45)",
                    border: "0.5px solid rgba(255,255,255,0.08)",
                  }
            }
          >
            {t.label}
          </motion.button>
        ))}
      </motion.div>

      {/* dashboard mock */}
      <AnimatePresence mode="wait">
        <DashboardMock
          key={activeTab}
          data={data}
          color={tab.color}
          tabId={activeTab}
        />
      </AnimatePresence>

      {/* bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center text-white/20 text-[12px] font-mono mt-6"
      >
        Interactive preview — full dashboards available after login
      </motion.p>
    </SectionWrapper>
  );
}
