import GameController from "./controller/GameController";
import { renderBoards, hideOverlayTexts } from "./ui/dom";
import { setupEventListeners } from "./ui/events";
import "./styles/reset.css";
import "./styles/styles.css";

function preGame() {
  const gameController = GameController();
  const boards = gameController.getBoards();
  renderBoards(boards.playerBoard, boards.computerBoard);
  setupEventListeners(gameController);
}

document.querySelector(".play-again").addEventListener("click", () => {
  hideOverlayTexts();
  preGame();
});

preGame();
