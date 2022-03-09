import React from "react";

type ControlProps = {
  onClear: () => void;
};

const Controls = ({ onClear }: ControlProps) => (
  <button onClick={onClear} title="Clear the initial state">
    Clear
  </button>
);

export default Controls;
