import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="logo">
        <div className="signal">
          <span className="light red"></span>
          <span className="light yellow"></span>
          <span className="light green"></span>
        </div>
        <span className="logo-text">TRAFFIC-AI</span>
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <NavLink to="/" className="nav-item">
          Prediction Model
        </NavLink>
        <NavLink to="/dataset" className="nav-item">
          Dataset Info
        </NavLink>
      </div>
    </nav>
  );
}