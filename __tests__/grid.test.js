/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import Grid from "../src/components/Grid";

describe("Grid", () => {
  test("renders", () => {
    const handleInput = jest.fn();
    render(<Grid handleInput={handleInput} />);

    const button = screen.getByText("C");

    expect(button).toBeInTheDocument();
  });

  test("renders all buttons", () => {
    const handleInput = jest.fn();
    render(<Grid handleInput={handleInput} />);
    const buttons = [
      "C",
      "%",
      "/",
      "x",
      "7",
      "8",
      "9",
      "-",
      "4",
      "5",
      "6",
      "+",
      "3",
      "2",
      "1",
      "=",
      "0",
      ".",
      "bs",
    ];

    buttons.forEach((button) => {
      if (button === "bs") {
        const img = screen.getByAltText(/backspace icon/i);
        expect(img).toBeInTheDocument();
      } else {
        expect(screen.getByText(button)).toBeInTheDocument();
      }
    });
  });

  test("handles button click", () => {
    const handleInput = jest.fn();
    render(<Grid handleInput={handleInput} />);

    const button = screen.getByText("C");
    fireEvent.click(button);

    expect(handleInput).toHaveBeenCalledWith("C");
  });
});
