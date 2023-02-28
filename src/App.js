import { useState, useEffect } from "react";

import StartGame from "./components/StartGame";
import GamePage from "./components/GamePage";

import { v4 as uuidv4 } from "uuid";
import { decode } from "html-entities";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [playAgain, setPlayAgain] = useState(false);
  const [checkAnswers, setCheckAnswers] = useState(false);
  const [score, setScore] = useState(0);
  const [numQuestions, setNumQuestions] = useState(5);
  const [category, setCategory] = useState("9");

  const apiUrl =
    category === "any"
      ? `https://opentdb.com/api.php?amount=${numQuestions}`
      : `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        const questionsArray = data.results.map((item) => {
          let answerChoices = [...item.incorrect_answers];
          const randomIndex = Math.floor(
            Math.random() * (item.incorrect_answers.length + 1)
          );

          if (
            item.correct_answer === "True" ||
            item.correct_answer === "False"
          ) {
            answerChoices = ["True", "False"];
          } else {
            console.log(randomIndex);
            answerChoices.splice(randomIndex, 0, item.correct_answer);
          }

          const answerArray = answerChoices.map((answer) => {
            return {
              answer: decode(answer),
              isCorrect: answer === item.correct_answer,
              isSelected: false,
              id: uuidv4(),
            };
          });

          return {
            question: decode(item.question),
            correctAnswer: item.correct_answer,
            answers: answerArray,
            id: uuidv4(),
          };
        });

        setQuestions(questionsArray);
      });
  }, [playAgain, numQuestions, category, apiUrl]);

  function handleSelect(event, questionId, answerId) {
    if (checkAnswers) {
      return;
    }

    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (questionId === question.id) {
          return {
            ...question,
            answers: question.answers.map((answer) => {
              if (answerId === answer.id) {
                return {
                  ...answer,
                  isSelected: true,
                };
              } else {
                return {
                  ...answer,
                  isSelected: false,
                };
              }
            }),
          };
        } else {
          return { ...question };
        }
      })
    );
  }

  function handleStartGame() {
    setGameStarted(true);
  }

  function handleCheckAnswers() {
    setCheckAnswers(true);
    let gameScore = 0;

    questions.forEach((question) => {
      question.answers.forEach((answer) => {
        if (answer.isCorrect && answer.isSelected) {
          gameScore++;
        }
      });
    });
    setScore(gameScore);
  }

  function handlePlayAgain() {
    setCheckAnswers(false);
    setPlayAgain((prevPlayAgain) => !prevPlayAgain);
    setScore(0);
  }

  return (
    <>
      {gameStarted ? (
        <GamePage
          questions={questions}
          handleSelect={handleSelect}
          checkAnswers={checkAnswers}
          handleCheckAnswers={handleCheckAnswers}
          handlePlayAgain={handlePlayAgain}
          score={score}
          numQuestions={numQuestions}
          setNumQuestions={setNumQuestions}
          category={category}
          setCategory={setCategory}
        />
      ) : (
        <StartGame
          handleStartGame={handleStartGame}
          numQuestions={numQuestions}
          setNumQuestions={setNumQuestions}
          category={category}
          setCategory={setCategory}
        />
      )}
    </>
  );
}
