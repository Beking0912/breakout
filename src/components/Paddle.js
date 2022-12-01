import { useFrame } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";
import { DEPTH, HEIGHT, WIDTH } from "../constants";

export default function Paddle({ args = [WIDTH * 2, HEIGHT, DEPTH] }) {
  const [ref, api] = useBox(() => ({ args }));
  useFrame((state) => {
    let next = -state.mouse.x * 10;
    next = Math.max(-5.1, Math.min(4, next));
    api.position.set(next, -4, 0);
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={args} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}
