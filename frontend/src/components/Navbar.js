import React from "react";
import { Link } from "react-router-dom";
import authService from "../services/authService";

const Navbar = ({ isAuthenticated }) => {
  const handleLogout = () => {
    authService.logout(); // Log the user out
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
