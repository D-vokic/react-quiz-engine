import { useState, useCallback } from "react";
import { useQuizStore } from "../store/useQuizStore.jsx";

import HeaderTitle from "./HeaderTitle";
import HeaderIcons from "./HeaderIcons";
import LastResultModal from "./LastResultModal";

function Header({ onOpenSettings }) {
  const soundEnabled = useQuizStore((s) => s.soundEnabled);
  const timerEnabled = useQuizStore((s) => s.timerEnabled);
  const difficulty = useQuizStore((s) => s.difficulty);
  const theme = useQuizStore((s) => s.theme);
  const toggleTheme = useQuizStore((s) => s.toggleTheme);
  const streak = useQuizStore((s) => s.streak);
  const lastResult = useQuizStore((s) => s.lastResult);

  const [showLast, setShowLast] = useState(false);

  const handleShowLast = useCallback(() => {
    if (!lastResult) return;
    setShowLast(true);
  }, [lastResult]);

  const handleCloseLast = useCallback(() => {
    setShowLast(false);
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <HeaderTitle />

        <HeaderIcons
          soundEnabled={soundEnabled}
          timerEnabled={timerEnabled}
          difficulty={difficulty}
          theme={theme}
          toggleTheme={toggleTheme}
          onOpenSettings={onOpenSettings}
          streak={streak}
          lastResult={lastResult}
          onShowLast={handleShowLast}
        />
      </div>

      {lastResult && showLast && (
        <LastResultModal result={lastResult} onClose={handleCloseLast} />
      )}
    </header>
  );
}

export default Header;
