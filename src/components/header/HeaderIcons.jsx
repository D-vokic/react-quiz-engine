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
        role="img"
        aria-label={soundEnabled ? "Sound enabled" : "Sound disabled"}
      >
        {soundEnabled ? "🔊" : "🔇"}
      </div>

      <div
        className={`icon-indicator ${timerEnabled ? "active" : ""}`}
        title="Timer"
        role="img"
        aria-label={timerEnabled ? "Timer enabled" : "Timer disabled"}
      >
        ⏱
      </div>

      <button
        className="icon-btn"
        onClick={toggleTheme}
        aria-label={
          theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
        }
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </button>

      <button
        className="icon-btn"
        onClick={onOpenSettings}
        aria-label="Open settings"
      >
        ⚙️
      </button>
    </div>
  );
}

export default HeaderIcons;
