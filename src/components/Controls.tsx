import React from "react";

type ControlProps = {
  onClear: () => void;
  onNext: () => void;
};

const Controls = ({ onClear, onNext }: ControlProps) => (
  <>
    <button onClick={onClear} title="Clear the initial state">
      Clear
    </button>
    <button onClick={onNext} title="Render the next state">
      Next
    </button>
  </>
);

export default Controls;
