import each from "jest-each";
import { createGame, GameError, nextState, toggleCell, Game } from "./game";
import {
  gameFixture,
  oneNeighbours3by3,
  universeFixture2by3,
  universeFixture3by3,
  zeroNeighbours3by3,
} from "./test/fixtures";
import { Universe } from "./universe";

const gameFixture1stGen3by3 = (overrides: Partial<Game>) =>
  gameFixture({
    seed: universeFixture3by3(),
    current: universeFixture3by3(),
    generation: 1,
    ...overrides,
  });

describe("createGame", () => {
  it("should create a game", () => {
    const width = 2;
    const height = 3;

    const current = createGame(width, height);

    expect(current).toEqual(
      gameFixture({
        seed: [
          [false, false],
          [false, false],
          [false, false],
        ],
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

    expect(current).toEqual(
      gameFixture({
        seed: [
          [false, true],
          [false, false],
        ],
        generation: 0,
      })
    );
  });
  it("should toggle back", () => {
    const width = 2;
    const height = 2;

    const game = createGame(width, height);
    const toggled = toggleCell(game, 1, 0);
    const current = toggleCell(toggled, 1, 0);

    expect(current).toEqual(
      gameFixture({
        seed: [
          [false, false],
          [false, false],
        ],
        generation: 0,
      })
    );
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

describe("nextState", () => {
  describe("from initial state", () => {
    it("should set current with the initial state", () => {
      const game = gameFixture({ seed: universeFixture3by3() });

      const current = nextState(game);

      expect(current.current).toEqual(universeFixture3by3());
    });

    it("should increase the generation", () => {
      const game = gameFixture({ seed: universeFixture3by3() });

      const current = nextState(game);

      expect(current.generation).toEqual(1);
    });
  });
  describe("life and death", () => {
    describe("Any live cell with fewer than two live neighbours dies", () => {
      each(zeroNeighbours3by3()).test(
        "should die, when has 0 neighbour",
        (currentUniverse: Universe) => {
          const game = gameFixture1stGen3by3({
            current: currentUniverse,
          });

          const current = nextState(game);

          expect(current.current).toEqual([
            [false, false, false],
            [false, false, false],
            [false, false, false],
          ]);
        }
      );

      each(oneNeighbours3by3()).test("should die, when 1 neighbour", () => {
        const game = gameFixture1stGen3by3({
          current: [
            [false, false, false],
            [false, true, true],
            [false, false, false],
          ],
        });

        const current = nextState(game);

        expect(current.current).toEqual([
          [false, false, false],
          [false, false, false],
          [false, false, false],
        ]);
      });
    });

    describe("Any live cell with two or three live neighbours lives", () => {
      it("with two cells", () => {
        const game = gameFixture1stGen3by3({
          current: [
            [true, false, false],
            [false, true, false],
            [false, false, true],
          ],
        });

        const current = nextState(game);

        expect(current.current).toEqual([
          [false, false, false],
          [false, true, false],
          [false, false, false],
        ]);
      });

      it("with three cells", () => {
        const game = gameFixture1stGen3by3({
          current: [
            [true, false, true],
            [false, true, false],
            [false, false, true],
          ],
        });

        const current = nextState(game);

        expect(current.current).toEqual([
          [false, true, false],
          [false, true, true],
          [false, false, false],
        ]);
      });
    });

    it("Any live cell with more than three live neighbours dies, as if by overpopulation.", () => {
      const game = gameFixture1stGen3by3({
        current: [
          [true, true, true],
          [true, true, true],
          [true, true, true],
        ],
      });

      const current = nextState(game);

      expect(current.current).toEqual([
        [true, false, true],
        [false, false, false],
        [true, false, true],
      ]);
    });

    it("Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.", () => {
      const game = gameFixture1stGen3by3({
        current: [
          [true, true, false],
          [true, false, false],
          [false, false, false],
        ],
      });

      const current = nextState(game);

      expect(current.current).toEqual([
        [true, true, false],
        [true, true, false],
        [false, false, false],
      ]);
    });
  });
});
