import { mapUniverse, Universe } from "../lib/universe";

type CheckboxRendererProps = {
  universe: Universe;
  onToggle: (x: number, y: number) => void;
  disabled: boolean;
};

const CheckboxRenderer = ({
  universe,
  onToggle,
  disabled,
}: CheckboxRendererProps): JSX.Element => {
  return (
    <>
      {universe.map((row, y) => (
        <div key={y}>
          {row.map((cell, x) => (
            <input
              key={x}
              type="checkbox"
              checked={cell}
              onChange={() => onToggle(x, y)}
              disabled={disabled}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default CheckboxRenderer;
