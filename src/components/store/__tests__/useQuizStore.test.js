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
  let useQuizStore;

  beforeEach(async () => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");

    ({ useQuizStore } = await import("../useQuizStore.jsx"));

    useQuizStore.setState({
      status: "idle",
      mode: "normal",
      category: null,
      difficulty: "easy",
      questions: [],
      currentIndex: 0,
      score: 0,
      answersLog: [],
      weakQuestions: {},
      lastResult: null,
      difficultyStats: {
        easy: { correct: 0, total: 0 },
        normal: { correct: 0, total: 0 },
        hard: { correct: 0, total: 0 },
      },
    });
  });

  it("startQuiz postavlja quiz state bez zavisnosti od realnih podataka", () => {
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

  it("answerQuestion završava quiz i setuje lastResult (1 pitanje)", () => {
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
    });

    useQuizStore.getState().answerQuestion(true, 0);

    const s = useQuizStore.getState();

    expect(s.status).toBe("result");
    expect(s.score).toBe(1);
    expect(s.lastResult.score).toBe(1);
    expect(s.lastResult.accuracy).toBe(100);
  });
});
