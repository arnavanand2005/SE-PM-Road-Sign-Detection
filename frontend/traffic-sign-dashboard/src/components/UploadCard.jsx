export default function UploadCard({ onFile, onSubmit }) {
    return (
      <div className="card neon">
        <h3>UPLOAD TRAFFIC SIGN</h3>
        <form onSubmit={onSubmit}>
          <input type="file" required onChange={onFile} />
          <button type="submit">PREDICT</button>
        </form>
      </div>
    );
  }