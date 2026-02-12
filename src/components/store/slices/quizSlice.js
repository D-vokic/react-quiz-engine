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
    if (!category) return;

    const pool = localQuestions[category][difficulty];
    const prepared = shuffle(pool).slice(0, questionLimit);

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
    const pool = Object.values(weakQuestions).filter((q) => q.wrong > 0);

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

    const apiCategory = API_CATEGORY_MAP[category];
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

      if (!data.results || !data.results.length) {
        throw new Error();
      }

      const adapted = data.results.map((q, idx) => {
        const answers = shuffle([
          ...q.incorrect_answers.map(decode),
          decode(q.correct_answer),
        ]);

        return {
          id: `api-${idx}-${Date.now()}`,
          question: decode(q.question),
          answers,
          correctIndex: answers.indexOf(decode(q.correct_answer)),
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

    if (!isCorrect && mode === "normal") {
      const updatedWeak = {
        ...(weakQuestions || {}),
        [q.id]: {
          id: q.id,
          question: q.question,
          answers: q.answers,
          correctIndex: q.correctIndex,
          wrong: ((weakQuestions && weakQuestions[q.id]?.wrong) || 0) + 1,
        },
      };

      localStorage.setItem("weakQuestions", JSON.stringify(updatedWeak));

      set({
        weakQuestions: updatedWeak,
      });
    }

    if (nextIndex >= questions.length) {
      if (mode === "retry") {
        const remainingWeak = { ...(weakQuestions || {}) };

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

      const accuracy = Math.round((newScore / questions.length) * 100);
      const weakCount = Object.keys(get().weakQuestions || {}).length;

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
