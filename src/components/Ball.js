import * as THREE from "three";
import { Vector3 } from "three";
import { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";

import { randomDirection, randomPReflect, randomLRWallReflect, randomTBWallReflect } from "../utils";
import { RADIUS } from "../constants";

const speed = 0.08;
const init = randomDirection();
export default function Ball({ args = [RADIUS, 32, 32], updateStatus }) {
  const [ref] = useState();

  const [position, setPosition] = useState(new Vector3(0, 0, 0));
  const [ballDirection, setBallDirection] = useState(init);

  const [live, setLive] = useState(2);
  const [score, setScore] = useState(0);
  const updateScore = (count) => {
    setScore(score + count);
    updateStatus({ score: score + count });
  }
  const isGameOver = position.y < -5.7 || score === 50 || live < 0;

  const { scene } = useThree();

  useEffect(() => {
    if (position.y < -5.7 && live > 0) {
      setLive(live - 1)
      updateStatus({ live: live - 1 })
      setPosition(new Vector3(0, 0, 0));
      setBallDirection(randomDirection());
    }
  }, [position, live])

  useFrame(() => {
    if (isGameOver) {
      if (score === 50 || live === 0) updateStatus({ status: score === 50 ? 1 : 2 })
      return;
    }

    const { x, y } = ballDirection;
    const newPosition = new Vector3(position.x + x * speed, position.y + y * speed, 0);
    setPosition(newPosition);

    // let sphereBox = new THREE.Sphere(ref.current.position, RADIUS);
    // const intersects = scene.children.map(i => {
    //   if (i.name)
    //     if (sphereBox.intersectsBox(new THREE.Box3().setFromObject(i))) {
    //       return i
    //     }
    // }).filter(Boolean)

    // const intersects = scene.children.filter(obj => {
    //   if (obj.name) {
    //     const distance = obj.position.distanceTo(ref.current.position);
    //     return distance < RADIUS;
    //   }
    // })

    const raycaster = new THREE.Raycaster();
    raycaster.set(position, ballDirection);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
      intersects.sort((a, b) => a.distance - b.distance)
      const { distance } = intersects[0];
      const intersectedObject = intersects[0].object.name; 
      if (distance < RADIUS && intersectedObject) {
        if (intersectedObject === "paddle")
          setBallDirection(randomPReflect(ballDirection.x, ballDirection.y * -1));
        if (intersectedObject === "topWall") 
          setBallDirection(randomTBWallReflect(ballDirection.x, ballDirection.y * -1));
        else if (["leftWall", "rightWall"].includes(intersectedObject)) 
          setBallDirection(randomLRWallReflect(ballDirection.x * -1, ballDirection.y));
        else if (intersectedObject === "brick") {
          setBallDirection(randomTBWallReflect(ballDirection.x * -1, ballDirection.y * -1));
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
