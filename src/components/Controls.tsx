import React from "react";
import { Game, isInitialState } from "../lib/game";

type ControlProps = {
  onClear: () => void;
  onNext: () => void;
  onReset: () => void;
  onStart: () => void;
  onStop: () => void;
  game: Game;
  isRunning: boolean;
};

const Controls = ({
  onClear,
  onNext,
  onReset,
  game,
  isRunning,
  onStop,
  onStart,
}: ControlProps) => (
  <>
    <button
      onClick={onClear}
      disabled={!isInitialState(game)}
      title="Clear the initial state"
    >
      Clear
    </button>
    <button onClick={onNext} disabled={isRunning} title="Render the next state">
      Next
    </button>
    <button
      onClick={onReset}
      disabled={isRunning}
      title="Reset to the initial state"
    >
      Reset
    </button>
    {isRunning ? (
      <button onClick={onStop} title="Stop the animation">
        Stop
      </button>
    ) : (
      <button onClick={onStart} title="Start the animation">
        Start
      </button>
    )}
  </>
);

export default Controls;
