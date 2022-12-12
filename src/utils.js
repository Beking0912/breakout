import { Vector3 } from "three";

function getDistance(p1, p2) {
  const a = p2.x - p1.x;
  const b = p2.y - p1.y;
  const c = p2.z - p1.z;

  return Math.sqrt(a * a + b * b + c * c);
}

const randomDirection = (xFlag = 1, yFlag = -1) => {
  let angle = Math.random() * (150 - 30) + 30; 
  let x = Math.cos(angle * Math.PI / 180);
  let y = Math.sin(angle * Math.PI / 180);
  return new Vector3(x * xFlag, Math.abs(y) * yFlag, 0);
}

const getFlag = n => n > 0 ? 1 : -1;

const randomReflect = (xv, yv, from, to) => {
  let xFlag = getFlag(xv);
  let yFlag = getFlag(yv);
  let angle = Math.random() * (to - from) + from; 
  let x = Math.cos(angle * Math.PI / 180);
  let y = Math.sin(angle * Math.PI / 180);
  return new Vector3(Math.abs(x) * xFlag, Math.abs(y) * yFlag, 0);
}

const randomLRWallReflect = (xv, yv) => randomReflect(xv, yv, -60, 60);
const randomTBWallReflect = (xv, yv) => randomReflect(xv, yv, 30, 150);
const randomPReflect = (x, y) => randomDirection(getFlag(x), getFlag(y));

export { getFlag, getDistance, randomPReflect, randomLRWallReflect, randomTBWallReflect, randomDirection };
