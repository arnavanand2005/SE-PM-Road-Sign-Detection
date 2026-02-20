import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(
      "http://127.0.0.1:5001/predict",
      formData
    );

    setResult(res.data);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Traffic Sign Recognition Dashboard</h2>

      <form onSubmit={handleSubmit}>
        <input type="file" required onChange={handleFileChange} />
        <br /><br />
        <button type="submit">Predict</button>
      </form>

      {preview && (
        <div>
          <h4>Uploaded Image</h4>
          <img src={preview} alt="preview" width="150" />
        </div>
      )}

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Sign: {result.label}</h3>
          <h4>Confidence: {result.confidence}%</h4>

          <div style={{
            width: "300px",
            height: "20px",
            border: "1px solid black",
            margin: "auto"
          }}>
            <div style={{
              width: `${result.confidence}%`,
              height: "100%",
              backgroundColor: "green"
            }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;