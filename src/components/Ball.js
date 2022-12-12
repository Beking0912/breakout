import * as THREE from "three";
import { Vector3 } from "three";
import { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";

import { randomDirection, randomPReflect, randomLRWallReflect, randomTBWallReflect } from "../utils";
import { RADIUS } from "../constants";
import breakSound from '../break.wav'
import paddleSound from '../paddle.wav'

const speed = 0.08;
const init = randomDirection();
const pong = new Audio(breakSound);
const ping = new Audio(paddleSound);
export default function Ball({ args = [RADIUS, 32, 32], live, score, start, updateStatus }) {
  const [ref] = useState();

  const [position, setPosition] = useState(new Vector3(0, 0, 0));
  const [ballDirection, setBallDirection] = useState(init);

  const updateScore = (count) => updateStatus({ score: score + count });
  const isGameOver = position.y < -5.7 || score === 50 || live < 0;

  const playPongSound = () => {
    pong.currentTime = 0
    pong.volume = 1
    pong.play()
  }

  const playPingSound = () => {
    ping.currentTime = 0
    ping.volume = 1
    ping.play()
  }

  const { scene } = useThree();

  useEffect(() => {
    if (position.y < -5.7 && live > 0) {
      updateStatus({ live: live - 1 })
      setPosition(new Vector3(0, 0, 0));
      setBallDirection(randomDirection());
    }
  }, [position, live])

  useFrame(() => {
    if (isGameOver) {
      if (score === 50 || live === 0) updateStatus({ status: score === 50 ? 1 : 2 })
      updateStatus({ start: false })
      return;
    }

    if (!start) return;

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
          playPingSound();
        if (intersectedObject === "topWall") {
          setBallDirection(randomTBWallReflect(ballDirection.x, ballDirection.y * -1));
          playPingSound();
        } else if (["leftWall", "rightWall"].includes(intersectedObject)) {
          setBallDirection(randomLRWallReflect(ballDirection.x * -1, ballDirection.y));
          playPingSound();
        } else if (intersectedObject === "brick") {
          setBallDirection(randomTBWallReflect(ballDirection.x * -1, ballDirection.y * -1));
          const bricks = intersects.filter(i => i.object.name === "brick" && i.distance < RADIUS);
          updateScore(bricks.length);
          bricks.forEach(i => {
            scene.remove(i.object);
            playPongSound();
          });
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
