// ─── AIScannerCard.jsx ───────────────────────────────────────────────────────
// Animated AI face scanner visual — used in HeroSection + StartAttendance page
// Now supports a real live-camera mode with YOLOv8 bounding boxes.
//
// Usage:
//   <AIScannerCard />                          — demo animation only (unchanged)
//   <AIScannerCard size="sm" live={false} />    — compact, no live feed
//   <AIScannerCard live />                      — adds a "Try Live Camera" button;
//                                                  on click, opens the browser webcam
//                                                  and overlays real YOLOv8 detections
//
// Live mode calls:  POST `${VITE_AI_SERVER_URL}/detect/live`  (multipart "file")
// Expected response: { "faces": [ { x, y, width, height, confidence, label } ] }
// Coordinates are expected in the pixel space of the captured frame.
// Set VITE_AI_SERVER_URL in your .env (defaults to http://localhost:8000).

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/shared/Icons";

const AI_SERVER_URL =
  import.meta.env.VITE_AI_SERVER_URL || "http://localhost:8000";
const DETECT_ENDPOINT = `${AI_SERVER_URL}/detect/live`;

// ── Corner bracket ────────────────────────────────────────────────────────────
const CornerBracket = ({ position = "tl" }) => {
  const posMap = {
    tl: "top-4 left-4",
    tr: "top-4 right-4 scale-x-[-1]",
    bl: "bottom-4 left-4 scale-y-[-1]",
    br: "bottom-4 right-4 scale-[-1]",
  };
  return (
    <div className={`absolute ${posMap[position]} w-4 h-4 pointer-events-none z-20`}>
      <div className="w-full h-[2px] bg-cyan-400" />
      <div className="w-[2px] h-full bg-cyan-400 mt-[-2px]" />
    </div>
  );
};

// ── Floating badge ────────────────────────────────────────────────────────────
const FloatBadge = ({ text, color, style, delay = 0 }) => (
  <motion.div
    animate={{ y: [0, -6, 0] }}
    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay }}
    className="absolute px-3 py-1.5 rounded-xl font-mono text-[11px]
               font-semibold whitespace-nowrap z-20"
    style={{
      background: "#07070f",
      border:     `0.5px solid ${color}50`,
      color,
      ...style,
    }}
  >
    {text}
  </motion.div>
);

