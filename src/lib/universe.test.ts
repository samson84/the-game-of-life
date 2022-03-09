import { universeFixture2by2 } from "./test/fixtures";
import { countPopulation } from "./universe";

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
