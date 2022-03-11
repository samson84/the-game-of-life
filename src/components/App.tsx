import { useState } from "react";
import {
  createGame,
  Game,
  isInitialState,
  nextState,
  reset,
  toggleCell,
} from "../lib/game";
import CheckboxRenderer from "./CheckboxRenderer";
import Controls from "./Controls";
import Status from "./Status";

const WIDTH = 30;
const HEIGHT = 30;

function App() {
  const [game, setGame] = useState<Game>(createGame(WIDTH, HEIGHT));

  const handleToggle = (x: number, y: number) =>
    setGame(toggleCell(game, x, y));

  const handleClear = () => setGame(createGame(WIDTH, HEIGHT));
  const handleNext = () => setGame(nextState(game));
  const handleReset = () => setGame(reset(game));

  const universe = game.current ?? game.seed;

  return (
    <>
      <h1>The Game Of Life</h1>
      <Controls
        onClear={handleClear}
        onNext={handleNext}
        onReset={handleReset}
        game={game}
      />
      <Status game={game} />
      <CheckboxRenderer
        universe={universe}
        onToggle={handleToggle}
        disabled={!isInitialState(game)}
      />
    </>
  );
}

export default App;
