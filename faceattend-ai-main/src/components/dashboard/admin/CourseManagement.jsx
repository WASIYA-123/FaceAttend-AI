// ─── CourseManagement.jsx ────────────────────────────────────────────────────
// Course list with schedule, teacher assignment, enrollment count
// Usage: routed at /admin/courses

import { useState }   from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons }      from "@/components/shared/Icons";
import GlassCard      from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import TagPill        from "@/components/ui/TagPill";

const COURSES = [
  { id: "CS-101", name: "Introduction to Programming", teacher: "Prof. Sara Khan",  students: 45, schedule: "Mon/Wed 9:00 AM",  room: "CS-101", color: "#00f5ff", attendance: 88, status: "active"   },
  { id: "CS-201", name: "Data Structures & Algorithms",teacher: "Prof. Sara Khan",  students: 38, schedule: "Tue/Thu 11:00 AM", room: "CS-201", color: "#a855f7", attendance: 82, status: "active"   },
  { id: "CS-301", name: "Operating Systems",           teacher: "Dr. Ahmed",   students: 32, schedule: "Mon/Wed 2:00 PM",  room: "CS-301", color: "#3b82f6", attendance: 91, status: "active"   },
  { id: "CS-401", name: "Computer Networks",           teacher: "Dr. Ahmed",   students: 28, schedule: "Fri 10:00 AM",     room: "CS-401", color: "#10b981", attendance: 78, status: "active"   },
  { id: "CS-501", name: "Machine Learning",            teacher: "Dr. Bilal Malik",  students: 22, schedule: "Tue/Thu 3:00 PM",  room: "CS-501", color: "#f59e0b", attendance: 95, status: "active"   },
  { id: "CS-601", name: "Cloud Computing",             teacher: "TBA",              students: 0,  schedule: "TBA",              room: "TBA",    color: "#ec4899", attendance: 0,  status: "upcoming" },
];

