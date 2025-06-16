import Gameboard from "../factories/Gameboard";
import Ship from "../factories/Ship";
import Player from "../factories/Player";

const GameController = () => {
  const user = new Player("user");
  const computer = new Player("computer");

  const playerBoard = new Gameboard();
  const computerBoard = new Gameboard();

  playerBoard.placeShipsRandomly();
  computerBoard.placeShipsRandomly();

  function getRandomCoord() {
    let row, col;
    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    } while (computer.hasAlreadyHit(row, col));

    return [row, col];
  }

  function playerTurn(row, col) {
    if (user.hasAlreadyHit(row, col)) {
      return { status: "already attacked" };
    }

    const hit = user.attack(row, col, computerBoard);
    const gameOver = computerBoard.isGameOver();

    return {
      status: hit ? "hit" : "miss",
      gameOver,
    };
  }

  function computerTurn() {
    const [row, col] = getRandomCoord();

    const hit = computer.attack(row, col, playerBoard);
    const gameOver = playerBoard.isGameOver();

    return {
      status: hit ? "hit" : "miss",
      gameOver,
    };
  }

  function getBoards() {
    return {
      playerBoard,
      computerBoard,
    };
  }

  return {
    playerTurn,
    computerTurn,
    getBoards,
    user,
    computer,
  };
};

export default GameController;
