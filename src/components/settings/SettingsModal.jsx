import { useQuizStore } from "../store/useQuizStore.jsx";

import ToggleRow from "./ToggleRow";
import RangeRow from "./RangeRow";
import OptionsRow from "./OptionsRow";
import SettingsSection from "./SettingsSection";

function SettingsModal({ onClose }) {
  const soundEnabled = useQuizStore((s) => s.soundEnabled);
  const timerEnabled = useQuizStore((s) => s.timerEnabled);
  const timePerQuestion = useQuizStore((s) => s.timePerQuestion);
  const questionLimit = useQuizStore((s) => s.questionLimit);
  const difficulty = useQuizStore((s) => s.difficulty);

  const toggleSound = useQuizStore((s) => s.toggleSound);
  const toggleTimer = useQuizStore((s) => s.toggleTimer);
  const setTimePerQuestion = useQuizStore((s) => s.setTimePerQuestion);
  const setQuestionLimit = useQuizStore((s) => s.setQuestionLimit);
  const setDifficulty = useQuizStore((s) => s.setDifficulty);
  const resetStatistics = useQuizStore((s) => s.resetStatistics);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Settings</h3>

        <SettingsSection>
          <ToggleRow
            label="Sound"
            value={soundEnabled}
            onToggle={toggleSound}
          />

          <ToggleRow
            label="Timer"
            value={timerEnabled}
            onToggle={toggleTimer}
          />

          <RangeRow
            label="Time per question"
            value={timePerQuestion}
            min={5}
            max={30}
            step={5}
            disabled={!timerEnabled}
            onChange={setTimePerQuestion}
          />

          <OptionsRow
            label="Questions per quiz"
            options={[5, 10, 20]}
            active={questionLimit}
            onSelect={setQuestionLimit}
          />

          <OptionsRow
            label="Difficulty"
            options={["easy", "normal", "hard"]}
            active={difficulty}
            onSelect={setDifficulty}
          />

          <div className="setting-row">
            <span>Statistics</span>
            <button
              className="toggle"
              onClick={() => {
                resetStatistics();
                onClose();
              }}
            >
              Reset statistics
            </button>
          </div>
        </SettingsSection>

        <div className="modal-actions">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
