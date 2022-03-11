import {
  Universe,
  Width,
  Height,
  createEmptyUniverse,
  mapUniverse,
  getDimenstions,
  countNeighbours,
} from "./universe";

export class GameError extends Error {}

export type Game = {
  seed: Universe;
  current: Universe | null;
  generation: number;
};

export const createGame = (width: Width, height: Height): Game | never => {
  if (width < 1 || height < 1) {
    throw new GameError("invalid_game_dimension");
  }
  return {
    seed: createEmptyUniverse(width, height),
    current: null,
    generation: 0,
  };
};

export const toggleCell = (game: Game, x: number, y: number): Game => {
  const { seed, generation } = game;
  const [width, height] = getDimenstions(seed);
  const outOfRange = width <= x || height <= y || x < 0 || y < 0;
  if (outOfRange) {
    throw new GameError("coordinates_out_of_range");
  }
  if (generation !== 0) {
    throw new GameError("not_the_initial_generation");
  }
  const modified = mapUniverse(seed, (currentX, currentY, previousValue) =>
    currentX === x && currentY === y ? !previousValue : previousValue
  );
  return {
    ...game,
    seed: modified,
  };
};

export const resetGame = (game: Game): Game => ({
  ...game,
  generation: 0,
  current: null,
});

export const nextState = (game: Game): Game => {
  const universe = game.current ?? mapUniverse(game.seed);
  const next = mapUniverse(universe, (x, y, value) => {
    const neighbours = countNeighbours(universe, x, y);
    const isReproduction = !value && neighbours === 3;
    const isAlive = value && [2, 3].includes(neighbours);
    const isUnderpopulation = value && neighbours < 2;
    const isOverPopulation = value && neighbours > 3;
    if (isReproduction || isAlive) {
      return true;
    }
    if (isOverPopulation || isUnderpopulation) {
      return false;
    }
    return value;
  });
  return {
    ...game,
    generation: game.generation + 1,
    current: next,
  };
};

export const isInitialState = (game: Game) => game.generation === 0;
