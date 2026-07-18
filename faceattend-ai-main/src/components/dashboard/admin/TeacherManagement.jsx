// ─── TeacherManagement.jsx ───────────────────────────────────────────────────
// Teacher list with course assignments, search and add
// Usage: routed at /admin/teachers

import { useState }   from "react";
import { motion }     from "framer-motion";
import { Icons }      from "@/components/shared/Icons";
import GlassCard      from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import TagPill        from "@/components/ui/TagPill";
import StatCard       from "@/components/ui/StatCard";

const TEACHERS = [
  { id: "TCH-001", name: "Dr. Ahmed",   email: "a.raWA@uni.edu",   dept: "CS",   courses: ["CS-301","CS-401"], sessions: 48, avgAtt: 89, status: "active" },
  { id: "TCH-002", name: "Prof. Sara Khan",  email: "s.khan@uni.edu",   dept: "CS",   courses: ["CS-101","CS-201"], sessions: 52, avgAtt: 82, status: "active" },
  { id: "TCH-003", name: "Dr. Bilal Malik",  email: "b.malik@uni.edu",  dept: "IT",   courses: ["CS-501"],          sessions: 30, avgAtt: 91, status: "active" },
  { id: "TCH-004", name: "Ms. Nadia Ahmed",  email: "n.ahmed@uni.edu",  dept: "CS",   courses: ["CS-201","CS-301"], sessions: 40, avgAtt: 77, status: "leave"  },
];

const STATS = [
  { value: "4",   label: "Total Teachers",   change: "+1",   changeLabel: "this sem",  color: "#a855f7", icon: <Icons.Users    className="w-4 h-4" /> },
  { value: "8",   label: "Courses Assigned", change: "Full", changeLabel: "coverage",  color: "#00f5ff", icon: <Icons.Layers   className="w-4 h-4" /> },
  { value: "170", label: "Total Sessions",   change: "38",   changeLabel: "this week", color: "#10b981", icon: <Icons.Camera   className="w-4 h-4" /> },
  { value: "85%", label: "Avg Attendance",   change: "3%",   changeLabel: "vs last",   color: "#f59e0b", icon: <Icons.BarChart className="w-4 h-4" /> },
];

export default function TeacherManagement() {
  const [search, setSearch] = useState("");

  const filtered = TEACHERS.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">

      {/* header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-white text-[20px] font-black tracking-tight">
            Teacher Management
          </h2>
          <p className="text-white/35 text-[13px] mt-0.5">
            {TEACHERS.length} teachers registered
          </p>
        </div>
        <GradientButton from="#a855f7" to="#3b82f6" className="px-5 py-2.5 rounded-xl text-[13px]">
          <Icons.UserPlus className="w-4 h-4" />
          Add Teacher
        </GradientButton>
      </motion.div>

      {/* stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ delay: i * 0.07 }}
          >
            <StatCard {...s} />
          </motion.div>
        ))}
      </div>

      {/* search */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <GlassCard padding="p-4">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                          bg-white/[0.04] border border-white/[0.07] max-w-sm
                          focus-within:border-purple-500/40 transition-all">
            <Icons.Search className="w-4 h-4 text-white/25 flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search teachers..."
              className="flex-1 bg-transparent text-white/70 text-[13px]
                         placeholder-white/20 outline-none"
            />
          </div>
        </GlassCard>
      </motion.div>

      {/* teacher cards grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((teacher, i) => (
          <motion.div
            key={teacher.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ delay: 0.25 + i * 0.08 }}
          >
            <GlassCard padding="p-5" hoverLift hoverGlow glowColor="#a855f7">
              <div className="flex items-start justify-between mb-4">
                {/* avatar + info */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center
                               justify-center text-[14px] font-black flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg,#a855f730,#3b82f630)",
                      color: "#a855f7",
                    }}
                  >
                    {teacher.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-bold text-[14px]">{teacher.name}</p>
                    <p className="text-white/35 text-[12px]">{teacher.email}</p>
                  </div>
                </div>

                {/* status */}
                <span
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize"
                  style={
                    teacher.status === "active"
                      ? { background: "#10b98115", color: "#10b981" }
                      : { background: "#f59e0b15", color: "#f59e0b" }
                  }
                >
                  {teacher.status}
                </span>
              </div>

              {/* courses */}
              <div className="flex flex-wrap gap-2 mb-4">
                {teacher.courses.map((c) => (
                  <TagPill key={c} label={c} color="#a855f7" size="sm" />
                ))}
                <TagPill label={teacher.dept} color="#3b82f6" size="sm" />
              </div>

              {/* stats row */}
              <div className="flex items-center gap-4 pt-4
                              border-t border-white/[0.06] text-[12px]">
                <div>
                  <p className="text-white/30">Sessions</p>
                  <p className="text-white font-bold">{teacher.sessions}</p>
                </div>
                <div>
                  <p className="text-white/30">Avg Attendance</p>
                  <p className="text-white font-bold">{teacher.avgAtt}%</p>
                </div>
                <div>
                  <p className="text-white/30">ID</p>
                  <p className="text-white/50 font-mono text-[11px]">{teacher.id}</p>
                </div>

                {/* actions */}
                <div className="ml-auto flex items-center gap-1.5">
                  <button className="p-1.5 rounded-lg text-white/30
                                     hover:text-white hover:bg-white/[0.06] transition-all">
                    <Icons.Edit className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded-lg text-white/30
                                     hover:text-red-400 hover:bg-red-400/10 transition-all">
                    <Icons.Trash className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
