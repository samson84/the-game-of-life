export type Universe = boolean[][];
export type Width = number;
export type Height = number;

export const createEmptyUniverse = (width: Width, height: Height): Universe => {
  const row = Array.from({ length: width }, () => false);
  return Array.from({ length: height }, () => [...row]);
};

const identity = (x: number, y: number, value: boolean): boolean => value;
export const mapUniverse = (
  universe: Universe,
  mapper: (x: number, y: number, value: boolean) => boolean = identity
): Universe =>
  universe.map((row, y) => row.map((value, x) => mapper(x, y, value)));

export const getDimenstions = (universe: Universe): [Width, Height] => {
  const height = universe.length;
  const width = universe[0]?.length;
  return [width, height];
};

export const countPopulation = (universe: Universe): number =>
  universe
    .flat()
    .map((cell): number => (cell ? 1 : 0))
    .reduce((current, sum) => current + sum, 0);

export const countNeighbours = (
  universe: Universe,
  x: number,
  y: number
): number => {
  const neighbourCoordinates: [number, number][] = [
    [x - 1, y],
    [x + 1, y],
    [x - 1, y - 1],
    [x + 1, y - 1],
    [x, y - 1],
    [x - 1, y + 1],
    [x + 1, y + 1],
    [x, y + 1],
  ];
  return neighbourCoordinates
    .filter(([x, y]) => x >= 0 && y >= 0)
    .map(([x, y]): number => (universe[x][y] ? 1 : 0))
    .reduce((current, sum) => current + sum, 0);
};
