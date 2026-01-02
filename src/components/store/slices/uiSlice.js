const initialTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", initialTheme);

export const uiSlice = (set) => ({
  status: "start",
  mode: "normal",
  theme: initialTheme,

  toggleTheme: () =>
    set((s) => {
      const next = s.theme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      return { theme: next };
    }),

  restart: () =>
    set({
      status: "start",
      mode: "normal",
      questions: [],
      answersLog: [],
      currentIndex: 0,
      score: 0,
    }),
});
