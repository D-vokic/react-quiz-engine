import { describe, it, expect, beforeEach, vi } from "vitest";

vi.mock("../../data/questions.jsx", () => ({
  questions: {
    test: {
      easy: [
        {
          id: "q1",
          question: "Q1?",
          answers: ["A", "B"],
          correctIndex: 0,
        },
        {
          id: "q2",
          question: "Q2?",
          answers: ["A", "B"],
          correctIndex: 1,
        },
      ],
    },
  },
}));

describe("useQuizStore – core flow", () => {
  beforeEach(async () => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    vi.resetModules();
  });

  it("startQuiz postavlja quiz state bez zavisnosti od realnih podataka", async () => {
    const { useQuizStore } = await import("../useQuizStore.jsx");

    useQuizStore.setState({
      category: "test",
      difficulty: "easy",
      questionLimit: 1,
    });

    useQuizStore.getState().startQuiz();

    const s = useQuizStore.getState();

    expect(s.status).toBe("quiz");
    expect(s.mode).toBe("normal");
    expect(s.questions.length).toBe(1);
    expect(s.currentIndex).toBe(0);
    expect(s.score).toBe(0);
  });

  it("answerQuestion završava quiz i setuje lastResult (1 pitanje)", async () => {
    const { useQuizStore } = await import("../useQuizStore.jsx");

    useQuizStore.setState({
      status: "quiz",
      mode: "normal",
      difficulty: "easy",
      currentIndex: 0,
      score: 0,
      questions: [
        {
          id: "q1",
          question: "Q1?",
          answers: ["A", "B"],
          correctIndex: 0,
        },
      ],
      weakQuestions: {},
      answersLog: [],
      difficultyStats: {
        easy: { correct: 0, total: 0 },
        normal: { correct: 0, total: 0 },
        hard: { correct: 0, total: 0 },
      },
    });

    useQuizStore.getState().answerQuestion(true, 0);

    const s = useQuizStore.getState();

    expect(s.status).toBe("result");
    expect(s.score).toBe(1);
    expect(s.lastResult).toEqual(
      expect.objectContaining({
        score: 1,
        difficulty: "easy",
        accuracy: 100,
      })
    );
  });
});