// ── Main component ────────────────────────────────────────────────────────────
export default function AIScannerCard({
  size        = "md",   // "sm" | "md" | "lg"
  showBadges  = true,
  showConfBar = true,
  live        = false,  // enables the real-camera capability
}) {
  const dims = {
    sm: { w: "w-[200px]", h: "h-[240px]" },
    md: { w: "w-[260px]", h: "h-[300px]" },
    lg: { w: "w-[320px]", h: "h-[380px]" },
  }[size] || { w: "w-[260px]", h: "h-[300px]" };

  // ── live camera state ────────────────────────────────────────────────────
  const videoRef        = useRef(null);
  const overlayCanvasRef = useRef(null);
  const captureCanvasRef = useRef(null);
  const streamRef        = useRef(null);
  const intervalRef      = useRef(null);

  const [cameraOn, setCameraOn]     = useState(false);
  const [starting, setStarting]     = useState(false);
  const [camError, setCamError]     = useState(null);
  const [faces, setFaces]           = useState([]);
  const [bestConfidence, setBestConfidence] = useState(0);
  // "idle" | "connecting" | "connected" | "failed"
  const [serverStatus, setServerStatus] = useState("idle");
  const failCountRef = useRef(0);

  const stopCamera = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraOn(false);
    setFaces([]);
    setBestConfidence(0);
    setServerStatus("idle");
    failCountRef.current = 0;
  }, []);

  useEffect(() => () => stopCamera(), [stopCamera]); // cleanup on unmount

  const captureAndDetect = useCallback(async () => {
    const video = videoRef.current;
    if (!video || video.readyState !== 4) return;

    if (!captureCanvasRef.current) {
      captureCanvasRef.current = document.createElement("canvas");
    }
    const cap = captureCanvasRef.current;
    cap.width = video.videoWidth;
    cap.height = video.videoHeight;
    cap.getContext("2d").drawImage(video, 0, 0);

    cap.toBlob(
      async (blob) => {
        if (!blob) return;
        try {
          const formData = new FormData();
          formData.append("file", blob, "frame.jpg");
          const res = await fetch(DETECT_ENDPOINT, { method: "POST", body: formData });
          if (!res.ok) throw new Error(`Server responded ${res.status}`);
          const data = await res.json();
          const detected = data.faces || [];
          setFaces(detected);
          setBestConfidence(
            detected.length
              ? Math.max(...detected.map((f) => f.confidence || 0))
              : 0
          );
          setCamError(null);
          setServerStatus("connected");
          failCountRef.current = 0;
        } catch (err) {
          failCountRef.current += 1;
          // Only flip to "failed" after a few misses in a row, so one dropped
          // frame doesn't flash an error — but it WILL surface, not hang forever.
          if (failCountRef.current >= 3) {
            setServerStatus("failed");
            setCamError(
              `Can't reach the AI server at ${AI_SERVER_URL}. Make sure it's running (uvicorn ... --port 8000) and its CORS settings allow this site.`
            );
          }
        }
      },
      "image/jpeg",
      0.8
    );
  }, []);

  const startCamera = useCallback(async () => {
    setCamError(null);
    setServerStatus("connecting");
    failCountRef.current = 0;
    setStarting(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 480, height: 480, facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      // NOTE: we do NOT touch videoRef.current here — the <video> element
      // doesn't exist yet (it only renders once cameraOn is true). We just
      // flip cameraOn on; the effect below attaches the stream once the
      // <video> element has actually mounted.
      setCameraOn(true);
    } catch (err) {
      setCamError(
        err.name === "NotAllowedError"
          ? "Camera permission denied. Check your browser's site settings and allow camera access."
          : "Couldn't access the camera. It may be in use by another app (Zoom, Teams, Windows Camera, etc.) — close those and try again."
      );
      setServerStatus("failed");
    } finally {
      setStarting(false);
    }
  }, []);

  // ── attach the camera stream to <video> the INSTANT it mounts ──────────
  // A plain useEffect keyed on `cameraOn` is not reliable here: AnimatePresence
  // delays mounting the <video> element until the outgoing demo animation's
  // exit transition finishes, so the effect can fire before the element
  // exists and then never fire again once it does. A callback ref has no
  // such race — React calls it the moment the real DOM node is created.
  const attachVideoRef = useCallback(
    (node) => {
      videoRef.current = node;
      if (!node || !streamRef.current) return;

      if (node.srcObject !== streamRef.current) {
        node.srcObject = streamRef.current;
      }

      node
        .play()
        .then(() => {
          if (!intervalRef.current) {
            intervalRef.current = setInterval(captureAndDetect, 700);
          }
        })
        .catch(() => {
          setCamError("Camera stream connected but couldn't start playback. Try again.");
          setServerStatus("failed");
        });
    },
    [captureAndDetect]
  );

  // ── draw bounding boxes over the live video ─────────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    const canvas = overlayCanvasRef.current;
    if (!cameraOn || !video || !canvas) return;

    const displayW = canvas.clientWidth;
    const displayH = canvas.clientHeight;
    canvas.width = displayW;
    canvas.height = displayH;
    const scaleX = displayW / (video.videoWidth || displayW);
    const scaleY = displayH / (video.videoHeight || displayH);

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, displayW, displayH);

    faces.forEach((f) => {
      const x = f.x * scaleX;
      const y = f.y * scaleY;
      const w = f.width * scaleX;
      const h = f.height * scaleY;

      ctx.strokeStyle = "#00f5ff";
      ctx.lineWidth = 2;
      ctx.setLineDash([7, 4]);
      ctx.strokeRect(x, y, w, h);
      ctx.setLineDash([]);

      const label = `${f.label || "face"} ${
        f.confidence ? Math.round(f.confidence * 100) + "%" : ""
      }`.trim();
      ctx.font = "600 11px monospace";
      const tw = ctx.measureText(label).width;
      ctx.fillStyle = "#00f5ff";
      ctx.fillRect(x, y - 20, tw + 10, 20);
      ctx.fillStyle = "#07070f";
      ctx.fillText(label, x + 5, y - 6);
    });
  }, [faces, cameraOn]);

  return (
    <div className={`relative ${dims.w} ${dims.h}`}>

      {/* ── rotating rings ─────────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-4 rounded-[40px] border border-dashed
                   border-cyan-500/[0.12] pointer-events-none"
      />
      <motion.div
        aria-hidden="true"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-8 rounded-[50px] border border-dashed
                   border-purple-500/[0.07] pointer-events-none"
      />

      {/* ── main card ──────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 rounded-3xl overflow-hidden"
        style={{
          border:     "0.5px solid rgba(0,245,255,0.2)",
          background: "rgba(0,245,255,0.02)",
        }}
      >
        {/* corner brackets */}
        {["tl","tr","bl","br"].map((pos) => (
          <CornerBracket key={pos} position={pos} />
        ))}

        {/* animated scan line (shown in both modes) */}
        <motion.div
          aria-hidden="true"
          className="absolute left-5 right-5 h-[2px] rounded-full z-10"
          style={{
            background: "linear-gradient(90deg,transparent,#00f5ff,transparent)",
            boxShadow:  "0 0 10px rgba(0,245,255,0.6)",
          }}
          animate={{ top: ["15%","82%","15%"], opacity: [0,1,1,0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />

        <AnimatePresence mode="wait">
          {cameraOn ? (
            // ── LIVE CAMERA MODE ─────────────────────────────────────────
            <motion.div
              key="live"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <video
                ref={attachVideoRef}
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ transform: "scaleX(-1)" }} // mirror, like a selfie cam
              />
              <canvas
                ref={overlayCanvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ transform: "scaleX(-1)" }}
              />

              {/* live/present indicator — reflects REAL connection state, never hangs silently */}
              <div
                className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full
                           text-[10px] font-mono font-bold z-20 text-center whitespace-nowrap"
                style={{
                  background:
                    serverStatus === "failed"   ? "rgba(239,68,68,0.15)"  :
                    faces.length                ? "rgba(16,185,129,0.15)" :
                                                   "rgba(255,255,255,0.06)",
                  color:
                    serverStatus === "failed"   ? "#ef4444" :
                    faces.length                ? "#10b981" : "#ffffff80",
                  border: `0.5px solid ${
                    serverStatus === "failed" ? "#ef444450" :
                    faces.length              ? "#10b98150" : "#ffffff20"
                  }`,
                }}
              >
                {serverStatus === "connecting" && "○ CONNECTING…"}
                {serverStatus === "failed"     && "✕ CONNECTION FAILED"}
                {serverStatus === "connected"  && (faces.length ? "● FACE DETECTED" : "○ SCANNING…")}
              </div>

              {/* error banner — always visible, never hidden behind other UI */}
              {camError && (
                <div className="absolute top-14 left-3 right-3 z-30 px-3 py-2 rounded-lg
                                 text-[10px] font-mono leading-snug text-center"
                     style={{
                       background: "rgba(239,68,68,0.15)",
                       color: "#fca5a5",
                       border: "0.5px solid rgba(239,68,68,0.4)",
                     }}
                >
                  {camError}
                </div>
              )}
            </motion.div>
          ) : (
            // ── DEMO ANIMATION MODE (original SVG) ───────────────────────
            <motion.svg
              key="demo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              viewBox="0 0 260 300"
              fill="none"
              className="absolute inset-0 w-full h-full"
            >
              {/* detection bounding box */}
              <rect
                x="55" y="40" width="150" height="185" rx="4"
                stroke="#00f5ff" strokeWidth="1"
                strokeDasharray="7 4" opacity="0.5"
              />

              {/* face silhouette */}
              <motion.ellipse
                cx="130" cy="120" rx="48" ry="58"
                stroke="#a855f7" strokeWidth="0.8"
                animate={{ opacity: [0.25, 0.55, 0.25] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* left eye */}
              <motion.circle cx="108" cy="108" r="7" fill="#00f5ff"
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              <motion.circle cx="108" cy="108"
                stroke="#00f5ff" strokeWidth="0.8" fill="none"
                strokeDasharray="3 2"
                animate={{ r: [10, 16, 10], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* right eye */}
              <motion.circle cx="152" cy="108" r="7" fill="#00f5ff"
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
              />
              <motion.circle cx="152" cy="108"
                stroke="#00f5ff" strokeWidth="0.8" fill="none"
                strokeDasharray="3 2"
                animate={{ r: [10, 16, 10], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
              />

              {/* nose */}
              <path
                d="M130 118 L124 135 L136 135"
                stroke="#a855f7" strokeWidth="0.8" opacity="0.4"
              />

              {/* mouth */}
              <path
                d="M116 148 Q130 158 144 148"
                stroke="#00f5ff" strokeWidth="1" opacity="0.4"
              />

              {/* landmark dots */}
              {[
                { cx: 108, cy: 108, fill: "#00f5ff" },
                { cx: 152, cy: 108, fill: "#00f5ff" },
                { cx: 130, cy: 148, fill: "#a855f7" },
                { cx: 100, cy: 95,  fill: "#a855f7" },
                { cx: 160, cy: 95,  fill: "#a855f7" },
              ].map((dot, i) => (
                <motion.circle key={i} {...dot} r="2"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}

              {/* confirmed label */}
              <motion.text
                x="130" y="252" textAnchor="middle"
                fill="#00f5ff" fontSize="9" fontFamily="monospace"
                animate={{ opacity: [0.3, 0.9, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                IDENTITY CONFIRMED ✓
              </motion.text>
            </motion.svg>
          )}
        </AnimatePresence>

        {/* ── live-camera trigger button ──────────────────────────────── */}
        {live && (
          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20"
               style={{ display: showConfBar && cameraOn ? "none" : "block" }}>
            <button
              onClick={cameraOn ? stopCamera : startCamera}
              disabled={starting}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px]
                         font-semibold font-mono transition-all disabled:opacity-50"
              style={
                cameraOn
                  ? { background: "rgba(239,68,68,0.12)", color: "#ef4444", border: "0.5px solid rgba(239,68,68,0.4)" }
                  : { background: "rgba(0,245,255,0.1)",  color: "#00f5ff", border: "0.5px solid rgba(0,245,255,0.4)" }
              }
            >
              {cameraOn ? (
                <>
                  <Icons.Stop className="w-3 h-3" />
                  Stop Camera
                </>
              ) : (
                <>
                  <Icons.Camera className="w-3.5 h-3.5" />
                  {starting ? "Starting…" : "Try Live Camera"}
                </>
              )}
            </button>
            {camError && (
              <p className="text-red-400 text-[10px] mt-1.5 text-center max-w-[220px] font-mono">
                {camError}
              </p>
            )}
          </div>
        )}

        {/* ── confidence bar (demo mode only — live mode uses the button/readout below) ── */}
        {showConfBar && !live && (
          <div className="absolute bottom-7 left-7 right-7">
            <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg,#00f5ff,#a855f7)",
                }}
                animate={{ width: ["0%","98%","98%","0%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  times: [0, 0.55, 0.88, 1],
                }}
              />
            </div>
            <div className="flex justify-between mt-1.5 font-mono text-[10px] text-white/25">
              <span>Confidence</span>
              <motion.span
                className="text-purple-400"
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  times: [0.1, 0.5, 0.85, 1],
                }}
              >
                98.7%
              </motion.span>
            </div>
          </div>
        )}

        {/* live confidence readout (replaces the fake bar while camera is on) */}
        {live && cameraOn && (
          <div className="absolute bottom-4 left-7 right-7 z-20">
            <div className="h-1 rounded-full bg-white/[0.08] overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg,#00f5ff,#a855f7)" }}
                animate={{ width: `${Math.round(bestConfidence * 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex justify-between mt-1.5 font-mono text-[10px] text-white/40">
              <span>Live Confidence</span>
              <span className="text-purple-400">
                {bestConfidence ? `${Math.round(bestConfidence * 100)}%` : "—"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── floating badges ─────────────────────────────────────────────── */}
      {showBadges && (
        <>
          <FloatBadge
            text="YOLOv8 ● ACTIVE"
            color="#00f5ff"
            style={{ top: -18, right: -36 }}
            delay={0}
          />
          <FloatBadge
            text="FaceNet ● 128D"
            color="#a855f7"
            style={{ bottom: -14, left: -32 }}
            delay={0.5}
          />
          <FloatBadge
            text={cameraOn ? (faces.length ? "✓ PRESENT" : "SCANNING") : "✓ PRESENT"}
            color={cameraOn ? (faces.length ? "#10b981" : "#eab308") : "#10b981"}
            style={{ top: "50%", right: -44, transform: "translateY(-50%)" }}
            delay={1}
          />
        </>
      )}
    </div>
  );
}
