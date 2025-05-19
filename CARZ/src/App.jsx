import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Splash from "./components/Splash";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";
import { AuthProvider } from "./components/AuthContext"; // ✅ Import Auth Context

function App() {
  return (
    <AuthProvider> {/* ✅ Wrap entire app in AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/ownerdashboard" element={<OwnerDashboard />} />
          <Route path="/addcar" element={<AddCar />} />
          <Route path="/editcar" element={<EditCar />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
