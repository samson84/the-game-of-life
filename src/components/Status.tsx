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
      <div>
        <strong>Generation:</strong>
        <span>{generation}</span>
      </div>
      <div>
        <strong>Population:</strong>
        <span>{population}</span>
      </div>
    </div>
  );
};

export default Status;
