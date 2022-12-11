import { Mesh, Vector3 } from "three";
import * as THREE from "three";

import { useState } from "react";
import { RADIUS } from "../constants";
import { useFrame, useThree } from "@react-three/fiber";

export default function Ball({ args = [RADIUS, 32, 32], updateScore }) {
  const [ref] = useState(() => new Mesh());
  const [position, setPosition] = useState(new Vector3(0, 0, 0));
  const [ballDirection, setBallDirection] = useState(new Vector3(1, 1, 0));
  const [speed, setSpeed] = useState(0.05);

  const { scene } = useThree();

  useFrame(() => {
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
