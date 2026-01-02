import { questions } from "../../data/questions.jsx";
import { shuffle } from "../utils/shuffle";

export const quizSlice = (set, get) => ({
  questions: [],
  answersLog: [],
  currentIndex: 0,
  score: 0,

  startQuiz: () => {
    const { category, difficulty, questionLimit } = get();
    if (!category) return;

    const pool = questions[category][difficulty];
    const prepared = shuffle(pool).slice(0, questionLimit);

    set({
      questions: prepared,
      answersLog: [],
      status: "quiz",
      mode: "normal",
      currentIndex: 0,
      score: 0,
    });
  },

  startRetryWrong: () => {
    const { weakQuestions, questionLimit } = get();

    const wrongOnly = Object.values(weakQuestions).filter((q) => q.wrong > 0);
    if (!wrongOnly.length) return;

    set({
      questions: shuffle(wrongOnly).slice(0, questionLimit),
      answersLog: [],
      status: "quiz",
      mode: "retry",
      currentIndex: 0,
      score: 0,
    });
  },

  answerQuestion: (isCorrect, selectedIndex) => {
    const {
      currentIndex,
      questions,
      score,
      weakQuestions,
      answersLog,
      mode,
      difficulty,
      difficultyStats,
    } = get();

    const q = questions[currentIndex];
    const id = q.id;

    const prevWeak = weakQuestions[id] || {
      ...q,
      wrong: 0,
      total: 0,
    };

    const updatedWeak = {
      ...weakQuestions,
      [id]: {
        ...prevWeak,
        wrong: prevWeak.wrong + (isCorrect ? 0 : 1),
        total: prevWeak.total + 1,
      },
    };

    localStorage.setItem("weakQuestions", JSON.stringify(updatedWeak));

    const newLog = [
      ...answersLog,
      {
        question: q.question,
        answers: q.answers,
        correctIndex: q.correctIndex,
        selectedIndex,
      },
    ];

    const updatedDifficultyStats =
      mode === "normal"
        ? {
            ...difficultyStats,
            [difficulty]: {
              correct:
                difficultyStats[difficulty].correct + (isCorrect ? 1 : 0),
              total: difficultyStats[difficulty].total + 1,
            },
          }
        : difficultyStats;

    localStorage.setItem(
      "difficultyStats",
      JSON.stringify(updatedDifficultyStats)
    );

    const nextIndex = currentIndex + 1;
    const newScore = isCorrect ? score + 1 : score;

    if (nextIndex >= questions.length) {
      const best = Math.max(
        Number(localStorage.getItem("bestScore")) || 0,
        newScore
      );
      localStorage.setItem("bestScore", best);

      const lastResult = {
        score: newScore,
        difficulty,
        accuracy:
          updatedDifficultyStats[difficulty].total > 0
            ? Math.round(
                (updatedDifficultyStats[difficulty].correct /
                  updatedDifficultyStats[difficulty].total) *
                  100
              )
            : null,
        weakCount: Object.values(updatedWeak).filter((q) => q.wrong > 0).length,
      };

      localStorage.setItem("lastResult", JSON.stringify(lastResult));

      set({
        score: newScore,
        bestScore: best,
        weakQuestions: updatedWeak,
        answersLog: newLog,
        difficultyStats: updatedDifficultyStats,
        lastResult,
        status: "result",
      });
    } else {
      set({
        score: newScore,
        currentIndex: nextIndex,
        weakQuestions: updatedWeak,
        answersLog: newLog,
        difficultyStats: updatedDifficultyStats,
      });
    }
  },
});
