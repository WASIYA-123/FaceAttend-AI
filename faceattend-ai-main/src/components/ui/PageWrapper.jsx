// ─── PageWrapper.jsx ─────────────────────────────────────────────────────────
// Root dark background wrapper for every page in the app
// Usage: <PageWrapper>...</PageWrapper>

export default function PageWrapper({ children, className = "" }) {
  return (
    <div
      className={`min-h-screen bg-[#07070f] text-white overflow-x-hidden ${className}`}
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}
