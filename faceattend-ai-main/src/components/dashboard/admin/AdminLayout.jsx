// ─── AdminLayout.jsx ─────────────────────────────────────────────────────────
// Shell layout: sidebar + topbar + page content outlet
// Usage: wraps all admin pages via React Router <Outlet />

import { useState }    from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion }      from "framer-motion";
import AdminSidebar    from "./AdminSidebar";
import AdminTopbar     from "./AdminTopbar";
import PageWrapper     from "@/components/ui/PageWrapper";

// map route → page title
const PAGE_TITLES = {
  "/admin/overview":    "Overview",
  "/admin/students":    "Student Management",
  "/admin/teachers":    "Teacher Management",
  "/admin/courses":     "Course Management",
  "/admin/analytics":   "Attendance Analytics",
  "/admin/ai-training": "AI Training Upload",
  "/admin/reports":     "Reports & Export",
  "/admin/settings":    "Settings",
};

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const pageTitle = PAGE_TITLES[location.pathname] || "Admin Dashboard";

  return (
    <PageWrapper className="flex h-screen overflow-hidden">

      {/* ── sidebar ───────────────────────────────────────────────────── */}
      <AdminSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* ── main area ─────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* topbar */}
        <AdminTopbar pageTitle={pageTitle} />

        {/* page content */}
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0  }}
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
