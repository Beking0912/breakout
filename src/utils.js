function distance(p1, p2) {
  const a = p2[0] - p1[0];
  const b = p2[1] - p1[1];
  const c = p2[2] - p1[2];

  return Math.sqrt(a * a + b * b + c * c);
}

export { distance };
