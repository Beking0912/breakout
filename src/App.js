import "./App.css";

import { PureComponent } from "react";
import { Canvas } from "@react-three/fiber";

import Walls from "./components/Wall";
import Ball from "./components/Ball";
import Bricks from "./components/Bricks";
import Paddle from "./components/Paddle";

import { BRICKS, SENTENCES } from "./constants";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      bricks: BRICKS,
      status: 0,
      score: 0,
      live: 2,
    };
  }

  updateStatus = (value) => this.setState(value);

  render() {
    const { bricks, status, score, live } = this.state;
    return (
      <div className="App">
        <p className="title">
          <p>Score: {score}</p>
          <p>Life: {live}</p>
          <p>{SENTENCES[status]}</p>
        </p>
        <Canvas shadows camera={{ position: [0, 0, -11], fov: 50 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 5]} />
          <pointLight position={[-10, -10, -5]} />
          <Walls />
          <Paddle />
          <Ball updateStatus={this.updateStatus} />
          <Bricks bricks={bricks} />
        </Canvas>
      </div>
    );
  }
}

export default App;
