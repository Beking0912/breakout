import { useFrame } from "@react-three/fiber";
import { DEPTH, HEIGHT, WIDTH } from "../constants";
import { useRef, useState } from "react";

export default function Paddle({ args = [WIDTH * 2, HEIGHT, DEPTH] }) {
  // const [position, setPosition] = useState([0, 0, 0]);
  const ref = useRef();
  useFrame((state) => {
    let next = -state.mouse.x * 10;
    next = Math.max(-5.1, Math.min(4, next));
    ref.current.position.x = next;
    ref.current.position.y = -4.7;
    // setPosition([next, -4.7, 0])
  });
  return (
    <mesh ref={ref} name="paddle">
      <boxGeometry args={args} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}
