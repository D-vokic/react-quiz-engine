function LastResultButton({ result, onClick }) {
  if (!result) return null;

  return (
    <button
      className="icon-indicator last-result-btn"
      onClick={onClick}
      title="View last result"
    >
      {result.score}
      {result.accuracy !== null && ` • ${result.accuracy}%`}
    </button>
  );
}

export default LastResultButton;
