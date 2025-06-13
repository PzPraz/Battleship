import Ship from "./Ship";

class Gameboard {
  constructor() {
    this.board = [];
    this.missedShots = [];
    this.initialize();
  }

  initialize() {
    for (let i = 0; i < 10; i++) {
      this.board[i] = [];
      this.missedShots[i] = [];

      for (let j = 0; j < 10; j++) {
        this.board[i][j] = null;
        this.missedShots[i][j] = false;
      }
    }
  }

  placeShip(ship, row, column, isVertical) {
    if (!this.isPlacementPossible(ship, row, column, isVertical)) return false;

    ship.setOrigin(row, column);

    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        this.board[row + i][column] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[row][column + i] = ship;
      }
    }
    return true;
  }

  isPlacementPossible(ship, row, column, isVertical) {
    if (row < 0 || row > 9 || column < 0 || column > 9) {
      return false;
    }

    // check if ship doesnt fit
    if (isVertical) {
      if (row + ship.length > 10) return false;
    } else {
      if (column + ship.length > 10) return false;
    }

    // check if position is taken
    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row + i][column] != null) return false;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row][column + i] != null) return false;
      }
    }

    return true;
  }

  placeShipsRandomly() {
    const ships = [];
    const carrier = new Ship(5);
    const battleship = new Ship(4);
    const destroyer = new Ship(3);
    const submarine = new Ship(3);
    const patrolBoat = new Ship(2);

    ships.push(carrier, battleship, destroyer, submarine, patrolBoat);

    let successfullPlacements = 0;

    while (successfullPlacements < 5) {
      const row = Math.floor(Math.random() * 10);
      const column = Math.floor(Math.random() * 10);
      const isVertical = Math.floor(Math.random() * 2) === 1 ? true : false;

      if (
        this.placeShip(ships[successfullPlacements], row, column, isVertical)
      ) {
        successfullPlacements++;
      }
    }
  }

  getEmptyFieldsAmount() {
    let amount = 0;

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j] == null) amount++;
      }
    }

    return amount;
  }

  receiveAttack(row, column) {
    if (row < 0 || row > 9 || column < 0 || column > 9) {
      return false;
    }

    if (this.board[row][column]) {
      const ship = this.board[row][column];

      ship.hit([row, column]);

      return true;
    } else {
      this.missedShots[row][column] = true;
      return false;
    }
  }

  isGameOver() {
    let isBoardEmpty = true;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j]) {
          isBoardEmpty = false;
          if (!this.board[i][j].isSunk()) return false;
        }
      }
    }

    return isBoardEmpty ? false : true;
  }

  isEmpty() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j] !== null) return false;
      }
    }
    return true;
  }
}

export default Gameboard;
