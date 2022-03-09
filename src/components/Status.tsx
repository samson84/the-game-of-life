import React from "react";
import { Game } from "../lib/game";
import { countPopulation } from "../lib/universe";

type StatusProps = {
  game: Game;
};
const Status = ({ game }: StatusProps): JSX.Element => {
  const generation = game.generation;
  const population = countPopulation(game.current ?? game.seed);
  return (
    <div>
      <p>
        <strong>Generation:</strong>
        <span>{generation}</span>
        <strong>Population:</strong>
        <span>{population}</span>
      </p>
    </div>
  );
};

export default Status;
