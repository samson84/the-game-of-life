import { createGame, GameError, toggleCell, Game } from "./game";

const universeFixture2by3 = () => [
  [false, false],
  [false, false],
  [false, false],
];

const universeFixture2by2 = () => [
  [false, false],
  [false, false],
];

const gameFixture = (overrides: Partial<Game> = {}): Game => ({
  seed: universeFixture2by2(),
  current: universeFixture2by2(),
  generation: 0,
  ...overrides,
});

describe("createGame", () => {
  it("should create a game", () => {
    const width = 2;
    const height = 3;

    const current = createGame(width, height);

    expect(current).toEqual(
      gameFixture({
        seed: universeFixture2by3(),
        current: universeFixture2by3(),
        generation: 0,
      })
    );
  });

  describe("when width is less than 1", () => {
    it("should throw, if it is 0", () => {
      const width = 0;
      const height = 3;

      expect(() => createGame(width, height)).toThrow(
        new GameError("invalid_game_dimension")
      );
    });
    it("should throw, if it is -1", () => {
      const width = -1;
      const height = 3;

      expect(() => createGame(width, height)).toThrow(
        new GameError("invalid_game_dimension")
      );
    });
  });

  describe("when height is less than 1", () => {
    it("should throw, if it is 0", () => {
      const width = 3;
      const height = 0;

      expect(() => createGame(width, height)).toThrow(
        new GameError("invalid_game_dimension")
      );
    });
    it("should throw, if it is -1", () => {
      const width = 2;
      const height = -1;

      expect(() => createGame(width, height)).toThrow(
        new GameError("invalid_game_dimension")
      );
    });
  });
});

describe("toggleCell", () => {
  it("should toggle a cell", () => {
    const width = 2;
    const height = 2;

    const game = createGame(width, height);
    const current = toggleCell(game, 1, 0);

    expect(current).toEqual({
      seed: universeFixture2by2(),
      current: [
        [false, true],
        [false, false],
      ],
      generation: 0,
    });
  });

  it("should toggle back", () => {
    const width = 2;
    const height = 2;

    const game = createGame(width, height);
    const toggled = toggleCell(game, 1, 0);
    const current = toggleCell(toggled, 1, 0);

    expect(current).toEqual({
      seed: universeFixture2by2(),
      current: [
        [false, false],
        [false, false],
      ],
      generation: 0,
    });
  });

  describe("when it is not the initial generation", () => {
    it("should throw", () => {
      const game = gameFixture({ generation: 1 });

      expect(() => toggleCell(game, 0, 0)).toThrow(
        new GameError("not_the_initial_generation")
      );
    });
  });

  describe("when coordinates are out of range", () => {
    describe("when x", () => {
      it("should throw, if it is larger than width", () => {
        const x = 2;
        const y = 0;
        const game = gameFixture({
          current: universeFixture2by3(),
          seed: universeFixture2by3(),
          generation: 0,
        });

        expect(() => toggleCell(game, x, y)).toThrow(
          new GameError("coordinates_out_of_range")
        );
      });
      it("should throw, if it is less than 0", () => {
        const x = -1;
        const y = 0;
        const game = gameFixture({
          current: universeFixture2by3(),
          seed: universeFixture2by3(),
          generation: 0,
        });

        expect(() => toggleCell(game, x, y)).toThrow(
          new GameError("coordinates_out_of_range")
        );
      });
    });

    describe("when y", () => {
      it("should throw, if it is larger than height", () => {
        const x = 0;
        const y = 3;
        const game = gameFixture({
          current: universeFixture2by3(),
          seed: universeFixture2by3(),
          generation: 0,
        });

        expect(() => toggleCell(game, x, y)).toThrow(
          new GameError("coordinates_out_of_range")
        );
      });
      it("should throw, if it is less than 0", () => {
        const x = 0;
        const y = -1;
        const game = gameFixture({
          current: universeFixture2by3(),
          seed: universeFixture2by3(),
          generation: 0,
        });

        expect(() => toggleCell(game, x, y)).toThrow(
          new GameError("coordinates_out_of_range")
        );
      });
    });
  });
});
