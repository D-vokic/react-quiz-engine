import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";

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
      ],
    },
  },
}));

describe("useQuizStore – results", () => {
  let useQuizStore;

  beforeEach(async () => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    ({ useQuizStore } = await import("../useQuizStore.jsx"));

    useQuizStore.setState({
      status: "quiz",
      mode: "normal",
      category: "test",
      difficulty: "easy",
      questionLimit: 1,
      questions: [
        {
          id: "q1",
          question: "Q1?",
          answers: ["A", "B"],
          correctIndex: 0,
        },
      ],
      currentIndex: 0,
      score: 0,
      answersLog: [],
      weakQuestions: {
        q1: {
          id: "q1",
          question: "Q1?",
          answers: ["A", "B"],
          correctIndex: 0,
          wrong: 1,
        },
      },
      lastResult: null,
      difficultyStats: {
        easy: { correct: 0, total: 0 },
        normal: { correct: 0, total: 0 },
        hard: { correct: 0, total: 0 },
      },
    });
  });

  it("sets lastResult with score, accuracy and weakCount", () => {
    useQuizStore.getState().answerQuestion(true, 0);
    const s = useQuizStore.getState();
    expect(s.lastResult.score).toBe(1);
    expect(s.lastResult.accuracy).toBe(100);
    expect(s.lastResult.weakCount).toBe(1);
  });

  it("accumulates weakQuestions on wrong answers", () => {
    useQuizStore.getState().answerQuestion(false, 1);
    const s = useQuizStore.getState();
    expect(s.weakQuestions.q1.wrong).toBe(2);
    expect(Object.keys(s.weakQuestions).length).toBe(1);
  });

  it("removes question from weakQuestions after successful retry", () => {
    useQuizStore.setState({ mode: "retry" });
    useQuizStore.getState().answerQuestion(true, 0);
    const s = useQuizStore.getState();
    expect(s.weakQuestions.q1).toBeUndefined();
    expect(Object.keys(s.weakQuestions).length).toBe(0);
    expect(s.mode).toBe("normal");
    expect(s.status).toBe("result");
  });

  it("does not overwrite lastResult during retry", () => {
    useQuizStore.setState({
      mode: "retry",
      lastResult: { score: 5, accuracy: 80, weakCount: 1 },
    });
    useQuizStore.getState().answerQuestion(true, 0);
    const s = useQuizStore.getState();
    expect(s.lastResult.score).toBe(5);
    expect(s.lastResult.accuracy).toBe(80);
  });

  it("full retry flow: finish quiz → retry wrong → complete retry → result", () => {
    useQuizStore.getState().answerQuestion(false, 1);
    let s = useQuizStore.getState();
    expect(s.status).toBe("result");
    expect(s.mode).toBe("normal");
    expect(Object.keys(s.weakQuestions).length).toBe(1);

    useQuizStore.getState().startRetryWrong();
    s = useQuizStore.getState();
    expect(s.status).toBe("quiz");
    expect(s.mode).toBe("retry");
    expect(s.questions.length).toBe(1);

    useQuizStore.getState().answerQuestion(true, 0);
    s = useQuizStore.getState();
    expect(s.status).toBe("result");
    expect(s.mode).toBe("normal");
    expect(Object.keys(s.weakQuestions).length).toBe(0);
  });

  it("handles empty question pool safely", () => {
    useQuizStore.setState({
      category: "invalid",
      difficulty: "easy",
    });
    useQuizStore.getState().startQuiz();
    const s = useQuizStore.getState();
    expect(s.status).toBe("start");
    expect(s.questions.length).toBe(0);
  });

  it("guards against corrupted weakQuestions in state", () => {
    useQuizStore.setState({
      weakQuestions: "invalid",
    });
    useQuizStore.getState().answerQuestion(false, 1);
    const s = useQuizStore.getState();
    expect(typeof s.weakQuestions).toBe("object");
  });
});

describe("LastResultModal rendering", () => {
  it("renders score, accuracy and weakCount", async () => {
    const { default: LastResultModal } =
      await import("../../header/LastResultModal.jsx");

    render(
      <LastResultModal
        result={{ score: 5, accuracy: 80, weakCount: 2 }}
        onClose={() => {}}
      />,
    );

    expect(screen.getByText("Score:")).toBeTruthy();
    expect(screen.getByText("5")).toBeTruthy();
    expect(screen.getByText("Accuracy:")).toBeTruthy();
    expect(screen.getByText("80%")).toBeTruthy();
    expect(screen.getByText("Weak questions:")).toBeTruthy();
    expect(screen.getByText("2")).toBeTruthy();
  });
});
