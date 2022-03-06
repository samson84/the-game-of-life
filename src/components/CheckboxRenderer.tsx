import { mapUniverse, Universe } from "../lib/universe";

type CheckboxRendererProps = {
  universe: Universe;
  onToggle: (x: number, y: number) => void;
};

const CheckboxRenderer = ({
  universe,
  onToggle,
}: CheckboxRendererProps): JSX.Element => {
  return (
    <>
      {universe.map((row, y) => (
        <div>
          {row.map((cell, x) => (
            <input
              type="checkbox"
              checked={cell}
              onClick={() => onToggle(x, y)}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default CheckboxRenderer;
