import { createContext, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const handleLogout = () => {
    localStorage.removeItem("ownerId"); // ✅ Remove user session
    window.location.href = "/login"; // ✅ Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use in any component
export const useAuth = () => useContext(AuthContext);
