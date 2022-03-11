import React from "react";
import { Game, isInitialState } from "../lib/game";

type ControlProps = {
  onClear: () => void;
  onNext: () => void;
  onReset: () => void;
  game: Game;
};

const Controls = ({ onClear, onNext, onReset, game }: ControlProps) => (
  <>
    <button
      onClick={onClear}
      disabled={!isInitialState(game)}
      title="Clear the initial state"
    >
      Clear
    </button>
    <button onClick={onNext} title="Render the next state">
      Next
    </button>
    <button onClick={onReset} title="Reset to the initial state">
      Reset
    </button>
  </>
);

export default Controls;
