import { getCoordinateFromIndex } from "../utils/helpers";
import { renderBoards, showUserWin, showUserLose } from "./dom";

export function setupEventListeners(gameController) {
  const enemyTiles = document.querySelectorAll(".computerSide .tiles");

  enemyTiles.forEach((tile) => {
    tile.addEventListener("click", (e) => {
      const boards = gameController.getBoards();
      const userBoard = boards.playerBoard;
      const computerBoard = boards.computerBoard;

      if (userBoard.isGameOver() || computerBoard.isGameOver()) return;

      const [x, y] = getCoordinateFromIndex(
        [...e.target.parentNode.children].indexOf(e.target),
      );

      gameController.playerTurn(x, y);
      renderBoards(userBoard, computerBoard);

      if (computerBoard.isGameOver()) {
        showUserWin();
        return;
      }

      gameController.computerTurn();
      renderBoards(userBoard, computerBoard);

      if (userBoard.isGameOver()) {
        showUserLose();
      }
    });
  });
}
