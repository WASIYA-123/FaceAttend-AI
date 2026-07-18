// ─── Icons.jsx ───────────────────────────────────────────────────────────────
// All SVG icons used across FaceAttend AI
// Usage: import { Icons } from "@/components/shared"
//        <Icons.Camera className="w-5 h-5" />

const base = {
  fill:            "none",
  stroke:          "currentColor",
  strokeWidth:     "1.6",
  strokeLinecap:   "round",
  strokeLinejoin:  "round",
  viewBox:         "0 0 24 24",
};

const Icon = (paths) =>
  function IconComponent({ className = "w-5 h-5", style, color }) {
    return (
      <svg {...base} className={className} style={style} color={color}>
        {paths}
      </svg>
    );
  };

export const Icons = {
  // ── Navigation ─────────────────────────────────────────────────────────────
  Menu: Icon(<>
    <line x1="3" y1="6"  x2="21" y2="6"  />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </>),

  X: Icon(<>
    <line x1="18" y1="6"  x2="6"  y2="18" />
    <line x1="6"  y1="6"  x2="18" y2="18" />
  </>),

  ChevronDown: Icon(
    <polyline points="6 9 12 15 18 9" />
  ),

  ChevronRight: Icon(
    <polyline points="9 18 15 12 9 6" />
  ),

  ChevronLeft: Icon(
    <polyline points="15 18 9 12 15 6" />
  ),

  ArrowRight: Icon(<>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </>),

  ArrowLeft: Icon(<>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </>),

  // ── AI / Tech ──────────────────────────────────────────────────────────────
  Camera: Icon(<>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </>),

  Brain: Icon(<>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44
      2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58
      2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44
      2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58
      2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
  </>),

  Cpu: Icon(<>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6"  height="6"  />
    <line x1="9"  y1="1"  x2="9"  y2="4"  />
    <line x1="15" y1="1"  x2="15" y2="4"  />
    <line x1="9"  y1="20" x2="9"  y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9"  x2="23" y2="9"  />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1"  y1="9"  x2="4"  y2="9"  />
    <line x1="1"  y1="14" x2="4"  y2="14" />
  </>),

  WAp: Icon(
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  ),

  Scan: Icon(<>
    <path d="M3 7V5a2 2 0 0 1 2-2h2"  />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <line x1="3" y1="12" x2="21" y2="12" />
  </>),

  Eye: Icon(<>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </>),

  // ── Analytics / Dashboard ──────────────────────────────────────────────────
  BarChart: Icon(<>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4"  />
    <line x1="6"  y1="20" x2="6"  y2="14" />
  </>),

  TrendingUp: Icon(<>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </>),

  PieChart: Icon(<>
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
    <path d="M22 12A10 10 0 0 0 12 2v10z"     />
  </>),

  Activity: Icon(
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  ),

  // ── Users / People ─────────────────────────────────────────────────────────
  Users: Icon(<>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75"  />
  </>),

  User: Icon(<>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </>),

  UserCheck: Icon(<>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <polyline points="16 11 18 13 22 9" />
  </>),

  UserX: Icon(<>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="17" y1="8"  x2="23" y2="14" />
    <line x1="23" y1="8"  x2="17" y2="14" />
  </>),

  UserPlus: Icon(<>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" y1="8"  x2="19" y2="14" />
    <line x1="16" y1="11" x2="22" y2="11" />
  </>),

  // ── Security / Auth ────────────────────────────────────────────────────────
  Shield: Icon(
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  ),

  Lock: Icon(<>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </>),

  Key: Icon(<>
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778
      5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </>),

  // ── Data / Files ───────────────────────────────────────────────────────────
  Database: Icon(<>
    <ellipse cx="12" cy="5"  rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </>),

  File: Icon(<>
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <polyline points="13 2 13 9 20 9" />
  </>),

  Download: Icon(<>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </>),

  Upload: Icon(<>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </>),

  // ── Communication ──────────────────────────────────────────────────────────
  Mail: Icon(<>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </>),

  Bell: Icon(<>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0"                  />
  </>),

  // ── Misc / UI ──────────────────────────────────────────────────────────────
  Globe: Icon(<>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10
             15.3 15.3 0 0 1-4 10
             15.3 15.3 0 0 1-4-10
             15.3 15.3 0 0 1 4-10z" />
  </>),

  Layers: Icon(<>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17"         />
    <polyline points="2 12 12 17 22 12"         />
  </>),

  Settings: Icon(<>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06
      a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09
      A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83
      l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09
      A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83
      l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09
      a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83
      l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09
      a1.65 1.65 0 0 0-1.51 1z" />
  </>),

  Check: Icon(
    <polyline points="20 6 9 17 4 12" strokeWidth="2.5" />
  ),

  Plus: Icon(<>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </>),

  Minus: Icon(
    <line x1="5" y1="12" x2="19" y2="12" />
  ),

  Search: Icon(<>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </>),

  Filter: Icon(<>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </>),

  Edit: Icon(<>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"    />
  </>),

  Trash: Icon(<>
    <polyline points="3 6 5 6 21 6"                      />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6"                                   />
    <path d="M14 11v6"                                   />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"   />
  </>),

  Calendar: Icon(<>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2"  x2="16" y2="6"  />
    <line x1="8"  y1="2"  x2="8"  y2="6"  />
    <line x1="3"  y1="10" x2="21" y2="10" />
  </>),

  Clock: Icon(<>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </>),

  Star: Icon(
    <polygon
      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      fill="currentColor"
      strokeWidth="0"
    />
  ),

  // ── Social ─────────────────────────────────────────────────────────────────
  Github: ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385
        .6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41
        -.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23
        1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925
        0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23
        .96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23
        .66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925
        .435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57
        A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),

  Twitter: ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68
        l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),

  Linkedin: ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),

  // ── Attendance Status ──────────────────────────────────────────────────────
  Present: Icon(<>
    <circle cx="12" cy="12" r="10" />
    <polyline points="8 12 11 15 16 9" strokeWidth="2" />
  </>),

  Absent: Icon(<>
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" strokeWidth="2" />
    <line x1="9" y1="9" x2="15" y2="15" strokeWidth="2" />
  </>),

  Warning: Icon(<>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9"  x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </>),

  Play: Icon(
    <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" strokeWidth="0" />
  ),

  Stop: Icon(
    <rect x="4" y="4" width="16" height="16" rx="2" fill="currentColor" strokeWidth="0" />
  ),

  Video: Icon(<>
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </>),
};

export default Icons;
