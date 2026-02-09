import DifficultyBadge from "./DifficultyBadge";
import LastResultButton from "./LastResultButton";
import StreakIndicator from "./StreakIndicator";

function HeaderIcons({
  soundEnabled,
  timerEnabled,
  difficulty,
  theme,
  toggleTheme,
  onOpenSettings,
  streak,
  lastResult,
  onShowLast,
}) {
  return (
    <div className="header-icons">
      <DifficultyBadge difficulty={difficulty} />

      <LastResultButton
        result={lastResult}
        onClick={onShowLast}
        disabled={!lastResult}
      />

      <StreakIndicator value={streak.current} />

      <div
        className={`icon-indicator ${soundEnabled ? "active" : ""}`}
        title="Sound"
      >
        {soundEnabled ? "🔊" : "🔇"}
      </div>

      <div
        className={`icon-indicator ${timerEnabled ? "active" : ""}`}
        title="Timer"
      >
        ⏱
      </div>

      <button className="icon-btn" onClick={toggleTheme}>
        {theme === "dark" ? "🌙" : "☀️"}
      </button>

      <button className="icon-btn" onClick={onOpenSettings}>
        ⚙️
      </button>
    </div>
  );
}

export default HeaderIcons;
