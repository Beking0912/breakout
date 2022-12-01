const COLORS = ["blue", "green", "yellow", "orange", "red"];
const SENTENCES = ['Score:', 'You win the game!', 'Try again?'];

const WIDTH = 1;
const HEIGHT = 0.4;
const DEPTH = 1;
const MARGIN_COLUMN = 0.1;
const MARGIN_ROW = 0.5;
const BALL_SIZE = 16;

let BRICKS = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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
  BALL_SIZE,
  BRICKS,
  SENTENCES
};
