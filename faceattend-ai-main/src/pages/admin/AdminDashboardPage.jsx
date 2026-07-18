// ─── AdminDashboardPage.jsx ──────────────────────────────────────────────────
// Wires AdminLayout + all admin sub-routes via React Router
// Usage: routed at "/admin/*" in App.jsx

import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout         from "@/components/dashboard/admin/AdminLayout";
import AdminOverview       from "@/components/dashboard/admin/AdminOverview";
import StudentManagement   from "@/components/dashboard/admin/StudentManagement";
import TeacherManagement   from "@/components/dashboard/admin/TeacherManagement";
import CourseManagement    from "@/components/dashboard/admin/CourseManagement";
import AttendanceAnalytics from "@/components/dashboard/admin/AttendanceAnalytics";
import AITrainingUpload    from "@/components/dashboard/admin/AITrainingUpload";
import ReportsExport       from "@/components/dashboard/admin/ReportsExport";

export default function AdminDashboardPage() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index                  element={<Navigate to="overview" replace />} />
        <Route path="overview"        element={<AdminOverview />}       />
        <Route path="students"        element={<StudentManagement />}   />
        <Route path="teachers"        element={<TeacherManagement />}   />
        <Route path="courses"         element={<CourseManagement />}    />
        <Route path="analytics"       element={<AttendanceAnalytics />} />
        <Route path="ai-training"     element={<AITrainingUpload />}    />
        <Route path="reports"         element={<ReportsExport />}       />
        <Route path="*"               element={<Navigate to="overview" replace />} />
      </Route>
    </Routes>
  );
}
