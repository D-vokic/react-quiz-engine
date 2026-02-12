export const statsSlice = (set) => {
  const safeParse = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : fallback;
    } catch {
      return fallback;
    }
  };

  const safeNumber = (key, fallback = 0) => {
    const value = Number(localStorage.getItem(key));
    return Number.isFinite(value) ? value : fallback;
  };

  const storedWeakQuestions = safeParse("weakQuestions", {});
  const storedLastResultRaw = safeParse("lastResult", null);
  const storedDifficultyStats = safeParse("difficultyStats", {
    easy: { correct: 0, total: 0 },
    normal: { correct: 0, total: 0 },
    hard: { correct: 0, total: 0 },
  });
  const storedStreak = safeParse("streak", {
    current: 0,
    longest: 0,
    lastDate: null,
  });

  return {
    bestScore: safeNumber("bestScore", 0),

    weakQuestions:
      storedWeakQuestions && typeof storedWeakQuestions === "object"
        ? storedWeakQuestions
        : {},

    difficultyStats:
      storedDifficultyStats &&
      storedDifficultyStats.easy &&
      storedDifficultyStats.normal &&
      storedDifficultyStats.hard
        ? storedDifficultyStats
        : {
            easy: { correct: 0, total: 0 },
            normal: { correct: 0, total: 0 },
            hard: { correct: 0, total: 0 },
          },

    streak:
      storedStreak &&
      typeof storedStreak.current === "number" &&
      typeof storedStreak.longest === "number"
        ? storedStreak
        : { current: 0, longest: 0, lastDate: null },

    lastResult:
      storedLastResultRaw &&
      typeof storedLastResultRaw.score === "number" &&
      typeof storedLastResultRaw.accuracy === "number"
        ? {
            ...storedLastResultRaw,
            weakCount: Object.keys(storedWeakQuestions || {}).length,
          }
        : null,

    resetStatistics: () => {
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
  };
};
