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
    localStorage.clear();
    set({
      weakQuestions: {},
      difficultyStats: {
        easy: { correct: 0, total: 0 },
        normal: { correct: 0, total: 0 },
        hard: { correct: 0, total: 0 },
      },
      streak: { current: 0, longest: 0, lastDate: null },
      bestScore: 0,
      lastResult: null,
    });
  },
});
