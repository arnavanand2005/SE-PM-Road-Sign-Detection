export default function ResultCard({ result }) {
    if (!result) return null;
  
    return (
      <div className="card neon">
        <h3>PREDICTION RESULT</h3>
        <h2>{result.label}</h2>
        <p>Confidence: {result.confidence}%</p>
      </div>
    );
  }