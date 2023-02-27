export default function StartGame(props) {
  return (
    <div className="start-game">
      <h1 className="start-game-title">Start Game</h1>
      <h3 className="start-game-tagline">
        5 general knowledge trivia questions
      </h3>
      <button className="btn start-game-button" onClick={props.handleStartGame}>
        Start Game
      </button>
    </div>
  );
}
