function LastResultButton({ result, onClick }) {
  if (!result) return null;

  const { score, accuracy } = result;

  return (
    <button
      className="icon-btn last-result-btn"
      onClick={onClick}
      title="View last result"
    >
      📊{" "}
      <span style={{ marginLeft: "0.4rem", whiteSpace: "nowrap" }}>
        {score}
        {typeof accuracy === "number" && ` · ${accuracy}%`}
      </span>
    </button>
  );
}

export default LastResultButton;
