import { Game } from "../game";
import { Universe } from "../universe";

export const universeFixture2by3 = () => [
  [false, false],
  [false, false],
  [false, false],
];
export const universeFixture2by2 = () => [
  [false, false],
  [false, false],
];
export const universeFixture3by3 = () => [
  [false, false, false],
  [false, false, false],
  [false, false, false],
];

export const gameFixture = (overrides: Partial<Game> = {}): Game => ({
  seed: universeFixture2by2(),
  current: null,
  generation: 0,
  ...overrides,
});

export const zeroNeighbours3by3 = () => [
  [
    [
      [true, false, false],
      [false, false, false],
      [false, false, false],
    ],
  ],
  [
    [
      [false, true, false],
      [false, false, false],
      [false, false, false],
    ],
  ],
  [
    [
      [false, false, true],
      [false, false, false],
      [false, false, false],
    ],
  ],
  [
    [
      [false, false, false],
      [true, false, false],
      [false, false, false],
    ],
  ],
  [
    [
      [false, false, false],
      [false, true, false],
      [false, false, false],
    ],
  ],
  [
    [
      [false, false, false],
      [false, false, true],
      [false, false, false],
    ],
  ],
  [
    [
      [false, false, false],
      [false, false, false],
      [true, false, false],
    ],
  ],
  [
    [
      [false, false, false],
      [false, false, false],
      [false, true, false],
    ],
  ],
  [
    [
      [false, false, false],
      [false, false, false],
      [false, false, true],
    ],
  ],
];

export const oneNeighbours3by3 = () => [
  [
    [
      [true, false, false],
      [true, false, false],
      [false, false, false],
    ],
  ],
  [
    [
      [false, true, true],
      [false, false, false],
      [false, false, false],
    ],
  ],
  [
    [
      [false, false, false],
      [false, true, false],
      [false, false, true],
    ],
  ],
  [
    [
      [false, false, true],
      [true, false, true],
      [true, false, false],
    ],
  ],
  [
    [
      [false, false, false],
      [true, false, false],
      [false, true, false],
    ],
  ],
  [
    [
      [false, false, false],
      [false, true, true],
      [false, false, false],
    ],
  ],
  [
    [
      [false, false, false],
      [true, true, false],
      [false, false, false],
    ],
  ],
  [
    [
      [false, false, false],
      [false, false, false],
      [false, true, true],
    ],
  ],
  [
    [
      [false, false, false],
      [false, false, true],
      [false, false, true],
    ],
  ],
];
