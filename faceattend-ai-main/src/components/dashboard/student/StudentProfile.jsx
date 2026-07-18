// ─── StudentProfile.jsx ──────────────────────────────────────────────────────
// Student profile page: personal info, face registration status, download report
// Usage: routed at /student/profile

import { useState }   from "react";
import { motion }     from "framer-motion";
import { Icons }      from "@/components/shared/Icons";
import GlassCard      from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import TagPill        from "@/components/ui/TagPill";
import AnimatedDot    from "@/components/ui/AnimatedDot";
import DividerLine    from "@/components/ui/DividerLine";

const PROFILE = {
  name:       "Wasiya",
  id:         "CS-2021-001",
  email:      "wasiyaamir@uok.edu.pk",
  phone:      "+92 300 1234567",
  dept:       "Computer Science",
  semester:   "7th Semester",
  batch:      "2022-2026",
  cgpa:       "3.85",
  facePhotos: 8,
  faceStatus: "trained",
  accuracy:   98.7,
};

const ENROLLED = [
  { code:"CS-101", name:"Intro to Programming",  rate:95, color:"#10b981" },
  { code:"CS-201", name:"Data Structures",        rate:88, color:"#3b82f6" },
  { code:"CS-301", name:"Operating Systems",      rate:83, color:"#a855f7" },
  { code:"CS-401", name:"Computer Networks",      rate:67, color:"#f59e0b" },
  { code:"CS-501", name:"Machine Learning",       rate:91, color:"#00f5ff" },
  { code:"CS-601", name:"Software Engineering",   rate:88, color:"#ec4899" },
];

