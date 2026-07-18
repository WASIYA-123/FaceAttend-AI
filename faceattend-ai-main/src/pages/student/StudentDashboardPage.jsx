// ─── StudentDashboardPage.jsx ────────────────────────────────────────────────
// Wires StudentLayout + all student sub-routes via React Router
// Usage: routed at "/student/*" in App.jsx

import { Routes, Route, Navigate } from "react-router-dom";
import StudentLayout      from "@/components/dashboard/student/StudentLayout";
import StudentOverview    from "@/components/dashboard/student/StudentOverview";
import SubjectAttendance  from "@/components/dashboard/student/SubjectAttendance";
import AttendanceHistory  from "@/components/dashboard/student/AttendanceHistory";
import StudentProfile     from "@/components/dashboard/student/StudentProfile";

export default function StudentDashboardPage() {
  return (
    <Routes>
      <Route element={<StudentLayout />}>
        <Route index              element={<Navigate to="overview" replace />} />
        <Route path="overview"   element={<StudentOverview />}    />
        <Route path="subjects"   element={<SubjectAttendance />}  />
        <Route path="history"    element={<AttendanceHistory />}  />
        <Route path="profile"    element={<StudentProfile />}     />
        <Route path="*"          element={<Navigate to="overview" replace />} />
      </Route>
    </Routes>
  );
}
