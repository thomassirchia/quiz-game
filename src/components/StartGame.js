import Settings from "./Settings";
import { categoryNames } from "../categoryData";

export default function StartGame(props) {
  const categoryName = categoryNames[props.category];

  return (
    <div className="start-game">
      <h1 className="start-page-title">Quizzical</h1>
      <Settings
        numQuestions={props.numQuestions}
        setNumQuestions={props.setNumQuestions}
        category={props.category}
        setCategory={props.setCategory}
      />
      {/* <h1 className="start-game-title">Start Game</h1> */}
      <h3 className="start-game-tagline">
        {props.numQuestions} {categoryName} Trivia Questions
      </h3>
      <button className="btn start-game-button" onClick={props.handleStartGame}>
        Start Game
      </button>
    </div>
  );
}
