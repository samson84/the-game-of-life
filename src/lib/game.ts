import {
  Universe,
  Width,
  Height,
  createEmptyUniverse,
  mapUniverse,
  getDimenstions,
} from "./universe";

export class GameError extends Error {}

export type Game = {
  seed: Universe;
  current: Universe;
  generation: number;
};

export const createGame = (width: Width, height: Height): Game | never => {
  if (width < 1 || height < 1) {
    throw new GameError("invalid_game_dimension");
  }
  return {
    seed: createEmptyUniverse(width, height),
    current: createEmptyUniverse(width, height),
    generation: 0,
  };
};

export const toggleCell = (game: Game, x: number, y: number): Game => {
  const { current, generation } = game;
  const [width, height] = getDimenstions(current);
  const outOfRange = width <= x || height <= y || x < 0 || y < 0;
  if (outOfRange) {
    throw new GameError("coordinates_out_of_range");
  }
  if (generation !== 0) {
    throw new GameError("not_the_initial_generation");
  }
  const modified = mapUniverse(current, (currentX, currentY, previousValue) =>
    currentX === x && currentY === y ? !previousValue : previousValue
  );
  return {
    ...game,
    current: modified,
  };
};
