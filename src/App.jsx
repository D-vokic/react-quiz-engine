import { useState } from "react";
import { useQuizStore } from "./components/store/useQuizStore.jsx";

import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import StartPage from "./components/pages/StartPage.jsx";
import ResultPage from "./components/pages/ResultPage.jsx";
import QuestionCard from "./components/question/QuestionCard.jsx";
import SettingsModal from "./components/settings/SettingsModal.jsx";

function App() {
  const status = useQuizStore((s) => s.status);
  const questions = useQuizStore((s) => s.questions);
  const currentIndex = useQuizStore((s) => s.currentIndex);

  const [showSettings, setShowSettings] = useState(false);

  const hasActiveQuestion =
    status === "quiz" && questions[currentIndex] !== undefined;

  return (
    <>
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}

      <div className="app">
        <Header onOpenSettings={() => setShowSettings(true)} />

        {status === "start" && <StartPage />}

        {hasActiveQuestion && <QuestionCard />}

        {status === "result" && <ResultPage />}

        {status === "quiz" && !hasActiveQuestion && <ResultPage />}

        <Footer />
      </div>
    </>
  );
}

export default App;
