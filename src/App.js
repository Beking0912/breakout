import "./App.css";

import { Vector3 } from "three";
import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";

import Wall from "./components/Wall";
import Ball from "./components/Ball";
import Bricks from "./components/Bricks";
import Paddle from "./components/Paddle";

import { BRICKS, SENTENCES } from './constants'
import { distance } from "./utils";

function App() {
  const [bricks, setBricks] = useState(BRICKS);
  const [ballPosition, setBallPosition] = useState(new Vector3(0, 0, 0));
  const [score, setScore] = useState(0);
  const [ballVisible, setBallVisible] = useState(true);
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
            if (ballPosition[1] > 3) {
              setGameStatus(1);
              setBallVisible(false);
            }
          }
        }
      })
    );
  }, [ballPosition]);

  return (
    <div className="App">
      <p className="title">{SENTENCES[gameStatus]}</p>
      <p className="score">{score}</p>
      <Canvas shadows camera={{ position: [0, 0, -10], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 5]} />
        <pointLight position={[-10, -10, -5]} />
        <Physics
          gravity={[0, -40, 0]}
          defaultContactMaterial={{ restitution: 1.1 }}
        >
          <Wall />
          <Wall position={[-6.6, -4, 0]} />
          <Paddle />
          {ballVisible && <Ball {...{ setBallPosition, setBallVisible, setGameStatus, gameStatus }} />}
          <Bricks {...{ bricks }} />
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
