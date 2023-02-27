export default function Question(props) {
  const answerElements = props.answers.map((item, index) => {
    let styles = {};

    if (props.checkAnswers) {
      if (item.isCorrect) {
        styles = {
          backgroundColor: "#94D7A2",
          border: "1px solid #94D7A2",
        };
      } else if (item.isSelected) {
        styles = {
          backgroundColor: "#F8BCBC",
          border: "1px solid #F8BCBC",
          color: "#4D5B9E",
          opacity: "0.75",
        };
      } else {
        styles = {
          opacity: "0.5",
        };
      }
    } else {
      styles = {
        backgroundColor: item.isSelected ? "#D6DBF5" : "#FFFFFF",
        border: item.isSelected ? "1px solid #D6DBF5" : "1px solid #4D5B9E",
      };
    }

    return (
      <div
        className="question-answer"
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
