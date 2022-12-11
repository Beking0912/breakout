import { Vector3 } from "three";

function getDistance(p1, p2) {
  const a = p2.x - p1.x;
  const b = p2.y - p1.y;
  const c = p2.z - p1.z;

  return Math.sqrt(a * a + b * b + c * c);
}

const randomDirection = () => {
  let angle = Math.random() * (150 - 30) + 30; 
  let x = Math.cos(angle * Math.PI / 180);
  let y = Math.sin(angle * Math.PI / 180);
  return new Vector3(x, -Math.abs(y), 0);
}

export { getDistance, randomDirection };
