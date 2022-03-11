# The Game of Life

A simple React app, where you can play The Game of Life

## Requirements

- [x] 30x30 cells at minimum, surrounded by buttons.
- [x] Indicators show the generation number and the size of population.
- [ ] Initial state (0th generation):
  - [x] Initial state (0th generation) can be set by clicking on cells, toggling their state,
  - [x] the cell states can be cleared with a button.
- [ ] Running (>0th generations):
  - [ ] Simulation can be played (started) and paused,
  - [ ] stepped forward with one step,
  - [ ] and reset to initial state (0th generation), where you can modify your initial state to have a different outcome. Please note, that reset doesn't clear the board.
  - [ ] Cells should not be clickable after moving away from 0th generation (i.e. no godmode).

## Worklog

- [x] Init project, 20 mins
- [x] Create a game lib, basic structure 30 mins
- [x] Game Lib: Add the create game and toggle game functionality + tests, 90 mins
- [x] Add a basic checkbox renderer, display the universe, it is possible
      to toggle the cells. 60 mins
- [x] showing the generations and the population, 40 mins
- [x] creating a basic structure for the next step calulation, debug needed 30 mins
- [x] debugging adding some tests 45 mins
- [x] correct the next state calculation, cover with test, add Reset 90 mins 