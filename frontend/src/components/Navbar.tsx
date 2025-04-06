import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "../store/authStore"; // Use logout from authStore
import "../styles/Navbar.css";

export default function Navbar() {
  const { isLoggedIn, checkAuth, logout } = useAuthStore(); // Access logout from authStore
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth(); // Verify authentication status on component mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    try {
      await logout(); // Await the logout function from authStore
      navigate("/login"); // Navigate to the login page after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="navbar">
      <div className="logo">MyApp</div>
      <div className="nav-links">
        <Link className="nav-link" to="/">Home</Link>
        {!isLoggedIn && <Link className="nav-link" to="/register">Register</Link>}
        {isLoggedIn ? (
          <span onClick={handleLogout} className="nav-link logout">Logout</span>
        ) : (
          <Link className="nav-link" to="/login">Login</Link>
        )}
      </div>
    </div>
  );
}