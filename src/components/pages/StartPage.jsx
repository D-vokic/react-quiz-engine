import { useQuizStore } from "../store/useQuizStore";
import { useEffect } from "react";

function StartPage() {
  const category = useQuizStore((s) => s.category);
  const setCategory = useQuizStore((s) => s.setCategory);

  const source = useQuizStore((s) => s.source);
  const setQuestionSource = useQuizStore((s) => s.setQuestionSource);

  const startQuiz = useQuizStore((s) => s.startQuiz);
  const startQuizFromApi = useQuizStore((s) => s.startQuizFromApi);

  const isLoading = useQuizStore((s) => s.isLoading);
  const error = useQuizStore((s) => s.error);

  const categoryStats = useQuizStore((s) => s.categoryStats);
  const getRecommendedDifficulty = useQuizStore(
    (s) => s.getRecommendedDifficulty
  );

  useEffect(() => {
    setCategory(null);
  }, [setCategory]);

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

  const handleStart = () => {
    if (source === "api") {
      startQuizFromApi();
    } else {
      startQuiz();
    }
  };

  return (
    <div className="start">
      <h2>Choose Quiz</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ marginRight: "1rem" }}>
          <input
            type="radio"
            checked={source === "local"}
            onChange={() => setQuestionSource("local")}
            disabled={isLoading}
          />{" "}
          Local questions
        </label>

        <label>
          <input
            type="radio"
            checked={source === "api"}
            onChange={() => setQuestionSource("api")}
            disabled={isLoading}
          />{" "}
          API questions
        </label>
      </div>

      <div className="quiz-grid">
        {quizzes.map((quiz) => {
          const stats = categoryStats?.[quiz.key];

          return (
            <div
              key={quiz.key}
              className={`quiz-card ${quiz.key === "taylor" ? "taylor" : ""} ${
                category === quiz.key ? "active" : ""
              }`}
              onClick={() => !isLoading && setCategory(quiz.key)}
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

      {/* ERROR */}
      {error && (
        <p style={{ color: "crimson", marginTop: "0.75rem" }}>{error}</p>
      )}

      {isLoading && (
        <p style={{ marginTop: "0.75rem", opacity: 0.75 }}>
          Loading questions...
        </p>
      )}

      <button onClick={handleStart} disabled={!category || isLoading}>
        {isLoading ? "Loading..." : "Start Quiz"}
      </button>
    </div>
  );
}

export default StartPage;
