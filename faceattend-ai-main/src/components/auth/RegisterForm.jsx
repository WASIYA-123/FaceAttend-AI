// ─── RegisterForm.jsx ────────────────────────────────────────────────────────
// Full registration form: name, student/staff ID, email, password, role
// Usage: <RegisterForm onSuccess={fn} />

import { useState }   from "react";
import { motion }     from "framer-motion";
import { Icons }      from "@/components/shared/Icons";
import RoleSelector   from "./RoleSelector";
import GradientButton from "@/components/ui/GradientButton";

const ROLE_COLOR = {
  admin:   "#00f5ff",
  teacher: "#a855f7",
  student: "#3b82f6",
};

// ── reusable field ────────────────────────────────────────────────────────────
const Field = ({
  label, type = "text", value, onChange,
  placeholder, icon, accentColor, required = true,
}) => {
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
          required={required}
          className="flex-1 bg-transparent text-white text-[13px]
                     placeholder-white/20 outline-none"
        />
      </div>
    </div>
  );
};

// ── main component ────────────────────────────────────────────────────────────
export default function RegisterForm({ onSuccess }) {
  const [role,      setRole]      = useState("student");
  const [name,      setName]      = useState("");
  const [idNumber,  setIdNumber]  = useState("");
  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [confirm,   setConfirm]   = useState("");
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [showPass,  setShowPass]  = useState(false);

  const accent = ROLE_COLOR[role];

  // ── password strength ──────────────────────────────────────────────────────
  const strength = (() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8)        s++;
    if (/[A-Z]/.test(password))      s++;
    if (/[0-9]/.test(password))      s++;
    if (/[^A-WA-z0-9]/.test(password)) s++;
    return s;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#3b82f6", "#10b981"][strength];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (strength < 2) {
      setError("Please choose a stronger password.");
      return;
    }
    setLoading(true);
    try {
      // TODO: replace with real API call
      // await api.post("/auth/register", { name, idNumber, email, password, role });
      await new Promise((r) => setTimeout(r, 1400));
      onSuccess?.(role);
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed.");
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
      className="space-y-4"
    >
      {/* role */}
      <div>
        <p className="text-[12px] font-medium text-white/50 mb-2">
          Register as
        </p>
        <RoleSelector selected={role} onChange={setRole} />
      </div>

      {/* full name */}
      <Field
        label="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Wasiya"
        icon={<Icons.User className="w-4 h-4" />}
        accentColor={accent}
      />

      {/* ID number */}
      <Field
        label={role === "student" ? "Student ID" : "Staff ID"}
        value={idNumber}
        onChange={(e) => setIdNumber(e.target.value)}
        placeholder={role === "student" ? "CS-2021-001" : "STF-001"}
        icon={<Icons.Key className="w-4 h-4" />}
        accentColor={accent}
      />

      {/* email */}
      <Field
        label="University Email"
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
            placeholder="Min 8 chars"
            required
            className="flex-1 bg-transparent text-white text-[13px]
                       placeholder-white/20 outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPass((v) => !v)}
            className="text-white/25 hover:text-white/60 transition-colors"
          >
            <Icons.Eye className="w-4 h-4" />
          </button>
        </div>

        {/* strength bar */}
        {password && (
          <div className="mt-2">
            <div className="flex gap-1 h-1">
              {[1,2,3,4].map((i) => (
                <div
                  key={i}
                  className="flex-1 rounded-full transition-all duration-300"
                  style={{
                    background: i <= strength ? strengthColor : "rgba(255,255,255,0.08)",
                  }}
                />
              ))}
            </div>
            <p
              className="text-[10px] mt-1 font-mono"
              style={{ color: strengthColor }}
            >
              {strengthLabel}
            </p>
          </div>
        )}
      </div>

      {/* confirm password */}
      <Field
        label="Confirm Password"
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        placeholder="Repeat your password"
        icon={<Icons.Lock className="w-4 h-4" />}
        accentColor={accent}
      />

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
            <Icons.UserPlus className="w-4 h-4" />
            Create Account
          </>
        )}
      </GradientButton>

      {/* terms note */}
      <p className="text-center text-[11px] text-white/25">
        By registering you agree to the university's attendance policy.
      </p>
    </motion.form>
  );
}
