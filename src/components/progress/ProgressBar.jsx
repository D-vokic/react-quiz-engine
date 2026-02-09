import { useQuizStore } from "../store/useQuizStore.jsx";
import ProgressContainer from "./ProgressContainer";
import ProgressFill from "./ProgressFill";

function ProgressBar() {
  const currentIndex = useQuizStore((s) => s.currentIndex);
  const questions = useQuizStore((s) => s.questions);

  const total = questions.length;
  const progress = total > 0 ? (currentIndex / total) * 100 : 0;

  return (
    <ProgressContainer>
      <ProgressFill value={progress} />
    </ProgressContainer>
  );
}

export default ProgressBar;
