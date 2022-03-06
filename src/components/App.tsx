import { useState } from "react";
import { createGame, Game, toggleCell } from "../lib/game";
import CheckboxRenderer from "./CheckboxRenderer";

const WIDTH = 30;
const HEIGHT = 30;

function App() {
  const [game, setGame] = useState<Game>(createGame(WIDTH, HEIGHT));

  const handleToggle = (x: number, y: number) =>
    setGame(toggleCell(game, x, y));

  return (
    <>
      <h1>The Game Of Life</h1>
      <CheckboxRenderer universe={game.seed} onToggle={handleToggle} />
    </>
  );
}

export default App;
