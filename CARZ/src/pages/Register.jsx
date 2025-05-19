import React, { useState } from "react";
import "./Register.css"; // 👈 Ensure this path is correct

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, role } = formData;
    if (!name || !email || !password || !role) {
      setError("All fields are required!");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await fetch("https://localhost:7226/api/Register", { // <-- replace with your backend URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Send data to backend - update if your backend expects 'name'
          email,
          password,
          role,
          name,  // optional, only if your backend supports it
        }),
      });

      if (!response.ok) {
        const errorMsg = await response.text();
        setError(errorMsg || "Registration failed");
        return;
      }

      const result = await response.text();
      setSuccess(result);
      setFormData({ name: "", email: "", password: "", role: "" }); // clear form
    } catch (err) {
      setError("Network error: " + err.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="role-selection">
            <label>
              <input
                type="radio"
                name="role"
                value="owner"
                checked={formData.role === "owner"}
                onChange={handleChange}
              />
              Owner
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="customer"
                checked={formData.role === "customer"}
                onChange={handleChange}
              />
              Customer
            </label>
          </div>
          <button type="submit">Register</button>
        </form>
        <p style={{ marginTop: "10px" }} className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
