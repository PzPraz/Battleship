import { BOARD_SIZE } from "../utils/helpers";

export function renderBoards(userBoard, computerBoard) {
  const playerTiles = document.querySelectorAll(".playerSide .tiles");
  const enemyTiles = document.querySelectorAll(".computerSide .tiles");

  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      const index = i * BOARD_SIZE + j;
      const playerTile = playerTiles[index];
      const enemyTile = enemyTiles[index];

      // Clear previous state
      playerTile.className = "tiles";
      enemyTile.className = "tiles";

      // Player side
      const userCell = userBoard.board[i][j];
      if (userCell) {
        playerTile.classList.add("ship");
        if (userCell.isHitAt(i, j)) playerTile.classList.add("hit");
      }
      if (userBoard.missedShots[i][j]) playerTile.classList.add("miss");

      // Enemy side
      const enemyCell = computerBoard.board[i][j];
      if (enemyCell && enemyCell.isHitAt(i, j)) {
        enemyTile.classList.add("hit");
      }
      if (computerBoard.missedShots[i][j]) enemyTile.classList.add("miss");
    }
  }
}

export function showUserWin() {
  document.querySelector(".overlay").classList.remove("hide");
  document.querySelector(".player-win").classList.remove("hide");
}

export function showUserLose() {
  document.querySelector(".overlay").classList.remove("hide");
  document.querySelector(".player-lose").classList.remove("hide");
}

export function hideOverlayTexts() {
  document.querySelector(".overlay").classList.add("hide");
  document.querySelector(".player-win").classList.add("hide");
  document.querySelector(".player-lose").classList.add("hide");
}
