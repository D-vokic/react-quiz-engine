import { useQuizStore } from "../store/useQuizStore.jsx";
import { useState } from "react";

function ResultPage() {
  const score = useQuizStore((s) => s.score);
  const restart = useQuizStore((s) => s.restart);
  const answersLog = useQuizStore((s) => s.answersLog);
  const weakQuestions = useQuizStore((s) => s.weakQuestions);
  const startRetryWrong = useQuizStore((s) => s.startRetryWrong);
  const difficultyStats = useQuizStore((s) => s.difficultyStats);

  const [showWeak, setShowWeak] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const weakList = Object.values(weakQuestions).filter((q) => q.wrong > 0);

  const accuracy = (d) => {
    const stat = difficultyStats[d];
    if (!stat || stat.total === 0) return null;
    return Math.round((stat.correct / stat.total) * 100);
  };

  return (
    <div className="result result-compact">
      <h2>Quiz Finished</h2>

      <div className="result-summary">
        <div className="summary-item">
          <span>Score</span>
          <strong>{score}</strong>
        </div>

        {accuracy("easy") !== null && (
          <div className="summary-item">
            <span>Easy</span>
            <strong>{accuracy("easy")}%</strong>
          </div>
        )}

        {accuracy("normal") !== null && (
          <div className="summary-item">
            <span>Normal</span>
            <strong>{accuracy("normal")}%</strong>
          </div>
        )}

        {accuracy("hard") !== null && (
          <div className="summary-item">
            <span>Hard</span>
            <strong>{accuracy("hard")}%</strong>
          </div>
        )}

        {weakList.length > 0 && (
          <div className="summary-item">
            <span>Weak</span>
            <strong>{weakList.length}</strong>
          </div>
        )}
      </div>

      <div className="result-actions horizontal">
        {weakList.length > 0 && (
          <button onClick={startRetryWrong}>Retry wrong</button>
        )}
        <button onClick={restart}>Play again</button>
      </div>

      <div className="result-links">
        {weakList.length > 0 && (
          <button onClick={() => setShowWeak((v) => !v)}>Weak areas</button>
        )}
        {answersLog.length > 0 && (
          <button onClick={() => setShowReview((v) => !v)}>Review</button>
        )}
      </div>

      {showWeak && (
        <div className="overlay-panel">
          <h3>Weak areas</h3>
          {weakList.slice(0, 3).map((q) => (
            <div key={q.id} className="weak-item">
              <div>{q.question}</div>
              <small>
                wrong {q.wrong} / {q.total}
              </small>
            </div>
          ))}
        </div>
      )}

      {showReview && (
        <div className="overlay-panel">
          <h3>Review answers</h3>
          {answersLog.map((q, i) => (
            <div key={i} style={{ marginBottom: "0.75rem" }}>
              <strong>{q.question}</strong>
              {q.answers.map((a, idx) => (
                <div
                  key={idx}
                  style={{
                    color:
                      idx === q.correctIndex
                        ? "#4caf50"
                        : idx === q.selectedIndex
                        ? "#f44336"
                        : "#aaa",
                  }}
                >
                  {a}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResultPage;
