import Settings from "./Settings";
import { categoryNames } from "../categoryData";

export default function StartGame(props) {
  const categoryName = categoryNames[props.category];

  return (
    <div className="start-game-container">
      <div className="start-game-card card-effect">
        <h1 className="start-game-title">TriviaQuiz</h1>
        <Settings
          numQuestions={props.numQuestions}
          setNumQuestions={props.setNumQuestions}
          category={props.category}
          setCategory={props.setCategory}
        />
        {/* <h1 className="start-game-title">Start Game</h1> */}
        <h3 className="start-game-tagline">
          You will get {props.numQuestions} {categoryName} trivia questions
        </h3>
        <button
          className="btn btn-start-game btn-grow"
          onClick={props.handleStartGame}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
