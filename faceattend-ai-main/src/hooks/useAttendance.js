// ─── useAttendance.js ────────────────────────────────────────────────────────
// Fetch attendance data from backend API
import { useState, useEffect } from "react";
import api from "@/utils/api";

export function useAttendance(courseId = null) {
  const [data,    setData]    = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const url = courseId ? `/attendance?courseId=${courseId}` : "/attendance";
        const res = await api.get(url);
        setData(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [courseId]);

  return { data, loading, error };
}
