import { useEffect } from "react";
import { useSphere } from "@react-three/cannon";
import { BALL_SIZE, WIDTH } from "../constants";

export default function Ball({
  args = [WIDTH / 2, BALL_SIZE, BALL_SIZE],
  setBallPosition,
  setGameStatus,
  gameStatus,
}) {
  const [ref, api] = useSphere(() => ({ mass: 1, args: [0.5] }));
  // const { viewport } = useThree();
  useEffect(() => {
    api.position.subscribe((v) => {
      if (v[1] > -30) {
        setBallPosition(v);
      } else if (gameStatus !== 2) {
        setGameStatus(2);
      }
    });
  });

  // usePlane(() => ({
  //   position: [0, -viewport.height, 0],
  //   rotation: [-Math.PI / 2, 0, 0],
  //   onCollide: () => {
  //     api.position.set(0, 0, 0)
  //     api.velocity.set(0, 10, 0)
  //   },
  // }))
  return (
    <mesh ref={ref}>
      <sphereGeometry args={args} />
      <meshStandardMaterial />
    </mesh>
  );
}
