import "../styles/DatasetInfo.css";
import { CiLinkedin } from "react-icons/ci";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

import arnav from "../assets/arnav.png";
import ansh from "../assets/ansh.png";
import himesh from "../assets/himesh.png";

/* ================== CHART REGISTRATION ================== */
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

/* ================== TRAFFIC SIGN CLASSES ================== */
const classNames = [
  "Speed limit (20km/h)", "Speed limit (30km/h)", "Speed limit (50km/h)",
  "Speed limit (60km/h)", "Speed limit (70km/h)", "Speed limit (80km/h)",
  "End of speed limit (80km/h)", "Speed limit (100km/h)", "Speed limit (120km/h)",
  "No passing", "No passing for vehicles over 3.5 tons",
  "Right-of-way at the next intersection", "Priority road", "Yield", "Stop",
  "No vehicles", "Vehicles over 3.5 tons prohibited", "No entry",
  "General caution", "Dangerous curve to the left", "Dangerous curve to the right",
  "Double curve", "Bumpy road", "Slippery road", "Road narrows on the right",
  "Road work", "Traffic signals", "Pedestrians", "Children crossing",
  "Bicycles crossing", "Beware of ice/snow", "Wild animals crossing",
  "End of all speed and passing limits", "Turn right ahead", "Turn left ahead",
  "Ahead only", "Go straight or right", "Go straight or left",
  "Keep right", "Keep left", "Roundabout mandatory",
  "End of no passing", "End of no passing by vehicles over 3.5 tons"
];

/* ================== TRAINING DATA ================== */
const epochs = [1,2,3,4,5,6,7,8,9,10];

const accuracyData = {
  labels: epochs,
  datasets: [
    {
      label: "Training Accuracy",
      data: [65,72,78,83,87,89,91,93,94,95],
      borderColor: "#22c55e",
      backgroundColor: "rgba(34,197,94,0.15)",
      tension: 0.4
    },
    {
      label: "Validation Accuracy",
      data: [62,70,75,80,84,86,87,88,88.5,89],
      borderColor: "#facc15",
      backgroundColor: "rgba(250,204,21,0.15)",
      tension: 0.4
    }
  ]
};

const lossData = {
  labels: epochs,
  datasets: [
    {
      label: "Training Loss",
      data: [1.2,0.9,0.7,0.55,0.42,0.35,0.28,0.22,0.19,0.16],
      borderColor: "#dc2626",
      backgroundColor: "rgba(220,38,38,0.15)",
      tension: 0.4
    },
    {
      label: "Validation Loss",
      data: [1.3,1.0,0.8,0.65,0.55,0.5,0.47,0.45,0.44,0.43],
      borderColor: "#38bdf8",
      backgroundColor: "rgba(56,189,248,0.15)",
      tension: 0.4
    }
  ]
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { labels: { color: "#e5e7eb" } }
  },
  scales: {
    x: { ticks: { color: "#9ca3af" }, grid: { color: "#1f2937" } },
    y: { ticks: { color: "#9ca3af" }, grid: { color: "#1f2937" } }
  }
};

export default function DatasetInfo() {
  return (
    <div className="dataset">

      {/* ================== DATASET OVERVIEW ================== */}
      <h2>DATASET OVERVIEW</h2>
      <div className="dataset-box">
        <p><b>Name:</b> German Traffic Sign Recognition Benchmark (GTSRB)</p>
        <p><b>Total Classes:</b> 43</p>
        <p><b>Task:</b> Multi-class Image Classification</p>
        <p><b>Application:</b> Autonomous Driving, ADAS, Smart Traffic Systems</p>
      </div>

      <div className="dataset-link-box">
        <p>📂 Official Dataset Source</p>
        <a
          href="https://benchmark.ini.rub.de/gtsrb_dataset.html"
          target="_blank"
          rel="noreferrer"
        >
          https://benchmark.ini.rub.de/gtsrb_dataset.html
        </a>
      </div>

      {/* ================== TEAM SECTION ================== */}
      <h2 className="team-heading">
        MEET THE TEAM <span className="wave">👋</span>
      </h2>

      <div className="team-container">
        {[{
          img: arnav,
          name: "Arnav Anand",
          role: "ML Engineer & Full Stack Developer",
          link: "https://www.linkedin.com/in/arnav-anand-056710315/"
        },{
          img: ansh,
          name: "Ansh Mathur",
          role: "Scrum Master",
          link: "https://www.linkedin.com/in/ansh-mathur-b09ba5337/"
        },{
          img: himesh,
          name: "Himesh Sahoo",
          role: "Product Owner",
          link: "https://www.linkedin.com/in/himesh-sahoo-1234abcd/"
        }].map((m, i) => (
          <div className="team-card" key={i}>
            <img src={m.img} alt={m.name} />
            <h3>{m.name}</h3>
            <p className="role">{m.role}</p>
            <a href={m.link} target="_blank" rel="noreferrer" className="linkedin-link">
              <CiLinkedin className="linkedin-icon" />
            </a>
          </div>
        ))}
      </div>

      {/* ================== TRAFFIC SIGN CLASSES ================== */}
      <h2>TRAFFIC SIGN CLASSES</h2>
      <div className="signs-grid">
        {classNames.map((name, i) => (
          <div className="sign-card" key={i}>
            <span className="sign-index">{i + 1}</span>
            <p className="sign-name">{name}</p>
          </div>
        ))}
      </div>

      {/* ================== MODEL PERFORMANCE ================== */}
      <h2>MODEL PERFORMANCE & RESULTS</h2>

      <div className="results-grid">

        {/* ROW 1 */}
        <div className="results-row two-col">
          <div className="result-card">
            <h3>Training vs Validation Accuracy</h3>
            <Line data={accuracyData} options={chartOptions} />
          </div>

          <div className="result-card">
            <h3>Training vs Validation Loss</h3>
            <Line data={lossData} options={chartOptions} />
          </div>
        </div>

        {/* ROW 2 */}
        <div className="results-row one-col">
          <div className="result-card">
            <h3>Confusion Matrix</h3>
            <img
              src="/confusion_matrix.png"
              alt="Confusion Matrix"
              className="confusion-matrix"
            />
          </div>
        </div>

        {/* ROW 3 */}
        <div className="results-row one-col">
          <div className="result-card metrics-card">
            <h3>Evaluation Metrics</h3>
            <ul className="metrics-list">
              <li>Accuracy: 95%</li>
              <li>Precision: 94%</li>
              <li>Recall: 93%</li>
              <li>F1 Score: 93.5%</li>
              <li>Loss: 0.16</li>
              <li>Inference Time: ~12ms</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}