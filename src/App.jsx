import { useEffect, useState } from "react";
import "./App.css";
import CalculatorScreen from "./components/CalculatorScreen";
import Grid from "./components/Grid";

function App() {
  const [input, setInput] = useState("");
  const [screenInput, setScreenInput] = useState("");
  const [finalResult, setFinalResult] = useState("0");
  const [resultIsNotEmpty, setResultIsNotEmpty] = useState(false);
  const operators = {
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
    if (
      input.length != 0 &&
      isNaN(character) &&
      isNaN(input[input.length - 1]) &&
      character != "C"
    ) {
      return;
    } else if (character === ".") {
      if (input.length === 0) {
        setInput(input + "0.");
        setScreenInput(screenInput + "0.");
      } else {
        const numbersInInput = input.split(/[+\-\x/]/);
        const currentNumber = numbersInInput[numbersInInput.length - 1];
        if (currentNumber.includes(".")) {
          return;
        } else {
          setInput(input + character);
          setScreenInput(screenInput + character);
        }
        return;
      }
    } else {
      if (character === "=") {
        setResultIsNotEmpty(true);
        parseInput(input);
        console.log("input = jälkeen: " + input);
      } else if (character.toLowerCase() === "bs") {
        setInput(input.slice(0, -1));
        setScreenInput(screenInput.slice(0, -1));
      } else if (character === "C") {
        setResultIsNotEmpty(false);
        setInput([]);
        setScreenInput("");
        setFinalResult("0");
      } else if (character === "%") {
        setInput(input + "/100");
        setScreenInput(screenInput + "%");
        return;
      } else {
        if (resultIsNotEmpty) {
          // if result exists, copy it to begin a new calculation
          // copy the result also to the screen input state
          let screenCopy = finalResult;
          screenCopy += character;

          let copy = finalResult;
          setFinalResult("0");
          copy += character;

          setInput(copy);
          setResultIsNotEmpty(false);
          setScreenInput(screenCopy);
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

  // useEffect(() => {
  //   //
  // }, [input]);

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
          let o2 = stack[stack.length - 1];

          while (
            o2 !== undefined &&
            o2 !== "(" &&
            (operators[o2].prec > operators[o1].prec ||
              (operators[o2].prec === operators[o1].prec &&
                operators[o1].assoc === "left"))
          ) {
            output.push(stack.pop());
            o2 = stack[stack.length - 1];
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
      assert(stack[stack.length - 1] !== "(");
      output.push(stack.pop());
    }

    if (output.length < 3) {
      setFinalResult("");
      setScreenInput("");
    } else {
      handleCalculation(output);
    }
  };

  const handleCalculation = (input) => {
    const stack = [];
    let error = "Cannot divide by 0";

    const handleToken = (token) => {
      if (!isNaN(parseFloat(token))) {
        stack.push(token);
        return;
      }

      const right = parseFloat(stack.pop());
      const left = parseFloat(stack.pop());
      // console.log('right: ' + right + ' left: ' + left)

      if (token === "/" && right === 0) {
        setFinalResult(error);
        return;
      }
      switch (token) {
        case "+":
          stack.push(left + right);
          break;
        case "-":
          stack.push(left - right);
          break;
        case "x":
          stack.push(left * right);
          break;
        case "/":
          stack.push(left / right);
          break;
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
