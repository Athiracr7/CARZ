import React, { useState } from "react";
import axios from "axios"; // Import axios for API calls
import "./Login.css"; // Import CSS for styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error on new attempt

    // Validation
    if (!email || !password) {
      setError("Both fields are required!");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email address!");
      return;
    }

    try {
      // API Call
      const response = await axios.post("https://localhost:7226/api/Login", {
        email,
        password,
      });

      if (response.status === 200) {
        const user = response.data;

        // Store ownerId and role
        localStorage.setItem("ownerId", user.id); // ✅ Store Owner ID
        localStorage.setItem("userRole", user.role);   // ✅ Store Role

        // Redirect based on role
        if (user.role === "owner") {
          window.location.href = "/ownerdashboard";
        } else if (user.role === "customer") {
          window.location.href = "/userdashboard";
        } else {
          setError("Unknown user role.");
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError("Login failed. Try again later.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">Login</button>
          <p className="register-link">
            New here? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
