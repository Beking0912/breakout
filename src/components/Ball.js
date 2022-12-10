import { Mesh } from "three";
import { useEffect, useState } from "react";
import { BALL_SIZE, WIDTH } from "../constants";

export default function Ball({ args = [WIDTH / 2, BALL_SIZE, BALL_SIZE] }) {
  const [position, setPosition] = useState([0, 0, 0]);
  const [ref] = useState(() => new Mesh());

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={args} />
      <meshStandardMaterial />
    </mesh>
  );
}
