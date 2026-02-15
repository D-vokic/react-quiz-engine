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

function saveSettings(partial) {
  try {
    const current = loadSettings() || {};
    const next = { ...current, ...partial };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
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
    set(() => {
      saveSettings({ source });
      return { source };
    }),

  setCategory: (category) =>
    set(() => {
      saveSettings({ category });
      return { category };
    }),

  setDifficulty: (difficulty) =>
    set(() => {
      saveSettings({ difficulty });
      return { difficulty };
    }),

  setQuestionLimit: (limit) =>
    set(() => {
      saveSettings({ questionLimit: limit });
      return { questionLimit: limit };
    }),

  toggleSound: () =>
    set((s) => {
      const next = !s.soundEnabled;
      saveSettings({ soundEnabled: next });
      return { soundEnabled: next };
    }),

  toggleTimer: () =>
    set((s) => {
      const next = !s.timerEnabled;
      saveSettings({ timerEnabled: next });
      return { timerEnabled: next };
    }),

  setTimePerQuestion: (time) =>
    set(() => {
      saveSettings({ timePerQuestion: time });
      return { timePerQuestion: time };
    }),
});
