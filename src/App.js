import "./App.css";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";

import Walls from "./components/Wall";
import Ball from "./components/Ball";
import Bricks from "./components/Bricks";
import Paddle from "./components/Paddle";

import { BRICKS, SENTENCES } from "./constants";

function App() {
  const [score, setScore] = useState(0);
  const [bricks, setBricks] = useState(BRICKS);

  return (
    <div className="App">
      {/* <p className="title">{SENTENCES[gameStatus]}</p> */}
      <p className="score">{score}</p>
      <Canvas shadows camera={{ position: [0, 0, -11], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 5]} />
        <pointLight position={[-10, -10, -5]} />
        <Walls />
        <Paddle />
        <Ball />
        <Bricks bricks={bricks} />
      </Canvas>
    </div>
  );
}

export default App;
