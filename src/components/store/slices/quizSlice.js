import { questions as localQuestions } from "../../data/questions.jsx";
import { shuffle } from "../utils/shuffle";

const API_CATEGORY_MAP = {
  html: 18,
  css: 18,
  javascript: 18,
  react: 18,
  linux: 18,
};

function decode(text) {
  const txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
}

export const quizSlice = (set, get) => ({
  questions: [],
  answersLog: [],
  currentIndex: 0,
  score: 0,
  status: "start",
  mode: "normal",

  isLoading: false,
  error: null,

  startQuiz: () => {
    const { category, difficulty, questionLimit } = get();
    if (!category || !difficulty) return;

    const categoryData = localQuestions?.[category];
    const pool = categoryData?.[difficulty];

    if (!Array.isArray(pool) || pool.length === 0) {
      set({
        questions: [],
        answersLog: [],
        currentIndex: 0,
        score: 0,
        status: "start",
        mode: "normal",
        error: "No questions available for selected category/difficulty",
      });
      return;
    }

    const limit =
      typeof questionLimit === "number" && questionLimit > 0
        ? questionLimit
        : pool.length;

    const prepared = shuffle(pool).slice(0, limit);

    set({
      questions: prepared,
      answersLog: [],
      currentIndex: 0,
      score: 0,
      status: "quiz",
      mode: "normal",
      error: null,
    });
  },

  startRetryWrong: () => {
    const { weakQuestions } = get();

    if (!weakQuestions || typeof weakQuestions !== "object") return;

    const pool = Object.values(weakQuestions).filter((q) => q && q.wrong > 0);

    if (!pool.length) return;

    const prepared = shuffle(pool).map((q) => ({
      id: q.id,
      question: q.question,
      answers: q.answers,
      correctIndex: q.correctIndex,
    }));

    set({
      questions: prepared,
      answersLog: [],
      currentIndex: 0,
      score: 0,
      status: "quiz",
      mode: "retry",
    });
  },

  startQuizFromApi: async () => {
    const { category, questionLimit } = get();

    const apiCategory = API_CATEGORY_MAP?.[category];
    if (!apiCategory) {
      set({
        error: "Selected quiz is not supported by API",
      });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=${questionLimit}&category=${apiCategory}&type=multiple`,
      );

      const data = await res.json();

      if (
        !data?.results ||
        !Array.isArray(data.results) ||
        !data.results.length
      ) {
        throw new Error();
      }

      const adapted = data.results.map((q, idx) => {
        const correct = decode(q.correct_answer);
        const answers = shuffle([...q.incorrect_answers.map(decode), correct]);

        return {
          id: `api-${idx}-${Date.now()}`,
          question: decode(q.question),
          answers,
          correctIndex: answers.indexOf(correct),
        };
      });

      set({
        questions: adapted,
        answersLog: [],
        currentIndex: 0,
        score: 0,
        status: "quiz",
        mode: "normal",
        isLoading: false,
      });
    } catch {
      set({
        isLoading: false,
        error: "Failed to load API questions",
      });
    }
  },

  answerQuestion: (isCorrect, selectedIndex) => {
    const { currentIndex, questions, score, answersLog, weakQuestions, mode } =
      get();

    if (!Array.isArray(questions) || !questions[currentIndex]) return;

    const q = questions[currentIndex];

    const newLog = [
      ...answersLog,
      {
        question: q.question,
        answers: q.answers,
        correctIndex: q.correctIndex,
        selectedIndex,
      },
    ];

    const nextIndex = currentIndex + 1;
    const newScore = isCorrect ? score + 1 : score;

    const safeWeak =
      weakQuestions && typeof weakQuestions === "object" ? weakQuestions : {};

    if (!isCorrect && mode === "normal") {
      const updatedWeak = {
        ...safeWeak,
        [q.id]: {
          id: q.id,
          question: q.question,
          answers: q.answers,
          correctIndex: q.correctIndex,
          wrong: (safeWeak[q.id]?.wrong || 0) + 1,
        },
      };

      localStorage.setItem("weakQuestions", JSON.stringify(updatedWeak));

      set({
        weakQuestions: updatedWeak,
      });
    }

    if (nextIndex >= questions.length) {
      if (mode === "retry") {
        const remainingWeak = { ...safeWeak };

        if (isCorrect && remainingWeak[q.id]) {
          delete remainingWeak[q.id];
          localStorage.setItem("weakQuestions", JSON.stringify(remainingWeak));
        }

        set({
          score: newScore,
          answersLog: newLog,
          weakQuestions: remainingWeak,
          status: "result",
          mode: "normal",
        });
        return;
      }

      const total = questions.length || 1;
      const accuracy = Math.round((newScore / total) * 100);
      const weakCount = Object.keys(safeWeak).length;

      const lastResult = { score: newScore, accuracy, weakCount };

      localStorage.setItem("lastResult", JSON.stringify(lastResult));

      set({
        score: newScore,
        answersLog: newLog,
        lastResult,
        status: "result",
      });
    } else {
      set({
        score: newScore,
        currentIndex: nextIndex,
        answersLog: newLog,
      });
    }
  },
});
