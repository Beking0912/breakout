import { useBox } from "@react-three/cannon";
import { COLORS, DEPTH, HEIGHT, WIDTH } from "../constants";

function Brick({ args = [WIDTH, HEIGHT, DEPTH], color, ...props }) {
  const [ref] = useBox(() => ({ args, ...props }));
  return (
    <mesh ref={ref}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function Bricks({ bricks }) {
  return bricks.map((line, row) =>
    line.map((brick, column) =>
      brick ? (
        <Brick
          key={`${row}-${column}`}
          color={COLORS[row]}
          position={bricks[row][column]}
          // position={[(WIDTH + MARGIN_COLUMN) * (column - 5) , MARGIN_ROW * row + 2, 0]}
        />
      ) : null
    )
  );
}
