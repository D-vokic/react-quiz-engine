import { useEffect, useState } from "react";

export function useQuestionTimer({
  enabled,
  mode,
  timePerQuestion,
  currentIndex,
  onTimeout,
}) {
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeLeft(timePerQuestion);
  }, [currentIndex, timePerQuestion]);

  useEffect(() => {
    if (!enabled || mode === "retry") return;

    if (timeLeft <= 0) {
      onTimeout();
      return;
    }

    const id = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(id);
  }, [timeLeft, enabled, mode, onTimeout]);

  return timeLeft;
}
