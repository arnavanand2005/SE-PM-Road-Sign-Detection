import { useState, useEffect } from "react";
import axios from "axios";
import TopPredictions from "../components/TopPredictions";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

  const handleFile = (e) => {
    const img = e.target.files[0];
    setFile(img);
    setPreview(URL.createObjectURL(img));
  };

  // 🔊 TEXT-TO-SPEECH (DEBUG SAFE)
  const playAlert = (label) => {
    console.log("Speaking:", label);

    const msg = new SpeechSynthesisUtterance(`Detected ${label}`);
    msg.lang = "en-US";
    msg.rate = 1;
    msg.pitch = 1;

    // small delay improves reliability
    setTimeout(() => {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(msg);
    }, 200);
  };

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await axios.post(
        "http://127.0.0.1:5001/predict",
        fd
      );

      setResult(res.data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // 🔥 AUTO SPEAK WHEN RESULT COMES
  useEffect(() => {
    if (result) {
      playAlert(result.label);
    }
  }, [result]);

  return (
    <div className="dash-container">

      {/* LEFT PANEL */}
      <div className="left-panel">
        <h2>Upload Traffic Sign</h2>

        <form onSubmit={submit}>
          <input type="file" required onChange={handleFile} />
          <button type="submit">Predict</button>
        </form>

        {preview && (
          <div className="image-box">
            <img src={preview} alt="Uploaded sign" />
          </div>
        )}
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">

        <div className="box">
          <h3>Prediction Summary</h3>

          {!result && <p className="muted">No prediction yet</p>}

          {result && (
            <div className="result-animate">
              <div className="pred-label">{result.label}</div>

              <div className="pred-conf">
                Confidence: {result.confidence}%
              </div>

              <div className="conf-bar">
                <div
                  className="conf-fill"
                  style={{ "--target-width": `${result.confidence}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="box">
          <h3>Top 5 Predictions</h3>
          <TopPredictions data={result?.top5} />
        </div>

      </div>
    </div>
  );
}