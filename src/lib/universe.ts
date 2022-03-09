export type Universe = boolean[][];
export type Width = number;
export type Height = number;

export const createEmptyUniverse = (width: Width, height: Height): Universe => {
  const row = Array.from({ length: width }, () => false);
  return Array.from({ length: height }, () => [...row]);
};

export const mapUniverse = (
  universe: Universe,
  mapper: (x: number, y: number, value: boolean) => boolean
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
