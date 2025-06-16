export const BOARD_SIZE = 10;

export function getCoordinateFromIndex(index) {
  const x = parseInt(index / BOARD_SIZE, 10);
  const y = index % BOARD_SIZE;

  return [x, y];
}
