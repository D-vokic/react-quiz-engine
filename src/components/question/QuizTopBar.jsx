function QuizTopBar({ mode, onCancel }) {
  return (
    <div className="quiz-top-bar">
      {mode === "retry" && (
        <div className="retry-indicator">Retry mode – wrong answers only</div>
      )}

      <button className="cancel-btn" onClick={onCancel}>
        ✖ Cancel quiz
      </button>
    </div>
  );
}

export default QuizTopBar;
