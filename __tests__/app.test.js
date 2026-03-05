/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../src/App";

describe("app", () => {
  test("renders screen, buttons and backspace button", () => {
    render(<App />);

    const calcScreen = screen.getByText("CALCI");
    const button = screen.getByText("C");
    const bs = screen.getByAltText("backspace icon");

    expect(calcScreen).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(bs).toBeInTheDocument();
  });

  test("addition", () => {
    render(<App />);

    const screenInput = screen.getByTestId("screen-input");

    fireEvent.click(screen.getByText("1"));
    expect(screenInput).toHaveTextContent("1");

    fireEvent.click(screen.getByText("+"));
    expect(screenInput).toHaveTextContent("1+");

    fireEvent.click(screen.getByText("1"));
    expect(screenInput).toHaveTextContent("1+1");

    fireEvent.click(screen.getByText("="));
    expect(screenInput).toHaveTextContent("1+1");

    const result = screen.getByTestId("screen-result");
    expect(result).toHaveTextContent("2");
  });

  test("subtraction", () => {
    render(<App />);

    const screenInput = screen.getByTestId("screen-input");

    fireEvent.click(screen.getByText("1"));
    expect(screenInput).toHaveTextContent("1");

    fireEvent.click(screen.getByText("-"));
    expect(screenInput).toHaveTextContent("1-");

    fireEvent.click(screen.getByText("1"));
    expect(screenInput).toHaveTextContent("1-1");

    fireEvent.click(screen.getByText("="));
    expect(screenInput).toHaveTextContent("1-1");

    const result = screen.getByTestId("screen-result");
    expect(result).toHaveTextContent("0");
  });

  test("division", () => {
    render(<App />);

    const screenInput = screen.getByTestId("screen-input");

    fireEvent.click(screen.getByText("2"));
    expect(screenInput).toHaveTextContent("2");

    fireEvent.click(screen.getByText("/"));
    expect(screenInput).toHaveTextContent("2/");

    fireEvent.click(screen.getByText("1"));
    expect(screenInput).toHaveTextContent("2/1");

    fireEvent.click(screen.getByText("="));
    expect(screenInput).toHaveTextContent("2/1");

    const result = screen.getByTestId("screen-result");
    expect(result).toHaveTextContent("2");
  });

  test("multiplication", () => {
    render(<App />);

    const screenInput = screen.getByTestId("screen-input");

    fireEvent.click(screen.getByText("2"));
    expect(screenInput).toHaveTextContent("2");

    fireEvent.click(screen.getByText("x"));
    expect(screenInput).toHaveTextContent("2x");

    fireEvent.click(screen.getByText("1"));
    expect(screenInput).toHaveTextContent("2x1");

    fireEvent.click(screen.getByText("="));
    expect(screenInput).toHaveTextContent("2x1");

    const result = screen.getByTestId("screen-result");
    expect(result).toHaveTextContent("2");
  });

  test("clear input and result", () => {
    render(<App />);

    const screenInput = screen.getByTestId("screen-input");

    fireEvent.click(screen.getByText("2"));
    expect(screenInput).toHaveTextContent("2");

    fireEvent.click(screen.getByText("/"));
    expect(screenInput).toHaveTextContent("2/");

    fireEvent.click(screen.getByText("1"));
    expect(screenInput).toHaveTextContent("2/1");

    fireEvent.click(screen.getByText("C"));
    expect(screenInput).toHaveTextContent("");

    const result = screen.getByTestId("screen-result");
    expect(result).toHaveTextContent("0");
  });

  test("continue calculation from result", () => {
    render(<App />);

    const screenInput = screen.getByTestId("screen-input");

    fireEvent.click(screen.getByText("2"));
    expect(screenInput).toHaveTextContent("2");

    fireEvent.click(screen.getByText("/"));
    expect(screenInput).toHaveTextContent("2/");

    fireEvent.click(screen.getByText("1"));
    expect(screenInput).toHaveTextContent("2/1");

    fireEvent.click(screen.getByText("="));
    expect(screenInput).toHaveTextContent("2/1");

    const result = screen.getByTestId("screen-result");
    expect(result).toHaveTextContent("2");

    fireEvent.click(screen.getByText("x"));
    expect(screenInput).toHaveTextContent("2x");

    fireEvent.click(screen.getByText("2"));
    expect(screenInput).toHaveTextContent("2x2");

    fireEvent.click(screen.getByText("="));
    expect(result).toHaveTextContent("4");
  });

  test("handles calculation with multiple operators", () => {
    // 1 + 2 / 2 * 4
    // 5?

    render(<App />);

    const screenInput = screen.getByTestId("screen-input");

    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("/"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("x"));
    fireEvent.click(screen.getByText("4"));

    expect(screenInput).toHaveTextContent("1+2/2x4");

    fireEvent.click(screen.getByText("="));

    const result = screen.getByTestId("screen-result");
    expect(result).toHaveTextContent("5");
  });

  test("% divides previous number by 100", () => {
    // 1 + 2 / 2 * 4 %
    // = 1 + 1 * 0.04
    // = 1.04

    render(<App />);

    const screenInput = screen.getByTestId("screen-input");

    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("/"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("x"));
    fireEvent.click(screen.getByText("4"));
    fireEvent.click(screen.getByText("%"));

    expect(screenInput).toHaveTextContent("1+2/2x4%");

    fireEvent.click(screen.getByText("="));

    const result = screen.getByTestId("screen-result");
    expect(result).toHaveTextContent("1.04");
  });

  test("calculating two numbers with %", () => {
    // 10% + 50%
    // = 0.6

    render(<App />);

    const screenInput = screen.getByTestId("screen-input");

    fireEvent.click(screen.getByTestId("button-1"));
    fireEvent.click(screen.getByTestId("button-0"));
    fireEvent.click(screen.getByTestId("button-%"));
    fireEvent.click(screen.getByTestId("button-+"));
    fireEvent.click(screen.getByTestId("button-5"));
    fireEvent.click(screen.getByTestId("button-0"));
    fireEvent.click(screen.getByTestId("button-%"));


    expect(screenInput).toHaveTextContent("10%+50%");

    fireEvent.click(screen.getByText("="));

    const result = screen.getByTestId("screen-result");
    expect(result).toHaveTextContent("0.6");
  });

  test("backspace removes last character", () => {
    // 1 + 2 / 2 * 4
    // bs
    // = 1 + 2 / 2 *

    render(<App />);

    const screenInput = screen.getByTestId("screen-input");
    const bs = screen.getByAltText("backspace icon");

    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("/"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("x"));
    fireEvent.click(screen.getByText("4"));
    fireEvent.click(bs);

    expect(screenInput).toHaveTextContent("1+2/2x");
  });

  test("calculates decimal numbers", () => {
    render(<App />);

    const screenInput = screen.getByTestId("screen-input");

    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("."));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));

    expect(screenInput).toHaveTextContent("1.2+2");

    fireEvent.click(screen.getByText("="));

    const result = screen.getByTestId("screen-result");
    expect(result).toHaveTextContent("3.2");
  });

  test("calculates very small decimal numbers", () => {
    render(<App />);

    const screenInput = screen.getByTestId("screen-input");

    fireEvent.click(screen.getByTestId("button-0"));
    fireEvent.click(screen.getByTestId("button-."));
    fireEvent.click(screen.getByTestId("button-0"));
    fireEvent.click(screen.getByTestId("button-0"));
    fireEvent.click(screen.getByTestId("button-0"));
    fireEvent.click(screen.getByTestId("button-0"));
    fireEvent.click(screen.getByTestId("button-7"));
    fireEvent.click(screen.getByTestId("button-x"));
    fireEvent.click(screen.getByTestId("button-0"));
    fireEvent.click(screen.getByTestId("button-."));
    fireEvent.click(screen.getByTestId("button-0"));
    fireEvent.click(screen.getByTestId("button-0"));
    fireEvent.click(screen.getByTestId("button-0"));
    fireEvent.click(screen.getByTestId("button-0"));
    fireEvent.click(screen.getByTestId("button-4"));

   

    expect(screenInput).toHaveTextContent("0.00007x0.00004");

    fireEvent.click(screen.getByText("="));

    const result = screen.getByTestId("screen-result");
    expect(result).toHaveTextContent("2.8e-9");
  });


  test("throws NaN if user tries to divide by 0", () => {
    render(<App />);

    const screenInput = screen.getByTestId("screen-input");

    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("/"));
    fireEvent.click(screen.getByTestId("button-0"));

    expect(screenInput).toHaveTextContent("1+2/0");

    fireEvent.click(screen.getByText("="));

    const result = screen.getByTestId("screen-result");
    expect(result).toHaveTextContent("NaN");
  });

  test("handles calculation with numbers with multiple digits", () => {
    render(<App />);

    const screenInput = screen.getByTestId("screen-input");

    fireEvent.click(screen.getByTestId("button-1"));
    fireEvent.click(screen.getByTestId("button-1"));
    fireEvent.click(screen.getByTestId("button-+"));
    fireEvent.click(screen.getByTestId("button-2"));
    fireEvent.click(screen.getByTestId("button-2"));
    fireEvent.click(screen.getByTestId("button-4"));
    fireEvent.click(screen.getByTestId("button-/"));
    fireEvent.click(screen.getByTestId("button-4"));
    fireEvent.click(screen.getByTestId("button-1"));

    expect(screenInput).toHaveTextContent("11+224/41");

    fireEvent.click(screen.getByTestId("button-="));

    const result = screen.getByTestId("screen-result");
    expect(result).toHaveTextContent("16.46341");
  });

  test("handles calculation with decimal numbers with multiple digits", () => {
    render(<App />);

    const screenInput = screen.getByTestId("screen-input");

    fireEvent.click(screen.getByTestId("button-1"));
    fireEvent.click(screen.getByTestId("button-1"));
    fireEvent.click(screen.getByTestId("button-."));
    fireEvent.click(screen.getByTestId("button-2"));
    fireEvent.click(screen.getByTestId("button-5"));
    fireEvent.click(screen.getByTestId("button-+"));
    fireEvent.click(screen.getByTestId("button-2"));
    fireEvent.click(screen.getByTestId("button-2"));
    fireEvent.click(screen.getByTestId("button-."));
    fireEvent.click(screen.getByTestId("button-4"));
    fireEvent.click(screen.getByTestId("button-/"));
    fireEvent.click(screen.getByTestId("button-4"));
    fireEvent.click(screen.getByTestId("button-1"));
    fireEvent.click(screen.getByTestId("button-."));
    fireEvent.click(screen.getByTestId("button-9"));
    fireEvent.click(screen.getByTestId("button-9"));


    expect(screenInput).toHaveTextContent("11.25+22.4/41.99");

    fireEvent.click(screen.getByTestId("button-="));

    const result = screen.getByTestId("screen-result");
    expect(result).toHaveTextContent("11.78346");
  });

  test("does not allow multiple operators in a row", () => {
    render(<App />);

    const screenInput = screen.getByTestId("screen-input");

    fireEvent.click(screen.getByText("1"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("+"));
    fireEvent.click(screen.getByText("2"));
    fireEvent.click(screen.getByText("/"));
    fireEvent.click(screen.getByText("3"));


    expect(screenInput).toHaveTextContent("1+2/3");

    fireEvent.click(screen.getByTestId("button-="))
    const result = screen.getByTestId("screen-result");
    expect(result).toHaveTextContent("1.66667");
  });

  test("clicking /=/ when input does not have at least two numbers and an operator does nothing", () => {
    render(<App />);

    const screenInput = screen.getByTestId("screen-input");
    fireEvent.click(screen.getByTestId("button-1"))
    fireEvent.click(screen.getByTestId("button-+"))
    fireEvent.click(screen.getByTestId("button-="))
    expect(screenInput).not.toHaveTextContent();
    const result = screen.getByTestId("screen-result");
    expect(result).toHaveTextContent("0");
  })

  test("clicking backspace if screeninput is empty does nothing", () => {
    render(<App />);

    const screenInput = screen.getByTestId("screen-input");
    fireEvent.click(screen.getByTestId("button-bs"))
    expect(screenInput).not.toHaveTextContent();
    const result = screen.getByTestId("screen-result");
    expect(result).toHaveTextContent("0");
  })
});


