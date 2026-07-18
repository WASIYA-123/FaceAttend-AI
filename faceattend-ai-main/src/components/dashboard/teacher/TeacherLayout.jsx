// ─── TeacherLayout.jsx ───────────────────────────────────────────────────────
// Shell layout: sidebar + topbar + page content outlet
// Usage: wraps all teacher pages via React Router <Outlet />

import { useState }           from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion }             from "framer-motion";
import TeacherSidebar         from "./TeacherSidebar";
import TeacherTopbar          from "./TeacherTopbar";
import PageWrapper            from "@/components/ui/PageWrapper";

const PAGE_TITLES = {
  "/teacher/overview":    "Overview",
  "/teacher/start-attendance": "Start Attendance",
  "/teacher/history":     "Attendance History",
  "/teacher/reports":     "Course Reports",
  "/teacher/correction":  "Manual Correction",
  "/teacher/settings":    "Settings",
};

export default function TeacherLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location  = useLocation();
  const pageTitle = PAGE_TITLES[location.pathname] || "Teacher Dashboard";

  return (
    <PageWrapper className="flex h-screen overflow-hidden">
      <TeacherSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TeacherTopbar pageTitle={pageTitle} />
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex-1 overflow-y-auto p-6
                     scrollbar-thin scrollbar-thumb-white/10"
        >
          <Outlet />
        </motion.main>
      </div>
    </PageWrapper>
  );
}
