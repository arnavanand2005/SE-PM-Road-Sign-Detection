import "../styles/DatasetInfo.css";
import { CiLinkedin } from "react-icons/ci";

import arnav from "../assets/arnav.png";
import ansh from "../assets/ansh.png";
import himesh from "../assets/himesh.png";

const classNames = [
  "Speed limit (20km/h)",
  "Speed limit (30km/h)",
  "Speed limit (50km/h)",
  "Speed limit (60km/h)",
  "Speed limit (70km/h)",
  "Speed limit (80km/h)",
  "End of speed limit (80km/h)",
  "Speed limit (100km/h)",
  "Speed limit (120km/h)",
  "No passing",
  "No passing for vehicles over 3.5 tons",
  "Right-of-way at the next intersection",
  "Priority road",
  "Yield",
  "Stop",
  "No vehicles",
  "Vehicles over 3.5 tons prohibited",
  "No entry",
  "General caution",
  "Dangerous curve to the left",
  "Dangerous curve to the right",
  "Double curve",
  "Bumpy road",
  "Slippery road",
  "Road narrows on the right",
  "Road work",
  "Traffic signals",
  "Pedestrians",
  "Children crossing",
  "Bicycles crossing",
  "Beware of ice/snow",
  "Wild animals crossing",
  "End of all speed and passing limits",
  "Turn right ahead",
  "Turn left ahead",
  "Ahead only",
  "Go straight or right",
  "Go straight or left",
  "Keep right",
  "Keep left",
  "Roundabout mandatory",
  "End of no passing",
  "End of no passing by vehicles over 3.5 tons"
];

export default function DatasetInfo() {
  return (
    <div className="dataset">

      {/* ===== DATASET OVERVIEW ===== */}
      <h2>DATASET OVERVIEW</h2>
      <div className="dataset-box">
        <p><b>Name:</b> GTSRB (German Traffic Sign Recognition Benchmark)</p>
        <p><b>Classes:</b> 43 Traffic Sign Categories</p>
        <p><b>Task:</b> Image Classification</p>
        <p><b>Applications:</b> Autonomous Driving & ADAS</p>
      </div>

      {/* ===== TEAM SECTION ===== */}
      <h2 className="team-heading">
        MEET THE TEAM <span className="wave">👋</span>
      </h2>

      <div className="team-container">
        <div className="team-card">
          <img src={arnav} alt="Arnav Anand" />
          <h3>Arnav Anand</h3>
          <p className="role">ML Engineer & Full Stack</p>
          <CiLinkedin className="linkedin-icon" />
        </div>

        <div className="team-card">
          <img src={ansh} alt="Ansh Mathur" />
          <h3>Ansh Mathur</h3>
          <p className="role">Scrum Master</p>
          <CiLinkedin className="linkedin-icon" />
        </div>

        <div className="team-card">
          <img src={himesh} alt="Nigesh Sahoo" />
          <h3>Nigesh Sahoo</h3>
          <p className="role">Product Owner</p>
          <CiLinkedin className="linkedin-icon" />
        </div>
      </div>

      {/* ===== TRAFFIC SIGNS SECTION ===== */}
      <h2>TRAFFIC SIGN CLASSES</h2>

      <div className="signs-grid">
        {classNames.map((name, index) => (
          <div className="sign-card" key={index}>
            <span className="sign-index">{index + 1}</span>
            <p className="sign-name">{name}</p>
          </div>
        ))}
      </div>

    </div>
  );
}