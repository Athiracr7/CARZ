import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditCar.css";

export default function EditCar() {
  const navigate = useNavigate();
  const [carData, setCarData] = useState({ id: "", brand: "", model: "", location: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    // ✅ Retrieve car details (including ID) from localStorage
    const savedCar = JSON.parse(localStorage.getItem("carToEdit"));
    if (savedCar) setCarData(savedCar); // ✅ Keep the existing ID, only update other fields
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!carData.id) {
      setMessage("Error: Car ID is missing!");
      return;
    }

    try {
      // ✅ Send only brand, model, and location, while keeping the ID
      const response = await axios.put(`https://localhost:7226/api/OwnerDashboard/${carData.id}`, {
        brand: carData.brand,
        model: carData.model,
        location: carData.location,
      });

      if (response.status === 200) {
        setMessage("Car updated successfully!");
        setTimeout(() => navigate("/ownerdashboard"), 1500); // ✅ Redirect after success
      }
    } catch (error) {
      setMessage("Failed to update car. Try again.");
      console.error("Error updating car:", error);
    }
  };

  return (
    <div className="edit-car-container">
      <h1>Edit Car</h1>
      {message && <p className={`status-message ${message.includes("failed") ? "error" : "success"}`}>{message}</p>}
      <form className="edit-car-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Brand" value={carData.brand} onChange={(e) => setCarData({ ...carData, brand: e.target.value })} />
        <input type="text" placeholder="Model" value={carData.model} onChange={(e) => setCarData({ ...carData, model: e.target.value })} />
        <input type="text" placeholder="Location" value={carData.location} onChange={(e) => setCarData({ ...carData, location: e.target.value })} />
        <button type="submit">Update Car</button>
      </form>
    </div>
  );
}
