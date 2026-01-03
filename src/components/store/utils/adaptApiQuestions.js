import { shuffle } from "./shuffle";

export function adaptApiQuestions(apiQuestions) {
  return apiQuestions.map((q, index) => {
    const decodedQuestion = decodeHtml(q.question);

    const decodedCorrect = decodeHtml(q.correct_answer);
    const decodedIncorrect = (q.incorrect_answers || []).map(decodeHtml);

    const decodedAnswers = shuffle([...decodedIncorrect, decodedCorrect]);
    const correctIndex = decodedAnswers.indexOf(decodedCorrect);

    return {
      id: `api-${Date.now()}-${index}`,
      question: decodedQuestion,
      answers: decodedAnswers,
      correctIndex: correctIndex >= 0 ? correctIndex : 0,
    };
  });
}

function decodeHtml(text) {
  const txt = document.createElement("textarea");
  txt.innerHTML = String(text ?? "");
  return txt.value;
}
