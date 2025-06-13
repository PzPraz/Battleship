import GameController from "./module/GameController";
import "./reset/reset.css";
import "./styles.css";

const enemyTiles = document.querySelectorAll(".computerSide .tiles");
let playerTurns = true;

const BOARD_SIZE = 10;

function getCoordinateFromIndex(index) {
  const x = parseInt(index / BOARD_SIZE, 10);
  const y = index % BOARD_SIZE;

  return [x, y];
}

function preGame() {
  const gameController = GameController();

  const playerTurn = gameController.playerTurn;
  const boards = gameController.getBoards();

  const userBoard = boards.playerBoard;

  const computerTurn = gameController.computerTurn;
  const computerBoard = boards.computerBoard;

  loadBoardToTiles(userBoard, computerBoard);

  enemyTiles.forEach((tile) => {
    tile.addEventListener("click", (e) => {
      if (!computerBoard.isGameOver() && !userBoard.isGameOver()) {
        const [x, y] = getCoordinateFromIndex(
          [...e.target.parentNode.children].indexOf(e.target),
        );
        playerTurns = !playerTurns;
        playerTurn(x, y);
        loadBoardToTiles(userBoard, computerBoard);

        if (computerBoard.isGameOver()) {
          showUserWin();
          return;
        }

        computerTurn();
        loadBoardToTiles(userBoard, computerBoard);

        if (userBoard.isGameOver()) {
          showUserLose();
        }
      }
    });
  });
}

preGame();

function loadBoardToTiles(userBoard, computerBoard) {
  const playerTiles = document.querySelectorAll(".playerSide .tiles");
  const enemyTiles = document.querySelectorAll(".computerSide .tiles");

  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (userBoard.board[i][j] != null) {
        const index = i * 10 + j;
        playerTiles[index].classList.add("ship");

        const ship = userBoard.board[i][j];

        if (ship.isHitAt(i, j)) {
          playerTiles[index].classList.add("hit");
        }
      }

      if (userBoard.missedShots[i][j] == true) {
        const index = i * 10 + j;
        playerTiles[index].classList.add("miss");
      }

      if (computerBoard.board[i][j] != null) {
        const index = i * 10 + j;
        const ship = computerBoard.board[i][j];

        if (ship.isHitAt(i, j)) {
          enemyTiles[index].classList.add("hit");
        }
      }

      if (computerBoard.missedShots[i][j] == true) {
        const index = i * 10 + j;
        enemyTiles[index].classList.add("miss");
      }
    }
  }
}

const btn_replay = document.querySelector(".play-again");
const overlay = document.querySelector(".overlay");
const user_win_text = document.querySelector(".player-win");
const user_lose_text = document.querySelector(".player-lose");

btn_replay.addEventListener("click", () => {
  overlay.classList.add("hide");
  preGame();
});

function showUserWin() {
  overlay.classList.remove("hide");
  user_win_text.classList.remove("hide");
}

function showUserLose() {
  overlay.classList.remove("hide");
  user_lose_text.classList.remove("hide");
}

function playAgain() {
  overlay.classList.add("hide");
  user_win_text.classList.add("hide");
  user_win_text.classList.add("hide");
  preGame();
}
