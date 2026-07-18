// ─── useScrollDetect.js ──────────────────────────────────────────────────────
// Returns true when page scrollY > threshold
import { useState, useEffect } from "react";

export function useScrollDetect(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return scrolled;
}
