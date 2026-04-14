import { useState, useEffect } from "react";
import axios from "axios";
import TopPredictions from "../components/TopPredictions";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const handleFile = (e) => {
    const img = e.target.files[0];
    setFile(img);
    setPreview(URL.createObjectURL(img));
  };

  // Load voices
  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }, []);

  // Fetch history
  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5001/history");
      setHistory(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // TTS
  const playAlert = (label) => {
    let message = "";

    if (label.includes("Speed limit")) {
      const speed = label.match(/\d+/)?.[0] || "";
      message = `Hey! The speed limit here is ${speed} kilometers per hour. Please drive safely.`;
    } else if (label.includes("Stop")) {
      message = "Hey! Stop sign detected. Please stop the vehicle.";
    } else if (label.includes("No entry")) {
      message = "Warning! No entry ahead. Please do not proceed.";
    } else {
      message = `Attention! ${label} detected.`;
    }

    const speech = new SpeechSynthesisUtterance(message);
    const voices = window.speechSynthesis.getVoices();

    const femaleVoice =
      voices.find(v => v.name.includes("Samantha")) ||
      voices.find(v => v.name.includes("Google UK English Female")) ||
      voices.find(v => v.name.toLowerCase().includes("female")) ||
      voices[0];

    speech.voice = femaleVoice;
    speech.rate = 0.9;
    speech.pitch = 1.2;

    setTimeout(() => {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(speech);
    }, 150);
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
      fetchHistory();

    } catch (err) {
      console.error(err);
    }
  };

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

        {/* 🔥 TOP ROW */}
        <div className="top-row">

          {/* Summary */}
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

          {/* History */}
          <div className="box">
            <h3>Prediction History</h3>

            {history.length === 0 && <p>No history yet</p>}

            <div className="history-scroll">
              {history.map((item, index) => (
                <div key={index} className="history-item">
                  
                  <img 
                    src={`http://127.0.0.1:5001/uploads/${item.image}`} 
                    alt="history"
                    width="60"
                  />

                  <div>
                    <p><b>{item.label}</b></p>
                    <p>{item.confidence}%</p>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 🔥 BOTTOM ROW */}
        <div className="box full-width">
          <h3>Top 5 Predictions</h3>
          <TopPredictions data={result?.top5} />
        </div>

      </div>
    </div>
  );
}