/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import CalculatorScreen from '../src/components/CalculatorScreen';

describe("CalculatorScreen ", () => {

    test("renders", async () => {
        const result = 0;
        const screenInput = 0;
        render(<CalculatorScreen result={result} screenInput={screenInput} />);

        const calcScreen = await screen.getByText(/CALCI/i);

        expect(calcScreen).toBeInTheDocument();

    })

    test("shows result correctly if result is other than 0", () => {
        const result = 15;
        const screenInput = 0;
        render(<CalculatorScreen result={result} screenInput={screenInput} />);

        const res = screen.getByText(/15/i);

        expect(res).toBeInTheDocument();
    })

    test("has a result with max 5 decimal places", () => {
        const result = 15.12345678;
        const screenInput = 0;
        render(<CalculatorScreen result={result} screenInput={screenInput} />);

        const res = screen.getByText(/15.12346/i);

        expect(res).toBeInTheDocument();
    })

    test("shows 0 if result is 0", () => {
        const result =0;
        const screenInput = 15+2;
        render(<CalculatorScreen result={result} screenInput={screenInput} />);

        const res = screen.getByText(/0/i);

        expect(res).toBeInTheDocument();
    })

    test("shows screen input", async () => {
        const result = 0;
        const screenInput = "5+5";
        render(<CalculatorScreen result={result} screenInput={screenInput} />);

        const scInput = await screen.getByText(/5\+5/);

        expect(scInput).toBeInTheDocument();

    })
})