import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

// Pages
import LandingPage          from "@/pages/landing/LandingPage";
import LoginPage            from "@/pages/auth/LoginPage";
import RegisterPage         from "@/pages/auth/RegisterPage";
import AdminDashboardPage   from "@/pages/admin/AdminDashboardPage";
import TeacherDashboardPage from "@/pages/teacher/TeacherDashboardPage";
import StudentDashboardPage from "@/pages/student/StudentDashboardPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route path={ROUTES.HOME}     element={<LandingPage />} />

        {/* Auth */}
        <Route path={ROUTES.LOGIN}    element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

        {/* Admin */}
        <Route path="/admin/*"        element={<AdminDashboardPage />} />

        {/* Teacher */}
        <Route path="/teacher/*"      element={<TeacherDashboardPage />} />

        {/* Student */}
        <Route path="/student/*"      element={<StudentDashboardPage />} />

        {/* Fallback */}
        <Route path="*"              element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
