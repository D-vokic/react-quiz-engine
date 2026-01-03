const STORAGE_KEY = "quizSettings";

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveSettings(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

const persisted = loadSettings();

export const settingsSlice = (set) => ({
  source: persisted?.source ?? "local",

  category: persisted?.category ?? null,
  difficulty: persisted?.difficulty ?? "easy",
  questionLimit: persisted?.questionLimit ?? 10,

  soundEnabled: persisted?.soundEnabled ?? false,
  timerEnabled: persisted?.timerEnabled ?? false,
  timePerQuestion: persisted?.timePerQuestion ?? 15,

  setQuestionSource: (source) =>
    set((s) => {
      const next = { ...s, source };
      saveSettings(next);
      return { source };
    }),

  setCategory: (category) =>
    set((s) => {
      const next = { ...s, category };
      saveSettings(next);
      return { category };
    }),

  setDifficulty: (difficulty) =>
    set((s) => {
      const next = { ...s, difficulty };
      saveSettings(next);
      return { difficulty };
    }),

  setQuestionLimit: (limit) =>
    set((s) => {
      const next = { ...s, questionLimit: limit };
      saveSettings(next);
      return { questionLimit: limit };
    }),

  toggleSound: () =>
    set((s) => {
      const next = { ...s, soundEnabled: !s.soundEnabled };
      saveSettings(next);
      return { soundEnabled: !s.soundEnabled };
    }),

  toggleTimer: () =>
    set((s) => {
      const next = { ...s, timerEnabled: !s.timerEnabled };
      saveSettings(next);
      return { timerEnabled: !s.timerEnabled };
    }),

  setTimePerQuestion: (time) =>
    set((s) => {
      const next = { ...s, timePerQuestion: time };
      saveSettings(next);
      return { timePerQuestion: time };
    }),
});
