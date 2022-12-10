import "./App.css";

import { Vector3 } from "three";
import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";

import Walls from "./components/Wall";
import Ball from "./components/Ball";
import Bricks from "./components/Bricks";
import Paddle from "./components/Paddle";

import { BRICKS, SENTENCES } from './constants'
import { distance } from "./utils";

function App() {
  const [score, setScore] = useState(0);
  const [bricks, setBricks] = useState(BRICKS);
  const [ballPosition, setBallPosition] = useState(new Vector3(0, 0, 0));
  const [gameStatus, setGameStatus] = useState(0);

  const changeBricks = (row, column) => {
    const newBricks = [...bricks];
    newBricks[row][column] = 0;
    setBricks(newBricks);
  };

  useEffect(() => {
    bricks.forEach((line, row) =>
      line.forEach((brick, column) => {
        if (brick) {
          const d = distance(brick, ballPosition);
          if (d < 0.7) {
            changeBricks(row, column);
            setScore(score + 1);
          }
        }
      })
    );
  }, [ballPosition]);

  return (
    <div className="App">
      <p className="title">{SENTENCES[gameStatus]}</p>
      <p className="score">{score}</p>
      <Canvas shadows camera={{ position: [0, 0, -11], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 5]} />
        <pointLight position={[-10, -10, -5]} />
        <Physics
          gravity={[0, -10, 0]}
          defaultContactMaterial={{ restitution: 1.1 }}
        >
          <Walls />
          <Paddle />
          <Ball {...{ setBallPosition }} />
          <Bricks {...{ bricks }} />
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
