// ─── useAuth.js ──────────────────────────────────────────────────────────────
// JWT auth hook — get current user, role, login, logout
import { useState, useEffect } from "react";
import { useNavigate }         from "react-router-dom";
import { ROUTES }              from "@/constants/routes";

const ROLE_ROUTE = {
  admin:   ROUTES.ADMIN.OVERVIEW,
  teacher: ROUTES.TEACHER.OVERVIEW,
  student: ROUTES.STUDENT.OVERVIEW,
};

export function useAuth() {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // decode JWT payload (base64)
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload);
      } catch {
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser(payload);
      navigate(ROLE_ROUTE[payload.role] || ROUTES.HOME);
    } catch {
      console.error("Invalid token");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate(ROUTES.LOGIN);
  };

  return { user, loading, login, logout, isAdmin: user?.role==="admin",
           isTeacher: user?.role==="teacher", isStudent: user?.role==="student" };
}
