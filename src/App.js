import "./App.css";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import Walls from "./components/Wall";
import Ball from "./components/Ball";
import Bricks from "./components/Bricks";
import Paddle from "./components/Paddle";

import { BRICKS, SENTENCES } from "./constants";

function App() {
  const ref = useRef();
  const [bricks, setBricks] = useState(BRICKS);
  const [camera, setCamera] = useState([0, 0, -11]);

  // TODO: not work
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (camera[1] === 0) setCamera([0, -11, -11]);
      else setCamera([0, 0, -11]);
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [])

  return (
    <div className="App">
      {/* <p className="title">{SENTENCES[gameStatus]}</p> */}
      {/* <p className="score">{score}</p> */}
      <Canvas shadows camera={{ position: camera, fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 5]} />
        <pointLight position={[-10, -10, -5]} />
        <Walls/>
        <Paddle/>
        <Ball/>
        <Bricks bricks={bricks} />
      </Canvas>
    </div>
  );
}

export default App;
