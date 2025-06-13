class Ship {
  constructor(length) {
    this.length = length;
    this.hits = [];
    this.origin = [];
  }

  hit(pos) {
    if (this.hits.includes(pos) || pos < 0 || pos >= this.length) {
      return;
    }
    this.hits.push(pos);
  }

  isHitAt(i, j) {
    return this.hits.some(([x, y]) => x === i && y === j);
  }

  isSunk() {
    return this.length == this.hits.length;
  }

  setOrigin(row, column) {
    this.origin = [row, column];
  }
}

export default Ship;
