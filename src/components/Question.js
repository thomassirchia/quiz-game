export default function Question(props) {
  const answerElements = props.answers.map((item, index) => {
    let styles = {};

    if (props.checkAnswers) {
      if (item.isCorrect) {
        styles = {
          backgroundColor: "rgb(225, 255, 212)",
          border: "1px solid rgb(225, 255, 212)", //#94D7A2
          color: "rgb(68, 128, 40)",
          fontWeight: 700,
        };
      } else if (item.isSelected) {
        styles = {
          backgroundColor: "#fcaeae", //#fcaea8
          border: "1px solid #fcaeae",
          color: "#4D5B9E",
          opacity: "0.8",
        };
      } else {
        styles = {
          opacity: "0.5",
        };
      }
    } else {
      styles = {
        backgroundColor: item.isSelected
          ? "#2f1960"
          : "rgba(255, 255, 255, 0.5)",
        border: item.isSelected ? "1px solid #2f1960" : "1px solid #4D5B9E",
        color: item.isSelected ? "#FFFFFF" : "",
      };
    }

    return (
      <div
        className="question-answer btn-grow"
        style={styles}
        key={index}
        onClick={(event) => props.handleSelect(event, props.id, item.id)}
      >
        {item.answer}
      </div>
    );
  });

  return (
    <div className="question-block">
      <h3 className="question">{props.question}</h3>
      <div className="question-answers">{answerElements}</div>
    </div>
  );
}
