// ─── auth.js ─────────────────────────────────────────────────────────────────
// JWT helpers
export const getToken  = ()      => localStorage.getItem("token");
export const setToken  = (t)     => localStorage.setItem("token", t);
export const clearToken = ()     => localStorage.removeItem("token");
export const isLoggedIn = ()     => !!getToken();

export const getRole = () => {
  try {
    const token = getToken();
    if (!token) return null;
    return JSON.parse(atob(token.split(".")[1]))?.role || null;
  } catch { return null; }
};
