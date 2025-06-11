import Ship from "../Ship";

describe("Ship", () => {
  let ship = new Ship(3);

  beforeEach(() => {
    ship = new Ship(3);
  });

  it("Creates ship", () => {
    expect(ship).toEqual({
      length: 3,
      hits: [],
      origin: [],
    });
  });

  it("Takes a hit", () => {
    ship.hit(0);
    expect(ship.hits).toContain(0);
  });

  it("Sunk", () => {
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    expect(ship.isSunk()).toBe(true);
  });

  it("Doesn't get hit more than once in the same position", () => {
    ship.hit(0);
    ship.hit(0);
    expect(ship.hits.length).toBe(1);
  });
});
