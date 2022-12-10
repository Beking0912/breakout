import { useRef } from "react";
import { DEPTH, WIDTH } from "../constants";

function Wall({ args = [WIDTH, 16.5, DEPTH], position = [5.5, -4, 0] }) {
  const ref = useRef();
  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial color="pink" />
    </mesh>
  );
}

export default function Walls() {
  return (
    <>
      <Wall />
      <Wall position={[-6.6, -4, 0]} />
      <Wall position={[-0.55, 4.5, 0]} args={[13.1, WIDTH / 2, DEPTH]} />
    </>
  );
}
