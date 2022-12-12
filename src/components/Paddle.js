import { useFrame } from "@react-three/fiber";
import { DEPTH, HEIGHT, WIDTH } from "../constants";
import { useRef } from "react";
// import { Vector3 } from "three";

export default function Paddle({ args = [WIDTH * 2, HEIGHT, DEPTH] }) {
  const ref = useRef();
  // const [isChange, setChange] = useState(false);
  // const [camera, setCamera] = useState([0, 0, -11]);
  // const [angel, setAngel] = useState(Math.PI / 4);

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

  // const { camera } = useThree()
  // useFrame(() => {
  //   if (isChange) {
  //     // camera.position.lerp(new Vector3(camera[0], camera[1] + 1, camera[2]), 0.1)
  //   }
  // })


  /**
   * 
   * 
   * |   /    |  x         0, 0, -11*cos(0)
   *  \ /    /            
   *    ___      z         -11 * sin(0), 0, -11 * cos(0)
   */

  // const handleKeyDown = (e) => {
  //   // when press arrow key, move the camera
  //   // const { camera } = this.state;
  //   // if press R or r, reset the camera
  //   if (e.key === "r" || e.key === "R") {
  //     // setCamera([0, 0, -11]);
  //     camera.position.set(0, 0, -11)
  //   }
  //   if (e.key === "q" || e.key === "Q") {
  //     // setCamera([0, -11, -11]);
  //     // camera.position.set(0, -11, -11)
  //   }
  //   if (e.key === "ArrowLeft") {
  //     // move camera rotate left, around the center, which is (0, 0, 0)
  //     // rotate the camera around the center by Math.PI / 15
  //     setAngel(angel - Math.PI / 15);
  //     // camera[0] = 11 * Math.sin(angel);
  //     camera[2] = -11 * Math.cos(angel);
  //     // setCamera(...camera);
  //     camera.position.set(camera[0], camera[1], camera[2])
  //   }
  //   if (e.key === "ArrowRight") {
  //     setAngel(angel + Math.PI / 15);
  //     // camera[0] = 11 * Math.sin(angel);
  //     camera[2] = -11 * Math.cos(angel);
  //     // setCamera(...camera);
  //     camera.position.set(camera[0], camera[1], camera[2])
  //   }
  //   if (e.key === "z") {
  //     camera[2] += 0.1;
  //     camera.position.set(camera[0], camera[1], camera[2])
  //   }
  //   if (e.key === "x") {
  //     camera[2] -= 0.1;
  //     camera.position.set(camera[0], camera[1], camera[2]);
  //   }
  //   console.log(angel)
  // }; 

  // const handleKeyUp = () => setChange(false)


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
