import { Game } from "../game";

export const universeFixture2by3 = () => [
  [false, false],
  [false, false],
  [false, false],
];
export const universeFixture2by2 = () => [
  [false, false],
  [false, false],
];
export const gameFixture = (overrides: Partial<Game> = {}): Game => ({
  seed: universeFixture2by2(),
  current: null,
  generation: 0,
  ...overrides,
});
