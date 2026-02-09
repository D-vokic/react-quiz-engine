import { describe, it, expect, beforeEach, vi } from "vitest";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import QuestionCard from "../QuestionCard.jsx";
import { useQuizStore } from "../../store/useQuizStore.jsx";

describe("QuestionCard – timer timeout", () => {
  beforeEach(() => {
    vi.useFakeTimers();

    useQuizStore.setState({
      status: "quiz",
      mode: "normal",
      currentIndex: 0,
      questions: [
        {
          id: "q1",
          question: "Timer test?",
          answers: ["A", "B"],
          correctIndex: 0,
        },
      ],
      timerEnabled: true,
      timePerQuestion: 3,
      soundEnabled: false,
      answerQuestion: vi.fn(),
      restart: vi.fn(),
    });
  });

  it("kada timer istekne, poziva answerQuestion(false, null)", () => {
    render(<QuestionCard />);

    // 3 tick-a po 1s + 1 render za effect sa timeLeft === 0
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(useQuizStore.getState().answerQuestion).toHaveBeenCalledTimes(1);
    expect(useQuizStore.getState().answerQuestion).toHaveBeenCalledWith(
      false,
      null
    );
  });
});
