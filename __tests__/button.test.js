/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../src/components/Button";

describe("button ", () => {
  test("exists", () => {
    const handleClick = jest.fn();
    render(<Button handleClick={handleClick} b={"text"} />);

    const button = screen.getByText(/text/i);

    expect(button).not.toBeUndefined();
  });

  test("renders backspace icon and calls onClick when button is clicked", () => {
    const handleClick = jest.fn();
    render(<Button handleClick={handleClick} b="bs" />);

    const img = screen.getByAltText(/backspace icon/i);
    fireEvent.click(img);

    expect(handleClick).toHaveBeenCalledWith("bs");
  })

  test("calls onClick when a button other than backspace is clicked", () => {
    const handleClick = jest.fn();
    render(<Button handleClick={handleClick} b="Click me" />);

    const button = screen.getByText(/click me/i);
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
