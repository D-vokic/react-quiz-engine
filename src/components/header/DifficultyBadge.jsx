function DifficultyBadge({ difficulty }) {
  return (
    <div className={`difficulty-badge ${difficulty}`}>
      {difficulty.toUpperCase()}
    </div>
  );
}

export default DifficultyBadge;
