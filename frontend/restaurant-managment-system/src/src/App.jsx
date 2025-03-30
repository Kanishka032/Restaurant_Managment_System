import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import LoginForm from "./REstaurant_MAnagment/LoginForm";
import ManagerDashBoard from "./REstaurant_MAnagment/ManagerDashBoard";
import StaffDashboard from "./REstaurant_MAnagment/StaffDashBoard";
import restaurantImage from "./assets/restaurant_image.jpg";

function Home() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f8f8f8",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 1.25rem",
          backgroundColor: "#222",
          color: "white",
          borderBottom: "3px solid #ffcc00",
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none",
            color: "white",
            border: "none",
            fontSize: "1.25rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Home
        </button>
        <button
          onClick={() => navigate("/login")}
          style={{
            backgroundColor: "#ffcc00",
            color: "#222",
            border: "none",
            padding: "0.5rem 1rem",
            fontSize: "1.125rem",
            fontWeight: "bold",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </nav>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          flexGrow: 1,
          padding: "2rem",
          gap: "2rem",
        }}
      >
        <img
          src={restaurantImage}
          alt="Restaurant Management"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            objectFit: "cover",
            padding: "1rem",
          }}
        />
        <marquee
          direction="up"
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#222",
            height: "500px", // Increased height of marquee
            display: "flex",
            flexDirection: "column", // Stack items vertically
            justifyContent: "center", // Center vertically
            alignItems: "center", // Center horizontally
            textAlign: "center" // Center text inside
          }}
        >
          <div>Welcome to Our Restaurant Management System!</div>
          <div>Manage Orders, Tables, and Staff with Ease.</div>
          <div>Enjoy the best dining experience with us.</div>
          <div>Efficiently handle reservations and inventory.</div>
          <div>Streamline your restaurant operations today!</div>
        </marquee>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/manager-dashboard" element={<ManagerDashBoard />} />
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;