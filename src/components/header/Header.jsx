import { useState } from "react";
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
          onShowLast={() => setShowLast(true)}
        />
      </div>

      {showLast && (
        <LastResultModal
          result={lastResult}
          onClose={() => setShowLast(false)}
        />
      )}
    </header>
  );
}

export default Header;
