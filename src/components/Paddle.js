import { useFrame } from "@react-three/fiber";
import { DEPTH, HEIGHT, WIDTH } from "../constants";
import { useEffect, useRef, useState } from "react";

export default function Paddle({ args = [WIDTH * 2, HEIGHT, DEPTH] }) {
  const ref = useRef();

  // const [isMoving, setIsMoving] = useState(false);
  // const [direction, setDirection] = useState(0);

  // const handleKeyDown = (e) => {
  //   if (e.keyCode === 37) {
  //     setIsMoving(true);
  //     setDirection(1);
  //   } else if (e.keyCode === 39) {
  //     setIsMoving(true);
  //     setDirection(-1);
  //   }
  // }

  // const handleKeyUp = (e) => {
  //   if (e.keyCode === 37 || e.keyCode === 39) {
  //     setIsMoving(false);
  //   }
  // }

  // useFrame((state) => {
  //   if (isMoving) {
  //     let position = ref.current.position.x + direction * 0.1;
  //     position = Math.max(-5.1, Math.min(4, position));
  //     ref.current.position.x = position;
  //     ref.current.position.y = -4.7;
  //   } else {
  //     let next = -state.mouse.x * 10;
  //     next = Math.max(-5.1, Math.min(4, next));
  //     ref.current.position.x = next;
  //     ref.current.position.y = -4.7;
  //   }
  // })

  // useEffect(() => {
  //   window.addEventListener('keydown', handleKeyDown);
  //   window.addEventListener('keyup', handleKeyUp);

  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //     window.removeEventListener('keyup', handleKeyUp);
  //   }
  // }, [])


  useFrame((state) => {
    let next = -state.mouse.x * 10;
    next = Math.max(-5.1, Math.min(4, next));
    ref.current.position.x = next;
    ref.current.position.y = -4.7;
  });

  return (
    <mesh ref={ref} name="paddle" position={[0, -4.7, 0]}>
      <boxGeometry args={args} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}
