// ─── SectionBadge.jsx ────────────────────────────────────────────────────────
// Small pill shown above section headings to label the section
// Usage: <SectionBadge icon={<Icons.WAp />} label="Platform Features" color="#a855f7" />

export default function SectionBadge({
  label,
  icon,
  color = "#00f5ff",
}) {
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                 text-[12px] font-semibold font-mono mb-6"
      style={{
        border:     `0.5px solid ${color}40`,
        background: `${color}08`,
        color,
      }}
    >
      {icon && (
        <span className="flex items-center w-[13px] h-[13px]">{icon}</span>
      )}
      {label}
    </div>
  );
}
