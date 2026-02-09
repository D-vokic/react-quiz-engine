import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import QuestionCard from "../QuestionCard.jsx";
import { useQuizStore } from "../../store/useQuizStore.jsx";

describe("QuestionCard", () => {
  beforeEach(() => {
    vi.useFakeTimers();

    useQuizStore.setState({
      status: "quiz",
      mode: "normal",
      currentIndex: 0,
      questions: [
        {
          id: "q1",
          question: "Test pitanje?",
          answers: ["A", "B"],
          correctIndex: 1,
        },
      ],
      soundEnabled: false,
      timerEnabled: false,
      timePerQuestion: 10,
      answerQuestion: vi.fn(),
      restart: vi.fn(),
    });
  });

  it("klik na odgovor poziva answerQuestion posle 600ms sa tacnim argumentima", () => {
    render(<QuestionCard />);

    fireEvent.click(screen.getByText("B"));

    expect(useQuizStore.getState().answerQuestion).not.toHaveBeenCalled();

    vi.advanceTimersByTime(600);

    expect(useQuizStore.getState().answerQuestion).toHaveBeenCalledWith(
      true,
      1
    );
  });
});
