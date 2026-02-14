import { useEffect, useRef } from "react";

function LastResultModal({ result, onClose }) {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    previousFocusRef.current = document.activeElement;
    if (modalRef.current) {
      modalRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previousFocusRef.current && previousFocusRef.current.focus) {
        previousFocusRef.current.focus();
      }
    };
  }, [onClose]);

  if (!result) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="last-result-title"
    >
      <div
        className="modal"
        ref={modalRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="last-result-title">Last result</h3>

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
