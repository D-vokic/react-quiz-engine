function AnswerButton({ index, text, onClick, disabled }) {
  return (
    <button onClick={() => onClick(index)} disabled={disabled}>
      {text}
    </button>
  );
}

export default AnswerButton;
