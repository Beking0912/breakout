import { useEffect } from "react";
import { useSphere } from "@react-three/cannon";
import { BALL_SIZE, WIDTH } from "../constants";

export default function Ball({
  args = [WIDTH / 2, BALL_SIZE, BALL_SIZE],
  setBallPosition
}) {
  const [ref, api] = useSphere(() => ({ mass: 1, args: [0.5] }));
  // const { viewport } = useThree();
  useEffect(() => {
    api.position.subscribe((v) => {
      if (v[1] > -30) setBallPosition(v);
    });
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={args} />
      <meshStandardMaterial />
    </mesh>
  );
}

