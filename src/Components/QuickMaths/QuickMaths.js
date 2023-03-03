import React, { useState } from "react";
import { evaluate } from "mathjs";
import "./style.scss";

function FlashCard() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [expression, setExpression] = useState(generateExpression());
  const [answer, setAnswer] = useState("");

  function generateExpression() {
    const operations = ["+", "-", "*", "/"];
    const operands = Array.from({ length: 2 }, () =>
      Math.floor(Math.random() * 10)
    );
    const operator = operations[Math.floor(Math.random() * operations.length)];
    return `${operands[0]} ${operator} ${operands[1]}`;
  }

  function checkAnswer(answer) {
    const correctAnswer = evaluate(expression).toString();
    setAnswer(answer);
    if (answer === correctAnswer) {
      generateNewCard();
    }
  }

  function toggleAnswer() {
    setShowAnswer(!showAnswer);
  }

  function generateNewCard() {
    setExpression(generateExpression());
    setAnswer("");
    setShowAnswer(false);
  }

  return (
    <div className="QuickMaths">
      <p>
        {expression} =
        <span>{showAnswer && evaluate(expression).toString()}</span>
      </p>
      {!showAnswer ? (
        <input
          type="text"
          value={answer}
          onChange={(event) => {
            checkAnswer(event.target.value);
          }}
        />
      ) : (
        <></>
      )}
      <div className="Buttons">
        {!showAnswer ? (
          <button onClick={toggleAnswer}>Show Answer</button>
        ) : (
          <></>
        )}
        <button onClick={generateNewCard}>Skip</button>
      </div>
    </div>
  );
}

export default FlashCard;
