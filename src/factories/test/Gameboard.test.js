import Gameboard from "../Gameboard";
import Ship from "../Ship";

describe("Gameboard", () => {
  let gameboard;
  let ship;
  let testObjectArray;
  let testBooleanArray;

  beforeEach(() => {
    gameboard = new Gameboard();
    ship = new Ship(3);
    testObjectArray = [];
    testBooleanArray = [];

    for (let i = 0; i < 10; i++) {
      testObjectArray[i] = [];
      testBooleanArray[i] = [];

      for (let j = 0; j < 10; j++) {
        testObjectArray[i][j] = null;
        testBooleanArray[i][j] = false;
      }
    }
  });

  it("Creates a gameboard", () => {
    expect(gameboard).toEqual({
      board: testObjectArray,
      missedShots: testBooleanArray,
    });
  });

  it("Place a ship", () => {
    gameboard.placeShip(ship, 1, 1, true);
    testObjectArray[1][1] = ship;
    testObjectArray[2][1] = ship;
    testObjectArray[3][1] = ship;

    expect(gameboard).toEqual({
      board: testObjectArray,
      missedShots: testBooleanArray,
    });
  });

  it("Place 5 ships randomly", () => {
    gameboard.placeShipsRandomly();
    expect(gameboard.getEmptyFieldsAmount()).toBe(83);
  });

  it("Place ship in taken position", () => {
    gameboard.placeShip(ship, 1, 1, true);
    expect(gameboard.isPlacementPossible(ship, 1, 1, true)).toBe(false);
    expect(gameboard.isPlacementPossible(ship, 2, 1, true)).toBe(false);
    expect(gameboard.isPlacementPossible(ship, 3, 1, true)).toBe(false);
  });

  it("Receives attack", () => {
    gameboard.placeShip(ship, 1, 1, true);
    gameboard.receiveAttack(3, 1);
    expect(
      gameboard.board[3][1].hits.some(([x, y]) => x === 3 && y === 1),
    ).toBe(true);
  });

  it("Keeps track of missed shots", () => {
    gameboard.placeShip(ship, 1, 1, true);
    gameboard.receiveAttack(4, 1);
    expect(gameboard.missedShots[4][1]).toBe(true);
  });

  it("Track if game is over", () => {
    expect(gameboard.isGameOver()).toBe(false);

    gameboard.placeShip(ship, 1, 1, true);
    gameboard.receiveAttack(1, 1);
    gameboard.receiveAttack(2, 1);
    gameboard.receiveAttack(3, 1);

    gameboard.placeShip(new Ship(3), 5, 5, false);
    gameboard.receiveAttack(5, 5);
    gameboard.receiveAttack(5, 6);
    gameboard.receiveAttack(5, 7);
    expect(gameboard.isGameOver()).toBe(true);
  });
});
