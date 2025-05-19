import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import axios from "axios";
import "./AddCar.css";


export default function AddCar() {
  const [carData, setCarData] = useState({ brand: "", model: "", location: "" });
  const ownerId = localStorage.getItem("ownerId"); // ✅ Get logged-in owner ID
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!carData.brand || !carData.model || !carData.location) {
      setMessage("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(`https://localhost:7226/api/OwnerDashboard/${ownerId}`, {
        ...carData,
        ownerId: ownerId, // ✅ Assign car to logged-in owner
      });

      if (response.status === 200) {
        setMessage("Car added successfully!");
        setTimeout(() => navigate("/ownerdashboard"), 1500); // ✅ Redirect after success
        setCarData({ brand: "", model: "", location: "" }); // ✅ Reset form fields
      }
    } catch (error) {
      setMessage("Failed to add car. Try again.");
      console.error("Error adding car:", error);
    }
  };

  return (
    <div className="add-car-container">
      <h1>Add a New Car</h1>
      {message && <p className="status-message">{message}</p>}
      <form className="add-car-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Brand"
          value={carData.brand}
          onChange={(e) => setCarData({ ...carData, brand: e.target.value })}
        />
        <input
          type="text"
          placeholder="Model"
          value={carData.model}
          onChange={(e) => setCarData({ ...carData, model: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={carData.location}
          onChange={(e) => setCarData({ ...carData, location: e.target.value })}
        />
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
}
