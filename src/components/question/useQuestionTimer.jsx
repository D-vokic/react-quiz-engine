import { useEffect, useState, useRef } from "react";

export function useQuestionTimer({
  enabled,
  mode,
  timePerQuestion,
  currentIndex,
  onTimeout,
}) {
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const timeoutFiredRef = useRef(false);

  useEffect(() => {
    timeoutFiredRef.current = false;
  }, [currentIndex, timePerQuestion]);

  useEffect(() => {
    if (!enabled || mode === "retry") return;
    if (timeoutFiredRef.current) return;

    if (timeLeft <= 0) {
      timeoutFiredRef.current = true;
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
