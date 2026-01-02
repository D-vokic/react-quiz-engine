import { useQuizStore } from "../store/useQuizStore";

function StartPage() {
  const category = useQuizStore((s) => s.category);
  const setCategory = useQuizStore((s) => s.setCategory);
  const startQuiz = useQuizStore((s) => s.startQuiz);
  const categoryStats = useQuizStore((s) => s.categoryStats);
  const getRecommendedDifficulty = useQuizStore(
    (s) => s.getRecommendedDifficulty
  );

  const quizzes = [
    { key: "html", label: "HTML" },
    { key: "css", label: "CSS" },
    { key: "javascript", label: "JavaScript" },
    { key: "react", label: "React" },
    { key: "linux", label: "Linux Admin" },
    { key: "taylor", label: "🎤 Taylor Swift" },
  ];

  const recommended =
    category && categoryStats?.[category]
      ? getRecommendedDifficulty(category)
      : null;

  return (
    <div className="start">
      <h2>Choose Quiz</h2>

      <div className="quiz-grid">
        {quizzes.map((quiz) => {
          const stats = categoryStats?.[quiz.key];

          return (
            <div
              key={quiz.key}
              className={`quiz-card ${quiz.key === "taylor" ? "taylor" : ""} ${
                category === quiz.key ? "active" : ""
              }`}
              onClick={() => setCategory(quiz.key)}
            >
              <div>{quiz.label}</div>

              {stats && (
                <small style={{ opacity: 0.75 }}>
                  ▶{" "}
                  {Object.values(stats).reduce(
                    (sum, s) => sum + (s.played || 0),
                    0
                  )}{" "}
                  plays
                </small>
              )}
            </div>
          );
        })}
      </div>

      {recommended && (
        <p style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>
          Recommended difficulty: <strong>{recommended.toUpperCase()}</strong>
        </p>
      )}

      <button onClick={startQuiz} disabled={!category}>
        Start Quiz
      </button>
    </div>
  );
}

export default StartPage;
