import "./App.css";

import { PureComponent } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei'

import Walls from "./components/Wall";
import Ball from "./components/Ball";
import Bricks from "./components/Bricks";
import Paddle from "./components/Paddle";

import { BRICKS, SENTENCES } from "./constants";

const initState = {
  bricks: BRICKS,
  status: 0,
  score: 0,
  live: 2,
  start: false,
};

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { ...initState };
  }

  updateStatus = (value) => this.setState(value);
  handleRestart = () => {
    setTimeout(() => {
      this.updateStatus({ ...initState, start: true })
    }, 1000)
  }
  
  render() {
    const { bricks, status, score, live, start } = this.state;
    return (
      <div className="App">
        <Canvas shadows camera={{ position: [0, 0, -11], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 5]} />
          <pointLight position={[-10, -10, -5]} />
          <Walls />
          <Paddle />
          <Ball score={score} live={live} start={start} updateStatus={this.updateStatus} />
          <Bricks bricks={bricks} />
          <OrbitControls autoRotateSpeed={0.85} zoomSpeed={0.75} minPolarAngle={1} maxPolarAngle={Math.PI} />
        </Canvas>
        <div className="title">
          <p>Score: {score}</p>
          <p>Life: {live}</p>
          <button onClick={this.handleRestart}>START</button>
          <p className="intro">Move mouse to control paddle</p>
          <p className="intro">Slide trackpad with two fingers to change view</p>
        </div>
        <p className="result">{SENTENCES[status]}</p>
      </div>
    );
  }
}

export default App;
