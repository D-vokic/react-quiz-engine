function StreakIndicator({ value }) {
  if (value <= 0) return null;
  return <div className="icon-indicator streak">🔥 {value}</div>;
}

export default StreakIndicator;
