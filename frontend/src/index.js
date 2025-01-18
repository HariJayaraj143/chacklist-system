import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Main App component
import "./index.css"; // Optional: your global styles (you can customize or use a framework like Bootstrap)

const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering the App component wrapped with a Router (for routing functionality)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
