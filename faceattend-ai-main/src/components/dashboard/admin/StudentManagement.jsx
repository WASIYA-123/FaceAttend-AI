// ─── StudentManagement.jsx ───────────────────────────────────────────────────
// Full CRUD student table: search, filter, add, edit, delete
// Usage: routed at /admin/students

import { useState }   from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons }      from "@/components/shared/Icons";
import GlassCard      from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import TagPill        from "@/components/ui/TagPill";

// ── mock data ─────────────────────────────────────────────────────────────────
const INITIAL_STUDENTS = [
  { id: "CS-2021-001", name: "Ali Hassan",    email: "ali@uni.edu",    course: "CS-301", attendance: 92, status: "active",    face: true  },
  { id: "CS-2021-002", name: "Sara Ahmed",    email: "sara@uni.edu",   course: "CS-201", attendance: 78, status: "active",    face: true  },
  { id: "CS-2021-003", name: "Usman Malik",   email: "usman@uni.edu",  course: "CS-401", attendance: 85, status: "active",    face: false },
  { id: "CS-2021-004", name: "Nadia Khan",    email: "nadia@uni.edu",  course: "CS-101", attendance: 61, status: "warning",   face: true  },
  { id: "CS-2021-005", name: "Bilal Ahmed",   email: "bilal@uni.edu",  course: "CS-501", attendance: 95, status: "active",    face: true  },
  { id: "CS-2021-006", name: "Ayesha Tariq",  email: "ayesha@uni.edu", course: "CS-301", attendance: 55, status: "warning",   face: false },
  { id: "CS-2021-007", name: "Hamza Rauf",    email: "Hamza@uni.edu",  course: "CS-201", attendance: 88, status: "active",    face: true  },
  { id: "CS-2021-008", name: "WAra Malik",    email: "WAra@uni.edu",   course: "CS-401", attendance: 40, status: "suspended", face: false },
];

const STATUS_CONFIG = {
  active:    { color: "#10b981", label: "Active"    },
  warning:   { color: "#f59e0b", label: "Warning"   },
  suspended: { color: "#ef4444", label: "Suspended" },
};

