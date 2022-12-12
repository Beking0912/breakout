const COLORS = ["blue", "green", "yellow", "red"];
const SENTENCES = ['', 'You win!', 'Game Over.'];

const WIDTH = 1;
const HEIGHT = 0.4;
const DEPTH = 1;
const MARGIN_COLUMN = 0.1;
const MARGIN_ROW = 0.5;
const RADIUS = 0.25;

let BRICKS = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
BRICKS = BRICKS.map((line, row) =>
  line.map((brick, column) =>
    brick
      ? [(WIDTH + MARGIN_COLUMN) * (column - 5), MARGIN_ROW * row + 2, 0]
      : 0
  )
);

export {
  COLORS,
  WIDTH,
  HEIGHT,
  DEPTH,
  MARGIN_COLUMN,
  MARGIN_ROW,
  RADIUS,
  BRICKS,
  SENTENCES
};
