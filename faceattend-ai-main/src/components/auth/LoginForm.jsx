// ─── LoginForm.jsx ───────────────────────────────────────────────────────────
// Email + password form with role selector, validation, and loading state
// Usage: <LoginForm onSuccess={fn} />

import { useState }      from "react";
import { motion }        from "framer-motion";
import { Icons }         from "@/components/shared/Icons";
import RoleSelector      from "./RoleSelector";
import GradientButton    from "@/components/ui/GradientButton";

// ── field colours per role ────────────────────────────────────────────────────
const ROLE_COLOR = {
  admin:   "#00f5ff",
  teacher: "#a855f7",
  student: "#3b82f6",
};

// ── reusable input ────────────────────────────────────────────────────────────
const Field = ({ label, type = "text", value, onChange,
                 placeholder, icon, accentColor }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className="block text-[12px] font-medium text-white/50 mb-1.5">
        {label}
      </label>
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-xl
                   border transition-all duration-200"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: focused
            ? `1px solid ${accentColor}60`
            : "1px solid rgba(255,255,255,0.08)",
          boxShadow: focused ? `0 0 0 3px ${accentColor}12` : "none",
        }}
      >
        <span style={{ color: focused ? accentColor : "rgba(255,255,255,0.25)" }}>
          {icon}
        </span>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required
          className="flex-1 bg-transparent text-white text-[13px]
                     placeholder-white/20 outline-none"
        />
      </div>
    </div>
  );
};

// ── main component ────────────────────────────────────────────────────────────
export default function LoginForm({ onSuccess }) {
  const [role,     setRole]     = useState("student");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [showPass, setShowPass] = useState(false);

  const accent = ROLE_COLOR[role];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // TODO: replace with real API call
      // const res = await api.post("/auth/login", { email, password, role });
      // localStorage.setItem("token", res.data.token);
      await new Promise((r) => setTimeout(r, 1200)); // simulate
      onSuccess?.(role);
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      {/* role selector */}
      <div>
        <p className="text-[12px] font-medium text-white/50 mb-2">
          Sign in as
        </p>
        <RoleSelector selected={role} onChange={setRole} />
      </div>

      {/* email */}
      <Field
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@university.edu"
        icon={<Icons.Mail className="w-4 h-4" />}
        accentColor={accent}
      />

      {/* password */}
      <div>
        <label className="block text-[12px] font-medium text-white/50 mb-1.5">
          Password
        </label>
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl border
                     transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.04)",
            border:     "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span className="text-white/25">
            <Icons.Lock className="w-4 h-4" />
          </span>
          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="flex-1 bg-transparent text-white text-[13px]
                       placeholder-white/20 outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPass((v) => !v)}
            className="text-white/25 hover:text-white/60 transition-colors"
            aria-label={showPass ? "Hide password" : "Show password"}
          >
            <Icons.Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* forgot password */}
      <div className="flex justify-end">
        <button
          type="button"
          className="text-[12px] transition-colors"
          style={{ color: accent }}
        >
          Forgot password?
        </button>
      </div>

      {/* error */}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-[12px] text-red-400
                     bg-red-400/10 border border-red-400/20 px-4 py-3 rounded-xl"
        >
          <Icons.Warning className="w-4 h-4 flex-shrink-0" />
          {error}
        </motion.p>
      )}

      {/* submit */}
      <GradientButton
        type="submit"
        from={accent}
        to={role === "admin" ? "#a855f7" : role === "teacher" ? "#3b82f6" : "#10b981"}
        disabled={loading}
        className="w-full py-3.5 rounded-xl text-[14px]"
      >
        {loading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full"
          />
        ) : (
          <>
            <Icons.ArrowRight className="w-4 h-4" />
            Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
          </>
        )}
      </GradientButton>
    </motion.form>
  );
}
