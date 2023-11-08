
const CARDINAL_POINTS = ["N", "E", "S", "W"];

const MOVE_COORDINATES: Record<string, number[]> = {
  S: [0, -1],
  W: [-1, 0],
  N: [0, 1],
  E: [1, 0]
};

export {
  CARDINAL_POINTS,
  MOVE_COORDINATES
}