import { useEffect, useState } from "react";
import "./App.css";
import CalculatorScreen from "./components/CalculatorScreen";
import Grid from "./components/Grid";

function App() {
  const [input, setInput] = useState("");
  const [screenInput, setScreenInput] = useState("");
  const [finalResult, setFinalResult] = useState("0");
  const operators = {
    "^": {
      prec: 4,
      assoc: "right",
    },
    x: {
      prec: 3,
      assoc: "left",
    },
    "/": {
      prec: 3,
      assoc: "left",
    },
    "+": {
      prec: 2,
      assoc: "left",
    },
    "-": {
      prec: 2,
      assoc: "left",
    },
  };

  const handleInput = (character) => {
    if (character === "=") {
      parseInput(input);
      let copy = "";
      setInput(copy);
    } else if (character.toLowerCase() === "bs") {
      const copy = [...input];
      copy.pop();
      setInput(copy);
    } else if (character === "C") {
      setInput([]);
      setScreenInput("");
      setFinalResult(0);
    } else {
      let copy = screenInput;
      copy += character;
      setScreenInput(copy);
      if (!isNaN(parseFloat(character))) {
        setInput(input + character);
      } else {
        setInput(input + character);
      }
    }
  };

  const parseInput = (input) => {
    // console.log('parsing')
    const parsed = [];
    let token = "";
    for (let i = 0; i < input.length; i++) {
      if (input[i] === " ") continue;
      if (!Object.keys(operators).includes(input[i])) {
        token += input[i];
      } else {
        if (token.length > 0) {
          parsed.push(token);
          token = "";
        }
        parsed.push(input[i]);
      }
    }
    if (token.length > 0) {
      parsed.push(token);
    }
    shuntingYard(parsed);
  };

  useEffect(() => {
    // console.log("Input: " + input);
  }, [input]);

  const assert = (predicate) => {
    if (predicate) return;
    throw new Error("Assertion failed due to invalid token");
  };

  const shuntingYard = (input) => {
    const stack = [];
    let output = [];

    const handleToken = (token) => {
      switch (true) {
        case !isNaN(parseFloat(token)):
          output.push(token);
          break;
        case Object.keys(operators).includes(token):
          const o1 = token;
          let o2 = stack[stack.length-1];

          while (
            o2 !== undefined &&
            o2 !== "(" &&
            (operators[o2].prec > operators[o1].prec ||
              (operators[o2].prec === operators[o1].prec &&
                operators[o1].assoc === "left"))
          ) {
            output.push(stack.pop());
            o2 = stack[stack.length-1];
          }
          stack.push(o1);
          break;
      }
    };

    for (let i of input) {
      if (i === " ") continue;

      handleToken(i);
    }

    while (stack.length !== 0) {
      assert(stack[stack.length-1] !== "(");
      output.push(stack.pop());
    }

    // console.log("output: " + output);
    // console.log("stack: " + stack);

    // console.log("output: " + output);
    handleCalculation(output);
  };

  const handleCalculation = (input) => {
    const stack = [];

    const handleToken = (token) => {
      if (!isNaN(parseFloat(token))) {
        stack.push(token);
        return;
      }

      const right = parseFloat(stack.pop());
      const left = parseFloat(stack.pop());
      // console.log('right: ' + right + ' left: ' + left)

      switch (token) {
        case "+":
          stack.push(left + right);
          return;
        case "-":
          stack.push(left - right);
          return;
        case "x":
          stack.push(left * right);
          return;
        case "/":
          stack.push(left / right);
          return;
      }
    };

    for (let i of input) {
      if (i === " ") continue;
      handleToken(i);
    }
    setFinalResult(stack.pop());
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center font-inter">
      <CalculatorScreen screenInput={screenInput} result={finalResult} />
      <Grid handleInput={handleInput} />
    </div>
  );
}

export default App;
