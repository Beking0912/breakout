import { useRef } from "react";
import { COLORS, DEPTH, HEIGHT, WIDTH } from "../constants";

function Brick({ args = [WIDTH, HEIGHT, DEPTH], color, position }) {
  const ref = useRef();
  return (
    <mesh ref={ref} position={position} name="brick">
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function Bricks({ bricks }) {
  return bricks.map((line, row) =>
    line.map((brick, column) =>
      brick ? (
        <Brick key={`${row}-${column}`} color={COLORS[row]} position={brick} />
      ) : null
    )
  );
}
