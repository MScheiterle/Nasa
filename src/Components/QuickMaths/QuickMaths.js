import React, { useState } from "react";
import * as math from "mathjs";
import "./style.scss";

function ElementaryMathPractice() {
  const [expression, setExpression] = useState(generateExpression("+"));
  const [answer, setAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [operator, setOperator] = useState("+");

  function generateExpression(operator) {
    const min = 1;
    const max = 20;
    const num1 = Math.floor(Math.random() * (max - min + 1) + min);
    const num2 = Math.floor(Math.random() * (max - min + 1) + min);
    switch (operator) {
      case "+":
        return `${num1} + ${num2}`;
      case "-":
        return `${num1} - ${num2}`;
      case "*":
        return `${num1} * ${num2}`;
      case "/":
        return `${num1 * num2} / ${num1}`;
      default:
        return `${num1} + ${num2}`;
    }
  }

  function checkAnswer(answer) {
    const correctAnswer = math.evaluate(expression).toString();
    setAnswer(answer);
    if (answer === correctAnswer) {
      resetCard();
    }
  }

  function resetCard() {
    setShowAnswer(false);
    setExpression(generateExpression(operator));
    setAnswer("");
  }

  function handleOperatorChange(event) {
    const newOperator = event.target.value;
    if (newOperator !== operator) {
      setOperator(newOperator);
      setExpression(generateExpression(newOperator));
      setAnswer("");
      setShowAnswer(false);
    }
  }

  return (
    <div className="QuickMaths">
      <div>
        <h2>Elementary Math Practice</h2>
        <div>
          <label>
            <input
              type="radio"
              name="operator"
              value="+"
              checked={operator === "+"}
              onChange={handleOperatorChange}
            />
            Addition
          </label>
          <label>
            <input
              type="radio"
              name="operator"
              value="-"
              checked={operator === "-"}
              onChange={handleOperatorChange}
            />
            Subtraction
          </label>
          <label>
            <input
              type="radio"
              name="operator"
              value="*"
              checked={operator === "*"}
              onChange={handleOperatorChange}
            />
            Multiplication
          </label>
          <label>
            <input
              type="radio"
              name="operator"
              value="/"
              checked={operator === "/"}
              onChange={handleOperatorChange}
            />
            Division
          </label>
        </div>
      </div>
      <div>
        <h3 className="expression">
          {expression} = {showAnswer ? math.evaluate(expression) : <></>}
        </h3>

        <div className="input_section">
          <div>
            {!showAnswer ? (
              <input
                type="text"
                value={answer}
                onChange={(event) => {
                  checkAnswer(event.target.value);
                }}
              />
            ) : (
              <input
                type="text"
                value={answer}
                onChange={(event) => {
                  checkAnswer(event.target.value);
                }}
                disabled
              />
            )}
            {!showAnswer ? (
              <button onClick={() => setShowAnswer(true)}>Show Answer</button>
            ) : (
              <></>
            )}
            <button onClick={resetCard}>{showAnswer ? "Next" : "Skip"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ElementaryMathPractice;