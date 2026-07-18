// ─── AITrainingUpload.jsx ────────────────────────────────────────────────────
// Face photo upload for AI model training — drag & drop + preview + progress
// Usage: routed at /admin/ai-training

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons }     from "@/components/shared/Icons";
import GlassCard     from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";
import AnimatedDot   from "@/components/ui/AnimatedDot";
import StatCard      from "@/components/ui/StatCard";

const TRAINED_STUDENTS = [
  { id:"CS-2021-001", name:"Ali Hassan",   photos:8,  status:"trained",  accuracy:98.2 },
  { id:"CS-2021-002", name:"Sara Ahmed",   photos:6,  status:"trained",  accuracy:96.8 },
  { id:"CS-2021-003", name:"Usman Malik",  photos:0,  status:"pending",  accuracy:0    },
  { id:"CS-2021-004", name:"Nadia Khan",   photos:5,  status:"trained",  accuracy:94.1 },
  { id:"CS-2021-005", name:"Bilal Ahmed",  photos:9,  status:"trained",  accuracy:99.0 },
  { id:"CS-2021-006", name:"Ayesha Tariq", photos:0,  status:"pending",  accuracy:0    },
];

const STATS = [
  { value:"4",    label:"Trained Students", change:"2",    changeLabel:"pending", color:"#10b981", icon:<Icons.UserCheck className="w-4 h-4"/> },
  { value:"34",   label:"Total Photos",     change:"8",    changeLabel:"today",   color:"#00f5ff", icon:<Icons.Camera    className="w-4 h-4"/> },
  { value:"97.0%",label:"Avg Accuracy",     change:"1.2%", changeLabel:"improved",color:"#a855f7", icon:<Icons.Brain     className="w-4 h-4"/> },
  { value:"128D", label:"Embedding Dims",   change:"FaceNet",changeLabel:"model", color:"#f59e0b", icon:<Icons.Cpu       className="w-4 h-4"/> },
];

