import { useEffect, useState } from "react";
import useTimer from "../hooks/useTimer";
import {
  createGame,
  Game,
  isInitialState,
  nextState,
  resetGame,
  toggleCell,
} from "../lib/game";
import CheckboxRenderer from "./CheckboxRenderer";
import Controls from "./Controls";
import Status from "./Status";

const WIDTH = 30;
const HEIGHT = 30;

function App() {
  const [game, setGame] = useState<Game>(createGame(WIDTH, HEIGHT));
  const { start, stop, running, count } = useTimer();

  useEffect(() => {
    if (running) {
      setGame(nextState(game));
    }
  }, [count, running]);

  const handleToggle = (x: number, y: number) =>
    setGame(toggleCell(game, x, y));

  const handleClear = () => setGame(createGame(WIDTH, HEIGHT));
  const handleNext = () => setGame(nextState(game));
  const handleReset = () => setGame(resetGame(game));

  const universe = game.current ?? game.seed;

  return (
    <>
      <h1>The Game Of Life</h1>
      <Controls
        onClear={handleClear}
        onNext={handleNext}
        onReset={handleReset}
        onStart={start}
        onStop={stop}
        isRunning={running}
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
