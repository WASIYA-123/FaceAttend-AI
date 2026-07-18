// ─── SectionWrapper.jsx ──────────────────────────────────────────────────────
// Standard section container: dark bg + padding + max-width
// Usage: <SectionWrapper id="features" bg="dark">...</SectionWrapper>

export default function SectionWrapper({
  children,
  id,
  className = "",
  bg        = "dark",   // "dark" = #07070f | "darker" = #030306
}) {
  const bgClass =
    bg === "darker" ? "bg-[#030306]" : "bg-[#07070f]";

  return (
    <section
      id={id}
      className={`relative py-32 overflow-hidden ${bgClass} ${className}`}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {children}
      </div>
    </section>
  );
}
