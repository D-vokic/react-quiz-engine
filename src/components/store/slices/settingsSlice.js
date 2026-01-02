export const settingsSlice = (set) => ({
  category: null,
  difficulty: "easy",
  questionLimit: 10,

  soundEnabled: false,
  timerEnabled: false,
  timePerQuestion: 15,

  setCategory: (category) => set({ category }),
  setDifficulty: (difficulty) => set({ difficulty }),
  setQuestionLimit: (limit) => set({ questionLimit: limit }),

  toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
  toggleTimer: () => set((s) => ({ timerEnabled: !s.timerEnabled })),
  setTimePerQuestion: (time) => set({ timePerQuestion: time }),
});
