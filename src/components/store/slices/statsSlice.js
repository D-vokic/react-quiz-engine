export const statsSlice = (set) => ({
  bestScore: Number(localStorage.getItem("bestScore")) || 0,

  weakQuestions: JSON.parse(localStorage.getItem("weakQuestions")) || {},

  difficultyStats: JSON.parse(localStorage.getItem("difficultyStats")) || {
    easy: { correct: 0, total: 0 },
    normal: { correct: 0, total: 0 },
    hard: { correct: 0, total: 0 },
  },

  streak: JSON.parse(localStorage.getItem("streak")) || {
    current: 0,
    longest: 0,
    lastDate: null,
  },

  lastResult: JSON.parse(localStorage.getItem("lastResult")) || null,

  resetStatistics: () => {
    // ✅ brišemo SAMO statistiku
    localStorage.removeItem("bestScore");
    localStorage.removeItem("weakQuestions");
    localStorage.removeItem("difficultyStats");
    localStorage.removeItem("streak");
    localStorage.removeItem("lastResult");

    set({
      bestScore: 0,
      weakQuestions: {},
      difficultyStats: {
        easy: { correct: 0, total: 0 },
        normal: { correct: 0, total: 0 },
        hard: { correct: 0, total: 0 },
      },
      streak: { current: 0, longest: 0, lastDate: null },
      lastResult: null,

      status: "start",
      questions: [],
      currentIndex: 0,
      score: 0,
      answersLog: [],
      mode: "normal",
    });
  },
});
