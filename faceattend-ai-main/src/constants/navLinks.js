// ─── Navigation Links ─────────────────────────────────────────────────────────
import { ROUTES } from "./routes";

export const LANDING_NAV = [
  { label: "Features",     href: "#features"      },
  { label: "AI Workflow",  href: "#workflow"       },
  { label: "Architecture", href: "#architecture"   },
  { label: "Dashboard",    href: "#dashboard"      },
  { label: "Tech Stack",   href: "#techstack"      },
];

export const ADMIN_NAV = [
  { label: "Overview",     href: ROUTES.ADMIN.OVERVIEW,    icon: "BarChart"  },
  { label: "Students",     href: ROUTES.ADMIN.STUDENTS,    icon: "Users"     },
  { label: "Teachers",     href: ROUTES.ADMIN.TEACHERS,    icon: "UserCheck" },
  { label: "Courses",      href: ROUTES.ADMIN.COURSES,     icon: "Layers"    },
  { label: "Analytics",    href: ROUTES.ADMIN.ANALYTICS,   icon: "PieChart"  },
  { label: "AI Training",  href: ROUTES.ADMIN.AI_TRAINING, icon: "Brain"     },
  { label: "Reports",      href: ROUTES.ADMIN.REPORTS,     icon: "Download"  },
];

export const TEACHER_NAV = [
  { label: "Overview",     href: ROUTES.TEACHER.OVERVIEW,   icon: "BarChart"  },
  { label: "Start Session",href: ROUTES.TEACHER.START,      icon: "Camera"    },
  { label: "History",      href: ROUTES.TEACHER.HISTORY,    icon: "Activity"  },
  { label: "Reports",      href: ROUTES.TEACHER.REPORTS,    icon: "PieChart"  },
  { label: "Correction",   href: ROUTES.TEACHER.CORRECTION, icon: "UserCheck" },
];

export const STUDENT_NAV = [
  { label: "Overview",     href: ROUTES.STUDENT.OVERVIEW,  icon: "BarChart" },
  { label: "Subjects",     href: ROUTES.STUDENT.SUBJECTS,  icon: "Layers"   },
  { label: "History",      href: ROUTES.STUDENT.HISTORY,   icon: "Activity" },
  { label: "Profile",      href: ROUTES.STUDENT.PROFILE,   icon: "User"     },
];
