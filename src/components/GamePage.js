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
    <div className="game-page-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        className="back-arrow btn-grow"
        onClick={() => props.setGameStarted(false)}
      >
        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
      </svg>
      <div className="game-page-card card-effect">
        <h1 className="game-page-title">TriviaQuiz</h1>
        <h3 className="game-page-tagline">
          {props.numQuestions} {props.categoryName} Trivia Questions
        </h3>
        {/* <Settings
        numQuestions={props.numQuestions}
        setNumQuestions={props.setNumQuestions}
        category={props.category}
        setCategory={props.setCategory}
      /> */}
        {questionElements}

        {props.checkAnswers && (
          <div className="score-container">
            <p className="score">
              You scored {props.score}/{props.questions.length} correct answers
            </p>
            <button
              className="btn btn-play-again btn-grow"
              onClick={props.handlePlayAgain}
            >
              Play Again
            </button>
          </div>
        )}

        {!props.checkAnswers && (
          <button
            className="btn btn-check btn-grow"
            onClick={props.handleCheckAnswers}
            disabled={!userAnsweredAllQuestions}
          >
            Check Answers
          </button>
        )}
      </div>
    </div>
  );
}
