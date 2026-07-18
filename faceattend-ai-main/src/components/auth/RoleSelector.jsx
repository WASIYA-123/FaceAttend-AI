// ─── RoleSelector.jsx ────────────────────────────────────────────────────────
// Role picker used on Login + Register — Admin / Teacher / Student
// Usage: <RoleSelector selected={role} onChange={setRole} />

import { motion } from "framer-motion";
import { Icons }  from "@/components/shared/Icons";

const ROLES = [
  {
    id:    "admin",
    label: "Admin",
    desc:  "Full system control",
    icon:  <Icons.Shield  className="w-5 h-5" />,
    color: "#00f5ff",
  },
  {
    id:    "teacher",
    label: "Teacher",
    desc:  "Manage sessions",
    icon:  <Icons.Camera  className="w-5 h-5" />,
    color: "#a855f7",
  },
  {
    id:    "student",
    label: "Student",
    desc:  "View attendance",
    icon:  <Icons.User    className="w-5 h-5" />,
    color: "#3b82f6",
  },
];

export default function RoleSelector({ selected, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {ROLES.map((role) => {
        const isActive = selected === role.id;
        return (
          <motion.button
            key={role.id}
            type="button"
            onClick={() => onChange(role.id)}
            whileHover={{ y: -2, transition: { duration: 0.15 } }}
            whileTap={{ scale: 0.97 }}
            className="relative flex flex-col items-center gap-2 p-4
                       rounded-xl border transition-all duration-200
                       overflow-hidden text-center"
            style={{
              border: isActive
                ? `1px solid ${role.color}60`
                : "1px solid rgba(255,255,255,0.07)",
              background: isActive
                ? `${role.color}12`
                : "rgba(255,255,255,0.02)",
            }}
          >
            {/* active glow */}
            {isActive && (
              <motion.div
                layoutId="role-glow"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center,
                    ${role.color}10 0%, transparent 70%)`,
                }}
              />
            )}

            {/* icon */}
            <div
              className="w-10 h-10 rounded-xl flex items-center
                         justify-center flex-shrink-0"
              style={{
                background: isActive ? `${role.color}20` : "rgba(255,255,255,0.04)",
                color:       isActive ? role.color : "rgba(255,255,255,0.35)",
              }}
            >
              {role.icon}
            </div>

            {/* label */}
            <span
              className="text-[12px] font-bold leading-tight"
              style={{ color: isActive ? role.color : "rgba(255,255,255,0.5)" }}
            >
              {role.label}
            </span>

            {/* desc */}
            <span className="text-[10px] text-white/25 leading-tight hidden sm:block">
              {role.desc}
            </span>

            {/* active checkmark */}
            {isActive && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-4 h-4 rounded-full
                           flex items-center justify-center"
                style={{ background: role.color }}
              >
                <Icons.Check className="w-2.5 h-2.5 text-black" />
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