export default function AITrainingUpload() {
  const [dragOver,   setDragOver]   = useState(false);
  const [previews,   setPreviews]   = useState([]);
  const [uploading,  setUploading]  = useState(false);
  const [progress,   setProgress]   = useState(0);
  const [selected,   setSelected]   = useState("");
  const inputRef = useRef(null);

  // ── handle file select ────────────────────────────────────────────────────
  const handleFiles = (files) => {
    const imgs = Array.from(files).filter(f=>f.type.startsWith("image/"));
    imgs.forEach(f=>{
      const reader = new FileReader();
      reader.onload = (e)=>
        setPreviews(prev=>[...prev,{ url:e.target.result, name:f.name, size:f.size }]);
      reader.readAsDataURL(f);
    });
  };

  // ── simulate upload ───────────────────────────────────────────────────────
  const handleUpload = () => {
    if (!previews.length || !selected) return;
    setUploading(true);
    setProgress(0);
    const interval = setInterval(()=>{
      setProgress(p=>{
        if(p>=100){ clearInterval(interval); setUploading(false); setPreviews([]); return 100; }
        return p + Math.floor(Math.random()*12+5);
      });
    }, 200);
  };

  return (
    <div className="space-y-5">

      {/* header */}
      <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}
        className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-white text-[20px] font-black tracking-tight">
            AI Face Training
          </h2>
          <p className="text-white/35 text-[13px] mt-0.5">
            Upload face photos to train the FaceNet recognition model
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl
                        border border-purple-500/20 bg-purple-500/[0.06]">
          <AnimatedDot color="#a855f7" size="w-1.5 h-1.5"/>
          <span className="text-purple-400 text-[12px] font-mono font-semibold">
            YOLOv8 + FaceNet Active
          </span>
        </div>
      </motion.div>

      {/* stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s,i)=>(
          <motion.div key={s.label}
            initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
            transition={{delay:i*0.07}}>
            <StatCard {...s}/>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">

        {/* ── upload zone ──────────────────────────────────────────── */}
        <motion.div initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.3}}>
          <GlassCard padding="p-5">
            <h3 className="text-white font-bold text-[14px] mb-4">Upload Face Photos</h3>

            {/* student select */}
            <div className="mb-4">
              <label className="text-[12px] text-white/40 mb-1.5 block">
                Select Student
              </label>
              <select value={selected} onChange={e=>setSelected(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-[13px]
                           text-white bg-white/[0.05] border border-white/[0.08]
                           outline-none focus:border-purple-500/50 transition-colors
                           appearance-none">
                <option value="" className="bg-[#0d0d1a]">-- Select student --</option>
                {TRAINED_STUDENTS.map(s=>(
                  <option key={s.id} value={s.id} className="bg-[#0d0d1a]">
                    {s.name} ({s.id})
                  </option>
                ))}
              </select>
            </div>

            {/* dropzone */}
            <div
              onDragOver={e=>{e.preventDefault();setDragOver(true)}}
              onDragLeave={()=>setDragOver(false)}
              onDrop={e=>{e.preventDefault();setDragOver(false);handleFiles(e.dataTransfer.files)}}
              onClick={()=>inputRef.current?.click()}
              className="relative border-2 border-dashed rounded-2xl
                         p-8 text-center cursor-pointer transition-all duration-200"
              style={{
                borderColor: dragOver ? "#a855f7" : "rgba(255,255,255,0.1)",
                background:  dragOver ? "rgba(168,85,247,0.05)" : "rgba(255,255,255,0.02)",
              }}
            >
              <input ref={inputRef} type="file" multiple accept="image/*"
                className="hidden" onChange={e=>handleFiles(e.target.files)}/>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10
                              flex items-center justify-center mx-auto mb-3">
                <Icons.Upload className="w-6 h-6 text-purple-400"/>
              </div>
              <p className="text-white/60 text-[13px] font-semibold mb-1">
                Drag & drop photos here
              </p>
              <p className="text-white/25 text-[12px]">
                or click to browse · JPG, PNG · Max 5MB each
              </p>
              <p className="text-purple-400 text-[11px] font-mono mt-3">
                Minimum 5 photos recommended for best accuracy
              </p>
            </div>

            {/* previews */}
            <AnimatePresence>
              {previews.length > 0 && (
                <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
                  className="mt-4">
                  <p className="text-white/40 text-[12px] mb-3">
                    {previews.length} photo{previews.length>1?"s":""} selected
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {previews.map((p,i)=>(
                      <motion.div key={i}
                        initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}}
                        transition={{delay:i*0.05}}
                        className="relative aspect-square rounded-lg overflow-hidden
                                   border border-white/10">
                        <img src={p.url} alt={p.name}
                          className="w-full h-full object-cover"/>
                        <button
                          onClick={e=>{e.stopPropagation();
                            setPreviews(prev=>prev.filter((_,j)=>j!==i))}}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full
                                     bg-black/70 flex items-center justify-center
                                     text-white/70 hover:text-white transition-colors">
                          <Icons.X className="w-3 h-3"/>
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* progress */}
            {uploading && (
              <div className="mt-4">
                <div className="flex justify-between text-[12px] mb-1.5">
                  <span className="text-white/50">Training model...</span>
                  <span className="text-purple-400 font-mono">{Math.min(progress,100)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.07]">
                  <motion.div className="h-full rounded-full"
                    style={{background:"linear-gradient(90deg,#a855f7,#00f5ff)"}}
                    animate={{width:`${Math.min(progress,100)}%`}}
                    transition={{duration:0.2}}/>
                </div>
              </div>
            )}

            {/* upload btn */}
            <div className="mt-4">
              <GradientButton from="#a855f7" to="#3b82f6"
                onClick={handleUpload}
                disabled={!previews.length||!selected||uploading}
                className="w-full py-3 rounded-xl text-[13px]">
                {uploading
                  ? <><motion.div animate={{rotate:360}} transition={{duration:0.8,repeat:Infinity,ease:"linear"}}
                      className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"/>
                      Training...</>
                  : <><Icons.Brain className="w-4 h-4"/> Start AI Training</>
                }
              </GradientButton>
            </div>
          </GlassCard>
        </motion.div>

        {/* ── training status table ─────────────────────────────────── */}
        <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:0.35}}>
          <GlassCard padding="p-5">
            <h3 className="text-white font-bold text-[14px] mb-5">
              Training Status
            </h3>
            <div className="space-y-3">
              {TRAINED_STUDENTS.map((s,i)=>(
                <motion.div key={s.id}
                  initial={{opacity:0,x:10}} animate={{opacity:1,x:0}}
                  transition={{delay:0.4+i*0.07}}
                  className="flex items-center gap-3 p-3 rounded-xl
                             border border-white/[0.06] bg-white/[0.02]
                             hover:bg-white/[0.04] transition-all">
                  {/* avatar */}
                  <div className="w-9 h-9 rounded-lg flex items-center
                                  justify-center text-[11px] font-black flex-shrink-0"
                    style={{background:"linear-gradient(135deg,#a855f730,#3b82f630)",color:"#a855f7"}}>
                    {s.name.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-white text-[13px] font-semibold truncate">
                      {s.name}
                    </p>
                    <p className="text-white/30 text-[11px] font-mono">{s.id}</p>
                  </div>

                  {/* photos count */}
                  <div className="text-center">
                    <p className="text-white text-[13px] font-bold">{s.photos}</p>
                    <p className="text-white/25 text-[10px]">photos</p>
                  </div>

                  {/* accuracy */}
                  {s.status==="trained" && (
                    <div className="text-center">
                      <p className="text-green-400 text-[13px] font-bold">{s.accuracy}%</p>
                      <p className="text-white/25 text-[10px]">accuracy</p>
                    </div>
                  )}

                  {/* status badge */}
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                    style={s.status==="trained"
                      ? {background:"#10b98115",color:"#10b981"}
                      : {background:"#f59e0b15",color:"#f59e0b"}}>
                    {s.status==="trained" ? "✓ Trained" : "Pending"}
                  </span>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
