import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(
      "http://127.0.0.1:5001/predict",
      formData
    );

    setPrediction(res.data.prediction);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Traffic Sign Recognition Dashboard</h2>

      <form onSubmit={handleSubmit}>
        <input type="file" required onChange={handleFileChange} />
        <br /><br />
        <button type="submit">Predict</button>
      </form>

      {/* Image Preview */}
      {preview && (
        <div>
          <h4>Uploaded Image</h4>
          <img
            src={preview}
            alt="preview"
            width="150"
            style={{ border: "1px solid #ccc" }}
          />
        </div>
      )}

      {/* Prediction */}
      {prediction && <h3>Prediction: {prediction}</h3>}
    </div>
  );
}

export default App;