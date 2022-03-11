import { universeFixture2by2 } from "./test/fixtures";
import { countNeighbours, countPopulation } from "./universe";

describe("countPopulation", () => {
  it("count empty universe as 0", () => {
    const universe = universeFixture2by2();

    const current = countPopulation(universe);

    expect(current).toEqual(0);
  });

  it("counts the trues", () => {
    const universe = [
      [true, false],
      [true, true],
    ];

    const current = countPopulation(universe);

    expect(current).toEqual(3);
  });
});

describe("countNeighbours", () => {
  it("should return 0, if no neighbours", () => {
    const universe = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ];

    const current = countNeighbours(universe, 1, 1);

    expect(current).toEqual(0);
  });
  it("should return 8, if it is surrounded", () => {
    const universe = [
      [true, true, true],
      [true, false, true],
      [true, true, true],
    ];

    const current = countNeighbours(universe, 1, 1);

    expect(current).toEqual(8);
  });
  describe("when neighbours are out of range", () => {
    it("should count, when the cell is in the top left", () => {
      const universe = [
        [false, true, false],
        [true, true, false],
        [true, true, true],
      ];

      const current = countNeighbours(universe, 0, 0);

      expect(current).toEqual(3);
    });
    it("should count, when the cell is in the bottom right", () => {
      const universe = [
        [false, true, false],
        [true, true, true],
        [true, true, false],
      ];

      const current = countNeighbours(universe, 2, 2);

      expect(current).toEqual(3);
    });
  });
});
