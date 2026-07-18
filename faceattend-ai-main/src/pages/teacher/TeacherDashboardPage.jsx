// ─── TeacherDashboardPage.jsx ────────────────────────────────────────────────
// Wires TeacherLayout + all teacher sub-routes via React Router
// Usage: routed at "/teacher/*" in App.jsx

import { Routes, Route, Navigate } from "react-router-dom";
import TeacherLayout      from "@/components/dashboard/teacher/TeacherLayout";
import TeacherOverview    from "@/components/dashboard/teacher/TeacherOverview";
import StartAttendance    from "@/components/dashboard/teacher/StartAttendance";
import AttendanceHistory  from "@/components/dashboard/teacher/AttendanceHistory";
import CourseReports      from "@/components/dashboard/teacher/CourseReports";
import ManualCorrection   from "@/components/dashboard/teacher/ManualCorrection";

export default function TeacherDashboardPage() {
  return (
    <Routes>
      <Route element={<TeacherLayout />}>
        <Route index                      element={<Navigate to="overview" replace />} />
        <Route path="overview"            element={<TeacherOverview />}   />
        <Route path="start-attendance"    element={<StartAttendance />}   />
        <Route path="history"             element={<AttendanceHistory />} />
        <Route path="reports"             element={<CourseReports />}     />
        <Route path="correction"          element={<ManualCorrection />}  />
        <Route path="*"                   element={<Navigate to="overview" replace />} />
      </Route>
    </Routes>
  );
}
