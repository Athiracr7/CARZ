import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/theme.css"; // ✅ your theme file

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="bg-primary text-primary"
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* Logo */}
      <img
        src="/carzlogo.png" // ✅ placed in public/logo.png
        alt="CARZ Logo"
        style={{ width: "220px", height: "220px", marginBottom: "10px" }}
      />

      <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "5px" }}>
        CARZ
      </h1>
      <p className="text-secondary" style={{ fontSize: "1.25rem" }}>
        Drive your future
      </p>
    </div>
  );
}
