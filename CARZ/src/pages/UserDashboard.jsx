import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserDashboard.css";
import { handleLogout } from "../utils/auth";

export default function UserDashboard() {
  const [cars, setCars] = useState([]);
  const [showBookedCars, setShowBookedCars] = useState(false);
  const [bookedCars, setBookedCars] = useState([]);
  const userId = parseInt(localStorage.getItem("userId"));

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://localhost:7226/api/UserDashBoard`)
      .then((response) => setCars(response.data))
      .catch((error) => console.error("Error fetching available cars:", error));

    axios.get(`https://localhost:7226/api/UserDashboard/bookedCars/${userId}`)
      .then((response) => setBookedCars(response.data))
      .catch((error) => console.error("Error fetching booked cars:", error));
  }, [userId]);

  const handleBookCar = (carId) => {
    const bookingData = {
      carid: carId,
      userid: userId,
    };

    axios.post("https://localhost:7226/api/UserDashBoard", bookingData)
      .then((response) => {
        alert("Car booked successfully!");
        // Refresh booked cars list after booking
        axios.get(`https://localhost:7226/api/UserDashboard/bookedCars/${userId}`)
          .then((res) => setBookedCars(res.data));
      })
      .catch((error) => {
        console.error("Booking failed:", error);
        alert(error.response?.data || "Failed to book car.");
      });
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">User Dashboard</h1>
        <div className="header-buttons">
          <button className="booked-cars-btn" onClick={() => setShowBookedCars(!showBookedCars)}>Booked Cars</button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {/* Booked Cars List */}
      {showBookedCars && (
        <>
          <h2 className="booked-cars-heading">Your Booked Cars</h2>
          <div className="cars-container">
            {bookedCars.length > 0 ? (
              bookedCars.map((car) => (
                <div key={car.id} className="car-card booked-car">
                  <h3>{car.brand} {car.model}</h3>
                  <p>Location: {car.location}</p>
                  <p>Car ID: {car.id}</p>
                  <p className="booked-status">✅ Booked</p>
                </div>
              ))
            ) : (
              <p className="no-cars">You haven’t booked any cars yet.</p>
            )}
          </div>
        </>
      )}

      {/* Available Cars List */}
      <h2 className="available-cars-heading">Available Cars</h2>
      <div className="cars-container">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div key={car.id} className="car-card">
              <h3>{car.brand} {car.model}</h3>
              <p>Location: {car.location}</p>
              <p>Car ID: {car.id}</p>
              <button className="book-btn" onClick={() => handleBookCar(car.id)}>Book Car</button>
            </div>
          ))
        ) : (
          <p className="no-cars">No cars available.</p>
        )}
      </div>
    </div>
  );
}
