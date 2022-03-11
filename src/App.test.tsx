import React from "react";
import { render, screen, fireEvent, getByText } from "@testing-library/react";
import App from "./components/App";
import userEvent from "@testing-library/user-event";

it("shows the title", () => {
  render(<App />);
  expect(screen.getByText(/the game of life/i)).toBeInTheDocument();
});

it("it should show buttons", () => {
  render(<App />);

  expect(screen.getByText(/clear/i)).toBeInTheDocument();
  expect(screen.getByText(/next/i)).toBeInTheDocument();
  expect(screen.getByText(/reset/i)).toBeInTheDocument();
  expect(screen.getByText(/start/i)).toBeInTheDocument();
});

it("Indicators show the generation number and the size of population", () => {
  render(<App />);

  expect(screen.getByText(/generation:/i)).toBeInTheDocument();
  expect(screen.getByText(/population:/i)).toBeInTheDocument();
});

it("it should have 30x30 cells at minimum", () => {
  render(<App />);

  const checkboxes = screen.getAllByRole("checkbox");
  expect(checkboxes.length).toEqual(900);
  expect(checkboxes[0]).toBeEnabled();
});

describe("intial state", () => {
  it("should be set, by clicking on cells", () => {
    render(<App />);

    const checkbox = screen.getAllByRole("checkbox")[0];
    userEvent.click(checkbox);
    expect(screen.getByRole("checkbox", { checked: true })).toBeInTheDocument();
  });

  it("the state can be cleared with a button", () => {
    render(<App />);

    const checkbox = screen.getAllByRole("checkbox")[0];
    userEvent.click(checkbox);
    userEvent.click(screen.getByText(/clear/i));
    expect(
      screen.queryByRole("checkbox", { checked: true })
    ).not.toBeInTheDocument();
  });
});

describe("running", () => {
  it("Cells should not be clickable after moving away from 0th generation (i.e. no godmode).", () => {
    render(<App />);

    userEvent.click(screen.getByText(/next/i));
    const checkbox = screen.getAllByRole("checkbox")[0];
    expect(checkbox).toBeDisabled();
  });
});