export default function CourseManagement() {
  const [search,    setSearch]    = useState("");
  const [showModal, setShowModal] = useState(false);
  const [view,      setView]      = useState("grid"); // "grid" | "list"

  const filtered = COURSES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">

      {/* ── header ───────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-white text-[20px] font-black tracking-tight">
            Course Management
          </h2>
          <p className="text-white/35 text-[13px] mt-0.5">
            {COURSES.length} courses · {COURSES.reduce((a,c)=>a+c.students,0)} enrolled
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* view toggle */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04]
                          border border-white/[0.07]">
            {[{id:"grid",icon:<Icons.Layers className="w-4 h-4"/>},
              {id:"list",icon:<Icons.BarChart className="w-4 h-4"/>}].map((v)=>(
              <button key={v.id} onClick={()=>setView(v.id)}
                className="p-2 rounded-lg transition-all"
                style={ view===v.id
                  ? {background:"rgba(0,245,255,0.15)",color:"#00f5ff"}
                  : {color:"rgba(255,255,255,0.3)"} }
              >{v.icon}</button>
            ))}
          </div>
          <GradientButton from="#00f5ff" to="#a855f7"
            onClick={()=>setShowModal(true)}
            className="px-5 py-2.5 rounded-xl text-[13px]">
            <Icons.Plus className="w-4 h-4" />
            Add Course
          </GradientButton>
        </div>
      </motion.div>

      {/* ── search ───────────────────────────────────────────────────── */}
      <GlassCard padding="p-4">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                        bg-white/[0.04] border border-white/[0.07] max-w-sm
                        focus-within:border-cyan-500/40 transition-all">
          <Icons.Search className="w-4 h-4 text-white/25 flex-shrink-0" />
          <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search courses..."
            className="flex-1 bg-transparent text-white/70 text-[13px]
                       placeholder-white/20 outline-none"/>
        </div>
      </GlassCard>

      {/* ── grid view ────────────────────────────────────────────────── */}
      {view === "grid" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((course, i) => (
            <motion.div key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ delay: i * 0.07 }}
            >
              <GlassCard padding="p-5" hoverLift hoverGlow glowColor={course.color}>
                {/* top row */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center
                               justify-center text-[13px] font-black"
                    style={{ background:`${course.color}20`, color:course.color }}
                  >
                    {course.id.split("-")[1]}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize"
                    style={course.status==="active"
                      ? {background:"#10b98115",color:"#10b981"}
                      : {background:"#f59e0b15",color:"#f59e0b"}}>
                    {course.status}
                  </span>
                </div>

                <p className="text-white font-bold text-[14px] mb-1 leading-snug">
                  {course.name}
                </p>
                <p className="text-white/35 text-[12px] mb-4">{course.teacher}</p>

                {/* meta */}
                <div className="space-y-2 mb-4 text-[12px]">
                  <div className="flex items-center gap-2 text-white/40">
                    <Icons.Users    className="w-3.5 h-3.5" />
                    {course.students} students enrolled
                  </div>
                  <div className="flex items-center gap-2 text-white/40">
                    <Icons.Calendar className="w-3.5 h-3.5" />
                    {course.schedule}
                  </div>
                  <div className="flex items-center gap-2 text-white/40">
                    <Icons.Globe    className="w-3.5 h-3.5" />
                    Room {course.room}
                  </div>
                </div>

                {/* attendance bar */}
                {course.attendance > 0 && (
                  <div>
                    <div className="flex justify-between text-[11px] text-white/30 mb-1">
                      <span>Avg Attendance</span>
                      <span style={{color:course.color}}>{course.attendance}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/[0.07]">
                      <motion.div className="h-full rounded-full"
                        style={{background:course.color}}
                        initial={{width:0}}
                        animate={{width:`${course.attendance}%`}}
                        transition={{delay:i*0.07+0.3,duration:0.6}}/>
                    </div>
                  </div>
                )}

                {/* actions */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-white/[0.06]">
                  <button className="flex-1 py-2 rounded-xl text-[12px] font-semibold
                                     text-white/50 hover:text-white bg-white/[0.04]
                                     hover:bg-white/[0.08] transition-all">
                    Edit
                  </button>
                  <button className="flex-1 py-2 rounded-xl text-[12px] font-semibold
                                     transition-all"
                    style={{background:`${course.color}20`,color:course.color}}>
                    View Report
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}

      {/* ── list view ────────────────────────────────────────────────── */}
      {view === "list" && (
        <GlassCard padding="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-white/[0.07]">
                  {["Course","Name","Teacher","Students","Schedule","Attendance","Actions"].map(h=>(
                    <th key={h} className="text-left text-white/30 font-mono text-[11px]
                                           uppercase tracking-wider py-4 px-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c,i)=>(
                  <motion.tr key={c.id}
                    initial={{opacity:0}} animate={{opacity:1}}
                    transition={{delay:i*0.05}}
                    className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                    <td className="py-3 px-4">
                      <TagPill label={c.id} color={c.color} size="sm"/>
                    </td>
                    <td className="py-3 px-4 text-white font-medium">{c.name}</td>
                    <td className="py-3 px-4 text-white/50">{c.teacher}</td>
                    <td className="py-3 px-4 text-white/50">{c.students}</td>
                    <td className="py-3 px-4 text-white/40 font-mono text-[11px]">{c.schedule}</td>
                    <td className="py-3 px-4">
                      <span style={{color:c.color}} className="font-bold">{c.attendance}%</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1.5">
                        <button className="p-1.5 rounded-lg text-white/30
                                           hover:text-white hover:bg-white/[0.06] transition-all">
                          <Icons.Edit className="w-3.5 h-3.5"/>
                        </button>
                        <button className="p-1.5 rounded-lg text-white/30
                                           hover:text-red-400 hover:bg-red-400/10 transition-all">
                          <Icons.Trash className="w-3.5 h-3.5"/>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* ── add course modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-50 flex items-center justify-center
                       bg-black/60 backdrop-blur-sm px-4"
            onClick={()=>setShowModal(false)}>
            <motion.div initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}}
              exit={{scale:0.9,opacity:0}} onClick={(e)=>e.stopPropagation()}
              className="w-full max-w-md p-6 rounded-2xl
                         border border-white/[0.09] bg-[#0d0d1a]">
              <h3 className="text-white font-bold text-[16px] mb-5">Add New Course</h3>
              <div className="space-y-3">
                {[
                  {label:"Course ID",    placeholder:"CS-701"},
                  {label:"Course Name",  placeholder:"Advanced AI"},
                  {label:"Assign Teacher",placeholder:"Select teacher"},
                  {label:"Schedule",     placeholder:"Mon/Wed 9:00 AM"},
                  {label:"Room",         placeholder:"CS-701"},
                ].map((f)=>(
                  <div key={f.label}>
                    <label className="text-[12px] text-white/40 mb-1.5 block">{f.label}</label>
                    <input type="text" placeholder={f.placeholder}
                      className="w-full px-4 py-2.5 rounded-xl text-[13px]
                                 text-white placeholder-white/20 outline-none
                                 bg-white/[0.05] border border-white/[0.08]
                                 focus:border-cyan-500/50 transition-colors"/>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={()=>setShowModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold
                             text-white/60 border border-white/10
                             hover:bg-white/[0.05] transition-all">Cancel</button>
                <GradientButton from="#00f5ff" to="#a855f7"
                  className="flex-1 py-2.5 rounded-xl text-[13px]">
                  Create Course
                </GradientButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
