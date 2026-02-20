import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">🚦 TRAFFIC-AI</div>
      <div className="nav-links">
        <Link to="/">Prediction Model</Link>
        <Link to="/dataset">Dataset Info</Link>
      </div>
    </nav>
  );
}