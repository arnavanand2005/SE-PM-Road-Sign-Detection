import "../styles/DatasetInfo.css";

export default function DatasetInfo() {
  return (
    <div className="dataset">
      <h2>DATASET OVERVIEW</h2>

      <div className="info-box">
        <p><b>Name:</b> GTSRB (German Traffic Sign Recognition Benchmark)</p>
        <p><b>Classes:</b> 43 Traffic Signs</p>
        <p><b>Type:</b> Image Classification</p>
        <p><b>Use Case:</b> Autonomous Driving & ADAS</p>
      </div>

      <h2>TEAM</h2>
      <div className="info-box">
        <p>Arnav Anand — ML & Full Stack</p>
      </div>
    </div>
  );
}