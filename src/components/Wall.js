import { useBox } from "@react-three/cannon";
import { DEPTH, WIDTH } from "../constants";

export default function Wall({
  args = [WIDTH, 16.5, DEPTH],
  position = [5.5, -4, 0],
}) {
  const [ref] = useBox(() => ({ args, position }));
  return (
    <mesh ref={ref}>
      <boxGeometry args={args} />
      <meshStandardMaterial color="pink" />
    </mesh>
  );
}
