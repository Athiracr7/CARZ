// src/utils/auth.js
export const handleLogout = () => {
    localStorage.removeItem("ownerId"); // ✅ Clears user session
    window.location.href = "/login"; // ✅ Redirects to login page
  };
  