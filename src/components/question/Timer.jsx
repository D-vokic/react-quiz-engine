function Timer({ visible, timeLeft }) {
  if (!visible) return null;
  return <div className="timer">⏱ {timeLeft}s</div>;
}

export default Timer;
