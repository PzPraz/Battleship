import Player from "../Player";
import Gameboard from "../Gameboard";
import Ship from "../Ship";

describe("Player", () => {
  let player;
  let testboard;
  let ship;

  beforeEach(() => {
    player = new Player("player");
    testboard = new Gameboard();
    ship = new Ship(3);
  });

  it("Initialize player", () => {
    expect(player).toEqual({
      name: "player",
      alreadyHitCoords: [],
    });
  });

  it("attack", () => {
    testboard.placeShip(ship, 1, 1, true);
    player.attack(1, 1, testboard);
    player.attack(2, 1, testboard);
    player.attack(3, 1, testboard);
    expect(testboard.isGameOver()).toBe(true);
  });
});
