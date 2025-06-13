class Player {
  constructor(name) {
    this.name = name;
    this.alreadyHitCoords = [];
  }

  attack(row, column, gameboard) {
    if (this.hasAlreadyHit(row, column)) return false;

    this.alreadyHitCoords.push([row, column]);
    //gameboard.receiveAttack(row, column);
    gameboard.receiveAttack(row, column);

    return true;
  }

  hasAlreadyHit(row, column) {
    for (let i = 0; i < this.alreadyHitCoords.length; i++) {
      if (
        this.alreadyHitCoords[i][0] === row &&
        this.alreadyHitCoords[i][1] === column
      ) {
        return true;
      }
    }
    return false;
  }
}

export default Player;
