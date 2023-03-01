import Settings from "./Settings";
import Question from "./Question";

export default function GamePage(props) {
  const questionElements = props.questions.map((question, index) => (
    <Question
      key={index}
      id={question.id}
      question={question.question}
      answers={question.answers}
      handleSelect={props.handleSelect}
      checkAnswers={props.checkAnswers}
    />
  ));

  const selectedAnswers = props.questions.map((question) => {
    const answers = question.answers;
    return answers.map((answer) => answer.isSelected).includes(true);
  });

  let numberSelectedAnswers = 0;

  selectedAnswers.forEach((answer) => {
    if (answer) {
      numberSelectedAnswers++;
    }
  });

  const userAnsweredAllQuestions =
    numberSelectedAnswers === props.questions.length;

  return (
    <div className="container">
      <h1 className="game-page-title">TriviaQuiz</h1>
      <Settings
        numQuestions={props.numQuestions}
        setNumQuestions={props.setNumQuestions}
        category={props.category}
        setCategory={props.setCategory}
      />
      {questionElements}

      {props.checkAnswers && (
        <div className="score-container">
          <p className="score">
            You scored {props.score}/{props.questions.length} correct answers
          </p>
          <button
            className="btn play-again-button"
            onClick={props.handlePlayAgain}
          >
            Play Again
          </button>
        </div>
      )}

      {!props.checkAnswers && (
        <button
          className="btn check-button"
          onClick={props.handleCheckAnswers}
          disabled={!userAnsweredAllQuestions}
        >
          Check Answers
        </button>
      )}
    </div>
  );
}
