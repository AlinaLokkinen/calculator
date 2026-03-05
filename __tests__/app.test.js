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


  })

});