export default function StudentProfile() {
  const [editing, setEditing] = useState(false);
  const [phone,   setPhone]   = useState(PROFILE.phone);

  return (
    <div className="space-y-5">

      {/* header */}
      <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}>
        <h2 className="text-white text-[20px] font-black tracking-tight">My Profile</h2>
        <p className="text-white/35 text-[13px] mt-0.5">
          Your personal information and AI registration status
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-5">

        {/* ── left: profile card ───────────────────────────────────── */}
        <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
          transition={{ delay:0.1 }}>
          <GlassCard padding="p-6">

            {/* avatar */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-2xl flex items-center justify-center
                                text-3xl font-black"
                  style={{ background:"linear-gradient(135deg,#3b82f620,#10b98120)",
                           color:"#3b82f6", border:"2px solid rgba(59,130,246,0.25)" }}>
                  WA
                </div>
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{ boxShadow:"0 0 30px rgba(59,130,246,0.2)" }}
                  animate={{ opacity:[0.3,0.8,0.3] }}
                  transition={{ duration:2.5, repeat:Infinity }}/>
                {/* face trained badge */}
                <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full
                                bg-green-400 flex items-center justify-center
                                border-2 border-[#07070f]">
                  <Icons.Check className="w-3.5 h-3.5 text-black"/>
                </div>
              </div>
              <h3 className="text-white font-black text-[18px]">{PROFILE.name}</h3>
              <p className="text-white/40 text-[13px] mt-1">{PROFILE.id}</p>
              <TagPill label={PROFILE.dept} color="#3b82f6" size="sm"/>
            </div>

            <DividerLine color="rgba(255,255,255,0.07)" my="my-0 mb-5"/>

            {/* info rows */}
            <div className="space-y-3.5 text-[13px]">
              {[
                { icon:<Icons.Mail     className="w-4 h-4"/>, label:"Email",    value:PROFILE.email    },
                { icon:<Icons.Globe    className="w-4 h-4"/>, label:"Batch",    value:PROFILE.batch    },
                { icon:<Icons.Layers  className="w-4 h-4"/>, label:"Semester", value:PROFILE.semester },
                { icon:<Icons.Star     className="w-4 h-4"/>, label:"CGPA",     value:PROFILE.cgpa     },
              ].map(row => (
                <div key={row.label} className="flex items-center gap-3">
                  <span className="text-white/25 flex-shrink-0">{row.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/30 text-[10px] font-mono uppercase tracking-wide">
                      {row.label}
                    </p>
                    <p className="text-white/70 truncate">{row.value}</p>
                  </div>
                </div>
              ))}

              {/* editable phone */}
              <div className="flex items-center gap-3">
                <span className="text-white/25 flex-shrink-0">
                  <Icons.Activity className="w-4 h-4"/>
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-white/30 text-[10px] font-mono uppercase tracking-wide mb-0.5">
                    Phone
                  </p>
                  {editing
                    ? <input value={phone} onChange={e=>setPhone(e.target.value)}
                        className="w-full bg-white/[0.05] border border-blue-500/40
                                   rounded-lg px-2 py-1 text-white outline-none text-[13px]"/>
                    : <p className="text-white/70">{phone}</p>
                  }
                </div>
                <button onClick={() => setEditing(v=>!v)}
                  className="text-white/25 hover:text-blue-400 transition-colors flex-shrink-0">
                  <Icons.Edit className="w-3.5 h-3.5"/>
                </button>
              </div>
            </div>

            {editing && (
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
                className="mt-4">
                <GradientButton from="#3b82f6" to="#10b981"
                  onClick={() => setEditing(false)}
                  className="w-full py-2.5 rounded-xl text-[13px]">
                  <Icons.Check className="w-4 h-4"/> Save Changes
                </GradientButton>
              </motion.div>
            )}
          </GlassCard>
        </motion.div>

        {/* ── right: AI status + enrolled courses ──────────────────── */}
        <div className="lg:col-span-2 space-y-4">

          {/* AI face status */}
          <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
            transition={{ delay:0.15 }}>
            <GlassCard padding="p-5">
              <h3 className="text-white font-bold text-[14px] mb-4">
                AI Face Recognition Status
              </h3>
              <div className="grid sm:grid-cols-3 gap-4 mb-5">
                {[
                  { label:"Face Photos",  value:PROFILE.facePhotos, unit:"uploaded", color:"#3b82f6" },
                  { label:"Model Status", value:"Trained",           unit:"active",   color:"#10b981" },
                  { label:"Accuracy",     value:`${PROFILE.accuracy}%`, unit:"confidence", color:"#a855f7" },
                ].map((s,i) => (
                  <div key={i} className="text-center p-4 rounded-xl
                                          border border-white/[0.06] bg-white/[0.02]">
                    <p className="text-[22px] font-black" style={{color:s.color}}>{s.value}</p>
                    <p className="text-white font-semibold text-[12px] mt-0.5">{s.label}</p>
                    <p className="text-white/30 text-[10px]">{s.unit}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl
                              border border-green-500/20 bg-green-500/[0.06]">
                <div className="w-9 h-9 rounded-xl bg-green-500/15
                                flex items-center justify-center flex-shrink-0">
                  <Icons.UserCheck className="w-5 h-5 text-green-400"/>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <AnimatedDot color="#10b981" size="w-1.5 h-1.5"/>
                    <p className="text-green-400 font-semibold text-[13px]">
                      Face Registered & Active
                    </p>
                  </div>
                  <p className="text-white/35 text-[12px] mt-0.5">
                    Your face is enrolled in the YOLOv8 + FaceNet recognition pipeline
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* enrolled courses */}
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.2 }}>
            <GlassCard padding="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-[14px]">
                  Enrolled Courses
                </h3>
                <GradientButton from="#3b82f6" to="#10b981"
                  className="px-4 py-2 rounded-xl text-[12px]">
                  <Icons.Download className="w-3.5 h-3.5"/> Download Report
                </GradientButton>
              </div>
              <div className="space-y-2.5">
                {ENROLLED.map((c, i) => (
                  <motion.div key={c.code}
                    initial={{ opacity:0, x:10 }} animate={{ opacity:1, x:0 }}
                    transition={{ delay:0.25+i*0.06 }}
                    className="flex items-center gap-3 p-3 rounded-xl
                               border border-white/[0.06] bg-white/[0.02]">
                    <TagPill label={c.code} color={c.color} size="sm"/>
                    <p className="flex-1 text-white/60 text-[13px] truncate">{c.name}</p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="w-16 h-1.5 rounded-full bg-white/[0.07]">
                        <div className="h-full rounded-full"
                          style={{
                            width:`${c.rate}%`,
                            background: c.rate>=75 ? c.color : "#ef4444",
                          }}/>
                      </div>
                      <span className="text-[11px] font-mono font-bold w-8"
                        style={{ color: c.rate>=75 ? c.color : "#ef4444" }}>
                        {c.rate}%
                      </span>
                    </div>
                    {c.rate < 75 && (
                      <Icons.Warning className="w-4 h-4 text-yellow-400 flex-shrink-0"/>
                    )}
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
