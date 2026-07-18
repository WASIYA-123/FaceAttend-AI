// ─── App Routes ───────────────────────────────────────────────────────────────
export const ROUTES = {
  HOME:            "/",
  LOGIN:           "/login",
  REGISTER:        "/register",
  ADMIN: {
    ROOT:          "/admin",
    OVERVIEW:      "/admin/overview",
    STUDENTS:      "/admin/students",
    TEACHERS:      "/admin/teachers",
    COURSES:       "/admin/courses",
    ANALYTICS:     "/admin/analytics",
    AI_TRAINING:   "/admin/ai-training",
    REPORTS:       "/admin/reports",
  },
  TEACHER: {
    ROOT:          "/teacher",
    OVERVIEW:      "/teacher/overview",
    START:         "/teacher/start-attendance",
    HISTORY:       "/teacher/history",
    REPORTS:       "/teacher/reports",
    CORRECTION:    "/teacher/correction",
  },
  STUDENT: {
    ROOT:          "/student",
    OVERVIEW:      "/student/overview",
    SUBJECTS:      "/student/subjects",
    HISTORY:       "/student/history",
    PROFILE:       "/student/profile",
  },
};
