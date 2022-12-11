import * as THREE from "three";
import { Mesh, Vector3 } from "three";
import { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";

import { randomDirection } from "../utils";
import { RADIUS } from "../constants";

const init = randomDirection();
export default function Ball({ args = [RADIUS, 32, 32] }) {
  const [ref] = useState(() => new Mesh());

  const [position, setPosition] = useState(new Vector3(0, 0, 0));
  const [ballDirection, setBallDirection] = useState(init);
  const [speed, setSpeed] = useState(0.05);

  const [live, setLive] = useState(2);
  const [score, setScore] = useState(0);
  const updateScore = (count) => setScore(score + count);
  const isGameOver = position.y < -5.7 || score === 50 || live < 0;

  useEffect(() => {
    if (position.y < -5.7 && live > 0) {
      setLive(live - 1)
      setPosition(new Vector3(0, 0, 0));
      setBallDirection(randomDirection());
    }
  }, [position, live])

  const { scene } = useThree();
  useFrame(() => {
    if (isGameOver) return;

    const { x, y } = ballDirection;
    const newPosition = new Vector3(position.x + x * speed, position.y + y * speed, 0);
    setPosition(newPosition);

    const raycaster = new THREE.Raycaster();
    raycaster.set(position, ballDirection);
    const intersects = raycaster.intersectObjects(scene.children);

    // TODO: 球会穿透砖块 打到后面的砖
    // TODO: 不能同时打掉多个砖块
    if (intersects.length > 0) {
      intersects.sort((a, b) => a.distance - b.distance)
      const { distance } = intersects[0];
      const intersectedObject = intersects[0].object.name; 
      if (distance < RADIUS && intersectedObject) {
        if (intersectedObject === "paddle")
          setBallDirection(new Vector3(ballDirection.x, ballDirection.y * -1, 0));

        if (intersectedObject === "topWall") 
          setBallDirection(new Vector3(ballDirection.x, ballDirection.y * -1, 0));
        else if (["leftWall", "rightWall"].includes(intersectedObject)) 
          setBallDirection(new Vector3(ballDirection.x * -1, ballDirection.y, 0));
        else if (intersectedObject === "brick") {
          setBallDirection(new Vector3(ballDirection.x * -1, ballDirection.y * -1, 0));
          const bricks = intersects.filter(i => i.object.name === "brick" && i.distance < RADIUS);
          updateScore(bricks.length);
          bricks.forEach(i => scene.remove(i.object));
        }
      }
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={args} />
      <meshStandardMaterial />
    </mesh>
  );
}