export default function StudentManagement() {
  const [students,   setStudents]   = useState(INITIAL_STUDENTS);
  const [search,     setSearch]     = useState("");
  const [filter,     setFilter]     = useState("all");
  const [selected,   setSelected]   = useState([]);
  const [deleteId,   setDeleteId]   = useState(null);

  // ── filtered list ──────────────────────────────────────────────────────────
  const filtered = students.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || s.status === filter;
    return matchSearch && matchFilter;
  });

  // ── select all ─────────────────────────────────────────────────────────────
  const toggleAll = () =>
    setSelected(selected.length === filtered.length ? [] : filtered.map((s) => s.id));

  // ── delete ─────────────────────────────────────────────────────────────────
  const confirmDelete = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="space-y-5">

      {/* ── header ────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0   }}
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-white text-[20px] font-black tracking-tight">
            Student Management
          </h2>
          <p className="text-white/35 text-[13px] mt-0.5">
            {students.length} students registered
          </p>
        </div>
        <GradientButton from="#00f5ff" to="#a855f7" className="px-5 py-2.5 rounded-xl text-[13px]">
          <Icons.UserPlus className="w-4 h-4" />
          Add Student
        </GradientButton>
      </motion.div>

      {/* ── search + filter bar ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard padding="p-4">
          <div className="flex flex-wrap gap-3 items-center">
            {/* search */}
            <div className="flex items-center gap-2 flex-1 min-w-[200px]
                            px-4 py-2.5 rounded-xl
                            bg-white/[0.04] border border-white/[0.07]
                            focus-within:border-cyan-500/40 transition-all">
              <Icons.Search className="w-4 h-4 text-white/25 flex-shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, ID or email..."
                className="flex-1 bg-transparent text-white/70 text-[13px]
                           placeholder-white/20 outline-none"
              />
            </div>

            {/* filters */}
            <div className="flex gap-2">
              {["all","active","warning","suspended"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-4 py-2 rounded-xl text-[12px] font-semibold
                             transition-all capitalize"
                  style={
                    filter === f
                      ? { background: "rgba(0,245,255,0.15)", color: "#00f5ff",
                          border: "0.5px solid rgba(0,245,255,0.3)" }
                      : { background: "rgba(255,255,255,0.04)",
                          color: "rgba(255,255,255,0.4)",
                          border: "0.5px solid rgba(255,255,255,0.07)" }
                  }
                >
                  {f}
                </button>
              ))}
            </div>

            {/* bulk delete */}
            {selected.length > 0 && (
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl
                                 text-[12px] font-semibold text-red-400
                                 bg-red-400/10 border border-red-400/20
                                 hover:bg-red-400/20 transition-all">
                <Icons.Trash className="w-4 h-4" />
                Delete ({selected.length})
              </button>
            )}
          </div>
        </GlassCard>
      </motion.div>

      {/* ── table ─────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0  }}
        transition={{ delay: 0.15 }}
      >
        <GlassCard padding="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-white/[0.07]">
                  <th className="p-4 w-10">
                    <input
                      type="checkbox"
                      checked={selected.length === filtered.length && filtered.length > 0}
                      onChange={toggleAll}
                      className="accent-cyan-400"
                    />
                  </th>
                  {["Student","ID","Course","Attendance","Face","Status","Actions"].map((h) => (
                    <th key={h}
                      className="text-left text-white/30 font-mono text-[11px]
                                 uppercase tracking-wider py-4 pr-4 last:pr-4">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filtered.map((student, i) => {
                    const sc = STATUS_CONFIG[student.status];
                    const isSelected = selected.includes(student.id);
                    return (
                      <motion.tr
                        key={student.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0   }}
                        exit={{    opacity: 0, x: 10  }}
                        transition={{ delay: i * 0.04 }}
                        className={`border-b border-white/[0.04]
                          hover:bg-white/[0.02] transition-colors
                          ${isSelected ? "bg-cyan-500/[0.04]" : ""}`}
                      >
                        {/* checkbox */}
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() =>
                              setSelected((prev) =>
                                prev.includes(student.id)
                                  ? prev.filter((id) => id !== student.id)
                                  : [...prev, student.id]
                              )
                            }
                            className="accent-cyan-400"
                          />
                        </td>

                        {/* name + email */}
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center
                                         justify-center text-[11px] font-black
                                         flex-shrink-0"
                              style={{
                                background: "linear-gradient(135deg,#00f5ff30,#a855f730)",
                                color: "#00f5ff",
                              }}
                            >
                              {student.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-white font-semibold">
                                {student.name}
                              </p>
                              <p className="text-white/30 text-[11px]">
                                {student.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* ID */}
                        <td className="py-4 pr-4">
                          <span className="font-mono text-[11px] text-white/40
                                           bg-white/[0.05] px-2 py-1 rounded-lg">
                            {student.id}
                          </span>
                        </td>

                        {/* course */}
                        <td className="py-4 pr-4">
                          <TagPill label={student.course} color="#a855f7" size="sm" />
                        </td>

                        {/* attendance */}
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full bg-white/[0.08]">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${student.attendance}%`,
                                  background:
                                    student.attendance >= 75
                                      ? "#10b981"
                                      : student.attendance >= 60
                                      ? "#f59e0b"
                                      : "#ef4444",
                                }}
                              />
                            </div>
                            <span className="text-white/60 text-[11px] font-mono">
                              {student.attendance}%
                            </span>
                          </div>
                        </td>

                        {/* face registered */}
                        <td className="py-4 pr-4">
                          {student.face
                            ? <Icons.Check   className="w-4 h-4 text-green-400" />
                            : <Icons.X       className="w-4 h-4 text-red-400/60" />
                          }
                        </td>

                        {/* status */}
                        <td className="py-4 pr-4">
                          <span
                            className="px-2.5 py-1 rounded-full text-[11px]
                                       font-semibold"
                            style={{
                              background: `${sc.color}15`,
                              color:       sc.color,
                            }}
                          >
                            {sc.label}
                          </span>
                        </td>

                        {/* actions */}
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-1.5">
                            <button
                              className="p-1.5 rounded-lg text-white/30
                                         hover:text-white hover:bg-white/[0.06]
                                         transition-all"
                              aria-label="Edit student"
                            >
                              <Icons.Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteId(student.id)}
                              className="p-1.5 rounded-lg text-white/30
                                         hover:text-red-400 hover:bg-red-400/10
                                         transition-all"
                              aria-label="Delete student"
                            >
                              <Icons.Trash className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <Icons.Users className="w-8 h-8 text-white/15 mx-auto mb-3" />
                <p className="text-white/25 text-[13px]">No students found</p>
              </div>
            )}
          </div>
        </GlassCard>
      </motion.div>

      {/* ── delete confirm modal ──────────────────────────────────────── */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{    opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center
                       bg-black/60 backdrop-blur-sm px-4"
            onClick={() => setDeleteId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1,   opacity: 1 }}
              exit={{    scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm p-6 rounded-2xl
                         border border-white/[0.09] bg-[#0d0d1a]"
            >
              <div className="w-12 h-12 rounded-xl bg-red-400/10
                              flex items-center justify-center mb-4 mx-auto">
                <Icons.Trash className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-white font-bold text-[16px] text-center mb-2">
                Delete Student?
              </h3>
              <p className="text-white/40 text-[13px] text-center mb-6">
                This action cannot be undone. All attendance records will be removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold
                             text-white/60 border border-white/10
                             hover:bg-white/[0.05] transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => confirmDelete(deleteId)}
                  className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold
                             text-white bg-red-500/80
                             hover:bg-red-500 transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
