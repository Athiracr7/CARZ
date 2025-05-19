import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./OwnerDashboard.css";
import { handleLogout } from "../utils/auth";

export default function OwnerDashboard() {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [searchedCar, setSearchedCar] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const ownerId = localStorage.getItem("ownerId");

  useEffect(() => {
    if (ownerId) {
      axios.get(`https://localhost:7226/api/OwnerDashboard/${ownerId}`)
        .then((response) => setCars(response.data))
        .catch((error) => console.error("Error fetching cars:", error));
    }
  }, [ownerId]);

  // ✅ Handle Backend Search
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
        setMessage("Please enter a valid car ID!");
        return;
    }

    try {
        setMessage("");
        setLoading(true);
        console.log(`Fetching car with ID: ${searchTerm}`);
        
        const response = await axios.get(`https://localhost:7226/api/OwnerDashboard/car/${searchTerm}`);

        if (!response.data || Object.keys(response.data).length === 0) {
            setMessage("Car not found!");
            setSearchedCar(null);
            setLoading(false);
            return;
        }

        setSearchedCar(response.data);
        setMessage("");
        setLoading(false);
    } catch (error) {
        console.error("Error fetching car:", error);
        setMessage("Error fetching car. Please try again!");
        setSearchedCar(null);
        setLoading(false);
    }
  };

  // ✅ Handle Car Deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7226/api/OwnerDashboard/${id}`);
      setCars(cars.filter(car => car.id !== id));
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
  <h1 className="dashboard-title">Owner Dashboard</h1>
  <div className="header-buttons">
    <button className="add-car-btn" onClick={() => navigate("/addcar")}>+ Add Car</button>
    <button className="logout-btn" onClick={handleLogout}>Logout</button>
  </div>
</header>


      {/* Search Bar */}
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search ID..." 
          className="search-input" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearch}>Search</button>
        <button className="clear-btn" onClick={() => { setSearchTerm(""); setSearchedCar(null); }}>Clear</button>
      </div>

      {loading && <p className="loading-message">🔄 Searching...</p>}
      {message && <p className="error-message">{message}</p>}

      {/* Search Results */}
      {searchedCar && (
        <>
          <h2 className="search-result-heading">Search Result</h2>
          <div className="car-card">
            <h3>{searchedCar.brand} {searchedCar.model}</h3>
            <p>Location: {searchedCar.location}</p>
            <p>Car ID: {searchedCar.id}</p>
            <button className="edit-btn" onClick={() => {
              localStorage.setItem("carToEdit", JSON.stringify(searchedCar));
              navigate("/editcar");
            }}>Edit</button>
            <button className="delete-btn" onClick={() => handleDelete(searchedCar.id)}>Remove</button>
          </div>
        </>
      )}

      {/* Car List (Always Visible) */}
      <h2 className="available-cars-heading">Listed Cars</h2>
      <div className="cars-container">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div key={car.id} className="car-card">
              <h3>{car.brand} {car.model}</h3>
              <p>Location: {car.location}</p>
              <p>Car ID: {car.id}</p>
              <button className="edit-btn" onClick={() => {
                localStorage.setItem("carToEdit", JSON.stringify(car));
                navigate("/editcar");
              }}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(car.id)}>Remove</button>
            </div>
          ))
        ) : (
          <p className="no-cars">No cars found.</p>
        )}
      </div>
    </div>
  );
}
