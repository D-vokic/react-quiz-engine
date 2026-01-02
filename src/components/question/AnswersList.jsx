import AnswerButton from "./AnswerButton";

function AnswersList({ answers, onAnswer, disabled }) {
  return (
    <>
      {answers.map((answer, index) => (
        <AnswerButton
          key={index}
          index={index}
          text={answer}
          onClick={onAnswer}
          disabled={disabled}
        />
      ))}
    </>
  );
}

export default AnswersList;
