// ─── StudentLayout.jsx ───────────────────────────────────────────────────────
// Shell layout: sidebar + topbar + page outlet
// Usage: wraps all student pages via React Router <Outlet />

import { useState }           from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion }             from "framer-motion";
import StudentSidebar         from "./StudentSidebar";
import StudentTopbar          from "./StudentTopbar";
import PageWrapper            from "@/components/ui/PageWrapper";

const PAGE_TITLES = {
  "/student/overview":  "My Attendance",
  "/student/subjects":  "Subject Attendance",
  "/student/history":   "Attendance History",
  "/student/profile":   "My Profile",
  "/student/settings":  "Settings",
};

export default function StudentLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location  = useLocation();
  const pageTitle = PAGE_TITLES[location.pathname] || "Student Dashboard";

  return (
    <PageWrapper className="flex h-screen overflow-hidden">
      <StudentSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <StudentTopbar pageTitle={pageTitle} />
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
