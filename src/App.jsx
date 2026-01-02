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
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}

      <div className="app">
        <Header onOpenSettings={() => setShowSettings(true)} />

        {status === "start" && <StartPage />}
        {status === "quiz" && <QuestionCard />}
        {status === "result" && <ResultPage />}

        <Footer />
      </div>
    </>
  );
}

export default App;
