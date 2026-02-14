import { useState, useCallback } from "react";
import { useQuizStore } from "../store/useQuizStore.jsx";

import QuizTopBar from "./QuizTopBar.jsx";
import Timer from "./Timer.jsx";
import QuestionText from "./QuestionText.jsx";
import AnswersList from "./AnswersList.jsx";
import { useQuestionTimer } from "./useQuestionTimer.jsx";
import { useSounds } from "./useSounds.jsx";

function QuestionCard() {
  const questions = useQuizStore((s) => s.questions);
  const currentIndex = useQuizStore((s) => s.currentIndex);
  const answerQuestion = useQuizStore((s) => s.answerQuestion);
  const restart = useQuizStore((s) => s.restart);
  const soundEnabled = useQuizStore((s) => s.soundEnabled);
  const timerEnabled = useQuizStore((s) => s.timerEnabled);
  const timePerQuestion = useQuizStore((s) => s.timePerQuestion);
  const mode = useQuizStore((s) => s.mode);

  const [selected, setSelected] = useState(null);

  const handleTimeout = useCallback(() => {
    answerQuestion(false, null);
  }, [answerQuestion]);

  const { playClick, playCorrect, playWrong, audioElements } =
    useSounds(soundEnabled);

  const current = questions[currentIndex];

  const handleAnswer = useCallback(
    (index) => {
      if (!current || selected !== null) return;

      setSelected(index);
      playClick();

      const isCorrect = index === current.correctIndex;
      isCorrect ? playCorrect() : playWrong();

      setTimeout(() => {
        answerQuestion(isCorrect, index);
        setSelected(null);
      }, 600);
    },
    [selected, current, playClick, playCorrect, playWrong, answerQuestion],
  );

  const timeLeft = useQuestionTimer({
    enabled: timerEnabled,
    mode,
    timePerQuestion,
    currentIndex,
    onTimeout: handleTimeout,
  });

  if (!questions.length) return null;
  if (!current) return null;

  return (
    <div className="question">
      <QuizTopBar mode={mode} onCancel={restart} />

      <Timer visible={timerEnabled && mode !== "retry"} timeLeft={timeLeft} />

      <QuestionText text={current.question} />

      <AnswersList
        answers={current.answers}
        onAnswer={handleAnswer}
        disabled={selected !== null}
      />

      {audioElements}
    </div>
  );
}

export default QuestionCard;
