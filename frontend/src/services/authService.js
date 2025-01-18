import axios from "axios";

// Base URL for authentication-related API requests
const API_URL = "/api/auth/";

// Register user
const register = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}register`, {
      name,
      email,
      password,
    });
    return response.data; // Return response (e.g., success message or user data)
  } catch (error) {
    throw error.response?.data?.message || "Registration failed. Please try again.";
  }
};

// Login user
const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}login`, { email, password });
    // If login is successful, store the JWT token in localStorage
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data.token; // Return the JWT token
  } catch (error) {
    throw error.response?.data?.message || "Invalid credentials. Please try again.";
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem("token"); // Remove token from localStorage to log the user out
};

// Get current user information from the decoded JWT token
const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  // Optionally decode the token (you could use a library like jwt-decode)
  const decoded = decodeJwt(token);
  return decoded ? decoded : null;
};

// Decode JWT token
const decodeJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
  } catch (error) {
    return null;
  }
};

// Check if the user is logged in
const isLoggedIn = () => {
  return !!localStorage.getItem("token"); // Returns true if a token is in localStorage
};

// Refresh the token (Optional)
const refreshToken = async () => {
  try {
    const response = await axios.post(`${API_URL}refresh-token`, {
      token: localStorage.getItem("token"),
    });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data.token; // Return the new token
  } catch (error) {
    throw error.response?.data?.message || "Failed to refresh token.";
  }
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  isLoggedIn,
  refreshToken,
};

export default authService;
