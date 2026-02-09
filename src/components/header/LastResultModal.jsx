function LastResultModal({ result, onClose }) {
  if (!result) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Last result</h3>

        <p>
          Score: <strong>{result.score}</strong>
        </p>

        {result.accuracy !== null && (
          <p>
            Accuracy: <strong>{result.accuracy}%</strong>
          </p>
        )}

        <p>
          Weak questions: <strong>{result.weakCount}</strong>
        </p>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default LastResultModal;
