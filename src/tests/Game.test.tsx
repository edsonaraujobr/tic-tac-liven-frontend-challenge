import { render, fireEvent } from "@testing-library/react";
import Game from "../app/Game";

it("renders game headings", () => {
  const { getByText } = render(<Game />);
  getByText("TIC-TAC-LIVEN");
});

it("renders board and check for step counter update", () => {
  const { getByText, getByTestId } = render(<Game />);

  getByText("Current step: 0");

  const square0 = getByTestId(`square-0`);
  fireEvent.click(square0);

  getByText("Current step: 1");
});

it("alternates players between X and O", () => {
  const { getByText, getByTestId } = render(<Game />);

  const square0 = getByTestId("square-0");
  fireEvent.click(square0);
  getByText("Next player: ⭕");

  const square1 = getByTestId("square-1");
  fireEvent.click(square1);
  getByText("Next player: ❌");
});

it("does not allow clicking the same square twice", () => {
  const { getByText, getByTestId } = render(<Game />);

  const square0 = getByTestId("square-0");
  fireEvent.click(square0);
  fireEvent.click(square0);

  getByText(/already chosen/i);
});

it("detects a winner correctly", () => {
  const { getByText, getByTestId } = render(<Game />);

  fireEvent.click(getByTestId("square-0"));
  fireEvent.click(getByTestId("square-3"));
  fireEvent.click(getByTestId("square-1"));
  fireEvent.click(getByTestId("square-4"));
  fireEvent.click(getByTestId("square-2"));

  getByText(/Winner: X/);
});

it("detects a draw (no winner)", () => {
  const { getByText, getByTestId } = render(<Game />);

  const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8];
  moves.forEach((id) => fireEvent.click(getByTestId(`square-${id}`)));

  getByText(/Draw: Game over/);
});

it("resets the game after a win when clicking again", () => {
  const { getByText, getByTestId } = render(<Game />);

  fireEvent.click(getByTestId("square-0"));
  fireEvent.click(getByTestId("square-3"));
  fireEvent.click(getByTestId("square-1"));
  fireEvent.click(getByTestId("square-4"));
  fireEvent.click(getByTestId("square-2"));

  getByText(/Winner: X/);

  fireEvent.click(getByTestId("square-5"));

  getByText("Current step: 0");
});
